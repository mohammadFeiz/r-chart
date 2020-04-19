import React,{Component,createRef,createContext} from 'react';
import RSlider from 'r-range-slider';
import RCanvas from 'r-canvas';
import $ from 'jquery';
import './index.css';

var RChartContext = createContext();
 export default class RChart extends Component{
    constructor(props){
      super(props);
      var {X,Y,x,y,data} = this.props;
      if(x){console.error('RChart error => you set x props for RChart. did you mean X')}
      if(y){console.error('RChart error => you set y props for RChart. did you mean Y')}
      this.touch = 'ontouchstart' in document.documentElement;
      this.state = {X,Y,prevx:JSON.stringify(X),prevy:JSON.stringify(Y),popup:false};
      this.slider = {
        style:{position:'absolute',left:0,top:0,width:'100%',height:'100%',padding:0},
        lineStyle:{display:'none'},editable:false,showValue:false,
        pointStyle:{display:'none'},className:'labelSlider'
      }
      this.dom = createRef();
      this.details = {};
      $('body').on('mouseout','.r-chart-canvas',()=>{$('.r-chart-popup-container').html('')})
    }
    static getDerivedStateFromProps(props,state){
      var {prevx,prevy} = state;
      var {X = {},Y = {}} = props;
      var change = {},changed = false;
      if(prevx !== JSON.stringify(X)){//اگر پروپس جدید از بیرون آمد
        change.prevx = JSON.stringify(X);
        change.X = X; 
        changed = true;
      }
      if(prevy !== JSON.stringify(Y)){//اگر پروپس جدید از بیرون آمد
        change.prevy = JSON.stringify(Y);
        change.Y = Y;
        changed = true;
      }
      if(changed){return change}
      return null;
    }
    getStyle(x,y){
      return {
        gridTemplateColumns:`${x}px auto`,
        gridTemplateRows:`auto ${y}px`,
        direction:'ltr'
      }
    }
    getType(X,Y){return {x:X.labels?'string':'number',y:Y.labels?'string':'number'};}
    getLimitTypeNumber(data,axis){
      var min = Infinity,max = -Infinity;
      for (var i = 0; i < data.length; i++) {
        var {stream = []} = data[i];
        for (var j = 0; j < stream.length; j++) { 
          var value = stream[j][axis]; 
          if(value < min){min = value;}
          if(value > max){max = value;}
        }
      }
      return [min === Infinity?undefined:min,max === -Infinity?undefined:max];
    }
    getLimit(data,X,Y){
      var xLimit = X.labels?[0,X.labels.length - 1]:this.getLimitTypeNumber(data,'x');
      var yLimit = Y.labels?[0,Y.labels.length - 1]:this.getLimitTypeNumber(data,'y');
      return {x:xLimit,y:yLimit};
    }
    getRangeTypeNumber(axis,{filter = []}){
      var {limit,width,height} = this.details;
      var [min,max] = limit[axis];
      if(min === undefined || max === undefined){return false;}
      var range = max - min,i = 1;
      if(range === 0){
        if(min < 0){return {start:2 * min,step:Math.abs(min),end:0,}}
        else if(min > 0){return {start:0,step:min,end:2 * min,}}
        else {return {start:-1,step:1,end:1}}
      }
      while(range / 10 > 1){i *= 10; range /= 10;}
      var step;
      if(range >= 0 && range <= 3){step = 0.2 * i;}
      else{step = i;}
      var start = Math.round(min / step) * step - step;
      var end = Math.round(max / step) * step + step;
      var count = (end - start) / step; 
      var size = axis === 'x'?width:height; 
      var maxCount = size?Math.ceil(size / 60):10;
      while (count > maxCount){step *= 2; count = (end - start) / step;}
      var [fs = start,fe = end] = filter;
      var filteredRange = {start,end,step,p1:fs,p2:fe}  
      return {start:fs,step,end:fe,filter:filteredRange}; 
    } 
    getRangeTypeString(axis,{filter = [],labels,width = 60,height = 30}){
      var {limit} = this.details;
      var size = this.details[axis === 'x'?'width':'height']
      var [start,end] = limit[axis];
      var fs = filter[0]?labels.indexOf(filter[0]):0;
      var fe = filter[1]?labels.indexOf(filter[1]):labels.length - 1;
      var filteredRange = {start:0,end:labels.length - 1,p1:fs,p2:fe};
      var count = fe - fs + 1;
      var approveCount = Math.floor(size / (axis === 'x'?width:height));
      var approveCount = approveCount < 1 ? 1:approveCount;
      var labelStep = Math.floor(count / approveCount);
      return {
        start:fs - 0.5,step:labelStep,end:fe + 0.5,count,filter:filteredRange
      };
    }
    getRange(X,Y){
      var {limit,type,width,height} = this.details;
      var xRange = type.x === 'number'?
      this.getRangeTypeNumber('x',X):
      this.getRangeTypeString('x',X);
      var yRange = type.y === 'number'?
      this.getRangeTypeNumber('y',Y):
      this.getRangeTypeString('y',Y);
      return {x:xRange,y:yRange};
    }
    getLabelConfig(axis,{rotate,labels}){
      var {type,range} = this.details;
      return {
        rotate:axis === 'y'?0:rotate,
        edit:type[axis] === 'string'?(value)=>labels[value]:undefined,
        step:range[axis].step,
        style:axis === 'x'?
        {top:'24px',fontSize:'inherit'}:
        {left:'unset',right:'16px',fontSize:'inherit',justifyContent:'flex-end'}
      } 
    }
    binerySearch(array,value,field){
      var sI = 0,eI = array.length - 1;
      while(eI - sI > 1){
        var midIndex = Math.floor((eI + sI) / 2);
        var midValue = field(array[midIndex],array);
        if(value === midValue){return midIndex;}
        if(value < midValue){eI = midIndex;}
        if(value > midValue){sI = midIndex;}
      }
      var endValue = field(array[eI],array);
      var startValue = field(array[sI],array);
      if(value === endValue){return eI}
      if(value === startValue){return sI}
      if(value > endValue){return Infinity}
      if(value < startValue){return -Infinity}
      return [sI,eI];
    }
    getZoomStyle(axis){
      return {
        style:axis === 'x'?
        {position:'absolute',display:'none',width:'100%',height:'36px',padding:'0 12px',top:0}:
        {position:'absolute',display:'none',width:'36px',height:'100%',padding:'12px 0',right:0},
        lineStyle:{display:'none'},
        pointStyle:{width:'16px',height:'16px',borderRadius:'100%',background:'#fff',border:'3px solid #eee'},
        showValue:true
      }
    }
    eventHandler(selector, event, action,type = 'bind'){
      var me = { mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }; 
      event = this.touch ? me[event] : event;
      var element = typeof selector === "string"?(selector === "window"?$(window):$(selector)):selector; 
      element.unbind(event, action); 
      if(type === 'bind'){element.bind(event, action)}
    }
    getClient(e){
      return this.touch?{x: e.changedTouches[0].clientX,y:e.changedTouches[0].clientY }:{x:e.clientX,y:e.clientY}
    }
    SetState(obj){this.setState(obj)}
    onChange(data){
      var {onChange} = this.props;
      onChange({data});
    }
    getLineChart(stream,{fill = '#fff',color = '#000',pointRadius,lineWidth = 3,area},index){ 
      var points = [],line = {points:[],lineWidth,stroke:color},Area;
      for(var j = 0; j < stream.length; j++){
        var {x,y,pointRadius:PointRadius} = stream[j];  
        //if(x === 'msf'){debugger;}
        var xp = this.getPercentByValue(x,'x'),yp = this.getPercentByValue(y,'y');
        if(xp === 'string error'){
          console.error(`RChart => Receive "${x}" in data[${index}].stream[${j}].x . but there is not "${x}" in X.labels array`)
          continue;
        }
        else if(xp === 'number error'){
          console.error(`RChart => data[${index}].stream[${j}].x is not a number. if type of x value of stream is an string you must set labels property as array of strings in X props`)
          continue;
        }
        else{xp+='%';}
        if(yp === false){
          console.error(`RChart => Receive "${y}" in data[${index}].stream[${j}].y . but there is not "${y}" in Y.labels array`)
          continue;
        }
        else if(yp === 'number error'){
          console.error(`RChart => data[${index}].stream[${j}].y is not a number. if type of y value of stream is an string you must set labels property as array of strings in Y props`)
          continue;
        }
        else{yp *= -1; yp += '%';}
        var radius = PointRadius || pointRadius;
        if(radius){
          points.push({
            r: radius,lineWidth:lineWidth * 2,x:xp,y:yp,fill,stroke:color,dataIndex:index,streamIndex:j,
            event:{mousedown:this.pointMouseDown.bind(this)}
          })
        }
        if(lineWidth){line.points.push([xp,yp]);}
      } 
      if(area){
        Area = {points:line.points.slice(),fill:color,opacity:area};
        Area.points.splice(0,0,[line.points[0][0],0]);
        Area.points.push([line.points[line.points.length - 1][0],0]);
      }
      return {points,line,area:area?Area:[]};
    }
    getBarChart(stream,{color},barCounter,index){
      var rects = [];
      var {barAxis,barCount,barWidth} = this.details;
      for(var j = 0; j < stream.length; j++){
        var {x,y} = stream[j];
        var xp = this.getPercentByValue(x,'x'),yp = this.getPercentByValue(y,'y');
        if(xp === false){
          console.error(`RChart => Receive "${x}" in data[${index}].stream[${j}].x . but there is not "${x}" in X.labels array`)
          continue;
        }
        else{xp+='%';}
        if(yp === false){
          console.error(`RChart => Receive "${y}" in data[${index}].stream[${j}].y . but there is not "${y}" in Y.labels array`)
          continue;
        }
        else{yp *= -1; yp += '%';}
        if(barAxis === 'x'){
          rects.push({
            width:barWidth + '%',height:yp + '%',x:xp,fill:color,
            pivot:[barWidth * (barCount / 2 - barCounter) + '%',0],
            event:{mousedown:this.pointMouseDown.bind(this)},
            dataIndex:index,streamIndex:j
          })
        }
        else{
          rects.push({
            width:xp + '%',height:barWidth + '%',y:yp,fill:color,
            pivot:[0,barWidth * (barCount / 2 - barCounter) + '%'],
            event:{mousedown:this.pointMouseDown.bind(this)},
            dataIndex:index,streamIndex:j
          })
        }
      }
      return rects;
    } 
    getGridLine(value,axis,{color = 'red',lineWidth = 0.7,dash}){
      var range = this.details.range[axis];
      if(!range){return {}}
      var {start,end} = range,v = (value - start) * 100 / (end - start);
      var points = axis === 'x'?[[v + '%','0%'],[v + '%','-100%']]:[['0%',-v + '%'],['100%',-v + '%']];
      return {stroke:color,lineWidth,points,type:'line',dash}
    }
    getGridLines(axis){
      var range = this.details.range[axis];
      if(!range){return []}
      var {start,step,end} = range,{gridColor} = this.state[axis.toUpperCase()];
      var value = Math.round((start - step) / step) * step,gridLines = [];
      while (value <= end) { 
        if(value >= start){gridLines.push(this.getGridLine(value,axis,{color:gridColor}))} 
        value += step;  
      } 
      return gridLines; 
    }
    getElements(){ 
      var points = [],lines = [],rects = [],areas = []; 
      var {data} = this.props;
      var {X,Y} = this.state;
      var {barAxis} = this.details;
      var xGridLines = X.gridColor?this.getGridLines('x'):[];
      var yGridLines = Y.gridColor?this.getGridLines('y'):[]; 
      var xIndicator = X.indicator?[this.getGridLine(X.indicator.value,'x',X.indicator)]:[];
      var yIndicator = Y.indicator?[this.getGridLine(Y.indicator.value,'y',X.indicator)]:[];
      var barCounter = 0; 
      for(var i = 0; i < data.length; i++){  
        let {stream,type:chartType = 'line',color = '#000',show = true} = data[i];
        if(!show){continue;}
        if(chartType === 'line'){
          var result = this.getLineChart(stream,data[i],i);
          points = points.concat(result.points) 
          lines = lines.concat(result.line) ;
          areas = areas.concat(result.area);
        } 
        else if(chartType === 'bar' && barAxis){
          var result = this.getBarChart(stream,data[i],barCounter,i);
          rects = rects.concat(result);
          barCounter++;
        } 
      }
      return xGridLines.concat(yGridLines,rects,areas,lines,points,xIndicator,yIndicator);
    }
    componentDidMount(){this.setState({})}
    getDetails(){
      var {data,barWidth = 80} = this.props,{X,Y} = this.state,d = this.details; 
      if(!d.type){ 
        d.type = this.getType(X,Y); 
        //تایین محوری که پایه ی بار چارت روی آن بنا می شود
        d.barAxis = d.type.x === 'string'?'x':(d.type.y === 'string'?'y':false);
        //تایین محوری که ادیت چارت در راستای آن انجام می شود
        d.editAxis = d.type.x === 'string'?'y':(d.type.y === 'string'?'x':'y');
        this.getPercentByValue = (value,axis)=>{
          let {start,end} = d.range[axis],Value; 
          if(d.type[axis] === 'number'){
            if(isNaN(value)){return 'number error'}  
            Value = value; 
          }
          else{
            Value = axis === 'x'?X.labels.indexOf(value):Y.labels.indexOf(value);
            if(Value === -1){return 'string error';}
          }
          return 100 * (Value - start) / (end - start) 
        };
        this.getValueByPercent = (p,axis)=>{
          if(!d.range[axis]){return '';}
          let {start,end} = d.range[axis],Value = (end - start) * p / 100;
          if(d.type[axis] === 'number'){return Math.round(Value + start)}
          else{return (axis === 'x'?X:Y).labels[Math.round(Value - 0.5)]}
        }
      } //نوع چارت و تابع گرفتن درصد با مقدار یکبار تایین می شود
      if(this.setLimit !== false){this.details.limit = this.getLimit(data,X,Y);}  
      this.details.range = this.getRange(X,Y); 
      d.barCount = data.filter((d)=>d.type === 'bar').length;
      if(d.barAxis){
        d.barWidth = barWidth / d.range[d.barAxis].count/d.barCount;
      }
    }
    changeFilter(p1,p2,axis){
      var obj = JSON.parse(JSON.stringify(this.state[axis])) 
      obj.filter = obj.labels?[obj.labels[p1],obj.labels[p2]]:[p1,p2];
      this.SetState({[axis]:obj});
    } 
    pointMouseDown({dataIndex,streamIndex}){
      let {data,edit} = this.props;
      if(!edit || !edit.enabled){return;}
      if(edit.callback){edit.callback({dataIndex,streamIndex}); return;}
      let stream = data[dataIndex].stream[streamIndex];
      this.setSetLimit(false);
      this.eventHandler('window','mousemove',$.proxy(this.pointMouseMove,this))
      this.eventHandler('window','mouseup',$.proxy(this.pointMouseUp,this))
      this.so = {dataIndex,streamIndex,y:this.mousePosition[1]}; 
      this.moved = false;
    }
    pointMouseMove(){
      var {data} = this.props,stream = data[this.so.dataIndex].stream[this.so.streamIndex];
      if(!this.moved){
        if(Math.abs(this.mousePosition[1] - this.so.y) < 8){return;}
        if(stream.y === this.mouseValue[1]){return;}
      }
      this.moved = true;
      stream.y = this.mouseValue[1];
      this.onChange(data)
    }
    pointMouseUp(){
      this.eventHandler('window','mousemove',this.pointMouseMove,'unbind')
      this.eventHandler('window','mouseup',this.pointMouseUp,'unbind');
      this.setSetLimit(true);
      var {data} = this.props;
      if(!this.moved){
        var stream = data[this.so.dataIndex].stream[this.so.streamIndex];
        this.SetState({
          popup:{type:'Edit Point',dataIndex:this.so.dataIndex,streamIndex:this.so.streamIndex,
            value:stream.y,mouseValue:this.mouseValue
          }
        })
      }
      else{this.onChange(data)}
    }
    mouseDown(){
      var {add} = this.props;
      if(!add || !add.enabled){return;}
      this.SetState({
        popup:{type:'Add Point',dataIndex:0,value:this.mouseValue[1],mouseValue:this.mouseValue}
      })
    }
    setSetLimit(state){this.setLimit = state;}
    closePopup(){this.SetState({popup:false})}
    zoomHover(e,state){
      e.stopPropagation();
      this.hoverAxis = state;
      if(this.zoomDown){return;}
      this.hadleShowSliders(state)
    }
    zoomMouseDown(){
      this.zoomDown = true;
    }
    zoomMouseUp(){
      this.zoomDown = false;
      if(this.hoverAxis){return;}
      this.hadleShowSliders(false)
    }
    hadleShowSliders(state){
      var container = $(this.dom.current);
      var filterSlider = container.find('.filterSlider');
      var labelSlider = container.find('.labelSlider');
      if(state){ 
        filterSlider.show();
        labelSlider.hide();
      }
      else{
        filterSlider.hide();
        labelSlider.show(); 
      }
    }
    render(){
      var {data,html,add} = this.props;  
      var {X,Y,popup} = this.state; 
      var {width:xWidth = 60,height:xHeight = 50} = X;
      var {width:yWidth = 50} = Y;
      this.getDetails(); 
      var d = this.details;
      var xType = d.type.x,yType = d.type.y,xRange = d.range.x,yRange = d.range.y;
      var xFilter = xRange?xRange.filter:undefined,yFilter = yRange?yRange.filter:undefined,items = d.width?this.getElements():[];
      return (
        <RChartContext.Provider value={{data,X,Y}}>
        <div className='r-chart' ref={this.dom}>
          {html && html(this.props)}
          <div className='r-chart-title'>
            {data.filter((d)=>d.title !== undefined).map((d,i)=>{
              let {show = true,color} = d;
              let style = show?{background:color}:{boxShadow:`inset 0 0 0 2px ${color}`};
              return (
                <div key={i} className='r-chart-title-item' onClick={()=>{
                  show = !show; d.show = show; this.onChange(data);
                }}>
                  <div className='r-chart-title-color' style={style}></div>
                  <div className='r-chart-title-text'>{d.title || 'untitle'}</div>
                </div>
              )
            })}
          </div>
        <div className='r-chart-container' style={this.getStyle(yWidth,xHeight)}>
          <div className='r-chart-popup-container'></div>
          {
            popup !== false &&
            <RChartEdit {...popup} 
              onChange={(obj)=>{
                for(let prop in obj){popup[prop] = obj[prop]}
                this.SetState({popup});
              }}
              onClose={this.closePopup.bind(this)} 
              onEdit={()=>{
                let {dataIndex,streamIndex,value} = popup;
                data[dataIndex].stream[streamIndex].y = value;
                this.onChange(data)
                this.closePopup();
              }}
              onAdd={()=>{
                var {dataIndex,mouseValue,value} = popup; 
                var stream = data[dataIndex].stream
                if(xType === 'string'){
                  var addObject = {x:mouseValue[0],y:value},addIndex;
                  var index = this.binerySearch(stream,X.labels.indexOf(this.mouseValue[0]),(m)=>X.labels.indexOf(m.x))
                  if(index === Infinity){addIndex = stream.length;}
                  else if(index === -Infinity){addIndex = 0;}
                  else if(Array.isArray(index)){addIndex = index[1];}
                  if(add.callback){
                    add.callback({object:addObject,dataIndex,streamIndex:addIndex})
                  } 
                  else{ 
                    stream.splice(addIndex,0,addObject) 
                    this.onChange(data)
                  }
                }
                this.closePopup();
              }}
              onRemove={()=>{ 
              }}
            />
          }
          <div className='r-chart-axis r-chart-axis-y' 
            onMouseEnter={(e)=>{this.zoomHover(e,true)}} onMouseLeave={(e)=>{this.zoomHover(e,false)}}> 
            {
              Y.show !== false && yRange &&
              <RSlider {...this.slider} direction='top' start={yRange.start} end={yRange.end}
                label={this.getLabelConfig('y',Y)}
              />
            } 
            {
              Y.zoom && yFilter &&
              <RSlider direction='top' start={yFilter.start} end={yFilter.end} className='filterSlider'
                points={[{value:yFilter.p1},{value:yFilter.p2,fillStyle:{width:'3px',background:'#eee'}}]}
                editValue={(point)=>yType === 'string'?Y.labels[point.value]:point.value}
                ondrag={({points})=>this.changeFilter(points[0].value,points[1].value,'Y')}
                onmousedown={this.zoomMouseDown.bind(this)}
                onmouseup={this.zoomMouseUp.bind(this)}
                {...this.getZoomStyle('y')}
              />
            }
          </div> 
          <div className='r-chart-canvas'>
            <RCanvas 
              getSize={(width,height)=>{this.details.width = width; this.details.height = height;}} 
              axisPosition={['0%','100%']}
              items={items}
              mouseMove={(e,[x,y,px,py])=>{
                this.mousePosition = [x,y,px,py];
                this.popupPosition = [x + yWidth,d.height + y];
                this.mouseValue = [this.getValueByPercent(px,'x'),this.getValueByPercent(-py,'y')]
                var container = $(this.dom.current).find('.r-chart-popup-container');
                var popup = container.find('.r-chart-popup');
                container.css({left:this.popupPosition[0],top:this.popupPosition[1]});
                container.html('<div class="r-chart-popup">' + this.mouseValue[0]  + '  ' + this.mouseValue[1] + '</div>');
              }}
              mouseDown={this.mouseDown.bind(this)}
            />
          </div>
          <div className='r-chart-corner'></div>
          <div className='r-chart-axis r-chart-axis-x' 
            onMouseEnter={(e)=>{this.zoomHover(e,true)}} onMouseLeave={(e)=>{this.zoomHover(e,false)}}>
            {
              X.show !== false && xRange && 
              <RSlider {...this.slider} start={xRange.start} end={xRange.end}
                label={this.getLabelConfig('x',X)} 
              />
            }
            {
              X.zoom && xFilter &&
              <RSlider start={xFilter.start} end={xFilter.end} className='filterSlider'
                points={[{value:xFilter.p1},{value:xFilter.p2,fillStyle:{height:'3px',background:'#eee'}}]}
                editValue={(point)=>xType === 'string'?X.labels[point.value]:point.value}
                ondrag={({points})=>this.changeFilter(points[0].value,points[1].value,'X')}
                onmousedown={this.zoomMouseDown.bind(this)}
                onmouseup={this.zoomMouseUp.bind(this)}
                {...this.getZoomStyle('x')}
              />
            }
          </div>  
        </div>
        </div>
        </RChartContext.Provider>
      )
    }
  }
 RChart.defaultProps = {
    data:[],X:{},Y:{}
 }

 class RChartEdit extends Component{
   static contextType = RChartContext;


   render(){
     var {type,onChange,onClose,mouseValue,onAdd,onEdit,dataIndex,value,} = this.props;
     var {data,X,Y} = this.context;
     return (
       <div className='r-chart-edit'>
          <div className='r-chart-edit-backdrop'></div>
          <div className='r-chart-edit-header'>
            <div className='r-chart-edit-title'>{type}</div>
            <div className='r-chart-edit-close' onClick={onClose}></div>
          </div>
          <div className='r-chart-edit-item'>
            <div className='r-chart-edit-data-name'>
              <div style={{background:data[dataIndex].color}}></div>
              <select value={dataIndex} onChange={(e)=>onChange({dataIndex:e.target.value})}>
                {
                  type === 'Add Point' &&
                  data.map((d,i)=><option key={i} value={i}>{d.title || 'untitle'}</option>)
                }
                {
                  type === 'Edit Point' &&
                  <option key={dataIndex} value={dataIndex}>{data[dataIndex].title || 'untitle'}</option>
                }
              </select>
            </div>
            <div className='r-chart-edit-form'>
              <div className="r-chart-edit-label">{(X.title || 'X untitle') + ' : '}</div>
              <div className="r-chart-detail-value">{mouseValue[0]}</div>
            </div>
            <div className='r-chart-edit-form'>
              <div className="r-chart-edit-label">{(Y.title || 'Y untitle') + ' : '}</div>
              <input 
                className='r-chart-edit-value' type='number' value={value} 
                onChange={(e)=>onChange({value:e.target.value})}
              />
            </div>
            <button className='r-chart-edit-button' onClick={type === 'Add Point'?onAdd:onEdit}>{type}</button>
          </div>
        </div>
     )
   }
 }
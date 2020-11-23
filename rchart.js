import React,{Component,createRef,createContext} from 'react';
import RSlider from 'r-range-slider';
import RCanvas from './r-canvas';
import $ from 'jquery';
import './index.css';
import {string_getRange,number_getRange,getPercentByValue,getValueByPercent,getLimitTypeNumber,eventHandler} from './functions';

var RChartContext = createContext();
 export default class RChart extends Component{
    constructor(props){
      super(props);
      this.mouseDownDetail = {};
      var {data,filter} = this.props;
      var preventData = {};
      for(var i = 0; i < data.length; i++){
        let d = data[i];
        if(d.title === undefined){continue;}
        preventData[d.title] = false;
      }
      this.state = {popup:false,preventData,filter};
      this.dom = createRef();
      this.details = {getRange:{}};
      $('body').on('mouseout','.r-chart-canvas',()=>{$('.r-chart-popup-container').html('')})
      if('ontouchstart' in document.documentElement){
        eventHandler('window','mouseup',()=>{$('.r-chart-popup-container').html('')})
      }
    }
    translate(value){
      var dictionary = {
        'Add.Point':{en:'Add Point',fa:'افزودن نقطه'},
        'Edit.Point':{en:'Edit Point',fa:'ویرایش نقطه'},
        'Remove.Point':{en:'Remove Point',fa:'حذف نقطه'},
        'Add':{en:'Add',fa:'افزودن'},
        'Edit':{en:'Edit',fa:'ویرایش'},
        'Remove':{en:'Remove',fa:'حذف'},
        'Close':{en:'Close',fa:'بستن'},
      }
      return dictionary[value][this.props.globalization];
    }
    getStyle(x,y){
      return {
        gridTemplateColumns:`${x}px auto`,
        gridTemplateRows:`auto ${y}px`,
        direction:'ltr'
      }
    }
    getLimit(data,X,Y){
      var xLimit = X.labels?[0,X.labels.length - 1]:getLimitTypeNumber(data,'x');
      var yLimit = Y.labels?[0,Y.labels.length - 1]:getLimitTypeNumber(data,'y');
      return {x:xLimit,y:yLimit};
    }
    
    getClient(e){
      return 'ontouchstart' in document.documentElement?{x: e.changedTouches[0].clientX,y:e.changedTouches[0].clientY }:{x:e.clientX,y:e.clientY}
    }
    SetState(obj){this.setState(obj)}
    onChange(data){
      var {onChange} = this.props;
      onChange({data});
    }
    getLineChart({stream,fill = '#fff',color = '#000',pointRadius = 4,lineWidth = 2,area,dash,title,editable},index){ 
      var points = [],line = {points:[],lineWidth,stroke:color,dash},Area;
      for(var j = 0; j < stream.length; j++){
        let {x,y,pointRadius:PointRadius,lineWidth:LineWidth,fill:Fill} = stream[j];  
        if(x === null || y === null){continue;}
        var xp = getPercentByValue(x,'x',this.details),yp = getPercentByValue(y,'y',this.details);
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
            x:xp,y:yp,
            items:[
              {r:this.props.clickRadius,fill:'transparent',onMouseDown:this.pointMouseDown.bind(this),dataIndex:index,streamIndex:j,value:{x,y}},
              {
                r: radius,lineWidth:LineWidth || lineWidth * 2,fill:Fill || fill,
                stroke:color,
                
              }
          ]})
        }
        if(lineWidth){line.points.push([xp,yp]);}
      } 
      if(area){
        Area = {points:line.points.slice(),fill:color,opacity:area};
        Area.points.splice(0,0,[line.points[0][0],0]);
        Area.points.push([line.points[line.points.length - 1][0],0]);
      }
      return {points,line,area:area?Area:[],type:'line',title,index,editable};
    }
    getBarChart({color,title,editable,stream},barCounter,index){
      var rects = [];
      var {barAxis,barCount,barWidth} = this.details;
      for(var j = 0; j < stream.length; j++){
        var {x,y} = stream[j];
        var xp = getPercentByValue(x,'x',this.details),yp = getPercentByValue(y,'y',this.details);
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
            onMouseDown:this.pointMouseDown.bind(this),
            dataIndex:index,streamIndex:j
          })
        }
        else{
          rects.push({
            width:xp + '%',height:barWidth + '%',y:yp,fill:color,value:{x,y},
            pivot:[0,barWidth * (barCount / 2 - barCounter) + '%'],
            onMouseDown:this.pointMouseDown.bind(this),
            dataIndex:index,streamIndex:j
          })
        }
      }
      return {rects,type:'bar',title,index,editable};
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
      var {start,step,end} = range,{gridColor} = this.props[axis.toUpperCase()];
      var value = Math.round((start - step) / step) * step,gridLines = [];
      while (value <= end) { 
        if(value >= start){gridLines.push(this.getGridLine(value,axis,{color:gridColor}))} 
        value += step;  
      } 
      return gridLines; 
    }
    getElements(){ 
      var points = [],lines = [],rects = [],areas = [],Shapes = []; 
      var {data,X,Y} = this.props;
      var {preventData} = this.state;
      var {barAxis} = this.details;
      var xGridLines = X.gridColor?this.getGridLines('x'):[];
      var yGridLines = Y.gridColor?this.getGridLines('y'):[]; 
      var xIndicator = X.indicator?[this.getGridLine(X.indicator.value,'x',X.indicator)]:[];
      var yIndicator = Y.indicator?[this.getGridLine(Y.indicator.value,'y',X.indicator)]:[];
      var barCounter = 0; 
      this.data = [];
      for(var i = 0; i < data.length; i++){  
        let {title,stream,type:chartType = 'line',color = '#000',shapes} = data[i];
        if(preventData[title]){continue;}
        if(chartType === 'line'){
            var result = this.getLineChart(data[i],i);
            points = points.concat(result.points); 
            lines = lines.concat(result.line) ; 
            areas = areas.concat(result.area);
            this.data.push(JSON.parse(JSON.stringify(result)));
        } 
        else if(chartType === 'bar' && barAxis){
          var result = this.getBarChart(data[i],barCounter,i);
          this.data.push(result);
          rects = rects.concat(result.rects);
          barCounter++;
        }
        Shapes = shapes?Shapes.concat(this.getShapes(shapes(data,X,Y))):Shapes; 
      }
      this.elements = {arcs:points,rects};
      return xGridLines.concat(yGridLines,rects,areas,lines,points,xIndicator,yIndicator,Shapes);
    }
    getShapes(shapes){
      var Shapes = [];
      for(var i = 0; i < shapes.length; i++){
        let shape = shapes[i]
        let obj = {...shape};
        if(shape.points){
          obj.points = [];
          for(var j = 0; j < shape.points.length; j++){
            let {x,y} = shape.points[j];
            obj.points.push([getPercentByValue(x,'x',this.details) + '%',-getPercentByValue(y,'y',this.details) + '%'])
          }
        }
        else if(shape.r){
          let {x,y} = shape;
          obj.x = getPercentByValue(x,'x',this.details) + '%';
          obj.y = -getPercentByValue(y,'y',this.details) + '%';   
        }
        Shapes.push(obj)  
      }
      return Shapes;
    }
    componentDidMount(){this.SetState({})}
    getRange(X,Y){
      var {type} = this.details;
      var xRange = type.x === 'number'?
      number_getRange('x',this.details):
      string_getRange('x',this.details);
      var yRange = type.y === 'number'?
      number_getRange('y',this.details):
      string_getRange('y',this.details);
      return {x:xRange,y:yRange};
    }
    getDetails(){
      var {X,Y,data,barWidth = 80,precision} = this.props,d = this.details; 
      if(!d.type){ 
        d.filter = this.state.filter;
        d.Axis = {x:X,y:Y};
        d.type = {x:X.labels?'string':'number',y:Y.labels?'string':'number'}; 
        //تایین محوری که پایه ی بار چارت روی آن بنا می شود
        d.barAxis = d.type.x === 'string'?'x':(d.type.y === 'string'?'y':false);
        //تایین محوری که ادیت چارت در راستای آن انجام می شود
        d.editAxis = d.type.x === 'string'?'y':(d.type.y === 'string'?'x':'y');
      } //نوع چارت و تابع گرفتن درصد با مقدار یکبار تایین می شود
      d.precision = precision;
      if(this.mouseDownDetail.target !== 'point'){this.details.limit = this.getLimit(data,X,Y);}  
      this.details.range = this.getRange(X,Y); 
      d.barCount = data.filter((d)=>d.type === 'bar').length;
      if(d.barAxis){
        d.barWidth = barWidth / d.range[d.barAxis].count/d.barCount;
      }
    }
    changeFilter(p1,p2,axis){
      var labels = this.props[axis.toUpperCase()].labels; 
      var {filter} = this.state;
      filter[axis] = labels?[labels[p1],labels[p2]]:[p1,p2];
      this.SetState({filter});
    } 
    pointMouseDown(e,pos,obj){
      var {dataIndex,streamIndex} = obj;
      let {data,edit,remove} = this.props;
      if(data[dataIndex].editable === false){return;}
      if(!edit && !remove){return;}
      this.getMouseDetail(pos);
      var stream = data[dataIndex].stream[streamIndex];
      this.mouseDownDetail = {target:'point',x:stream.x,y:stream.y};
      eventHandler('window','mousemove',$.proxy(this.pointMouseMove,this))
      eventHandler('window','mouseup',$.proxy(this.pointMouseUp,this))
      this.so = {dataIndex,streamIndex,y:this.mouseDetail.y}; 
      this.moved = false;
    }
    pointMouseMove(){
      var {data,edit} = this.props,stream = data[this.so.dataIndex].stream[this.so.streamIndex];
      if(!this.moved){
        if(Math.abs(this.mouseDetail.y - this.so.y) < 8){return;}
        if(stream.y === this.mouseDetail.vy){return;}
      }
      this.moved = true;
      if(!edit){return;}
      edit({dataIndex:this.so.dataIndex,streamIndex:this.so.streamIndex,value:this.mouseDetail.vy});

    }
    pointMouseUp(){
      eventHandler('window','mousemove',this.pointMouseMove,'unbind')
      eventHandler('window','mouseup',this.pointMouseUp,'unbind');
      this.mouseDownDetail = {};
      var {data,edit,remove,onDragEnd} = this.props;
      if(!this.moved){
        var stream = data[this.so.dataIndex].stream[this.so.streamIndex];
        var title = !edit?this.translate('Remove.Point'):this.translate('Edit.Point');
        this.SetState({
          popup:{
            dataIndex:this.so.dataIndex,streamIndex:this.so.streamIndex,
            dataIndexes:[this.so.dataIndex],
            dynamicValue:stream.y,staticValue:this.mouseDetail.vx,
            onEdit:edit,onRemove:remove,title
          }
        })
      }
      else if(onDragEnd){
        var changes = {dataIndex:this.so.dataIndex,streamIndex:this.so.streamIndex,value:this.mouseDetail.vy};
        onDragEnd(changes)
      }
      else if(edit){
        var changes = {dataIndex:this.so.dataIndex,streamIndex:this.so.streamIndex,value:this.mouseDetail.vy};
        edit(changes)
      }
    }
    //کلیک روی بک گراند چارت
    mouseDown(){
      var {add,multiselect,addPopup} = this.props;
      // اگر مد افزودن فعال بود و در موقعیت فعلی موس دیتا یا دیتا هایی آمادگی دریافت نقطه جدید در این موقعیت را داشتند
      this.mouseDownXValue = this.mouseDetail.vx;
      if(add && this.mouseDetail.addDataIndexes.length){
        eventHandler('window','mouseup',$.proxy(this.addMouseUp,this));
      }
      if(multiselect && this.mouseDetail.target !== 'point'){
        this.multiselect = {};
        this.multiselect.selectRect = $(this.dom.current).find('.r-chart-multiselect');
        this.multiselect.selectRect.css({display:'block',left:this.mouseDetail.px + '%',width:'0%'})
        eventHandler('window','mousemove',$.proxy(this.multiselectMove,this));
        eventHandler('window','mouseup',$.proxy(this.multiselectUp,this));
        this.multiselect.position = this.mouseDetail.px;
      }
    }
    addMouseUp(){
      var {add,addPopup} = this.props;
      eventHandler('window','mouseup',this.addMouseUp,'unbind');
      if(this.mouseDetail.vx !== this.mouseDownXValue){return;}
      if(addPopup === false){
          add({
            y:this.mouseDetail.vy,
            x:this.mouseDetail.vx,
          })
        } 
        else{
          this.SetState({
            popup:{
              type:'add',
              dataIndexes:this.mouseDetail.addDataIndexes,
              dataIndex:this.mouseDetail.addDataIndexes[0],
              dynamicValue:this.mouseDetail.vy,
              staticValue:this.mouseDetail.vx,
              onAdd:add,title:this.translate('Add.Point'),
            }
          })
        }
    }
    multiselectMove(){
      var m = this.multiselect,mp = this.mouseDetail.px;
      if(this.mouseDetail.vx === this.mouseDownXValue){return;}
      if(mp < m.position){m.end = m.position; m.start = mp;}
      else{m.start = m.position; m.end = mp;}
      m.selectRect.css({width:(m.end - m.start) + '%',left:m.start + '%'})
    }
    hideSelectRect(){
      if(!this.multiselect || !this.multiselect.selectRect){return;}
      this.multiselect.selectRect.css({display:'none'});
    }
    multiselectUp(){
      var {multiselect} = this.props;
      eventHandler('window','mousemove',this.multiselectMove,'unbind');
      eventHandler('window','mouseup',this.multiselectUp,'unbind');
      if(!this.multiselect.start || !this.multiselect.end || 
      Math.abs(this.multiselect.start - this.multiselect.end) < 3) {this.hideSelectRect(); return;}
      this.multiselect.points = this.getPointsBySelectRect();
      if(this.multiselect.points.length === 0){
        this.hideSelectRect();
        return;
      } 
      this.SetState({ 
        popup:{
          type:'multiselect',
          title:'Multi Select',
          points:this.multiselect.points 
        }
      })
    }
    getPointsBySelectRect(){
      var {preventData} = this.state;
      var {start,end} = this.multiselect;
      var result = [];
      for(var i = 0; i < this.data.length; i++){
        var {index,title,points,editable} = this.data[i];
        if(editable === false){continue;}
        if(preventData[title]){continue}
        for(var j = 0; j < points.length; j++){
          var x = parseFloat(points[j].x);
          if(x < start || x > end){continue;}
          result.push([index,j])
        }
      }
      return result;
    }
    closePopup(){
      this.SetState({popup:false})
      this.hideSelectRect();
    }
    zoomHover(e,axis){
      e.stopPropagation();
      var {X = {},Y = {}} = this.props;
      if(axis === 'x' && !X.zoom){return;}
      if(axis === 'y' && !Y.zoom){return;}
      this.hoverAxis = axis;
      if(this.zoomDown){return;}
      this.hadleShowSliders(axis)
    }
    zoomMouseDown(){
      this.zoomDown = true;
    }
    zoomMouseUp(){
      this.zoomDown = false;
      if(this.hoverAxis){return;}
      this.hadleShowSliders(false)
    }
    hadleShowSliders(axis){
      if(axis){ 
        var container = $(this.dom.current).find('.r-chart-axis-' + axis);
        var filterSlider = container.find('.filterSlider');
        var labelSlider = container.find('.labelSlider');
        filterSlider.show();
        labelSlider.hide();
      }
      else{
        var container = $(this.dom.current);
        var filterSlider = container.find('.filterSlider');
        var labelSlider = container.find('.labelSlider');
        filterSlider.hide();
        labelSlider.show(); 
      }
    }
    getPopup(popup){
      var d = this.details;
      return <RChartEdit {...popup} 
        onChange={(obj)=>{
          for(let prop in obj){popup[prop] = obj[prop]}
          this.SetState({popup});
        }}
        onClose={this.closePopup.bind(this)} 
      />
    }
    getHeader(yWidth){
      var {data} = this.props,{preventData} = this.state;
      return (
        <div className='r-chart-title' style={{paddingLeft:yWidth + 'px'}}>
            {data.filter((d)=>d.title !== undefined).map((d,i)=>{
              let {color,title} = d;
              let style = !preventData[d.title]?{background:color}:{boxShadow:`inset 0 0 0 2px ${color}`};
              return (
                <div key={i} className='r-chart-title-item' onClick={()=>{
                  preventData[title] = preventData[title] === undefined?false:preventData[title];
                  preventData[title] = !preventData[title];
                  this.SetState({preventData})
                }}>
                  <div className='r-chart-title-color' style={style}></div>
                  <div className='r-chart-title-text'>{d.title || 'untitle'}</div>
                </div>
              )
            })}
          </div>
      )
    }
    getLabelSlider(axis){
      var type = this.details.type[axis],{start,end,step} = this.details.range[axis]; 
      var labelStyle = {x:{top:'24px'},y:{left:'unset',right:'16px',justifyContent:'flex-end'}};
      var {rotate = 0,labels,editLabel} = this.props[axis.toUpperCase()];
      debugger;
      return (
        <RSlider 
          className='labelSlider' editable={false} showValue={false}
          style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',padding:0,zIndex:-1}}
          pointStyle={{display:'none'}} lineStyle={{display:'none'}}
          direction={axis === 'x'?'right':'top'} start={start} end={end}
          label={{
            step,rotate:axis === 'y'?0:rotate,
            edit:type === 'string'?((value)=>editLabel?editLabel(labels[value]):labels[value]):undefined,
            style:{fontSize:'inherit',...labelStyle[axis]}
          }}
        />
      ) 
    }
    getFilterSlider(axis){  
      var color = '#eee';
      var {labels} = this.props[axis.toUpperCase()]; 
      var type = this.details.type[axis],{p1,p2,start,end} = this.details.range[axis].filter;
      var points = [{value:p1},{value:p2,fillStyle:{[axis === 'y'?'width':'height']:'1px',background:color}}]
      var style = {
        x:{width:'100%',height:'16px',padding:'0 12px',top:'2px',opacity:1},
        y:{width:'16px',height:'100%',padding:'12px 0',right:'0px',opacity:1}
      } 
      return (
        <RSlider direction={axis === 'x'?'right':'top'} start={start} end={end} className='filterSlider'
          points={points}
          editValue={(point)=>type === 'string'?labels[point.value]:point.value} 
          ondrag={({points})=>this.changeFilter(points[0].value,points[1].value,axis)}
          style={{position:'absolute',...style[axis]}}
          lineStyle={{display:'none'}}
          pointStyle={{width:'10px',height:'10px',borderRadius:'0px',background:'#fff',border:'2px solid ' + color}}
          showValue={true}
        />
      )
    }
    // getFilterSlider(axis,xHeight,yWidth){  
    //   var {labels} = this.props[axis.toUpperCase()]; 
    //   var type = this.details.type[axis],{p1,p2,start,end} = this.details.range[axis].filter;
    //   var points = [{value:p1},{value:p2,fillStyle:{[axis === 'y'?'width':'height']:'100%',background:'#f5f5f5'}}]
    //   var style = {
    //     x:{width:'100%',height:'100%',padding:'0 12px',top:'2px',opacity:.7,background:''},
    //     y:{width:'100%',height:'100%',padding:'12px 0',right:'0px',opacity:.7,background:''}
    //   } 
    //   var pointStyle = {
    //     x:{width:'16px',height:xHeight + 'px',borderRadius:0,background:'none'},
    //     y:{width:yWidth + 'px',height:'16px',borderRadius:0,background:'none'}
    //   }
    //   return (
    //     <RSlider direction={axis === 'x'?'right':'top'} start={start} end={end} className='filterSlider'
    //       points={points}
    //       editValue={(point)=>type === 'string'?labels[point.value]:point.value} 
    //       ondrag={({points})=>this.changeFilter(points[0].value,points[1].value,axis)}
    //       style={{position:'absolute',...style[axis]}}
    //       lineStyle={{display:'none'}}
    //       pointStyle={pointStyle[axis]}
    //       showValue={true}
    //     />
    //   )
    // }
    getStreamIndexByLabel({stream},label){
      for(let j = 0; j < stream.length; j++){if(stream[j].x === label){return j}}
      return false;
    }
    getAddableDataIndexes(label){
      if(label === undefined){return []}
      var {data} = this.props;
      var indexes = [];
      for(var i = 0; i < data.length; i++){
        var {editable} = data[i];
        if(editable === false){continue;}
        if(this.getStreamIndexByLabel(data[i],label) === false){
          indexes.push(i);
        }
      }
      return indexes;
    }
    getNearestPointToMouse(vx,vy){
      var {data} = this.props;
      var res = false;
      var dif = Infinity;
      for(var dataIndex = 0; dataIndex < data.length; dataIndex++){
        var streamIndex = this.getStreamIndexByLabel(data[dataIndex],vx);
        if(streamIndex === false){continue;}
        var stream = data[dataIndex].stream[streamIndex];
        var Dif = Math.abs(stream.y - vy);
        if(Dif <= dif){
          res = {vx:stream.x,vy:stream.y,dataIndex,streamIndex};
          dif = Dif;
        }
      }
      return res;
    }
    getMouseDetail([x,y,px,py]){
        var {add,Y} = this.props;
        var {width:yWidth = 50} = Y;
        var vx = this.mouseDownDetail.target === 'point'?this.mouseDownDetail.x:getValueByPercent(px,'x',this.details);
        console.log(vx);
        var vy = getValueByPercent(-py,'y',this.details);
        var popupPosition = {x:x + yWidth,y:y + this.details.height}; 
        var nearestPoint = this.getNearestPointToMouse(vx,vy);
        var addDataIndexes = add && this.mouseDownDetail.target !== 'point'?this.getAddableDataIndexes(vx):[];
        this.mouseDetail = {x,y,px,py,vx,vy,nearestPoint,addDataIndexes,popupPosition}
    }
    render(){
      var {X,Y,data,html,add,edit,multiselect,style,rtl} = this.props;  
      var {popup} = this.state; 
      var {height:xHeight = 50} = X;
      var {width:yWidth = 50} = Y;
      this.getDetails();
      var d = this.details;
      var xRange = d.range.x,yRange = d.range.y;
      var items = d.width?this.getElements():[];
      return (
        <RChartContext.Provider value={{data,X,Y,multiselect,translate:this.translate.bind(this),rtl}}>
          <div className='r-chart' ref={this.dom} style={style}>
            {this.getHeader(yWidth)}
            <div className='r-chart-container' style={this.getStyle(yWidth,xHeight)}>
              <div className={'r-chart-popup-container' + (add?' r-chart-add-popup':'')}></div>
              {popup !== false && this.getPopup(popup)}
              <div className='r-chart-axis r-chart-axis-y'> 
                {yRange && this.getLabelSlider('y')} 
                {yRange && this.getFilterSlider('y',xHeight,yWidth)}
              </div> 
              <div className='r-chart-canvas'>
                {html && html(this.elements,d)} 
                <div className='r-chart-multiselect'></div>
                <RCanvas 
                  getSize={(width,height)=>{this.details.width = width; this.details.height = height;}} 
                  axisPosition={['0%','100%']}
                  items={items}
                  events={{
                    onMouseMove:(e,pos)=>{
                      this.getMouseDetail(pos);
                      var {x,y,px,py,vx,vy,nearestPoint,addDataIndexes,popupPosition} = this.mouseDetail;
                      
                      var addIndicator = '';
                      var container = $(this.dom.current).find('.r-chart-popup-container');
                      
                      if(addDataIndexes.length){
                          addIndicator = addDataIndexes.length?`<div class="add-indicator" style="background:${data[addDataIndexes[0]].color}">+</div>`:''
                          container.css({left:popupPosition.x,top:popupPosition.y});
                          container.html('<div class="r-chart-popup">' + addIndicator + vx  + '  ' + vy + '</div>');
                      }
                      else{
                        if(nearestPoint){
                          let left = getPercentByValue(nearestPoint.vx,'x',this.details) * d.width / 100 + yWidth;
                          let bottom = getPercentByValue(nearestPoint.vy,'y',this.details) * d.height / 100 + xHeight;
                          container.css({left,top:'unset',bottom});
                          container.html('<div class="r-chart-popup">' + nearestPoint.vx  + '  ' + nearestPoint.vy + '</div>');
                        }
                        else{
                          //$('.r-chart-popup-container').html('');
                        }
                      }
                    },
                    onMouseDown:this.mouseDown.bind(this)
                  }}
                  
                />
              </div>
              <div className='r-chart-corner'></div>
              <div className='r-chart-axis r-chart-axis-x'>
                {xRange && this.getLabelSlider('x')}
                {xRange && this.getFilterSlider('x',xHeight,yWidth)}
              </div>  
            </div>
          </div>
        </RChartContext.Provider>
      )
    }
  }
 RChart.defaultProps = {data:[],X:{},Y:{},filter:{x:[],y:[]},globalization:'en',precision:0,clickRadius:12}

 class RChartEdit extends Component{
   static contextType = RChartContext;
   constructor(props){
     super(props);
     this.dom = createRef();
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
  componentDidMount(){
    $(this.dom.current).find('input').eq(0).focus().select();
  }
   render(){
     var {points,type,title,onChange,onClose,onAdd,onEdit,onRemove,dataIndex,streamIndex,dynamicValue,staticValue,dataIndexes = []} = this.props;
     var {data,X,Y,multiselect = {},translate,rtl} = this.context;
     var {items = [],actions = []} = multiselect;
     return (
       <div className='r-chart-edit' ref={this.dom} style={{direction:rtl?'rtl':'ltr'}}>
          <div className='r-chart-edit-backdrop'></div>
          <div className='r-chart-edit-header'>
            <div className='r-chart-edit-title'>{title}</div>
            <div className='r-chart-edit-close' onClick={onClose}></div>
          </div>
          <div className='r-chart-edit-body'>
            <div className='r-chart-edit-data-list'>
              {
                dataIndexes.map((index)=>{
                  if(data[index].editable === false){return false;}
                  return (
                    <div 
                      onClick={()=>onChange({dataIndex:index})}
                      className={`r-chart-edit-data-list-item${dataIndex === index?' active':''}`} 
                      key={index} 
                      style={{color:data[index].color,background:data[index].color}} 
                    ></div>
                  )
                }).filter((d)=>d !== false)
              }
            </div>
            {
              staticValue !== undefined &&
              <div className='r-chart-edit-item'>
                <div className="r-chart-edit-label">{(X.title || 'X untitle') + ' : '}</div>
                <div className="r-chart-detail-value">{staticValue}</div>
              </div>
            }
            {
              dynamicValue !== undefined &&
              <div className='r-chart-edit-item'>
                <div className="r-chart-edit-label">{(Y.title || 'Y untitle') + ' : '}</div>
                <input 
                  className='r-chart-edit-tag' type='number' value={dynamicValue} 
                  onChange={(e)=>{
                    if(!onEdit && !onAdd){return;}
                    onChange({dynamicValue:e.target.value})
                  }}
                />
              </div>
            }
            {
              type === 'multiselect' &&
              items.filter((item)=>item.show !== false).map((item,i)=>{
                return ( 
                  <div key={i} className='r-chart-edit-item'>
                    <div className="r-chart-edit-label">{item.title}</div> 
                    {
                      item.type === 'number' &&
                      <input className='r-chart-edit-tag' type='number' value={item.value} onChange={item.onChange}/>      
                    }
                    {
                      item.type === 'select' && 
                      <select  
                        className='r-chart-edit-tag' 
                        title={item.value}
                        onChange={item.onChange} 
                        defaultValue={item.value}>
                        {item.options.map((o,i)=><option key={i} value={o.value}>{o.text}</option>)}
                      </select>        
                    } 
                    {
                      item.type === 'checkbox' &&
                      <input type='checkbox' value={item.value} onChange={item.onChange}/>
                    }
                  </div>      
                )
              })
            }
          </div> 
          <div className='r-chart-edit-footer'>
          <button className='r-chart-edit-button' onClick={onClose} style={{flex:1}}>{translate('Close')}</button>
                { type === 'multiselect' &&
                  actions.filter((a)=>a.show !== false).map((a,i)=>{
                    return (
                      <button key={i} 
                        className='r-chart-edit-button' 
                        onClick={()=>{a.callback(points); onClose();}}
                      >{a.text}</button>    
                    )
                  }) 
                }
                {
                  onAdd && 
                  <button 
                    className='r-chart-edit-button' 
                    onClick={()=>{
                      let streamIndex;
                      let stream = data[dataIndex].stream;
                      var index = this.binerySearch(stream,X.labels.indexOf(staticValue),(m)=>X.labels.indexOf(m.x))
                      if(index === Infinity){streamIndex = stream.length;}
                      else if(index === -Infinity){streamIndex = 0;}
                      else if(Array.isArray(index)){streamIndex = index[1];}
                      onAdd({dataIndex,streamIndex,object:{x:staticValue,y:dynamicValue}}); 
                      onClose();
                    }}
                  >{translate('Add')}</button>
                }
                {
                  onRemove &&
                  <button 
                    className='r-chart-edit-button' 
                    onClick={()=>{onRemove({dataIndex,streamIndex}); onClose();}}
                  >{translate('Remove')}</button>
                }
                {
                  onEdit &&
                  <button 
                    className='r-chart-edit-button' 
                    onClick={()=>{onEdit({dataIndex,streamIndex,value:dynamicValue}); onClose();}}
                  >{translate('Edit')}</button>
                } 
            </div>
        </div>
     )
   }
 }
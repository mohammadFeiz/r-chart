import React,{Component,createRef,createContext} from 'react';
import RSlider from 'r-range-slider';
import RCanvas from 'r-canvas';
import $ from 'jquery';
import './index.css';
import {
  value_getRange,key_getRange,
  value_getLabel,key_getLabel,
  normal_getArea,reverse_getArea,
  value_getPercentByValue,key_getPercentByValue,
  value_getValueByPercent,key_getValueByPercent,getValueByPercent,
  value_changeFilter,key_changeFilter,
  getLimitTypeNumber,eventHandler,getShapes} from './functions';

var RChartContext = createContext();
 export default class RChart extends Component{
    constructor(props){
      super(props);
      this.mouseDownDetail = {};
      var {filter} = this.props;
      this.state = {popup:false,dataHide:{},filter};
      this.dom = createRef();
      this.details = {
        min:Infinity,max:-Infinity
      };
      $('body').on('mouseout','.r-chart-canvas',()=>{
        $('.r-chart-popup-container').html('');
        $('.r-chart-line').css({display:'none'})
      })
      if('ontouchstart' in document.documentElement){
        eventHandler('window','mouseup',()=>{
          $('.r-chart-popup-container').html('')
          $('.r-chart-line').css({display:'none'})
        })
      }
      this.getLimitTypeNumber = getLimitTypeNumber;
      this.key_getRange = key_getRange;
      this.value_getRange = value_getRange;
      this.key_getPercentByValue = key_getPercentByValue;
      this.value_getPercentByValue = value_getPercentByValue;
      this.key_getLabel = key_getLabel;
      this.value_getLabel = value_getLabel;
      this.key_getValueByPercent = key_getValueByPercent;
      this.value_getValueByPercent = value_getValueByPercent;
      this.key_changeFilter = key_changeFilter;
      this.value_changeFilter = value_changeFilter;
      this.getValueByPercent = getValueByPercent;
      this.normal_getArea = normal_getArea;
      this.reverse_getArea = reverse_getArea;
      this.translate = this.props.translate?(text)=>this.props.translate(text):(text)=>text;
    }
    getStyle(x,y){return {gridTemplateColumns:`${x}px auto`,gridTemplateRows:`auto ${y}px`,direction:'ltr'}}
    getKey({point,dataIndex,pointIndex}){
      let {getKey = ({point})=>point.key} = this.props;
      return getKey({point,dataIndex,pointIndex});
    }
    getValue({point,dataIndex,pointIndex}){
      let {getValue = ({point})=>point.value} = this.props;
      return getValue({point,dataIndex,pointIndex});
    }
    getClient(e){
      return 'ontouchstart' in document.documentElement?{x: e.changedTouches[0].clientX,y:e.changedTouches[0].clientY }:{x:e.clientX,y:e.clientY}
    }
    SetState(obj){this.setState(obj)}
    getLineChart(data,dataIndex){ 
      var {keys,hideInterfere} = this.props;
      var {points,color = '#000',lineWidth = 2,areaOpacity,dash,pointStyle,text} = data;
      if(!points || !Array.isArray(points) || points.length === 0){return;}
      var dataDetail = {...data,dataIndex,points:[],line:{type:'Line',points:[],lineWidth,stroke:color,dash},area:false,
      texts:[]}
      var space = -Infinity;
      for(let pointIndex = 0; pointIndex < points.length; pointIndex++){
        let point = points[pointIndex];
        let key = this.getKey({point,dataIndex,pointIndex}),
          value = this.getValue({point,dataIndex,pointIndex});
        point._key = key; point._value = value;
        if(key === null || value === null){continue;}
        if(!this.mouseDownDetail.target){
          point._keyIndex = keys.indexOf(key);
        }
        if(point._keyIndex === undefined){
            point._keyIndex = this.lastData[dataIndex].points[pointIndex]._keyIndex;
        }
        if(point._keyIndex === -1 || point._keyIndex === undefined){continue;}
        let px = this.getPercentByValue('x',point),py = this.getPercentByValue('y',point);
        
        this.keyDictionary[dataIndex][key] = pointIndex;
        if(pointStyle){
          let PointStyle = typeof pointStyle === 'function'?pointStyle({point,dataIndex,pointIndex}):pointStyle;
          let {radius,fill = '#fff',stroke = color,lineWidth:pointLineWidth = lineWidth,dash:pointDash,slice} = PointStyle;
          if(radius){
            if(hideInterfere){
              var center = this.details.canvasSize.x * px / 100;
              var left = center - radius - pointLineWidth / 2;
              if(left > space){         
                space = center + radius + pointLineWidth / 2;
                let Point = {
                  type:'Group',
                  x:px + '%',y:py + '%',
                  items:[
                    {type:'Arc',r:this.props.clickRadius,fill:'rgba(0,0,0,0)',onMouseDown:this.pointMouseDown.bind(this),dataIndex,pointIndex},
                    {type:'Arc',r: radius,lineWidth:pointLineWidth * 2,fill,stroke,dash:pointDash,slice}
                  ]
                }
                this.elements.points.push(Point);
                dataDetail.points.push(Point);
              }
            }
            else {
              let Point = {
                type:'Group',
                x:px + '%',y:py + '%',
                items:[
                  {type:'Arc',r:this.props.clickRadius,fill:'rgba(0,0,0,0)',onMouseDown:this.pointMouseDown.bind(this),dataIndex,pointIndex},
                  {type:'Arc',r: radius,lineWidth:pointLineWidth * 2,fill,stroke,dash:pointDash,slice}
                ]
              }
              this.elements.points.push(Point);
              dataDetail.points.push(Point);
            }
          }
        }
        if(text){
          let {value = '',fontSize = 16,color = '#444',left = 0,top = 0,rotate,align} = text({point,dataIndex,pointIndex});
          let Text = {type:'Group',x:px + '%',y:py + '%',rotate,items:[{type:'Text',text:value,fontSize,fill:color,x:left,y:top,align}]};
          this.elements.texts.push(Text);
          dataDetail.texts.push(Text);
        }
        dataDetail.line.points.push([px + '%',py + '%']);
      }
      if(lineWidth){this.elements.lines.push(dataDetail.line)}
      if(areaOpacity){
        dataDetail.area = this.getArea(dataDetail.line.points,color,areaOpacity)
        this.elements.areas.push(dataDetail.area)
      }
      this.dataDetails.push(dataDetail);
    }
    getBarChart(data,barCounter,dataIndex){
      var {color,points,text} = data;
      if(!points || !Array.isArray(points) || points.length === 0){return;}
      var {reverse,keys} = this.props;
      var dataDetail = {...data,dataIndex,rects:[],texts:[]}
      var {barCount,barWidth} = this.details;
      for(var pointIndex = 0; pointIndex < points.length; pointIndex++){
        let point = points[pointIndex];
        let key = this.getKey({point,dataIndex,pointIndex}),value = this.getValue({point,dataIndex,pointIndex});
        point._key = key; point._value = value;
        if(key === null || value === null){continue;}
        if(!this.mouseDownDetail.target){point._keyIndex = keys.indexOf(key);}
        if(point._keyIndex === undefined){point._keyIndex = this.lastData[dataIndex].points[pointIndex]._keyIndex;}
        if(point._keyIndex === -1 || point._keyIndex === undefined){continue;}
        var px = this.getPercentByValue('x',point);
        var py = this.getPercentByValue('y',point);
        px += '%';
        py += '%'
        if(px === false || py === false){continue;}
        this.keyDictionary[dataIndex][key] = pointIndex;
        if(!reverse){
          let rect = {
            type:'Rectangle',
            width:barWidth + '%',height:py,x:px,fill:color,
            pivot:[barWidth * (barCount / 2 - barCounter) + '%',0],
            onMouseDown:this.pointMouseDown.bind(this),
            dataIndex,pointIndex
          }
          this.elements.rects.push(rect);
          dataDetail.rects.push(rect);
        }
        else{
          let rect = {
            type:'Rectangle',
            width:px,height:barWidth + '%',y:py,fill:color,
            pivot:[0,barWidth * (barCount / 2 - barCounter) + '%'],
            onMouseDown:this.pointMouseDown.bind(this),
            dataIndex,pointIndex
          }
          this.elements.rects.push(rect);
          dataDetail.rects.push(rect);
        }
        if(text){
          let {value = '',fontSize = 16,color = '#444',left = 0,top = 0,rotate,align} = text({point,dataIndex,pointIndex});
          let Text = {type:'Group',x:px + '%',y:py + '%',rotate,items:[{type:'Text',text:value,fontSize,fill:color,x:left,y:top,align}]};
          this.elements.texts.push(Text);
          dataDetail.texts.push(Text);
        }
      }
      this.dataDetails.push(dataDetail);
    } 
    getGridLine(value,axis,{color = 'red',lineWidth = 0.7,dash,start:startLine,end:endLine}){
      var range = this.details.range[axis];
      if(!range){return {}}
      var {keys} = this.props;
      if(this.details.axisToD[axis] === 'key'){
        value = keys.indexOf(value);
        var {start,end} = range,v = (value - start) * 100 / (end - start);
        var startPercent = 0;
        var endPercent = 100;
        if(startLine !== undefined){
          let {start,end} = this.details.range[this.details.dToAxis['value']];
          startPercent = (startLine - start) * 100 / (end - start)
        }
        if(endLine !== undefined){
          let {start,end} = this.details.range[this.details.dToAxis['value']];
          endPercent = (endLine - start) * 100 / (end - start)
        }
      }
      else {
        var {start,end} = range,
        v = (value - start) * 100 / (end - start);
        var startPercent = 0;
        var endPercent = 100;
        if(startLine !== undefined){
          let {start,end} = this.details.range[this.details.dToAxis['key']];
          let index = keys.indexOf(startLine);
          startPercent = (index - start) * 100 / (end - start)
        }
        if(endLine !== undefined){
          let {start,end} = this.details.range[this.details.dToAxis['key']];
          let index = keys.indexOf(endLine);
          endPercent = (index - start) * 100 / (end - start)
        }

      }
      
      var points = axis === 'x'?[
        [v + '%',startPercent + '%'],
        [v + '%',endPercent + '%']
      ]:[
        [startPercent + '%',v + '%'],
        [endPercent + '%',v + '%']
      ];
      return {stroke:color,lineWidth,points,type:'Line',dash}
    }
    getGridLines(axis){
      var color = this.props[this.details.axisToD[axis] + '_gridColor'];
      if(!color){return []}
      var range = this.details.range[axis];
      if(!range){return []}
      var {start,step,end} = range;
      var value = Math.round((start - step) / step) * step,gridLines = [];
      while (value <= end) { 
        if(value >= start){gridLines.push(this.getGridLine(value,axis,{color}))} 
        value += step;  
      } 
      return gridLines; 
    }
    getLines(axis,lines = []){
      var result = [];
      var Lines = typeof lines === 'function'?lines(this.props.data,this.props.keys):lines;
      for(var i = 0; i < Lines.length; i++){
        var {dash,lineWidth,color,start,end} = Lines[i];
        var a = Lines[i][this.details.axisToD[axis]];
        result.push(this.getGridLine(a,axis,{dash,lineWidth,color,start,end}))
      }
      return result;
    }
    getElements(){ 
      var {data} = this.props;
      this.keyDictionary = data.map(()=>{return {}});
      var {dataHide} = this.state;
      var {getLines} = this.details;
      this.elements = {
        xGridLines:this.getGridLines('x'),
        yGridLines:this.getGridLines('y'), 
        areas:[],rects:[],lines:[],points:[],
        xIndicators:getLines('x'),
        yIndicators:getLines('y'),
        texts:[],
        shapes:[]
      }
      var barCounter = 0; 
      this.dataDetails = [];
      for(var dataIndex = 0; dataIndex < data.length; dataIndex++){  
        let {title,type = 'line',shapes = () => []} = data[dataIndex];
        if(title && dataHide[title]){continue;}
        if(type === 'line'){
            this.getLineChart(data[dataIndex],dataIndex);
        } 
        else if(type === 'bar'){
          this.getBarChart(data[dataIndex],barCounter,dataIndex);
          barCounter++;
        }
        this.elements.shapes = getShapes(shapes(),this.details); 
      }
      var elements = [];
      for(var prop in this.elements){elements = elements.concat(this.elements[prop])}
      this.lastData = data;
      return elements;
    }
    componentDidMount(){this.SetState({})}
    
    getDetails(){
      var {key_zoom,value_zoom,data,barWidth = 80,reverse} = this.props,d = this.details; 
      if(!d.axisToD){ 
        if(!reverse){
          d.axisToD = {x:'key',y:'value'}; d.dToAxis = {key:'x',value:'y'};
          this.getArea = this.normal_getArea;
          if(key_zoom){d.xZoom = true;}
          if(value_zoom){d.yZoom = true;}
          
        }
        else{
          d.axisToD = {x:'value',y:'key'}; d.dToAxis = {key:'y',value:'x'};
          this.getArea = this.reverse_getArea;
          if(key_zoom){d.yZoom = true;}
          if(value_zoom){d.xZoom = true;} 
        }
        this.changeFilter = (axis,p1,p2)=>this[d.axisToD[axis] + '_changeFilter'](p1,p2);
        this.getRange = (axis)=>this[d.axisToD[axis]+'_getRange'](axis);
        this.getLabel = (axis,value)=>this[d.axisToD[axis] + '_getLabel'](value);
        this.getPercentByValue = (axis,point)=>{
          let D = d.axisToD[axis];
          return this[D + '_getPercentByValue'](axis,point);
        }
        d.getLines = (axis)=>this.getLines(axis,this.props[d.axisToD[axis] + '_lines']);
      } //نوع چارت و تابع گرفتن درصد با مقدار یکبار تایین می شود
      if(this.mouseDownDetail.target !== 'point'){
        if(this.mouseDownDetail.target !== 'filter'){
          var limit = this.getLimitTypeNumber(data);
          this.details.min = limit.min;
          this.details.max = limit.max;
        }
        this.details.range = {x:this.getRange('x'),y:this.getRange('y')}; 
        this.details.labelSpace = this.details.range[d.dToAxis.key].labelSpace;
      }
      d.barCount = data.filter((d)=>d.type === 'bar').length;
      d.barWidth = barWidth / d.range[d.dToAxis['key']].count/d.barCount; 
    }
    pointMouseDown(e,pos,obj){
      var {dataIndex,pointIndex} = obj;
      let {data,onChange,onRemove} = this.props;
      if(!onChange || data[dataIndex].editable === false){return;}
      this.getMouseDetail(pos);
      var point = data[dataIndex].points[pointIndex];
      this.mouseDownDetail = {target:'point',key:point._key,value:point._value};
      if(onChange && data[dataIndex].draggable !== false){
        eventHandler('window','mousemove',$.proxy(this.pointMouseMove,this))
      }
      if(onChange || onRemove){
        eventHandler('window','mouseup',$.proxy(this.pointMouseUp,this))
      }
      this.so = {dataIndex,pointIndex,x:this.mouseDetail.x,y:this.mouseDetail.y}; 
      this.moved = false;
    }
    pointMouseMove(){
      var {data,onChange} = this.props,point = data[this.so.dataIndex].points[this.so.pointIndex];
      var {dToAxis} = this.details;
      if(!this.moved){
        if(Math.abs(this.mouseDetail[dToAxis.value] - this.so[dToAxis.value]) < 8){return;}
        if(point._value === this.mouseDetail.value){return;}
      }
      this.moved = true;
      onChange({point,key:point._key,value:this.mouseDetail.value,dataIndex:this.so.dataIndex,pointIndex:this.so.pointIndex,drag:true});
    }
    pointMouseUp(){
      eventHandler('window','mousemove',this.pointMouseMove,'unbind')
      eventHandler('window','mouseup',this.pointMouseUp,'unbind');
      this.mouseDownDetail = {};
      var {data,onRemove,onChange} = this.props;
      var point = data[this.so.dataIndex].points[this.so.pointIndex];
      if(!this.moved){
        var title = !onChange?this.translate('Remove Point'):this.translate('Edit Point');
        this.SetState({
          popup:{
            disabled:onRemove && !onChange,
            dataIndex:this.so.dataIndex,pointIndex:this.so.pointIndex,
            dataIndexes:[this.so.dataIndex],
            dynamicValue:point._value,staticValue:this.mouseDetail.key,
            onEdit:onChange,onRemove,title
          }
        })
        return;
      }
      var obj = {point,key:point._key,value:this.mouseDetail.value,dataIndex:this.so.dataIndex,pointIndex:this.so.pointIndex};
      if(onChange){onChange(obj)}
    }
    //کلیک روی بک گراند چارت
    mouseDown(e,pos){
      if('ontouchstart' in document.documentElement){
        eventHandler('window','mouseup',$.proxy(this.addMouseUp,this));
        this.getMouseDetail(pos);
        return;
      }
      var {onAdd,multiselect,addPopup} = this.props;
      // اگر مد افزودن فعال بود و در موقعیت فعلی موس دیتا یا دیتا هایی آمادگی دریافت نقطه جدید در این موقعیت را داشتند
      this.mouseDownKey = this.mouseDetail.key;
      if(onAdd && this.mouseDetail.addDataIndexes.length){
        eventHandler('window','mouseup',$.proxy(this.addMouseUp,this));
      }
      var {reverse} = this.props;
      if(multiselect && this.mouseDetail.target !== 'point'){
        this.multiselect = {};
        this.multiselect.selectRect = $(this.dom.current).find('.r-chart-multiselect');
        if(reverse){
          this.multiselect.selectRect.css({display:'block',top:this.mouseDetail.py + '%',height:'0%',width:'100%',left:0})
          this.multiselect.position = this.mouseDetail.py;
        }
        else{
          this.multiselect.selectRect.css({display:'block',left:this.mouseDetail.px + '%',width:'0%',height:'100%',top:0})
          this.multiselect.position = this.mouseDetail.px;
        }
        eventHandler('window','mousemove',$.proxy(this.multiselectMove,this));
        eventHandler('window','mouseup',$.proxy(this.multiselectUp,this));
        
      }
    }
    addMouseUp(){
      var {onAdd,addPopup} = this.props;
      eventHandler('window','mouseup',this.addMouseUp,'unbind');
      if('ontouchstart' in document.documentElement){
        if(this.mouseDetail.addDataIndexes.length === 0){
          return;
        }
      }
      else {if(this.mouseDetail.key !== this.mouseDownKey){return;}}
      if(addPopup === false){onAdd(this.mouseDetail)} 
      else{
        this.SetState({
          popup:{
            type:'add',
            dataIndexes:this.mouseDetail.addDataIndexes,
            dataIndex:this.mouseDetail.addDataIndexes[0],
            dynamicValue:this.mouseDetail.value,
            staticValue:this.mouseDetail.key,
            onAdd,title:this.translate('Add Point'),
          }
        })
      }
    }
    multiselectMove(){
      var {reverse} = this.props;
      var m = this.multiselect;
      if(this.mouseDetail.key === this.mouseDownKey){return;}
      if(!reverse){
        var mp = this.mouseDetail.px;
        if(mp < m.position){m.end = m.position; m.start = mp;}
        else{m.start = m.position; m.end = mp;}
        m.selectRect.css({width:(m.end - m.start) + '%',left:m.start + '%'})
      }
      else{
        var mp = this.mouseDetail.py;
        if(mp < m.position){m.end = m.position; m.start = mp;}
        else{m.start = m.position; m.end = mp;}
        var obj = {height:(m.end - m.start) + '%',top:(m.start + 100) + '%'};
        m.selectRect.css(obj)
      }
      
    }
    hideSelectRect(){
      if(!this.multiselect || !this.multiselect.selectRect){return;}
      this.multiselect.selectRect.css({display:'none'});
    }
    multiselectUp(){
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
          title:this.translate('Multi Select'),
          points:this.multiselect.points 
        }
      })
    }
    getPointsBySelectRect(){
      var {start,end} = this.multiselect;
      var result = [];
      for(var i = 0; i < this.dataDetails.length; i++){
        var {dataIndex,points,editable} = this.dataDetails[i];
        if(editable === false){continue;}
        for(var pointIndex = 0; pointIndex < points.length; pointIndex++){
          let point = points[pointIndex];
          var percent = parseFloat(point[this.details.dToAxis['key']]);
          if(percent < start || percent > end){continue;}
          result.push([dataIndex,pointIndex])
        }
      }
      return result;
    }
    closePopup(){
      this.SetState({popup:false})
      this.hideSelectRect();
    }
    getPopup(popup){
      return <RChartEdit {...popup} 
        onChange={(obj)=>{
          for(let prop in obj){popup[prop] = obj[prop]}
          this.SetState({popup});
        }}
        onClose={this.closePopup.bind(this)} 
      />
    }
    getHeader(yWidth){
      var {data} = this.props,{dataHide} = this.state;
      return (
        <div className='r-chart-title' style={{paddingLeft:yWidth + 'px'}}>
            {data.filter((d)=>d.title !== undefined).map((d,i)=>{
              let {color,title} = d;
              let style = !dataHide[d.title]?{background:color}:{boxShadow:`inset 0 0 0 2px ${color}`};
              return (
                <div key={i} className='r-chart-title-item' onClick={()=>{
                  dataHide[title] = dataHide[title] === undefined?false:dataHide[title];
                  dataHide[title] = !dataHide[title];
                  this.SetState({dataHide})
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
      var {range,xZoom,yZoom} = this.details;
      if(!range || !range[axis]){return null;}
      var {start,end,step} = this.details.range[axis]; 
      var labelStyle = {x:{top:xZoom?'24px':'14px'},y:{left:'unset',right:yZoom?'16px':'8px',justifyContent:'flex-end'}};
      var {labelRotate} = this.props;
      return (
        <RSlider 
          className='labelSlider' editable={false} showValue={false}
          style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',padding:0}}
          pointStyle={{display:'none'}} lineStyle={{display:'none'}}
          direction={axis === 'x'?'right':'top'} start={start} end={end}
          label={{
            step,rotate:axis === 'y'?0:labelRotate,
            edit:(value)=>this.getLabel(axis,value),
            style:{fontSize:'inherit',...labelStyle[axis]}
          }}
        />
      ) 
    }
    filterMouseDown(e){
      e.preventDefault();
      this.mouseDownDetail.target = 'filter';
      var container = $(this.dom.current);
      var filterButtons = container.find('.r-chart-filterSlider-button');
      filterButtons.addClass('active');
      eventHandler('window','mouseup',$.proxy(this.filterMouseUp,this));
    }
    filterMouseUp(){
      this.mouseDownDetail = {}; 
      var container = $(this.dom.current);
      var filterButtons = container.find('.r-chart-filterSlider-button');
      filterButtons.removeClass('active');
      eventHandler('window','mouseup',this.filterMouseUp,'unbind');
    }
    getFilterSlider(axis){
      var zoom  = this.props[this.details.axisToD[axis] + '_zoom']; if(!zoom){return null;}
      var {range} = this.details;
      if(!range || !range[axis]){return null;}
      var color = '#eee';
      var {p1,p2,start,end} = range[axis].filter;
      var html = (
        <div 
          className={'r-chart-filterSlider-button r-chart-filterSlider-button-' + axis}
          onTouchStart={this.filterMouseDown.bind(this)}
          onMouseDown={this.filterMouseDown.bind(this)}
        ></div>
      ) 
      var points = [
        {value:p1,html},
        {value:p2,html,fillStyle:{[axis === 'y'?'width':'height']:'1px',background:color}}
      ]
      var style = {
        x:{width:'100%',height:'16px',padding:'0 12px',top:'2px',opacity:1},
        y:{width:'16px',height:'100%',padding:'12px 0',right:'0px',opacity:1}
      } 
      return (
        <RSlider direction={axis === 'x'?'right':'top'} start={start} end={end} className='filterSlider'
          points={points}
          editValue={(point)=>this.getLabel(axis,point.value)} 
          ondrag={({points})=>this.changeFilter(axis,points[0].value,points[1].value)}
          style={{position:'absolute',...style[axis]}}
          lineStyle={{display:'none'}}
          pointStyle={{display:'flex',alignItems:'center',justifyContent:'center',width:'30px',height:'30px',borderRadius:'0px',background:'none'}}
          showValue={true}
        />
      )
    }
    getAddableDataIndexes(key){
      if(key === undefined){return []}
      var {data} = this.props;
      var indexes = [];
      for(var i = 0; i < data.length; i++){
        var {editable} = data[i];
        if(editable === false){continue;}
        if(this.keyDictionary[i][key] === undefined){
          indexes.push(i);
        }
      }
      return indexes;
    }
    getNearestPointToMouse(obj){
      var {data} = this.props;
      var res = false;
      var dif = Infinity;
      for(var dataIndex = 0; dataIndex < data.length; dataIndex++){
        var pointIndex = this.keyDictionary[dataIndex][obj.key];
        if(pointIndex === undefined){continue;}
        let point = data[dataIndex].points[pointIndex];
        var Dif = Math.abs(point._value - obj.value);
        if(Dif <= dif){
          res = point;
          dif = Dif;
        }
      }
      return res;
    }
    getMouseDetail(pos){
      if(!pos){return;}
      var {x,y,px,py} = pos;
      var client = this.canvasToClient([x,y]);
      var cx = client[0] + this.vertical;
      var cy = client[1];                
      var {onAdd} = this.props;
      var obj = this.getValueByPercent({x:px,y:py});
      if(this.mouseDownDetail.target === 'point'){
        obj.key = this.mouseDownDetail.key;
      }
      var nearestPoint = this.getNearestPointToMouse(obj);
      var addDataIndexes = onAdd && this.mouseDownDetail.target !== 'point'?this.getAddableDataIndexes(obj.key):[];
      this.mouseDetail = {x,y,px,py,cx,cy,key:obj.key,value:obj.value,keyIndex:obj.keyIndex,nearestPoint,addDataIndexes}  
            
    }
    canvasToClient(fn){
      this.canvasToClient = fn;
    }
    render(){
      var xls = '',yls = '',xfs = '',yfs = '',items = '',HTML = '';
      var {keys,axisThickness,data,html = ()=>'',onAdd,id,className} = this.props;  
      var style = typeof this.props.style === 'function'?this.props.style():this.props.style;
      var {popup} = this.state; 
      var {horizontal = 50,vertical = 50} = axisThickness;
      this.vertical = vertical;
      var ok = false;
      if(this.details.canvasSize && data.length && keys){
        ok = true;
        this.getDetails();
        var d = this.details;
        items = this.getElements();
        yls = this.getLabelSlider('y');
        yfs = this.getFilterSlider('y');
        xls = this.getLabelSlider('x');
        xfs = this.getFilterSlider('x');
        HTML = html(this.elements,d);
      }
      return (
        <RChartContext.Provider value={{...this.props,translate:this.translate.bind(this),keyDictionary:this.keyDictionary}}>
          <div className={'r-chart' + (className?' ' + className:'')} ref={this.dom} style={style} id={id}>
            {this.getHeader(vertical)}
            <div className='r-chart-container' style={this.getStyle(vertical,horizontal)}>
              <div 
                className='r-chart-horizontal-line r-chart-line'
                style={{width:`calc(100% - ${vertical}px)`}}
              ></div>
              <div 
                className='r-chart-vertical-line r-chart-line'
                style={{height:`calc(100% - ${horizontal}px)`}}
              ></div>
              <div className={'r-chart-popup-container r-chart-detail-popup'}></div>
              {onAdd && <div className={'r-chart-popup-container r-chart-add-popup'}></div>}
              {popup !== false && this.getPopup(popup)}
              <div className='r-chart-axis r-chart-axis-y'>{yls} {yfs}</div> 
              <div className='r-chart-canvas'>
                {HTML} 
                <div className='r-chart-multiselect'></div>
                <RCanvas 
                  getSize={(width,height)=>{this.details.canvasSize = {x:width,y:height}}} 
                  canvasToClient={this.canvasToClient.bind(this)}
                  screenPosition={['50%','50%']}
                  items={items}
                  events={{
                    onMouseMove:(e,pos)=>{
                      if(!ok){return;}            
                      this.getMouseDetail(pos);
                      var {nearestPoint,addDataIndexes,cx,cy} = this.mouseDetail;
                      var dom = $(this.dom.current);
                      dom.find('.r-chart-popup-container').html('');
                      var horLine = dom.find('.r-chart-horizontal-line');
                      var verLine = dom.find('.r-chart-vertical-line');
                      horLine.css({display:'block',top:cy + 'px'});
                      verLine.css({display:'flex',left:cx + 'px'});
                      var xD = this.details.axisToD.x,yD = this.details.axisToD.y;
                      var xLabel,yLabel;
                      if(xD === 'key'){
                        xLabel = this.getLabel('x',this.mouseDetail['keyIndex']);
                        yLabel = this.getLabel('y',this.mouseDetail[yD]);
                      }
                      else{
                        xLabel = this.getLabel('x',this.mouseDetail[xD]);
                        yLabel = this.getLabel('y',this.mouseDetail['keyIndex']);
                      }
                      horLine.html(`<div style="padding-right:${this.details.yZoom?'16':'8'}px;">${yLabel === undefined?'':yLabel}</div>`);
                      verLine.html(`<div style="top:calc(100% + ${this.details.xZoom?'14':'4'}px);">${xLabel === undefined?'':xLabel}</div>`);
                      if(addDataIndexes.length){
                          var container = $(this.dom.current).find('.r-chart-add-popup');
                          var addIndicator = `<div class="add-indicator" style="background:${data[addDataIndexes[0]].color}">+</div>`;
                          container.css({left:cx,top:cy - ('ontouchstart' in document.documentElement?40:0)});
                          container.html('<div class="r-chart-popup">' + addIndicator + xLabel  + '  ' + yLabel + '</div>');
                      }
                      if(nearestPoint){
                          var container = $(this.dom.current).find('.r-chart-detail-popup');
                          let left = this.getPercentByValue('x',nearestPoint) * d.canvasSize.x / 100 + vertical;
                          let bottom = this.getPercentByValue('y',nearestPoint) * d.canvasSize.y / 100 + horizontal;
                          container.css({left,top:'unset',bottom});
                          let xLabel,yLabel;
                          if(xD === 'key'){
                            xLabel = this.getLabel('x',nearestPoint['_keyIndex']);
                            yLabel = this.getLabel('y',nearestPoint['_value']);
                          }
                          else{
                            xLabel = this.getLabel('x',nearestPoint['_value']);
                            yLabel = this.getLabel('y',nearestPoint['_keyIndex']);
                          }
                          container.html('<div class="r-chart-popup">' + xLabel  + '  ' + yLabel + '</div>');
                      }
                    },
                    onMouseDown:this.mouseDown.bind(this)
                  }}
                />
              </div>
              <div className='r-chart-corner'></div>
              <div className='r-chart-axis r-chart-axis-x'>{xls} {xfs}</div>  
            </div>
          </div>
        </RChartContext.Provider>
      )
    }
  }
  RChart.defaultProps = {
    data:[],filter:{key:[],value:[]},precision:0,clickRadius:12,
    lines:[],axisThickness:{},labelSize:40,axisStyle:{}
  }

 class RChartEdit extends Component{
   static contextType = RChartContext;
   constructor(props){
     super(props);
     this.dom = createRef();
   }
   componentDidMount(){
    $(this.dom.current).find('input').eq(0).focus().select();
  }
   render(){
     var {points,type,title,onChange,onClose,onAdd,onEdit,onRemove,dataIndex,pointIndex,dynamicValue,staticValue,dataIndexes = [],disabled} = this.props;
     var {key_title,value_title,keys,data,multiselect = {},translate,rtl} = this.context;
     var {inputs = [],buttons = []} = multiselect;
     return (
       <div className='r-chart-edit' ref={this.dom} style={{direction:rtl?'rtl':'ltr'}}>
          <div className='r-chart-edit-backdrop' onClick={onClose}></div>
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
                <div className="r-chart-edit-label" title={key_title || 'untitle'}>{(key_title || 'untitle') + ' : '}</div>
                <div className="r-chart-detail-value">{staticValue}</div>
              </div>
            }
            {
              dynamicValue !== undefined &&
              <div className='r-chart-edit-item'>
                <div className="r-chart-edit-label" title={value_title || 'untitle'}>{(value_title || 'untitle') + ' : '}</div>
                <input 
                  disabled={disabled}
                  className='r-chart-edit-tag' type='number' value={dynamicValue} 
                  onChange={(e)=>{
                    if(!onEdit && !onAdd){return;}
                    onChange({dynamicValue:e.target.value})
                  }}
                />
              </div>
            }
            {
              type === 'multiselect' && (buttons.length || inputs.length) &&
              inputs.map((item,i)=>{
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
                { type === 'multiselect' &&
                  buttons.filter((a)=>a.show !== false).map((a,i)=>{
                    return (
                      <button key={i} 
                        className='r-chart-edit-button' 
                        onClick={()=>{a.onClick(points); onClose();}}
                      >{a.text}</button>    
                    )
                  }) 
                }
                {
                  onAdd && 
                  <button 
                    className='r-chart-edit-button' 
                    onClick={()=>{
                      let points = data[dataIndex].points;
                      let index = keys.indexOf(staticValue);
                      let pointIndex = points.length;
                      for(let i = 0; i < points.length; i++){
                        let point = points[i];
                        if(point._keyIndex > index){
                          pointIndex = i;
                          break;
                        }
                      }
                      onAdd({key:staticValue,value:dynamicValue,dataIndex,pointIndex}); 
                      onClose();
                    }}
                  >{translate('Add')}</button>
                }
                {
                  onRemove &&
                  <button 
                    className='r-chart-edit-button' 
                    onClick={()=>{
                      let point = data[dataIndex].points[pointIndex];
                      onRemove({point,key:point._key,value:point._value,dataIndex,pointIndex}); onClose();
                    }}
                  >{translate('Remove')}</button>
                }
                {
                  onEdit &&
                  <button 
                    className='r-chart-edit-button' 
                    onClick={()=>{
                      let point = data[dataIndex].points[pointIndex];
                      onEdit({point,key:point._key,value:dynamicValue,dataIndex,pointIndex}); onClose();
                    }}
                  >{translate('Edit')}</button>
                } 
            </div>
        </div>
     )
   }
 }
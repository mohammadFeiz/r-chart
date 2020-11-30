import React,{Component,createRef,createContext} from 'react';
import RSlider from 'r-range-slider';
import RCanvas from 'r-canvas';
import $ from 'jquery';
import './index.css';
import {
  number_getRange,string_getRange,
  number_getPercentByValue,string_getPercentByValue,
  number_getValueByPercent,string_getValueByPercent,
  getLimitTypeNumber,eventHandler,getShapes,translate} from './functions';

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
      this.details = {
        min:Infinity,max:-Infinity,editLabel:{},getFilter:{},changeFilter:{},
        getPercentByValue:{},
        getFilterSlider:{},getGridLines:{},getLines:{}
      };
      $('body').on('mouseout','.r-chart-canvas',()=>{$('.r-chart-popup-container').html('')})
      if('ontouchstart' in document.documentElement){
        eventHandler('window','mouseup',()=>{$('.r-chart-popup-container').html('')})
      }
      this.translate = translate;
      this.getLimitTypeNumber = getLimitTypeNumber;
    }
    
    getStyle(x,y){
      return {
        gridTemplateColumns:`${x}px auto`,
        gridTemplateRows:`auto ${y}px`,
        direction:'ltr'
      }
    }
    getKey(point){
      var {keyAxis} = this.props;
      var {field} = keyAxis;
      return point[field];
    }
    getValue(point){
      var {valueAxis} = this.props;
      var {field} = valueAxis;
      return point[field];
    }
    getClient(e){
      return 'ontouchstart' in document.documentElement?{x: e.changedTouches[0].clientX,y:e.changedTouches[0].clientY }:{x:e.clientX,y:e.clientY}
    }
    SetState(obj){this.setState(obj)}
    onChange(data){
      var {onChange} = this.props;
      onChange({data});
    }
    getLineChart(data,dataIndex){ 
      var {points,color = '#000',lineWidth = 2,areaOpacity,dash,pointStyle,text} = data;
      var dataDetail = {...data,dataIndex,points:[],line:{points:[],lineWidth,stroke:color,dash},area:false,texts:[]}
      for(let pointIndex = 0; pointIndex < points.length; pointIndex++){
        let point = points[pointIndex];
        let key = this.getKey(point),value = this.getValue(point);
        if(key === null || value === null){continue;}
        var px = this.details.getPercentByValue.x(key,value,point);
        var py = this.details.getPercentByValue.y(key,value,point);
        if(px === false || py === false){continue;}
        this.keyDictionary[dataIndex][key] = pointIndex;
        if(pointStyle){
          let PointStyle = typeof pointStyle === 'function'?pointStyle(point,{dataIndex,pointIndex}):pointStyle;
          let {radius,fill = '#fff',stroke = color,lineWidth:pointLineWidth = lineWidth,dash:pointDash,slice} = PointStyle;
          let Point = {
            x:px + '%',y:py + '%',
            items:[
              {r:this.props.clickRadius,fill:'rgba(0,0,0,0)',onMouseDown:this.pointMouseDown.bind(this),dataIndex,pointIndex},
              {r: radius,lineWidth:pointLineWidth * 2,fill,stroke,dash:pointDash,slice}
            ]
          }
          this.elements.points.push(Point);
          dataDetail.points.push(Point);
        }
        if(text){
          let {value = '',fontSize = 16,color = '#444',x = 0,y = 0,rotate,align} = text(point,{dataIndex,pointIndex});
          let Text = {x:px + '%',y:py + '%',rotate,items:[{text:value,fontSize,fill:color,x,y,align}]};
          this.elements.texts.push(Text);
          dataDetail.texts.push(Text);
        }
        dataDetail.line.points.push([px + '%',py + '%']);
      }
      if(lineWidth){this.elements.lines.push(dataDetail.line)}
      if(areaOpacity){
        dataDetail.area = this.details.getArea(dataDetail.line.points,color,areaOpacity)
        this.elements.areas.push(dataDetail.area)
      }
      this.dataDetails.push(dataDetail);
    }
    getBarChart(data,barCounter,dataIndex){
      var {color,points,text} = data;
      var dataDetail = {...data,dataIndex,rects:[],texts:[]}
      var {keyAxis,barCount,barWidth,getPercentByValue} = this.details;
      for(var pointIndex = 0; pointIndex < points.length; pointIndex++){
        let point = points[pointIndex];
        let key = this.getKey(point),value = this.getValue(point);
        if(key === null || value === null){continue;}
        var px = getPercentByValue.x(key,value,point) + '%';
        var py = getPercentByValue.y(key,value,point) + '%';
        if(px === false || py === false){continue;}
        this.keyDictionary[dataIndex][key] = pointIndex;
        if(keyAxis === 'x'){
          let rect = {
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
            width:px,height:barWidth + '%',y:py,fill:color,
            pivot:[0,barWidth * (barCount / 2 - barCounter) + '%'],
            onMouseDown:this.pointMouseDown.bind(this),
            dataIndex,pointIndex
          }
          this.elements.rects.push(rect);
          dataDetail.rects.push(rect);
        }
        if(text){
          let {value = '',fontSize = 16,color = '#444',x = 0,y = 0,rotate,align} = text(point,{dataIndex,pointIndex});
          let Text = {x:px + '%',y:py + '%',rotate,items:[{text:value,fontSize,fill:color,x,y,align}]};
          this.elements.texts.push(Text);
          dataDetail.texts.push(Text);
        }
      }
      this.dataDetails.push(dataDetail);
    } 
    getGridLine(value,axis,{color = 'red',lineWidth = 0.7,dash}){
      var range = this.details.range[axis];
      if(!range){return {}}
      var {keyAxis} = this.props;
      value = typeof value === 'string'?keyAxis.list.indexOf(value):value;
      var {start,end} = range,v = (value - start) * 100 / (end - start);
      var points = axis === 'x'?[[v + '%','0%'],[v + '%','-100%']]:[['0%',-v + '%'],['100%',-v + '%']];
      return {stroke:color,lineWidth,points,type:'line',dash}
    }
    getGridLines(axis,color){
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
    getLines(axis,lines){
      var Lines = (typeof lines === 'function'?lines():lines) || [];
      var indicators = [];
      for(var i = 0; i < Lines.length; i++){
        var {value,dash,lineWidth,color} = Lines[i];
        indicators.push(this.getGridLine(value,axis,{dash,lineWidth,color}))
      }
      return indicators;
    }
    getElements(){ 
      var {data} = this.props;
      this.keyDictionary = data.map(()=>{return {}});
      var {preventData} = this.state;
      var {getGridLines,getLines} = this.details;
      this.elements = {
        xGridLines:getGridLines.x(),
        yGridLines:getGridLines.y(), 
        areas:[],rects:[],lines:[],points:[],
        xIndicators:getLines.x(),
        yIndicators:getLines.y(),
        texts:[],
        shapes:[]
      }
      var barCounter = 0; 
      this.dataDetails = [];
      for(var dataIndex = 0; dataIndex < data.length; dataIndex++){  
        let {title,type = 'line',shapes = () => []} = data[dataIndex];
        if(preventData[title]){continue;}
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
      return elements;
    }
    componentDidMount(){this.SetState({})}
    
    getDetails(){
      var {keyAxis,valueAxis,X,Y,data,barWidth = 80,precision,reverse,labels,editValue} = this.props,d = this.details; 
      if(!d.keyAxis){ 
        d.getKey = this.getKey.bind(this);
        d.getValue = this.getValue.bind(this);
        d.Axis = {x:X,y:Y};
        d.KeyAxis = keyAxis;
        var editLabelKey = keyAxis.editLabel?(value)=>{
          if(value < 0 || value >= keyAxis.list.length){return ''}
          return keyAxis.editLabel(keyAxis.list[value]);
        }:(value)=>value;
        var editLabelValue = valueAxis.editLabel?(value)=>valueAxis.editLabel(value):(value)=>value; 
        if(!reverse){
          d.getFilter.x = ()=>this.state.filter.key;
          d.getFilter.y = ()=>this.state.filter.value;
          d.keyAxis = 'x';
          d.valueAxis = 'y';
          d.editLabel.x = editLabelKey;
          d.editLabel.y = editLabelValue;
          d.getRange = ()=>{return {x:string_getRange('x',this.details),y:number_getRange('y',this.details)}}
          d.getPercentByValue.x = (key,value,point = {})=>{
            point._keyIndex = keyAxis.list.indexOf(key);
            if(point._keyIndex === -1){return false;}
            return string_getPercentByValue(point._keyIndex,'x',this.details)
          };
          d.getPercentByValue.y = (key,value,point)=>-number_getPercentByValue(value,'y',this.details);
          d.getValueByPercent = (px,py)=>{
            return {
              key:string_getValueByPercent(px,'x',this.details),
              value:number_getValueByPercent(py,'y',this.details)
            }
          }
          d.getArea = (points,fill,opacity)=>{
            let area = {points:points.slice(),fill,opacity};
            area.points.splice(0,0,[points[0][0],0]);
            area.points.push([points[points.length - 1][0],0]);
            return area;
          };
          d.getFilterSlider.x = keyAxis.zoom?()=>this.getFilterSlider('x'):()=>null;
          d.getFilterSlider.y = valueAxis.zoom?()=>this.getFilterSlider('y'):()=>null;
          d.getGridLines.x = keyAxis.gridColor?()=>this.getGridLines('x',keyAxis.gridColor):()=>[];
          d.getGridLines.y = valueAxis.gridColor?()=>this.getGridLines('y',valueAxis.gridColor):()=>[];
          d.getLines.x = ()=>this.getLines('x',keyAxis.lines);
          d.getLines.y = ()=>this.getLines('y',valueAxis.lines);
          d.changeFilter.x = (p1,p2)=>{
            let {filter} = this.state;
            let {list} = keyAxis;
            filter.key = [list[p1],list[p2]];
            this.SetState({filter});
          };
          d.changeFilter.y = (p1,p2)=>{
            let {filter} = this.state;
            filter.value = [p1,p2];
            this.SetState({filter});
          }
        }
        else{
          d.getFilter.x = ()=>this.state.filter.value;
          d.getFilter.y = ()=>this.state.filter.key;
          d.keyAxis = 'y';
          d.valueAxis = 'x';
          d.editLabel.x = editLabelValue;
          d.editLabel.y = editLabelKey;
          d.getRange = ()=>{return {x:number_getRange('x',this.details),y:string_getRange('y',this.details)}}
          d.getPercentByValue.x = (key,value,point)=>number_getPercentByValue(value,'x',this.details);
          d.getPercentByValue.y = (key,value,point = {})=>{
            point._keyIndex = keyAxis.list.indexOf(key);
            if(point._keyIndex === -1){return false;}
            return -string_getPercentByValue(point._keyIndex,'y',this.details)
          };
          d.getValueByPercent = (px,py)=>{
            return {
              key:string_getValueByPercent(py,'y',this.details),
              value:number_getValueByPercent(px,'x',this.details)
            }
          }
          d.getArea = (points,fill,opacity)=>{
            let area = {points:points.slice(),fill,opacity};
            area.points.splice(0,0,[0,points[0][1]]);
            area.points.push([0,points[points.length - 1][1]]);
            return area;
          };
          d.getFilterSlider.x = valueAxis.zoom?()=>this.getFilterSlider('x'):()=>null;
          d.getFilterSlider.y = keyAxis.zoom?()=>this.getFilterSlider('y'):()=>null;
          d.getGridLines.x = valueAxis.gridColor?()=>this.getGridLines('x',valueAxis.gridColor):()=>[];
          d.getGridLines.y = keyAxis.gridColor?()=>this.getGridLines('y',keyAxis.gridColor):()=>[];
          d.getLines.x = ()=>this.getLines('x',valueAxis.lines);
          d.getLines.y = ()=>this.getLines('y',keyAxis.lines);
          d.changeFilter.x = (p1,p2)=>{
            let {filter} = this.state;
            filter.value = [p1,p2];
            this.SetState({filter});
          };
          d.changeFilter.y = (p1,p2)=>{
            let {filter} = this.state;
            let {list} = keyAxis;
            filter.key = [list[p1],list[p2]];
            this.SetState({filter});
          };
        }
        
      } //نوع چارت و تابع گرفتن درصد با مقدار یکبار تایین می شود
      d.precision = precision;
      if(this.mouseDownDetail.target !== 'point'){
        var limit = this.getLimitTypeNumber(data);
        this.details.min = limit.min;
        this.details.max = limit.max;
        this.details.range = d.getRange(); 
      }  
      
      d.barCount = data.filter((d)=>d.type === 'bar').length;
      d.barWidth = barWidth / d.range[d.keyAxis].count/d.barCount; 
    }
    pointMouseDown(e,pos,obj){
      var {dataIndex,pointIndex} = obj;
      let {data,edit,remove} = this.props;
      if(data[dataIndex].editable === false){return;}
      if(!edit && !remove){return;}
      this.getMouseDetail(pos);
      var point = data[dataIndex].points[pointIndex];
      this.mouseDownDetail = {target:'point',key:this.getKey(point),value:this.getValue(point)};
      eventHandler('window','mousemove',$.proxy(this.pointMouseMove,this))
      eventHandler('window','mouseup',$.proxy(this.pointMouseUp,this))
      this.so = {dataIndex,pointIndex,x:this.mouseDetail.x,y:this.mouseDetail.y}; 
      this.moved = false;
    }
    pointMouseMove(){
      var {data,edit,valueAxis} = this.props,point = data[this.so.dataIndex].points[this.so.pointIndex];
      if(!this.moved){
        //if(Math.abs(this.mouseDetail.y - this.so.y) < 8){return;}
        if(this.getValue(point) === this.mouseDetail.value){return;}
      }
      this.moved = true;
      if(!edit){return;}
      var newPoint = {...point};
      console.log(this.mouseDetail.key,this.mouseDetail.value);
      
      newPoint[valueAxis.field] = this.mouseDetail.value;
      edit(newPoint,{dataIndex:this.so.dataIndex,pointIndex:this.so.pointIndex});

    }
    pointMouseUp(){
      eventHandler('window','mousemove',this.pointMouseMove,'unbind')
      eventHandler('window','mouseup',this.pointMouseUp,'unbind');
      this.mouseDownDetail = {};
      var {data,edit,remove,onDragEnd,valueAxis} = this.props;
      var point = data[this.so.dataIndex].points[this.so.pointIndex];
      if(!this.moved){
        var title = !edit?this.translate('Remove.Point'):this.translate('Edit.Point');
        this.SetState({
          popup:{
            dataIndex:this.so.dataIndex,pointIndex:this.so.pointIndex,
            dataIndexes:[this.so.dataIndex],
            dynamicValue:this.getValue(point),staticValue:this.mouseDetail.key,
            onEdit:edit,onRemove:remove,title
          }
        })
        return;
      }
      var newPoint = {...point};
      newPoint[valueAxis.field] = this.mouseDetail.value;
      if(onDragEnd){
        var changes = {dataIndex:this.so.dataIndex,pointIndex:this.so.pointIndex};
        onDragEnd(newPoint,changes)
      }
      else if(edit){
        var changes = {dataIndex:this.so.dataIndex,pointIndex:this.so.pointIndex};
        edit(newPoint,changes)
      }
    }
    //کلیک روی بک گراند چارت
    mouseDown(a,b){
      if('ontouchstart' in document.documentElement){
        eventHandler('window','mouseup',$.proxy(this.addMouseUp,this));
        this.getMouseDetail(b);
        return;
      }
      var {add,multiselect,addPopup} = this.props;
      // اگر مد افزودن فعال بود و در موقعیت فعلی موس دیتا یا دیتا هایی آمادگی دریافت نقطه جدید در این موقعیت را داشتند
      this.mouseDownKey = this.mouseDetail.key;
      if(add && this.mouseDetail.addDataIndexes.length){
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
      var {add,addPopup} = this.props;
      eventHandler('window','mouseup',this.addMouseUp,'unbind');
      if('ontouchstart' in document.documentElement){
        if(this.mouseDetail.addDataIndexes.length === 0){
          return;
        }
      }
      else {if(this.mouseDetail.key !== this.mouseDownKey){return;}}
      if(addPopup === false){add(this.mouseDetail)} 
      else{
        this.SetState({
          popup:{
            type:'add',
            dataIndexes:this.mouseDetail.addDataIndexes,
            dataIndex:this.mouseDetail.addDataIndexes[0],
            dynamicValue:this.mouseDetail.value,
            staticValue:this.mouseDetail.key,
            onAdd:add,title:this.translate('Add.Point'),
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
          title:'Multi Select',
          points:this.multiselect.points 
        }
      })
    }
    getPointsBySelectRect(){
      var {preventData} = this.state;
      var {start,end} = this.multiselect;
      var result = [];
      for(var i = 0; i < this.dataDetails.length; i++){
        var {dataIndex,title,points,editable} = this.dataDetails[i];
        if(editable === false){continue;}
        if(preventData[title]){continue}
        for(var pointIndex = 0; pointIndex < points.length; pointIndex++){
          let point = points[pointIndex];
          var percent = parseFloat(point[this.details.keyAxis]);
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
      if(!this.details.range || !this.details.range[axis]){return null;}
      var {start,end,step} = this.details.range[axis]; 
      var labelStyle = {x:{top:'24px'},y:{left:'unset',right:'16px',justifyContent:'flex-end'}};
      var {rotate = 0} = this.props[axis.toUpperCase()];
      return (
        <RSlider 
          className='labelSlider' editable={false} showValue={false}
          style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',padding:0,zIndex:-1}}
          pointStyle={{display:'none'}} lineStyle={{display:'none'}}
          direction={axis === 'x'?'right':'top'} start={start} end={end}
          label={{
            step,rotate:axis === 'y'?0:rotate,
            edit:(value)=>this.details.editLabel[axis](value),
            style:{fontSize:'inherit',...labelStyle[axis]}
          }}
        />
      ) 
    }
    filterMouseDown(e){
      e.preventDefault();
      var container = $(this.dom.current);
      var filterButtons = container.find('.r-chart-filterSlider-button');
      filterButtons.addClass('active');
      eventHandler('window','mouseup',$.proxy(this.filterMouseUp,this));
    }
    filterMouseUp(){
      var container = $(this.dom.current);
      var filterButtons = container.find('.r-chart-filterSlider-button');
      filterButtons.removeClass('active');
      eventHandler('window','mouseup',this.filterMouseUp,'unbind');
    }
    getFilterSlider(axis){
      var {range,changeFilter} = this.details;
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
          editValue={(point)=>this.details.editLabel[axis](point.value)} 
          ondrag={({points})=>changeFilter[axis](points[0].value,points[1].value)}
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
        var point = data[dataIndex].points[pointIndex];
        var key = this.getKey(point),value = this.getValue(point);
        var Dif = Math.abs(value - obj.value);
        if(Dif <= dif){
          res = {key,value,dataIndex,pointIndex};
          dif = Dif;
        }
      }
      return res;
    }
    getMouseDetail(a){
      if(!a){return;}
      var d = this.details;
      var [x,y,px,py] = a;
      var {add,Y} = this.props;
      var {width:yWidth = 50} = Y;
      
      var obj = d.getValueByPercent(px,-py);
      if(this.mouseDownDetail.target === 'point'){
        obj.key = this.mouseDownDetail.key;
      }
      var popupPosition = {x:x + yWidth,y:y + this.details.canvasSize.y}; 
      var nearestPoint = this.getNearestPointToMouse(obj);
      var addDataIndexes = add && this.mouseDownDetail.target !== 'point'?this.getAddableDataIndexes(obj.key):[];
      this.mouseDetail = {x,y,px,py,key:obj.key,value:obj.value,nearestPoint,addDataIndexes,popupPosition}  
            
    }
    render(){
      var xls = '',yls = '',xfs = '',yfs = '',items = '',HTML = '';
      var {X,Y,data,html = ()=>'',add,style} = this.props;  
      var {popup} = this.state; 
      var {height:xHeight = 50} = X;
      var {width:yWidth = 50} = Y;
      if(this.details.canvasSize && data.length){
        this.getDetails();
        var d = this.details;
        items = this.getElements();
        yls = this.getLabelSlider('y');
        yfs = d.getFilterSlider.y('y');
        xls = this.getLabelSlider('x');
        xfs = d.getFilterSlider.x('x');
        HTML = html(this.elements,d);
      }
      return (
        <RChartContext.Provider value={{...this.props,translate:this.translate.bind(this),keyDictionary:this.keyDictionary}}>
          <div className='r-chart' ref={this.dom} style={style}>
            {this.getHeader(yWidth)}
            <div className='r-chart-container' style={this.getStyle(yWidth,xHeight)}>
              <div className={'r-chart-popup-container r-chart-detail-popup'}></div>
              {add && <div className={'r-chart-popup-container r-chart-add-popup'}></div>}
              {popup !== false && this.getPopup(popup)}
              <div className='r-chart-axis r-chart-axis-y'>{yls} {yfs}</div> 
              <div className='r-chart-canvas'>
                {HTML} 
                <div className='r-chart-multiselect'></div>
                <RCanvas 
                  getSize={(width,height)=>{this.details.canvasSize = {x:width,y:height}}} 
                  axisPosition={['0%','100%']}
                  items={items}
                  events={{
                    onMouseMove:(e,pos)=>{
                      this.getMouseDetail(pos);
                      var {key,value,nearestPoint,addDataIndexes,popupPosition} = this.mouseDetail;
                      $(this.dom.current).find('.r-chart-popup-container').html('');
                      
                      if(addDataIndexes.length){
                          var container = $(this.dom.current).find('.r-chart-add-popup');
                          var addIndicator = addDataIndexes.length?`<div class="add-indicator" style="background:${data[addDataIndexes[0]].color}">+</div>`:''
                          container.css({left:popupPosition.x,top:popupPosition.y - ('ontouchstart' in document.documentElement?40:0)});
                          container.html('<div class="r-chart-popup">' + addIndicator + key  + '  ' + value + '</div>');
                      }
                      if(nearestPoint){
                          var container = $(this.dom.current).find('.r-chart-detail-popup');
                          let left = d.getPercentByValue.x(nearestPoint.key,nearestPoint.value) * d.canvasSize.x / 100 + yWidth;
                          let bottom = -d.getPercentByValue.y(nearestPoint.key,nearestPoint.value) * d.canvasSize.y / 100 + xHeight;
                          container.css({left,top:'unset',bottom});
                          container.html('<div class="r-chart-popup">' + nearestPoint.key  + '  ' + nearestPoint.value + '</div>');
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
    data:[],X:{},Y:{},filter:{key:[],value:[]},globalization:'en',precision:0,clickRadius:12,
    lines:[]
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
     var {points,type,title,onChange,onClose,onAdd,onEdit,onRemove,dataIndex,pointIndex,dynamicValue,staticValue,dataIndexes = []} = this.props;
     var {keyAxis,valueAxis,data,multiselect = {},translate,rtl,keyDictionary} = this.context;
     var {items = [],actions = []} = multiselect;
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
                <div className="r-chart-edit-label">{(keyAxis.title || 'untitle') + ' : '}</div>
                <div className="r-chart-detail-value">{staticValue}</div>
              </div>
            }
            {
              dynamicValue !== undefined &&
              <div className='r-chart-edit-item'>
                <div className="r-chart-edit-label">{(valueAxis.title || 'untitle') + ' : '}</div>
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
                      let list = keyAxis.list;
                      let points = data[dataIndex].points;
                      let index = list.indexOf(staticValue);
                      let pointIndex = points.length;
                      for(let i = 0; i < points.length; i++){
                        let point = points[i];
                        if(point._keyIndex > index){
                          pointIndex = i;
                          break;
                        }

                      }
                      onAdd({[keyAxis.field]:staticValue,[valueAxis.field]:dynamicValue},{dataIndex,pointIndex}); 
                      onClose();
                    }}
                  >{translate('Add')}</button>
                }
                {
                  onRemove &&
                  <button 
                    className='r-chart-edit-button' 
                    onClick={()=>{onRemove({dataIndex,pointIndex}); onClose();}}
                  >{translate('Remove')}</button>
                }
                {
                  onEdit &&
                  <button 
                    className='r-chart-edit-button' 
                    onClick={()=>{
                      let newPoint = {...data[dataIndex].points[pointIndex]}
                      newPoint[valueAxis.field] = dynamicValue;
                      onEdit(newPoint,{dataIndex,pointIndex}); onClose();
                    }}
                  >{translate('Edit')}</button>
                } 
            </div>
        </div>
     )
   }
 }
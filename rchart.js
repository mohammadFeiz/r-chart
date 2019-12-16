import React, { Component,createContext,createRef } from 'react';
import Slider from 'r-range-slider';
import Canvas from 'r-canvas';
import RActions from 'r-actions';
import $ from 'jquery';
import './index.css'
import {getRange,getLimit,getIndex,getPosition,getDetailUI} from './functions';
var {eventHandler,getClient,fix,getPercentByValue,getValueByPercent,binarySearch,compaire} = new RActions();
var chartContext = createContext();
export default class RChart extends Component {
  constructor(props) {
    super(props);
    var {x,y,data} = this.props;
    this.state = {x,y,position:{x:0,y:0}}  
    this.selected = [];
    this.state = {setting:false,open:data.map((d)=>d.show !== false)};
    this.isMobile = 'ontouchstart' in document.documentElement?true:false;
    this.dom = createRef();
    $('body').on('mouseout','.r-chart canvas',()=>{$('.r-chart-detail-container').remove()})
  }
  
  change(obj){//change state.x or state.y by slider
    //if(!final){return;}
    var axis = JSON.parse(JSON.stringify(this.state[obj.axis])) 
    if(axis.labels){
      axis.filter = [axis.labels[obj.points[0].value],axis.labels[obj.points[1].value]];
    }
    else{
      axis.filter = [obj.points[0].value,obj.points[1].value]; 
    }
    this.setState({[obj.axis]:axis});
  }
  onchange(data){
    if(this.props.onchange){this.props.onchange(data.data)}
  }
  static getDerivedStateFromProps(props,state){
    var {prevx,prevy} = state;
    var {x,y} = props;
    var change = {},changed = false;
    if(prevx !== JSON.stringify(x)){//اگر پروپس جدید از بیرون آمد
      change.prevx = JSON.stringify(x);
      change.x = x;
      changed = true;
    }
    if(prevy !== JSON.stringify(y)){//اگر پروپس جدید از بیرون آمد
      change.prevy = JSON.stringify(y);
      change.y = y;
      changed = true;
    }
    if(changed){return change}
    return null;
  }
  
  getFilterSlider(axis,range){
    var {filter = [],labels} = this.state[axis];
    var label,start,step,end;
    if(labels){
      var fs = filter[0]?getIndex(labels,(label)=>label === filter[0]):0;
      var fe = filter[1]?getIndex(labels,(label)=>label === filter[1]):labels.length - 1; 
      label = {items:labels.map((m,i)=>{return {text:m,value:i}})};
      start = 0; step = 1; end = labels.length - 1;
    }
    else if(!range){return false;}
    else{
      start = range.start; step = range.step; end = range.end;
      var [fs = start,fe = end] = filter;  
    }
    return {
      start,step,end,label,
      points:[
          {value:fs,style:{color:'#444'},html:''},
          {value:fe,style:{color:'#444'},fillColor:'#ccc',html:''}
      ]
    }
  }
  getLabelSlider(axis,range){
    var {filter = [],labels,rotation = 0} = this.state[axis];
    var start,step,end,labelItems,labelStep,labelStyle;
    if(labels){
      var fs = filter[0]?getIndex(labels,(label)=>label === filter[0]):0;
      var fe = filter[1]?getIndex(labels,(label)=>label === filter[1]):labels.length - 1;
      labelItems = labels.map((m,i)=>{return {text:m,value:i}}).slice(fs,fe + 1);
      start = fs - 0.5; step = 1; end = fe + 0.5; 
    }
    else if(!range){return false;}
    else{
      var [fs = range.start,fe = range.end] = filter;
      start = fs; step = range.step; end = fe; labelStep = range.step; 
    }
    if(axis === 'x'){
      if(rotation < 0){
        labelStyle = {justifyContent:'flex-end',transform:`rotate(${rotation}deg)`,whiteSpace:'nowrap'}
      }
      else if(rotation > 0){
        labelStyle = {justifyContent:'flex-start',transform:`rotate(${rotation}deg)`,whiteSpace:'nowrap'}
      }
      else{
        labelStyle = {alignItems:'flex-start'}
      }
    }
    else{
      labelStyle = {justifyContent:'flex-end'}
    }
    return {start,end,step,label:{items:labelItems,step:labelStep,style:labelStyle},showPoint:false}
  }
  getDetail(axis){
    var {gridColor} = this.state[axis];
    var limit = this.limit[axis];
    var range = limit?getRange(limit):false;
    var labelSlider = this.getLabelSlider(axis,range);
    var filterSlider = this.getFilterSlider(axis,range);
    return {
      filterSlider,
      labelSlider,
      grid:gridColor?this.getGridLines(labelSlider,gridColor,axis):undefined
    }
  }
  
  getlineChart(s,dataIndex){  
    var {stream,pointColor,lineWidth = 1,color = '#444',r = 3,showPoint,showLine = true,show = true,dash,selectable,shadow} = this.props.data[dataIndex];
    if(!showLine && !showPoint){return;} 
    
    var points = this.getPoints(s,stream,dataIndex);
    var line = {dataIndex,type:'line',stroke:color,dash,lineWidth,selectable,points};  
    var arcs = showPoint?line.points.map((p,i)=>{
      let {x,y,r:R} = p;
      return {
        stroke:color,r:R || r,x,y,lineWidth:lineWidth * 2,type:'arc', 
        fill:p.selected?'red':pointColor || '#fff'
      }
    }):[];
    
    s.arcs = s.arcs.concat(arcs);
    if(showLine){s.lines.push(line);} 
    
    if(shadow){
      var firstPoint = {x:points[0].x,y:points[0].y};
      var lastPoint = {x:points[points.length - 1].x,y:points[points.length - 1].y};
      firstPoint[this.mainAxis] = '0%'; lastPoint[this.mainAxis] = '0%';
      s.shadows.push($.extend({},line,{fill:color,stroke:false,opacity:.2,points:[firstPoint].concat(points,[lastPoint])}));
    }
  }
  getPoints(s,stream,dataIndex){
    var points = [];
    for(var i = 0; i < stream.length; i++){
      var str = stream[i];
      var {selected,x,y,r,show = true} = str;
      if(!show){continue;}
      var X = this.getPointPosition(s.x.labelSlider,x,'x'); if(X === false){continue;}
      var Y = this.getPointPosition(s.y.labelSlider,y,'y'); if(Y === false){continue;}
      var point = {x:X.pos + '%',y:-Y.pos + '%',streamIndex:i,r};
      str.position = {x:X.pos,y:Y.pos};
      str.center = {x:X.pos,y:Y.pos};
      if(selected){this.selected.push([dataIndex,i]); point.selected = true;}
      points.push(point); 
    }
    return points;
  }
  getPointPosition(labelSlider,value,axis){
    var {label,start,end} = labelSlider;
    var pos,center;
    if(label.items){
      var index = getIndex(label.items,(obj)=>obj.text === value);
      var length = label.items.length;
      if(index === -1){return false;}
      pos = (index + 0.5) * 100 / length  
      center = pos;
    }
    else{
      pos = (value - start) * 100 / (end - start)
      center = pos;
    }
    return {pos,center}; 
  }
  getbarChart(s,dataIndex){ 
    var data = this.props.data[dataIndex];
    var {stream,show,selectable} = data;
    if(show === false){return;}
    this.barCounter++;
    var bars = this.getBars(s,dataIndex,this.barCounter);
    s.rectangles.push({type:'group',items:bars,dataIndex,selectable});
  }
  getBars(s,dataIndex,barCounter){
    var rects = [];
    var {data,barWidth = 80} = this.props;
    var {color,stream} = data[dataIndex];
    
    if(barWidth < 1 || barWidth > 100){barWidth = 80;} 
    for (var i = 0; i < stream.length; i++) {
      var str = stream[i];
      var {selected,x,y,show = true} = str;
      if(!show){continue;}
      if(selected){this.selected.push([dataIndex,i])}
      var X = this.getBarPosition(s.x.labelSlider,x,'x',barCounter,barWidth); if(X === false){continue;}
      var Y = this.getBarPosition(s.y.labelSlider,y,'y',barCounter,barWidth); if(Y === false){continue;}
      str.position = {x:X.pos,y:Y.pos};
      str.center = {x:X.center,y:Y.center}; 
      rects.push({
        type:'rectangle',
        x:X.pos + '%',y:-Y.pos + '%',
        width:X.size + '%',height:Y.size + '%', 
        streamIndex:i,
        fill:selected?'red':color,
        shadow:[3,3,6,'rgba(10,10,10,.4)'], 
      });
    }
    return rects; 
  }
  getBarPosition(labelSlider,value,axis,barCounter,barWidth){    
    var {label,start,end} = labelSlider; 
    var pos,center,size;
    if(label.items){
      //if(axis === 'y'){debugger;}
      var index = getIndex(label.items,(obj)=>obj.text === value);
      if(index === -1){return false;}
      var length = label.items.length;
      center = (index + 0.5) * 100 / length ;
      var barUnit = barWidth / length / this.barCount;
      var offsetFromCenter = barUnit * (barCounter - this.barCount / 2);
      pos = center + offsetFromCenter + (axis === 'y'?barUnit:0);
      size = barWidth / this.barCount / length;
    }
    else{
      center = (value - start) * 100 / (end - start)
      pos = axis === 'x'?0:center;
      size = center;
    }
    return {pos,center,size}; 
  }
  updateData() {
    var {data} = this.props;
    var {x,y} = this.state;
    var s = {barCount:0,lines:[],arcs:[],rectangles:[],shadows:[]};
    if(this.setLimit !== false){
      this.limit = {x:getLimit(data,x,'x'),y:getLimit(data,y,'y')};
    }
    s.x = this.getDetail('x');
    s.y = this.getDetail('y'); 
    if(s.y.labelSlider.label.items && !s.x.labelSlider.label.items){this.mainAxis = 'x'; this.secondAxis = 'y'; this.sign = -1;}
    else{this.mainAxis = 'y'; this.secondAxis = 'x'; this.sign = 1;}
    this.barCount = data.filter((d)=>{return d.type === 'bar'}).length;
    this.barCounter = -1;
    for (var i = 0; i < data.length; i++) {
      var {type = 'line',show = true} = data[i];
      if(!this.state.open[i]){continue;}
      if(type === 'line'){
        this.getlineChart(s,i);  
      }
      else{
        this.getbarChart(s,i);
      }
      //this[`get${type}Chart`](data[i],s,i);    
    }
    return s;
  }
  getGridLines({start,step,end},color,axis){
    var value = Math.round((start - step) / step) * step; 
    var grid = {id:axis + '-grid',items:[],type:'group'};
    var a = 100 / (end - start);
    while (value <= end) {
      if(value >= start){
        var val = (value - start) * a;
        var p1 = axis === 'x'?{x:val + '%',y:0 + '%'}:{x:0 + '%',y:-val + '%'};
        var p2 = axis === 'x'?{x:val + '%',y:-100 + '%'}:{x:100 + '%',y:-val + '%'};
        grid.items.push({stroke:color,lineWidth:0.7,points:[p1,p2],type:'line'});
      }
      value += step;
    }
    return grid;
  }
  getStyle(axis){
    var {filter,padding,defaultPadding} = this.props;
    var {
      left = defaultPadding.left,top = defaultPadding.top,
      right = defaultPadding.right,bottom = defaultPadding.bottom
    } = padding;
    return axis === 'x'?
    {
      bottom:0,
      right:`${right}px`,
      width:`calc(100% - ${left}px - ${right}px)`,
      height:bottom + 'px',
    }:
    {
      left:0,
      top:`${top}px`,
      width:left + 'px',
      height:`calc(100% - ${bottom}px - ${top}px)`,
    };
  }
  getLength(p1,p2) { 
    var a = Math.pow((parseFloat(p1.x) - p2.x) * this.width / 100, 2);
    var b = Math.pow((parseFloat(p1.y) - p2.y) * this.height / 100, 2);
    return fix(Math.sqrt(a + b)); 
  }
  
  filterPoint(filters,obj){
    for(var i = 0; i < filters.length; i++){
      var f = filters[i];
      if(f[1] === 'equal'){
        if(obj[f[0]] !== f[2]){return false;} 
      }
      else{
        if(obj[f[0]] === f[2]){return false;}
      }
    }
    return true;
  }
  getpoint(lines,coords){
    var min = 1000000; 
    var {data} = this.props;
    var result;
    for(var i = 0; i < lines.length; i++){ 
      var {points,selectable,dataIndex} = lines[i]; 
      if(selectable === false){continue;}
      for(var j = 0; j < points.length; j++){
        var {x,y,streamIndex} = points[j];
        var length = this.getLength(coords,{x:parseFloat(x),y:parseFloat(y)});  
        if(length < min){
          result = [dataIndex,streamIndex]; 
          min = length;
        }
      }
    }
    if(min <10){return result;}
  }
  getbar(rectangles,coords){
    var result;
    for(var i = 0; i < rectangles.length; i++){
      var {items,dataIndex,selectable} = rectangles[i];
      if(selectable === false){continue;}
      for(var j = 0; j < items.length; j++){
        var {x,y,width,height,streamIndex} = items[j];
        x = parseFloat(x);
        y = parseFloat(y); 
        width = parseFloat(width); 
        height = parseFloat(height); 
        if(x > coords.x){continue;}
        if(x + width < coords.x){continue;}  
        if(coords.y < y){continue;}
        if(coords.y > y + height){continue;}
        return [dataIndex,streamIndex]
      }
    }
  }
  deselect(dataIndex,streamIndex){ 
    //debugger;
    var {data} = this.props;
    data[dataIndex].stream[streamIndex].selected = false;
    this.onchange({data});
  }
  select(dataIndex,streamIndex){
    this.selected = this.selected || [];
    for(var i = 0; i < this.selected.length; i++){
      var [a,b] = this.selected[i];
      if(a === dataIndex && b === streamIndex){
        return;
      }
    }
    this.selected.push([dataIndex,streamIndex]);
    var {data} = this.props; 
    data[dataIndex].stream[streamIndex].selected = true;
    this.onchange({data});
    return true; 
  }
  deselectAll(){
    var {data} = this.props;
    for(var i = 0; i < this.selected.length; i++){ 
      var s = this.selected[i];
      data[s[0]].stream[s[1]].selected = false;
    }
    this.selected = [];
    this.onchange({data});
  }
  mouseDown(e,d){
    if(!this.props.onchange){return;}
    this.clickedItem = [false,false];
    var point =this.getpoint(d.lines,this.mousePosition);
    var bar =this.getbar(d.rectangles,this.mousePosition);
    var item = point || bar || false; 
    var {data} = this.props;
    this.startOffset = {
      canvas:this.mousePosition,
      body:getClient(e),
      selected:this.selected.map((sel)=>{
        var stream = data[sel[0]].stream[sel[1]]; 
        return {x:parseFloat(stream.x),y:stream.y,stream} 
      }),
    };
    if(item){
      this.setLimit = false;
      this.clickedItem = item;
      if(data[item[0]].stream[item[1]].selected){
        eventHandler('window','mousemove',$.proxy(this.pointMouseMove,this));
      }
      eventHandler('window','mouseup',$.proxy(this.pointMouseUp,this));

    }
    else{
      eventHandler('window','mousemove',$.proxy(this.backgroundMouseMove,this));
      eventHandler('window','mouseup',$.proxy(this.backgroundMouseUp,this));
      this.startOffset.client = this.getCanvasClient(e);
      $(this.dom.current).append('<div class="r-chart-select" style="position:absolute;left:'+this.startOffset.client.x+'px;top:'+this.startOffset.client.y+'px;background:rgba(100,100,100,.3);"></div>')
    }
    
  }
  pointMouseMove(e){
    var {x,y} = getClient(e);
    var {data,changeStep} = this.props;
    var {start,end} = this.d[this.mainAxis].labelSlider;
    var {body,selected} = this.startOffset;
    var offset = {
      x:-getPercentByValue(x - body.x,0,this.width),
      y:getPercentByValue(y - body.y,0,this.height),
    };
    var changed = false;
    for(var i = 0; i < selected.length; i++){
      let {stream} = selected[i];
      let axis = selected[i][this.mainAxis];
      let value = axis - getValueByPercent(offset[this.mainAxis],0,end - start);
      value = Math.round(value / changeStep) * changeStep;
      if(stream[this.mainAxis] !== value){changed = true;}
      stream[this.mainAxis] = value;
    }
    if(changed){this.onchange({data})}
  }
  pointMouseUp(){
    eventHandler('window','mousemove',this.pointMouseMove,'unbind');
    eventHandler('window','mouseup',this.pointMouseUp,'unbind');
    var point =this.getpoint(this.d.lines,this.mousePosition);
    var rect =this.getbar(this.d.rectangles,this.mousePosition);
    var item = point || rect || false;
    console.log(item);
    if(item && compaire(this.clickedItem,item)){this.select(item[0],item[1])}
    var {data} = this.props;
    this.setLimit = true;
    this.onchange({data});
  }
  selectPointsBySelectRect(){
    var startx,starty,endx,endy;
    var {start,end} = this.selectCoords;
    if(start.x < end.x){startx = start.x; endx = end.x;}
    else{startx = end.x; endx = start.x;}
    if(start.y < end.y){starty = start.y; endy = end.y;}
    else{starty = end.y; endy = start.y;}
    for(var i = 0; i < this.d.lines.length; i++){
      var {points,dataIndex} = this.d.lines[i];
      for(var j = 0; j < points.length; j++){
        var {x,y,streamIndex} = points[j];
        x = parseFloat(x); y = parseFloat(y);
        if(x < startx || x > endx){continue;}
        if(y < starty || y > endy){continue;}
        this.select(dataIndex,streamIndex);
      }  
    }
  }
  backgroundMouseMove(e){
    var coords = this.getCanvasClient(e);
    var so = this.startOffset;
    if(Math.abs(coords.x - so.client.x) < 2 && Math.abs(coords.y - so.client.y) < 2){return;}
    this.moved = true;
    var x1 = Math.min(so.client.x , coords.x);
    var y1 = Math.min(so.client.y , coords.y);
    var width = Math.abs(so.client.x - coords.x);
    var height = Math.abs(so.client.y - coords.y);
    this.selectCoords = {
      start:so.canvas,end:this.mousePosition
    };
    $(this.dom.current).find('.r-chart-select').css({
      width,height,left:x1,top:y1,
    })

  }
  backgroundMouseUp(){
    eventHandler('window','mousemove',this.backgroundMouseMove,'unbind');
    eventHandler('window','mouseup',this.backgroundMouseUp,'unbind');
    if(!this.moved){
      this.deselectAll();
    }
    else {
      this.selectPointsBySelectRect();
      $(this.dom.current).find('.r-chart-select').remove();
    }
    this.moved = false;
  }
  
  getCanvasClient(e){
    var dom = $(this.dom.current);
    var {left,top} = dom.offset();
    var {x,y} = getClient(e);
    return {
      x:x - left + window.pageXOffset,
      y:y - top + window.pageYOffset  
    } 
  }
  hover(){   
    $('.r-chart-detail-container').remove();  
    var {data,padding,defaultPadding} = this.props; 
    var result = [];
    for(var i = 0; i < data.length; i++){ 
      var {stream} = data[i]; 
      if(!this.state.open[i] || !stream.length){continue;}
      var index = binarySearch(stream,this.mousePosition[this.secondAxis] * this.sign,
      (a)=>{
        if(!a.center){/*console.error('missing center in an stream in data['+i+']');*/ return false;} 
        return a.center[this.secondAxis]},6);  
      if(index === -1){continue;}
      
      result.push({
        obj:data[i].stream[index],
        color:data[i].color,         
      })  
    }
    if(!result.length){return;}
    var Chart = $(this.dom.current);
    var {left = defaultPadding.left,bottom = defaultPadding.bottom} = padding;
    if(this.mainAxis === 'y'){
      var Left = left + result[0].obj.center.x * this.width / 100;
      var Bottom = bottom + 12 + parseFloat(this.mousePosition.y) * -this.height / 100;
      console.log('ok')
    }
    else{
      var Left = 40 + left + parseFloat(this.mousePosition.x) * this.width / 100;
      var Bottom = bottom + result[0].obj.center.y * this.height / 100;
      console.log(Bottom)
    }
    
    var ui = getDetailUI(Left,Bottom,result);
    Chart.append(ui);
  }
  
  render() {
    var {zoom,style,padding,defaultPadding,id,className,data} = this.props;
    var {x,y} = this.state;
    var {zoom:zoomx} = x;
    var {zoom:zoomy} = y;
    var {
      left = defaultPadding.left,top = defaultPadding.top,
      right = defaultPadding.right,bottom = defaultPadding.bottom
    } = padding;
    var d = this.updateData();
    this.d = d; 
    var grids = [d.x.grid||{type:'group',id:'x-grid',items:[]},d.y.grid||{type:'group',id:'y-grid',items:[]}];
    var items = grids.concat(d.rectangles,d.lines,d.arcs,d.shadows);
    var canvas = {
      mouseDown:(e)=>{this.mouseDown(e,d)},
      getSize:(w,h)=>{this.width = w; this.height = h;},
      getMousePosition:(p)=>{
        this.mousePosition = {x:p.x * 100 / this.width,y:p.y * 100 / this.height,X:p.x,Y:p.y};
        this.hover();
      },
      id:'canvas', 
      axisPosition:{x:'0%',y:'100%'},
      items,
      style:{
        width:`calc(100% - ${left}px - ${right + 1}px)`,
        height:`calc(100% - ${bottom}px - ${top + 1}px)`,
        right:`${right}px`,
        top:`${top}px`,
      }
    }
    return (
      <chartContext.Provider value={d}>
        <div className={`r-chart${className?' ' + className:''}`} id={id} style={$.extend({},{padding:0},style)} ref={this.dom}>
          <div className='r-chart-toggle-setting' style={{top:top+'px',right:right+'px'}} onClick={()=>this.setState({setting:true})}></div>
          {this.state.setting &&
          <div className='r-chart-setting'>
          <div style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',zIndex:-1}} onClick={()=>this.setState({setting:false})}></div>
            <div className='r-chart-close-setting' onClick={()=>this.setState({setting:false})}>Close</div>
            {data.map((Data,i)=>{
              return (
                <div className='r-chart-data-list' style={{color:Data.color}} onClick={()=>{var o = this.state.open; o[i] = !o[i]; this.setState({open:this.state.open})  }}>
                  <div className={`r-chart-check ${!this.state.open[i]?'unchecked':'checked'}`}></div>
                  <div className='r-chart-title'>{Data.title || 'Untitle'}</div>
                </div>
              )
            })}
          </div>
          }
          {
            this.selected.length !==0 &&
            <div className='r-chart-deselect-all' onClick={this.deselectAll.bind(this)} style={{right:right+'px',top:top+'px'}}>Deselect All</div>
          }
          {
            d.x.labelSlider &&
            <Slider {...d.x.labelSlider} style={this.getStyle('x')} className='r-chart-labels r-chart-labels-x'/>
          }
          {
            d.y.labelSlider &&
            <Slider {...d.y.labelSlider} style={this.getStyle('y')} direction='up' className='r-chart-labels r-chart-labels-y'/>
          }
          {
            zoomx && d.x.filterSlider && 
            <Slider 
              className='r-chart-filter r-chart-filter-x'
              axis='x' 
              start={d.x.filterSlider.start} end={d.x.filterSlider.end} 
              points={d.x.filterSlider.points}
              showValue={!d.x.labelSlider.label.items}
              point_width={8} 
              point_height={8}
              ondrag={this.change.bind(this)}
              style={{
                width:`calc(100% - ${left}px - ${right}px)`,
                bottom:`${bottom - 9}px`,
                right:`${right}px`
              }}
            />
          }
          {
            zoomy && d.y.filterSlider && 
            <Slider 
              className='r-chart-filter r-chart-filter-y'
              axis='y'
              direction='up'
              start={d.y.filterSlider.start} end={d.y.filterSlider.end}
              point_width={8}
              point_height={8}
              points={d.y.filterSlider.points}
              showValue={!d.y.labelSlider.label.items}
              ondrag={this.change.bind(this)}  
              style={{
                left:`${left - 9}px`,
                height:`calc(100% - ${bottom}px - ${top}px)`,
                top:`${top}px`
              }}
            />
          }
          <Canvas {...canvas} 
        />
        </div>
      </chartContext.Provider> 
    );
  }
}
RChart.defaultProps = {
  filter:false,changeStep:1,padding:{},defaultPadding:{left:30,top:20,right:20,bottom:30}
}
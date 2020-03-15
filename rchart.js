import React, { Component,createContext,createRef } from 'react';
import RRangeSlider from 'r-range-slider';
import Canvas from 'r-canvas';
import $ from 'jquery';
import './index.css'
var chartContext = createContext();
export default class RChart extends Component {
  constructor(props) {
    super(props);
    var {x = {},y = {},data,padding} = this.props;
    var {left = 30,top = 20,bottom = 30,right = 20} = padding;
    this.padding = {left,top,bottom,right};
    this.controlPanel = {
      filterSlider:{
        fillStyle:{background:'#ccc'},lineStyle:{display:'none'},
        pointStyle:{width:'13px',height:'13px',borderRadius:0,background:'none',display:'flex',justifyContent:'center',alignItems:'center'},
        pointHTML:<div style={{
          width:'6px',height:'6px',background:'#aaa',position:'absolute',left:0,top:0,
          top:'calc(50% - 3px)',left:'calc(50% - 3px)'
        }}></div>
      },
      xlabelStyle:{top:'18px',fontSize:'inherit'},
      ylabelStyle:{right:'15px',left:'unset',justifyContent:'flex-end',fontSize:'inherit'}
    }
    if(!Array.isArray(data)){
      console.error('data property of RChart must be an array of objects!!!');
      return;
    }
    this.state = {x,y,position:{x:0,y:0}}  
    this.selected = [];
    this.state = {setting:false,open:data.map((d)=>d.show !== false)};
    this.touch = this.isMobile();
    this.dom = createRef();
    $('body').on('mouseout','.r-chart canvas',()=>{$('.r-chart-detail-container').remove()})
  }
  isMobile(){return 'ontouchstart' in document.documentElement;}
  eventHandler(selector, event, action,type = 'bind'){
    var me = { mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" };
    event = this.touch ? me[event] : event;
    var element = typeof selector === "string"? 
    (selector === "window"?$(window):$(selector)):
    selector; 
    element.unbind(event, action); 
    if(type === 'bind'){element.bind(event, action)}
  }
  getClient(e){
    return this.touch?{x: e.changedTouches[0].clientX,y:e.changedTouches[0].clientY }:{x:e.clientX,y:e.clientY}
  }
  fix(number,a = 6){return parseFloat((number).toFixed(a))}
  getPercentByValue(value,start,end){return 100 * (value - start) / (end - start)}
  getValueByPercent(percent,start,end){return start + (percent * (end - start) / 100)}
  binarySearch(arr,value,field,limit = 0){
    var start = 0,end = arr.length - 1;
    var startValue = field(arr[start]);
    var endValue = field(arr[end]);
    if(value < startValue){
      return Math.abs(value - startValue) <= limit?start:-1;
    }
    if(value > endValue){
      return Math.abs(value - endValue) <= limit?end:-1;
    }
    if(value === startValue){return start;}
    if(value === endValue){return end;}
    while(end - start > 1){
      var mid = Math.floor((end + start)/2);
      var mp = field(arr[mid]);
      var dif = value - mp;
      if(dif === 0){return mid;}
      if(dif < 0){end = mid;}//اگر مقدار در سمت چپ است
      else{start = mid;}//اگر مقدار در سمت راست است
    }
    var startDif = Math.abs(field(arr[start]) - value);
    var endDif = Math.abs(field(arr[end]) - value);
    if(startDif <= endDif){
      return startDif <=limit?start:-1;
    }
    else{
      return endDif <=limit?end:-1;
    }
  }
  compaire(a,b){
    return JSON.stringify(a) === JSON.stringify(b);
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
    var {x = {},y = {}} = props;
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
    var {left,right,top,bottom} = this.padding;
    var {fillStyle,lineStyle,pointStyle,style,pointHTML} = this.controlPanel.filterSlider;
    var start,step,end,points;
    if(labels){
      var fs = filter[0]?this.getIndex(labels,(label)=>label === filter[0]):0;
      var fe = filter[1]?this.getIndex(labels,(label)=>label === filter[1]):labels.length - 1; 
      start = 0; step = 1; end = labels.length - 1;
      points = [{value:fs,html:pointHTML},{value:fe,fillStyle,html:pointHTML}]
    }
    else if(!range){return false;}
    else{
      start = range.start; step = range.step; end = range.end;
      var [fs = start,fe = end] = filter;  
      points = [{value:fs,html:pointHTML},{value:fe,fillStyle,html:pointHTML}]   
    }
    var config = {
      start,step,end,axis,points,lineStyle,pointStyle,
      ondrag:this.change.bind(this),
      direction:axis === 'y'?'top':'right',
      className:`r-chart-filter r-chart-filter-${axis}`,
      style:axis === 'x'?
      {width:`calc(100% - ${left}px - ${right}px)`,bottom:`${bottom - 9}px`,right:`${right}px`,position:'absolute',zIndex:1000,height:'5px',padding:'0 12px'}:
      {left:`${left - 9}px`,top:`${top}px`,height:`calc(100% - ${bottom}px - ${top}px)`,position:'absolute',zIndex:1000,width:'5px',padding:'12px 0'}
    }
    return config;
  }
  getLabelSlider(axis,range){ 
    var {filter = [],labels,rotate = 0} = this.state[axis];
    var start,step,end,labelItems,labelStep;
    var labelStyle = this.controlPanel[axis + 'labelStyle'];
    if(labels){
      var fs = filter[0]?this.getIndex(labels,(label)=>label === filter[0]):0;
      var fe = filter[1]?this.getIndex(labels,(label)=>label === filter[1]):labels.length - 1;
      labelItems = labels.map((m,i)=>{return {text:m,value:i}}).slice(fs,fe + 1);
      start = fs - 0.5; step = 1; end = fe + 0.5; 
    }
    else if(!range){return false;} 
    else{
      var [fs = range.start,fe = range.end] = filter;
      start = fs; step = range.step; end = fe; labelStep = range.step; 
    }
    var {left,right,top,bottom} = this.padding;
    return {
      start,end,step,
      label:{items:labelItems,step:labelStep,style:labelStyle,rotate:axis === 'y'?0:rotate},
      showPoint:false,lineStyle:{display:'none'},pointStyle:{display:'none'},
      direction:axis === 'x'?'right':'top',className:`r-chart-labels r-chart-labels-${axis}`,
      style:axis === 'x'?
      {
        padding:0,position:'absolute',
        width:`calc(100% - ${left}px - ${right}px)`,
        bottom:0,right:`${right}px`,height:bottom + 'px',fontSize:'inherit'
      }:
      {
        padding:0,position:'absolute',
        left:0,top:`${top}px`,width:left + 'px',
        height:`calc(100% - ${bottom}px - ${top}px)`,fontSize:'inherit'
      }
    }
  }
  getDetail(axis){
    var {gridColor} = this.state[axis];
    var limit = this.limit[axis];
    var range = limit?this.getRange(limit):false;
    var labelSlider = this.getLabelSlider(axis,range);
    var filterSlider = this.getFilterSlider(axis,range);
    return { 
      filterSlider,  
      labelSlider,
      grid:gridColor?this.getGridLines(labelSlider,gridColor,axis):undefined
    }
  }
  
  getlineChart(s,dataIndex){  
    var {stream = [],pointColor,lineWidth = 1,color = '#444',r = 3,showPoint,showLine = true,show = true,dash,selectable,area = 0} = this.props.data[dataIndex];
    if(!showLine && !showPoint){return;} 
    var points = this.getPoints(s,stream,dataIndex);
    var linePoints = [],arcs = [];
    if(showPoint){
      for(var i = 0; i < points.length; i++){
        let {x,y,r:R,color:Color,background,selected} = points[i];
        linePoints.push([x,y]);
        arcs.push({
          stroke:Color || color,r:R || r,x,y,lineWidth:lineWidth * 2,type:'arc', 
          fill:selected?'red':background || pointColor || '#fff'
        }) 
      }
    }
    else{
      for(var i = 0; i < points.length; i++){
        let {x,y,r:R,color:Color,background} = points[i];
        linePoints.push([x,y]);
      }
    }
    var line = {dataIndex,stroke:color,dash,lineWidth,selectable,points:linePoints};  
    s.arcs = s.arcs.concat(arcs);
    s.lines.push(line); 
    var mainIndex,secondIndex;
    if(this.mainAxis === 'x'){mainIndex = 0; secondIndex = 1;}
    else{mainIndex = 1; secondIndex = 0;}
    if(area && points.length){
      var firstPoint = [points[0].x,points[0].y];
      var lastPoint = [points[points.length - 1].x,points[points.length - 1].y]; 
      firstPoint[mainIndex] = '0%'; lastPoint[mainIndex] = '0%';
      s.shadows.push($.extend({},line,{fill:color,stroke:false,opacity:area,points:[firstPoint].concat(linePoints,[lastPoint])}));
    }
  }
  getPoints(s,stream,dataIndex){
    var points = [];
    for(var i = 0; i < stream.length; i++){
      var str = stream[i];
      var {selected,x,y,r,show = true,color,background} = str;
      if(x === null || y === null){continue;} 
      if(!show){continue;}
      var X = this.getPointPosition(s.x.labelSlider,x,'x'); if(X === false){continue;}
      var Y = this.getPointPosition(s.y.labelSlider,y,'y'); if(Y === false){continue;}
      var point = {x:X.pos + '%',y:-Y.pos + '%',streamIndex:i,r,color,background};
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
    if(label && label.items){
      var index = this.getIndex(label.items,(obj)=>obj.text === value);
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
    var {stream = [],show,selectable} = data;
    if(show === false){return;}
    this.barCounter++;
    var bars = this.getBars(s,dataIndex,this.barCounter);
    s.rectangles.push({type:'group',items:bars,dataIndex,selectable});
  }
  getBars(s,dataIndex,barCounter){
    var rects = [];
    var {data,barWidth = 80} = this.props;
    var {color,stream = []} = data[dataIndex];
    
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
        x:X.pos + '%',y:-Y.pos + '%',
        width:X.size + '%',height:Y.size + '%', 
        streamIndex:i,dataIndex,
        fill:selected?'red':color,
        //shadow:[3,3,6,'rgba(10,10,10,.4)'], 
      });
    }
    return rects; 
  }
  getBarPosition(labelSlider,value,axis,barCounter,barWidth){    
    var {label,start,end} = labelSlider; 
    var pos,center,size;
    if(label.items){
      //if(axis === 'y'){debugger;}
      var index = this.getIndex(label.items,(obj)=>obj.text === value);
      if(index === -1){return false;}
      var length = label.items.length;
      center = (index + 0.5) * 100 / length ;
      var barUnit = barWidth / length / this.barCount;
      var offsetFromCenter = barUnit * (barCounter - this.barCount / 2);
      pos = center + offsetFromCenter + (axis === 'y'?barUnit:0);
      size = barUnit;
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
      this.limit = {x:this.getLimit(data,x,'x'),y:this.getLimit(data,y,'y')};
    }
    s.x = this.getDetail('x');
    s.y = this.getDetail('y'); 
    //debugger;
    var xlsl = s.x.labelSlider.label;
    var ylsl = s.y.labelSlider.label;
    if(ylsl && ylsl.items && xlsl && !xlsl.items){this.mainAxis = 'x'; this.secondAxis = 'y'; this.sign = -1;}
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
        var p1 = axis === 'x'?[val + '%',0 + '%']:[0 + '%',-val + '%'];
        var p2 = axis === 'x'?[val + '%',-100 + '%']:[100 + '%',-val + '%'];
        grid.items.push({stroke:color,lineWidth:0.7,points:[p1,p2],type:'line'});
      }
      value += step;
    }
    return grid;
  }
  
  getLength(p1,p2) { 
    var a = Math.pow((parseFloat(p1.x) - p2.x) * this.width / 100, 2);
    var b = Math.pow((parseFloat(p1.y) - p2.y) * this.height / 100, 2);
    return this.fix(Math.sqrt(a + b)); 
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
        var [x,y] = points[j];
        var length = this.getLength(coords,{x:parseFloat(x),y:parseFloat(y)});  
        if(length < min){
          result = [dataIndex,j]; 
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
      body:this.getClient(e),
      selected:this.selected.map((sel)=>{
        var stream = data[sel[0]].stream[sel[1]]; 
        return {x:parseFloat(stream.x),y:stream.y,stream} 
      }),
    };
    if(item){
      this.setLimit = false;
      this.clickedItem = item;
      if(data[item[0]].stream[item[1]].selected){
        this.eventHandler('window','mousemove',$.proxy(this.pointMouseMove,this));
      }
      this.eventHandler('window','mouseup',$.proxy(this.pointMouseUp,this));

    }
    else{
      this.eventHandler('window','mousemove',$.proxy(this.backgroundMouseMove,this));
      this.eventHandler('window','mouseup',$.proxy(this.backgroundMouseUp,this));
      this.startOffset.client = this.getCanvasClient(e);
      $(this.dom.current).append('<div class="r-chart-select" style="position:absolute;left:'+this.startOffset.client.x+'px;top:'+this.startOffset.client.y+'px;background:rgba(100,100,100,.3);"></div>')
    }
    
  }
  pointMouseMove(e){
    var {x,y} = this.getClient(e);
    var {data,changeStep} = this.props;
    var {start,end} = this.d[this.mainAxis].labelSlider;
    var {body,selected} = this.startOffset;
    var offset = {
      x:-this.getPercentByValue(x - body.x,0,this.width),
      y:this.getPercentByValue(y - body.y,0,this.height),
    };
    var changed = false;
    for(var i = 0; i < selected.length; i++){
      let {stream} = selected[i];
      let axis = selected[i][this.mainAxis];
      let value = axis - this.getValueByPercent(offset[this.mainAxis],0,end - start);
      value = Math.round(value / changeStep) * changeStep;
      if(stream[this.mainAxis] !== value){changed = true;}
      stream[this.mainAxis] = value;
    }
    if(changed){this.onchange({data})}
  }
  pointMouseUp(){
    this.eventHandler('window','mousemove',this.pointMouseMove,'unbind');
    this.eventHandler('window','mouseup',this.pointMouseUp,'unbind');
    var point =this.getpoint(this.d.lines,this.mousePosition);
    var rect =this.getbar(this.d.rectangles,this.mousePosition);
    var item = point || rect || false;
    if(item && this.compaire(this.clickedItem,item)){this.select(item[0],item[1])}
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
      var {selectable = true} = this.props.data[dataIndex];
      if(!selectable){continue;}
      for(var j = 0; j < points.length; j++){
        var [x,y] = points[j];
        x = parseFloat(x); y = parseFloat(y);
        if(x < startx || x > endx){continue;}
        if(y < starty || y > endy){continue;}
        this.select(dataIndex,j);
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
    this.eventHandler('window','mousemove',this.backgroundMouseMove,'unbind');
    this.eventHandler('window','mouseup',this.backgroundMouseUp,'unbind');
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
    var {x,y} = this.getClient(e);
    return {
      x:x - left + window.pageXOffset,
      y:y - top + window.pageYOffset  
    }  
  }
  hover(){   
    $('.r-chart-detail-container').remove();  
    var {data} = this.props;  
    var result = []; 
    for(var i = 0; i < data.length; i++){ 
      var {stream = []} = data[i];    
      if(!this.state.open[i] || !stream.length){continue;}
      var index = this.binarySearch(stream,this.mousePosition[this.secondAxis] * this.sign, 
      (a)=>{
        if(!a.center){return false;} 
        return a.center[this.secondAxis]},6);   
      if(index === -1){continue;}  
      let s = data[i].stream[index];
      if(!s.center){continue;}
      result.push({
        obj:s,
        color:data[i].color,          
      })  
    }
    if(!result.length){return;}
    var Chart = $(this.dom.current);
    var {left,bottom} = this.padding;
    if(this.mainAxis === 'y'){
      var Left = left + result[0].obj.center.x * this.width / 100;
      var Bottom = bottom + 12 + parseFloat(this.mousePosition.y) * -this.height / 100;
    }
    else{
      var Left = 40 + left + parseFloat(this.mousePosition.x) * this.width / 100;
      var Bottom = bottom + result[0].obj.center.y * this.height / 100;
    }
    
    var ui = this.getDetailUI(Left,Bottom,result);
    Chart.append(ui);
  }
  getRange({min,max}){
      var range = max - min,i = 1;
      if(range === 0){
        if(min < 0){return {start:2 * min,step:Math.abs(min),end:0,}}
        else if(min > 0){return {start:0,step:min,end:2 * min,}}
        else {return {start:-1,step:1,end:1}}
      }
      while(range / 10 > 1){i *= 10; range /= 10;}
      var step;
      if(range >= 0 && range <= 3){step = 0.2 * i;}
      else{step = 1 * i;}
      var start = Math.round(min / step) * step - step;
      var end = Math.round(max / step) * step + step;
      return {start,step,end};
  }
  getLimit(data,axisObj = {},axis){
    var {labels} = axisObj;
    if(labels){return false;}
    var min = Infinity,max = -Infinity;
    for (var i = 0; i < data.length; i++) {
      var {stream = []} = data[i];
      for (var j = 0; j < stream.length; j++) { 
        var value = stream[j][axis]; 
        if(value < min){min = value;}
        if(value > max){max = value;}
      }
    }
    return min === Infinity || max === -Infinity?false:{min,max};
  }
  
  getIndex(array,searchMethod){ 
    for(var i = 0; i < array.length; i++){
      if(searchMethod(array[i])){return i;} 
    } 
    return -1;
  }

  getDetailUI(left,bottom,arr){
    return `<div class="r-chart-detail-container" style="left:${left+'px'};bottom:${bottom+'px'};">
      <div class="r-chart-detail">
        ${arr.map((ar)=>{
          var {color,obj} = ar;
          return `<div class="r-chart-detail-value" style="color:${color};">${obj.x}</div>
          <div class="r-chart-detail-value">${obj.y}</div>`
        }).join('')}
      </div>
    </div>`
  }
  render() {
    var {zoom,style,padding,defaultPadding,id,className,data,title} = this.props;
    var {x,y} = this.state;
    var {zoom:zoomx} = x;
    var {zoom:zoomy} = y;
    var {left,top,right,bottom} = this.padding;
    var d = this.updateData();
    this.d = d; 
    var canvas = {
      mouseDown:(e)=>{this.mouseDown(e,d)},
      getSize:(w,h)=>{this.width = w; this.height = h;},
      mouseMove:(e,mousePosition)=>{
        this.mousePosition = {x:mousePosition[0] * 100 / this.width,y:mousePosition[1] * 100 / this.height,X:mousePosition[0],Y:mousePosition[1]};
        this.hover();
      }, 
      id:'canvas', 
      axisPosition:['0%','100%'],
      items:[d.x.grid||{},d.y.grid||{}].concat(d.rectangles,d.lines,d.arcs,d.shadows),
      style:{
        width:`calc(100% - ${left}px - ${right + 1}px)`,
        height:`calc(100% - ${bottom}px - ${top + 1}px)`,
        right:`${right}px`,
        top:`${top}px`,
        borderLeft:x.borderColor !== false?`1px solid ${x.borderColor || '#000'}`:undefined,
        borderBottom:y.borderColor !== false?`1px solid ${y.borderColor || '#000'}`:undefined, 
      }
    }
    return (
      <chartContext.Provider value={d}>
        <div className={`r-chart${className?' ' + className:''}`} id={id} style={$.extend({},{padding:0,direction:'ltr'},style)} ref={this.dom}>
          <RChartTitle title={title} padding={this.padding} data={data}/>
          {this.props.setting !== false && <div className='r-chart-toggle-setting' style={{top:top+'px',right:right+'px'}} onClick={()=>this.setState({setting:true})}></div>}
          {
            this.selected.length !==0 &&
            <div className='r-chart-deselect-all' onClick={this.deselectAll.bind(this)} style={{right:right+'px',top:top+'px'}}>Deselect All</div>
          }
          {d.x.labelSlider && x.show !== false && <RRangeSlider {...d.x.labelSlider}/>}
          {d.y.labelSlider && y.show !== false && <RRangeSlider {...d.y.labelSlider}/>}
          {zoomx && d.x.filterSlider && <RRangeSlider {...d.x.filterSlider}/>}
          {zoomy && d.y.filterSlider && <RRangeSlider {...d.y.filterSlider}/>}
          <Canvas {...canvas} 
        />
        </div>
      </chartContext.Provider> 
    );
  }
}


class RChartTitle extends Component{
  
  render(){
    var {title,padding,data} = this.props;
    if(!title){return ''}
    var {left,top} = padding;
    var titleProps = {
       className:'r-chart-title',style:$.extend({},title.style || {},{height:top+'px',width:`calc(100% - ${left+'px'})`,justifyContent:title.moveTo?undefined:'center'})
    }
    return (
      <marquee ref={this.dom} scrollamount={title.speed?5:0} {...titleProps} direction={title.moveTo}>
        <table style={{}}>
        <tbody>
          <tr>
            <td style={{padding:'0 48px'}}><strong>{title.text || ''}</strong></td>
            {
              data.map((d,i)=>{return ( 
                <td key={i}>
                  <div style={{height:top,display:'flex',alignItems:'center',float:'left',margin:'0 6px',whiteSpace:'nowrap'}}>
                    <div style={{width:'12px',height:'12px',background:d.color,float:'left',margin:'3px',borderRadius:'100%'}}></div>
                    {d.title||'untitle'}
                  </div>
                </td>
              )})
            }
          </tr>
          </tbody>
        </table>
      </marquee>
    );
  }
}
RChart.defaultProps = {
  filter:false,changeStep:1,padding:{},data:[]
}
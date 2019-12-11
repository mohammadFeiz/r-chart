import React, { Component,createContext,createRef } from 'react';
import Slider from '@mohamadfeiz/r-slider';
import Canvas from 'r-canvas';
import $ from 'jquery';
import './index.css'
import {getRange,getLimit,getIndex,getPosition,getDetailUI} from './functions';
import RActions from 'r-actions';
var {eventHandler,getClient,fix,getPercentByValue,getValueByPercent,binarySearch} = new RActions();
var chartContext = createContext();
export default class RChart extends Component {
  constructor(props) {
    super(props);
    var {x,y,data} = this.props;
    this.state = {x,y,position:{x:0,y:0}}  
    this.selected = [];
    this.isMobile = 'ontouchstart' in document.documentElement?true:false;
    this.dom = createRef();
    $('body').on('mouseout','.r-chart canvas',()=>{$('.r-chart-detail-container').remove()})
    $(window).on('resize',this.resize.bind(this));
  }
  resize(){
    this.timer = 0;
    clearInterval(this.interval);
    this.interval = setInterval(()=>{
      this.timer++;
      if(this.timer >= 20){
        this.setState({})
        clearInterval(this.interval); 
      }
    },10)
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
      var fs = filter[0]?getIndex(labels,filter[0]):0;
      var fe = filter[1]?getIndex(labels,filter[1]):labels.length - 1; 
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
      var fs = filter[0]?getIndex(labels,filter[0]):0;
      var fe = filter[1]?getIndex(labels,filter[1]):labels.length - 1;
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
  getlineChart({stream,background,lineWidth = 1,color = '#444',r = 3,point:showPoint,line:showLine = true,dash},s,i){
    var line = {dataIndex:i,type:'line',points:[],stroke:color,dash,lineWidth};
    for (var j = 0; j < stream.length; j++) {
      var {selected} = stream[j];
      if(selected){this.selected.push([i,j])}
      var point = this.getPoint(s,stream[j]); 
      if(point === false){continue;}
      point.streamIndex = j;

      line.points.push(point);
      if(showPoint){
        let {x,y} = point;
        s.arcs.push({
          stroke:color,r,x,y,lineWidth:lineWidth * 2,type:'arc', 
          fill:selected?'red':background || '#fff'
        })
      }
    }
    if(showLine){s.lines.push(line);}
  }
  getPoint(s,stream){
    var {x,y} = stream;
    var {position:X,center:centerX} = getPosition(s.x.labelSlider,x);
    var {position:Y,center:centerY} = getPosition(s.y.labelSlider,y);
    stream.position = {x:X,y:Y};
    stream.center = {x:centerX,y:centerY};
    return X === false || Y === false?false:{
      x:X + '%',
      y:-Y + '%',
      value:{x,y}
    };
  }
  getbarChart(data,s,i){
    var {stream} = data;
    this.barCounter++;
    for (var j = 0; j < stream.length; j++) {
      var {selected} = stream[j];
      if(selected){this.selected.push([i,j])}
      var rectangle = this.getBar(s,stream[j],data);
      if(rectangle === false){continue;}
      rectangle.dataIndex = i;
      rectangle.streamIndex = j;
      rectangle.fill = selected?'red':rectangle.fill;
      rectangle.shadow = [3,3,6,'rgba(10,10,10,.4)']
      s.rectangles.push(rectangle);
    }
  }
  getBar(s,stream,{color,width = 80}){
    width = width < 1?1:width;
    width = width > 100?100:width; 
    var {position:x,center:centerX} = getPosition(s.x.labelSlider,stream.x,{barCount:this.barCount,barCounter:this.barCounter,width});
    var {position:y,center:centerY} = getPosition(s.y.labelSlider,stream.y);
    stream.position = {x,y};
    stream.center = {x:centerX,y:centerY};
    var length = s.x.labelSlider.label.items.length;
    var w = width / this.barCount / length;
    var h = y; 
    return {x:x + '%',y:(y * -1) + '%',width:w + '%',height:h + '%',fill:color,type:'rectangle'};
  }
  
  updateData() {
    var {data} = this.props;
    var {x,y} = this.state;
    var s = {barCount:0,lines:[],arcs:[],rectangles:[]};
    if(this.setLimit !== false){
      this.limit = {x:getLimit(data,x,'x'),y:getLimit(data,y,'y')};
    }
    s.x = this.getDetail('x');
    s.y = this.getDetail('y'); 
    this.barCount = data.filter((d)=>{return d.type === 'bar'}).length;
    this.barCounter = -1;
    for (var i = 0; i < data.length; i++) {
      var {type = 'line'} = data[i];
      this[`get${type}Chart`](data[i],s,i);    
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
    var {filter,padding} = this.props;
    var {left = 30,top = 20,right = 20,bottom = 20} = padding;
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
    var result;
    for(var j = 0; j < lines.length; j++){
      var line = lines[j];
      for(var i = 0; i < line.points.length; i++){
        var point = line.points[i];
        var length = this.getLength(point,coords); 
        if(length < min){
          result = [line.dataIndex,point.streamIndex];
          min = length;
        }
      }
    }
    if(min <10){return result;}
  }
  getbar(rectangles,coords){
    var result;
    var x = parseFloat(coords.x),y = parseFloat(coords.y)
    for(var j = 0; j < rectangles.length; j++){
      var rect = rectangles[j];
      var X = parseFloat(rect.x),Y = parseFloat(rect.y); 
      var width = parseFloat(rect.width);
      var height = parseFloat(rect.height);
      if(X > x){continue;}
      if(X + width < x){continue;}  
      if(y < -height){continue;}
      return [rect.dataIndex,rect.streamIndex]
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
    var {start,end} = this.d.y.labelSlider;
    var {body,selected} = this.startOffset;
    var offset = {
      x:getPercentByValue(x - body.x,0,this.width),
      y:getPercentByValue(y - body.y,0,this.height),
    };
    var changed = false;
    for(var i = 0; i < selected.length; i++){
      let {x,y,stream} = selected[i];
      let value = y - getValueByPercent(offset.y,0,end - start);
      value = Math.round(value / changeStep) * changeStep;
      if(stream.y !== value){changed = true;}
      stream.y = value;
    }
    if(changed){this.onchange({data})}
  }
  pointMouseUp(){
    eventHandler('window','mousemove',this.pointMouseMove,'unbind');
    eventHandler('window','mouseup',this.pointMouseUp,'unbind');
    var point =this.getpoint(this.d.lines,this.mousePosition);
    var rect =this.getbar(this.d.rectangles,this.mousePosition);
    if(point){this.select(point[0],point[1])}
    else if(rect){this.select(rect[0],rect[1])}
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
    var {data,padding} = this.props,x = this.mousePosition.x; 
    var result = [];
    for(var i = 0; i < data.length; i++){
      var {stream} = data[i];
      if(!stream.length){continue;}
      var index = binarySearch(stream,x,function(a){return a.center.x},6);  
      if(index === -1){continue;}
      
      result.push({
        obj:data[i].stream[index],
        color:data[i].color,        
      })  
    }
    if(!result.length){return;}
    var Chart = $(this.dom.current);
    var {left = 30,bottom = 20} = padding;
    var Left = left + result[0].obj.center.x * this.width / 100;
    var Bottom = bottom + 12 + parseFloat(this.mousePosition.y) * -this.height / 100;
    var ui = getDetailUI(Left,Bottom,result);
    Chart.append(ui);
  }
  // hover(){
  //   $('.r-chart-detail-container').remove();
  //   var {lines} = this.d,{data} = this.props,x = this.mousePosition.x;
  //   var result = [];
  //   for(var i = 0; i < lines.length; i++){
  //     var {points} = lines[i];
  //     if(!points.length){continue;}
  //     var index = binarySearch(points,x,function(a){return parseFloat(a.x)},2);
  //     if(index === -1){continue;}
  //     result.push({
  //       obj:lines[i].points[index],
  //       color:data[i].color,        
  //     })
  //     debugger;  
  //   }
  //   if(!result.length){return;}
  //   var Chart = $(this.dom.current);
  //   var left = Chart.width() - this.width + parseFloat(result[0].obj.x) * this.width / 100;
  //   var bottom = Chart.height() - this.height + 20 + parseFloat(this.mousePosition.y) * -this.height / 100;
  //   Chart.append(getDetailUI(left,bottom,result));
  // }
  render() {
    var {zoom,style,padding} = this.props;
    style.padding = 0;
    var {x,y} = this.state;
    var {zoom:zoomx} = x;
    var {zoom:zoomy} = y;
    var {left = 30,top = 20,right = 20,bottom = 20} = padding;
    var d = this.updateData();
    this.d = d; 
    var grids = [d.x.grid||{type:'group',id:'x-grid',items:[]},d.y.grid||{type:'group',id:'y-grid',items:[]}];
    var items = grids.concat(d.rectangles,d.lines,d.arcs);
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
        <div className='r-chart' style={style} ref={this.dom}>
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
  filter:false,changeStep:1,padding:{left:30,top:20,right:20,bottom:20}
}
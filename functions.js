import $ from 'jquery';
export function getGap(labels){
  return Math.max(0.5,Math.round(labels.length / 10))
}
export function number_getRange(axis,details){
      var {limit,width,height} = details;
      var filter = details.filter[axis];
      var size = {x:width,y:height}[axis];
      var [min,max] = limit[axis];
      if(min === undefined || max === undefined){return false;}
      var range = max - min,i = 1;
      var start,step,end;
      if(range === 0){
        if(min < 0){start = 2 * min; step = Math.abs(min); end = 0;}
        else if(min > 0){start = 0; step = min; end = 2 * min;}
        else {start = -1; step = 1; end = 1;}
      }
      else{
        while(range / 10 > 1){i *= 10; range /= 10;}
        if(range >= 0 && range <= 3){step = 0.2 * i;}
        else{step = i;}
        start = Math.round(min / step) * step - step;
        end = Math.round(max / step) * step + step;
      }
      var count = (end - start) / step; 
      var maxCount = size?Math.ceil(size / 60):10;
      while (count > maxCount){step *= 2; count = (end - start) / step;}
      var [fs = start,fe = end] = filter;
      var filteredRange = {start,end,step,p1:fs,p2:fe}  
      return {start:fs,step,end:fe,filter:filteredRange}; 
    } 
    export function string_getRange(axis,details){
      var filter = details.filter[axis];
      var {labels,width = 60,height = 30} = details.Axis[axis];
      var gap = getGap(labels);
      var size = details[axis === 'x'?'width':'height']
      var fs = filter[0]?labels.indexOf(filter[0]):0;
      var fe = filter[1]?labels.indexOf(filter[1]):labels.length - 1;
      var filteredRange = {start:0,end:labels.length - 1,p1:fs,p2:fe};
      var count = fe - fs + 1;
      var approveCount = Math.floor(size / (axis === 'x'?width:height));
      approveCount = approveCount < 1 ? 1:approveCount;
      var labelStep = Math.floor(count / approveCount);
      labelStep = labelStep < 1 ? 1:labelStep;
      return {
        start:fs - gap,step:labelStep,end:fe + gap,count,filter:filteredRange
      };
    }

    export function getPixelByValue(value,axis){
      return this.getPercentByValue(value,axis) * this.details[axis === 'x'?'width':'height'] / 100;
    }

    export function getPercentByValue(value,axis,details){
      var {range,type} = details;
      let labels = details.Axis[axis].labels;
      let {start,end} = range[axis],Value; 
      if(type[axis] === 'number'){
        if(isNaN(value)){return 'number error'}  
        Value = value; 
      }
      else{
        Value = labels.indexOf(value);
        if(Value === -1){return 'string error';}
      }
      return 100 * (Value - start) / (end - start) 
    }
    export function getValueByPercent(p,axis,details){
      var {range,type,Axis,precision} = details;
      if(!range[axis]){return '';}
      let {start,end} = range[axis],Value = (end - start) * p / 100;
      if(axis === 'x'){console.log(start,end)}
      if(type[axis] === 'number'){return parseFloat((Value + start).toFixed(precision))}
      else{
        let labels = Axis[axis].labels;
        var a = Math.round(Value + start);
        console.log('value',a)
        console.log('p',p)
        return labels[a]
      }
    }

    export function getLimitTypeNumber(data,axis){
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

    export function eventHandler(selector, event, action,type = 'bind'){
      var me = { mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }; 
      event = 'ontouchstart' in document.documentElement ? me[event] : event;
      var element = typeof selector === "string"?(selector === "window"?$(window):$(selector)):selector; 
      element.unbind(event, action); 
      if(type === 'bind'){element.bind(event, action)}
    }
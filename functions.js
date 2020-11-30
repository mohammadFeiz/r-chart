import $ from 'jquery';
export function getGap(labels){
  return Math.max(0.5,Math.round(labels.length / 10))
}
export function number_getRange(axis,details){
      var {min,max,canvasSize} = details;
      var filter = details.getFilter[axis]();
      console.log(filter);
      var size = canvasSize[axis];
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
      var filter = details.getFilter[axis]();
      var labelSize;
      if(axis === 'x'){labelSize = details.Axis.x.width || 60;}
      else{labelSize = details.Axis.y.height || 30;}
      var canvasSize = details.canvasSize[axis]
      var list = details.KeyAxis.list;
      var gap = getGap(list);
      var fs = filter[0]?list.indexOf(filter[0]):0;
      var fe = filter[1]?list.indexOf(filter[1]):list.length - 1;
      var filteredRange = {start:0,end:list.length - 1,p1:fs,p2:fe};
      var count = fe - fs + 1;
      var approveCount = Math.floor(canvasSize / labelSize);
      approveCount = approveCount < 1 ? 1:approveCount;
      var labelStep = Math.floor(count / approveCount);
      labelStep = labelStep < 1 ? 1:labelStep;
      return {
        start:fs - gap,step:labelStep,end:fe + gap,count,filter:filteredRange
      };
    }

    // export function getPixelByValue(value,axis){
    //   return this.getPercentByValue(value,axis) * this.details[axis === 'x'?'width':'height'] / 100;
    // }

    export function number_getPercentByValue(value,axis,details){
      var {range} = details;
      let {start,end} = range[axis],Value; 
      if(isNaN(value)){return false}  
      Value = value; 
      return 100 * (Value - start) / (end - start) 
    }
    export function string_getPercentByValue(index,axis,details){
      var {range} = details;
      let {start,end} = range[axis]; 
      return 100 * (index - start) / (end - start) 
    }
    export function number_getValueByPercent(p,axis,details){
      var {range,precision} = details;
      if(!range[axis]){return '';}
      let {start,end} = range[axis],Value = (end - start) * p / 100;
      return parseFloat((Value + start).toFixed(precision))
    }
    export function string_getValueByPercent(p,axis,details){
      var {range,KeyAxis} = details;
      if(!range[axis]){return '';}
      let {start,end} = range[axis],Value = (end - start) * p / 100;
      var a = Math.round(Value + start);
      return KeyAxis.list[a]
    }
    export function getLimitTypeNumber(data){
      var min = Infinity,max = -Infinity;
      for (var i = 0; i < data.length; i++) {
        var {points = []} = data[i];
        for (var j = 0; j < points.length; j++) { 
          let point = points[j];
          var value = this.getValue(point); 
          if(value < min){min = value;}
          if(value > max){max = value;}
        }
      }
      return {min,max};
    }

    export function eventHandler(selector, event, action,type = 'bind'){
      var me = { mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }; 
      event = 'ontouchstart' in document.documentElement ? me[event] : event;
      var element = typeof selector === "string"?(selector === "window"?$(window):$(selector)):selector; 
      element.unbind(event, action); 
      if(type === 'bind'){element.bind(event, action)}
    }
    export function getShapes(shapes,details){
      var Shapes = [];
      for(var i = 0; i < shapes.length; i++){
        let shape = shapes[i]
        let obj = {...shape};
        if(shape.points){
          obj.points = [];
          for(var j = 0; j < shape.points.length; j++){
            let {x,y} = shape.points[j];
            obj.points.push([details.getPercentByValue.x(x) + '%',-details.getPercentByValue.y(y) + '%'])
          }
        }
        else if(shape.r){
          let {x,y} = shape;
          obj.x = details.getPercentByValue.x(x) + '%';
          obj.y = -details.getPercentByValue.y(y) + '%';   
        }
        Shapes.push(obj)  
      }
      return Shapes;
    }
    export function translate(value){
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
import $ from 'jquery';
export function getGap(length){
  return Math.max(0.5,Math.round(length / 10))
}
export function value_getRange(axis){
      var {min,max,canvasSize,axisToD} = this.details;
      var filter = this.state.filter[axisToD[axis]];
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
      if(fs < start){fs = start;}
      if(fe > end){fe = end;}
      var filteredRange = {start,end,step,p1:fs,p2:fe}  
      return {start:fs,step,end:fe,filter:filteredRange}; 
    } 
    export function key_getRange(axis){
      var {canvasSize,axisToD} = this.details;
      var {keys} = this.props;
      var filter = this.state.filter[axisToD[axis]];
      var labelSize;
      if(axis === 'x'){labelSize = this.props.labelSize;}
      else{labelSize = 30;}
      var canvasSize = canvasSize[axis]
      var fs = filter[0]?keys.indexOf(filter[0]):0;
      var fe = filter[1]?keys.indexOf(filter[1]):keys.length - 1;
      if(fs === -1){fs = 0;}
      if(fe === -1){fe = keys.length - 1;}
      var filteredRange = {start:0,end:keys.length - 1,p1:fs,p2:fe};
      var count = fe - fs + 1;
      var gap = getGap(count);
      var labelSpace = canvasSize / count;
      var approveCount = Math.floor(canvasSize / labelSize);
      approveCount = approveCount < 1 ? 1:approveCount;
      var labelStep = Math.floor(count / approveCount);
      labelStep = labelStep < 1 ? 1:labelStep;
      return {
        start:fs - gap,step:labelStep,end:fe + gap,count,filter:filteredRange,labelSpace
      };
    }

    // export function getPixelByValue(value,axis){
    //   return this.getPercentByValue(value,axis) * this.details[axis === 'x'?'width':'height'] / 100;
    // }

    export function value_getPercentByValue(axis,point = {}){
      var {start,end} = this.details.range[axis];
      return 100 * (point._value - start) / (end - start) 
    }
    export function key_getPercentByValue(axis,point = {}){
      let {start,end} = this.details.range[axis]; 
      return 100 * (point._keyIndex - start) / (end - start) 
    }
    export function value_getValueByPercent(p,axis){
      var {range} = this.details;
      var {precision} = this.props;
      if(!range[axis]){return '';}
      let {start,end} = range[axis],Value = (end - start) * p / 100;
      return parseFloat((Value + start).toFixed(precision))
    }
    export function key_getValueByPercent(p,axis){
      var {range} = this.details;
      if(!range[axis]){return '';}
      let {start,end} = range[axis],Value = (end - start) * p / 100;
      var a = Math.round(Value + start);
      return a;
    }
    export function getLimitTypeNumber(data){
      var min = Infinity,max = -Infinity;
      for (var i = 0; i < data.length; i++) {
        var {points = []} = data[i];
        for (var j = 0; j < points.length; j++) { 
          let point = points[j];
          var value = this.getValue({point,dataIndex:i,pointIndex:j}); 
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
    export function key_getLabel(value){
      var {key_editLabel,keys} = this.props;
      if(value < 0 || value >= keys.length){return ''}
      if(!key_editLabel){return keys[value]}
      return key_editLabel(keys[value]);    
    }
    export function value_getLabel(value){
      var {value_editLabel} = this.props;
      return value_editLabel?value_editLabel(value):value
    }
    export function key_changeFilter(p1,p2){
      let {filter} = this.state;
      let {keys} = this.props;
      filter.key = [keys[p1],keys[p2]];
      this.SetState({filter});
    };
    export function value_changeFilter(p1,p2){
      let {filter} = this.state;
      filter.value = [p1,p2];
      this.SetState({filter});
    }

    export function getValueByPercent(percent){
      var keyIndex = this.key_getValueByPercent(percent[this.details.dToAxis['key']],this.details.dToAxis['key']);
      var {keys} = this.props;
      return {
        keyIndex,
        key:keys[keyIndex],
        value:this.value_getValueByPercent(percent[this.details.dToAxis['value']],this.details.dToAxis['value'])
      }
    }

    export function normal_getArea(points,fill,opacity){
      let area = {points:points.slice(),fill,opacity};
      area.points.splice(0,0,[points[0][0],0]);
      area.points.push([points[points.length - 1][0],0]);
      return area;
    };

    export function reverse_getArea(points,fill,opacity){
      let area = {points:points.slice(),fill,opacity};
      area.points.splice(0,0,[0,points[0][1]]);
      area.points.push([0,points[points.length - 1][1]]);
      return area;
    };
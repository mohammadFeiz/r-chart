export function getRange({min,max}){
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
export function getLimit(data,axisObj = {},axis){
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


export function getIndex(array,result,field){ 
  for(var i = 0; i < array.length; i++){
    var m = array[i];
    if(field){m = m[field]}
    if(m === result){return i;} 
  } 
  return -1;
}

export function getPosition({start,end,label},value,bar){
  if(value === undefined || value === null){return false}
  if(label.items){//اگر لیبل آیتمز داشت یعنی محور آرایه ای وگر نه محور عددی است
    var index = getIndex(label.items,value,'text');
    if(index === -1){return false;}
    var position = (index + 0.5) * 100 / (label.items.length); 
    var center = position;
    //محور زیر بار فقط می تواند از نوع استرینگ باشد
    if(bar){//در حالت بار مقدار زیر به موقعیت افزوده می شود
      var {barCount,barCounter,width} = bar;
      position = center + (width / 2 / barCount / label.items.length * (-barCount + 2 * barCounter));
    }  
    return {position,center};
  }

  var position = (value - start) * 100 / (end - start); 
  return {position,center:position};
}

export function getDetailUI(left,bottom,arr){
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
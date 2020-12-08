# r-chart (react editable line chart and bar chart)

### description
* developed by reactjs.
* create line chart , bar chart and both in one container.
* editable points By drag or popup.  
* add point on chart abilty.
* remove point on chart ability.
* high performance.
* mobile support(support touch events).
* responsive.
* customizable style.
* zoomable.
* up to 500000 point support.
* multi select points

### Instalation
```npm i r-chart```

### Usage
``` javascript
import react from "react";
import Chart from "r-chart";
<Chart />
```

##### r-chart consists of a set of data, and each data consists of a set of points.
##### r-chart have 2 axis (key axis and value axis)
##### key axis is based on chart keys array
##### value axis is based on points value

Prop            | type                                          | Default                                         | Description
--------------- | --------------------------------------------- | ----------------------------------------------- | ----------------------------
data            | Array of objects                              | Required                                        | list of chart data
keys            | Array of strings or numbers                   | Required                                        | list of chart keys
getKey          | function                                      | ({point, dataIndex, pointIndex}) => point.key   | get key from point object
getValue        | function                                      | ({point, dataIndex, pointIndex}) => point.value | get value from point object
key_gridColor   | string(color)                                 | Optional                                        | set grid lines on key axis
key_title       | string                                        | Required for show in chart popup                | title of key axis
value_title     | string                                        | Required for show in chart popup                | title of value axis
value_gridColor | string(color)                                 | Optional                                        | set grid lines on value axis
key_lines       | Array of objects                              | Optional                                        | set lines by custom style on key axis
value_lines     | Array of objects                              | Optional                                        | set lines by custom style on value axis
key_editLabel   | function                                      | Optional                                        | get each key label and return edited it
value_editLabel | function                                      | Optional                                        | get each value label and return edited it
key_zoom        | boolean                                       | false                                           | set key axis zoomable
value_zoom      | boolean                                       | false                                           | set value axis zoomable
labelSize       | number                                        | 40                                              | set size of horizontal labels
labelRotate     | number                                        | 0                                               | angle of labels on horizontal axis 
axisThickness   | object by 2 property(horizontal and vertical) | {horizontal : 50, vertical : 50}                | set thickness of horizontal and vertical axis
edit            | function                                      | Optional                                        | edit point by chart popup
add             | function                                      | Optional                                        | add point by chart popup
remove          | function                                      | Optional                                        | remove point by chart popup
onDrag          | function                                      | Optional                                        | edit point by dragging points
onDragEnd       | function                                      | Optional                                        | edit point in end of dragging
html            | function                                      | Optional                                        | add custom html on chart(example: add a button on chart)
##### each data
Prop        | Type                    | Default   | Description
----------- | ----------------------- | --------- | -----------
type        | string('line' or 'bar') | 'line'    | type of chart data
title       | string                  | 'untitle' | title of chart data
points      | array of objects        | required  | points of chart data
color       | string(color)           | '#000'    | color of chart data
dash        | array of 2 number(int)  | Optional  | dash style of line of data
lineWidth   | number                  | 2         | line width of line of data
areaOpacity | number between 0 and 1  | 0         | opacity of line chart area
pointStyle  | object or function      | Optional  | style of line chart points
text        | function                | Optional  | set text on chart points
editable    | boolean                 | true     | Specifies whether chart points can be edited or not
draggable   | boolean                 | false     | Specifies whether chart points can be edited by drag or not


# Line Chart
##### Code:
```javascript
<Chart
    data={[
      {
        type:'line',
        title:'data1',
        color:'blue',
        points:[
          {key:'January',value:10},
          {key:'February',value:15},
          {key:'March',value:25},
          {key:'April',value:30},
          {key:'May',value:40},
          {key:'June',value:35},
          {key:'July',value:40},
          {key:'August',value:60},
          {key:'September',value:60},
          {key:'October',value:75},
          {key:'November',value:80},
          {key:'December',value:100}
        ],

      },
      {
        type:'line',
        title:'data2',
        color:'crimson',
        points:[
          {key:'January',value:20},
          {key:'February',value:35},
          {key:'March',value:15},
          {key:'April',value:40},
          {key:'May',value:60},
          {key:'June',value:55},
          {key:'July',value:50},
          {key:'August',value:70},
          {key:'September',value:65},
          {key:'October',value:85},
          {key:'November',value:90},
          {key:'December',value:100}
        ],
      }
    ]}
    keys={[
      'January','February','March','April','May','June','July','August','September','October','November','December'
    ]}
  />
 ```
##### Preview(Click image and open demo on stackblitz):
[![alt text](/images/line%20chart.jpg)](https://stackblitz.com/edit/r-chart-demo-line-chart?embed=1&file=src/App.js)



# Bar Chart
##### Code:
```javascript
<Chart
    data={[
      {
        type:'bar',
        title:'data1',
        color:'blue',
        points:[
          {key:'January',value:10},
          {key:'February',value:15},
          {key:'March',value:25},
          {key:'April',value:30},
          {key:'May',value:40},
          {key:'June',value:35},
          {key:'July',value:40},
          {key:'August',value:60},
          {key:'September',value:60},
          {key:'October',value:75},
          {key:'November',value:80},
          {key:'December',value:100}
        ],

      },
      {
        type:'bar',
        title:'data2',
        color:'crimson',
        points:[
          {key:'January',value:20},
          {key:'February',value:35},
          {key:'March',value:15},
          {key:'April',value:40},
          {key:'May',value:60},
          {key:'June',value:55},
          {key:'July',value:50},
          {key:'August',value:70},
          {key:'September',value:65},
          {key:'October',value:85},
          {key:'November',value:90},
          {key:'December',value:100}
        ],
      }
    ]}
    keys={[
      'January','February','March','April','May','June','July','August','September','October','November','December'
    ]}
  />
 ```
##### Preview(Click image and open demo on stackblitz):
[![alt text](/images/bar%20chart.jpg)](https://stackblitz.com/edit/r-chart-demo-bar-chart?embed=1&file=src/App.js)



# Line Chart And Bar Chart
##### Code:
```javascript
<Chart
    data={[
      {
        type:'line',
        title:'data1',
        color:'blue',
        points:[
          {key:'January',value:10},
          {key:'February',value:15},
          {key:'March',value:25},
          {key:'April',value:30},
          {key:'May',value:40},
          {key:'June',value:35},
          {key:'July',value:40},
          {key:'August',value:60},
          {key:'September',value:60},
          {key:'October',value:75},
          {key:'November',value:80},
          {key:'December',value:100}
        ],

      },
      {
        type:'bar',
        title:'data2',
        color:'crimson',
        points:[
          {key:'January',value:20},
          {key:'February',value:35},
          {key:'March',value:15},
          {key:'April',value:40},
          {key:'May',value:60},
          {key:'June',value:55},
          {key:'July',value:50},
          {key:'August',value:70},
          {key:'September',value:65},
          {key:'October',value:85},
          {key:'November',value:90},
          {key:'December',value:100}
        ],
      }
    ]}
    keys={[
      'January','February','March','April','May','June','July','August','September','October','November','December'
    ]}
  />
 ```
##### Preview(Click image and open demo on stackblitz):
[![alt text](/images/line%20chart%20and%20bar%20chart.jpg)](https://stackblitz.com/edit/r-chart-demo-line-chart-and-bar-chart?embed=1&file=src/App.js)



# Label Size
###### Set width of horizontal axis labels by 'labelSize' prop to prevent those to interference .
##### Code:
```javascript
<Chart
  ...
  labelSize={90}
  ...
/>
```
##### Preview(Click image and open demo on stackblitz):
[![alt text](/images/label%20size.jpg)](https://stackblitz.com/edit/r-chart-demo-label-size?embed=1&file=src/App.js)



# Edit Labels
###### Set 'key_editLabel' function to edit 'key axis' labels.
###### Set 'value_editLabel' function to edit 'value axis' labels.
##### Code:
```javascript
<Chart
  ...
  key_editLabel={(key)=>key.slice(0,3)}
  value_editLabel={(value)=>value + '%'}
  ...
/>`
```
##### Preview(Click image and open demo on stackblitz):
[![alt text](/images/edit%20labels.jpg)](https://www.google.com)



# Grid Lines
###### Set 'key_gridColor' to show and set color of grid lines on key axis.
###### Set 'value_gridColor' to show and set color of grid lines on value axis.
##### Code:
```javascript
<Chart
  ...
  key_gridColor={'#ddd'}
  value_gridColor={'#ddd'}
  ...
/>
```
##### Preview(Click image and open demo on stackblitz):
[![alt text](/images/grid%20lines.jpg)](https://stackblitz.com/edit/r-chart-demo-grid-lines?embed=1&file=src/App.js)



# Get key and value from points object
###### Read key from point object by 'getKey' prop function on data.
###### Read value from point object by 'getValue' prop function on data.
##### Code:
```javascript
<Chart
  ...
  data={[
    {
      type:'line',
      title:'data',
      color:'blue',
      points:[
        {date:'January',percent:10},
        {date:'February',percent:15},
        {date:'March',percent:25},
        {date:'April',percent:30},
        {date:'May',percent:40},
        {date:'June',percent:35},
        {date:'July',percent:40},
        {date:'August',percent:60},
        {date:'September',percent:60},
        {date:'October',percent:75},
        {date:'November',percent:80},
        {date:'December',percent:100}
      ],
    }
  ]}
  keys={[
    'January','February','March','April','May','June','July','August','September','October','November','December'
  ]}
  getKey={({point,dataIndex,pointIndex})=>point.date}
  getValue={({point,dataIndex,pointIndex})=>point.percent}
  ...
/>
```
##### Preview(Click image and open demo on stackblitz):
[![alt text](/images/get%20key%20get%20value.jpg)](https://stackblitz.com/edit/r-chart-demo-get-key-get-value?embed=1&file=src/App.js)



# Set Multi Data by diffrent styles
###### Set 3 data on 'data' prop by diffrent styles.
###### Controlling line chart style by 'dash' , 'lineWidth' , 'color' and 'areaOpacity' property on data
##### Code:
```javascript
<Chart
  ...
  data={[
    {
      ...
      title:'data1',
      color:'blue',
      dash:[4,2],
      areaOpacity:0.2
      ...
    },
    {
      ...
      title:'data2',
      color:'#03ebcc',
      lineWidth:4,
      ...
    },
    {
      ...
      title:'data3',
      color:'#e414c8',
      dash:[7,5],
    }
  ]}
  ...
/>
```
##### Preview(Click image and open demo on stackblitz):
[![alt text](/images/multi%20data.jpg)](https://stackblitz.com/edit/r-chart-demo-multi-data?embed=1&file=src/App.js)



# Set Point Style
###### Set circle on each points by set 'pointStyle' prop on data (object type).
##### Code:
```javascript
<Chart
  ...
  data={[
    {
      ...
      pointStyle:{
        radius:5
      }
      ...
    }
  ]}
  ...
/>
```
##### Preview(Click image and open demo on stackblitz):
[![alt text](/images/point%20style%201.jpg)](https://stackblitz.com/edit/r-chart-demo-point-style-1?embed=1&file=src/App.js)



###### Set circle on each points by set 'pointStyle' prop on data (object type).
##### Code:
```javascript
<Chart
  ...
  data={[
    {
      ...
      pointStyle:{
        radius:5,fill:'blue',stroke:'rgba(0,0,255,.1)',lineWidth:6
      }
      ...
    }
  ]}
  ...
/>
```
##### Preview(Click image and open demo on stackblitz):
[![alt text](/images/point%20style%202.jpg)](https://stackblitz.com/edit/r-chart-demo-point-style-2?embed=1&file=src/App.js)
###### Set circle on each points by set 'pointStyle' prop on data (function type).
##### Code:
```javascript
<Chart
  ...
  data={[
    {
      ...
      pointStyle:({point,dataIndex,pointIndex})=>{
        if(pointIndex === 0){
          return {radius:5,fill:'blue'}
        }
        if(point.date === 'August'){
          return {radius:8,stroke:'red',lineWidth:2,dash:[4,3]}
        }
        else{
          return {radius:5}
        }
      }
      ...
    }
  ]}
  ...
/>
```
##### Preview(Click image and open demo on stackblitz):
[![alt text](/images/point%20style%203.jpg)](https://stackblitz.com/edit/r-chart-demo-point-style-3?embed=1&file=src/App.js)



# Set Lines
###### Set lines by 'lines' prop width custom style on 'keyAxis' and 'valueAxis' prop.
##### Code:
```javascript
<Chart
  ...
  key_lines={[
    {key:'June',dash:[2,2],color:'red',lineWidth:1}
  ]}
  value_lines={[
    {value:50,dash:[8,5],color:'blue',lineWidth:2}
  ]}
  ...
/>
```
##### Preview(Click image and open demo on stackblitz):
[![alt text](/images/set%20lines.jpg)](https://stackblitz.com/edit/r-chart-demo-set-lines?embed=1&file=src/App.js)



# Set Text On Points
###### Set text on each points by set 'text' prop (function) on data that read text value from point object and can get custom style.
##### Code:
```javascript
<Chart
  ...
  data={[
    {
      ...
      points:[
        {date:'January',percent:10,size:'low'},
          {date:'February',percent:15,size:'low'},
          {date:'March',percent:25,size:'low'},
          {date:'April',percent:30,size:'low'},
          {date:'May',percent:40,size:'medium'},
          {date:'June',percent:35,size:'medium'},
          {date:'July',percent:40,size:'medium'},
          {date:'August',percent:60,size:'high'},
          {date:'September',percent:60,size:'high'},
          {date:'October',percent:75,size:'high'},
          {date:'November',percent:80,size:'high'},
          {date:'December',percent:100,size:'high'}
      ],
      text:({point,dataIndex,pointIndex})=>{
        return {
          value:point.size,
          y:-20,
          fontSize:12,
          rotate:pointIndex === 11?90:0,
          align:[0,0]
        }
      }
      ...
    }
  ]}
  ...
/>
```
##### Preview(Click image and open demo on stackblitz):
[![alt text](/images/text.jpg)](https://stackblitz.com/edit/r-chart-demo-point-text?embed=1&file=src/App.js)



# Rotate Horizontal Labels
###### rotate horizontal labels by 'labelRotate' props.
##### Code:
```javascript
<Chart
  ...
  labelRotate={45}
  ...
/>
```
##### Preview(Click image and open demo on stackblitz):
[![alt text](/images/label%20rotate.jpg)](https://stackblitz.com/edit/r-chart-demo-rotate-labels?embed=1&file=src/App.js)



# Set Axis Thickness
###### Set horizontal and vertical axis thickness by 'axisSize' props.
##### Code:
```javascript
<Chart
  ...
  value_editLabel={(value)=>value * 1000 + '$'}
  axisThickness={{horizontal:90,vertical:70}}
  labelRotate={90}
  labelSize={40}
  ...
/>
```
##### Preview(Click image and open demo on stackblitz):
[![alt text](/images/axis%20thickness.jpg)](https://stackblitz.com/edit/r-char-demo-axis-size?embed=1&file=src/App.js)

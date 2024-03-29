# r-chart (react editable line chart and bar chart)
![alt text](/images/changedemo.gif)
![alt text](/images/zoom.gif)
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

# end of preview
##### Code:
```javascript
import React,{Component,Fragment} from "react";
import Chart from './r-chart'
import './style.css';
export default class App extends Component{
    state = {
        targets:[
            {date:'January',amount:10,size:8},
            {date:'February',amount:30},
            {date:'March',amount:20},
            {date:'May',amount:15},
            {date:'July',amount:50},
            {date:'August',amount:55},
            {date:'September',amount:40},
            {date:'October',amount:20},
            {date:'November',amount:40},
            {date:'December',amount:50},
        ],
        sales:[
            {date:'January',amount:0},
            {date:'February',amount:20},
            {date:'March',amount:40},
            {date:'April',amount:40},
            {date:'May',amount:45},
            {date:'June',amount:30},
            {date:'July',amount:10}
        ],
        logs:[]
    }
    change({point,key,value,dataIndex,pointIndex,drag}){
        var {targets,sales,logs} = this.state;
        if(dataIndex === 0){
            targets[pointIndex].amount = value;
            if(!drag){//drag end
                logs.push(`You changed this.state.targets[${pointIndex}].amount to ${value}`);
            }
            this.setState({targets,logs})    
        }
        else if(dataIndex === 1){
            sales[pointIndex].amount = value;
            if(!drag){//drag end
                logs.push(`You changed this.state.saled[${pointIndex}].amount to ${value}`);
            }
            this.setState({sales,logs})   
        }
    }
    add({key,value,dataIndex,pointIndex}){
        var {logs} = this.state;
        var newPoint = {date:key,amount:value};
        if(dataIndex === 0){
            let {targets} = this.state;
            targets.splice(pointIndex,0,newPoint); 
            logs.push(`You added ${JSON.stringify(newPoint)} to this.state.targets`)
            this.setState({targets,logs})
        }
        else if(dataIndex === 1){
            let {sales} = this.state;
            sales.splice(pointIndex,0,{date:key,amount:value}); 
            logs.push(`You added ${JSON.stringify(newPoint)} to this.state.sales`)
            this.setState({sales,logs})
        }
    }
    remove({point,key,value,dataIndex,pointIndex}){
        var {logs} = this.state;
        if(dataIndex === 0){
            let {targets} = this.state;
            targets.splice(pointIndex,1);
            logs.push(`You removed this.state.targets[${pointIndex}]`);
            this.setState({targets,logs});
        }
        else if(dataIndex === 1){
            let {sales} = this.state;
            sales.splice(pointIndex,1);
            logs.push(`You removed this.state.sales[${pointIndex}]`)
            this.setState({sales,logs});
        }
    }
    render(){
        var {targets,sales,logs} = this.state;
        return (
            <Fragment>
                <h5>Try to drag points or click on points to open popup and edit clicked point (remove or edit)</h5>
                <h5>Try to add point where plus is apear near mouse cursor (you can add point in empty places)</h5>
                <Chart
                    data={[ 
                        {
                            type:'line',
                            color:'#0688f3',
                            getPointStyle:(point)=>{return {radius:5,fill:'blue'}},
                            getPointText:(point)=>{return {value:point.date,y:-20}},
                            title:'Data1',areaOpacity:.1,
                            points:targets
                            getKey={({point})=>point.date}
                            getValue={({point})=>point.amount}
                        },
                        {
                            type:'bar',
                            color:'#03ebcc',
                            title:'Data2',
                            points:sales,
                            getKey={({point})=>point.date}
                            getValue={({point})=>point.amount}
                        },
                    ]} 
                    keyAxis={{
                        edit:(text)=>text.slice(0,3),
                        zoom:true,
                        title:'Date'
                    }}
                    valueAxis={{
                        edit:(value)=>value + '%',
                        gridColor:'#ddd',
                        zoom:true,
                        title:'Amount'
                    }}
                    keys={['January','February','March','April','May','June','July','August','September','October','November','December']}
                    onChange={this.change.bind(this)}
                    onAdd={this.add.bind(this)}
                    onRemove={this.remove.bind(this)}
                />
                <h3>Logs</h3>
                <div className='logs'>
                    <ul>
                        {logs.map((log,i)=><li key={i}>{log}</li>)}
                    </ul>
                </div>
            </Fragment> 
        )
    }
}
```
##### Preview(Click image and open demo on stackblitz):
[![alt text](/images/events.jpg)](https://stackblitz.com/edit/r-chart-demo-add-edit-remove?embed=1&file=src/App.js)


##### r-chart consists of a set of data, and each data consists of a set of points.
##### r-chart have 2 axis (key axis and value axis)
##### key axis is based on chart keys array
##### value axis is based on points value

##### root props
Prop            | type                                          | Default                                         | Description
--------------- | --------------------------------------------- | ----------------------------------------------- | ----------------------------
data            | Array of objects                              | Required                                        | list of chart data
keys            | Array of strings or numbers                   | Required                                        | list of chart keys
keyAxis         | object                                        | Required                                        | key axis properties
valueAxis       | object                                        | Required                                        | value axis properties
labelSize       | number                                        | 40                                              | set size of horizontal labels
labelRotate     | number                                        | 0                                               | angle of labels on horizontal axis 
onChange        | function                                      | Optional                                        | change points value in chart popup or dragging points.
onAdd           | function                                      | Optional                                        | get point details for add
onRemove        | function                                      | Optional                                        | get point details for remove
html            | function                                      | Optional                                        | add custom html on chart(example: add a button on chart)

##### each data object properties
Property       | Type                    | Default                                         | Description
-------------- | ----------------------- | ----------------------------------------------- | -----------
type           | string('line' or 'bar') | 'line'                                          | type of chart data
title          | string                  | 'untitle'                                       | title of chart data
getKey         | function                | Required                                        | get key from point object
getValue       | function                | Required                                        | get value from point object
points         | array of objects        | required                                        | points of chart data
color          | string(color)           | '#000'                                          | color of chart data
dash           | array of 2 number(int)  | Optional                                        | dash style of line of data
lineWidth      | number                  | 2                                               | line width of line of data
area           | boolean                 | false                                           | show line chart area
getPointStyle  | function                | Optional                                        | get point object and returns style of line chart point
getPointText   | function                | Optional                                        | get point object and returns text for render on chart point
editable       | boolean                 | true                                            | Specifies whether chart points can be edited or not
draggable      | boolean                 | false                                           | Specifies whether chart points can be edited by drag or not

##### keyAxis properties
Prop            | type                                          | Default                                         | Description
--------------- | --------------------------------------------- | ----------------------------------------------- | ----------------------------
gridColor       | string(color)                                 | Optional                                        | set grid lines on key axis
title           | string                                        | Required for show in chart popup                | title of key axis
lines           | Array of objects                              | Optional                                        | set lines by custom style on key axis
edit            | function                                      | Optional                                        | get each key label and return edited it
zoom            | boolean                                       | false                                           | set key axis zoomable
size            | number                                        | 50                                              | set thickness of key axis

##### valueAxis properties
Prop            | type                                          | Default                                         | Description
--------------- | --------------------------------------------- | ----------------------------------------------- | ----------------------------
gridColor       | string(color)                                 | Optional                                        | set grid lines on value axis
title           | string                                        | Required for show in chart popup                | title of value axis
lines           | Array of objects                              | Optional                                        | set lines by custom style on value axis
edit            | function                                      | Optional                                        | get each value label and return edited it
zoom            | boolean                                       | false                                           | set value axis zoomable
size            | number                                        | 50                                              | set thickness of key value


##### onChange props 
is a function  that get changed point details as a parameter.
this parameter type is object and has this properties: 
* dataIndex(index of data of changed point)(number)
* pointIndex(index of changed point)(number)
* value(value of point)(number)
* key(key of point)(string or number)
* point(object of point)(object)
* drag(if is true mean this point is changed by drag)(boolean)


# Line Chart
##### Code:
```javascript
<Chart
    data={[
      {
        type:'line',
        title:'data1',
        color:'blue',
        getKey:(point)=>point.date,
        getValue:(point)=>point.value,
        points:[
          {date:'January',value:10},
          {date:'February',value:15},
          {date:'March',value:25},
          {date:'April',value:30},
          {date:'May',value:40},
          {date:'June',value:35},
          {date:'July',value:40},
          {date:'August',value:60},
          {date:'September',value:60},
          {date:'October',value:75},
          {date:'November',value:80},
          {date:'December',value:100}
        ],

      },
      {
        type:'line',
        title:'data2',
        getKey:(point)=>point.date,
        getValue:(point)=>point.value,
        color:'crimson',
        points:[
          {date:'January',value:20},
          {date:'February',value:35},
          {date:'March',value:15},
          {date:'April',value:40},
          {date:'May',value:60},
          {date:'June',value:55},
          {date:'July',value:50},
          {date:'August',value:70},
          {date:'September',value:65},
          {date:'October',value:85},
          {date:'November',value:90},
          {date:'December',value:100}
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
        getKey:(point)=>point.date,
        getValue:(point)=>point.value,
        points:[
          {date:'January',value:10},
          {date:'February',value:15},
          {date:'March',value:25},
          {date:'April',value:30},
          {date:'May',value:40},
          {date:'June',value:35},
          {date:'July',value:40},
          {date:'August',value:60},
          {date:'September',value:60},
          {date:'October',value:75},
          {date:'November',value:80},
          {date:'December',value:100}
        ],

      },
      {
        type:'bar',
        title:'data2',
        getKey:(point)=>point.date,
        getValue:(point)=>point.value,
        color:'crimson',
        points:[
          {date:'January',value:20},
          {date:'February',value:35},
          {date:'March',value:15},
          {date:'April',value:40},
          {date:'May',value:60},
          {date:'June',value:55},
          {date:'July',value:50},
          {date:'August',value:70},
          {date:'September',value:65},
          {date:'October',value:85},
          {date:'November',value:90},
          {date:'December',value:100}
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
        type:'bar',
        title:'data1',
        color:'blue',
        getKey:(point)=>point.date,
        getValue:(point)=>point.value,
        points:[
          {date:'January',value:10},
          {date:'February',value:15},
          {date:'March',value:25},
          {date:'April',value:30},
          {date:'May',value:40},
          {date:'June',value:35},
          {date:'July',value:40},
          {date:'August',value:60},
          {date:'September',value:60},
          {date:'October',value:75},
          {date:'November',value:80},
          {date:'December',value:100}
        ],

      },
      {
        type:'line',
        title:'data2',
        getKey:(point)=>point.date,
        getValue:(point)=>point.value,
        color:'crimson',
        points:[
          {date:'January',value:20},
          {date:'February',value:35},
          {date:'March',value:15},
          {date:'April',value:40},
          {date:'May',value:60},
          {date:'June',value:55},
          {date:'July',value:50},
          {date:'August',value:70},
          {date:'September',value:65},
          {date:'October',value:85},
          {date:'November',value:90},
          {date:'December',value:100}
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
###### Set 'edit' function in ketAxis props to edit 'key axis' labels.
###### Set 'edit' function in valueAxis props to edit 'value axis' labels.
##### Code:
```javascript
<Chart
  ...
  keyAxis={{
    ...
    edit:(key)=>key.slice(0,3)
    ...
  }}
  valueAxis={{
    ...
    edit:(value)=>value + '%'
    ...
  }}
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
  keyAxis={{
    ...
    gridLines:'#ddd'
    ...
  }}
  valueAxis={{
    ...
    gridLines:'#ddd'
    ...
  }}
  ...
/>`

```
##### Preview(Click image and open demo on stackblitz):
[![alt text](/images/grid%20lines.jpg)](https://stackblitz.com/edit/r-chart-demo-grid-lines?embed=1&file=src/App.js)

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
      area:true
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


# Get Point Style
###### Set circle on each points by set 'getPointStyle' function prop on data.
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
##### Code:
```javascript
<Chart
  ...
  data={[
    {
      ...
      getPointStyle:(point)=>{
        if(point.date === 'January'){
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
###### Set lines by 'lines' prop width custom style on 'keyAxis' or 'valueAxis' props.
##### Code:
```javascript
<Chart
  ...
  keyAxis={
    ...
    lines:[
        {key:'June',dash:[2,2],color:'red',lineWidth:1}
    ]
    ...
  }
  valueAxis={
    ...
    lines:[
        {value:50,dash:[8,5],color:'blue',lineWidth:2}
    ]
    ...
  }
  ...
/>
```
##### Preview(Click image and open demo on stackblitz):
[![alt text](/images/set%20lines.jpg)](https://stackblitz.com/edit/r-chart-demo-set-lines?embed=1&file=src/App.js)



# Set Text On Points
###### Set text on each points by set 'getPointText' function props on data that read text value from point object and can get custom style.
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
      getPointText:(point)=>{
        return {
          value:point.size,
          top:20,
          fontSize:12,
          rotate:point.date === 'December'?90:0,
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



# Set Axis Size
###### Set axis thickness by 'size' property in keyAxis or valueAxis.
##### Code:
```javascript
<Chart
  ...
  keyAxis={{
    size:90  
  }}
  valueAxis={{
    edit:(value)=>value * 1000 + '$',
    size:70  
  }}
  labelRotate={90}
  labelSize={40}
  ...
/>
```
##### Preview(Click image and open demo on stackblitz):
[![alt text](/images/axis%20thickness.jpg)](https://stackblitz.com/edit/r-char-demo-axis-size?embed=1&file=src/App.js)





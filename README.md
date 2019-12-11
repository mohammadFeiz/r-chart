# r-chart


### description
* create line chart , bar chart and combo chart.
* editable points. select point(s) and drag to change value.  
* developed by reactjs.
* responsive.
* customizable style.
* zoomable.
* up to 1000000 point support.

### Zoom Demo
![GitHub Logo](/images/r-chart-zoom.gif)

### Edit Demo
![GitHub Logo](/images/r-chart-edit.gif)


### Instalation
```npm i r-chart```

### Usage

``` javascript
import react from 'react';
import RChart from "r-chart";
<RCahrt data={} x={} y={} padding={} onchange={} style={}/>
```

### Root Properties
Properties | Type | Required | Description
---------- | ---- | -------- | -----------
data | Array of objects | Required | Each member of data is an object that render a sort of values(line or bars).</td>
x | Object | Required | Horizontal axis configuration
y | Object | Required | Vertical axis configuration
padding | Object | default is {left:30,top:20,right:20,bottom:30} | Set padding of chart container. has 4 properties that get number value (left,top,right and bottom)
onchange | function(callback) | Optional | Set onchange for edit mode. onchange is an callback that receive changed data as parameter
style | Object(css object) | Optional | Set inline style for chart container.
className | string | Optional | Set class attribute for chart
id | string | Optional | Set id attribute for chart

### data Properties
Properties | Type | Required | Description
---------- | ---- | -------- | -----------
stream | Array of objects | Required | Each member of stream is a point of data that have x and y properties.
type | string | default is "line" | Type of chart for this member of data("line" or "bar")
color | string | default is "#444" | Color of this member of data.
showLine | boolean | default is true | Set for show lines of **line chart**.
lineWidth | number(+) | default is 2 | Set width of lines in **line chart**.
dash | Array of 2 number | Optional | Set dashed style for lines in **line chart**. first number is length of fill and second number is length of empty.
showPoint | boolean | default is false | Set true for show points of data in **line chart**. 
pointColor | string | default is "#444" | Color of point in line chart.
r | number | default is 3 | Radius of **line chart** points.
width | number | default is 80 | Number between 1 and 100. width percent of bars in **bar chart**.
### **x** Properties
Properties | Type | Required | Description
---------- | ---- | -------- | -----------
labels | Array of strings | Required if x property of stream members is string | List of labels of horizontal axis. use when x property of stream members is string
zoom | boolean | default is false | set horizontal axis zoomable.
gridColor | string | Optional | Color of horizontal grid lines.
rotation | number | Optional | Set angle of horizontal labels.
### y Properties
Properties | Type | Required | Description
---------- | ---- | -------- | -----------
zoom | boolean | default is false | set vertical axis zoomable.
gridColor | string | Optional | Color of vertical grid lines.

### Sample Configuration

```javascript
<RChart
    className='chart'
    id='my-chart'
    data={[
       {
          color:'lightgreen',type:'bar',width:60,
          stream:[
            {x:'Jan',y:0},{x:'Feb',y:4},{x:'Mar',y:0},{x:'Apr',y:3},{x:'May',y:5}
          ]
       },
      {
        lineWidth:2,color:'orange',r:4,showPoint:true,dash:[5,3],pointColor:'yellow',
        stream:[
          {x:'Jan',y:0},{x:'Feb',y:4},{x:'Mar',y:0},{x:'Apr',y:3},{x:'May',y:20}
        ],
      },
    ]
    x={{
      gridColor:'#ddd',
      zoom:true,
      rotation:10,
      labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec" ],
    }}
    y={{
      gridColor:'#ddd',
      zoom:true
    }}
    padding={{top:8,right:8,bottom:50,top:20}}
    onchange={(data)=>{
      this.setState({data});
    }}
 />
 ```
[**Demo on stackblitz**](https://stackblitz.com/edit/r-chart-qfx76m?embed=1&file=index.js)

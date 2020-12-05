# r-chart (react editable line chart and bar chart)
![GitHub Logo](/images/r-chart-dark.png)


### description
* create line chart , bar chart and combo chart.
* editable points By drag or popup.  
* developed by reactjs.
* responsive.
* customizable style.
* zoomable.
* up to 1000000 point support.

### Zoom Demo
![GitHub Logo](/images/r-chart-zoom.gif)

### Edit Demo
![GitHub Logo](/images/basic.gif)


### Instalation
```npm i r-chart```

### Usage

``` javascript
import react from 'react';
import RChart from "r-chart";
<RChart />
```
### Basic
![GitHub Logo](/images/r-chart-zoom.gif)
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
barWidth | number between 1 and 100 | default is 80 | Number between 1 and 100. width percent of bars in **bar chart**.
### data Properties
Properties | Type | Required | Description
---------- | ---- | -------- | -----------
stream | Array of objects | Required | Each member of stream is a point of data that have x, y, r and show properties.
type | string | default is "line" | Type of chart for this member of data("line" or "bar")
color | string | default is "#444" | Color of this member of data.
showLine | boolean | default is true | Set for show lines of **line chart**.
lineWidth | number(+) | default is 2 | Set width of lines in **line chart**.
dash | Array of 2 number | Optional | Set dashed style for lines in **line chart**. first number is length of fill and second number is length of empty.
showPoint | boolean | default is false | Set true for show points of data in **line chart**. 
pointColor | string | default is "#444" | Color of point in line chart.
r | number | default is 3 | Radius of **line chart** points.
title | 'string' | default is 'untitle' | title of data.
selectable | boolean | default is true | if set false , user cannot select points of this data for edit.
show | boolean | default is true | show and hide data in chart.
area | number between 0 and 1 | optional | show area under **line chart**
### stream Properties
Properties | Type | Required | Description
---------- | ---- | -------- | -----------
x | number or string | required | point value on horizontal axis
y | number or string | required | point value on vertical axis
r | number | optional | set self radius on each point. default radius is r in data property
show | boolean | default is true | set show or not for one point

### **x** Properties
Properties | Type | Required | Description
---------- | ---- | -------- | -----------
labels | Array of strings | Required if x property of stream members is string | List of labels of horizontal axis. use when x property of stream members is string
zoom | boolean | default is false | set horizontal axis zoomable.
gridColor | string | Optional | Color of horizontal grid lines.
rotation | number | Optional | Set angle of horizontal labels. for optimal use of space.
### y Properties
Properties | Type | Required | Description
---------- | ---- | -------- | -----------
labels | Array of strings | Required if y property of stream members is string | List of labels of vertical axis. use when y property of stream members is string
zoom | boolean | default is false | set vertical axis zoomable.
gridColor | string | Optional | Color of vertical grid lines.

### Sample Configuration

```javascript
<RChart
    className='chart'
    id='my-chart' // set html id for chart element
    barWidth:50, // set html class for chart element
    padding={{
        top:8, //padding top 
        right:8, //padding right
        bottom:50, //padding bottom
        left:30 //padding left 
    }}
    // this chart have 2 data set
    data={[
       {
          type:'bar', // first data will render bar chart
          title:'Buy', // title of first data is Buy
          color:'lightgreen', // color of first data is lightgreen
          stream:[ //points of first data
            {
                x:'Jan', // this point will render in position of Jan label horizontaly 
                y:0, //this point will render in position of 0 label verticaly
                show:false // this point will not render
            },
            {x:'Feb',y:4},
            {x:'Mar',y:0},
            {x:'Apr',y:3},
            {x:'May',y:5}
          ]
       },
      {
        type:'line',// second data will render line chart
        title:'Sale', // title of second data is Sale
        lineWidth:2, // line width of line chart will be 2px
        color:'orange', color of second data is orange
        r:4, // public radius of points in second data
        showPoint:true, // points will be rendered in second data
        dash:[5,3], // lines of second data will be dashed
        pointColor:'yellow', // background color points of second data will be yellow
        stream:[ // points of second data
          {x:'Jan',y:0},{x:'Feb',y:4},{x:'Mar',y:0},{x:'Apr',y:3},{x:'May',y:20}
        ],
      },
    ]
    x={{
      gridColor:'#ddd', // horizontal grid lines will be rendered in #ddd color 
      zoom:true, // horizontal axis is zoomable
      rotation:10, // rotate horizontal labels in 10 degree
      labels:[ // sort of labels of horizontal axis
        "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
      ],
    }}
    y={{
      gridColor:'#ddd', // vertical grid lines will be rendered in #ddd color 
      zoom:true // vertical axis is zoomable
    }}
    onchange={(data)=>{ // change data callback
      this.setState({data});
    }}
 />
 ```
[**Demo on stackblitz**](https://stackblitz.com/edit/r-chart-qfx76m?embed=1&file=index.js)

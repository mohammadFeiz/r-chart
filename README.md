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

### Instalation
```npm i r-chart```

### Usage
``` javascript
import react from "react";
import Chart from "r-chart";
<Chart />
```

### Basic
##### Code:
```javascript
<Chart
    data={[
      {
        type:'line',
        title:'data',
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
      }
    ]}
    keys={[
      'January','February','March','April','May','June','July','August','September','October','November','December'
    ]}
 />
 ```
##### Preview:
![GitHub Logo](/images/basic.jpg)



### Label Size
###### Set width of horizontal axis labels by 'labelSize' prop to prevent those to interference .
##### Code:
```javascript
<Chart
  ...
  labelSize={90}
  ...
/>
```
##### Preview:
![GitHub Logo](/images/label%20size.jpg)



### Edit Labels
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
##### Preview:
![GitHub Logo](/images/edit%20labels.jpg)



### Grid Lines
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
##### Preview:
![GitHub Logo](/images/grid%20lines.jpg)



### Label Size
###### Set width of horizontal axis labels by 'labelSize' prop to prevent those to interference .
##### Code:
```javascript
<Chart
  ...
  labelSize={90}
  ...
/>
```
##### Preview:
![GitHub Logo](/images/label%20size.jpg)
##### Preview:
![GitHub Logo](/images/basic.jpg)

### Label Size
###### Set width of horizontal axis labels by 'labelSize' prop to prevent those to interference .
##### Code:
```javascript
<Chart
  ...
  labelSize={90}
  ...
/>
```
##### Preview:
![GitHub Logo](/images/label%20size.jpg)
##### Preview:
![GitHub Logo](/images/basic.jpg)

### Label Size
###### Set width of horizontal axis labels by 'labelSize' prop to prevent those to interference .
##### Code:
```javascript
<Chart
  ...
  labelSize={90}
  ...
/>
```
##### Preview:
![GitHub Logo](/images/label%20size.jpg)
##### Preview:
![GitHub Logo](/images/basic.jpg)

### Label Size
###### Set width of horizontal axis labels by 'labelSize' prop to prevent those to interference .
##### Code:
```javascript
<Chart
  ...
  labelSize={90}
  ...
/>
```
##### Preview:
![GitHub Logo](/images/label%20size.jpg)
##### Preview:
![GitHub Logo](/images/basic.jpg)

### Label Size
###### Set width of horizontal axis labels by 'labelSize' prop to prevent those to interference .
##### Code:
```javascript
<Chart
  ...
  labelSize={90}
  ...
/>
```
##### Preview:
![GitHub Logo](/images/label%20size.jpg)
##### Preview:
![GitHub Logo](/images/basic.jpg)

### Label Size
###### Set width of horizontal axis labels by 'labelSize' prop to prevent those to interference .
##### Code:
```javascript
<Chart
  ...
  labelSize={90}
  ...
/>
```
##### Preview:
![GitHub Logo](/images/label%20size.jpg)




[**Demo on stackblitz**](https://stackblitz.com/edit/r-chart-qfx76m?embed=1&file=index.js)

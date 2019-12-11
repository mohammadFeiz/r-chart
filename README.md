# r-chart
<h3>description</h3><br>
<ul>
  <li>
    create line chart , bar chart and combo chart.
  </li>
  <li>
    editable points. select point(s) and drag to change value.  
  </li>
  <li>
    developed by reactjs.
  </li>
  <li>
    responsive.
  </li>
  <li>
    customizable style.
  </li>
  <li>
    zoomable.
  </li>
  <li>
   up to 1000000 point support.
  </li>
</ul> 

<h3>Instalation</h3>
npm i r-chart

<h3>Usage</h3>
import RChart from "r-chart";
<code><<code>RChart data={...} x={...} y={...} style={(optional inline css)}/</code>></code>

<h3>Root Properties</h3>
<table>
  <tr>
    <th>Properties</th>
    <th>Type</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>data</td>
    <td>Array of objects</td>
    <td>Required</td>
    <td>each member of data is an object that render a sort of values(line or bars).</td>
  </tr>
  <tr>
    <td>x</td>
    <td>object</td>
    <td>Required</td>
    <td>horizontal axis configuration.</td>
  </tr>
  <tr>
    <td>y</td>
    <td>object</td>
    <td>Required</td>
    <td>vertical axis configuration.</td>
  </tr>
</table>


<h3>data Properties</h3>
<table>
  <tr>
    <th>Properties</th>
    <th>Type</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>stream</td>
    <td>Array of objects</td>
    <td>Required</td>
    <td>Each member of stream is a point of data that have x and y properties.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>string</td>
    <td>default is "line"</td>
    <td>Type of chart for this member of data("line" or "bar").</td>
  </tr>
  <tr>
    <td>color</td>
    <td>string</td>
    <td>default is "#444"</td>
    <td>Color of this member of data.</td>
  </tr>
  <tr>
    <td>lineWidth</td>
    <td>number(+)</td>
    <td>default is 2</td>
    <td>Set width of lines in line chart.</td>
  </tr>
  <tr>
    <td>dash</td>
    <td>Array of 2 number</td>
    <td>Optional</td>
    <td>Set dashed style for lines in line chart.first number is length of fill and second number is length of empty. </td>
  </tr>
  <tr>
    <td>pointColor</td>
    <td>string</td>
    <td>default is "#444"</td>
    <td>Color of point in line chart.</td>
  </tr>
  <tr>
    <td>width</td>
    <td>number</td>
    <td>default is 80</td>
    <td>Number between 1 and 100. width percent of bars in bar chart.</td>
  </tr>
</table>

<h3>x Properties</h3>
<table>
  <tr>
    <th>Properties</th>
    <th>Type</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>labels</td>
    <td>Array of strings</td>
    <td>Required if x of stream members is string</td>
    <td>List of labels of horizontal axis. use when x property of stream members is string</td>
  </tr>
  <tr>
    <td>zoom</td>
    <td>boolean</td>
    <td>default is false</td>
    <td>set horizontal axis zoomable.</td>
  </tr>
  <tr>
    <td>gridColor</td>
    <td>string</td>
    <td>Optional</td>
    <td>Color of horizontal grid lines.</td>
  </tr>
  <tr>
    <td>rotation</td>
    <td>number</td>
    <td>Optional</td>
    <td>Set angle of horizontal labels.</td>
  </tr>
</table>

<h3>y Properties</h3>
<table>
  <tr>
    <th>Properties</th>
    <th>Type</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>zoom</td>
    <td>boolean</td>
    <td>default is false</td>
    <td>set vertical axis zoomable.</td>
  </tr>
  <tr>
    <td>gridColor</td>
    <td>string</td>
    <td>Optional</td>
    <td>Color of vertical grid lines.</td>
  </tr>
</table>

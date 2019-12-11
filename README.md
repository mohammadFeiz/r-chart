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
    customizable style
  </li>
  <li>
    zoomable
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
    <th>prop</th>
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
    <td>horizontal axis configuration</td>
  </tr>
  <tr>
    <td>y</td>
    <td>object</td>
    <td>Required</td>
    <td>vertical axis configuration</td>
  </tr>
</table>


<h3>data Properties</h3>
<table>
  <tr>
    <th>prop</th>
    <th>Type</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>stream</td>
    <td>Array of objects</td>
    <td>Required</td>
    <td>each member of stream is a point data.</td>
  </tr>
  <tr>
    <td>x</td>
    <td>object</td>
    <td>Required</td>
    <td>horizontal axis configuration</td>
  </tr>
  <tr>
    <td>y</td>
    <td>object</td>
    <td>Required</td>
    <td>vertical axis configuration</td>
  </tr>
</table>

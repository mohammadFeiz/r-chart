"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _rRangeSlider = _interopRequireDefault(require("r-range-slider"));

var _rCanvas = _interopRequireDefault(require("r-canvas"));

var _jquery = _interopRequireDefault(require("jquery"));

require("./index.css");

var _functions = require("./functions");

var _rActions = _interopRequireDefault(require("r-actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _ref = new _rActions.default(),
    eventHandler = _ref.eventHandler,
    getClient = _ref.getClient,
    fix = _ref.fix,
    getPercentByValue = _ref.getPercentByValue,
    getValueByPercent = _ref.getValueByPercent,
    binarySearch = _ref.binarySearch,
    compaire = _ref.compaire;

var chartContext = (0, _react.createContext)();

var RChart =
/*#__PURE__*/
function (_Component) {
  _inherits(RChart, _Component);

  function RChart(props) {
    var _this;

    _classCallCheck(this, RChart);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RChart).call(this, props));
    var _this$props = _this.props,
        x = _this$props.x,
        y = _this$props.y,
        data = _this$props.data;
    _this.state = {
      x: x,
      y: y,
      position: {
        x: 0,
        y: 0
      }
    };
    _this.selected = [];
    _this.state = {
      setting: false,
      open: data.map(function (d) {
        return d.show !== false;
      })
    };
    _this.isMobile = 'ontouchstart' in document.documentElement ? true : false;
    _this.dom = (0, _react.createRef)();
    (0, _jquery.default)('body').on('mouseout', '.r-chart canvas', function () {
      (0, _jquery.default)('.r-chart-detail-container').remove();
    });
    return _this;
  }

  _createClass(RChart, [{
    key: "change",
    value: function change(obj) {
      //change state.x or state.y by slider
      //if(!final){return;}
      var axis = JSON.parse(JSON.stringify(this.state[obj.axis]));

      if (axis.labels) {
        axis.filter = [axis.labels[obj.points[0].value], axis.labels[obj.points[1].value]];
      } else {
        axis.filter = [obj.points[0].value, obj.points[1].value];
      }

      this.setState(_defineProperty({}, obj.axis, axis));
    }
  }, {
    key: "onchange",
    value: function onchange(data) {
      if (this.props.onchange) {
        this.props.onchange(data.data);
      }
    }
  }, {
    key: "getFilterSlider",
    value: function getFilterSlider(axis, range) {
      var _this$state$axis = this.state[axis],
          _this$state$axis$filt = _this$state$axis.filter,
          filter = _this$state$axis$filt === void 0 ? [] : _this$state$axis$filt,
          labels = _this$state$axis.labels;
      var label, start, step, end;

      if (labels) {
        var fs = filter[0] ? (0, _functions.getIndex)(labels, function (label) {
          return label === filter[0];
        }) : 0;
        var fe = filter[1] ? (0, _functions.getIndex)(labels, function (label) {
          return label === filter[1];
        }) : labels.length - 1;
        label = {
          items: labels.map(function (m, i) {
            return {
              text: m,
              value: i
            };
          })
        };
        start = 0;
        step = 1;
        end = labels.length - 1;
      } else if (!range) {
        return false;
      } else {
        start = range.start;
        step = range.step;
        end = range.end;

        var _filter = _slicedToArray(filter, 2),
            _filter$ = _filter[0],
            fs = _filter$ === void 0 ? start : _filter$,
            _filter$2 = _filter[1],
            fe = _filter$2 === void 0 ? end : _filter$2;
      }

      return {
        start: start,
        step: step,
        end: end,
        label: label,
        points: [{
          value: fs,
          style: {
            color: '#444'
          },
          html: ''
        }, {
          value: fe,
          style: {
            color: '#444'
          },
          fillColor: '#ccc',
          html: ''
        }]
      };
    }
  }, {
    key: "getLabelSlider",
    value: function getLabelSlider(axis, range) {
      var _this$state$axis2 = this.state[axis],
          _this$state$axis2$fil = _this$state$axis2.filter,
          filter = _this$state$axis2$fil === void 0 ? [] : _this$state$axis2$fil,
          labels = _this$state$axis2.labels,
          _this$state$axis2$rot = _this$state$axis2.rotation,
          rotation = _this$state$axis2$rot === void 0 ? 0 : _this$state$axis2$rot;
      var start, step, end, labelItems, labelStep, labelStyle;

      if (labels) {
        var fs = filter[0] ? (0, _functions.getIndex)(labels, function (label) {
          return label === filter[0];
        }) : 0;
        var fe = filter[1] ? (0, _functions.getIndex)(labels, function (label) {
          return label === filter[1];
        }) : labels.length - 1;
        labelItems = labels.map(function (m, i) {
          return {
            text: m,
            value: i
          };
        }).slice(fs, fe + 1);
        start = fs - 0.5;
        step = 1;
        end = fe + 0.5;
      } else if (!range) {
        return false;
      } else {
        var _filter2 = _slicedToArray(filter, 2),
            _filter2$ = _filter2[0],
            fs = _filter2$ === void 0 ? range.start : _filter2$,
            _filter2$2 = _filter2[1],
            fe = _filter2$2 === void 0 ? range.end : _filter2$2;

        start = fs;
        step = range.step;
        end = fe;
        labelStep = range.step;
      }

      if (axis === 'x') {
        if (rotation < 0) {
          labelStyle = {
            justifyContent: 'flex-end',
            transform: "rotate(".concat(rotation, "deg)"),
            whiteSpace: 'nowrap'
          };
        } else if (rotation > 0) {
          labelStyle = {
            justifyContent: 'flex-start',
            transform: "rotate(".concat(rotation, "deg)"),
            whiteSpace: 'nowrap'
          };
        } else {
          labelStyle = {
            alignItems: 'flex-start'
          };
        }
      } else {
        labelStyle = {
          justifyContent: 'flex-end'
        };
      }

      return {
        start: start,
        end: end,
        step: step,
        label: {
          items: labelItems,
          step: labelStep,
          style: labelStyle
        },
        showPoint: false
      };
    }
  }, {
    key: "getDetail",
    value: function getDetail(axis) {
      var gridColor = this.state[axis].gridColor;
      var limit = this.limit[axis];
      var range = limit ? (0, _functions.getRange)(limit) : false;
      var labelSlider = this.getLabelSlider(axis, range);
      var filterSlider = this.getFilterSlider(axis, range);
      return {
        filterSlider: filterSlider,
        labelSlider: labelSlider,
        grid: gridColor ? this.getGridLines(labelSlider, gridColor, axis) : undefined
      };
    }
  }, {
    key: "getlineChart",
    value: function getlineChart(s, dataIndex) {
      var _this$props$data$data = this.props.data[dataIndex],
          stream = _this$props$data$data.stream,
          pointColor = _this$props$data$data.pointColor,
          _this$props$data$data2 = _this$props$data$data.lineWidth,
          lineWidth = _this$props$data$data2 === void 0 ? 1 : _this$props$data$data2,
          _this$props$data$data3 = _this$props$data$data.color,
          color = _this$props$data$data3 === void 0 ? '#444' : _this$props$data$data3,
          _this$props$data$data4 = _this$props$data$data.r,
          r = _this$props$data$data4 === void 0 ? 3 : _this$props$data$data4,
          showPoint = _this$props$data$data.showPoint,
          _this$props$data$data5 = _this$props$data$data.showLine,
          showLine = _this$props$data$data5 === void 0 ? true : _this$props$data$data5,
          _this$props$data$data6 = _this$props$data$data.show,
          show = _this$props$data$data6 === void 0 ? true : _this$props$data$data6,
          dash = _this$props$data$data.dash,
          selectable = _this$props$data$data.selectable,
          shadow = _this$props$data$data.shadow;

      if (!showLine && !showPoint) {
        return;
      }

      var points = this.getPoints(s, stream, dataIndex);
      var line = {
        dataIndex: dataIndex,
        type: 'line',
        stroke: color,
        dash: dash,
        lineWidth: lineWidth,
        selectable: selectable,
        points: points
      };
      var arcs = showPoint ? line.points.map(function (p, i) {
        var x = p.x,
            y = p.y,
            R = p.r;
        return {
          stroke: color,
          r: R || r,
          x: x,
          y: y,
          lineWidth: lineWidth * 2,
          type: 'arc',
          fill: p.selected ? 'red' : pointColor || '#fff'
        };
      }) : [];
      s.arcs = s.arcs.concat(arcs);

      if (showLine) {
        s.lines.push(line);
      }

      if (shadow) {
        var firstPoint = {
          x: points[0].x,
          y: points[0].y
        };
        var lastPoint = {
          x: points[points.length - 1].x,
          y: points[points.length - 1].y
        };
        firstPoint[this.mainAxis] = '0%';
        lastPoint[this.mainAxis] = '0%';
        s.shadows.push(_jquery.default.extend({}, line, {
          fill: color,
          stroke: false,
          opacity: .2,
          points: [firstPoint].concat(points, [lastPoint])
        }));
      }
    }
  }, {
    key: "getPoints",
    value: function getPoints(s, stream, dataIndex) {
      var points = [];

      for (var i = 0; i < stream.length; i++) {
        var str = stream[i];
        var selected = str.selected,
            x = str.x,
            y = str.y,
            r = str.r,
            _str$show = str.show,
            show = _str$show === void 0 ? true : _str$show;

        if (!show) {
          continue;
        }

        var X = this.getPointPosition(s.x.labelSlider, x, 'x');

        if (X === false) {
          continue;
        }

        var Y = this.getPointPosition(s.y.labelSlider, y, 'y');

        if (Y === false) {
          continue;
        }

        var point = {
          x: X.pos + '%',
          y: -Y.pos + '%',
          streamIndex: i,
          r: r
        };
        str.position = {
          x: X.pos,
          y: Y.pos
        };
        str.center = {
          x: X.pos,
          y: Y.pos
        };

        if (selected) {
          this.selected.push([dataIndex, i]);
          point.selected = true;
        }

        points.push(point);
      }

      return points;
    }
  }, {
    key: "getPointPosition",
    value: function getPointPosition(labelSlider, value, axis) {
      var label = labelSlider.label,
          start = labelSlider.start,
          end = labelSlider.end;
      var pos, center;

      if (label.items) {
        var index = (0, _functions.getIndex)(label.items, function (obj) {
          return obj.text === value;
        });
        var length = label.items.length;

        if (index === -1) {
          return false;
        }

        pos = (index + 0.5) * 100 / length;
        center = pos;
      } else {
        pos = (value - start) * 100 / (end - start);
        center = pos;
      }

      return {
        pos: pos,
        center: center
      };
    }
  }, {
    key: "getbarChart",
    value: function getbarChart(s, dataIndex) {
      var data = this.props.data[dataIndex];
      var stream = data.stream,
          show = data.show,
          selectable = data.selectable;

      if (show === false) {
        return;
      }

      this.barCounter++;
      var bars = this.getBars(s, dataIndex, this.barCounter);
      s.rectangles.push({
        type: 'group',
        items: bars,
        dataIndex: dataIndex,
        selectable: selectable
      });
    }
  }, {
    key: "getBars",
    value: function getBars(s, dataIndex, barCounter) {
      var rects = [];
      var _this$props2 = this.props,
          data = _this$props2.data,
          _this$props2$barWidth = _this$props2.barWidth,
          barWidth = _this$props2$barWidth === void 0 ? 80 : _this$props2$barWidth;
      var _data$dataIndex = data[dataIndex],
          color = _data$dataIndex.color,
          stream = _data$dataIndex.stream;

      if (barWidth < 1 || barWidth > 100) {
        barWidth = 80;
      }

      for (var i = 0; i < stream.length; i++) {
        var str = stream[i];
        var selected = str.selected,
            x = str.x,
            y = str.y,
            _str$show2 = str.show,
            show = _str$show2 === void 0 ? true : _str$show2;

        if (!show) {
          continue;
        }

        if (selected) {
          this.selected.push([dataIndex, i]);
        }

        var X = this.getBarPosition(s.x.labelSlider, x, 'x', barCounter, barWidth);

        if (X === false) {
          continue;
        }

        var Y = this.getBarPosition(s.y.labelSlider, y, 'y', barCounter, barWidth);

        if (Y === false) {
          continue;
        }

        str.position = {
          x: X.pos,
          y: Y.pos
        };
        str.center = {
          x: X.center,
          y: Y.center
        };
        rects.push({
          type: 'rectangle',
          x: X.pos + '%',
          y: -Y.pos + '%',
          width: X.size + '%',
          height: Y.size + '%',
          streamIndex: i,
          fill: selected ? 'red' : color,
          //shadow: [3, 3, 6, 'rgba(10,10,10,.4)']
        });
      }

      return rects;
    }
  }, {
    key: "getBarPosition",
    value: function getBarPosition(labelSlider, value, axis, barCounter, barWidth) {
      var label = labelSlider.label,
          start = labelSlider.start,
          end = labelSlider.end;
      var pos, center, size;

      if (label.items) {
        //if(axis === 'y'){debugger;}
        var index = (0, _functions.getIndex)(label.items, function (obj) {
          return obj.text === value;
        });

        if (index === -1) {
          return false;
        }

        var length = label.items.length;
        center = (index + 0.5) * 100 / length;
        var barUnit = barWidth / length / this.barCount;
        var offsetFromCenter = barUnit * (barCounter - this.barCount / 2);
        pos = center + offsetFromCenter + (axis === 'y' ? barUnit : 0);
        size = barWidth / this.barCount / length;
      } else {
        center = (value - start) * 100 / (end - start);
        pos = axis === 'x' ? 0 : center;
        size = center;
      }

      return {
        pos: pos,
        center: center,
        size: size
      };
    }
  }, {
    key: "updateData",
    value: function updateData() {
      var data = this.props.data;
      var _this$state = this.state,
          x = _this$state.x,
          y = _this$state.y;
      var s = {
        barCount: 0,
        lines: [],
        arcs: [],
        rectangles: [],
        shadows: []
      };

      if (this.setLimit !== false) {
        this.limit = {
          x: (0, _functions.getLimit)(data, x, 'x'),
          y: (0, _functions.getLimit)(data, y, 'y')
        };
      }

      s.x = this.getDetail('x');
      s.y = this.getDetail('y');

      if (s.y.labelSlider.label.items && !s.x.labelSlider.label.items) {
        this.mainAxis = 'x';
        this.secondAxis = 'y';
        this.sign = -1;
      } else {
        this.mainAxis = 'y';
        this.secondAxis = 'x';
        this.sign = 1;
      }

      this.barCount = data.filter(function (d) {
        return d.type === 'bar';
      }).length;
      this.barCounter = -1;

      for (var i = 0; i < data.length; i++) {
        var _data$i = data[i],
            _data$i$type = _data$i.type,
            type = _data$i$type === void 0 ? 'line' : _data$i$type,
            _data$i$show = _data$i.show,
            show = _data$i$show === void 0 ? true : _data$i$show;

        if (!this.state.open[i]) {
          continue;
        }

        if (type === 'line') {
          this.getlineChart(s, i);
        } else {
          this.getbarChart(s, i);
        } //this[`get${type}Chart`](data[i],s,i);    

      }

      return s;
    }
  }, {
    key: "getGridLines",
    value: function getGridLines(_ref2, color, axis) {
      var start = _ref2.start,
          step = _ref2.step,
          end = _ref2.end;
      var value = Math.round((start - step) / step) * step;
      var grid = {
        id: axis + '-grid',
        items: [],
        type: 'group'
      };
      var a = 100 / (end - start);

      while (value <= end) {
        if (value >= start) {
          var val = (value - start) * a;
          var p1 = axis === 'x' ? {
            x: val + '%',
            y: 0 + '%'
          } : {
            x: 0 + '%',
            y: -val + '%'
          };
          var p2 = axis === 'x' ? {
            x: val + '%',
            y: -100 + '%'
          } : {
            x: 100 + '%',
            y: -val + '%'
          };
          grid.items.push({
            stroke: color,
            lineWidth: 0.7,
            points: [p1, p2],
            type: 'line'
          });
        }

        value += step;
      }

      return grid;
    }
  }, {
    key: "getStyle",
    value: function getStyle(axis) {
      var _this$props3 = this.props,
          filter = _this$props3.filter,
          padding = _this$props3.padding,
          defaultPadding = _this$props3.defaultPadding;
      var _padding$left = padding.left,
          left = _padding$left === void 0 ? defaultPadding.left : _padding$left,
          _padding$top = padding.top,
          top = _padding$top === void 0 ? defaultPadding.top : _padding$top,
          _padding$right = padding.right,
          right = _padding$right === void 0 ? defaultPadding.right : _padding$right,
          _padding$bottom = padding.bottom,
          bottom = _padding$bottom === void 0 ? defaultPadding.bottom : _padding$bottom;
      return axis === 'x' ? {
        bottom: 0,
        right: "".concat(right, "px"),
        width: "calc(100% - ".concat(left, "px - ").concat(right, "px)"),
        height: bottom + 'px'
      } : {
        left: 0,
        top: "".concat(top, "px"),
        width: left + 'px',
        height: "calc(100% - ".concat(bottom, "px - ").concat(top, "px)")
      };
    }
  }, {
    key: "getLength",
    value: function getLength(p1, p2) {
      var a = Math.pow((parseFloat(p1.x) - p2.x) * this.width / 100, 2);
      var b = Math.pow((parseFloat(p1.y) - p2.y) * this.height / 100, 2);
      return fix(Math.sqrt(a + b));
    }
  }, {
    key: "filterPoint",
    value: function filterPoint(filters, obj) {
      for (var i = 0; i < filters.length; i++) {
        var f = filters[i];

        if (f[1] === 'equal') {
          if (obj[f[0]] !== f[2]) {
            return false;
          }
        } else {
          if (obj[f[0]] === f[2]) {
            return false;
          }
        }
      }

      return true;
    }
  }, {
    key: "getpoint",
    value: function getpoint(lines, coords) {
      var min = 1000000;
      var data = this.props.data;
      var result;

      for (var i = 0; i < lines.length; i++) {
        var _lines$i = lines[i],
            points = _lines$i.points,
            selectable = _lines$i.selectable,
            dataIndex = _lines$i.dataIndex;

        if (selectable === false) {
          continue;
        }

        for (var j = 0; j < points.length; j++) {
          var _points$j = points[j],
              x = _points$j.x,
              y = _points$j.y,
              streamIndex = _points$j.streamIndex;
          var length = this.getLength(coords, {
            x: parseFloat(x),
            y: parseFloat(y)
          });

          if (length < min) {
            result = [dataIndex, streamIndex];
            min = length;
          }
        }
      }

      if (min < 10) {
        return result;
      }
    }
  }, {
    key: "getbar",
    value: function getbar(rectangles, coords) {
      var result;

      for (var i = 0; i < rectangles.length; i++) {
        var _rectangles$i = rectangles[i],
            items = _rectangles$i.items,
            dataIndex = _rectangles$i.dataIndex,
            selectable = _rectangles$i.selectable;

        if (selectable === false) {
          continue;
        }

        for (var j = 0; j < items.length; j++) {
          var _items$j = items[j],
              x = _items$j.x,
              y = _items$j.y,
              width = _items$j.width,
              height = _items$j.height,
              streamIndex = _items$j.streamIndex;
          x = parseFloat(x);
          y = parseFloat(y);
          width = parseFloat(width);
          height = parseFloat(height);

          if (x > coords.x) {
            continue;
          }

          if (x + width < coords.x) {
            continue;
          }

          if (coords.y < y) {
            continue;
          }

          if (coords.y > y + height) {
            continue;
          }

          return [dataIndex, streamIndex];
        }
      }
    }
  }, {
    key: "deselect",
    value: function deselect(dataIndex, streamIndex) {
      //debugger;
      var data = this.props.data;
      data[dataIndex].stream[streamIndex].selected = false;
      this.onchange({
        data: data
      });
    }
  }, {
    key: "select",
    value: function select(dataIndex, streamIndex) {
      this.selected = this.selected || [];

      for (var i = 0; i < this.selected.length; i++) {
        var _this$selected$i = _slicedToArray(this.selected[i], 2),
            a = _this$selected$i[0],
            b = _this$selected$i[1];

        if (a === dataIndex && b === streamIndex) {
          return;
        }
      }

      this.selected.push([dataIndex, streamIndex]);
      var data = this.props.data;
      data[dataIndex].stream[streamIndex].selected = true;
      this.onchange({
        data: data
      });
      return true;
    }
  }, {
    key: "deselectAll",
    value: function deselectAll() {
      var data = this.props.data;

      for (var i = 0; i < this.selected.length; i++) {
        var s = this.selected[i];
        data[s[0]].stream[s[1]].selected = false;
      }

      this.selected = [];
      this.onchange({
        data: data
      });
    }
  }, {
    key: "mouseDown",
    value: function mouseDown(e, d) {
      if (!this.props.onchange) {
        return;
      }

      this.clickedItem = [false, false];
      var point = this.getpoint(d.lines, this.mousePosition);
      var bar = this.getbar(d.rectangles, this.mousePosition);
      var item = point || bar || false;
      var data = this.props.data;
      this.startOffset = {
        canvas: this.mousePosition,
        body: getClient(e),
        selected: this.selected.map(function (sel) {
          var stream = data[sel[0]].stream[sel[1]];
          return {
            x: parseFloat(stream.x),
            y: stream.y,
            stream: stream
          };
        })
      };

      if (item) {
        this.setLimit = false;
        this.clickedItem = item;

        if (data[item[0]].stream[item[1]].selected) {
          eventHandler('window', 'mousemove', _jquery.default.proxy(this.pointMouseMove, this));
        }

        eventHandler('window', 'mouseup', _jquery.default.proxy(this.pointMouseUp, this));
      } else {
        eventHandler('window', 'mousemove', _jquery.default.proxy(this.backgroundMouseMove, this));
        eventHandler('window', 'mouseup', _jquery.default.proxy(this.backgroundMouseUp, this));
        this.startOffset.client = this.getCanvasClient(e);
        (0, _jquery.default)(this.dom.current).append('<div class="r-chart-select" style="position:absolute;left:' + this.startOffset.client.x + 'px;top:' + this.startOffset.client.y + 'px;background:rgba(100,100,100,.3);"></div>');
      }
    }
  }, {
    key: "pointMouseMove",
    value: function pointMouseMove(e) {
      var _getClient = getClient(e),
          x = _getClient.x,
          y = _getClient.y;

      var _this$props4 = this.props,
          data = _this$props4.data,
          changeStep = _this$props4.changeStep;
      var _this$d$this$mainAxis = this.d[this.mainAxis].labelSlider,
          start = _this$d$this$mainAxis.start,
          end = _this$d$this$mainAxis.end;
      var _this$startOffset = this.startOffset,
          body = _this$startOffset.body,
          selected = _this$startOffset.selected;
      var offset = {
        x: -getPercentByValue(x - body.x, 0, this.width),
        y: getPercentByValue(y - body.y, 0, this.height)
      };
      var changed = false;

      for (var i = 0; i < selected.length; i++) {
        var stream = selected[i].stream;
        var axis = selected[i][this.mainAxis];
        var value = axis - getValueByPercent(offset[this.mainAxis], 0, end - start);
        value = Math.round(value / changeStep) * changeStep;

        if (stream[this.mainAxis] !== value) {
          changed = true;
        }

        stream[this.mainAxis] = value;
      }

      if (changed) {
        this.onchange({
          data: data
        });
      }
    }
  }, {
    key: "pointMouseUp",
    value: function pointMouseUp() {
      eventHandler('window', 'mousemove', this.pointMouseMove, 'unbind');
      eventHandler('window', 'mouseup', this.pointMouseUp, 'unbind');
      var point = this.getpoint(this.d.lines, this.mousePosition);
      var rect = this.getbar(this.d.rectangles, this.mousePosition);
      var item = point || rect || false;
      console.log(item);

      if (item && compaire(this.clickedItem, item)) {
        this.select(item[0], item[1]);
      }

      var data = this.props.data;
      this.setLimit = true;
      this.onchange({
        data: data
      });
    }
  }, {
    key: "selectPointsBySelectRect",
    value: function selectPointsBySelectRect() {
      var startx, starty, endx, endy;
      var _this$selectCoords = this.selectCoords,
          start = _this$selectCoords.start,
          end = _this$selectCoords.end;

      if (start.x < end.x) {
        startx = start.x;
        endx = end.x;
      } else {
        startx = end.x;
        endx = start.x;
      }

      if (start.y < end.y) {
        starty = start.y;
        endy = end.y;
      } else {
        starty = end.y;
        endy = start.y;
      }

      for (var i = 0; i < this.d.lines.length; i++) {
        var _this$d$lines$i = this.d.lines[i],
            points = _this$d$lines$i.points,
            dataIndex = _this$d$lines$i.dataIndex;

        for (var j = 0; j < points.length; j++) {
          var _points$j2 = points[j],
              x = _points$j2.x,
              y = _points$j2.y,
              streamIndex = _points$j2.streamIndex;
          x = parseFloat(x);
          y = parseFloat(y);

          if (x < startx || x > endx) {
            continue;
          }

          if (y < starty || y > endy) {
            continue;
          }

          this.select(dataIndex, streamIndex);
        }
      }
    }
  }, {
    key: "backgroundMouseMove",
    value: function backgroundMouseMove(e) {
      var coords = this.getCanvasClient(e);
      var so = this.startOffset;

      if (Math.abs(coords.x - so.client.x) < 2 && Math.abs(coords.y - so.client.y) < 2) {
        return;
      }

      this.moved = true;
      var x1 = Math.min(so.client.x, coords.x);
      var y1 = Math.min(so.client.y, coords.y);
      var width = Math.abs(so.client.x - coords.x);
      var height = Math.abs(so.client.y - coords.y);
      this.selectCoords = {
        start: so.canvas,
        end: this.mousePosition
      };
      (0, _jquery.default)(this.dom.current).find('.r-chart-select').css({
        width: width,
        height: height,
        left: x1,
        top: y1
      });
    }
  }, {
    key: "backgroundMouseUp",
    value: function backgroundMouseUp() {
      eventHandler('window', 'mousemove', this.backgroundMouseMove, 'unbind');
      eventHandler('window', 'mouseup', this.backgroundMouseUp, 'unbind');

      if (!this.moved) {
        this.deselectAll();
      } else {
        this.selectPointsBySelectRect();
        (0, _jquery.default)(this.dom.current).find('.r-chart-select').remove();
      }

      this.moved = false;
    }
  }, {
    key: "getCanvasClient",
    value: function getCanvasClient(e) {
      var dom = (0, _jquery.default)(this.dom.current);

      var _dom$offset = dom.offset(),
          left = _dom$offset.left,
          top = _dom$offset.top;

      var _getClient2 = getClient(e),
          x = _getClient2.x,
          y = _getClient2.y;

      return {
        x: x - left + window.pageXOffset,
        y: y - top + window.pageYOffset
      };
    }
  }, {
    key: "hover",
    value: function hover() {
      var _this2 = this;

      (0, _jquery.default)('.r-chart-detail-container').remove();
      var _this$props5 = this.props,
          data = _this$props5.data,
          padding = _this$props5.padding,
          defaultPadding = _this$props5.defaultPadding;
      var result = [];

      for (var i = 0; i < data.length; i++) {
        var stream = data[i].stream;

        if (!this.state.open[i] || !stream.length) {
          continue;
        }

        var index = binarySearch(stream, this.mousePosition[this.secondAxis] * this.sign, function (a) {
          if (!a.center) {
            /*console.error('missing center in an stream in data['+i+']');*/
            return false;
          }

          return a.center[_this2.secondAxis];
        }, 6);

        if (index === -1) {
          continue;
        }

        result.push({
          obj: data[i].stream[index],
          color: data[i].color
        });
      }

      if (!result.length) {
        return;
      }

      var Chart = (0, _jquery.default)(this.dom.current);
      var _padding$left2 = padding.left,
          left = _padding$left2 === void 0 ? defaultPadding.left : _padding$left2,
          _padding$bottom2 = padding.bottom,
          bottom = _padding$bottom2 === void 0 ? defaultPadding.bottom : _padding$bottom2;

      if (this.mainAxis === 'y') {
        var Left = left + result[0].obj.center.x * this.width / 100;
        var Bottom = bottom + 12 + parseFloat(this.mousePosition.y) * -this.height / 100;
        console.log('ok');
      } else {
        var Left = 40 + left + parseFloat(this.mousePosition.x) * this.width / 100;
        var Bottom = bottom + result[0].obj.center.y * this.height / 100;
        console.log(Bottom);
      }

      var ui = (0, _functions.getDetailUI)(Left, Bottom, result);
      Chart.append(ui);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props6 = this.props,
          zoom = _this$props6.zoom,
          style = _this$props6.style,
          padding = _this$props6.padding,
          defaultPadding = _this$props6.defaultPadding,
          id = _this$props6.id,
          className = _this$props6.className,
          data = _this$props6.data;
      var _this$state2 = this.state,
          x = _this$state2.x,
          y = _this$state2.y;
      var zoomx = x.zoom;
      var zoomy = y.zoom;
      var _padding$left3 = padding.left,
          left = _padding$left3 === void 0 ? defaultPadding.left : _padding$left3,
          _padding$top2 = padding.top,
          top = _padding$top2 === void 0 ? defaultPadding.top : _padding$top2,
          _padding$right2 = padding.right,
          right = _padding$right2 === void 0 ? defaultPadding.right : _padding$right2,
          _padding$bottom3 = padding.bottom,
          bottom = _padding$bottom3 === void 0 ? defaultPadding.bottom : _padding$bottom3;
      var d = this.updateData();
      this.d = d;
      var grids = [d.x.grid || {
        type: 'group',
        id: 'x-grid',
        items: []
      }, d.y.grid || {
        type: 'group',
        id: 'y-grid',
        items: []
      }];
      var items = grids.concat(d.rectangles, d.lines, d.arcs, d.shadows);
      var canvas = {
        mouseDown: function mouseDown(e) {
          _this3.mouseDown(e, d);
        },
        getSize: function getSize(w, h) {
          _this3.width = w;
          _this3.height = h;
        },
        getMousePosition: function getMousePosition(p) {
          _this3.mousePosition = {
            x: p.x * 100 / _this3.width,
            y: p.y * 100 / _this3.height,
            X: p.x,
            Y: p.y
          };

          _this3.hover();
        },
        id: 'canvas',
        axisPosition: {
          x: '0%',
          y: '100%'
        },
        items: items,
        style: {
          width: "calc(100% - ".concat(left, "px - ").concat(right + 1, "px)"),
          height: "calc(100% - ".concat(bottom, "px - ").concat(top + 1, "px)"),
          right: "".concat(right, "px"),
          top: "".concat(top, "px")
        }
      };
      return _react.default.createElement(chartContext.Provider, {
        value: d
      }, _react.default.createElement("div", {
        className: "r-chart".concat(className ? ' ' + className : ''),
        id: id,
        style: _jquery.default.extend({}, {
          padding: 0
        }, style),
        ref: this.dom
      }, _react.default.createElement("div", {
        className: "r-chart-toggle-setting",
        style: {
          top: top + 'px',
          right: right + 'px'
        },
        onClick: function onClick() {
          return _this3.setState({
            setting: true
          });
        }
      }), this.state.setting && _react.default.createElement("div", {
        className: "r-chart-setting"
      }, _react.default.createElement("div", {
        style: {
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          zIndex: -1
        },
        onClick: function onClick() {
          return _this3.setState({
            setting: false
          });
        }
      }), _react.default.createElement("div", {
        className: "r-chart-close-setting",
        onClick: function onClick() {
          return _this3.setState({
            setting: false
          });
        }
      }, "Close"), data.map(function (Data, i) {
        return _react.default.createElement("div", {
          className: "r-chart-data-list",
          style: {
            color: Data.color
          },
          onClick: function onClick() {
            var o = _this3.state.open;
            o[i] = !o[i];

            _this3.setState({
              open: _this3.state.open
            });
          }
        }, _react.default.createElement("div", {
          className: "r-chart-check ".concat(!_this3.state.open[i] ? 'unchecked' : 'checked')
        }), _react.default.createElement("div", {
          className: "r-chart-title"
        }, Data.title || 'Untitle'));
      })), this.selected.length !== 0 && _react.default.createElement("div", {
        className: "r-chart-deselect-all",
        onClick: this.deselectAll.bind(this),
        style: {
          right: right + 'px',
          top: top + 'px'
        }
      }, "Deselect All"), d.x.labelSlider && _react.default.createElement(_rRangeSlider.default, _extends({}, d.x.labelSlider, {
        style: this.getStyle('x'),
        className: "r-chart-labels r-chart-labels-x"
      })), d.y.labelSlider && _react.default.createElement(_rRangeSlider.default, _extends({}, d.y.labelSlider, {
        style: this.getStyle('y'),
        direction: "up",
        className: "r-chart-labels r-chart-labels-y"
      })), zoomx && d.x.filterSlider && _react.default.createElement(_rRangeSlider.default, {
        className: "r-chart-filter r-chart-filter-x",
        axis: "x",
        start: d.x.filterSlider.start,
        end: d.x.filterSlider.end,
        points: d.x.filterSlider.points,
        showValue: !d.x.labelSlider.label.items,
        point_width: 8,
        point_height: 8,
        ondrag: this.change.bind(this),
        style: {
          width: "calc(100% - ".concat(left, "px - ").concat(right, "px)"),
          bottom: "".concat(bottom - 9, "px"),
          right: "".concat(right, "px")
        }
      }), zoomy && d.y.filterSlider && _react.default.createElement(_rRangeSlider.default, {
        className: "r-chart-filter r-chart-filter-y",
        axis: "y",
        direction: "up",
        start: d.y.filterSlider.start,
        end: d.y.filterSlider.end,
        point_width: 8,
        point_height: 8,
        points: d.y.filterSlider.points,
        showValue: !d.y.labelSlider.label.items,
        ondrag: this.change.bind(this),
        style: {
          left: "".concat(left - 9, "px"),
          height: "calc(100% - ".concat(bottom, "px - ").concat(top, "px)"),
          top: "".concat(top, "px")
        }
      }), _react.default.createElement(_rCanvas.default, canvas)));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var prevx = state.prevx,
          prevy = state.prevy;
      var x = props.x,
          y = props.y;
      var change = {},
          changed = false;

      if (prevx !== JSON.stringify(x)) {
        //اگر پروپس جدید از بیرون آمد
        change.prevx = JSON.stringify(x);
        change.x = x;
        changed = true;
      }

      if (prevy !== JSON.stringify(y)) {
        //اگر پروپس جدید از بیرون آمد
        change.prevy = JSON.stringify(y);
        change.y = y;
        changed = true;
      }

      if (changed) {
        return change;
      }

      return null;
    }
  }]);

  return RChart;
}(_react.Component);

exports.default = RChart;
RChart.defaultProps = {
  filter: false,
  changeStep: 1,
  padding: {},
  defaultPadding: {
    left: 30,
    top: 20,
    right: 20,
    bottom: 30
  }
};
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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

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
    _this.isMobile = 'ontouchstart' in document.documentElement ? true : false;
    _this.dom = (0, _react.createRef)();
    (0, _jquery.default)('body').on('mouseout', '.r-chart canvas', function () {
      (0, _jquery.default)('.r-chart-detail-container').remove();
    });
    (0, _jquery.default)(window).on('resize', _this.resize.bind(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(RChart, [{
    key: "resize",
    value: function resize() {
      var _this2 = this;

      this.timer = 0;
      clearInterval(this.interval);
      this.interval = setInterval(function () {
        _this2.timer++;

        if (_this2.timer >= 20) {
          _this2.setState({});

          clearInterval(_this2.interval);
        }
      }, 10);
    }
  }, {
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
        var fs = filter[0] ? (0, _functions.getIndex)(labels, filter[0]) : 0;
        var fe = filter[1] ? (0, _functions.getIndex)(labels, filter[1]) : labels.length - 1;
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
        var fs = filter[0] ? (0, _functions.getIndex)(labels, filter[0]) : 0;
        var fe = filter[1] ? (0, _functions.getIndex)(labels, filter[1]) : labels.length - 1;
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
    value: function getlineChart(_ref2, s, i) {
      var stream = _ref2.stream,
          background = _ref2.background,
          _ref2$lineWidth = _ref2.lineWidth,
          lineWidth = _ref2$lineWidth === void 0 ? 1 : _ref2$lineWidth,
          _ref2$color = _ref2.color,
          color = _ref2$color === void 0 ? '#444' : _ref2$color,
          _ref2$r = _ref2.r,
          r = _ref2$r === void 0 ? 3 : _ref2$r,
          showPoint = _ref2.point,
          _ref2$line = _ref2.line,
          showLine = _ref2$line === void 0 ? true : _ref2$line,
          dash = _ref2.dash;
      var line = {
        dataIndex: i,
        type: 'line',
        points: [],
        stroke: color,
        dash: dash,
        lineWidth: lineWidth
      };

      for (var j = 0; j < stream.length; j++) {
        var selected = stream[j].selected;

        if (selected) {
          this.selected.push([i, j]);
        }

        var point = this.getPoint(s, stream[j]);

        if (point === false) {
          continue;
        }

        point.streamIndex = j;
        line.points.push(point);

        if (showPoint) {
          var x = point.x,
              y = point.y;
          s.arcs.push({
            stroke: color,
            r: r,
            x: x,
            y: y,
            lineWidth: lineWidth * 2,
            type: 'arc',
            fill: selected ? 'red' : background || '#fff'
          });
        }
      }

      if (showLine) {
        s.lines.push(line);
      }
    }
  }, {
    key: "getPoint",
    value: function getPoint(s, stream) {
      var x = stream.x,
          y = stream.y;

      var _getPosition = (0, _functions.getPosition)(s.x.labelSlider, x),
          X = _getPosition.position,
          centerX = _getPosition.center;

      var _getPosition2 = (0, _functions.getPosition)(s.y.labelSlider, y),
          Y = _getPosition2.position,
          centerY = _getPosition2.center;

      stream.position = {
        x: X,
        y: Y
      };
      stream.center = {
        x: centerX,
        y: centerY
      };
      return X === false || Y === false ? false : {
        x: X + '%',
        y: -Y + '%',
        value: {
          x: x,
          y: y
        }
      };
    }
  }, {
    key: "getbarChart",
    value: function getbarChart(data, s, i) {
      var stream = data.stream;
      this.barCounter++;

      for (var j = 0; j < stream.length; j++) {
        var selected = stream[j].selected;

        if (selected) {
          this.selected.push([i, j]);
        }

        var rectangle = this.getBar(s, stream[j], data);

        if (rectangle === false) {
          continue;
        }

        rectangle.dataIndex = i;
        rectangle.streamIndex = j;
        rectangle.fill = selected ? 'red' : rectangle.fill;
        rectangle.shadow = [3, 3, 6, 'rgba(10,10,10,.4)'];
        s.rectangles.push(rectangle);
      }
    }
  }, {
    key: "getBar",
    value: function getBar(s, stream, _ref3) {
      var color = _ref3.color,
          _ref3$width = _ref3.width,
          width = _ref3$width === void 0 ? 80 : _ref3$width;
      width = width < 1 ? 1 : width;
      width = width > 100 ? 100 : width;

      var _getPosition3 = (0, _functions.getPosition)(s.x.labelSlider, stream.x, {
        barCount: this.barCount,
        barCounter: this.barCounter,
        width: width
      }),
          x = _getPosition3.position,
          centerX = _getPosition3.center;

      var _getPosition4 = (0, _functions.getPosition)(s.y.labelSlider, stream.y),
          y = _getPosition4.position,
          centerY = _getPosition4.center;

      stream.position = {
        x: x,
        y: y
      };
      stream.center = {
        x: centerX,
        y: centerY
      };
      var length = s.x.labelSlider.label.items.length;
      var w = width / this.barCount / length;
      var h = y;
      return {
        x: x + '%',
        y: y * -1 + '%',
        width: w + '%',
        height: h + '%',
        fill: color,
        type: 'rectangle'
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
        rectangles: []
      };

      if (this.setLimit !== false) {
        this.limit = {
          x: (0, _functions.getLimit)(data, x, 'x'),
          y: (0, _functions.getLimit)(data, y, 'y')
        };
      }

      s.x = this.getDetail('x');
      s.y = this.getDetail('y');
      this.barCount = data.filter(function (d) {
        return d.type === 'bar';
      }).length;
      this.barCounter = -1;

      for (var i = 0; i < data.length; i++) {
        var _data$i$type = data[i].type,
            type = _data$i$type === void 0 ? 'line' : _data$i$type;
        this["get".concat(type, "Chart")](data[i], s, i);
      }

      return s;
    }
  }, {
    key: "getGridLines",
    value: function getGridLines(_ref4, color, axis) {
      var start = _ref4.start,
          step = _ref4.step,
          end = _ref4.end;
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
      var _this$props2 = this.props,
          filter = _this$props2.filter,
          padding = _this$props2.padding,
          defaultPadding = _this$props2.defaultPadding;
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
      var result;

      for (var j = 0; j < lines.length; j++) {
        var line = lines[j];

        for (var i = 0; i < line.points.length; i++) {
          var point = line.points[i];
          var length = this.getLength(point, coords);

          if (length < min) {
            result = [line.dataIndex, point.streamIndex];
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
      var x = parseFloat(coords.x),
          y = parseFloat(coords.y);

      for (var j = 0; j < rectangles.length; j++) {
        var rect = rectangles[j];
        var X = parseFloat(rect.x),
            Y = parseFloat(rect.y);
        var width = parseFloat(rect.width);
        var height = parseFloat(rect.height);

        if (X > x) {
          continue;
        }

        if (X + width < x) {
          continue;
        }

        if (y < -height) {
          continue;
        }

        return [rect.dataIndex, rect.streamIndex];
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

      var _this$props3 = this.props,
          data = _this$props3.data,
          changeStep = _this$props3.changeStep;
      var _this$d$y$labelSlider = this.d.y.labelSlider,
          start = _this$d$y$labelSlider.start,
          end = _this$d$y$labelSlider.end;
      var _this$startOffset = this.startOffset,
          body = _this$startOffset.body,
          selected = _this$startOffset.selected;
      var offset = {
        x: getPercentByValue(x - body.x, 0, this.width),
        y: getPercentByValue(y - body.y, 0, this.height)
      };
      var changed = false;

      for (var i = 0; i < selected.length; i++) {
        var _selected$i = selected[i],
            _x = _selected$i.x,
            _y = _selected$i.y,
            stream = _selected$i.stream;

        var value = _y - getValueByPercent(offset.y, 0, end - start);

        value = Math.round(value / changeStep) * changeStep;

        if (stream.y !== value) {
          changed = true;
        }

        stream.y = value;
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
          var _points$j = points[j],
              x = _points$j.x,
              y = _points$j.y,
              streamIndex = _points$j.streamIndex;
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
      (0, _jquery.default)('.r-chart-detail-container').remove();
      var _this$props4 = this.props,
          data = _this$props4.data,
          padding = _this$props4.padding,
          defaultPadding = _this$props4.defaultPadding,
          x = this.mousePosition.x;
      var result = [];

      for (var i = 0; i < data.length; i++) {
        var stream = data[i].stream;

        if (!stream.length) {
          continue;
        }

        var index = binarySearch(stream, x, function (a) {
          return a.center.x;
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
      var Left = left + result[0].obj.center.x * this.width / 100;
      var Bottom = bottom + 12 + parseFloat(this.mousePosition.y) * -this.height / 100;
      var ui = (0, _functions.getDetailUI)(Left, Bottom, result);
      Chart.append(ui);
    } // hover(){
    //   $('.r-chart-detail-container').remove();
    //   var {lines} = this.d,{data} = this.props,x = this.mousePosition.x;
    //   var result = [];
    //   for(var i = 0; i < lines.length; i++){
    //     var {points} = lines[i];
    //     if(!points.length){continue;}
    //     var index = binarySearch(points,x,function(a){return parseFloat(a.x)},2);
    //     if(index === -1){continue;}
    //     result.push({
    //       obj:lines[i].points[index],
    //       color:data[i].color,        
    //     })
    //     debugger;  
    //   }
    //   if(!result.length){return;}
    //   var Chart = $(this.dom.current);
    //   var left = Chart.width() - this.width + parseFloat(result[0].obj.x) * this.width / 100;
    //   var bottom = Chart.height() - this.height + 20 + parseFloat(this.mousePosition.y) * -this.height / 100;
    //   Chart.append(getDetailUI(left,bottom,result));
    // }

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props5 = this.props,
          zoom = _this$props5.zoom,
          style = _this$props5.style,
          padding = _this$props5.padding,
          defaultPadding = _this$props5.defaultPadding;
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
      var items = grids.concat(d.rectangles, d.lines, d.arcs);
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
        className: "r-chart",
        style: _jquery.default.extend({}, {
          padding: 0
        }, style),
        ref: this.dom
      }, this.selected.length !== 0 && _react.default.createElement("div", {
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
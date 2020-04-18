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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var RChartContext = (0, _react.createContext)();

var RChart = /*#__PURE__*/function (_Component) {
  _inherits(RChart, _Component);

  var _super = _createSuper(RChart);

  function RChart(props) {
    var _this;

    _classCallCheck(this, RChart);

    _this = _super.call(this, props);
    var _this$props = _this.props,
        X = _this$props.X,
        Y = _this$props.Y,
        data = _this$props.data;
    _this.touch = 'ontouchstart' in document.documentElement;
    _this.state = {
      X: X,
      Y: Y,
      prevx: JSON.stringify(X),
      prevy: JSON.stringify(Y),
      popup: false
    };
    _this.slider = {
      style: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        padding: 0
      },
      lineStyle: {
        display: 'none'
      },
      editable: false,
      showValue: false,
      pointStyle: {
        display: 'none'
      },
      className: 'labelSlider'
    };
    _this.dom = (0, _react.createRef)();
    _this.details = {};
    (0, _jquery.default)('body').on('mouseout', '.r-chart-canvas', function () {
      (0, _jquery.default)('.r-chart-popup-container').html('');
    });
    return _this;
  }

  _createClass(RChart, [{
    key: "getStyle",
    value: function getStyle(x, y) {
      return {
        gridTemplateColumns: "".concat(x, "px auto"),
        gridTemplateRows: "auto ".concat(y, "px"),
        direction: 'ltr'
      };
    }
  }, {
    key: "getType",
    value: function getType(X, Y) {
      return {
        x: X.labels ? 'string' : 'number',
        y: Y.labels ? 'string' : 'number'
      };
    }
  }, {
    key: "getLimitTypeNumber",
    value: function getLimitTypeNumber(data, axis) {
      var min = Infinity,
          max = -Infinity;

      for (var i = 0; i < data.length; i++) {
        var _data$i$stream = data[i].stream,
            stream = _data$i$stream === void 0 ? [] : _data$i$stream;

        for (var j = 0; j < stream.length; j++) {
          var value = stream[j][axis];

          if (value < min) {
            min = value;
          }

          if (value > max) {
            max = value;
          }
        }
      }

      return [min === Infinity ? undefined : min, max === -Infinity ? undefined : max];
    }
  }, {
    key: "getLimit",
    value: function getLimit(data, X, Y) {
      var xLimit = X.labels ? [0, X.labels.length - 1] : this.getLimitTypeNumber(data, 'x');
      var yLimit = Y.labels ? [0, Y.labels.length - 1] : this.getLimitTypeNumber(data, 'y');
      return {
        x: xLimit,
        y: yLimit
      };
    }
  }, {
    key: "getRangeTypeNumber",
    value: function getRangeTypeNumber(axis, _ref) {
      var _ref$filter = _ref.filter,
          filter = _ref$filter === void 0 ? [] : _ref$filter;
      var _this$details = this.details,
          limit = _this$details.limit,
          width = _this$details.width,
          height = _this$details.height;

      var _limit$axis = _slicedToArray(limit[axis], 2),
          min = _limit$axis[0],
          max = _limit$axis[1];

      if (min === undefined || max === undefined) {
        return false;
      }

      var range = max - min,
          i = 1;

      if (range === 0) {
        if (min < 0) {
          return {
            start: 2 * min,
            step: Math.abs(min),
            end: 0
          };
        } else if (min > 0) {
          return {
            start: 0,
            step: min,
            end: 2 * min
          };
        } else {
          return {
            start: -1,
            step: 1,
            end: 1
          };
        }
      }

      while (range / 10 > 1) {
        i *= 10;
        range /= 10;
      }

      var step;

      if (range >= 0 && range <= 3) {
        step = 0.2 * i;
      } else {
        step = i;
      }

      var start = Math.round(min / step) * step - step;
      var end = Math.round(max / step) * step + step;
      var count = (end - start) / step;
      var size = axis === 'x' ? width : height;
      var maxCount = size ? Math.ceil(size / 60) : 10;

      while (count > maxCount) {
        step *= 2;
        count = (end - start) / step;
      }

      var _filter = _slicedToArray(filter, 2),
          _filter$ = _filter[0],
          fs = _filter$ === void 0 ? start : _filter$,
          _filter$2 = _filter[1],
          fe = _filter$2 === void 0 ? end : _filter$2;

      var filteredRange = {
        start: start,
        end: end,
        step: step,
        p1: fs,
        p2: fe
      };
      return {
        start: fs,
        step: step,
        end: fe,
        filter: filteredRange
      };
    }
  }, {
    key: "getRangeTypeString",
    value: function getRangeTypeString(axis, _ref2) {
      var _ref2$filter = _ref2.filter,
          filter = _ref2$filter === void 0 ? [] : _ref2$filter,
          labels = _ref2.labels,
          _ref2$width = _ref2.width,
          width = _ref2$width === void 0 ? 60 : _ref2$width,
          _ref2$height = _ref2.height,
          height = _ref2$height === void 0 ? 30 : _ref2$height;
      var limit = this.details.limit;
      var size = this.details[axis === 'x' ? 'width' : 'height'];

      var _limit$axis2 = _slicedToArray(limit[axis], 2),
          start = _limit$axis2[0],
          end = _limit$axis2[1];

      var fs = filter[0] ? labels.indexOf(filter[0]) : 0;
      var fe = filter[1] ? labels.indexOf(filter[1]) : labels.length - 1;
      var filteredRange = {
        start: 0,
        end: labels.length - 1,
        p1: fs,
        p2: fe
      };
      var count = fe - fs + 1;
      var approveCount = Math.floor(size / (axis === 'x' ? width : height));
      var approveCount = approveCount < 1 ? 1 : approveCount;
      var labelStep = Math.floor(count / approveCount);
      return {
        start: fs - 0.5,
        step: labelStep,
        end: fe + 0.5,
        count: count,
        filter: filteredRange
      };
    }
  }, {
    key: "getRange",
    value: function getRange(X, Y) {
      var _this$details2 = this.details,
          limit = _this$details2.limit,
          type = _this$details2.type,
          width = _this$details2.width,
          height = _this$details2.height;
      var xRange = type.x === 'number' ? this.getRangeTypeNumber('x', X) : this.getRangeTypeString('x', X);
      var yRange = type.y === 'number' ? this.getRangeTypeNumber('y', Y) : this.getRangeTypeString('y', Y);
      return {
        x: xRange,
        y: yRange
      };
    }
  }, {
    key: "getLabelConfig",
    value: function getLabelConfig(axis, _ref3) {
      var rotate = _ref3.rotate,
          labels = _ref3.labels;
      var _this$details3 = this.details,
          type = _this$details3.type,
          range = _this$details3.range;
      return {
        rotate: axis === 'y' ? 0 : rotate,
        edit: type[axis] === 'string' ? function (value) {
          return labels[value];
        } : undefined,
        step: range[axis].step,
        style: axis === 'x' ? {
          top: '24px',
          fontSize: 'inherit'
        } : {
          left: 'unset',
          right: '16px',
          fontSize: 'inherit',
          justifyContent: 'flex-end'
        }
      };
    }
  }, {
    key: "binerySearch",
    value: function binerySearch(array, value, field) {
      var sI = 0,
          eI = array.length - 1;

      while (eI - sI > 1) {
        var midIndex = Math.floor((eI + sI) / 2);
        var midValue = field(array[midIndex], array);

        if (value === midValue) {
          return midIndex;
        }

        if (value < midValue) {
          eI = midIndex;
        }

        if (value > midValue) {
          sI = midIndex;
        }
      }

      var endValue = field(array[eI], array);
      var startValue = field(array[sI], array);

      if (value === endValue) {
        return eI;
      }

      if (value === startValue) {
        return sI;
      }

      if (value > endValue) {
        return Infinity;
      }

      if (value < startValue) {
        return -Infinity;
      }

      return [sI, eI];
    }
  }, {
    key: "getZoomStyle",
    value: function getZoomStyle(axis) {
      return {
        style: axis === 'x' ? {
          position: 'absolute',
          display: 'none',
          width: '100%',
          height: '36px',
          padding: '0 12px',
          top: 0
        } : {
          position: 'absolute',
          display: 'none',
          width: '36px',
          height: '100%',
          padding: '12px 0',
          right: 0
        },
        lineStyle: {
          display: 'none'
        },
        pointStyle: {
          width: '16px',
          height: '16px',
          borderRadius: '100%',
          background: '#fff',
          border: '3px solid #eee'
        },
        showValue: true
      };
    }
  }, {
    key: "eventHandler",
    value: function eventHandler(selector, event, action) {
      var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'bind';
      var me = {
        mousedown: "touchstart",
        mousemove: "touchmove",
        mouseup: "touchend"
      };
      event = this.touch ? me[event] : event;
      var element = typeof selector === "string" ? selector === "window" ? (0, _jquery.default)(window) : (0, _jquery.default)(selector) : selector;
      element.unbind(event, action);

      if (type === 'bind') {
        element.bind(event, action);
      }
    }
  }, {
    key: "getClient",
    value: function getClient(e) {
      return this.touch ? {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      } : {
        x: e.clientX,
        y: e.clientY
      };
    }
  }, {
    key: "SetState",
    value: function SetState(obj) {
      this.setState(obj);
    }
  }, {
    key: "onChange",
    value: function onChange(data) {
      var onChange = this.props.onChange;
      onChange({
        data: data
      });
    }
  }, {
    key: "getLineChart",
    value: function getLineChart(stream, _ref4, index) {
      var _ref4$fill = _ref4.fill,
          fill = _ref4$fill === void 0 ? '#fff' : _ref4$fill,
          _ref4$color = _ref4.color,
          color = _ref4$color === void 0 ? '#000' : _ref4$color,
          pointRadius = _ref4.pointRadius,
          _ref4$lineWidth = _ref4.lineWidth,
          lineWidth = _ref4$lineWidth === void 0 ? 3 : _ref4$lineWidth,
          area = _ref4.area;
      var points = [],
          line = {
        points: [],
        lineWidth: lineWidth,
        stroke: color
      },
          Area;

      for (var j = 0; j < stream.length; j++) {
        var _stream$j = stream[j],
            x = _stream$j.x,
            y = _stream$j.y,
            PointRadius = _stream$j.pointRadius; //if(x === 'msf'){debugger;}

        var xp = this.getPercentByValue(x, 'x'),
            yp = this.getPercentByValue(y, 'y');

        if (xp === 'string error') {
          console.error("RChart => Receive \"".concat(x, "\" in data[").concat(index, "].stream[").concat(j, "].x . but there is not \"").concat(x, "\" in X.labels array"));
          continue;
        } else if (xp === 'number error') {
          console.error("RChart => data[".concat(index, "].stream[").concat(j, "].x is not a number."));
          continue;
        } else {
          xp += '%';
        }

        if (yp === false) {
          console.error("RChart => Receive \"".concat(y, "\" in data[").concat(index, "].stream[").concat(j, "].y . but there is not \"").concat(y, "\" in Y.labels array"));
          continue;
        } else if (yp === 'number error') {
          console.error("RChart => data[".concat(index, "].stream[").concat(j, "].y is not a number"));
          continue;
        } else {
          yp *= -1;
          yp += '%';
        }

        var radius = PointRadius || pointRadius;

        if (radius) {
          points.push({
            r: radius,
            lineWidth: lineWidth * 2,
            x: xp,
            y: yp,
            fill: fill,
            stroke: color,
            dataIndex: index,
            streamIndex: j,
            event: {
              mousedown: this.pointMouseDown.bind(this)
            }
          });
        }

        if (lineWidth) {
          line.points.push([xp, yp]);
        }
      }

      if (area) {
        Area = {
          points: line.points.slice(),
          fill: color,
          opacity: area
        };
        Area.points.splice(0, 0, [line.points[0][0], 0]);
        Area.points.push([line.points[line.points.length - 1][0], 0]);
      }

      return {
        points: points,
        line: line,
        area: area ? Area : []
      };
    }
  }, {
    key: "getBarChart",
    value: function getBarChart(stream, _ref5, barCounter, index) {
      var color = _ref5.color;
      var rects = [];
      var _this$details4 = this.details,
          barAxis = _this$details4.barAxis,
          barCount = _this$details4.barCount,
          barWidth = _this$details4.barWidth;

      for (var j = 0; j < stream.length; j++) {
        var _stream$j2 = stream[j],
            x = _stream$j2.x,
            y = _stream$j2.y;
        var xp = this.getPercentByValue(x, 'x'),
            yp = this.getPercentByValue(y, 'y');

        if (xp === false) {
          console.error("RChart => Receive \"".concat(x, "\" in data[").concat(index, "].stream[").concat(j, "].x . but there is not \"").concat(x, "\" in X.labels array"));
          continue;
        } else {
          xp += '%';
        }

        if (yp === false) {
          console.error("RChart => Receive \"".concat(y, "\" in data[").concat(index, "].stream[").concat(j, "].y . but there is not \"").concat(y, "\" in Y.labels array"));
          continue;
        } else {
          yp *= -1;
          yp += '%';
        }

        if (barAxis === 'x') {
          rects.push({
            width: barWidth + '%',
            height: yp + '%',
            x: xp,
            fill: color,
            pivot: [barWidth * (barCount / 2 - barCounter) + '%', 0],
            event: {
              mousedown: this.pointMouseDown.bind(this)
            },
            dataIndex: index,
            streamIndex: j
          });
        } else {
          rects.push({
            width: xp + '%',
            height: barWidth + '%',
            y: yp,
            fill: color,
            pivot: [0, barWidth * (barCount / 2 - barCounter) + '%'],
            event: {
              mousedown: this.pointMouseDown.bind(this)
            },
            dataIndex: index,
            streamIndex: j
          });
        }
      }

      return rects;
    }
  }, {
    key: "getGridLine",
    value: function getGridLine(value, axis, _ref6) {
      var _ref6$color = _ref6.color,
          color = _ref6$color === void 0 ? 'red' : _ref6$color,
          _ref6$lineWidth = _ref6.lineWidth,
          lineWidth = _ref6$lineWidth === void 0 ? 0.7 : _ref6$lineWidth,
          dash = _ref6.dash;
      var range = this.details.range[axis];

      if (!range) {
        return {};
      }

      var start = range.start,
          end = range.end,
          v = (value - start) * 100 / (end - start);
      var points = axis === 'x' ? [[v + '%', '0%'], [v + '%', '-100%']] : [['0%', -v + '%'], ['100%', -v + '%']];
      return {
        stroke: color,
        lineWidth: lineWidth,
        points: points,
        type: 'line',
        dash: dash
      };
    }
  }, {
    key: "getGridLines",
    value: function getGridLines(axis) {
      var range = this.details.range[axis];

      if (!range) {
        return [];
      }

      var start = range.start,
          step = range.step,
          end = range.end,
          gridColor = this.state[axis.toUpperCase()].gridColor;
      var value = Math.round((start - step) / step) * step,
          gridLines = [];

      while (value <= end) {
        if (value >= start) {
          gridLines.push(this.getGridLine(value, axis, {
            color: gridColor
          }));
        }

        value += step;
      }

      return gridLines;
    }
  }, {
    key: "getElements",
    value: function getElements() {
      var points = [],
          lines = [],
          rects = [],
          areas = [];
      var data = this.props.data;
      var _this$state = this.state,
          X = _this$state.X,
          Y = _this$state.Y;
      var barAxis = this.details.barAxis;
      var xGridLines = X.gridColor ? this.getGridLines('x') : [];
      var yGridLines = Y.gridColor ? this.getGridLines('y') : [];
      var xIndicator = X.indicator ? [this.getGridLine(X.indicator.value, 'x', X.indicator)] : [];
      var yIndicator = Y.indicator ? [this.getGridLine(Y.indicator.value, 'y', X.indicator)] : [];
      var barCounter = 0;

      for (var i = 0; i < data.length; i++) {
        var _data$i = data[i],
            stream = _data$i.stream,
            _data$i$type = _data$i.type,
            chartType = _data$i$type === void 0 ? 'line' : _data$i$type,
            _data$i$color = _data$i.color,
            color = _data$i$color === void 0 ? '#000' : _data$i$color,
            _data$i$show = _data$i.show,
            show = _data$i$show === void 0 ? true : _data$i$show;

        if (!show) {
          continue;
        }

        if (chartType === 'line') {
          var result = this.getLineChart(stream, data[i], i);
          points = points.concat(result.points);
          lines = lines.concat(result.line);
          areas = areas.concat(result.area);
        } else if (chartType === 'bar' && barAxis) {
          var result = this.getBarChart(stream, data[i], barCounter, i);
          rects = rects.concat(result);
          barCounter++;
        }
      }

      return xGridLines.concat(yGridLines, rects, areas, lines, points, xIndicator, yIndicator);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({});
    }
  }, {
    key: "getDetails",
    value: function getDetails() {
      var _this$props2 = this.props,
          data = _this$props2.data,
          _this$props2$barWidth = _this$props2.barWidth,
          barWidth = _this$props2$barWidth === void 0 ? 80 : _this$props2$barWidth,
          _this$state2 = this.state,
          X = _this$state2.X,
          Y = _this$state2.Y,
          d = this.details;

      if (!d.type) {
        d.type = this.getType(X, Y); //تایین محوری که پایه ی بار چارت روی آن بنا می شود

        d.barAxis = d.type.x === 'string' ? 'x' : d.type.y === 'string' ? 'y' : false; //تایین محوری که ادیت چارت در راستای آن انجام می شود

        d.editAxis = d.type.x === 'string' ? 'y' : d.type.y === 'string' ? 'x' : 'y';

        this.getPercentByValue = function (value, axis) {
          var _d$range$axis = d.range[axis],
              start = _d$range$axis.start,
              end = _d$range$axis.end,
              Value;

          if (d.type[axis] === 'number') {
            if (isNaN(value)) {
              return 'number error';
            }

            Value = value;
          } else {
            Value = axis === 'x' ? X.labels.indexOf(value) : Y.labels.indexOf(value);

            if (Value === -1) {
              return 'string error';
            }
          }

          return 100 * (Value - start) / (end - start);
        };

        this.getValueByPercent = function (p, axis) {
          if (!d.range[axis]) {
            return '';
          }

          var _d$range$axis2 = d.range[axis],
              start = _d$range$axis2.start,
              end = _d$range$axis2.end,
              Value = (end - start) * p / 100;

          if (d.type[axis] === 'number') {
            return Math.round(Value + start);
          } else {
            return (axis === 'x' ? X : Y).labels[Math.round(Value - 0.5)];
          }
        };
      } //نوع چارت و تابع گرفتن درصد با مقدار یکبار تایین می شود


      if (this.setLimit !== false) {
        this.details.limit = this.getLimit(data, X, Y);
      }

      this.details.range = this.getRange(X, Y);
      d.barCount = data.filter(function (d) {
        return d.type === 'bar';
      }).length;
      d.barWidth = barWidth / d.range[d.barAxis].count / d.barCount;
    }
  }, {
    key: "changeFilter",
    value: function changeFilter(p1, p2, axis) {
      var obj = JSON.parse(JSON.stringify(this.state[axis]));
      obj.filter = obj.labels ? [obj.labels[p1], obj.labels[p2]] : [p1, p2];
      this.SetState(_defineProperty({}, axis, obj));
    }
  }, {
    key: "pointMouseDown",
    value: function pointMouseDown(_ref7) {
      var dataIndex = _ref7.dataIndex,
          streamIndex = _ref7.streamIndex;
      var _this$props3 = this.props,
          data = _this$props3.data,
          edit = _this$props3.edit;

      if (!edit || !edit.enabled) {
        return;
      }

      if (edit.callback) {
        edit.callback({
          dataIndex: dataIndex,
          streamIndex: streamIndex
        });
        return;
      }

      var stream = data[dataIndex].stream[streamIndex];
      this.setSetLimit(false);
      this.eventHandler('window', 'mousemove', _jquery.default.proxy(this.pointMouseMove, this));
      this.eventHandler('window', 'mouseup', _jquery.default.proxy(this.pointMouseUp, this));
      this.so = {
        dataIndex: dataIndex,
        streamIndex: streamIndex,
        y: this.mousePosition[1]
      };
      this.moved = false;
    }
  }, {
    key: "pointMouseMove",
    value: function pointMouseMove() {
      var data = this.props.data,
          stream = data[this.so.dataIndex].stream[this.so.streamIndex];

      if (!this.moved) {
        if (Math.abs(this.mousePosition[1] - this.so.y) < 8) {
          return;
        }

        if (stream.y === this.mouseValue[1]) {
          return;
        }
      }

      this.moved = true;
      stream.y = this.mouseValue[1];
      this.onChange(data);
    }
  }, {
    key: "pointMouseUp",
    value: function pointMouseUp() {
      this.eventHandler('window', 'mousemove', this.pointMouseMove, 'unbind');
      this.eventHandler('window', 'mouseup', this.pointMouseUp, 'unbind');
      this.setSetLimit(true);
      var data = this.props.data;

      if (!this.moved) {
        var stream = data[this.so.dataIndex].stream[this.so.streamIndex];
        this.SetState({
          popup: {
            type: 'Edit Point',
            dataIndex: this.so.dataIndex,
            streamIndex: this.so.streamIndex,
            value: stream.y,
            mouseValue: this.mouseValue
          }
        });
      } else {
        this.onChange(data);
      }
    }
  }, {
    key: "mouseDown",
    value: function mouseDown() {
      var add = this.props.add;

      if (!add || !add.enabled) {
        return;
      }

      this.SetState({
        popup: {
          type: 'Add Point',
          dataIndex: 0,
          value: this.mouseValue[1],
          mouseValue: this.mouseValue
        }
      });
    }
  }, {
    key: "setSetLimit",
    value: function setSetLimit(state) {
      this.setLimit = state;
    }
  }, {
    key: "closePopup",
    value: function closePopup() {
      this.SetState({
        popup: false
      });
    }
  }, {
    key: "zoomHover",
    value: function zoomHover(e, state) {
      e.stopPropagation();
      this.hoverAxis = state;

      if (this.zoomDown) {
        return;
      }

      this.hadleShowSliders(state);
    }
  }, {
    key: "zoomMouseDown",
    value: function zoomMouseDown() {
      this.zoomDown = true;
    }
  }, {
    key: "zoomMouseUp",
    value: function zoomMouseUp() {
      this.zoomDown = false;

      if (this.hoverAxis) {
        return;
      }

      this.hadleShowSliders(false);
    }
  }, {
    key: "hadleShowSliders",
    value: function hadleShowSliders(state) {
      var container = (0, _jquery.default)(this.dom.current);
      var filterSlider = container.find('.filterSlider');
      var labelSlider = container.find('.labelSlider');

      if (state) {
        filterSlider.show();
        labelSlider.hide();
      } else {
        filterSlider.hide();
        labelSlider.show();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          data = _this$props4.data,
          html = _this$props4.html,
          add = _this$props4.add;
      var _this$state3 = this.state,
          X = _this$state3.X,
          Y = _this$state3.Y,
          popup = _this$state3.popup;
      var _X$width = X.width,
          xWidth = _X$width === void 0 ? 60 : _X$width,
          _X$height = X.height,
          xHeight = _X$height === void 0 ? 50 : _X$height;
      var _Y$width = Y.width,
          yWidth = _Y$width === void 0 ? 50 : _Y$width;
      this.getDetails();
      var d = this.details;
      var xType = d.type.x,
          yType = d.type.y,
          xRange = d.range.x,
          yRange = d.range.y;
      var xFilter = xRange ? xRange.filter : undefined,
          yFilter = yRange ? yRange.filter : undefined,
          items = d.width ? this.getElements() : [];
      return /*#__PURE__*/_react.default.createElement(RChartContext.Provider, {
        value: {
          data: data,
          X: X,
          Y: Y
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart",
        ref: this.dom
      }, html && html(this.props), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-title"
      }, data.map(function (d, i) {
        var _d$show = d.show,
            show = _d$show === void 0 ? true : _d$show,
            color = d.color;
        var style = show ? {
          background: color
        } : {
          boxShadow: "inset 0 0 0 2px ".concat(color)
        };
        return /*#__PURE__*/_react.default.createElement("div", {
          key: i,
          className: "r-chart-title-item",
          onClick: function onClick() {
            show = !show;
            d.show = show;

            _this2.onChange(data);
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "r-chart-title-color",
          style: style
        }), /*#__PURE__*/_react.default.createElement("div", {
          className: "r-chart-title-text"
        }, d.title || 'untitle'));
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-container",
        style: this.getStyle(yWidth, xHeight)
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-popup-container"
      }), popup !== false && /*#__PURE__*/_react.default.createElement(RChartEdit, _extends({}, popup, {
        onChange: function onChange(obj) {
          for (var prop in obj) {
            popup[prop] = obj[prop];
          }

          _this2.SetState({
            popup: popup
          });
        },
        onClose: this.closePopup.bind(this),
        onEdit: function onEdit() {
          var dataIndex = popup.dataIndex,
              streamIndex = popup.streamIndex,
              value = popup.value;
          data[dataIndex].stream[streamIndex].y = value;

          _this2.onChange(data);

          _this2.closePopup();
        },
        onAdd: function onAdd() {
          var dataIndex = popup.dataIndex,
              mouseValue = popup.mouseValue,
              value = popup.value;
          var stream = data[dataIndex].stream;

          if (xType === 'string') {
            var addObject = {
              x: mouseValue[0],
              y: value
            },
                addIndex;

            var index = _this2.binerySearch(stream, X.labels.indexOf(_this2.mouseValue[0]), function (m) {
              return X.labels.indexOf(m.x);
            });

            if (index === Infinity) {
              addIndex = stream.length;
            } else if (index === -Infinity) {
              addIndex = 0;
            } else if (Array.isArray(index)) {
              addIndex = index[1];
            }

            if (add.callback) {
              add.callback({
                object: addObject,
                dataIndex: dataIndex,
                streamIndex: addIndex
              });
            } else {
              stream.splice(addIndex, 0, addObject);

              _this2.onChange(data);
            }
          }

          _this2.closePopup();
        },
        onRemove: function onRemove() {}
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-axis r-chart-axis-y",
        onMouseEnter: function onMouseEnter(e) {
          _this2.zoomHover(e, true);
        },
        onMouseLeave: function onMouseLeave(e) {
          _this2.zoomHover(e, false);
        }
      }, Y.show !== false && yRange && /*#__PURE__*/_react.default.createElement(_rRangeSlider.default, _extends({}, this.slider, {
        direction: "top",
        start: yRange.start,
        end: yRange.end,
        label: this.getLabelConfig('y', Y)
      })), Y.zoom && yFilter && /*#__PURE__*/_react.default.createElement(_rRangeSlider.default, _extends({
        direction: "top",
        start: yFilter.start,
        end: yFilter.end,
        className: "filterSlider",
        points: [{
          value: yFilter.p1
        }, {
          value: yFilter.p2,
          fillStyle: {
            width: '3px',
            background: '#eee'
          }
        }],
        editValue: function editValue(point) {
          return yType === 'string' ? Y.labels[point.value] : point.value;
        },
        ondrag: function ondrag(_ref8) {
          var points = _ref8.points;
          return _this2.changeFilter(points[0].value, points[1].value, 'Y');
        },
        onmousedown: this.zoomMouseDown.bind(this),
        onmouseup: this.zoomMouseUp.bind(this)
      }, this.getZoomStyle('y')))), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-canvas"
      }, /*#__PURE__*/_react.default.createElement(_rCanvas.default, {
        getSize: function getSize(width, height) {
          _this2.details.width = width;
          _this2.details.height = height;
        },
        axisPosition: ['0%', '100%'],
        items: items,
        mouseMove: function mouseMove(e, _ref9) {
          var _ref10 = _slicedToArray(_ref9, 4),
              x = _ref10[0],
              y = _ref10[1],
              px = _ref10[2],
              py = _ref10[3];

          _this2.mousePosition = [x, y, px, py];
          _this2.popupPosition = [x + yWidth, d.height + y];
          _this2.mouseValue = [_this2.getValueByPercent(px, 'x'), _this2.getValueByPercent(-py, 'y')];
          var container = (0, _jquery.default)(_this2.dom.current).find('.r-chart-popup-container');
          var popup = container.find('.r-chart-popup');
          container.css({
            left: _this2.popupPosition[0],
            top: _this2.popupPosition[1]
          });
          container.html('<div class="r-chart-popup">' + _this2.mouseValue[0] + '  ' + _this2.mouseValue[1] + '</div>');
        },
        mouseDown: this.mouseDown.bind(this)
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-corner"
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-axis r-chart-axis-x",
        onMouseEnter: function onMouseEnter(e) {
          _this2.zoomHover(e, true);
        },
        onMouseLeave: function onMouseLeave(e) {
          _this2.zoomHover(e, false);
        }
      }, X.show !== false && xRange && /*#__PURE__*/_react.default.createElement(_rRangeSlider.default, _extends({}, this.slider, {
        start: xRange.start,
        end: xRange.end,
        label: this.getLabelConfig('x', X)
      })), X.zoom && xFilter && /*#__PURE__*/_react.default.createElement(_rRangeSlider.default, _extends({
        start: xFilter.start,
        end: xFilter.end,
        className: "filterSlider",
        points: [{
          value: xFilter.p1
        }, {
          value: xFilter.p2,
          fillStyle: {
            height: '3px',
            background: '#eee'
          }
        }],
        editValue: function editValue(point) {
          return xType === 'string' ? X.labels[point.value] : point.value;
        },
        ondrag: function ondrag(_ref11) {
          var points = _ref11.points;
          return _this2.changeFilter(points[0].value, points[1].value, 'X');
        },
        onmousedown: this.zoomMouseDown.bind(this),
        onmouseup: this.zoomMouseUp.bind(this)
      }, this.getZoomStyle('x')))))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var prevx = state.prevx,
          prevy = state.prevy;
      var _props$X = props.X,
          X = _props$X === void 0 ? {} : _props$X,
          _props$Y = props.Y,
          Y = _props$Y === void 0 ? {} : _props$Y;
      var change = {},
          changed = false;

      if (prevx !== JSON.stringify(X)) {
        //اگر پروپس جدید از بیرون آمد
        change.prevx = JSON.stringify(X);
        change.X = X;
        changed = true;
      }

      if (prevy !== JSON.stringify(Y)) {
        //اگر پروپس جدید از بیرون آمد
        change.prevy = JSON.stringify(Y);
        change.Y = Y;
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
  data: [],
  X: {},
  Y: {}
};

var RChartEdit = /*#__PURE__*/function (_Component2) {
  _inherits(RChartEdit, _Component2);

  var _super2 = _createSuper(RChartEdit);

  function RChartEdit() {
    _classCallCheck(this, RChartEdit);

    return _super2.apply(this, arguments);
  }

  _createClass(RChartEdit, [{
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          type = _this$props5.type,
          _onChange = _this$props5.onChange,
          onClose = _this$props5.onClose,
          mouseValue = _this$props5.mouseValue,
          onAdd = _this$props5.onAdd,
          onEdit = _this$props5.onEdit,
          dataIndex = _this$props5.dataIndex,
          value = _this$props5.value;
      var _this$context = this.context,
          data = _this$context.data,
          X = _this$context.X,
          Y = _this$context.Y;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-backdrop"
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-header"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-title"
      }, type), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-close",
        onClick: onClose
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-item"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-data-name"
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          background: data[dataIndex].color
        }
      }), /*#__PURE__*/_react.default.createElement("select", {
        value: dataIndex,
        onChange: function onChange(e) {
          return _onChange({
            dataIndex: e.target.value
          });
        }
      }, type === 'Add Point' && data.map(function (d, i) {
        return /*#__PURE__*/_react.default.createElement("option", {
          key: i,
          value: i
        }, d.title || 'untitle');
      }), type === 'Edit Point' && /*#__PURE__*/_react.default.createElement("option", {
        key: dataIndex,
        value: dataIndex
      }, data[dataIndex].title || 'untitle'))), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-form"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-label"
      }, (X.title || 'X untitle') + ' : '), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-detail-value"
      }, mouseValue[0])), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-form"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-label"
      }, (Y.title || 'Y untitle') + ' : '), /*#__PURE__*/_react.default.createElement("input", {
        className: "r-chart-edit-value",
        type: "number",
        value: value,
        onChange: function onChange(e) {
          return _onChange({
            value: e.target.value
          });
        }
      })), /*#__PURE__*/_react.default.createElement("button", {
        className: "r-chart-edit-button",
        onClick: type === 'Add Point' ? onAdd : onEdit
      }, type)));
    }
  }]);

  return RChartEdit;
}(_react.Component);

_defineProperty(RChartEdit, "contextType", RChartContext);
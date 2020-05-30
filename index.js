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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

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
    _this.mouseDownDetail = {};
    var _this$props = _this.props,
        data = _this$props.data,
        filter = _this$props.filter;
    _this.touch = 'ontouchstart' in document.documentElement;
    var preventData = {};

    for (var i = 0; i < data.length; i++) {
      var d = data[i];

      if (d.title === undefined) {
        continue;
      }

      preventData[d.title] = false;
    }

    _this.state = {
      popup: false,
      preventData: preventData,
      filter: filter
    };
    _this.dom = /*#__PURE__*/(0, _react.createRef)();
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
    value: function getRangeTypeNumber(axis) {
      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
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
      var start, step, end;

      if (range === 0) {
        if (min < 0) {
          start = 2 * min;
          step = Math.abs(min);
          end = 0;
        } else if (min > 0) {
          start = 0;
          step = min;
          end = 2 * min;
        } else {
          start = -1;
          step = 1;
          end = 1;
        }
      } else {
        while (range / 10 > 1) {
          i *= 10;
          range /= 10;
        }

        if (range >= 0 && range <= 3) {
          step = 0.2 * i;
        } else {
          step = i;
        }

        start = Math.round(min / step) * step - step;
        end = Math.round(max / step) * step + step;
      }

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
    value: function getRangeTypeString(axis, _ref) {
      var labels = _ref.labels,
          _ref$width = _ref.width,
          width = _ref$width === void 0 ? 60 : _ref$width,
          _ref$height = _ref.height,
          height = _ref$height === void 0 ? 30 : _ref$height;
      var filter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
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
      approveCount = approveCount < 1 ? 1 : approveCount;
      var labelStep = Math.floor(count / approveCount);
      labelStep = labelStep < 1 ? 1 : labelStep;
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
      var filter = this.state.filter;
      var xRange = type.x === 'number' ? this.getRangeTypeNumber('x', filter.x) : this.getRangeTypeString('x', X, filter.x);
      var yRange = type.y === 'number' ? this.getRangeTypeNumber('y', filter.y) : this.getRangeTypeString('y', Y, filter.y);
      return {
        x: xRange,
        y: yRange
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
    value: function getLineChart(_ref2, index) {
      var stream = _ref2.stream,
          _ref2$fill = _ref2.fill,
          fill = _ref2$fill === void 0 ? '#fff' : _ref2$fill,
          _ref2$color = _ref2.color,
          color = _ref2$color === void 0 ? '#000' : _ref2$color,
          _ref2$pointRadius = _ref2.pointRadius,
          pointRadius = _ref2$pointRadius === void 0 ? 4 : _ref2$pointRadius,
          _ref2$lineWidth = _ref2.lineWidth,
          lineWidth = _ref2$lineWidth === void 0 ? 2 : _ref2$lineWidth,
          area = _ref2.area,
          dash = _ref2.dash,
          title = _ref2.title,
          editable = _ref2.editable;
      var points = [],
          line = {
        points: [],
        lineWidth: lineWidth,
        stroke: color,
        dash: dash
      },
          Area;

      for (var j = 0; j < stream.length; j++) {
        var _stream$j = stream[j],
            x = _stream$j.x,
            y = _stream$j.y,
            PointRadius = _stream$j.pointRadius,
            LineWidth = _stream$j.lineWidth,
            Fill = _stream$j.fill;

        if (x === null || y === null) {
          continue;
        } //if(x === 'msf'){debugger;}


        var xp = this.getPercentByValue(x, 'x'),
            yp = this.getPercentByValue(y, 'y');

        if (xp === 'string error') {
          console.error("RChart => Receive \"".concat(x, "\" in data[").concat(index, "].stream[").concat(j, "].x . but there is not \"").concat(x, "\" in X.labels array"));
          continue;
        } else if (xp === 'number error') {
          console.error("RChart => data[".concat(index, "].stream[").concat(j, "].x is not a number. if type of x value of stream is an string you must set labels property as array of strings in X props"));
          continue;
        } else {
          xp += '%';
        }

        if (yp === false) {
          console.error("RChart => Receive \"".concat(y, "\" in data[").concat(index, "].stream[").concat(j, "].y . but there is not \"").concat(y, "\" in Y.labels array"));
          continue;
        } else if (yp === 'number error') {
          console.error("RChart => data[".concat(index, "].stream[").concat(j, "].y is not a number. if type of y value of stream is an string you must set labels property as array of strings in Y props"));
          continue;
        } else {
          yp *= -1;
          yp += '%';
        }

        var radius = PointRadius || pointRadius;

        if (radius) {
          points.push({
            r: radius,
            lineWidth: LineWidth || lineWidth * 2,
            x: xp,
            y: yp,
            fill: Fill || fill,
            stroke: color,
            dataIndex: index,
            streamIndex: j,
            value: {
              x: x,
              y: y
            },
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
        area: area ? Area : [],
        type: 'line',
        title: title,
        index: index,
        editable: editable
      };
    }
  }, {
    key: "getBarChart",
    value: function getBarChart(_ref3, barCounter, index) {
      var color = _ref3.color,
          title = _ref3.title,
          editable = _ref3.editable;
      var rects = [];
      var _this$details3 = this.details,
          barAxis = _this$details3.barAxis,
          barCount = _this$details3.barCount,
          barWidth = _this$details3.barWidth;

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
            value: {
              x: x,
              y: y
            },
            pivot: [0, barWidth * (barCount / 2 - barCounter) + '%'],
            event: {
              mousedown: this.pointMouseDown.bind(this)
            },
            dataIndex: index,
            streamIndex: j
          });
        }
      }

      return {
        rects: rects,
        type: 'bar',
        title: title,
        index: index,
        editable: editable
      };
    }
  }, {
    key: "getGridLine",
    value: function getGridLine(value, axis, _ref4) {
      var _ref4$color = _ref4.color,
          color = _ref4$color === void 0 ? 'red' : _ref4$color,
          _ref4$lineWidth = _ref4.lineWidth,
          lineWidth = _ref4$lineWidth === void 0 ? 0.7 : _ref4$lineWidth,
          dash = _ref4.dash;
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
          gridColor = this.props[axis.toUpperCase()].gridColor;
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
          areas = [],
          Shapes = [];
      var data = this.props.data;
      var preventData = this.state.preventData;
      var _this$props2 = this.props,
          X = _this$props2.X,
          Y = _this$props2.Y;
      var barAxis = this.details.barAxis;
      var xGridLines = X.gridColor ? this.getGridLines('x') : [];
      var yGridLines = Y.gridColor ? this.getGridLines('y') : [];
      var xIndicator = X.indicator ? [this.getGridLine(X.indicator.value, 'x', X.indicator)] : [];
      var yIndicator = Y.indicator ? [this.getGridLine(Y.indicator.value, 'y', X.indicator)] : [];
      var barCounter = 0;
      this.data = [];

      for (var i = 0; i < data.length; i++) {
        var _data$i = data[i],
            title = _data$i.title,
            _stream = _data$i.stream,
            _data$i$type = _data$i.type,
            chartType = _data$i$type === void 0 ? 'line' : _data$i$type,
            _data$i$color = _data$i.color,
            color = _data$i$color === void 0 ? '#000' : _data$i$color,
            shapes = _data$i.shapes;

        if (preventData[title]) {
          continue;
        }

        if (chartType === 'line') {
          var result = this.getLineChart(data[i], i);
          this.data.push(result);
          points = points.concat(result.points);
          lines = lines.concat(result.line);
          areas = areas.concat(result.area);
        } else if (chartType === 'bar' && barAxis) {
          var result = this.getBarChart(data[i], barCounter, i);
          this.data.push(result);
          rects = rects.concat(result.rects);
          barCounter++;
        }

        Shapes = shapes ? Shapes.concat(this.getShapes(shapes(data, X, Y))) : Shapes;
      }

      this.elements = {
        arcs: points,
        rects: rects
      };
      return xGridLines.concat(yGridLines, rects, areas, lines, points, xIndicator, yIndicator, Shapes);
    }
  }, {
    key: "getShapes",
    value: function getShapes(shapes) {
      var Shapes = [];

      for (var i = 0; i < shapes.length; i++) {
        var shape = shapes[i];
        var obj = { ...shape
        };

        if (shape.points) {
          obj.points = [];

          for (var j = 0; j < shape.points.length; j++) {
            var _shape$points$j = shape.points[j],
                x = _shape$points$j.x,
                y = _shape$points$j.y;
            obj.points.push([this.getPercentByValue(x, 'x') + '%', -this.getPercentByValue(y, 'y') + '%']);
          }
        } else if (shape.r) {
          var _x = shape.x,
              _y = shape.y;
          obj.x = this.getPercentByValue(_x, 'x') + '%';
          obj.y = -this.getPercentByValue(_y, 'y') + '%';
        }

        Shapes.push(obj);
      }

      return Shapes;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.SetState({});
    }
  }, {
    key: "getDetails",
    value: function getDetails() {
      var _this$props3 = this.props,
          X = _this$props3.X,
          Y = _this$props3.Y,
          data = _this$props3.data,
          _this$props3$barWidth = _this$props3.barWidth,
          barWidth = _this$props3$barWidth === void 0 ? 80 : _this$props3$barWidth,
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
            return parseFloat((Value + start).toFixed(2));
          } else {
            return (axis === 'x' ? X : Y).labels[Math.round(Value - 0.5)];
          }
        };
      } //نوع چارت و تابع گرفتن درصد با مقدار یکبار تایین می شود


      if (this.mouseDownDetail.target !== 'point') {
        this.details.limit = this.getLimit(data, X, Y);
      }

      this.details.range = this.getRange(X, Y);
      d.barCount = data.filter(function (d) {
        return d.type === 'bar';
      }).length;

      if (d.barAxis) {
        d.barWidth = barWidth / d.range[d.barAxis].count / d.barCount;
      }
    }
  }, {
    key: "getPixelByValue",
    value: function getPixelByValue(value, axis) {
      return this.getPercentByValue(value, axis) * this.details[axis === 'x' ? 'width' : 'height'] / 100;
    }
  }, {
    key: "changeFilter",
    value: function changeFilter(p1, p2, axis) {
      var labels = this.props[axis.toUpperCase()].labels;
      var filter = this.state.filter;
      filter[axis] = labels ? [labels[p1], labels[p2]] : [p1, p2];
      this.SetState({
        filter: filter
      });
    }
  }, {
    key: "pointMouseDown",
    value: function pointMouseDown(_ref5) {
      var dataIndex = _ref5.dataIndex,
          streamIndex = _ref5.streamIndex;
      var _this$props4 = this.props,
          data = _this$props4.data,
          edit = _this$props4.edit,
          remove = _this$props4.remove;

      if (data[dataIndex].editable === false) {
        return;
      }

      if (!edit && !remove) {
        return;
      }

      var stream = data[dataIndex].stream[streamIndex];
      this.mouseDownDetail = {
        target: 'point',
        x: stream.x,
        y: stream.y
      };
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
      var _this$props5 = this.props,
          data = _this$props5.data,
          edit = _this$props5.edit,
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

      if (!edit) {
        return;
      }

      edit({
        dataIndex: this.so.dataIndex,
        streamIndex: this.so.streamIndex,
        value: this.mouseValue[1]
      });
    }
  }, {
    key: "pointMouseUp",
    value: function pointMouseUp() {
      this.eventHandler('window', 'mousemove', this.pointMouseMove, 'unbind');
      this.eventHandler('window', 'mouseup', this.pointMouseUp, 'unbind');
      this.mouseDownDetail = {};
      var _this$props6 = this.props,
          data = _this$props6.data,
          edit = _this$props6.edit,
          remove = _this$props6.remove;

      if (!this.moved) {
        var stream = data[this.so.dataIndex].stream[this.so.streamIndex];
        var title = !edit ? 'Remove Point' : 'Edit Point';
        var d = data[this.so.dataIndex];
        this.SetState({
          popup: {
            dataIndex: this.so.dataIndex,
            streamIndex: this.so.streamIndex,
            dataIndexes: [this.so.dataIndex],
            dynamicValue: stream.y,
            staticValue: this.mouseValue[0],
            onEdit: edit,
            onRemove: remove,
            title: title
          }
        });
      } else if (edit) {
        edit({
          dataIndex: this.so.dataIndex,
          streamIndex: this.so.streamIndex,
          value: this.mouseValue[1]
        });
      }
    } //کلیک روی بک گراند چارت

  }, {
    key: "mouseDown",
    value: function mouseDown() {
      var _this$props7 = this.props,
          add = _this$props7.add,
          multiselect = _this$props7.multiselect,
          data = _this$props7.data; // اگر مد افزودن فعال بود و در موقعیت فعلی موس دیتا یا دیتا هایی آمادگی دریافت نقطه جدید در این موقعیت را داشتند

      if (add && this.addDataIndexes.length) {
        this.SetState({
          popup: {
            type: 'add',
            dataIndexes: this.addDataIndexes,
            dataIndex: this.addDataIndexes[0],
            dynamicValue: this.mouseValue[1],
            staticValue: this.mouseValue[0],
            onAdd: add,
            title: 'Add Point'
          }
        });
      } else if (multiselect) {
        this.multiselect = {};
        this.multiselect.selectRect = (0, _jquery.default)(this.dom.current).find('.r-chart-multiselect');
        this.multiselect.selectRect.css({
          display: 'block',
          left: this.mousePosition[2] + '%',
          width: '0%'
        });
        this.eventHandler('window', 'mousemove', _jquery.default.proxy(this.multiselectMove, this));
        this.eventHandler('window', 'mouseup', _jquery.default.proxy(this.multiselectUp, this));
        this.multiselect.position = this.mousePosition[2];
      }
    }
  }, {
    key: "multiselectMove",
    value: function multiselectMove() {
      var m = this.multiselect,
          mp = this.mousePosition[2];

      if (mp < m.position) {
        m.end = m.position;
        m.start = mp;
      } else {
        m.start = m.position;
        m.end = mp;
      }

      m.selectRect.css({
        width: m.end - m.start + '%',
        left: m.start + '%'
      });
    }
  }, {
    key: "hideSelectRect",
    value: function hideSelectRect() {
      if (!this.multiselect || !this.multiselect.selectRect) {
        return;
      }

      this.multiselect.selectRect.css({
        display: 'none'
      });
    }
  }, {
    key: "multiselectUp",
    value: function multiselectUp() {
      var multiselect = this.props.multiselect;
      this.eventHandler('window', 'mousemove', this.multiselectMove, 'unbind');
      this.eventHandler('window', 'mouseup', this.multiselectUp, 'unbind');

      if (!this.multiselect.start || !this.multiselect.end || Math.abs(this.multiselect.start - this.multiselect.end) < 3) {
        this.hideSelectRect();
        return;
      }

      this.multiselect.points = this.getPointsBySelectRect();

      if (this.multiselect.points.length === 0) {
        this.hideSelectRect();
        return;
      }

      this.SetState({
        popup: {
          type: 'multiselect',
          title: 'Multi Select',
          points: this.multiselect.points
        }
      });
    }
  }, {
    key: "getPointsBySelectRect",
    value: function getPointsBySelectRect() {
      var preventData = this.state.preventData;
      var _this$multiselect = this.multiselect,
          start = _this$multiselect.start,
          end = _this$multiselect.end;
      var result = [];

      for (var i = 0; i < this.data.length; i++) {
        var _this$data$i = this.data[i],
            index = _this$data$i.index,
            title = _this$data$i.title,
            points = _this$data$i.points,
            editable = _this$data$i.editable;

        if (editable === false) {
          continue;
        }

        if (preventData[title]) {
          continue;
        }

        for (var j = 0; j < points.length; j++) {
          var x = parseFloat(points[j].x);

          if (x < start || x > end) {
            continue;
          }

          result.push([index, j]);
        }
      }

      return result;
    }
  }, {
    key: "closePopup",
    value: function closePopup() {
      this.SetState({
        popup: false
      });
      this.hideSelectRect();
    }
  }, {
    key: "zoomHover",
    value: function zoomHover(e, axis) {
      e.stopPropagation();
      var _this$props8 = this.props,
          _this$props8$X = _this$props8.X,
          X = _this$props8$X === void 0 ? {} : _this$props8$X,
          _this$props8$Y = _this$props8.Y,
          Y = _this$props8$Y === void 0 ? {} : _this$props8$Y;

      if (axis === 'x' && !X.zoom) {
        return;
      }

      if (axis === 'y' && !Y.zoom) {
        return;
      }

      this.hoverAxis = axis;

      if (this.zoomDown) {
        return;
      }

      this.hadleShowSliders(axis);
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
    value: function hadleShowSliders(axis) {
      if (axis) {
        var container = (0, _jquery.default)(this.dom.current).find('.r-chart-axis-' + axis);
        var filterSlider = container.find('.filterSlider');
        var labelSlider = container.find('.labelSlider');
        filterSlider.show();
        labelSlider.hide();
      } else {
        var container = (0, _jquery.default)(this.dom.current);
        var filterSlider = container.find('.filterSlider');
        var labelSlider = container.find('.labelSlider');
        filterSlider.hide();
        labelSlider.show();
      }
    }
  }, {
    key: "getPopup",
    value: function getPopup(popup) {
      var _this2 = this;

      var _this$props9 = this.props,
          data = _this$props9.data,
          add = _this$props9.add,
          edit = _this$props9.edit,
          remove = _this$props9.remove,
          d = this.details;
      var xType = d.type.x,
          yType = d.type.y;
      return /*#__PURE__*/_react.default.createElement(RChartEdit, _extends({}, popup, {
        onChange: function onChange(obj) {
          for (var prop in obj) {
            popup[prop] = obj[prop];
          }

          _this2.SetState({
            popup: popup
          });
        },
        onClose: this.closePopup.bind(this)
      }));
    }
  }, {
    key: "getHeader",
    value: function getHeader(yWidth) {
      var _this3 = this;

      var data = this.props.data,
          preventData = this.state.preventData;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-title",
        style: {
          paddingLeft: yWidth + 'px'
        }
      }, data.filter(function (d) {
        return d.title !== undefined;
      }).map(function (d, i) {
        var color = d.color,
            title = d.title;
        var style = !preventData[d.title] ? {
          background: color
        } : {
          boxShadow: "inset 0 0 0 2px ".concat(color)
        };
        return /*#__PURE__*/_react.default.createElement("div", {
          key: i,
          className: "r-chart-title-item",
          onClick: function onClick() {
            preventData[title] = preventData[title] === undefined ? false : preventData[title];
            preventData[title] = !preventData[title];

            _this3.SetState({
              preventData: preventData
            });
          }
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "r-chart-title-color",
          style: style
        }), /*#__PURE__*/_react.default.createElement("div", {
          className: "r-chart-title-text"
        }, d.title || 'untitle'));
      }));
    }
  }, {
    key: "getLabelSlider",
    value: function getLabelSlider(axis) {
      var type = this.details.type[axis],
          _this$details$range$a = this.details.range[axis],
          start = _this$details$range$a.start,
          end = _this$details$range$a.end,
          step = _this$details$range$a.step;
      var labelStyle = {
        x: {
          top: '24px'
        },
        y: {
          left: 'unset',
          right: '16px',
          justifyContent: 'flex-end'
        }
      };
      var _this$props$axis$toUp = this.props[axis.toUpperCase()],
          _this$props$axis$toUp2 = _this$props$axis$toUp.rotate,
          rotate = _this$props$axis$toUp2 === void 0 ? 0 : _this$props$axis$toUp2,
          labels = _this$props$axis$toUp.labels;
      return /*#__PURE__*/_react.default.createElement(_rRangeSlider.default, {
        className: "labelSlider",
        editable: false,
        showValue: false,
        style: {
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          padding: 0
        },
        pointStyle: {
          display: 'none'
        },
        lineStyle: {
          display: 'none'
        },
        direction: axis === 'x' ? 'right' : 'top',
        start: start,
        end: end,
        label: {
          step: step,
          rotate: axis === 'y' ? 0 : rotate,
          edit: type === 'string' ? function (value) {
            return labels[value];
          } : undefined,
          style: {
            fontSize: 'inherit',
            ...labelStyle[axis]
          }
        }
      });
    }
  }, {
    key: "getFilterSlider",
    value: function getFilterSlider(axis) {
      var _fillStyle,
          _this4 = this;

      var labels = this.props[axis.toUpperCase()].labels;
      var type = this.details.type[axis],
          _this$details$range$a2 = this.details.range[axis].filter,
          p1 = _this$details$range$a2.p1,
          p2 = _this$details$range$a2.p2,
          start = _this$details$range$a2.start,
          end = _this$details$range$a2.end;
      var points = [{
        value: p1
      }, {
        value: p2,
        fillStyle: (_fillStyle = {}, _defineProperty(_fillStyle, axis === 'y' ? 'width' : 'height', '3px'), _defineProperty(_fillStyle, "background", '#eee'), _fillStyle)
      }];
      var style = {
        x: {
          width: '100%',
          height: '36px',
          padding: '0 12px',
          top: 0
        },
        y: {
          width: '36px',
          height: '100%',
          padding: '12px 0',
          right: 0
        }
      };
      return /*#__PURE__*/_react.default.createElement(_rRangeSlider.default, {
        direction: axis === 'x' ? 'right' : 'top',
        start: start,
        end: end,
        className: "filterSlider",
        points: points,
        editValue: function editValue(point) {
          return type === 'string' ? labels[point.value] : point.value;
        },
        ondrag: function ondrag(_ref6) {
          var points = _ref6.points;
          return _this4.changeFilter(points[0].value, points[1].value, axis);
        },
        onmousedown: this.zoomMouseDown.bind(this),
        onmouseup: this.zoomMouseUp.bind(this),
        style: {
          position: 'absolute',
          display: 'none',
          ...style[axis]
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
      });
    }
  }, {
    key: "getStreamIndexByLabel",
    value: function getStreamIndexByLabel(_ref7, label) {
      var stream = _ref7.stream;

      for (var j = 0; j < stream.length; j++) {
        if (stream[j].x === label) {
          return j;
        }
      }

      return false;
    }
  }, {
    key: "getAddableDataIndexes",
    value: function getAddableDataIndexes(label) {
      var data = this.props.data;
      var indexes = [];

      for (var i = 0; i < data.length; i++) {
        var editable = data[i].editable;

        if (editable === false) {
          continue;
        }

        if (this.getStreamIndexByLabel(data[i], label) === false) {
          indexes.push(i);
        }
      }

      return indexes;
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$props10 = this.props,
          X = _this$props10.X,
          Y = _this$props10.Y,
          data = _this$props10.data,
          html = _this$props10.html,
          add = _this$props10.add,
          multiselect = _this$props10.multiselect,
          style = _this$props10.style;
      var _this$state = this.state,
          popup = _this$state.popup,
          preventData = _this$state.preventData;
      var _X$width = X.width,
          xWidth = _X$width === void 0 ? 60 : _X$width,
          _X$height = X.height,
          xHeight = _X$height === void 0 ? 50 : _X$height;
      var _Y$width = Y.width,
          yWidth = _Y$width === void 0 ? 50 : _Y$width;
      this.getDetails();
      var d = this.details;
      var xRange = d.range.x,
          yRange = d.range.y;
      var items = d.width ? this.getElements() : [];
      return /*#__PURE__*/_react.default.createElement(RChartContext.Provider, {
        value: {
          data: data,
          X: X,
          Y: Y,
          multiselect: multiselect
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart",
        ref: this.dom,
        style: style
      }, this.getHeader(yWidth), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-container",
        style: this.getStyle(yWidth, xHeight)
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-popup-container"
      }), popup !== false && this.getPopup(popup), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-axis r-chart-axis-y",
        onMouseEnter: function onMouseEnter(e) {
          _this5.zoomHover(e, 'y');
        },
        onMouseLeave: function onMouseLeave(e) {
          _this5.zoomHover(e, false);
        }
      }, Y.show !== false && yRange && this.getLabelSlider('y'), Y.zoom && yRange && this.getFilterSlider('y')), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-canvas"
      }, html && html(this.elements, d), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-multiselect"
      }), /*#__PURE__*/_react.default.createElement(_rCanvas.default, {
        getSize: function getSize(width, height) {
          _this5.details.width = width;
          _this5.details.height = height;
        },
        axisPosition: ['0%', '100%'],
        items: items,
        mouseMove: function mouseMove(e, _ref8) {
          var _ref9 = _slicedToArray(_ref8, 4),
              x = _ref9[0],
              y = _ref9[1],
              px = _ref9[2],
              py = _ref9[3];

          _this5.mousePosition = [x, y, px, py];
          _this5.mouseValue = [_this5.getValueByPercent(px, 'x'), _this5.getValueByPercent(-py, 'y')];
          var xValue = _this5.mouseDownDetail.target === 'point' ? _this5.mouseDownDetail.x : _this5.mouseValue[0];
          _this5.popupPosition = [_this5.getPixelByValue(xValue, 'x') + yWidth, d.height + y];
          var addIndicator = '';
          _this5.addDataIndexes = false;

          if (add && _this5.mouseDownDetail.target !== 'point') {
            _this5.addDataIndexes = _this5.getAddableDataIndexes(_this5.mouseValue[0]);
            addIndicator = _this5.addDataIndexes.length ? "<div class=\"add-indicator\" style=\"background:".concat(data[_this5.addDataIndexes[0]].color, "\">+</div>") : '';
          }

          var container = (0, _jquery.default)(_this5.dom.current).find('.r-chart-popup-container');
          var popup = container.find('.r-chart-popup');
          container.css({
            left: _this5.popupPosition[0],
            top: _this5.popupPosition[1]
          });
          container.html('<div class="r-chart-popup">' + addIndicator + xValue + '  ' + _this5.mouseValue[1] + '</div>');
        },
        mouseDown: this.mouseDown.bind(this)
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-corner"
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-axis r-chart-axis-x",
        onMouseEnter: function onMouseEnter(e) {
          _this5.zoomHover(e, 'x');
        },
        onMouseLeave: function onMouseLeave(e) {
          _this5.zoomHover(e, false);
        }
      }, X.show !== false && xRange && this.getLabelSlider('x'), X.zoom && xRange && this.getFilterSlider('x')))));
    }
  }]);

  return RChart;
}(_react.Component);

exports.default = RChart;
RChart.defaultProps = {
  data: [],
  X: {},
  Y: {},
  filter: {
    x: [],
    y: []
  }
};

var RChartEdit = /*#__PURE__*/function (_Component2) {
  _inherits(RChartEdit, _Component2);

  var _super2 = _createSuper(RChartEdit);

  function RChartEdit(props) {
    var _this6;

    _classCallCheck(this, RChartEdit);

    _this6 = _super2.call(this, props);
    _this6.dom = /*#__PURE__*/(0, _react.createRef)();
    return _this6;
  }

  _createClass(RChartEdit, [{
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
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _jquery.default)(this.dom.current).find('input').eq(0).focus().select();
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var _this$props11 = this.props,
          points = _this$props11.points,
          type = _this$props11.type,
          title = _this$props11.title,
          _onChange = _this$props11.onChange,
          onClose = _this$props11.onClose,
          onAdd = _this$props11.onAdd,
          onEdit = _this$props11.onEdit,
          onRemove = _this$props11.onRemove,
          dataIndex = _this$props11.dataIndex,
          streamIndex = _this$props11.streamIndex,
          dynamicValue = _this$props11.dynamicValue,
          staticValue = _this$props11.staticValue,
          _this$props11$dataInd = _this$props11.dataIndexes,
          dataIndexes = _this$props11$dataInd === void 0 ? [] : _this$props11$dataInd;
      var _this$context = this.context,
          data = _this$context.data,
          X = _this$context.X,
          Y = _this$context.Y,
          _this$context$multise = _this$context.multiselect,
          multiselect = _this$context$multise === void 0 ? {} : _this$context$multise;
      var _multiselect$items = multiselect.items,
          items = _multiselect$items === void 0 ? [] : _multiselect$items,
          _multiselect$actions = multiselect.actions,
          actions = _multiselect$actions === void 0 ? [] : _multiselect$actions;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit",
        ref: this.dom
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-backdrop"
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-header"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-title"
      }, title), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-close",
        onClick: onClose
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-body"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-data-list"
      }, dataIndexes.map(function (index) {
        return /*#__PURE__*/_react.default.createElement("div", {
          onClick: function onClick() {
            return _onChange({
              dataIndex: index
            });
          },
          className: "r-chart-edit-data-list-item".concat(dataIndex === index ? ' active' : ''),
          key: index,
          style: {
            color: data[index].color,
            background: data[index].color
          }
        });
      })), staticValue !== undefined && /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-form"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-label"
      }, (X.title || 'X untitle') + ' : '), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-detail-value"
      }, staticValue)), dynamicValue !== undefined && /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-form"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-label"
      }, (Y.title || 'Y untitle') + ' : '), /*#__PURE__*/_react.default.createElement("input", {
        className: "r-chart-edit-value",
        type: "number",
        value: dynamicValue,
        onChange: function onChange(e) {
          if (!onEdit && !onAdd) {
            return;
          }

          _onChange({
            dynamicValue: e.target.value
          });
        }
      })), type === 'multiselect' && items.filter(function (item) {
        return item.show !== false;
      }).map(function (item, i) {
        return /*#__PURE__*/_react.default.createElement("div", {
          key: i,
          className: "r-chart-edit-form"
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "r-chart-edit-label"
        }, item.title), item.type === 'number' && /*#__PURE__*/_react.default.createElement("input", {
          className: "r-chart-edit-value",
          type: "number",
          value: item.value,
          onChange: function onChange(e) {
            var value = parseFloat(e.target.value);
            item.onChange(value);
          }
        }), item.type === 'select' && /*#__PURE__*/_react.default.createElement("select", {
          className: "r-chart-edit-value",
          title: item.value,
          onChange: function onChange(_ref10) {
            var nativeEvent = _ref10.nativeEvent;
            var _nativeEvent$target = nativeEvent.target,
                selectedIndex = _nativeEvent$target.selectedIndex,
                options = _nativeEvent$target.options;
            var _options$selectedInde = options[selectedIndex],
                text = _options$selectedInde.text,
                value = _options$selectedInde.value;
            item.onChange({
              index: selectedIndex,
              text: text,
              value: value
            });
          },
          defaultValue: item.value
        }, item.options.map(function (o, i) {
          return /*#__PURE__*/_react.default.createElement("option", {
            key: i,
            value: o.value
          }, o.text);
        })), item.type === 'checkbox' && /*#__PURE__*/_react.default.createElement("input", {
          type: "checkbox",
          value: item.value,
          onChange: function onChange(e) {
            return item.onChange(e.target.checked);
          }
        }));
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-footer"
      }, /*#__PURE__*/_react.default.createElement("button", {
        className: "r-chart-edit-button",
        onClick: onClose,
        style: {
          flex: 1
        }
      }, "Close"), type === 'multiselect' && actions.filter(function (a) {
        return a.show !== false;
      }).map(function (a, i) {
        return /*#__PURE__*/_react.default.createElement("button", {
          key: i,
          className: "r-chart-edit-button",
          onClick: function onClick() {
            a.callback(points);
            onClose();
          }
        }, a.text);
      }), onAdd && /*#__PURE__*/_react.default.createElement("button", {
        className: "r-chart-edit-button",
        onClick: function onClick() {
          var streamIndex;
          var stream = data[dataIndex].stream;

          var index = _this7.binerySearch(stream, X.labels.indexOf(staticValue), function (m) {
            return X.labels.indexOf(m.x);
          });

          if (index === Infinity) {
            streamIndex = stream.length;
          } else if (index === -Infinity) {
            streamIndex = 0;
          } else if (Array.isArray(index)) {
            streamIndex = index[1];
          }

          onAdd({
            dataIndex: dataIndex,
            streamIndex: streamIndex,
            object: {
              x: staticValue,
              y: dynamicValue
            }
          });
          onClose();
        }
      }, "Add"), onRemove && /*#__PURE__*/_react.default.createElement("button", {
        className: "r-chart-edit-button",
        onClick: function onClick() {
          onRemove({
            dataIndex: dataIndex,
            streamIndex: streamIndex
          });
          onClose();
        }
      }, "Remove"), onEdit && /*#__PURE__*/_react.default.createElement("button", {
        className: "r-chart-edit-button",
        onClick: function onClick() {
          onEdit({
            dataIndex: dataIndex,
            streamIndex: streamIndex,
            value: dynamicValue
          });
          onClose();
        }
      }, "Edit")));
    }
  }]);

  return RChartEdit;
}(_react.Component);

_defineProperty(RChartEdit, "contextType", RChartContext);
"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var RChartContext = /*#__PURE__*/(0, _react.createContext)();

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
    _this.details = {
      getRange: {}
    };
    (0, _jquery.default)('body').on('mouseout', '.r-chart-canvas', function () {
      (0, _jquery.default)('.r-chart-popup-container').html('');
    });

    if ('ontouchstart' in document.documentElement) {
      (0, _functions.eventHandler)('window', 'mouseup', function () {
        (0, _jquery.default)('.r-chart-popup-container').html('');
      });
    }

    return _this;
  }

  _createClass(RChart, [{
    key: "translate",
    value: function translate(value) {
      var dictionary = {
        'Add.Point': {
          en: 'Add Point',
          fa: 'افزودن نقطه'
        },
        'Edit.Point': {
          en: 'Edit Point',
          fa: 'ویرایش نقطه'
        },
        'Remove.Point': {
          en: 'Remove Point',
          fa: 'حذف نقطه'
        },
        'Add': {
          en: 'Add',
          fa: 'افزودن'
        },
        'Edit': {
          en: 'Edit',
          fa: 'ویرایش'
        },
        'Remove': {
          en: 'Remove',
          fa: 'حذف'
        },
        'Close': {
          en: 'Close',
          fa: 'بستن'
        }
      };
      return dictionary[value][this.props.globalization];
    }
  }, {
    key: "getStyle",
    value: function getStyle(x, y) {
      return {
        gridTemplateColumns: "".concat(x, "px auto"),
        gridTemplateRows: "auto ".concat(y, "px"),
        direction: 'ltr'
      };
    }
  }, {
    key: "getLimit",
    value: function getLimit(data, X, Y) {
      var xLimit = X.labels ? [0, X.labels.length - 1] : (0, _functions.getLimitTypeNumber)(data, 'x');
      var yLimit = Y.labels ? [0, Y.labels.length - 1] : (0, _functions.getLimitTypeNumber)(data, 'y');
      return {
        x: xLimit,
        y: yLimit
      };
    }
  }, {
    key: "getClient",
    value: function getClient(e) {
      return 'ontouchstart' in document.documentElement ? {
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
    value: function getLineChart(_ref, index) {
      var stream = _ref.stream,
          _ref$fill = _ref.fill,
          fill = _ref$fill === void 0 ? '#fff' : _ref$fill,
          _ref$color = _ref.color,
          color = _ref$color === void 0 ? '#000' : _ref$color,
          _ref$pointRadius = _ref.pointRadius,
          pointRadius = _ref$pointRadius === void 0 ? 4 : _ref$pointRadius,
          _ref$lineWidth = _ref.lineWidth,
          lineWidth = _ref$lineWidth === void 0 ? 2 : _ref$lineWidth,
          area = _ref.area,
          dash = _ref.dash,
          title = _ref.title,
          editable = _ref.editable;
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
        }

        var xp = (0, _functions.getPercentByValue)(x, 'x', this.details),
            yp = (0, _functions.getPercentByValue)(y, 'y', this.details);

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
            x: xp,
            y: yp,
            items: [{
              r: this.props.clickRadius,
              fill: 'transparent',
              onMouseDown: this.pointMouseDown.bind(this),
              dataIndex: index,
              streamIndex: j,
              value: {
                x: x,
                y: y
              }
            }, {
              r: radius,
              lineWidth: LineWidth || lineWidth * 2,
              fill: Fill || fill,
              stroke: color
            }]
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
    value: function getBarChart(_ref2, barCounter, index) {
      var color = _ref2.color,
          title = _ref2.title,
          editable = _ref2.editable,
          stream = _ref2.stream;
      var rects = [];
      var _this$details = this.details,
          barAxis = _this$details.barAxis,
          barCount = _this$details.barCount,
          barWidth = _this$details.barWidth;

      for (var j = 0; j < stream.length; j++) {
        var _stream$j2 = stream[j],
            x = _stream$j2.x,
            y = _stream$j2.y;
        var xp = (0, _functions.getPercentByValue)(x, 'x', this.details),
            yp = (0, _functions.getPercentByValue)(y, 'y', this.details);

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
            onMouseDown: this.pointMouseDown.bind(this),
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
            onMouseDown: this.pointMouseDown.bind(this),
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
    value: function getGridLine(value, axis, _ref3) {
      var _ref3$color = _ref3.color,
          color = _ref3$color === void 0 ? 'red' : _ref3$color,
          _ref3$lineWidth = _ref3.lineWidth,
          lineWidth = _ref3$lineWidth === void 0 ? 0.7 : _ref3$lineWidth,
          dash = _ref3.dash;
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
      var _this$props2 = this.props,
          data = _this$props2.data,
          X = _this$props2.X,
          Y = _this$props2.Y;
      var preventData = this.state.preventData;
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
            stream = _data$i.stream,
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
          points = points.concat(result.points);
          lines = lines.concat(result.line);
          areas = areas.concat(result.area);
          this.data.push(JSON.parse(JSON.stringify(result)));
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
            obj.points.push([(0, _functions.getPercentByValue)(x, 'x', this.details) + '%', -(0, _functions.getPercentByValue)(y, 'y', this.details) + '%']);
          }
        } else if (shape.r) {
          var _x = shape.x,
              _y = shape.y;
          obj.x = (0, _functions.getPercentByValue)(_x, 'x', this.details) + '%';
          obj.y = -(0, _functions.getPercentByValue)(_y, 'y', this.details) + '%';
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
    key: "getRange",
    value: function getRange(X, Y) {
      var type = this.details.type;
      var xRange = type.x === 'number' ? (0, _functions.number_getRange)('x', this.details) : (0, _functions.string_getRange)('x', this.details);
      var yRange = type.y === 'number' ? (0, _functions.number_getRange)('y', this.details) : (0, _functions.string_getRange)('y', this.details);
      return {
        x: xRange,
        y: yRange
      };
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
          precision = _this$props3.precision,
          d = this.details;

      if (!d.type) {
        d.filter = this.state.filter;
        d.Axis = {
          x: X,
          y: Y
        };
        d.type = {
          x: X.labels ? 'string' : 'number',
          y: Y.labels ? 'string' : 'number'
        }; //تایین محوری که پایه ی بار چارت روی آن بنا می شود

        d.barAxis = d.type.x === 'string' ? 'x' : d.type.y === 'string' ? 'y' : false; //تایین محوری که ادیت چارت در راستای آن انجام می شود

        d.editAxis = d.type.x === 'string' ? 'y' : d.type.y === 'string' ? 'x' : 'y';
      } //نوع چارت و تابع گرفتن درصد با مقدار یکبار تایین می شود


      d.precision = precision;

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
    value: function pointMouseDown(e, pos, obj) {
      var dataIndex = obj.dataIndex,
          streamIndex = obj.streamIndex;
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

      this.getMouseDetail(pos);
      var stream = data[dataIndex].stream[streamIndex];
      this.mouseDownDetail = {
        target: 'point',
        x: stream.x,
        y: stream.y
      };
      (0, _functions.eventHandler)('window', 'mousemove', _jquery.default.proxy(this.pointMouseMove, this));
      (0, _functions.eventHandler)('window', 'mouseup', _jquery.default.proxy(this.pointMouseUp, this));
      this.so = {
        dataIndex: dataIndex,
        streamIndex: streamIndex,
        y: this.mouseDetail.y
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
        if (Math.abs(this.mouseDetail.y - this.so.y) < 8) {
          return;
        }

        if (stream.y === this.mouseDetail.vy) {
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
        value: this.mouseDetail.vy
      });
    }
  }, {
    key: "pointMouseUp",
    value: function pointMouseUp() {
      (0, _functions.eventHandler)('window', 'mousemove', this.pointMouseMove, 'unbind');
      (0, _functions.eventHandler)('window', 'mouseup', this.pointMouseUp, 'unbind');
      this.mouseDownDetail = {};
      var _this$props6 = this.props,
          data = _this$props6.data,
          edit = _this$props6.edit,
          remove = _this$props6.remove,
          onDragEnd = _this$props6.onDragEnd;

      if (!this.moved) {
        var stream = data[this.so.dataIndex].stream[this.so.streamIndex];
        var title = !edit ? this.translate('Remove.Point') : this.translate('Edit.Point');
        this.SetState({
          popup: {
            dataIndex: this.so.dataIndex,
            streamIndex: this.so.streamIndex,
            dataIndexes: [this.so.dataIndex],
            dynamicValue: stream.y,
            staticValue: this.mouseDetail.vx,
            onEdit: edit,
            onRemove: remove,
            title: title
          }
        });
      } else if (onDragEnd) {
        var changes = {
          dataIndex: this.so.dataIndex,
          streamIndex: this.so.streamIndex,
          value: this.mouseDetail.vy
        };
        onDragEnd(changes);
      } else if (edit) {
        var changes = {
          dataIndex: this.so.dataIndex,
          streamIndex: this.so.streamIndex,
          value: this.mouseDetail.vy
        };
        edit(changes);
      }
    } //کلیک روی بک گراند چارت

  }, {
    key: "mouseDown",
    value: function mouseDown() {
      var _this$props7 = this.props,
          add = _this$props7.add,
          multiselect = _this$props7.multiselect,
          addPopup = _this$props7.addPopup; // اگر مد افزودن فعال بود و در موقعیت فعلی موس دیتا یا دیتا هایی آمادگی دریافت نقطه جدید در این موقعیت را داشتند

      this.mouseDownXValue = this.mouseDetail.vx;

      if (add && this.mouseDetail.addDataIndexes.length) {
        (0, _functions.eventHandler)('window', 'mouseup', _jquery.default.proxy(this.addMouseUp, this));
      }

      if (multiselect && this.mouseDetail.target !== 'point') {
        this.multiselect = {};
        this.multiselect.selectRect = (0, _jquery.default)(this.dom.current).find('.r-chart-multiselect');
        this.multiselect.selectRect.css({
          display: 'block',
          left: this.mouseDetail.px + '%',
          width: '0%'
        });
        (0, _functions.eventHandler)('window', 'mousemove', _jquery.default.proxy(this.multiselectMove, this));
        (0, _functions.eventHandler)('window', 'mouseup', _jquery.default.proxy(this.multiselectUp, this));
        this.multiselect.position = this.mouseDetail.px;
      }
    }
  }, {
    key: "addMouseUp",
    value: function addMouseUp() {
      var _this$props8 = this.props,
          add = _this$props8.add,
          addPopup = _this$props8.addPopup;
      (0, _functions.eventHandler)('window', 'mouseup', this.addMouseUp, 'unbind');

      if (this.mouseDetail.vx !== this.mouseDownXValue) {
        return;
      }

      if (addPopup === false) {
        add({
          y: this.mouseDetail.vy,
          x: this.mouseDetail.vx
        });
      } else {
        this.SetState({
          popup: {
            type: 'add',
            dataIndexes: this.mouseDetail.addDataIndexes,
            dataIndex: this.mouseDetail.addDataIndexes[0],
            dynamicValue: this.mouseDetail.vy,
            staticValue: this.mouseDetail.vx,
            onAdd: add,
            title: this.translate('Add.Point')
          }
        });
      }
    }
  }, {
    key: "multiselectMove",
    value: function multiselectMove() {
      var m = this.multiselect,
          mp = this.mouseDetail.px;

      if (this.mouseDetail.vx === this.mouseDownXValue) {
        return;
      }

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
      (0, _functions.eventHandler)('window', 'mousemove', this.multiselectMove, 'unbind');
      (0, _functions.eventHandler)('window', 'mouseup', this.multiselectUp, 'unbind');

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
      var _this$props9 = this.props,
          _this$props9$X = _this$props9.X,
          X = _this$props9$X === void 0 ? {} : _this$props9$X,
          _this$props9$Y = _this$props9.Y,
          Y = _this$props9$Y === void 0 ? {} : _this$props9$Y;

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

      var d = this.details;
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
          labels = _this$props$axis$toUp.labels,
          editLabel = _this$props$axis$toUp.editLabel;
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
          padding: 0,
          zIndex: -1
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
            return editLabel ? editLabel(labels[value]) : labels[value];
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

      var color = '#eee';
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
        fillStyle: (_fillStyle = {}, _defineProperty(_fillStyle, axis === 'y' ? 'width' : 'height', '1px'), _defineProperty(_fillStyle, "background", color), _fillStyle)
      }];
      var style = {
        x: {
          width: '100%',
          height: '16px',
          padding: '0 12px',
          top: '2px',
          opacity: 1
        },
        y: {
          width: '16px',
          height: '100%',
          padding: '12px 0',
          right: '0px',
          opacity: 1
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
        ondrag: function ondrag(_ref4) {
          var points = _ref4.points;
          return _this4.changeFilter(points[0].value, points[1].value, axis);
        },
        style: {
          position: 'absolute',
          ...style[axis]
        },
        lineStyle: {
          display: 'none'
        },
        pointStyle: {
          width: '10px',
          height: '10px',
          borderRadius: '0px',
          background: '#fff',
          border: '2px solid ' + color
        },
        showValue: true
      });
    } // getFilterSlider(axis,xHeight,yWidth){  
    //   var {labels} = this.props[axis.toUpperCase()]; 
    //   var type = this.details.type[axis],{p1,p2,start,end} = this.details.range[axis].filter;
    //   var points = [{value:p1},{value:p2,fillStyle:{[axis === 'y'?'width':'height']:'100%',background:'#f5f5f5'}}]
    //   var style = {
    //     x:{width:'100%',height:'100%',padding:'0 12px',top:'2px',opacity:.7,background:''},
    //     y:{width:'100%',height:'100%',padding:'12px 0',right:'0px',opacity:.7,background:''}
    //   } 
    //   var pointStyle = {
    //     x:{width:'16px',height:xHeight + 'px',borderRadius:0,background:'none'},
    //     y:{width:yWidth + 'px',height:'16px',borderRadius:0,background:'none'}
    //   }
    //   return (
    //     <RSlider direction={axis === 'x'?'right':'top'} start={start} end={end} className='filterSlider'
    //       points={points}
    //       editValue={(point)=>type === 'string'?labels[point.value]:point.value} 
    //       ondrag={({points})=>this.changeFilter(points[0].value,points[1].value,axis)}
    //       style={{position:'absolute',...style[axis]}}
    //       lineStyle={{display:'none'}}
    //       pointStyle={pointStyle[axis]}
    //       showValue={true}
    //     />
    //   )
    // }

  }, {
    key: "getStreamIndexByLabel",
    value: function getStreamIndexByLabel(_ref5, label) {
      var stream = _ref5.stream;

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
      if (label === undefined) {
        return [];
      }

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
    key: "getNearestPointToMouse",
    value: function getNearestPointToMouse(vx, vy) {
      var data = this.props.data;
      var res = false;
      var dif = Infinity;

      for (var dataIndex = 0; dataIndex < data.length; dataIndex++) {
        var streamIndex = this.getStreamIndexByLabel(data[dataIndex], vx);

        if (streamIndex === false) {
          continue;
        }

        var stream = data[dataIndex].stream[streamIndex];
        var Dif = Math.abs(stream.y - vy);

        if (Dif <= dif) {
          res = {
            vx: stream.x,
            vy: stream.y,
            dataIndex: dataIndex,
            streamIndex: streamIndex
          };
          dif = Dif;
        }
      }

      return res;
    }
  }, {
    key: "getMouseDetail",
    value: function getMouseDetail(_ref6) {
      var _ref7 = _slicedToArray(_ref6, 4),
          x = _ref7[0],
          y = _ref7[1],
          px = _ref7[2],
          py = _ref7[3];

      var _this$props10 = this.props,
          add = _this$props10.add,
          Y = _this$props10.Y;
      var _Y$width = Y.width,
          yWidth = _Y$width === void 0 ? 50 : _Y$width;
      var vx = this.mouseDownDetail.target === 'point' ? this.mouseDownDetail.x : (0, _functions.getValueByPercent)(px, 'x', this.details);
      console.log(vx);
      var vy = (0, _functions.getValueByPercent)(-py, 'y', this.details);
      var popupPosition = {
        x: x + yWidth,
        y: y + this.details.height
      };
      var nearestPoint = this.getNearestPointToMouse(vx, vy);
      var addDataIndexes = add && this.mouseDownDetail.target !== 'point' ? this.getAddableDataIndexes(vx) : [];
      this.mouseDetail = {
        x: x,
        y: y,
        px: px,
        py: py,
        vx: vx,
        vy: vy,
        nearestPoint: nearestPoint,
        addDataIndexes: addDataIndexes,
        popupPosition: popupPosition
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$props11 = this.props,
          X = _this$props11.X,
          Y = _this$props11.Y,
          data = _this$props11.data,
          html = _this$props11.html,
          add = _this$props11.add,
          edit = _this$props11.edit,
          multiselect = _this$props11.multiselect,
          style = _this$props11.style,
          rtl = _this$props11.rtl;
      var popup = this.state.popup;
      var _X$height = X.height,
          xHeight = _X$height === void 0 ? 50 : _X$height;
      var _Y$width2 = Y.width,
          yWidth = _Y$width2 === void 0 ? 50 : _Y$width2;
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
          multiselect: multiselect,
          translate: this.translate.bind(this),
          rtl: rtl
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart",
        ref: this.dom,
        style: style
      }, this.getHeader(yWidth), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-container",
        style: this.getStyle(yWidth, xHeight)
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: 'r-chart-popup-container' + (add ? ' r-chart-add-popup' : '')
      }), popup !== false && this.getPopup(popup), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-axis r-chart-axis-y"
      }, yRange && this.getLabelSlider('y'), yRange && this.getFilterSlider('y', xHeight, yWidth)), /*#__PURE__*/_react.default.createElement("div", {
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
        events: {
          onMouseMove: function onMouseMove(e, pos) {
            _this5.getMouseDetail(pos);

            var _this5$mouseDetail = _this5.mouseDetail,
                x = _this5$mouseDetail.x,
                y = _this5$mouseDetail.y,
                px = _this5$mouseDetail.px,
                py = _this5$mouseDetail.py,
                vx = _this5$mouseDetail.vx,
                vy = _this5$mouseDetail.vy,
                nearestPoint = _this5$mouseDetail.nearestPoint,
                addDataIndexes = _this5$mouseDetail.addDataIndexes,
                popupPosition = _this5$mouseDetail.popupPosition;
            var addIndicator = '';
            var container = (0, _jquery.default)(_this5.dom.current).find('.r-chart-popup-container');

            if (addDataIndexes.length) {
              addIndicator = addDataIndexes.length ? "<div class=\"add-indicator\" style=\"background:".concat(data[addDataIndexes[0]].color, "\">+</div>") : '';
              container.css({
                left: popupPosition.x,
                top: popupPosition.y
              });
              container.html('<div class="r-chart-popup">' + addIndicator + vx + '  ' + vy + '</div>');
            } else {
              if (nearestPoint) {
                var left = (0, _functions.getPercentByValue)(nearestPoint.vx, 'x', _this5.details) * d.width / 100 + yWidth;
                var bottom = (0, _functions.getPercentByValue)(nearestPoint.vy, 'y', _this5.details) * d.height / 100 + xHeight;
                container.css({
                  left: left,
                  top: 'unset',
                  bottom: bottom
                });
                container.html('<div class="r-chart-popup">' + nearestPoint.vx + '  ' + nearestPoint.vy + '</div>');
              } else {//$('.r-chart-popup-container').html('');
              }
            }
          },
          onMouseDown: this.mouseDown.bind(this)
        }
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-corner"
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-axis r-chart-axis-x"
      }, xRange && this.getLabelSlider('x'), xRange && this.getFilterSlider('x', xHeight, yWidth)))));
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
  },
  globalization: 'en',
  precision: 0,
  clickRadius: 12
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

      var _this$props12 = this.props,
          points = _this$props12.points,
          type = _this$props12.type,
          title = _this$props12.title,
          _onChange = _this$props12.onChange,
          onClose = _this$props12.onClose,
          onAdd = _this$props12.onAdd,
          onEdit = _this$props12.onEdit,
          onRemove = _this$props12.onRemove,
          dataIndex = _this$props12.dataIndex,
          streamIndex = _this$props12.streamIndex,
          dynamicValue = _this$props12.dynamicValue,
          staticValue = _this$props12.staticValue,
          _this$props12$dataInd = _this$props12.dataIndexes,
          dataIndexes = _this$props12$dataInd === void 0 ? [] : _this$props12$dataInd;
      var _this$context = this.context,
          data = _this$context.data,
          X = _this$context.X,
          Y = _this$context.Y,
          _this$context$multise = _this$context.multiselect,
          multiselect = _this$context$multise === void 0 ? {} : _this$context$multise,
          translate = _this$context.translate,
          rtl = _this$context.rtl;
      var _multiselect$items = multiselect.items,
          items = _multiselect$items === void 0 ? [] : _multiselect$items,
          _multiselect$actions = multiselect.actions,
          actions = _multiselect$actions === void 0 ? [] : _multiselect$actions;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit",
        ref: this.dom,
        style: {
          direction: rtl ? 'rtl' : 'ltr'
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-backdrop",
        onClick: onClose
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
        if (data[index].editable === false) {
          return false;
        }

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
      }).filter(function (d) {
        return d !== false;
      })), staticValue !== undefined && /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-item"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-label"
      }, (X.title || 'X untitle') + ' : '), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-detail-value"
      }, staticValue)), dynamicValue !== undefined && /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-item"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-label"
      }, (Y.title || 'Y untitle') + ' : '), /*#__PURE__*/_react.default.createElement("input", {
        className: "r-chart-edit-tag",
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
          className: "r-chart-edit-item"
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "r-chart-edit-label"
        }, item.title), item.type === 'number' && /*#__PURE__*/_react.default.createElement("input", {
          className: "r-chart-edit-tag",
          type: "number",
          value: item.value,
          onChange: item.onChange
        }), item.type === 'select' && /*#__PURE__*/_react.default.createElement("select", {
          className: "r-chart-edit-tag",
          title: item.value,
          onChange: item.onChange,
          defaultValue: item.value
        }, item.options.map(function (o, i) {
          return /*#__PURE__*/_react.default.createElement("option", {
            key: i,
            value: o.value
          }, o.text);
        })), item.type === 'checkbox' && /*#__PURE__*/_react.default.createElement("input", {
          type: "checkbox",
          value: item.value,
          onChange: item.onChange
        }));
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-footer"
      }, type === 'multiselect' && actions.filter(function (a) {
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
      }, translate('Add')), onRemove && /*#__PURE__*/_react.default.createElement("button", {
        className: "r-chart-edit-button",
        onClick: function onClick() {
          onRemove({
            dataIndex: dataIndex,
            streamIndex: streamIndex
          });
          onClose();
        }
      }, translate('Remove')), onEdit && /*#__PURE__*/_react.default.createElement("button", {
        className: "r-chart-edit-button",
        onClick: function onClick() {
          onEdit({
            dataIndex: dataIndex,
            streamIndex: streamIndex,
            value: dynamicValue
          });
          onClose();
        }
      }, translate('Edit'))));
    }
  }]);

  return RChartEdit;
}(_react.Component);

_defineProperty(RChartEdit, "contextType", RChartContext);
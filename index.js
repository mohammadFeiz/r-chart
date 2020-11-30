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
      min: Infinity,
      max: -Infinity,
      editLabel: {},
      getFilter: {},
      changeFilter: {},
      getPercentByValue: {},
      getFilterSlider: {},
      getGridLines: {},
      getLines: {}
    };
    (0, _jquery.default)('body').on('mouseout', '.r-chart-canvas', function () {
      (0, _jquery.default)('.r-chart-popup-container').html('');
    });

    if ('ontouchstart' in document.documentElement) {
      (0, _functions.eventHandler)('window', 'mouseup', function () {
        (0, _jquery.default)('.r-chart-popup-container').html('');
      });
    }

    _this.translate = _functions.translate;
    _this.getLimitTypeNumber = _functions.getLimitTypeNumber;
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
    key: "getKey",
    value: function getKey(point) {
      var keyAxis = this.props.keyAxis;
      var field = keyAxis.field;
      return point[field];
    }
  }, {
    key: "getValue",
    value: function getValue(point) {
      var valueAxis = this.props.valueAxis;
      var field = valueAxis.field;
      return point[field];
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
    value: function getLineChart(data, dataIndex) {
      var points = data.points,
          _data$color = data.color,
          color = _data$color === void 0 ? '#000' : _data$color,
          _data$lineWidth = data.lineWidth,
          lineWidth = _data$lineWidth === void 0 ? 2 : _data$lineWidth,
          areaOpacity = data.areaOpacity,
          dash = data.dash,
          pointStyle = data.pointStyle,
          text = data.text;
      var dataDetail = { ...data,
        dataIndex: dataIndex,
        points: [],
        line: {
          points: [],
          lineWidth: lineWidth,
          stroke: color,
          dash: dash
        },
        area: false,
        texts: []
      };

      for (var pointIndex = 0; pointIndex < points.length; pointIndex++) {
        var point = points[pointIndex];
        var key = this.getKey(point),
            value = this.getValue(point);

        if (key === null || value === null) {
          continue;
        }

        var px = this.details.getPercentByValue.x(key, value, point);
        var py = this.details.getPercentByValue.y(key, value, point);

        if (px === false || py === false) {
          continue;
        }

        this.keyDictionary[dataIndex][key] = pointIndex;

        if (pointStyle) {
          var PointStyle = typeof pointStyle === 'function' ? pointStyle(point, {
            dataIndex: dataIndex,
            pointIndex: pointIndex
          }) : pointStyle;
          var radius = PointStyle.radius,
              _PointStyle$fill = PointStyle.fill,
              fill = _PointStyle$fill === void 0 ? '#fff' : _PointStyle$fill,
              _PointStyle$stroke = PointStyle.stroke,
              stroke = _PointStyle$stroke === void 0 ? color : _PointStyle$stroke,
              _PointStyle$lineWidth = PointStyle.lineWidth,
              pointLineWidth = _PointStyle$lineWidth === void 0 ? lineWidth : _PointStyle$lineWidth,
              pointDash = PointStyle.dash,
              slice = PointStyle.slice;
          var Point = {
            x: px + '%',
            y: py + '%',
            items: [{
              r: this.props.clickRadius,
              fill: 'rgba(0,0,0,0)',
              onMouseDown: this.pointMouseDown.bind(this),
              dataIndex: dataIndex,
              pointIndex: pointIndex
            }, {
              r: radius,
              lineWidth: pointLineWidth * 2,
              fill: fill,
              stroke: stroke,
              dash: pointDash,
              slice: slice
            }]
          };
          this.elements.points.push(Point);
          dataDetail.points.push(Point);
        }

        if (text) {
          var _text = text(point, {
            dataIndex: dataIndex,
            pointIndex: pointIndex
          }),
              _text$value = _text.value,
              _value = _text$value === void 0 ? '' : _text$value,
              _text$fontSize = _text.fontSize,
              fontSize = _text$fontSize === void 0 ? 16 : _text$fontSize,
              _text$color = _text.color,
              _color = _text$color === void 0 ? '#444' : _text$color,
              _text$x = _text.x,
              x = _text$x === void 0 ? 0 : _text$x,
              _text$y = _text.y,
              y = _text$y === void 0 ? 0 : _text$y,
              rotate = _text.rotate,
              align = _text.align;

          var Text = {
            x: px + '%',
            y: py + '%',
            rotate: rotate,
            items: [{
              text: _value,
              fontSize: fontSize,
              fill: _color,
              x: x,
              y: y,
              align: align
            }]
          };
          this.elements.texts.push(Text);
          dataDetail.texts.push(Text);
        }

        dataDetail.line.points.push([px + '%', py + '%']);
      }

      if (lineWidth) {
        this.elements.lines.push(dataDetail.line);
      }

      if (areaOpacity) {
        dataDetail.area = this.details.getArea(dataDetail.line.points, color, areaOpacity);
        this.elements.areas.push(dataDetail.area);
      }

      this.dataDetails.push(dataDetail);
    }
  }, {
    key: "getBarChart",
    value: function getBarChart(data, barCounter, dataIndex) {
      var color = data.color,
          points = data.points,
          text = data.text;
      var dataDetail = { ...data,
        dataIndex: dataIndex,
        rects: [],
        texts: []
      };
      var _this$details = this.details,
          keyAxis = _this$details.keyAxis,
          barCount = _this$details.barCount,
          barWidth = _this$details.barWidth,
          getPercentByValue = _this$details.getPercentByValue;

      for (var pointIndex = 0; pointIndex < points.length; pointIndex++) {
        var point = points[pointIndex];
        var key = this.getKey(point),
            value = this.getValue(point);

        if (key === null || value === null) {
          continue;
        }

        var px = getPercentByValue.x(key, value, point) + '%';
        var py = getPercentByValue.y(key, value, point) + '%';

        if (px === false || py === false) {
          continue;
        }

        this.keyDictionary[dataIndex][key] = pointIndex;

        if (keyAxis === 'x') {
          var rect = {
            width: barWidth + '%',
            height: py,
            x: px,
            fill: color,
            pivot: [barWidth * (barCount / 2 - barCounter) + '%', 0],
            onMouseDown: this.pointMouseDown.bind(this),
            dataIndex: dataIndex,
            pointIndex: pointIndex
          };
          this.elements.rects.push(rect);
          dataDetail.rects.push(rect);
        } else {
          var _rect = {
            width: px,
            height: barWidth + '%',
            y: py,
            fill: color,
            pivot: [0, barWidth * (barCount / 2 - barCounter) + '%'],
            onMouseDown: this.pointMouseDown.bind(this),
            dataIndex: dataIndex,
            pointIndex: pointIndex
          };
          this.elements.rects.push(_rect);
          dataDetail.rects.push(_rect);
        }

        if (text) {
          var _text2 = text(point, {
            dataIndex: dataIndex,
            pointIndex: pointIndex
          }),
              _text2$value = _text2.value,
              _value2 = _text2$value === void 0 ? '' : _text2$value,
              _text2$fontSize = _text2.fontSize,
              fontSize = _text2$fontSize === void 0 ? 16 : _text2$fontSize,
              _text2$color = _text2.color,
              _color2 = _text2$color === void 0 ? '#444' : _text2$color,
              _text2$x = _text2.x,
              x = _text2$x === void 0 ? 0 : _text2$x,
              _text2$y = _text2.y,
              y = _text2$y === void 0 ? 0 : _text2$y,
              rotate = _text2.rotate,
              align = _text2.align;

          var Text = {
            x: px + '%',
            y: py + '%',
            rotate: rotate,
            items: [{
              text: _value2,
              fontSize: fontSize,
              fill: _color2,
              x: x,
              y: y,
              align: align
            }]
          };
          this.elements.texts.push(Text);
          dataDetail.texts.push(Text);
        }
      }

      this.dataDetails.push(dataDetail);
    }
  }, {
    key: "getGridLine",
    value: function getGridLine(value, axis, _ref) {
      var _ref$color = _ref.color,
          color = _ref$color === void 0 ? 'red' : _ref$color,
          _ref$lineWidth = _ref.lineWidth,
          lineWidth = _ref$lineWidth === void 0 ? 0.7 : _ref$lineWidth,
          dash = _ref.dash;
      var range = this.details.range[axis];

      if (!range) {
        return {};
      }

      var keyAxis = this.props.keyAxis;
      value = typeof value === 'string' ? keyAxis.list.indexOf(value) : value;
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
    value: function getGridLines(axis, color) {
      var range = this.details.range[axis];

      if (!range) {
        return [];
      }

      var start = range.start,
          step = range.step,
          end = range.end;
      var value = Math.round((start - step) / step) * step,
          gridLines = [];

      while (value <= end) {
        if (value >= start) {
          gridLines.push(this.getGridLine(value, axis, {
            color: color
          }));
        }

        value += step;
      }

      return gridLines;
    }
  }, {
    key: "getLines",
    value: function getLines(axis, lines) {
      var Lines = (typeof lines === 'function' ? lines() : lines) || [];
      var indicators = [];

      for (var i = 0; i < Lines.length; i++) {
        var _Lines$i = Lines[i],
            value = _Lines$i.value,
            dash = _Lines$i.dash,
            lineWidth = _Lines$i.lineWidth,
            color = _Lines$i.color;
        indicators.push(this.getGridLine(value, axis, {
          dash: dash,
          lineWidth: lineWidth,
          color: color
        }));
      }

      return indicators;
    }
  }, {
    key: "getElements",
    value: function getElements() {
      var data = this.props.data;
      this.keyDictionary = data.map(function () {
        return {};
      });
      var preventData = this.state.preventData;
      var _this$details2 = this.details,
          getGridLines = _this$details2.getGridLines,
          getLines = _this$details2.getLines;
      this.elements = {
        xGridLines: getGridLines.x(),
        yGridLines: getGridLines.y(),
        areas: [],
        rects: [],
        lines: [],
        points: [],
        xIndicators: getLines.x(),
        yIndicators: getLines.y(),
        texts: [],
        shapes: []
      };
      var barCounter = 0;
      this.dataDetails = [];

      for (var dataIndex = 0; dataIndex < data.length; dataIndex++) {
        var _data$dataIndex = data[dataIndex],
            title = _data$dataIndex.title,
            _data$dataIndex$type = _data$dataIndex.type,
            type = _data$dataIndex$type === void 0 ? 'line' : _data$dataIndex$type,
            _data$dataIndex$shape = _data$dataIndex.shapes,
            shapes = _data$dataIndex$shape === void 0 ? function () {
          return [];
        } : _data$dataIndex$shape;

        if (preventData[title]) {
          continue;
        }

        if (type === 'line') {
          this.getLineChart(data[dataIndex], dataIndex);
        } else if (type === 'bar') {
          this.getBarChart(data[dataIndex], barCounter, dataIndex);
          barCounter++;
        }

        this.elements.shapes = (0, _functions.getShapes)(shapes(), this.details);
      }

      var elements = [];

      for (var prop in this.elements) {
        elements = elements.concat(this.elements[prop]);
      }

      return elements;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.SetState({});
    }
  }, {
    key: "getDetails",
    value: function getDetails() {
      var _this2 = this;

      var _this$props2 = this.props,
          keyAxis = _this$props2.keyAxis,
          valueAxis = _this$props2.valueAxis,
          X = _this$props2.X,
          Y = _this$props2.Y,
          data = _this$props2.data,
          _this$props2$barWidth = _this$props2.barWidth,
          barWidth = _this$props2$barWidth === void 0 ? 80 : _this$props2$barWidth,
          precision = _this$props2.precision,
          reverse = _this$props2.reverse,
          labels = _this$props2.labels,
          editValue = _this$props2.editValue,
          d = this.details;

      if (!d.keyAxis) {
        d.getKey = this.getKey.bind(this);
        d.getValue = this.getValue.bind(this);
        d.Axis = {
          x: X,
          y: Y
        };
        d.KeyAxis = keyAxis;
        var editLabelKey = keyAxis.editLabel ? function (value) {
          if (value < 0 || value >= keyAxis.list.length) {
            return '';
          }

          return keyAxis.editLabel(keyAxis.list[value]);
        } : function (value) {
          return value;
        };
        var editLabelValue = valueAxis.editLabel ? function (value) {
          return valueAxis.editLabel(value);
        } : function (value) {
          return value;
        };

        if (!reverse) {
          d.getFilter.x = function () {
            return _this2.state.filter.key;
          };

          d.getFilter.y = function () {
            return _this2.state.filter.value;
          };

          d.keyAxis = 'x';
          d.valueAxis = 'y';
          d.editLabel.x = editLabelKey;
          d.editLabel.y = editLabelValue;

          d.getRange = function () {
            return {
              x: (0, _functions.string_getRange)('x', _this2.details),
              y: (0, _functions.number_getRange)('y', _this2.details)
            };
          };

          d.getPercentByValue.x = function (key, value) {
            var point = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            point._keyIndex = keyAxis.list.indexOf(key);

            if (point._keyIndex === -1) {
              return false;
            }

            return (0, _functions.string_getPercentByValue)(point._keyIndex, 'x', _this2.details);
          };

          d.getPercentByValue.y = function (key, value, point) {
            return -(0, _functions.number_getPercentByValue)(value, 'y', _this2.details);
          };

          d.getValueByPercent = function (px, py) {
            return {
              key: (0, _functions.string_getValueByPercent)(px, 'x', _this2.details),
              value: (0, _functions.number_getValueByPercent)(py, 'y', _this2.details)
            };
          };

          d.getArea = function (points, fill, opacity) {
            var area = {
              points: points.slice(),
              fill: fill,
              opacity: opacity
            };
            area.points.splice(0, 0, [points[0][0], 0]);
            area.points.push([points[points.length - 1][0], 0]);
            return area;
          };

          d.getFilterSlider.x = keyAxis.zoom ? function () {
            return _this2.getFilterSlider('x');
          } : function () {
            return null;
          };
          d.getFilterSlider.y = valueAxis.zoom ? function () {
            return _this2.getFilterSlider('y');
          } : function () {
            return null;
          };
          d.getGridLines.x = keyAxis.gridColor ? function () {
            return _this2.getGridLines('x', keyAxis.gridColor);
          } : function () {
            return [];
          };
          d.getGridLines.y = valueAxis.gridColor ? function () {
            return _this2.getGridLines('y', valueAxis.gridColor);
          } : function () {
            return [];
          };

          d.getLines.x = function () {
            return _this2.getLines('x', keyAxis.lines);
          };

          d.getLines.y = function () {
            return _this2.getLines('y', valueAxis.lines);
          };

          d.changeFilter.x = function (p1, p2) {
            var filter = _this2.state.filter;
            var list = keyAxis.list;
            filter.key = [list[p1], list[p2]];

            _this2.SetState({
              filter: filter
            });
          };

          d.changeFilter.y = function (p1, p2) {
            var filter = _this2.state.filter;
            filter.value = [p1, p2];

            _this2.SetState({
              filter: filter
            });
          };
        } else {
          d.getFilter.x = function () {
            return _this2.state.filter.value;
          };

          d.getFilter.y = function () {
            return _this2.state.filter.key;
          };

          d.keyAxis = 'y';
          d.valueAxis = 'x';
          d.editLabel.x = editLabelValue;
          d.editLabel.y = editLabelKey;

          d.getRange = function () {
            return {
              x: (0, _functions.number_getRange)('x', _this2.details),
              y: (0, _functions.string_getRange)('y', _this2.details)
            };
          };

          d.getPercentByValue.x = function (key, value, point) {
            return (0, _functions.number_getPercentByValue)(value, 'x', _this2.details);
          };

          d.getPercentByValue.y = function (key, value) {
            var point = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            point._keyIndex = keyAxis.list.indexOf(key);

            if (point._keyIndex === -1) {
              return false;
            }

            return -(0, _functions.string_getPercentByValue)(point._keyIndex, 'y', _this2.details);
          };

          d.getValueByPercent = function (px, py) {
            return {
              key: (0, _functions.string_getValueByPercent)(py, 'y', _this2.details),
              value: (0, _functions.number_getValueByPercent)(px, 'x', _this2.details)
            };
          };

          d.getArea = function (points, fill, opacity) {
            var area = {
              points: points.slice(),
              fill: fill,
              opacity: opacity
            };
            area.points.splice(0, 0, [0, points[0][1]]);
            area.points.push([0, points[points.length - 1][1]]);
            return area;
          };

          d.getFilterSlider.x = valueAxis.zoom ? function () {
            return _this2.getFilterSlider('x');
          } : function () {
            return null;
          };
          d.getFilterSlider.y = keyAxis.zoom ? function () {
            return _this2.getFilterSlider('y');
          } : function () {
            return null;
          };
          d.getGridLines.x = valueAxis.gridColor ? function () {
            return _this2.getGridLines('x', valueAxis.gridColor);
          } : function () {
            return [];
          };
          d.getGridLines.y = keyAxis.gridColor ? function () {
            return _this2.getGridLines('y', keyAxis.gridColor);
          } : function () {
            return [];
          };

          d.getLines.x = function () {
            return _this2.getLines('x', valueAxis.lines);
          };

          d.getLines.y = function () {
            return _this2.getLines('y', keyAxis.lines);
          };

          d.changeFilter.x = function (p1, p2) {
            var filter = _this2.state.filter;
            filter.value = [p1, p2];

            _this2.SetState({
              filter: filter
            });
          };

          d.changeFilter.y = function (p1, p2) {
            var filter = _this2.state.filter;
            var list = keyAxis.list;
            filter.key = [list[p1], list[p2]];

            _this2.SetState({
              filter: filter
            });
          };
        }
      } //نوع چارت و تابع گرفتن درصد با مقدار یکبار تایین می شود


      d.precision = precision;

      if (this.mouseDownDetail.target !== 'point') {
        var limit = this.getLimitTypeNumber(data);
        this.details.min = limit.min;
        this.details.max = limit.max;
        this.details.range = d.getRange();
      }

      d.barCount = data.filter(function (d) {
        return d.type === 'bar';
      }).length;
      d.barWidth = barWidth / d.range[d.keyAxis].count / d.barCount;
    }
  }, {
    key: "pointMouseDown",
    value: function pointMouseDown(e, pos, obj) {
      var dataIndex = obj.dataIndex,
          pointIndex = obj.pointIndex;
      var _this$props3 = this.props,
          data = _this$props3.data,
          edit = _this$props3.edit,
          remove = _this$props3.remove;

      if (data[dataIndex].editable === false) {
        return;
      }

      if (!edit && !remove) {
        return;
      }

      this.getMouseDetail(pos);
      var point = data[dataIndex].points[pointIndex];
      this.mouseDownDetail = {
        target: 'point',
        key: this.getKey(point),
        value: this.getValue(point)
      };
      (0, _functions.eventHandler)('window', 'mousemove', _jquery.default.proxy(this.pointMouseMove, this));
      (0, _functions.eventHandler)('window', 'mouseup', _jquery.default.proxy(this.pointMouseUp, this));
      this.so = {
        dataIndex: dataIndex,
        pointIndex: pointIndex,
        x: this.mouseDetail.x,
        y: this.mouseDetail.y
      };
      this.moved = false;
    }
  }, {
    key: "pointMouseMove",
    value: function pointMouseMove() {
      var _this$props4 = this.props,
          data = _this$props4.data,
          edit = _this$props4.edit,
          valueAxis = _this$props4.valueAxis,
          point = data[this.so.dataIndex].points[this.so.pointIndex];

      if (!this.moved) {
        //if(Math.abs(this.mouseDetail.y - this.so.y) < 8){return;}
        if (this.getValue(point) === this.mouseDetail.value) {
          return;
        }
      }

      this.moved = true;

      if (!edit) {
        return;
      }

      var newPoint = { ...point
      };
      console.log(this.mouseDetail.key, this.mouseDetail.value);
      newPoint[valueAxis.field] = this.mouseDetail.value;
      edit(newPoint, {
        dataIndex: this.so.dataIndex,
        pointIndex: this.so.pointIndex
      });
    }
  }, {
    key: "pointMouseUp",
    value: function pointMouseUp() {
      (0, _functions.eventHandler)('window', 'mousemove', this.pointMouseMove, 'unbind');
      (0, _functions.eventHandler)('window', 'mouseup', this.pointMouseUp, 'unbind');
      this.mouseDownDetail = {};
      var _this$props5 = this.props,
          data = _this$props5.data,
          edit = _this$props5.edit,
          remove = _this$props5.remove,
          onDragEnd = _this$props5.onDragEnd,
          valueAxis = _this$props5.valueAxis;
      var point = data[this.so.dataIndex].points[this.so.pointIndex];

      if (!this.moved) {
        var title = !edit ? this.translate('Remove.Point') : this.translate('Edit.Point');
        this.SetState({
          popup: {
            dataIndex: this.so.dataIndex,
            pointIndex: this.so.pointIndex,
            dataIndexes: [this.so.dataIndex],
            dynamicValue: this.getValue(point),
            staticValue: this.mouseDetail.key,
            onEdit: edit,
            onRemove: remove,
            title: title
          }
        });
        return;
      }

      var newPoint = { ...point
      };
      newPoint[valueAxis.field] = this.mouseDetail.value;

      if (onDragEnd) {
        var changes = {
          dataIndex: this.so.dataIndex,
          pointIndex: this.so.pointIndex
        };
        onDragEnd(newPoint, changes);
      } else if (edit) {
        var changes = {
          dataIndex: this.so.dataIndex,
          pointIndex: this.so.pointIndex
        };
        edit(newPoint, changes);
      }
    } //کلیک روی بک گراند چارت

  }, {
    key: "mouseDown",
    value: function mouseDown(a, b) {
      if ('ontouchstart' in document.documentElement) {
        (0, _functions.eventHandler)('window', 'mouseup', _jquery.default.proxy(this.addMouseUp, this));
        this.getMouseDetail(b);
        return;
      }

      var _this$props6 = this.props,
          add = _this$props6.add,
          multiselect = _this$props6.multiselect,
          addPopup = _this$props6.addPopup; // اگر مد افزودن فعال بود و در موقعیت فعلی موس دیتا یا دیتا هایی آمادگی دریافت نقطه جدید در این موقعیت را داشتند

      this.mouseDownKey = this.mouseDetail.key;

      if (add && this.mouseDetail.addDataIndexes.length) {
        (0, _functions.eventHandler)('window', 'mouseup', _jquery.default.proxy(this.addMouseUp, this));
      }

      var reverse = this.props.reverse;

      if (multiselect && this.mouseDetail.target !== 'point') {
        this.multiselect = {};
        this.multiselect.selectRect = (0, _jquery.default)(this.dom.current).find('.r-chart-multiselect');

        if (reverse) {
          this.multiselect.selectRect.css({
            display: 'block',
            top: this.mouseDetail.py + '%',
            height: '0%',
            width: '100%',
            left: 0
          });
          this.multiselect.position = this.mouseDetail.py;
        } else {
          this.multiselect.selectRect.css({
            display: 'block',
            left: this.mouseDetail.px + '%',
            width: '0%',
            height: '100%',
            top: 0
          });
          this.multiselect.position = this.mouseDetail.px;
        }

        (0, _functions.eventHandler)('window', 'mousemove', _jquery.default.proxy(this.multiselectMove, this));
        (0, _functions.eventHandler)('window', 'mouseup', _jquery.default.proxy(this.multiselectUp, this));
      }
    }
  }, {
    key: "addMouseUp",
    value: function addMouseUp() {
      var _this$props7 = this.props,
          add = _this$props7.add,
          addPopup = _this$props7.addPopup;
      (0, _functions.eventHandler)('window', 'mouseup', this.addMouseUp, 'unbind');

      if ('ontouchstart' in document.documentElement) {
        if (this.mouseDetail.addDataIndexes.length === 0) {
          return;
        }
      } else {
        if (this.mouseDetail.key !== this.mouseDownKey) {
          return;
        }
      }

      if (addPopup === false) {
        add(this.mouseDetail);
      } else {
        this.SetState({
          popup: {
            type: 'add',
            dataIndexes: this.mouseDetail.addDataIndexes,
            dataIndex: this.mouseDetail.addDataIndexes[0],
            dynamicValue: this.mouseDetail.value,
            staticValue: this.mouseDetail.key,
            onAdd: add,
            title: this.translate('Add.Point')
          }
        });
      }
    }
  }, {
    key: "multiselectMove",
    value: function multiselectMove() {
      var reverse = this.props.reverse;
      var m = this.multiselect;

      if (this.mouseDetail.key === this.mouseDownKey) {
        return;
      }

      if (!reverse) {
        var mp = this.mouseDetail.px;

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
      } else {
        var mp = this.mouseDetail.py;

        if (mp < m.position) {
          m.end = m.position;
          m.start = mp;
        } else {
          m.start = m.position;
          m.end = mp;
        }

        var obj = {
          height: m.end - m.start + '%',
          top: m.start + 100 + '%'
        };
        m.selectRect.css(obj);
      }
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

      for (var i = 0; i < this.dataDetails.length; i++) {
        var _this$dataDetails$i = this.dataDetails[i],
            dataIndex = _this$dataDetails$i.dataIndex,
            title = _this$dataDetails$i.title,
            points = _this$dataDetails$i.points,
            editable = _this$dataDetails$i.editable;

        if (editable === false) {
          continue;
        }

        if (preventData[title]) {
          continue;
        }

        for (var pointIndex = 0; pointIndex < points.length; pointIndex++) {
          var point = points[pointIndex];
          var percent = parseFloat(point[this.details.keyAxis]);

          if (percent < start || percent > end) {
            continue;
          }

          result.push([dataIndex, pointIndex]);
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
    key: "getPopup",
    value: function getPopup(popup) {
      var _this3 = this;

      return /*#__PURE__*/_react.default.createElement(RChartEdit, _extends({}, popup, {
        onChange: function onChange(obj) {
          for (var prop in obj) {
            popup[prop] = obj[prop];
          }

          _this3.SetState({
            popup: popup
          });
        },
        onClose: this.closePopup.bind(this)
      }));
    }
  }, {
    key: "getHeader",
    value: function getHeader(yWidth) {
      var _this4 = this;

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

            _this4.SetState({
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
      var _this5 = this;

      if (!this.details.range || !this.details.range[axis]) {
        return null;
      }

      var _this$details$range$a = this.details.range[axis],
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
      var _this$props$axis$toUp = this.props[axis.toUpperCase()].rotate,
          rotate = _this$props$axis$toUp === void 0 ? 0 : _this$props$axis$toUp;
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
          edit: function edit(value) {
            return _this5.details.editLabel[axis](value);
          },
          style: {
            fontSize: 'inherit',
            ...labelStyle[axis]
          }
        }
      });
    }
  }, {
    key: "filterMouseDown",
    value: function filterMouseDown(e) {
      e.preventDefault();
      var container = (0, _jquery.default)(this.dom.current);
      var filterButtons = container.find('.r-chart-filterSlider-button');
      filterButtons.addClass('active');
      (0, _functions.eventHandler)('window', 'mouseup', _jquery.default.proxy(this.filterMouseUp, this));
    }
  }, {
    key: "filterMouseUp",
    value: function filterMouseUp() {
      var container = (0, _jquery.default)(this.dom.current);
      var filterButtons = container.find('.r-chart-filterSlider-button');
      filterButtons.removeClass('active');
      (0, _functions.eventHandler)('window', 'mouseup', this.filterMouseUp, 'unbind');
    }
  }, {
    key: "getFilterSlider",
    value: function getFilterSlider(axis) {
      var _fillStyle,
          _this6 = this;

      var _this$details3 = this.details,
          range = _this$details3.range,
          changeFilter = _this$details3.changeFilter;

      if (!range || !range[axis]) {
        return null;
      }

      var color = '#eee';
      var _range$axis$filter = range[axis].filter,
          p1 = _range$axis$filter.p1,
          p2 = _range$axis$filter.p2,
          start = _range$axis$filter.start,
          end = _range$axis$filter.end;

      var html = /*#__PURE__*/_react.default.createElement("div", {
        className: 'r-chart-filterSlider-button r-chart-filterSlider-button-' + axis,
        onTouchStart: this.filterMouseDown.bind(this),
        onMouseDown: this.filterMouseDown.bind(this)
      });

      var points = [{
        value: p1,
        html: html
      }, {
        value: p2,
        html: html,
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
          return _this6.details.editLabel[axis](point.value);
        },
        ondrag: function ondrag(_ref2) {
          var points = _ref2.points;
          return changeFilter[axis](points[0].value, points[1].value);
        },
        style: {
          position: 'absolute',
          ...style[axis]
        },
        lineStyle: {
          display: 'none'
        },
        pointStyle: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '30px',
          height: '30px',
          borderRadius: '0px',
          background: 'none'
        },
        showValue: true
      });
    }
  }, {
    key: "getAddableDataIndexes",
    value: function getAddableDataIndexes(key) {
      if (key === undefined) {
        return [];
      }

      var data = this.props.data;
      var indexes = [];

      for (var i = 0; i < data.length; i++) {
        var editable = data[i].editable;

        if (editable === false) {
          continue;
        }

        if (this.keyDictionary[i][key] === undefined) {
          indexes.push(i);
        }
      }

      return indexes;
    }
  }, {
    key: "getNearestPointToMouse",
    value: function getNearestPointToMouse(obj) {
      var data = this.props.data;
      var res = false;
      var dif = Infinity;

      for (var dataIndex = 0; dataIndex < data.length; dataIndex++) {
        var pointIndex = this.keyDictionary[dataIndex][obj.key];

        if (pointIndex === undefined) {
          continue;
        }

        var point = data[dataIndex].points[pointIndex];
        var key = this.getKey(point),
            value = this.getValue(point);
        var Dif = Math.abs(value - obj.value);

        if (Dif <= dif) {
          res = {
            key: key,
            value: value,
            dataIndex: dataIndex,
            pointIndex: pointIndex
          };
          dif = Dif;
        }
      }

      return res;
    }
  }, {
    key: "getMouseDetail",
    value: function getMouseDetail(a) {
      if (!a) {
        return;
      }

      var d = this.details;

      var _a = _slicedToArray(a, 4),
          x = _a[0],
          y = _a[1],
          px = _a[2],
          py = _a[3];

      var _this$props8 = this.props,
          add = _this$props8.add,
          Y = _this$props8.Y;
      var _Y$width = Y.width,
          yWidth = _Y$width === void 0 ? 50 : _Y$width;
      var obj = d.getValueByPercent(px, -py);

      if (this.mouseDownDetail.target === 'point') {
        obj.key = this.mouseDownDetail.key;
      }

      var popupPosition = {
        x: x + yWidth,
        y: y + this.details.canvasSize.y
      };
      var nearestPoint = this.getNearestPointToMouse(obj);
      var addDataIndexes = add && this.mouseDownDetail.target !== 'point' ? this.getAddableDataIndexes(obj.key) : [];
      this.mouseDetail = {
        x: x,
        y: y,
        px: px,
        py: py,
        key: obj.key,
        value: obj.value,
        nearestPoint: nearestPoint,
        addDataIndexes: addDataIndexes,
        popupPosition: popupPosition
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var xls = '',
          yls = '',
          xfs = '',
          yfs = '',
          items = '',
          HTML = '';
      var _this$props9 = this.props,
          X = _this$props9.X,
          Y = _this$props9.Y,
          data = _this$props9.data,
          _this$props9$html = _this$props9.html,
          html = _this$props9$html === void 0 ? function () {
        return '';
      } : _this$props9$html,
          add = _this$props9.add,
          style = _this$props9.style;
      var popup = this.state.popup;
      var _X$height = X.height,
          xHeight = _X$height === void 0 ? 50 : _X$height;
      var _Y$width2 = Y.width,
          yWidth = _Y$width2 === void 0 ? 50 : _Y$width2;

      if (this.details.canvasSize && data.length) {
        this.getDetails();
        var d = this.details;
        items = this.getElements();
        yls = this.getLabelSlider('y');
        yfs = d.getFilterSlider.y('y');
        xls = this.getLabelSlider('x');
        xfs = d.getFilterSlider.x('x');
        HTML = html(this.elements, d);
      }

      return /*#__PURE__*/_react.default.createElement(RChartContext.Provider, {
        value: { ...this.props,
          translate: this.translate.bind(this),
          keyDictionary: this.keyDictionary
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart",
        ref: this.dom,
        style: style
      }, this.getHeader(yWidth), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-container",
        style: this.getStyle(yWidth, xHeight)
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: 'r-chart-popup-container r-chart-detail-popup'
      }), add && /*#__PURE__*/_react.default.createElement("div", {
        className: 'r-chart-popup-container r-chart-add-popup'
      }), popup !== false && this.getPopup(popup), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-axis r-chart-axis-y"
      }, yls, " ", yfs), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-canvas"
      }, HTML, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-multiselect"
      }), /*#__PURE__*/_react.default.createElement(_rCanvas.default, {
        getSize: function getSize(width, height) {
          _this7.details.canvasSize = {
            x: width,
            y: height
          };
        },
        axisPosition: ['0%', '100%'],
        items: items,
        events: {
          onMouseMove: function onMouseMove(e, pos) {
            _this7.getMouseDetail(pos);

            var _this7$mouseDetail = _this7.mouseDetail,
                key = _this7$mouseDetail.key,
                value = _this7$mouseDetail.value,
                nearestPoint = _this7$mouseDetail.nearestPoint,
                addDataIndexes = _this7$mouseDetail.addDataIndexes,
                popupPosition = _this7$mouseDetail.popupPosition;
            (0, _jquery.default)(_this7.dom.current).find('.r-chart-popup-container').html('');

            if (addDataIndexes.length) {
              var container = (0, _jquery.default)(_this7.dom.current).find('.r-chart-add-popup');
              var addIndicator = addDataIndexes.length ? "<div class=\"add-indicator\" style=\"background:".concat(data[addDataIndexes[0]].color, "\">+</div>") : '';
              container.css({
                left: popupPosition.x,
                top: popupPosition.y - ('ontouchstart' in document.documentElement ? 40 : 0)
              });
              container.html('<div class="r-chart-popup">' + addIndicator + key + '  ' + value + '</div>');
            }

            if (nearestPoint) {
              var container = (0, _jquery.default)(_this7.dom.current).find('.r-chart-detail-popup');
              var left = d.getPercentByValue.x(nearestPoint.key, nearestPoint.value) * d.canvasSize.x / 100 + yWidth;
              var bottom = -d.getPercentByValue.y(nearestPoint.key, nearestPoint.value) * d.canvasSize.y / 100 + xHeight;
              container.css({
                left: left,
                top: 'unset',
                bottom: bottom
              });
              container.html('<div class="r-chart-popup">' + nearestPoint.key + '  ' + nearestPoint.value + '</div>');
            }
          },
          onMouseDown: this.mouseDown.bind(this)
        }
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-corner"
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-axis r-chart-axis-x"
      }, xls, " ", xfs))));
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
    key: [],
    value: []
  },
  globalization: 'en',
  precision: 0,
  clickRadius: 12,
  lines: []
};

var RChartEdit = /*#__PURE__*/function (_Component2) {
  _inherits(RChartEdit, _Component2);

  var _super2 = _createSuper(RChartEdit);

  function RChartEdit(props) {
    var _this8;

    _classCallCheck(this, RChartEdit);

    _this8 = _super2.call(this, props);
    _this8.dom = /*#__PURE__*/(0, _react.createRef)();
    return _this8;
  }

  _createClass(RChartEdit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _jquery.default)(this.dom.current).find('input').eq(0).focus().select();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props10 = this.props,
          points = _this$props10.points,
          type = _this$props10.type,
          title = _this$props10.title,
          _onChange = _this$props10.onChange,
          onClose = _this$props10.onClose,
          onAdd = _this$props10.onAdd,
          onEdit = _this$props10.onEdit,
          onRemove = _this$props10.onRemove,
          dataIndex = _this$props10.dataIndex,
          pointIndex = _this$props10.pointIndex,
          dynamicValue = _this$props10.dynamicValue,
          staticValue = _this$props10.staticValue,
          _this$props10$dataInd = _this$props10.dataIndexes,
          dataIndexes = _this$props10$dataInd === void 0 ? [] : _this$props10$dataInd;
      var _this$context = this.context,
          keyAxis = _this$context.keyAxis,
          valueAxis = _this$context.valueAxis,
          data = _this$context.data,
          _this$context$multise = _this$context.multiselect,
          multiselect = _this$context$multise === void 0 ? {} : _this$context$multise,
          translate = _this$context.translate,
          rtl = _this$context.rtl,
          keyDictionary = _this$context.keyDictionary;
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
      }, (keyAxis.title || 'untitle') + ' : '), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-detail-value"
      }, staticValue)), dynamicValue !== undefined && /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-item"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-label"
      }, (valueAxis.title || 'untitle') + ' : '), /*#__PURE__*/_react.default.createElement("input", {
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
          var _onAdd;

          var list = keyAxis.list;
          var points = data[dataIndex].points;
          var index = list.indexOf(staticValue);
          var pointIndex = points.length;

          for (var i = 0; i < points.length; i++) {
            var point = points[i];

            if (point._keyIndex > index) {
              pointIndex = i;
              break;
            }
          }

          onAdd((_onAdd = {}, _defineProperty(_onAdd, keyAxis.field, staticValue), _defineProperty(_onAdd, valueAxis.field, dynamicValue), _onAdd), {
            dataIndex: dataIndex,
            pointIndex: pointIndex
          });
          onClose();
        }
      }, translate('Add')), onRemove && /*#__PURE__*/_react.default.createElement("button", {
        className: "r-chart-edit-button",
        onClick: function onClick() {
          onRemove({
            dataIndex: dataIndex,
            pointIndex: pointIndex
          });
          onClose();
        }
      }, translate('Remove')), onEdit && /*#__PURE__*/_react.default.createElement("button", {
        className: "r-chart-edit-button",
        onClick: function onClick() {
          var newPoint = { ...data[dataIndex].points[pointIndex]
          };
          newPoint[valueAxis.field] = dynamicValue;
          onEdit(newPoint, {
            dataIndex: dataIndex,
            pointIndex: pointIndex
          });
          onClose();
        }
      }, translate('Edit'))));
    }
  }]);

  return RChartEdit;
}(_react.Component);

_defineProperty(RChartEdit, "contextType", RChartContext);
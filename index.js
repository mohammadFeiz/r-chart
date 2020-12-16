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
    var filter = _this.props.filter;
    _this.state = {
      popup: false,
      dataHide: {},
      filter: filter
    };
    _this.dom = /*#__PURE__*/(0, _react.createRef)();
    _this.details = {
      min: Infinity,
      max: -Infinity
    };
    (0, _jquery.default)('body').on('mouseout', '.r-chart-canvas', function () {
      (0, _jquery.default)('.r-chart-popup-container').html('');
      (0, _jquery.default)('.r-chart-line').css({
        display: 'none'
      });
    });

    if ('ontouchstart' in document.documentElement) {
      (0, _functions.eventHandler)('window', 'mouseup', function () {
        (0, _jquery.default)('.r-chart-popup-container').html('');
        (0, _jquery.default)('.r-chart-line').css({
          display: 'none'
        });
      });
    }

    _this.getLimitTypeNumber = _functions.getLimitTypeNumber;
    _this.key_getRange = _functions.key_getRange;
    _this.value_getRange = _functions.value_getRange;
    _this.key_getPercentByValue = _functions.key_getPercentByValue;
    _this.value_getPercentByValue = _functions.value_getPercentByValue;
    _this.key_getLabel = _functions.key_getLabel;
    _this.value_getLabel = _functions.value_getLabel;
    _this.key_getValueByPercent = _functions.key_getValueByPercent;
    _this.value_getValueByPercent = _functions.value_getValueByPercent;
    _this.key_changeFilter = _functions.key_changeFilter;
    _this.value_changeFilter = _functions.value_changeFilter;
    _this.getValueByPercent = _functions.getValueByPercent;
    _this.normal_getArea = _functions.normal_getArea;
    _this.reverse_getArea = _functions.reverse_getArea;
    _this.translate = _this.props.translate ? function (text) {
      return _this.props.translate(text);
    } : function (text) {
      return text;
    };
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
    value: function getKey(_ref) {
      var point = _ref.point,
          dataIndex = _ref.dataIndex,
          pointIndex = _ref.pointIndex;
      var _this$props$getKey = this.props.getKey,
          getKey = _this$props$getKey === void 0 ? function (_ref2) {
        var point = _ref2.point;
        return point.key;
      } : _this$props$getKey;
      return getKey({
        point: point,
        dataIndex: dataIndex,
        pointIndex: pointIndex
      });
    }
  }, {
    key: "getValue",
    value: function getValue(_ref3) {
      var point = _ref3.point,
          dataIndex = _ref3.dataIndex,
          pointIndex = _ref3.pointIndex;
      var _this$props$getValue = this.props.getValue,
          getValue = _this$props$getValue === void 0 ? function (_ref4) {
        var point = _ref4.point;
        return point.value;
      } : _this$props$getValue;
      return getValue({
        point: point,
        dataIndex: dataIndex,
        pointIndex: pointIndex
      });
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
    key: "getLineChart",
    value: function getLineChart(data, dataIndex) {
      var _this$props = this.props,
          keys = _this$props.keys,
          hideInterfere = _this$props.hideInterfere;
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
      var space = -Infinity;

      for (var pointIndex = 0; pointIndex < points.length; pointIndex++) {
        var point = points[pointIndex];
        var key = this.getKey({
          point: point,
          dataIndex: dataIndex,
          pointIndex: pointIndex
        }),
            value = this.getValue({
          point: point,
          dataIndex: dataIndex,
          pointIndex: pointIndex
        });
        point._key = key;
        point._value = value;

        if (key === null || value === null) {
          continue;
        }

        if (!this.mouseDownDetail.target) {
          point._keyIndex = keys.indexOf(key);
        }

        if (point._keyIndex === undefined) {
          point._keyIndex = this.lastData[dataIndex].points[pointIndex]._keyIndex;
        }

        if (point._keyIndex === -1 || point._keyIndex === undefined) {
          continue;
        }

        var px = this.getPercentByValue('x', point),
            py = this.getPercentByValue('y', point);
        this.keyDictionary[dataIndex][key] = pointIndex;

        if (pointStyle) {
          var PointStyle = typeof pointStyle === 'function' ? pointStyle({
            point: point,
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

          if (radius) {
            if (hideInterfere) {
              var center = this.details.canvasSize.x * px / 100;
              var left = center - radius - pointLineWidth / 2;

              if (left > space) {
                space = center + radius + pointLineWidth / 2;
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
            } else {
              var _Point = {
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
              this.elements.points.push(_Point);
              dataDetail.points.push(_Point);
            }
          }
        }

        if (text) {
          var _text = text({
            point: point,
            dataIndex: dataIndex,
            pointIndex: pointIndex
          }),
              _text$value = _text.value,
              _value = _text$value === void 0 ? '' : _text$value,
              _text$fontSize = _text.fontSize,
              fontSize = _text$fontSize === void 0 ? 16 : _text$fontSize,
              _text$color = _text.color,
              _color = _text$color === void 0 ? '#444' : _text$color,
              _text$left = _text.left,
              _left = _text$left === void 0 ? 0 : _text$left,
              _text$top = _text.top,
              top = _text$top === void 0 ? 0 : _text$top,
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
              x: _left,
              y: top,
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
        dataDetail.area = this.getArea(dataDetail.line.points, color, areaOpacity);
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
      var _this$props2 = this.props,
          reverse = _this$props2.reverse,
          keys = _this$props2.keys;
      var dataDetail = { ...data,
        dataIndex: dataIndex,
        rects: [],
        texts: []
      };
      var _this$details = this.details,
          barCount = _this$details.barCount,
          barWidth = _this$details.barWidth;

      for (var pointIndex = 0; pointIndex < points.length; pointIndex++) {
        var point = points[pointIndex];
        var key = this.getKey({
          point: point,
          dataIndex: dataIndex,
          pointIndex: pointIndex
        }),
            value = this.getValue({
          point: point,
          dataIndex: dataIndex,
          pointIndex: pointIndex
        });
        point._key = key;
        point._value = value;

        if (key === null || value === null) {
          continue;
        }

        if (!this.mouseDownDetail.target) {
          point._keyIndex = keys.indexOf(key);
        }

        if (point._keyIndex === undefined) {
          point._keyIndex = this.lastData[dataIndex].points[pointIndex]._keyIndex;
        }

        if (point._keyIndex === -1 || point._keyIndex === undefined) {
          continue;
        }

        var px = this.getPercentByValue('x', point);
        var py = this.getPercentByValue('y', point);
        px += '%';
        py += '%';

        if (px === false || py === false) {
          continue;
        }

        this.keyDictionary[dataIndex][key] = pointIndex;

        if (!reverse) {
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
          var _text2 = text({
            point: point,
            dataIndex: dataIndex,
            pointIndex: pointIndex
          }),
              _text2$value = _text2.value,
              _value2 = _text2$value === void 0 ? '' : _text2$value,
              _text2$fontSize = _text2.fontSize,
              fontSize = _text2$fontSize === void 0 ? 16 : _text2$fontSize,
              _text2$color = _text2.color,
              _color2 = _text2$color === void 0 ? '#444' : _text2$color,
              _text2$left = _text2.left,
              left = _text2$left === void 0 ? 0 : _text2$left,
              _text2$top = _text2.top,
              top = _text2$top === void 0 ? 0 : _text2$top,
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
              x: left,
              y: top,
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
    value: function getGridLine(value, axis, _ref5) {
      var _ref5$color = _ref5.color,
          color = _ref5$color === void 0 ? 'red' : _ref5$color,
          _ref5$lineWidth = _ref5.lineWidth,
          lineWidth = _ref5$lineWidth === void 0 ? 0.7 : _ref5$lineWidth,
          dash = _ref5.dash,
          startLine = _ref5.start,
          endLine = _ref5.end;
      var range = this.details.range[axis];

      if (!range) {
        return {};
      }

      var keys = this.props.keys;

      if (this.details.axisToD[axis] === 'key') {
        value = keys.indexOf(value);
        var start = range.start,
            end = range.end,
            v = (value - start) * 100 / (end - start);
        var startPercent = 0;
        var endPercent = 100;

        if (startLine !== undefined) {
          var _this$details$range$t = this.details.range[this.details.dToAxis['value']],
              _start = _this$details$range$t.start,
              _end = _this$details$range$t.end;
          startPercent = (startLine - _start) * 100 / (_end - _start);
        }

        if (endLine !== undefined) {
          var _this$details$range$t2 = this.details.range[this.details.dToAxis['value']],
              _start2 = _this$details$range$t2.start,
              _end2 = _this$details$range$t2.end;
          endPercent = (endLine - _start2) * 100 / (_end2 - _start2);
        }
      } else {
        var start = range.start,
            end = range.end,
            v = (value - start) * 100 / (end - start);
        var startPercent = 0;
        var endPercent = 100;

        if (startLine !== undefined) {
          var _this$details$range$t3 = this.details.range[this.details.dToAxis['key']],
              _start3 = _this$details$range$t3.start,
              _end3 = _this$details$range$t3.end;
          var index = keys.indexOf(startLine);
          startPercent = (index - _start3) * 100 / (_end3 - _start3);
        }

        if (endLine !== undefined) {
          var _this$details$range$t4 = this.details.range[this.details.dToAxis['key']],
              _start4 = _this$details$range$t4.start,
              _end4 = _this$details$range$t4.end;

          var _index = keys.indexOf(endLine);

          endPercent = (_index - _start4) * 100 / (_end4 - _start4);
        }
      }

      var points = axis === 'x' ? [[v + '%', -startPercent + '%'], [v + '%', -endPercent + '%']] : [[startPercent + '%', -v + '%'], [endPercent + '%', -v + '%']];
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
      var color = this.props[this.details.axisToD[axis] + '_gridColor'];

      if (!color) {
        return [];
      }

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
    value: function getLines(axis) {
      var lines = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var result = [];
      var Lines = typeof lines === 'function' ? lines(this.props.data, this.props.keys) : lines;

      for (var i = 0; i < Lines.length; i++) {
        var _Lines$i = Lines[i],
            dash = _Lines$i.dash,
            lineWidth = _Lines$i.lineWidth,
            color = _Lines$i.color,
            start = _Lines$i.start,
            end = _Lines$i.end;
        var a = Lines[i][this.details.axisToD[axis]];
        result.push(this.getGridLine(a, axis, {
          dash: dash,
          lineWidth: lineWidth,
          color: color,
          start: start,
          end: end
        }));
      }

      return result;
    }
  }, {
    key: "getElements",
    value: function getElements() {
      var data = this.props.data;
      this.keyDictionary = data.map(function () {
        return {};
      });
      var dataHide = this.state.dataHide;
      var getLines = this.details.getLines;
      this.elements = {
        xGridLines: this.getGridLines('x'),
        yGridLines: this.getGridLines('y'),
        areas: [],
        rects: [],
        lines: [],
        points: [],
        xIndicators: getLines('x'),
        yIndicators: getLines('y'),
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

        if (title && dataHide[title]) {
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

      this.lastData = data;
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

      var _this$props3 = this.props,
          key_zoom = _this$props3.key_zoom,
          value_zoom = _this$props3.value_zoom,
          data = _this$props3.data,
          _this$props3$barWidth = _this$props3.barWidth,
          barWidth = _this$props3$barWidth === void 0 ? 80 : _this$props3$barWidth,
          reverse = _this$props3.reverse,
          d = this.details;

      if (!d.axisToD) {
        if (!reverse) {
          d.axisToD = {
            x: 'key',
            y: 'value'
          };
          d.dToAxis = {
            key: 'x',
            value: 'y'
          };
          this.getArea = this.normal_getArea;

          if (key_zoom) {
            d.xZoom = true;
          }

          if (value_zoom) {
            d.yZoom = true;
          }
        } else {
          d.axisToD = {
            x: 'value',
            y: 'key'
          };
          d.dToAxis = {
            key: 'y',
            value: 'x'
          };
          this.getArea = this.reverse_getArea;

          if (key_zoom) {
            d.yZoom = true;
          }

          if (value_zoom) {
            d.xZoom = true;
          }
        }

        this.changeFilter = function (axis, p1, p2) {
          return _this2[d.axisToD[axis] + '_changeFilter'](p1, p2);
        };

        this.getRange = function (axis) {
          return _this2[d.axisToD[axis] + '_getRange'](axis);
        };

        this.getLabel = function (axis, value) {
          return _this2[d.axisToD[axis] + '_getLabel'](value);
        };

        this.getPercentByValue = function (axis, point) {
          var D = d.axisToD[axis];
          return _this2[D + '_getPercentByValue'](axis, point) * (axis === 'y' ? -1 : 1);
        };

        d.getLines = function (axis) {
          return _this2.getLines(axis, _this2.props[d.axisToD[axis] + '_lines']);
        };
      } //نوع چارت و تابع گرفتن درصد با مقدار یکبار تایین می شود


      if (this.mouseDownDetail.target !== 'point') {
        if (this.mouseDownDetail.target !== 'filter') {
          var limit = this.getLimitTypeNumber(data);
          this.details.min = limit.min;
          this.details.max = limit.max;
        }

        this.details.range = {
          x: this.getRange('x'),
          y: this.getRange('y')
        };
        this.details.labelSpace = this.details.range[d.dToAxis.key].labelSpace;
      }

      d.barCount = data.filter(function (d) {
        return d.type === 'bar';
      }).length;
      d.barWidth = barWidth / d.range[d.dToAxis['key']].count / d.barCount;
    }
  }, {
    key: "pointMouseDown",
    value: function pointMouseDown(e, pos, obj) {
      var dataIndex = obj.dataIndex,
          pointIndex = obj.pointIndex;
      var _this$props4 = this.props,
          data = _this$props4.data,
          onChange = _this$props4.onChange,
          onRemove = _this$props4.onRemove;
      this.getMouseDetail(pos);

      if (data[dataIndex].editable === false) {
        return;
      }

      var point = data[dataIndex].points[pointIndex];
      this.mouseDownDetail = {
        target: 'point',
        key: point._key,
        value: point._value
      };

      if (onChange && data[dataIndex].draggable !== false) {
        (0, _functions.eventHandler)('window', 'mousemove', _jquery.default.proxy(this.pointMouseMove, this));
      }

      if (onChange || onRemove) {
        (0, _functions.eventHandler)('window', 'mouseup', _jquery.default.proxy(this.pointMouseUp, this));
      }

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
      var _this$props5 = this.props,
          data = _this$props5.data,
          onChange = _this$props5.onChange,
          point = data[this.so.dataIndex].points[this.so.pointIndex];
      var dToAxis = this.details.dToAxis;

      if (!this.moved) {
        if (Math.abs(this.mouseDetail[dToAxis.value] - this.so[dToAxis.value]) < 8) {
          return;
        }

        if (point._value === this.mouseDetail.value) {
          return;
        }
      }

      this.moved = true;
      onChange({
        point: point,
        key: point._key,
        value: this.mouseDetail.value,
        dataIndex: this.so.dataIndex,
        pointIndex: this.so.pointIndex,
        drag: true
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
          onRemove = _this$props6.onRemove,
          onChange = _this$props6.onChange;
      var point = data[this.so.dataIndex].points[this.so.pointIndex];

      if (!this.moved) {
        var title = !onChange ? this.translate('Remove Point') : this.translate('Edit Point');
        this.SetState({
          popup: {
            disabled: onRemove && !onChange,
            dataIndex: this.so.dataIndex,
            pointIndex: this.so.pointIndex,
            dataIndexes: [this.so.dataIndex],
            dynamicValue: point._value,
            staticValue: this.mouseDetail.key,
            onEdit: onChange,
            onRemove: onRemove,
            title: title
          }
        });
        return;
      }

      var obj = {
        point: point,
        key: point._key,
        value: this.mouseDetail.value,
        dataIndex: this.so.dataIndex,
        pointIndex: this.so.pointIndex
      };

      if (onChange) {
        onChange(obj);
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

      var _this$props7 = this.props,
          onAdd = _this$props7.onAdd,
          multiselect = _this$props7.multiselect,
          addPopup = _this$props7.addPopup; // اگر مد افزودن فعال بود و در موقعیت فعلی موس دیتا یا دیتا هایی آمادگی دریافت نقطه جدید در این موقعیت را داشتند

      this.mouseDownKey = this.mouseDetail.key;

      if (onAdd && this.mouseDetail.addDataIndexes.length) {
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
      var _this$props8 = this.props,
          onAdd = _this$props8.onAdd,
          addPopup = _this$props8.addPopup;
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
        onAdd(this.mouseDetail);
      } else {
        this.SetState({
          popup: {
            type: 'add',
            dataIndexes: this.mouseDetail.addDataIndexes,
            dataIndex: this.mouseDetail.addDataIndexes[0],
            dynamicValue: this.mouseDetail.value,
            staticValue: this.mouseDetail.key,
            onAdd: onAdd,
            title: this.translate('Add Point')
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
          title: this.translate('Multi Select'),
          points: this.multiselect.points
        }
      });
    }
  }, {
    key: "getPointsBySelectRect",
    value: function getPointsBySelectRect() {
      var _this$multiselect = this.multiselect,
          start = _this$multiselect.start,
          end = _this$multiselect.end;
      var result = [];

      for (var i = 0; i < this.dataDetails.length; i++) {
        var _this$dataDetails$i = this.dataDetails[i],
            dataIndex = _this$dataDetails$i.dataIndex,
            points = _this$dataDetails$i.points,
            editable = _this$dataDetails$i.editable;

        if (editable === false) {
          continue;
        }

        for (var pointIndex = 0; pointIndex < points.length; pointIndex++) {
          var point = points[pointIndex];
          var percent = parseFloat(point[this.details.dToAxis['key']]);

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
          dataHide = this.state.dataHide;
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
        var style = !dataHide[d.title] ? {
          background: color
        } : {
          boxShadow: "inset 0 0 0 2px ".concat(color)
        };
        return /*#__PURE__*/_react.default.createElement("div", {
          key: i,
          className: "r-chart-title-item",
          onClick: function onClick() {
            dataHide[title] = dataHide[title] === undefined ? false : dataHide[title];
            dataHide[title] = !dataHide[title];

            _this4.SetState({
              dataHide: dataHide
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

      var _this$details2 = this.details,
          range = _this$details2.range,
          xZoom = _this$details2.xZoom,
          yZoom = _this$details2.yZoom;

      if (!range || !range[axis]) {
        return null;
      }

      var _this$details$range$a = this.details.range[axis],
          start = _this$details$range$a.start,
          end = _this$details$range$a.end,
          step = _this$details$range$a.step;
      var labelStyle = {
        x: {
          top: xZoom ? '24px' : '14px'
        },
        y: {
          left: 'unset',
          right: yZoom ? '16px' : '8px',
          justifyContent: 'flex-end'
        }
      };
      var labelRotate = this.props.labelRotate;
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
          rotate: axis === 'y' ? 0 : labelRotate,
          edit: function edit(value) {
            return _this5.getLabel(axis, value);
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
      this.mouseDownDetail.target = 'filter';
      var container = (0, _jquery.default)(this.dom.current);
      var filterButtons = container.find('.r-chart-filterSlider-button');
      filterButtons.addClass('active');
      (0, _functions.eventHandler)('window', 'mouseup', _jquery.default.proxy(this.filterMouseUp, this));
    }
  }, {
    key: "filterMouseUp",
    value: function filterMouseUp() {
      this.mouseDownDetail = {};
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

      var zoom = this.props[this.details.axisToD[axis] + '_zoom'];

      if (!zoom) {
        return null;
      }

      var range = this.details.range;

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
          return _this6.getLabel(axis, point.value);
        },
        ondrag: function ondrag(_ref6) {
          var points = _ref6.points;
          return _this6.changeFilter(axis, points[0].value, points[1].value);
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
        var Dif = Math.abs(point._value - obj.value);

        if (Dif <= dif) {
          res = point;
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

      var _a = _slicedToArray(a, 4),
          x = _a[0],
          y = _a[1],
          px = _a[2],
          py = _a[3];

      var _this$props9 = this.props,
          onAdd = _this$props9.onAdd,
          axisThickness = _this$props9.axisThickness;
      var _axisThickness$vertic = axisThickness.vertical,
          vertical = _axisThickness$vertic === void 0 ? 50 : _axisThickness$vertic;
      var obj = this.getValueByPercent({
        x: px,
        y: -py
      });

      if (this.mouseDownDetail.target === 'point') {
        obj.key = this.mouseDownDetail.key;
      }

      var popupPosition = {
        x: x + vertical,
        y: y + this.details.canvasSize.y
      };
      var nearestPoint = this.getNearestPointToMouse(obj);
      var addDataIndexes = onAdd && this.mouseDownDetail.target !== 'point' ? this.getAddableDataIndexes(obj.key) : [];
      this.mouseDetail = {
        x: x,
        y: y,
        px: px,
        py: py,
        key: obj.key,
        value: obj.value,
        keyIndex: obj.keyIndex,
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
      var _this$props10 = this.props,
          keys = _this$props10.keys,
          axisThickness = _this$props10.axisThickness,
          data = _this$props10.data,
          _this$props10$html = _this$props10.html,
          html = _this$props10$html === void 0 ? function () {
        return '';
      } : _this$props10$html,
          onAdd = _this$props10.onAdd,
          id = _this$props10.id,
          className = _this$props10.className;
      var style = typeof this.props.style === 'function' ? this.props.style() : this.props.style;
      var popup = this.state.popup;
      var _axisThickness$horizo = axisThickness.horizontal,
          horizontal = _axisThickness$horizo === void 0 ? 50 : _axisThickness$horizo,
          _axisThickness$vertic2 = axisThickness.vertical,
          vertical = _axisThickness$vertic2 === void 0 ? 50 : _axisThickness$vertic2;
      var ok = false;

      if (this.details.canvasSize && data.length && keys) {
        ok = true;
        this.getDetails();
        var d = this.details;
        items = this.getElements();
        yls = this.getLabelSlider('y');
        yfs = this.getFilterSlider('y');
        xls = this.getLabelSlider('x');
        xfs = this.getFilterSlider('x');
        HTML = html(this.elements, d);
      }

      return /*#__PURE__*/_react.default.createElement(RChartContext.Provider, {
        value: { ...this.props,
          translate: this.translate.bind(this),
          keyDictionary: this.keyDictionary
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: 'r-chart' + (className ? ' ' + className : ''),
        ref: this.dom,
        style: style,
        id: id
      }, this.getHeader(vertical), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-container",
        style: this.getStyle(vertical, horizontal)
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-horizontal-line r-chart-line",
        style: {
          width: "calc(100% - ".concat(vertical, "px)")
        }
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-vertical-line r-chart-line",
        style: {
          height: "calc(100% - ".concat(horizontal, "px)")
        }
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: 'r-chart-popup-container r-chart-detail-popup'
      }), onAdd && /*#__PURE__*/_react.default.createElement("div", {
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
            if (!ok) {
              return;
            }

            _this7.getMouseDetail(pos);

            var _this7$mouseDetail = _this7.mouseDetail,
                nearestPoint = _this7$mouseDetail.nearestPoint,
                addDataIndexes = _this7$mouseDetail.addDataIndexes,
                popupPosition = _this7$mouseDetail.popupPosition;
            var dom = (0, _jquery.default)(_this7.dom.current);
            dom.find('.r-chart-popup-container').html('');
            var horLine = dom.find('.r-chart-horizontal-line');
            var verLine = dom.find('.r-chart-vertical-line');
            horLine.css({
              display: 'block',
              top: "calc(100% + ".concat(pos[1] - horizontal, "px)")
            });
            verLine.css({
              display: 'flex',
              right: "calc(100% - ".concat(pos[0] + vertical, "px)")
            });
            var xD = _this7.details.axisToD.x,
                yD = _this7.details.axisToD.y;
            var xLabel, yLabel;

            if (xD === 'key') {
              xLabel = _this7.getLabel('x', _this7.mouseDetail['keyIndex']);
              yLabel = _this7.getLabel('y', _this7.mouseDetail[yD]);
            } else {
              xLabel = _this7.getLabel('x', _this7.mouseDetail[xD]);
              yLabel = _this7.getLabel('y', _this7.mouseDetail['keyIndex']);
            }

            horLine.html("<div style=\"padding-right:".concat(_this7.details.yZoom ? '16' : '8', "px;\">").concat(yLabel === undefined ? '' : yLabel, "</div>"));
            verLine.html("<div style=\"top:calc(100% + ".concat(_this7.details.xZoom ? '14' : '4', "px);\">").concat(xLabel === undefined ? '' : xLabel, "</div>"));

            if (addDataIndexes.length) {
              var container = (0, _jquery.default)(_this7.dom.current).find('.r-chart-add-popup');
              var addIndicator = "<div class=\"add-indicator\" style=\"background:".concat(data[addDataIndexes[0]].color, "\">+</div>");
              container.css({
                left: popupPosition.x,
                top: popupPosition.y - ('ontouchstart' in document.documentElement ? 40 : 0)
              });
              container.html('<div class="r-chart-popup">' + addIndicator + xLabel + '  ' + yLabel + '</div>');
            }

            if (nearestPoint) {
              var container = (0, _jquery.default)(_this7.dom.current).find('.r-chart-detail-popup');
              var left = _this7.getPercentByValue('x', nearestPoint) * d.canvasSize.x / 100 + vertical;
              var bottom = -_this7.getPercentByValue('y', nearestPoint) * d.canvasSize.y / 100 + horizontal;
              container.css({
                left: left,
                top: 'unset',
                bottom: bottom
              });

              var _xLabel, _yLabel;

              if (xD === 'key') {
                _xLabel = _this7.getLabel('x', nearestPoint['_keyIndex']);
                _yLabel = _this7.getLabel('y', nearestPoint['_value']);
              } else {
                _xLabel = _this7.getLabel('x', nearestPoint['_value']);
                _yLabel = _this7.getLabel('y', nearestPoint['_keyIndex']);
              }

              container.html('<div class="r-chart-popup">' + _xLabel + '  ' + _yLabel + '</div>');
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
  filter: {
    key: [],
    value: []
  },
  precision: 0,
  clickRadius: 12,
  lines: [],
  axisThickness: {},
  labelSize: 40,
  axisStyle: {}
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
          pointIndex = _this$props11.pointIndex,
          dynamicValue = _this$props11.dynamicValue,
          staticValue = _this$props11.staticValue,
          _this$props11$dataInd = _this$props11.dataIndexes,
          dataIndexes = _this$props11$dataInd === void 0 ? [] : _this$props11$dataInd,
          disabled = _this$props11.disabled;
      var _this$context = this.context,
          key_title = _this$context.key_title,
          value_title = _this$context.value_title,
          keys = _this$context.keys,
          data = _this$context.data,
          _this$context$multise = _this$context.multiselect,
          multiselect = _this$context$multise === void 0 ? {} : _this$context$multise,
          translate = _this$context.translate,
          rtl = _this$context.rtl;
      var _multiselect$inputs = multiselect.inputs,
          inputs = _multiselect$inputs === void 0 ? [] : _multiselect$inputs,
          _multiselect$buttons = multiselect.buttons,
          buttons = _multiselect$buttons === void 0 ? [] : _multiselect$buttons;
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
      }, (key_title || 'untitle') + ' : '), /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-detail-value"
      }, staticValue)), dynamicValue !== undefined && /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-item"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-chart-edit-label"
      }, (value_title || 'untitle') + ' : '), /*#__PURE__*/_react.default.createElement("input", {
        disabled: disabled,
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
      })), type === 'multiselect' && (buttons.length || inputs.length) && inputs.map(function (item, i) {
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
      }, type === 'multiselect' && buttons.filter(function (a) {
        return a.show !== false;
      }).map(function (a, i) {
        return /*#__PURE__*/_react.default.createElement("button", {
          key: i,
          className: "r-chart-edit-button",
          onClick: function onClick() {
            a.onClick(points);
            onClose();
          }
        }, a.text);
      }), onAdd && /*#__PURE__*/_react.default.createElement("button", {
        className: "r-chart-edit-button",
        onClick: function onClick() {
          var points = data[dataIndex].points;
          var index = keys.indexOf(staticValue);
          var pointIndex = points.length;

          for (var i = 0; i < points.length; i++) {
            var point = points[i];

            if (point._keyIndex > index) {
              pointIndex = i;
              break;
            }
          }

          onAdd({
            key: staticValue,
            value: dynamicValue,
            dataIndex: dataIndex,
            pointIndex: pointIndex
          });
          onClose();
        }
      }, translate('Add')), onRemove && /*#__PURE__*/_react.default.createElement("button", {
        className: "r-chart-edit-button",
        onClick: function onClick() {
          var point = data[dataIndex].points[pointIndex];
          onRemove({
            point: point,
            key: point._key,
            value: point._value,
            dataIndex: dataIndex,
            pointIndex: pointIndex
          });
          onClose();
        }
      }, translate('Remove')), onEdit && /*#__PURE__*/_react.default.createElement("button", {
        className: "r-chart-edit-button",
        onClick: function onClick() {
          var point = data[dataIndex].points[pointIndex];
          onEdit({
            point: point,
            key: point._key,
            value: dynamicValue,
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
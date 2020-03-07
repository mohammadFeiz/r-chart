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

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var chartContext = (0, _react.createContext)();

var RChart = /*#__PURE__*/function (_Component) {
  _inherits(RChart, _Component);

  function RChart(props) {
    var _ref;

    var _this;

    _classCallCheck(this, RChart);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RChart).call(this, props));
    var _this$props = _this.props,
        _this$props$x = _this$props.x,
        x = _this$props$x === void 0 ? {} : _this$props$x,
        _this$props$y = _this$props.y,
        y = _this$props$y === void 0 ? {} : _this$props$y,
        data = _this$props.data,
        padding = _this$props.padding;
    var _padding$left = padding.left,
        left = _padding$left === void 0 ? 30 : _padding$left,
        _padding$top = padding.top,
        top = _padding$top === void 0 ? 20 : _padding$top,
        _padding$bottom = padding.bottom,
        bottom = _padding$bottom === void 0 ? 30 : _padding$bottom,
        _padding$right = padding.right,
        right = _padding$right === void 0 ? 20 : _padding$right;
    _this.padding = {
      left: left,
      top: top,
      bottom: bottom,
      right: right
    };
    _this.controlPanel = {
      filterSlider: {
        fillStyle: {
          background: '#ccc'
        },
        lineStyle: {
          display: 'none'
        },
        pointStyle: {
          width: '13px',
          height: '13px',
          borderRadius: 0,
          background: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
        pointHTML: _react.default.createElement("div", {
          style: (_ref = {
            width: '6px',
            height: '6px',
            background: '#aaa',
            position: 'absolute',
            left: 0,
            top: 0
          }, _defineProperty(_ref, "top", 'calc(50% - 3px)'), _defineProperty(_ref, "left", 'calc(50% - 3px)'), _ref)
        })
      },
      xlabelStyle: {
        top: '18px',
        fontSize: 'inherit'
      },
      ylabelStyle: {
        right: '15px',
        left: 'unset',
        justifyContent: 'flex-end',
        fontSize: 'inherit'
      }
    };

    if (!Array.isArray(data)) {
      console.error('data property of RChart must be an array of objects!!!');
      return _possibleConstructorReturn(_this);
    }

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
    _this.touch = _this.isMobile();
    _this.dom = (0, _react.createRef)();
    (0, _jquery.default)('body').on('mouseout', '.r-chart canvas', function () {
      (0, _jquery.default)('.r-chart-detail-container').remove();
    });
    return _this;
  }

  _createClass(RChart, [{
    key: "isMobile",
    value: function isMobile() {
      return 'ontouchstart' in document.documentElement;
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
    key: "fix",
    value: function fix(number) {
      var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
      return parseFloat(number.toFixed(a));
    }
  }, {
    key: "getPercentByValue",
    value: function getPercentByValue(value, start, end) {
      return 100 * (value - start) / (end - start);
    }
  }, {
    key: "getValueByPercent",
    value: function getValueByPercent(percent, start, end) {
      return start + percent * (end - start) / 100;
    }
  }, {
    key: "binarySearch",
    value: function binarySearch(arr, value, field) {
      var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var start = 0,
          end = arr.length - 1;
      var startValue = field(arr[start]);
      var endValue = field(arr[end]);

      if (value < startValue) {
        return Math.abs(value - startValue) <= limit ? start : -1;
      }

      if (value > endValue) {
        return Math.abs(value - endValue) <= limit ? end : -1;
      }

      if (value === startValue) {
        return start;
      }

      if (value === endValue) {
        return end;
      }

      while (end - start > 1) {
        var mid = Math.floor((end + start) / 2);
        var mp = field(arr[mid]);
        var dif = value - mp;

        if (dif === 0) {
          return mid;
        }

        if (dif < 0) {
          end = mid;
        } //اگر مقدار در سمت چپ است
        else {
            start = mid;
          } //اگر مقدار در سمت راست است

      }

      var startDif = Math.abs(field(arr[start]) - value);
      var endDif = Math.abs(field(arr[end]) - value);

      if (startDif <= endDif) {
        return startDif <= limit ? start : -1;
      } else {
        return endDif <= limit ? end : -1;
      }
    }
  }, {
    key: "compaire",
    value: function compaire(a, b) {
      return JSON.stringify(a) === JSON.stringify(b);
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
      var _this$padding = this.padding,
          left = _this$padding.left,
          right = _this$padding.right,
          top = _this$padding.top,
          bottom = _this$padding.bottom;
      var _this$controlPanel$fi = this.controlPanel.filterSlider,
          fillStyle = _this$controlPanel$fi.fillStyle,
          lineStyle = _this$controlPanel$fi.lineStyle,
          pointStyle = _this$controlPanel$fi.pointStyle,
          style = _this$controlPanel$fi.style,
          pointHTML = _this$controlPanel$fi.pointHTML;
      var start, step, end, points;

      if (labels) {
        var fs = filter[0] ? this.getIndex(labels, function (label) {
          return label === filter[0];
        }) : 0;
        var fe = filter[1] ? this.getIndex(labels, function (label) {
          return label === filter[1];
        }) : labels.length - 1;
        start = 0;
        step = 1;
        end = labels.length - 1;
        points = [{
          value: fs,
          html: pointHTML
        }, {
          value: fe,
          fillStyle: fillStyle,
          html: pointHTML
        }];
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

        points = [{
          value: fs,
          html: pointHTML
        }, {
          value: fe,
          fillStyle: fillStyle,
          html: pointHTML
        }];
      }

      var config = {
        start: start,
        step: step,
        end: end,
        axis: axis,
        points: points,
        lineStyle: lineStyle,
        pointStyle: pointStyle,
        ondrag: this.change.bind(this),
        direction: axis === 'y' ? 'top' : 'right',
        className: "r-chart-filter r-chart-filter-".concat(axis),
        style: axis === 'x' ? {
          width: "calc(100% - ".concat(left, "px - ").concat(right, "px)"),
          bottom: "".concat(bottom - 9, "px"),
          right: "".concat(right, "px"),
          position: 'absolute',
          zIndex: 1000,
          height: '5px',
          padding: '0 12px'
        } : {
          left: "".concat(left - 9, "px"),
          top: "".concat(top, "px"),
          height: "calc(100% - ".concat(bottom, "px - ").concat(top, "px)"),
          position: 'absolute',
          zIndex: 1000,
          width: '5px',
          padding: '12px 0'
        }
      };
      return config;
    }
  }, {
    key: "getLabelSlider",
    value: function getLabelSlider(axis, range) {
      var _this$state$axis2 = this.state[axis],
          _this$state$axis2$fil = _this$state$axis2.filter,
          filter = _this$state$axis2$fil === void 0 ? [] : _this$state$axis2$fil,
          labels = _this$state$axis2.labels,
          _this$state$axis2$rot = _this$state$axis2.rotate,
          rotate = _this$state$axis2$rot === void 0 ? 0 : _this$state$axis2$rot;
      var start, step, end, labelItems, labelStep;
      var labelStyle = this.controlPanel[axis + 'labelStyle'];

      if (labels) {
        var fs = filter[0] ? this.getIndex(labels, function (label) {
          return label === filter[0];
        }) : 0;
        var fe = filter[1] ? this.getIndex(labels, function (label) {
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
        return {
          label: {}
        };
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

      var _this$padding2 = this.padding,
          left = _this$padding2.left,
          right = _this$padding2.right,
          top = _this$padding2.top,
          bottom = _this$padding2.bottom;
      return {
        start: start,
        end: end,
        step: step,
        label: {
          items: labelItems,
          step: labelStep,
          style: labelStyle,
          rotate: axis === 'y' ? 0 : rotate
        },
        showPoint: false,
        lineStyle: {
          display: 'none'
        },
        pointStyle: {
          display: 'none'
        },
        direction: axis === 'x' ? 'right' : 'top',
        className: "r-chart-labels r-chart-labels-".concat(axis),
        style: axis === 'x' ? {
          padding: 0,
          position: 'absolute',
          width: "calc(100% - ".concat(left, "px - ").concat(right, "px)"),
          bottom: 0,
          right: "".concat(right, "px"),
          height: bottom + 'px',
          fontSize: 'inherit'
        } : {
          padding: 0,
          position: 'absolute',
          left: 0,
          top: "".concat(top, "px"),
          width: left + 'px',
          height: "calc(100% - ".concat(bottom, "px - ").concat(top, "px)"),
          fontSize: 'inherit'
        }
      };
    }
  }, {
    key: "getDetail",
    value: function getDetail(axis) {
      var gridColor = this.state[axis].gridColor;
      var limit = this.limit[axis];
      var range = limit ? this.getRange(limit) : false;
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
          _this$props$data$data2 = _this$props$data$data.stream,
          stream = _this$props$data$data2 === void 0 ? [] : _this$props$data$data2,
          pointColor = _this$props$data$data.pointColor,
          _this$props$data$data3 = _this$props$data$data.lineWidth,
          lineWidth = _this$props$data$data3 === void 0 ? 1 : _this$props$data$data3,
          _this$props$data$data4 = _this$props$data$data.color,
          color = _this$props$data$data4 === void 0 ? '#444' : _this$props$data$data4,
          _this$props$data$data5 = _this$props$data$data.r,
          r = _this$props$data$data5 === void 0 ? 3 : _this$props$data$data5,
          showPoint = _this$props$data$data.showPoint,
          _this$props$data$data6 = _this$props$data$data.showLine,
          showLine = _this$props$data$data6 === void 0 ? true : _this$props$data$data6,
          _this$props$data$data7 = _this$props$data$data.show,
          show = _this$props$data$data7 === void 0 ? true : _this$props$data$data7,
          dash = _this$props$data$data.dash,
          selectable = _this$props$data$data.selectable,
          _this$props$data$data8 = _this$props$data$data.area,
          area = _this$props$data$data8 === void 0 ? 0 : _this$props$data$data8;

      if (!showLine && !showPoint) {
        return;
      }

      var points = this.getPoints(s, stream, dataIndex);
      var linePoints = [],
          arcs = [];

      if (showPoint) {
        for (var i = 0; i < points.length; i++) {
          var _points$i = points[i],
              x = _points$i.x,
              y = _points$i.y,
              R = _points$i.r,
              Color = _points$i.color,
              background = _points$i.background,
              selected = _points$i.selected;
          linePoints.push([x, y]);
          arcs.push({
            stroke: Color || color,
            r: R || r,
            x: x,
            y: y,
            lineWidth: lineWidth * 2,
            type: 'arc',
            fill: selected ? 'red' : background || pointColor || '#fff'
          });
        }
      } else {
        for (var i = 0; i < points.length; i++) {
          var _points$i2 = points[i],
              _x = _points$i2.x,
              _y = _points$i2.y,
              _R = _points$i2.r,
              _Color = _points$i2.color,
              _background = _points$i2.background;
          linePoints.push([_x, _y]);
        }
      }

      var line = {
        dataIndex: dataIndex,
        stroke: color,
        dash: dash,
        lineWidth: lineWidth,
        selectable: selectable,
        points: linePoints
      };
      s.arcs = s.arcs.concat(arcs);
      s.lines.push(line);
      var mainIndex, secondIndex;

      if (this.mainAxis === 'x') {
        mainIndex = 0;
        secondIndex = 1;
      } else {
        mainIndex = 1;
        secondIndex = 0;
      }

      if (area && points.length) {
        var firstPoint = [points[0].x, points[0].y];
        var lastPoint = [points[points.length - 1].x, points[points.length - 1].y];
        firstPoint[mainIndex] = '0%';
        lastPoint[mainIndex] = '0%';
        s.shadows.push(_jquery.default.extend({}, line, {
          fill: color,
          stroke: false,
          opacity: area,
          points: [firstPoint].concat(linePoints, [lastPoint])
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
            show = _str$show === void 0 ? true : _str$show,
            color = str.color,
            background = str.background;

        if (x === null || y === null) {
          continue;
        }

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
          r: r,
          color: color,
          background: background
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

      if (label && label.items) {
        var index = this.getIndex(label.items, function (obj) {
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
      var _data$stream = data.stream,
          stream = _data$stream === void 0 ? [] : _data$stream,
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
          _data$dataIndex$strea = _data$dataIndex.stream,
          stream = _data$dataIndex$strea === void 0 ? [] : _data$dataIndex$strea;

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
          x: X.pos + '%',
          y: -Y.pos + '%',
          width: X.size + '%',
          height: Y.size + '%',
          streamIndex: i,
          dataIndex: dataIndex,
          fill: selected ? 'red' : color //shadow:[3,3,6,'rgba(10,10,10,.4)'], 

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
        var index = this.getIndex(label.items, function (obj) {
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
        size = barUnit;
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
          x: this.getLimit(data, x, 'x'),
          y: this.getLimit(data, y, 'y')
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
          var p1 = axis === 'x' ? [val + '%', 0 + '%'] : [0 + '%', -val + '%'];
          var p2 = axis === 'x' ? [val + '%', -100 + '%'] : [100 + '%', -val + '%'];
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
    key: "getLength",
    value: function getLength(p1, p2) {
      var a = Math.pow((parseFloat(p1.x) - p2.x) * this.width / 100, 2);
      var b = Math.pow((parseFloat(p1.y) - p2.y) * this.height / 100, 2);
      return this.fix(Math.sqrt(a + b));
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
          var _points$j = _slicedToArray(points[j], 2),
              x = _points$j[0],
              y = _points$j[1];

          var length = this.getLength(coords, {
            x: parseFloat(x),
            y: parseFloat(y)
          });

          if (length < min) {
            result = [dataIndex, j];
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
        body: this.getClient(e),
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
          this.eventHandler('window', 'mousemove', _jquery.default.proxy(this.pointMouseMove, this));
        }

        this.eventHandler('window', 'mouseup', _jquery.default.proxy(this.pointMouseUp, this));
      } else {
        this.eventHandler('window', 'mousemove', _jquery.default.proxy(this.backgroundMouseMove, this));
        this.eventHandler('window', 'mouseup', _jquery.default.proxy(this.backgroundMouseUp, this));
        this.startOffset.client = this.getCanvasClient(e);
        (0, _jquery.default)(this.dom.current).append('<div class="r-chart-select" style="position:absolute;left:' + this.startOffset.client.x + 'px;top:' + this.startOffset.client.y + 'px;background:rgba(100,100,100,.3);"></div>');
      }
    }
  }, {
    key: "pointMouseMove",
    value: function pointMouseMove(e) {
      var _this$getClient = this.getClient(e),
          x = _this$getClient.x,
          y = _this$getClient.y;

      var _this$props3 = this.props,
          data = _this$props3.data,
          changeStep = _this$props3.changeStep;
      var _this$d$this$mainAxis = this.d[this.mainAxis].labelSlider,
          start = _this$d$this$mainAxis.start,
          end = _this$d$this$mainAxis.end;
      var _this$startOffset = this.startOffset,
          body = _this$startOffset.body,
          selected = _this$startOffset.selected;
      var offset = {
        x: -this.getPercentByValue(x - body.x, 0, this.width),
        y: this.getPercentByValue(y - body.y, 0, this.height)
      };
      var changed = false;

      for (var i = 0; i < selected.length; i++) {
        var stream = selected[i].stream;
        var axis = selected[i][this.mainAxis];
        var value = axis - this.getValueByPercent(offset[this.mainAxis], 0, end - start);
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
      this.eventHandler('window', 'mousemove', this.pointMouseMove, 'unbind');
      this.eventHandler('window', 'mouseup', this.pointMouseUp, 'unbind');
      var point = this.getpoint(this.d.lines, this.mousePosition);
      var rect = this.getbar(this.d.rectangles, this.mousePosition);
      var item = point || rect || false;

      if (item && this.compaire(this.clickedItem, item)) {
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
        var _this$props$data$data9 = this.props.data[dataIndex].selectable,
            selectable = _this$props$data$data9 === void 0 ? true : _this$props$data$data9;

        if (!selectable) {
          continue;
        }

        for (var j = 0; j < points.length; j++) {
          var _points$j2 = _slicedToArray(points[j], 2),
              x = _points$j2[0],
              y = _points$j2[1];

          x = parseFloat(x);
          y = parseFloat(y);

          if (x < startx || x > endx) {
            continue;
          }

          if (y < starty || y > endy) {
            continue;
          }

          this.select(dataIndex, j);
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
      this.eventHandler('window', 'mousemove', this.backgroundMouseMove, 'unbind');
      this.eventHandler('window', 'mouseup', this.backgroundMouseUp, 'unbind');

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

      var _this$getClient2 = this.getClient(e),
          x = _this$getClient2.x,
          y = _this$getClient2.y;

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
      var data = this.props.data;
      var result = [];

      for (var i = 0; i < data.length; i++) {
        var _data$i$stream = data[i].stream,
            stream = _data$i$stream === void 0 ? [] : _data$i$stream;

        if (!this.state.open[i] || !stream.length) {
          continue;
        }

        var index = this.binarySearch(stream, this.mousePosition[this.secondAxis] * this.sign, function (a) {
          if (!a.center) {
            return false;
          }

          return a.center[_this2.secondAxis];
        }, 6);

        if (index === -1) {
          continue;
        }

        var s = data[i].stream[index];

        if (!s.center) {
          continue;
        }

        result.push({
          obj: s,
          color: data[i].color
        });
      }

      if (!result.length) {
        return;
      }

      var Chart = (0, _jquery.default)(this.dom.current);
      var _this$padding3 = this.padding,
          left = _this$padding3.left,
          bottom = _this$padding3.bottom;

      if (this.mainAxis === 'y') {
        var Left = left + result[0].obj.center.x * this.width / 100;
        var Bottom = bottom + 12 + parseFloat(this.mousePosition.y) * -this.height / 100;
      } else {
        var Left = 40 + left + parseFloat(this.mousePosition.x) * this.width / 100;
        var Bottom = bottom + result[0].obj.center.y * this.height / 100;
      }

      var ui = this.getDetailUI(Left, Bottom, result);
      Chart.append(ui);
    }
  }, {
    key: "getRange",
    value: function getRange(_ref3) {
      var min = _ref3.min,
          max = _ref3.max;
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
        step = 1 * i;
      }

      var start = Math.round(min / step) * step - step;
      var end = Math.round(max / step) * step + step;
      return {
        start: start,
        step: step,
        end: end
      };
    }
  }, {
    key: "getLimit",
    value: function getLimit(data) {
      var axisObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var axis = arguments.length > 2 ? arguments[2] : undefined;
      var labels = axisObj.labels;

      if (labels) {
        return false;
      }

      var min = Infinity,
          max = -Infinity;

      for (var i = 0; i < data.length; i++) {
        var _data$i$stream2 = data[i].stream,
            stream = _data$i$stream2 === void 0 ? [] : _data$i$stream2;

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

      return min === Infinity || max === -Infinity ? false : {
        min: min,
        max: max
      };
    }
  }, {
    key: "getIndex",
    value: function getIndex(array, searchMethod) {
      for (var i = 0; i < array.length; i++) {
        if (searchMethod(array[i])) {
          return i;
        }
      }

      return -1;
    }
  }, {
    key: "getDetailUI",
    value: function getDetailUI(left, bottom, arr) {
      return "<div class=\"r-chart-detail-container\" style=\"left:".concat(left + 'px', ";bottom:").concat(bottom + 'px', ";\">\n      <div class=\"r-chart-detail\">\n        ").concat(arr.map(function (ar) {
        var color = ar.color,
            obj = ar.obj;
        return "<div class=\"r-chart-detail-value\" style=\"color:".concat(color, ";\">").concat(obj.x, "</div>\n          <div class=\"r-chart-detail-value\">").concat(obj.y, "</div>");
      }).join(''), "\n      </div>\n    </div>");
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props4 = this.props,
          zoom = _this$props4.zoom,
          style = _this$props4.style,
          padding = _this$props4.padding,
          defaultPadding = _this$props4.defaultPadding,
          id = _this$props4.id,
          className = _this$props4.className,
          data = _this$props4.data,
          title = _this$props4.title;
      var _this$state2 = this.state,
          x = _this$state2.x,
          y = _this$state2.y;
      var zoomx = x.zoom;
      var zoomy = y.zoom;
      var _this$padding4 = this.padding,
          left = _this$padding4.left,
          top = _this$padding4.top,
          right = _this$padding4.right,
          bottom = _this$padding4.bottom;
      var d = this.updateData();
      this.d = d;
      var canvas = {
        mouseDown: function mouseDown(e) {
          _this3.mouseDown(e, d);
        },
        getSize: function getSize(w, h) {
          _this3.width = w;
          _this3.height = h;
        },
        mouseMove: function mouseMove(e, mousePosition) {
          _this3.mousePosition = {
            x: mousePosition[0] * 100 / _this3.width,
            y: mousePosition[1] * 100 / _this3.height,
            X: mousePosition[0],
            Y: mousePosition[1]
          };

          _this3.hover();
        },
        id: 'canvas',
        axisPosition: ['0%', '100%'],
        items: [d.x.grid || {}, d.y.grid || {}].concat(d.rectangles, d.lines, d.arcs, d.shadows),
        style: {
          width: "calc(100% - ".concat(left, "px - ").concat(right + 1, "px)"),
          height: "calc(100% - ".concat(bottom, "px - ").concat(top + 1, "px)"),
          right: "".concat(right, "px"),
          top: "".concat(top, "px"),
          borderLeft: x.borderColor !== false ? "1px solid ".concat(x.borderColor || '#000') : undefined,
          borderBottom: y.borderColor !== false ? "1px solid ".concat(y.borderColor || '#000') : undefined
        }
      };
      return _react.default.createElement(chartContext.Provider, {
        value: d
      }, _react.default.createElement("div", {
        className: "r-chart".concat(className ? ' ' + className : ''),
        id: id,
        style: _jquery.default.extend({}, {
          padding: 0,
          direction: 'ltr'
        }, style),
        ref: this.dom
      }, _react.default.createElement(RChartTitle, {
        title: title,
        padding: this.padding,
        data: data
      }), this.props.setting !== false && _react.default.createElement("div", {
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
      }), this.selected.length !== 0 && _react.default.createElement("div", {
        className: "r-chart-deselect-all",
        onClick: this.deselectAll.bind(this),
        style: {
          right: right + 'px',
          top: top + 'px'
        }
      }, "Deselect All"), d.x.labelSlider && x.show !== false && _react.default.createElement(_rRangeSlider.default, d.x.labelSlider), d.y.labelSlider && y.show !== false && _react.default.createElement(_rRangeSlider.default, d.y.labelSlider), zoomx && d.x.filterSlider && _react.default.createElement(_rRangeSlider.default, d.x.filterSlider), zoomy && d.y.filterSlider && _react.default.createElement(_rRangeSlider.default, d.y.filterSlider), _react.default.createElement(_rCanvas.default, canvas)));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var prevx = state.prevx,
          prevy = state.prevy;
      var _props$x = props.x,
          x = _props$x === void 0 ? {} : _props$x,
          _props$y = props.y,
          y = _props$y === void 0 ? {} : _props$y;
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

var RChartTitle = /*#__PURE__*/function (_Component2) {
  _inherits(RChartTitle, _Component2);

  function RChartTitle() {
    _classCallCheck(this, RChartTitle);

    return _possibleConstructorReturn(this, _getPrototypeOf(RChartTitle).apply(this, arguments));
  }

  _createClass(RChartTitle, [{
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          title = _this$props5.title,
          padding = _this$props5.padding,
          data = _this$props5.data;

      if (!title) {
        return '';
      }

      var left = padding.left,
          top = padding.top;
      var titleProps = {
        className: 'r-chart-title',
        style: _jquery.default.extend({}, title.style || {}, {
          height: top + 'px',
          width: "calc(100% - ".concat(left + 'px', ")"),
          justifyContent: title.moveTo ? undefined : 'center'
        })
      };
      return _react.default.createElement("marquee", _extends({
        ref: this.dom,
        scrollamount: title.speed ? 5 : 0
      }, titleProps, {
        direction: title.moveTo
      }), _react.default.createElement("table", {
        style: {}
      }, _react.default.createElement("tbody", null, _react.default.createElement("tr", null, _react.default.createElement("td", {
        style: {
          padding: '0 48px'
        }
      }, _react.default.createElement("strong", null, title.text || '')), data.map(function (d, i) {
        return _react.default.createElement("td", {
          key: i
        }, _react.default.createElement("div", {
          style: {
            height: top,
            display: 'flex',
            alignItems: 'center',
            float: 'left',
            margin: '0 6px',
            whiteSpace: 'nowrap'
          }
        }, _react.default.createElement("div", {
          style: {
            width: '12px',
            height: '12px',
            background: d.color,
            float: 'left',
            margin: '3px',
            borderRadius: '100%'
          }
        }), d.title || 'untitle'));
      })))));
    }
  }]);

  return RChartTitle;
}(_react.Component);

RChart.defaultProps = {
  filter: false,
  changeStep: 1,
  padding: {},
  data: []
};
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRange = getRange;
exports.getLimit = getLimit;
exports.getIndex = getIndex;
exports.getPosition = getPosition;
exports.getDetailUI = getDetailUI;

function getRange(_ref) {
  var min = _ref.min,
      max = _ref.max;
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

function getLimit(data) {
  var axisObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var axis = arguments.length > 2 ? arguments[2] : undefined;
  var labels = axisObj.labels;

  if (labels) {
    return false;
  }

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

  return min === Infinity || max === -Infinity ? false : {
    min: min,
    max: max
  };
}

function getIndex(array, result, field) {
  for (var i = 0; i < array.length; i++) {
    var m = array[i];

    if (field) {
      m = m[field];
    }

    if (m === result) {
      return i;
    }
  }

  return -1;
}

function getPosition(_ref2, value, bar) {
  var start = _ref2.start,
      end = _ref2.end,
      label = _ref2.label;

  if (value === undefined || value === null) {
    return false;
  }

  if (label.items) {
    //اگر لیبل آیتمز داشت یعنی محور آرایه ای وگر نه محور عددی است
    var index = getIndex(label.items, value, 'text');

    if (index === -1) {
      return false;
    }

    var position = (index + 0.5) * 100 / label.items.length;
    var center = position; //محور زیر بار فقط می تواند از نوع استرینگ باشد

    if (bar) {
      //در حالت بار مقدار زیر به موقعیت افزوده می شود
      var barCount = bar.barCount,
          barCounter = bar.barCounter,
          width = bar.width;
      position = center + width / 2 / barCount / label.items.length * (-barCount + 2 * barCounter);
    }

    return {
      position: position,
      center: center
    };
  }

  var position = (value - start) * 100 / (end - start);
  return {
    position: position,
    center: position
  };
}

function getDetailUI(left, bottom, arr) {
  return "<div class=\"r-chart-detail-container\" style=\"left:".concat(left + 'px', ";bottom:").concat(bottom + 'px', ";\">\n            <div class=\"r-chart-detail\">\n              ").concat(arr.map(function (ar) {
    var color = ar.color,
        obj = ar.obj;
    return "<div class=\"r-chart-detail-value\" style=\"color:".concat(color, ";\">").concat(obj.x, "</div>\n                <div class=\"r-chart-detail-value\">").concat(obj.y, "</div>");
  }).join(''), "\n            </div>\n          </div>");
}
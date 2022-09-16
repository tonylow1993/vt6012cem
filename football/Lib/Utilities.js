"use strict";

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Utilities = function() {
    function Utilities() {
        _classCallCheck(this, Utilities);
    }

    _createClass(Utilities, null, [{
        key: "sortInplayPool",
        value: function sortInplayPool(poolList) {
            try {
                var sortedPool = [];

                var defaultOrderStr = jsDefaultInplayAllOddsOrder.toUpperCase();

                if (!String.IsNullOrEmpty(defaultOrderStr)) {
                    var defaultOrders = defaultOrderStr.split(',');
                    var chpIndex = defaultOrders.indexOf("CHP");
                    if (chpIndex > -1) {
                        defaultOrders.splice(chpIndex, 1);
                        defaultOrders.push("CHP");
                    }

                    for (var i = 0; i < defaultOrders.length; i++) {
                        if (poolList.indexOf(defaultOrders[i]) >= 0) sortedPool.push(defaultOrders[i]);
                    }
                }

                return sortedPool;
            } catch (ex) {
                return "";
            }
        }
    }]);

    return Utilities;
}();

//# sourceURL=/football/lib/Utilities.js
//# sourceMappingURL=Utilities.js.map
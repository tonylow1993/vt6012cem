class Utilities {
  static sortInplayPool(poolList) {
    try{
        var sortedPool = [];

        var defaultOrderStr = jsDefaultInplayAllOddsOrder.toUpperCase();

        if (!String.IsNullOrEmpty(defaultOrderStr)) {
            var defaultOrders = defaultOrderStr.split(',');
            var chpIndex = defaultOrders.indexOf("CHP");
            if (chpIndex>-1) {
                defaultOrders.splice(chpIndex, 1);
                defaultOrders.push("CHP");
            }

            for(var i=0; i<defaultOrders.length; i++) {
                if (poolList.indexOf(defaultOrders[i])>=0)
                    sortedPool.push(defaultOrders[i]);
            }
        }

        return sortedPool;
    } catch(ex) {
        return "";
    }
  }
}

//# sourceURL=/football/lib/Utilities.js
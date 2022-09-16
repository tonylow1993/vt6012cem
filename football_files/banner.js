var BANNER = BANNER || {};
BANNER.Common = (function () {
    var translate_date_format = function (inDate) {
        // Sample 2019/12/08 17:00 -> 2019/12/08 17:00
        var str = inDate;
        str = str.replace("/01", "/1");
        str = str.replace("/02", "/2");
        str = str.replace("/03", "/3");
        str = str.replace("/04", "/4");
        str = str.replace("/05", "/5");
        str = str.replace("/06", "/6");
        str = str.replace("/07", "/7");
        str = str.replace("/08", "/8");
        str = str.replace("/09", "/9");

        str = str.replace("01:", "1:");
        str = str.replace("02:", "2:");
        str = str.replace("03:", "3:");
        str = str.replace("04:", "4:");
        str = str.replace("05:", "5:");
        str = str.replace("06:", "6:");
        str = str.replace("07:", "7:");
        str = str.replace("08:", "8:");
        str = str.replace("09:", "9:");
        str = str.replace("00:", "0:");

        str = str.replace(":01", ":1");
        str = str.replace(":02", ":2");
        str = str.replace(":03", ":3");
        str = str.replace(":04", ":4");
        str = str.replace(":05", ":5");
        str = str.replace(":06", ":6");
        str = str.replace(":07", ":7");
        str = str.replace(":08", ":8");
        str = str.replace(":09", ":9");
        str = str.replace(":00", ":0");
        return str;

    };

    var execFunc = function(functionName, context /*, args */) {
        var args = Array.prototype.slice.call(arguments, 2);
        var namespaces = functionName.split(".");
        var func = namespaces.pop();
        for (var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return context[func].apply(context, args);
    };

    var replaceAll = function (find, replace, str) {
        return str.replace(new RegExp(find, 'g'), replace);
    };

    var isScriptLoaded = function (url) {
        if (!url) return false;
        var scripts = document.getElementsByTagName('script');
        for (var i = scripts.length; i--;) {
            if (scripts[i].src == url) return true;
        }
        return false;
    };

    var openBetPage = function (theURL) {
        var a = document.createElement("a");
        a.href = theURL;
        a.style.display = "none";
        document.body.appendChild(a);
        console.log(a.pathname);
        document.body.removeChild(a);

        var urlObj = getAllUrlParams(theURL);
        console.log(urlObj);
        var lang = urlObj.lang.toUpperCase();
        var section = a.pathname.split("/");
        console.log(section[1]);
        console.log(section.slice(2).join("/").replace(".aspx", ""));
        //parent.switchTo('football', 'odds/odds_allodds', 'CH', {'tmatchid':'a6095cd1-cbda-4295-b93e-7f1001bcd611', 'b_cid':'BWFHTHC_1920FBC_SPAD1'});
        delete urlObj.lang;
        console.log(JSON.stringify(urlObj));
        switchTo(section[1], section.slice(2).join("/").replace(".aspx", ""), lang, urlObj);
    };

    var getAllUrlParams = function (url) {

        // get query string from url (optional) or window
        var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
        // we'll store the parameters here
        var obj = {};
        // if query string exists
        if (queryString) {
            // stuff after # is not part of query string, so get rid of it
            queryString = queryString.split('#')[0];
            // split our query string into its component parts
            var arr = queryString.split('&');
            for (var i = 0; i < arr.length; i++) {
                // separate the keys and the values
                var a = arr[i].split('=');
                // set parameter name and value (use 'true' if empty)
                var paramName = a[0];
                var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
                // (optional) keep case consistent
                paramName = paramName.toLowerCase();
                if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
                // if the paramName ends with square brackets, e.g. colors[] or colors[2]
                if (paramName.match(/\[(\d+)?\]$/)) {
                    // create key if it doesn't exist
                    var key = paramName.replace(/\[(\d+)?\]/, '');
                    if (!obj[key]) obj[key] = [];
                    // if it's an indexed array e.g. colors[2]
                    if (paramName.match(/\[\d+\]$/)) {
                        // get the index value and add the entry at the appropriate position
                        var index = /\[(\d+)\]/.exec(paramName)[1];
                        obj[key][index] = paramValue;
                    } else {
                        // otherwise add the value to the end of the array
                        obj[key].push(paramValue);
                    }
                } else {
                    // we're dealing with a string
                    if (!obj[paramName]) {
                        // if it doesn't exist, create property
                        obj[paramName] = paramValue;
                    } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                        // if property does exist and it's a string, convert it to an array
                        obj[paramName] = [obj[paramName]];
                        obj[paramName].push(paramValue);
                    } else {
                        // otherwise add the property
                        obj[paramName].push(paramValue);
                    }
                }
            }
        }

        return obj;
    };
    return {        
        execFunc: function (functionName, context, arg1) {
            return execFunc(functionName, context, arg1);
        }
        , isScriptLoaded: function (url) {
            return isScriptLoaded(url);
        }
        , translate_date_format: function (inDate) {
            return translate_date_format(inDate);
        }
        , openBetPage: function (theURL) {
            return openBetPage(theURL);
        }

    };
})();
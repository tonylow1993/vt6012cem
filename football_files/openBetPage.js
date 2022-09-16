function getDomain(str){
    var tmp;
    if (window.location.href.indexOf("https") >= 0) {
        tmp = str.substr(8);
    } else {
        tmp = str.substr(7);
    }
    SERVER_NAME = tmp.substr(0, tmp.indexOf("/"));
    return SERVER_NAME.substr(SERVER_NAME.indexOf(".")+1);
}

function rel2absPath(path){
	if(path.indexOf("/") == 0)
		return  window.location.protocol + "//" + window.location.host + path;
	else
		return path;
}

function openBetPage(theURL) {
    try {
        var tmp = theURL.split("?");
        var urlObj = getAllUrlParams('?' + tmp[1]);
        var l = urlObj.l;
        var c = urlObj.c;
        if (l.length > 0 && c.length > 0) {
            var b_cid = l + '_' + c;
            b_cid = b_cid.toUpperCase();
        }

        var a = document.createElement("a");
        a.href = urlObj.t;
        a.style.display = "none";
        document.body.appendChild(a);
        document.body.removeChild(a);

        var section = a.pathname.split("/");
        var JCBW_Section = section[1];
        var pathName = section.slice(2).join("/").replace(".aspx", "");

        if (tmp[2] !== undefined) {
            var paraObj = getAllUrlParams('?' + tmp[2]);
            var lang = paraObj.lang.toUpperCase();
            delete paraObj.lang;
            if (b_cid !== undefined) {
                paraObj["b_cid"] = b_cid;
            }
        } else {
            if (b_cid !== undefined) {
                var paraObj = {};
                paraObj["b_cid"] = b_cid;
            }
        }
        

        // Handle home 
        if (JCBW_Section == 'index.aspx') {
            pathName = JCBW_Section.replace(".aspx", "");
            JCBW_Section = 'home';
        }

		if ( JCBW_Section == 'index.aspx'){
			pathName = JCBW_Section.replace(".aspx", "");
			JCBW_Section = 'home';
		}
		
		if( JCBW_Section != 'home' && JCBW_Section != 'racing'  && JCBW_Section != 'football' && JCBW_Section != 'marksix'){
			window.open(theURL);
		}else{
			if(lang == 'EN' || lang == 'CH'){
				if(Object.keys(paraObj).length > 0){
					parent.switchTo(JCBW_Section,pathName, lang , paraObj );
				}else{
					parent.switchTo(JCBW_Section,pathName , lang);
				}
			}else{
				window.open(theURL);
			}
		}
    } catch (err) {
        window.open(theURL);
    }
}

function getAllUrlParams(url) {

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
      //paramName = paramName.toLowerCase();
      //if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

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
        } else if (obj[paramName] && typeof obj[paramName] === 'string'){
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
}
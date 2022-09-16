// HKJC Start
var sdceo_now="";
var sdceo_banner_domain="";
var sdceo_sys_currentTimeURL = "";
var sdceo_sys_is_map_hkjc_common_domain=false;
var currentDomain = window.location.hostname.toLowerCase();
var wafKeyword = "must be enabled in order to view this page.";
var wafKeyword2 = "GenericErrorMessage";

	
if(sdceo_sys_hkjc_common_domain_map.indexOf("|" + currentDomain + "|") >= 0) {
	sdceo_sys_is_map_hkjc_common_domain=true;
} else {
	sdceo_sys_is_map_hkjc_common_domain=false;
}

// HKJC Start
function sdceo_hkjc_getCurrentTimeURL() {
	var sdceo_tmp_currentTimeURL="";
	
	if (sdceo_sys_is_map_hkjc_common_domain) {
		sdceo_tmp_currentTimeURL=sdceo_sys_hkjc_common_domain+sdceo_sys_hkjc_time_url;
	} else {
		sdceo_tmp_currentTimeURL=sdceo_sys_hkjc_time_url;
	}
	
	if(sdceo_sys_debug) {console.log("[sdceo_hkjc_getCurrentTimeURL] sdceo_tmp_currentTimeURL=["+sdceo_tmp_currentTimeURL+"]");}
	return sdceo_tmp_currentTimeURL;
	
}

function sdceo_hkjc_parseDate(hkjcDate) {
	if (hkjcDate.indexOf && (hkjcDate.indexOf(wafKeyword) >= 0 || hkjcDate.indexOf(wafKeyword2) >= 0)) {
		//for WAF
		var date = new Date();
		var currentTimeString = date.getFullYear() + 
							sdceo_util_pad2(date.getMonth() + 1) + 
							sdceo_util_pad2(date.getDate()) + 
							sdceo_util_pad2(date.getHours()) + 
							sdceo_util_pad2(date.getMinutes());
		
		return currentTimeString;
				
	} else {
		return hkjcDate;	
	}
}
// HKJC End

function sdceo_util_pad2(n) { return n < 10 ? '0' + n : n }

function sdceo_util_getRequestReponse(reqURL){
	return sdceo_util_getRequestReponseWithRetry(reqURL, 1);//setup would try once again
}

function sdceo_util_getRequestReponseWithRetry(reqURL, retryCount){
	var date = new Date();
	var tmpReqURL="";
	var ajaxReturn = "";
	var retryCountMax=2;
	var retrySleepSecond=1;
	
	var tmpTimeString = date.getFullYear() + 
					    sdceo_util_pad2(date.getMonth() + 1) + 
					    sdceo_util_pad2(date.getDate()) + 
					    sdceo_util_pad2(date.getHours()) + 
					    sdceo_util_pad2(date.getMinutes()) + 
					    sdceo_util_pad2(date.getSeconds());
	
	var idxParam = reqURL.indexOf("?");
	if (idxParam>=0) {
		tmpReqURL=reqURL+"&REQ_"+tmpTimeString;
	} else {
		tmpReqURL=reqURL+"?REQ_"+tmpTimeString;
	}
	
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET",tmpReqURL,false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseText;
	try{
		if(xmlDoc!=null) {
			if (xmlDoc.indexOf && (xmlDoc.indexOf(wafKeyword) >= 0 || xmlDoc.indexOf(wafKeyword2) >= 0) && retryCount<retryCountMax) {
//			if (true && retryCount<retryCountMax) {
				sdceo_createDynamicIFrame();
				sdceo_sleep(retrySleepSecond*1000);
				return sdceo_util_getRequestReponseWithRetry(reqURL, ++retryCount);
			} else {
				return xmlDoc;
			}
		} else {
			return "";
		}
	} catch (err) {
		if (sdceo_sys_debug) { console.log('Cannot retrieve header xml!'); }
	}
}

function sdceo_createDynamicIFrame() {
	try{
		if(document.getElementById("sdceo_sys_iframe") == null) {
			var dyIframeElement = document.createElement("iframe");
			dyIframeElement.setAttribute("id", "sdceo_sys_iframe");
			dyIframeElement.setAttribute("style", "display:none;");
			dyIframeElement.setAttribute("frameborder", "0");
			dyIframeElement.setAttribute("src", "/bannerad/reload.aspx?a=" + (new Date().getTime()));
			document.body.appendChild(dyIframeElement);
		} else {
			document.getElementById("sdceo_sys_iframe").remove();
			var dyIframeElement = document.createElement("iframe");
			dyIframeElement.setAttribute("id", "sdceo_sys_iframe");
			dyIframeElement.setAttribute("style", "display:none;");
			dyIframeElement.setAttribute("frameborder", "0");
			dyIframeElement.setAttribute("src", "/bannerad/reload.aspx?a=" + (new Date().getTime()));
			document.body.appendChild(dyIframeElement);
		}
	} catch (err) {
		if (sdceo_sys_debug) { console.log('create iframe sdceo_system_iframe error!'); }
	}
}

function sdceo_sleep(milliseconds) { 
	var start = new Date().getTime(); 
	while(1) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}

function sdceo_normalize_obj_date(inString){
	var returnString=_sdceo_sys_replaceAll(inString,":","");
	returnString=_sdceo_sys_replaceAll(returnString," ","");
	returnString=_sdceo_sys_replaceAll(returnString,"/","");
	return returnString;
}

function sdceo_isDateValid(obj) {
	currentTime=sdceo_util_getNow();
	var objStartTime=sdceo_normalize_obj_date(obj.onlineTime);
	var objEndTime=sdceo_normalize_obj_date(obj.offlineTime);
	if(sdceo_sys_debug) {console.log("[sdceo_isDateValid] currentTime=["+currentTime+"] objStartTime=["+objStartTime+"] objEndTime=["+objEndTime+"]");}
	
	
	
	if (typeof sdceo_sys_is_preview != "undefined" && sdceo_sys_is_preview) {
		// for preview, only check end date
	if(sdceo_sys_debug) {console.log("[sdceo_isDateValid] for preview");}
		if (currentTime <= objEndTime) {
			return true;
		} else {
			return false;	
		}
	} else {
		if (currentTime >= objStartTime && currentTime <= objEndTime) {
			return true;
		} else {
			return false;	
		}
	}
	
}

function sdceo_util_getNow() {
	if(sdceo_sys_debug) { console.log("[sdceo_util_getNow] start"); }
	if (typeof sdceo_now == 'undefined' || sdceo_now=="") {
		var currentTime=sdceo_util_getRequestReponse(sdceo_hkjc_getCurrentTimeURL());
		if(sdceo_sys_debug) { console.log("[sdceo_util_getNow] currentTime=["+currentTime+"]"); }
		sdceo_now=sdceo_hkjc_parseDate(currentTime);
		return sdceo_now;
	} else {	
		return sdceo_now;
	}
}


function _sdceo_sys_replaceAll(inString, fromString, toString) {
	var tmpString=inString;
	while(tmpString.indexOf(fromString) > -1) {
		tmpString = tmpString.replace(fromString,toString);
	}
	return tmpString;

}


function sdceo_sys_array2delimited(arr, delimitor) {
	if (arr == null || arr.length == 0) {
		return '';
	}
	var i;
	var result = '';
	for (i=0; i<arr.length; i++) {
		if (i > 0) {
			result += delimitor;
		}
		result = result + arr[i];
	}
	return result;
}

function sdceo_util_getRandom(min,max)
{
	min = Math.ceil(min);
	max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inc
//    return Math.floor(Math.random()*(max-min+1)+min);
}

function sdceo_util_getNOutOfM(n,dataObject,dataObjectReturn,zoneId) {
	return sdceo_util_getNOutOfMWithPriority(n,dataObject,dataObjectReturn, "",zoneId);
}

function i_sdceo_util_getTotalWeight(dataObject) {
	var count = dataObject.BannerAdList.length;		
	var totalWeight=0;
	
	for (var i=0;i<count; i++){
		if(typeof dataObject.BannerAdList[i] == 'undefined') 
			continue;
		totalWeight += dataObject.BannerAdList[i].weight;
		//console.log("[i_sdceo_util_getTotalWeight] i=["+i+"] weight=["+dataObject.BannerAdList[i].weight+"] totalWeight=["+totalWeight+"]");
	}
	
	return totalWeight;
}



function sdceo_util_getNOutOfMWithPriority(n,dataObject,dataObjectReturn,priorityFilterJsList,zoneId)
{
	//console.log("[sdceo_util_getNOutOfMWithPriority] n=["+n+"]");
	
	var j_idx_start = dataObject.BannerAdList.length;		
	var i_idx_start = dataObjectReturn.BannerAdList.length;
	//console.log("start loop with i_idx_start="+i_idx_start);
	for (var i=i_idx_start; i<n; i++) {
		var displayIndex = sdceo_util_getDisplayObject(dataObject);
		//console.log("[sdceo_util_getNOutOfMWithPriority] displayIndex=["+displayIndex+"]");
		if (displayIndex>=0) {
			//returnObjectArray.push(dataObject[displayIndex]);
			dataObjectReturn['BannerAdList'].push(dataObject.BannerAdList[displayIndex]);
			dataObject.BannerAdList.splice(displayIndex,1);
		}
	}
	// display return object

	for (var i=0; i<dataObjectReturn.BannerAdList.length; i++) {
		//add tracking code
		if (dataObjectReturn.BannerAdList[i].url!="") {
			if (dataObjectReturn.BannerAdList[i].url.indexOf("javascript")<0) {
				
				var b_cid_para =  "b_cid="+zoneId+"_"+dataObjectReturn.BannerAdList[i].creativeID;
				//Original url INclude parameters
				if (dataObjectReturn.BannerAdList[i].url.indexOf("?")>=0) {
					if (dataObjectReturn.BannerAdList[i].url.indexOf("#")>=0) {
						var urlList = dataObjectReturn.BannerAdList[i].url.split("?");
						var urlList2 = urlList[1].split("#");
						dataObjectReturn.BannerAdList[i].url = urlList[0] +"?" + urlList2[0] +"&" + b_cid_para +"#"+ urlList2[1];
					} else {
						var urlList = dataObjectReturn.BannerAdList[i].url.split("?");
						if(urlList[1]!="") {
							dataObjectReturn.BannerAdList[i].url = urlList[0] +"?" + urlList[1] +"&"+ b_cid_para;
						} else {
							dataObjectReturn.BannerAdList[i].url = urlList[0] +"?" + b_cid_para;
						}
					}
				} else if (dataObjectReturn.BannerAdList[i].url.indexOf("#")>=0) {
					if(!dataObjectReturn.BannerAdList[i].url.indexOf("#")==0) {
						var urlList = dataObjectReturn.BannerAdList[i].url.split("#");
						dataObjectReturn.BannerAdList[i].url = urlList[0] +"?" + b_cid_para +"#"+ urlList[1];
					}
				} else { //Original url EXclude parameters
					dataObjectReturn.BannerAdList[i].url +="?" + b_cid_para;
				}
			}
		}
		//console.log("[sdceo_util_getNOutOfMWithPriority] dataObjectReturn i=["+i+"] Id="+dataObjectReturn.BannerAdList[i].creativeID+" url="+dataObjectReturn.BannerAdList[i].url);
	}
	return dataObjectReturn;
}

function sdceo_util_getURLParameterValue(paramName)
{
    var sURL = window.document.URL.toString();
    if (sURL.indexOf("?") > 0)
    {
        var arrParams = sURL.split("?");
        var arrURLParams = arrParams[1].split("&");
        var arrParamNames = new Array(arrURLParams.length);
        var arrParamValues = new Array(arrURLParams.length);

        var i = 0;
        for (i = 0; i<arrURLParams.length; i++)
        {
            var sParam =  arrURLParams[i].split("=");
            arrParamNames[i] = sParam[0];
            if (sParam[1] != "")
                arrParamValues[i] = unescape(sParam[1]);
            else
                arrParamValues[i] = "No Value";
        }

        for (i=0; i<arrURLParams.length; i++)
        {
            if (arrParamNames[i] == paramName)
            {
                //alert("Parameter:" + arrParamValues[i]);
                return arrParamValues[i];
            }
        }
        return "";
    }
}

function sdceo_track_request(creativeId) {
	// tracking with Request
	//console.log("[sdceo_track_request] creativeId=["+creativeId+"]");
	var xhttp = new XMLHttpRequest();
	//console.log("[sdceo_track_request] url=["+_sdceo_sys_getTrackRequestUrl(creativeId)+"]");
	xhttp.open('GET', _sdceo_sys_getTrackRequestUrl(creativeId), true);
	xhttp.send();
	//console.log("[sdceo_track_request] end");
}

function _sdceo_sys_getTrackRequestUrl(creativeId) {
	//TODO
	return "";
	//return sdceo_sys_requestUrl.replace('{clientId}',sdceo_sys_clientId).replace('{creativeId}',creativeId);
}
// HKJC End


function sd_logDecision(ruleName, pageId, resourceId, isSmartDecision) {
	var dec = new Object();
	dec['clientId'] = sd_clientId;
	dec['ruleName'] = ruleName;
	dec['pageId'] = pageId;
	dec['resourceId'] = resourceId;
	dec['smartDecision'] = isSmartDecision;
	
	var xhttp = new XMLHttpRequest();
	xhttp.open('POST', _sdceo_sys_getLogDecisionUrl(), true);
	//console.log("ruleName="+ruleName);
	//console.log("pageId="+pageId);
	//console.log("resourceId="+resourceId);
	//console.log("isSmartDecision="+isSmartDecision);
	//console.log("JSON="+JSON.stringify(dec));
	//console.log(JSON.stringify(dec));
	xhttp.send(JSON.stringify(dec));
	
}





function _sdceo_sys_getSampleSizeUrl(ruleName) {
	return sdceo_sys_getSampleSizeUrl.replace('{clientId}',sdceo_sys_clientId).replace('{ruleName}',ruleName);
}

function _sdceo_sys_getSmartDecisionUrl(pageId) {
	////console.log("[_sdceo_sys_getSmartDecisionUrl(pageId)] start");
	return sdceo_sys_smartDecisionUrl.replace('{clientId}',sdceo_sys_clientId).replace('{ruleName}','decision').replace('{pageId}',pageId);
}


function _sdceo_sys_getCampsignListUrl() {
	return sdceo_sys_campaignListUrl.replace('{clientId}',sdceo_sys_clientId);
}

function _sdceo_sys_getLogDecisionUrl() {
	return sdceo_sys_logDecisionUrl;
}


// add a function here to store cookie only
function sdceo_sys_storeTokens(ruleName, tokenArr) {
	// read sampleSize from server
	var getSampleSizeUrl = _sdceo_sys_getSampleSizeUrl(ruleName);
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', getSampleSizeUrl, false); // sync
	xhttp.setRequestHeader('Pragma', 'no-cache');
	xhttp.setRequestHeader('Cache-Control', 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
	xhttp.setRequestHeader('Expires', '0');
	xhttp.send();
	var sampleSize = xhttp.responseText;
	
	//alert('sampleSize = ' + sampleSize);
	
	// read cookie the previous history, prepare for new history
	var newTokenHistArr = [];
	var tokenHistStr = sdceo_util_readCookie(sdceo_sys_tokenHistCookieName + '_' + ruleName);
	var tokenHistArr = [];
	if (!(tokenHistStr == null || tokenHistStr == '')) {
		tokenHistArr = tokenHistStr.split('|');
		if (tokenHistArr.length >= sampleSize) {
			var i;
			for (i=1; i<tokenHistArr.length; i++) {
				newTokenHistArr[i-1] = tokenHistArr[i];
			}
			//add new tokens to the end
			newTokenHistArr[sampleSize-1] = sdceo_sys_array2delimited(tokenArr, '^');
		} else {
			var i;
			for (i=0; i<tokenHistArr.length; i++) {
				newTokenHistArr[i] = tokenHistArr[i];
			}
			//add new tokens to the end
			newTokenHistArr[newTokenHistArr.length] = sdceo_sys_array2delimited(tokenArr, '^');
		}
	} else {
		newTokenHistArr[0] = sdceo_sys_array2delimited(tokenArr, '^');
	}
	
	// store new history in cookie
	sdceo_util_setCookie(sdceo_sys_tokenHistCookieName + '_' + ruleName, sdceo_sys_array2delimited(newTokenHistArr,'|'));
	
	return newTokenHistArr;
}

function sdceo_sys_getSmartDecisionWithTokens(ruleName, pageId, tokenArr, callbackFn) {
	var newTokenHistArr = sdceo_sys_storeTokens(ruleName, tokenArr);
	
	// work out the token counts
	var dict = {};
	var j;
	for (j=0; j<newTokenHistArr.length; j++) {
		var tokenHist = newTokenHistArr[j];
		var singleTokenHistArr = tokenHist.split('^');
		var k;
		for (k=0; k<singleTokenHistArr.length; k++) {
			if (!(singleTokenHistArr[k] in dict)) {
				dict[singleTokenHistArr[k]] = 1;
			} else {
				dict[singleTokenHistArr[k]] = dict[singleTokenHistArr[k]] + 1;
			}
		}
	}
	
	// send smartdecision request with additional query string
	var queryStr = '';
	for (key in dict) {
		if (queryStr == '') {
			queryStr += key + '^' + dict[key];
		} else {
			queryStr += '|' + key + '^' + dict[key];
		}
	}
	if (!(queryStr == '')) {
		queryStr = 'tokens=' + queryStr;
	}
	sd_getSmartDecision(ruleName, pageId, queryStr, callbackFn);
}


//function sdceo_sys_getSmartDecisionCampaignList(ruleName, pageId, queryStr, callbackFn) {
function sdceo_sys_getSmartDecisionCampaignList(callbackFn) {
	var restfulUrl = _sdceo_sys_getCampsignListUrl();
	restfulUrl = encodeURI(restfulUrl);
	
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', restfulUrl, true);
	xhttp.setRequestHeader('Pragma', 'no-cache');
	xhttp.setRequestHeader('Cache-Control', 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
	xhttp.setRequestHeader('Expires', '0');
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
//			//console.log("[sd_getSmartDecision] responseText="+xhttp.responseText);
			callbackFn(JSON.parse(xhttp.responseText));
		}
	}
	xhttp.send();
}


function sdceo_util_getDisplayObject(dataObject){
	
	var totalWeight = i_sdceo_util_getTotalWeight(dataObject);
	
	var count = dataObject.BannerAdList.length;		
	var remainWeight = sdceo_util_getRandom(0,totalWeight);
	
	for (var i=0;i<count; i++){
		if(typeof dataObject.BannerAdList[i] == 'undefined') 
			continue;
		 remainWeight = remainWeight-dataObject.BannerAdList[i].weight;
		 if (remainWeight<0) {
			 return i;
		 }
	}
	
	return -1;
}

function sd_getSmartDecision(pageId, callbackFn) {
	var restfulUrl = _sdceo_sys_getSmartDecisionUrl(pageId);
	
	//add timestamp as parameter
	if (restfulUrl.indexOf("?")>0) {
		restfulUrl += '&ts=' + sdceo_util_getNow();
	} else {
		restfulUrl += '?ts=' + sdceo_util_getNow();
	}
	restfulUrl = encodeURI(restfulUrl);
	
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', restfulUrl, true);
	xhttp.setRequestHeader('Pragma', 'no-cache');
	xhttp.setRequestHeader('Cache-Control', 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
	xhttp.setRequestHeader('Expires', '0');
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			callbackFn(JSON.parse(xhttp.responseText));
		}
	}
	xhttp.send();
}

function sd_logDecision(ruleName, pageId, resourceId, isSmartDecision) {
	var dec = new Object();
	dec['clientId'] = sd_clientId;
	dec['ruleName'] = ruleName;
	dec['pageId'] = pageId;
	dec['resourceId'] = resourceId;
	dec['smartDecision'] = isSmartDecision;
	
	var xhttp = new XMLHttpRequest();
	xhttp.open('POST', _sdceo_sys_getLogDecisionUrl(), true);
	//console.log("ruleName="+ruleName);
	//console.log("pageId="+pageId);
	//console.log("resourceId="+resourceId);
	//console.log("isSmartDecision="+isSmartDecision);
	//console.log("JSON="+JSON.stringify(dec));
	//console.log(JSON.stringify(dec));
	xhttp.send(JSON.stringify(dec));
	
}

function sd_logDecisionFollowURL(ruleName, pageId, resourceId, isSmartDecision, resourceUrl) {
	var dec = new Object();
	dec['clientId'] = sd_clientId;
	dec['ruleName'] = ruleName;
	dec['pageId'] = pageId;
	dec['resourceId'] = resourceId;
	dec['smartDecision'] = isSmartDecision;
	
	var xhttp = new XMLHttpRequest();
	xhttp.open('POST', _sdceo_sys_getLogDecisionUrl(), true);
	//console.log("ruleName="+ruleName);
	//console.log("pageId="+pageId);
	//console.log("resourceId="+resourceId);
	//console.log("isSmartDecision="+isSmartDecision);
	//console.log("JSON="+JSON.stringify(dec));
	//console.log(JSON.stringify(dec));

	
	sdceo_track_decisionFollowURLCtr(ruleName, pageId, resourceId, isSmartDecision, resourceUrl);
	
	xhttp.onreadystatechange = function () {
		window.location=resourceUrl;
		
/*	  if(xhttp.readyState === 4 && xhttp.status === 200) {
		window.location=resourceUrl;
	  } else {
		window.location=resourceUrl;
	  }
*/	  
	};
	//sd_logCtr(pageId, "zone1", 'on_click');
	xhttp.send(JSON.stringify(dec));
}

function sdceo_getRandomObj(numOfAd, zoneBannerObj, zoneId)
{
	var zoneBannerObjActive = JSON.parse('{"BannerAdList":[]}');
	var zoneBannerObjReturn = JSON.parse('{"BannerAdList":[]}');

	for(var i=0; i<zoneBannerObj.BannerAdList.length; i++)
	{
		if(sdceo_isDateValid(zoneBannerObj.BannerAdList[i]))
		{
			zoneBannerObjActive['BannerAdList'].push(zoneBannerObj.BannerAdList[i]);
		}  	
	}
	
	zoneBannerObjReturn = sdceo_util_getNOutOfM(numOfAd, zoneBannerObjActive,zoneBannerObjReturn, zoneId);
	
	sdceo_track_request(zoneBannerObjReturn.BannerAdList[0].creativeID);
	
	return zoneBannerObjReturn;
}

(function addElement() { 
  var newStyle = document.createElement("style"); 
  var newContent = document.createTextNode(".preview-highlight{border: 5px red dashed !important; margin: -5px !important;}"); 
  newStyle.appendChild(newContent);
  document.head.appendChild(newStyle);
})();

(function showPreviewHighlight() {
	if(typeof sdceo_sys_is_preview != "undefined" && sdceo_sys_is_preview)
		previewHighlight();
})();

function previewHighlight() {
	var zone = getUrlParameter('zone');
	//console.log(zone);
	
	var getZoneIntervalID = window.setInterval(function() {
		var el = document.getElementsByClassName("sdceo_sys_bannerad_highlight_"+zone);
		
		var zoneCount = 1;
		var scrollToItem = 0;
		switch(zone) {
			case 'EWHPSL1E':
			case 'EWHPSL1C':
				zoneCount = 2;
				if(document.body.clientWidth < 751)
					scrollToItem = 1;
				break;
			case 'EWREHL1E':
			case 'EWREHL2E':
			case 'EWREHL3E':
			case 'EWREHL4E':
			case 'EWREHL1C':
			case 'EWREHL2C':
			case 'EWREHL3C':
			case 'EWREHL4C':
				zoneCount = 2;
				if(document.body.clientWidth >= 751)
					scrollToItem = 1;
				break;
			case 'EWRESR1E':
			case 'EWRESR1C':
			case 'EWRESR2E':
			case 'EWRESR2C':
				zoneCount = 2;
				if(document.body.clientWidth > 974 || document.body.clientWidth < 751)
					scrollToItem = 1;
				break;
		}
		for(var i=0; i<el.length; i++) {
			addClassFunction(el[i], "preview-highlight");
			if(i == (zoneCount-1)) {
				setTimeout(function() {
					//console.log(getPosition(el[0]).y)
					//console.log(getPosition(el[1]).y)
					window.scrollTo(0, getPosition(el[scrollToItem]).y);
				}, 1000);
				window.clearInterval(getZoneIntervalID);
			}	
		}
	}, 200);
}

function addClassFunction(el, className) {
	var arr;
	arr = el.className.split(" ");
	if (arr.indexOf(className) == -1) {
		el.className += " " + className;
	}
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function openNewWindow(url, target, parameter){
	if(url==""||url==null)
	 return;
	if(url.indexOf("javascript:") !== -1)
	{
		var javaFunc = url.split("javascript:")
		window.eval(javaFunc[1]);
	}
	else if(typeof parameter == "undefined" || parameter=='' || parameter==null) {
		if(target=="New Window")
			window.open(url,"_blank");
		else if (target=="Same Window")
			window.open(url,"_top");
		else
			window.open(url,target);
		}
		else{
			if(target=="New Window")
				window.open(url,"_blank",parameter);
			else if (target=="Same Window")
				window.open(url,"_top",parameter);
			else
				window.open(url,target,parameter);
		}
}

function getPosition(el) {
	var x = 0;
	var y = 0;

	while (el) {
		x += el.offsetLeft - el.scrollLeft + el.clientLeft;
		y += el.offsetTop - el.scrollTop + el.clientTop;
		el = el.offsetParent;
	}
	
	return { x: x-5, y: y-5 };
}
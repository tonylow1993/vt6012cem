var refreshTableInterval;
var ilcInterval;
var allowOddsPush = false;

function clearAllInterval() {
    clearInterval(refreshTableInterval);
	refreshTableInterval = null;
	clearInterval(ilcInterval);
	ilcInterval = null;
}

function setRefreshInterval() {
	switch (curProduct) {
		case 'football':
			if(!isResultPage() && pageName!="FOCUSMATCH" && pageName!="INDEX_HAD" && pageName!="SCHEDULE" && pageName!="PRE_SCHEDULE") {
				if (refreshTableInterval == null) {
					var refreshInterval = (pageName=="INPLAYALL" || pageName=="INPLAYHAD" ? inplayRefreshInterval : autoRefreshInterval);
					refreshTableInterval = setInterval(function() {renderAllTable(false);}, refreshInterval * 1000);
				}
			}
			break;
		case 'racing':
		    autoRefreshRacing();
		    if ( (curRaceNo > mtgRanRace) 
				|| (pageName=='XPOOL' && !isLastRaceRan) 
			    || pageName=='JKC' || pageName=='TNC' ) {
				if (refreshTableInterval == null) {
					refreshTableInterval = setInterval(function() {autoRefreshRacing(false);}, jsonReloadRate);
				}
			}
			break;
	}
}


// odds push common function
var pushPage;
var engineRef = null;
var oddsPushStatus="poll";
var pushASStatus=1;
var pushJsonSchema = '';
var schemas_array = new Array();

function onEngineReady(lsEngine) {
    // store the engine reference
    engineRef = lsEngine;
    if (pushASStatus == 1 && engineRef) {
        engineRef.changeStatus("STREAMING");
    }
}

function onEngineLost() {
    engineRef = null;
}


var AMS = {
    hasConnected: false,
	hasStartedPush: false,
    connect: function() {
        oddsPushStatus = "push";
		initPushEngine();
		this.hasConnected = true;
    },
    disconnect: function() {
        oddsPushStatus = "poll";
	    if ( engineRef!=null ) {
			engineRef.changeStatus("DISCONNECTED");
		}
        this.hasConnected = false;
		this.hasStartedPush = false;
    }
}

function initPushEngine() {
	if ( pushPage==null ) {
		pushPage = initializePushPage("/info/include/js/commons/custom/", oddsPushIconDisplay, onEngineReady, onEngineLost);
		initializeEngine(pushPage, "/info/include/js/commons/lightstreamer/", null, null);
	}
	else {
		if ( engineRef!=null ) {
			engineRef.changeStatus("STREAMING");
		}
	}
}

function logonDetectForOddsPush() {
    // check login recusively
	setInterval(function() {
		switch (curProduct) {
			case 'racing':
				logonDetectForRacingOddsPush();
				break;
			case 'football':
				logonDetectForFootballOddsPush();
				break;
			case 'marksix' :
			case 'landing' :
				AMS.disconnect();
				break;
		}
	}, 5000);
}

function isRacingCurrentOdds() {
    if ($("#oddsDataDropDown").length > 0)
        return $("#oddsDataDropDown").val() == "";
    return true;
}

function logonDetectForRacingOddsPush() {
	if (pageName == "RACECARD" || pageName == "RES_DIV") {
		AMS.disconnect();
		return;
	}

	if (!AMS.hasConnected && isLogon() && isRacingCurrentOdds() && allowOddsPush) {
        AMS.connect();
	}
	isConnectedAMS = oddsPushStatus=="push" && pushASStatus == 1;
	if (isConnectedAMS && !AMS.hasStartedPush) {
		setTimeout(function () {
			executeAutoRefreshByPush(resetPushSchemaRS);
		}, 1000);
		AMS.hasStartedPush = true;
	}
	if (!isLogon()) {
	    //stop the odds push
		AMS.disconnect();
	}
}

function logonDetectForFootballOddsPush() {
	// for all up, odds push enable after match selection
	// no odds push for below pages
	if (pageName == "MIXALLUPLIST" || pageName.indexOf('SCHEDULE')>=0 || pageName.indexOf('RESULT')>=0 ) {
		AMS.disconnect();
		return;
	}

	if (!AMS.hasConnected && allowOddsPush && isLogon()) {
		AMS.connect();
	}
	isConnectedAMS = oddsPushStatus=="push" && pushASStatus == 1;
	if (isConnectedAMS && !AMS.hasStartedPush) {
		setTimeout(function () {
			executeAutoRefreshByPush(resetPushSchema);
		}, 1000);
		AMS.hasStartedPush = true;
	}
	if (!isLogon() || !allowOddsPush) {
	    //stop the odds push
		AMS.disconnect();
	}
}

function executeAutoRefreshByPush(func) {
    func();
    autoSwitchToPoolingMode();
}
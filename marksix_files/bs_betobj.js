var hrTemplate = { 
	SINGLE: {
		betLinePre: "{venueid} {dayid} ",
		betLine1: "{poolid} {raceno}*",
		betLine2: "{combid}",
		betLine1Ref: "{poolid} {raceno}*",
		betLine2Ref: "{combid}",
		shortLine1E: "{poolShortE} Race {raceno}",
		shortLine1C: "{poolShortC} 第{raceno}場",
		shortLine2E: "",
		shortLine2C: "",
		longLinePreE: "",
		longLinePreC: "",
		longLine1E: "<div>{venueE} {dayE}<br/>Race {raceno} {poolLongE}</div>",
		longLine2E: "<div style=\"padding-left:32px\">{combid} {combLongE}</div>",
		longLine1C: "<div>{venueC} {dayC}<br/>第{raceno}場 {poolLongC}</div>",
		longLine2C: "<div style=\"padding-left:32px\">{combid} {combLongC}</div>",
		longLinePostE: "<div>{ranGenLongE}</div>",
		longLinePostC: "<div>{ranGenLongC}</div>"
	},
	MULTI: {
		betLinePre: "{venueid} {dayid} {poolid} {raceno}*",
		betLine1: "",
		betLine2: "{combid}",
		betLine1Ref: "",
		betLine2Ref: "{combid}",
		shortLine1E: "{poolShortE} Race {raceno}",
		shortLine1C: "{poolShortC} 第{raceno}場",
		shortLine2E: "",
		shortLine2C: "",
		longLinePreE: "<div>{venueE} {dayE}<br/>{poolLongE}</div>",
		longLinePreC: "<div>{venueC} {dayC}<br/>{poolLongC}</div>",
		longLine1E: "<div>Race {raceno}</div>",
		longLine2E: "<div style=\"padding-left:32px\">{combid} {combLongE}</div>",
		longLine1C: "<div>第{raceno}場</div>",
		longLine2C: "<div style=\"padding-left:32px\">{combid} {combLongC}</div>",
		longLinePostE: "<div>{ranGenLongE}</div>",
		longLinePostC: "<div>{ranGenLongC}</div>"
	},
	ALUP: {
		betLinePre: "{venueid} {dayid} ALUP {formula}/",
		betLine1: "{poolid} {raceno}*",
		betLine2: "{combid}",
		betLine1Ref: "{poolid} {raceno}*",
		betLine2Ref: "{combid}",
		shortLine1E: "Racing All Up {formula}",
		shortLine1C: "賽馬過關 {formula}",
		shortLine2E: "",
		shortLine2C: "",
		longLinePreE: "<div>{venueE} {dayE}<br/>Racing All Up {formula}</div>",
		longLinePreC: "<div>{venueC} {dayC}<br/>賽馬過關 {formula}</div>",
		longLine1E: "<div>Race {raceno} {poolLongE}</div>",
		longLine2E: "<div style=\"padding-left:32px\">{composite}{combid} {combLongE}</div>",
		longLine1C: "<div>第{raceno}場 {poolLongC}</div>",
		longLine2C: "<div style=\"padding-left:32px\">{composite}{combid} {combLongC}</div>",
		longLinePostE: "",
		longLinePostC: ""
	},
	CWIN: {
		betLinePre: "{venueid} {dayid} ",
		betLine1: "{poolid} {raceno}*",
		betLine2: "{combid}",
		betLine1Ref: "{poolid} {raceno}*",
		betLine2Ref: "{combid}",
		shortLine1E: "Composite Win<br/>{poolid} {raceno}*{combid}/...",
		shortLine1C: "組合獨贏<br/>{poolid} {raceno}*{combid}/...",
		shortLine2E: "",
		shortLine2C: "",
		longLinePreE: "",
		longLinePreC: "",
		longLine1E: "<div>{venueE} {dayE}<br/>Race {raceno} {poolLongE}</div>",
		longLine2E: "<div style=\"padding-left:32px\">Composite {combid} {combLongE}</div>",
		longLine1C: "<div>{venueC} {dayC}<br/>第{raceno}場 {poolLongC}</div>",
		longLine2C: "<div style=\"padding-left:32px\">組合 {combid} {combLongC}</div>",
		longLinePostE: "",
		longLinePostC: ""
	},
	IWN: {
		betLinePre: "{venueid} {dayid} ",
		betLine1: "{poolid} {raceno}*",
		betLine2: "{combid}",
		betLine1Ref: "{poolid} {raceno}*",
		betLine2Ref: "{combid}",
		shortLine1E: "{poolShortE} Race {raceno}",
		shortLine1C: "{poolShortC} 第{raceno}場",
		shortLine2E: "",
		shortLine2C: "",
		longLinePreE: "",
		longLinePreC: "",
		longLine1E: "<div>{venueE} {dayE}<br/>Race {raceno} {poolLongE}</div><div style=\"padding-left:32px\">",
		longLine2E: "{combid} {combLongE}",
		longLine1C: "<div>{venueC} {dayC}<br/>第{raceno}場 {poolLongC}</div><div style=\"padding-left:32px\">",
		longLine2C: "{combid} {combLongC}",
		longLinePostE: "</div>",
		longLinePostC: "</div>"
	},
	FOR: {
		betLinePre: "FOR {counterid}",
		betLine1: "{poolid} ",
		betLine2: "{lineid},{combid}@{odds}",
		betLine1Ref: "{poolShortE} {insNo} {dayid}*",
		betLine2Ref: "{combShortE}@{odds}",
		shortLine1E: "{poolShortE} {insNo} {dayid}",
		shortLine1C: "{poolShortC} {insNo} {dayid}",
		shortLine2E: "",
		shortLine2C: "",
		longLinePreE: "",
		longLinePreC: "",
		longLine1E: "<div>{poolLongE} {insNo}<br/>{venueE}<br/>{dayid}</div>",
		longLine2E: "<div style=\"padding-left:32px\">{combShortE} [{combLongE}]@{odds}</div>",
		longLine1C: "<div>{poolLongC} {insNo}<br/>{venueC}<br/>{dayid}</div>",
		longLine2C: "<div style=\"padding-left:32px\">{combShortC} [{combLongC}]@{odds}</div>",
		longLinePostE: "",
		longLinePostC: ""
	}
}

var fbTemplate = { 
	MATCH_SINGLE: {
		betLinePre: "FBF {counterid}",
		betLine1: "{poolid} ",
		betLine2: "{lineid},{combid}@{odds}",
		betLine1Ref: "{feid} {bType}{insNo} ",
		betLine2Ref: "{combShortE}{line}@{odds}",
		shortLine1E: "{feid} {poolShortE}",
		shortLine1C: "{feid} {poolShortC}",
		shortLine2E: "[flag] {combShortE}{goalline}@{odds}",
		shortLine2C: "[flag] {combShortC}{goalline}@{odds}",
		longLinePreE: "",
		longLinePreC: "",
		longLine1E: "{feid}<br/>[flag] {homeE} vs {awayE}<br/>{poolLongE}",
		longLine2E: "<br/><span style=\"padding-left:16px\">{combLongE}{line}@{odds}</span>",
		longLine1C: "{feid}<br/>[flag] {homeC} 對 {awayC}<br/>{poolLongC}",
		longLine2C: "<br/><span style=\"padding-left:16px\">{combLongC}{line}@{odds}</span>",
		longLinePostE: "",
		longLinePostC: ""
	},
	MATCH_ALUP: {
		betLinePre: "FBF {counterid}ALUP {formula}/",
		betLine1: "{poolid} ",
		betLine2: "{lineid},{combid}@{odds}",
		betLine1Ref: "{feid} {bType}{insNo} ",
		betLine2Ref: "{combShortE}{line}@{odds}",
		shortLine1E: "Football All Up {formula}",
		shortLine1C: "足球過關 {formula}",
		shortLine2E: "[flag] {feid} {poolShortE}...",
		shortLine2C: "[flag] {feid} {poolShortC}...",
		longLinePreE: "Football All Up {formula}",
		longLinePreC: "足球過關 {formula}",
		longLine1E: "<br/>{feid}<br/>[flag] {homeE} vs {awayE}<br/>{poolLongE}",
		longLine2E: "<br/><span style=\"padding-left:16px\">{combLongE}{line}@{odds}</span>",
		longLine1C: "<br/>{feid}<br/>[flag] {homeC} 對 {awayC}<br/>{poolLongC}",
		longLine2C: "<br/><span style=\"padding-left:16px\">{combLongC}{line}@{odds}</span>",
		longLinePostE: "",
		longLinePostC: ""
	},
	TOURN_SINGLE: {
		betLinePre: "FBF {counterid}",
		betLine1: "{poolid} ",
		betLine2: "{lineid},{combid}@{odds}",
		betLine1Ref: "{feid} {bType}{insNo} ",
		betLine2Ref: "{combShortE}@{odds}",
		shortLine1E: "{feid} {tournCode} {poolShortE}{insNo}",
		shortLine1C: "{feid} {tournCode} {poolShortC}{insNo}",
		shortLine2E: "[flag] {combShortE}@{odds}",
		shortLine2C: "[flag] {combShortC}@{odds}",
		longLinePreE: "",
		longLinePreC: "",
		longLine1E: "{feid}<br/>[flag] {tournE}<br/>{poolLongE} {insNo} {tpsType}",
		longLine2E: "<br/><span style=\"padding-left:16px\">{combLongE}@{odds}</span>",
		longLine1C: "{feid}<br/>[flag] {tournC}<br/>{poolLongC} {insNo} {tpsType}",
		longLine2C: "<br/><span style=\"padding-left:16px\">{combLongC}@{odds}</span>",
		longLinePostE: "",
		longLinePostC: ""
	},
	TOURN_TSP: {
		betLinePre: "FBF {counterid}",
		betLine1: "{poolid} ",
		betLine2: "{lineid},{combid}@{odds}",
		betLine1Ref: "{feid} {bType}{insNo} ",
		betLine2Ref: "{combShortE}@{odds}",
		shortLine1E: "{feid} {tournCode} SPC{insNo}",
		shortLine1C: "{feid} {tournCode} {poolShortC}{insNo}",
		shortLine2E: "[flag] {combShortE}@{odds}",
		shortLine2C: "[flag] {combShortC}@{odds}",
		longLinePreE: "",
		longLinePreC: "",
		longLine1E: "{feid}<br/>[flag] {tournE}<br/>{poolLongE}",
		longLine2E: "<br/><span style=\"padding-left:16px\">{combLongE}@{odds}</span>",
		longLine1C: "{feid}<br/>[flag] {tournC}<br/>{poolLongC}",
		longLine2C: "<br/><span style=\"padding-left:16px\">{combLongC}@{odds}</span>",
		longLinePostE: "",
		longLinePostC: ""
	},
	TOURN_GPWGPF: {
		betLinePre: "FBF {counterid}",
		betLine1: "{poolid} ",
		betLine2: "{lineid},{combid}@{odds}",
		betLine1Ref: "{feid} {bType}{insNo} ",
		betLine2Ref: "{combShortE}@{odds}",
		shortLine1E: "{feid} {tournCode} {poolShortE}{insNo}",
		shortLine1C: "{feid} {tournCode} {poolShortC}{insNo}",
		shortLine2E: "[flag] {combShortE}@{odds}",
		shortLine2C: "[flag] {combShortC}@{odds}",
		longLinePreE: "",
		longLinePreC: "",
		longLine1E: "{feid}<br/>[flag] {tournE}<br/>{poolLongE}",
		longLine2E: "<br/><span style=\"padding-left:16px\">{combLongE}@{odds}</span>",
		longLine1C: "{feid}<br/>[flag] {tournC}<br/>{poolLongC}",
		longLine2C: "<br/><span style=\"padding-left:16px\">{combLongC}@{odds}</span>",
		longLinePostE: "",
		longLinePostC: ""
	},
	TOURN_ALUP: {
		betLinePre: "FBF {counterid}ALUP {formula}/",
		betLine1: "{poolid} ",
		betLine2: "{lineid},{combid}@{odds}",
		betLine1Ref: "{feid} {bType} ",
		betLine2Ref: "{combShortE}@{odds}",
		shortLine1E: "Football All Up {formula}",
		shortLine1C: "足球過關 {formula}",
		shortLine2E: "{poolShortE}...",
		shortLine2C: "{poolShortC}...",
		longLinePreE: "Football All Up {formula}",
		longLinePreC: "足球過關 {formula}",
		longLine1E: "<br/>{feid}<br/>[flag] {tournE}<br/>{poolLongE}",
		longLine2E: "<br/><span style=\"padding-left:16px\">{combLongE}@{odds}</span>",
		longLine1C: "<br/>{feid}<br/>[flag] {tournC}<br/>{poolLongC}",
		longLine2C: "<br/><span style=\"padding-left:16px\">{combLongC}@{odds}</span>",
		longLinePostE: "",
		longLinePostC: ""
	}
};

var m6Template = { 
	NORMAL_SINGLE_DRAW: {
		betLinePre: "",
		betLine1: "MK6 ",
		betLine2: "{combid}",
		betLine1Ref: "MK6 ",
		betLine2Ref: "{combid}",
		shortLine1E: "MK6 {combShortSplit1E}",
		shortLine1C: "六合彩 {combShortSplit1C}",
		shortLine2E: "{combShortSplit2E}",
		shortLine2C: "{combShortSplit2C}",
		longLinePreE: "",
		longLinePreC: "",
		longLine1E: "Mark Six {poolid}",
		longLine2E: "<br/><span style='word-spacing:-3px'>{combLongE}</span>",
		longLine1C: "六合彩 {poolid}",
		longLine2C: "<br/><span style='word-spacing:-3px'>{combLongC}</span>",
		longLinePostE: "{ranGenLongE}{partialLongE}",
		longLinePostC: "{ranGenLongC}{partialLongC}"
	},
	NORMAL_MULTI_DRAW: {
		betLinePre: "",
		betLine1: "MK6 {multidraw}D ",
		betLine2: "{combid}",
	    betLine1Ref: "MK6 {multidraw}D ",
		betLine2Ref: "{combid}",
		shortLine1E: "MK6 {multidraw}",
		shortLine1C: "六合彩 {multidraw}期",
		shortLine2E: "{combShortE}",
		shortLine2C: "{combShortC}",
		longLinePreE: "",
		longLinePreC: "",
		longLine1E: "Mark Six {poolid} {multidraw}D",
		longLine2E: "<br/><span style='word-spacing:-3px'>{combLongE}</span>",
		longLine1C: "六合彩 {poolid} {multidraw}期",
		longLine2C: "<br/><span style='word-spacing:-3px'>{combLongC}</span>",
		longLinePostE: "{ranGenLongE}{partialLongE}",
		longLinePostC: "{ranGenLongC}{partialLongC}"
	},
	SNOWBALL_DRAW: {
		betLinePre: "",
		betLine1: "MK6 ",
		betLine2: "{combid}",
		betLine1Ref: "MK6 ",
		betLine2Ref: "{combid}",
		shortLine1E: "MK6 (SB) {combShortSplit1E}",
		shortLine1C: "金多寶 {combShortSplit1C}",
		shortLine2E: "{combShortSplit2E}",
		shortLine2C: "{combShortSplit2C}",
		longLinePreE: "",
		longLinePreC: "",
		longLine1E: "Mark Six {poolid}",
		longLine2E: "<br/><span style='word-spacing:-3px'>{combLongE}</span>",
		longLine1C: "六合彩 {poolid}",
		longLine2C: "<br/><span style='word-spacing:-3px'>{combLongC}</span>",
		longLinePostE: "{ranGenLongE}{partialLongE}",
		longLinePostC: "{ranGenLongC}{partialLongC}"
	}
}

function getBetLineTemplate(foBetObj) {
	switch (foBetObj.prod) {
		case "FB":
			if ( foBetObj.isTourn && foBetObj.bType=='ALUP') {
				return fbTemplate['TOURN_ALUP'];
			}
			else if (foBetObj.bType == "GPW" || foBetObj.bType == "GPF") {
				return fbTemplate['TOURN_GPWGPF'];
			}
			else if (foBetObj.bType == "TSP") {
				return fbTemplate['TOURN_TSP'];
			}
			else if ( foBetObj.isTourn ) {
				return fbTemplate['TOURN_SINGLE'];
			}
			else if ( foBetObj.bType=='ALUP' ) {
				return fbTemplate['MATCH_ALUP'];
			}
			return fbTemplate['MATCH_SINGLE'];
		case "MK6":
			if ( foBetObj.snowball ) {
				return m6Template['SNOWBALL_DRAW'];
			}
			else if ( foBetObj.multidraw != "" ) {
				return m6Template['NORMAL_MULTI_DRAW'];
			}
			return m6Template['NORMAL_SINGLE_DRAW'];
		case "HR":
			switch (foBetObj.bType) {
				case 'ALUP':
					return hrTemplate['ALUP'];
				case 'IWN':
					return hrTemplate['IWN'];
				case 'CWA':
				case 'CWB':
				case 'CWC':
					return hrTemplate['CWIN'];
				case 'DBL':
				case 'TBL':
				case 'D-T':
				case 'T-T':
				case '6UP':
					return hrTemplate['MULTI'];
				case 'JKC':
				case 'TNC':
					return hrTemplate['FOR'];
				default:
					return hrTemplate['SINGLE'];
			}
			break;
	}
	return "";
}

function combineAllUpBet(foBetArr, formula) {
	var newFoBetArr = [];
    var pdIDStrArr = [];
    var remarkArr = [];
	var pdDateArr = [];
	newFoBetArr.push(foBetArr[0]);
	pdDateArr.push(foBetArr[0].pdDate);
	for ( var i=0; i<foBetArr.length; i++ ) {
		if(foBetArr[i].extraTime)
		     newFoBetArr[0].extraTime = true;
	}
	for ( var i=1; i<foBetArr.length; i++ ) {
         newFoBetArr[0].bType = 'ALUP';
		 newFoBetArr[0].formula = formula;
		 newFoBetArr[0].allup = false;
		 newFoBetArr[0].pools.push(foBetArr[i].pools[0]);
		 newFoBetArr[0].inplay |= foBetArr[i].inplay;
		 pdIDStrArr.push(foBetArr[i].pools[0].feid);
		 pdDateArr.push(foBetArr[i].pdDate);
		 if ( newFoBetArr[0].prod=='FB' )
			remarkArr.push(foBetArr[i].pools[0].homeE + '(Home) vs ' + foBetArr[i].pools[0].awayE + '(Away)');
	}
	newFoBetArr[0].pdId = pdIDStrArr.join(',');
	newFoBetArr[0].pdDate = getEarliestTime(pdDateArr);
	newFoBetArr[0].remark = remarkArr.join(',');
    newFoBetArr[0].stopsellDT = newFoBetArr[0].pdDate.substring(0, 10);
	return newFoBetArr;
}

function combineMultiLegBet(foBetArr) {
	var newFoBetObj = [];
    var pdIDStrArr = [];
    var remarkArr = [];
	var pdDateArr = [];
	newFoBetObj = foBetArr[0];
	pdDateArr.push(foBetArr[0].pdDate);
	for ( var i=1; i<foBetArr.length; i++ ) {
		 newFoBetObj.pools.push(foBetArr[i].pools[0]);
		 pdDateArr.push(foBetArr[i].pdDate);
	}
	newFoBetObj.pdId = pdIDStrArr.join(',');
	newFoBetObj.pdDate = getEarliestTime(pdDateArr);
	newFoBetObj.remark = remarkArr.join(',');
    newFoBetObj.stopsellDT = newFoBetObj.pdDate.substring(0, 10);
	return newFoBetObj;
}

function genBetLine(foBetObj) {
	var t = getBetLineTemplate(foBetObj);
	var tmpArr = genBetLineInner(foBetObj, foBetObj.pools);
	var tmpArr2 = genBetLineInner(foBetObj, foBetObj.pools2);
	return foBetObj.replaceStr(t.betLinePre) + tmpArr.join('/') + (tmpArr2.length>0 ? '|' + tmpArr2.join('/') : '');
}

function genBetLineInner(foBetObj, pools) {
	var t = getBetLineTemplate(foBetObj);
	var tmpArr = [];
	for ( var i in pools ) {
		var tmpArr1 = [];
		var bStr = '';
		for ( var j in pools[i].bankers ) {
			tmpArr1.push(pools[i].bankers[j].replaceStr(t.betLine2));
		}
		if ( tmpArr1.length > 0 ) {
			bStr += tmpArr1.join('+') + (foBetObj.bType=='IWN' ? '#' : '>');
		}
		tmpArr1 = [];
		for ( var j in pools[i].bankers2 ) {
			tmpArr1.push(pools[i].bankers2[j].replaceStr(t.betLine2));
		}
		if ( tmpArr1.length > 0 ) {
			bStr += tmpArr1.join('+') + '>';
		}
		tmpArr1 = [];
		for ( var j in pools[i].bankers3 ) {
			tmpArr1.push(pools[i].bankers3[j].replaceStr(t.betLine2));
		}
		if ( tmpArr1.length > 0 ) {
			bStr += tmpArr1.join('+') + '>';
		}
		var tmpArr2 = [];
		for ( var j in pools[i].combs ) {
			tmpArr2.push(pools[i].combs[j].replaceStr(t.betLine2));
		}
		tmpArr.push(foBetObj.replaceStr(pools[i].replaceStr(t.betLine1)) + bStr + tmpArr2.join('+'));
	}
	return tmpArr;
}

function genBetLineRef(foBetObj) {
	var t = getBetLineTemplate(foBetObj);
	var tmpArr = genBetLineRefInner(foBetObj, foBetObj.pools);
	var tmpArr2 = genBetLineRefInner(foBetObj, foBetObj.pools2);
	return foBetObj.replaceStr(t.betLinePre) + tmpArr.join('/') + (tmpArr2.length>0 ? '|' + tmpArr2.join('/') : '');
}

function genBetLineRefInner(foBetObj, pools) {
	var t = getBetLineTemplate(foBetObj);
	var tmpArr = [];
	for ( var i in pools ) {
		var tmpArr1 = [];
		var bStr = '';
		for ( var j in pools[i].bankers ) {
			tmpArr1.push(pools[i].bankers[j].replaceStr(t.betLine2Ref));
		}
		if ( tmpArr1.length > 0 ) {
			bStr += tmpArr1.join('+') + foBetObj.bType=='IWN' ? '#' : '>';
		}
		tmpArr1 = [];
		for ( var j in pools[i].bankers2 ) {
			tmpArr1.push(pools[i].bankers2[j].replaceStr(t.betLine2Ref));
		}
		if ( tmpArr1.length > 0 ) {
			bStr += tmpArr1.join('+') + '>';
		}
		tmpArr1 = [];
		for ( var j in pools[i].bankers3 ) {
			tmpArr1.push(pools[i].bankers3[j].replaceStr(t.betLine2Ref));
		}
		if ( tmpArr1.length > 0 ) {
			bStr += tmpArr1.join('+') + '>';
		}
		var tmpArr2 = [];
		for ( var j in pools[i].combs ) {
			tmpArr2.push(pools[i].combs[j].replaceStr(t.betLine2Ref));
		}
		tmpArr.push(foBetObj.replaceStr(pools[i].replaceStr(t.betLine1Ref)) + bStr + tmpArr2.join('+'));
	}
	return tmpArr;
}

function genShortLine1(foBetObj, lang) {
	lang = lang!=null ? lang : (curLang=='en' ? 'E' : 'C');
	var t = getBetLineTemplate(foBetObj);
	switch ( foBetObj.bType ) {
		case 'CWA':
		case 'CWB':
		case 'CWC':
			return foBetObj.replaceStr(foBetObj.pools[0].replaceStr(foBetObj.pools[0].combs[0].replaceStr(t['shortLine1' + lang])));;
		default:
			return foBetObj.replaceStr(foBetObj.pools[0].replaceStr(t['shortLine1' + lang]));
	}
}

function genShortLine2(foBetObj, lang) {
	if ( foBetObj.prod=='HR' ) {
		var line = genBetLine(foBetObj);
		switch ( foBetObj.bType ) {
			case 'CWA':
			case 'CWB':
			case 'CWC':
				return '';
		    case 'ALUP' :
				var idx = line.indexOf('/');
				return line.substr(idx+1);
			case 'JKC':
			case 'TNC':
				return genBetLineRef(foBetObj).split('*')[1];
			default:
				return line.split('*')[1];
		}
	}
	lang = lang!=null ? lang : (curLang=='en' ? 'E' : 'C');
	var t = getBetLineTemplate(foBetObj);
	return foBetObj.replaceStr(foBetObj.pools[0].replaceStr(foBetObj.pools[0].combs[0].replaceStr(t['shortLine2' + lang])));
}

function genLongLine(foBetObj, lang) {
	lang = lang!=null ? lang : (curLang=='en' ? 'E' : 'C');
	var t = getBetLineTemplate(foBetObj);
	var tmpArr = genLongLineInner(foBetObj, foBetObj.pools, lang);
	var tmpArr2 = genLongLineInner(foBetObj, foBetObj.pools2, lang);	
	return foBetObj.replaceStr(t['longLinePre' + lang]) + tmpArr.join('')  + (tmpArr2.length>0 ? '<br/>' + tmpArr2.join('') : '') + foBetObj.replaceStr(t['longLinePost' + lang]);
}

function genLongLineInner(foBetObj, pools, lang) {
	lang = lang!=null ? lang : (curLang=='en' ? 'E' : 'C');
	var t = getBetLineTemplate(foBetObj);
	var tmpArr = [];
	for ( var i in pools ) {
		var tmpArr1 = [];
		var bStr = '';
		for ( var j in pools[i].bankers ) {
			tmpArr1.push(foBetObj.replaceStr(pools[i].bankers[j].replaceStr(t['longLine2'+lang])));
		}
		if ( tmpArr1.length > 0 ) {
			bStr += tmpArr1.join('') + (foBetObj.bType=='IWN' ? ' # ' : ('<div style="padding-left:32px">' + (curLang=='en' ? withBankerEn : withBankerCh) + '</div>'));
		}
		tmpArr1 = [];
		for ( var j in pools[i].bankers2 ) {
			tmpArr1.push(foBetObj.replaceStr(pools[i].bankers2[j].replaceStr(t['longLine2'+lang])));
		}
		if ( tmpArr1.length > 0 ) {
			bStr += tmpArr1.join('') + '<div style="padding-left:32px">' + (curLang=='en' ? withBankerEn : withBankerCh) + '</div>';
		}
		tmpArr1 = [];
		for ( var j in pools[i].bankers3 ) {
			tmpArr1.push(foBetObj.replaceStr(pools[i].bankers3[j].replaceStr(t['longLine2'+lang])));
		}
		if ( tmpArr1.length > 0 ) {
			bStr += tmpArr1.join('') + '<div style="padding-left:32px">' + (curLang=='en' ? withBankerEn : withBankerCh) + '</div>';
		}
		var tmpArr2 = [];
		for ( var j in pools[i].combs ) {
			tmpArr2.push(foBetObj.replaceStr(pools[i].combs[j].replaceStr(t['longLine2'+lang])));
		}
		tmpArr.push(foBetObj.replaceStr(pools[i].replaceStr(t['longLine1'+lang]) + bStr + tmpArr2.join('')));
	}
	return tmpArr;
}

function genLine(foBetObj) {
	console.log(genBetLine(foBetObj)
	+ '\n' + genBetLineRef(foBetObj)
	+ '\n' + genShortLine1(foBetObj, 'E')
	+ '\n' + genShortLine2(foBetObj, 'E')
	+ '\n' + genLongLine(foBetObj, 'E')
	+ '\n' + genShortLine1(foBetObj, 'C')
	+ '\n' + genShortLine2(foBetObj, 'C')
	+ '\n' + genLongLine(foBetObj, 'C'));
}

function FOCombObj() {
	this.combid = "";
	this.combShortE = "";
	this.combShortC = "";
	this.combLongE = "";
	this.combLongC = "";
	this.lineid = "";
	this.line = "";
	this.goalline = "";
	this.odds = "";
	this.oddsdiff = 0;
	this.oldOdds = "";
	this.selKey = "";
	this.composite = "";
	
	this.replaceStr = function(str) {
		for ( var idx in this ) {
		  var val = this[idx];
		  if ( idx=="odds" ) {
			  if ( isQRPortal )
				  val = 'Odds';
	  
			  if ( this.oddsdiff > 0 ) {
				val = this.oldOdds + GetText('txt_changed_to') + '<span class="nowrap"><span class="redtext">' + this[idx] + '</span><span class="oddsDown"></span></span>';
			  }
			  else if (this.oddsdiff < 0 ) {
				  val = this.oldOdds + GetText('txt_changed_to') + '<span class="nowrap"><span class="greentext">' + this[idx] + '</span><span class="oddsUp"></span></span>';
			  }
	      }
    	  str = str.replace('{' + idx + '}', val);
		}
		return str;
	}
	
	this.clone = function() {
		var a = new FOCombObj();
		for ( var idx in this ) {
			if ( typeof(this[idx])=='object' || typeof(this[idx])=='function' )
				continue;
			a[idx] = this[idx];
		}
		return a;
	}
}

function FOPoolObj() {
	this.feid = "";
	this.bType = "";
	this.poolid ="";
	this.poolShortE = "";
	this.poolShortC = "";
	this.poolLongE = "";
	this.poolLongC = "";
	this.combs = [];
	// FB only
	this.homeE = "";
	this.homeC = "";
	this.awayE = "";
	this.awayC = "";
	this.tournCode = "";
	this.tournE = "";
	this.tournC = "";
	this.insNo = "";
	this.groupId = "";
	// HR only
	this.bankers = [];
	this.bankers2 = [];  // for TCE MB & QTT MB
	this.bankers3 = [];  // for QTT MB
	this.raceno = -1;
	this.fs = -1;
	this.fsNoScrRes = -1;
	this.tpsType = "";

	this.replaceStr = function(str) {
		for ( var idx in this ) {
		  str = str.replace('{' + idx + '}', this[idx]);
		}
		str = str.replace('[flag]', GetLeagueFlagHTML(this.tournCode));
		return str;
	}
	
	this.resetOddsdiff = function() {
	    for ( var idx in this.combs ) {
		  this.combs[idx].oddsdiff = 0;
		}
	}

	this.getBankerSize = function() {
		if ( this.bankers.length > 0 && this.bankers[0].combid=='F' )
			return this.fsNoScrRes;
		return this.bankers.length;
	}

	this.getBanker2Size = function() {
		if ( this.bankers2.length > 0 && this.bankers2[0].combid=='F' )
			return this.fsNoScrRes;
		return this.bankers2.length;
	}

	this.getBanker3Size = function() {
		if ( this.bankers3.length > 0 && this.bankers3[0].combid=='F' )
			return this.fsNoScrRes;
		return this.bankers3.length;
	}
	
	this.getCombSize = function() {
		if ( this.combs.length > 0 && this.combs[0].combid=='F' )
			return this.fsNoScrRes;
		return this.combs.length;
	}

	this.clone = function() {
		var a = new FOPoolObj();
		for ( var idx in this ) {
			if ( typeof(this[idx])=='object' || typeof(this[idx])=='function' )
				continue;
			a[idx] = this[idx];
		}
		for (var i in this.bankers) {
			a.bankers.push(this.bankers[i].clone());
		}
		for (var i in this.bankers2) {
			a.bankers2.push(this.bankers2[i].clone());
		}
		for (var i in this.bankers3) {
			a.bankers3.push(this.bankers3[i].clone());
		}
		for (var i in this.combs) {
			a.combs.push(this.combs[i].clone());
		}
		return a;
	}
}

function FOBetObj(p, bTyp, t) {
	this.prod = p;
	this.bType = bTyp;
	this.isTourn = t;
	this.allup = false;
	this.formula = "";
	this.isRandGen = false;
	this.pools = [];
	this.unitBet = -1;
	// QR portal use
	this.pdId = "";
	this.pdDate = "";
	this.stopsellDT = "";
	this.remark = "";
	// FB only
	this.inplay = false;
	this.extraTime = false;
	// HB only
	this.flexibet = false;
	this.venueid = "";
	this.venueE = "";
	this.venueC = "";
	this.dayid = "";
	this.dayE = "";
	this.dayC = "";
	this.pools2 = [];  //for T-T Quick Pick
	// M6 only
	this.partial = false;
	this.snowball = false;
	this.multidraw = "";

	// counter offer use
	this.counterid = "";

	this.replaceStr = function(str) {
		for ( var idx in this ) {
		  str = str.replace('{' + idx + '}', this[idx]);
		}
		str = str.replace('{ranGenLongE}', this.isRandGen ? ' ' + array_en_name['lbl_rangen'] : '');
		str = str.replace('{ranGenLongC}', this.isRandGen ? ' ' + array_ch_name['lbl_rangen'] : '');
		str = str.replace('{partialLongE}', this.partial ? '<br/>' + array_en_name['m6unit_name'] : '');
		str = str.replace('{partialLongC}', this.partial ? '<br/>' + array_ch_name['m6unit_name'] : '');
		switch ( this.prod ) {
			case 'MK6':
				var line = this.pools[0].combs[0].combid;
				var count = 0;
				for (var i = 0; i < line.length; i++) {
					if (line[i] == "+" || line[i] == ">")
						count++;
					if (count >= 3) {
						str = str.replace('{combShortSplit1E}', line.substring(0, i));
						str = str.replace('{combShortSplit1C}', line.substring(0, i));
						str = str.replace('{combShortSplit2E}', line.substring(i));
						str = str.replace('{combShortSplit2C}', line.substring(i));
						break;
					}
				}
				str = str.replace('{combShortSplit1E}', line);
				str = str.replace('{combShortSplit1C}', line);
				str = str.replace('{combShortSplit2E}', '');
				str = str.replace('{combShortSplit2C}', '');
				break;
			case 'HR':
				str = str.replace('{poolid}', this.pools[0].poolid);
				str = str.replace('{poolLongE}', this.pools[0].poolLongE);
				str = str.replace('{poolLongC}', this.pools[0].poolLongC);
				str = str.replace('{raceno}', this.pools[0].raceno);
				break;
		}
		return str;
	}
	
	this.getSelectionSize =  function() {
		switch (this.prod) {
			case 'FB':
				if ( this.bType=='ALUP' ) {
					return allUpTotalCount(this);
				}
				return this.pools[0]!=null ? this.pools[0].combs.length : 0;
			case 'MK6':
				var mdraw = isNaN(parseInt(this.multidraw)) ? 1 : parseInt(this.multidraw);
				return mdraw * betCalcMK6(this.pools[0].combs[0].combid);
			case 'HR':
				if ( this.bType=='ALUP' ) {
					return allUpTotalCount(this);
				}
				return betCalcHR(this);
		}
		return 1;
	}
	
	this.resetOddsdiff = function() {
	    for ( var idx in this.pools ) {
		  this.pools[idx].resetOddsdiff();
		}
	}

	this.clone = function() {
		var a = new FOBetObj();
		for ( var idx in this ) {
			if ( typeof(this[idx])=='object' || typeof(this[idx])=='function' )
				continue;
			a[idx] = this[idx];
		}
		for (var i in this.pools) {
			a.pools.push(this.pools[i].clone());
		}
		return a;
	}
}

function sortComb(a, b) {
	if (parseInt(a.lineid) != parseInt(b.lineid))
		return parseInt(a.lineid) - parseInt(b.lineid);
    return parseInt(a.combid) - parseInt(b.combid);
}

function sortSel(a, b) {
	if (parseInt(a.lineid) != parseInt(b.lineid))
		return parseInt(a.lineid) - parseInt(b.lineid);
    return parseInt(a.selKey) - parseInt(b.selKey);
}

function getEarliestTime(dateTimeArray) {
    var tmpDateTimeArr = [];
    var tmpMinDate
    for (var i = 0; i < dateTimeArray.length; i++) {
        var tmpDate = dateTimeArray[i].split(" ")[0].split("-");
        var tmpTime = dateTimeArray[i].split(" ")[1].split(":");
        if (tmpTime.length == 2) {
            tmpTime[2] = "00";
        }
        var tmpDateTime = new Date(tmpDate[0], tmpDate[1] - 1, tmpDate[2], tmpTime[0], tmpTime[1], tmpTime[2]);
        tmpDateTimeArr.push(tmpDateTime.getTime());
    }
    var minDate = Math.min.apply(null, tmpDateTimeArr);
    return dateTimeArray[tmpDateTimeArr.indexOf(minDate)];
}
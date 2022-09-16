var formulaItem = [];
formulaItem[0] = "";
formulaItem[1] = "";
formulaItem[2] = ['12', '1#2#12'];
formulaItem[3] = ['123', '12#13#23', '12#13#23#123', '1#2#3#12#13#23', '1#2#3#12#13#23#123'];
formulaItem[4] = ['1234', '123#124#134#234', '123#124#134#234#1234', '12#13#14#23#24#34', '12#13#14#23#24#34#1#2#3#4', '123#124#134#234#1234#12#13#14#23#24#34', '1#2#3#4#123#124#134#234#12#13#14#23#24#34', '1#2#3#4#123#124#134#234#12#13#14#23#24#34#1234'];
formulaItem[5] = ['12345', '1234#1235#1245#1345#2345', '12345#1234#1235#1245#1345#2345', '12#13#14#15#23#24#25#34#35#45', '12#13#14#15#23#24#25#34#35#45#1#2#3#4#5', '12345#1234#1235#1245#1345#2345#123#124#125#134#135#145#234#235#245#345'];
formulaItem[5] = formulaItem[5].concat(['12#13#14#15#23#24#25#34#35#45#123#124#125#134#135#145#234#235#245#345', '1#2#3#4#5#12#13#14#15#23#24#25#34#35#45#123#124#125#134#135#145#234#235#245#345', '12345#1234#1235#1245#1345#2345#123#124#125#134#135#145#234#235#245#345#12#13#14#15#23#24#25#34#35#45']);
formulaItem[5] = formulaItem[5].concat(['1234#1235#1245#1345#2345#123#124#125#134#135#145#234#235#245#345#12#13#14#15#23#24#25#34#35#45#1#2#3#4#5', '12345#1234#1235#1245#1345#2345#123#124#125#134#135#145#234#235#245#345#12#13#14#15#23#24#25#34#35#45#1#2#3#4#5']);
formulaItem[6] = ['123456', '12345#12346#13456#12456#12356#23456', '123456#12345#12346#13456#12456#12356#23456', '12#13#14#15#16#23#24#25#26#34#35#36#45#46#56', '123#124#125#126#134#135#136#145#146#156#234#235#236#245#246#256#345#346#356#456', '12#13#14#15#16#23#24#25#26#34#35#36#45#46#56#1#2#3#4#5#6'];
formulaItem[6] = formulaItem[6].concat(['123456#12345#12346#13456#12456#12356#23456#1234#1235#1236#1245#1246#1256#1345#1346#1356#1456#2345#2346#2356#2456#3456', '123#124#125#126#134#135#136#145#146#156#234#235#236#245#246#256#345#346#356#456#12#13#14#15#16#23#24#25#26#34#35#36#45#46#56']);
formulaItem[6] = formulaItem[6].concat(['123#124#125#126#134#135#136#145#146#156#234#235#236#245#246#256#345#346#356#456#12#13#14#15#16#23#24#25#26#34#35#36#45#46#56#1#2#3#4#5#6']);
formulaItem[6] = formulaItem[6].concat(['123456#12345#12346#13456#12456#12356#23456#1234#1235#1236#1245#1246#1256#1345#1346#1356#1456#2345#2346#2356#2456#3456#123#124#125#126#134#135#136#145#146#156#234#235#236#245#246#256#345#346#356#456']);
formulaItem[6] = formulaItem[6].concat(['1234#1235#1236#1245#1246#1256#1345#1346#1356#1456#2345#2346#2356#2456#3456#123#124#125#126#134#135#136#145#146#156#234#235#236#245#246#256#345#346#356#456#12#13#14#15#16#23#24#25#26#34#35#36#45#46#56']);
formulaItem[6] = formulaItem[6].concat(['1234#1235#1236#1245#1246#1256#1345#1346#1356#1456#2345#2346#2356#2456#3456#123#124#125#126#134#135#136#145#146#156#234#235#236#245#246#256#345#346#356#456#12#13#14#15#16#23#24#25#26#34#35#36#45#46#56#1#2#3#4#5#6']);
formulaItem[6] = formulaItem[6].concat(['123456#12345#12346#13456#12456#12356#23456#1234#1235#1236#1245#1246#1256#1345#1346#1356#1456#2345#2346#2356#2456#3456#123#124#125#126#134#135#136#145#146#156#234#235#236#245#246#256#345#346#356#456#12#13#14#15#16#23#24#25#26#34#35#36#45#46#56']);
formulaItem[6] = formulaItem[6].concat(['12345#12346#13456#12456#12356#23456#1234#1235#1236#1245#1246#1256#1345#1346#1356#1456#2345#2346#2356#2456#3456#123#124#125#126#134#135#136#145#146#156#234#235#236#245#246#256#345#346#356#456#12#13#14#15#16#23#24#25#26#34#35#36#45#46#56#1#2#3#4#5#6']);
formulaItem[6] = formulaItem[6].concat(['123456#12345#12346#13456#12456#12356#23456#1234#1235#1236#1245#1246#1256#1345#1346#1356#1456#2345#2346#2356#2456#3456#123#124#125#126#134#135#136#145#146#156#234#235#236#245#246#256#345#346#356#456#12#13#14#15#16#23#24#25#26#34#35#36#45#46#56#1#2#3#4#5#6']);
formulaItem[7] = ['1234567', '123456#123457#123467#123567#124567#134567#234567', '123456#123457#123467#123567#124567#134567#234567#1234567'];
formulaItem[7] = formulaItem[7].concat(['12345#12346#12347#12356#12357#12367#12456#12457#12467#12567#13456#13457#13467#13567#14567#23456#23457#23467#23567#24567#34567']);
formulaItem[7] = formulaItem[7].concat(['1234#1235#1236#1237#1245#1246#1247#1256#1257#1267#1345#1346#1347#1356#1357#1367#1456#1457#1467#1567#2345#2346#2347#2356#2357#2367#2456#2457#2467#2567#3456#3457#3467#3567#4567']);
formulaItem[7] = formulaItem[7].concat(['12#13#14#15#16#17#23#24#25#26#27#34#35#36#37#45#46#47#56#57#67#123#124#125#126#127#134#135#136#137#145#146#147#156#157#167#234#235#236#237#245#246#247#256#257#267#345#346#347#356#357#367#456#457#467#567#1234#1235#1236#1237#1245#1246#1247#1256#1257#1267#1345#1346#1347#1356#1357#1367#1456#1457#1467#1567#2345#2346#2347#2356#2357#2367#2456#2457#2467#2567#3456#3457#3467#3567#4567#12345#12346#12347#12356#12357#12367#12456#12457#12467#12567#13456#13457#13467#13567#14567#23456#23457#23467#23567#24567#34567#123456#123457#123467#123567#124567#134567#234567#1234567']);
formulaItem[7] = formulaItem[7].concat(['1#2#3#4#5#6#7#12#13#14#15#16#17#23#24#25#26#27#34#35#36#37#45#46#47#56#57#67#123#124#125#126#127#134#135#136#137#145#146#147#156#157#167#234#235#236#237#245#246#247#256#257#267#345#346#347#356#357#367#456#457#467#567#1234#1235#1236#1237#1245#1246#1247#1256#1257#1267#1345#1346#1347#1356#1357#1367#1456#1457#1467#1567#2345#2346#2347#2356#2357#2367#2456#2457#2467#2567#3456#3457#3467#3567#4567#12345#12346#12347#12356#12357#12367#12456#12457#12467#12567#13456#13457#13467#13567#14567#23456#23457#23467#23567#24567#34567#123456#123457#123467#123567#124567#134567#234567#1234567']);
formulaItem[8] = ['12345678', '1234567#1234568#1234578#1234678#1235678#1245678#1345678#2345678', '12345678#1234567#1234568#1234578#1234678#1235678#1245678#1345678#2345678', '123456#123457#123458#123467#123468#123478#123567#123568#123578#123678#124567#124568#124578#124678#125678#134567#134568#134578#134678#135678#145678#234567#234568#234578#234678#235678#245678#345678'];
formulaItem[8] = formulaItem[8].concat(['12345#12346#12347#12348#12356#12357#12358#12367#12368#12378#12456#12457#12458#12467#12468#12478#12567#12568#12578#12678#13456#13457#13458#13467#13468#13478#13567#13568#13578#13678#14567#14568#14578#14678#15678#23456#23457#23458#23467#23468#23478#23567#23568#23578#23678#24567#24568#24578#24678#25678#34567#34568#34578#34678#35678#45678', '1234#1235#1236#1237#1238#1245#1246#1247#1248#1256#1257#1258#1267#1268#1278#1345#1346#1347#1348#1356#1357#1358#1367#1368#1378#1456#1457#1458#1467#1468#1478#1567#1568#1578#1678#2345#2346#2347#2348#2356#2357#2358#2367#2368#2378#2456#2457#2458#2467#2468#2478#2567#2568#2578#2678#3456#3457#3458#3467#3468#3478#3567#3568#3578#3678#4567#4568#4578#4678#5678']);
formulaItem[8] = formulaItem[8].concat(['12#13#14#15#16#17#18#23#24#25#26#27#28#34#35#36#37#38#45#46#47#48#56#57#58#67#68#78#123#124#125#126#127#128#134#135#136#137#138#145#146#147#148#156#157#158#167#168#178#234#235#236#237#238#245#246#247#248#256#257#258#267#268#278#345#346#347#348#356#357#358#367#368#378#456#457#458#467#468#478#567#568#578#678#12345#12346#12347#12348#12356#12357#12358#12367#12368#12378#12456#12457#12458#12467#12468#12478#12567#12568#12578#12678#13456#13457#13458#13467#13468#13478#13567#13568#13578#13678#14567#14568#14578#14678#15678#23456#23457#23458#23467#23468#23478#23567#23568#23578#23678#24567#24568#24578#24678#25678#34567#34568#34578#34678#35678#45678#1234#1235#1236#1237#1238#1245#1246#1247#1248#1256#1257#1258#1267#1268#1278#1345#1346#1347#1348#1356#1357#1358#1367#1368#1378#1456#1457#1458#1467#1468#1478#1567#1568#1578#1678#2345#2346#2347#2348#2356#2357#2358#2367#2368#2378#2456#2457#2458#2467#2468#2478#2567#2568#2578#2678#3456#3457#3458#3467#3468#3478#3567#3568#3578#3678#4567#4568#4578#4678#5678#12345678#1234567#1234568#1234578#1234678#1235678#1245678#1345678#2345678#123456#123457#123458#123467#123468#123478#123567#123568#123578#123678#124567#124568#124578#124678#125678#134567#134568#134578#134678#135678#145678#234567#234568#234578#234678#235678#245678#345678']);
formulaItem[8] = formulaItem[8].concat(['1#2#3#4#5#6#7#8#12#13#14#15#16#17#18#23#24#25#26#27#28#34#35#36#37#38#45#46#47#48#56#57#58#67#68#78#123#124#125#126#127#128#134#135#136#137#138#145#146#147#148#156#157#158#167#168#178#234#235#236#237#238#245#246#247#248#256#257#258#267#268#278#345#346#347#348#356#357#358#367#368#378#456#457#458#467#468#478#567#568#578#678#12345#12346#12347#12348#12356#12357#12358#12367#12368#12378#12456#12457#12458#12467#12468#12478#12567#12568#12578#12678#13456#13457#13458#13467#13468#13478#13567#13568#13578#13678#14567#14568#14578#14678#15678#23456#23457#23458#23467#23468#23478#23567#23568#23578#23678#24567#24568#24578#24678#25678#34567#34568#34578#34678#35678#45678#1234#1235#1236#1237#1238#1245#1246#1247#1248#1256#1257#1258#1267#1268#1278#1345#1346#1347#1348#1356#1357#1358#1367#1368#1378#1456#1457#1458#1467#1468#1478#1567#1568#1578#1678#2345#2346#2347#2348#2356#2357#2358#2367#2368#2378#2456#2457#2458#2467#2468#2478#2567#2568#2578#2678#3456#3457#3458#3467#3468#3478#3567#3568#3578#3678#4567#4568#4578#4678#5678#12345678#1234567#1234568#1234578#1234678#1235678#1245678#1345678#2345678#123456#123457#123458#123467#123468#123478#123567#123568#123578#123678#124567#124568#124578#124678#125678#134567#134568#134578#134678#135678#145678#234567#234568#234578#234678#235678#245678#345678']);

// *************************************************
function allUpTotalCount(foBetObj) {
	var tmp = foBetObj.formula.split('x');
	var leg = parseInt(tmp[0]);
	var comb = parseInt(tmp[1]);
	var fIdx = $(allup_formula[leg]).index(comb);
	if ( fIdx < 0 ) {
		return 0;
	}
	var fItems = formulaItem[leg][fIdx].split('#');
	var totalCnt = 0;
	for ( var i=0; i<fItems.length; i++ ) {
		var singleCnt = 1;
		for ( var j=0; j<fItems[i].length; j++ ) {
			var poolObj = foBetObj.pools[parseInt(fItems[i][j])-1];
			switch (foBetObj.prod) {
				case "FB":
					singleCnt *= poolObj.combs.length;
					break;
				case "HR":
					singleCnt *= betCalcAllUpHR(foBetObj, poolObj);
					break;
			}
		}
		totalCnt += singleCnt;
	}
	return totalCnt;
}

function GetAllUpEnableStateWithBetType(betType) {
	betType = TranslateBetType(betType);
	switch (betType) {
		case "HAD":
		case "HDC":
		case "TTG":
		case "CRS":
		case "FCS":
		case "HFT":
		case "OOE":
		case "HIL":
		case "FGS":
		case "HHA":
		case "GPF":
		case "GPW":
		case "FHA":
		case "FTS":
		case "FHL":
		case "NTS":
		case "CHL":
			if (GetFBPara("Alup" + betType) == 1) {
				return cAllUpEnabled;
			}
			break;
		case "WIN":
		case "PLA":
		case "W-P":
		case "QIN":
		case "QPL":
		case "QQP":
		case "CWA":
		case "CWB":
		case "CWC":
		case "TRI":
			return cAllUpEnabled;
		case "FCT":
			if (GetXPoolAllUpEnabled('FCT') == 1) {
				return cAllUpEnabled;
			}
			break;
	}
	return cAllUpNA;
}

function GetXPoolAllUpEnabled(betType) {
	betType = TranslateBetType(betType);
	if ( betType.match(/^(CWB|CWC)$/) ) {
		return false;
	}
	else if (GetFBPara(betType) == "1" && GetFBPara("CrossPool" + betType) == "1" && GetFBPara("CrossPoolBet") == "1") {
		return true;
	} else if (GetPara(betType) == "1" && GetPara("CrossPool" + betType) == "1" && GetPara("HorseRaceCrossPool") == "1") {
		return true;
	}
	return false;
}

function GetAllUpEnableStateForXPool(foBetObj) {  //keep
	switch (foBetObj.bType) {
		case "HAD":
		case "HDC":
		case "TTG":
		case "CRS":
		case "FCS":
		case "HFT":
		case "OOE":
		case "HIL":
		case "FGS":
		case "HHA":
		case "FHA":
		case "FTS":
		case "FHL":
		case "NTS":
		case "CHL":
		case "EHA":
		case "EDC":
		case "EHL":
		case "ECH":
		case "ECS":
		case "ENT":
		case "ETG":
			if ( allUpFoBetObj!=null && foBetObj.pools[0].feid == allUpFoBetObj.pools[0].feid && foBetObj.bType != allUpFoBetObj.bType) {
				return cAllUpDisabled;
			}
			return cAllUpEnabled;

		case "WIN":
		case "PLA":
		case "W-P":
		case "QIN":
		case "QPL":
		case "QQP":
		case "CWA":
		case "CWB":
		case "CWC":
		case "TRI":
		case "FCT":
			for (var i = 0; i < allUpBetlines.length; i++) {
				if (match == allUpBetlines[i].match ||
					match.substring(0, 2) != allUpBetlines[i].match.substring(0, 2)) {
					return cAllUpDisabled;
				}
			}
			return cAllUpEnabled;
	}
	return cAllUpDisabled;
}

function GetAllUpEnableStateForSamePool(foBetObj) {
	switch (foBetObj.bType) {
		case "HAD":
		case "HDC":
		case "TTG":
		case "CRS":
		case "FCS":
		case "HFT":
		case "OOE":
		case "HIL":
		case "FGS":
		case "HHA":
		case "FHA":
		case "FTS":
		case "FHL":
		case "NTS":
		case "CHL":
		case "EHA":
		case "EDC":
		case "EHL":
		case "ECH":
		case "ECS":
		case "ENT":
		case "ETG":
			return cAllUpEnabled;
		case "WIN":
		case "PLA":
		case "W-P":
		case "QIN":
		case "QPL":
		case "QQP":
		case "TRI":
		case "FCT":
			for (var i = 0; i < allUpBetlines.length; i++) {
				if (match == allUpBetlines[i].match ||
					match.substring(0, 2) != allUpBetlines[i].match.substring(0, 2)) {
					return cAllUpDisabled;
				}
			}
			return cAllUpEnabled;
		case "CWA":
		case "CWB":
		case "CWC":
			for (var i = 0; i < allUpBetlines.length; i++) {
				if (!GetXPoolAllUpEnabled(betType))
					return cAllUpDisabled;

				if (match == allUpBetlines[i].match ||
					match.substring(0, 2) != allUpBetlines[i].match.substring(0, 2)) {
					return cAllUpDisabled;
				}
			}
			return cAllUpEnabled;
		case "GPF":
		case "GPW":
			if ( allUpFoBetObj!=null ) {
				if ( foBetObj.pools[0].feid != allUpFoBetObj.pools[0].feid) { // different tourn no frontend id -> DISABLED
					return cAllUpDisabled;
				}
				if (int_cross_tourn_para==0 && foBetObj.bType != allUpFoBetObj.pools[0].bType) { // different bet type -> DISABLED
					return cAllUpDisabled;
				}
			}
			return cAllUpEnabled;
	}
	return cAllUpDisabled;
}

function GetAllUpEnableStateForDiffPool(foBetObj) {
	switch (foBetObj.bType) {
		case "HAD":
		case "HDC":
		case "TTG":
		case "CRS":
		case "FCS":
		case "HFT":
		case "OOE":
		case "HIL":
		case "FGS":
		case "HHA":
		case "FHA":
		case "WIN":
		case "PLA":
		case "W-P":
		case "QIN":
		case "QPL":
		case "QQP":
		case "CWA":
		case "CWB":
		case "CWC":
		case "TRI":
		case "FCT":
		case "FTS":
		case "FHL":
		case "NTS":
		case "CHL":
		case "EHA":
		case "EDC":
		case "EHL":
		case "ECH":
		case "ECS":
		case "ENT":
		case "ETG":
			if (allUpFoBetObj.pools.length < 1) {
				return cAllUpEnabled;
			}
			break;
		case "GPF":
		case "GPW":
			// Allow all up if same tournament but are in different groups
			for (i = 0; i < allUpFoBetObj.pools.length; i++) {
				if (allUpFoBetObj.pools[i].feid == foBetObj.pools[0].feid &&
					allUpFoBetObj.pools[i].groupId == foBetObj.pools[0].groupId) {
					return cAllUpDisabled;
				}
			}
			return cAllUpEnabled;
			break;
	}
	return cAllUpDisabled;
}

function GetDynamicAllUpStateFO(foBetObj) {  //keep
	var result = GetAllUpEnableStateWithBetType(foBetObj.bType);
	
	if (result != cAllUpNA && allUpFoBetObj!=null) {
		if ( allUpFoBetObj.prod != foBetObj.prod || allUpFoBetObj.isTourn != foBetObj.isTourn ) {
			result = cAllUpDisabled;
		}
		else {
			switch ( allUpFoBetObj.prod ) {
				case "FB":
					// same match , different bet type cannot all up
					for (var i = 0; i < allUpFoBetObj.pools.length; i++) {
						if (!allUpFoBetObj.isTourn && allUpFoBetObj.pools[i].feid == foBetObj.pools[0].feid
							&& allUpFoBetObj.pools[i].bType != foBetObj.pools[0].bType) {
							result = cAllUpDisabled;
							break;
						}
						else if (!allUpFoBetObj.isTourn && allUpFoBetObj.pools[i].bType == foBetObj.bType) {
							result = GetAllUpEnableStateForSamePool(foBetObj);
						}
						else if (allUpFoBetObj.isTourn && allUpFoBetObj.pools[i].bType == foBetObj.bType) {
							result = GetAllUpEnableStateForSamePool(foBetObj);
						}
						else if (allUpFoBetObj.isTourn && int_cross_tourn_para == 0) {
							if (allUpFoBetObj.pools[i].feid != foBetObj.pools[0].feid || allUpFoBetObj.pools[i].bType != foBetObj.pools[0].bType) {
								result = cAllUpDisabled;
								break;
							}
						}
						else if (allUpFoBetObj.isTourn && int_cross_tourn_para == 1 ) {
							if (allUpFoBetObj.pools[i].feid != foBetObj.pools[0].feid || allUpFoBetObj.pools[i].insNo==foBetObj.pools[0].insNo) {
								result = cAllUpDisabled;
								break;
							}
						}
						else if (GetXPoolAllUpEnabled(allUpFoBetObj.pools[i].bType) && GetXPoolAllUpEnabled(foBetObj.bType) && allUpFoBetObj.prod == foBetObj.prod) {
							result = GetAllUpEnableStateForXPool(foBetObj);
						}
						else {
							result = GetAllUpEnableStateForDiffPool(foBetObj);
							if (result == cAllUpDisabled) {
								break;
							}
						}		
					}
					break;
				case "HR":
					// different venue and day cannot all up
					if ( allUpFoBetObj.dayid!=foBetObj.dayid || allUpFoBetObj.venueid!=foBetObj.venueid ) {
						result = cAllUpDisabled;
						break;
					}
					// same race cannot all up
					for ( var i=0; i<allUpFoBetObj.pools.length; i++ ) {
						if ( allUpFoBetObj.pools[i].raceno==foBetObj.pools[0].raceno ) {
							result = cAllUpDisabled;
							break;
						}		
					}					
					break;
			}
		}
	
		if (foBetObj.prod == "HR") {
			var temp_max_allup = 6;
			for (var i = 0; i < allUpFoBetObj.pools.length; i++) {
				if (allUpFoBetObj.pools[i].bType == "TRI" || allUpFoBetObj.pools[i].bType == "FCT") {
					temp_max_allup = 3;
					break;
				}
			}

			if (allUpFoBetObj.pools.length >= temp_max_allup) {
				result = cAllUpDisabled;
			}
		} else if (foBetObj.prod == "FB") {
			// check if max legs reach and formula available
			if (result == cAllUpEnabled && allUpFoBetObj!=null) {
				if (!GetBetlineCanGroup(foBetObj)) {
					var level = allUpFoBetObj.pools.length+1;
					if (level > max_allup) {
						result = cAllUpDisabled;
					}
					else if (level >= min_allup) {
						var allup_comb = allup_formula[level];
						for (var i = 0; i < allup_comb.length; i++) {
							var formula = level + "x" + allup_comb[i];
							result = cAllUpEnabled;
							for (var j = 0; j < allUpFoBetObj.pools.length; j++) {
								if (func_search_allup_xml(allUpFoBetObj.pools[j].bType, formula) == "0") {
									result = cAllUpDisabled;
									break;
								}
							}
						}
					}
				}
			}
		}
	}
	return result;
}

function refreshAllUpBetlines() {
	var tmpAllUpObjs = [];
	for (var i = 0; i < betlines.length; i++) {
		if (betlines[i].enableAllUp == cAllUpSelected)
			tmpAllUpObjs.push(betlines[i].foBetObj);
	}
	
	allUpFoBetObj = combineBetSlipAllUpBet(tmpAllUpObjs);

	for (var i = 0; i < betlines.length; i++) {
		if (betlines[i].enableAllUp == cAllUpSelected || betlines[i].enableAllUp == cAllUpNA)
			continue;
		betlines[i].enableAllUp = GetDynamicAllUpStateFO(betlines[i].foBetObj);
	}
}

function combineBetSlipAllUpBet(tmpAllUpObjs) {
	var tObj = null;
	if ( tmpAllUpObjs.length > 0 ) {
		tObj = tmpAllUpObjs[0].clone();
		tObj.bType = 'ALUP';
		tObj.allup = false;
	}
	for ( var i=1; i<tmpAllUpObjs.length; i++ ) {
		var found = false;
		for ( var j=0; j< tObj.pools.length; j++ ) {
			if ( tObj.prod=='FB' && tObj.pools[j].poolid == tmpAllUpObjs[i].pools[0].poolid ) {
				tObj.pools[j].combs = combineFOCombObj(tObj.pools[j].combs, tmpAllUpObjs[i].pools[0].combs);
				found = true;
				break;
			}
		}
		if ( !found ) {
			tObj.pools.push(tmpAllUpObjs[i].pools[0].clone());
		}
		tObj.inplay |= tmpAllUpObjs[i].inplay;
		tObj.extraTime |= tmpAllUpObjs[i].extraTime;
	}
	return tObj;
}

function combineFOCombObj(combSet1, combSet2) {
	var newCombSet = [];
	$.each(combSet1, function(i, obj) {
		newCombSet.push(obj);
	});
	$.each(combSet2, function(i, obj) {
		var found = false;
		for ( var i=0; i<newCombSet.length; i++ ) {
			if ( newCombSet[i].combid==obj.combid ) {
				newCombSet[i] = obj;
				found = true;
				break;
			}
		}
		if ( !found ) {
			newCombSet.push(obj);
		}
	});
	return newCombSet;
}

function OnClickAllUpButton(index) {
	if (betlines[index].enableAllUp != cAllUpSelected && betlines[index].enableAllUp != cAllUpEnabled)
		return;

	betlines[index].enableAllUp *= -1; // switch enabled & selected state

	refreshAllUpBetlines();

	RedrawBetlineTable();
	DrawAddAllUpButton();
	LoadAllUpFormula();

	// Support SSO
	isClientActionTaken(true);
}

function GetIndexOfBetlineCanGroup(index) {
	for (var i = 0; i < allUpBetlines.length; i++) {
		if (allUpBetlines[i].type == betlines[index].type &&
			allUpBetlines[i].match == betlines[index].match) {
			return i;
		}
	}
	return -1;
}

function GetBetlineCanGroup(foBetObj) {
	for (var i = 0; i < allUpBetlines.length; i++) {
		if (allUpBetlines[i].foBetObj.bType == foBetObj.bType && allUpBetlines[i].foBetObj.pools[0].feid == foBetObj.pools[0].feid) {
			return true;
		}
	}
	return false;
}

function GroupBetline(betType, betline1, betline2) {
	var string_result = betline1.split("*")[0] + "*"; // get the bet line first part (bet type and match no)
	// select bet type, Spical bet type HDC , HHAD (include "+"),  GPW , GPF
	switch (betType) {
		case "HAD":
		case "TTG":
		case "CRS":
		case "FCRS":
		case "HFT":
		case "OOE":
		case "FGS":
		case "GPF":
		case "GPW":
		case "FHAD":
		case "FTS":
		case "NTS":
		case "EHA":
		case "EDC":
		case "EHL":
		case "ECH":
		case "ECS":
		case "ENT":
		case "ETG":
			string_result += func_merge_bet_line_odds(betline1.split("*")[1], betline2.split("*")[1]);
			break;
		case "HDC":
		case "HHAD":
			string_result += func_merge_bet_line_odds_at(betline1.split("*")[1], betline2.split("*")[1]);
			break;
		case "WIN":
		case "PLA":
		case "W-P":
		case "CWA":
		case "CWB":
		case "CWC":
			string_result += func_merge_bet_line_odds(betline1.split("*")[1], betline2.split("*")[1]);
			break;
		case "QIN":
		case "QPL":
		case "QQP":
		case "TRI":
		case "FCT":
			string_result += func_merge_bet_line_banker(betline1.split("*")[1], betline2.split("*")[1], betType);
			break;
		case "HILO":
		case "FHLO":
		case "CHLO":
			string_result += func_merge_bet_line_odds_ml(betline1.split("*")[1], betline2.split("*")[1]);
			break;
	}
	return string_result;
}

// *********** MERGE Bet Line HILO, FHLO and CHLO for Multiple Line include [+] sign  **********************
function func_merge_bet_line_odds_ml(inval_1, inval_2) {
	var inval = inval_1 + "+" + inval_2;
	var array_temp = inval.split("+");

	//check for duplicate
	var array_sorted = array_temp.sort(CompareFunc);
	var string_output = array_sorted[0];

	for (var i = 1; i < array_sorted.length; i++) {
		var compare1 = array_sorted[i - 1].split("@")[0].toUpperCase();
		var compare2 = array_sorted[i].split("@")[0].toUpperCase();

		if (compare1 != compare2) {
			string_output += "+" + array_sorted[i];
		}
	}

	return string_output;
}

// *********** MERGE Bet Line HHAD and HDC include [+] sign, using '@' split,  **********************
function func_merge_bet_line_odds_at(inval_1, inval_2) {
	var inval = inval_1 + "+" + inval_2;

	var array_temp = inval.split("@");

	for (var i = 1; i < array_temp.length; i++) {
		if (i == array_temp.length - 1) {
			array_temp[i - 1] = array_temp[i - 1] + "@" + array_temp[i];
			array_temp[i] = ""; // clear the last array value to empty
		} else {
			var int_temp = array_temp[i].indexOf("+");
			array_temp[i - 1] = array_temp[i - 1] + "@" + array_temp[i].substring(0, int_temp);
			array_temp[i] = array_temp[i].substring(int_temp + 1);
		}
	}

	return func_return_merge_string(array_temp);
}

// ******************************* MERGE Odds Normal Bet Line Using "+" Split ************************
function func_merge_bet_line_odds(inval_string_1, inval_string_2) {
	var array_odds = new Array();
	// merge odds string
	var inval_string = inval_string_1 + "+" + inval_string_2;
	// split string to array for sorting
	var array_temp = inval_string.split("+");

	return func_return_merge_string(array_temp);
}

function func_merge_bet_line_banker(inval_string_1, inval_string_2, inval_pooltype) {
	var ary1 = inval_string_1.split('>');
	var ary2 = inval_string_2.split('>');
	var banker = "";
	if (ary1.length > 1 && ary2.length > 1) {
		var str1 = ary1[0] + "+" + ary2[0];
		var ary3 = str1.split("+");
		ary3 = ary3.sort(CompareFunc);
		banker = ary3[0];
		var count = 1;
		for (var i = 1; i < ary3.length; i++) {
			if (ary3[i] != ary3[i - 1]) {
				if ((inval_pooltype == array_str_allup_hr_type[3] || //QIN
						inval_pooltype == array_str_allup_hr_type[4] || //QPL
						inval_pooltype == array_str_allup_hr_type[5]) && count >= 1) //QQP
					break;
				if (inval_pooltype == array_str_allup_hr_type[6] && count >= 2) // TRI
					break;

				banker += '+' + ary3[i];
			}
		}
	} else if (ary1.length > 1) {
		banker = ary1[0];
	} else if (ary2.length > 1) {
		banker = ary2[0];
	}

	return banker + ">" + func_merge_bet_line_odds(ary1[ary1.length - 1], ary2[ary2.length - 1]);
}

function CompareFunc(a, b) {
	if (isNaN(a) || isNaN(b)) {
		if (a > b)
			return 1;
		else
			return -1;
	}

	return parseInt(a) - parseInt(b);
}

function CompareFuncRaceno(a, b) {
	if (a.raceno > b.raceno)
		return 1;
	else
		return -1; 
}

function CompareFuncML(a, b) {
	if (isNaN(a) || isNaN(b)) {
		var typeA = a.split('[')[0];
		var typeB = b.split('[')[0];

		var lineA = a.split('[')[1];
		var lineA2 = 0;

		var lineB = b.split('[')[1];
		var lineB2 = 0;

		if (lineA.indexOf('/') >= 0) {
			lineA2 = lineA.split('/')[1];
			lineA2 = parseFloat(lineA2.split(']')[0]);

			lineA = lineA.split('/')[0];
		}
		lineA = parseFloat(lineA.split(']')[0]);

		if (lineB.indexOf('/') >= 0) {
			lineB2 = lineB.split('/')[1];
			lineB2 = parseFloat(lineB2.split(']')[0]);

			lineB = lineB.split('/')[0];
		}
		lineB = parseFloat(lineB.split(']')[0]);

		if (lineA < lineB)
			return -1;
		if (lineA > lineB)
			return 1;
		if (lineA == lineB) {
			if (lineA2 < lineB2)
				return -1;
			if (lineA2 > lineB2)
				return 1;
		}

		if (typeA < typeB)
			return -1;
		if (typeA > typeB)
			return 1;

		return 0;
	}
}

// ******************************* MERGE Array value to string ************************
function func_return_merge_string(inobj) {
	var string_output = "";
	var array_sels = new Array();
	var array_odds = new Array();

	// check odds duplicate
	for (var i = 0; i < inobj.length; i++) {
		if (inobj[i] != "") {
			if (inobj[i].indexOf("[") >= 0) {
				var split_string = "[";
				var type_string = (inobj[i].split(split_string)[0]).toUpperCase();
				var value_string = split_string + (inobj[i].split(split_string)[1]).toUpperCase();

				array_odds[type_string] = value_string;
				array_sels[array_sels.length] = type_string;
			} else if (inobj[i].indexOf("@") >= 0) //  "@"
			{
				var type_string = (inobj[i].split("@")[0]).toUpperCase();
				var value_string = "@" + (inobj[i].split("@")[1]).toUpperCase();

				array_odds[type_string] = value_string;
				array_sels[array_sels.length] = type_string;
			} else {
				var type_string = inobj[i];
				array_odds[type_string] = '';
				array_sels[array_sels.length] = type_string;
			}
		}
	}

	array_sels = array_sels.sort(CompareFunc);

	string_output = array_sels[0] + array_odds[array_sels[0]] + "+";
	for (i = 1; i < array_sels.length; i++) {
		if (array_sels[i] != array_sels[i - 1])
			string_output += array_sels[i] + array_odds[array_sels[i]] + "+";
	}
	// return value with out last separate string
	return string_output.substring(0, string_output.length - 1);
}

// ******************************* MERGE Array value to string ************************
function func_return_merge_long_string(betType, inobj) {
	var string_output = "";
	var array_sels = new Array();
	var array_odds = new Array();

	// check odds duplicate
	for (var i = 0; i < inobj.length; i++) {
		if (inobj[i] != "") {
			if (inobj[i].indexOf("@") >= 0) {
				var type_string = (inobj[i].split("@")[0]).toUpperCase();
				var value_string = "@" + (inobj[i].split("@")[1]).toUpperCase();

				array_odds[type_string] = value_string;
				array_sels[array_sels.length] = type_string;
			} else {
				var type_string = inobj[i];
				array_odds[type_string] = '';
				array_sels[array_sels.length] = type_string;
			}
		}
	}

	//handle sorting for regular bet and Multiple line
	switch (betType) {
		case "HILO":
		case "FHLO":
		case "CHLO":
			array_sels = array_sels.sort(CompareFuncML);
			break;
		default:
			array_sels = array_sels.sort(CompareFunc);
	}

	string_output = array_sels[0] + array_odds[array_sels[0]] + "<BR>";
	for (i = 1; i < array_sels.length; i++) {
		if (array_sels[i] != array_sels[i - 1])
			string_output += array_sels[i] + array_odds[array_sels[i]] + "<BR>";
	}
	// return value with out last separate string
	return string_output;
}

function CreateAndAddAllUp() {

	//for racing, sort by race no first
	if (allUpFoBetObj.prod == "HR") {
		allUpFoBetObj.pools.sort(CompareFuncRaceno);
	}

    for ( var i=0; i<allUpFoBetObj.pools.length; i++ ) {
		allUpFoBetObj.pools[i].combs.sort(sortComb);
	}
	allUpFoBetObj.formula = $('#sel_formula option:selected').text();
	allUpFoBetObj.unitBet = GetAllUpUnitBet();

	if (betlines.length + 1 > cMaxBetlines) {
		alert(GetError("1205"));
		return cRetCodeOverMax;
	}

	// check bet buffer size
	if (IsBufferOverflowFO(allUpFoBetObj)) {
		alert(GetError("1203"));
		return cRetCodeOverMax;
	}

	// check duplicate bet
	if (IsDuplicateBetFO(allUpFoBetObj)) {
		alert(GetError("duplicate_bet_fixed_odds" + allUpFoBetObj.prod));
		return cRetCodeDuplicate;
	}

    var betInfo = new BetlineInfo();
	if (allUpFoBetObj.prod == "HR" && isFlexBetEnabled('ALUP'))
		betInfo.betMethod = 0;
    betInfo.foBetObj = allUpFoBetObj.clone();
	betInfo.enableAllUp = cAllUpNA;

	if (GetSetting("ALUP") == "2") {
		var new_betlines = [];
		for (var i = 0; i < betlines.length; i++) {
			if (betlines[i].enableAllUp != cAllUpSelected) {
				new_betlines.push(betlines[i]);
			}
		}
		betlines = new_betlines;
	}

	AppendBetline(betInfo);

	// START Nielsen Online SiteCensus
	if (allUpFoBetObj.prod == "FB") {
		WATrackerTrackClickEvent('betslip-fb-addbet-01');

	}

	if (allUpFoBetObj.prod == "HR") {
		WATrackerTrackClickEvent('betslip-hr-addbet-01');
	}
	// Support SSO
	isClientActionTaken(true);

	DeleteAllAllUpBetlines();
	ResetAllAllUpButtons();
	RedrawBetlineTable();
	DrawAddAllUpButton();
	LoadAllUpFormula();

}

function removeImgTag(str) {
	var imgPosSt = str.indexOf("<img");
	if (imgPosSt >= 0) {
		var imgPosEd = str.indexOf(">", imgPosSt);
		return str.substring(0, imgPosSt) + str.substring(imgPosEd + 1);
	}
	return str;
}

function GetAllUpLeague() {
	for (var i = 1; i < allUpBetlines.length; i++) {
		if (allUpBetlines[i].league != allUpBetlines[i - 1].league)
			return "";
	}
	return allUpBetlines[0].league;
}

function GetAllUpUnitBet() {  //keep
	var val = $('#inputAllUp').val();
	val = parseInt(val.replace('$', ''), 10);
	if (allUpFoBetObj.prod == 'FB') {
		if (val < psSBArray['ALUPX'].minAmt)
			return psSBArray['ALUPX'].storedAmt;
	} else {
		if (val < psHBArray['ALUPX'].minAmt)
			return psHBArray['ALUPX'].storedAmt;
	}
	return val;
}
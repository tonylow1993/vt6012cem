var cellhighlightColor = "#fff4b0";
var menuhighlighColor = "#4d822d";

//init scripts in body onload
function init() {
    curPage = 1;
    maxMatch = jsPageSizeDefault;

    //init clock
    initRefreshTime();

    //prevent odds checkbox is still checked on reload
    $(".codds input").prop("checked", false);

    if (typeof checkboxClickable == "boolean") {
        checkboxClickable = true;
    }

    // override jQuery.fn.hide to focus the browser to re-render after hide()
    overrideJQueryHide();

    groupCurType = 'groupCur';
    otherLength = jsotherLength;
}

function overrideJQueryHide() {
    var originalHide = jQuery.fn.hide;
    jQuery.fn.hide = function() {
        var emptyDiv = $("<div>").addClass("emptyDiv").css("display", "none");
        if (this.find("div.emptyDiv").length == 0) {
            this.append(emptyDiv);
        } else {
            this.find("div.emptyDiv").replaceWith(emptyDiv);
        }

        return originalHide.apply(this, arguments);
    };
}

//the scripts to be run at the end of the page
function onFinishLoading() {
    //preselect match dropdown
    matchddlselect();

    //hide header icon when no data
    hideHeaderIcons();

    //fix odds header width
    fixOddsHeaderWidth();
}

//init clock
function initRefreshTime() {
    if ($("#sRefreshTime").length) {
        $("#sRefreshTime").jclock({
            custom_offset: jsOffsetTime
        });
    }
}

//fix ref odds header width
function fixOddsHeaderWidth() {
    if ($(".refheader").length) {
        $(".refheader .cTitle").width(470);
    }
    if (jsLang == "EN") {
        //$(".normalheader .cTitle").width(370);
        $(".normalheader .cTitle").width(290);
    }
}

//hide error image
function errImg(_imgObj) {
    $(_imgObj).hide();
}

//remove header icon if there're no pools / matches / data
function hideHeaderIcons() {
    var $oddsCheckboxobj = $("input[type=checkbox]");
    if ($oddsCheckboxobj.length == 0) {
        $(".cActions a").hide();
        $(".addslip").hide();
        if ($(".tSCHEDULE").length > 0) {
            $(".cActions a").show();
        }
        if (location.href.toLowerCase().indexOf("football/index.aspx") > -1) { // added by turober,for print and refresh button should be shown in index page
            $(".cActions a").show();
        }
    }
}

function showHeaderIcons() {
    $(".cActions a").show();
    $(".addslip").show();
    adjustHeaderLayout();
}

function addDay(dayNumber, date) {
    date = date ? date : new Date();
    var ms = dayNumber * (1000 * 60 * 60 * 24);
    var newDate = new Date(date.getTime() + ms);
    return newDate;
}

function callInvestCal(_langCode) {
    var calUrl = "/football/cal/invest_cal/invest_calc2.aspx?lang=" + jsLang;
    divCalWindow = window.open(calUrl, "divCalculator", 'top=0,left=20,scrollbars=no,resizable=yes,width=680,height=452');
}

function callAllUpComb(_langCode) {
    var calUrl = "/football/cal/invest_cal/bet_six.aspx?lang=" + jsLang;
    divCalWindow = window.open(calUrl, "divCalculator", 'top=20,left=20,scrollbars=no,resizable=yes,width=770,height=550');
}

//refresh odds content
function refreshOddsContent() {
    $("#footballmaincontent").hide();
    $(".hAutoRefreshScript").each(function() {
        eval($(this).val());
    });
    window.setTimeout('$("#footballmaincontent").show();', 200);
}

//refresh odds page
function refreshOddsPage() {
    var nowDate = new Date();
    if ((nowDate - lastRefreshTime) > (manualRefreshInterval * 1000)) {
        lastRefreshTime = nowDate;
        renderAllTable(false);
    }
}

//preselect / remove selected item match dropdown
function matchddlselect() {
    var $ddlObj = $(".ddlAllMatches:first");
    var ddlObjWidth = $ddlObj.width();
    if (ddlObjWidth > 340) {
        ddlObjWidth = 340;
    }
    //alert(ddlObjWidth);

    if ($ddlObj.length) {
        var matchID = "";
        if (matchIDArr.length > 0) {
            matchID = matchIDArr[0];
        } else {
            matchID = $("#hHeaderMatchID").val();
        }

        if (!$.isNullOrEmpty(matchID)) {
            var $selectedObj = $(".ddlAllMatches:first option[value*='" + matchID + "']:first");
            var selectedIndex = $(".ddlAllMatches:first option[value*='" + matchID + "']:first").val();
            //alert(selectedIndex);
            $selectedObj.remove();
            $ddlObj.width(ddlObjWidth);

            var optiontext = "";
            var optionindex = 0;

            //removes the coupon that contains no matches
            var $options = $("option", $ddlObj);
            var $couponItemToRemove = null;
            for (var i = 0; i < $options.length - 1; i++) {
                var curOptionVal = ($options[i].value);
                var nextOptionVal = ($options[i + 1].value);

                if (curOptionVal.indexOf("--coupon") > -1 && nextOptionVal.indexOf("--coupon") > -1) {
                    //alert("delete coupon " + curOptionVal);
                    $couponItemToRemove = ($options[i]);
                }
            }
            if ($options[$options.length - 1].value.indexOf("--coupon") > -1) {
                $couponItemToRemove = ($options[$options.length - 1]);
            }

            //alert("delete coupon " + $couponItemToRemove.value);
            if ($couponItemToRemove != null) {
                $("option", $ddlObj).each(function() {
                    if ($(this).val().indexOf($couponItemToRemove.value) > -1) {
                        $(this).remove();
                    }
                });
            }
        }
    }
}

//flag description 
function goFlagUrl() {
    NewWindow(jsSpecialURL + 'football/info/' + curLang + '/match_info.asp', '', 600, 270, 1, 0);
}

//pool type description 
function goPTUrl() { //pool type
    NewWindow(jsSpecialURL + 'football/info/' + jsLang + '/misc/icons_popup.asp', 'PoolType', 770, 350, 1, 1);
}

//tv description 
function goTVUrl() { //TV
    NewWindow(jsSpecialURL + 'football/info/' + curLang + '/misc/tv_popup.asp', 'TV', 750, 500, 1, 1);
}

//match info head to head
function callMatchInfo(para) {
    NewWindow(jsMIURL.replace('{0}', (curLang == "ch" ? "chinese" : "english")) + para, '', 805, 550, 1, 1);
}

function callFootyLogic(countryId, leagueId, matchId) {
    var surl = jsFootyLogicUrl.replace('{lang}', (curLang == "ch" ? "zh" : "en"));
    surl = surl.replace('{countryId}', countryId).replace('{leagueId}', leagueId).replace('{matchId}', matchId);
    NewWindow(surl, '', 805, 550, 1, 1);
}

//open bet type
function callBetTypes(filename, ev) {
    cancelPropagation(ev);
    NewWindow(jsISURL + 'football/info/' + jsLang + '/betting/' + filename, 'BetTypes', 770, 500, 1, 0);
}

//cancel event propagation in onclick event
function cancelPropagation(ev) {
    if (ev != null) {
        ev = ev || window.event;
        if (ev.preventDefault) {
            ev.preventDefault();
            ev.stopPropagation();

        } else if ('cancelBubble' in ev) {
            ev.cancelBubble = true;
        }
    }
}

//print content
function printNow(url) {

    if (isChrome() && AMS.hasConnected)
        document.execCommand('print')
    else
        window.print();
}

//toggle multiple line
function tgIndMl(_matchIdx) {
    var _obj = $("#rmid" + _matchIdx);
    var isHidden = $(_obj).find(".tgIndMl").children("span").hasClass("mlBtnPlus");
    if (isHidden) {
        $(_obj).find(".tgIndMl").children("span.mlBtnPlus").addClass("mlBtnMinus");
        $(_obj).find(".tgIndMl").children("span.mlBtnPlus").removeClass("mlBtnPlus");
        $(_obj).find(".otherLineRow").show();
    } else {
        $(_obj).find(".tgIndMl").children("span.mlBtnMinus").addClass("mlBtnPlus");
        $(_obj).find(".tgIndMl").children("span.mlBtnMinus").removeClass("mlBtnMinus");
        $(_obj).find(".otherLineRow").hide();
    }

    var isAllCollapse = true;
    var id = _obj.parent().children()[0].id;
    var _obj2 = $("." + id);

    if (_obj2.find('.tgIndMl').find('span.mlBtnPlus').length > 0)
        isAllCollapse = false;
    /*
    for (var i = 1; i <= _obj2.length; i++) {
		
        if (_obj2.find('.tgIndMl').find('span.mlBtnPlus').length > 0)
            isAllCollapse = false;
    }
	*/

    var headerMl = $("#" + id).find('.tgMl');

    if (isAllCollapse) {
        headerMl.children("span.mlBtnPlus").addClass("mlBtnMinus");
        headerMl.children("span.mlBtnPlus").removeClass("mlBtnPlus");
        headerMl.children("span.mlLblExpand").hide();
        headerMl.children("span.mlLblCollapse").show();
    } else {
        headerMl.children("span.mlBtnMinus").addClass("mlBtnPlus");
        headerMl.children("span.mlBtnMinus").removeClass("mlBtnMinus");
        headerMl.children("span.mlLblCollapse").hide();
        headerMl.children("span.mlLblExpand").show();
    }
}

function tgMl(_obj, _couIdx) {
    var isCouponHidden = $(_obj).parent().children("span").hasClass("spBtnPlus");
    if (isCouponHidden) {
        tgCoupon($(_obj).parent(), _couIdx);
    }
    var isHidden = $(_obj).children("span").hasClass("mlBtnPlus");
    if (isHidden) {
        $(_obj).children("span.mlBtnPlus").addClass("mlBtnMinus");
        $(_obj).children("span.mlBtnPlus").removeClass("mlBtnPlus");
        $(_obj).children("span.mlLblExpand").hide();
        $(_obj).children("span.mlLblCollapse").show();
    } else {
        $(_obj).children("span.mlBtnMinus").addClass("mlBtnPlus");
        $(_obj).children("span.mlBtnMinus").removeClass("mlBtnMinus");
        $(_obj).children("span.mlLblCollapse").hide();
        $(_obj).children("span.mlLblExpand").show();
    }
    $("." + _couIdx + "").each(function() {
        var isIndHidden = $(this).children(".tgIndMl").children("span").hasClass("mlBtnPlus");
        if (isIndHidden || $(this).children(".tgIndMl").children("span").hasClass("mlBtnMinus")) {
            if (isHidden == isIndHidden) {
                if (isHidden) {
                    $(this).children(".tgIndMl").children("span.mlBtnPlus").addClass("mlBtnMinus");
                    $(this).children(".tgIndMl").children("span.mlBtnPlus").removeClass("mlBtnPlus");
                    $(this).find(".otherLineRow").show();
                } else {
                    $(this).children(".tgIndMl").children("span.mlBtnMinus").addClass("mlBtnPlus");
                    $(this).children(".tgIndMl").children("span.mlBtnMinus").removeClass("mlBtnMinus");
                    $(this).find(".otherLineRow").hide();
                }
            }
        }
    });
}

//toggle coupon show / hide
function tgCoupon(_obj, _couIdx) {
    var isHidden = $(_obj).children("span").hasClass("spBtnPlus");
    if (isHidden) {
        $(_obj).children("span.spBtnPlus").addClass("spBtnMinus");
        $(_obj).children("span.spBtnPlus").removeClass("spBtnPlus");
    } else {
        $(_obj).children("span.spBtnMinus").addClass("spBtnPlus");
        $(_obj).children("span.spBtnMinus").removeClass("spBtnMinus");
    }
    $("." + _couIdx + "").each(function() {
        if (isHidden) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

//toggle coupon show / hide

function tgCoupon2(_obj, _couIdx) {
    var isHidden = $(_obj).children("span").hasClass("spBtnPlus");
    if (isHidden) {
        $(_obj).children("span.spBtnPlus").addClass("spBtnMinus");
        $(_obj).children("span.spBtnPlus").removeClass("spBtnPlus");
    } else {
        $(_obj).children("span.spBtnMinus").addClass("spBtnPlus");
        $(_obj).children("span.spBtnMinus").removeClass("spBtnMinus");
    }

    $("." + _couIdx + "").each(function() {
        if (isHidden) {
            if ($(this).attr("class").indexOf("hidden") == -1) {
                $(this).show();
            }
        } else {
            $(this).hide();
        }
    });
}


//toggle mix cal show / hide
function tgMixCal(_obj, _calID) {
    var containerID = _calID.replace("Value", "");
    var isHidden = $("#" + containerID + " span.spMixBtn").hasClass("spMixBtnPlus");
    if (isHidden) {
        $("#" + containerID + " span.spMixBtn").addClass("spMixBtnMinus");
        $("#" + containerID + " span.spMixBtn").removeClass("spMixBtnPlus");
    } else {
        $("#" + containerID + " span.spMixBtn").addClass("spMixBtnPlus");
        $("#" + containerID + " span.spMixBtn").removeClass("spMixBtnMinus");
    }

    if (isHidden) {
        $("#" + _calID).show();
    } else {
        $("#" + _calID).hide();
    }
}

//toggle checked odds
var clickedCheckBox = [];

function tgTD(_obj, _oddsType) {
    if (typeof checkboxClickable == "boolean" && !checkboxClickable) {
        $(_obj).attr("checked", false);
        return false;
    }

    if ($(_obj).is(':checked')) {
        if ($(_obj).attr('class') != "") {
            clickedCheckBox.push($(_obj).attr('class'));
        }
        if (_oddsType == "FGS" || _oddsType == "CHP" || _oddsType == "TPS" || (pageName != "MIXALLUP" && (_oddsType == "CRS" || _oddsType == "FCS"))) {
            //if (_oddsType == "FGS" || _oddsType == "CRS" || _oddsType == "FCS") {
            $(_obj).parent().parent().addClass("checkedOdds");
            $(_obj).parent().parent().prev().addClass("checkedOdds");
        } else if (pageName == "MIXALLUP" && (_oddsType == "CRS" || _oddsType == "FCS")) {
            $(_obj).parent().parent().addClass("checkedOdds");
            $('.' + $(_obj).attr("id")).addClass("checkedOdds");
        } else if (_oddsType == "SGA") {
            $(_obj).parent().parent().parent().prev().addClass("checkedOdds");
            $(_obj).parent().parent().parent().addClass("checkedOdds");
        } else if (_oddsType == "GPW") {
            $(_obj).parent().parent().parent().parent().addClass("checkedOdds");
        } else if (_oddsType == "GPF") {
            $(_obj).parent().parent().parent().addClass("checkedOdds");
        } else {
            /*
            if (isML(pageName)) {
                $(_obj).parent().addClass("checkedOdds");
            } else {
            */
            $(_obj).parent().parent().addClass("checkedOdds");
            if (_oddsType == "CHP") {
                $(_obj).parent().parent().prev().addClass("checkedOdds");
            }
            //}
        }
    } else {
        if ($(_obj).attr('class') != "") {
            clickedCheckBox = jQuery.grep(clickedCheckBox, function(value) {
                return value != $(_obj).attr('class');
            });
        }
        if (_oddsType == "FGS" || _oddsType == "CHP" || _oddsType == "TPS" || (pageName != "MIXALLUP" && (_oddsType == "CRS" || _oddsType == "FCS"))) {
            $(_obj).parent().parent().removeClass("checkedOdds");
            $(_obj).parent().parent().prev().removeClass("checkedOdds");
        } else if (pageName == "MIXALLUP" && (_oddsType == "CRS" || _oddsType == "FCS")) {
            $(_obj).parent().parent().removeClass("checkedOdds");
            $('.' + $(_obj).attr("id")).removeClass("checkedOdds");
        } else if (_oddsType == "SGA") {
            $(_obj).parent().parent().parent().prev().removeClass("checkedOdds");
            $(_obj).parent().parent().parent().removeClass("checkedOdds");
        } else if (_oddsType == "GPW") {
            $(_obj).parent().parent().parent().parent().removeClass("checkedOdds");
        } else if (_oddsType == "GPF") {
            $(_obj).parent().parent().parent().removeClass("checkedOdds");
        } else {
            /*
            if (isML(pageName)) {
                $(_obj).parent().removeClass("checkedOdds");
            } else {
            */
            $(_obj).parent().parent().removeClass("checkedOdds");
            if (_oddsType == "CHP") {
                $(_obj).parent().parent().prev().removeClass("checkedOdds");
            }
            //}
        }
    }
}

//toggle checked odds in tournament
function tgTTD(_obj, _teamID) {
    if (typeof checkboxClickable == "boolean" && !checkboxClickable) {
        $(_obj).attr("checked", false);
        return false;
    }
    if ($(_obj).is(':checked')) {
        $("#" + _teamID).parent().parent().css("background-color", cellhighlightColor);
        $(_obj).parent().parent().addClass("checkedOdds");
    } else {

        $("#" + _teamID).parent().parent().removeClass("checkedOdds");
        $("#" + _teamID).parent().parent().css("background-color", "");
        $(_obj).parent().parent().removeClass("checkedOdds");
    }
}

function convertPoolName(tpool) {
    switch (tpool) {
        case "HHA":
            return "HHAD";
            break;
        case "HIL":
            return "HILO";
            break;
        case "CHL":
            return "CHLO";
            break;
        case "FHL":
            return "FHLO";
            break;
        case "FHA":
            return "FHAD";
            break;
        case "FCS":
            return "FCRS";
            break;
        case "EHA":
            return "ETHAD";
            break;
        case "EDC":
            return "ETHDC";
            break;
        case "EHL":
            return "ETHILO";
            break;
        case "ECH":
            return "ETCHLO";
            break;
        case "ECS":
            return "ETCRS";
            break;
        case "ETG":
            return "ETTTG";
            break;
        case "ENT":
            return "ETNTS";
            break;
        default:
            return tpool;
            break;
    }
};

//get js text
function GetGlobalResources(_key, _type) {
    try {
        var type = "js";
        if (_type != null && _type != "" && _type != undefined) {
            type = _type;
        }
        var text = eval(type + _key);
        if (text == "" || text == undefined || text == null) {
            return _key;
        }
        return text;
    } catch (e) {
        return _key;
    }
}

function GetBetlineResources(_key, lang) {
    var type = 'bs';
    if ((curLang == 'en' && lang == 'ch') || (curLang == 'ch' && lang == 'en'))
        type = 'bso';
    return GetGlobalResources(_key, type);
}

function GetResourcesByLang(str, lang) {
    try {
        var text = eval('js' + str + lang.toLowerCase());
        if (text == null) {
            return str;
        }
        return text;
    } catch (e) {
        return str;
    }
}

//go back to index
function gotoIndex() {
    switchTo('football', 'index', curLang);
}

//assign class for alternate rows in mix all and tournament
function assignAltClasses(_pagename) {
    //assign class
    if (_pagename == "MIXALLUP") {
        $(".tblMix tr:even").addClass("rAlt0");
        $(".tblMix tr:odd").addClass("rAlt1");
        $(".tblMix tr").each(function() {
            if ($(this).children("td").length < 10) {
                $(this).append("<td colspan='5'></td>");
            }
        });
    } else if (_pagename == "TOURN") {
        //chp
        $(".tblCHP").each(function() {
            $(this).find("tr:odd").addClass("rAlt1");
            $(this).find("tr:even").addClass("rAlt0");

            var teamscount = $(this).find(".cteams").length;
            var cteamsExtra = teamscount <= 2 ? " c2teams" : "";

            $(this).find(".cteams").attr("class", "cteams cteams1" + cteamsExtra);
            $(this).find("td:nth-child(2)").attr("class", "cteams cteams0" + cteamsExtra);
            var $lastrowObj = $(this).find("tr:last");
            var $firstItem = $lastrowObj.find("td:nth-child(2)");
            if ($firstItem.hasClass("cteams1")) {
                $firstItem.removeClass("cteam1");
                $firstItem.addClass("cteams0");
            }

            if (teamscount > 2) {
                //append dummy cells if it's not complete
                if ($lastrowObj.find(".tourn_dummy").length == 0 && $lastrowObj.find("td").length < 12) {
                    var colspanCounter = 12 - $lastrowObj.find("td").length;
                    if ($(this).find("tr").length > 1) { // amend 110607
                        $lastrowObj.append("<td class='tourn_dummy' colspan='" + (colspanCounter) + "'></td>");
                    } else {
                        $lastrowObj.append("<td class='tourn_dummy'></td>");
                    }
                    if (teamscount == 2) {
                        $lastrowObj.children(".tourn_dummy").width("50%");
                    } else if (teamscount < 4) {
                        $lastrowObj.children(".tourn_dummy").width(colspanCounter * 61); //  78   modified by kevin
                    }
                }
            } else if (teamscount == 1) {
                $lastrowObj.append("<td class='tourn_dummy' width='50%'></td>");
            }
        });

        //hide empty groups for GPW       
        $(".tblGPW td").each(function() {
            if ($(this).html() == "-") {
                $(this).hide();
            }
        });
        var gpwgroupCnt = parseInt($("#hgpwgrpcnt").val());
        var gpwOddsGroupCnt = $(".tblGPW .cmid").length / 2;
        if (gpwOddsGroupCnt < gpwgroupCnt) {
            gpwgroupCnt = gpwOddsGroupCnt;
        }
        if (gpwgroupCnt > 0 && gpwgroupCnt < 4) {
            var newwidth = 156 * gpwgroupCnt;
            $(".tblGPW").width(newwidth);
            $(".oddsGPW").css("text-align", "left");
        }
        //hide div if no options
        if (gpwgroupCnt == 0) {
            $(".oddsGPWHeader").hide();
        }

        $(".tblGPF").each(function() {
            $(this).css("table-layout", "fixed");

            var rHeaderCount = $(this).find(".cRightBorder").length;

            if (rHeaderCount > 0) {
                var blkCount = $(this).find(".cRightBorder .blk1").length;

                if (blkCount > 0) {

                    if (typeof(document.documentMode) != 'undefined') {
                        var dMode = document.documentMode;

                        var imageUrl = $(this).find(".cRightBorder").css("background-image");
                        var imageUrlPattern = /url\((.*)\)/g;

                        var urlResult = imageUrlPattern.exec(imageUrl);

                        if (urlResult) {
                            imageUrl = urlResult[1];
                        } else {
                            imageUrl = "";
                        }

                        if (dMode <= 8) {
                            $(this).find(".gpf12.cRightBorder").css("position", "relative");
                            $(this).find(".gpf12.cRightBorder").css(
                                "filter",
                                "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" + imageUrl + ", sizingMethod='scale');");
                        }
                    }

                    var winnerWording = $(this).find(".cRightBorder .blk1");
                    winnerWording.css("left", "0px");
                    winnerWording.css("text-align", "right");
                    winnerWording.css("padding-right", "5px");

                    var runnerupWording = $(this).find(".cRightBorder .blk2");
                    runnerupWording.css("top", "8px");
                    runnerupWording.css("left", "0px");
                    runnerupWording.css("padding-left", "2px")
                }
            }
        });

        //add alternate row color for GPW
        $(".tblGPW tr.tournrows:even").addClass("rAlt0");
        $(".tblGPW tr.tournrows:odd").addClass("rAlt1");


        $(".tblTPS").each(function() {
            //add alternate row color for TPS
            $(this).find("tr:even").addClass("rAlt0");
            $(this).find("tr:odd").addClass("rAlt1");


            var teamscount = $(this).find(".cteams").length;
            $(this).find("tr:last").each(function() {
                //remove extra left border of last row
                var $firstItem = $(this).children("td:nth-child(2)");

                if ($firstItem.hasClass("cteams1")) {
                    $firstItem.removeClass("cteam1");
                    $firstItem.addClass("cteams0");

                }
                //append dummy cells if it's an odd number

                if ($(this).find(".tourn_dummy").length == 0 && $(this).children("td").length < 12) {
                    var colspanCounter = 12 - $(this).children("td").length;
                    $(this).append("<td class='tourn_dummy' colspan='" + (colspanCounter) + "'></td>");
                    if (teamscount < 4) {
                        $(this).children(".tourn_dummy").width(78 * colspanCounter);
                    }
                }
            });
        });

        //hide SPC header if no content
        if ($(".tblSPC").length == 0) {
            $(".oddsSPCHeader").hide();
        }
    }
}

//create by jack
function toggleRow(obj) {
    var img = $(obj).find("img").eq(0);
    var imgSrc = $(img).attr("src");
    var isHidden = imgSrc.indexOf("close") != -1 ? false : true;
    if (isHidden) {
        $(obj).siblings().each(function() {
            $(this).show();
        });
        $(img).attr("src", imgSrc.replace("open", "close"));
    } else {
        $(obj).siblings().each(function() {
            $(this).hide();
        });
        $(img).attr("src", imgSrc.replace("close", "open"));
    }
}

function stop(id, event) {
    if ($("#" + id).css("display") != "none") {
        cancelPropagation(event);
    }
}

function removeApos(team, f) {
    return team;
}
//toggle checked odds
function toggleCheckBox(objID, betType) {
    var obj = document.getElementById(objID);
    if ($(obj).is(':checked')) {
        $(obj).parent().addClass("checkedOdds");
        if (betType == "DHCP") {
            $(obj).parent().prev().addClass("checkedOdds");
            if ($(obj).val() == "F") {
                $("input[type=checkbox][name=" + $(obj).attr("name") + "]").each(function() {
                    if ($(this).val() != "F") {
                        if ($(this).is(':checked')) {
                            $(this).click();
                        }
                        $(this).parent().removeClass("checkedOdds");
                        $(this).parent().prev().removeClass("checkedOdds");
                    }
                });
                $(obj).parent().siblings().each(function() {
                    $(this).addClass("checkedOdds");
                });
            } else {
                $("input[type=checkbox][name=" + $(obj).attr("name") + "]").each(function() {
                    if ($(this).val() == "F") {
                        if ($(this).is(':checked')) {
                            $(this).click();
                        }
                        $(this).parent().removeClass("checkedOdds");
                        $(this).parent().siblings().each(function() {
                            $(this).removeClass("checkedOdds");
                        });
                    }
                });
            }
        }
    } else {
        $(obj).parent().removeClass("checkedOdds");
        if (betType == "DHCP") {
            if ($(obj).val() == "F") {
                $("input[type=checkbox][name=" + $(obj).attr("name") + "]").each(function() {
                    if ($(this).val() != "F") {
                        $(this).removeAttr("disabled", true);
                    }
                });
                $(obj).parent().prevAll().removeClass("checkedOdds");
                $(obj).parent().nextAll().removeClass("checkedOdds");
            } else {
                $(obj).parent().prev().removeClass("checkedOdds");
            }
        }
    }
}

//format div cal parameters js

function hexnib(d) {
    if (d < 10) return d;
    else return String.fromCharCode(65 + d - 10);
}

function hexbyte(d) {
    return "%" + hexnib((d & 240) >> 4) + "" + hexnib(d & 15);
}

function hexcode(url) {
    var result = "";
    var hex = "";
    for (var i = 0; i < url.length; i++) {
        var cc = url.charCodeAt(i);
        if (cc < 128) {
            result += hexbyte(cc);
        } else if ((cc > 127) && (cc < 2048)) {
            result += hexbyte((cc >> 6) | 192) +
                hexbyte((cc & 63) | 128);
        } else {
            result += hexbyte((cc >> 12) | 224) +
                hexbyte(((cc >> 6) & 63) | 128) +
                hexbyte((cc & 63) | 128);
        }
    }
    return result;
}

var hex = ["%00", "%01", "%02", "%03", "%04", "%05", "%06", "%07",
    "%08", "%09", "%0a", "%0b", "%0c", "%0d", "%0e", "%0f",
    "%10", "%11", "%12", "%13", "%14", "%15", "%16", "%17",
    "%18", "%19", "%1a", "%1b", "%1c", "%1d", "%1e", "%1f",
    "%20", "%21", "%22", "%23", "%24", "%25", "%26", "%27",
    "%28", "%29", "%2a", "%2b", "%2c", "%2d", "%2e", "%2f",
    "%30", "%31", "%32", "%33", "%34", "%35", "%36", "%37",
    "%38", "%39", "%3a", "%3b", "%3c", "%3d", "%3e", "%3f",
    "%40", "%41", "%42", "%43", "%44", "%45", "%46", "%47",
    "%48", "%49", "%4a", "%4b", "%4c", "%4d", "%4e", "%4f",
    "%50", "%51", "%52", "%53", "%54", "%55", "%56", "%57",
    "%58", "%59", "%5a", "%5b", "%5c", "%5d", "%5e", "%5f",
    "%60", "%61", "%62", "%63", "%64", "%65", "%66", "%67",
    "%68", "%69", "%6a", "%6b", "%6c", "%6d", "%6e", "%6f",
    "%70", "%71", "%72", "%73", "%74", "%75", "%76", "%77",
    "%78", "%79", "%7a", "%7b", "%7c", "%7d", "%7e", "%7f",
    "%80", "%81", "%82", "%83", "%84", "%85", "%86", "%87",
    "%88", "%89", "%8a", "%8b", "%8c", "%8d", "%8e", "%8f",
    "%90", "%91", "%92", "%93", "%94", "%95", "%96", "%97",
    "%98", "%99", "%9a", "%9b", "%9c", "%9d", "%9e", "%9f",
    "%a0", "%a1", "%a2", "%a3", "%a4", "%a5", "%a6", "%a7",
    "%a8", "%a9", "%aa", "%ab", "%ac", "%ad", "%ae", "%af",
    "%b0", "%b1", "%b2", "%b3", "%b4", "%b5", "%b6", "%b7",
    "%b8", "%b9", "%ba", "%bb", "%bc", "%bd", "%be", "%bf",
    "%c0", "%c1", "%c2", "%c3", "%c4", "%c5", "%c6", "%c7",
    "%c8", "%c9", "%ca", "%cb", "%cc", "%cd", "%ce", "%cf",
    "%d0", "%d1", "%d2", "%d3", "%d4", "%d5", "%d6", "%d7",
    "%d8", "%d9", "%da", "%db", "%dc", "%dd", "%de", "%df",
    "%e0", "%e1", "%e2", "%e3", "%e4", "%e5", "%e6", "%e7",
    "%e8", "%e9", "%ea", "%eb", "%ec", "%ed", "%ee", "%ef",
    "%f0", "%f1", "%f2", "%f3", "%f4", "%f5", "%f6", "%f7",
    "%f8", "%f9", "%fa", "%fb", "%fc", "%fd", "%fe", "%ff"
];

function getChar(chr) {
    for (var i = 0; i < hex.length; i++) {
        if (unescape(hex[i]) == chr)
            return hex[i];
    }
    return chr;
}

function convert(str) {
    str = str.split("");
    var newstr = [];
    for (var i = 0; i < str.length; i++) {
        newstr[i] = getChar(str[i]);
    }
    return newstr.join("");
}

function removeDivCalApos(tstr, ctype) {
    if (ctype == 'b') {
        while (tstr.indexOf("&#39;") >= 0) {
            tstr = tstr.replace("&#39;", "'");
        }
    } else {
        while (tstr.indexOf("&#39;") >= 0) {
            tstr = tstr.replace("&#39;", "\'");
        }
        while (tstr.indexOf(",") >= 0) {
            tstr = tstr.replace(",", " ");
        }
    }
    return tstr;

}

function getSearchParameters() {
    var prmstr = window.location.search.substr(1);
    return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray(prmstr) {
    var params = {};
    var prmarr = prmstr.split("&");
    for (var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params;
}

function removeLeadingZero(instr) {
    var returnVal = instr.replace(/^[0]+/g, "");
    if (returnVal == "") {
        return instr;
    } else {
        return returnVal;
    }
}

function toggleImage(obj) {
    var imgSrc = $(obj).attr("src");
    if (imgSrc.indexOf("on.") == -1) {
        $(obj).attr("src", imgSrc.replace(".", "_on."));
    } else {
        $(obj).attr("src", imgSrc.replace("_on.", "."));
    }
}

function mobileToggleImage(obj) {
    if (!isMobile()) {
        var imgSrc = $(obj).attr("src");
        if (imgSrc.indexOf("on.") == -1) {
            $(obj).attr("src", imgSrc.replace(".", "_on."));
        } else {
            $(obj).attr("src", imgSrc.replace("_on.", "."));
        }
    }
}

function scroll() {
    $(window).scrollTop($(document).height());
}

function SelChecked(obj) {
    $("#" + obj).find("input[type=radio]").each(function() {
        if ($(this).attr("value") == "2") {
            $(this).attr("checked", true);
        }
    })
}

function checkIsInt(val) {
    var reg = /\d+/;
    if (reg.test(val)) {
        return true;
    }
    return false;
}

function chkDate(year, month, day) {
    if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
        return false;
    }
    if (month == 2) {
        var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
        if (day > 29 || (day == 29 && !isleap)) {
            return false;
        }
    }
    return true;
}

function getDefaultAmount(type) {
    try {
        var amt = getUnitBetAmount(type);
        if (amt == "" || amt == 'undefined' || isNaN(amt))
            return "10";
        else
            return amt;
    } catch (e) {
        return "10";
    }
}

/***************************** for tournament CHP,TPS,GPW handle selling only. start ****************************************/

function handleSellingDisplay(handleId, tabObj) {
    if ($("#" + tabObj).find("input[type='checkbox']").length == 0) {
        $("#" + handleId).hide();
    }
}

var chpTableAllContent = new Array(),
    tpsTableAllContent = new Array(),
    gpwTableAllContent = new Array();
var tmpTorunOddsUpdate = new Array();

function replaceOddsTable(tabObj) {
    if (!$.isNullOrEmpty(tabObj)) {
        if (tabObj.indexOf("CHP") > -1) {
            for (var i = 0; i < chpTableAllContent.length; i++) {
                if (chpTableAllContent[i].id == tabObj) {
                    chpTableAllContent[i].content = $("#" + tabObj).find("tbody").html();
                }
            }
        } else if (tabObj.indexOf("TPS") > -1) {
            for (var i = 0; i < tpsTableAllContent.length; i++) {
                if (tpsTableAllContent[i].id == tabObj) {
                    tpsTableAllContent[i].content = $("#" + tabObj).find("tbody").html();
                }
            }
        }
    }
}

function saveTableAllContent(tabObj, tableArray) {
    var hasAdd = false;
    var foundTable;
    for (var i = 0; i < tableArray.length; i++) {
        if (tableArray[i].id == tabObj) {
            hasAdd = true;
            foundTable = tableArray[i];
        }
    }
    if (!hasAdd) {
        var obj = new Object();
        obj.id = tabObj;
        obj.content = $("#" + tabObj).find("tbody").html();
        tableArray.push(obj);
    } else {
        foundTable.content = $("#" + tabObj).find("tbody").html();
    }
}

function handleSelling(obj, tabObj) {
    //debugger;
    if ($("#" + tabObj).length == 0) {
        if ($.find("table[id^='" + tabObj + "']").length > 0) {
            tabObj = $.find("table[id^='" + tabObj + "']")[0].id;
        }
    }

    var isGPW = tabObj.indexOf("GPW") > -1;
    var isCHP = tabObj.indexOf("CHP") > -1;
    var isTPS = tabObj.indexOf("TPS") > -1;
    var isIpCHP = $('label[id$=CHP_INPLAY_plst]').length > 0;

    //if ($("#" + obj).val() == jsSellingOnly) {
    if ($("#" + obj).attr("src").indexOf("_sellonly") > -1) {
        //$("#" + obj).val(jsTournShowAll);
        $("#" + obj).attr("src", $("#" + obj).attr("src").replace("_sellonly", "_showall"));

        if (isCHP)
            saveTableAllContent(tabObj, chpTableAllContent);
        else if (isTPS)
            saveTableAllContent(tabObj, tpsTableAllContent);
        else if (isGPW)
            saveTableAllContent(tabObj, gpwTableAllContent);

        var handleCls = isIpCHP ? '.cLSE,.cRFD' : '.cLSE'; //hide RFD class also for CHP inplay
        var hasHandleCls = false;

        $("#" + tabObj).find("input" + handleCls + "[type='checkbox']").each(function() {
            hasHandleCls = true;
            var tmpId = $(this).attr("id").substr(0, $(this).attr("id").lastIndexOf("_"));
            $(this).parent().parent().hide();
            $("#s_" + tmpId).parent().parent().hide();
        });
        if (hasHandleCls) {
            var checkBoxStatus = getCheckedSelection(tabObj);
            if (isGPW)
                sortGpwTable(tabObj);
            else
                sortTable(tabObj);
            updateCheckBox(checkBoxStatus, tabObj);
        }
    } else {
        //$("#" + obj).val(jsSellingOnly);
        $("#" + obj).attr("src", $("#" + obj).attr("src").replace("_showall", "_sellonly"));
        var tableContents = new Array();
        if (isCHP)
            tableContents = chpTableAllContent;
        else if (isGPW)
            tableContents = gpwTableAllContent;
        else if (isTPS)
            tableContents = tpsTableAllContent;

        for (var i = 0; i < tableContents.length; i++) {
            if (tableContents[i].id == tabObj) {
                var currentOddsList = getCurrentOdds(tabObj);
                var checkBoxStatus = getCheckedSelection(tabObj);
                $("#" + tabObj + " tbody").html(tableContents[i].content);
                updateOldOdds(tabObj, currentOddsList);
                updateCheckBox(checkBoxStatus, tabObj);
            }
        }
    }

    updateHandleSellingHeader(tabObj);
    //assignAltClasses("TOURN");
}

function updateHandleSellingHeader(objId) {
    var isCHP = objId.indexOf("CHP") > -1;
    if (isCHP) {
        var selTable = $("#" + objId);
        var show2Col = selTable.find("td[class*=cteams]").length <= 2;
        var header = selTable.prev().prev();
        if (show2Col) {
            header.find("td[class*=cteams]").each(function(index) {
                $(this).addClass(index < 2 ? "c2teams" : "c2teamsInv");
            });
            header.find("td[class*=codds]").each(function(index) {
                $(this).addClass(index < 2 ? "c2odds" : "c2oddsInv");
            });
        } else {
            header.find("td[class*=cteams]").removeClass("c2teams c2teamsInv");
            header.find("td[class*=codds]").removeClass("c2odds c2oddsInv");
        }
    }
}

function handleSellingForTps(objId) {
    //if ($("input[type='button'][id^='" + objId + "']").eq(0).val() == jsSellingOnly) {
    if ($("img[id^='" + objId + "']").length > 0) {
        if ($("img[id^='" + objId + "']").eq(0).attr("src").indexOf("_sellonly") > -1) {
            //$("input[type='button'][id^='" + objId + "']").val(jsTournShowAll);
            $("img[id^='" + objId + "']").attr("src", $("img[id^='" + objId + "']").eq(0).attr("src").replace("_sellonly", "_showall"));
            var tpsObj; // = new Object();
            $("table[id^='" + objId + "']").each(function() {
                tpsObj = new Object();
                tpsObj.id = $(this).attr("id");
                tpsObj.content = $(this).find("tbody").html()
                tpsTableAllContent.push(tpsObj);
                $(this).find("input[type='checkbox'][class='cLSE']").each(function() {
                    var tmpId = $(this).attr("id").substr(0, $(this).attr("id").lastIndexOf("_"));
                    $(this).parent().parent().hide();
                    $("#s_" + tmpId).parent().parent().hide();
                });
                if ($(this).find("input[type='checkbox'][class='cLSE']").length > 0) {
                    sortTable($(this).attr("id"));
                }
            });
        } else {
            //$("input[type='button'][id^='" + objId + "']").val(jsSellingOnly);
            $("img[id^='" + objId + "']").attr("src", $("img[id^='" + objId + "']").eq(0).attr("src").replace("_showall", "_sellonly"));
            $("table[id^='" + objId + "']").each(function() {
                for (var i = 0; i < tpsTableAllContent.length; i++) {
                    if (tpsTableAllContent[i].id == $(this).attr("id")) {
                        var currentOddsList = getCurrentOdds($(this).attr("id"));
                        $(this).find("tbody").html(tpsTableAllContent[i].content);
                        updateOldOdds(currentOddsList);
                    }
                }
            });
        }
    }
    //formatStyle(objId);
    //assignAltClasses("TOURN");
}

function sortGpwTable(tabId) {
    var itemPerRow = 4;
    var tabObj = $("#" + tabId);
    var tournRows = $("#" + tabId).find("tr[class*='tournrows0']");

    for (var rowNo = 0; tournRows.length > 0; tournRows = tabObj.find("tr[class*='tournrows" + (++rowNo) + "']")) {
        var sortedTdsArray = new Array();

        //move the LSE <td>s to the bottom and append an spaced <td>\
        for (var itemNo = 0; itemNo < itemPerRow; itemNo++) {
            var tdsArray = new Array();
            var hiddenTdsArray = new Array();
            tournRows.each(function() {
                var gpwObj = new Object();
                var oddObj = $(this).find("td[class*='codds" + +itemNo + "']");

                gpwObj.team = $(this).find("td[class*='cteams" + itemNo + "']").clone().wrap('<p>').parent().html();
                gpwObj.odds = oddObj.clone().wrap('<p>').parent().html();

                if (oddObj.find("input[type='checkbox'][class='cLSE']").length > 0) {
                    gpwObj.team += "<td style=\"height:0px;background-color:#fff;\" colspan=\"2\" class=\"cteams" + itemNo + "\"></td>";
                    hiddenTdsArray.push(gpwObj);
                } else
                    tdsArray.push(gpwObj);
            });
            sortedTdsArray.push(tdsArray.concat(hiddenTdsArray));
        }

        //update the <tr>
        tournRows.each(function(trIdx) {
            var innerHTML = "";
            $.each(sortedTdsArray, function(tdIdx, tdItem) {
                innerHTML += nullToEmptyStr(tdItem[trIdx].team) + nullToEmptyStr(tdItem[trIdx].odds);
            });
            $(this).html(innerHTML);
        });
    }
}

function nullToEmptyStr(obj) {
    if (obj == null) return "";
    return obj;
}

function sortTable(tabId) {
    var tabArray = new Array();
    $("#" + tabId).find("tbody tr").each(function() {
        var tmpTeamArray = new Array();
        var tmpOddsArray = new Array();
        var rowArray = new Array();
        $(this).find("td[class^='cteams']").each(function() {
            tmpTeamArray[tmpTeamArray.length] = $(this);
        });
        $(this).find("td[class^='codds']").each(function() {
            tmpOddsArray[tmpOddsArray.length] = $(this);
        });

        for (var i = 0; i < tmpTeamArray.length; i++) {
            var item = {
                team: tmpTeamArray[i],
                odds: tmpOddsArray[i]
            };
            rowArray[rowArray.length] = item;
        }
        tabArray[tabArray.length] = rowArray;
    });

    var listArray = new Array();
    for (var j = 0; j < 4; j++) {
        for (var i = 0; i < tabArray.length; i++) {
            if (tabArray[i][j] && tabArray[i][j].team.css("display") != "none") {
                listArray[listArray.length] = tabArray[i][j];
            }
        }
    }
    var noBeenAdd = "";
    var tabString = "";
    var endRow = "";
    var tmpAboveRowArray = new Array();
    var tmpEndRowArray = new Array();
    var res1 = listArray.length % 4;
    var nowCountRow = parseInt(listArray.length / 4); //2
    var tmpCount = nowCountRow;

    //special handle for <= 2 CHP items
    var isCHP = tabId.indexOf("CHP") > -1;
    var cteamsExtra = listArray.length <= 2 && isCHP ? " c2teams" : "";
    var coddsExtra = listArray.length <= 2 && isCHP ? " c2odds" : "";

    if (res1 > 0) {
        tmpCount++;
        for (var index = 0; index < listArray.length; index++) {
            if ((index + 1) % tmpCount == 0) {
                if (tmpEndRowArray.length < res1) {
                    tmpEndRowArray.push(listArray[index]);
                } else {
                    tmpAboveRowArray.push(listArray[index]);
                }
            } else {
                tmpAboveRowArray.push(listArray[index]);
            }
        }
        endRow += "<tr class='rAlt" + nowCountRow % 2 + "'>";
        for (var i = 0; i < tmpEndRowArray.length; i++) {
            endRow += "<td> </td>" + "<td class='cteams cteams" + i + cteamsExtra + "'>" + tmpEndRowArray[i].team.html() + "</td>";
            endRow += "<td class='codds" + coddsExtra + "'>" + tmpEndRowArray[i].odds.html() + "</td>";
        }
        endRow += "</tr>";
    } else {
        tmpAboveRowArray = listArray;
    }

    for (var i = 0; i < nowCountRow; i++) {
        tabString += "<tr class='rAlt" + i % 2 + "'>";
        for (var j = 0; j < 4; j++) {
            if (j * nowCountRow + i < tmpAboveRowArray.length) {
                tabString += "<td> </td>" + "<td class='cteams cteams" + j + cteamsExtra + "'>" + tmpAboveRowArray[j * nowCountRow + i].team.html() + "</td>";
                tabString += "<td class='codds" + coddsExtra + "'>" + tmpAboveRowArray[j * nowCountRow + i].odds.html() + "</td>";
            }
        }
        tabString += "</tr>";
    }
    $("#" + tabId + " tbody").html(tabString + endRow);
}

function getTournPoolId(tabId) {
    var ids = [];
    $("#" + tabId + " .oddsLink").each(function() {
        if ($(this) != null && $(this).attr("id") != null) {
            var id = $(this).attr("id").split('_')[2];
            if ($.inArray(id, ids) == -1)
                ids.push(id);
        }
    });

    return ids;
}

function getCurrentOdds(tabId) {
    var oddsList = new Array();
    $("#" + tabId + " .oddsLink").each(function() {
        var oddsObj = {
            id: $(this).attr("id"),
            odds: $(this).html()
        };
        oddsList.push(oddsObj);
    });
    return oddsList;
}

function getCheckedSelection(tabId) {
    var checkList = new Array();
    $("#" + tabId + " input[type='checkbox']").each(function() {
        if ($(this).is(':checked')) {
            checkList.push($(this).attr("id"));
        }
    });
    return checkList;
}

function updateOldOdds(tabId, oddsList) {
    var tournPoolIds = getTournPoolId(tabId);
    $.each(tournPoolIds, function(idx, val) {
        var arg = tmpTorunOddsUpdate[val];
        if (arg != null) {
            updateOddsSet(arg.oddsSet, arg.newOdds, arg.isSell, true);
            if ($(arg.tPrefix_IPCHP + "_plst").length > 0) { // the object exists leng > 0
                updateOddsSetIPCHP(arg.oddsSet, arg.newOdds, arg.isSell);

                //update pool status in inplay all odds page
                updatePoolStatus($(arg.tPrefix_IPCHP + "_plst"), arg.poolStatus);
            }
        } else {
            for (var i = 0; i < oddsList.length; i++) {
                $("#" + oddsList[i].id).html(oddsList[i].odds);
            }
        }
    });

}

function updateCheckBox(checkBoxList, tabId) {
    //remove checked status first
    $("#" + tabId + " input[type='checkbox']").each(function() {
        $(this).attr("checked", false);
        $(this).parent().parent().removeClass("checkedOdds");
        if ($(this).parent().parent().is(':visible'))
            $(this).parent().parent().prev("td").css("background-color", "");
    });
    //update checked status
    for (var j = 0; j < checkBoxList.length; j++) {
        //$("#" + checkBoxList[j]).click();
        $("#" + checkBoxList[j]).attr("checked", true);
        $("#" + checkBoxList[j]).parent().parent().addClass("checkedOdds");
        $("#" + checkBoxList[j]).parent().parent().prev("td").css("background-color", "rgb(255, 244, 176)");
    }
}

function tgCoupon3(_obj, _couIdx, btnObj, tabObj, prev) {
    var isHidden = $(_obj).hasClass("spBtnPlus");
    if (prev) {
        isHidden = true;
    }
    var curBtnObj;
    if ($(_obj).next("span").find("img[id*='handleBtn']").length > 0) {
        curBtnObj = $(_obj).next("span").find("img[id*='handleBtn']");
    } else {
        curBtnObj = $(_obj).next("span").next("span").find("img[id*='handleBtn']");
    }
    if (isHidden && curBtnObj.attr("src").indexOf("_sellonly") > -1) {
        var btnId = curBtnObj.attr("id");
        var tableId = $("table[id^='" + btnId.substr(0, btnId.lastIndexOf("_")) + "']").attr("id");
        handleSelling(btnId, tableId);
        assignAltClasses("TOURN");
    }
    tgCoupon($(_obj).parent(), _couIdx);
}

function replaceEliminated(obj) {
    $("#" + obj).find("span [class^='oddsLink']").each(function() {
        if ($(this).hasClass("cLSE")) {
            $(this).html("---");
        }
    })
}

/***************************** for tournament CHP,TPS,GPW handle selling only. end ****************************************/

var tournidMapping = new Array();
var tournNumMapping = new Array();

function tournIdMapping(tournStr) {
    var tmpArr1 = tournStr.split(';');
    for (var i = 1; i < tmpArr1.length; i++) {
        var tmpArr2 = tmpArr1[i].split('#');
        var tmpPoolIds = tmpArr2[0].split(',');
        var tmpTournIdNum = tmpArr2[1].split('_');
        for (var j = 1; j < tmpPoolIds.length; j++) {
            tournidMapping[tmpPoolIds[j]] = tmpTournIdNum[0];
            tournNumMapping[tmpPoolIds[j]] = tmpTournIdNum[1];
        }
    }
}

function sortInplayPool(poolListStr, defaultOrderStr) {
    var sortedPool = new Array();
    try {
        var poolList = poolListStr.toUpperCase().split(',');
    } catch (e) {
        return;
    }

    if (defaultOrderStr) {
        var defaultOrders = defaultOrderStr.toUpperCase().split(',');

        //move chp to last pos, if chp exists
        var chpPos = $.inArray("CHP", defaultOrders);
        if (chpPos > -1) {
            defaultOrders.splice(chpPos, 1);
            defaultOrders.push("CHP");
        }

        $.each(defaultOrders, function(idx, val) {
            if ($.inArray(val, poolList) > -1)
                sortedPool.push(val);
        });
    }

    return sortedPool.join(",");
}

//get x to y allup legs
function formatAllupLegs(_oddsType, _type) {
    var otype = _oddsType;
    if (_oddsType == "FHAD") {
        otype = "FHA";
    } else if (_oddsType == "HILO") {
        otype = "HIL";
    } else if (_oddsType == "CHLO") {
        otype = "CHL";
    } else if (_oddsType == "FHLO") {
        otype = "FHL";
    } else if (_oddsType == "HHAD") {
        otype = "HHA";
    }

    var legsNo = allupInfo[otype];
    var legsNoStr = (legsNo != null && legsNo != "" && legsNo != "0") ? eval("jslegs_" + legsNo) : "";

    switch (_type.toLowerCase()) {
        case "short":
            return legsNoStr + jslegs;
        case "mix_check":
            if (legsNo != "8" && legsNo != "" && legsNo != "0") {
                return "[" + legsNoStr + jslegs + "]";
            } else {
                return "";
            }
        case "js":
            var n = parseInt(legsNo);
            if (isNaN(n)) {
                return "0";
            } else {
                return legsNo;
            }
        default:
            if (String.IsNullOrEmpty(legsNo) || legsNo == "0") {
                return "";
            } else {
                return String.format(jslegsUpTo, legsNoStr);
            }
    }
}


// sort_by function from
// http://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
var sort_by = function(field, reverse, primer) {
    var sortKey = '["' + field.split('.').join('"]["') + '"]';
    var key = primer ?
        function(x) {
            return primer(eval('x' + sortKey))
        } :
        function(x) {
            return eval('x' + sortKey)
        };

    reverse = !reverse ? 1 : -1;

    return function(a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    };
};

// http://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
var sort_by2 = function(field, reverse, primer) {
    return function(a, b) {
        return field
            .map(function(o, fieldInd) {
                var sortKey = '["' + o.split('.').join('"]["') + '"]';
                var dir = 1;
                if (reverse[fieldInd]) {
                    dir = -1;
                }
                var key = primer[fieldInd] ?
                    function(x) {
                        return primer[fieldInd](eval('x' + sortKey));
                    } :
                    function(x) {
                        return eval('x' + sortKey);
                    };

                var ka = key(a);
                var kb = key(b);

                if (isNaN(ka) && !isNaN(kb)) {
                    return dir;
                }
                if (!isNaN(ka) && isNaN(kb)) {
                    return -(dir);
                }
                if (ka > kb) {
                    return dir;
                }
                if (ka < kb) {
                    return -(dir);
                }
                return 0;
            }).reduce(function firstNonZeroValue(p, n) {
                return p ? p : n;
            }, 0);
    };
};

function getAllUpInfo() {
    // get allup info
    if (typeof maxAllup !== 'undefined' && maxAllup !== "") {
        parseAllupData(maxAllup);
    }
}

function parseAllupData(data) {
    if (data != undefined && data != "") {
        try {
            var allPoolAllupInfo = data.split(';');
            for (var i = 0; i < allPoolAllupInfo.length; i++) {
                var singlePoolAllupInfo = allPoolAllupInfo[i].split(':');
                allupInfo[singlePoolAllupInfo[0]] = singlePoolAllupInfo[1];
            }

            if (pageName == "MIXALLUP") {
                renderMixAllUpPoolTypeCheckbox();
            }
        } catch (ex) {

        }
    }
}

function isML(_oddsType) {
    _oddsType = _oddsType.toString().toUpperCase();
    return _oddsType.match(/^(HIL|EHL|HILINPLAY|CHL|ECH|CHLINPLAY|FHL|FHLINPLAY)$/);
}

function isMultiRowPool(_oddsType) {
    return _oddsType.match(/^(HIL|EHL|HILINPLAY|CHL|ECH|CHLINPLAY|FHL|FHLINPLAY|CRS|ECS|CRSINPLAY|FCS|FCSINPLAY|FGS)$/);
}

function showNTSPanel() {
    var objPosition = $('#ntsinfo').offset();
    $('#ntsinfo_panel').css({
        "left": objPosition.left - 5,
        "top": objPosition.top + 15
    });
    $('#ntsinfo_panel').show();
    setTimeout(function() {
        $("#ntsinfo_panel").hide();
    }, 3000);
}

function daydiff(first, second) {
    return Math.abs((second - first) / (1000 * 60 * 60 * 24));
}

function addSpaceToScore(scoreStr) {
    scoreStr = scoreStr.split(':');
    return scoreStr[0] + ' : ' + scoreStr[1];
}

function isSuspended(_poolStatus) {
    if (_poolStatus == "Selling" || _poolStatus == "Initial" || _poolStatus == "Defined" || (_poolStatus == "NotSelling" && isQRPortal)) {
        return false;
    } else {
        return true;
    }
}

function isSelling(_poolStatus, _selOddsStr, _lineStatus) {
    if (_selOddsStr == '000@0.0')
        return false;

    if (isQRPortal) {
        if (_selOddsStr.charAt(2) == "0" && _selOddsStr.indexOf("LSE") < 0 && _selOddsStr.indexOf("RFD") < 0 && (_poolStatus == "Selling" || _poolStatus == "Defined" || _poolStatus == "NotSelling")) {
            return true;
        }
    } else {
        if (_poolStatus == "Selling" && _selOddsStr.charAt(0) == "1" && _selOddsStr.charAt(2) == "0" && _lineStatus == "1") {
            return true;
        }
    }
    return false;
}

function parseBoolean(_val) {
    if ($.isNullOrEmpty(_val)) return false;
    else {
        return _val == "true" || _val == "True" || _val == "TRUE" || _val == true;
    }
}

function isInplayEnabled(_oddsType) {
    var inplayPools = jsInplayPools;
    if (inplayPools.indexOf(_oddsType) != -1) {
        return true;
    }
    return false;
}

function lastOddsRefresh() {
    dateObj.setSeconds(dateObj.getSeconds() + 1);
    window.setTimeout("lastOddsRefresh()", 1000);
}

function ToDollarsAndCents_calculator(n) {
    n = n + 0.0000001 // For handle 1.005 odds incident KB125056
    var s = "" + Math.round(n * 10) / 10
    var i = s.indexOf('.')
    if (i < 0) return s + ".0"
    var t = s.substring(0, i + 1) + s.substring(i + 1, i + 2)
    if (i + 1 == s.length) t += "0"
    return t
}

/*
 * jQuery jclock - Clock plugin - v 1.2.0
 * http://plugins.jquery.com/project/jclock
 *
 * Copyright (c) 2007-2008 Doug Sparling <http://www.dougsparling.com>
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */
(function($) {

    $.fn.jclock = function(options) {
        var version = '1.2.0';

        // options
        var opts = $.extend({}, $.fn.jclock.defaults, options);

        return this.each(function() {
            $this = $(this);
            $this.timerID = null;
            $this.running = false;

            var o = $.meta ? $.extend({}, opts, $this.data()) : opts;

            $this.timeNotation = o.timeNotation;
            $this.am_pm = o.am_pm;
            $this.utc = o.utc;
            $this.utc_offset = o.utc_offset;
            $this.custom_offset = o.custom_offset;

            $this.css({
                fontFamily: o.fontFamily,
                fontSize: o.fontSize,
                backgroundColor: o.background,
                color: o.foreground
            });

            $.fn.jclock.startClock($this);

        });
    };

    $.fn.jclock.startClock = function(el) {
        $.fn.jclock.stopClock(el);
        $.fn.jclock.displayTime(el);
    }
    $.fn.jclock.stopClock = function(el) {
        if (el.running) {
            clearTimeout(el.timerID);
        }
        el.running = false;
    }
    $.fn.jclock.displayTime = function(el) {
        var time = $.fn.jclock.getTime(el);
        el.html(time);
        el.timerID = setTimeout(function() {
            $.fn.jclock.displayTime(el)
        }, 1000);
    }
    $.fn.jclock.getTime = function(el) {
        var now = new Date();
        var hours, minutes, seconds;

        if (el.utc == true) {
            var localTime = now.getTime();
            var localOffset = now.getTimezoneOffset() * 60000;
            var utc = localTime + localOffset;
            var utcTime = utc + (3600000 * el.utc_offset);
            now = new Date(utcTime);
        }

        if (el.custom_offset != 0) {
            var localTime = now.getTime();
            var offsetTime = localTime + (el.custom_offset * 1000);
            now = new Date(offsetTime);
        }

        hours = now.getHours();
        minutes = now.getMinutes();
        seconds = now.getSeconds();

        var am_pm_text = '';
        (hours >= 12) ? am_pm_text = " P.M.": am_pm_text = " A.M.";

        if (el.timeNotation == '12h') {
            hours = ((hours > 12) ? hours - 12 : hours);
        } else if (el.timeNotation == '12hh') {
            hours = ((hours > 12) ? hours - 12 : hours);
            hours = ((hours < 10) ? "0" : "") + hours;
        } else {
            hours = ((hours < 10) ? "0" : "") + hours;
        }

        minutes = ((minutes < 10) ? "0" : "") + minutes;
        seconds = ((seconds < 10) ? "0" : "") + seconds;

        var timeNow = hours + ":" + minutes;
        if (el.display_sec) {
            timeNow = hours + ":" + minutes + ":" + seconds;
        }
        if ((el.timeNotation == '12h' || el.timeNotation == '12hh') && (el.am_pm == true)) {
            timeNow += am_pm_text;
        }

        return timeNow;
    };

    // plugin defaults
    $.fn.jclock.defaults = {
        timeNotation: '24h',
        am_pm: false,
        utc: false,
        fontFamily: '',
        fontSize: '',
        foreground: '',
        background: '',
        utc_offset: 0,
        custom_offset: 0,
        display_sec: false
    };

})(jQuery);

//# sourceURL=/football/lib/common.js
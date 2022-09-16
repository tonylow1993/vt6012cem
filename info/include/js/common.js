<!--
try {
    var url = top.location.href;
    if (url.indexOf("http://") >= 0) {
        top.location.replace(url.replace("http://", "https://"));
    }
} catch (e) {}

$.ajaxSetup({
    cache: true
});

var pageName = '';
var wafKeyword = "must be enabled in order to view this page.";
var wafKeyword2 = "GenericErrorMessage"
var aReferrer = document.referrer;
var tmpRef = window.sessionStorage.getItem('__tmpRef');
if (tmpRef != null) {
    aReferrer = tmpRef;
    window.sessionStorage.removeItem('__tmpRef');
}
var DataLayer;
var lastRefreshTime = new Date();
var isIE = navigator.userAgent.indexOf('MSIE') >= 0 || navigator.userAgent.match(/Trident\/7\./) != null;

var tabType = {
    Date: "Date",
    Competition: "Competition",
    Feature: "Feature"
};
var mdate = '';

window.oncontextmenu = function() {
    return false;
};

var cachedScript = [];

function getScriptNotCache(jsUrl) {
    if ($.inArray(jsUrl, cachedScript) < 0) {
        cachedScript.push(jsUrl);
        return $.getScript(jsUrl);
    }
    return 0;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return results[1];
}

function setInnerHTMLById(id, c) {
    if (document.getElementById(id) != null) document.getElementById(id).innerHTML = c;
}

function NewWindow(mypage, myname, w, h, scroll, resizable) {
    var winl = (screen.width - w) / 2;
    var wint = (screen.height - h) / 2;
    winprops = 'height=' + h + ',width=' + w + ',top=' + wint + ',left=' + winl + ',scrollbars=' + scroll + ',resizable=' + resizable + ','
    win = window.open(mypage, myname, winprops)
    win.self.focus()
    if (parseInt(navigator.appVersion) >= 4) {
        win.window.focus();
    }
}

function popupInfo(mypage) {
    NewWindow(mypage, 'popupWin', 770, 550, 1, 0);
}

function popupLink(mypage) {
    winprops = '';
    win = window.open(mypage, 'popupPage', winprops);
    win.self.focus();
}

function popupLinkWithTarget(mypage, target) {
    var winprops = '';
    if (window.opener) {
        window.opener.location.href = mypage;
        window.opener.focus();
    } else {
        var win = window.open(mypage, target, winprops);
        win.self.focus();
    }
}

var calWin;
var winWin;

function popupCal(mypage, w, h) {
    var myname = 'popupCal';
    var scroll = 0;
    var resizable = 0;
    var winl = (screen.width - w) / 2;
    var wint = (screen.height - h) / 2;
    winprops = 'height=' + h + ',width=' + w + ',top=' + wint + ',left=' + winl + ',scrollbars=' + scroll + ',resizable=' + resizable + ','

    calWin = window.open(mypage, myname, winprops);
}


function popupWin(mypage, w, h) {
    var myname = 'popupWin';
    var scroll = 1;
    var resizable = 1;
    var winl = (screen.width - w) / 2;
    var wint = (screen.height - h) / 2;
    winprops = 'height=' + h + ',width=' + w + ',top=' + wint + ',left=' + winl + ',scrollbars=' + scroll + ',resizable=' + resizable + ','

    winWin = window.open(mypage, myname, winprops);
    winWin.self.focus();
}

function unloadAllCss() {
    $('link[id^="rCss"]').remove();
}

function loadCss(path) {
    $('<link/>', {
        id: 'rCss' + path,
        rel: 'stylesheet',
        type: 'text/css',
        href: path
    }).appendTo('head');
}

function disableCheck() {
    checkChangesEnabled = false;
    setTimeout("enableCheck()", "100");
}

function enableCheck() {
    checkChangesEnabled = true;
}

//check null or empty
jQuery.extend({
    isNullOrEmpty: function(o) {
        if (o == null || o == undefined || o == "") {
            return true;
        }
        return false
    }
});
jQuery.loadScript = function(url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: function(data, status, jqXHR) {
            if (data.indexOf && (data.indexOf(wafKeyword) >= 0 || data.indexOf(wafKeyword2) >= 0) && !retryOnce) {
                setTimeout(
                    function() {
                        loadScript(url, callback);
                        return;
                    }, 1000);
            } else {
                callback;
            }
        },
        async: true
    });
}

function changeLang() {
    if (isLogon()) {
        if (!confirm(GetError("SSO_SIGN_OUT_ACTIVE")))
            return;
        checkChangesEnabled = false;
    } else if (isBetBasketNotEmpty()) {
        if (!confirm(GetError("1402")))
            return;
        checkChangesEnabled = false;
    }

    var tLang = curLang == 'ch' ? 'en' : 'ch';
    var para = trimPara();
    if (curProduct == 'football') {
        url = location.pathname;
        if (curPageId == 'results/results') {
            if (isOnLastOddsPage)
                SetDataStore("__extendlastOdds", rMatchID);
            else if (para != '' && rMatchID != '') {
                SetDataStore("__extendresdtls", rMatchID);
                SetDataStore("__extendresultsSearchPara", para);
                SetDataStore("__extendresultsSearchPage", curPage);
            } else if (rMatchID != '')
                SetDataStore("__extendresdtls", rMatchID);
        }
    }

    // remove selected tournId
    sessionStorage.setItem("__extendShareSelectedTournsId", JSON.stringify([]));

    if (!isQRPortal) {
        saveLangPreference(tLang == 'en' ? 0 : 1);
        if ((isIE11() || isSafari()) && (isLogon() || betslipState == STATE_EKBA)) {
            window.sessionStorage.setItem("is_logon", 0);
            forceLogout();
        } else {
            window.location.href = window.location.pathname + '?lang=' + tLang + (para.length > 0 ? '&' + para.join('&') : '');
        }
    } else {
        var para2 = trimPara2();
        switchTo(curProduct, curPageId, tLang, para2);
        $('link[id="rootStyleFile"]').attr('href', '/info/include/css/' + tLang + '/styles.css' + cacheVersion);
        $('link[id="menuStyleFile"]').attr('href', '/info/include/css/' + tLang + '/menu_styles.css' + cacheVersion);
        $('link[id="bMainStyleFile"]').attr('href', '/info/include/css/' + tLang + '/bet_main_home.css' + cacheVersion);
        $('#secMenuHR').prop('title', jsImageTitleHB[tLang]);
        $('#secMenuFB').prop('title', jsImageTitleFB[tLang]);
        $('#secMenuM6').prop('title', jsImageTitleM6[tLang]);
        $('#secMenu3in1').prop('title', jsImageTitleEWIN[tLang]);
        $("#server_datetime").html(formatServerOdds(serverDateObj));
        genMenuObject(tLang);
        if (curProduct == 'football')
            intialFormula();
    }
}

function trimPara() {
    var str = window.location.search;
    str = str.replace('?', '');
    var arr = str.split('&');
    var para = [];
    for (var idx in arr) {
        var kv = arr[idx].split('=');
        if (kv[0] != 'lang') {
            para.push(arr[idx]);
        }
    }
    return para;
}

function trimPara2() {
    var str = window.location.search;
    str = str.replace('?', '');
    var arr = str.split('&');
    var para = {};
    for (var idx in arr) {
        var kv = arr[idx].split('=');
        if (kv[0] != 'lang') {
            para[kv[0]] = kv[1];
        }
    }
    return para;
}

// This function aims to 
// 1. if no lang parameter in the URL, load the language preference from cookie
function loadLangPreference() {
    if (window.location.search.indexOf('lang=') >= 0)
        return;
    var langPref = $.cookie('jcbwLangPreference');
    if (langPref == null)
        return;

    if ((langPref == 0 && curLang == 'ch') || (langPref == 1 && curLang == 'en')) {
        changeLang();
    }
}

// This function aims to save the language preference to cookie
function saveLangPreference(lang) {
    var para = {
        expires: 999,
        path: '/',
        domain: document.domain
    };
    $.cookie('jcbwLangPreference', lang, para);
}

function switchTo(product, page, lang, para, pushHistory) {

    //handling quickly click race two selector
    try {
        clearAllInterval();
    } catch (e) {}

    try {
        if (pushPage != null) {
            if (pushPage.getTable("racingodds") != null) {
                pushPage.removeTable("racingodds");
            }
        }
    } catch (e) {}

    if (para == null || para == '')
        para = {};
    if (pushHistory == null)
        pushHistory = true;
    if (page == '') {
        page = curPageId;
    }
    if (para.mdate == null && typeof mdate !== "undefined" && mdate != null && mdate != "" && product == "football" && page.indexOf("odds") >= 0)
        para.mdate = mdate;

    curProduct = product;
    curLang = lang.toLowerCase();

    // remove selected tournId
    //sessionStorage.setItem("__extendShareSelectedTournsId", JSON.stringify([]));

    switchPage(product, page, lang, para, pushHistory);
}

function switchProduct(product, lang) {
    switch (product) {
        case 'home':
            $('link[id="mainCssFile"]').attr('href', '/info/include/css/' + lang + '/home.css' + cacheVersion);
            $('#thirdMenu').html('');
            $('#oddsMenu').html('');
            resizeOMenu(5);
            break;
        case 'racing':
        case 'football':
        case 'marksix':
            $('link[id="mainCssFile"]').attr('href', '/' + product + '/info/css/' + lang + '/' + product + '.css' + cacheVersion);
            $('link[id="pdMenuCssFile"]').attr('href', '/' + product + '/info/css/pd_menu.css' + cacheVersion);
            $('link[id="oddsMenuCssFile"]').attr('href', '/' + product + '/info/css/odds_menu.css' + cacheVersion);
            loadProductMenu();
            loadOddsMenu();
            break;
    }
}

function setTopBannerFrame(product, page, lang) {
    $('#divLandingNew').hide();
    $('#divTopBanner').hide();
    $('#bottomBannerDiv').hide();
    $('#homeSNDiv').hide();
    if (page == 'index' || page == 'odds/odds_ilc') {
        var topUrl = '';
        var bottomUrl = '';
        var bottomHeight = 100;
        var bottomEnable = info_bottom_enable;
        switch (product) {
            case 'home':
                $('#info_top_block').html('<div id="divLandingNew"><div class="divLandingNewsHeader"></div><div id="divLandingNewsInner"></div></div>');
                reloadImportantNotices('GL');
                reloadWhatsNew();
                $('#divLandingNew').hide().fadeIn();
                topUrl = jsHomePromoUrl.replace('{0}', lang);
                bottomEnable = false;
                if (isBannerAdEnable) {
                    if (lang == 'ch') {
                        BANNER.Top.BWHOTHxC();
                    } else {
                        BANNER.Top.BWHOTHxE();
                    }
                }
                break;
            case 'racing':
                reloadImportantNotices('HR');
                loadRacingTopBlock();
                topUrl = jsHrPromoUrl.replace('{0}', lang);
                bottomUrl = jsHrBottomUrl.replace('{0}', lang);
                if (isBannerAdEnable) {
                    if (lang == 'ch') {
                        BANNER.Top.BWRHTHxC();
                        BANNER.Bottom.BWRHSHxC();
                    } else {
                        BANNER.Top.BWRHTHxE();
                        BANNER.Bottom.BWRHSHxE();
                    }
                }

                break;
            case 'football':
                reloadImportantNotices('FB');
                //loadFootballTopBlock(lang);
                $('#info_top_block').html('<iframe class="info_top_frame" scrolling="no" frameborder="0" allowtransparency="true" src="' + jsFbTopUrl.replace('{0}', lang) + '"></iframe>');

                topUrl = jsFbPromoUrl.replace('{0}', lang);
                if (isBannerAdEnable) {
                    if (lang == 'ch') {
                        BANNER.Top.BWFHTHxC();
                        BANNER.Bottom.BWFHSHxC();
                    } else {
                        BANNER.Top.BWFHTHxE();
                        BANNER.Bottom.BWFHSHxE();
                    }
                }
                bottomUrl = jsFbBottomUrl.replace('{0}', lang);
                break;
            case 'marksix':
                reloadImportantNotices('LY');
                loadMarksixTopBlock();
                topUrl = jsMsPromoUrl.replace('{0}', lang);
                if (isBannerAdEnable) {
                    if (lang == 'ch') {
                        BANNER.Top.BW6HTHxC();
                        BANNER.Bottom.BW6HSHxC();
                    } else {
                        BANNER.Top.BW6HTHxE();
                        BANNER.Bottom.BW6HSHxE();
                    }
                }
                bottomUrl = jsMsBottomUrl.replace('{0}', lang);
                bottomHeight = 50;
                break;
        }

        if (info_top_enable) {
            if (!isBannerAdEnable) {
                $('#info_top_promo').html('<iframe src="' + topUrl + '" scrolling="no" frameborder="0" allowtransparency="true" width="530" height="182" id="topBannerFrame" name="topBannerFrame"></iframe>');
            }
            $('#divTopBanner').hide().fadeIn();
        }

        if (bottomEnable) {
            if (!isBannerAdEnable) {
                $('#bottomBannerDiv').html('<iframe src="' + bottomUrl + '" scrolling="no" frameborder="0" allowtransparency="true" width="750" height="' + bottomHeight + '" id="bottomBannerFrame" name="bottomBannerFrame"></iframe>');
            }
            $('#bottomBannerDiv').hide().fadeIn();
        }
    }
}

var lockSwitchPage = false;

function switchPage(product, page, lang, para, pushHistory, retryOnce) {

    if (lockSwitchPage) {
        setTimeout(
            function() {
                switchPage(product, page, lang, para, pushHistory);
                return;
            }, 500);
    }
    lockSwitchPage = true;
    dateTournaTabInited = false;

    if (checkAccessControl())
        return;

    var pdFolder = '/';
    switch (product) {
        case 'racing':
            pdFolder = '/racing/';
            break;
        case 'football':
            pdFolder = '/football/';
            break;
        case 'marksix':
            pdFolder = '/marksix/';
            break;

    }

    var url = pdFolder + page + '.aspx?lang=' + lang;

    if (product == 'football' && (page == "results/tournres" || (page.indexOf("results") == -1 && page != "results/tournres"))) {

        var tournExp = location.href.match(new RegExp("&tournid=[\\da-z]+"));

        if (para['tmatchid'] != null) {
            tMatchID = para['tmatchid'];
            url += '&tmatchid=' + tMatchID;
        }

        if (para['tournid'] != null) {
            tournId = para['tournid'];
            url += '&tournid=' + tournId;
        } else if (tournExp != null && tournExp.length > 0) {
            let tempId = tournExp[0].split("=")[1];
            url += '&tournid=' + tempId;
        } else if (para['mdate'] != null) {
            url += '&mdate=' + para['mdate'];
            mdate = para['mdate'];
        }
    }

    if (para['date'] != null) {
        url += '&date=' + para['date'];
    }
    if (para['venue'] != null) {
        url += '&venue=' + para['venue'];
    }
    if (para['raceno'] != null) {
        url += '&raceno=' + para['raceno'];
    }
    if (para['file'] != null) {
        url += '&file=' + para['file'];
    }
    if (para['b_cid'] != null) {
        url += '&b_cid=' + para['b_cid'];
    }

    $('#bg-for-print').text('');
    $('#container').empty();

    $.ajax({
        url: url,
        success: function(data, status, jqXHR) {

            if (data.indexOf && (data.indexOf(wafKeyword) >= 0 || data.indexOf(wafKeyword2) >= 0) && !retryOnce) {
                $('#tFrame').attr('src', '/reload.aspx?a=' + (new Date().getTime()));
                setTimeout(
                    function() {
                        switchPage(product, page, lang, para, pushHistory, true);
                        return;
                    }, 1000);
                lockSwitchPage = false;
            } else {
                aReferrer = location.href;
                if (pushHistory)
                    window.history.pushState({
                        "product": product,
                        "page": page,
                        "lang": lang,
                        "para": para
                    }, "", url);

                $('#container').hide().html($(data).find('#container').addBack('#container').children()).show();
                lockSwitchPage = false;
            }
        }
    });
}

function pushFirstHistory() {
    var para = trimPara2();
    window.history.replaceState({
        "product": curProduct,
        "page": curPageId,
        "lang": curLang,
        "para": para
    }, "", url);
}

window.onpopstate = function(e) {
    if (e.state === null)
        return;

    console.debug(e.state["product"] + ' ' + e.state["page"] + ' ' + e.state["lang"] + ' ' + e.state["para"]);
    if (e.state["product"] == 'football' && e.state["page"].toLowerCase() == 'results/results' && typeof(e.state["para"]) == 'string') {
        SetDataStore("__extendresultsSearchPara", e.state["para"]);
        SetDataStore("__extendresultsSearchPage", curPage);
    } else if (e.state["product"] == 'marksix' && e.state["page"].toLowerCase() == 'results' && typeof(e.state["para"]) == 'string') {
        SetDataStore("__extendresultsSearchPara", e.state["para"]);
    }
    switchTo(e.state["product"], e.state["page"], e.state["lang"], e.state["para"], false);
}

function loadFootballTopBlock(lang, retryOnce) {
    var url = jsFbTopUrl.replace('{0}', lang);
    $.ajax({
        url: url,
        success: function(data, status, jqXHR) {
            if (data.indexOf && (data.indexOf(wafKeyword) >= 0 || data.indexOf(wafKeyword2) >= 0) && !retryOnce) {
                $('#tFrame').attr('src', '/reload.aspx?a=' + (new Date().getTime()));
                setTimeout(function() {
                    loadFootballTopBlock(lang, true);
                }, 1000);
                return;
            }
            $('#info_top_block').html($(data).find('#container').addBack('#container').children());
        }
    });
}

function loadLandingBlock(lang, retryOnce) {
    var url = '/racing/HRBlockMain.aspx?lang=' + lang;
    $.ajax({
        url: url,
        success: function(data, status, jqXHR) {
            if (data.indexOf && (data.indexOf(wafKeyword) >= 0 || data.indexOf(wafKeyword2) >= 0) && !retryOnce) {
                $('#tFrame').attr('src', '/reload.aspx?a=' + (new Date().getTime()));
                setTimeout(function() {
                    loadLandingBlock(lang, true);
                }, 1000);
                return;
            }
            $('#blockContainerHR').html($(data).find('#container').addBack('#container').children());
        }
    });
    url = '/football/FBBlockMain.aspx?lang=' + lang;
    $.ajax({
        url: url,
        success: function(data, status, jqXHR) {
            if (data.indexOf && (data.indexOf(wafKeyword) >= 0 || data.indexOf(wafKeyword2) >= 0) && !retryOnce) {
                $('#tFrame').attr('src', '/reload.aspx?a=' + (new Date().getTime()));
                setTimeout(function() {
                    loadLandingBlock(lang, true);
                }, 1000);
                return;
            }
            $('#blockContainerFB').html($(data).find('#container').addBack('#container').children());
        }
    });
    url = '/marksix/MSBlockMain.aspx?lang=' + lang;
    $.ajax({
        url: url,
        success: function(data, status, jqXHR) {
            if (data.indexOf && (data.indexOf(wafKeyword) >= 0 || data.indexOf(wafKeyword2) >= 0) && !retryOnce) {
                $('#tFrame').attr('src', '/reload.aspx?a=' + (new Date().getTime()));
                setTimeout(function() {
                    loadLandingBlock(lang, true);
                }, 1000);
                return;
            }
            $('#blockContainerM6').html($(data).find('#container').addBack('#container').children());
        }
    });
}

function loadRacingTopBlock(retryOnce) {
    var url = '/racing/hr_info_top.aspx?lang=' + curLang;
    $.ajax({
        url: url,
        success: function(data, status, jqXHR) {
            if (data.indexOf && (data.indexOf(wafKeyword) >= 0 || data.indexOf(wafKeyword2) >= 0) && !retryOnce) {
                $('#tFrame').attr('src', '/reload.aspx?a=' + (new Date().getTime()));
                setTimeout(function() {
                    loadRacingTopBlock(true);
                }, 1000);
                return;
            }
            $('#info_top_block').html($(data).find('#container').addBack('#container').children());
            genSubMenu2('racingTop');
        }
    });
}

function loadMarksixTopBlock(retryOnce) {
    var url = '/marksix/ms_info_top.aspx?lang=' + curLang;
    $.ajax({
        url: url,
        success: function(data, status, jqXHR) {
            if (data.indexOf && (data.indexOf(wafKeyword) >= 0 || data.indexOf(wafKeyword2) >= 0) && !retryOnce) {
                $('#tFrame').attr('src', '/reload.aspx?a=' + (new Date().getTime()));
                setTimeout(function() {
                    loadMarksixTopBlock(true);
                }, 1000);
                return;
            }
            $('#info_top_block').html($(data).find('#container').addBack('#container').children());
            marksixLandingArray = eval($('#m6ArrLbl').html());
            genSubMenu2('marksix');
            if (parseInt($('#m6JpCnt').html()) == 0) {
                SubMenuClick(1, 'marksix');
            }
        }
    });
}

function startQRPortal() {
    $.ajax({
        url: '/QRCodePortal/default.aspx',
        cache: false,
        success: function(data, status, jqXHR) {
            $('#betslipDiv').html(data);
        }
    });
}

// for tagging
function getWebIDHashed() {
    try {
        return GetDataStore("sso_web_id_hashed");
    } catch (e) {
        return "";
    }
}

function postCallWAReq() {
    try {
        clearWAParam();

        var pvar = {
            content: "0",
            server: "secure-sg",
            page_url: document.location,
            referrer: aReferrer
        };

        WATrackerTrackPageView(pvar);
    } catch (e) {}
}

function callWAReq() {
    if (!isLogon() && isSSOSignedIn()) {
        sendCheckSSOSignInStatusRequest(postCallWAReq, postCallWAReq);
    } else {
        postCallWAReq();
    }
}

// Start StringBuffer() object
function StringBuffer() {
    this.buffer = [];
}
StringBuffer.prototype.append = function(string) {
    this.buffer.push(string);
    return this;
}

StringBuffer.prototype.toString = function() {
    return this.buffer.join("");
}

StringBuffer.prototype.isEmpty = function() {
    return this.data.length == 0;
}
// End StringBuffer()

function addComma(ps_num) {
    //format of ls_num: e.g. 1234567
    //return 1,234,567
    if (ps_num == null)
        return '';

    var ls_num = ps_num.toString();
    var ls_num_decimal = "";
    var li_dploc = ls_num.indexOf(".");

    if (li_dploc > -1) {
        ls_num_decimal = ps_num.substring(li_dploc);
        ls_num = ls_num.substring(0, li_dploc);
    }

    var tmp = "";
    var ls_fmtNum = "";
    for (var i = ls_num.length; i > 0; i -= 3)
        tmp = "," + ls_num.substring(i - 3, i) + tmp;

    ls_fmtNum = tmp.substring(1, tmp.length);

    if (ls_num_decimal != "")
        ls_fmtNum = ls_fmtNum + ls_num_decimal;
    return ls_fmtNum;
}

function delComma(ps_num) {
    //reverse of addComma()
    ps_num = ps_num.replace(/,/g, "");
    return ps_num
}

function topMenuLink(idx) {
    var url = eval('jcewURL' + idx);
    url = url.replace('{0}', curLang == 'en' ? 'english' : 'chinese');
    NewWindow(url, '', 770, 500, 1, 1);
}


function genSubMenu2(sect, idx) {
    var tempHtml = [];
    var section = idx ? idx : 0;
    var array = eval(sect + 'LandingArray');

    for (var i = 0; i < array.length; i++) {
        var tempClass = sect + 'Btn';
        if (section == i)
            tempClass = sect + 'BtnOver';

        tempHtml.push('<div class="' + tempClass + '" onClick="SubMenuClick(' + i + ', \'' + sect + '\');">' + array[i] + '</div>');
    }
    $('#' + sect + 'LandingTab').html(tempHtml.join(''));
}


function SubMenuClick(idx, sect) {
    var array = eval(sect + 'LandingArray');
    var menuIdArray = eval(sect + 'LandingMenuId');
    for (var i = 0; i < array.length; i++) {
        $('#' + menuIdArray[i]).hide();
    }
    $('#' + menuIdArray[idx]).show();
    genSubMenu2(sect, idx);
}

function genFootballFocus(lang) {
    var langCode = "en" == lang ? "E" : "C";
    var tempHtml = [];
    var fbLink = jsWCMSURL + 'football/' + ("en" == lang ? 'english' : 'chinese') + '/index.aspx';

    for (var idx = 0; idx < focusData.length; idx++) {
        tempHtml.push('<div class="landingFocusTR">');
        tempHtml.push('<div class="landingFocusTD1"><img src="' + commonImagePath + 'arrow.gif' + cacheVersion + '"></div>');
        tempHtml.push('<div class="landingFocusTD2">');
        tempHtml.push('<a href="' + fbLink + '" class="footballLink" target="_blank">');
        tempHtml.push(focusData[idx]['desc' + langCode] + '<br>' + focusData[idx]['code' + langCode] + " " + focusData[idx]['team' + langCode]);
        tempHtml.push('</a>');
        if (focusData[idx]['remark'] != '')
            tempHtml.push('<br><font color="#9a1d00">' + focusData[idx]['remark'] + '</font>');
        tempHtml.push('</div>');
        tempHtml.push('<div class="landingFocusTD3">');
        if (focusData[idx]['tv'] != null && focusData[idx]['tv'] != '') {
            tempHtml.push('<img src="' + commonImagePath + 'icon_tv-' + focusData[idx]['tv'] + '.gif' + cacheVersion);
            tempHtml.push('" title="' + focusData[idx]['tv' + langCode] + '">');
        }
        tempHtml.push('</div>');
        tempHtml.push('</div>');
    }
    $('#footballFocus').html(tempHtml.join(''));
}

function updatePerformTvVisibility() {
    if ($("#linkPerformTv").length > 0 && showWebTVIcon()) {
        $("#linkPerformTv").css("display", "inline");
    } else {
        $("#linkPerformTv").hide();
    }
}

function isIE11() {
    return navigator.userAgent.indexOf('MSIE') >= 0 || navigator.userAgent.match(/Trident\/7\./) != null;
}

function isChrome() {
    return /chrom(e|ium)/.test(navigator.userAgent.toLocaleLowerCase());
}

function clearWAParam() {
    try {
        s.pageName = undefined;
        s.prop1 = undefined;
        s.prop10 = undefined;
        s.eVar10 = undefined;
        s.eVar31 = undefined;

        var webIDHashed = s.eVar31 = getWebIDHashed();
        if (typeof DataLayer != 'undefined') {
            DataLayer = {
                'cuno': webIDHashed
            };
        }

        if (typeof aReferrer != 'undefined') {
            s.prop6 = aReferrer;
        }
        if (typeof customerSegment != 'undefined') {
            customerSegmentWA = customerSegment;
        } else {
            customerSegmentWA = "";
        }
    } catch (e) {}
}

function goPeNoteGeneralUrl(page) {
    var peNoteLang = curLang == 'en' ? 'english' : 'chinese';
    var trCodeLang = curLang == 'en' ? 'E' : 'C';
    NewWindow(jsPenoteGeneralUrl.replace('{0}', peNoteLang).replace('{1}', page).replace('{2}', trCodeLang), 'racingNotes', 680, 440, 1, 1);
}

function goPeNoteMenu(ev) {
    if (!isSSOSignedIn()) {
        alert(lblRacingNotesLogonMsg[curLang]);
    } else {
        var peNoteLang = curLang == 'en' ? 'english' : 'chinese';
        var trCodeLang = curLang == 'en' ? 'E' : 'C';
        NewWindow(jsPenoteMenuUrl.replace('{0}', peNoteLang).replace('{2}', trCodeLang), 'racingNotes', 680, 440, 1, 1);
    }
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function enquirePeNote() {
    if (!jsPeNoteGlobalFlag || !isSSOSignedIn() || GetSetting('PeNote') == '0') {
        // index page
        try {
            $('.tdPeNode').hide();
        } catch (ex) {}

        try {
            resetAllPeIcon({});
        } catch (ex) {}

        try {
            $('#bsPeNoteIcon').hide();
        } catch (ex) {}

        try {
            if (curProduct != 'home') {
                resizeOMenu(5);
                loadProductMenu();
            }
        } catch (ex) {}
        return;
    }

    var para = {
        variables: {},
        userSession: {
            channelId: 4,
            sessionId: uuidv4()
        }
    };

    $.ajax({
        dataType: "json",
        type: "POST",
        contentType: "application/json",
        xhrFields: {
            withCredentials: true
        },
        data: JSON.stringify(para),
        url: jsPenoteHorseListUrl,
        success: function(data) {
            try {
                if (!isOverseaMeeting)
                    $('.tdPeNode').show();
            } catch (ex) {}

            try {
                resetAllPeIcon(data);
            } catch (ex) {}

            try {
                setBetSlipPeNoteIcon(data.data.hasGeneralNotes);
            } catch (ex) {}

            try {
                if (curProduct != 'home') {
                    loadProductMenu();
                    resizeOMenu(5);
                }
            } catch (ex) {}
        },
        error: function(xhr, status, error) {}
    });
}

function WATrackerTrackPageView(eventId) {
    if (typeof WATracker !== "undefined" && WATracker) {
        try {
            WATracker.trackPageView(eventId);
        } catch (err) {
            console.log("WATrackerTrackPageView:" + err);
        }
    }
}

function WATrackerTrackClickEvent(eventId) {
    if (typeof WATracker !== "undefined" && WATracker) {
        try {
            WATracker.trackClickEvent(eventId);
        } catch (err) {
            console.log("WATrackerTrackClickEvent:" + err);
        }

    }
}

function updateServerTime(isAsync) {

    if (isAsync == undefined) {
        isAsync = true;
    }

    $.ajax({
        type: "GET",
        url: "/time.aspx",
        async: isAsync,
        cache: false,
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            if (data.indexOf && data.indexOf(wafKeyword) >= 0 && !retryOnce) {
                //console.log('Blocked by WAF, retry one time...');
                $('#tFrame').attr('src', '/reload.aspx?a=' + (new Date().getTime()));
                setTimeout(function() {
                    updateServerTime();
                }, 1000);
                return;
            }
            if (data != null && data.time != null && data.time != '') {
                serverDateObj = new Date(data.time.replace('+08:00', ''));
                $("#server_datetime").html(formatServerOdds(serverDateObj));
            }
        },
        error: function() {}
    });
}
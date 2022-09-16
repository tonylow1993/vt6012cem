var section = 0;

var menuImgPath = "/contentserver/jcbw/userimage/";
var menuTop = "62";
var menuLeft = "233";
var sectionArray = new Array();
var tempHtml;
var tempStr1;
var tempStr2;
var color1 = "#5D92DB";
var color2 = "#0C4D96";
var menuW = 530;
var menuH = 350;

function menuTxtOver(i, j, over, isSect) {
    if (over == 1) {
        var buf = [];
        buf.push('<div class="tMenuBoxCell">');
        buf.push('<img src="' + menuImgPath + 'pic_' + tMenuData.nav.section[i]['subSection'][j].id + '.gif">');
        buf.push('</div><div class="tMenuBoxCell"><span class="menu_title">');
        buf.push(tMenuData.nav.section[i]['subSection'][j].name);
        buf.push('</span><br>');
        buf.push(tMenuData.nav.section[i]['subSection'][j].menuTxt);
        buf.push('</div>');
        $('#menuBox').html(buf.join(''));
        $('#menuBox').show();
    } else {
        $('#menuBox').html('');
        $('#menuBox').hide();
    }
}

var tMenuData;

function genMenuObject(lang) {
    $.ajax({
        type: "GET",
        url: (lang == 'en' ? secMenuE : secMenuC),
        dataType: "xml",
        success: function(xmlDoc) {
            var x2js = new X2JS();
            tMenuData = x2js.xml2json(xmlDoc);
            loadTMenu();
        }
    });
}

function loadTMenu() {
    var buf = [];
    var width = menuW / tMenuData.nav.section.length;

    buf.push('<div class="tContainer">');
    for (var i = 0; i < tMenuData.nav.section.length; i++) {
        if (i > 0) {
            buf.push('<div class="tDropdown"><img src="/info/include/images/stroke_menu.gif" width="1px"></div>');
        }

        buf.push('<div class="tDropdown" onMouseOver="tMenuHover(true, ');
        buf.push(i);
        buf.push(');" onMouseOut="tMenuHover(false, ');
        buf.push(i);
        buf.push(');" style="width:');
        buf.push(width);
        buf.push('px" onclick="tMenuClick(')
        buf.push(i)
        buf.push(');">');
        buf.push(tMenuData.nav.section[i]['sectionName']);
        buf.push('</div>');
    }
    buf.push('</div>');

    buf.push('<div id="tMenuDD" class="tContainer tDisplayNone tDropdownTable">');
    var count = 0;
    for (var i = 0; i < tMenuData.nav.section.length; i++) {
        if (i > 0) {
            buf.push('<div class="tMenuStroke"></div>');
        }

        var borderCss = '';
        if (i == 0) {
            borderCss = ' tMenuBorderLeft';
        } else if (i == tMenuData.nav.section.length - 1) {
            borderCss = ' tMenuBorderRight';
        }
        buf.push('<div id="tMenuDDSub');
        buf.push(i);
        buf.push('" class="tDropdownCell');
        buf.push(borderCss);
        buf.push('" style="width:' + width + 'px">');

        if (tMenuData.nav.section[i]['subSection'] != null) {
            for (var j = 0; j < tMenuData.nav.section[i]['subSection'].length; j++) {
                buf.push('<div class="tDropdownItem"');

                if (tMenuData.nav.section[i]['subSection'][j].menuTxt != '') {
                    buf.push(' onMouseOver="menuTxtOver(' + i + ', ' + j + ', 1, 0);" onMouseOut="menuTxtOver(' + i + ', ' + j + ', 0, 0);"');
                }

                buf.push(' onfocusout="tMenuCloseOnFocusOut();"');
                buf.push(' onclick="tSubMenuClick(');
                buf.push(i);
                buf.push(',');
                buf.push(j);
                buf.push(');">');
                buf.push(tMenuData.nav.section[i]['subSection'][j].name);
                buf.push('</div>');
            }
        }
        buf.push('</div>');
    }
    var menuboxWidth = tMenuData.nav.section.length == 4 ? "260" : "314";
    var menuboxHeight = tMenuData.nav.section.length == 4 ? "166" : "126";
    buf.push('<div class="tMenuBox" style="position:absolute; right:2px; width:');
    buf.push(menuboxWidth);
    buf.push('px; height:');
    buf.push(menuboxHeight);
    buf.push('px; display:none" id="menuBox"></div>');
    buf.push('</div>');

    $('#topNav').css('left', menuLeft + 'px');
    $('#topNav').css('top', menuTop + 'px');
    $('#topNav').css('width', menuW + 'px');
    $('#topNav').html(buf.join(''));
}

function tMenuClick(i) {
    var url = tMenuData.nav.section[i].sectionLink;
    if (url != null && url != '' && url != '#') {
        var tmpAttr = tMenuData.nav.section[i].sectionAttr;
        popupLinkNW(url, tMenuData.nav.section[i]['sectionName'], tmpAttr);
    } else {
        var tMenu = document.getElementById("tMenuDD");
        tMenu.classList.remove('tDisplayNone');
        var menuBoxTop = tMenuData.nav.section.length == 4 ? $('#tMenuDD').height() - 166 : $('#tMenuDD').height() - 126;
        $('#menuBox').css('top', menuBoxTop + 'px');
    }
}

function tSubMenuClick(i, j) {
    var lnk = tMenuData.nav.section[i]['subSection'][j].link;
    var p = tMenuData.nav.section[i]['subSection'][j].popup;
    var t = tMenuData.nav.section[i]['subSection'][j].target;
    var attr = tMenuData.nav.section[i]['subSection'][j].attr;
    if (p == '0')
        window.top.location.href = lnk;
    else if (p == '1')
        NewWindowS(lnk, t, 770, 550, 1, 0);
    else if (p == '2')
        popupLinkNW(lnk, t, attr);
}

function tMenuHover(flag, idx) {
    if (flag)
        $('#tMenuDDSub' + idx).addClass('tHeaderMouseOver');
    else
        $('#tMenuDDSub' + idx).removeClass('tHeaderMouseOver');
}

function tMenuCloseOnFocusOut() {
    $('#tMenuDD').addClass('tDisplayNone');
}

function tMenuClose(e) {
    try {
        if (e.target.matches && !e.target.matches('.tDropdown') &&
            !e.target.matches('.tDropdownItem') && !e.target.matches('.tDropdownCell')) {
            $('#tMenuDD').addClass('tDisplayNone');
        } else if (e.target.msMatchesSelector && !e.target.msMatchesSelector('.tDropdown') &&
            !e.target.msMatchesSelector('.tDropdownItem') && !e.target.msMatchesSelector('.tDropdownCell')) {
            $('#tMenuDD').addClass('tDisplayNone');
        }
    } catch (ex) {

    }
}

var tempStr = "";

function popupLinkNW(mypage, n, winprops) {
    if (winprops == null)
        winprops = '';
    win = window.open(mypage, n, winprops);
    win.self.focus();
}

function NewWindowS(mypage, myname, menuW, h, scroll, resizable) {
    var winl = (screen.width - menuW) / 2;
    var wint = (screen.height - h) / 2;
    winprops = 'height=' + h + ',width=' + menuW + ',top=' + wint + ',left=' + winl + ',scrollbars=' + scroll + ',resizable=' + resizable + ','
    win = window.open(mypage, myname, winprops)
    win.self.focus()
}

function closeAllSubMenu() {
    if (typeof oMenuData != 'undefined') {
        for (var i = 0; i < oMenuData['pMenu'].length; i++) {
            var pMenu = document.getElementById("pMenu" + i);
            if (pMenu != null) {
                pMenu.classList.remove('pShow');
            }
        }
    }
}

function closeTopMenu(e) {
    if (e.target.matches && !e.target.matches('.pDropbtn')) {
        closeAllSubMenu();
    } else if (e.target.msMatchesSelector && !e.target.msMatchesSelector('.pDropbtn')) {
        closeAllSubMenu();
    }
    // 2nd dropdown menu
    tMenuClose(e);
    // betslip registration menu
    regDropdownClose(e);
}

$(window).blur(function(e) {
    $('#tMenuDD').addClass('tDisplayNone');
});

$(window).click(function(e) {
    closeTopMenu(e);
    closeBetSlipOverlay(e);
});
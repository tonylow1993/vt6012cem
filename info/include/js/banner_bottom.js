BANNER.Bottom = (function() {
    var totalBanner = 0;
    var curSlot = 1;
    var maxSlot = 6;
    var maxBanners = 12;
    var usedBanners = 0;
    var closeTime = 0;
    var bannerList = new Array();

    var bottomObj = function() {
        var bannerId = 0;
        var scriptCode = "";
        var banner_num = 0;
        var link = new Array();
        var target = new Array();
        var targetParam = new Array();
        var banner = new Array();
        var current_banner = 1;
        var defaultIMG = "/info/include/images/spacer.gif";
        var defaultLink = "javascript:;";
    };


    SlotUsed = new Array();
    var init = function(prefix, totalNum, lang) {
        bannerList = new Array();
        for (var i = 1; i <= totalNum; i++) {
            var scriptCode = prefix.concat(i.toString(), lang);
            var b = new bottomObj();
            b.bannerId = i;
            b.scriptCode = scriptCode;
            b.banner = new Array();
            b.link = new Array();
            b.target = new Array();
            b.targetParam = new Array();
            b.current_banner = 1;
            b.banner_num = 0;

            bannerList[scriptCode] = b;
        }
    }
    var startRandomBanner = function() {
        startTime();
    }

    var setBannerObj = function(var0, code, var1, var2, var3, var4, var5, var6) {
        var banner_id;
        var banner_pri = var0;
        var tempStart = new Date(var3);
        var tempEnd = new Date(var4);

        banner_id = var0;
        if (banner_pri != 13) {
            SlotUsed[banner_id] = true;
        }

        if ((banner_pri != 13) || ((banner_pri == 13) && (SlotUsed[banner_id] != true)) || usedBanners <= maxBanners) {
            bannerList[code].banner_num++;
            bannerList[code].current_banner = banner_id;
            bannerList[code].banner[banner_id] = var1;
            bannerList[code].link[banner_id] = var2;
            bannerList[code].target[banner_id] = var5;
            bannerList[code].targetParam[banner_id] = var6;
        }
    };



    var startTime = function() {
        var time = new Date();
        hours = time.getHours();
        mins = time.getMinutes();
        secs = time.getSeconds();
        closeTime = hours * 3600 + mins * 60 + secs;
        closeTime += 15; // How many seconds til the next rotation
        //Timer();
        BannerTimer();
    }
    var BannerTimer = function() {
        var hasBanner = false;
        for (var i = 0; i < Status.length; i++) {
            var code = Status[i];
            if (code in bannerList) {
                if (bannerList[code].current_banner >= bannerList[code].banner_num) {
                    bannerList[code].current_banner = 1;
                } else {
                    bannerList[code].current_banner++;
                }

                var imgCtrlId = "banner" + bannerList[code].bannerId;
                var hrefCtrlId = imgCtrlId + "a";
                var curBannerId = bannerList[code].current_banner;
                var imgPath = (curBannerId in bannerList[code].banner) ? bannerList[code].banner[curBannerId] : "";
                var url = (curBannerId in bannerList[code].link) ? bannerList[code].link[curBannerId] : "";
                var target = (curBannerId in bannerList[code].target) ? bannerList[code].target[curBannerId] : "";
                var targetParam = (curBannerId in bannerList[code].targetParam) ? bannerList[code].targetParam[curBannerId] : "";

                if (imgPath == "") {
                    $('#' + imgCtrlId).hide();
                } else {
                    hasBanner = true;
                    $('#' + imgCtrlId).show();
                    $('#' + imgCtrlId).attr("src", imgPath);
                }
                $('#' + hrefCtrlId).off("click").click({
                    url: url,
                    target: target,
                    targetParam: targetParam
                }, clickLink);
            }
        }
        if (!hasBanner) {
            $('#bottomBannerDiv').hide();
        } else {
            $('#bottomBannerDiv').show();
        }
        //setTimeout(BannerTimer, 1500);
    }
    var initBanner = function() {
        startTime();
    };
    var clickLink = function(event) {
        openNewWindow(event.data.url, event.data.target, event.data.targetParam);
    }

    var banners = new Array()

    var sdceo_bannerAd_transform = function(code) {
        funcName = "sdceo_getZoneBanner_" + code;
        var sdceoDataObj = BANNER.Common.execFunc(funcName, window, 1);
        var idx = 1;
        if (sdceoDataObj.BannerAdList.length == 0) {
            //removeFailElement()
        } else {

            sdceoDataObj.BannerAdList.forEach(function(item) {
                setBannerObj(idx, code, item.imagePathLarge, item.url, BANNER.Common.translate_date_format(item.onlineTime), BANNER.Common.translate_date_format(item.offlineTime), item.target, item.targetWindowParameters);
                idx++;
            });
        }
    };
    var removeFailElement = function(elementIndex) {
        var image_x = document.getElementById("banner" + elementIndex);

        var cellIndex = image_x.parentNode.parentNode.cellIndex;
        //Remove the 'space' td element afterward.
        image_x.parentNode.parentNode.parentNode.removeChild(image_x.parentNode.parentNode.parentNode.children[cellIndex + 1]);
        //Remove the target banner element
        image_x.parentNode.parentNode.parentNode.removeChild(image_x.parentNode.parentNode);
    };
    var Status = new Array();
    var LoadBanner = function(prefix, totalNum, lang) {
        ScriptLoadCount = 0;
        Status = Array();
        init(prefix, totalNum, lang);
        for (var i = 1; i <= totalNum; i++) {
            var scriptCode = prefix.concat(i.toString(), lang);
            var scriptId = 'js_' + scriptCode;
            var script = document.createElement('script');
            script.id = scriptId;
            script.type = "text/javascript";
            script.src = "/bannerad/js/zone/sdceo_zone_" + scriptCode + "_banner.js?date=" + sdceo_util_getNow();
            Status.push(scriptCode);
            $("head").append(script).ready(function() {
                ScriptLoadCount++;
                CheckSatatus(totalNum);
            });
        }
        var lk_Media = "/root2/bet_main/en/images/btn_media.gif";
        var lk_Phone = "/root2/bet_main/en/images/btn_phone.gif";

        if (lang == "C") {
            lk_Media = "/root2/bet_main/ch/images/btn_media.gif";
            lk_Phone = "/root2/bet_main/ch/images/btn_phone.gif";
        }
        $("#bottomBanner_img_mcs").attr("src", lk_Media);
        $("#bottomBanner_img_phone").attr("src", lk_Phone);

        if (prefix == "BW6HSH") {
            $('.bottomtopbannerdisplay').hide();
        } else {
            $('.bottomtopbannerdisplay').show();
            if (prefix == "BWRHSH") {
                $("#bottomBanner_lnk_mcs").attr("href", "//mcs.hkjc.com/");
            }
            if (prefix == "BWFHSH") {
                $("#bottomBanner_lnk_mcs").attr("href", "//mcs.hkjcfootball.com/");
            }
        }
    };
    var CheckSatatus = function(totalNum) {
        if (ScriptLoadCount == totalNum) {
            for (var i = 0; i < totalNum; i++) {
                var code = Status[i];
                sdceo_bannerAd_transform(code);
            }
            initBanner();
        }
    };


    return {
        ClickLink: function(o) {
            clickLink(o);
        },
        BWRHSHxE: function() {
            LoadBanner("BWRHSH", 6, "E")
        },
        BWRHSHxC: function() {
            LoadBanner("BWRHSH", 6, "C")
        },
        BW6HSHxE: function() {
            LoadBanner("BW6HSH", 6, "E")
        },
        BW6HSHxC: function() {
            LoadBanner("BW6HSH", 6, "C")
        },
        BWFHSHxE: function() {
            LoadBanner("BWFHSH", 6, "E")
        },
        BWFHSHxC: function() {
            LoadBanner("BWFHSH", 6, "C")
        }
    };
})();
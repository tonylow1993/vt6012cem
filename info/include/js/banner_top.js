BANNER.Top = (function() {
    var bannerBig = new Array();
    var parseUrl = function(url) {
        var a = document.createElement('a');
        a.href = url;
        return a;
    }
    var getQueryString = function(loc) {
        var key = false,
            res = {},
            itm = null;
        // get the query string without the ?
        var qs = loc.search.substring(1);
        // check for the key as an argument
        if (arguments.length > 1 && arguments[1].length > 1)
            key = arguments[1];
        // make a regex pattern to grab key/value
        var pattern = /([^&=]+)=([^&]*)/g;
        // loop the items in the query string, either
        // find a match to the argument, or build an object
        // with key/value pairs
        while (itm = pattern.exec(qs)) {
            if (key !== false && decodeURIComponent(itm[1]) === key)
                return decodeURIComponent(itm[2]);
            else if (key === false)
                res[decodeURIComponent(itm[1])] = decodeURIComponent(itm[2]);
        }

        return key === false ? res : null;
    }
    var clickLink = function(event) {
        openNewWindow(event.data.url, event.data.target, event.data.targetParam);
    }

    var setBannerControl = function() {
        var c = "<div class=\"jcSlideshows\" data-cycle-timeout=\"15000\" data-cycle-slides=\" > div\" data-cycle-log=\"false\"></div>";
        c += "<div id=\"scrollerHolder\" style=\"position:absolute;z-index:100\"><ul id=\"scroller\"></ul></div><div id=\"bannerPromo\"></div>";
        $('#info_top_promo').html(c);
        var jcSlideshowCtnt = "";
        for (i = 0; i < 4; i++) {
            if (typeof bannerBig[i] != "undefined") {

                var hrefCtrlId = bannerBig[i][8] + "a";

                if (i == 0) {
                    active = "active";
                } else {
                    active = "";
                }
                var uStr = bannerBig[i][2];
                var url = bannerBig[i][2];
                var target = bannerBig[i][6];
                var targetParam = bannerBig[i][7];

                var aCtrl = '<a id="' + hrefCtrlId + '">';

                if (uStr.indexOf("javascript") != 0) {
                    var loc = parseUrl(uStr);
                    if (typeof loc == "object") {
                        var fullurl = loc.href;
                        if (loc.href.indexOf("bet.hkjc.com") != -1 && bannerBig[i][6] != '_blank') {
                            aCtrl = '<a onClick="BANNER.Common.openBetPage(\'' + bannerBig[i][2] + '\');">';
                        }
                    }
                }

                $(".jcSlideshows").append('<div class="p' + i + '">' + aCtrl + '<img src="' + bannerBig[i][1] + '" style="max-height: 180px; max-width: 530px;"/></a></div>');
                $('#' + hrefCtrlId).off("click").click({
                    url: url,
                    target: target,
                    targetParam: targetParam
                }, clickLink);
                $("#scroller").append('<li><a href="javascript:;" class="p' + i + ' ' + active + bannerBig[i][8] + '"><img src="' + bannerBig[i][5] + '" /></a></li>');
            }
        }
        $("#scroller").simplyScroll({
            orientation: 'vertical',
            customClass: 'vert'
        });
        $("#scroller a").off("click").click(function() {
            var slideClick = $(this).attr('class').split("p")[1];
            $('.jcSlideshows').cycle('goto', slideClick);
        })

        $('.jcSlideshows').cycle();
        $('.jcSlideshows').on('cycle-after', function(e, opts, API) {
            $("#scroller a").removeClass("active");
            $("#scroller a.p" + opts.nextSlide).addClass("active");
        });
    };
    var Status = new Array();
    var ScriptLoadCount = 0;
    var LoadBanner = function(prefix, totalNum, lang) {
        ScriptLoadCount = 0;
        Status = Array();
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
    };
    var sdceo_bannerAd_transform = function(code) {
        var funcName = "sdceo_getZoneBanner_" + code;
        var cssClassHighlight = "sdceo_sys_bannerad_highlight_" + code;
        var sdceoDataObj = BANNER.Common.execFunc(funcName, window, 1);

        sdceoDataObj.BannerAdList.forEach(function(item) {
            setBannerObject(1, item.imagePathLarge, item.url, BANNER.Common.translate_date_format(item.onlineTime), BANNER.Common.translate_date_format(item.offlineTime), item.imagePathSmall, item.target, item.targetWindowParameters, cssClassHighlight);
        });
    };
    var setBannerObject = function(var0, imgPath, url, online, offline, imgPathSmall, target, parameter, css) {

        var tempStart = new Date(online);
        var tempEnd = new Date(offline);
        bannerBig.push(new Array(var0, imgPath, url, tempStart, tempEnd, imgPathSmall, target, parameter, css));
    };
    var CheckSatatus = function(totalNum) {
        if (ScriptLoadCount == totalNum) {
            bannerBig = new Array();
            for (var i = 0; i < totalNum; i++) {
                var code = Status[i];
                sdceo_bannerAd_transform(code);
            }
            setBannerControl();
        }
    };

    return {
        BWHOTHxE: function() {
            LoadBanner("BWHOTH", 4, "E");
        },
        BWHOTHxC: function() {
            LoadBanner("BWHOTH", 4, "C");
        },
        BWFHTHxE: function() {
            LoadBanner("BWFHTH", 4, "E");
        },
        BWFHTHxC: function() {
            LoadBanner("BWFHTH", 4, "C");
        },
        BW6HTHxE: function() {
            LoadBanner("BW6HTH", 4, "E");
        },
        BW6HTHxC: function() {
            LoadBanner("BW6HTH", 4, "C");
        },
        BWRHTHxE: function() {
            LoadBanner("BWRHTH", 4, "E");
        },
        BWRHTHxC: function() {
            LoadBanner("BWRHTH", 4, "C");
        }
    };

})();
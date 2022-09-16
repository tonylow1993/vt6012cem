

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <title></title>
    <meta charset="utf-8"/>
    <meta name="robots" content="noindex" />
</head>
<body>
    <div id="container">
        <script type="text/javascript">
            var allloaded = false;
            var draw_start = true;
            var next_draw = "22/068";
            var next_draw_date = "17/09/2022";
            var adv_sb_start = true;
            var m6_stopsell_desc = "Selling of Mark Six is temporarily suspended, please try again later.";
            var m6_randgen_desc = "(Random Generation)";
            var m6_full_desc = "Mark Six";
            var isAdvSB = 0;
            var m6_desc = "MK6";
            var sb_desc = "MK6 (SB)";
            var m6_cookiefull_desc = "Limit exceeds. Fail to add betline into My Favourites. Please delete betlines from My Favourites to proceed.";
            var m6_too_many_banker_desc = "At most 5 Bankers";
            var m6_insufficient_sel_desc = "Insufficient selections";
            var m6_value_too_big_desc = "Value too big";
            var m6_drawunit = "D";
            var marksixLandingArray = ["Draw Results",
                           "Next Draw",
                "Mark Six Guide"];
            var marksixLandingMenuId = ["marksixLastDraw", "marksixNextDraw", "marksixGuide"];

            $.when(
                $.getScript("/marksix/script/m6str.js?lang=en&CV=L4.01R0f_CRQ127268"),
                getScriptNotCache("/marksix/script/bs_common2.js?CV=L4.01R0f_CRQ127268"),
                getScriptNotCache("/marksix/script/randomGen.js?CV=L4.01R0f_CRQ127268"),
                getScriptNotCache("/marksix/script/m6betfunc2.js?CV=L4.01R0f_CRQ127268"),
                $.Deferred(function (deferred) {
                    $(deferred.resolve);
                })
            ).done(function () {
                rangen_number();
                genSubMenu2('marksix');
            });

            function add_mk_entry() {
                if (isQRPortal) {
                    addRandomM6(0, 6, 1, isAdvSB == 1, 0, next_draw_date, next_draw, false, null, null);
                } else {
                    if (betline != "") {
                        var returnValue = addToBetslipM6(betline, false, true);
                        if (returnValue == 1) {
                            $('#mk6num').hide();
                            $('#m6RanMsg').show();
                            betline = "";
                        }
                    }
                }
            }
        </script>
        <div class="block_header">
            <a href="javascript:;" onclick="switchTo('marksix', 'index', curLang);">
                <img src="/contentserver/jcbw/ekba/images/en/title_marksix.gif" title="Mark Six"  />
            </a>
        </div>
        <div class="block_sytle">
            <div class="block_home_info">
                <div class="landingMenuTop">
                    <div id="marksixLandingTab"></div>
                </div>
                <div class="landingMenuContent">
                    <div id="marksixLastDraw"><div class="m6NextDrawRow"><div class="m6LastDrawLeft m6LastDrawTitle">Draw Results</div><div class="m6LastDrawRight">15/09/2022</div></div><div class="m6NextDrawRow"><div class="m6LastDrawBody"><div class="m6LastDrawBodyColSpan"><span style="padding:0px 2px 0px 2px;"><img src="/marksix/info/images/icon/no_21.gif?CV=L4.01R0f_CRQ127268" width="25" height="25" style="vertical-align:middle"></span><span style="padding:0px 2px 0px 2px;"><img src="/marksix/info/images/icon/no_23.gif?CV=L4.01R0f_CRQ127268" width="25" height="25" style="vertical-align:middle"></span><span style="padding:0px 2px 0px 2px;"><img src="/marksix/info/images/icon/no_29.gif?CV=L4.01R0f_CRQ127268" width="25" height="25" style="vertical-align:middle"></span><span style="padding:0px 2px 0px 2px;"><img src="/marksix/info/images/icon/no_30.gif?CV=L4.01R0f_CRQ127268" width="25" height="25" style="vertical-align:middle"></span><span style="padding:0px 2px 0px 2px;"><img src="/marksix/info/images/icon/no_33.gif?CV=L4.01R0f_CRQ127268" width="25" height="25" style="vertical-align:middle"></span><span style="padding:0px 2px 0px 2px;"><img src="/marksix/info/images/icon/no_49.gif?CV=L4.01R0f_CRQ127268" width="25" height="25" style="vertical-align:middle"></span><span style="padding:0px 5px 0px 5px;"><img src="/marksix/info/images/icon_special_no.gif?CV=L4.01R0f_CRQ127268" width="6" height="6" style="vertical-align:middle"></span><span style="padding:0px 2px 0px 2px;"><img src="/marksix/info/images/icon/no_40.gif?CV=L4.01R0f_CRQ127268" width="25" height="25" style="vertical-align:middle"></span></div></div><div class="m6LastDrawRight"></div></div><div class="m6NextDrawRow"><div class="m6LastDrawLeft"><span style="padding:0px 5px 0px 4px"><img src='/marksix/info/images/m6_arrow.gif' /></span><span><a href="javascript:switchTo('marksix','CheckDrawResult', curLang);" class='marksixLink'>Drawn Number Checking</a></span></div><div class="m6LastDrawRight"><span style="padding:0px 5px 0px 4px"><img src='/marksix/info/images/m6_arrow.gif'></span><span><a href="javascript:switchTo('marksix','Results', curLang);" class='marksixLink'>Results</a></span></div></div>
                    </div>

                    <div id="marksixNextDraw" style="display: none;"><div class="m6NextDrawRow"><div class="m6NextDrawLeft">Date:</div><div class="m6NextDrawRight">17/09/2022</div></div><div class="m6NextDrawRow"><div class="m6NextDrawLeft">Turnover:</div><div class="m6NextDrawRight">$7,782,685</div></div><div class="m6NextDrawRow"><div class="m6NextDrawLeft">Jackpot/Snowball:</div><div class="m6NextDrawRight red">$8,000,000</div></div><div class="m6NextDrawRow"><div class="m6NextDrawLeft">Est. 1st Prize Fund:</div><div class="m6NextDrawRight redNum1"><strong>$12,000,000</strong></div></div>
                    </div>

                    <div id="marksixGuide" style="display: none;">
                        <ul>
                            <li><a href="javascript:;" onClick="var para= {'file': 'prize_entitlement.asp'}; switchTo('marksix', 'userinfo', curLang, para);" class="marksixLink">Prize Qualification</a>: 1st Prize Pick all the 6 Drawn Numbers</li>
                            <li><a href="javascript:;" onClick="var para= {'file': 'multiple_banker.asp'}; switchTo('marksix', 'userinfo', curLang, para);" class="marksixLink">Types of Entry</a>: Mark Six has several types of entry available for selection</li>
                            <li><a href="javascript:;" onClick="var para= {'file': 'chance.asp'}; switchTo('marksix', 'userinfo', curLang, para);" class="marksixLink">Multiple / Banker Entry Chance Table</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="block_mid_ms">
                <div id="block_mid_sytle_ms">
                    <div class="landingMenuTABLE">
                        <div class="landingMenuTR">
                            <div class="landingMenuTD1">
                                <img src="/marksix/info/images/arrow.gif?CV=L4.01R0f_CRQ127268">
                            </div>
                            <div class="landingMenuTD2">
                                <a href="javascript:;" onclick="switchTo('marksix', 'single', curLang);" class="content_menu">Self Select</a>
                            </div>
                            <div class="landingMenuTD1">
                                <img src="/marksix/info/images/arrow.gif?CV=L4.01R0f_CRQ127268">
                            </div>
                            <div class="landingMenuTD2">
                                <a href="javascript:;" onclick="switchTo('marksix', 'multiple', curLang);" class="content_menu">Self Multiple<br>Select</a>
                            </div>
                            <div class="landingMenuTD1">
                                <img src="/marksix/info/images/arrow.gif?CV=L4.01R0f_CRQ127268">
                            </div>
                            <div class="landingMenuTD2">
                                <a href="javascript:;" onclick="switchTo('marksix', 'banker', curLang);" class="content_menu">Self Select <br>with Banker</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="block_home_inc_ms">
                <div class="m6RanTable">
                    <div class="rhead">
                        <div class="left">Mark Six Quick Pick</div>
                        <div class="right">17/09/2022</div>
                        <div class="clear"></div>
                    </div>
                    <div class="m6RanBody" id="mk6num"></div>
                    <div class="m6RanMsg" id="m6RanMsg" style="display:none">Bet line has been added to Slip. <br>Please "Retry" or click <a href="javascript:switchTo('marksix', 'index', curLang);" style="color:#CC2C2C">here</a> for other bets or more Mark Six information.</div>
                    <div class="rangenButton">
                        <div class="addBet" title="Add To Slip" onclick="add_mk_entry()"></div>
                        <div class="rangenRetry" title="Retry." onclick="rangen_number()"></div>
                        <div class="clear"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
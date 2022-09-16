var nBetweendelay = 5000;
var nBetweendelayNews = 10000;
var nFadespeed = 400;
var nNews=[];
var nNewsWhatsNew=[];
var fadeTimeout;
var fadeTimeoutWhatsNew;

function fadeToggle(i) {
    if ( i==nNews.length )
		i = 0;
	$('#divNews').fadeOut(nFadespeed, function() {
        $('#divNews').html(nNews[i]);
	    $('#divNews').fadeIn();
	    fadeTimeout = setTimeout('fadeToggle(' + (i+1) + ')', nBetweendelay);
	});
}

function prepareRollingText(tmpNews) {
	nNews=[];
	clearTimeout(fadeTimeout);

	var stringLen = (curLang == "ch") ? 98 : 200;
	for (var i=0;i<tmpNews.length;i++) {
		var tmpCnt = 0;
		var tmpTxt = '';
		var tmpHtmlArr = $.parseHTML(tmpNews[i]);
		$.each( tmpHtmlArr, function( idx, el ) {
			switch ( el.nodeName ) {
				case '#text':
					var splitDelim = curLang=='en' ? ' ' : '';
					var tmpTxtArr = el.nodeValue.split(splitDelim);
					$.each( tmpTxtArr, function( jdx, el2 ) {
						if ( tmpCnt + el2.length + splitDelim.length > stringLen ) {
							nNews.push(tmpTxt);
							tmpTxt = '';
							tmpCnt = 0;
						}
						tmpTxt += (el2 + splitDelim);
						tmpCnt += el2.length + splitDelim.length;
					});
					break;
				default:
					if ( tmpCnt + el.innerText.length > stringLen ) {
						nNews.push(tmpTxt);
						tmpTxt = '';
						tmpCnt = 0;
					}
					tmpTxt += el.outerHTML;
					tmpCnt += el.innerText.length;
					break;
			}
		});
		if ( tmpTxt!='' )
			nNews.push(tmpTxt);
	}
}


function reloadImportantNotices(pdType) {
    $.ajax({
        url: "/contentserver/jcbw/cmc/importantNotices.json",
        type: "get",
        contentType: "application/json; charset=utf-8",
        success: function success(data) {
			var lang = curLang=='en' ? 'E' : 'C';
			var pd = pdType + '_' + lang;
            var msgList = data;
            var tmpNews = msgList[pd];
	        prepareRollingText(tmpNews);
			if ( tmpNews.length > 0 ) {
				$('#homeSNDiv').show();
				fadeToggle(0);
			}
        },
        error: function (data) {
        }
    });
}



function fadeToggleWhatsNew(i) {
	if (i == nNewsWhatsNew.length)
		i = 0;
	$('#divLandingNewsInner').fadeOut(nFadespeed, function () {
		$('#divLandingNewsInner').html('<ul><li>' + nNewsWhatsNew[i] + '</li></ul>');
		$('#divLandingNewsInner').fadeIn();
		fadeTimeoutWhatsNew = setTimeout('fadeToggleWhatsNew(' + (i + 1) + ')', nBetweendelayNews);
	});
}

function prepareWhatsNew(tmpNews) {
	nNewsWhatsNew = [];
	clearTimeout(fadeTimeoutWhatsNew);

	var stringLen = (curLang == "ch") ? 12500 : 1444;
	for (var i = 0; i < tmpNews.length; i++) {
		if (tmpNews[i].length > stringLen) {
			for (j = 0; j < tmpNews[i].length; j++) {
				if (lang == 'E') {
					tstr = tmpNews[i].substr(j, stringLen);
					tpos = tstr.lastIndexOf(" ");
					if (tpos < 0)
						tpos = stringLen;
					if (tstr.length < stringLen) {
						nNewsWhatsNew.push(tmpNews[i].substr(j, stringLen));
						j = tmpNews[i].length;
					} else {
						nNewsWhatsNew.push(tstr.substr(0, tpos));
						j += tpos;
					}

				} else {
					nNewsWhatsNew.push(tmpNews[i].substr(j, stringLen));
					j += (stringLen - 1);
				}
			}
		} else {
			nNewsWhatsNew.push(tmpNews[i]);
		}
	}
}

function reloadWhatsNew() {
	$.ajax({
        url: "/news.aspx?lang="+curLang,
        type: "get",
        contentType: "application/json; charset=utf-8",
        success: function success(data) {
            prepareWhatsNew(data);
			if (data.length > 0) {
				fadeToggleWhatsNew(0);
			}
        },
        error: function (data) {
        }
    });
}
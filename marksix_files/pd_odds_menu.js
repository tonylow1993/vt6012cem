function loadProductMenu() {
  var buf = [];
  buf.push('<div class="pContainer">');
  for ( var i=0; i<oMenuData['pMenu'].length; i++ ) {
    if ( i>0 ) {
	  buf.push('<div class="pDropdown" style="padding-top:3px"><img src="/');
	  buf.push(oMenuLPD);
	  buf.push('/info/images/tool_line_v.gif');
	  buf.push(cacheVersion);
	  buf.push('" width="1px" height="14px"></div>');
	}
  
    if ( oMenuData['pMenu'][i].child==null ) {
      buf.push('<div class="pDropdown" onclick="menuItemClick(');
	  buf.push(i);
	  buf.push(',-1);"><span>');
	  buf.push(oMenuData['pMenu'][i]['n'+oMenuLang]);
	  buf.push('</span></div>');
    }
	else {
	  buf.push('<div class="pDropdown">');
	  buf.push('<div class="pDropbtn" onclick="pMenuClick(');
	  buf.push(i);
	  buf.push(');">');
	  buf.push(oMenuData['pMenu'][i]['n'+oMenuLang]);
	  buf.push('</div>');
	  
	  buf.push('<div class="pDropdownTable" id="pMenu');
	  buf.push(i);
	  buf.push('">');
	  
	  buf.push('<ul>');
	  for ( var j=0; j<oMenuData['pMenu'][i]['child'].length; j++ ) {
        if (oMenuData['pMenu'][i]['child'][j]['dm']=='' || oMenuData['pMenu'][i]['child'][j]['dm']==document.domain) {
			if ( oMenuData['pMenu'][i]['child'][j]['pa']=='racingNotes' && (!jsPeNoteGlobalFlag || GetSetting('PeNote') == '0') ) {
				continue;
			}
			buf.push('<li onclick="menuItemClick(');
			buf.push(i);
			buf.push(',');
			buf.push(j);
			buf.push(');">');
			buf.push(oMenuData['pMenu'][i]['child'][j]['n'+oMenuLang]);
			buf.push('</li>');
		}
	  }
	  buf.push('</ul>');
	  
	  buf.push('</div>');
	  buf.push('</div>');
	}
  }
  buf.push('</div>');
  $('#thirdMenu').html(buf.join(''));
  
  resizePMenu();
  reloadRGPDiv();
}

function resizePMenu() {
  var count = 0;
  var pLength = $('#thirdMenu').width();
  // wait for menu style to fully loaded
  if ( pLength!=750 ) {
	setTimeout('resizePMenu()', 10);
	return;
  }
  var multiplier = 1;
  
  // handling a double click menu issue
  if($('.pDropdown').width() == 0 || $('.pDropdown').width() == 750){
  	setTimeout('resizePMenu()', 100);
	return;
  }

  $('.pDropdown').each(function() {
	count += $(this).width();
  });
  multiplier = pLength / count;
  
  $('.pDropdown').each(function() {
	$(this).width($(this).width()*multiplier);
  });
  
  var lastMenuIdx = oMenuData['pMenu'].length-1;
  if ( oMenuData['pMenu'][lastMenuIdx].child != null ) {
    var newLeft = pLength - $('#pMenu'+lastMenuIdx).width() - 8;
    $('#pMenu'+lastMenuIdx).css('left', newLeft + 'px');
  }
  
  for ( var i=0; i<oMenuData['pMenu'].length; i++ ) {
    if ( oMenuData['pMenu'][i]['n'+oMenuLang].indexOf('<sup>') >= 0 ) {
      $('.pDropdown').css('vertical-align', 'bottom');
        break;
    }
  }
}

function menuItemClick(i, j) {
  var attr = '';
  if ( j>=0 ) {
    if ( oMenuData['pMenu'][i]['child'][j]['pu']==1 ) {
      if ( oMenuData['pMenu'][i]['child'][j]['at']!='' )
        attr = oMenuData['pMenu'][i]['child'][j]['at'];
	  window.open(oMenuData['pMenu'][i]['child'][j]['u'+oMenuLang], oMenuData['pMenu'][i]['child'][j]['pa'], attr);
	}
	else if (oMenuData['pMenu'][i]['child'][j]['pg']!='') {
		eval(printMenuSwitchTo(oMenuData['pMenu'][i]['child'][j]['pg'], oMenuData['pMenu'][i]['child'][j]['pa']));
	}
	else {
	  location.href = oMenuData['pMenu'][i]['child'][j]['u'+oMenuLang];
	}
  }
  else {
    if ( oMenuData['pMenu'][i]['pu']==1 ) {
      if ( oMenuData['pMenu'][i]['at']!='' )
	    attr = oMenuData['pMenu'][i]['at'];
	  window.open(oMenuData['pMenu'][i]['u'+oMenuLang], '', attr);
	}
	else if (oMenuData['pMenu'][i]['pg']!='' ) {
		eval(printMenuSwitchTo(oMenuData['pMenu'][i]['pg'], oMenuData['pMenu'][i]['pa']));
	}
	else {
	  location.href = oMenuData['pMenu'][i]['u'+oMenuLang];
	}
  }
}

function pMenuClick(idx) {
  var pMenu = document.getElementById("pMenu" + idx);
  var hasShow = pMenu.classList.contains('pShow');
  closeAllSubMenu();
  if ( hasShow )
    menuItemClick(idx, -1);
  else
    pMenu.classList.toggle("pShow");
}

function loadOddsMenu() {
  var buf = [];
  buf.push('<div id="oMenuTABLE">');
  for ( var i=0; i<oMenuData['oMenu'].length; i++ ) {
    
    if ( oMenuData['oMenu'][i]['type']=='LABEL' ) {
      buf.push('<div class="oMenuTitle">');
      buf.push(oMenuData['oMenu'][i]['n'+oMenuLang]);
      buf.push('</div>');
    }
    else if ( oMenuData['oMenu'][i]['type']=='CWA' || oMenuData['oMenu'][i]['type']=='CWB_CWC' ) {
      if ( oMenuData['oMenu'][i]['dv']!='' && oMenuDV!=oMenuData['oMenu'][i]['dv'] )
        continue;
      buf.push('<div class="oMenuTR">');
      printArrow(buf);
      buf.push('<div id="oMenu');
	  buf.push(oMenuData['oMenu'][i]['type']);
	  buf.push('" class="oMenuTD2NoHover">');
      buf.push(oMenuData['oMenu'][i]['n'+oMenuLang]);
      printIcon(buf, i);
      buf.push('</div>');
      buf.push('</div>');
    
      for ( var j=0; j<oMenuData['oMenu'][i]['child'].length; j++ ) {
        buf.push('<div class="oMenuTR');
        buf.push(getHighlightClass(oMenuData['oMenu'][i]['child'][j]['type']));
        buf.push('">');
        buf.push('<div class="oMenuChildTD1">&bull;</div>');
        buf.push('<div class="oMenuChildTD2" onclick="');
        if ( oMenuData['oMenu'][i]['child'][j]['pg']!='' )
          buf.push(printMenuSwitchTo(oMenuData['oMenu'][i]['child'][j]['pg'], oMenuData['oMenu'][i]['child'][j]['pa']));
        else
          buf.push(oMenuData['oMenu'][i]['child'][j]['u'+oMenuLang]);
        buf.push(';highLightMenu(this)">');
        buf.push(oMenuData['oMenu'][i]['child'][j]['n'+oMenuLang]);
		printChildIcon(buf, i, j);
        buf.push('</div>');
        buf.push('</div>');
      }
    }
    else {
      buf.push('<div class="oMenuTR');
      buf.push(getHighlightClass(oMenuData['oMenu'][i]['type']));
      buf.push('">');
      printArrow(buf);
      buf.push('<div class="oMenuTD2" onclick="');
      if ( oMenuData['oMenu'][i]['pg']!='' )
        buf.push(printMenuSwitchTo(oMenuData['oMenu'][i]['pg'], oMenuData['oMenu'][i]['pa']));
      else
        buf.push(oMenuData['oMenu'][i]['u'+oMenuLang]);
      buf.push(';highLightMenu(this)" id="oMenu');
	  buf.push(oMenuData['oMenu'][i]['type']);
	  buf.push('">');
      buf.push(oMenuData['oMenu'][i]['n'+oMenuLang]);
      printIcon(buf, i);
      buf.push('</div>');
      buf.push('</div>');
    }
  }
  
  buf.push('</div>');
  $('#oddsMenu').html(buf.join(''));
  
  resizeOMenu(0);
}

function resizeOMenu(i) {
	$('#oddsMenu').css('width', '115px');
	var contentWidth = $('.bodyMainOddsTable').width();
	if ( contentWidth > 635 )
		$('#oddsMenu').css('width', (120 - (contentWidth - 635)) + 'px');
	$('#containerHeight').text('#container { min-height: ' + ($('#oddsMenu').height()+60)+'px; ' + '};');
	if ( i<3 ) {
		setTimeout(function() {
			resizeOMenu(i+1);
		}, 500);
	}
}

function getHighlightClass(menuType) {
  var highlightClass = '';
  var types = menuType.split(',');
  var currentUrl = window.location.href;
  var isTournamentPage = currentUrl.toLowerCase().indexOf("tournament") >= 0;
  for ( var idx in types ) {
	var isTournMenuType = types[idx].toLowerCase().indexOf("tournid") >= 0;
	var isValidMenuType = (!isTournamentPage && !isTournMenuType) || (isTournamentPage && isTournMenuType)
    if ((isValidMenuType && currentUrl.toLowerCase().indexOf(types[idx].toLowerCase())>=0)
       && currentUrl.indexOf("/results/")<0) {
      highlightClass = ' oMenuHighlight';
      break;
    }
  }
  return highlightClass;
}

function highLightMenu(obj) {
	$('.oMenuTR').removeClass('oMenuHighlight');
	$(obj).parent().addClass('oMenuHighlight');
}

function printArrow(buf) {
  buf.push('<div class="oMenuTD1">');
  buf.push('<img src="/info/');
  buf.push(oMenuLPD);
  buf.push('/info/images/arrow.gif');
  buf.push(cacheVersion);
  buf.push('" width="4px" height="5px">');
  buf.push('</div>');
}

function printIcon(buf, idx) {
  if ( oMenuData['oMenu'][idx]['dv']!='' && oMenuData['oMenu'][idx]['dv'].indexOf(oMenuDV)<0 )
    return;

  if (oMenuData['oMenu'][idx]['icon']!='') {
    buf.push('&nbsp;<img src="');
    buf.push(oMenuIconPath);
    buf.push(oMenuLang);
    buf.push('_');
    buf.push(oMenuData['oMenu'][idx]['icon']);
	buf.push(cacheVersion);
    buf.push('" title="');
    buf.push(oMenuData['oMenu'][idx]['icon'+oMenuLang]);
    buf.push('">');
  }
}

function printChildIcon(buf, idx1, idx2) {
  if (oMenuData['oMenu'][idx1]['child'][idx2]['icon']!='') {
    buf.push('&nbsp;<img src="');
    buf.push(oMenuIconPath);
    buf.push(oMenuLang);
    buf.push('_');
    buf.push(oMenuData['oMenu'][idx1]['child'][idx2]['icon']);
	buf.push(cacheVersion);
    buf.push('" title="');
    buf.push(oMenuData['oMenu'][idx1]['child'][idx2]['icon'+oMenuLang]);
    buf.push('">');
  }
}

function printMenuSwitchTo(pg, pa) {
	if ( curProduct=='racing' ) {
		var rNo = curRaceNo
		var pRNo = getParameterByName('raceno');
		if ( pRNo!='' )
			rNo = pRNo;
		if ( rNo==0 )
			rNo = 1;
    	pa = '{\'date\': \'' + mtgDate + '\''
		+ ',\'venue\': \'' + mtgVenue + '\''
		+ ',\'raceno\': ' + rNo
		+ '}';
	}
	return 'switchTo(curProduct, \'' + pg + '\', curLang' + (pa!='' ? ', ' + pa : '') + ')';
}
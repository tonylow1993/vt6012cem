// combobox for flexibet

var fPrefix = 'flexiSelect';

function createFlexiDropdown(idx, defaultVal, expand) {
  var buf = new StringBuffer();
  buf.append('<div id="')
     .append(fPrefix).append(idx)
     .append('" class="');

  if ( expand )
    buf.append('ctlSelectExpand');
  else
    buf.append('ctlSelect');

  buf.append('"  onclick="expandDropdown(this, ')
     .append(idx)
     .append(', GetText(\'flexi_opt\'), ')
     .append(expand).append('); event.cancelBubble=true;" onblur="collapseDropdown(')
     .append(idx)
     .append(', GetText(\'flexi_opt\'), ')
     .append(expand).append(');" onMouseOver="betlines[')
     .append(idx).append('].unitHit = true;" onMouseOut="betlines[')
     .append(idx).append('].unitHit = false;" ')
     .append('title=\'').append(GetText('dropdownAlt')[betlines[idx].betMethod]).append('\' ')
     .append('>');
  buf.append('<div id="')
     .append(fPrefix).append(idx).append('Text')
     .append('" class="ctlSelectInput">');
  buf.append('<span>').append(defaultVal).append('</span><span style="padding-left:1px">$').append('</span>');
  buf.append('</div>');
  buf.append('<div id="')
     .append(fPrefix).append(idx).append('Arrow')
     .append('" class="ctlSelectArrow">&#9660;</div>');
  buf.append('</div>');
  buf.append('<div id="').append(fPrefix).append(idx).append('A').append('" style="z-index:10;position:absolute;display:block"></div>');
  return buf.toString();
}

function dropdownOffset(e) {
	var t = e.offsetTop;
	var l = e.offsetLeft;
	var w = e.offsetWidth;
	var h = e.offsetHeight-2;

	while(e=e.offsetParent) {
		t+=e.offsetTop;
		l+=e.offsetLeft;
	}

	return {
		top : t,
		left : l,
		width : w,
		height : h
	}
}
(function() {
	if (typeof window.navigatorType == 'undefined')
	{
		window.navigatorType = {};
		var navigators = ["msie", "firefox", "safari", "chrome", "opera"];
		var userAgent = window.navigator.userAgent.toLowerCase();
		for (var i in navigators) {
			var name = navigators[i];
			navigatorType[name] = userAgent.indexOf(name) != -1;
		}
	}
})();

function expandDropdown(obj, idx, optionArray, expand) {
  if (!document.getElementById(obj.id + 'Option')) {
    $('#' + obj.id + 'Text').prop('class', 'ctlSelectInputHL');
    $('#' + obj.id + 'Arrow').prop('class', 'ctlSelectArrowHL');
    var divA = $('#' + obj.id + 'A');

    collapseAllDropdown();

    if ( expand )
      obj.className = 'ctlSelectExpandHL';
    else
      obj.className = 'ctlSelectHL';

    var offset = dropdownOffset(obj);
    var div = $('<div></div>');
    div.prop('id', obj.id + 'Option');
    div.css('position', 'absolute');
	
    var offset1 = (GetLanguage() == 1) ? -20 : -10;
    var divWidth = 60 - offset1;
    div.css('width', divWidth + 'px');
	if ( isIE11() )
		divA.css('left',  ($(obj).position().left + $(obj).width() - divWidth + 25) + 'px');
	else
		divA.css('left',  ($(obj).position().left + $(obj).width() - divWidth) + 'px');

    div.css('top', (0-$('#divBetLayer').scrollTop()) + 'px');
    div.css('height', (offset.height * optionArray.length) + 'px');
    div.css('overflow', 'hidden');
    
    if ( expand )
      div.prop('class', 'ctlOptionsExpand2');
    else
      div.prop('class', 'ctlOptions2');

    divA.append(div);
	
    for (var i = 0; i < optionArray.length; i++) {
	  var div2 = $('<div></div>');
      div2.prop('id', div.id + i);
      div2.prop('optionIdx', i);
      div2.css('cursor', 'default');
      div2.html(optionArray[i]);
      div2.css('height', offset.height + 'px');
      div2.prop('class', 'ctlUnSelectOption');
      div.append(div2);

      div2.mouseenter(function() {
        var divObj = document.getElementById(fPrefix + idx + 'Option');
        for (var j = 0; j < divObj.childNodes.length; j++) {
          if (divObj.childNodes[j] == this)
            divObj.childNodes[j].className = 'ctlSelectOption';
          else
            divObj.childNodes[j].className = 'ctlUnSelectOption';
        }
      });

      div2.mousedown(function() {
        var inputObj = document.getElementById('inputAmount' + idx);
        if (betlines[idx].isFlexiBet() && this.optionIdx == 0 && inputObj != null
          && parseInt(inputObj.value, 10) > MyParseInt(GetPara('MaxBetUnit'), 50000)) {
          ShowError(2, GetError("1208"), true, 60000);
          focusField(inputObj);
        }
        else {
          var divObj = document.getElementById(fPrefix + idx + 'Text');
          var defaultBetMethod = 'flexi_' + (isSlipOpen() ? 'l' : 's');
          if (betlines[idx].betMethod != this.optionIdx) betlines[idx].foBetObj.isRandGen = false;
          betlines[idx].betMethod = this.optionIdx;
		  betlines[idx].foBetObj.flexibet = betlines[idx].betMethod=='1';
          divObj.innerHTML = '<span>' + GetText(defaultBetMethod)[betlines[idx].betMethod] + '</span><span style="padding-left:1px">$</span>';

          UpdateBetTotal();
        }
        collapseAllDropdown(GetText('flexi_opt'), isSlipOpen());
        RedrawBetlineTable();
      });
    }

  }
  return;
}

function collapseDropdown(idx) {
  var div = document.getElementById(fPrefix + idx + 'Option');
  if ( div!=null ) {
    var divA = document.getElementById(fPrefix + idx + 'A');
    document.getElementById(fPrefix + idx + 'Text').className = 'ctlSelectInput';
    document.getElementById(fPrefix + idx + 'Arrow').className = 'ctlSelectArrow';
    if ( isSlipOpen() )
      document.getElementById(fPrefix + idx).className = 'ctlSelectExpand';
    else
      document.getElementById(fPrefix + idx).className = 'ctlSelect';

    for ( var j=0; j<2; j++ ) {
      var div2 = document.getElementById(div.id + j + 'Option');
      if ( div2!=null )
        div.removeChild(div2);
    }
    divA.removeChild(div);
  }
}

function collapseAllDropdown() {
  for ( var i=0; i<betlines.length; i++ ) {
    collapseDropdown(i);
  }
}

// combobox for marksix unit bet selection

var m6UnitPrefix = 'm6UnitSelect';

function createM6UnitBetDropdown(idx, defaultVal, expand) {
  var optArrSuffix = expand ? 'l' : 's';

  var buf = new StringBuffer();
  buf.append('<div id="')
     .append(m6UnitPrefix).append(idx)
     .append('" class="');

  buf.append('ctlSelect2');

  buf.append('"  onclick="expandM6Dropdown(this, ')
     .append(idx)
     .append(', GetText(\'m6unit_').append(optArrSuffix).append('\'), ')
     .append(expand).append('); event.cancelBubble=true;" onblur="collapseM6Dropdown(')
     .append(idx)
     .append(', GetText(\'m6unit_').append(optArrSuffix).append('\'), ')
     .append(expand).append(');" onMouseOver="betlines[')
     .append(idx).append('].unitHit = true;" onMouseOut="betlines[')
     .append(idx).append('].unitHit = false;" ')
     .append('>');
  buf.append('<div id="')
     .append(m6UnitPrefix).append(idx).append('Text')
     .append('" class="ctlSelectInput2">');
  buf.append('<span>').append('$').append(defaultVal).append('</span>');
  buf.append('</div>');
  buf.append('<div id="')
     .append(m6UnitPrefix).append(idx).append('Arrow')
     .append('" class="ctlSelectArrow">&#9660;</div>');
  buf.append('<div id="').append(m6UnitPrefix).append(idx).append('A').append('" style="z-index:10;position:absolute;display:block"></div>');
  buf.append('</div>');
  return buf.toString();
}

function expandM6Dropdown(obj, idx, optionArray, expand) {
  if ( !document.getElementById(obj.id + 'Option') ) {
    $('#' + obj.id + 'Text').prop('class', 'ctlSelectInputHL2');
    $('#' + obj.id + 'Arrow').prop('class', 'ctlSelectArrowHL');
    var divA = $('#' + obj.id + 'A');

    collapseAllM6Dropdown();

    obj.className = 'ctlSelectHL2';

    var offset = dropdownOffset(obj);
    var div = $('<div></div>');
    div.prop('id', obj.id + 'Option');
    div.css('position', 'absolute');

    var offset1 = (GetLanguage() == 1) ? -20 : -10;
    var offset2 = expand ? 0 : 40;
    var divWidth = 80 - offset1 - offset2;      
    div.css('width', divWidth + 'px');
	if ( isIE11() )
		divA.css('left',  ($(obj).position().left + $(obj).width() - divWidth + 25) + 'px');
	else
        divA.css('left',  ($(obj).position().left + $(obj).width() - divWidth) + 'px');

    div.css('top', (0-$('#divBetLayer').scrollTop()) + 'px');
    div.css('height', (offset.height * optionArray.length) + 'px');
    div.css('overflow', 'hidden');
    
    if ( expand )
      div.prop('class', 'ctlOptionsExpand2');
    else
      div.prop('class', 'ctlOptions2');

    divA.append(div);
    for ( var i=0; i<optionArray.length; i++ ) {
      var div2 = $('<div></div>');
      div2.prop('id', div.id + i);
      div2.prop('optionIdx', i);
      div2.css('cursor', 'default');
      div2.html(optionArray[i] + ' $' + GetM6UnitBet(i));
      div2.css('height', offset.height + 'px');
      div2.prop('class', 'ctlUnSelectOption2');
      div.append(div2);
  
      div2.mouseenter(function() {
        var divObj = document.getElementById(m6UnitPrefix + idx + 'Option');
        for ( var j=0; j<divObj.childNodes.length; j++ ) {
          if ( divObj.childNodes[j]==this )
            divObj.childNodes[j].className = 'ctlSelectOption2';
          else
            divObj.childNodes[j].className = 'ctlUnSelectOption2';
        }						
      });

      div2.mousedown(function() {
        var divObj = document.getElementById(m6UnitPrefix + idx + 'Text');
        betlines[idx].foBetObj.unitBet = parseInt(GetM6UnitBet(this.optionIdx), 10);
		betlines[idx].foBetObj.partial = this.optionIdx==0;
        divObj.innerHTML = '<span>$' + m6DropdownTextPadding(GetM6UnitBet(this.optionIdx)) + '</span>';

        UpdateBetTotal();
        var optArrSuffix = isSlipOpen() ? 'l' : 's';
        collapseAllM6Dropdown(GetText('m6unit_' + optArrSuffix), isSlipOpen());
        RedrawBetlineTable();
      });
    }

  }
  return;
}

function collapseM6Dropdown(idx) {
  var div = document.getElementById(m6UnitPrefix + idx + 'Option');
  if ( div!=null ) {
    var divA = document.getElementById(m6UnitPrefix + idx + 'A');
    document.getElementById(m6UnitPrefix + idx + 'Text').className = 'ctlSelectInput2';
    document.getElementById(m6UnitPrefix + idx + 'Arrow').className = 'ctlSelectArrow';
    document.getElementById(m6UnitPrefix + idx).className = 'ctlSelect2';

    for ( var j=0; j<2; j++ ) {
      var div2 = document.getElementById(div.id + j + 'Option');
      if ( div2!=null )
        div.removeChild(div2);
    }
    divA.removeChild(div);
  }
}

function collapseAllM6Dropdown() {
  for ( var i=0; i<betlines.length; i++ ) {
    collapseM6Dropdown(i);
  }
}

function m6DropdownTextPadding(iUnitBet) {
  var unit1 = GetM6UnitBet(0).toString().length;
  var unit2 = GetM6UnitBet(1).toString().length;
  var maxUnit = Math.max(unit1, unit2);
  var iUnit = iUnitBet.length;
  var oUnitBet = new StringBuffer();
  oUnitBet.append(iUnitBet);
  for ( var i=0; i< maxUnit - iUnit; i++ ) {
    oUnitBet.append('&nbsp;&nbsp;');
  }
  return oUnitBet.toString();
}

function collapseUnitBetDropdown() {
	try {
		collapseAllDropdown();
		collapseAllM6Dropdown();
	} catch (e) { }
}

function showBetPreviewOnEnter() {
  $(document).keyup(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13') {
      if(isLogon() && betslipState == STATE_NORMAL && betlines.length > 0) {
        OnClickPreview();
      }
    }

    if(keycode == "27") {
      if(isLogon() && betslipState == STATE_PREVIEWBET ) {
        OnClickClosePreview();
      }
    }
  });
}
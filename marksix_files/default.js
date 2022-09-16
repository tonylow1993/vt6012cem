if (self != top) {
	top.location.replace(self.location.href);
}

function isMobile() {
    return navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|Touch/i) != null;
}

function hasAccessMobileSplashScreen() {
	return (getParameterByName("cid") == "1") || ($.cookie("accessed") == "1");
}

function mobileBrowserChecking() {
  if (isMobile() && isMobileSplashScreenEnable) {
    if (!hasAccessMobileSplashScreen()) {
      var redirectPath = '/';
      switch (curProduct) {
        case 'racing':
          redirectPath = "r";
          break;
        case 'marksix':
          redirectPath = "m";
          break;
        case 'football':
          redirectPath = "f";
          break;
      }
      window.location = mobileSplashScreenLink + '?redirect=' + redirectPath;
    } else {
      if (getParameterByName("cid") == "1") {
	    $.cookie("accessed", "1", { expires: 1000, path: '/', domain: domain });
	  }
	}
  }

  if(smartAppAOSEnable && navigator.userAgent.match(/Windows Phone/i) == null && navigator.userAgent.match(/android/i) != null && navigator.userAgent.match(/Chrome/i) != null) {
    androidBannerTimer = setInterval(function() { addAndroidBanner(); } ,500);
  }

  $(window).scroll(function() {	
    if (smartBannerEnabled) {
      clearTimeout($.data(this, 'scrollTimer'));
      $.data(this, 'scrollTimer', setTimeout(function() {
        changeZoomVal();
      }, 250));
	  infoScroll();
    }
  });
  
  window.onorientationchange = function (event) {
    setTimeout (function(){		
      setTimeout(function() {
        if(smartBannerEnabled) {
          var deviceWidth = screenWidth / window.devicePixelRatio;
          initialZoom0 = $(document).width()/deviceWidth;
          var deviceHeight = screenHeight / window.devicePixelRatio;
          initialZoom1 = $(document).width()/deviceHeight;
          changeZoomVal(true);
        }
      }, 500);
    }, 100);
  }
}

function addAndroidBanner() {
  if (document.readyState === "complete") {			
    if(window.screen.width < window.screen.height) {
      screenWidth = window.screen.width;
      screenHeight = window.screen.height;
    } else {
      screenWidth = window.screen.height;
      screenHeight = window.screen.width;
    }
    smartBannerEnabled = true;
    updateSmartAppBannerLang(true);
    rezoomBannerTimer = setInterval(function(){ changeZoomVal(); }, 3000);
    clearInterval(androidBannerTimer);
  }
}

var currentZoom;
var initialZoom0 = 0;
var initialZoom1 = 0;
var currentScroll = 0;
var lastScrollTop = 0;
var screenWidth = 0;
var screenHeight = 0;
var smartBannerEnabled = false;
var androidBannerTimer;
var rezoomBannerTimer;

function updateSmartAppBannerLang(forceLoad) {
	if(smartBannerEnabled && ($('#smartabanner').is(':visible') || (forceLoad!=undefined && forceLoad==true))) {
		var img = new Image();
		$('#smartabanner').remove();
		var smartAppLogo = "/info/include/images/icon_aos_smart_app.png";
		var smartAppHref = smartAppAOSUrl;
		var smartAppClass = 'smartbanner-' + curLang;
		var smartAppButtonClass = curLang;
		var smartAppButtonPath = '/info/include/images/aos_smart_app_' + curLang + '_button.png';
		var smartAppVerticalPath = '/info/include/images/aos_smart_app_' + curLang + '_vertical.png';
		var smartAppHorizontalPath = '/info/include/images/aos_smart_app_' + curLang + '_horizontal.png';
		img.onload = function() {
			img.onload = function() {
				img.onload = function() {
					img.onload = function() {
						var smartAppAOSDiv = '<div class="smartbanner" id="smartabanner"><div class="smartbanner-container smartbanner-container-104">ccc</div>'
							+'    <div class="smartbanner-container">'
							+'        <a href="#" id="smb-close" class="smartbanner-close"></a>'
							+'        <span class="smartbanner-icon"></span>'
							+'        <div class="smartbanner-info ' + smartAppClass + '">'
							+'        </div>'
							+'        <a onclick="waTrack(\'1718ISBW_OPEN\');" href="' + smartAppHref + '" target="_blank" class="smartbanner-button ' + smartAppButtonClass + '">'
							+'        </a>'
							+'    </div>'
							+'</div>';
						$("body").prepend(smartAppAOSDiv);
						
						
						$('#smb-close').click(function(){
							$('#smartabanner').remove();
							$("#betslipDiv").css("top", "39px");
							$("#topNav").css("top", "62px");
							smartBannerEnabled = false;
							clearInterval(rezoomBannerTimer);
							waTrack('1718ISBW_CLOSE');
						});
						
						
						if(window.orientation == 0 || window.orientation == 180) {
							if(initialZoom0==0) {
								var deviceWidth = screenWidth / window.devicePixelRatio;
								initialZoom0 = $(document).width()/deviceWidth;
							}
						} else {
							if(initialZoom1==0) {
								var deviceHeight = screenHeight / window.devicePixelRatio;
								initialZoom1 = $(document).width()/deviceHeight;
							}
						}
						changeZoomVal(true);
					};
					//4. load logo
					img.src = smartAppLogo;
				};
				//3. load horizontal
				img.src = smartAppHorizontalPath;
			};
			//2. load vertical
			img.src = smartAppVerticalPath;
		};
		// 1. load button
		img.src = smartAppButtonPath;
	}
}

function changeZoomVal(forceToChange) {
	if(screenWidth>700 || (window.orientation != 0 && window.orientation != 180)) {
		$('.smartbanner-info').removeClass("smartbanner-vertical");
		$('.smartbanner-info').addClass("smartbanner-horizontal");
	} else {
		$('.smartbanner-info').removeClass("smartbanner-horizontal");
		$('.smartbanner-info').addClass("smartbanner-vertical");
	}
	var initialZoom = (window.orientation == 0 || window.orientation == 180)  ? initialZoom0 : initialZoom1;
	var deviceWidth = (window.orientation == 0 || window.orientation == 180)  ? screenWidth : screenHeight;
	
	deviceWidth = deviceWidth / window.devicePixelRatio;
	var innerWidth = window.innerWidth;
	var zoomValue = innerWidth / deviceWidth;
	
	if(zoomValue>initialZoom) {
		zoomValue = initialZoom;
	}
	var maxZoom = (window.orientation == 0 || window.orientation == 180) ? 3.5 : (screenWidth / screenHeight)*3.5;
	
	if(initialZoom>maxZoom) {
		zoomValue = maxZoom * zoomValue/initialZoom;
	}
					
	if(currentZoom!=zoomValue || currentScroll!=$(document).scrollLeft() || (forceToChange!=undefined && forceToChange)) {
		currentZoom = zoomValue;
		currentScroll = $(document).scrollLeft();

		$('.smartbanner*').css('zoom', zoomValue);
		$('.smartbanner-container').css('left', ($(document).scrollLeft())/zoomValue + 'px');
		
		var containerWidth;
		if(initialZoom>maxZoom) {
			containerWidth = (100 / maxZoom) * zoomValue;
		} else {
			containerWidth = (100 / initialZoom) * zoomValue;
		
		}
		
		$('.smartbanner-container').css('width', containerWidth + '%');
		$('.smartbanner-container-104').css('width', containerWidth*1.04 + '%');
		
		var topNavHeight = 70 * zoomValue + 62;
		var betslipHeight = 70 * zoomValue + 39;
		$('#topNav').css('top', topNavHeight + 'px');
		$('#betslipDiv').css('top', betslipHeight + 'px');
	}
}
function infoScroll() {
	if(smartBannerEnabled && $(window).scrollTop()*currentZoom!=lastScrollTop && ($(window).scrollTop() > 100 || $(window).scrollTop() == 0)) {
		lastScrollTop = $(window).scrollTop()*currentZoom;
		if(lastScrollTop>0) {
			$('.smartbanner').hide();
            $('#topNav').css('top', '');
		    $('#betslipDiv').css('top', '');
		} else {
			$('.smartbanner').show();
			changeZoomVal(true);
		}
	}
}

var elementPosition;
function zoomLevel(){
	if(!isMobile()){
		return window.devicePixelRatio;
	}else{
		return 1;//document.documentElement.clientWidth / window.innerWidth;
	}
}
function isMinWidth(){
	if($(window).width() < 1000){
		return true;
	}
	return false;
}

function pageScroll(){
	elementPosition = $('#betslipDiv').offset();
	$(window).scroll(function(){
		setBetSlipPosition();
	});
	$(window).on('resize', function(){
      setBetSlipPosition();
});
}

function setBetSlipPosition(){
	if (isQRPortal)
		return;
	
	var betslipTop = 39;
	if($('.smartbanner').is(":visible")) {
		betslipTop = betslipTop + $('#infoDiv').offset().top;
	}

	if(zoomLevel() > 1.25 || (isMinWidth() && !isMobile())){
		if($("#infoDiv").height() - $(window).scrollTop() > 490){
			if($(window).scrollTop() > elementPosition.top && $(window).scrollTop() > 39){
				  $('#betslipDiv').css('position','absolute');
				  $('#betslipDiv').animate({
					  top: $(window).scrollTop()+10
				  },1);
			} else {
				  $('#betslipDiv').css('position','absolute');
				  $('#betslipDiv').animate({
					  top: betslipTop
				  },1);
			}
		}
	}else{
		$('#betslipDiv').css('position','fixed').css('top', betslipTop);
	}
}
<!--
	function changeMenuPos() {
		if (parseInt(navigator.appVersion)>3) {
 			if (navigator.appName=="Netscape") {
 				winW = window.innerWidth;
				var obj;//,args=changeMenuPos.arguments;
				//if ((obj=MM_findObj(args[0]))!=null) {
					obj=MM_findObj("pullMenu");
					//alert(obj.style.left);
					if (winW<772) {
						obj.style.left = 589;
					} else {
						obj.style.left = (winW-772)/2 + 579;
					}
				//}
 			}
			if (navigator.appName.indexOf("Microsoft")!=-1) {
  				winW = document.body.offsetWidth;
  				
				var obj;//,args=changeMenuPos.arguments;
				//if ((obj=MM_findObj(args[0]))!=null) {
					obj=MM_findObj("pullMenu");
					//alert(obj.style.left);
  				
	  			/*if (winW<772) {
			  		pullMenu.style.pixelLeft = 589;
  				} else {
	  				pullMenu.style.pixelLeft = (winW-772)/2 + 579;
  				}*/
			}
		}
		var obj;
		if (winW<772) {
			obj.style.left = 589;
		} else {
			obj.style.left = (winW-772)/2 + 579;
		}
 	}
	

function NewWindow(mypage, myname, w, h, scroll,resizable,toolbar) {
var winl = (screen.width - w) / 2;
var wint = (screen.height - h) / 2;
if (w=="" && h=="")
{
	w = "698";
	h = "440";
	winl = winl - (698/2)
	wint = wint - (440/2)
	winprops = 'height='+h+',width='+w+',top='+wint+',left='+winl+',scrollbars='+scroll+',resizable='+resizable+',toolbar=no,'
}
else if ((w=="700" && h=="600") || (w=="720" && h=="600"))
{
	w = "698";
	h = "440";
	winprops = 'height='+h+',width='+w+',top='+wint+',left='+winl+',scrollbars='+scroll+',resizable='+resizable+',toolbar=no,'
}
else
{
	winprops = 'height='+h+',width='+w+',top='+wint+',left='+winl+',scrollbars='+scroll+',resizable='+resizable+',toolbar='+toolbar+','
}
win = window.open(mypage, myname, winprops)
win.self.focus()
//if (parseInt(navigator.appVersion) >= 4) { win.window.focus(); }
}

function highlight(which,color01,color02){
if (document.all||document.getElementById)
which.style.backgroundColor=color02
which.style.color=color01
}

function highlight(which,color01,color02){
if (document.all||document.getElementById)
which.style.backgroundColor=color02
which.style.color=color01
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);

function MM_showHideLayers() { //v6.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}
function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

function callDivCal(para,lang) {
if (lang == "E")
	ci = "en-US"
else
	ci = "zh-HK"

if (para != "0") {
	para = removeApos(para);
	para = hexcode(para)
}

a = window.open("http://bet.hkjc.com/football/inc/div_cal.aspx?para=" + para + "&ci=" + ci,"divCalculator",'scrollbars=yes,resizable=yes,width=587,height=410');
}
/*
function callDivCal(para) {
	a = window.open("http://bet.hkjc.com/football/en/inc/div_cal.asp?para=" + para,"divCalculator",'scrollbars=yes,resizable=yes,width=457,height=310');
	

}*/

function popTourInfo()
{
	MM_openBrWindow('/football/info/en/misc/match_info.asp','','scrollbars=no,resizable=yes,width=572,height=270')
}

function popTV()
{
	javascript: MM_openBrWindow('/football/info/en/misc/tv_popup.asp','','scrollbars=no,resizable=yes,width=572,height=270')
}

function setLyr(obj,lyr)
{
	var newX = findPosX(obj);
	var newY = findPosY(obj);
	newY += 10;
	var x = new getObj(lyr);
	x.style.visibility = 'visible';
	x.style.top = newY + 'px';
	x.style.left = newX + 'px';
}

function findPosX(obj)
{
	var curleft = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	}
	else if (obj.x)
		curleft += obj.x;
	return curleft;
}

function findPosY(obj)
{
	var curtop = 0;
	var printstring = '';
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			printstring += ' element ' + obj.tagName + ' has ' + obj.offsetTop;
			curtop += obj.offsetTop
			obj = obj.offsetParent;
		}
	}
	else if (obj.y)
		curtop += obj.y;
//	window.status = printstring;
	return curtop;
}


function getObj(name)
{
 if (document.getElementById)
 {
	   this.obj = document.getElementById(name);
	   this.style = document.getElementById(name).style;
 }
 else if (document.all)
 {
	   this.obj = document.all[name];
	   this.style = document.all[name].style;
 }
 else if (document.layers)
 {
	   if (document.layers[name])
	   {
	   	this.obj = document.layers[name];
	   	this.style = document.layers[name];
	   }
	   else
	   {
	    this.obj = document.layers.testP.layers[name];
	    this.style = document.layers.testP.layers[name];
	   }
 }
}
//-->
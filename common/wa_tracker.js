/*HKJC Common v.26.9 (GDPR) */
/*HKJC code start*/
if (typeof(WCIPCookie) == "undefined") {
    WCIPCookie = (function() {
        var q;
        var i = "custProIn=";
        var h = ":";
        var r;
        var a;
        var x = false;

        function w() {
            if (x) {
                return
            }
            r = document.cookie.split(";");
            for (var G = 0; G < r.length; G++) {
                var H = r[G];
                while (H.charAt(0) == " ") {
                    H = H.substring(1, H.length)
                }
                if (H.indexOf(i) == 0) {
                    q = H.substring(i.length, H.length)
                }
            }
            a = new Array(7);
            if (q != null) {
                a = q.split(h)
            }
            x = true
        }

        function D() {
            x = false;
            q = null;
            r = null;
            a = null
        }

        function E(G) {
            w();
            if (a[G] != null) {
                return decodeURIComponent(a[G].replace(/\+/g, "%20"))
            } else {
                return null
            }
        }
        var j = function() {
            w();
            return E(0)
        };
        var v = function() {
            w();
            return E(1)
        };
        var n = function() {
            w();
            return E(2)
        };
        var k = function() {
            w();
            return E(3)
        };
        var A = function() {
            w();
            return E(4)
        };
        var d = function() {
            w();
            return E(5)
        };
        var C = function() {
            w();
            if ((a[6] != null) && (a[6].length >= 1)) {
                return a[6].charAt(0)
            } else {
                return "0"
            }
        };
        var f = function() {
            w();
            if ((a[6] != null) && (a[6].length >= 6)) {
                return a[6].charAt(1) + a[6].charAt(2) + a[6].charAt(3) + a[6].charAt(4) + a[6].charAt(5)
            } else {
                return "00000"
            }
        };
        var y = function() {
            w();
            if ((a[6] != null) && (a[6].length >= 7)) {
                return a[6].charAt(6)
            } else {
                return "0"
            }
        };
        var p = function() {
            w();
            if ((a[6] != null) && (a[6].length >= 8)) {
                return a[6].charAt(7)
            } else {
                return "0"
            }
        };
        var o = function() {
            w();
            if ((a[6] != null) && (a[6].length >= 9)) {
                return a[6].charAt(8)
            } else {
                return "0"
            }
        };
        var F = function() {
            w();
            if ((a[6] != null) && (a[6].length >= 10)) {
                return a[6].charAt(9)
            } else {
                return "0"
            }
        };
        var u = function() {
            w();
            if ((a[6] != null) && (a[6].length >= 12)) {
                return a[6].charAt(10) + a[6].charAt(11)
            } else {
                return "00"
            }
        };
        var l = function() {
            w();
            if ((a[6] != null) && (a[6].length >= 13)) {
                return a[6].charAt(12)
            } else {
                return "0"
            }
        };
        var c = function() {
            w();
            if ((a[6] != null) && (a[6].length >= 14)) {
                return a[6].charAt(13)
            } else {
                return "0"
            }
        };
        var B = function() {
            w();
            if ((a[6] != null) && (a[6].length >= 15)) {
                return a[6].charAt(14)
            } else {
                return ""
            }
        };
        var s = function() {
            w();
            if ((a[6] != null) && (a[6].length >= 16)) {
                return a[6].charAt(15)
            } else {
                return "0"
            }
        };
        var t = function() {
            w();
            if ((a[6] != null) && (a[6].length >= 17)) {
                return a[6].charAt(16)
            } else {
                return ""
            }
        };
        var z = function() {
            w();
            if (E(7) != null) {
                return E(7).split("#")
            } else {
                return new Array(1)
            }
        };
        var e = function() {
            w();
            if (E(8) != null) {
                return E(8).split("#")
            } else {
                return new Array(1)
            }
        };
        var m = function() {
            w();
            a = new Array(7);
            r = document.cookie.split(";");
            for (var G = 0; G < r.length; G++) {
                var H = r[G];
                while (H.charAt(0) == " ") {
                    H = H.substring(1, H.length)
                }
                if (H.indexOf(i) == 0) {
                    q = H.substring(i.length, H.length)
                }
            }
            a = q.split(h)
        };
        var g = function() {
            w();
            if (a[6] != null) {
                return C() + f() + y() + p() + o() + F() + u() + l() + c() + s()
            } else {
                return null
            }
        };
        var ll = function() {
            w();
            if (E(11) != null) {
                return E(11)
            } else {
                return ""
            }
        }
        var b = function() {
            return n() != null
        };
        return {
            getDisplayName: j,
            getSalutation: v,
            getLastName: n,
            getLastNameChinese: k,
            getMarketingSegments: d,
            getPriorityCardHolder: C,
            getCBPSegment: f,
            getRacingParticipation: y,
            getFootballParticipation: p,
            getM6Participation: o,
            getMember: F,
            getAgeGroup: u,
            getGender: l,
            getBettingACIndicator: c,
            getMyLoginLanguage: B,
            getSpeedBetIndicator: s,
            getFootballLiveIndicator: t,
            getSlogan: A,
            getFavouriteFootballTeams: z,
            getFavouriteHorses: e,
            cookieReset: m,
            getCustomerSegment: g,
            isLoggedIn: b,
            getCuno: ll,
            reset: D
        }
    })();
    if (WCIPCookie.getCuno() != "") {
        if (typeof(DataLayer) == "undefined") {
            var DataLayer = {
                "cuno": WCIPCookie.getCuno()
            }
        } else {
            DataLayer.cuno = WCIPCookie.getCuno();
        }
    }
};
var customerSegmentWA;
try {
    if (typeof(WCIPCookie) != 'undefined' && typeof(WCIPCookie.getCustomerSegment()) != 'undefined' && WCIPCookie.getCustomerSegment() != null) {
        customerSegmentWA = WCIPCookie.getCustomerSegment();
    }
} catch (e) {}
/*HKJC code end*/
window.s_account = 'hkjcweb-prd';
var s = s_gi(s_account);
s.charSet = 'UTF-8'
s.currencyCode = 'HKD'
s.trackDownloadLinks = true
s.trackExternalLinks = true
s.trackInlineStats = true
s.linkDownloadFileTypes = 'avi,csv,doc,docx,epub,exe,mov,mp3,mpg,pdf,ppt,pptx,txt,wav,wmv,xls,xlsx,zip'
s.linkInternalFilters = 'javascript:,#,202.153.,203.82.,203.86.,203.105.,203.215.,218.188.,101.78.,aplaconference,archk2014,asianmilechallenge,beijingclubhouse,centralpolicestation,hkir,hkadrenaline,hkjc,jockeyclub,winning-wisdom,qcew,' + document.domain
s.linkLeaveQueryString = false
s.linkTrackVars = 'eVar30,eVar31,eVar90,eVar49,eVar50';
s.linkTrackEvents = 'None';
s.cookieDomainPeriods = window.location.host.split('.').length - 1;
s.server = window.location.host;
s.siteID = s.server;
s.defaultPage = ''
s.queryVarsList = ''
s.pathExcludeDelim = ''
s.pathConcatDelim = '/'
s.pathExcludeList = ''
try {
    if (!WAGdpr.isEU()) {
        try {
            s.visitor = Visitor.getInstance('06AB2C1653DB07AD0A490D4B@AdobeOrg');
        } catch (visitorapi) {
            console.log(visitorapi)
        }
    }
} catch (e) { // For webpage without global_it.js or visitorapi.js (WAGdpr is not defined), WA info will also be fired.
    try {
        s.visitor = Visitor.getInstance('06AB2C1653DB07AD0A490D4B@AdobeOrg');
    } catch (visitorapi) {
        console.log(visitorapi)
    }
}
/* Plugins */
s.usePlugins = true

function s_doPlugins(s) {
    if (s.frame == 'self') {
        if (!s.pageName) {
            s.pageName = decodeURI(s.getPageName().toLowerCase())
        }
        if (!s.prop6) {
            s.prop6 = decodeURI(document.referrer);
        }
        s.prop17 = decodeURI(document.location.href);
    }
    /*get parent frame information */
    else {
        try {
            s.prop17 = s.pageURL = decodeURI(parent.document.location.href);
            if (!s.pageName) {
                var tempPN = decodeURI(parent.document.location.hostname + parent.document.location.pathname);
                s.pageName = tempPN.toLowerCase();
            }
            if (!s.prop6) {
                s.prop6 = s.referrer = decodeURI(parent.document.referrer);
            }

        } catch (err) {
            if (!s.pageName) {
                s.pageName = decodeURI(s.getPageName().toLowerCase())
            }
            if (!s.prop6) {
                s.prop6 = decodeURI(document.referrer);
            }
            s.prop17 = decodeURI(document.location.href);
        }
    }
    s.hier1 = s.pageName;
    s.campaign = s.Util.getQueryParam('cid');
    s.eVar11 = s.prop11 = s.Util.getQueryParam('b_cid');
    s.temp = s.pageName.substr(0, s.pageName.lastIndexOf('/'));
    if (!s.prop1) s.prop1 = s.temp.split('/')[1];
    if (!s.prop2) s.prop2 = s.temp.split('/')[2];
    if (!s.prop3) s.prop3 = s.temp.split('/')[3];
    if (!s.prop4) s.prop4 = s.temp.split('/')[4];
    if (!s.prop5) s.prop5 = s.temp.split('/')[5];
    if (!s.prop12) s.prop12 = s.temp.split('/')[6];
    if (!s.prop13) s.prop13 = s.temp.split('/')[7];
    if (!s.prop14) s.prop14 = s.temp.split('/')[8];
    if (!s.prop15) s.prop15 = s.server; //set site domain
    if (!s.eVar6) s.eVar6 = 'D=pageName'; //set pageName to custom conversion report
    if (!s.prop8) s.prop8 = 'D=pageName'; //Event_ID|PageName
    if (s.events == 'prodView' || s.events == 'scAdd' || s.events == 'scCheckout' || s.events == 'scOpen' || s.events == 'scRemove' || s.events == 'scView' || s.events == 'purchase' || s.events == 'scOpen,scAdd') {
        s.prop9 = s.events;
    }
    s.eVar1 = 'D=c1';
    s.eVar2 = 'D=c2';
    s.eVar3 = 'D=c3';
    s.eVar4 = 'D=c4';
    s.eVar5 = 'D=c5';
    s.eVar9 = s.prop9;
    s.eVar12 = 'D=c12';
    s.eVar13 = 'D=c13';
    s.eVar14 = 'D=c14';
    s.eVar15 = 'D=c15'; //set site domain
    if (s.prop6) s.referrer = s.prop6;
    /* Enhanced download tracking */
    if (s.linkType == 'd') {
        if (s.linkURL) {
            s.clearVars();
            s.linkTrackVars = 'prop8,prop10,eVar18,eVar6,eVar10,eVar30,eVar31,eVar49,eVar50,eVar90,events'
            s.linkTrackEvents = 'event18';
            s.events = 'event18';
            s.eVar18 = s.prop8 = s.linkURL;
            s.eVar6 = s.pageName;
        }
    }
    /* entry page to prop */
    if (s.getVisitStart('s_visit') == 1) {
        s.prop27 = s.pageName;
    }
    /* previous page to prop */
    s.prop28 = s.getPreviousValue(s.pageURL, 'gpv_p5', '');
    if (!s.prop28) s.prop28 = 'previous_page_not_available';
    /* time parting */
    var date = new Date();
    s.eVar30 = date.yyyymmdd().toString(); //set date
    s.eVar49 = date.getHours().toString(); //hour of day
    s.eVar50 = date.getMinutes().toString(); //min of day

    /* visitor id service check */
    if (typeof(Visitor) != 'undefined' && typeof(visitor) != 'undefined') {
        s.prop30 = 'VisitorAPI Present';
        s.eVar90 = visitor.getMarketingCloudVisitorID();
    } else {
        s.prop30 = 'VisitorAPI Missing'
    }
    if (customerSegmentWA) s.prop10 = s.eVar10 = customerSegmentWA;
    try { /*set customer id */
        if (DataLayer.cuno) {
            s.eVar31 = DataLayer.cuno;
            visitor.setCustomerIDs({
                "cuno": {
                    "id": DataLayer.cuno,
                    "authState": Visitor.AuthState.AUTHENTICATED
                }
            });
        }
    } catch (customeriderror) {}

    try {
        if (WAGdpr.isEU()) {
            s.abort = true;
        }
    } catch (e) { //For webpage without global_it.js or visitorapi.js (WAGdpr is not defined), WA info will also be fired.
        s.abort = false;
    }

    if (typeof(DataLayer) != 'undefined') {
        if (DataLayer.abort == 'yes') {
            s.abort = true;
        }
    }
    if (WATracker.getOptions().enabled === false) {
        s.abort = true;
    }
}
s.doPlugins = s_doPlugins
/************************** PLUGINS SECTION *************************/
/* get date */
Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1;
    var dd = this.getDate();
    return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join('-');
};
/*
 * Plugin: getPreviousValue v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue = new Function("v", "c", "el", "" +
    "var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el" +
    "){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i" +
    "){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)" +
    ":s.c_w(c,'previous_page_not_available',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?" +
    "s.c_w(c,v,t):s.c_w(c,'previous_page_not_available',t);return r}");

/*
 * Plugin: getVisitStart v2.1 - return 1 on start of visit, else 0
 */
s.getVisitStart = new Function("c", "" +
    "var s=this,n,t=new Date;if(typeof s.callType=='function'&&s.callTyp" +
    "e()=='+')return 0;if(!c)c='s_visit';t.setTime(t.getTime()+18e5);n=s" +
    ".c_r(c)?0:1;if(!s.c_w(c,1,t))s.c_w(c,1,0);if(!s.c_r(c))n=0;return n");
/*
 * Utility: AppMeasurement Compatibility v1.1
 * Define deprecated H-code s properties and methods used by legacy plugins
 */
s.wd = window;
s.fl = new Function("x", "l", "" +
    "return x?(''+x).substring(0,l):x");
s.pt = new Function("x", "d", "f", "a", "" +
    "var s=this,t=x,z=0,y,r,l='length';while(t){y=t.indexOf(d);y=y<0?t[l" +
    "]:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d[l];t=x.subs" +
    "tring(z,x[l]);t=z<x[l]?t:''}return''");
s.rep = new Function("x", "o", "n", "" +
    "var a=new Array,i=0,j;if(x){if(x.split)a=x.split(o);else if(!o)for(" +
    "i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){" +
    "j=x.indexOf(o,i);a[a.length]=x.substring(i,j<0?x.length:j);i=j;if(i" +
    ">=0)i+=o.length}}x='';j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.joi" +
    "n)x=a.join(n);else for(i=1;i<j;i++)x+=n+a[i]}}return x");
s.ape = new Function("x", "" +
    "var s=this,h='0123456789ABCDEF',f='+~!*()\\'',i,c=s.charSet,n,l,e,y" +
    "='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComp" +
    "onent(x);for(i=0;i<f.length;i++){n=f.substring(i,i+1);if(x.indexOf(" +
    "n)>=0)x=s.rep(x,n,'%'+n.charCodeAt(0).toString(16).toUpperCase())}}" +
    "else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.sub" +
    "string(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=" +
    "h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='" +
    "+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+','%2" +
    "B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0)" +
    "{i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.subst" +
    "ring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.subst" +
    "ring(i);i=x.indexOf('%',i)}}}return x");
s.epa = new Function("x", "" +
    "var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Fu" +
    "nction('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unescape" +
    "(x)}return y');return tcf(x)}else return unescape(x)}return y");
s.parseUri = new Function("u", "" +
    "if(u){u=u+'';u=u.indexOf(':')<0&&u.indexOf('//')!=0?(u.indexOf('/')" +
    "==0?'/':'//')+u:u}u=u?u+'':window.location.href;var e,a=document.cr" +
    "eateElement('a'),l=['href','protocol','host','hostname','port','pat" +
    "hname','search','hash'],p,r={href:u,toString:function(){return this" +
    ".href}};a.setAttribute('href',u);for(e=1;e<l.length;e++){p=l[e];r[p" +
    "]=a[p]||''}delete a;p=r.pathname||'';if(p.indexOf('/')!=0)r.pathnam" +
    "e='/'+p;return r");
s.gtfs = new Function("" +
    "var w=window,l=w.location,d=document,u;if(!l.origin)l.origin=l.prot" +
    "ocol+'//'+l.hostname+(l.port?':'+l.port:'');u=l!=w.parent.location?" +
    "d.referrer:d.location;return{location:s.parseUri(u)}");

/*
 * Plugin: getPageName v2.1 - parse URL and return
 */
s.getPageName = new Function("u", "" +
    "var s=this,v=u?u:''+s.wd.location,x=v.indexOf(':'),y=v.indexOf('/'," +
    "x+4),z=v.indexOf('?'),c=s.pathConcatDelim,e=s.pathExcludeDelim,g=s." +
    "queryVarsList,d=s.siteID,n=d?d:'',q=z<0?'':v.substring(z+1),p=v.sub" +
    "string(y+1,q?z:v.length);z=p.indexOf('#');p=z<0?p:s.fl(p,z);x=e?p.i" +
    "ndexOf(e):-1;p=x<0?p:s.fl(p,x);p+=!p||p.charAt(p.length-1)=='/'?s.d" +
    "efaultPage:'';y=c?c:'/';while(p){x=p.indexOf('/');x=x<0?p.length:x;" +
    "z=s.fl(p,x);if(!s.pt(s.pathExcludeList,',','p_c',z))n+=n?y+z:z;p=p." +
    "substring(x+1)}y=c?c:'?';while(g){x=g.indexOf(',');x=x<0?g.length:x" +
    ";z=s.fl(g,x);z=s.pt(q,'&','p_c',z);if(z){n+=n?y+z:z;y=c?c:'&'}g=g.s" +
    "ubstring(x+1)}return n");
/*
 Plugin: getPageNameFrame Parse parent frame url
 */
s.getPageNameFrame = new Function("u", "" +
    "var s=this,v=parent.document.location.href,x=v.indexOf(':'),y=v.indexOf('/'," +
    "x+4),z=v.indexOf('?'),c=s.pathConcatDelim,e=s.pathExcludeDelim,g=s." +
    "queryVarsList,d=s.siteID,n=d?d:'',q=z<0?'':v.substring(z+1),p=v.sub" +
    "string(y+1,q?z:v.length);z=p.indexOf('#');p=z<0?p:s.fl(p,z);x=e?p.i" +
    "ndexOf(e):-1;p=x<0?p:s.fl(p,x);p+=!p||p.charAt(p.length-1)=='/'?s.d" +
    "efaultPage:'';y=c?c:'/';while(p){x=p.indexOf('/');x=x<0?p.length:x;" +
    "z=s.fl(p,x);if(!s.pt(s.pathExcludeList,',','p_c',z))n+=n?y+z:z;p=p." +
    "substring(x+1)}y=c?c:'?';while(g){x=g.indexOf(',');x=x<0?g.length:x" +
    ";z=s.fl(g,x);z=s.pt(q,'&','p_c',z);if(z){n+=n?y+z:z;y=c?c:'&'}g=g.s" +
    "ubstring(x+1)}return n");
/*
 * Utility Function: p_gh
 */
s.p_gh = new Function("" +
    "var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot(" +
    "o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){" +
    "o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s." +
    "ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");

/*
 * Utility Function: p_c
 */
s.p_c = new Function("v", "c", "" +
    "var x=v.indexOf('=');return c.toLowerCase()==v.substring(0,x<0?v.le" +
    "ngth:x).toLowerCase()?v:0");
/*
 * Plugin Utility: apl v1.1
 */
s.apl = new Function("l", "v", "d", "u", "" +
    "var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a." +
    "length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas" +
    "e()));}}if(!m)l=l?l+d+v:v;return l");
/*
 * Plugin Utility: Replace v1.0
 */
s.repl = new Function("x", "o", "n", "" +
    "var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x." +
    "substring(i+o.length);i=x.indexOf(o,i+l)}return x");
/*
 * Utility Function: split v1.5 (JS 1.0 compatible)
 */
s.split = new Function("l", "d", "" +
    "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x" +
    "++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
/*
 * Utility Function: s.join: 1.0 - Joins an array into a string
 */
s.join = new Function("v", "p", "" +
    "var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back" +
    ":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0" +
    ";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el" +
    "se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/* Tracking Servers */
s.visitorNamespace = "hkjcweb"
s.trackingServer = "hkjcweb.sc.omtrdc.net"
s.trackingServerSecure = "hkjcweb.sc.omtrdc.net";
/*
 Start ActivityMap Module
*/
function AppMeasurement_Module_ActivityMap(f) {
    function g(a, d) {
        var b, c, n;
        if (a && d && (b = e.c[d] || (e.c[d] = d.split(","))))
            for (n = 0; n < b.length && (c = b[n++]);)
                if (-1 < a.indexOf(c)) return null;
        p = 1;
        return a
    }

    function q(a, d, b, c, e) {
        var g, h;
        if (a.dataset && (h = a.dataset[d])) g = h;
        else if (a.getAttribute)
            if (h = a.getAttribute("data-" + b)) g = h;
            else if (h = a.getAttribute(b)) g = h;
        if (!g && f.useForcedLinkTracking && e && (g = "", d = a.onclick ? "" + a.onclick : "")) {
            b = d.indexOf(c);
            var l, k;
            if (0 <= b) {
                for (b += 10; b < d.length && 0 <= "= \t\r\n".indexOf(d.charAt(b));) b++;
                if (b < d.length) {
                    h = b;
                    for (l = k = 0; h < d.length && (";" != d.charAt(h) || l);) l ? d.charAt(h) != l || k ? k = "\\" == d.charAt(h) ? !k : 0 : l = 0 : (l = d.charAt(h), '"' != l && "'" != l && (l = 0)), h++;
                    if (d = d.substring(b, h)) a.e = new Function("s", "var e;try{s.w." + c + "=" + d + "}catch(e){}"), a.e(f)
                }
            }
        }
        return g || e && f.w[c]
    }

    function r(a, d, b) {
        var c;
        return (c = e[d](a, b)) && (p ? (p = 0, c) : g(k(c), e[d + "Exclusions"]))
    }

    function s(a, d, b) {
        var c;
        if (a && !(1 === (c = a.nodeType) && (c = a.nodeName) && (c = c.toUpperCase()) && t[c]) && (1 === a.nodeType && (c = a.nodeValue) && (d[d.length] = c), b.a ||
                b.t || b.s || !a.getAttribute || ((c = a.getAttribute("alt")) ? b.a = c : (c = a.getAttribute("title")) ? b.t = c : "IMG" == ("" + a.nodeName).toUpperCase() && (c = a.getAttribute("src") || a.src) && (b.s = c)), (c = a.childNodes) && c.length))
            for (a = 0; a < c.length; a++) s(c[a], d, b)
    }

    function k(a) {
        if (null == a || void 0 == a) return a;
        try {
            return a.replace(RegExp("^[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+", "mg"), "").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+$",
                "mg"), "").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]{1,}", "mg"), " ").substring(0, 254)
        } catch (d) {}
    }
    var e = this;
    e.s = f;
    var m = window;
    m.s_c_in || (m.s_c_il = [], m.s_c_in = 0);
    e._il = m.s_c_il;
    e._in = m.s_c_in;
    e._il[e._in] = e;
    m.s_c_in++;
    e._c = "s_m";
    e.c = {};
    var p = 0,
        t = {
            SCRIPT: 1,
            STYLE: 1,
            LINK: 1,
            CANVAS: 1
        };
    e._g = function() {
        var a, d, b, c = f.contextData,
            e = f.linkObject;
        (a = f.pageName || f.pageURL) && (d = r(e, "link", f.linkName)) && (b = r(e, "region")) && (c["a.activitymap.page"] = a.substring(0,
            255), c["a.activitymap.link"] = 128 < d.length ? d.substring(0, 128) : d, c["a.activitymap.region"] = 127 < b.length ? b.substring(0, 127) : b, c["a.activitymap.pageIDType"] = f.pageName ? 1 : 0)
    };
    e.link = function(a, d) {
        var b;
        if (d) b = g(k(d), e.linkExclusions);
        else if ((b = a) && !(b = q(a, "sObjectId", "s-object-id", "s_objectID", 1))) {
            var c, f;
            (f = g(k(a.innerText || a.textContent), e.linkExclusions)) || (s(a, c = [], b = {
                a: void 0,
                t: void 0,
                s: void 0
            }), (f = g(k(c.join("")))) || (f = g(k(b.a ? b.a : b.t ? b.t : b.s ? b.s : void 0))) || !(c = (c = a.tagName) && c.toUpperCase ? c.toUpperCase() :
                "") || ("INPUT" == c || "SUBMIT" == c && a.value ? f = g(k(a.value)) : "IMAGE" == c && a.src && (f = g(k(a.src)))));
            b = f
        }
        return b
    };
    e.region = function(a) {
        for (var d, b = e.regionIDAttribute || "id"; a && (a = a.parentNode);) {
            if (d = q(a, b, b, b)) return d;
            if ("BODY" == a.nodeName) return "BODY"
        }
    }
}
/* End ActivityMap Module */
/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 2.8.2
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/
function AppMeasurement(r) {
    var a = this;
    a.version = "2.8.2";
    var k = window;
    k.s_c_in || (k.s_c_il = [], k.s_c_in = 0);
    a._il = k.s_c_il;
    a._in = k.s_c_in;
    a._il[a._in] = a;
    k.s_c_in++;
    a._c = "s_c";
    var p = k.AppMeasurement.Xb;
    p || (p = null);
    var n = k,
        m, s;
    try {
        for (m = n.parent, s = n.location; m && m.location && s && "" + m.location != "" + s && n.location && "" + m.location != "" + n.location && m.location.host == s.host;) n = m, m = n.parent
    } catch (u) {}
    a.F = function(a) {
        try {
            console.log(a)
        } catch (b) {}
    };
    a.Oa = function(a) {
        return "" + parseInt(a) == "" + a
    };
    a.replace = function(a, b, d) {
        return !a ||
            0 > a.indexOf(b) ? a : a.split(b).join(d)
    };
    a.escape = function(c) {
        var b, d;
        if (!c) return c;
        c = encodeURIComponent(c);
        for (b = 0; 7 > b; b++) d = "+~!*()'".substring(b, b + 1), 0 <= c.indexOf(d) && (c = a.replace(c, d, "%" + d.charCodeAt(0).toString(16).toUpperCase()));
        return c
    };
    a.unescape = function(c) {
        if (!c) return c;
        c = 0 <= c.indexOf("+") ? a.replace(c, "+", " ") : c;
        try {
            return decodeURIComponent(c)
        } catch (b) {}
        return unescape(c)
    };
    a.Fb = function() {
        var c = k.location.hostname,
            b = a.fpCookieDomainPeriods,
            d;
        b || (b = a.cookieDomainPeriods);
        if (c && !a.Ga && !/^[0-9.]+$/.test(c) &&
            (b = b ? parseInt(b) : 2, b = 2 < b ? b : 2, d = c.lastIndexOf("."), 0 <= d)) {
            for (; 0 <= d && 1 < b;) d = c.lastIndexOf(".", d - 1), b--;
            a.Ga = 0 < d ? c.substring(d) : c
        }
        return a.Ga
    };
    a.c_r = a.cookieRead = function(c) {
        c = a.escape(c);
        var b = " " + a.d.cookie,
            d = b.indexOf(" " + c + "="),
            f = 0 > d ? d : b.indexOf(";", d);
        c = 0 > d ? "" : a.unescape(b.substring(d + 2 + c.length, 0 > f ? b.length : f));
        return "[[B]]" != c ? c : ""
    };
    a.c_w = a.cookieWrite = function(c, b, d) {
        var f = a.Fb(),
            e = a.cookieLifetime,
            g;
        b = "" + b;
        e = e ? ("" + e).toUpperCase() : "";
        d && "SESSION" != e && "NONE" != e && ((g = "" != b ? parseInt(e ? e : 0) : -60) ?
            (d = new Date, d.setTime(d.getTime() + 1E3 * g)) : 1 == d && (d = new Date, g = d.getYear(), d.setYear(g + 5 + (1900 > g ? 1900 : 0))));
        return c && "NONE" != e ? (a.d.cookie = a.escape(c) + "=" + a.escape("" != b ? b : "[[B]]") + "; path=/;" + (d && "SESSION" != e ? " expires=" + d.toUTCString() + ";" : "") + (f ? " domain=" + f + ";" : ""), a.cookieRead(c) == b) : 0
    };
    a.Cb = function() {
        var c = a.Util.getIeVersion();
        "number" === typeof c && 10 > c && (a.unsupportedBrowser = !0, a.rb(a, function() {}))
    };
    a.rb = function(a, b) {
        for (var d in a) a.hasOwnProperty(d) && "function" === typeof a[d] && (a[d] = b)
    };
    a.L = [];
    a.ja = function(c, b, d) {
        if (a.Ha) return 0;
        a.maxDelay || (a.maxDelay = 250);
        var f = 0,
            e = (new Date).getTime() + a.maxDelay,
            g = a.d.visibilityState,
            h = ["webkitvisibilitychange", "visibilitychange"];
        g || (g = a.d.webkitVisibilityState);
        if (g && "prerender" == g) {
            if (!a.ka)
                for (a.ka = 1, d = 0; d < h.length; d++) a.d.addEventListener(h[d], function() {
                    var c = a.d.visibilityState;
                    c || (c = a.d.webkitVisibilityState);
                    "visible" == c && (a.ka = 0, a.delayReady())
                });
            f = 1;
            e = 0
        } else d || a.p("_d") && (f = 1);
        f && (a.L.push({
            m: c,
            a: b,
            t: e
        }), a.ka || setTimeout(a.delayReady,
            a.maxDelay));
        return f
    };
    a.delayReady = function() {
        var c = (new Date).getTime(),
            b = 0,
            d;
        for (a.p("_d") ? b = 1 : a.za(); 0 < a.L.length;) {
            d = a.L.shift();
            if (b && !d.t && d.t > c) {
                a.L.unshift(d);
                setTimeout(a.delayReady, parseInt(a.maxDelay / 2));
                break
            }
            a.Ha = 1;
            a[d.m].apply(a, d.a);
            a.Ha = 0
        }
    };
    a.setAccount = a.sa = function(c) {
        var b, d;
        if (!a.ja("setAccount", arguments))
            if (a.account = c, a.allAccounts)
                for (b = a.allAccounts.concat(c.split(",")), a.allAccounts = [], b.sort(), d = 0; d < b.length; d++) 0 != d && b[d - 1] == b[d] || a.allAccounts.push(b[d]);
            else a.allAccounts =
                c.split(",")
    };
    a.foreachVar = function(c, b) {
        var d, f, e, g, h = "";
        e = f = "";
        if (a.lightProfileID) d = a.P, (h = a.lightTrackVars) && (h = "," + h + "," + a.oa.join(",") + ",");
        else {
            d = a.g;
            if (a.pe || a.linkType) h = a.linkTrackVars, f = a.linkTrackEvents, a.pe && (e = a.pe.substring(0, 1).toUpperCase() + a.pe.substring(1), a[e] && (h = a[e].Vb, f = a[e].Ub));
            h && (h = "," + h + "," + a.H.join(",") + ",");
            f && h && (h += ",events,")
        }
        b && (b = "," + b + ",");
        for (f = 0; f < d.length; f++) e = d[f], (g = a[e]) && (!h || 0 <= h.indexOf("," + e + ",")) && (!b || 0 <= b.indexOf("," + e + ",")) && c(e, g)
    };
    a.r = function(c,
        b, d, f, e) {
        var g = "",
            h, l, k, q, m = 0;
        "contextData" == c && (c = "c");
        if (b) {
            for (h in b)
                if (!(Object.prototype[h] || e && h.substring(0, e.length) != e) && b[h] && (!d || 0 <= d.indexOf("," + (f ? f + "." : "") + h + ","))) {
                    k = !1;
                    if (m)
                        for (l = 0; l < m.length; l++) h.substring(0, m[l].length) == m[l] && (k = !0);
                    if (!k && ("" == g && (g += "&" + c + "."), l = b[h], e && (h = h.substring(e.length)), 0 < h.length))
                        if (k = h.indexOf("."), 0 < k) l = h.substring(0, k), k = (e ? e : "") + l + ".", m || (m = []), m.push(k), g += a.r(l, b, d, f, k);
                        else if ("boolean" == typeof l && (l = l ? "true" : "false"), l) {
                        if ("retrieveLightData" ==
                            f && 0 > e.indexOf(".contextData.")) switch (k = h.substring(0, 4), q = h.substring(4), h) {
                            case "transactionID":
                                h = "xact";
                                break;
                            case "channel":
                                h = "ch";
                                break;
                            case "campaign":
                                h = "v0";
                                break;
                            default:
                                a.Oa(q) && ("prop" == k ? h = "c" + q : "eVar" == k ? h = "v" + q : "list" == k ? h = "l" + q : "hier" == k && (h = "h" + q, l = l.substring(0, 255)))
                        }
                        g += "&" + a.escape(h) + "=" + a.escape(l)
                    }
                }
            "" != g && (g += "&." + c)
        }
        return g
    };
    a.usePostbacks = 0;
    a.Ib = function() {
        var c = "",
            b, d, f, e, g, h, l, k, q = "",
            m = "",
            n = e = "";
        if (a.lightProfileID) b = a.P, (q = a.lightTrackVars) && (q = "," + q + "," + a.oa.join(",") +
            ",");
        else {
            b = a.g;
            if (a.pe || a.linkType) q = a.linkTrackVars, m = a.linkTrackEvents, a.pe && (e = a.pe.substring(0, 1).toUpperCase() + a.pe.substring(1), a[e] && (q = a[e].Vb, m = a[e].Ub));
            q && (q = "," + q + "," + a.H.join(",") + ",");
            m && (m = "," + m + ",", q && (q += ",events,"));
            a.events2 && (n += ("" != n ? "," : "") + a.events2)
        }
        if (a.visitor && a.visitor.getCustomerIDs) {
            e = p;
            if (g = a.visitor.getCustomerIDs())
                for (d in g) Object.prototype[d] || (f = g[d], "object" == typeof f && (e || (e = {}), f.id && (e[d + ".id"] = f.id), f.authState && (e[d + ".as"] = f.authState)));
            e && (c += a.r("cid",
                e))
        }
        a.AudienceManagement && a.AudienceManagement.isReady() && (c += a.r("d", a.AudienceManagement.getEventCallConfigParams()));
        for (d = 0; d < b.length; d++) {
            e = b[d];
            g = a[e];
            f = e.substring(0, 4);
            h = e.substring(4);
            g || ("events" == e && n ? (g = n, n = "") : "marketingCloudOrgID" == e && a.visitor && (g = a.visitor.marketingCloudOrgID));
            if (g && (!q || 0 <= q.indexOf("," + e + ","))) {
                switch (e) {
                    case "customerPerspective":
                        e = "cp";
                        break;
                    case "marketingCloudOrgID":
                        e = "mcorgid";
                        break;
                    case "supplementalDataID":
                        e = "sdid";
                        break;
                    case "timestamp":
                        e = "ts";
                        break;
                    case "dynamicVariablePrefix":
                        e =
                            "D";
                        break;
                    case "visitorID":
                        e = "vid";
                        break;
                    case "marketingCloudVisitorID":
                        e = "mid";
                        break;
                    case "analyticsVisitorID":
                        e = "aid";
                        break;
                    case "audienceManagerLocationHint":
                        e = "aamlh";
                        break;
                    case "audienceManagerBlob":
                        e = "aamb";
                        break;
                    case "authState":
                        e = "as";
                        break;
                    case "pageURL":
                        e = "g";
                        255 < g.length && (a.pageURLRest = g.substring(255), g = g.substring(0, 255));
                        break;
                    case "pageURLRest":
                        e = "-g";
                        break;
                    case "referrer":
                        e = "r";
                        break;
                    case "vmk":
                    case "visitorMigrationKey":
                        e = "vmt";
                        break;
                    case "visitorMigrationServer":
                        e = "vmf";
                        a.ssl &&
                            a.visitorMigrationServerSecure && (g = "");
                        break;
                    case "visitorMigrationServerSecure":
                        e = "vmf";
                        !a.ssl && a.visitorMigrationServer && (g = "");
                        break;
                    case "charSet":
                        e = "ce";
                        break;
                    case "visitorNamespace":
                        e = "ns";
                        break;
                    case "cookieDomainPeriods":
                        e = "cdp";
                        break;
                    case "cookieLifetime":
                        e = "cl";
                        break;
                    case "variableProvider":
                        e = "vvp";
                        break;
                    case "currencyCode":
                        e = "cc";
                        break;
                    case "channel":
                        e = "ch";
                        break;
                    case "transactionID":
                        e = "xact";
                        break;
                    case "campaign":
                        e = "v0";
                        break;
                    case "latitude":
                        e = "lat";
                        break;
                    case "longitude":
                        e = "lon";
                        break;
                    case "resolution":
                        e = "s";
                        break;
                    case "colorDepth":
                        e = "c";
                        break;
                    case "javascriptVersion":
                        e = "j";
                        break;
                    case "javaEnabled":
                        e = "v";
                        break;
                    case "cookiesEnabled":
                        e = "k";
                        break;
                    case "browserWidth":
                        e = "bw";
                        break;
                    case "browserHeight":
                        e = "bh";
                        break;
                    case "connectionType":
                        e = "ct";
                        break;
                    case "homepage":
                        e = "hp";
                        break;
                    case "events":
                        n && (g += ("" != g ? "," : "") + n);
                        if (m)
                            for (h = g.split(","), g = "", f = 0; f < h.length; f++) l = h[f], k = l.indexOf("="), 0 <= k && (l = l.substring(0, k)), k = l.indexOf(":"), 0 <= k && (l = l.substring(0, k)), 0 <= m.indexOf("," + l + ",") && (g +=
                                (g ? "," : "") + h[f]);
                        break;
                    case "events2":
                        g = "";
                        break;
                    case "contextData":
                        c += a.r("c", a[e], q, e);
                        g = "";
                        break;
                    case "lightProfileID":
                        e = "mtp";
                        break;
                    case "lightStoreForSeconds":
                        e = "mtss";
                        a.lightProfileID || (g = "");
                        break;
                    case "lightIncrementBy":
                        e = "mti";
                        a.lightProfileID || (g = "");
                        break;
                    case "retrieveLightProfiles":
                        e = "mtsr";
                        break;
                    case "deleteLightProfiles":
                        e = "mtsd";
                        break;
                    case "retrieveLightData":
                        a.retrieveLightProfiles && (c += a.r("mts", a[e], q, e));
                        g = "";
                        break;
                    default:
                        a.Oa(h) && ("prop" == f ? e = "c" + h : "eVar" == f ? e = "v" + h : "list" ==
                            f ? e = "l" + h : "hier" == f && (e = "h" + h, g = g.substring(0, 255)))
                }
                g && (c += "&" + e + "=" + ("pev" != e.substring(0, 3) ? a.escape(g) : g))
            }
            "pev3" == e && a.e && (c += a.e)
        }
        a.na && (c += "&lrt=" + a.na, a.na = null);
        return c
    };
    a.D = function(a) {
        var b = a.tagName;
        if ("undefined" != "" + a.$b || "undefined" != "" + a.Qb && "HTML" != ("" + a.Qb).toUpperCase()) return "";
        b = b && b.toUpperCase ? b.toUpperCase() : "";
        "SHAPE" == b && (b = "");
        b && (("INPUT" == b || "BUTTON" == b) && a.type && a.type.toUpperCase ? b = a.type.toUpperCase() : !b && a.href && (b = "A"));
        return b
    };
    a.Ka = function(a) {
        var b = k.location,
            d = a.href ? a.href : "",
            f, e, g;
        f = d.indexOf(":");
        e = d.indexOf("?");
        g = d.indexOf("/");
        d && (0 > f || 0 <= e && f > e || 0 <= g && f > g) && (e = a.protocol && 1 < a.protocol.length ? a.protocol : b.protocol ? b.protocol : "", f = b.pathname.lastIndexOf("/"), d = (e ? e + "//" : "") + (a.host ? a.host : b.host ? b.host : "") + ("/" != d.substring(0, 1) ? b.pathname.substring(0, 0 > f ? 0 : f) + "/" : "") + d);
        return d
    };
    a.M = function(c) {
        var b = a.D(c),
            d, f, e = "",
            g = 0;
        return b && (d = c.protocol, f = c.onclick, !c.href || "A" != b && "AREA" != b || f && d && !(0 > d.toLowerCase().indexOf("javascript")) ? f ? (e = a.replace(a.replace(a.replace(a.replace("" +
            f, "\r", ""), "\n", ""), "\t", ""), " ", ""), g = 2) : "INPUT" == b || "SUBMIT" == b ? (c.value ? e = c.value : c.innerText ? e = c.innerText : c.textContent && (e = c.textContent), g = 3) : "IMAGE" == b && c.src && (e = c.src) : e = a.Ka(c), e) ? {
            id: e.substring(0, 100),
            type: g
        } : 0
    };
    a.Yb = function(c) {
        for (var b = a.D(c), d = a.M(c); c && !d && "BODY" != b;)
            if (c = c.parentElement ? c.parentElement : c.parentNode) b = a.D(c), d = a.M(c);
        d && "BODY" != b || (c = 0);
        c && (b = c.onclick ? "" + c.onclick : "", 0 <= b.indexOf(".tl(") || 0 <= b.indexOf(".trackLink(")) && (c = 0);
        return c
    };
    a.Pb = function() {
        var c, b, d = a.linkObject,
            f = a.linkType,
            e = a.linkURL,
            g, h;
        a.pa = 1;
        d || (a.pa = 0, d = a.clickObject);
        if (d) {
            c = a.D(d);
            for (b = a.M(d); d && !b && "BODY" != c;)
                if (d = d.parentElement ? d.parentElement : d.parentNode) c = a.D(d), b = a.M(d);
            b && "BODY" != c || (d = 0);
            if (d && !a.linkObject) {
                var l = d.onclick ? "" + d.onclick : "";
                if (0 <= l.indexOf(".tl(") || 0 <= l.indexOf(".trackLink(")) d = 0
            }
        } else a.pa = 1;
        !e && d && (e = a.Ka(d));
        e && !a.linkLeaveQueryString && (g = e.indexOf("?"), 0 <= g && (e = e.substring(0, g)));
        if (!f && e) {
            var m = 0,
                q = 0,
                n;
            if (a.trackDownloadLinks && a.linkDownloadFileTypes)
                for (l = e.toLowerCase(),
                    g = l.indexOf("?"), h = l.indexOf("#"), 0 <= g ? 0 <= h && h < g && (g = h) : g = h, 0 <= g && (l = l.substring(0, g)), g = a.linkDownloadFileTypes.toLowerCase().split(","), h = 0; h < g.length; h++)(n = g[h]) && l.substring(l.length - (n.length + 1)) == "." + n && (f = "d");
            if (a.trackExternalLinks && !f && (l = e.toLowerCase(), a.Na(l) && (a.linkInternalFilters || (a.linkInternalFilters = k.location.hostname), g = 0, a.linkExternalFilters ? (g = a.linkExternalFilters.toLowerCase().split(","), m = 1) : a.linkInternalFilters && (g = a.linkInternalFilters.toLowerCase().split(",")), g))) {
                for (h =
                    0; h < g.length; h++) n = g[h], 0 <= l.indexOf(n) && (q = 1);
                q ? m && (f = "e") : m || (f = "e")
            }
        }
        a.linkObject = d;
        a.linkURL = e;
        a.linkType = f;
        if (a.trackClickMap || a.trackInlineStats) a.e = "", d && (f = a.pageName, e = 1, d = d.sourceIndex, f || (f = a.pageURL, e = 0), k.s_objectID && (b.id = k.s_objectID, d = b.type = 1), f && b && b.id && c && (a.e = "&pid=" + a.escape(f.substring(0, 255)) + (e ? "&pidt=" + e : "") + "&oid=" + a.escape(b.id.substring(0, 100)) + (b.type ? "&oidt=" + b.type : "") + "&ot=" + c + (d ? "&oi=" + d : "")))
    };
    a.Jb = function() {
        var c = a.pa,
            b = a.linkType,
            d = a.linkURL,
            f = a.linkName;
        b && (d ||
            f) && (b = b.toLowerCase(), "d" != b && "e" != b && (b = "o"), a.pe = "lnk_" + b, a.pev1 = d ? a.escape(d) : "", a.pev2 = f ? a.escape(f) : "", c = 1);
        a.abort && (c = 0);
        if (a.trackClickMap || a.trackInlineStats || a.ActivityMap) {
            var b = {},
                d = 0,
                e = a.cookieRead("s_sq"),
                g = e ? e.split("&") : 0,
                h, l, k, e = 0;
            if (g)
                for (h = 0; h < g.length; h++) l = g[h].split("="), f = a.unescape(l[0]).split(","), l = a.unescape(l[1]), b[l] = f;
            f = a.account.split(",");
            h = {};
            for (k in a.contextData) k && !Object.prototype[k] && "a.activitymap." == k.substring(0, 14) && (h[k] = a.contextData[k], a.contextData[k] =
                "");
            a.e = a.r("c", h) + (a.e ? a.e : "");
            if (c || a.e) {
                c && !a.e && (e = 1);
                for (l in b)
                    if (!Object.prototype[l])
                        for (k = 0; k < f.length; k++)
                            for (e && (g = b[l].join(","), g == a.account && (a.e += ("&" != l.charAt(0) ? "&" : "") + l, b[l] = [], d = 1)), h = 0; h < b[l].length; h++) g = b[l][h], g == f[k] && (e && (a.e += "&u=" + a.escape(g) + ("&" != l.charAt(0) ? "&" : "") + l + "&u=0"), b[l].splice(h, 1), d = 1);
                c || (d = 1);
                if (d) {
                    e = "";
                    h = 2;
                    !c && a.e && (e = a.escape(f.join(",")) + "=" + a.escape(a.e), h = 1);
                    for (l in b) !Object.prototype[l] && 0 < h && 0 < b[l].length && (e += (e ? "&" : "") + a.escape(b[l].join(",")) +
                        "=" + a.escape(l), h--);
                    a.cookieWrite("s_sq", e)
                }
            }
        }
        return c
    };
    a.Kb = function() {
        if (!a.Tb) {
            var c = new Date,
                b = n.location,
                d, f, e = f = d = "",
                g = "",
                h = "",
                l = "1.2",
                k = a.cookieWrite("s_cc", "true", 0) ? "Y" : "N",
                m = "",
                p = "";
            if (c.setUTCDate && (l = "1.3", (0).toPrecision && (l = "1.5", c = [], c.forEach))) {
                l = "1.6";
                f = 0;
                d = {};
                try {
                    f = new Iterator(d), f.next && (l = "1.7", c.reduce && (l = "1.8", l.trim && (l = "1.8.1", Date.parse && (l = "1.8.2", Object.create && (l = "1.8.5")))))
                } catch (r) {}
            }
            d = screen.width + "x" + screen.height;
            e = navigator.javaEnabled() ? "Y" : "N";
            f = screen.pixelDepth ?
                screen.pixelDepth : screen.colorDepth;
            g = a.w.innerWidth ? a.w.innerWidth : a.d.documentElement.offsetWidth;
            h = a.w.innerHeight ? a.w.innerHeight : a.d.documentElement.offsetHeight;
            try {
                a.b.addBehavior("#default#homePage"), m = a.b.Zb(b) ? "Y" : "N"
            } catch (s) {}
            try {
                a.b.addBehavior("#default#clientCaps"), p = a.b.connectionType
            } catch (t) {}
            a.resolution = d;
            a.colorDepth = f;
            a.javascriptVersion = l;
            a.javaEnabled = e;
            a.cookiesEnabled = k;
            a.browserWidth = g;
            a.browserHeight = h;
            a.connectionType = p;
            a.homepage = m;
            a.Tb = 1
        }
    };
    a.Q = {};
    a.loadModule = function(c,
        b) {
        var d = a.Q[c];
        if (!d) {
            d = k["AppMeasurement_Module_" + c] ? new k["AppMeasurement_Module_" + c](a) : {};
            a.Q[c] = a[c] = d;
            d.kb = function() {
                return d.qb
            };
            d.sb = function(b) {
                if (d.qb = b) a[c + "_onLoad"] = b, a.ja(c + "_onLoad", [a, d], 1) || b(a, d)
            };
            try {
                Object.defineProperty ? Object.defineProperty(d, "onLoad", {
                    get: d.kb,
                    set: d.sb
                }) : d._olc = 1
            } catch (f) {
                d._olc = 1
            }
        }
        b && (a[c + "_onLoad"] = b, a.ja(c + "_onLoad", [a, d], 1) || b(a, d))
    };
    a.p = function(c) {
        var b, d;
        for (b in a.Q)
            if (!Object.prototype[b] && (d = a.Q[b]) && (d._olc && d.onLoad && (d._olc = 0, d.onLoad(a, d)), d[c] &&
                    d[c]())) return 1;
        return 0
    };
    a.Mb = function() {
        var c = Math.floor(1E13 * Math.random()),
            b = a.visitorSampling,
            d = a.visitorSamplingGroup,
            d = "s_vsn_" + (a.visitorNamespace ? a.visitorNamespace : a.account) + (d ? "_" + d : ""),
            f = a.cookieRead(d);
        if (b) {
            b *= 100;
            f && (f = parseInt(f));
            if (!f) {
                if (!a.cookieWrite(d, c)) return 0;
                f = c
            }
            if (f % 1E4 > b) return 0
        }
        return 1
    };
    a.R = function(c, b) {
        var d, f, e, g, h, l;
        for (d = 0; 2 > d; d++)
            for (f = 0 < d ? a.Ca : a.g, e = 0; e < f.length; e++)
                if (g = f[e], (h = c[g]) || c["!" + g]) {
                    if (!b && ("contextData" == g || "retrieveLightData" == g) && a[g])
                        for (l in a[g]) h[l] ||
                            (h[l] = a[g][l]);
                    a[g] = h
                }
    };
    a.Ya = function(c, b) {
        var d, f, e, g;
        for (d = 0; 2 > d; d++)
            for (f = 0 < d ? a.Ca : a.g, e = 0; e < f.length; e++) g = f[e], c[g] = a[g], b || c[g] || (c["!" + g] = 1)
    };
    a.Eb = function(a) {
        var b, d, f, e, g, h = 0,
            l, k = "",
            m = "";
        if (a && 255 < a.length && (b = "" + a, d = b.indexOf("?"), 0 < d && (l = b.substring(d + 1), b = b.substring(0, d), e = b.toLowerCase(), f = 0, "http://" == e.substring(0, 7) ? f += 7 : "https://" == e.substring(0, 8) && (f += 8), d = e.indexOf("/", f), 0 < d && (e = e.substring(f, d), g = b.substring(d), b = b.substring(0, d), 0 <= e.indexOf("google") ? h = ",q,ie,start,search_key,word,kw,cd," :
                0 <= e.indexOf("yahoo.co") && (h = ",p,ei,"), h && l)))) {
            if ((a = l.split("&")) && 1 < a.length) {
                for (f = 0; f < a.length; f++) e = a[f], d = e.indexOf("="), 0 < d && 0 <= h.indexOf("," + e.substring(0, d) + ",") ? k += (k ? "&" : "") + e : m += (m ? "&" : "") + e;
                k && m ? l = k + "&" + m : m = ""
            }
            d = 253 - (l.length - m.length) - b.length;
            a = b + (0 < d ? g.substring(0, d) : "") + "?" + l
        }
        return a
    };
    a.eb = function(c) {
        var b = a.d.visibilityState,
            d = ["webkitvisibilitychange", "visibilitychange"];
        b || (b = a.d.webkitVisibilityState);
        if (b && "prerender" == b) {
            if (c)
                for (b = 0; b < d.length; b++) a.d.addEventListener(d[b],
                    function() {
                        var b = a.d.visibilityState;
                        b || (b = a.d.webkitVisibilityState);
                        "visible" == b && c()
                    });
            return !1
        }
        return !0
    };
    a.fa = !1;
    a.J = !1;
    a.ub = function() {
        a.J = !0;
        a.j()
    };
    a.da = !1;
    a.V = !1;
    a.pb = function(c) {
        a.marketingCloudVisitorID = c;
        a.V = !0;
        a.j()
    };
    a.ga = !1;
    a.W = !1;
    a.vb = function(c) {
        a.visitorOptedOut = c;
        a.W = !0;
        a.j()
    };
    a.aa = !1;
    a.S = !1;
    a.$a = function(c) {
        a.analyticsVisitorID = c;
        a.S = !0;
        a.j()
    };
    a.ca = !1;
    a.U = !1;
    a.bb = function(c) {
        a.audienceManagerLocationHint = c;
        a.U = !0;
        a.j()
    };
    a.ba = !1;
    a.T = !1;
    a.ab = function(c) {
        a.audienceManagerBlob = c;
        a.T = !0;
        a.j()
    };
    a.cb = function(c) {
        a.maxDelay || (a.maxDelay = 250);
        return a.p("_d") ? (c && setTimeout(function() {
            c()
        }, a.maxDelay), !1) : !0
    };
    a.ea = !1;
    a.I = !1;
    a.za = function() {
        a.I = !0;
        a.j()
    };
    a.isReadyToTrack = function() {
        var c = !0,
            b = a.visitor,
            d, f, e;
        a.fa || a.J || (a.eb(a.ub) ? a.J = !0 : a.fa = !0);
        if (a.fa && !a.J) return !1;
        b && b.isAllowed() && (a.da || a.marketingCloudVisitorID || !b.getMarketingCloudVisitorID || (a.da = !0, a.marketingCloudVisitorID = b.getMarketingCloudVisitorID([a, a.pb]), a.marketingCloudVisitorID && (a.V = !0)), a.ga || a.visitorOptedOut ||
            !b.isOptedOut || (a.ga = !0, a.visitorOptedOut = b.isOptedOut([a, a.vb]), a.visitorOptedOut != p && (a.W = !0)), a.aa || a.analyticsVisitorID || !b.getAnalyticsVisitorID || (a.aa = !0, a.analyticsVisitorID = b.getAnalyticsVisitorID([a, a.$a]), a.analyticsVisitorID && (a.S = !0)), a.ca || a.audienceManagerLocationHint || !b.getAudienceManagerLocationHint || (a.ca = !0, a.audienceManagerLocationHint = b.getAudienceManagerLocationHint([a, a.bb]), a.audienceManagerLocationHint && (a.U = !0)), a.ba || a.audienceManagerBlob || !b.getAudienceManagerBlob || (a.ba = !0, a.audienceManagerBlob = b.getAudienceManagerBlob([a, a.ab]), a.audienceManagerBlob && (a.T = !0)), c = a.da && !a.V && !a.marketingCloudVisitorID, b = a.aa && !a.S && !a.analyticsVisitorID, d = a.ca && !a.U && !a.audienceManagerLocationHint, f = a.ba && !a.T && !a.audienceManagerBlob, e = a.ga && !a.W, c = c || b || d || f || e ? !1 : !0);
        a.ea || a.I || (a.cb(a.za) ? a.I = !0 : a.ea = !0);
        a.ea && !a.I && (c = !1);
        return c
    };
    a.o = p;
    a.u = 0;
    a.callbackWhenReadyToTrack = function(c, b, d) {
        var f;
        f = {};
        f.zb = c;
        f.yb = b;
        f.wb = d;
        a.o == p && (a.o = []);
        a.o.push(f);
        0 == a.u && (a.u = setInterval(a.j,
            100))
    };
    a.j = function() {
        var c;
        if (a.isReadyToTrack() && (a.tb(), a.o != p))
            for (; 0 < a.o.length;) c = a.o.shift(), c.yb.apply(c.zb, c.wb)
    };
    a.tb = function() {
        a.u && (clearInterval(a.u), a.u = 0)
    };
    a.mb = function(c) {
        var b, d, f = p,
            e = p;
        if (!a.isReadyToTrack()) {
            b = [];
            if (c != p)
                for (d in f = {}, c) f[d] = c[d];
            e = {};
            a.Ya(e, !0);
            b.push(f);
            b.push(e);
            a.callbackWhenReadyToTrack(a, a.track, b);
            return !0
        }
        return !1
    };
    a.Gb = function() {
        var c = a.cookieRead("s_fid"),
            b = "",
            d = "",
            f;
        f = 8;
        var e = 4;
        if (!c || 0 > c.indexOf("-")) {
            for (c = 0; 16 > c; c++) f = Math.floor(Math.random() * f),
                b += "0123456789ABCDEF".substring(f, f + 1), f = Math.floor(Math.random() * e), d += "0123456789ABCDEF".substring(f, f + 1), f = e = 16;
            c = b + "-" + d
        }
        a.cookieWrite("s_fid", c, 1) || (c = 0);
        return c
    };
    a.t = a.track = function(c, b) {
        var d, f = new Date,
            e = "s" + Math.floor(f.getTime() / 108E5) % 10 + Math.floor(1E13 * Math.random()),
            g = f.getYear(),
            g = "t=" + a.escape(f.getDate() + "/" + f.getMonth() + "/" + (1900 > g ? g + 1900 : g) + " " + f.getHours() + ":" + f.getMinutes() + ":" + f.getSeconds() + " " + f.getDay() + " " + f.getTimezoneOffset());
        a.visitor && a.visitor.getAuthState && (a.authState =
            a.visitor.getAuthState());
        a.p("_s");
        a.mb(c) || (b && a.R(b), c && (d = {}, a.Ya(d, 0), a.R(c)), a.Mb() && !a.visitorOptedOut && (a.analyticsVisitorID || a.marketingCloudVisitorID || (a.fid = a.Gb()), a.Pb(), a.usePlugins && a.doPlugins && a.doPlugins(a), a.account && (a.abort || (a.trackOffline && !a.timestamp && (a.timestamp = Math.floor(f.getTime() / 1E3)), f = k.location, a.pageURL || (a.pageURL = f.href ? f.href : f), a.referrer || a.Za || (f = a.Util.getQueryParam("adobe_mc_ref", null, null, !0), a.referrer = f || void 0 === f ? void 0 === f ? "" : f : n.document.referrer),
            a.Za = 1, a.referrer = a.Eb(a.referrer), a.p("_g")), a.Jb() && !a.abort && (a.visitor && !a.supplementalDataID && a.visitor.getSupplementalDataID && (a.supplementalDataID = a.visitor.getSupplementalDataID("AppMeasurement:" + a._in, a.expectSupplementalData ? !1 : !0)), a.Kb(), g += a.Ib(), a.ob(e, g), a.p("_t"), a.referrer = ""))), c && a.R(d, 1));
        a.abort = a.supplementalDataID = a.timestamp = a.pageURLRest = a.linkObject = a.clickObject = a.linkURL = a.linkName = a.linkType = k.s_objectID = a.pe = a.pev1 = a.pev2 = a.pev3 = a.e = a.lightProfileID = 0
    };
    a.Ba = [];
    a.registerPreTrackCallback =
        function(c) {
            for (var b = [], d = 1; d < arguments.length; d++) b.push(arguments[d]);
            "function" == typeof c ? a.Ba.push([c, b]) : a.debugTracking && a.F("DEBUG: Non function type passed to registerPreTrackCallback")
        };
    a.hb = function(c) {
        a.xa(a.Ba, c)
    };
    a.Aa = [];
    a.registerPostTrackCallback = function(c) {
        for (var b = [], d = 1; d < arguments.length; d++) b.push(arguments[d]);
        "function" == typeof c ? a.Aa.push([c, b]) : a.debugTracking && a.F("DEBUG: Non function type passed to registerPostTrackCallback")
    };
    a.gb = function(c) {
        a.xa(a.Aa, c)
    };
    a.xa = function(c,
        b) {
        if ("object" == typeof c)
            for (var d = 0; d < c.length; d++) {
                var f = c[d][0],
                    e = c[d][1];
                e.unshift(b);
                if ("function" == typeof f) try {
                    f.apply(null, e)
                } catch (g) {
                    a.debugTracking && a.F(g.message)
                }
            }
    };
    a.tl = a.trackLink = function(c, b, d, f, e) {
        a.linkObject = c;
        a.linkType = b;
        a.linkName = d;
        e && (a.l = c, a.A = e);
        return a.track(f)
    };
    a.trackLight = function(c, b, d, f) {
        a.lightProfileID = c;
        a.lightStoreForSeconds = b;
        a.lightIncrementBy = d;
        return a.track(f)
    };
    a.clearVars = function() {
        var c, b;
        for (c = 0; c < a.g.length; c++)
            if (b = a.g[c], "prop" == b.substring(0, 4) ||
                "eVar" == b.substring(0, 4) || "hier" == b.substring(0, 4) || "list" == b.substring(0, 4) || "channel" == b || "events" == b || "eventList" == b || "products" == b || "productList" == b || "purchaseID" == b || "transactionID" == b || "state" == b || "zip" == b || "campaign" == b) a[b] = void 0
    };
    a.tagContainerMarker = "";
    a.ob = function(c, b) {
        var d = a.ib() + "/" + c + "?AQB=1&ndh=1&pf=1&" + (a.ya() ? "callback=s_c_il[" + a._in + "].doPostbacks&et=1&" : "") + b + "&AQE=1";
        a.hb(d);
        a.fb(d);
        a.X()
    };
    a.ib = function() {
        var c = a.jb();
        return "http" + (a.ssl ? "s" : "") + "://" + c + "/b/ss/" + a.account + "/" +
            (a.mobile ? "5." : "") + (a.ya() ? "10" : "1") + "/JS-" + a.version + (a.Sb ? "T" : "") + (a.tagContainerMarker ? "-" + a.tagContainerMarker : "")
    };
    a.ya = function() {
        return a.AudienceManagement && a.AudienceManagement.isReady() || 0 != a.usePostbacks
    };
    a.jb = function() {
        var c = a.dc,
            b = a.trackingServer;
        b ? a.trackingServerSecure && a.ssl && (b = a.trackingServerSecure) : (c = c ? ("" + c).toLowerCase() : "d1", "d1" == c ? c = "112" : "d2" == c && (c = "122"), b = a.lb() + "." + c + ".2o7.net");
        return b
    };
    a.lb = function() {
        var c = a.visitorNamespace;
        c || (c = a.account.split(",")[0], c = c.replace(/[^0-9a-z]/gi,
            ""));
        return c
    };
    a.Xa = /{(%?)(.*?)(%?)}/;
    a.Wb = RegExp(a.Xa.source, "g");
    a.Db = function(c) {
        if ("object" == typeof c.dests)
            for (var b = 0; b < c.dests.length; ++b) {
                var d = c.dests[b];
                if ("string" == typeof d.c && "aa." == d.id.substr(0, 3))
                    for (var f = d.c.match(a.Wb), e = 0; e < f.length; ++e) {
                        var g = f[e],
                            h = g.match(a.Xa),
                            k = "";
                        "%" == h[1] && "timezone_offset" == h[2] ? k = (new Date).getTimezoneOffset() : "%" == h[1] && "timestampz" == h[2] && (k = a.Hb());
                        d.c = d.c.replace(g, a.escape(k))
                    }
            }
    };
    a.Hb = function() {
        var c = new Date,
            b = new Date(6E4 * Math.abs(c.getTimezoneOffset()));
        return a.k(4, c.getFullYear()) + "-" + a.k(2, c.getMonth() + 1) + "-" + a.k(2, c.getDate()) + "T" + a.k(2, c.getHours()) + ":" + a.k(2, c.getMinutes()) + ":" + a.k(2, c.getSeconds()) + (0 < c.getTimezoneOffset() ? "-" : "+") + a.k(2, b.getUTCHours()) + ":" + a.k(2, b.getUTCMinutes())
    };
    a.k = function(a, b) {
        return (Array(a + 1).join(0) + b).slice(-a)
    };
    a.ua = {};
    a.doPostbacks = function(c) {
        if ("object" == typeof c)
            if (a.Db(c), "object" == typeof a.AudienceManagement && "function" == typeof a.AudienceManagement.isReady && a.AudienceManagement.isReady() && "function" == typeof a.AudienceManagement.passData) a.AudienceManagement.passData(c);
            else if ("object" == typeof c && "object" == typeof c.dests)
            for (var b = 0; b < c.dests.length; ++b) {
                var d = c.dests[b];
                "object" == typeof d && "string" == typeof d.c && "string" == typeof d.id && "aa." == d.id.substr(0, 3) && (a.ua[d.id] = new Image, a.ua[d.id].alt = "", a.ua[d.id].src = d.c)
            }
    };
    a.fb = function(c) {
        a.i || a.Lb();
        a.i.push(c);
        a.ma = a.C();
        a.Va()
    };
    a.Lb = function() {
        a.i = a.Nb();
        a.i || (a.i = [])
    };
    a.Nb = function() {
        var c, b;
        if (a.ta()) {
            try {
                (b = k.localStorage.getItem(a.qa())) && (c = k.JSON.parse(b))
            } catch (d) {}
            return c
        }
    };
    a.ta = function() {
        var c = !0;
        a.trackOffline &&
            a.offlineFilename && k.localStorage && k.JSON || (c = !1);
        return c
    };
    a.La = function() {
        var c = 0;
        a.i && (c = a.i.length);
        a.q && c++;
        return c
    };
    a.X = function() {
        if (a.q && (a.B && a.B.complete && a.B.G && a.B.wa(), a.q)) return;
        a.Ma = p;
        if (a.ra) a.ma > a.O && a.Ta(a.i), a.va(500);
        else {
            var c = a.xb();
            if (0 < c) a.va(c);
            else if (c = a.Ia()) a.q = 1, a.Ob(c), a.Rb(c)
        }
    };
    a.va = function(c) {
        a.Ma || (c || (c = 0), a.Ma = setTimeout(a.X, c))
    };
    a.xb = function() {
        var c;
        if (!a.trackOffline || 0 >= a.offlineThrottleDelay) return 0;
        c = a.C() - a.Ra;
        return a.offlineThrottleDelay < c ? 0 : a.offlineThrottleDelay -
            c
    };
    a.Ia = function() {
        if (0 < a.i.length) return a.i.shift()
    };
    a.Ob = function(c) {
        if (a.debugTracking) {
            var b = "AppMeasurement Debug: " + c;
            c = c.split("&");
            var d;
            for (d = 0; d < c.length; d++) b += "\n\t" + a.unescape(c[d]);
            a.F(b)
        }
    };
    a.nb = function() {
        return a.marketingCloudVisitorID || a.analyticsVisitorID
    };
    a.Z = !1;
    var t;
    try {
        t = JSON.parse('{"x":"y"}')
    } catch (w) {
        t = null
    }
    t && "y" == t.x ? (a.Z = !0, a.Y = function(a) {
        return JSON.parse(a)
    }) : k.$ && k.$.parseJSON ? (a.Y = function(a) {
        return k.$.parseJSON(a)
    }, a.Z = !0) : a.Y = function() {
        return null
    };
    a.Rb = function(c) {
        var b,
            d, f;
        a.nb() && 2047 < c.length && ("undefined" != typeof XMLHttpRequest && (b = new XMLHttpRequest, "withCredentials" in b ? d = 1 : b = 0), b || "undefined" == typeof XDomainRequest || (b = new XDomainRequest, d = 2), b && (a.AudienceManagement && a.AudienceManagement.isReady() || 0 != a.usePostbacks) && (a.Z ? b.Da = !0 : b = 0));
        !b && a.Wa && (c = c.substring(0, 2047));
        !b && a.d.createElement && (0 != a.usePostbacks || a.AudienceManagement && a.AudienceManagement.isReady()) && (b = a.d.createElement("SCRIPT")) && "async" in b && ((f = (f = a.d.getElementsByTagName("HEAD")) && f[0] ?
            f[0] : a.d.body) ? (b.type = "text/javascript", b.setAttribute("async", "async"), d = 3) : b = 0);
        b || (b = new Image, b.alt = "", b.abort || "undefined" === typeof k.InstallTrigger || (b.abort = function() {
            b.src = p
        }));
        b.Sa = Date.now();
        b.Fa = function() {
            try {
                b.G && (clearTimeout(b.G), b.G = 0)
            } catch (a) {}
        };
        b.onload = b.wa = function() {
            b.Sa && (a.na = Date.now() - b.Sa);
            a.gb(c);
            b.Fa();
            a.Bb();
            a.ha();
            a.q = 0;
            a.X();
            if (b.Da) {
                b.Da = !1;
                try {
                    a.doPostbacks(a.Y(b.responseText))
                } catch (d) {}
            }
        };
        b.onabort = b.onerror = b.Ja = function() {
            b.Fa();
            (a.trackOffline || a.ra) && a.q &&
                a.i.unshift(a.Ab);
            a.q = 0;
            a.ma > a.O && a.Ta(a.i);
            a.ha();
            a.va(500)
        };
        b.onreadystatechange = function() {
            4 == b.readyState && (200 == b.status ? b.wa() : b.Ja())
        };
        a.Ra = a.C();
        if (1 == d || 2 == d) {
            var e = c.indexOf("?");
            f = c.substring(0, e);
            e = c.substring(e + 1);
            e = e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/, "");
            1 == d ? (b.open("POST", f, !0), b.send(e)) : 2 == d && (b.open("POST", f), b.send(e))
        } else if (b.src = c, 3 == d) {
            if (a.Pa) try {
                f.removeChild(a.Pa)
            } catch (g) {}
            f.firstChild ? f.insertBefore(b, f.firstChild) : f.appendChild(b);
            a.Pa = a.B
        }
        b.G = setTimeout(function() {
            b.G &&
                (b.complete ? b.wa() : (a.trackOffline && b.abort && b.abort(), b.Ja()))
        }, 5E3);
        a.Ab = c;
        a.B = k["s_i_" + a.replace(a.account, ",", "_")] = b;
        if (a.useForcedLinkTracking && a.K || a.A) a.forcedLinkTrackingTimeout || (a.forcedLinkTrackingTimeout = 250), a.ia = setTimeout(a.ha, a.forcedLinkTrackingTimeout)
    };
    a.Bb = function() {
        if (a.ta() && !(a.Qa > a.O)) try {
            k.localStorage.removeItem(a.qa()), a.Qa = a.C()
        } catch (c) {}
    };
    a.Ta = function(c) {
        if (a.ta()) {
            a.Va();
            try {
                k.localStorage.setItem(a.qa(), k.JSON.stringify(c)), a.O = a.C()
            } catch (b) {}
        }
    };
    a.Va = function() {
        if (a.trackOffline) {
            if (!a.offlineLimit ||
                0 >= a.offlineLimit) a.offlineLimit = 10;
            for (; a.i.length > a.offlineLimit;) a.Ia()
        }
    };
    a.forceOffline = function() {
        a.ra = !0
    };
    a.forceOnline = function() {
        a.ra = !1
    };
    a.qa = function() {
        return a.offlineFilename + "-" + a.visitorNamespace + a.account
    };
    a.C = function() {
        return (new Date).getTime()
    };
    a.Na = function(a) {
        a = a.toLowerCase();
        return 0 != a.indexOf("#") && 0 != a.indexOf("about:") && 0 != a.indexOf("opera:") && 0 != a.indexOf("javascript:") ? !0 : !1
    };
    a.setTagContainer = function(c) {
        var b, d, f;
        a.Sb = c;
        for (b = 0; b < a._il.length; b++)
            if ((d = a._il[b]) && "s_l" ==
                d._c && d.tagContainerName == c) {
                a.R(d);
                if (d.lmq)
                    for (b = 0; b < d.lmq.length; b++) f = d.lmq[b], a.loadModule(f.n);
                if (d.ml)
                    for (f in d.ml)
                        if (a[f])
                            for (b in c = a[f], f = d.ml[f], f) !Object.prototype[b] && ("function" != typeof f[b] || 0 > ("" + f[b]).indexOf("s_c_il")) && (c[b] = f[b]);
                if (d.mmq)
                    for (b = 0; b < d.mmq.length; b++) f = d.mmq[b], a[f.m] && (c = a[f.m], c[f.f] && "function" == typeof c[f.f] && (f.a ? c[f.f].apply(c, f.a) : c[f.f].apply(c)));
                if (d.tq)
                    for (b = 0; b < d.tq.length; b++) a.track(d.tq[b]);
                d.s = a;
                break
            }
    };
    a.Util = {
        urlEncode: a.escape,
        urlDecode: a.unescape,
        cookieRead: a.cookieRead,
        cookieWrite: a.cookieWrite,
        getQueryParam: function(c, b, d, f) {
            var e, g = "";
            b || (b = a.pageURL ? a.pageURL : k.location);
            d = d ? d : "&";
            if (!c || !b) return g;
            b = "" + b;
            e = b.indexOf("?");
            if (0 > e) return g;
            b = d + b.substring(e + 1) + d;
            if (!f || !(0 <= b.indexOf(d + c + d) || 0 <= b.indexOf(d + c + "=" + d))) {
                e = b.indexOf("#");
                0 <= e && (b = b.substr(0, e) + d);
                e = b.indexOf(d + c + "=");
                if (0 > e) return g;
                b = b.substring(e + d.length + c.length + 1);
                e = b.indexOf(d);
                0 <= e && (b = b.substring(0, e));
                0 < b.length && (g = a.unescape(b));
                return g
            }
        },
        getIeVersion: function() {
            if (document.documentMode) return document.documentMode;
            for (var a = 7; 4 < a; a--) {
                var b = document.createElement("div");
                b.innerHTML = "\x3c!--[if IE " + a + "]><span></span><![endif]--\x3e";
                if (b.getElementsByTagName("span").length) return a
            }
            return null
        }
    };
    a.H = "supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL customerPerspective referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
    a.g = a.H.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));
    a.oa = "timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");
    a.P = a.oa.slice(0);
    a.Ca = "account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData usePostbacks registerPreTrackCallback registerPostTrackCallback AudienceManagement".split(" ");
    for (m = 0; 250 >= m; m++) 76 > m && (a.g.push("prop" + m), a.P.push("prop" + m)), a.g.push("eVar" + m), a.P.push("eVar" + m), 6 > m && a.g.push("hier" + m), 4 > m && a.g.push("list" + m);
    m = "pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest marketingCloudOrgID".split(" ");
    a.g = a.g.concat(m);
    a.H = a.H.concat(m);
    a.ssl = 0 <= k.location.protocol.toLowerCase().indexOf("https");
    a.charSet = "UTF-8";
    a.contextData = {};
    a.offlineThrottleDelay =
        0;
    a.offlineFilename = "AppMeasurement.offline";
    a.Ra = 0;
    a.ma = 0;
    a.O = 0;
    a.Qa = 0;
    a.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
    a.w = k;
    a.d = k.document;
    try {
        if (a.Wa = !1, navigator) {
            var v = navigator.userAgent;
            if ("Microsoft Internet Explorer" == navigator.appName || 0 <= v.indexOf("MSIE ") || 0 <= v.indexOf("Trident/") && 0 <= v.indexOf("Windows NT 6")) a.Wa = !0
        }
    } catch (x) {}
    a.ha = function() {
        a.ia && (k.clearTimeout(a.ia), a.ia = p);
        a.l && a.K && a.l.dispatchEvent(a.K);
        a.A && ("function" == typeof a.A ? a.A() :
            a.l && a.l.href && (a.d.location = a.l.href));
        a.l = a.K = a.A = 0
    };
    a.Ua = function() {
        a.b = a.d.body;
        a.b ? (a.v = function(c) {
            var b, d, f, e, g;
            if (!(a.d && a.d.getElementById("cppXYctnr") || c && c["s_fe_" + a._in])) {
                if (a.Ea)
                    if (a.useForcedLinkTracking) a.b.removeEventListener("click", a.v, !1);
                    else {
                        a.b.removeEventListener("click", a.v, !0);
                        a.Ea = a.useForcedLinkTracking = 0;
                        return
                    }
                else a.useForcedLinkTracking = 0;
                a.clickObject = c.srcElement ? c.srcElement : c.target;
                try {
                    if (!a.clickObject || a.N && a.N == a.clickObject || !(a.clickObject.tagName || a.clickObject.parentElement ||
                            a.clickObject.parentNode)) a.clickObject = 0;
                    else {
                        var h = a.N = a.clickObject;
                        a.la && (clearTimeout(a.la), a.la = 0);
                        a.la = setTimeout(function() {
                            a.N == h && (a.N = 0)
                        }, 1E4);
                        f = a.La();
                        a.track();
                        if (f < a.La() && a.useForcedLinkTracking && c.target) {
                            for (e = c.target; e && e != a.b && "A" != e.tagName.toUpperCase() && "AREA" != e.tagName.toUpperCase();) e = e.parentNode;
                            if (e && (g = e.href, a.Na(g) || (g = 0), d = e.target, c.target.dispatchEvent && g && (!d || "_self" == d || "_top" == d || "_parent" == d || k.name && d == k.name))) {
                                try {
                                    b = a.d.createEvent("MouseEvents")
                                } catch (l) {
                                    b =
                                        new k.MouseEvent
                                }
                                if (b) {
                                    try {
                                        b.initMouseEvent("click", c.bubbles, c.cancelable, c.view, c.detail, c.screenX, c.screenY, c.clientX, c.clientY, c.ctrlKey, c.altKey, c.shiftKey, c.metaKey, c.button, c.relatedTarget)
                                    } catch (m) {
                                        b = 0
                                    }
                                    b && (b["s_fe_" + a._in] = b.s_fe = 1, c.stopPropagation(), c.stopImmediatePropagation && c.stopImmediatePropagation(), c.preventDefault(), a.l = c.target, a.K = b)
                                }
                            }
                        }
                    }
                } catch (n) {
                    a.clickObject = 0
                }
            }
        }, a.b && a.b.attachEvent ? a.b.attachEvent("onclick", a.v) : a.b && a.b.addEventListener && (navigator && (0 <= navigator.userAgent.indexOf("WebKit") &&
            a.d.createEvent || 0 <= navigator.userAgent.indexOf("Firefox/2") && k.MouseEvent) && (a.Ea = 1, a.useForcedLinkTracking = 1, a.b.addEventListener("click", a.v, !0)), a.b.addEventListener("click", a.v, !1))) : setTimeout(a.Ua, 30)
    };
    a.Cb();
    a.ac || (r ? a.setAccount(r) : a.F("Error, missing Report Suite ID in AppMeasurement initialization"), a.Ua(), a.loadModule("ActivityMap"))
}

function s_gi(r) {
    var a, k = window.s_c_il,
        p, n, m = r.split(","),
        s, u, t = 0;
    if (k)
        for (p = 0; !t && p < k.length;) {
            a = k[p];
            if ("s_c" == a._c && (a.account || a.oun))
                if (a.account && a.account == r) t = 1;
                else
                    for (n = a.account ? a.account : a.oun, n = a.allAccounts ? a.allAccounts : n.split(","), s = 0; s < m.length; s++)
                        for (u = 0; u < n.length; u++) m[s] == n[u] && (t = 1);
            p++
        }
    t ? a.setAccount && a.setAccount(r) : a = new AppMeasurement(r);
    return a
}
AppMeasurement.getInstance = s_gi;
window.s_objectID || (window.s_objectID = 0);

function s_pgicq() {
    var r = window,
        a = r.s_giq,
        k, p, n;
    if (a)
        for (k = 0; k < a.length; k++) p = a[k], n = s_gi(p.oun), n.setAccount(p.un), n.setTagContainer(p.tagContainerName);
    r.s_giq = 0
}
s_pgicq();
if (typeof(window.WATracker) == 'undefined') {
    var WATracker = function() {
        var options = {
            enabled: true, // true for enable WA Tagging, false for disable
            debug: false // enable display of debug mode for testing and debugging
        };

        function trackPageView(page_id, frame) {

            if (typeof(page_id) != 'object') s.prop7 = s.eVar7 = page_id;
            if (frame == 'self') s.frame = 'self';
            if (typeof(DataLayer) != 'undefined') {

                if (DataLayer.pageName) s.pageName = DataLayer.pageName;
                if (DataLayer.event) s.prop9 = DataLayer.event;
                if (DataLayer.referrer) s.prop6 = DataLayer.referrer;
                if (DataLayer.products) {
                    s.products = DataLayer.products;
                    if (DataLayer.cat1) s.eVar91 = DataLayer.cat1;
                    if (DataLayer.cat2) s.eVar92 = DataLayer.cat2;
                    if (DataLayer.cat3) s.eVar93 = DataLayer.cat3;
                    if (DataLayer.currency) s.currencyCode = DataLayer.currency;
                    if (DataLayer.purchaseID) s.purchaseID = s.eVar94 = DataLayer.purchaseID;
                    s.events = s.apl(s.events, DataLayer.event, ',', 2);
                }
            }
            s.t();
        }

        function trackClickEvent(event_id) {
            var s = s_gi(s_account);
            var sc_event;
            switch (event_id) {
                case 'bethome-hr-retry-28':
                    sc_event = "event1";
                    break;
                case "bethome-hr-addslip-29":
                    sc_event = "event2";
                    break;
                case 'bethome-fb-addslip-30':
                    sc_event = "event3";
                    break;
                case 'bethome-m6-retry-31':
                    sc_event = "event4";
                    break;
                case 'bethome-m6-addslip-32':
                    sc_event = "event5";
                    break;
                case 'betallup-hr-addslip-04':
                    sc_event = "event6";
                    break;
                case 'betwinplace-hr-addslip-05':
                    sc_event = "event6";
                    break;
                case 'betqp-hr-addslip-05':
                    sc_event = "event6";
                    break;
                case 'bettrio-hr-addslip-05':
                    sc_event = "event6";
                    break;
                case 'betfootball-fb-addslip-01':
                    sc_event = "event7";
                    break;
                case 'betcalculator-fb-addslip-01':
                    sc_event = "event7";
                    break;
                case 'betmarksix-m6-retry-01':
                    sc_event = "event8";
                    break;
                case 'betmarksix-m6-addslip-02':
                    sc_event = "event9";
                    break;
                case 'betquickpick-m6-addslip-01':
                    sc_event = "event9";
                    break;
                case 'betquickpickfav-m6-addslip-01':
                    sc_event = "event9";
                    break;
                case 'betslip-hr-addbet-01':
                    sc_event = "event10";
                    break;
                case 'betslip-fb-addbet-01':
                    sc_event = "event11";
                    break;
                case 'betslip-sendbet-01':
                    sc_event = "event12";
                    break;
                case 'header_ewin_home':
                    sc_event = "event13";
                    break;
                case 'header_ewin_racing':
                    sc_event = "event14";
                    break;
                case 'header_ewin_football':
                    sc_event = "event15";
                    break;
                case 'header_ewin_marksix':
                    sc_event = "event16";
                    break;
            }
            s.linkTrackVars = 'eVar6,prop8,eVar9,prop9,prop10,eVar10,eVar30,eVar31,eVar49,eVar50,eVar90,prop17,prop30,' + sc_event;
            s.eVar6 = s.pageName;
            s.linkTrackEvents = sc_event;
            s.prop8 = s.prop9 = s.eVar9 = event_id;
            s.events = sc_event;
            s.tl(true, 'o', event_id);
            s.clearVars();
        }

        function trackSlideEvent() {}
        /**
         * Get the options object
         */
        function getOptions() {
            return options;
        }
        /**
         * Update options. Mainly used by wa_tracker_config.js.
         */
        function setOptions(newOptions) {
            for (var key in newOptions) {
                options[key] = newOptions[key];
            }
        }
        /**
         *  Returns the public functions defined above
         */
        return {
            getOptions: getOptions,
            setOptions: setOptions,
            trackPageView: trackPageView,
            trackClickEvent: trackClickEvent,
            trackSlideEvent: trackSlideEvent
        }
    }();

    window.WATracker = WATracker;
}
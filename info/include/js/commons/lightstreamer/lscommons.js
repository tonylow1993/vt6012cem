/*
 * LIGHTSTREAMER - www.lightstreamer.com
 * Web Client - lscommons.js - Version 4 Revision: 24677 $
 * Copyright (c) 2004-2010 Weswit Srl. All Rights Reserved.
 */






if (!document.getElementById) {
    throw ("Browser not compatible");
}
if (window.Lightstreamer) {
    throw ("Warning: Lightstreamer singleton already on the page; lscommons.js should be the first Lightstreamer file included");
}
window.Lightstreamer = {
    ZeO: false,
    grG: "211.24324  24675 $",
    GKd: false,
    EtX: "CONNECTING",
    mTT: "STREAMING",
    RIU: "STALLED",
    RXc: "POLLING",
    HPo: "DISCONNECTED",
    ibu: {
        length: -1
    },
    tAd: new RegExp("^[a-zA-Z0-9]*$"),
    NKD: function() {},
    pTS: function(AGI) {
        var GHo = "";
        for (var UWJ in AGI) {
            if (!this[UWJ]) {
                this[UWJ] = AGI[UWJ];
            } else {}
        }
    },
    xFE: function(iPR, MwT, aVe) {
        var iKi = {};
        for (var UWJ in MwT.prototype) {
            if (iPR.prototype[UWJ]) {
                if (!aVe) {
                    var UTY = "super_" + UWJ;
                    while (MwT.prototype["_" + UTY]) {
                        UTY = "super_" + UTY;
                    }
                    iPR.prototype["_" + UTY] = MwT.prototype[UWJ];
                } else if (aVe === "O") {
                    iPR.prototype[UWJ] = MwT.prototype[UWJ];
                }
            } else {
                if (UWJ.indexOf("_super_") != 0 || !aVe) {
                    iPR.prototype[UWJ] = MwT.prototype[UWJ];
                }
            }
        }
        if (!aVe) {
            var JOa = "_super";
            while (iPR.prototype[JOa]) {
                JOa += "_super";
            }
            iPR.prototype[JOa] = MwT;
        }
        if (!iPR.prototype.aMW) {
            iPR.prototype.aMW = this.rOB;
        }
        if (!iPR.prototype.MrT) {
            iPR.prototype.MrT = this.FXP;
        }
    },
    rOB: function(Zpb, Yph) {
        if (Zpb.prototype["_super_" + Yph]) {
            while (Zpb.prototype["_super_" + Yph]) {
                Yph = "super_" + Yph;
            }
            Yph = "_" + Yph;
        } else {
            return;
        }
        if (this[Yph].apply) {
            return this[Yph].apply(this, Lightstreamer.jtw(arguments, 2));
        }
    },
    FXP: function(Zpb) {
        var Yph = "_super";
        if (Zpb.prototype[Yph]) {
            while (Zpb.prototype[Yph + "_super"]) {
                Yph += "_super";
            }
            if (this[Yph].apply) {
                this[Yph].apply(this, Lightstreamer.jtw(arguments, 1));
            }
        }
    },
    LCt: function(aCq) {
        if (aCq.shift) {
            return aCq.shift();
        }
        var KxF = aCq[0];
        for (var UWJ = 0, gho = aCq.length - 1; UWJ < gho; UWJ++) {
            aCq[UWJ] = aCq[UWJ + 1];
        }
        delete(aCq[aCq.length - 1]);
        return KxF;
    },
    jtw: function(HdR, Xkw) {
        var dJR = [];
        for (var oKC = Xkw, gho = HdR.length; oKC < gho; oKC++) {
            dJR[oKC - Xkw] = HdR[oKC];
        }
        return dJR;
    },
    rpI: function(Ifv) {
        if (window.encodeURIComponent) {
            return encodeURIComponent(Ifv);
        } else {
            Ifv = escape(Ifv);
            return Ifv.replace(this.GBs, "%2B");
        }
    },
    Slp: function(IsU) {
        if (window.decodeURIComponent) {
            return decodeURIComponent(IsU);
        } else {
            return unescape(IsU);
        }
    },
    cLp: function(HrW, MCD) {
        if (typeof window.addEventListener != "undefined") {
            window.addEventListener(HrW, MCD, false);
            return true;
        } else if (typeof document.addEventListener != "undefined") {
            document.addEventListener(HrW, MCD, false);
            return true;
        } else if (typeof window.attachEvent != "undefined") {
            return window.attachEvent("on" + HrW, MCD);
        } else {
            return false;
        }
    },
    qVQ: function(LuC, Vgp, bDs, gMK, min, max) {
        var Onj = new Number(LuC);
        var pIb = this.koh ? this.koh : Lightstreamer.bah;
        if (isNaN(Onj)) {
            pIb.bvA("This is a not valid value for " + Vgp + ": " + '"' + LuC + '"' + ". Please use a number", Vgp);
            return bDs;
        } else if (gMK == true && Onj != Math.round(Onj)) {
            pIb.bvA("This is a not valid value for " + Vgp + ": " + LuC + ". Please use an integer", Vgp);
            return bDs;
        } else if (!isNaN(min) && Onj < min) {
            pIb.bvA("This is a not valid value for " + Vgp + ": " + LuC + ". The minimum value allowed is " + min, Vgp);
            return bDs;
        } else if (!isNaN(max) && Onj > max) {
            pIb.bvA("This is a not valid value for " + Vgp + ": " + LuC + ". The maximum value allowed is " + max, Vgp);
            return bDs;
        } else {
            pIb.log(Vgp, Onj);
            return Onj;
        }
    },
    GQi: function(LuC, Vgp, bDs) {
        var pIb = this.koh ? this.koh : Lightstreamer.bah;
        if (LuC === true || LuC === false) {
            pIb.log(Vgp, LuC);
            return LuC;
        } else {
            pIb.bvA("This is a not valid value for " + Vgp + ": " + '"' + LuC + '"' + ". Please use true or false", Vgp);
            return bDs;
        }
    },
    getLogger: function() {
        return Lightstreamer.Nhm;
    },
    fde: function(cMs) {
        if (this.oRU != null && this.oRU != "") {
            if (cMs.indexOf(this.oRU) == -1) {
                return false;
            }
        }
        return true;
    },
    WQu: function(LuC) {
        if (typeof LuC != "undefined") {
            if (LuC === true || LuC === false) {
                return LuC === true;
            } else if (LuC == null) {
                return null;
            } else if (!isNaN(LuC) && LuC != "") {
                return parseFloat(LuC, 10);
            } else if ((LuC || LuC == "") && LuC.toString) {
                return LuC.toString();
            } else if (isNaN(LuC)) {
                return NaN;
            } else {
                Lightstreamer.bah.mbQ(false, 'WQu');
                return LuC;
            }
        }
        return null;
    },
    eoF: new RegExp("^\\s*([\\s\\S]*?)\\s*$"),
    UqW: function(CsK) {
        return CsK.replace(Lightstreamer.eoF, "$1");
    },
    woB: function(PeM, bDE) {
        if (!PeM) {
            return true;
        }
        if (bDE.toLowerCase() == "http:") {
            return PeM == 80;
        }
        if (bDE.toLowerCase() == "https:") {
            return PeM == 443;
        }
        return false;
    },
    TFY: function(ZYa, ZvU) {
        var rFG = [];
        for (var dXt = 0, gho = ZYa.length; UWJ < gho; UWJ++) {
            if (ZYa[dXt] == null) {
                rFG[dXt] = null;
            } else if (ZvU) {
                rFG[dXt] = new Number(ZYa[dXt]);
            } else {
                rFG[dXt] = new String(ZYa[dXt]);
            }
        }
        return Euf;
    },
    Dtt: function(ZYa, ZvU) {
        var Euf = {};
        for (var dXt in ZYa) {
            if (ZYa[dXt] == null) {
                Euf[dXt] = null;
            } else if (ZvU) {
                Euf[dXt] = new Number(ZYa[dXt]);
            } else {
                Euf[dXt] = new String(ZYa[dXt]);
            }
        }
        return Euf;
    },
    pic: function(max) {
        max = max ? max : 1000;
        return Math.round(Math.random() * max);
    },
    getClosureFor: function(CTk, mMk) {
        return function() {
            var HdR = arguments;
            return function() {
                CTk.apply(mMk, HdR);
            };
        };
    },
    getClosureForNoParams: function(CTk, mMk) {
        return function() {
            CTk.apply(mMk);
        };
    }
};
with(Lightstreamer) {
    Lightstreamer.kdA = "gi_buf";
    Lightstreamer.FSY = kdA.substring(1, 2);
    Lightstreamer.SjC = kdA.substring(0, 1);
    Lightstreamer.XFp = kdA.substring(0, 2);
    Lightstreamer.GBs = new RegExp("\\+", XFp);
}
Lightstreamer.avoidLSGlobals = false;
Lightstreamer.KvW = ["div", "span", "input"];
Lightstreamer.Nkl = function() {
    return Lightstreamer.KvW;
};
Lightstreamer.GYi = function(YOU, AgY) {
    Lightstreamer.KvW = YOU;
};
Lightstreamer.spC = function(MEW) {
    Lightstreamer.KvW.push(MEW);
};
Lightstreamer.JYb = function() {
    this.JaA(["ChartLine", "ChartTable", "DynaMetapushTable", "DynaScrollTable", "FieldNameDescriptor", "FieldPositionDescriptor", "GroupIdDescriptor", "GroupListDescriptor", "ItemNameDescriptor", "ItemPositionDescriptor", "LabelFormatter", "MetapushTable", "MultiDynaMetapushTable", "NonVisualTable", "OverwriteTable", "PushPage", "SchemaIdDescriptor", "SchemaListDescriptor", "ScreenTableHelper", "ScrollTable", "FlashBridge", "MessageListener"], true, true);
};
Lightstreamer.JaA = function(iMh, DhS, wva) {
    for (var UWJ = 0; UWJ < iMh.length; UWJ++) {
        this.AlY(iMh[UWJ]);
    }
    if (DhS) {
        window.LS_cell = Lightstreamer.cellOverwrite;
        window.LS_cs = Lightstreamer.cellScroll;
        window.LS_cM = Lightstreamer.cellMetapush;
    }
    if (wva) {
        window.LS_fadeCell = Lightstreamer.nQG;
    }
};
Lightstreamer.AlY = function(Vgp) {
    if (Lightstreamer[Vgp]) {
        window[Vgp] = Lightstreamer[Vgp];
    }
};
Lightstreamer.GYc = function() {
    var VRR = document.getElementsByTagName("script");
    for (var UWJ = 0; UWJ < VRR.length; UWJ++) {
        var vak = null;
        if ((vak = /lspushpage\.js\?(.*)$/.exec(VRR[UWJ].src)) != null) {
            Lightstreamer.avoidLSGlobals = (vak[1] == "avoidLSGlobals=true");
        }
    }
};
Lightstreamer.pTS({
    CoM: null,
    rfN: null,
    ciZ: function() {
        if (this.CoM != null) {
            return this.CoM;
        }
        if ((document.childNodes) && (!document.all) && (!navigator.taintEnabled) && (!navigator.accentColorName)) {
            this.CoM = true;
            return true;
        }
        this.CoM = false;
        return false;
    },
    YbP: function() {
        if (this.rfN != null) {
            return this.rfN;
        }
        if (this.ciZ()) {
            mxw = navigator.userAgent;
            if (mxw) {
                if (mxw.indexOf(" Version/") > -1) {
                    if (mxw.indexOf(" Version/3.0") <= -1) {
                        this.rfN = false;
                        return false;
                    }
                } else if (mxw.indexOf("Chrome/") > -1) {
                    this.rfN = false;
                    return false;
                }
            }
            this.rfN = true;
            return true;
        }
        this.rfN = false;
        return false;
    },
    GvO: new RegExp("[^0-9.]+", Lightstreamer.SjC),
    Pom: null,
    KfT: function(tfm, Kdu) {
        if (window.opera) {
            if (!tfm) {
                return true;
            }
            if (this.Pom === null) {
                if (!window.opera.version) {
                    this.Pom = 7;
                } else {
                    var PWX = window.opera.version();
                    PWX = PWX.replace(this.GvO, "");
                    this.Pom = parseFloat(PWX);
                }
            }
            if (Kdu === true) {
                return this.Pom <= tfm;
            } else if (Kdu === false) {
                return this.Pom >= tfm;
            } else {
                return this.Pom == tfm;
            }
        }
        return false;
    },
    bXg: null,
    iMu: function() {
        if (this.bXg !== null) {
            return this.bXg;
        }
        if (window.ActiveXObject) {
            this.bXg = true;
        } else {
            this.bXg = false;
        }
        return this.bXg;
    },
    UAg: null,
    abV: function() {
        if (this.UAg !== null) {
            return this.UAg;
        }
        var nAI = navigator.userAgent.toLowerCase();
        if (window.ScriptEngine && (ScriptEngine().indexOf("InScript") > -1)) {
            if (nAI.indexOf("icab") > -1) {
                Lightstreamer.Chl.log('abV', "iCab");
                this.UAg = true;
                return true;
            }
        }
        if (document.all) {
            xsQ = nAI.indexOf("msie");
            if (xsQ > -1) {
                RIi = nAI.substring(xsQ + 5, xsQ + 8);
                if (RIi.indexOf(5) > -1) {
                    Lightstreamer.Chl.log('abV', "IE5");
                    this.UAg = true;
                    return true;
                }
            }
        }
        Lightstreamer.Chl.log('abV', false);
        this.UAg = false;
        return false;
    },
    bje: {},
    Pux: new RegExp("Firefox\\/(\\d+\\.?\\d*)"),
    mAR: function(tfm, Kdu) {
        if (this.bje === null) {
            return false;
        }
        if (!tfm) {
            tfm = -1;
            Kdu = false;
        } else {
            Kdu = Kdu === true || Kdu === false ? Kdu : "";
        }
        if (this.bje[tfm + "" + Kdu] || this.bje[tfm + "" + Kdu] === false) {
            return this.bje[tfm + "" + Kdu];
        }
        var Owt = navigator.userAgent;
        if (Owt.indexOf("Firefox") <= -1) {
            this.bje = null;
            return false;
        }
        var TMp = 0;
        if (Owt.indexOf("Firefox/") > -1) {
            var ucu = this.Pux.exec(Owt);
            if (ucu) {
                TMp = Number(ucu[1]);
            }
        }
        var vak;
        if (Kdu === true) {
            vak = TMp <= tfm;
        } else if (Kdu === false) {
            vak = TMp >= tfm;
        } else {
            vak = TMp == tfm;
        }
        this.bje[tfm + "" + Kdu] = vak;
        return vak;
    },
    EQY: null,
    swf: function() {
        if (this.EQY !== null) {
            return this.EQY;
        }
        var Owt = navigator.userAgent;
        this.EQY = Owt.indexOf("Chrome/") > -1;
        return this.EQY;
    }
});
Lightstreamer.pTS({
    vbw: function(NwJ, rgD) {
        Lightstreamer.MmY.log('vbw', NwJ, rgD);
        this.jLG(NwJ, rgD, "");
    },
    jLG: function(NwJ, rgD, AFg) {
        var XGb = "";
        if (Lightstreamer.oRU != null && Lightstreamer.oRU != "") {
            XGb = "domain=." + Lightstreamer.oRU + "; ";
        }
        var eSJ = NwJ + "=" + rgD + "; ";
        var erd = eSJ + XGb + AFg + "path=/;";
        document.cookie = erd;
        Lightstreamer.MmY.log('jLG', erd);
    },
    CVR: function(NwJ) {
        NwJ += "=";
        var ihr = document.cookie.toString();
        ihr = ihr.split(";");
        var pIb = Lightstreamer.MmY;
        for (var UWJ = 0; UWJ < ihr.length; UWJ++) {
            ihr[UWJ] = Lightstreamer.UqW(ihr[UWJ]);
            pIb.log('CVR', NwJ, "?", ihr[UWJ]);
            if (ihr[UWJ].indexOf(NwJ) == 0) {
                var YMZ = ihr[UWJ].substring(NwJ.length, ihr[UWJ].length);
                pIb.log('CVR', NwJ, YMZ);
                return YMZ;
            }
        }
        pIb.log('CVR', NwJ, null);
        return null;
    },
    CxS: function(NwJ) {
        Lightstreamer.MmY.log('CxS', NwJ);
        var wkd = new Date();
        wkd.setTime(wkd.getTime() - 86400000);
        var AFg = "expires=" + wkd.toGMTString() + "; ";
        this.jLG(NwJ, "deleting", AFg);
    },
    Avl: false,
    YTT: function() {
        var pIb = Lightstreamer.MmY;
        pIb.log('YTT', 0);
        var ptK = Lightstreamer.pic();
        var IuS = "LS__cookie_test" + ptK;
        this.vbw(IuS, "testing");
        var PeF = this.CVR(IuS);
        if (PeF == "testing") {
            pIb.log('YTT', 1);
            this.CxS(IuS);
            PeF = this.CVR(IuS);
            if (PeF == null) {
                pIb.log('YTT', 2);
                this.Avl = true;
            }
        }
    },
    AYk: function() {
        return new Date().getTime();
    },
    jBw: 1000
});
Lightstreamer.pTS({
    smw: "|",
    Zsx: function(NwJ) {
        var CmQ = this.CVR(NwJ);
        if (!CmQ) {
            return null;
        }
        var ULB = CmQ.split(this.smw);
        if (ULB[0] == "") {
            ULB.shift();
        }
        if (ULB[ULB.length - 1] == "") {
            ULB.pop();
        }
        return ULB.length > 0 ? ULB : null;
    },
    hpc: function(NwJ, id) {
        var rgD = this.CVR(NwJ);
        if (!rgD) {
            rgD = this.smw;
        } else if (rgD.indexOf(this.smw + id + this.smw) > -1) {
            return false;
        }
        rgD += id + this.smw;
        this.vbw(NwJ, rgD);
        return true;
    },
    Plj: function(NwJ, id) {
        var rgD = this.CVR(NwJ);
        if (!rgD) {
            return;
        }
        var Hsc = this.smw + id + this.smw;
        if (rgD.indexOf(Hsc) > -1) {
            rgD = rgD.replace(Hsc, this.smw);
            if (rgD == this.smw) {
                this.CxS(NwJ);
            } else {
                this.vbw(NwJ, rgD);
            }
        }
    },
    YrL: function(NwJ, AuM) {
        var rgD = AuM.join(this.smw);
        this.vbw(NwJ, rgD);
    }
});
Lightstreamer.fqg = function(SAb) {
    this.Dpe = null;
    if (typeof SAb != "undefined") {
        this.Dpe = SAb;
    } else {
        this.Dpe = {};
    }
};
Lightstreamer.fqg.kHD = function(ZYa, ZvU) {
    var RXi = {};
    var Dpe = ZYa.VrH();
    for (var qMo in Dpe) {
        RXi[qMo] = {};
        for (var cgK in Dpe[qMo]) {
            if (Dpe[qMo][cgK] == null) {
                RXi[qMo][cgK] = null;
            } else if (ZvU) {
                RXi[qMo][cgK] = new Number(Dpe[qMo][cgK]);
            } else {
                RXi[qMo][cgK] = new String(Dpe[qMo][cgK]);
            }
        }
    }
    return new this(RXi);
};
Lightstreamer.fqg.prototype = {
    XKo: function(xkQ, qMo, cgK) {
        if (!this.Dpe[qMo]) {
            this.Dpe[qMo] = {};
        }
        this.Dpe[qMo][cgK] = xkQ;
    },
    whl: function(qMo, cgK) {
        if (!this.Dpe[qMo]) {
            return null;
        }
        if (typeof this.Dpe[qMo][cgK] == "undefined") {
            return null;
        }
        return this.Dpe[qMo][cgK];
    },
    XlD: function(qMo, cgK) {
        if (!this.Dpe[qMo]) {
            return;
        }
        if (this.Dpe[qMo][cgK]) {
            delete(this.Dpe[qMo][cgK]);
        }
        for (var UWJ in this.Dpe[qMo]) {
            return;
        }
        delete(this.Dpe[qMo]);
    },
    insertRow: function(vVw, qMo) {
        this.Dpe[qMo] = vVw;
    },
    hSR: function(qMo) {
        if (!this.Dpe[qMo]) {
            return null;
        }
        return this.Dpe[qMo];
    },
    pEi: function(qMo) {
        var GwJ = this.hSR(qMo);
        this.MBj(qMo);
        return GwJ;
    },
    MBj: function(qMo) {
        if (!this.Dpe[qMo]) {
            return;
        }
        delete(this.Dpe[qMo]);
    },
    VrH: function() {
        return this.Dpe;
    }
};
Lightstreamer.VCI = function(luL) {
    this.clK = luL ? luL : "GE";
};
Lightstreamer.VCI.prototype = {
    ard: function(jrY) {
        var vak = false;
        if (jrY) {
            vak = Lightstreamer.Nhm.ard(jrY);
        }
        return vak || Lightstreamer.Nhm.ard(this.clK);
    },
    YEo: function(Qxa) {
        if (Lightstreamer.mcJ) {
            this.log(Qxa, arguments, Lightstreamer.mcJ);
        } else {
            this.log(Qxa, arguments);
        }
    },
    log: function(Qxa) {
        if (!this.ard()) {
            return;
        }
        if (Lightstreamer.obfMap) {
            Qxa = Lightstreamer.obfMap.INs(Qxa);
        }
        var EBo = this.tLQ(arguments);
        Lightstreamer.Nhm.YOS(this.clK, EBo);
    },
    oAj: function(OEM, Qxa, clK, CAR, HdR) {
        if (!this.ard(clK)) {
            return;
        }
        if (Lightstreamer.obfMap) {
            HdR[CAR] = Lightstreamer.obfMap.INs(HdR[CAR]);
        }
        var EBo = OEM + " " + this.tLQ(HdR, CAR);
        if (this.clK != clK) {
            Lightstreamer.Nhm.YOS(this.clK, EBo, OEM);
        }
        Lightstreamer.Nhm.YOS(clK, EBo, OEM);
    },
    KEh: function(VUu, Qxa) {
        this.oAj(this.Rfm(VUu), Qxa, "EX", 1, arguments);
    },
    UAj: function(Qxa, DJn) {
        this.oAj(DJn, Qxa, "EX", 1, arguments);
    },
    rQj: function(niZ, Qxa) {
        this.oAj(niZ, Qxa, "ER", 1, arguments);
    },
    bvA: function(niZ, Qxa) {
        this.rQj(niZ, Qxa);
        throw (niZ);
    },
    kOV: function(niZ, Qxa) {
        if (!this.ard("ER")) {
            return;
        }
        var Cgs = this;
        setTimeout(function() {
            Cgs.rQj(niZ, Qxa);
        }, 2);
    },
    bNN: function(VUu, DJn, Qxa) {
        this.oAj(this.Rfm(VUu, DJn), Qxa, "ER", 2, arguments);
    },
    mbQ: function(jqm, Qxa) {
        if (!jqm) {
            this.oAj("", Qxa, "AS", 1, arguments);
        }
    },
    tLQ: function(HdR, oPr) {
        oPr = oPr ? oPr : 0;
        var EBo = " ";
        for (var UWJ = oPr; UWJ < HdR.length; UWJ++) {
            try {
                var Rht = HdR[UWJ];
                if (Rht == null) {
                    EBo += "NULL";
                } else if (Rht.prototype) {
                    EBo += Rht.apply();
                } else if (Rht.length < 0) {
                    EBo += "*";
                } else if (Rht.charAt != null) {
                    EBo += Rht;
                } else if (Rht[0] == Rht) {
                    EBo += Rht;
                } else if (Rht.length != null && Rht.top == null) {
                    EBo += "(";
                    EBo += this.tLQ(Rht);
                    EBo += ")";
                } else {
                    EBo += Rht;
                }
                EBo += " ";
            } catch (VUu) {
                EBo += "missing-parameter ";
            }
        }
        return EBo;
    },
    Rfm: function(VUu, jOL) {
        var nNV = VUu.message;
        if (typeof nNV == "undefined") {
            if (VUu.getMessage) {
                nNV = VUu.getMessage();
            }
            if (typeof nNV == "undefined") {
                nNV = VUu;
            }
        }
        var vak = "exception\n" + nNV + " \n\n";
        if (jOL) {
            vak += "thrown by your callback\n\n" + jOL;
        }
        if (VUu.stack) {
            vak += VUu.stack;
            vak += "\n";
        } else if (!Lightstreamer.KfT()) {
            vak += "(Exception stack trace only available on Firefox and Opera)\n\n";
        }
        return vak;
    }
};
Lightstreamer.LogSystem = function() {
    this.rTj = "";
    this.IKX = {};
    this.IKX.length = 0;
    this.VOJ = 0;
    this.uqt = new Lightstreamer.BufferConsumer();
    this.addConsumer(this.uqt, true);
    this.uqt.UTY++;
    this.uqt.EBS[0] = "START OF LOG";
    this.uqt.EBS[0 + "_C"] = "GE";
    this.nae = {};
    this.koh = this.getLogger("LS");
};
Lightstreamer.LogSystem.prototype = {
    getLogger: function(luL) {
        if (!this.nae[luL]) {
            this.nae[luL] = new Lightstreamer.VCI(luL);
        }
        return this.nae[luL];
    },
    getInternalLog: function() {
        return this.uqt;
    },
    addConsumer: function(ufZ, bfN) {
        this.IKX[this.IKX.length] = ufZ;
        this.IKX.length++;
        ufZ.MYd = this;
        if (bfN != true) {
            this.uqt.sendLogToConsumer(ufZ);
        }
        var JwG = ufZ.WLU.split(" ");
        this.ZrI(JwG);
    },
    removeConsumer: function(ufZ) {
        DpS = false;
        var UWJ = 0;
        while ((UWJ < this.IKX.length) && (!DpS)) {
            if (this.IKX[UWJ] == ufZ) {
                this.cQp(UWJ);
                DpS = true;
            }
            UWJ++;
        }
        return DpS;
    },
    cQp: function(UWJ) {
        bqI = this.IKX.length - 1;
        if (UWJ != bqI) {
            this.IKX[UWJ] = this.IKX[bqI];
        }
        delete(this.IKX[bqI]);
        this.IKX.length--;
        this.vxi();
    },
    Cws: function(clK) {
        if (!clK) {
            return;
        }
        if (this.rTj.indexOf(clK) > -1) {
            return;
        }
        if (this.rTj == "") {
            this.rTj += clK;
        } else {
            this.rTj += " " + clK;
        }
        this.uqt.addLogCategory(clK);
    },
    ZrI: function(WLU) {
        for (var clK in WLU) {
            this.Cws(WLU[clK]);
        }
    },
    vxi: function() {
        this.rTj = "";
        for (var UWJ = 0; UWJ < this.IKX.length; UWJ++) {
            var JwG = this.IKX[UWJ].WLU.split(" ");
            this.ZrI(JwG);
        }
    },
    YOS: function(luL, EBo, dYv) {
        if (!this.ard(luL)) {
            return;
        }
        var WXf = ++this.VOJ;
        EBo = this.thP(WXf) + luL + " " + EBo;
        this.aNe(luL, EBo, dYv);
        return EBo;
    },
    ard: function(luL) {
        if (this.rTj.length == 0 || this.rTj.indexOf(luL) == -1) {
            return false;
        }
        return true;
    },
    thP: function(WXf) {
        var RjO = new Date();
        var EBo = window.name;
        EBo += " ";
        EBo += WXf;
        EBo += ": ";
        EBo += RjO.getHours();
        EBo += ":";
        EBo += RjO.getMinutes();
        EBo += ":";
        EBo += RjO.getSeconds();
        EBo += ",";
        EBo += RjO.getMilliseconds();
        EBo += " ";
        return EBo;
    },
    aNe: function(luL, EBo, dYv) {
        var UWJ;
        for (UWJ = 0; UWJ < this.IKX.length; UWJ++) {
            var ufZ = this.IKX[UWJ];
            if (ufZ.WLU.indexOf(luL) > -1) {
                if (ufZ.Zgr == true) {
                    ufZ.oqh(dYv, luL);
                } else {
                    ufZ.oqh(EBo, luL);
                }
            }
        }
    },
    jmG: function(ufZ, rRL) {
        this.koh.rQj("Sorry, the " + ufZ + " is not compatible with this Browser", rRL);
    },
    vSE: function(clK) {
        return (clK == "ER" || clK == "AS" || clK == "EX");
    },
    mFO: function() {
        for (var UWJ = 0; UWJ < this.IKX.length; UWJ++) {
            if (this.IKX[UWJ].KWY) {
                this.IKX[UWJ].KWY();
            }
        }
    },
    dfs: function(mMk, DJn, OEM) {
        var xfn = true;
        if ((typeof buS != "undefined") && (buS)) {
            xfn = !PGV.SNv("onClientAlert", 'HVc', {
                DJn: DJn,
                OEM: OEM
            });
        }
        if (xfn && mMk.onClientAlert) {
            try {
                mMk.onClientAlert(DJn, OEM);
            } catch (VUu) {
                this.koh.bNN(VUu, mMk.onClientAlert, "onClientAlert");
            }
        }
    },
    QKv: function() {
        var EBS = new Lightstreamer.BufferConsumer();
        EBS.setHistoryDim(10);
        EBS.addLogCategory("ER");
        EBS.Zgr = true;
        Lightstreamer.MlI = EBS;
        this.addConsumer(EBS);
    },
    bSB: function(iMQ, object) {
        with(Lightstreamer) {
            if (xJm == null && MlI != null) {
                xJm = new FunctionConsumer(iMQ, object);
                xJm.addLogCategory("ER");
                xJm.Zgr = true;
                this.removeConsumer(MlI);
                MlI.sendLogToConsumer(xJm);
                this.addConsumer(xJm, true);
                MlI = null;
            }
        }
    }
};
Lightstreamer.aam = null;
Lightstreamer.JJw = null;
Lightstreamer.xJm = null;
Lightstreamer.MlI = null;
Lightstreamer.LogConsumer = function() {
    this.MYd;
    this.WLU = "";
    this.Zgr = false;
};
Lightstreamer.LogConsumer.prototype = {
    oqh: function(EBo, clK) {},
    isCompatible: function() {
        return false;
    },
    addLogCategory: function(clK) {
        if (!clK) {
            return;
        }
        if (this.WLU.indexOf(clK) > -1) {
            return;
        }
        if (this.WLU == "") {
            this.WLU += clK;
        } else {
            this.WLU += " " + clK;
        }
        if (this.MYd) {
            this.MYd.Cws(clK);
        }
    },
    getLogCategories: function() {
        return this.WLU;
    }
};
Lightstreamer.BufferConsumer = function() {
    this.MrT(Lightstreamer.BufferConsumer);
    this.SXB = 0;
    this.Luq = 0;
    this.UTY = -1;
    this.EBS = {};
};
Lightstreamer.BufferConsumer.prototype = {
    isCompatible: function() {
        return true;
    },
    extractLog: function(YjU, dxN, qXT, gEX) {
        var UWJ;
        var DlG = 1;
        if (YjU == null) {
            UWJ = this.Luq;
        } else {
            UWJ = this.UTY - YjU + 1;
            if (UWJ < this.Luq) {
                UWJ = this.Luq;
            }
        }
        if (dxN == null) {
            dxN = "\n";
        }
        var EhE = "";
        if (typeof gEX != "undefined" && gEX) {
            gEX = true;
        } else {
            gEX = false;
        }
        while (UWJ <= this.UTY) {
            if (typeof qXT != "undefined" && qXT) {
                EhE += qXT;
                if (gEX) {
                    EhE += DlG + "=";
                }
            }
            if (gEX) {
                EhE += Lightstreamer.rpI(this.EBS[UWJ]);
            } else {
                EhE += this.EBS[UWJ];
            }
            EhE += dxN;
            UWJ++;
            DlG++;
        }
        return EhE;
    },
    sendLogToConsumer: function(ufZ) {
        var UWJ = this.Luq;
        while (UWJ <= this.UTY) {
            if (ufZ.WLU.indexOf(this.EBS[UWJ + "_C"]) > -1) {
                ufZ.oqh(this.EBS[UWJ], this.EBS[UWJ + "_C"]);
            }
            UWJ++;
        }
    },
    setHistoryDim: function(fGm) {
        this.SXB = fGm;
    },
    oqh: function(EBo, clK) {
        var WXf = ++this.UTY;
        var oPr = WXf - this.SXB + 1;
        while (this.Luq < oPr) {
            delete(this.EBS[this.Luq]);
            delete(this.EBS[this.Luq + "_C"]);
            this.Luq++;
        }
        this.EBS[WXf] = EBo;
        this.EBS[WXf + "_C"] = clK;
    }
};
Lightstreamer.xFE(Lightstreamer.BufferConsumer, Lightstreamer.LogConsumer);
Lightstreamer.RemoteConsumer = function(ZKF, xxH, uZd) {
    this.MrT(Lightstreamer.RemoteConsumer);
    this.ZKF = ZKF;
    this.xxH = xxH ? xxH : 0;
    this.uZd = uZd ? uZd : 0;
    this.ARl = 0;
    this.ShN = 0;
    this.deS = 100;
    this.EBS = new Lightstreamer.BufferConsumer();
    this.EBS.setHistoryDim(this.ZKF);
};
Lightstreamer.RemoteConsumer.prototype = {
    XJS: function() {
        var ZQW = false;
        if ((typeof buS != "undefined") && (buS)) {
            ZQW = true;
        } else if (!Lightstreamer.IHI || !Lightstreamer.IHI.Exk) {
            if (this.ShN < this.deS) {
                this.EBS.setHistoryDim(this.ShN + 1);
            }
            return;
        }
        var qqY = this.EBS.extractLog(this.ShN, "&", "LS_log", true);
        if (qqY != "") {
            if (ZQW) {
                buS.YlX(qqY);
            } else {
                Lightstreamer.IHI.OCk('YlX', qqY);
            }
        }
        this.ShN = 0;
        this.EBS = new Lightstreamer.BufferConsumer();
        this.EBS.setHistoryDim(this.ZKF);
    },
    KWY: function() {
        setTimeout(Lightstreamer.getClosureForNoParams(this.XJS, this), 1);
    },
    oqh: function(EBo, clK) {
        if (this.uZd > 0 && this.ARl >= this.uZd) {
            if (this.ShN > 0) {
                this.KWY();
            }
            return;
        }
        if (this.xxH > 0 && EBo.length > this.xxH) {
            EBo = EBo.substr(0, this.xxH);
        }
        this.ShN++;
        this.EBS.oqh(EBo, clK);
        this.ARl++;
        if (this.ShN >= this.ZKF) {
            this.KWY();
        }
    },
    NXn: function(mvI) {
        if (!mvI) {
            this.xxH = 0;
        } else {
            this.xxH = mvI;
        }
    },
    AHf: function(max) {
        if (!max) {
            this.uZd = 0;
        } else {
            this.uZd = max;
        }
    },
    isCompatible: function() {
        return true;
    }
};
Lightstreamer.xFE(Lightstreamer.RemoteConsumer, Lightstreamer.LogConsumer);
Lightstreamer.FunctionConsumer = function(FsP, Zds, SIg) {
    this.MrT(Lightstreamer.FunctionConsumer);
    this.FsP = FsP;
    this.SIg = SIg ? SIg : FsP;
    this.Zds = Zds;
};
Lightstreamer.FunctionConsumer.prototype = {
    isCompatible: function() {
        if (!this.FsP) {
            return false;
        }
        return (this.FsP.apply) ? true : false;
    },
    oqh: function(EBo, clK) {
        var LMK = new Array(EBo);
        var Yph = this.FsP;
        if (Lightstreamer.Nhm.vSE(clK)) {
            Yph = this.SIg;
        }
        if (Yph.apply) {
            try {
                Yph.apply(this.Zds, LMK);
            } catch (VUu) {}
        }
    }
};
Lightstreamer.xFE(Lightstreamer.FunctionConsumer, Lightstreamer.LogConsumer);
Lightstreamer.AlertConsumer = function(ZKF) {
    this.MrT(Lightstreamer.AlertConsumer);
    this.WVv = ZKF;
    this.ShN = 0;
    this.EBS = new Lightstreamer.BufferConsumer();
    this.EBS.setHistoryDim(this.WVv);
};
Lightstreamer.AlertConsumer.prototype = {
    isCompatible: function() {
        return window.alert;
    },
    oqh: function(EBo, clK) {
        this.ShN++;
        this.EBS.oqh(EBo, clK);
        if (this.ShN >= this.WVv) {
            this.ShN = 0;
            HvR = this.UuL(this.EBS, this.WVv);
            setTimeout(HvR, 10);
            this.EBS = new Lightstreamer.BufferConsumer();
            this.EBS.setHistoryDim(this.WVv);
        }
    },
    UuL: function(EBS, ShN) {
        return function() {
            alert(EBS.extractLog(ShN, "\n"));
        };
    }
};
Lightstreamer.xFE(Lightstreamer.AlertConsumer, Lightstreamer.LogConsumer);
Lightstreamer.WVm = function(JBE) {
    this.aVI = JBE;
    this.koh = Lightstreamer.Nhm.getLogger("FM");
};
Lightstreamer.WVm.prototype = {
    MHo: function(ZQW, cjJ) {
        var vak = this.ilX(ZQW, cjJ);
        this.koh.YEo('MHo', ZQW, cjJ, vak.KbK, vak.log, vak.pmv);
        return vak;
    },
    ilX: function(ZQW, cjJ) {
        var EBt = {};
        var Rge = 1;
        try {
            if (this.aVI == null) {
                Rge = 2;
                EBt.log = "null";
                EBt.pmv = true;
                return EBt;
            } else if (this.aVI.closed) {
                Rge = 3;
                this.aVI = null;
                EBt.log = "closed";
                EBt.pmv = true;
                return EBt;
            } else if (!this.aVI.Lightstreamer || (ZQW && !this.aVI.Lightstreamer.ZeO)) {
                Rge = 4;
                EBt.log = (!this.aVI.Lightstreamer) ? "not global" : "not active";
                this.aVI = null;
                EBt.pmv = false;
                return EBt;
            } else if (ZQW) {
                if (this.aVI.PGV) {
                    Rge = 5;
                    if (!this.aVI.buS) {
                        Rge = 11;
                        this.aVI = null;
                        EBt.log = "too young";
                        EBt.pmv = false;
                        return EBt;
                    } else if (cjJ && !this.aVI.buS.fks) {
                        Rge = 6;
                        this.aVI = null;
                        EBt.log = "wait conf";
                        EBt.pmv = false;
                        return EBt;
                    }
                } else if (this.aVI.Lightstreamer.Esk) {
                    if (this.aVI.Lightstreamer.Esk.YgX) {
                        Rge = 7;
                        var oqw = this.aVI.Lightstreamer.Esk.YgX;
                        if (Lightstreamer.Esk) {
                            Lightstreamer.Esk.YgX = oqw;
                        }
                        this.aVI = oqw;
                        var DJL = this.MHo(true);
                        DJL.log = "linked: " + DJL.log;
                        return DJL;
                    } else {
                        Rge = 8;
                        this.aVI = null;
                        EBt.log = "linked w/o reference";
                        EBt.pmv = false;
                        return EBt;
                    }
                } else {
                    Rge = 9;
                    this.koh.mbQ(false, 'MHo', this.aVI);
                    this.aVI = null;
                    EBt.log = "not engine";
                    EBt.pmv = true;
                    return EBt;
                }
            }
            Rge = 10;
            EBt.log = "OK";
            EBt.KbK = true;
            return EBt;
        } catch (VUu) {
            this.aVI = null;
            EBt.log = "exception " + Rge + " " + VUu;
            EBt.pmv = true;
            return EBt;
        }
    },
    vif: function(ItT, TJx) {
        var WjA = ItT + "__TRASH";
        var acG = this.QZh(ItT, WjA);
        var FDJ = "eval(" + '"' + acG + "; " + '"' + ")";
        this.koh.log('vif', 1);
        var Kxk = Lightstreamer.VYn("javascript:" + FDJ, ItT);
        this.koh.log('vif', 2, Kxk != null);
        if (Kxk === false) {
            return false;
        } else if (!Kxk) {
            var Kxk = Lightstreamer.VYn(Lightstreamer.iaM, ItT);
            Lightstreamer.OqJ.log('vif', 3);
            this.koh.log('vif', 4, Kxk != null);
            if (Kxk === false) {
                return false;
            } else if (Kxk == null) {
                return true;
            }
        }
        try {
            this.koh.log('vif', 5, Kxk.closed);
            if (Kxk.closed) {
                return true;
            }
            if (TJx) {
                this.koh.log('vif', 6, (Kxk == Kxk.top));
                if (Kxk == Kxk.top && !Kxk.Lightstreamer) {
                    try {
                        this.Ahr(Kxk, ItT, WjA);
                    } catch (VUu) {
                        this.koh.KEh(VUu, 'vif', 10);
                    }
                    return true;
                }
                Kxk = Kxk.parent;
                this.koh.log('vif', 7, Kxk != null);
                if (Kxk == null) {
                    return true;
                }
            }
            this.koh.log('vif', 8, (Kxk.Lightstreamer != null));
            if (!Kxk.Lightstreamer) {
                return true;
            }
            this.koh.log('vif', 9, (Kxk.Lightstreamer.Nhm != null));
            if (!Kxk.Lightstreamer.Nhm) {
                return true;
            }
            this.aVI = Kxk;
        } catch (VUu) {
            this.koh.KEh(VUu, 'vif', 11);
        }
        return true;
    },
    saT: function(AMN, ikE) {
        if (this.vif("LS__" + AMN, true) === false) {
            return false;
        }
        var GHo = this.MHo(true, !ikE);
        return GHo;
    },
    QZh: function(Vgp, AjO) {
        var Xvv = function(Vgp, AjO) {
            if (window.name == Vgp) {
                if (window == top && !(window.Lightstreamer && window.Lightstreamer.Nhm)) {
                    window.name = AjO;
                    window.close();
                }
            }
        };
        var uTc = "callFun";
        return "var " + uTc + " = " + Xvv.toString() + "; " + uTc + "('" + Vgp + "', '" + AjO + "');";
    },
    Ahr: function(Kxk, ItT, WjA) {
        if (Kxk.name != ItT && Kxk.name != WjA) {
            return;
        }
        Kxk.close();
    }
};
Lightstreamer.pTS({
    hRD: 0,
    RDJ: 0,
    Kqr: false,
    MJq: "You have Norton Internet Security or Norton\nPersonal Firewall installed on this computer.\nIf no real-time data show up, then you need\nto disable Ad Blocking in Norton Internet\nSecurity and then refresh this page",
    VYn: function(QSt, ItT) {
        var EBt = null;
        Lightstreamer.Chl.log('VYn', document.cookie);
        try {
            EBt = this.Jhd(QSt, ItT);
        } catch (VUu) {
            Lightstreamer.Chl.KEh(VUu);
            return false;
        }
        if (EBt) {
            try {
                this.RDJ++;
            } catch (lok) {
                this.GKd = true;
            }
        }
        return EBt;
    },
    Jhd: function(QSt, ItT) {
        if (window.SymError) {
            var DNW = true;
            if ((this.RDJ - this.hRD) < -5) {
                DNW = false;
            }
            if (window.SymRealWinOpen && DNW) {
                this.hRD++;
                Lightstreamer.Chl.log('Jhd', 1);
                return window.SymRealWinOpen(QSt, ItT, "height=100,width=100", true);
            } else if (!this.Kqr) {
                this.Kqr = true;
                Lightstreamer.Chl.kOV(this.MJq, "window.open");
                var YoR = null;
                if (window.buS) {
                    YoR = buS;
                } else if (Lightstreamer.Esk) {
                    YoR = Lightstreamer.Esk;
                }
                if (YoR != null) {
                    Lightstreamer.Nhm.dfs(YoR, 100, this.MJq);
                }
            }
            DNW = true;
            this.hRD = 0;
            return null;
        } else {
            if (Lightstreamer.AYk() - Lightstreamer.DAE > Lightstreamer.TqL) {
                return false;
            }
            return window.open(QSt, ItT, "height=100,width=100", true);
        }
    }
});
Lightstreamer.pTS({
    eCV: function(IaT) {
        var BKG = 0;
        var oRg = IaT.length;
        for (var UWJ = 0; UWJ < oRg; UWJ++) {
            BKG += IaT.charCodeAt(UWJ);
        }
        return parseInt(BKG);
    },
    hJC: function(HNq, NwJ, oPr, sdR, anD) {
        var UDC = 3;
        var Spv;
        var dbU = oPr;
        var cTq = oPr - sdR;
        var vak = "";
        var BKG = this.eCV(NwJ.toString());
        if (BKG > 0) {
            var mpX = HNq.length;
            if (mpX > 0) {
                var UWJ;
                for (UWJ = 0; dbU + UDC - UWJ <= mpX; UWJ += 3) {
                    var kre = UWJ;
                    if (cTq > 0) {
                        for (kre = BKG * 3; kre >= cTq; kre -= cTq);
                    }
                    var kxk = HNq.substring(UWJ, UDC - 1);
                    var Bpi = HNq.substring(kre, kre + 2);
                    var SJT = HNq.substring(dbU, dbU + UDC - UWJ);
                    Spv = parseInt(kxk) - parseInt(Bpi) + anD - parseInt(SJT);
                    var dID = unescape("%" + Spv.toString(16));
                    vak = dID + vak;
                    UDC += 3;
                    dbU += 3;
                    BKG += Spv;
                }
            }
        }
        return vak;
    }
});
Lightstreamer.MessageListener = function() {};
Lightstreamer.MessageListener.prototype = {
    onAbort: function() {
        return;
    },
    onError: function() {
        return;
    },
    onDiscarded: function() {
        return;
    },
    onDeny: function(code, message) {
        return;
    },
    onProcessed: function() {
        return;
    }
};
Lightstreamer.LAh = function(FMK) {
    this.name = null;
    this.parent = null;
    this.koh = Lightstreamer.Nhm.getLogger("OP");
    if (FMK) {
        this.dxD(FMK);
    }
};
Lightstreamer.LAh.prototype = {
    QGn: Lightstreamer.qVQ,
    iNv: Lightstreamer.GQi,
    sKJ: function(WLl, LuC) {
        this[WLl] = Lightstreamer.WQu(LuC);
        if (this.parent == window.buS) {
            this.wFG(WLl);
        }
    },
    wFG: function(iXp, xNO, jCa) {
        var UnW = 'hMR';
        var eZr = {
            object: this.name,
            WLl: iXp
        };
        eZr.LuC = Lightstreamer.WQu(this[iXp]);
        this.koh.log('wFG', iXp, (iXp != 'rer' ? this[iXp] : "[...]"));
        if (this.parent == window.buS) {
            var YLQ = PGV.bAs();
            for (var UWJ in YLQ) {
                YLQ[UWJ].OCk(UnW, eZr);
            }
        } else {
            if (!Lightstreamer.IHI.TsT(UnW, eZr)) {
                this.koh.rQj("The LightstreamerEngine instance is not available", xNO);
                this[iXp] = jCa;
                return false;
            }
        }
        return true;
    },
    dxD: function(ovg) {
        var CAE = this.bWQ;
        for (var UWJ = 0; UWJ < CAE.length; UWJ++) {
            this[CAE[UWJ]] = Lightstreamer.WQu(ovg[CAE[UWJ]]);
        }
    }
};
Lightstreamer.oRU = null;
Lightstreamer.iaM = "lsblank.html?";
Lightstreamer.Context = function() {
    this.gNO = null;
    this.eZS = null;
    this.OrO = null;
    this.xxH = 0;
    this.uZd = 0;
    this.Nhm = null;
    this.bWQ = Lightstreamer.Context.bWQ;
    this.MrT(Lightstreamer.Context, arguments[0]);
    this.name = "context";
};
Lightstreamer.Context.bWQ = ['gNO', 'eZS', 'OrO', 'xxH', 'uZd'];
Lightstreamer.Context.prototype = {
    getLogger: function() {
        return this.Nhm;
    },
    dxD: function(ovg) {
        this.aMW(Lightstreamer.Context, 'dxD', ovg);
        if (!this.Nhm && ovg.Nhm) {
            this.Nhm = ovg.Nhm;
        }
    },
    bind: function() {
        if (this.parent && this.parent != window.buS) {
            return;
        }
        if (Lightstreamer.oRU != null && Lightstreamer.oRU != "") {
            document.domain = Lightstreamer.oRU;
            var EqH = "domain=" + Lightstreamer.oRU + "&";
            Lightstreamer.iaM += EqH;
            if (Lightstreamer.Iog) {
                Lightstreamer.Iog.mIE = EqH;
            }
        }
        Lightstreamer.igj = this;
        Lightstreamer.YTT();
        return true;
    },
    setDebugAlertsOnClientError: function(IVq) {
        var jCa = this.eZS;
        this.eZS = IVq === true;
        if (this.parent == null) {
            this.lsY();
        } else {
            this.wFG('eZS', "setDebugAlertsOnClientError", jCa);
        }
    },
    lsY: function() {
        if (this.eZS) {
            if (!Lightstreamer.aam) {
                var aam = new Lightstreamer.AlertConsumer(1);
                aam.addLogCategory("ER");
                Lightstreamer.Nhm.addConsumer(aam, true);
                Lightstreamer.aam = aam;
                this.koh.log('lsY', 1);
            } else {
                this.koh.log('lsY', 2);
            }
        } else if (Lightstreamer.aam) {
            Lightstreamer.Nhm.removeConsumer(Lightstreamer.aam);
            Lightstreamer.aam = null;
            this.koh.log('lsY', 3);
        } else {
            this.koh.log('lsY', 4);
        }
    },
    setRemoteAlertsOnClientError: function(IVq, xxH, uZd) {
        var LVe = this.OrO;
        var DRZ = this.uZd;
        var TpB = this.xxH;
        this.OrO = IVq === true;
        if (uZd) {
            this.uZd = this.QGn(uZd, "setRemoteAlertsOnClientError", this.uZd, true, 0);
        }
        if (xxH) {
            this.xxH = this.QGn(xxH, "setRemoteAlertsOnClientError", this.xxH, true, 0);
        }
        if (this.parent == null) {
            this.ChD();
        } else {
            var vak = this.wFG('uZd', "setRemoteAlertsOnClientError");
            vak &= this.wFG('xxH', "setRemoteAlertsOnClientError");
            vak &= this.wFG('OrO', "setRemoteAlertsOnClientError");
            if (!vak) {
                this.OrO = LVe;
                this.uZd = DRZ;
                this.xxH = TpB;
            }
        }
    },
    ChD: function() {
        if (this.OrO) {
            if (Lightstreamer.JJw) {
                Lightstreamer.JJw.NXn(this.xxH);
                Lightstreamer.JJw.AHf(this.uZd);
                this.koh.log('ChD', 2);
            } else {
                var JJw = new Lightstreamer.RemoteConsumer(1, this.xxH, this.uZd);
                JJw.addLogCategory("ER");
                Lightstreamer.Nhm.addConsumer(JJw, true);
                Lightstreamer.JJw = JJw;
                this.koh.log('ChD', 1);
            }
        } else if (Lightstreamer.JJw) {
            Lightstreamer.Nhm.removeConsumer(Lightstreamer.JJw);
            Lightstreamer.JJw = null;
            this.koh.log('ChD', 3);
        } else {
            this.koh.log('ChD', 4);
        }
    },
    setDomain: function(domain) {
        if (this.parent == window.buS || this.parent == null) {
            if (domain != null && domain != "" && Lightstreamer.igj != this) {
                Lightstreamer.oRU = domain;
                this.gNO = Lightstreamer.oRU;
                this.koh.log("setDomain", Lightstreamer.oRU);
            }
            if (!Lightstreamer.fde(location.hostname)) {
                this.koh.rQj("The domain set is inconsistent with the hostname used", "setDomain");
            }
        }
    }
};
with(Lightstreamer) {
    xFE(Context, LAh);
}
Lightstreamer.Policy = function() {
    this.vYs = 0;
    this.xtp = NaN;
    this.VBL = NaN;
    this.sIv = 2000;
    this.fUv = 15000;
    this.GPP = NaN;
    this.GNo = 0;
    this.oVq = 30000;
    this.ies = true;
    this.qOB = true;
    this.DXJ = false;
    this.Pwf = 4000;
    this.AIA = 30000;
    this.LoV = 1000;
    this.KaS = 300;
    this.bWQ = Lightstreamer.Policy.bWQ;
    this.MrT(Lightstreamer.Policy, arguments[0]);
    this.name = "policy";
};
Lightstreamer.Policy.bWQ = ['vYs', 'xtp', 'VBL', 'sIv', 'fUv', 'GPP', 'GNo', 'oVq', 'ies', 'qOB', 'DXJ', 'Pwf', 'AIA', 'LoV', 'KaS'];
Lightstreamer.Policy.prototype = {
    setRequestSerializationTimeout: function(ccd) {
        var jCa = this.KaS;
        this.KaS = this.QGn(ccd, "setRequestSerializationTimeout", this.KaS, true, 0);
        this.wFG('KaS', "setRequestSerializationTimeout", jCa);
    },
    getRequestSerializationTimeout: function() {
        return this.KaS;
    },
    setMaxBandwidth: function(vYs) {
        var jCa = this.vYs;
        var PLY = new String(vYs);
        if (PLY.toLowerCase() == "unlimited") {
            this.vYs = 0;
        } else {
            this.vYs = this.QGn(vYs, "setMaxBandwidth", this.vYs, false, 0);
        }
        this.wFG('vYs', "setMaxBandwidth", jCa);
    },
    getMaxBandwidth: function() {
        return this.vYs;
    },
    setKeepaliveInterval: function(xtp) {
        var jCa = this.xtp;
        this.xtp = this.QGn(xtp, "setKeepaliveInterval", this.xtp, true, 1);
        this.wFG('xtp', "setKeepaliveInterval", jCa);
    },
    getKeepaliveInterval: function() {
        if (!isNaN(this.VBL)) {
            return this.VBL;
        }
        return this.xtp;
    },
    setTimeoutForStalled: function(sIv) {
        var jCa = this.sIv;
        this.sIv = this.QGn(sIv, "setTimeoutForStalled", this.sIv, true, 1);
        this.wFG('sIv', "setTimeoutForStalled", jCa);
    },
    getTimeoutForStalled: function() {
        return this.sIv;
    },
    setTimeoutForReconnect: function(fUv) {
        var jCa = this.fUv;
        this.fUv = this.QGn(fUv, "setTimeoutForReconnect", this.fUv, true, 1);
        this.wFG('fUv', "setTimeoutForReconnect", jCa);
    },
    getTimeoutForReconnect: function() {
        return this.fUv;
    },
    setPollingInterval: function(GNo) {
        var jCa = this.GNo;
        this.GNo = this.QGn(GNo, "setPollingInterval", this.GNo, true, 0);
        this.wFG('GNo', "setPollingInterval", jCa);
    },
    getPollingInterval: function() {
        if (!isNaN(this.GPP)) {
            return this.GPP;
        }
        return this.GNo;
    },
    setIdleTimeout: function(oVq) {
        var jCa = this.oVq;
        this.oVq = this.QGn(oVq, "setIdleTimeout", this.oVq, true, 0);
        this.wFG('oVq', "setIdleTimeout", jCa);
    },
    getIdleTimeout: function() {
        return this.oVq;
    },
    setSlowingEnabled: function(ies) {
        var jCa = this.ies;
        this.ies = this.iNv(ies, "setSlowingEnabled", this.ies);
        this.wFG('ies', "setSlowingEnabled", jCa);
    },
    isSlowingEnabled: function() {
        return this.ies;
    },
    setCanUseGetForStreaming: function(qOB) {
        var jCa = this.qOB;
        this.qOB = this.iNv(qOB, "setCanUseGetForStreaming", this.qOB);
        this.wFG('qOB', "setCanUseGetForStreaming", jCa);
    },
    canUseGetForStreaming: function() {
        return this.qOB;
    },
    setBufferedStreamingHandled: function(DXJ) {
        var jCa = this.DXJ;
        this.DXJ = this.iNv(DXJ, "setBufferedStreamingHandled", this.DXJ);
        this.wFG('DXJ', "setBufferedStreamingHandled", jCa);
    },
    Pfr: function() {
        return this.DXJ;
    },
    setConnectTimeout: function(JCK) {
        var jCa = this.Pwf;
        this.Pwf = this.QGn(JCK, "setConnectTimeout", this.Pwf, true, 1);
        this.wFG('Pwf', "setConnectTimeout", jCa);
    },
    getConnectTimeout: function() {
        return this.Pwf;
    },
    setStreamingTimeout: function(NcV) {
        var jCa = this.AIA;
        this.AIA = this.QGn(NcV, "setStreamingTimeout", this.AIA, true, 1);
        this.wFG('AIA', "setStreamingTimeout", jCa);
    },
    getStreamingTimeout: function() {
        return this.AIA;
    },
    setFirstPollInterval: function(coM) {
        var jCa = this.LoV;
        this.LoV = this.QGn(coM, "setFirstPollInterval", this.LoV, true, 0);
        this.wFG('LoV', "setFirstPollInterval", jCa);
    },
    getFirstPollInterval: function() {
        return this.LoV;
    }
};
with(Lightstreamer) {
    xFE(Policy, LAh);
}
Lightstreamer.Connection = function() {
    this.ZuF = "/lightstreamer";
    this.Vsc = false;
    this.dSB = location.hostname;
    this.NwC = location.port;
    this.ULo = null;
    this.kNn = "STREAMING_IN_PROGRESS";
    this.glL = null;
    this.rer = null;
    this.bWQ = Lightstreamer.Connection.bWQ;
    this.MrT(Lightstreamer.Connection, arguments[0]);
    this.name = "connection";
};
Lightstreamer.Connection.bWQ = ['ZuF', 'Vsc', 'dSB', 'NwC', 'ULo', 'glL', 'rer', 'kNn'];
Lightstreamer.Connection.prototype = {
    setServerUrlPath: function(vED) {
        var jCa = this.ZuF;
        if (vED) {
            if (vED.indexOf("/") != 0) {
                vED = "/" + vED;
            }
            while (vED.length > 0 && vED.lastIndexOf("/") == vED.length - 1) {
                vED = vED.substring(0, vED.length - 1);
            }
            this.ZuF = vED;
        } else {
            this.ZuF = "/lightstreamer";
        }
        this.wFG('ZuF', "setServerUrlPath", jCa);
    },
    getServerUrlPath: function() {
        return this.ZuF;
    },
    setLSHost: function(iqD) {
        var dBj = this.dSB;
        if (iqD) {
            if (iqD.indexOf("://") > 0) {
                iqD = iqD.substring(iqD.indexOf("://") + 3);
            }
            if (!Lightstreamer.fde(iqD) && arguments[1] !== true) {
                this.koh.rQj(FFT() + " Server hostname inconsistent with the domain set", "setLSHost");
            }
            this.dSB = iqD;
            XHx = iqD;
        } else {
            this.dSB = location.hostname;
            XHx = location.hostname;
        }
        this.wFG('dSB', "setLSHost", dBj);
    },
    getLSHost: function() {
        return this.dSB;
    },
    setLSPort: function(port) {
        var jCa = this.NwC;
        if (port) {
            this.NwC = this.QGn(port, "setLSPort", this.NwC, true, 0);
        } else {
            this.NwC = location.port;
        }
        this.wFG('NwC', "setLSPort", jCa);
    },
    getLSPort: function() {
        return this.NwC;
    },
    setAdapterName: function(ULo) {
        var jCa = this.ULo;
        this.ULo = ULo;
        this.wFG('ULo', "setAdapterName", jCa);
    },
    getAdapterName: function() {
        return this.ULo;
    },
    setStatusBarUrlPortion: function(Emn) {
        var jCa = this.kNn;
        this.kNn = Lightstreamer.rpI("_" + Emn);
        this.wFG('kNn', "setStatusBarUrlPortion", jCa);
    },
    getStatusBarUrlPortion: function() {
        return this.kNn;
    },
    setUserName: function(glL) {
        var jCa = this.glL;
        this.glL = glL;
        this.wFG('glL', "setUserName", jCa);
    },
    setPassword: function(CDM) {
        var jCa = this.rer;
        this.rer = CDM;
        this.wFG('rer', "setPassword", jCa);
    }
};
with(Lightstreamer) {
    xFE(Connection, LAh);
}
Lightstreamer.WDu = function(FMK) {
    this.ppI = false;
    this.wQF = null;
    this.Uep = null;
    this.lEg = Lightstreamer.HPo;
    this.bWQ = Lightstreamer.WDu.bWQ;
    this.MrT(Lightstreamer.WDu, FMK);
    this.name = 'jYS';
};
Lightstreamer.WDu.bWQ = ['ppI', 'wQF', 'Uep', 'lEg'];
with(Lightstreamer) {
    xFE(WDu, LAh);
}
Lightstreamer.mWY = function(Wib, Ndd, stL) {
    this.XQt = stL === true;
    this.Wib = Wib;
    this.xBn = Ndd;
    this.XvF = (this.XQt) ? [] : {
        readId: 0,
        writeId: 0,
        firstId: 0
    };
    this.koh = Lightstreamer.Nhm.getLogger("XS");
    if (!this.XQt) {
        this.AtH = Lightstreamer.mWY.AZN++;
        Lightstreamer.mWY.Lit[this.AtH] = this;
        if (!Lightstreamer.mWY.VNh) {
            Lightstreamer.mWY.VNh = setInterval(Lightstreamer.getClosureForNoParams(Lightstreamer.mWY.sFU, Lightstreamer.mWY), 50);
        }
    }
    this.koh.log('mWY');
};
Lightstreamer.mWY.VNh = null;
Lightstreamer.mWY.Lit = {};
Lightstreamer.mWY.AZN = 0;
Lightstreamer.mWY.sFU = function() {
    for (var UWJ in this.Lit) {
        this.Lit[UWJ].sFU();
    }
};
Lightstreamer.mWY.remove = function(dGm) {
    delete(this.Lit[dGm.AtH]);
};
Lightstreamer.mWY.prototype = {
    gcp: function(PAG, vZM, rvG, Rxh) {
        if (this.XQt) {
            var Cgs = this;
            this.Tph(function() {
                Cgs.vHW(PAG, vZM, rvG, Rxh);
            }, 1);
        } else {
            this.vHW(PAG, vZM, rvG, Rxh);
        }
    },
    vHW: function(PAG, vZM, rvG, Rxh) {
        if (this.XQt) {
            this.XvF.push(new Lightstreamer.mWY.tHh(PAG, vZM, rvG, Rxh));
            this.sFU();
        } else {
            this.Gtm();
            var UMt = this.XvF.writeId;
            this.XvF[UMt] = new Lightstreamer.mWY.tHh(PAG, vZM, rvG, Rxh);
            this.XvF.writeId++;
            this.xQd();
        }
    },
    xQd: function() {
        var Phu = this.XvF.readId;
        for (; this.XvF.firstId < Phu; this.XvF.firstId++) {
            delete(this.XvF[this.XvF.firstId]);
        }
    },
    Gtm: function() {
        if (this.XvF.firstId == this.XvF.readId && this.XvF.firstId == this.XvF.writeId) {
            this.XvF.writeId = 0;
            this.XvF.readId = 0;
            this.XvF.firstId = 0;
            this.XvF = {
                readId: 0,
                writeId: 0,
                firstId: 0
            };
            this.koh.log('Gtm');
        }
    },
    sFU: function() {
        if (this.XQt) {
            while (this.XvF.length > 0) {
                var PAG = this.XvF.shift();
                this.BFD(PAG);
            }
        } else {
            var UMt = this.XvF.readId;
            while (UMt < this.XvF.writeId) {
                var PAG = this.XvF[UMt];
                this.BFD(PAG);
                UMt++;
            }
            this.XvF.readId = UMt;
        }
    },
    BFD: function(PAG) {
        try {
            if (!this.Wib.sht(PAG.vZM, PAG.Rxh)) {
                return;
            }
            if (this.xBn[PAG.PAG]) {
                this.xBn[PAG.PAG](PAG.rvG);
            } else {
                this.koh.UAj('BFD', 3, PAG);
            }
        } catch (VUu) {
            this.koh.KEh(VUu, 'BFD', PAG);
        }
    },
    Tph: function(UFY, ccd) {
        setTimeout(UFY, ccd);
    }
};
Lightstreamer.mWY.tHh = function(PAG, LdZ, TlT, tmf) {
    this.PAG = PAG;
    this.vZM = LdZ;
    this.rvG = TlT;
    this.Rxh = tmf;
};
Lightstreamer.mWY.tHh.prototype.toString = function() {
    return ["[", 'mWY.Event', this.PAG, this.vZM, this.rvG, this.Rxh, "]"].join("|");
};
with(Lightstreamer) {
    Lightstreamer.Nhm = new LogSystem();
    Nhm.uqt.setHistoryDim(5);
    Lightstreamer.bah = Nhm.getLogger("OP");
    Lightstreamer.Chl = Nhm.getLogger("FM");
    Lightstreamer.MmY = Nhm.getLogger("CH");
    Lightstreamer.Ife = Nhm.getLogger("PC");
    Lightstreamer.KvF = Nhm.getLogger("PF");
    Lightstreamer.Jnk = Nhm.getLogger("LC");
    Lightstreamer.OqJ = Nhm.getLogger("M1");
    Lightstreamer.hMc = new Context();
    hMc.setDebugAlertsOnClientError(true);
    hMc.Nhm = Nhm;
}
Lightstreamer.version = "4.4.1396.4";
if (window.OpenAjax) {
    if (OpenAjax.hub) {
        OpenAjax.hub.registerLibrary("Lightstreamer", "http://www.lightstreamer.com/", "4.4");
    } else {
        OpenAjax.registerLibrary("Lightstreamer", "http://www.lightstreamer.com/", "4.4");
        OpenAjax.registerGlobals("Lightstreamer", ["Lightstreamer"]);
    }
}
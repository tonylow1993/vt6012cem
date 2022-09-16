/*
 * LIGHTSTREAMER - www.lightstreamer.com
 * Web Client - lspushpage.js - Version 4 Revision: 24677 $
 * Copyright (c) 2004-2010 Weswit Srl. All Rights Reserved.
 */



if (!window.Lightstreamer) {
    throw ("Warning: lscommons.js not included before lspushpage.js");
}
Lightstreamer.Eku = "506.24326  24589 $";
Lightstreamer.Jnk.log("pushpage", window.name);
Lightstreamer.GroupDescriptor = function() {
    this.koh = Lightstreamer.Nhm.getLogger("TL");
};
Lightstreamer.GroupDescriptor.prototype = {
    prS: function(thw) {
        if (thw == null) {
            return null;
        } else if (thw.peZ) {
            return thw.peZ;
        } else if (thw.UGn) {
            if (this.gTc) {
                return this.gTc[thw.UGn];
            } else {
                return null;
            }
        } else {
            var YPM = Number(thw);
            if (!isNaN(YPM)) {
                return YPM;
            } else {
                if (this.gTc) {
                    thw = thw.toString();
                    return this.gTc[thw];
                } else {
                    return null;
                }
            }
        }
    }
};
Lightstreamer.GroupDescriptor.uVt = function(dTZ) {
    if (dTZ == null) {
        return null;
    } else if (dTZ.FYq) {
        return dTZ;
    } else if (dTZ.mik) {
        return dTZ;
    } else if (dTZ.join && typeof(dTZ.join) == "function") {
        return new Lightstreamer.GroupListDescriptor(dTZ);
    } else {
        return new Lightstreamer.GroupIdDescriptor(dTZ);
    }
};
Lightstreamer.GroupIdDescriptor = function(FYq) {
    this.MrT(Lightstreamer.GroupIdDescriptor);
    this.FYq = String(FYq);
};
Lightstreamer.GroupIdDescriptor.prototype = {
    Zqu: function(peZ) {
        return null;
    },
    ORj: function() {
        return this.FYq;
    },
    getId: function() {
        return this.FYq;
    }
};
Lightstreamer.xFE(Lightstreamer.GroupIdDescriptor, Lightstreamer.GroupDescriptor);
Lightstreamer.GroupListDescriptor = function(nGx) {
    this.MrT(Lightstreamer.GroupListDescriptor);
    this.mik = [].concat(nGx);
    if (typeof(this.mik[0]) != "undefined") {} else {
        Lightstreamer.LCt(this.mik);
    }
    this.gTc = {};
    for (var UWJ = 0; UWJ < this.mik.length; UWJ++) {
        var Vgp = String(this.mik[UWJ]);
        if (!this.amQ(Vgp)) {
            Vgp = "item_name_error";
        }
        this.mik[UWJ] = Vgp;
        this.gTc[Vgp] = Number(UWJ) + 1;
    }
};
Lightstreamer.GroupListDescriptor.prototype = {
    amQ: function(UGn) {
        if (UGn == null || UGn == "") {
            this.koh.rQj("Item names cannot be empty", "GroupListDescriptor");
            return false;
        }
        if (!isNaN(Number(UGn))) {
            this.koh.rQj("Item names cannot be numbers", "GroupListDescriptor");
            return false;
        }
        if (UGn.indexOf("|") != -1 || UGn.indexOf(" ") != -1) {
            this.koh.rQj("Item names should be alphanumeric(" + UGn + ")", "GroupListDescriptor");
            return false;
        }
        return true;
    },
    Zqu: function(peZ) {
        return this.mik[peZ - 1];
    },
    ORj: function() {
        return this.mik.join(" ");
    },
    getList: function() {
        var rLM = [0].concat(this.mik);
        delete rLM[0];
        return rLM;
    }
};
Lightstreamer.xFE(Lightstreamer.GroupListDescriptor, Lightstreamer.GroupDescriptor);
Lightstreamer.SchemaDescriptor = function() {
    this.koh = Lightstreamer.Nhm.getLogger("TL");
};
Lightstreamer.SchemaDescriptor.prototype = {
    nSZ: function(rnA) {
        if (typeof(rnA) == "string") {
            return null;
        } else {
            return rnA;
        }
    },
    jXH: function(rnA) {
        if (typeof(rnA) == "string") {
            return true;
        } else {
            return rnA > this.uSA();
        }
    }
};
Lightstreamer.SchemaDescriptor.QQl = function(dsf) {
    if (dsf == null) {
        return null;
    } else if (dsf.bhT) {
        return dsf;
    } else if (dsf.Xct) {
        return dsf;
    } else if (dsf.join && typeof(dsf.join) == "function") {
        return new Lightstreamer.SchemaListDescriptor(dsf);
    } else {
        return new Lightstreamer.SchemaIdDescriptor(dsf);
    }
};
Lightstreamer.SchemaIdDescriptor = function(bhT) {
    this.MrT(Lightstreamer.SchemaIdDescriptor);
    this.bhT = String(bhT);
    this.MfZ = 0;
};
Lightstreamer.SchemaIdDescriptor.prototype = {
    YiJ: function(NXL) {
        if (NXL == null) {
            return null;
        } else if (NXL.wod) {
            return NXL.wod;
        } else if (NXL.OLb) {
            return Lightstreamer.rpI(NXL.OLb);
        } else {
            var YPM = Number(NXL);
            if (!isNaN(YPM)) {
                return YPM;
            } else {
                return Lightstreamer.rpI(NXL);
            }
        }
    },
    eeM: function(OLb) {
        return null;
    },
    YHx: function(rnA) {
        if (typeof(rnA) == "string") {
            return Lightstreamer.Slp(rnA);
        } else {
            return null;
        }
    },
    OmS: function() {
        return this.bhT;
    },
    IAd: function(size, lfk) {
        if (lfk) {
            if (!this.nMw) {
                this.MfZ += size;
                this.nMw = true;
            }
        } else if (!this.nJZ) {
            this.MfZ += size;
            this.nJZ = size;
        }
    },
    uSA: function() {
        return this.MfZ;
    },
    bKB: function() {
        return this.nJZ;
    },
    uTK: function() {
        return;
    },
    getId: function() {
        return this.bhT;
    }
};
Lightstreamer.xFE(Lightstreamer.SchemaIdDescriptor, Lightstreamer.SchemaDescriptor);
Lightstreamer.SchemaListDescriptor = function(UZc) {
    this.MrT(Lightstreamer.SchemaListDescriptor);
    this.Xct = [].concat(UZc);
    if (typeof(this.Xct[0]) != "undefined") {} else {
        Lightstreamer.LCt(this.Xct);
    }
    this.Prf = null;
    this.gTc = {};
    for (var UWJ = 0; UWJ < this.Xct.length; UWJ++) {
        var Vgp = String(this.Xct[UWJ]);
        if (!this.djB(Vgp)) {
            Vgp = "field_name_error";
        }
        this.Xct[UWJ] = Vgp;
        this.gTc[Vgp] = Number(UWJ) + 1;
    }
};
Lightstreamer.SchemaListDescriptor.prototype = {
    uTK: function(ecq) {
        if (this.Prf == null) {
            this.Prf = [];
            for (var UWJ = 0; UWJ < this.Xct.length; UWJ++) {
                this.Prf[UWJ] = this.Xct[UWJ];
            }
            this.NnY = {};
            for (var UWJ in this.gTc) {
                this.NnY[UWJ] = this.gTc[UWJ];
            }
            for (var UWJ = 0; UWJ < ecq.Xct.length; UWJ++) {
                if (!this.NnY[ecq.Xct[UWJ]]) {
                    var QmA = {};
                    QmA[0] = ecq.Xct[UWJ];
                    QmA[1] = "$" + ecq.Xct[UWJ];
                    QmA.EGm = true;
                    this.Xct[this.Xct.length] = QmA;
                } else {
                    this.Xct[this.Xct.length] = "$" + ecq.Xct[UWJ];
                }
            }
            for (var UWJ = 0; UWJ < this.Xct.length; UWJ++) {
                if (this.Xct[UWJ].EGm) {
                    var Vgp = String(this.Xct[UWJ][0]);
                    if (!this.djB(Vgp)) {
                        Vgp = "field_name_error";
                    }
                    this.Xct[UWJ][0] = Vgp;
                    this.Xct[UWJ][1] = "$" + Vgp;
                    this.gTc[Vgp] = Number(UWJ) + 1;
                    this.gTc["$" + Vgp] = Number(UWJ) + 1;
                } else {
                    var Vgp = String(this.Xct[UWJ]);
                    if (!this.djB(Vgp)) {
                        Vgp = "field_name_error";
                    }
                    this.Xct[UWJ] = Vgp;
                    this.gTc[Vgp] = Number(UWJ) + 1;
                }
            }
        }
    },
    djB: function(OLb) {
        if (OLb == null || OLb == "") {
            this.koh.rQj("Field names cannot be empty", "SchemaListDescriptor");
            return false;
        }
        if (!isNaN(Number(OLb))) {
            this.koh.rQj("Field names cannot be numbers", "SchemaListDescriptor");
            return false;
        }
        if (OLb.indexOf("#") == 0) {
            this.koh.rQj("Names starting with '#' cannot be used for subscribed fields", "SchemaListDescriptor");
            return false;
        }
        if (OLb.indexOf("|") != -1 || OLb.indexOf(" ") != -1) {
            this.koh.rQj("Field names should be alphanumeric(" + OLb + ")", "SchemaListDescriptor");
            return false;
        }
        return true;
    },
    YiJ: function(NXL) {
        if (NXL == null) {
            return null;
        } else if (NXL.wod) {
            return NXL.wod;
        } else if (NXL.OLb) {
            var DJn = this.eeM(NXL.OLb);
            if (DJn != null) {
                return DJn;
            } else {
                return Lightstreamer.rpI(NXL.OLb);
            }
        } else {
            var YPM = Number(NXL);
            if (!isNaN(YPM)) {
                return YPM;
            } else {
                var DJn = this.eeM(NXL);
                if (DJn != null) {
                    return DJn;
                } else {
                    return Lightstreamer.rpI(NXL);
                }
            }
        }
    },
    eeM: function(OLb) {
        return this.gTc[OLb];
    },
    YHx: function(rnA) {
        if (typeof(rnA) == "string") {
            return Lightstreamer.Slp(rnA);
        } else {
            if (this.Xct[rnA - 1] && this.Xct[rnA - 1].EGm) {
                return this.Xct[rnA - 1][0];
            } else {
                return this.Xct[rnA - 1];
            }
        }
    },
    OmS: function() {
        if (this.Prf) {
            return this.Prf.join(" ");
        } else {
            return this.Xct.join(" ");
        }
    },
    IAd: function(size) {
        return;
    },
    uSA: function() {
        return this.Xct.length;
    },
    bKB: function() {
        return this.Prf.length;
    },
    getList: function() {
        if (!this.Prf) {
            var rLM = [0].concat(this.Xct);
            delete rLM[0];
            return rLM;
        } else {
            var rLM = [0].concat(this.Prf);
            delete rLM[0];
            return rLM;
        }
    }
};
Lightstreamer.xFE(Lightstreamer.SchemaListDescriptor, Lightstreamer.SchemaDescriptor);
Lightstreamer.ItemDescriptor = function() {};
Lightstreamer.ItemDescriptor.prototype = {};
Lightstreamer.ItemNameDescriptor = function(UGn) {
    this.MrT(Lightstreamer.ItemNameDescriptor);
    this.UGn = String(UGn);
};
Lightstreamer.ItemNameDescriptor.prototype = {
    toString: function() {
        return this.UGn;
    },
    getName: function() {
        return this.UGn;
    }
};
Lightstreamer.xFE(Lightstreamer.ItemNameDescriptor, Lightstreamer.ItemDescriptor);
Lightstreamer.ItemPositionDescriptor = function(peZ) {
    this.MrT(Lightstreamer.ItemPositionDescriptor);
    this.peZ = Number(peZ);
};
Lightstreamer.ItemPositionDescriptor.prototype = {
    toString: function() {
        return String(this.peZ);
    },
    getPosition: function() {
        return this.peZ;
    }
};
Lightstreamer.xFE(Lightstreamer.ItemPositionDescriptor, Lightstreamer.ItemDescriptor);
Lightstreamer.FieldDescriptor = function() {};
Lightstreamer.FieldDescriptor.prototype = {};
Lightstreamer.FieldNameDescriptor = function(OLb) {
    this.MrT(Lightstreamer.FieldNameDescriptor);
    this.OLb = String(OLb);
};
Lightstreamer.FieldNameDescriptor.prototype = {
    toString: function() {
        return this.OLb;
    },
    getName: function() {
        return this.OLb;
    }
};
Lightstreamer.xFE(Lightstreamer.FieldNameDescriptor, Lightstreamer.FieldDescriptor);
Lightstreamer.FieldPositionDescriptor = function(wod) {
    this.MrT(Lightstreamer.FieldPositionDescriptor);
    this.wod = Number(wod);
};
Lightstreamer.FieldPositionDescriptor.prototype = {
    toString: function() {
        return String(this.wod);
    },
    getPosition: function() {
        return this.wod;
    }
};
Lightstreamer.xFE(Lightstreamer.FieldPositionDescriptor, Lightstreamer.FieldDescriptor);
Lightstreamer.wMk = function(PfX) {
    this.Nkg = PfX;
    var DAa = PfX.nodeName.toLowerCase();
    this.gEZ = (DAa == "input" || DAa == "textarea");
    this.xPH = Lightstreamer.wMk.UMt++;
    this.xri = null;
    this.Squ = null;
    this.neW = 0;
    this.LKu = 0;
};
Lightstreamer.wMk.UMt = 0;
Lightstreamer.wMk.Oxj = function(RUf) {
    var xLh = [];
    for (var UWJ = 0; UWJ < Lightstreamer.KvW.length; UWJ++) {
        var jZP = RUf.getElementsByTagName(Lightstreamer.KvW[UWJ]);
        var lms;
        for (lms = 0; lms < jZP.length; lms++) {
            var CsK = jZP[lms].getAttribute(Lightstreamer.NSU);
            if (CsK && CsK.toUpperCase() == Lightstreamer.tBu) {
                xLh[xLh.length] = new Lightstreamer.wMk(jZP[lms]);
            }
        }
    }
    return xLh;
};
Lightstreamer.wMk.MuS = function(lkQ) {
    var AKx = null;
    var mVk = lkQ;
    while (mVk != null && mVk != document) {
        AKx = mVk;
        mVk = mVk.parentNode;
    }
    if (mVk == null) {
        if (AKx != null && AKx.nodeName == "HTML") {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
};
Lightstreamer.wMk.prototype = {
    MuS: function() {
        return Lightstreamer.wMk.MuS(this.Nkg);
    },
    JxQ: function() {
        if (!this.Nkg.id) {
            return this.MuS(this.Nkg);
        }
        var DpS = document.getElementById(this.Nkg.id);
        return (DpS === this.Nkg);
    },
    xQd: function() {
        if (this.Nkg) {
            delete(this.Nkg);
        }
    }
};
Lightstreamer.pTS({
    cellOverwrite: function(hfw, item, field, ojw, JgC, Hdl, ruS) {
        Lightstreamer.nvO(Lightstreamer.YZa, hfw, item, field, ojw, JgC, Hdl, ruS, "cellOverwrite");
    },
    cellScroll: function(hfw, row, field, ojw, JgC, Hdl, ruS) {
        Lightstreamer.nvO(Lightstreamer.moO, hfw, row, field, ojw, JgC, Hdl, ruS, "cellScroll");
    },
    cellMetapush: function(hfw, row, field, ojw, JgC, Hdl, ruS) {
        Lightstreamer.nvO(Lightstreamer.sxa, hfw, row, field, ojw, JgC, Hdl, ruS, "cellMetapush");
    },
    nvO: function(MEW, hfw, JZe, field, ojw, JgC, Hdl, ruS, FmA) {
        with(Lightstreamer) {
            Ife.log('nvO', arguments);
            var kLZ = rpI(hfw);
            var xkO = field.toString();
            var kbL = JZe;
            if (MEW == YZa) {
                kbL = kbL.toString();
            }
            Hdl = GQi(Hdl, FmA, false);
            if (!iBj.Uno[kLZ]) {
                iBj.Uno[kLZ] = new qcR(MEW, Hdl, false);
            }
            var jaX = iBj.ONa(kLZ);
            jaX.lRb.XKo(JgC, kbL, xkO);
            jaX.VYm.XKo(ojw, kbL, xkO);
            var SnE = iBj.ogI(ojw, JgC, ruS, jaX);
            jaX.paL(SnE, kbL, xkO, MEW);
            iBj.dVp[kLZ] = true;
        }
    }
});
Lightstreamer.pTS({
    Kun: function(RuE) {
        return function() {
            for (var UWJ = 0; UWJ < RuE.length; UWJ++) {
                RuE[UWJ]();
            }
        };
    },
    YVf: new RegExp("^https?:\\/\\/", Lightstreamer.FSY),
    PeJ: function(qwN) {
        var puW;
        if (this.YVf.test(qwN)) {
            return qwN;
        } else {
            puW = location.protocol + "//" + location.hostname;
            if (location.port && !Lightstreamer.woB(location.port, location.protocol)) {
                puW += ":" + location.port;
            }
            if (qwN.indexOf("/") != 0) {
                puW += location.pathname;
                var UTR = puW.lastIndexOf("/");
                if (UTR != puW.length - 1) {
                    puW = puW.substring(0, UTR + 1);
                }
            }
            puW += qwN;
            return puW;
        }
    },
    wnx: new RegExp(","),
    Ouc: new RegExp("\\."),
    Lho: function(rgD, xjP) {
        if (rgD) {
            if (!rgD.replace) {
                return rgD;
            }
            if (xjP) {
                rgD = rgD.replace(this.Ouc, "");
                rgD = rgD.replace(this.wnx, ".");
            } else {
                rgD = rgD.replace(this.wnx, "");
            }
            return new Number(rgD);
        }
        return 0;
    },
    mcJ: function() {
        return Lightstreamer.IHI.toString();
    }
});
Lightstreamer.pTS({
    skh: "&nbsp;",
    NHg: "\u00A0",
    YZa: "H",
    moO: "V",
    nXv: "AV",
    sxa: "X",
    IWH: "Z",
    Ubk: "K",
    BbL: "AX",
    WVE: "AXZ",
    HRa: "M",
    OFa: "O",
    Xtj: "OX",
    BEg: "OXZ",
    Zxk: "A",
    vdB: "A",
    rXJ: "B",
    JUi: "D",
    uIP: "C",
    cPr: 1,
    QWn: 2,
    oOb: 3,
    VGR: 4,
    qOE: 5
});
Lightstreamer.ajv = function() {
    this.Uno = {};
    this.wEw = {};
    this.AYt = {};
    this.XSs = {};
    this.dVp = {};
    this.Ssq = 0;
    this.cuG = false;
    this.fiH = {};
    this.ftl = new Lightstreamer.dcO();
    this.sbJ = Lightstreamer.pic();
    this.Uer = 2000;
    this.lQU = -1;
    this.QFT = {};
    this.mbv = 0;
    this.koh = Lightstreamer.Nhm.getLogger("LC");
    this.Ngo = Lightstreamer.Nhm.getLogger("TL");
    this.koh.log('ajv', "new PageContext");
};
Lightstreamer.ajv.prototype = {
    hXU: function(htW, QHR, vXW) {
        var dWm = "LS_req_phase=";
        if (htW == "add") {
            QHR.sbJ = ++this.sbJ;
        }
        dWm += QHR.sbJ + "&";
        var ZiK = "LS_win_phase=" + vXW + "&";
        var YtA = "LS_op=" + htW + "&";
        if (htW == "add") {
            return ZiK + YtA + dWm + QHR.gtS;
        } else {
            return ZiK + dWm + YtA;
        }
    },
    ONa: function(AtH) {
        if (!this.AYt[AtH]) {
            this.AYt[AtH] = new Lightstreamer.TjY(AtH);
        }
        return this.AYt[AtH];
    },
    TUd: function(HdR, evb) {
        this.koh.YEo('TUd', arguments);
        Lightstreamer.Nhm.getLogger("UP").YEo('TUd', arguments);
        var wUM = HdR[0];
        bjE = this.fiH[wUM];
        var bbg = this.Uno[bjE];
        if (!bbg || bbg.iGx != wUM || bbg.CRk || bbg.Rvt) {
            return true;
        }
        bbg.olH(HdR, evb, false);
        return true;
    },
    ADa: function(CLM) {
        this.lQU++;
        this.QFT[this.lQU] = CLM;
        this.mbv++;
        var dGm = {};
        dGm.GGQ = Lightstreamer.IHI.Pmn;
        dGm.ERe = this.lQU;
        return dGm;
    },
    MKL: function(Hpi, DJn, HNq) {
        if (this.QFT[Hpi]) {
            var CLM = this.QFT[Hpi];
            if (DJn == 1) {
                UnW = "onProcessed";
            } else if (DJn == 38) {
                UnW = "onDiscarded";
            } else if (DJn == 30) {
                UnW = "onAbort";
            } else if (DJn <= 0) {
                UnW = "onDeny";
            } else {
                UnW = "onError";
            }
            try {
                if (DJn <= 0) {
                    CLM.onDeny(DJn, HNq);
                } else {
                    CLM[UnW]();
                }
            } catch (VUu) {
                this.koh.KEh(VUu, UnW);
            }
            delete this.QFT[Hpi];
            this.mbv--;
        }
    },
    eFD: function() {
        var ARQ = {};
        var ERe = 0;
        for (var UWJ = this.lQU; UWJ >= 0; UWJ--) {
            if (ERe == this.mbv) {
                break;
            }
            if (this.QFT[UWJ]) {
                ARQ[ERe] = UWJ;
                ERe++;
            }
        }
        for (var UWJ = 0; UWJ < ERe; UWJ++) {
            this.MKL(ARQ[UWJ], 30, null);
        }
        this.koh.mbQ(this.mbv == 0, 'eFD');
        this.lQU = -1;
        this.QFT = {};
        this.mbv = 0;
    },
    OeQ: function() {
        this.Ngo.log('OeQ', 1);
        for (var WrD in this.Uno) {
            var bjE = this.Uno[WrD];
            if (bjE && !bjE.CRk) {
                this.Vel(bjE);
            }
        }
        this.eFD();
    },
    Vel: function(bjE) {
        if (bjE.Yht === Lightstreamer.Ubk) {
            return;
        }
        var AtH = bjE.VQl;
        this.Ngo.log('Vel', AtH);
        this.wEw[AtH] = bjE;
        Lightstreamer.Esk.JeK(bjE.getId(), bjE.Yoq);
    },
    gIn: function() {
        this.Ngo.log('gIn', 1);
        var mxU = 0;
        this.TAZ = true;
        var JoN = this.wEw;
        this.wEw = {};
        for (var WrD in JoN) {
            if (JoN[WrD]) {
                var mXY = JoN[WrD];
                this.koh.mbQ(!mXY.CRk && !mXY.siM && mXY.qcJ, 'gIn', mXY.CRk, mXY.siM, mXY.qcJ);
                if (Lightstreamer.IHI.RJw) {
                    Lightstreamer.Esk.FET(mXY, mXY.getId());
                    mxU++;
                } else {
                    this.wEw[WrD] = mXY;
                }
            }
        }
        this.TAZ = false;
        this.Ngo.log('gIn', 2, mxU);
    },
    xQd: function() {
        for (var UWJ in this.AYt) {
            this.AYt[UWJ].xQd();
        }
    }
};
Lightstreamer.dcO = function() {
    this.DTQ = {};
    this.EGm = false;
};
Lightstreamer.dcO.prototype = {
    msH: function(PwD) {
        if (PwD && !PwD.CRk && PwD.ghX) {
            this.dqj(PwD.ghX, PwD.eOk);
            delete(PwD.ghX);
            delete(PwD.eOk);
            this.lNt();
        }
    },
    lNt: function() {
        if (!this.EGm) {
            this.EGm = true;
            var Cgs = this;
            setTimeout(function() {
                Cgs.sFU();
            }, 1);
        }
    },
    dqj: function(BHr, ccd) {
        if (!this.DTQ[ccd]) {
            this.DTQ[ccd] = [];
        }
        this.DTQ[ccd].push(BHr);
    },
    sFU: function() {
        for (var ccd in this.DTQ) {
            setTimeout(Lightstreamer.Kun(this.DTQ[ccd]), ccd);
            delete(this.DTQ[ccd]);
        }
        this.EGm = false;
    }
};
Lightstreamer.jZe = function(Gxp) {
    this.bUp = false;
    this.Fjd = false;
    this.ZNx = this.pAm(Gxp);
    this.PPu = 1000;
    this.vvs = false;
    this.koh = Lightstreamer.Nhm.getLogger("LC");
    this.pBZ();
};
Lightstreamer.jZe.prototype = {
    pAm: function(Gxp) {
        var Cgs = this;
        return function() {
            if (Cgs.bUp) {
                return;
            }
            Cgs.Fjd = true;
            if (Gxp && Gxp.length) {
                for (var UWJ = 0; UWJ < Gxp.length; UWJ++) {
                    try {
                        Gxp[UWJ]();
                    } catch (VUu) {
                        this.koh.KEh(VUu, 'ZNx', Gxp[UWJ]);
                    }
                }
            }
            Cgs.Fjd = false;
            Cgs.bUp = true;
        };
    },
    vow: function() {
        return !(this.bUp || this.Fjd);
    },
    pBZ: function() {
        if (document && typeof document.readyState != "undefined") {
            var tCf = document.readyState;
            if (tCf.toUpperCase() == "COMPLETE") {
                this.koh.log('pBZ', 1);
                this.DbY();
                return;
            } else {
                this.koh.log('pBZ', 2);
                setTimeout(this.cAH(), this.PPu);
            }
        } else if (this.vfU()) {
            this.koh.log('pBZ', 3);
            this.DbY();
            return;
        }
        if (typeof window.OpenAjax != "undefined") {
            if (typeof OpenAjax.addOnLoad != "undefined") {
                this.koh.log('pBZ', 4);
                OpenAjax.addOnLoad(this.ZNx, null, "library");
                return;
            }
        }
        var SWW = Lightstreamer.cLp("load", this.ZNx);
        if (!SWW) {
            this.koh.log('pBZ', 5);
            this.DbY();
        } else if (Lightstreamer.KfT()) {
            var LYv = true;
            if (!Lightstreamer.cLp("DOMContentLoaded", this.sUq())) {
                this.koh.log('pBZ', 6);
                LYv = false;
            } else {
                this.koh.log('pBZ', 7, window.opera.version);
                if (Lightstreamer.KfT(7, true)) {
                    return;
                } else if (Lightstreamer.KfT(8, true)) {
                    LYv = false;
                }
            }
            setTimeout(this.ouD(LYv), this.PPu);
        }
    },
    DbY: function() {
        setTimeout(this.ZNx, 1);
    },
    cAH: function() {
        var Cgs = this;
        return function() {
            Cgs.Suh();
        };
    },
    Suh: function() {
        if (!this.bUp) {
            var tCf = document.readyState;
            if (tCf.toUpperCase() == "COMPLETE") {
                this.ZNx();
            } else {
                setTimeout(this.cAH(), this.PPu);
            }
        }
    },
    ouD: function(LYv) {
        var Cgs = this;
        return function() {
            Cgs.qkK(LYv);
        };
    },
    qkK: function(LYv) {
        if (!this.bUp) {
            if (this.wsm || !LYv && this.vfU()) {
                if (Lightstreamer.Esk && Lightstreamer.Esk.kxJ) {
                    this.vvs = true;
                    return;
                }
                this.ZNx();
            } else {
                setTimeout(this.ouD(LYv), this.PPu);
            }
        }
    },
    sUq: function() {
        var Cgs = this;
        return function() {
            Cgs.wsm = true;
        };
    },
    vfU: function() {
        return (typeof document.getElementsByTagName != "undefined" && typeof document.getElementById != "undefined" && (document.getElementsByTagName("body")[0] != null || document.body != null));
    }
};
Lightstreamer.RPk = function() {
    this.biq = false;
    this.PVp = null;
    this.aaJ = 0;
    this.koh = Lightstreamer.Nhm.getLogger("EL");
};
Lightstreamer.RPk.prototype = {
    KFt: function(Vej) {
        this.koh.log('KFt', Lightstreamer.Esk.CvO.jYS, Lightstreamer.Esk.Uep);
        if ((Lightstreamer.Esk.CvO.jYS.Uep || Lightstreamer.Esk.Uep)) {
            if (Lightstreamer.Esk.CvO.jYS.wQF == "S") {
                this.biq = true;
                var RjO = Lightstreamer.AYk();
                if (this.PVp === null || RjO - this.PVp >= 2000) {
                    this.PVp = RjO;
                    var sTL = Lightstreamer.pic();
                    this.koh.log('KFt', 2, sTL);
                    this.aaJ++;
                    setTimeout(Lightstreamer.getClosureForNoParams(this.USn, this), sTL);
                    Lightstreamer.Esk.YEe(Lightstreamer.Esk.VFU, null);
                }
            } else if (Vej) {
                this.koh.log('KFt', 3);
            }
        }
    },
    USn: function() {
        this.aaJ--;
        this.koh.log('USn', 1);
        vWD = Lightstreamer.Esk.Uep ? Lightstreamer.Esk.Uep : Lightstreamer.Esk.CvO.jYS.Uep;
        Lightstreamer.Esk.bpk(Lightstreamer.Esk.VFU, vWD, Lightstreamer.Esk.CvO.jYS.wQF, Lightstreamer.Esk.CvO.jYS.ppI, true);
    },
    SCZ: function() {
        this.biq = false;
    }
};
Lightstreamer.PrK = function() {};
Lightstreamer.PrK.prototype = {
    BoO: function(EGm, wUM) {
        this.koh.YEo('BoO', arguments);
        if (EGm == 6) {
            var Zin = this.Uno[this.fiH[wUM]];
            if (Zin != null && !Zin.CRk && Zin.iGx == wUM) {
                Zin.IXh();
            }
        } else if (EGm == 7) {} else if (EGm == 8) {} else if (EGm == 9) {
            var PwD = this.Uno[this.fiH[wUM]];
            if (PwD && !PwD.CRk && PwD.iGx == wUM) {
                this.ftl.msH(PwD);
            }
        }
    },
    vWN: function(EGm, HNq, wUM) {
        this.koh.YEo('vWN', arguments);
        this.cuG = true;
        var bjE = this.fiH[wUM];
        var bbg = this.Uno[bjE];
        if (!bbg || bbg.CRk || bbg.iGx != wUM) {
            return;
        }
        var Rdg;
        var Uxk;
        var vAa;
        if (bbg.Yht == Lightstreamer.Ubk) {
            Uxk = bbg.YGa;
            vAa = bbg.KWx.FYq;
            bbg = bbg.KiS;
            Rdg = bbg.KWx.Zqu(Uxk);
        }
        if (Lightstreamer.Esk.onServerDeny) {
            try {
                Lightstreamer.Esk.onServerDeny(EGm, HNq, bbg, Uxk, Rdg, vAa);
            } catch (VUu) {
                this.koh.bNN(VUu, Lightstreamer.Esk.onServerDeny, "onServerDeny");
            }
        }
    },
    onLostUpdates: function(HdR) {
        this.koh.YEo("onLostUpdates", arguments);
        var wUM = HdR[0];
        bjE = this.fiH[wUM];
        var DjQ = HdR[1];
        var qNO = HdR[2];
        var bbg = this.Uno[bjE];
        if (!bbg || bbg.CRk || bbg.iGx != wUM) {
            return false;
        }
        var vAa;
        if (bbg.Yht == Lightstreamer.Ubk) {
            vAa = bbg.KWx.FYq;
            DjQ = bbg.YGa;
            bbg = bbg.KiS;
        }
        if (bbg.onLostUpdates) {
            var Vgp = bbg.KWx.Zqu(DjQ);
            try {
                bbg.onLostUpdates(DjQ, qNO, Vgp, vAa);
            } catch (WQB) {
                this.koh.bNN(VUu, bbg.onLostUpdates, "onLostUpdates");
            }
        }
        return true;
    },
    onEndOfSnapshot: function(HdR) {
        this.koh.YEo("onEndOfSnapshot", arguments);
        var wUM = HdR[0];
        bjE = this.fiH[wUM];
        var DjQ = HdR[1];
        var bbg = this.Uno[bjE];
        if (!bbg || bbg.CRk || bbg.iGx != wUM) {
            return false;
        }
        if (bbg.Yht.indexOf(Lightstreamer.BbL) > -1) {
            bbg.YuR = true;
        }
        if (bbg.onEndOfSnapshot) {
            var Vgp = bbg.KWx.Zqu(DjQ);
            try {
                bbg.onEndOfSnapshot(DjQ, Vgp);
            } catch (VUu) {
                this.koh.bNN(VUu, bbg.onEndOfSnapshot, "onEndOfSnapshot");
            }
        }
        return true;
    }
};
Lightstreamer.xFE(Lightstreamer.ajv, Lightstreamer.PrK);
Lightstreamer.VWm = function() {
    this.Opo = new Lightstreamer.WVm(null);
    this.KNQ = {};
    this.EhU = 0;
    this.gmO = false;
    this.ckX = 5000;
    this.BHL = false;
    this.elp = 0;
    this.jkR = 0;
    this.rkH = false;
    this.uPQ = true;
    this.qGp = false;
    this.HDO = -1;
    setInterval(Lightstreamer.getClosureForNoParams(this.vQI, this), 60000);
    this.koh = Lightstreamer.Nhm.getLogger("EP");
};
Lightstreamer.VWm.prototype = {
    sYr: function() {
        if (!Lightstreamer.Esk || Lightstreamer.GKd) {
            return null;
        }
        if (this.Opo.aVI != null) {
            var EBt = this.Opo.MHo(true);
            this.koh.log('sYr', 1, EBt.log);
            if (this.Opo.aVI !== null) {
                return this.Opo.aVI;
            } else {
                return null;
            }
        } else {
            return null;
        }
    },
    fIm: function() {
        var YFQ = null;
        var rhO = Lightstreamer.Esk;
        if (Lightstreamer.iMu() && rhO.bBN) {
            this.Opo.aVI = rhO.YgX;
            this.koh.log('fIm', 1);
        } else if ((this.rkH || rhO.YgX == null) && this.uPQ && !rhO.kxJ) {
            YFQ = this.WsH();
            this.koh.log('fIm', 2, YFQ);
            this.rkH = false;
        } else if (rhO.YgX != null) {
            this.Opo.aVI = rhO.YgX;
            this.koh.log('fIm', 3);
            this.rkH = true;
        } else {
            if (this.EhU == 10) {
                if (!this.gmO) {
                    this.koh.kOV("No way to find the Engine. Please check your configuration", "seekEngine");
                }
            }
            if (this.EhU <= 10) {
                this.EhU++;
            }
            this.koh.log('fIm', 4, this.EhU);
            return null;
        }
        var EBt = this.Opo.MHo(true, !rhO.kxJ);
        this.koh.log('fIm', 5, EBt.log);
        if (this.Opo.aVI != null) {
            this.jkR = 0;
            try {
                this.KNQ[this.Opo.aVI.buS.getEngineFrameName()] = "OK";
                return this.Opo.aVI;
            } catch (VUu) {
                this.koh.log('fIm', 10);
            }
        } else if (rhO.kxJ && Lightstreamer.YbP()) {
            rhO.YgX = self;
        }
        if (Lightstreamer.KfT() && rhO.Ghc() && YFQ && YFQ.log == "null") {
            this.koh.log('fIm', 6);
            rhO.ZrL();
            return null;
        }
        this.jkR++;
        if (this.jkR >= (rhO.kxJ ? 20 : 10)) {
            this.jkR = 0;
            if (Lightstreamer.hiH.biq) {
                this.koh.log('fIm', 7);
                Lightstreamer.hiH.KFt();
            } else if (rhO.Ghc() && this.XtP() && !rhO.kxJ) {
                this.koh.log('fIm', 8);
                rhO.ZrL();
            } else {
                this.koh.log('fIm', 9);
                this.BHL = true;
            }
        }
        return null;
    },
    XtP: function() {
        if (Lightstreamer.mAR(2) && this.nON) {
            this.koh.log('XtP', 1);
            return true;
        } else if (Lightstreamer.KfT()) {
            this.koh.log('XtP', 2);
            return true;
        } else if (Lightstreamer.swf()) {
            this.koh.log('XtP', 3);
            return true;
        }
    },
    WsH: function() {
        var ZuY = this.Www();
        if (!ZuY) {
            this.koh.log('WsH', 1);
            return false;
        }
        var AEQ = ZuY[2];
        var vak = this.Opo.saT(AEQ, Lightstreamer.Esk.kxJ);
        if (vak === false || (!vak.KbK && vak.pmv == false)) {
            this.KNQ[AEQ] = false;
        } else {
            this.KNQ[AEQ] = vak.log ? vak.log : "unknown";
        }
        this.koh.log('WsH', 3, AEQ, vak.log);
        if (ZuY[3] && ZuY[3] != location.host) {
            this.nON = true;
        }
        return vak;
    },
    Www: function() {
        if (!Lightstreamer.Avl) {
            this.koh.log('Www', 1);
            return null;
        }
        var sRY = Lightstreamer.Zsx("LS4_" + Lightstreamer.Esk.VFU);
        if (!sRY) {
            this.koh.log('Www', 2);
            return null;
        }
        for (var UWJ = 0; UWJ < sRY.length; UWJ++) {
            var AuM = Lightstreamer.Zsx("LS4_" + sRY[UWJ] + "_" + Lightstreamer.Esk.VFU);
            if (!AuM || AuM.length <= 2) {
                this.koh.log('Www', 3, sRY[UWJ]);
                continue;
            }
            if (AuM[1] != "S" && !this.qGp) {
                this.koh.log('Www', 5, sRY[UWJ], AuM[1]);
                continue;
            }
            if (this.KNQ[AuM[2]]) {
                this.koh.log('Www', 6, sRY[UWJ], AuM[2]);
                continue;
            }
            var UPb = Lightstreamer.AYk();
            var lvT = UPb - parseInt(AuM[0]);
            if (lvT > (Lightstreamer.jBw)) {
                this.koh.log('Www', 4, sRY[UWJ], lvT);
                continue;
            }
            Lightstreamer.DAE = UPb;
            Lightstreamer.TqL = Lightstreamer.jBw - lvT;
            this.koh.log('Www', 7, sRY[UWJ], lvT, AuM);
            return AuM;
        }
        return null;
    },
    ilK: function() {
        if (this.srd) {
            return;
        }
        this.koh.log('ilK');
        this.srd = setInterval(Lightstreamer.getClosureForNoParams(this.fTT, this), this.ckX);
    },
    Eoh: function() {
        this.koh.log('Eoh');
        clearInterval(this.srd);
        delete(this.srd);
    },
    fTT: function() {
        this.koh.YEo('fTT');
        if (Lightstreamer.IHI.Exk) {
            var buS = this.sYr();
            if (buS === null) {
                this.koh.log('fTT', 1);
                Lightstreamer.IHI.MXx();
                return false;
            }
            this.koh.log('fTT', 2);
            return Lightstreamer.IHI.DTj();
        }
        return false;
    },
    pfX: function(YjH) {
        if (Lightstreamer.bEq.gmO) {
            return;
        }
        if (this.BHL && YjH == this.elp) {
            if (!Lightstreamer.IHI.Exk) {
                var ZeV;
                if (Lightstreamer.Esk.kxJ) {
                    ZeV = "Unable to create the Engine.";
                } else {
                    ZeV = "Unable to find the Engine. ";
                }
                if (Lightstreamer.Esk.Ghc()) {
                    ZeV += "Creating a new Engine.";
                } else {
                    ZeV += "Retrying. If the problem persists, please check your configuration.";
                }
                this.koh.kOV(ZeV, "bind");
                Lightstreamer.Esk.ZrL();
            }
        }
    },
    XSb: function() {
        var Cgs = this;
        this.BHL = false;
        var QQa = new Number(++this.elp);
        setTimeout(function() {
            Cgs.pfX(QQa);
        }, 20000);
    },
    vQI: function() {
        var LiT = document.cookie.toString();
        var nrd = this.KNQ;
        this.KNQ = {};
        for (var kKJ in nrd) {
            if (nrd[kKJ] && LiT.indexOf(kKJ) > -1) {
                this.KNQ[kKJ] = nrd[kKJ];
            }
        }
    },
    ABc: function(GDb) {
        var buS = this.sYr();
        if (buS != null) {
            try {
                buS.document.bgColor = GDb;
                var kQf = buS.document.bgColor;
                return kQf;
            } catch (ZRA) {}
        }
        return null;
    }
};
Lightstreamer.UpdateItemInfo = function() {
    this.koh = Lightstreamer.Nhm.getLogger("IC");
};
Lightstreamer.UpdateItemInfo.prototype = {
    bYX: function(cWF, NwJ, HdR, evb) {
        this.PFk = HdR;
        this.cWF = cWF;
        this.NwJ = NwJ;
        this.evb = evb;
    },
    isValueChanged: function(field) {
        this.koh.log("isValueChanged", arguments);
        var rnA = this.cWF.ePs.YiJ(field);
        return this.CNV(rnA, this.cWF.ePs.jXH(rnA));
    },
    CNV: function(rnA, JUL) {
        if (!JUL) {
            if (this.PFk[rnA + 1] == null) {
                return true;
            } else {
                return (this.PFk[rnA + 1].length > -1);
            }
        } else if (this.cWF.gNt.hSR(this.NwJ)) {
            var eTf = "";
            if (this.cWF.gNt.whl(this.NwJ, rnA)) {
                eTf = rnA;
            } else if (this.cWF.gNt.whl(this.NwJ, rnA + "|rem")) {
                eTf = rnA + "|rem";
            }
            if (eTf != "") {
                if (this.cWF.gNt.whl(this.NwJ, eTf) != this.cWF.dkA.whl(this.NwJ, rnA)) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        if (this.cWF.dkA.whl(this.NwJ, rnA)) {
            return true;
        } else {
            return false;
        }
    },
    isSnapshot: function() {
        this.koh.log("isSnapshot", arguments);
        return this.evb;
    },
    getNewValue: function(field) {
        this.koh.log("getNewValue", arguments);
        var rnA = this.cWF.ePs.YiJ(field);
        var JUL = this.cWF.ePs.jXH(rnA);
        if (this.CNV(rnA, JUL)) {
            if (!JUL) {
                return this.PFk[rnA + 1];
            } else {
                if (!this.cWF.gNt.hSR(this.NwJ)) {
                    return null;
                }
                var chK = this.cWF.gNt.whl(this.NwJ, rnA);
                var GwJ = (chK) ? chK : this.cWF.gNt.whl(this.NwJ, rnA + "|rem");
                if (!GwJ) {
                    return null;
                } else {
                    return GwJ;
                }
            }
        } else {
            return this.nWA(rnA);
        }
    },
    getOldValue: function(field) {
        this.koh.log("getOldValue", arguments);
        var rnA = this.cWF.ePs.YiJ(field);
        return this.nWA(rnA);
    },
    nWA: function(rnA) {
        return this.cWF.dkA.whl(this.NwJ, rnA);
    },
    getNumFields: function() {
        if (this.cWF.aKj && this.cWF.aKj.uSA() == 0) {
            return null;
        }
        return this.cWF.ePs.uSA();
    },
    addField: function(field, value, RSA) {
        this.koh.log("addField", arguments);
        if (typeof RSA == "undefined") {
            RSA = true;
        }
        var rnA = this.cWF.ePs.YiJ(field);
        if (!this.cWF.ePs.jXH(rnA)) {
            var vqE = this.getNumFields(false);
            this.koh.bvA("addField() method can only add fields that are not part of the subscription schema. Please use a value greater than " + vqE, "addField");
            return;
        }
        if (RSA) {
            this.cWF.gNt.XKo(value, this.NwJ, rnA + "|rem");
        } else {
            this.cWF.gNt.XKo(value, this.NwJ, rnA);
            this.cWF.gNt.XlD(this.NwJ, rnA + "|rem");
        }
    }
};
Lightstreamer.VisualUpdateInfo = function() {
    this.qMo = null;
    this.vwW = 1200;
    this.gbW = 0;
    this.iKV = 0;
    this.koh = Lightstreamer.Nhm.getLogger("IC");
};
Lightstreamer.VisualUpdateInfo.prototype = {
    QGn: Lightstreamer.qVQ,
    bYX: function(cWF, NwJ, HdR, Cgx) {
        this.PFk = HdR;
        this.Cgx = Cgx;
        this.cWF = cWF;
        this.NwJ = NwJ;
        this.ERe = NwJ;
        this.vwW = 1200;
        this.gbW = 0;
        this.iKV = 0;
    },
    getFormattedValue: function(field) {
        var rnA = this.cWF.ePs.YiJ(field);
        var bKd = this.cWF.JST.whl(this.NwJ, rnA);
        return bKd;
    },
    setFormattedValue: function(field, value) {
        var rnA = this.cWF.ePs.YiJ(field);
        this.cWF.JST.XKo(value, this.NwJ, rnA);
    },
    getServerValue: function(field) {
        var rnA = this.cWF.ePs.YiJ(field);
        if (this.Cgx) {
            if (typeof(rnA) == "number") {
                return this.PFk[rnA + 1];
            } else {
                return this.PFk[rnA];
            }
        } else if (!this.cWF.ePs.jXH(rnA)) {
            if (this.PFk[rnA + 1] == null || this.PFk[rnA + 1].length > -1) {
                return this.PFk[rnA + 1];
            }
        }
        return this.cWF.dkA.whl(this.NwJ, rnA);
    },
    setHotTime: function(rgD) {
        this.vwW = this.QGn(rgD, "setHotTime", 1200, true, 0);
    },
    setColdToHotTime: function(rgD) {
        if (this.cWF.Yht != Lightstreamer.moO && this.cWF.Yht != Lightstreamer.sxa) {
            this.gbW = this.QGn(rgD, "setColdToHotTime", 0, true, 0);
        } else {
            this.gbW = 0;
        }
    },
    setHotToColdTime: function(rgD) {
        if (this.cWF.Yht != Lightstreamer.moO && this.cWF.Yht != Lightstreamer.sxa) {
            this.iKV = this.QGn(rgD, "setHotToColdTime", 0, true, 0);
        } else {
            this.iKV = 0;
        }
    },
    Fcw: function(rnA, ecD, AOs, MEW) {
        this.koh.log('Fcw', arguments);
        var xkO = this.cWF.rbJ[rnA];
        if (xkO == null) {
            return;
        }
        var QJB = this.cWF.oEa.KeC(this.qMo, xkO);
        if (QJB == null) {
            return;
        }
        ecD = (ecD) ? ecD : "";
        AOs = (AOs) ? AOs : "";
        if (QJB.xri == null) {
            QJB.xri = {};
            QJB.Squ = {};
        }
        QJB.xri[MEW] = ecD;
        QJB.Squ[MEW] = AOs;
    },
    setRowAttribute: function(ecD, AOs, OYl) {
        this.SLB(ecD, AOs, OYl);
    },
    setRowStyle: function(uXM, gbM) {
        this.SLB(uXM, gbM, "CLASS");
    },
    setAttribute: function(field, ecD, AOs, OYl) {
        var rnA = this.cWF.ePs.YiJ(field);
        this.Fcw(rnA, ecD, AOs, OYl);
        if (this.cWF.Yht == Lightstreamer.moO || this.cWF.Yht == Lightstreamer.sxa) {
            var jaX = this.cWF.oEa;
            var xkO = this.cWF.rbJ[rnA];
            if (xkO == null) {
                return;
            }
            var suH = jaX.NhG.whl(this.qMo, xkO);
            if (!suH) {
                suH = {};
                jaX.NhG.XKo(suH, this.qMo, xkO);
            }
            suH[OYl] = 1;
        }
    },
    setStyle: function(field, uXM, gbM) {
        var rnA = this.cWF.ePs.YiJ(field);
        this.Fcw(rnA, uXM, gbM, "CLASS");
    },
    SLB: function(ecD, AOs, MEW) {
        var VQl = this.qMo;
        ecD = (ecD) ? ecD : "";
        AOs = (AOs) ? AOs : "";
        var VbM = this.cWF.oEa;
        VbM.JtQ.XKo(ecD, VQl, MEW);
        VbM.aJF.XKo(AOs, VQl, MEW);
        if (this.cWF.Yht == Lightstreamer.moO || this.cWF.Yht == Lightstreamer.sxa) {
            if (MEW != "CLASS") {
                if (!VbM.xSh.whl(VQl, MEW)) {
                    VbM.xSh.XKo(1, VQl, MEW);
                }
            }
        }
    }
};
Lightstreamer.RowInfo = function() {};
Lightstreamer.RowInfo.prototype = {
    bYX: function(bbg, NwJ, CkT) {
        this.cWF = bbg;
        this.NwJ = NwJ;
        if (CkT) {
            this.CkT = CkT;
        } else {
            this.CkT = this.cWF.WFd[NwJ];
        }
    },
    getServerValue: function(field) {
        var cgK = field;
        var jaX = this.cWF.oEa;
        var rnA = this.cWF.ePs.YiJ(cgK);
        var xkO = this.cWF.rbJ[rnA];
        if (xkO == null) {
            return null;
        }
        var Qtc = jaX.IOd.whl(this.CkT, xkO);
        if (!Qtc) {
            return null;
        }
        return Qtc;
    },
    getCellValue: function(field) {
        var cgK = field;
        var jaX = this.cWF.oEa;
        var rnA = this.cWF.ePs.YiJ(cgK);
        var xkO = this.cWF.rbJ[rnA];
        if (xkO == null) {
            return null;
        }
        var gtj = jaX.aut.whl(this.CkT, xkO);
        if (gtj === null) {
            return jaX.VYm.whl(this.CkT, xkO);
        }
        return gtj;
    },
    getNumFields: function() {
        this.koh.bvA("Not implemented", "getNumFields");
        return 0;
    }
};
Lightstreamer.lFd = function() {};
Lightstreamer.lFd.prototype = {
    ogI: function(rgD, Rvm, ruS) {
        var ehh = "Lightstreamer|temp|id";
        var Gft = 0;
        while (document.getElementById(ehh) && Gft < 100) {
            ehh += Lightstreamer.pic();
            Gft++;
        }
        if (Rvm) {
            document.write("<" + ruS + " id='" + ehh + "' class='" + Rvm + "'>" + rgD + "</" + ruS + ">");
        } else {
            document.write("<" + ruS + " id='" + ehh + "'>" + rgD + "</" + ruS + ">");
        }
        var ikE = document.getElementById(ehh);
        ikE.removeAttribute("id");
        return new Lightstreamer.wMk(ikE);
    },
    qwR: function(AtH) {
        var GZm = this.ONa(AtH).dNE();
        for (var qMo in GZm) {
            var EGo = GZm[qMo];
            var DpS = false;
            for (var cgK in EGo) {
                var AKx;
                var mVk = EGo[cgK];
                var ibP = mVk.JxQ();
                if (ibP) {
                    DpS = true;
                } else {
                    delete EGo[cgK];
                }
            }
            if (!DpS) {
                delete GZm[qMo];
            }
        }
    },
    cWi: function(bjE, NwJ, ROh, ERe, fJT, QTK, NPw) {
        var Cgs = this;
        return function() {
            Cgs.SUA(bjE, NwJ, ROh, ERe, fJT, QTK, NPw);
        };
    },
    Bft: function(bjE, ROh, ERe, fJT, Cil, AEH) {
        var Cgs = this;
        return function() {
            Cgs.wuc(bjE, ROh, ERe, fJT, Cil, AEH);
        };
    },
    UiC: function(Tpa, HgK) {
        if (Tpa["CLASS"]) {
            return Tpa;
        } else {
            for (var MEW in HgK) {
                if (!Tpa[MEW]) {
                    Tpa[MEW] = HgK[MEW];
                }
            }
            return Tpa;
        }
    },
    SUA: function(bjE, NwJ, ROh, ERe, cgK, QTK, NPw) {
        if (Lightstreamer.GKd) {
            return;
        }
        var bbg = this.Uno[bjE];
        var nmf = bbg.oEa;
        if (!bbg || bbg.CRk) {
            return;
        }
        if (NPw != bbg.NPw) {
            return;
        }
        if ((bbg.Yht == Lightstreamer.moO || bbg.Yht == Lightstreamer.sxa) && bbg && bbg.WFd) {
            ROh = bbg.WFd[ERe];
        }
        var rgD = null;
        var qMo = ROh;
        var xkO = bbg.rbJ[cgK];
        if (xkO == null) {
            return;
        }
        if (bbg.Yht == Lightstreamer.nXv) {
            var QJB = nmf.KeC(qMo, xkO);
            if (QJB) {
                rgD = QJB.Iqd;
                QJB.Iqd = null;
            }
        }
        var dww = false;
        if (rgD == null) {
            var eDH = bbg.JST.whl(NwJ, cgK);
            if (eDH == null) {
                if (!QTK) {
                    return false;
                } else {
                    rgD = nmf.VYm.whl(ROh, xkO);
                    dww = true;
                }
            } else {
                rgD = eDH;
            }
        }
        bbg.Lec.XlD(NwJ, cgK);
        var YoV = rgD;
        if (YoV == "") {
            YoV = Lightstreamer.NHg;
        }
        var nSe = nmf.ofN.hSR(ROh);
        this.FMP(bjE, qMo, xkO, YoV, Lightstreamer.vdB, nSe, dww);
        return true;
    },
    FMP: function(bjE, ROh, xkO, rgD, EfA, uNm, Ygr) {
        if (Lightstreamer.GKd) {
            return;
        }
        var nmf = this.ONa(bjE);
        var FKf = Ygr ? true : nmf.FKf;
        var QJB = nmf.KeC(ROh, xkO);
        if (QJB == null) {
            return true;
        }
        var weO = null;
        var clr = null;
        if (EfA == Lightstreamer.vdB) {
            weO = QJB.ufs;
            QJB.ufs = null;
        } else if (EfA == Lightstreamer.rXJ || EfA == Lightstreamer.JUi) {
            weO = QJB.CsV;
            QJB.CsV = null;
            QJB.ufs = null;
        }
        if (EfA == Lightstreamer.JUi) {
            var apj = nmf.lRb.whl(ROh, xkO);
            if (weO == null && apj) {
                weO = {};
                weO["CLASS"] = apj;
            } else if (apj) {
                weO["CLASS"] = apj;
            }
        }
        if (weO != null) {
            weO = this.UiC(weO, uNm);
        } else if (uNm) {
            weO = uNm;
        }
        if (weO != null) {
            if (typeof weO["CLASS"] != "undefined") {
                clr = weO["CLASS"];
            }
        }
        if (QJB.gEZ) {
            QJB.Nkg.value = rgD;
        } else if (FKf) {
            QJB.Nkg.innerHTML = rgD;
        } else {
            if (QJB.Nkg.childNodes.length != 1 || QJB.Nkg.firstChild.nodeType != 3) {
                if (QJB.Nkg.firstChild != null) {
                    QJB.Nkg.innerHTML = "";
                }
                QJB.Nkg.appendChild(document.createTextNode(rgD));
            } else {
                QJB.Nkg.firstChild.nodeValue = rgD;
            }
        }
        if (clr != null && QJB.Nkg.className != clr) {
            QJB.Nkg.className = clr;
        }
        for (var OYl in weO) {
            if (OYl == "CLASS") {
                continue;
            }
            QJB.Nkg.style[OYl] = weO[OYl];
        }
        return true;
    },
    wuc: function(bjE, ROh, ERe, xkO, Cil, neW) {
        if (Lightstreamer.GKd) {
            return;
        }
        var dMk = this.ONa(bjE);
        var bbg = this.Uno[bjE];
        if ((bbg.Yht == Lightstreamer.moO || bbg.Yht == Lightstreamer.sxa) && bbg && bbg.WFd) {
            ROh = bbg.WFd[ERe];
        }
        var QJB = dMk.KeC(ROh, xkO);
        if (QJB == null) {
            return;
        }
        if (QJB.neW != neW) {
            return;
        }
        var uNm = null;
        if (Cil) {
            uNm = dMk.ofN.hSR(ROh);
        } else {
            uNm = dMk.JFJ.hSR(ROh);
        }
        var weO = null;
        var clr = null;
        if (Cil) {
            weO = QJB.ufs;
            QJB.ufs = null;
        } else {
            weO = QJB.CsV;
            QJB.CsV = null;
        }
        if (weO != null) {
            weO = this.UiC(weO, uNm);
        } else if (uNm) {
            weO = uNm;
        }
        if (weO != null) {
            if (typeof weO["CLASS"] != "undefined") {
                clr = weO["CLASS"];
            }
        } else {
            return true;
        }
        if (clr != null && QJB.Nkg.className != clr) {
            QJB.Nkg.className = clr;
        }
        for (var OYl in weO) {
            QJB.Nkg.style[OYl] = weO[OYl];
        }
        return true;
    }
};
Lightstreamer.xFE(Lightstreamer.ajv, Lightstreamer.lFd);
Lightstreamer.YpO = function(QJB, kSO, VBs, OMk, TJI, YjH, muJ) {
    this.bYX(QJB, kSO, VBs, OMk, TJI, YjH, muJ);
};
Lightstreamer.YpO.prototype = {
    bYX: function(QJB, kSO, VBs, OMk, TJI, YjH, muJ) {
        this.muJ = (muJ) ? muJ : null;
        this.kSO = kSO;
        this.QJB = QJB;
        this.VBs = (VBs) ? Lightstreamer.HSm.Zcx(VBs) : null;
        this.OMk = (OMk) ? Lightstreamer.HSm.Zcx(OMk) : null;
        this.TJI = TJI;
        this.YjH = YjH;
        this.tbB = 0;
    }
};
Lightstreamer.Uil = function() {
    this.length = 0;
    this.HaB = {};
};
Lightstreamer.Uil.prototype = {
    VrF: function(AtH) {
        this.HaB[this.length] = AtH;
        this.length++;
    },
    whl: function() {
        if (this.length <= 0) {
            return null;
        }
        this.length--;
        return this.HaB[this.length];
    }
};
Lightstreamer.XAD = function(VNh) {
    this.PTQ = VNh;
    this.xQg = new Lightstreamer.Uil();
    this.ipN = 0;
    this.HKH = {};
    this.RgI = false;
    this.ACG = {};
};
Lightstreamer.XAD.prototype = {
    lda: function(QJB, kSO, VBs, OMk, boD, muJ) {
        var TJI = this.DBW(boD);
        var QZN = ++QJB.LKu;
        var wBC = this.xQg.whl();
        if (wBC == null) {
            this.HKH[this.ipN] = new Lightstreamer.YpO(QJB, kSO, VBs, OMk, TJI, QZN, muJ);
            return this.ipN++;
        } else {
            this.HKH[wBC].bYX(QJB, kSO, VBs, OMk, TJI, QZN, muJ);
            return wBC;
        }
    },
    DBW: function(vfX) {
        var TJI = vfX / this.PTQ;
        return (TJI > 1) ? TJI : 1;
    },
    NmA: function(AtH) {
        if (Lightstreamer.GKd) {
            return;
        }
        var ipR = this.HKH[AtH];
        if (ipR.YjH < ipR.QJB.LKu) {
            return;
        }
        var cso = this.ACG[ipR.QJB.xPH];
        var sXF = this.HKH[cso];
        if (sXF) {
            if (!sXF.kSO) {
                if (ipR.kSO) {
                    if (sXF.muJ != null) {
                        sXF.muJ();
                    }
                } else {
                    ipR.tbB = sXF.tbB;
                    if (ipR.TJI < sXF.TJI) {
                        ipR.TJI = sXF.TJI;
                    }
                }
            }
            this.xQg.VrF(cso);
        }
        this.ACG[ipR.QJB.xPH] = AtH;
        if (ipR.VBs) {
            ipR.unP = Lightstreamer.HSm.fOF(ipR.QJB.Nkg, "backgroundColor");
        }
        if (ipR.OMk) {
            ipR.leD = Lightstreamer.HSm.fOF(ipR.QJB.Nkg, "color");
        }
        if (!this.RgI) {
            this.axb(this.PTQ);
        }
    },
    RSC: function(QJB) {
        var cso = this.ACG[QJB.xPH];
        if (cso) {
            delete(this.ACG[QJB.xPH]);
            this.xQg.VrF(cso);
        }
    },
    LUa: function(PKP) {
        if (Lightstreamer.GKd) {
            return;
        }
        var ajJ = new Date().getTime();
        var IGZ = 0;
        if (PKP) {
            IGZ = ajJ - (PKP + this.PTQ);
        }
        var fsq = false;
        var mBT = [];
        for (var oKC in this.ACG) {
            var iYf = this.ACG[oKC];
            var ipR = this.HKH[iYf];
            if (ipR.tbB > ipR.TJI) {
                this.xQg.VrF(iYf);
                delete(this.ACG[oKC]);
                if (ipR.muJ != null) {
                    mBT.push(ipR.muJ);
                }
            } else {
                if (ipR.VBs) {
                    ipR.QJB.Nkg.style.backgroundColor = "rgb(" + this.sHT(ipR.unP[0], ipR.VBs[0], ipR.TJI, ipR.tbB) + "," + this.sHT(ipR.unP[1], ipR.VBs[1], ipR.TJI, ipR.tbB) + "," + this.sHT(ipR.unP[2], ipR.VBs[2], ipR.TJI, ipR.tbB) + ")";
                }
                if (ipR.OMk) {
                    ipR.QJB.Nkg.style.color = "rgb(" + this.sHT(ipR.leD[0], ipR.OMk[0], ipR.TJI, ipR.tbB) + "," + this.sHT(ipR.leD[1], ipR.OMk[1], ipR.TJI, ipR.tbB) + "," + this.sHT(ipR.leD[2], ipR.OMk[2], ipR.TJI, ipR.tbB) + ")";
                }
                fsq = true;
            }
            ipR.tbB++;
        }
        if (mBT.length > 0) {
            setTimeout(Lightstreamer.Kun(mBT), 1);
        }
        if (!fsq) {
            this.RgI = false;
        } else {
            var Gkb = new Date().getTime();
            var tLd = (Gkb - ajJ);
            var xuj = tLd + IGZ;
            if (xuj > this.PTQ) {
                var wEg = xuj / this.PTQ;
                var nTQ = Math.floor(wEg);
                var dec = wEg - nTQ;
                this.Lnr(nTQ);
                xuj = this.PTQ * dec;
            }
            this.Yie(this.PTQ - xuj, Gkb);
        }
    },
    Yie: function(xfV, PKP) {
        var Cgs = this;
        setTimeout(function() {
            Cgs.LUa(PKP);
        }, xfV);
    },
    Lnr: function(nTQ) {
        for (var oKC in this.ACG) {
            var iYf = this.ACG[oKC];
            var ipR = this.HKH[iYf];
            if (ipR.tbB > ipR.TJI) {} else if (ipR.tbB + nTQ < ipR.TJI) {
                ipR.tbB += nTQ;
            } else {
                ipR.tbB = ipR.TJI;
            }
        }
    },
    axb: function(ccd) {
        if (this.RgI == true) {
            return;
        }
        this.RgI = true;
        this.Yie(ccd);
    },
    sHT: function(Dvh, lJV, ZYo, jni) {
        Dvh = new Number(Dvh);
        lJV = new Number(lJV);
        var RxT = lJV - Dvh;
        var MVP = Dvh + (((1 / ZYo) * jni) * RxT);
        return Math.ceil(MVP);
    },
    eZo: function(NFJ) {
        var Cgs = this;
        return function() {
            Cgs.NmA(NFJ);
        };
    }
};
Lightstreamer.nQG = function(beV, bgColor, GIP, fZv, muJ) {
    var lNp;
    if (typeof muJ == "string") {
        lNp = function() {
            eval(muJ);
        };
    } else {
        lNp = muJ;
    }
    var SnE = new Lightstreamer.wMk(beV);
    var NFJ = Lightstreamer.onw.lda(SnE, false, bgColor, GIP, fZv, lNp);
    Lightstreamer.onw.NmA(NFJ);
};
Lightstreamer.IPq = function() {
    this.PGc = {};
    this.koh = Lightstreamer.Nhm.getLogger("ER");
};
Lightstreamer.IPq.prototype = {
    cqL: function(CsK) {
        if ((CsK >= 0) && (CsK <= 9)) {
            return new Number(CsK);
        }
        CsK = CsK.toUpperCase();
        if (CsK == "A") {
            return 10;
        } else if (CsK == "B") {
            return 11;
        } else if (CsK == "C") {
            return 12;
        } else if (CsK == "D") {
            return 13;
        } else if (CsK == "E") {
            return 14;
        } else if (CsK == "F") {
            return 15;
        } else {
            this.koh.rQj("A hexadecimal number must contain numbers between 0 and 9 and letters between A and F. " + CsK + " is not a valid value", "setStyle");
            return null;
        }
    },
    Zcx: function(rgD) {
        if (rgD.indexOf("rgb") == 0) {
            return this.SWN(rgD);
        } else if (rgD.indexOf("#") == 0) {
            return this.kXZ(rgD);
        } else {
            return this.JqQ(rgD);
        }
    },
    KeW: function(TDJ) {
        var vak = 0;
        var DFa = 0;
        var UWJ;
        for (UWJ = TDJ.length; UWJ >= 1; UWJ--) {
            var Onj = this.cqL(TDJ.substring(UWJ - 1, UWJ));
            if (Onj == null) {
                return null;
            }
            var x;
            for (x = 1; x <= DFa; x++) {
                Onj *= 16;
            }
            DFa++;
            vak += Onj;
        }
        return vak;
    },
    kXZ: function(pcu) {
        if (pcu.indexOf("#") == 0) {
            pcu = pcu.substring(1, pcu.length);
        }
        if (pcu.length != 6) {
            this.koh.rQj("A hexadecimal color value must be 6 character long. " + pcu + " is not a valid color", "setStyle");
            return null;
        }
        var Yrx = pcu.substring(0, 2);
        var TLm = pcu.substring(2, 4);
        var qVR = pcu.substring(4, 6);
        KNu = this.KeW(Yrx);
        AKl = this.KeW(TLm);
        Gqq = this.KeW(qVR);
        if (KNu == null || AKl == null || Gqq == null) {
            return null;
        }
        return [KNu, AKl, Gqq];
    },
    Jab: function(GDb) {
        var bTR = document.createElement("DIV");
        bTR.style.backgroundColor = GDb;
        var rgD = this.fOF(bTR, "backgroundColor", GDb);
        if (rgD[0] == 255 && rgD[1] == 255 && rgD[2] == 255) {
            if (GDb.toUpperCase() != "WHITE") {
                var cZQ = document.getElementsByTagName("BODY")[0];
                if (cZQ) {
                    cZQ.appendChild(bTR);
                    rgD = this.fOF(bTR, "backgroundColor", GDb);
                    cZQ.removeChild(bTR);
                }
            }
        }
        this.PGc[GDb] = rgD;
        return this.PGc[GDb];
    },
    JqQ: function(GDb) {
        var vak = "";
        if (this.PGc[GDb]) {
            return this.PGc[GDb];
        }
        if (!Lightstreamer.iMu()) {
            return this.Jab(GDb);
        } else {
            vak = Lightstreamer.bEq.ABc(GDb);
        }
        if (!vak || vak == "" || vak == GDb) {
            var Ygj = document.bgColor;
            document.bgColor = GDb;
            vak = document.bgColor;
            document.bgColor = Ygj;
        }
        if (!vak || vak == "" || vak == GDb) {
            return this.Jab(GDb);
        }
        this.PGc[GDb] = this.kXZ(vak);
        return this.PGc[GDb];
    },
    SWN: function(uIF) {
        var XXv;
        var mjL;
        if (uIF.indexOf("rgb(") == 0) {
            XXv = 4;
            mjL = ")";
        } else if (uIF.indexOf("rgba(") == 0) {
            XXv = 5;
            mjL = ",";
        } else {
            this.koh.rQj("An RGB color value must be in the form 'rgb(x, y, z)' or 'rgba(x, y, z, a)'. " + uIF + " is not a valid value", "setStyle");
            return null;
        }
        uIF = uIF.substring(XXv, uIF.length);
        var hWW = uIF.indexOf(",");
        var KNu = uIF.substring(0, hWW);
        var WWx = uIF.indexOf(",", hWW + 1);
        var AKl = uIF.substring(hWW + 1, WWx);
        var aqs = uIF.indexOf(mjL, WWx + 1);
        var Gqq = uIF.substring(WWx + 1, aqs);
        return [KNu, AKl, Gqq];
    },
    fOF: function(bTR, wmP, cgs) {
        if (bTR == null) {
            return [255, 255, 255];
        }
        var rgD = "";
        try {
            if (window.getComputedStyle || (document.defaultView && document.defaultView.getComputedStyle)) {
                var BDk = document.defaultView.getComputedStyle(bTR, null);
                if (BDk) {
                    var nsE = wmP == "backgroundColor" ? "background-color" : wmP;
                    rgD = BDk.getPropertyValue(nsE);
                }
            }
        } catch (VUu) {}
        try {
            if (!this.GLu(rgD, cgs) && bTR.currentStyle) {
                var rwn = wmP == "background-color" ? "backgroundColor" : wmP;
                rgD = bTR.currentStyle[rwn];
            }
        } catch (VUu) {}
        try {
            if (!this.GLu(rgD, cgs)) {
                var JJa = wmP == "background-color" ? "backgroundColor" : wmP;
                if (bTR.style[JJa] != "") {
                    rgD = bTR.style[JJa];
                } else {
                    return [255, 255, 255];
                }
            }
        } catch (VUu) {}
        if (rgD == "transparent" && bTR.parentNode) {
            return this.fOF(bTR.parentNode, wmP);
        } else if (rgD == "transparent") {
            return [255, 255, 255];
        }
        if (!this.GLu(rgD, cgs)) {
            return [255, 255, 255];
        }
        return this.Zcx(rgD);
    },
    GLu: function(PUF, cgs) {
        if (!PUF || PUF == "") {
            return false;
        } else if (!cgs) {
            return true;
        } else if (PUF != cgs) {
            return true;
        } else {
            return false;
        }
    }
};
Lightstreamer.Rnj = function() {};
Lightstreamer.Rnj.prototype = {
    bYX: function() {
        this.length = 0;
        this.rpC = {};
        if (!this.MKw) {
            this.KhO = {};
        }
    }
};
Lightstreamer.mJe = function(bLi, Qpa, CAR) {
    this.MrT(Lightstreamer.mJe);
    this.wgJ = bLi;
    this.UHT = Qpa;
    this.iWB = CAR;
    this.MKw = true;
    this.bYX();
};
Lightstreamer.mJe.prototype = {
    removeChild: function(bLi) {
        if (this.length <= 0) {
            return;
        }
        this.length--;
        delete(this.rpC[bLi.AtH]);
        this.wgJ.removeChild(bLi.Rht());
        bLi.parentNode = null;
    },
    insertBefore: function(PNv, bLi) {
        if (bLi == PNv) {
            return;
        }
        if (!PNv) {
            return;
        }
        if (!bLi) {
            this.appendChild(PNv);
            return;
        }
        if (this.rpC[bLi.AtH] == null) {
            this.appendChild(PNv);
            return;
        }
        this.QUw(PNv);
        this.wgJ.insertBefore(PNv.Rht(), bLi.Rht());
    },
    appendChild: function(bLi) {
        if (!bLi) {
            return;
        }
        this.QUw(bLi);
        if (!this.UHT) {
            this.wgJ.appendChild(bLi.Rht());
        } else {
            this.wgJ.insertBefore(bLi.Rht(), this.UHT);
        }
    },
    QUw: function(bLi) {
        if (bLi.parentNode == this) {
            return;
        }
        this.length++;
        this.rpC[bLi.AtH] = bLi;
        if (bLi.parentNode) {
            bLi.parentNode.removeChild(bLi);
        }
        bLi.parentNode = this;
    },
    kMD: function(VQl) {
        if (this.length <= VQl) {
            return null;
        }
        VQl += this.iWB;
        var lTn = this.wgJ.childNodes[VQl].getAttribute("id");
        return this.getElementById(lTn);
    },
    getElementById: function(AtH) {
        return this.rpC[AtH];
    },
    xQd: function() {
        if (this.wgJ) {
            delete(this.wgJ);
        }
        if (this.UHT) {
            delete(this.UHT);
        }
        for (var UWJ in this.rpC) {
            this.rpC[UWJ].xQd();
        }
    }
};
Lightstreamer.xFE(Lightstreamer.mJe, Lightstreamer.Rnj);
Lightstreamer.Xli = function() {
    this.MrT(Lightstreamer.Xli);
    this.MKw = false;
    this.bYX();
};
Lightstreamer.Xli.prototype = {
    removeChild: function(bLi) {
        if (this.length <= 0) {
            return;
        }
        this.length--;
        var VQl = this.rpC[bLi.AtH];
        var hIm;
        for (hIm = VQl; hIm < this.length; hIm++) {
            this.KhO[hIm] = this.KhO[hIm + 1];
            this.rpC[this.KhO[hIm].AtH] = hIm;
        }
        this.rpC[bLi.AtH] = null;
        this.KhO[this.length] = null;
        bLi.parentNode = null;
    },
    insertBefore: function(PNv, bLi) {
        if (bLi == PNv) {
            return;
        }
        if (!PNv) {
            return;
        }
        if (!bLi) {
            this.appendChild(PNv);
            return;
        }
        if (this.rpC[bLi.AtH] == null) {
            this.appendChild(PNv);
            return;
        }
        if (PNv.parentNode) {
            PNv.parentNode.removeChild(PNv);
        }
        var ZMq = this.rpC[bLi.AtH];
        for (hIm = this.length; hIm >= ZMq + 1; hIm--) {
            this.KhO[hIm] = this.KhO[hIm - 1];
            this.rpC[this.KhO[hIm].AtH] = hIm;
        }
        this.QUw(PNv, ZMq);
    },
    appendChild: function(bLi) {
        if (!bLi) {
            return;
        }
        if (bLi.parentNode) {
            bLi.parentNode.removeChild(bLi);
        }
        var VQl = this.length;
        this.QUw(bLi, VQl);
    },
    QUw: function(bLi, VQl) {
        this.length++;
        this.rpC[bLi.AtH] = VQl;
        this.KhO[VQl] = bLi;
        bLi.parentNode = this;
        bLi.HWK();
    },
    kMD: function(VQl) {
        return this.KhO[VQl];
    },
    getElementById: function(AtH) {
        return this.KhO[this.rpC[AtH]];
    },
    xQd: function() {
        for (var UWJ in this.KhO) {
            this.KhO[UWJ].xQd();
        }
    }
};
Lightstreamer.xFE(Lightstreamer.Xli, Lightstreamer.Rnj);
Lightstreamer.fcr = function(WiH, PIZ, jBY, keyCode) {
    this.AtH = "a|" + WiH + "|" + jBY;
    this.bjE = WiH;
    this.NwJ = jBY;
    this.keyCode = keyCode;
    this.DjQ = PIZ;
    this.parentNode = null;
    this.bLi = null;
};
Lightstreamer.fcr.prototype = {
    HWK: function() {
        if (this.bLi == null) {
            return;
        }
    },
    Rht: function() {
        if (this.bLi != null) {
            return this.bLi;
        }
        var jaX = Lightstreamer.iBj.ONa(this.bjE);
        this.bLi = jaX.gpE.cloneNode(true);
        this.bLi.setAttribute("id", this.AtH);
        var xLh = Lightstreamer.wMk.Oxj(this.bLi);
        for (var hIm = 0; hIm < xLh.length; hIm++) {
            var mVk = xLh[hIm];
            var IaS = mVk.Nkg.getAttribute("FIELD");
            if (!IaS) {
                continue;
            }
            jaX.paL(mVk, this.NwJ, IaS, jaX.Yht);
        }
        return this.bLi;
    },
    xQd: function() {
        if (this.bLi) {
            delete(this.bLi);
        }
    }
};
Lightstreamer.JeV = function(scU, connection, context, policy, jYS) {
    this.FMK = scU;
    this.dLm = "The LightstreamerEngine instance is not available";
    this.WrB = null;
    this.BiE = null;
    this.SkJ = null;
    this.onStatusChange;
    this.onServerError;
    this.onClientError;
    this.onClientAlert;
    this.context = new Lightstreamer.Context(context);
    this.context.parent = this;
    this.policy = new Lightstreamer.Policy(policy);
    this.policy.parent = this;
    this.connection = new Lightstreamer.Connection(connection);
    this.connection.parent = this;
    this.jYS = new Lightstreamer.WDu(jYS);
    this.jYS.parent = this;
    this.koh = Lightstreamer.Nhm.getLogger("EH");
};
Lightstreamer.JeV.prototype = {
    HZj: function(hhC) {
        if (Lightstreamer.IHI.Exk) {
            return true;
        } else {
            this.koh.bvA(this.dLm, hhC);
            return false;
        }
    },
    WOQ: function(hhC) {
        if (this.HZj(hhC)) {
            try {
                return this.FMK[hhC]();
            } catch (VUu) {
                this.koh.KEh(VUu, hhC);
                this.koh.rQj(this.dLm, hhC);
                setTimeout(Lightstreamer.getClosureForNoParams(Lightstreamer.IHI.DTj, Lightstreamer.IHI), 1);
            }
        }
        return null;
    },
    Bvt: function(aKo) {
        this.SkJ = aKo;
    },
    ZXY: function(WrB, BiE) {
        this.WrB = WrB;
        this.BiE = BiE;
    },
    changeStatus: function(Enb) {
        var giV = Lightstreamer;
        if (!(Enb == giV.mTT || Enb == giV.HPo || Enb == giV.RXc)) {
            this.koh.bvA("Please use one of: POLLING, STREAMING, DISCONNECTED", "changeStatus");
            return;
        }
        if (this.HZj("changeStatus")) {
            this.koh.log("changeStatus", Enb);
            Lightstreamer.IHI.TsT('VKd', Enb);
        }
    },
    lhf: function() {
        this.changeStatus(Lightstreamer.mTT);
    },
    UrU: function() {
        this.changeStatus(Lightstreamer.HPo);
    },
    HcQ: function() {
        this.changeStatus(Lightstreamer.RXc);
    },
    getStatus: function() {
        if (this.HZj("getStatus")) {
            return this.SkJ;
        } else {
            return null;
        }
    },
    getApplicationName: function() {
        if (this.HZj("getApplicationName")) {
            return Lightstreamer.Esk.VFU;
        } else {
            return null;
        }
    },
    getSessionServerName: function() {
        if (this.HZj("getSessionServerName")) {
            return this.WrB;
        } else {
            return null;
        }
    },
    getSessionServerAddress: function() {
        if (this.HZj("getSessionServerAddress")) {
            return this.BiE;
        } else {
            return null;
        }
    },
    getPushPages: function() {
        var pages = this.WOQ("getPushPages");
        if (pages == null) {
            return [];
        }
    },
    sendMessage: function(HNq, iPn, CLM, ccd) {
        if (this.HZj("sendMessage")) {
            if (CLM) {
                CLM = Lightstreamer.iBj.ADa(CLM);
            }
            if (!Lightstreamer.IHI.RJw) {
                return false;
            }
            if (!iPn && iPn != 0) {
                iPn = "";
            } else if (!Lightstreamer.tAd.test(iPn)) {
                this.koh.bvA("The given sequence name(" + iPn + ") is not valid: use only alphanumeric characters or null", "sendMessage");
                return false;
            }
            if ((ccd && isNaN(ccd)) || ccd == "") {
                this.koh.bvA("The given timeout(" + ccd + ") is not valid: use a number or null", "sendMessage");
                return false;
            }
            Lightstreamer.IHI.tdr('sAl', {
                HNq: HNq,
                iPn: iPn,
                CLM: CLM,
                ccd: ccd
            });
            return true;
        }
        return false;
    },
    GlA: function() {
        if (this.HZj('GlA')) {
            Lightstreamer.IHI.OCk('GlA');
        }
    }
};
Lightstreamer.Cfh = function(EvT, kBC) {
    this.kBC = kBC;
    this.EvT = EvT;
    Lightstreamer.cLp("unload", Lightstreamer.getClosureForNoParams(this.Lux, this));
};
Lightstreamer.Cfh.prototype = {
    Lux: function() {
        try {
            this.EvT.removeChild(this.kBC);
            delete(Cgs.kBC);
            delete(Cgs.EvT);
        } catch (VUu) {}
    }
};
Lightstreamer.Sem = function() {
    this.LJa = null;
    this.Xfu = false;
    this.bnk = null;
    this.IBA = 0;
    this.IAc = 0;
    this.koh = Lightstreamer.Nhm.getLogger("EW");
};
Lightstreamer.Sem.prototype = {
    HSW: function(usH, xRp, YjH) {
        if (this.IAc != YjH) {
            this.koh.log('HSW', 0);
            return;
        }
        var bpq = false;
        var nBP = null;
        if (Lightstreamer.IHI.Exk) {
            this.koh.log('HSW', 1);
            return;
        }
        if (!usH) {
            this.koh.log('HSW', 5);
            return;
        }
        this.IBA++;
        bpq = !this.SLo(usH);
        if (!bpq) {
            if (usH.Lightstreamer.bEq) {
                nBP = usH.Lightstreamer.bEq;
            } else {
                if (usH.kGl) {
                    nBP = usH.kGl;
                } else {
                    this.koh.log('HSW', 6);
                    bpq = true;
                }
            }
        }
        if (!bpq) {
            if (!nBP) {
                this.koh.log('HSW', 8);
                bpq = true;
            }
            if (!nBP.sYr) {
                this.koh.log('HSW', 7);
            } else {
                if (nBP.gmO == true) {
                    Lightstreamer.bEq.uPQ = false;
                    Lightstreamer.bEq.gmO = true;
                    if (Lightstreamer.bEq.sYr() == null) {
                        this.koh.kOV("This Push-page can't receive real-time data because the corresponding engine could not start");
                    } else {
                        this.koh.mbQ(false, 'HSW');
                    }
                    this.koh.log('HSW', 4);
                    return;
                }
                var Fcs = nBP.sYr();
                if (Fcs == null) {
                    this.koh.log('HSW', 2);
                    bpq = true;
                } else {
                    this.koh.log('HSW', 3);
                    xRp.YgX = Fcs;
                    Lightstreamer.bEq.rkH = false;
                }
            }
        }
        if (bpq) {
            setTimeout(this.oHs(usH, xRp, YjH), this.IBA <= 30 ? 1000 : 10000);
        }
    },
    rTM: function(usH, xRp) {
        this.IAc++;
        this.IBA = 0;
        this.HSW(usH, xRp, this.IAc);
    },
    oHs: function(usH, xRp, YjH) {
        var Cgs = this;
        return function() {
            Cgs.HSW(usH, xRp, YjH);
        };
    },
    SLo: function(usH) {
        try {
            if (usH.Lightstreamer) {}
            this.koh.log('SLo', 0);
            return true;
        } catch (VUu) {
            this.koh.KEh(VUu, 'SLo', document.domain);
            return false;
        }
    },
    ASr: function() {
        if (Lightstreamer.CAh.vfU()) {
            return true;
        }
        if (Lightstreamer.abV() && (document.readyState.toUpperCase() == "LOADING" || document.readyState.toUpperCase() == "UNINITIALIZED")) {
            return true;
        }
        if (Lightstreamer.KfT(7, true) && (document.readyState.toUpperCase() == "LOADING" || document.readyState.toUpperCase() == "UNINITIALIZED" || document.readyState.toUpperCase() == "INTERACTIVE")) {
            return true;
        }
        return false;
    },
    YxA: function() {
        var BHC = Lightstreamer.pic();
        this.LJa = "LS__" + BHC;
        this.koh.log('YxA', this.LJa);
    },
    Ucv: function() {
        if (this.bnk !== null) {
            this.koh.log('Ucv', this.bnk);
            return this.bnk;
        }
        this.bnk = false;
        if (Lightstreamer.abV()) {
            this.koh.log('Ucv', 1);
            this.bnk = true;
        } else if (window.opera) {
            if (Lightstreamer.KfT(7, true)) {
                this.koh.log('Ucv', 2);
                this.bnk = true;
            } else {
                if (Lightstreamer.KfT(7.9, true)) {
                    this.koh.log('Ucv', 3);
                    this.bnk = true;
                } else {
                    this.koh.log('Ucv', 4);
                }
            }
        } else if (Lightstreamer.YbP()) {
            this.bnk = true;
            this.koh.log('Ucv', 5);
            return true;
        }
        this.koh.log('Ucv', 6, this.bnk);
        return this.bnk;
    },
    vZl: function() {
        if (!this.Xfu && this.Ucv() && Lightstreamer.CAh.vow()) {
            this.koh.log('vZl', 1);
            this.YxA();
            this.wmk();
            return true;
        }
        this.koh.log('vZl', 2);
        return false;
    },
    wmk: function() {
        this.koh.log('wmk', 1);
        document.writeln("<iframe src='about:blank' name='" + this.LJa + "' style='visibility:hidden;height:1px;'></iframe>");
        this.Xfu = true;
    },
    SVM: function() {
        if (!document.getElementsByTagName) {
            return false;
        }
        if (this.Xfu) {
            this.koh.log('SVM', 7);
            return false;
        }
        var XHm = Lightstreamer.KfT(9, false) ? Lightstreamer.Esk.Uep + Lightstreamer.iaM : "about:blank";
        this.koh.log('SVM', 6, XHm);
        this.YxA();
        var lYj = document.getElementsByTagName("BODY")[0];
        if (!lYj) {
            this.koh.rQj("The createEngine() method should be called in the BODY part of the page, not in the HEAD", "createEngine");
            return false;
        }
        var kBC;
        try {
            kBC = document.createElement("iframe");
            kBC.style.visibility = "hidden";
            kBC.style.height = "0px";
            kBC.style.width = "0px";
            kBC.name = this.LJa;
            if (Lightstreamer.iMu()) {
                kBC.src = Lightstreamer.Esk.lvf;
                lYj.appendChild(kBC);
            } else {
                lYj.appendChild(kBC);
                kBC.src = Lightstreamer.Esk.lvf;
            }
            this.Xfu = new Lightstreamer.Cfh(lYj, kBC);
        } catch (VUu) {
            this.koh.KEh(VUu, 'SVM', 5);
            return null;
        }
        try {
            if (kBC.contentWindow) {
                this.koh.log('SVM', 1);
                kBC.contentWindow.name = this.LJa;
                return kBC.contentWindow;
            } else if (document.frames && document.frames[this.LJa]) {
                this.koh.log('SVM', 2);
                return document.frames[this.LJa];
            } else {
                this.koh.log('SVM', 3);
                return self;
            }
        } catch (VUu) {
            this.koh.KEh(VUu, 'SVM', 4);
            return self;
        }
    }
};
Lightstreamer.PushPage = function() {
    this.context = Lightstreamer.hMc;
    this.CvO = null;
    this.mwM = window;
    this.BXL = 2000;
    this.Uep = null;
    this.wQF = null;
    this.ppI = false;
    this.FxW = 0;
    this.kGl = Lightstreamer.bEq;
    this.ENa = 0;
    this.oZH = Lightstreamer.EBG;
    this.LWr = true;
    this.wwi = 0;
    this.kxJ = false;
    this.YYl = 0;
    this.bBN = false;
    this.INQ = null;
    this.mAU = 0;
    this.HrL = "The application name is missing";
    this.qCN = "createEngine() has already been called";
    this.bLo = true;
    this.lvf = null;
    this.VFU = null;
    this.YgX = null;
    this.iBj = Lightstreamer.iBj;
    this.sgj = null;
    this.sWe = null;
    this.koh = Lightstreamer.Nhm.getLogger("PP");
    this.Ngo = Lightstreamer.Nhm.getLogger("TL");
};
Lightstreamer.PushPage.prototype = {
    QGn: Lightstreamer.qVQ,
    isMasterPushPage: function() {
        return Lightstreamer.IHI.Tfl;
    },
    onEngineLost: function() {
        return;
    },
    setCheckEngineTimeout: function(ckX) {
        this.kGl.ckX = this.QGn(ckX, "setCheckEngineTimeout", ckX, true, 1);
    },
    setControlRequestTimeout: function(ccd) {
        this.iBj.Uer = this.QGn(ccd, "setControlRequestTimeout", this.iBj.Uer, true, 1);
    },
    useFragmentToConfEngine: function(sLA) {
        this.bLo = sLA !== false;
    },
    getTable: function(id) {
        var AtH = Lightstreamer.rpI(id);
        var bjE = this.iBj.Uno[AtH];
        if (bjE) {
            if (bjE.CRk) {
                if (this.iBj.wEw[AtH] && !this.iBj.wEw[AtH].CRk) {
                    bjE = this.iBj.wEw[AtH];
                }
            }
            if (bjE && bjE.Yht !== Lightstreamer.Ubk) {
                return bjE;
            }
        }
        return null;
    },
    getTables: function() {
        var KhO = {};
        for (var id in this.iBj.Uno) {
            var snB = this.iBj.Uno[id];
            if (!snB.CRk && snB.Yht !== Lightstreamer.Ubk) {
                KhO[snB.getId()] = snB;
            }
        }
        for (var id in this.iBj.wEw) {
            var snB = this.iBj.wEw[id];
            if (snB && !snB.CRk && snB.Yht !== Lightstreamer.Ubk) {
                KhO[snB.getId()] = snB;
            }
        }
        return KhO;
    },
    FET: function(CqT, id, vfI) {
        if (CqT.iEV || (CqT.qcJ != null && CqT.qcJ != id)) {
            this.koh.rQj("Can't add a table that is already in 'running' state. Please add the table instance only once [" + id + "]", "addTable");
            return null;
        }
        if (Lightstreamer.Esk == null) {
            this.koh.rQj("Can't add a table if PushPage is not bound. Please call the bind() method of PushPage before adding tables", "addTable");
            return null;
        }
        if (CqT.htW != "COMMAND" && CqT.htW != "MERGE" && CqT.htW != "DISTINCT" && CqT.htW != "RAW") {
            this.koh.rQj(CqT.htW + " is not a valid subscription mode. Admitted values are MERGE, DISTINCT, RAW, COMMAND", "addTable");
            return null;
        }
        var AtH = Lightstreamer.rpI(id);
        this.Ngo.log('FET', 0, CqT, AtH);
        var ooo = true;
        var BRg = this.iBj.Uno[AtH];
        if (BRg) {
            ooo = BRg.vjv;
            BRg = this.JeK(id, ooo);
            this.Ngo.log('FET', 1, CqT.iYx);
            var Evv = this.iBj.Uno[AtH];
            CqT.vuU(Evv);
        }
        if (!CqT.vCT(AtH)) {
            this.Ngo.log('FET', 11);
            return null;
        }
        this.iBj.Uno[AtH] = CqT;
        if (!CqT.CRk && vfI) {
            var Qkp = CqT.iSl(id);
            if (!Qkp) {
                this.Ngo.log('FET', 10);
                return null;
            }
        }
        CqT.LKi(id, ++this.ENa);
        if (CqT.iYx && !ooo) {
            CqT.cTY();
        }
        CqT.TLh();
        this.Ngo.log('FET', 4, Lightstreamer.IHI);
        this.Rgr(CqT);
        if (!BRg || BRg.CRk) {
            BRg = null;
        }
        return BRg;
    },
    Rgr: function(CqT, blW, ZPv) {
        if (CqT.CRk) {
            return;
        }
        var DWI = Lightstreamer.IHI;
        if ((blW && blW != DWI.epx) || !CqT.iEV) {
            this.Ngo.log('Rgr', 1, CqT.iEV, CqT.ghX, blW, DWI);
            if (CqT.ghX) {
                CqT.WmG(blW);
            }
            return;
        }
        var pTe = Lightstreamer.iBj;
        if (CqT.iDe || !DWI.RJw) {
            this.Ngo.mbQ(!pTe.TAZ, 'Rgr', 1);
            this.Ngo.log('Rgr', 2, CqT.iDe, DWI.RJw);
            if (!DWI.RJw) {
                pTe.Vel(CqT);
            }
            return;
        }
        var XKs = ZPv ? ZPv * 2 : pTe.Uer;
        var eZr = {
            CqT: CqT,
            hfw: CqT.VQl,
            GGQ: DWI.Pmn,
            NeB: ZPv && ZPv > pTe.Uer
        };
        CqT.ghX = Lightstreamer.getClosureFor(this.Rgr, this)(CqT, DWI.epx, XKs);
        CqT.eOk = XKs;
        if (!CqT.hml || !ZPv) {
            if (ZPv && !CqT.hml) {
                this.Ngo.mbQ(false, 'Rgr', 2);
            }
            CqT.hml = pTe.hXU("add", CqT, DWI.epx);
            CqT.rxQ = DWI.epx;
            eZr.pNo = pTe.hXU("delete", CqT, DWI.epx);
            this.Ngo.log('Rgr', 3);
        }
        eZr.vvR = CqT.hml;
        if (!ZPv) {
            CqT.iGx = null;
            CqT.wtX++;
            this.Ngo.log('Rgr', 4, CqT.wtX);
        } else {
            eZr.AXl = CqT.iGx;
            this.Ngo.log('Rgr', 5, CqT.iGx);
        }
        eZr.FXT = CqT.wtX;
        DWI.Ehb('YSs', eZr);
    },
    iIZ: function(CqT, hfw, AXl, FXT) {
        var Ojg = Lightstreamer.iBj.Uno[hfw];
        if (!Ojg || Ojg != CqT) {
            this.Ngo.log('iIZ', 1);
            return;
        }
        this.Ngo.log('iIZ', 2, hfw, AXl, Ojg.wtX, FXT);
        if (FXT != Ojg.wtX) {
            return;
        }
        Ojg.iGx = AXl;
        Lightstreamer.iBj.fiH[AXl] = hfw;
        this.Rgr(Ojg, Lightstreamer.IHI.epx, Lightstreamer.iBj.Uer / 2);
    },
    XAc: function(FMX) {
        this.Ngo.log('XAc', FMX);
        AtH = Lightstreamer.rpI(FMX);
        if (!this.iBj.XSs[AtH]) {
            this.koh.rQj("No such ScreenTableHelper to be deleted: " + FMX, 'XAc');
            return;
        }
        delete(this.iBj.XSs[AtH]);
    },
    JeK: function(id, kJI) {
        var AtH = Lightstreamer.rpI(id);
        var bbg = this.iBj.Uno[AtH];
        this.Ngo.log('JeK', 1, AtH, kJI);
        if (bbg) {
            var DWI = Lightstreamer.IHI;
            if (!bbg.CRk && DWI.Exk) {
                bbg.wtX++;
                if (bbg.iGx || bbg.iGx === 0) {
                    this.Ngo.log('JeK', 2, bbg.iGx);
                    Lightstreamer.IHI.Ehb('GoW', {
                        AXl: bbg.iGx
                    });
                } else {
                    this.Ngo.log('JeK', 3, AtH);
                    Lightstreamer.IHI.Ehb('GoW', {
                        hfw: AtH,
                        GGQ: DWI.Pmn
                    });
                }
            }
            var OAA = false;
            if (bbg.CRk) {
                if (this.iBj.wEw[AtH]) {
                    this.Ngo.log('JeK', 4, AtH);
                    bbg = this.iBj.wEw[AtH];
                    OAA = true;
                    bbg.iEV = true;
                }
            }
            if (kJI) {
                bbg.cTY();
            }
            var Evv = new Lightstreamer.qcR(bbg.Yht, bbg.FKf, bbg.vjv);
            Evv.vuU = bbg.vuU;
            Evv.vuU(bbg);
            bbg.kBd();
            if (OAA) {
                delete(this.iBj.wEw[AtH]);
            }
            var BRg = bbg;
            this.iBj.Uno[AtH] = Evv;
            return (BRg.CRk) ? null : BRg;
        } else {
            return null;
        }
    },
    onServerDeny: function(code, message, PwD, RMc, mwZ, UUC) {
        alert("Subscription Error.\n" + message + "(code " + code + ").");
    },
    onClientError: function(XaD) {
        return;
    },
    onClientAlert: function(code, XaD) {
        setTimeout(function() {
            alert("Warning " + code + "\n" + XaD);
        }, 10);
    },
    createEngine: function(applicationName, qwN, KCr, ppI) {
        if (this.IlZ) {
            this.koh.bvA(this.qCN, "createEngine");
            return;
        }
        if (!applicationName) {
            this.koh.bvA(this.HrL, "createEngine");
            return;
        } else if (!Lightstreamer.tAd.test(applicationName)) {
            this.koh.bvA("The given engine name(" + applicationName + ") is not valid: use only alphanumeric characters", "createEngine");
            return;
        } else if (!qwN) {
            this.koh.bvA("Cannot load the Engine without a path", "createEngine");
            return;
        } else if (Lightstreamer.Esk == null) {
            this.koh.bvA("Can't create the Engine if PushPage is not bound. Please call the bind() method of PushPage before", "createEngine");
            return;
        } else if (Lightstreamer.Esk != this) {
            this.koh.bvA("There should be only one instance of PushPage per each HTML page. Can't create the Engine if a different PushPage is bound. Please call the createEngine() of that PushPage", "createEngine");
            return;
        } else if (KCr != "SHARE_SESSION" && KCr != "FAIL" && KCr != "NEW_SESSION") {
            if (typeof KCr != "undefined") {
                this.koh.bvA("onSimilarEngineFound must be one of: SHARE_SESSION, FAIL, NEW_SESSION.", "createEngine");
                return;
            }
            KCr = "NEW_SESSION";
        }
        KCr = KCr.substr(0, 1);
        this.IlZ = true;
        this.bpk(applicationName, qwN, KCr, ppI, false);
    },
    bpk: function(applicationName, qwN, KCr, ppI, Oji) {
        this.kGl.uPQ = KCr == "S";
        this.VFU = applicationName;
        if (qwN.charAt(qwN.length - 1) != "/") {
            qwN += "/";
        }
        this.Uep = qwN;
        this.wQF = KCr;
        this.ppI = (ppI === true);
        qwN += "lsengine.html";
        this.koh.log('bpk', Lightstreamer.Avl, KCr);
        if (Lightstreamer.Avl && KCr != "N") {
            var vak;
            if ((vak = this.RIc(KCr, applicationName)) != false) {
                this.koh.log('bpk', 1, applicationName, KCr);
                this.bca(applicationName, qwN, KCr, vak, Oji, this.ppI);
                this.YEe(this.VFU, null);
                return false;
            }
        }
        this.koh.log('bpk', 0, applicationName, KCr);
        this.BmZ(qwN, applicationName, Oji, this.ppI, KCr);
        return true;
    },
    RIc: function(AMh, applicationName, NFL) {
        var IeX = {};
        IeX.kUa = 0;
        var fRT = false;
        var IxU = Lightstreamer.AYk();
        var sRY = Lightstreamer.Zsx("LS4_" + applicationName);
        if (!sRY) {
            this.koh.log('RIc', 1);
            return false;
        }
        for (var UWJ = 0; UWJ < sRY.length; UWJ++) {
            var AuM = Lightstreamer.Zsx("LS4_" + sRY[UWJ] + "_" + applicationName);
            this.koh.log('RIc', 2, sRY[UWJ], AuM);
            if (!AuM || AuM.length < 2) {
                this.mlm(sRY[UWJ], applicationName);
                continue;
            } else if (AMh == "S" && AuM[1] != "S") {
                continue;
            }
            if (NFL && NFL[sRY[UWJ]]) {
                if (AuM[0] != NFL[sRY[UWJ]]) {
                    this.koh.log('RIc', 3, AuM[0], NFL[sRY[UWJ]]);
                    return true;
                }
                this.koh.log('RIc', 4);
                continue;
            }
            var YQi = Number(AuM[0]) + Lightstreamer.jBw + 2000;
            var Vpn = YQi - IxU;
            this.koh.log('RIc', 5, sRY[UWJ], Vpn);
            if (Vpn <= -60000) {
                this.mlm(sRY[UWJ], applicationName);
                continue;
            }
            if (Vpn < this.BXL) {
                Vpn = this.BXL;
            }
            IeX[sRY[UWJ]] = AuM[0];
            fRT = true;
            IeX.kUa = IeX.kUa > Vpn ? IeX.kUa : Vpn;
        }
        if (fRT) {
            this.koh.log('RIc', 6, IeX);
            return IeX;
        } else {
            this.koh.log('RIc', 7);
            return false;
        }
    },
    mlm: function(id, kPx) {
        Lightstreamer.CxS("LS4_" + id + "_" + kPx);
        Lightstreamer.Plj("LS4_" + kPx, id);
    },
    SIU: function() {
        if (this.kxJ) {
            this.mlm(this.sgj, this.VFU);
        }
    },
    ovo: function(YNj) {
        var YUL = Lightstreamer.hpc("LS4_" + this.VFU, this.sgj);
        if (YNj && !YUL) {
            return false;
        }
        var JXl = Lightstreamer.Zsx("LS4_" + this.sgj + "_" + this.VFU);
        if (YNj && JXl) {
            return false;
        } else if (JXl && JXl.length > 2) {
            this.koh.log('ovo', 1, JXl);
            this.xYs();
        } else {
            Lightstreamer.YrL("LS4_" + this.sgj + "_" + this.VFU, [Lightstreamer.AYk(), this.wQF]);
        }
        return true;
    },
    eOq: function() {
        var Cgs = this;
        this.sWe = setInterval(function() {
            Cgs.ovo();
        }, Lightstreamer.jBw);
    },
    xYs: function() {
        if (this.sWe) {
            clearInterval(this.sWe);
            this.sWe = null;
        }
    },
    BmZ: function(LFc, VFU, Oji, ppI, KCr) {
        var DWI = Lightstreamer.IHI;
        if (DWI.Exk) {
            return;
        } else if (DWI.xKL) {
            this.koh.log('BmZ', 2);
            setTimeout(Lightstreamer.getClosureFor(this.BmZ, this)(LFc, VFU, Oji, ppI, KCr), DWI.wMO);
            return;
        }
        this.WVq();
        this.sgj = Lightstreamer.pic();
        this.kGl.gmO = false;
        if (Lightstreamer.Avl) {
            while (!this.ovo(true)) {
                this.sgj = Lightstreamer.pic();
            }
            this.eOq();
        }
        var UeI = "?";
        UeI += "build=1396.4";
        if (this.bLo) {
            UeI += "#";
        } else {
            UeI += "&";
        }
        UeI += "id=" + this.sgj + "&";
        if (Lightstreamer.oRU != null && Lightstreamer.oRU != "") {
            UeI += ("domain=" + Lightstreamer.oRU + "&");
        }
        if (VFU) {
            UeI += ("engineName=" + VFU + "&");
        }
        if (ppI) {
            UeI += "suppressDefaultStatusChangeHandler=true&";
        }
        if (Oji && this.CvO) {
            if (!this.CvO.context.eZS) {
                UeI += ("debugAlerts=false&");
            }
            if (!this.CvO.context.OrO) {
                UeI += ("remoteDebug=false&");
            }
        } else {
            if (!this.context.eZS) {
                UeI += ("debugAlerts=false&");
            }
            if (!this.context.OrO) {
                UeI += ("remoteDebug=false&");
            }
        }
        if (Lightstreamer.ObjectTree) {
            UeI += ("d=true&");
        }
        this.lvf = LFc + UeI;
        this.YgX = self;
        this.kxJ = true;
        this.YYl = 0;
        this.wwi++;
        DWI.bYX(true);
        this.koh.log('BmZ', 1, this.wwi);
        this.RKC(this.wwi);
    },
    Asc: function(ccd) {
        var inc = 100;
        var RjO = Lightstreamer.AYk();
        if (ccd && this.INQ) {
            inc += RjO - this.INQ - ccd;
        }
        this.INQ = RjO;
        ccd = ccd ? (ccd + inc > 5000 ? 5000 : ccd + inc) : 100;
        this.koh.log('Asc', 1, inc, ccd);
        var TtH = this.wwi;
        this.mAU++;
        setTimeout(Lightstreamer.getClosureFor(this.RKC, this)(TtH, ccd), ccd);
    },
    RKC: function(TtH, ccd) {
        if (ccd) {
            this.mAU--;
        }
        if (TtH != this.wwi || Lightstreamer.IHI.Exk) {
            this.koh.YEo('RKC', 5);
            return;
        }
        this.kRj();
        if (this.YgX == self) {
            this.koh.log('RKC', 1);
            this.Asc(ccd);
            return;
        }
        var jum = this.kGl.fIm();
        if (!jum) {
            this.koh.log('RKC', 3);
            this.Asc(ccd);
            return;
        }
        this.koh.log('RKC', 4);
        this.wwi++;
        Lightstreamer.IHI.qUe(jum, this.kxJ);
    },
    kRj: function() {
        if (Lightstreamer.GKd) {
            this.YgX = null;
            return;
        }
        if (this.LWr) {
            this.LWr = false;
            this.kGl.XSb();
            this.koh.log('kRj', 11);
        }
        if (this.YgX != self || this.kGl.gmO) {
            this.koh.mbQ((this.YgX != self || this.kGl.gmO != true), 'kRj');
            this.koh.log('kRj', 1);
            return;
        }
        if (!this.oZH.Xfu) {
            if (this.oZH.Ucv() && Lightstreamer.CAh.vow()) {
                this.koh.log('kRj', 2);
                this.oZH.vZl();
            } else if (!Lightstreamer.CAh.vow() || !Lightstreamer.iMu()) {
                var QIX = this.oZH.SVM();
                if (!QIX) {
                    this.koh.log('kRj', 3);
                    return;
                } else if (QIX != self) {
                    this.YgX = QIX;
                    this.bBN = true;
                    this.koh.log('kRj', 4);
                    return;
                }
            }
        }
        if (this.YgX == self && this.oZH.Xfu) {
            if (Lightstreamer.YbP()) {
                try {
                    if (window.frames[this.oZH.LJa]) {
                        this.YgX = window.frames[this.oZH.LJa];
                        var fHU = this.YgX.location.toString();
                        this.koh.log('kRj', 8, fHU, this.lvf);
                        if (fHU.indexOf("lsengine.html") < 0) {
                            this.YgX.location = this.lvf;
                        }
                    } else {
                        this.koh.log('kRj', 9);
                    }
                    return;
                } catch (VUu) {
                    this.koh.KEh(VUu, 'kRj', 10);
                    this.YgX = self;
                }
            } else {
                this.YgX = Lightstreamer.VYn(this.lvf, this.oZH.LJa);
                this.koh.log('kRj', 5);
                if (this.YgX == null && this.YYl <= 10) {
                    this.YYl++;
                    this.YgX = self;
                    this.koh.log('kRj', 6);
                    return;
                }
            }
        }
        this.koh.log('kRj', 7);
    },
    seekEngine: function(applicationName, usH) {
        if (this.IlZ) {
            this.koh.bvA(this.qCN, "seekEngine");
            return;
        }
        if (!applicationName) {
            this.koh.bvA(this.HrL, "seekEngine");
            return;
        }
        this.IlZ = true;
        this.YEe(applicationName, usH);
    },
    YEe: function(applicationName, usH) {
        var DWI = Lightstreamer.IHI;
        if (DWI.Exk) {
            return;
        } else if (DWI.xKL) {
            this.koh.log("seekEngine", 1);
            setTimeout(Lightstreamer.getClosureFor(this.YEe, this)(applicationName, usH), DWI.wMO);
            return;
        }
        this.WVq();
        this.wwi++;
        this.koh.log("seekEngine", applicationName, this.wwi);
        this.kGl.gmO = false;
        this.kGl.uPQ = true;
        this.kGl.qGp = false;
        this.VFU = applicationName;
        DWI.bYX(true);
        this.oZH.rTM(usH, this);
        this.RKC(this.wwi);
    },
    bind: function() {
        this.koh.YEo("bind");
        Lightstreamer.pTS({
            mIb: "28442324223623531823424",
            BZj: "52312352492633183053182",
            extraN1: "58412404420380382389392"
        });
        with(Lightstreamer) {
            Lightstreamer.NSU = hJC("" + mIb + BZj + extraN1, "document", 51, 6, 500);
        }
        Lightstreamer.pTS({
            extraV1: "93449415449423434431426",
            extraV2: "40141541541141541443278"
        });
        with(Lightstreamer) {
            Lightstreamer.tBu = hJC("" + mIb + BZj + extraN1 + extraV1 + extraV2, "document", 74, 5, 500);
        }
        if (Lightstreamer.Esk == this) {
            this.koh.rQj("This object is already bound", "bind");
            return false;
        }
        if (this.context.bind()) {
            this.oZH.vZl();
            Lightstreamer.Esk = this;
            Lightstreamer.Nhm.bSB(this.NNq, this);
            if (window.console && window.console.firebug) {
                Lightstreamer.Nhm.dfs(this, 130, "Firebug is known to cause performance and memory issues with Lightstreamer.");
            }
            if (Lightstreamer.FlashBridge) {
                for (var UWJ in Lightstreamer.FlashBridge.bridges) {
                    Lightstreamer.FlashBridge.bridges[UWJ].sml();
                }
            }
            return true;
        } else {
            return false;
        }
    },
    getWindowReference: function() {
        return this.mwM;
    },
    bca: function(applicationName, qwN, KCr, VID, Oji, ppI) {
        var Cgs = this;
        Cgs.FxW++;
        setTimeout(function() {
            Cgs.FxW--;
            if (Cgs.wQF == "N") {
                Cgs.koh.log('bca', 1);
                return;
            }
            if (Cgs.RIc(KCr, applicationName, VID)) {
                if (KCr == "S") {
                    Cgs.YEe(applicationName, null);
                } else {
                    Cgs.koh.rQj("An application with this engine name(" + applicationName + ") already exists within this browser.\nThis Push-page can't receive real-time data because the corresponding engine could not start", "createEngine");
                    if (Cgs.onEngineCreation) {
                        try {
                            Cgs.onEngineCreation(null);
                        } catch (VUu) {
                            Cgs.koh.bNN(VUu, Cgs.onEngineCreation, "onEngineCreation");
                        }
                    }
                    Cgs.kGl.gmO = true;
                }
            } else if (Cgs.kxJ && !Oji) {
                Cgs.koh.rQj(this.qCN, "createEngine");
            } else {
                Cgs.BmZ(qwN, applicationName, Oji, ppI, KCr);
            }
        }, VID.kUa);
    },
    GmM: function(wOb) {
        if (wOb) {
            this.BXL = 10000;
        } else {
            this.BXL = 2000;
        }
        this.CvO.context.Nhm = null;
        this.WVq();
    },
    WVq: function() {
        this.bBN = false;
        this.kxJ = false;
        this.YgX = null;
        var wRX = this.oZH.Xfu;
        if (wRX && wRX.Lux) {
            this.oZH.Xfu = false;
            setTimeout(function() {
                wRX.Lux();
            }, 60000);
        }
        this.xYs();
    },
    Ghc: function() {
        return this.Uep && !this.kxJ && this.wQF == "S";
    },
    ZrL: function() {
        if (this.Ghc()) {
            this.bpk(this.VFU, this.Uep, "N", this.ppI, false);
        }
    },
    NNq: function(EBo) {
        if (this.onClientError) {
            try {
                this.onClientError(EBo);
            } catch (VUu) {
                this.koh.KEh(VUu, 'NNq');
            }
        }
    }
};
Lightstreamer.PushPage.prototype.cellOverwrite = function(hfw, item, field, ojw, JgC, Hdl, ruS) {
    Lightstreamer.cellOverwrite(hfw, item, field, ojw, JgC, Hdl, ruS);
};
Lightstreamer.PushPage.prototype.cellScroll = function(hfw, row, field, ojw, JgC, Hdl, ruS) {
    Lightstreamer.cellScroll(hfw, row, field, ojw, JgC, Hdl, ruS);
};
Lightstreamer.PushPage.prototype.cellMetapush = function(hfw, row, field, ojw, JgC, Hdl, ruS) {
    Lightstreamer.cellMetapush(hfw, row, field, ojw, JgC, Hdl, ruS);
};
Lightstreamer.PushPage.prototype.addTable = function(WUG, id) {
    if (!WUG || (!id && id !== 0)) {
        this.koh.bvA("Table Object And/Or Table id is null", "addTable");
        return null;
    }
    return this.FET(WUG, id, true);
};
Lightstreamer.PushPage.prototype.addScreenTableHelper = function(lXP) {
    this.Ngo.log("addScreenTableHelper", lXP);
    if (this.iBj.XSs[lXP.kLZ]) {
        this.koh.rQj("ScreenTableHelper already set for " + lXP.hfw + ", add new cells to the previously provided ScreenTableHelper", "addScreenTableHelper");
        return;
    }
    this.iBj.XSs[lXP.kLZ] = lXP;
};
Lightstreamer.PushPage.prototype.removeTable = function(id) {
    var AtH = Lightstreamer.rpI(id);
    this.Ngo.log("removeTable", 1, AtH);
    var bbg = this.iBj.Uno[AtH];
    if (!bbg) {
        this.koh.rQj("No table to delete with id " + AtH, "removeTable");
        return null;
    }
    return this.JeK(id, bbg.vjv);
};
Lightstreamer.PushPage.prototype.onEngineCreation = function(engine) {
    return;
};
Lightstreamer.PushPage.prototype.onEngineReady = function(engine) {
    return;
};
Lightstreamer.ScreenTableHelper = function(id, XkK) {
    this.hfw = id;
    this.kLZ = Lightstreamer.rpI(id);
    this.koh = Lightstreamer.Nhm.getLogger("TL");
    this.XkK = [];
    for (var HUs in XkK) {
        if (!isNaN(HUs)) {
            this.addCell(XkK[HUs]);
        }
    }
};
Lightstreamer.ScreenTableHelper.prototype = {
    addCell: function(fgX) {
        var bjE = fgX.getAttribute("table");
        if (!bjE || bjE != this.hfw) {
            this.koh.bvA("The cell does not belong to the '" + this.hfw + "' screen table", "addCell");
            return;
        }
        this.XkK[this.XkK.length] = fgX;
    }
};
Lightstreamer.TjY = function(AtH) {
    this.AtH = AtH;
    this.Yht = null;
    this.oEa = null;
    this.GZm = new Lightstreamer.fqg();
    this.JtQ = new Lightstreamer.fqg();
    this.aJF = new Lightstreamer.fqg();
    this.ofN = new Lightstreamer.fqg();
    this.JFJ = new Lightstreamer.fqg();
    this.VYm = new Lightstreamer.fqg();
    this.lRb = new Lightstreamer.fqg();
    this.Ukx = 0;
    this.NhG = new Lightstreamer.fqg();
    this.xSh = new Lightstreamer.fqg();
    this.aut = new Lightstreamer.fqg();
    this.IOd = new Lightstreamer.fqg();
    this.QHn = 1;
    this.fbK = [];
    this.vuv = {};
    this.lTF = {};
    this.oap;
    this.Enq;
    this.iWB;
    this.diw;
    this.gpE;
    this.QZA;
    this.QJE;
    this.CMa;
    this.hjD = 0;
    this.koh = Lightstreamer.Nhm.getLogger("ST");
};
Lightstreamer.TjY.prototype = {
    ZgF: function(dFQ) {
        if (this.Yht != null) {
            if (this.Yht != dFQ.Yht) {
                this.koh.rQj("A Data Table cannot be associated with a Screen Table that was previously associated with a Data Table of a different type", "addTable");
                return false;
            }
        }
        this.oEa = dFQ;
        this.FKf = dFQ.FKf;
        if (this.Yht == null) {
            this.Yht = dFQ.Yht;
        }
        return true;
    },
    paL: function(SnE, qMo, field, MEW) {
        if ((MEW.indexOf(Lightstreamer.moO) > -1) || (MEW.indexOf(Lightstreamer.sxa) > -1)) {
            if (this.Ukx < qMo) {
                this.Ukx = qMo;
            }
        }
        this.insertCell(SnE, qMo, field);
    },
    insertCell: function(SnE, qMo, cgK) {
        this.GZm.XKo(SnE, qMo, cgK);
    },
    KeC: function(qMo, cgK) {
        return this.GZm.whl(qMo, cgK);
    },
    deleteCell: function(qMo, cgK) {
        this.GZm.XlD(qMo, cgK);
    },
    sjQ: function(qMo, fJT) {
        YoV = this.VYm.whl(qMo, fJT);
        if (!YoV) {
            YoV = Lightstreamer.NHg;
        }
        Lightstreamer.iBj.FMP(this.AtH, qMo, fJT, YoV, Lightstreamer.JUi, this.JFJ.hSR(qMo), true);
    },
    iph: function(qMo) {
        return this.GZm.hSR(qMo);
    },
    dNE: function() {
        return this.GZm.VrH();
    },
    rrt: function(qMo, YYK) {
        if (YYK) {
            this.GZm.MBj(qMo);
        }
        this.aut.MBj(qMo);
        this.IOd.MBj(qMo);
        this.NhG.MBj(qMo);
        this.JtQ.MBj(qMo);
        this.aJF.MBj(qMo);
        this.JFJ.MBj(qMo);
        this.ofN.MBj(qMo);
        this.xSh.MBj(qMo);
        delete(this.vuv[qMo]);
        delete(this.lTF[qMo]);
    },
    mFj: function(Gft) {
        if (Gft == 0) {
            return;
        }
        var GBn = this.hjD - this.QHn + 1;
        if (GBn <= Gft) {
            return;
        }
        var qoK = GBn - Gft;
        for (var UWJ = 1; UWJ <= qoK; UWJ++) {
            this.oql();
        }
    },
    oql: function() {
        this.koh.mbQ(this.oEa, 'oql');
        var GBn = this.hjD - this.QHn + 1;
        if (GBn <= 0) {
            return 0;
        }
        var Dew = this.fbK.shift();
        if (this.oEa && this.oEa.onChangingValues) {
            try {
                this.oEa.onChangingValues(Dew, null);
            } catch (VUu) {
                this.koh.bNN(VUu, this.oEa.onChangingValues, "onChangingValues");
            }
        }
        if (Dew && Lightstreamer.wMk.MuS(Dew)) {
            Dew.parentNode.removeChild(Dew);
        }
        this.rrt(this.QHn, true);
        this.QHn++;
        return GBn - 1;
    },
    bGY: function(NwJ, asP, QTK) {
        var bjE = this.oEa;
        var mgQ = bjE.JST.hSR(NwJ);
        for (var fJT in mgQ) {
            var ACo = bjE.rbJ[fJT];
            if (ACo == null) {
                continue;
            }
            this.IOd.XKo(bjE.dkA.whl(NwJ, fJT), asP, ACo);
            if (mgQ[fJT] !== null) {
                this.aut.XKo(mgQ[fJT], asP, ACo);
            } else if (!QTK) {} else {
                this.aut.XKo(null, asP, ACo);
            }
        }
    },
    gpA: function(oPr, Anu, qEU, VYu) {
        if (oPr == Anu) {
            return;
        }
        var gtn;
        if (VYu) {
            gtn = this.ceZ(oPr, null);
        }
        var UWJ = oPr;
        do {
            var wiM = UWJ;
            UWJ += qEU;
            var EbX = UWJ;
            this.ceZ(EbX, wiM);
        } while (UWJ != Anu);
        if (VYu) {
            this.koh.mbQ(this.Yht == Lightstreamer.sxa, 'gpA', 1);
            this.ceZ(null, Anu, gtn);
        }
    },
    ceZ: function(EbX, wiM, jNM) {
        var Csi = {};
        Csi.dVk = {};
        var Stj;
        if (EbX) {
            Stj = this.aut.hSR(EbX);
        } else {
            Stj = jNM.aut;
        }
        for (var xkO in Stj) {
            if (jNM && jNM.dVk[xkO]) {
                Csi.dVk[xkO] = this.aPd(EbX, wiM, xkO, jNM.dVk[xkO]);
            } else {
                Csi.dVk[xkO] = this.aPd(EbX, wiM, xkO);
            }
        }
        var WYv;
        var kOS;
        var iTO;
        var ToW;
        var MWC;
        var SYv;
        var ucL;
        var suH;
        if (EbX) {
            WYv = this.ofN.pEi(EbX);
            kOS = this.JFJ.pEi(EbX);
            ToW = this.JtQ.pEi(EbX);
            iTO = this.aJF.pEi(EbX);
            SYv = this.aut.pEi(EbX);
            ucL = this.IOd.pEi(EbX);
            suH = this.NhG.pEi(EbX);
            LTx = this.xSh.pEi(EbX);
            if (this.oEa.Bav) {
                MWC = this.oEa.Bav[EbX];
            }
        } else {
            WYv = jNM.ofN;
            kOS = jNM.JFJ;
            ToW = jNM.JtQ;
            iTO = jNM.aJF;
            SYv = jNM.aut;
            ucL = jNM.IOd;
            suH = jNM.NhG;
            LTx = jNM.xSh;
            if (this.oEa.Bav) {
                MWC = jNM.Bav;
            }
        }
        if (wiM) {
            this.ofN.insertRow(WYv, wiM);
            this.JFJ.insertRow(kOS, wiM);
            this.JtQ.insertRow(ToW, wiM);
            this.aJF.insertRow(iTO, wiM);
            this.aut.insertRow(SYv, wiM);
            this.IOd.insertRow(ucL, wiM);
            this.NhG.insertRow(suH, wiM);
            this.xSh.insertRow(LTx, wiM);
            if (this.oEa.Bav) {
                this.oEa.Bav[wiM] = MWC;
            }
        } else {
            Csi.ofN = WYv;
            Csi.JFJ = kOS;
            Csi.JtQ = ToW;
            Csi.aJF = iTO;
            Csi.aut = SYv;
            Csi.IOd = ucL;
            Csi.NhG = suH;
            Csi.xSh = LTx;
            if (this.oEa.Bav) {
                Csi.Bav = MWC;
            }
        }
        if (EbX && wiM) {
            if (this.oEa && !this.oEa.CRk) {
                var bAo = Lightstreamer.SBS;
                bAo.bYX(this.oEa, this.oEa.GmC[wiM], wiM);
                if (this.oEa.onRowUpdate) {
                    try {
                        this.oEa.onRowUpdate(wiM, bAo);
                    } catch (VUu) {
                        this.koh.bNN(VUu, this.oEa.onRowUpdate, "onRowUpdate");
                    }
                }
            }
        }
        return Csi;
    },
    aPd: function(EbX, wiM, xkO, OGD) {
        var VmB;
        if (EbX) {
            VmB = this.KeC(EbX, xkO);
        } else {
            VmB = OGD;
        }
        var ELF;
        if (wiM) {
            ELF = this.KeC(wiM, xkO);
        }
        if (!ELF) {
            var uHd = document.createElement("div");
            ELF = new Lightstreamer.wMk(uHd);
        }
        if (wiM) {
            this.insertCell(ELF, wiM, xkO);
        }
        var Mod;
        var DXu;
        var Ygr = false;
        if (EbX) {
            Mod = this.NhG.whl(EbX, xkO);
            var oek = this.xSh.hSR(EbX);
            if (!Mod) {
                Mod = oek;
            } else
                for (var iXp in oek) {
                    if (!Mod[iXp]) {
                        Mod[iXp] = 1;
                    }
                }
            DXu = this.aut.whl(EbX, xkO);
            if (DXu === null) {
                if (wiM) {
                    DXu = this.VYm.whl(wiM, xkO);
                } else {}
                Ygr = true;
            }
        } else {
            Mod = VmB.ZHI;
            if (VmB.isHole) {
                DXu = null;
            } else {
                DXu = VmB.Nkg.innerHTML;
            }
        }
        ELF.ufs = VmB.ufs;
        ELF.CsV = VmB.CsV;
        ELF.xri = VmB.xri;
        ELF.Squ = VmB.Squ;
        ELF.neW = VmB.neW;
        ELF.Nkg.className = VmB.Nkg.className;
        for (var iXp in Mod) {
            ELF.Nkg.style[iXp] = VmB.Nkg.style[iXp];
        }
        if (wiM) {
            var ZIL = this.NhG.whl(wiM, xkO);
            for (var iXp in ZIL) {
                if (!Mod[iXp]) {
                    ELF.Nkg.style[iXp] = "";
                }
            }
            if (DXu === null) {
                DXu = this.VYm.whl(wiM, xkO);
            }
            Lightstreamer.iBj.FMP(this.AtH, wiM, xkO, DXu, Lightstreamer.uIP, null, Ygr);
        } else {
            ELF.isHole = (DXu == null);
            if (!ELF.isHole) {
                ELF.Nkg.innerHTML = DXu;
            }
            ELF.ZHI = Mod;
        }
        return ELF;
    },
    xQd: function() {
        if (this.oEa && this.oEa.jIb && this.oEa.jIb.appendChild) {
            delete(this.oEa.jIb);
        }
        var Dpe = this.dNE();
        for (var UWJ in Dpe) {
            for (var kre in Dpe[UWJ]) {
                Dpe[UWJ][kre].xQd();
            }
        }
        if (this.diw) {
            delete(this.diw);
        }
        if (this.QZA) {
            delete(this.QZA);
        }
        if (this.gpE) {
            delete(this.gpE);
        }
        if (this.nZr) {
            delete(this.nZr);
        }
        if (this.CMa) {
            delete(this.CMa);
        }
        if (this.QJE) {
            if (this.QJE.xQd) {
                this.QJE.xQd();
            } else {
                delete(this.QJE);
            }
        }
        if (this.Enq) {
            this.Enq.xQd();
        }
        if (this.oap) {
            this.oap.xQd();
        }
        for (var UWJ in this.vuv) {
            if (this.vuv[UWJ] && this.vuv[UWJ].xQd) {
                this.vuv[UWJ].xQd();
            }
        }
    }
};
Lightstreamer.Table = function(ZAv, fEa, KLS) {
    if (ZAv != null) {
        this.KWx = Lightstreamer.GroupDescriptor.uVt(ZAv);
    } else {
        this.PGW = true;
    }
    if (fEa != null) {
        this.ePs = Lightstreamer.SchemaDescriptor.QQl(fEa);
    } else {
        this.Qki = true;
    }
    this.htW = new String(KLS).toUpperCase();
    this.aVd = false;
    this.LhQ = null;
    this.eQZ = null;
    this.oPr = null;
    this.Anu = null;
    this.XJr = null;
    this.Rjh = null;
    this.iGx = null;
    this.dkA = null;
    this.gNt = null;
    this.JST = null;
    this.Lec = null;
    this.iEV = false;
    this.VQl = null;
    this.TlV = null;
    this.gtS = "";
    this.wtX = 0;
    this.iDe = false;
    this.NPw = null;
    this.neW = 0;
    this.iFN = 3000;
    this.sbJ = 0;
    this.ghX;
    this.eOk;
    this.hml;
    this.rxQ;
    this.Yht = null;
    var MFp = " See the documentation for further details";
    this.nRR = "This method must be called at runtime." + MFp;
    this.PDM = "This method cannot be called at runtime." + MFp;
    this.koh = Lightstreamer.Nhm.getLogger("TL");
    this.JcT = 0;
    this.siM = null;
};
Lightstreamer.Table.prototype = {
    QGn: Lightstreamer.qVQ,
    iNv: Lightstreamer.GQi,
    Yer: function() {
        var eUO = "";
        if (this.NPw) {
            eUO = "[" + this.getClassName() + " |" + this.VQl + "|" + this.NPw + "| Ready]";
        } else {
            eUO = "[" + this.getClassName() + "]";
        }
        return eUO;
    },
    vCT: function(AtH) {
        return true;
    },
    goE: function(dFQ) {
        this.oEa = dFQ;
    },
    iSl: function(AtH) {
        this.koh.log('iSl', AtH);
        return true;
    },
    vuU: function(mBW) {
        return;
    },
    LKi: function(id, NPw) {
        this.koh.log('LKi', id, NPw);
        this.TlV = id;
        this.siM = id;
        this.VQl = Lightstreamer.rpI(id);
        this.qcJ = null;
        this.iEV = true;
        this.NPw = NPw;
        if (!this.CRk) {
            this.JcT++;
            this.koh.mbQ(this.JcT === 1, 'LKi', 1, this.JcT, this.TlV);
        }
        this.dkA = new Lightstreamer.fqg();
        this.gNt = new Lightstreamer.fqg();
        this.JST = new Lightstreamer.fqg();
        this.Lec = new Lightstreamer.fqg();
        return;
    },
    kBd: function() {
        this.koh.log('kBd');
        this.iEV = false;
        this.iDe = false;
        this.iGx = null;
        if (Lightstreamer.iBj.wEw[this.VQl] == this) {
            this.qcJ = this.TlV;
        }
        this.siM = null;
        this.VQl = null;
        this.NPw = null;
        if (!this.CRk) {
            this.JcT--;
            this.koh.mbQ(this.JcT === 0, 'kBd', 1, this.JcT, this.TlV, this.getClassName());
        }
        delete(this.hml);
        delete(this.rxQ);
        delete(this.gtS);
        delete(this.dkA);
        delete(this.gNt);
        delete(this.JST);
        delete(this.Lec);
    },
    IXh: function() {
        this.iDe = true;
        this.WmG(this.rxQ);
        if (this.onStart) {
            try {
                this.onStart();
            } catch (VUu) {
                this.koh.bNN(VUu, this.onStart, "onStart");
            }
        }
    },
    cTY: function() {
        this.koh.log('cTY');
        return;
    },
    TLh: function() {
        this.gtS = "LS_mode=" + this.htW + "&" + "LS_id=" + Lightstreamer.rpI(this.KWx.ORj()) + "&" + "LS_schema=" + Lightstreamer.rpI(this.ePs.OmS()) + "&";
        if (this.Rjh != null) {
            this.gtS += ("LS_data_adapter=" + Lightstreamer.rpI(this.Rjh) + "&");
        }
        if (this.XJr != null) {
            this.gtS += ("LS_selector=" + Lightstreamer.rpI(this.XJr) + "&");
        }
        if (this.oPr != null) {
            this.gtS += ("LS_start=" + this.oPr + "&");
        }
        if (this.Anu != null) {
            this.gtS += ("LS_end=" + this.Anu + "&");
        }
        if (this.aVd != null && this.aVd != false) {
            this.gtS += ("LS_snapshot=" + this.aVd + "&");
        }
        if (this.LhQ != null) {
            var Jpb = this.LhQ;
            if (Jpb == "unfiltered") {
                this.gtS += ("LS_requested_max_frequency=" + Jpb + "&");
            } else if (Jpb != "unlimited" && Jpb > 0) {
                this.gtS += ("LS_requested_max_frequency=" + Jpb + "&");
            }
        }
        if (this.Yht.indexOf(Lightstreamer.IWH) > -1) {
            this.CqV = this.LhQ;
        }
        if (this.eQZ != null) {
            var gMu = this.eQZ;
            if (gMu != "unlimited" && gMu > 0) {
                this.gtS += ("LS_requested_buffer_size=" + gMu + "&");
            }
        }
        return;
    },
    WmG: function(blW) {
        if (this.rxQ == blW) {
            delete(this.ghX);
            delete(this.eOk);
            delete(this.hml);
            delete(this.rxQ);
        }
    },
    xLF: function() {
        if (this.ePs) {
            return this.ePs;
        }
        return null;
    },
    pUt: function() {
        if (this.KWx) {
            return this.KWx;
        }
        return null;
    },
    setDataAdapter: function(Rjh) {
        this.koh.log("setDataAdapter", arguments);
        this.Rjh = Rjh;
    },
    getId: function() {
        if (this.TlV == null) {
            if (this.qcJ != null) {
                return this.qcJ;
            }
        }
        return this.TlV;
    },
    setSelector: function(selector) {
        this.koh.log("setSelector", arguments);
        this.XJr = selector;
    },
    jHU: function() {
        return this.XJr;
    },
    setItemsRange: function(start, Anu) {
        this.oPr = this.QGn(start, "setItemsRange", this.oPr, true, 1);
        this.Anu = this.QGn(Anu, "setItemsRange", this.Anu, true, this.oPr);
    },
    GYL: function() {
        return [this.oPr, this.Anu];
    },
    setRequestedMaxFrequency: function(ZeH) {
        ZeH = new String(ZeH);
        ZeH = ZeH.toLowerCase();
        if (ZeH == "unfiltered" || ZeH == "unlimited") {
            this.LhQ = ZeH;
        } else {
            this.LhQ = this.QGn(ZeH, "setRequestedMaxFrequency", this.LhQ, false, 0);
        }
    },
    xOe: function() {
        return this.LhQ;
    },
    setRequestedBufferSize: function(size) {
        size = new String(size);
        size = size.toLowerCase();
        if (size == "unlimited") {
            this.eQZ = size;
        } else {
            this.eQZ = this.QGn(size, "setRequestedBufferSize", this.eQZ, true, 0);
        }
    },
    DsY: function() {
        return this.eQZ;
    },
    setSnapshotRequired: function(nuM) {
        if (nuM === true || nuM === false) {
            this.aVd = nuM;
        } else {
            if (this.htW == "DISTINCT") {
                this.aVd = this.QGn(nuM, "setSnapshotRequired", this.aVd, true, 0);
            } else {
                this.koh.bvA("Numeric values are only allowed when the subscription mode is DISTINCT", "setSnapshotRequired");
                return;
            }
        }
    },
    rNH: function() {
        return this.aVd;
    },
    onItemUpdate: function(peZ, NQb, UGn) {
        return;
    },
    onLostUpdates: function(peZ, qNO, UGn, UUC) {
        return;
    },
    onEndOfSnapshot: function(peZ, UGn) {
        return;
    },
    onStart: function() {
        return;
    },
    getClassName: function() {
        if (this.Yht == null) {
            return null;
        } else if (this.Yht == Lightstreamer.YZa) {
            return "OverwriteTable";
        } else if (this.Yht.indexOf(Lightstreamer.OFa) > -1) {
            return "NonVisualTable";
        } else if (this.Yht == Lightstreamer.nXv) {
            return "DynaScrollTable";
        } else if (this.Yht == Lightstreamer.BbL) {
            return "DynaMetapushTable";
        } else if (this.Yht == Lightstreamer.WVE) {
            return "MultiDynaMetapushTable";
        } else if (this.Yht == Lightstreamer.HRa) {
            return "ChartTable";
        } else if (this.Yht == Lightstreamer.moO) {
            return "ScrollTable";
        } else if (this.Yht == Lightstreamer.sxa) {
            return "MetapushTable";
        }
    },
    olH: function(HdR, evb, ClR) {
        if (this.Yht == Lightstreamer.Ubk) {
            this.KiS.ePs.IAd(HdR.length - 2, true);
            this.KiS.aKj.IAd(HdR.length - 2, false);
            HdR = this.wlZ(HdR);
            if (HdR == null) {
                return true;
            }
            return this.KiS.olH(HdR, evb, true);
        }
        if (!ClR) {
            this.ePs.IAd(HdR.length - 2, false);
        }
        this.neW++;
        if (this.neW >= this.iFN) {
            this.neW = 0;
            if (this.gvD) {
                this.gvD();
            }
        }
        var DjQ = HdR[1];
        var NwJ = new String(DjQ);
        if (this.Yht.indexOf(Lightstreamer.sxa) > -1) {
            NwJ = this.gdO(HdR, DjQ, ClR);
            if (NwJ == null) {
                return NwJ;
            }
        }
        if (this.Yht.indexOf(Lightstreamer.IWH) > -1 && !ClR) {
            this.wBV(HdR);
        }
        this.MGh(NwJ);
        if (this.onItemUpdate) {
            Lightstreamer.NQb.bYX(this, NwJ, HdR, evb);
            var Vgp = this.KWx.Zqu(DjQ);
            try {
                this.onItemUpdate(DjQ, Lightstreamer.NQb, Vgp);
            } catch (VUu) {
                this.koh.bNN(VUu, this.onItemUpdate, "onItemUpdate");
            }
        }
        if (!this.iEV) {
            return NwJ;
        }
        this.eVd(NwJ, HdR);
        return NwJ;
    },
    MGh: function(NwJ) {
        var gtn = this.gNt.hSR(NwJ);
        for (var GMh in gtn) {
            var uvB = GMh;
            var ZXI = false;
            var cNe = GMh.indexOf("|rem");
            if ((cNe > -1) && (cNe == GMh.length - 4)) {
                uvB = GMh.substring(0, GMh.length - 4);
                if (this.Yht.indexOf(Lightstreamer.moO) > -1) {
                    this.JST.XKo(this.gNt.whl(NwJ, GMh), NwJ, uvB);
                } else {
                    this.JST.XKo(null, NwJ, uvB);
                }
            } else {
                this.gNt.XlD(NwJ, GMh);
                this.ogs(null, NwJ, GMh);
            }
        }
    },
    kIb: function(rgD) {
        if (rgD == null) {
            return "";
        } else if (rgD.length === -1) {
            return null;
        } else {
            return rgD;
        }
    },
    ogs: function(ahS, NwJ, cgK) {
        this.JST.XKo(this.kIb(ahS), NwJ, cgK);
    },
    eVd: function(NwJ, HdR) {
        var mvI = HdR.length - 2;
        var cgK = 1;
        var PIM = 2;
        for (; cgK <= mvI; cgK++, PIM++) {
            if (HdR[PIM] == null) {
                this.dkA.XKo(null, NwJ, cgK);
            } else if (HdR[PIM] !== Lightstreamer.ibu) {
                this.dkA.XKo(HdR[PIM], NwJ, cgK);
            }
            this.ogs(HdR[PIM], NwJ, cgK);
        }
        var god = {};
        var gtn = this.gNt.hSR(NwJ);
        for (var cgK in gtn) {
            var cgK = cgK;
            var cNe = cgK.indexOf("|rem");
            if ((cNe > -1) && (cNe == cgK.length - 4)) {
                cgK = cgK.substring(0, cgK.length - 4);
            }
            god[cgK] = true;
            this.wrA(NwJ, cgK, gtn);
        }
        var tLf = this.JST.hSR(NwJ);
        for (var cgK in tLf) {
            if (cgK <= mvI) {
                continue;
            }
            if (god[cgK] == true) {
                continue;
            }
            this.wrA(NwJ, cgK, gtn);
        }
    },
    wrA: function(NwJ, cgK, gtn) {
        var HZa;
        if (!gtn) {
            HZa = null;
        } else {
            HZa = gtn[cgK];
            if (typeof HZa == "undefined") {
                HZa = gtn[cgK + "|rem"];
                if (typeof HZa == "undefined") {
                    HZa = null;
                }
            }
        }
        if (this.dkA.whl(NwJ, cgK) == HZa) {
            this.ogs(Lightstreamer.ibu, NwJ, cgK);
        } else {
            this.dkA.XKo(HZa, NwJ, cgK);
            this.ogs(HZa, NwJ, cgK);
        }
    }
};
Lightstreamer.qcR = function(Yht, FKf, vjv) {
    this.Yht = Yht;
    this.haR = null;
    this.CRk = true;
    this.WFd = {};
    this.koh = Lightstreamer.Nhm.getLogger("TL");
    this.FKf = FKf;
    this.vjv = vjv;
};
Lightstreamer.qcR.prototype = {
    TLh: function() {
        return;
    }
};
Lightstreamer.xFE(Lightstreamer.qcR, Lightstreamer.Table);
Lightstreamer.VisualTable = function(ZAv, fEa, KLS) {
    this.MrT(Lightstreamer.VisualTable, ZAv, fEa, KLS);
    this.oEa = null;
    this.FKf = false;
    this.iYx = true;
    this.vjv = false;
    this.Yoq = false;
    this.WSx = null;
    this.rbJ = null;
    this.Yht = null;
    this.koh.log("VisualTable", arguments);
};
Lightstreamer.VisualTable.prototype = {
    setClearOnRemove: function(clear) {
        if (clear) {
            this.vjv = true;
        } else {
            this.vjv = false;
        }
    },
    tdw: function() {
        return this.vjv;
    },
    setClearOnDisconnected: function(clear) {
        if (clear) {
            this.Yoq = true;
        } else {
            this.Yoq = false;
        }
    },
    ZEj: function() {
        return this.Yoq;
    },
    setClearOnAdd: function(clear) {
        if (clear) {
            this.iYx = true;
        } else {
            this.iYx = false;
        }
    },
    LKs: function() {
        return this.iYx;
    },
    setPushedHtmlEnabled: function(IVq) {
        if (this.iEV) {
            this.koh.bvA(this.PDM, "setPushedHtmlEnabled");
            return;
        }
        this.FKf = this.iNv(IVq, "setPushedHtmlEnabled", this.FKf);
    },
    isPushedHtmlEnabled: function() {
        return this.FKf;
    },
    showValues: function(item, AuM) {
        if (this.Rvt) {
            return;
        }
        if (!this.iEV) {
            this.koh.bvA(this.nRR, "showValues");
            return;
        }
        var ixc = this.KWx.prS(item);
        var NwJ = ixc;
        var axU = [];
        var wnL = {};
        for (var YSt in AuM) {
            var DJn = this.ePs.YiJ(YSt);
            wnL[DJn] = this.sxD(AuM[YSt]);
            if (typeof(DJn) == "number") {
                DJn += 1;
            }
            axU[DJn] = AuM[YSt];
        }
        if (this.Yht.indexOf(Lightstreamer.sxa) > -1) {
            if (typeof axU[this.keyCode + 1] == "undefined") {
                this.koh.bvA("Key position is not set correctly", "showValues");
                return;
            } else if (typeof axU[this.BVl + 1] == "undefined") {
                this.koh.bvA("Command position is not set correctly", "showValues");
                return;
            } else {
                if (axU[this.BVl + 1] == "DELETE") {
                    this.koh.bvA("For Metapush and DynaMetapush tables, only UPDATE commands are admitted in showValues", "showValues");
                    return;
                }
            }
            NwJ = ixc + "|" + axU[this.keyCode + 1];
            if (this.Yht.indexOf(Lightstreamer.BbL) > -1) {
                var kAI = this.oEa.vuv[NwJ];
                if (!kAI) {
                    this.koh.bvA("For Metapush and DynaMetapush tables, only UPDATE commands are admitted in showValues", "showValues");
                    return;
                }
            } else {
                var Min = this.WFd[NwJ];
                if (!Min) {
                    this.koh.bvA("For Metapush and DynaMetapush tables, only UPDATE commands are admitted in showValues", "showValues");
                    return;
                }
            }
        }
        this.JST.insertRow(wnL, NwJ);
        this.Lec.MBj(NwJ);
        this.ulI(NwJ, axU, true);
    },
    sxD: function(rgD) {
        if (typeof rgD == "undefined") {
            return null;
        }
        if (rgD == null) {
            return "";
        } else {
            return rgD;
        }
    },
    vCT: function(AtH) {
        var lXP = Lightstreamer.iBj.ONa(AtH);
        this.goE(lXP);
        if (!lXP.ZgF(this)) {
            return false;
        }
        this.koh.log('vCT', 2, this.FKf);
        return true;
    },
    gvD: function() {
        var ODV = new String(this.hml);
        var dpO = new String(this.gtS);
        delete(this.hml);
        delete(this.gtS);
        this.hml = ODV;
        this.gtS = dpO;
        var tXK = null;
        tXK = Lightstreamer.fqg.kHD(this.dkA, false);
        delete(this.dkA);
        this.dkA = tXK;
        var RmZ = null;
        RmZ = Lightstreamer.fqg.kHD(this.gNt, false);
        delete(this.gNt);
        this.gNt = RmZ;
        var Flw = null;
        Flw = Lightstreamer.fqg.kHD(this.JST, false);
        delete(this.JST);
        this.JST = Flw;
        var XuF = null;
        XuF = Lightstreamer.fqg.kHD(this.Lec, false);
        delete(this.Lec);
        this.Lec = XuF;
        if (this.WSx) {
            var bVa = null;
            bVa = Lightstreamer.Dtt(this.WSx, false);
            delete(this.WSx);
            this.WSx = bVa;
        }
        if (this.rbJ) {
            var cIL = null;
            cIL = Lightstreamer.Dtt(this.rbJ, false);
            delete(this.rbJ);
            this.rbJ = cIL;
        }
        if (this.WFd) {
            var Hcx = null;
            Hcx = Lightstreamer.Dtt(this.WFd, true);
            delete(this.WFd);
            this.WFd = Hcx;
        }
        if (this.GmC) {
            var Zau = null;
            Zau = Lightstreamer.Dtt(this.GmC, false);
            delete(this.GmC);
            this.GmC = Zau;
        }
        if (this.Bav) {
            var Idk = null;
            Idk = Lightstreamer.TFY(this.Bav, false);
            delete(this.Bav);
            this.Bav = Idk;
        }
    },
    olH: function(HdR, evb, ClR) {
        var NwJ = this.aMW(Lightstreamer.VisualTable, 'olH', HdR, evb, ClR);
        this.ulI(NwJ, HdR, false);
        return NwJ;
    },
    HVN: function() {
        var GZm = this.oEa.dNE();
        if (this.PGW) {
            var Kno = [];
            for (var Oij in GZm) {
                Kno[Kno.length] = Oij;
            }
            this.KWx = new Lightstreamer.GroupListDescriptor(Kno);
        }
        this.WSx = {};
        for (var Oij in GZm) {
            var peZ = this.KWx.prS(Oij);
            this.WSx[peZ] = Oij;
        }
    },
    Znv: function() {
        var eAt = this.KQC();
        if (this.Qki) {
            var IKe = [];
            if (this.htW == "COMMAND") {
                if (!eAt["command"]) {
                    IKe[IKe.length] = "command";
                }
                if (!eAt["key"]) {
                    IKe[IKe.length] = "key";
                }
            }
            for (var xkO in eAt) {
                if (xkO.indexOf("#") == 0) {} else if (xkO.indexOf("$") == 0 && this.Yht.indexOf(Lightstreamer.IWH) > -1) {} else {
                    IKe[IKe.length] = xkO;
                }
            }
            this.ePs = new Lightstreamer.SchemaListDescriptor(IKe);
        }
        if (this.LGe) {
            var Isi = [];
            for (var xkO in eAt) {
                if (xkO.indexOf("$") == 0) {
                    Isi[Isi.length] = xkO.substr(1);
                }
            }
            this.aKj = new Lightstreamer.SchemaListDescriptor(Isi);
        }
        this.rbJ = {};
        for (var xkO in eAt) {
            if (xkO.indexOf("$") != 0) {
                var rnA = this.ePs.YiJ(xkO);
                if (!this.ePs.jXH(rnA)) {
                    this.rbJ[rnA] = xkO;
                    delete(eAt[xkO]);
                }
            }
        }
        if (this.aKj) {
            this.ePs.uTK(this.aKj);
            this.JvM = {};
            for (var xkO in eAt) {
                var xKA = xkO;
                if (xkO.indexOf("$") == 0) {
                    xkO = xkO.substr(1);
                }
                var rnA = this.aKj.YiJ(xkO);
                if (!this.aKj.jXH(rnA)) {
                    this.JvM[rnA] = xkO;
                    rnA = this.ePs.YiJ(xKA);
                    this.rbJ[rnA] = xKA;
                    delete(eAt[xkO]);
                }
            }
        }
        for (var xkO in eAt) {
            var rnA = this.ePs.YiJ(xkO);
            this.rbJ[rnA] = xkO;
            delete(eAt[xkO]);
        }
    },
    bDT: function(NwJ, ROh, ERe, QTK, lGG) {
        var bjE = this.VQl;
        var mTN = [];
        var DdN = [];
        var iPd = [];
        var EiV = this.oEa;
        var NAY = EiV.JtQ.hSR(ROh);
        var TbA = EiV.aJF.hSR(ROh);
        if (NAY != null) {
            EiV.ofN.insertRow(NAY, ROh);
            EiV.JtQ.MBj(ROh);
            EiV.JFJ.insertRow(TbA, ROh);
            EiV.aJF.MBj(ROh);
        } else {
            NAY = EiV.ofN.hSR(ROh);
            TbA = EiV.JFJ.hSR(ROh);
        }
        var bMf = false;
        var SQW;
        var hTD;
        var WkQ;
        var qWg;
        if (NAY != null) {
            if (NAY["backgroundColor"]) {
                bMf = true;
                SQW = NAY["backgroundColor"];
                hTD = TbA["backgroundColor"];
            }
            if (NAY["color"]) {
                bMf = true;
                WkQ = NAY["color"];
                qWg = TbA["color"];
            }
        }
        var mgQ = this.JST.hSR(NwJ);
        for (var fJT in mgQ) {
            var cbi = mgQ[fJT];
            var cLG = this.Lec.whl(NwJ, fJT);
            if (cbi == null && cLG) {
                this.JST.XKo(cLG, NwJ, fJT);
            } else {
                this.JST.XKo(cbi, NwJ, fJT);
                this.Lec.XKo(cbi, NwJ, fJT);
            }
            if (this.JST.whl(NwJ, fJT) == null) {
                if (!QTK) {
                    continue;
                }
            }
            var ACo = this.rbJ[fJT];
            if (ACo == null) {
                continue;
            }
            var QJB = EiV.KeC(ROh, ACo);
            if (QJB == null) {
                var FrJ = document.createElement("div");
                QJB = new Lightstreamer.wMk(FrJ);
                EiV.insertCell(QJB, ROh, ACo);
            }
            if (this.Yht == Lightstreamer.nXv) {
                QJB.Iqd = cbi;
            }
            QJB.ufs = QJB.xri;
            QJB.CsV = QJB.Squ;
            QJB.xri = null;
            QJB.Squ = null;
            QJB.neW++;
            if (QJB.ufs || (EiV.ofN.hSR(ROh) != null)) {
                var ohr = false;
                var UDp = false;
                var emg = false;
                var fPw = SQW;
                var uCg = hTD;
                var ImX = WkQ;
                var Khr = qWg;
                if (QJB.ufs) {
                    if (QJB.ufs["backgroundColor"]) {
                        ohr = true;
                        fPw = QJB.ufs["backgroundColor"];
                        uCg = QJB.CsV["backgroundColor"];
                    }
                    if (QJB.ufs["color"]) {
                        ohr = true;
                        ImX = QJB.ufs["color"];
                        Khr = QJB.CsV["color"];
                    }
                }
                if (ohr || bMf) {
                    if (lGG.gbW > 0) {
                        var ZTI = Lightstreamer.iBj.cWi(bjE, NwJ, ROh, ERe, fJT, QTK, this.NPw);
                        var NFJ = Lightstreamer.onw.lda(QJB, false, fPw, ImX, lGG.gbW, ZTI);
                        Lightstreamer.onw.NmA(NFJ);
                        UDp = true;
                    } else {
                        Lightstreamer.onw.RSC(QJB);
                    }
                    if (lGG.iKV > 0) {
                        var ACo = this.rbJ[fJT];
                        var BVc = Lightstreamer.iBj.Bft(bjE, ROh, ERe, ACo, false, QJB.neW);
                        var NFJ = Lightstreamer.onw.lda(QJB, true, uCg, Khr, lGG.iKV, BVc);
                        mTN.push(Lightstreamer.onw.eZo(NFJ));
                        emg = true;
                    }
                }
                if (!UDp) {
                    DdN.push(Lightstreamer.iBj.cWi(bjE, NwJ, ROh, ERe, fJT, QTK, this.NPw));
                }
                if (!emg) {
                    iPd.push(Lightstreamer.iBj.Bft(bjE, ROh, ERe, ACo, false, QJB.neW));
                }
            } else {
                DdN.push(Lightstreamer.iBj.cWi(bjE, NwJ, ROh, ERe, fJT, QTK, this.NPw));
            }
        }
        if (DdN.length > 0) {
            if (lGG.gbW > 0) {
                setTimeout(Lightstreamer.Kun(DdN), lGG.gbW);
            } else {
                Lightstreamer.Kun(DdN)();
            }
        }
        if (mTN.length > 0) {
            setTimeout(Lightstreamer.Kun(mTN), lGG.gbW + lGG.vwW);
        }
        if (iPd.length > 0) {
            setTimeout(Lightstreamer.Kun(iPd), lGG.gbW + lGG.vwW + lGG.iKV);
        }
    }
};
Lightstreamer.xFE(Lightstreamer.VisualTable, Lightstreamer.Table);
Lightstreamer.otd = function() {};
Lightstreamer.otd.prototype = {
    JtD: function() {
        if (this.Yht.indexOf(Lightstreamer.sxa) > -1) {
            if (this.Qki) {
                this.BVl = null;
                this.keyCode = null;
            }
            if (this.BVl == null) {
                this.BVl = this.ePs.eeM("command");
            }
            if (this.keyCode == null) {
                this.keyCode = this.ePs.eeM("key");
            }
            if (this.keyCode == null) {
                this.koh.rQj("Key position is not set correctly for a COMMAND mode subscription. Please specify a field that represents the Key", "addTable");
            } else if (this.BVl == null) {
                this.koh.rQj("Command position is not set correctly for a COMMAND mode subscription. Please specify a field that represents the Command", "addTable");
            }
        }
    },
    fOm: function(wSY, hKF) {
        this.koh.log('fOm', arguments);
        if (this.iEV) {
            this.koh.bvA(this.PDM, "setMetapushFields");
            return;
        }
        this.BVl = this.QGn(wSY, "setMetapushFields", this.BVl, true, 1);
        this.keyCode = this.QGn(hKF, "setMetapushFields", this.keyCode, true, 1);
    },
    gdO: function(HdR, DjQ, ClR) {
        var NwJ;
        if ((typeof HdR[this.keyCode + 1] == "undefined") || (typeof HdR[this.BVl + 1] == "undefined")) {
            this.koh.kOV("Command or Key position is not set correctly", "Server Update");
            this.Rvt = true;
            return null;
        }
        if (HdR[this.keyCode + 1].length == -1) {
            NwJ = DjQ + "|" + Lightstreamer.rpI(this.dkA.whl(DjQ, this.keyCode));
        } else {
            NwJ = DjQ + "|" + Lightstreamer.rpI(HdR[this.keyCode + 1]);
        }
        if (!ClR) {
            for (var UWJ = 2; UWJ < HdR.length; UWJ++) {
                if (HdR[UWJ] && HdR[UWJ].length == -1) {
                    HdR[UWJ] = this.dkA.whl(DjQ, (UWJ - 1));
                } else {
                    this.dkA.XKo(HdR[UWJ], DjQ, (UWJ - 1));
                }
                if (HdR[UWJ] == this.dkA.whl(NwJ, (UWJ - 1))) {
                    HdR[UWJ] = Lightstreamer.ibu;
                }
            }
            if (this.Yht.indexOf(Lightstreamer.IWH) > -1) {
                var ljL = this.ePs.uSA() + 2;
                if (ljL > HdR.length) {
                    for (var UWJ = HdR.length; UWJ < ljL; UWJ++) {
                        HdR[UWJ] = Lightstreamer.ibu;
                        HdR.length++;
                    }
                }
            }
        } else {
            HdR[this.keyCode + 1] = Lightstreamer.ibu;
            if (HdR[this.BVl + 1] == this.dkA.whl(NwJ, this.BVl)) {
                HdR[this.BVl + 1] = Lightstreamer.ibu;
            }
        }
        return NwJ;
    }
};
Lightstreamer.oEv = function() {};
Lightstreamer.oEv.prototype = {
    qnp: function(Gse, CjR, DbQ, xjP) {
        this.koh.log('qnp', arguments);
        if (!Gse) {
            this.dPl = null;
            return;
        }
        this.dPl = this.ePs.YiJ(Gse);
        if (CjR) {
            this.CjR = true;
        } else {
            this.CjR = false;
        }
        if (DbQ) {
            this.DbQ = true;
        } else {
            this.DbQ = false;
        }
        if (xjP) {
            this.xjP = true;
        } else {
            this.xjP = false;
        }
        if (this.iEV && this.Yht.indexOf(Lightstreamer.BbL) > -1) {
            this.Sav();
        }
    },
    bAa: function() {
        if (this.dPl == null) {
            return null;
        } else {
            return this.ePs.nSZ(this.dPl);
        }
    },
    xlx: function() {
        if (this.dPl == null) {
            return null;
        } else {
            return this.ePs.YHx(this.dPl);
        }
    },
    HvK: function() {
        if (this.dPl == null) {
            return null;
        } else {
            return this.CjR;
        }
    },
    Nkp: function() {
        if (this.dPl == null) {
            return null;
        } else {
            return this.DbQ;
        }
    },
    nLq: function() {
        if (this.dPl == null || !this.DbQ) {
            return null;
        } else {
            return this.xjP;
        }
    },
    qaZ: function() {
        return this.BVl;
    },
    scI: function() {
        return this.keyCode;
    },
    Cca: function(rgD) {
        if (this.DbQ) {
            return Lightstreamer.Lho(rgD, this.xjP);
        } else {
            return rgD;
        }
    },
    Voh: function(Frt, aQU) {
        if (Frt == null || aQU == null) {
            if (Frt != aQU) {
                if (Frt == null) {
                    return !this.CjR;
                } else {
                    return this.CjR;
                }
            }
        }
        if (this.CjR) {
            return Frt > aQU;
        } else {
            return Frt < aQU;
        }
    }
};
Lightstreamer.xFE(Lightstreamer.oEv, Lightstreamer.otd, "O");
Lightstreamer.cjk = function() {};
Lightstreamer.cjk.prototype = {
    hsQ: function(DwB) {
        if (DwB != null) {
            this.aKj = Lightstreamer.SchemaDescriptor.QQl(DwB);
        } else if (this.Yht.indexOf(Lightstreamer.OFa) <= -1) {
            this.LGe = true;
        } else {
            this.koh.bvA("You must specify the under schema for NonVisualTable objects", "NonVisualTable");
            return;
        }
        var Oxs = "MultiDynaMetapushTable";
        if (this.Yht.indexOf(Lightstreamer.OFa) > -1) {
            Oxs = "NonVisualTable";
        }
        if (!(((this.Qki || this.ePs.Xct) && (this.LGe || (this.aKj && this.aKj.Xct))) || (this.ePs.bhT && (this.aKj && this.aKj.bhT)))) {
            this.koh.bvA("Schema and UnderSchema should be of the same type", "MultiDynaMetapushTable");
            return;
        }
    },
    oRw: function() {
        for (var UWJ in this.Djx) {
            for (var kre in this.Djx[UWJ]) {
                Lightstreamer.Esk.JeK(this.Djx[UWJ][kre].getId(), false);
                delete(this.Djx[UWJ][kre]);
            }
        }
    },
    wBV: function(HdR) {
        var DjQ = HdR[1];
        var oeJ = (HdR[this.keyCode + 1].length == -1) ? Lightstreamer.rpI(this.dkA.whl(DjQ, this.keyCode)) : Lightstreamer.rpI(HdR[this.keyCode + 1]);
        var PVB = HdR[this.BVl + 1];
        if (this.Djx[DjQ] && this.Djx[DjQ][oeJ] && PVB == "DELETE") {
            Lightstreamer.Esk.JeK(this.getId() + "$" + DjQ + "|" + oeJ, false);
            delete(this.Djx[DjQ][oeJ]);
        } else if ((!this.Djx[DjQ] || !this.Djx[DjQ][oeJ]) && PVB != "DELETE") {
            var jaX = new Lightstreamer.NonVisualTable(oeJ, this.aKj, "MERGE");
            jaX.setDataAdapter(this.IcR);
            jaX.setSnapshotRequired(true);
            jaX.LhQ = this.CqV;
            jaX.YGa = DjQ;
            jaX.Yht = Lightstreamer.Ubk;
            jaX.KiS = this;
            if (!this.Djx[DjQ]) {
                this.Djx[DjQ] = {};
            }
            this.Djx[DjQ][oeJ] = jaX;
            Lightstreamer.Esk.FET(jaX, this.getId() + "$" + DjQ + "|" + oeJ);
        }
    }
};
Lightstreamer.wpE = function() {};
Lightstreamer.wpE.prototype = {
    iSl: function(id) {
        this.koh.log('iSl', 1, id);
        var AtH = Lightstreamer.rpI(id);
        Lightstreamer.iBj.qwR(AtH);
        var xLh;
        if (Lightstreamer.iBj.XSs[AtH]) {
            YEF = Lightstreamer.iBj.XSs[AtH].XkK;
            xLh = [];
            for (var UWJ = 0; UWJ < YEF.length; UWJ++) {
                xLh[UWJ] = new Lightstreamer.wMk(YEF[UWJ]);
            }
            Lightstreamer.iBj.XSs[AtH].XkK = [];
        } else {
            xLh = Lightstreamer.wMk.Oxj(document);
        }
        var kre = 0;
        for (kre = 0; kre < xLh.length; kre++) {
            var bjE = xLh[kre].Nkg.getAttribute("table");
            if (!bjE || bjE != id) {
                continue;
            }
            var aNF;
            if (this.Yht == Lightstreamer.YZa) {
                var Oij = xLh[kre].Nkg.getAttribute("item");
                if ((Oij == null) || (Oij == "")) {
                    continue;
                }
                aNF = Oij;
            } else {
                var Ccm = xLh[kre].Nkg.getAttribute("row");
                if ((Ccm == null) || (Ccm == "")) {
                    Ccm = xLh[kre].Nkg.getAttribute("position");
                }
                if ((Ccm == null) || (Ccm == "")) {
                    continue;
                }
                aNF = Number(Ccm);
                if (isNaN(aNF)) {
                    continue;
                }
            }
            var xkO = xLh[kre].Nkg.getAttribute("field");
            if ((xkO == null) || (xkO == "")) {
                continue;
            }
            var jaX = Lightstreamer.iBj.ONa(AtH);
            var TSQ = jaX.KeC(aNF, xkO);
            if (TSQ && TSQ.Nkg == xLh[kre].Nkg) {
                continue;
            }
            var ojw = xLh[kre].Nkg.innerHTML;
            var whV = xLh[kre].Nkg.className;
            jaX.lRb.XKo(whV, aNF, xkO);
            jaX.VYm.XKo(ojw, aNF, xkO);
            jaX.paL(xLh[kre], aNF, xkO, this.Yht);
            Lightstreamer.iBj.dVp[AtH] = true;
        }
        if (!Lightstreamer.iBj.dVp[AtH]) {
            this.koh.rQj("No cells defined for table " + id, "addTable");
            return false;
        }
        return true;
    },
    KQC: function() {
        var GZm = this.oEa.dNE();
        var eAt = {};
        for (var Oij in GZm) {
            for (var xkO in GZm[Oij]) {
                eAt[xkO] = 1;
            }
        }
        return eAt;
    }
};
Lightstreamer.Ctu = function() {};
Lightstreamer.Ctu.prototype = {
    cTY: function() {
        var GZm = this.oEa.dNE();
        for (var qMo in GZm) {
            if (this.onRowUpdate) {
                try {
                    this.onRowUpdate(qMo, null);
                } catch (VUu) {
                    this.koh.bNN(VUu, this.onRowUpdate, "onRowUpdate");
                }
            }
            for (var cgK in GZm[qMo]) {
                this.oEa.sjQ(qMo, cgK);
            }
            this.oEa.rrt(qMo, false);
        }
    },
    bVb: function(lCm, BUO, gak, VYu) {
        if (lCm == BUO) {
            return;
        }
        var oPr;
        var Anu;
        var qEU;
        if (!gak) {
            oPr = BUO;
            Anu = lCm;
            qEU = -1;
        } else {
            oPr = lCm;
            Anu = BUO;
            qEU = 1;
        }
        for (var NwJ in this.WFd) {
            if (this.WFd[NwJ] < lCm || this.WFd[NwJ] > BUO) {
                continue;
            }
            var RKA = -1;
            if (VYu && this.WFd[NwJ] == oPr) {
                RKA = Anu;
            } else {
                RKA = this.WFd[NwJ] - qEU;
            }
            if (RKA < lCm || RKA > BUO) {
                continue;
            }
            this.GmC[RKA] = NwJ;
            this.WFd[NwJ] = RKA;
            if (this.Yht == Lightstreamer.moO) {
                if (RKA > this.Ukx || RKA <= 0) {
                    delete(this.GmC[RKA]);
                    delete(this.WFd[NwJ]);
                }
            }
        }
        this.oEa.gpA(oPr, Anu, qEU, VYu);
    }
};
Lightstreamer.pMl = function() {};
Lightstreamer.pMl.prototype = {
    RwM: function(AeB) {
        this.koh.log('RwM', arguments);
        if (this.iEV) {
            this.koh.bvA(this.PDM, "setUpwardScroll");
            return;
        }
        if (AeB) {
            this.dmM = true;
        } else {
            this.dmM = false;
        }
    },
    ogs: function(ahS, NwJ, cgK) {
        if (ahS === Lightstreamer.ibu) {
            ahS = this.dkA.whl(NwJ, cgK);
        }
        this.JST.XKo(ahS, NwJ, cgK);
    }
};
Lightstreamer.usi = function() {};
Lightstreamer.usi.prototype = {
    iSl: function(id) {
        this.koh.log('iSl', id);
        var AtH = Lightstreamer.rpI(id);
        this.YGw();
        var VbM = Lightstreamer.iBj.ONa(AtH);
        var GKt;
        var pSD = VbM.diw;
        if (pSD) {
            if (Lightstreamer.wMk.MuS(pSD)) {
                return true;
            } else {
                VbM.diw = null;
                VbM.gpE = null;
                VbM.nZr = null;
                VbM.CMa = null;
                VbM.QJE = null;
                VbM.Enq = null;
                VbM.oap = null;
            }
        }
        pSD = document.getElementById(id);
        if (!this.tEQ(pSD, id)) {
            return false;
        }
        var eGM = pSD.cloneNode(true);
        eGM.removeAttribute("id");
        GKt = pSD.parentNode;
        VbM.diw = pSD;
        VbM.QZA = GKt;
        VbM.gpE = eGM;
        pSD.style.display = "none";
        var FhO = GKt.childNodes;
        var UWJ = 0;
        var iWB = 0;
        for (UWJ = 0; UWJ < FhO.length; UWJ++) {
            if (FhO[UWJ] == pSD) {
                if (FhO[UWJ + 1]) {
                    VbM.nZr = FhO[UWJ + 1];
                    VbM.CMa = FhO[UWJ + 1];
                } else {
                    VbM.nZr = null;
                    VbM.CMa = null;
                }
                iWB = UWJ + 1;
                break;
            }
        }
        if (this.Yht == Lightstreamer.nXv) {
            VbM.QJE = GKt;
        } else {
            VbM.QJE = new Lightstreamer.mJe(VbM.QZA, VbM.CMa, iWB);
            VbM.Enq = new Lightstreamer.Xli();
            VbM.oap = new Lightstreamer.Xli();
        }
        return true;
    },
    tEQ: function(gpE, AtH) {
        if (!gpE) {
            this.koh.rQj("No template defined for table " + AtH, "addTable");
            return false;
        }
        var CsK = gpE.getAttribute(Lightstreamer.NSU);
        if (!CsK || CsK.toUpperCase() != Lightstreamer.tBu) {
            this.koh.rQj("The template defined for table " + AtH + " does not define the 'source' attribute.", "addTable");
            return false;
        }
        xLh = Lightstreamer.wMk.Oxj(gpE);
        for (var hIm = 0; hIm < xLh.length; hIm++) {
            if (!xLh[hIm].Nkg.getAttribute("FIELD")) {
                this.koh.rQj("Warning, no element in the template for table " + AtH + " defines the 'field' attribute", "addTable");
                return true;
            }
        }
        return true;
    },
    KQC: function() {
        var gpE = this.oEa.gpE;
        var xLh = Lightstreamer.wMk.Oxj(gpE);
        var eAt = {};
        var kre = 0;
        for (kre = 0; kre < xLh.length; kre++) {
            var xkO = xLh[kre].Nkg.getAttribute("FIELD");
            if (xkO) {
                eAt[xkO] = 1;
            }
        }
        return eAt;
    },
    JmV: function(MEW, XUc) {
        this.koh.log('JmV', arguments);
        if (!MEW) {
            this.koh.bvA("No type selected, please select one: OFF, ELEMENT, PAGE", "setAutoScroll");
            return;
        }
        MEW = new String(MEW);
        MEW = MEW.toUpperCase();
        if (MEW == "ELEMENT") {
            if (!XUc) {
                this.koh.bvA("Please specify an element id in order to use ELEMENT autoscroll", "setAutoScroll");
                return;
            } else {
                this.jIb = XUc;
            }
        } else if (MEW != "PAGE" && MEW != "OFF") {
            this.koh.bvA(MEW + " is not a valid scroll type. Admitted values are OFF, ELEMENT, PAGE", "setAutoScroll");
            return;
        }
        this.gJP = MEW;
        if (this.iEV) {
            this.YGw();
        }
    },
    YGw: function() {
        if (this.gJP == "ELEMENT") {
            if (this.jIb && this.jIb.appendChild) {} else {
                var wme = document.getElementById(this.jIb);
                if (!wme) {
                    this.koh.rQj("Cannot find the element with " + this.jIb + " as id.", "setAutoScroll");
                    this.gJP = "OFF";
                } else {
                    this.jIb = wme;
                }
            }
        }
    },
    rww: function(vgO) {
        this.koh.log('rww', arguments);
        vgO = new String(vgO);
        vgO = vgO.toLowerCase();
        if (vgO == "unlimited") {
            this.vgO = 0;
        } else {
            this.vgO = this.QGn(vgO, 'rww', this.vgO, true, 1);
        }
    },
    GwF: function() {
        if (this.vgO == 0) {
            return "unlimited";
        }
        return this.vgO;
    },
    WbP: function(Nkg) {
        if (this.gJP == "OFF") {
            return;
        }
        var Phu = null;
        if (this.gJP == "ELEMENT") {
            Phu = this.jIb;
        }
        var Wul = Nkg.offsetTop;
        Nkg = Nkg.offsetParent;
        while ((Nkg != Phu) && (Nkg != null)) {
            Wul += Nkg.offsetTop;
            Nkg = Nkg.offsetParent;
        }
        if (this.gJP == "PAGE") {
            window.scrollTo(0, Wul);
        } else {
            this.jIb.scrollTop = Wul;
        }
    }
};
Lightstreamer.cBA = function() {};
Lightstreamer.cBA.prototype = {
    plW: function(CsK) {
        if (CsK == null) {
            return null;
        } else {
            return CsK.toString();
        }
    },
    Tfe: function(rvG) {
        Lightstreamer.IHI.Tfe(parseInt(rvG.win), parseInt(rvG.epx), this.plW(rvG.status), rvG.connection, rvG.context, rvG.policy, rvG.jYS, parseInt(rvG.guh), this.plW(rvG.WrB), this.plW(rvG.BiE));
    },
    hMR: function(rvG) {
        Lightstreamer.Esk.CvO[rvG.object].sKJ(this.plW(rvG.WLl), rvG.LuC);
    },
    svj: function(rvG) {
        Lightstreamer.IHI.svj(this.plW(rvG.status), Lightstreamer.WQu(rvG.YjH), this.plW(rvG.WrB), this.plW(rvG.BiE));
    },
    eWV: function(rvG) {
        Lightstreamer.IHI.MXx(rvG.Edk === true);
    },
    XPv: function() {
        if (Lightstreamer.bEq.fTT()) {
            setTimeout(function() {
                Lightstreamer.bEq.fTT();
            }, 1000);
        }
    },
    NoN: function(rvG) {
        Lightstreamer.Esk.iIZ(rvG.CqT, this.plW(rvG.hfw), parseInt(rvG.AXl), parseInt(rvG.FXT));
    },
    pvb: function(rvG) {
        var HdR = rvG.HdR;
        var pbo = [];
        pbo[0] = parseInt(HdR[0]);
        pbo[1] = parseInt(HdR[1]);
        for (var UWJ = 2, gho = HdR.length; UWJ < gho; UWJ++) {
            if (!HdR[UWJ]) {
                if (HdR[UWJ] === "") {
                    pbo[UWJ] = "";
                } else {
                    pbo[UWJ] = null;
                }
            } else if (HdR[UWJ].length == -1) {
                pbo[UWJ] = Lightstreamer.ibu;
            } else {
                pbo[UWJ] = HdR[UWJ].toString();
            }
        }
        Lightstreamer.iBj.TUd(pbo, rvG.evb ? true : false);
    },
    xDJ: function(rvG) {
        var pbo = [];
        pbo[0] = parseInt(rvG[0]);
        pbo[1] = parseInt(rvG[1]);
        pbo[2] = parseInt(rvG[2]);
        Lightstreamer.iBj.onLostUpdates(pbo);
    },
    QqM: function(rvG) {
        var pbo = [];
        pbo[0] = parseInt(rvG[0]);
        pbo[1] = parseInt(rvG[1]);
        Lightstreamer.iBj.onEndOfSnapshot(pbo);
    },
    jfS: function(rvG) {
        Lightstreamer.iBj.vWN(parseInt(rvG.EGm), this.plW(rvG.HNq), parseInt(rvG.AXl));
    },
    cuG: function(rvG) {
        Lightstreamer.IHI.RJr("onServerError", parseInt(rvG.EGm), this.plW(rvG.HNq));
    },
    DZL: function(rvG) {
        Lightstreamer.iBj.BoO(parseInt(rvG.EGm), parseInt(rvG.AXl));
    },
    HVc: function(rvG) {
        Lightstreamer.IHI.RJr("onClientAlert", parseInt(rvG.DJn), this.plW(rvG.OEM));
    },
    TPw: function(rvG) {
        Lightstreamer.IHI.RJr("onClientError", rvG);
    },
    FtY: function(rvG) {
        Lightstreamer.iBj.BoO(9, this.plW(rvG));
    },
    iWa: function(rvG) {
        Lightstreamer.iBj.MKL(parseInt(rvG.ERe), parseInt(rvG.DJn), this.plW(rvG.HNq));
    }
};
Lightstreamer.Git = function() {
    this.koh = Lightstreamer.Nhm.getLogger("EH");
    this.wMO = 2000;
    this.bYX();
};
Lightstreamer.Git.prototype = {
    bYX: function(XdA) {
        this.Exk = false;
        this.guh = null;
        this.xKL = false;
        this.Tfl = false;
        this.SCZ = false;
        this.RJw = false;
        this.Pmn = null;
        this.epx = null;
        this.Tjh = XdA ? this.Tjh + 1 : Lightstreamer.pic() + 1;
        this.KIj = null;
        this.NAN = false;
        this.wHq = false;
        this.koh.log('bYX', this);
    },
    toString: function() {
        return ["[", 'Git', this.Pmn, this.xKL, this.Exk, this.guh, this.Tfl, this.SCZ, this.RJw, this.wHq, this.epx, this.Tjh, this.NAN, "]"].join("|");
    },
    sht: function(vZM, Rxh) {
        if (Rxh) {
            return vZM == this.Tjh && Rxh == this.epx;
        } else {
            return vZM == this.Tjh;
        }
    },
    DTj: function() {
        var ExD = false;
        try {
            ExD = this.KIj.PGV.sht(this.Pmn);
        } catch (VUu) {
            this.koh.KEh(VUu, 'DTj');
            ExD = false;
        }
        if (!ExD) {
            this.MXx();
        }
        return ExD;
    },
    OCk: function(PAG, rvG) {
        return this.Bvm(PAG, rvG, false, false);
    },
    tdr: function(PAG, rvG) {
        return this.Bvm(PAG, rvG, true, false);
    },
    TsT: function(PAG, rvG) {
        return this.Bvm(PAG, rvG, false, true);
    },
    Ehb: function(PAG, rvG) {
        return this.Bvm(PAG, rvG, true, true);
    },
    Bvm: function(PAG, rvG, CWL, owM) {
        if (!this.Exk) {
            return false;
        }
        this.koh.log('Bvm', PAG, CWL);
        try {
            if (owM) {
                var gce = this.KIj.PGV.eud(this.Pmn);
                gce.BBA.gcp(PAG, this.Pmn, rvG, CWL ? this.epx : null);
            } else {
                this.KIj.mDW.gcp(PAG, this.Pmn, rvG, CWL ? this.epx : null);
            }
        } catch (VUu) {
            this.cKU(VUu);
            return false;
        }
        return true;
    },
    qUe: function(jum, tsY) {
        if (this.Exk || this.xKL) {
            this.koh.mbQ(false, 'qUe', 1);
        }
        this.xKL = true;
        this.Tjh++;
        this.Tfl = tsY === true;
        try {
            this.KIj = jum;
            var DXg = null;
            if (this.Tfl) {
                var Uep = Lightstreamer.PeJ(Lightstreamer.Esk.Uep);
                if (Lightstreamer.hiH.biq) {
                    var OIG = Lightstreamer.Esk.CvO;
                    OIG.jYS.Uep = Uep;
                    DXg = {
                        jYS: new Lightstreamer.WDu(OIG.jYS),
                        policy: new Lightstreamer.Policy(OIG.policy),
                        connection: new Lightstreamer.Connection(OIG.connection),
                        context: new Lightstreamer.Context(OIG.context)
                    };
                    this.koh.log('qUe', 1);
                } else {
                    DXg = {
                        Uep: Uep
                    };
                    this.koh.log('qUe', 2);
                }
            } else {
                this.koh.log('qUe', 3);
            }
            jum.mDW.gcp('ZPC', -1, {
                win: window,
                TtH: this.Tjh,
                configure: DXg
            });
        } catch (VUu) {
            this.bYX(true);
            Lightstreamer.Esk.Asc();
            return;
        }
        var TtH = Lightstreamer.Esk.wwi;
        setTimeout(Lightstreamer.getClosureFor(this.ZFJ, this)(TtH), this.wMO);
        this.wMO += 500;
    },
    ZFJ: function(TtH) {
        var rhO = Lightstreamer.Esk;
        if (TtH == rhO.wwi) {
            this.bYX(true);
            this.koh.log('ZFJ');
            rhO.RKC(TtH);
        }
    },
    Tfe: function(WhY, NLe, aKo, connection, context, policy, jYS, guh, WrB, BiE) {
        this.Exk = true;
        this.Pmn = WhY;
        this.epx = NLe;
        this.guh = guh;
        if (Lightstreamer.hiH.biq) {
            this.SCZ = true;
        }
        this.wMO = 2000;
        Lightstreamer.Esk.wwi++;
        if (aKo == Lightstreamer.mTT || aKo == Lightstreamer.RXc || aKo == Lightstreamer.RIU) {
            this.RJw = true;
        }
        this.koh.log('Tfe', this);
        var Esk = Lightstreamer.Esk;
        Lightstreamer.hiH.SCZ();
        Lightstreamer.bEq.ilK();
        var CvO = new Lightstreamer.JeV(this.KIj.buS, connection, context, policy, jYS);
        Esk.CvO = CvO;
        Esk.CvO.Bvt(aKo);
        if (this.RJw) {
            Esk.CvO.ZXY(WrB, BiE);
        }
        if (this.Tfl && !this.SCZ) {
            try {
                Esk.onEngineCreation(CvO);
            } catch (VUu) {
                this.koh.bNN(VUu, Esk.onEngineCreation, "onEngineCreation");
            }
        }
        try {
            Esk.onEngineReady(CvO);
        } catch (VUu) {
            this.koh.bNN(VUu, Esk.onEngineReady, "onEngineReady");
        }
        Lightstreamer.Nhm.mFO();
        this.KtS(aKo);
        if (this.RJw) {
            Lightstreamer.iBj.gIn();
        }
    },
    svj: function(aKo, YjH, WrB, BiE) {
        if (YjH) {
            this.epx = YjH;
            this.RJw = aKo == Lightstreamer.mTT || aKo == Lightstreamer.RXc;
        }
        this.koh.log('svj', aKo, this);
        var Esk = Lightstreamer.Esk;
        Esk.CvO.Bvt(aKo);
        if (YjH) {
            if (this.RJw) {
                Esk.CvO.ZXY(WrB, BiE);
            }
        }
        this.RJr("onStatusChange", aKo);
        this.KtS(aKo);
        if (YjH) {
            if (this.RJw) {
                Lightstreamer.iBj.gIn();
            } else {
                Lightstreamer.iBj.OeQ();
            }
        }
    },
    KtS: function(aKo) {
        if (Lightstreamer.FlashBridge) {
            for (var UWJ in Lightstreamer.FlashBridge.bridges) {
                var cFJ = Lightstreamer.FlashBridge.bridges[UWJ];
                if (cFJ && cFJ.uQD) {
                    cFJ.uQD(aKo);
                }
            }
        }
    },
    RJr: function(VOV, dXT, mQs) {
        var CvO = Lightstreamer.Esk.CvO;
        if (CvO[VOV]) {
            try {
                CvO[VOV](dXT, mQs);
            } catch (VUu) {
                this.koh.bNN(VUu, CvO[VOV], VOV);
            }
        }
    },
    MXx: function(Edk) {
        this.koh.log('MXx', Edk, this);
        if (!this.Exk) {
            return;
        }
        var lok = this.Tfl && !Edk;
        Lightstreamer.bEq.Eoh();
        Lightstreamer.bEq.aVI = null;
        this.bYX(true);
        this.wHq = lok;
        Lightstreamer.Esk.GmM(Edk);
        Lightstreamer.iBj.OeQ();
        var Esk = Lightstreamer.Esk;
        try {
            Esk.onEngineLost();
        } catch (VUu) {
            this.koh.bNN(VUu, Esk.onEngineLost, "onEngineLost");
        }
        this.KtS("WAITING");
        Lightstreamer.hiH.KFt(lok);
    },
    cKU: function(VUu) {
        if (!this.NAN) {
            this.koh.KEh(VUu, 'cKU');
        }
        this.NAN = true;
        setTimeout(Lightstreamer.getClosureForNoParams(Lightstreamer.bEq.fTT, Lightstreamer.bEq), 1);
    },
    nEI: function() {
        if (this.Exk && this.Pmn || this.Pmn === 0) {
            this.OCk('Equ', this.Pmn);
        }
    }
};
Lightstreamer.NonVisualTable = function(ZAv, fEa, KLS) {
    this.MrT(Lightstreamer.NonVisualTable, ZAv, fEa, KLS);
    this.Yht = Lightstreamer.OFa;
    this.BVl = null;
    this.keyCode = null;
    this.IcR = null;
    this.Djx = {};
    this.aKj = null;
    this.koh.log("NonVisualTable", arguments);
};
Lightstreamer.NonVisualTable.prototype = {
    LKi: function(AtH, NPw) {
        this.aMW(Lightstreamer.NonVisualTable, 'LKi', AtH, NPw);
        if (this.Yht == Lightstreamer.Xtj || this.Yht == Lightstreamer.BEg) {
            this.JtD();
            if (this.aKj) {
                this.ePs.uTK(this.aKj);
            }
        }
    },
    kBd: function() {
        this.aMW(Lightstreamer.NonVisualTable, 'kBd');
        if (this.Yht == Lightstreamer.BEg) {
            this.oRw();
        }
    },
    setCommandLogic: function(EGm, wSY, hKF, aKj, IcR) {
        if (EGm == "MULTI") {
            if (!aKj) {
                this.koh.bvA("The schema for the underlying tables cannot be null", "setCommandLogic");
                return;
            }
            this.Yht = Lightstreamer.BEg;
            if (wSY) {
                this.fOm(wSY, hKF);
            }
            this.hsQ(aKj);
            this.IcR = IcR;
        } else if (EGm) {
            this.Yht = Lightstreamer.Xtj;
            if (wSY) {
                this.fOm(wSY, hKF);
            }
        } else {
            this.Yht = Lightstreamer.OFa;
        }
    },
    wlZ: function(HdR) {
        var KiS = this.KiS;
        if (!KiS.Djx[this.YGa] || !KiS.Djx[this.YGa][this.KWx.FYq]) {
            return null;
        }
        var DjQ = this.YGa;
        var dJR = {};
        dJR[0] = KiS.iGx;
        dJR[1] = DjQ;
        dJR.length = 2;
        var ifE = KiS.ePs.uSA() + 2;
        var y = 2;
        var UWJ;
        for (; dJR.length < ifE; dJR.length++) {
            UWJ = dJR.length;
            if (UWJ == (KiS.keyCode + 1)) {
                dJR[UWJ] = this.KWx.FYq;
            } else if (UWJ == (KiS.BVl + 1)) {
                dJR[UWJ] = "UPDATE";
            } else if (UWJ <= (KiS.ePs.bKB() + 1)) {
                dJR[UWJ] = Lightstreamer.ibu;
            } else if (HdR[y].length > -1) {
                dJR[UWJ] = HdR[y];
                y++;
            } else {
                dJR[UWJ] = HdR[y];
                y++;
            }
        }
        return dJR;
    }
};
with(Lightstreamer) {
    xFE(NonVisualTable, Table);
    if (Lightstreamer.otd) {
        xFE(NonVisualTable, otd, "O");
    }
    if (Lightstreamer.cjk) {
        xFE(NonVisualTable, cjk, "O");
    }
}
Lightstreamer.OverwriteTable = function(ZAv, fEa, KLS) {
    this.MrT(Lightstreamer.OverwriteTable, ZAv, fEa, KLS);
    this.Yht = Lightstreamer.YZa;
    this.koh.log("OverwriteTable", arguments);
};
Lightstreamer.OverwriteTable.prototype = {
    kBd: function() {
        this.aMW(Lightstreamer.OverwriteTable, 'kBd');
        this.koh.log('kBd');
        if (this.PGW) {
            this.KWx = null;
        }
        if (this.Qki) {
            this.ePs = null;
        }
        this.WSx = null;
        this.rbJ = null;
    },
    LKi: function(AtH, NPw) {
        this.aMW(Lightstreamer.OverwriteTable, 'LKi', AtH, NPw);
        this.koh.log('LKi', AtH, NPw);
        this.HVN();
        this.Znv();
    },
    cTY: function() {
        var VbM = this.oEa;
        var GZm = VbM.dNE();
        for (var qMo in GZm) {
            var ixc = this.KWx.prS(qMo);
            if (this.onChangingValues) {
                try {
                    this.onChangingValues(ixc, null, qMo);
                } catch (VUu) {
                    this.koh.bNN(VUu, this.onChangingValues, "onChangingValues");
                }
            }
            if (!this.iEV) {
                return;
            }
            for (var cgK in GZm[qMo]) {
                VbM.sjQ(qMo, cgK);
            }
        }
    },
    onChangingValues: function(peZ, NQb, UGn) {
        return;
    },
    ulI: function(DjQ, HdR, Cgx) {
        var NwJ = DjQ;
        var Oij = this.WSx[DjQ];
        if (Oij == null) {
            return;
        }
        var lGG = Lightstreamer.bHV;
        lGG.bYX(this, NwJ, HdR, Cgx);
        lGG.qMo = Oij;
        if (this.onChangingValues) {
            var Vgp = this.KWx.Zqu(DjQ);
            try {
                this.onChangingValues(DjQ, lGG, Vgp);
            } catch (VUu) {
                this.koh.bNN(VUu, this.onChangingValues, "onChangingValues");
            }
        }
        if (!this.iEV) {
            return true;
        }
        this.bDT(NwJ, Oij, NwJ, false, lGG);
    }
};
with(Lightstreamer) {
    xFE(OverwriteTable, VisualTable);
    xFE(OverwriteTable, wpE, "O");
}
Lightstreamer.ScrollTable = function(ZAv, fEa, KLS) {
    this.MrT(Lightstreamer.ScrollTable, ZAv, fEa, KLS);
    this.Ukx = 0;
    this.uLW = 1;
    this.FPO = 1;
    this.dmM = false;
    this.BHO = -1;
    this.WFd = null;
    this.GmC = null;
    this.Yht = Lightstreamer.moO;
    this.koh.log("ScrollTable", arguments);
};
Lightstreamer.ScrollTable.prototype = {
    LKi: function(AtH, NPw) {
        this.aMW(Lightstreamer.ScrollTable, 'LKi', AtH, NPw);
        this.koh.log('LKi', AtH, NPw);
        this.WFd = {};
        this.GmC = {};
        if (this.oEa.Ukx > this.BHO && this.BHO > -1) {
            this.Ukx = this.BHO;
        } else {
            this.Ukx = this.oEa.Ukx;
        }
        this.Znv();
    },
    kBd: function() {
        this.aMW(Lightstreamer.ScrollTable, 'kBd');
        this.koh.log('kBd');
        delete(this.WFd);
        delete(this.GmC);
        this.uLW = 1;
        this.FPO = 1;
        if (this.Qki) {
            this.ePs = null;
        }
        this.rbJ = null;
    },
    onChangingValues: function(NQb) {
        return;
    },
    onRowUpdate: function(roN, SBS) {
        return;
    },
    setUpwardScroll: function(AeB) {
        this.RwM(AeB);
    },
    AeB: function() {
        return this.dmM;
    },
    setLastVisibleRow: function(roN) {
        this.BHO = this.QGn(roN, "setLastVisibleRow", this.BHO, true, -1);
    },
    toO: function() {
        return this.BHO;
    },
    ulI: function(DjQ, HdR, Cgx) {
        var lCm = null;
        var BUO = null;
        var WWw = null;
        var GvV = null;
        var asP;
        var eBE;
        if (!this.dmM) {
            asP = 1;
            eBE = this.FPO;
            if (this.FPO < this.Ukx) {
                this.FPO++;
            }
            lCm = asP;
            BUO = this.Ukx;
        } else {
            asP = this.Ukx;
            eBE = 1;
            lCm = eBE;
            BUO = asP;
        }
        var NwJ = this.uLW;
        this.uLW++;
        this.bVb(lCm, BUO, this.dmM, false);
        var lGG = Lightstreamer.bHV;
        lGG.bYX(this, DjQ, HdR, Cgx);
        lGG.qMo = asP;
        lGG.ERe = NwJ;
        if (this.onChangingValues) {
            try {
                this.onChangingValues(lGG);
            } catch (VUu) {
                this.koh.bNN(VUu, this.onChangingValues, "onChangingValues");
            }
        }
        this.oEa.bGY(DjQ, asP, true);
        if (!this.iEV) {
            return true;
        }
        this.WFd[NwJ] = asP;
        this.GmC[asP] = NwJ;
        this.bDT(DjQ, this.WFd[NwJ], NwJ, true, lGG);
        var bAo = Lightstreamer.SBS;
        bAo.bYX(this, NwJ, asP);
        if (this.onRowUpdate) {
            try {
                this.onRowUpdate(asP, bAo);
            } catch (VUu) {
                this.koh.bNN(VUu, this.onRowUpdate, "onRowUpdate");
            }
        }
        if (!this.iEV) {
            return true;
        }
    }
};
with(Lightstreamer) {
    xFE(ScrollTable, VisualTable);
    xFE(ScrollTable, wpE, "O");
    xFE(ScrollTable, Ctu, "O");
    xFE(ScrollTable, pMl, "O");
}
Lightstreamer.DynaScrollTable = function(ZAv, fEa, KLS) {
    this.MrT(Lightstreamer.DynaScrollTable, ZAv, fEa, KLS);
    this.vgO = 0;
    this.mPq = 0;
    this.dmM = false;
    this.jIb = null;
    this.gJP = "OFF";
    this.GJU = false;
    this.Yht = Lightstreamer.nXv;
    this.koh.log("DynaScrollTable", arguments);
};
Lightstreamer.DynaScrollTable.prototype = {
    LKi: function(AtH, NPw) {
        this.aMW(Lightstreamer.DynaScrollTable, 'LKi', AtH, NPw);
        this.koh.log('LKi', AtH, NPw);
        this.Znv();
    },
    kBd: function() {
        this.aMW(Lightstreamer.DynaScrollTable, 'kBd');
        this.koh.log('kBd');
        this.mPq = 0;
        this.GJU = false;
        if (this.Qki) {
            this.ePs = null;
        }
        this.rbJ = null;
    },
    cTY: function() {
        var VbM = this.oEa;
        while (VbM.oql() > 0);
        VbM.hjD = 0;
        VbM.QHn = 1;
        VbM.fbK = [];
        VbM.CMa = this.oEa.nZr;
    },
    setClearOnAdd: Lightstreamer.NKD,
    setUpwardScroll: function(AeB) {
        this.RwM(AeB);
    },
    AeB: function() {
        return this.dmM;
    },
    onChangingValues: function(wgJ, NQb) {
        return;
    },
    setAutoScroll: function(type, XUc) {
        this.JmV(type, XUc);
    },
    setMaxDynaRows: function(vgO) {
        this.rww(vgO);
        if (this.iEV && this.vgO > 0) {
            this.oEa.mFj(this.vgO);
        }
    },
    getMaxDynaRows: function() {
        return this.GwF();
    },
    ulI: function(DjQ, HdR, Cgx) {
        var nmf = this.oEa;
        nmf.hjD++;
        var RgP = nmf.hjD;
        var NwJ = DjQ;
        var lGG = Lightstreamer.bHV;
        lGG.bYX(this, NwJ, HdR, Cgx);
        lGG.qMo = RgP;
        var chk = nmf.QJE;
        var Rht = nmf.gpE.cloneNode(true);
        nmf.fbK.push(Rht);
        var jRV = this.dTP();
        xLh = Lightstreamer.wMk.Oxj(Rht);
        var kre = 0;
        for (kre = 0; kre < xLh.length; kre++) {
            var mVk = xLh[kre];
            var IaS = mVk.Nkg.getAttribute("FIELD");
            if (!IaS) {
                continue;
            }
            nmf.paL(mVk, RgP, IaS, nmf.Yht);
        }
        if (this.onChangingValues) {
            try {
                this.onChangingValues(Rht, lGG);
            } catch (VUu) {
                this.koh.bNN(VUu, this.onChangingValues, "onChangingValues");
            }
        }
        if (!this.iEV) {
            return true;
        }
        if (nmf.CMa == null || nmf.CMa.parentNode == null) {
            chk.appendChild(Rht);
        } else {
            chk.insertBefore(Rht, nmf.CMa);
        }
        this.bDT(NwJ, RgP, NwJ, false, lGG);
        if (jRV) {
            this.WbP(Rht);
        }
        if (!this.dmM) {
            nmf.CMa = Rht;
        }
        var GvV = null;
        this.oEa.mFj(this.vgO);
    },
    dTP: function() {
        if (this.gJP == "OFF") {
            return false;
        }
        if (Lightstreamer.KfT()) {
            return true;
        }
        var bLY = null;
        if (this.gJP == "ELEMENT") {
            bLY = this.jIb;
        } else {
            bLY = document.body;
        }
        if (bLY.scrollTop < this.mPq) {
            this.GJU = true;
        }
        this.mPq = bLY.scrollTop;
        if (!this.GJU) {
            return true;
        }
        if ((bLY.clientHeight + bLY.scrollTop) != bLY.scrollHeight) {
            return false;
        } else {
            return true;
        }
    }
};
with(Lightstreamer) {
    xFE(DynaScrollTable, VisualTable);
    xFE(DynaScrollTable, pMl, "O");
    xFE(DynaScrollTable, usi, "O");
}
Lightstreamer.MetapushTable = function(ZAv, fEa, KLS) {
    this.MrT(Lightstreamer.MetapushTable, ZAv, fEa, KLS);
    this.Ukx = 0;
    this.InT = 0;
    this.BVl = null;
    this.keyCode = null;
    this.dPl = null;
    this.CjR = false;
    this.DbQ = false;
    this.xjP = false;
    this.BHO = -1;
    this.WFd = {};
    this.GmC = {};
    this.Bav = {};
    this.Yht = Lightstreamer.sxa;
    this.koh.log("MetapushTable", arguments);
};
Lightstreamer.MetapushTable.prototype = {
    LKi: function(AtH, NPw) {
        this.aMW(Lightstreamer.MetapushTable, 'LKi', AtH, NPw);
        this.koh.log('LKi', AtH, NPw);
        this.WFd = {};
        this.GmC = {};
        if (this.oEa.Ukx > this.BHO && this.BHO > -1) {
            this.Ukx = this.BHO;
        } else {
            this.Ukx = this.oEa.Ukx;
        }
        this.Znv();
        this.JtD();
    },
    kBd: function() {
        this.aMW(Lightstreamer.MetapushTable, 'kBd');
        this.koh.log('kBd');
        delete(this.WFd);
        delete(this.GmC);
        this.InT = 0;
        this.Bav = [];
        if (this.Qki) {
            this.ePs = null;
        }
        this.rbJ = null;
    },
    setClearOnAdd: Lightstreamer.NKD,
    getMetapushSortField: function() {
        return this.bAa();
    },
    getMetapushSortFieldName: function() {
        return this.xlx();
    },
    isDescendingSort: function() {
        return this.HvK();
    },
    isNumericSort: function() {
        return this.Nkp();
    },
    isCommaAsDecimalSeparator: function() {
        return this.nLq();
    },
    setLastVisibleRow: function(roN) {
        this.BHO = this.QGn(roN, "setLastVisibleRow", this.BHO, true, -1);
    },
    toO: function() {
        return this.BHO;
    },
    onChangingValues: function(NQb) {
        return;
    },
    onRowUpdate: function(roN, SBS) {
        return;
    },
    setMetapushFields: function(wSY, hKF) {
        this.fOm(wSY, hKF);
    },
    setMetapushSort: function(Gse, CjR, DbQ, xjP) {
        this.qnp(Gse, CjR, DbQ, xjP);
    },
    ulI: function(NwJ, HdR, Cgx) {
        var DMK = this.dkA.whl(NwJ, this.BVl);
        var GOB = 1;
        if (this.dPl != null) {
            GOB = this.dkA.whl(NwJ, this.dPl);
        }
        var lCm = null;
        var BUO = null;
        if (DMK == "DELETE") {
            this.bVb(this.WFd[NwJ], this.InT, true, false);
            this.koh.mbQ(!Cgx, 'ulI', 1);
            var rmx = this.oEa.iph(this.InT);
            for (var rbJ in rmx) {
                this.oEa.sjQ(this.InT, rbJ);
            }
            delete this.GmC[this.InT];
            delete this.Bav[this.InT];
            delete this.WFd[NwJ];
            this.JST.MBj(NwJ);
            this.Lec.MBj(NwJ);
            this.gNt.MBj(NwJ);
            this.dkA.MBj(NwJ);
            if (this.InT > this.Ukx) {
                this.oEa.rrt(this.InT, true);
            } else {
                this.oEa.rrt(this.InT, false);
            }
            if (this.onRowUpdate) {
                try {
                    this.onRowUpdate(this.InT, null);
                } catch (VUu) {
                    this.koh.bNN(VUu, this.onRowUpdate, "onRowUpdate");
                }
            }
            if (!this.iEV) {
                return true;
            }
            this.InT--;
        } else {
            GOB = this.Cca(GOB);
            var Min = this.WFd[NwJ];
            var NjX = true;
            if (Min) {
                var qSG = this.Bav[Min];
                if (qSG.toString() == GOB.toString()) {
                    NjX = false;
                }
            } else {
                Min = -1;
                this.InT++;
            }
            var QTK = (Min == -1);
            var RKA = Min;
            if (NjX) {
                RKA = 1;
                var qMo;
                for (qMo = 1; qMo <= this.InT; qMo++) {
                    if (qMo == Min) {
                        continue;
                    }
                    var Skt = this.Bav[qMo];
                    if (!Skt) {
                        break;
                    }
                    if (this.Voh(GOB, Skt)) {
                        break;
                    }
                    RKA++;
                }
                if (RKA != Min) {
                    var gak = false;
                    var Dcw = false;
                    if (!QTK) {
                        Dcw = true;
                        if (RKA < Min) {
                            lCm = RKA;
                            BUO = Min;
                        } else {
                            lCm = Min;
                            BUO = RKA;
                            gak = true;
                        }
                    } else {
                        lCm = RKA;
                        BUO = this.InT;
                    }
                    this.bVb(lCm, BUO, gak, Dcw);
                    this.WFd[NwJ] = RKA;
                    this.GmC[RKA] = NwJ;
                }
                this.Bav[RKA] = GOB;
            }
            var lGG = Lightstreamer.bHV;
            lGG.bYX(this, NwJ, HdR, Cgx);
            lGG.qMo = this.WFd[NwJ];
            if (this.onChangingValues) {
                try {
                    this.onChangingValues(lGG);
                } catch (VUu) {
                    this.koh.bNN(VUu, this.onChangingValues, "onChangingValues");
                }
            }
            this.oEa.bGY(NwJ, RKA, QTK);
            if (!this.iEV) {
                return true;
            }
            this.bDT(NwJ, this.WFd[NwJ], NwJ, QTK, lGG);
            var bAo = Lightstreamer.SBS;
            bAo.bYX(this, NwJ);
            if (this.onRowUpdate) {
                try {
                    this.onRowUpdate(this.WFd[NwJ], bAo);
                } catch (VUu) {
                    this.koh.bNN(VUu, this.onRowUpdate, "onRowUpdate");
                }
            }
            if (!this.iEV) {
                return true;
            }
        }
    }
};
with(Lightstreamer) {
    xFE(MetapushTable, VisualTable);
    xFE(MetapushTable, wpE, "O");
    xFE(MetapushTable, oEv, "O");
    xFE(MetapushTable, Ctu, "O");
}
Lightstreamer.DynaMetapushTable = function(ZAv, fEa, KLS) {
    this.MrT(Lightstreamer.DynaMetapushTable, ZAv, fEa, KLS);
    this.BVl = null;
    this.keyCode = null;
    this.dPl = null;
    this.CjR = false;
    this.DbQ = false;
    this.xjP = false;
    this.jIb = null;
    this.gJP = "OFF";
    this.vgO = 0;
    this.Pmn = 1;
    this.KMv = 0;
    this.YuR = false;
    this.Yht = Lightstreamer.BbL;
    this.koh.log("DynaMetapushTable", arguments);
};
Lightstreamer.DynaMetapushTable.prototype = {
    LKi: function(AtH, NPw) {
        this.aMW(Lightstreamer.DynaMetapushTable, 'LKi', AtH, NPw);
        this.koh.log('LKi', AtH, NPw);
        this.Znv();
        this.JtD();
    },
    kBd: function() {
        this.aMW(Lightstreamer.DynaMetapushTable, 'kBd');
        this.koh.log('kBd');
        this.Pmn = 1;
        this.KMv = 0;
        this.YuR = false;
        if (this.Qki) {
            this.ePs = null;
        }
        this.rbJ = null;
    },
    cTY: function() {
        var dTM = null;
        var VbM = this.oEa;
        for (var NwJ in VbM.vuv) {
            var dTM = VbM.vuv[NwJ];
            if (this.onChangingValues) {
                try {
                    this.onChangingValues(dTM.Rht(), null);
                } catch (VUu) {
                    this.koh.bNN(VUu, this.onChangingValues, "onChangingValues");
                }
            }
            dTM.parentNode.removeChild(dTM);
            VbM.rrt(NwJ, true);
        }
        VbM.hjD = 0;
        VbM.CMa = VbM.nZr;
    },
    setClearOnAdd: Lightstreamer.NKD,
    setMetapushFields: function(wSY, hKF) {
        this.koh.log("setMetapushFields", arguments);
        if (this.iEV) {
            this.koh.bvA(this.PDM, "setMetapushFields");
            return;
        }
        this.BVl = this.QGn(wSY, "setMetapushFields", this.BVl, true, 1);
        this.keyCode = this.QGn(hKF, "setMetapushFields", this.keyCode, true, 1);
    },
    onChangingValues: function(wgJ, NQb) {
        return;
    },
    setAutoScroll: function(type, XUc) {
        this.JmV(type, XUc);
    },
    setMetapushSort: function(Gse, CjR, DbQ, xjP) {
        this.qnp(Gse, CjR, DbQ, xjP);
    },
    getMetapushSortField: function() {
        return this.bAa();
    },
    getMetapushSortFieldName: function() {
        return this.xlx();
    },
    isDescendingSort: function() {
        return this.HvK();
    },
    isNumericSort: function() {
        return this.Nkp();
    },
    isCommaAsDecimalSeparator: function() {
        return this.nLq();
    },
    setMaxDynaRows: function(vgO) {
        this.rww(vgO);
        if (this.iEV) {
            this.XhY();
            this.Sav();
            this.ftv(1);
        }
    },
    getMaxDynaRows: function() {
        return this.GwF();
    },
    onCurrentPagesChanged: function(eIW) {
        return;
    },
    goToPage: function(Pmn) {
        if (!this.iEV) {
            this.koh.bvA(this.nRR, "goToPage");
            return;
        }
        if (this.vgO == 0) {
            this.koh.bvA("Can't switch pages while 'no-page mode' is used", "goToPage");
            return;
        }
        var UoC = new Number(Pmn);
        if (isNaN(UoC)) {
            this.koh.bvA("A page number must be provided. " + Pmn + " is not a valid value", "goToPage");
            return;
        }
        if (UoC <= 0) {
            this.koh.bvA("A page number must be greater than 0. " + Pmn + " is not a valid value", "goToPage");
            return;
        }
        this.ftv(UoC);
    },
    getDisplayedPage: function() {
        if (this.vgO == 0) {
            return 1;
        } else {
            return this.Pmn;
        }
    },
    getCurrentPages: function() {
        return this.KMv;
    },
    ulI: function(NwJ, HdR, Cgx) {
        var EiV = this.oEa;
        var DMK = this.dkA.whl(NwJ, this.BVl);
        var GOB;
        if (this.dPl != null) {
            GOB = this.Cca(this.dkA.whl(NwJ, this.dPl));
        }
        var YfV = null;
        var EMb = null;
        var chk = EiV.QJE;
        var Kir = EiV.Enq;
        var oap = EiV.oap;
        var kAI = EiV.vuv[NwJ];
        var jRV = true;
        if (!this.YuR || this.vgO > 0) {
            jRV = false;
        }
        var tGG = false;
        var Rht = null;
        if (DMK == "DELETE") {
            jRV = false;
            if (kAI) {
                EiV.hjD--;
                tGG = true;
                if (this.onChangingValues) {
                    try {
                        this.onChangingValues(kAI.Rht(), null);
                    } catch (VUu) {
                        this.koh.bNN(VUu, this.onChangingValues, "onChangingValues");
                    }
                }
                if (!this.iEV) {
                    return true;
                }
                if (kAI.parentNode == chk) {
                    chk.removeChild(kAI);
                    this.edS(Kir, chk, this.vgO);
                } else if (kAI.parentNode == Kir) {
                    Kir.removeChild(kAI);
                } else {
                    oap.removeChild(kAI);
                    if (this.edS(chk, oap, this.vgO * (this.Pmn - 1))) {
                        this.edS(Kir, chk, this.vgO);
                    }
                }
                this.koh.mbQ(!Cgx, 'ulI', 3);
                this.JST.MBj(NwJ);
                this.Lec.MBj(NwJ);
                this.gNt.MBj(NwJ);
                this.dkA.MBj(NwJ);
                EiV.rrt(NwJ, true);
            }
        } else {
            var Gtt = false;
            var sBg;
            if (!kAI) {
                Rht = new Lightstreamer.fcr(this.VQl, NwJ, NwJ, this.keyCode);
                EiV.vuv[NwJ] = Rht;
            } else {
                Rht = EiV.vuv[NwJ];
                YfV = Rht.parentNode;
                sBg = this.GJp(Rht);
                if (this.dPl != null) {
                    if (sBg != null && GOB != null) {
                        if (sBg.toString() == GOB.toString()) {
                            Gtt = true;
                        }
                    } else if (sBg == null && GOB == null) {
                        Gtt = true;
                    }
                }
            }
            var lGG = Lightstreamer.bHV;
            lGG.bYX(this, NwJ, HdR, Cgx);
            lGG.qMo = NwJ;
            if (this.onChangingValues) {
                try {
                    this.onChangingValues(Rht.Rht(), lGG);
                } catch (VUu) {
                    this.koh.bNN(VUu, this.onChangingValues, "onChangingValues");
                }
            }
            if (!this.iEV) {
                return true;
            }
            if (this.dPl != null && Gtt == false) {
                EiV.lTF[NwJ] = GOB;
                var wAo = 1;
                var Uvj = EiV.hjD;
                var oqZ = -1;
                var kre = -1;
                while (wAo < Uvj) {
                    kre = Math.floor((wAo + Uvj) / 2);
                    var vtI = null;
                    if (kre <= EiV.hjD) {
                        var Ijg = this.lWn(kre);
                        if (Ijg == Rht) {
                            vtI = sBg;
                            oqZ = kre;
                        } else {
                            vtI = this.GJp(Ijg);
                        }
                    }
                    if (this.Voh(GOB, vtI)) {
                        Uvj = kre - 1;
                    } else {
                        wAo = kre + 1;
                    }
                }
                var EIu = -1;
                if (wAo == Uvj) {
                    var Ijg = this.lWn(wAo);
                    var Skt = this.GJp(Ijg);
                    if (this.Voh(GOB, Skt)) {
                        EIu = wAo;
                    } else {
                        EIu = wAo + 1;
                    }
                } else {
                    EIu = wAo;
                }
                this.DwW(EIu, Rht);
                if (!kAI) {
                    EiV.hjD++;
                    tGG = true;
                }
            }
            if (this.dPl == null) {
                if (!kAI) {
                    EiV.hjD++;
                    tGG = true;
                    if (Kir.length > 0 || (chk.length == this.vgO && this.vgO > 0)) {
                        Kir.appendChild(Rht);
                    } else if (chk.length > 0 || oap.length == (this.vgO * (this.Pmn - 1))) {
                        chk.appendChild(Rht);
                    } else {
                        oap.appendChild(Rht);
                    }
                }
            }
            this.bDT(NwJ, NwJ, NwJ, false, lGG);
        }
        if (Rht) {
            if (Rht.bLi) {
                if (jRV) {
                    this.WbP(Rht.bLi);
                }
            }
        }
        if (tGG) {
            this.XhY();
        }
    },
    Sav: function() {
        var gbr = this.dPl;
        var OLL = new Lightstreamer.Xli();
        var Hbh = this.oEa;
        var chk = Hbh.QJE;
        var Kir = Hbh.Enq;
        var oap = Hbh.oap;
        var x = 1;
        while (Hbh.hjD > 0) {
            var Luq = this.lWn(x);
            if (!Luq) {
                Hbh.hjD--;
                x++;
                continue;
            }
            if (gbr == null) {
                OLL.appendChild(Luq);
                Hbh.hjD--;
                continue;
            }
            var HZk = Luq.NwJ;
            if (HZk == "") {
                Hbh.hjD--;
                x++;
                continue;
            }
            var GOB = this.dkA.whl(HZk, this.dPl);
            GOB = this.Cca(GOB);
            Hbh.lTF[HZk] = GOB;
            var wAo = 0;
            var Uvj = OLL.length - 1;
            while (wAo < Uvj) {
                var kre = Math.floor((wAo + Uvj) / 2);
                var Ijg = OLL.kMD(kre);
                var uFa = this.GJp(Ijg);
                if (!uFa) {
                    this.koh.mbQ(false, 'Sav', 1);
                }
                if (this.Voh(GOB, uFa)) {
                    Uvj = kre - 1;
                } else {
                    wAo = kre + 1;
                }
            }
            var Ijg = OLL.kMD(wAo);
            if (wAo == Uvj) {
                var Skt = this.GJp(Ijg);
                if (this.Voh(GOB, Skt)) {
                    OLL.insertBefore(Luq, Ijg);
                } else {
                    var bRr = OLL.kMD(Uvj + 1);
                    if (!bRr) {
                        OLL.appendChild(Luq);
                    } else {
                        OLL.insertBefore(Luq, bRr);
                    }
                }
            } else {
                if (Ijg) {
                    OLL.insertBefore(Luq, Ijg);
                } else {
                    OLL.appendChild(Luq);
                }
            }
            Hbh.hjD--;
        }
        var ipH = 0;
        while (ipH < OLL.length) {
            Hbh.hjD++;
            var Nkg = OLL.kMD(ipH);
            var vtI = Nkg.NwJ;
            if (Hbh.hjD <= (this.vgO * (this.Pmn - 1))) {
                oap.appendChild(Nkg);
            } else if ((this.vgO <= 0) || (Hbh.hjD <= (this.vgO * this.Pmn))) {
                chk.appendChild(Nkg);
            } else {
                Kir.appendChild(Nkg);
            }
        }
    },
    GJp: function(Ijg) {
        if (!Ijg) {
            return null;
        }
        var Skt = Ijg.NwJ;
        if (Skt == "") {
            return null;
        }
        return this.oEa.lTF[Skt];
    },
    ftv: function(bkP) {
        var gIG = this.oEa;
        var chk = gIG.QJE;
        var Kir = gIG.Enq;
        var oap = gIG.oap;
        var sJO = this.Pmn;
        if (sJO >= bkP) {
            while (this.nAK(oap, chk, (bkP - 1) * this.vgO)) {
                this.nAK(chk, Kir, this.vgO);
            }
        } else {
            while (this.edS(chk, oap, (bkP - 1) * this.vgO)) {
                this.edS(Kir, chk, this.vgO);
            }
        }
        this.Pmn = bkP;
    },
    DwW: function(UWJ, bLi) {
        var VbM = this.oEa;
        if (UWJ > VbM.hjD + 1) {
            return;
        } else if (UWJ <= 0) {
            return;
        }
        if (bLi == this.lWn(UWJ)) {
            return;
        }
        var YfV = bLi.parentNode;
        var VZG;
        var chk = VbM.QJE;
        var Kir = VbM.Enq;
        var oap = VbM.oap;
        var lQw = this.lWn(UWJ);
        if (lQw == null) {
            if (Kir.length > 0 || (chk.length == this.vgO && this.vgO > 0)) {
                Kir.appendChild(bLi);
                VZG = Kir;
            } else if (this.vgO == 0 || chk.length > 0 || oap.length == (this.vgO * (this.Pmn - 1))) {
                chk.appendChild(bLi);
                VZG = chk;
            } else {
                oap.appendChild(bLi);
                VZG = oap;
            }
        } else {
            VZG = lQw.parentNode;
            VZG.insertBefore(bLi, lQw);
        }
        if (VZG == chk) {
            if ((!YfV) || (YfV == Kir)) {
                this.nAK(chk, Kir, this.vgO);
            } else if (YfV == oap) {
                this.edS(chk, oap, this.vgO * (this.Pmn - 1));
            }
        } else if (VZG == oap) {
            if (YfV != oap) {
                if (this.nAK(oap, chk, this.vgO * (this.Pmn - 1))) {
                    this.nAK(chk, Kir, this.vgO);
                }
            }
        } else if (VZG == Kir) {
            if (YfV == oap) {
                this.edS(chk, oap, this.vgO * (this.Pmn - 1));
            }
            this.edS(Kir, chk, this.vgO);
        }
    },
    edS: function(LfY, vBQ, vIg) {
        if (this.vgO <= 0) {
            return false;
        }
        if (vBQ.length < vIg && LfY.length > 0) {
            var Btc = LfY.kMD(0);
            vBQ.appendChild(Btc);
            return true;
        }
        return false;
    },
    nAK: function(LfY, vBQ, gtb) {
        if (this.vgO <= 0) {
            return false;
        }
        if (LfY.length > gtb) {
            var Btc = LfY.kMD(LfY.length - 1);
            vBQ.insertBefore(Btc, vBQ.kMD(0));
            return true;
        }
        return false;
    },
    lWn: function(UWJ) {
        var VbM = this.oEa;
        var chk = VbM.QJE;
        var Kir = VbM.Enq;
        var oap = VbM.oap;
        if (UWJ > VbM.hjD) {
            return null;
        } else if (UWJ <= 0) {
            return null;
        }
        if (UWJ <= oap.length) {
            return oap.kMD(UWJ - 1);
        } else {
            UWJ -= oap.length;
            if (UWJ <= chk.length) {
                return chk.kMD(UWJ - 1);
            } else {
                UWJ -= chk.length;
                return Kir.kMD(UWJ - 1);
            }
        }
        this.koh.mbQ(false, 'lWn', UWJ, this.VQl);
        return null;
    },
    XhY: function() {
        var Srb = 0;
        if (this.vgO <= 0) {
            Srb = 1;
        } else {
            Srb = Math.ceil(this.oEa.hjD / this.vgO);
        }
        if (this.KMv != Srb) {
            this.KMv = Srb;
            if (this.onCurrentPagesChanged) {
                try {
                    this.onCurrentPagesChanged(this.KMv);
                } catch (VUu) {
                    this.koh.bNN(VUu, this.onCurrentPagesChanged, "onCurrentPagesChanged");
                }
            }
        }
        return Srb;
    }
};
with(Lightstreamer) {
    xFE(DynaMetapushTable, VisualTable);
    xFE(DynaMetapushTable, oEv, "O");
    xFE(DynaMetapushTable, usi, "O");
}
Lightstreamer.MultiDynaMetapushTable = function(ZAv, fEa, KLS, DwB) {
    this.MrT(Lightstreamer.MultiDynaMetapushTable, ZAv, fEa, KLS);
    this.IcR = null;
    this.Djx = {};
    this.LGe = false;
    this.aKj = null;
    this.Yht = Lightstreamer.WVE;
    this.hsQ(DwB);
    this.koh.log("MultiDynaMetapushTable", arguments);
};
Lightstreamer.MultiDynaMetapushTable.prototype = {
    setUnderDataAdapter: function(Rjh) {
        this.koh.log("setUnderDataAdapter", arguments);
        this.IcR = Rjh;
    },
    kBd: function() {
        this.aMW(Lightstreamer.MultiDynaMetapushTable, 'kBd');
        this.koh.log('kBd');
        if (this.LGe && !this.Qki && this.ePs.Prf != null) {
            this.ePs.nameList = this.ePs.originalList;
            this.ePs.gTc = this.ePs.NnY;
            this.ePs.originalList = null;
            this.ePs.NnY = null;
        }
        if (this.LGe) {
            this.aKj = null;
        }
        this.JvM = null;
        this.oRw();
    }
};
with(Lightstreamer) {
    xFE(MultiDynaMetapushTable, DynaMetapushTable);
    xFE(MultiDynaMetapushTable, cjk, "O");
}
Lightstreamer.FdJ = function() {};
Lightstreamer.FdJ.prototype = {
    Vof: function(LuC, rIN, qEU) {
        var rgD = new Number(LuC);
        var Xkw = (rgD - rIN) / qEU;
        return Math.round(Xkw);
    },
    ovU: function(LuC, rIN, qEU) {
        return (LuC * qEU) + rIN;
    },
    QgV: function() {
        for (var gho = 0; gho < this.GCC.length; gho++) {
            if (this.GCC[gho] && Lightstreamer.wMk.MuS(this.GCC[gho])) {
                this.GCC[gho].parentNode.removeChild(this.GCC[gho]);
            }
        }
        this.GCC = [];
    }
};
Lightstreamer.ChartTable = function(ZAv, fEa, KLS) {
    this.MrT(Lightstreamer.ChartTable, ZAv, fEa, KLS);
    this.haR = null;
    this.Blj = document.createElement("div");
    this.Blj.style.position = "relative";
    this.Blj.style.overflow = "visible";
    this.offsetY = 0;
    this.offsetX = 0;
    this.screenX = null;
    this.screenY = null;
    this.FTM = {};
    this.GCC = [];
    this.mne = new Lightstreamer.LabelFormatter();
    this.gvl = false;
    this.Lhb = 0;
    this.SCU = null;
    this.pnG = null;
    this.nnd = null;
    this.Qlg = null;
    this.dkA = null;
    this.gNt = null;
    this.JST = null;
    this.Lec = null;
    this.Yht = Lightstreamer.HRa;
    this.koh.log("ChartTable", arguments);
};
Lightstreamer.ChartTable.prototype = {
    iSl: function(id) {
        this.koh.log('iSl', 1, id);
        var AtH = Lightstreamer.rpI(id);
        var xLh;
        xLh = Lightstreamer.wMk.Oxj(document);
        var kre = 0;
        for (kre = 0; kre < xLh.length; kre++) {
            var bjE = xLh[kre].Nkg.getAttribute("table");
            if (!bjE || bjE != id) {
                continue;
            }
            this.KEi(xLh[kre].Nkg);
            Lightstreamer.iBj.dVp[AtH] = true;
            return true;
        }
        this.Mwp();
        return false;
    },
    vuU: function(mBW) {
        this.koh.log('vuU', mBW);
        if (!this.FTM) {
            this.FTM = mBW.FTM;
            for (var EBo in this.FTM) {
                this.FTM[EBo].ipY(this);
            }
        } else
            for (var EBo in mBW.FTM) {
                if (!this.FTM[EBo]) {
                    this.FTM[EBo] = mBW.FTM[EBo];
                }
                this.FTM[EBo].ipY(this);
            }
        var Nqh = Lightstreamer.wMk.MuS(mBW.Blj);
        if (Nqh) {
            this.Blj = mBW.Blj;
            this.haR = mBW.haR;
        }
        if (!this.GCC) {
            this.GCC = mBW.GCC;
        }
        if (!this.SCU) {
            this.SCU = mBW.SCU;
        }
        if (!this.pnG) {
            this.pnG = mBW.pnG;
        }
        if (!this.nnd) {
            this.nnd = mBW.nnd;
        }
        if (!this.Qlg) {
            this.Qlg = mBW.Qlg;
        }
        if (!this.screenX) {
            this.screenX = mBW.screenX;
        }
        if (!this.offsetY) {
            this.offsetY = mBW.offsetY;
        }
        if (!this.offsetX) {
            this.offsetX = mBW.offsetX;
        }
        if (!this.screenY) {
            this.screenY = mBW.screenY;
        }
        if (!this.Lhb) {
            this.Lhb = mBW.Lhb;
        }
        if (!this.BxQ) {
            this.BxQ = mBW.BxQ;
        }
    },
    cTY: function() {
        this.QgV();
        for (var EBo in this.FTM) {
            this.FTM[EBo].QgV();
            delete(this.FTM[EBo]);
        }
        if (this.haR && Lightstreamer.wMk.MuS(this.haR)) {
            this.haR.parentNode.removeChild(this.haR);
        }
        delete(this.haR);
        this.KEi(this.Blj.parentNode);
    },
    setAreaClass: function(sCs) {
        if (!this.haR) {
            this.sCs = sCs;
        } else {
            this.haR.className = sCs;
        }
        this.koh.log("setAreaClass", sCs);
    },
    setAreaTop: function(top) {
        this.offsetY = this.QGn(top, "setAreaTop", this.offsetY, false, 0);
        if (this.haR) {
            this.haR.style.top = this.offsetY;
        }
    },
    setAreaLeft: function(left) {
        this.offsetX = this.QGn(left, "setAreaLeft", this.offsetX, false, 0);
        if (this.haR) {
            this.haR.style.left = this.offsetX;
        }
    },
    setAreaWidth: function(width) {
        this.screenX = this.QGn(width, "setAreaWidth", this.screenX, false, 0);
        if (this.haR) {
            this.haR.style.width = this.screenX;
            if (this.nnd != null) {
                this.vQF();
                this.TDK();
                for (var LBZ in this.FTM) {
                    if (!this.FTM[LBZ]) {
                        continue;
                    } else if (this.FTM[LBZ].SWe.length > 0) {
                        this.FTM[LBZ].EDM();
                    }
                }
            }
        }
    },
    setAreaHeight: function(height) {
        this.screenY = this.QGn(height, "setAreaHeight", this.screenY, false, 0);
        if (this.haR) {
            this.haR.style.height = this.screenY;
            for (var LBZ in this.FTM) {
                if (!this.FTM[LBZ]) {
                    continue;
                } else if (this.FTM[LBZ].GBY != null) {
                    this.FTM[LBZ].CuM();
                    this.FTM[LBZ].ovV();
                    if (this.FTM[LBZ].SWe.length > 0) {
                        this.FTM[LBZ].EDM();
                    }
                }
            }
        }
    },
    KEi: function(NSM) {
        if (this.haR) {
            return;
        }
        if (NSM && NSM.appendChild) {
            this.haR = document.createElement("div");
            this.haR.style.position = "absolute";
            this.haR.style.overflow = "hidden";
            this.Blj.appendChild(this.haR);
            this.haR.className = this.sCs;
            this.haR.style.top = this.offsetY + "px";
            this.haR.style.left = this.offsetX + "px";
            this.haR.style.width = this.screenX + "px";
            this.haR.style.height = this.screenY + "px";
            if (this.Blj.parentNode != NSM) {
                NSM.appendChild(this.Blj);
            }
            if (this.screenX == null) {
                this.screenX = NSM.offsetWidth;
            }
            if (this.screenY == null) {
                this.screenY = NSM.offsetHeight;
            }
            if (this.nnd != null) {
                this.vQF();
                this.TDK();
            }
            for (var LBZ in this.FTM) {
                if (!this.FTM[LBZ]) {
                    continue;
                } else if (this.FTM[LBZ].GBY != null) {
                    this.FTM[LBZ].CuM();
                    this.FTM[LBZ].ovV();
                }
            }
            this.koh.log('KEi', NSM);
        } else {
            this.Mwp();
        }
    },
    Mwp: function() {
        this.koh.rQj("A DOM element must be provided as an anchor for the chart", "addTable");
    },
    bFp: function() {
        if (this.haR) {
            return this.haR.cloneNode(true);
        } else {
            this.koh.rQj("Sorry, nothing to photograph", 'bFp');
        }
    },
    removeLine: function(id) {
        if (this.FTM[id]) {
            this.FTM[id].ulR();
            this.FTM[id].QgV();
            this.FTM[id] = null;
        } else {
            this.koh.rQj("No line to remove with id " + id, "removeLine");
        }
    },
    jKU: function(VOO, NtV, cMM, xio) {
        this.koh.log('jKU', arguments);
        var qBf = document.createElement("div");
        if (VOO != null) {
            qBf.className = VOO;
        }
        qBf.style.position = "absolute";
        var fuQ = document.createTextNode(NtV);
        qBf.appendChild(fuQ);
        this.Blj.appendChild(qBf);
        var wmb = qBf.offsetWidth;
        if (xio.toUpperCase() == "X") {
            qBf.style.top = (this.screenY + 5 + this.offsetY) + "px";
            qBf.style.left = (cMM - (qBf.offsetWidth / 2) + this.offsetX) + "px";
        } else if (xio.toUpperCase() == "Y") {
            qBf.style.left = (this.offsetX - wmb) + "px";
            qBf.style.top = ((this.screenY - cMM) - (qBf.offsetHeight / 2) + this.offsetY) + "px";
        }
        return qBf;
    },
    addLine: function(WAD, id) {
        this.koh.log("addLine", WAD);
        WAD.ipY(this);
        if (this.FTM[id] != null) {
            this.koh.rQj("A line with this id already exists. Overwriting", "addLine");
        }
        WAD.PNL(id);
        WAD.peZ = this.KWx.prS(WAD.thw);
        WAD.xoi = this.ePs.YiJ(WAD.NXL);
        if (!WAD.GBY || !WAD.BZG || !WAD.xoi) {
            this.koh.bvA("Cannot create line. Please declare the Y axis", "addLine");
            return;
        }
        if (this.screenY != null && this.haR) {
            WAD.CuM();
            WAD.ovV();
        }
        this.FTM[id] = WAD;
    },
    cak: function(Emf, rex, GiM) {
        this.koh.log('cak', arguments);
        var LJF = this.FTM[GiM];
        var mhk = this.YSd(Emf);
        var OQW = LJF.QAk(rex);
        if (LJF.wVT == null) {
            LJF.wVT = mhk;
            LJF.Uei = OQW;
            return;
        }
        this.koh.log('cak', 0, LJF.wVT, LJF.Uei, mhk, OQW);
        var omJ = mhk - LJF.wVT;
        var RAI = OQW - LJF.Uei;
        this.koh.log('cak', 1, "X", omJ, "Y", RAI);
        var vlY = Math.abs(omJ);
        var ARo = Math.abs(RAI);
        var iwk = null;
        var Anu = 0;
        var Mix = 0;
        var qRd = 0;
        if (vlY >= ARo) {
            qRd = RAI / omJ;
            Anu = omJ;
            Mix = omJ >= 0 ? 1 : -1;
        } else {
            qRd = omJ / RAI;
            Anu = RAI;
            Mix = RAI >= 0 ? 1 : -1;
        }
        var dvd = 0;
        var dWB = 0;
        var gFr = null;
        var ePq = null;
        var PFt = true;
        var hAe = true;
        if (vlY < ARo) {
            hAe = false;
        }
        for (var UWJ = 0; UWJ != Anu; UWJ += Mix) {
            var wvP = 0;
            var goa = 0;
            var mcK = 0;
            var FcW = 0;
            var JGW = false;
            this.koh.log('cak', 2);
            if ((UWJ + Mix) == Anu) {
                this.koh.log('cak', 6);
                JGW = true;
                PFt = true;
            }
            iwk = document.createElement("div");
            if (JGW) {
                iwk.className = LJF.dPY;
            } else {
                iwk.className = LJF.dMo;
            }
            iwk.style.position = "absolute";
            iwk.style.fontSize = "0px";
            this.haR.appendChild(iwk);
            LJF.OkP[LJF.OkP.length] = iwk;
            if (PFt) {
                PFt = false;
                gFr = Math.ceil(iwk.offsetWidth / 2);
                ePq = Math.ceil(iwk.offsetHeight / 2);
                dvd = iwk.offsetWidth;
                dWB = iwk.offsetHeight;
                this.koh.log('cak', 3, dvd, dWB);
            }
            mcK = dvd;
            FcW = dWB;
            if (hAe) {
                wvP = Math.round(UWJ + LJF.wVT);
                goa = Math.round(this.screenY - (qRd * UWJ + LJF.Uei));
                if (!JGW) {
                    var Rol = 0;
                    while (((UWJ + Mix) != (Anu - Mix)) && (goa == Math.round(this.screenY - (qRd * (UWJ + Mix) + LJF.Uei)))) {
                        UWJ += Mix;
                        Rol++;
                    }
                    this.koh.log('cak', 4, Rol);
                    var cvH = gFr * Rol;
                    mcK = dvd + cvH;
                    if (Mix < 0) {
                        wvP -= cvH;
                    }
                }
            } else {
                wvP = Math.round(qRd * UWJ + LJF.wVT);
                goa = Math.round(this.screenY - (UWJ + LJF.Uei));
                if (!JGW) {
                    var Rol = 0;
                    while (((UWJ + Mix) != (Anu - Mix)) && (wvP == Math.round(qRd * (UWJ + Mix) + LJF.wVT))) {
                        UWJ += Mix;
                        Rol++;
                    }
                    this.koh.log('cak', 5, Rol);
                    var cvH = ePq * Rol;
                    FcW = dWB + cvH;
                    if (Mix > 0) {
                        goa -= cvH;
                    }
                }
            }
            wvP -= Math.floor(gFr / 2);
            goa -= Math.floor(ePq / 2);
            iwk.style.left = wvP + "px";
            iwk.style.top = goa + "px";
            iwk.style.width = mcK + "px";
            iwk.style.height = FcW + "px";
            this.koh.log('cak', 7, iwk.style.left, iwk.style.top, iwk.style.width, iwk.style.height);
            this.koh.log('cak', 8, iwk.offsetLeft, iwk.offsetTop, iwk.offsetWidth, iwk.offsetHeight);
        }
        this.koh.log('cak', 10);
        LJF.wVT = mhk;
        LJF.Uei = OQW;
    },
    setXAxis: function(field, xjP) {
        this.koh.log("setXAxis", arguments);
        this.SCU = this.ePs.YiJ(field);
        if (xjP) {
            this.gvl = true;
        } else {
            this.gvl = false;
        }
    },
    positionXAxis: function(min, max) {
        this.koh.log("positionXAxis", arguments);
        this.nnd = this.QGn(max, "positionXAxis", this.nnd);
        this.pnG = this.QGn(min, "positionXAxis", this.pnG);
        if (this.haR) {
            if (this.screenX != null) {
                this.vQF();
                this.TDK();
            }
            for (var LBZ in this.FTM) {
                if (!this.FTM[LBZ]) {
                    continue;
                } else if (this.FTM[LBZ].SWe.length > 0) {
                    this.FTM[LBZ].EDM();
                }
            }
        }
        this.koh.log("positionXAxis", 2);
    },
    vQF: function() {
        this.Qlg = (this.nnd - this.pnG) / this.screenX;
        this.koh.log('vQF', this.Qlg);
    },
    setXLabels: function(cJp, qUL, mne) {
        this.Lhb = cJp;
        this.BxQ = qUL;
        if (mne != null) {
            this.mne = mne;
        }
        if (this.Qlg != null && this.haR) {
            this.TDK();
        }
        this.koh.log("setXLabels", arguments);
    },
    TDK: function() {
        this.QgV();
        var GAg = "";
        var cMM = -1;
        if (this.Lhb <= 0) {
            return;
        }
        if (this.Lhb > 0) {
            GAg = this.mne.formatValue(this.pnG);
            cMM = this.YSd(this.pnG);
            this.GCC[this.GCC.length] = this.jKU(this.BxQ, GAg, cMM, "X");
        }
        if (this.Lhb > 1) {
            GAg = this.mne.formatValue(this.nnd);
            cMM = this.YSd(this.nnd);
            this.GCC[this.GCC.length] = this.jKU(this.BxQ, GAg, cMM, "X");
        }
        if (this.Lhb > 2) {
            var HaO = this.Lhb - 1;
            var EeA = (this.nnd - this.pnG) / HaO;
            var eok = this.pnG;
            for (var vNx = 1; vNx < HaO; vNx++) {
                eok += EeA;
                GAg = this.mne.formatValue(eok);
                cMM = this.YSd(eok);
                this.GCC[this.GCC.length] = this.jKU(this.BxQ, GAg, cMM, "X");
            }
        }
        this.koh.log('TDK', arguments);
    },
    onXOverflow: function(wVT, YUh, teJ) {
        this.koh.log("onXOverflow", arguments);
        if (wVT > teJ) {
            var AgI = (teJ + YUh) / 2;
            var lvT = teJ - YUh;
            this.positionXAxis(AgI, AgI + lvT);
        } else {}
    },
    YSd: function(LuC) {
        return this.Vof(LuC, this.pnG, this.Qlg);
    },
    ulI: function(DjQ, HdR, Cgx) {
        var NwJ = DjQ;
        for (var LBZ in this.FTM) {
            if (!this.FTM[LBZ]) {
                continue;
            } else if (DjQ == this.FTM[LBZ].peZ) {
                var Ciq = null;
                var LuC = this.dkA.whl(DjQ, this.SCU);
                Ciq = Lightstreamer.Lho(LuC, this.gvl);
                if (Ciq < this.pnG) {
                    continue;
                }
                if (Ciq > this.nnd) {
                    if (this.onXOverflow) {
                        try {
                            this.onXOverflow(Ciq, this.pnG, this.nnd);
                        } catch (VUu) {
                            this.koh.bNN(VUu, this.onXOverflow, "onXOverflow");
                        }
                    }
                    if (!this.iEV) {
                        return;
                    }
                }
                var bGp = null;
                var LuC = this.dkA.whl(DjQ, this.FTM[LBZ].xoi);
                bGp = Lightstreamer.Lho(LuC, this.QLZ);
                if (bGp > this.FTM[LBZ].GBY || bGp < this.FTM[LBZ].BZG) {
                    if (this.FTM[LBZ].onYOverflow) {
                        try {
                            this.FTM[LBZ].onYOverflow(bGp, this.FTM[LBZ].BZG, this.FTM[LBZ].GBY);
                        } catch (VUu) {
                            this.koh.bNN(VUu, this.FTM[LBZ].onYOverflow, "onYOverflow");
                        }
                    }
                    if (!this.iEV) {
                        return;
                    }
                }
                var iDN = this.FTM[LBZ].SWe.length;
                this.FTM[LBZ].SWe[iDN] = Ciq;
                iDN = this.FTM[LBZ].hhO.length;
                this.FTM[LBZ].hhO[iDN] = bGp;
                this.cak(Ciq, bGp, LBZ);
            }
        }
    }
};
with(Lightstreamer) {
    xFE(ChartTable, VisualTable);
    xFE(ChartTable, FdJ, "O");
}
Lightstreamer.ChartLine = function() {
    this.chk = null;
    this.thw = null;
    this.peZ = null;
    this.AtH = null;
    this.dPY = "";
    this.dMo = "";
    this.QLZ = false;
    this.nXr = null;
    this.xoi = null;
    this.BZG = null;
    this.GBY = null;
    this.lJe = null;
    this.OdB = 0;
    this.mne = new Lightstreamer.LabelFormatter();
    this.OkP = [];
    this.SWe = [];
    this.hhO = [];
    this.GCC = [];
    this.wVT = null;
    this.Uei = null;
    this.koh = Lightstreamer.Nhm.getLogger("TL");
    this.koh.log("ChartLine", arguments);
};
Lightstreamer.ChartLine.prototype = {
    QGn: Lightstreamer.qVQ,
    ulR: function() {
        this.koh.log('ulR', this.AtH);
        if (this.OkP[0] && Lightstreamer.wMk.MuS(this.OkP[0])) {
            for (var JhD = 0; JhD < this.OkP.length; JhD++) {
                this.OkP[JhD].parentNode.removeChild(this.OkP[JhD]);
            }
        }
        this.OkP = [];
        this.hhO = [];
        this.SWe = [];
        this.wVT = null;
        this.Uei = null;
    },
    EDM: function() {
        this.koh.log('EDM', 1);
        var eIT = this.SWe;
        var tlu = this.hhO;
        this.ulR();
        var YfV = false;
        var WeU, Gxf;
        while (eIT.length > 0) {
            if ((eIT.length > 1 && eIT[1] >= this.chk.pnG) || eIT[0] >= this.chk.pnG) {
                this.chk.cak(eIT[0], tlu[0], this.AtH);
                this.SWe[this.SWe.length] = eIT[0];
                this.hhO[this.hhO.length] = tlu[0];
            }
            Lightstreamer.LCt(eIT);
            Lightstreamer.LCt(tlu);
        }
        this.koh.log('EDM', 2);
    },
    ipY: function(chk) {
        this.chk = chk;
        this.koh.log('ipY', chk);
    },
    PNL: function(AtH) {
        this.AtH = AtH;
        this.koh.log('PNL', AtH);
    },
    setPointClass: function(aUu) {
        this.dPY = aUu;
        this.koh.log("setPointClass", aUu);
    },
    setLineClass: function(HLx) {
        this.dMo = HLx;
        this.koh.log("setLineClass", HLx);
    },
    setYAxis: function(item, field, xjP) {
        this.koh.log("setYAxis", arguments);
        this.thw = item;
        this.NXL = field;
        if (xjP) {
            this.QLZ = true;
        } else {
            this.QLZ = false;
        }
    },
    positionYAxis: function(min, max) {
        this.koh.log("positionYAxis", arguments);
        this.GBY = this.QGn(max, "positionYAxis", this.GBY);
        this.BZG = this.QGn(min, "positionYAxis", this.BZG);
        if (this.chk && this.chk.screenY != null && this.chk.haR && this.chk.haR.parentNode) {
            this.CuM();
            this.ovV();
            if (this.SWe.length > 0) {
                this.EDM();
            }
        }
        this.koh.log("positionYAxis", 2);
    },
    CuM: function() {
        this.lJe = (this.GBY - this.BZG) / this.chk.screenY;;
        this.koh.log('CuM', this.lJe);
    },
    setYLabels: function(cJp, qUL, mne) {
        this.OdB = cJp;
        this.EiG = qUL;
        if (mne != null) {
            this.mne = mne;
        }
        if (this.lJe != null && this.chk && this.chk.haR && this.chk.haR.parentNode) {
            this.ovV();
        }
        this.koh.log("setYLabels", arguments);
    },
    ovV: function() {
        this.QgV();
        var GAg = "";
        var cMM = -1;
        if (this.OdB <= 0) {
            return;
        }
        if (this.OdB > 0) {
            GAg = this.mne.formatValue(this.BZG);
            cMM = this.QAk(this.BZG);
            this.GCC[this.GCC.length] = this.chk.jKU(this.EiG, GAg, cMM, "Y");
        }
        if (this.OdB > 1) {
            GAg = this.mne.formatValue(this.GBY);
            cMM = this.QAk(this.GBY);
            this.GCC[this.GCC.length] = this.chk.jKU(this.EiG, GAg, cMM, "Y");
        }
        if (this.OdB > 2) {
            var HaO = this.OdB - 1;
            var EeA = (this.GBY - this.BZG) / HaO;
            var eok = this.BZG;
            for (var vNx = 1; vNx < HaO; vNx++) {
                eok += EeA;
                GAg = this.mne.formatValue(eok);
                cMM = this.QAk(eok);
                this.GCC[this.GCC.length] = this.chk.jKU(this.EiG, GAg, cMM, "Y");
            }
        }
        this.koh.log('ovV', arguments);
    },
    onYOverflow: function(Uei, EPq, IpI) {
        this.koh.log("onYOverflow", arguments);
        var WFg = (IpI - EPq) / 2;
        if (Uei > IpI) {
            var oHl = IpI + WFg;
            if (Uei > oHl) {
                oHl = Uei;
            }
            this.positionYAxis(EPq, oHl);
        } else if (Uei < EPq) {
            var Tdr = EPq - WFg;
            if (Uei < Tdr) {
                Tdr = Uei;
            }
            this.positionYAxis(Tdr, IpI);
        }
    },
    QAk: function(LuC) {
        return this.Vof(LuC, this.BZG, this.lJe);
    }
};
Lightstreamer.xFE(Lightstreamer.ChartLine, Lightstreamer.FdJ, "O");
Lightstreamer.LabelFormatter = function() {};
Lightstreamer.LabelFormatter.prototype = {
    formatValue: function(rgD) {
        return rgD;
    }
};
Lightstreamer.Esk = null;
with(Lightstreamer) {
    Lightstreamer.iBj = new ajv();
    Lightstreamer.IHI = new Git();
    Lightstreamer.uFn = new mWY(IHI, new Lightstreamer.cBA(), false);
    Lightstreamer.bEq = new VWm();
    Lightstreamer.CAh = new jZe(function() {
        var wuj = [];
        wuj.push(function() {
            if (Lightstreamer.Esk) {
                Lightstreamer.Esk.kRj();
            }
        });
        wuj.push(function() {
            if (Lightstreamer.FlashBridge) {
                Lightstreamer.FlashBridge.HxX();
            }
        });
        return wuj;
    }());
    Nhm.QKv();
    cLp("beforeunload", function() {
        if (Lightstreamer.Esk) {
            Lightstreamer.Esk.SIU();
        }
    });
    cLp("unload", function() {
        Lightstreamer.iBj.xQd();
        Lightstreamer.IHI.nEI();
        GKd = true;
    });
    Lightstreamer.HSm = new IPq();
    Lightstreamer.EBG = new Sem();
    Lightstreamer.hiH = new RPk();
    if (Lightstreamer.XAD) {
        Lightstreamer.onw = new XAD(20);
    }
    if (EBG.ASr()) {
        EBG.vZl();
    }
    GYc();
    if (!Lightstreamer.avoidLSGlobals) {
        JYb();
    }
    Lightstreamer.SBS = new RowInfo();
    Lightstreamer.NQb = new UpdateItemInfo();
    Lightstreamer.bHV = new VisualUpdateInfo();
}
Lightstreamer.Jnk.log("pushpage", "pushpage parsed");
var top5Jockey = 'PZ;HCY;TEK;DSS;FEL';
var top5Trainer = 'SCS;FC;YPF;NPC;LKW';
var mtgDate = '2022-09-18';
var mtgVenue = 'ST';
var dayShort = 'SUN';
var venueShort = 'ST';
var dayLong = 'Sunday';
var venueLong = 'Sha Tin';
var dayLongEn = 'Sunday';
var venueLongEn = 'Sha Tin';
var dayLongCh = '星期日';
var venueLongCh = '沙田';
var mtgTotalRace = 10;
var mtgRanRace = 0;
var isLastRaceRan = false;
var isOverseaMeeting = false;
var poolStatusByRace = [{}, {
    "WIN": "",
    "PLA": "",
    "W-P": "",
    "QIN": "",
    "QPL": "",
    "QQP": "",
    "FCT": "",
    "TRI": "",
    "DBL": "",
    "TCE": "",
    "F-F": "",
    "QTT": ""
}, {
    "WIN": "",
    "PLA": "",
    "W-P": "",
    "QIN": "",
    "QPL": "",
    "QQP": "",
    "FCT": "",
    "TRI": "",
    "DBL": "",
    "TCE": "",
    "F-F": "",
    "QTT": ""
}, {
    "WIN": "",
    "PLA": "",
    "W-P": "",
    "QIN": "",
    "QPL": "",
    "QQP": "",
    "FCT": "",
    "TRI": "",
    "D-T": "",
    "DBL": "",
    "TCE": "",
    "F-F": "",
    "QTT": ""
}, {
    "WIN": "",
    "PLA": "",
    "W-P": "",
    "QIN": "",
    "QPL": "",
    "QQP": "",
    "FCT": "",
    "TRI": "",
    "T-T": "",
    "DBL": "",
    "TCE": "",
    "F-F": "",
    "QTT": ""
}, {
    "WIN": "",
    "PLA": "",
    "W-P": "",
    "QIN": "",
    "QPL": "",
    "QQP": "",
    "FCT": "",
    "TRI": "",
    "DBL": "",
    "TCE": "",
    "6UP": "",
    "F-F": "",
    "QTT": ""
}, {
    "WIN": "",
    "PLA": "",
    "W-P": "",
    "QIN": "",
    "QPL": "",
    "QQP": "",
    "FCT": "",
    "TRI": "",
    "D-T": "",
    "DBL": "",
    "TCE": "",
    "F-F": "",
    "QTT": ""
}, {
    "WIN": "",
    "PLA": "",
    "W-P": "",
    "QIN": "",
    "QPL": "",
    "QQP": "",
    "FCT": "",
    "TRI": "",
    "DBL": "",
    "TCE": "",
    "F-F": "",
    "QTT": ""
}, {
    "WIN": "",
    "PLA": "",
    "W-P": "",
    "QIN": "",
    "QPL": "",
    "QQP": "",
    "FCT": "",
    "TRI": "",
    "DBL": "",
    "TBL": "",
    "TCE": "",
    "F-F": "",
    "QTT": ""
}, {
    "WIN": "",
    "PLA": "",
    "W-P": "",
    "QIN": "",
    "QPL": "",
    "QQP": "",
    "FCT": "",
    "TRI": "",
    "D-T": "",
    "DBL": "",
    "TCE": "",
    "F-F": "",
    "QTT": ""
}, {
    "WIN": "",
    "PLA": "",
    "W-P": "",
    "QIN": "",
    "QPL": "",
    "QQP": "",
    "FCT": "",
    "TRI": "",
    "TCE": "",
    "F-F": "",
    "QTT": ""
}];
var reserveList = 'ST';
var scratchList = 'ST';
var fieldSize = ["ST", 8, 14, 8, 14, 14, 13, 9, 12, 11, 13];
var fieldSizeWithReserve = ["ST", 8, 14, 8, 14, 14, 13, 9, 12, 11, 13];
var fieldSizeExcludeScratchAndReserve = ["ST", 8, 14, 8, 14, 14, 13, 9, 12, 11, 13];
var multiRacePoolsStr = {
    "DBL": [
        ["1", "2"],
        ["2", "3"],
        ["3", "4"],
        ["4", "5"],
        ["5", "6"],
        ["6", "7"],
        ["7", "8"],
        ["8", "9"],
        ["9", "10"]
    ],
    "TBL": [
        ["8", "9", "10"]
    ],
    "D-T": [
        ["3", "4"],
        ["6", "7"],
        ["9", "10"]
    ],
    "T-T": [
        ["4", "5", "6"]
    ],
    "6UP": [
        ["5", "6", "7", "8", "9", "10"]
    ]
};
var racePostTime = ["", "2022-09-18 13:00:00", "2022-09-18 13:30:00", "2022-09-18 14:00:00", "2022-09-18 14:30:00", "2022-09-18 15:00:00", "2022-09-18 15:35:00", "2022-09-18 16:05:00", "2022-09-18 16:35:00", "2022-09-18 17:10:00", "2022-09-18 17:45:00"];
var obStatusByRace = '0@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'.split('@@@');
var obCoupleByRace = '0@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'.split('@@@');
var meetingIdKey = 'MTG_20220918_0001';
var foKey = '_20220918_ST';
var mergedPoolName = {
    "TRI_8": "95219",
    "TRI_9": "95221",
    "TRI_1": "95205",
    "TRI_2": "95207",
    "TRI_3": "95209",
    "TRI_4": "95211",
    "TRI_5": "95213",
    "TRI_6": "95215",
    "TRI_7": "95217",
    "FCT_10": "95223",
    "F-F_5": "95212",
    "F-F_4": "95210",
    "F-F_7": "95216",
    "F-F_6": "95214",
    "F-F_1": "95204",
    "F-F_3": "95208",
    "QTT_1": "95204",
    "F-F_2": "95206",
    "QTT_2": "95206",
    "QTT_3": "95208",
    "QTT_4": "95210",
    "QTT_5": "95212",
    "QTT_6": "95214",
    "F-F_9": "95220",
    "QTT_7": "95216",
    "F-F_8": "95218",
    "QTT_8": "95218",
    "QTT_9": "95220",
    "FCT_7": "95217",
    "FCT_6": "95215",
    "TRI_10": "95223",
    "FCT_5": "95213",
    "FCT_4": "95211",
    "FCT_3": "95209",
    "FCT_2": "95207",
    "FCT_1": "95205",
    "QTT_10": "95222",
    "FCT_9": "95221",
    "FCT_8": "95219",
    "F-F_10": "95222"
};
var raceHeaderInfoEN = [{}, {
    "race": "Race 1",
    "venue": "Sha Tin",
    "date": "18/09/2022",
    "time": "13:00",
    "class": "Class 4",
    "track": "ALL WEATHER TRACK",
    "dist": "1200m"
}, {
    "race": "Race 2",
    "venue": "Sha Tin",
    "date": "18/09/2022",
    "time": "13:30",
    "class": "Class 5",
    "track": "TURF",
    "course": "\"B\" Course",
    "dist": "1400m"
}, {
    "race": "Race 3",
    "venue": "Sha Tin",
    "date": "18/09/2022",
    "time": "14:00",
    "class": "Class 4",
    "track": "ALL WEATHER TRACK",
    "dist": "1200m"
}, {
    "race": "Race 4",
    "venue": "Sha Tin",
    "date": "18/09/2022",
    "time": "14:30",
    "class": "Class 5",
    "track": "TURF",
    "course": "\"B\" Course",
    "dist": "1400m"
}, {
    "race": "Race 5",
    "venue": "Sha Tin",
    "date": "18/09/2022",
    "time": "15:00",
    "class": "Class 4",
    "track": "TURF",
    "course": "\"B\" Course",
    "dist": "1600m"
}, {
    "race": "Race 6",
    "venue": "Sha Tin",
    "date": "18/09/2022",
    "time": "15:35",
    "class": "Class 4",
    "track": "TURF",
    "course": "\"B\" Course",
    "dist": "1400m"
}, {
    "race": "Race 7",
    "venue": "Sha Tin",
    "date": "18/09/2022",
    "time": "16:05",
    "class": "Class 3",
    "track": "TURF",
    "course": "\"B\" Course",
    "dist": "1200m"
}, {
    "race": "Race 8",
    "venue": "Sha Tin",
    "date": "18/09/2022",
    "time": "16:35",
    "class": "Class 3",
    "track": "ALL WEATHER TRACK",
    "dist": "1200m"
}, {
    "race": "Race 9",
    "venue": "Sha Tin",
    "date": "18/09/2022",
    "time": "17:10",
    "class": "Class 2",
    "track": "TURF",
    "course": "\"B\" Course",
    "dist": "1000m"
}, {
    "race": "Race 10",
    "venue": "Sha Tin",
    "date": "18/09/2022",
    "time": "17:45",
    "class": "Class 3",
    "track": "TURF",
    "course": "\"B\" Course",
    "dist": "1400m"
}];
var raceHeaderInfoCH = [{}, {
    "race": "第1場",
    "venue": "沙田",
    "date": "18/09/2022",
    "time": "13:00",
    "class": "Class 4",
    "track": "ALL WEATHER TRACK",
    "dist": "1200米"
}, {
    "race": "第2場",
    "venue": "沙田",
    "date": "18/09/2022",
    "time": "13:30",
    "class": "Class 5",
    "track": "TURF",
    "course": "\"B\" ",
    "dist": "1400米"
}, {
    "race": "第3場",
    "venue": "沙田",
    "date": "18/09/2022",
    "time": "14:00",
    "class": "Class 4",
    "track": "ALL WEATHER TRACK",
    "dist": "1200米"
}, {
    "race": "第4場",
    "venue": "沙田",
    "date": "18/09/2022",
    "time": "14:30",
    "class": "Class 5",
    "track": "TURF",
    "course": "\"B\" ",
    "dist": "1400米"
}, {
    "race": "第5場",
    "venue": "沙田",
    "date": "18/09/2022",
    "time": "15:00",
    "class": "Class 4",
    "track": "TURF",
    "course": "\"B\" ",
    "dist": "1600米"
}, {
    "race": "第6場",
    "venue": "沙田",
    "date": "18/09/2022",
    "time": "15:35",
    "class": "Class 4",
    "track": "TURF",
    "course": "\"B\" ",
    "dist": "1400米"
}, {
    "race": "第7場",
    "venue": "沙田",
    "date": "18/09/2022",
    "time": "16:05",
    "class": "Class 3",
    "track": "TURF",
    "course": "\"B\" ",
    "dist": "1200米"
}, {
    "race": "第8場",
    "venue": "沙田",
    "date": "18/09/2022",
    "time": "16:35",
    "class": "Class 3",
    "track": "ALL WEATHER TRACK",
    "dist": "1200米"
}, {
    "race": "第9場",
    "venue": "沙田",
    "date": "18/09/2022",
    "time": "17:10",
    "class": "Class 2",
    "track": "TURF",
    "course": "\"B\" ",
    "dist": "1000米"
}, {
    "race": "第10場",
    "venue": "沙田",
    "date": "18/09/2022",
    "time": "17:45",
    "class": "Class 3",
    "track": "TURF",
    "course": "\"B\" ",
    "dist": "1400米"
}];
var allupPoolCROSS = [
    [],
    [{
        "txtEN": "WIN",
        "txtCH": "獨贏",
        "val": "WIN"
    }, {
        "txtEN": "PLA",
        "txtCH": "位置",
        "val": "PLA"
    }, {
        "txtEN": "W-P",
        "txtCH": "獨贏及位置",
        "val": "W-P"
    }, {
        "txtEN": "QIN",
        "txtCH": "連贏",
        "val": "QIN"
    }, {
        "txtEN": "QPL",
        "txtCH": "位置Q",
        "val": "QPL"
    }, {
        "txtEN": "QQP",
        "txtCH": "連贏及位置Q",
        "val": "QQP"
    }, {
        "txtEN": "FCT",
        "txtCH": "二重彩",
        "val": "FCT"
    }, {
        "txtEN": "TRI",
        "txtCH": "單T",
        "val": "TRI"
    }],
    [{
        "txtEN": "WIN",
        "txtCH": "獨贏",
        "val": "WIN"
    }, {
        "txtEN": "PLA",
        "txtCH": "位置",
        "val": "PLA"
    }, {
        "txtEN": "W-P",
        "txtCH": "獨贏及位置",
        "val": "W-P"
    }, {
        "txtEN": "QIN",
        "txtCH": "連贏",
        "val": "QIN"
    }, {
        "txtEN": "QPL",
        "txtCH": "位置Q",
        "val": "QPL"
    }, {
        "txtEN": "QQP",
        "txtCH": "連贏及位置Q",
        "val": "QQP"
    }, {
        "txtEN": "FCT",
        "txtCH": "二重彩",
        "val": "FCT"
    }, {
        "txtEN": "TRI",
        "txtCH": "單T",
        "val": "TRI"
    }],
    [{
        "txtEN": "WIN",
        "txtCH": "獨贏",
        "val": "WIN"
    }, {
        "txtEN": "PLA",
        "txtCH": "位置",
        "val": "PLA"
    }, {
        "txtEN": "W-P",
        "txtCH": "獨贏及位置",
        "val": "W-P"
    }, {
        "txtEN": "QIN",
        "txtCH": "連贏",
        "val": "QIN"
    }, {
        "txtEN": "QPL",
        "txtCH": "位置Q",
        "val": "QPL"
    }, {
        "txtEN": "QQP",
        "txtCH": "連贏及位置Q",
        "val": "QQP"
    }, {
        "txtEN": "FCT",
        "txtCH": "二重彩",
        "val": "FCT"
    }, {
        "txtEN": "TRI",
        "txtCH": "單T",
        "val": "TRI"
    }],
    [{
        "txtEN": "WIN",
        "txtCH": "獨贏",
        "val": "WIN"
    }, {
        "txtEN": "PLA",
        "txtCH": "位置",
        "val": "PLA"
    }, {
        "txtEN": "W-P",
        "txtCH": "獨贏及位置",
        "val": "W-P"
    }, {
        "txtEN": "QIN",
        "txtCH": "連贏",
        "val": "QIN"
    }, {
        "txtEN": "QPL",
        "txtCH": "位置Q",
        "val": "QPL"
    }, {
        "txtEN": "QQP",
        "txtCH": "連贏及位置Q",
        "val": "QQP"
    }, {
        "txtEN": "FCT",
        "txtCH": "二重彩",
        "val": "FCT"
    }, {
        "txtEN": "TRI",
        "txtCH": "單T",
        "val": "TRI"
    }],
    [{
        "txtEN": "WIN",
        "txtCH": "獨贏",
        "val": "WIN"
    }, {
        "txtEN": "PLA",
        "txtCH": "位置",
        "val": "PLA"
    }, {
        "txtEN": "W-P",
        "txtCH": "獨贏及位置",
        "val": "W-P"
    }, {
        "txtEN": "QIN",
        "txtCH": "連贏",
        "val": "QIN"
    }, {
        "txtEN": "QPL",
        "txtCH": "位置Q",
        "val": "QPL"
    }, {
        "txtEN": "QQP",
        "txtCH": "連贏及位置Q",
        "val": "QQP"
    }, {
        "txtEN": "FCT",
        "txtCH": "二重彩",
        "val": "FCT"
    }, {
        "txtEN": "TRI",
        "txtCH": "單T",
        "val": "TRI"
    }],
    [{
        "txtEN": "WIN",
        "txtCH": "獨贏",
        "val": "WIN"
    }, {
        "txtEN": "PLA",
        "txtCH": "位置",
        "val": "PLA"
    }, {
        "txtEN": "W-P",
        "txtCH": "獨贏及位置",
        "val": "W-P"
    }, {
        "txtEN": "QIN",
        "txtCH": "連贏",
        "val": "QIN"
    }, {
        "txtEN": "QPL",
        "txtCH": "位置Q",
        "val": "QPL"
    }, {
        "txtEN": "QQP",
        "txtCH": "連贏及位置Q",
        "val": "QQP"
    }, {
        "txtEN": "FCT",
        "txtCH": "二重彩",
        "val": "FCT"
    }, {
        "txtEN": "TRI",
        "txtCH": "單T",
        "val": "TRI"
    }],
    [{
        "txtEN": "WIN",
        "txtCH": "獨贏",
        "val": "WIN"
    }, {
        "txtEN": "PLA",
        "txtCH": "位置",
        "val": "PLA"
    }, {
        "txtEN": "W-P",
        "txtCH": "獨贏及位置",
        "val": "W-P"
    }, {
        "txtEN": "QIN",
        "txtCH": "連贏",
        "val": "QIN"
    }, {
        "txtEN": "QPL",
        "txtCH": "位置Q",
        "val": "QPL"
    }, {
        "txtEN": "QQP",
        "txtCH": "連贏及位置Q",
        "val": "QQP"
    }, {
        "txtEN": "FCT",
        "txtCH": "二重彩",
        "val": "FCT"
    }, {
        "txtEN": "TRI",
        "txtCH": "單T",
        "val": "TRI"
    }],
    [{
        "txtEN": "WIN",
        "txtCH": "獨贏",
        "val": "WIN"
    }, {
        "txtEN": "PLA",
        "txtCH": "位置",
        "val": "PLA"
    }, {
        "txtEN": "W-P",
        "txtCH": "獨贏及位置",
        "val": "W-P"
    }, {
        "txtEN": "QIN",
        "txtCH": "連贏",
        "val": "QIN"
    }, {
        "txtEN": "QPL",
        "txtCH": "位置Q",
        "val": "QPL"
    }, {
        "txtEN": "QQP",
        "txtCH": "連贏及位置Q",
        "val": "QQP"
    }, {
        "txtEN": "FCT",
        "txtCH": "二重彩",
        "val": "FCT"
    }, {
        "txtEN": "TRI",
        "txtCH": "單T",
        "val": "TRI"
    }],
    [{
        "txtEN": "WIN",
        "txtCH": "獨贏",
        "val": "WIN"
    }, {
        "txtEN": "PLA",
        "txtCH": "位置",
        "val": "PLA"
    }, {
        "txtEN": "W-P",
        "txtCH": "獨贏及位置",
        "val": "W-P"
    }, {
        "txtEN": "QIN",
        "txtCH": "連贏",
        "val": "QIN"
    }, {
        "txtEN": "QPL",
        "txtCH": "位置Q",
        "val": "QPL"
    }, {
        "txtEN": "QQP",
        "txtCH": "連贏及位置Q",
        "val": "QQP"
    }, {
        "txtEN": "FCT",
        "txtCH": "二重彩",
        "val": "FCT"
    }, {
        "txtEN": "TRI",
        "txtCH": "單T",
        "val": "TRI"
    }],
    [{
        "txtEN": "WIN",
        "txtCH": "獨贏",
        "val": "WIN"
    }, {
        "txtEN": "PLA",
        "txtCH": "位置",
        "val": "PLA"
    }, {
        "txtEN": "W-P",
        "txtCH": "獨贏及位置",
        "val": "W-P"
    }, {
        "txtEN": "QIN",
        "txtCH": "連贏",
        "val": "QIN"
    }, {
        "txtEN": "QPL",
        "txtCH": "位置Q",
        "val": "QPL"
    }, {
        "txtEN": "QQP",
        "txtCH": "連贏及位置Q",
        "val": "QQP"
    }, {
        "txtEN": "FCT",
        "txtCH": "二重彩",
        "val": "FCT"
    }, {
        "txtEN": "TRI",
        "txtCH": "單T",
        "val": "TRI"
    }]
];
var allupPoolWP = [
    [],
    [{
        "txtEN": "WIN",
        "txtCH": "獨贏",
        "val": "WIN"
    }, {
        "txtEN": "PLA",
        "txtCH": "位置",
        "val": "PLA"
    }, {
        "txtEN": "W-P",
        "txtCH": "獨贏及位置",
        "val": "W-P"
    }],
    [{
        "txtEN": "WIN",
        "txtCH": "獨贏",
        "val": "WIN"
    }, {
        "txtEN": "PLA",
        "txtCH": "位置",
        "val": "PLA"
    }, {
        "txtEN": "W-P",
        "txtCH": "獨贏及位置",
        "val": "W-P"
    }],
    [{
        "txtEN": "WIN",
        "txtCH": "獨贏",
        "val": "WIN"
    }, {
        "txtEN": "PLA",
        "txtCH": "位置",
        "val": "PLA"
    }, {
        "txtEN": "W-P",
        "txtCH": "獨贏及位置",
        "val": "W-P"
    }],
    [{
        "txtEN": "WIN",
        "txtCH": "獨贏",
        "val": "WIN"
    }, {
        "txtEN": "PLA",
        "txtCH": "位置",
        "val": "PLA"
    }, {
        "txtEN": "W-P",
        "txtCH": "獨贏及位置",
        "val": "W-P"
    }],
    [{
        "txtEN": "WIN",
        "txtCH": "獨贏",
        "val": "WIN"
    }, {
        "txtEN": "PLA",
        "txtCH": "位置",
        "val": "PLA"
    }, {
        "txtEN": "W-P",
        "txtCH": "獨贏及位置",
        "val": "W-P"
    }],
    [{
        "txtEN": "WIN",
        "txtCH": "獨贏",
        "val": "WIN"
    }, {
        "txtEN": "PLA",
        "txtCH": "位置",
        "val": "PLA"
    }, {
        "txtEN": "W-P",
        "txtCH": "獨贏及位置",
        "val": "W-P"
    }],
    [{
        "txtEN": "WIN",
        "txtCH": "獨贏",
        "val": "WIN"
    }, {
        "txtEN": "PLA",
        "txtCH": "位置",
        "val": "PLA"
    }, {
        "txtEN": "W-P",
        "txtCH": "獨贏及位置",
        "val": "W-P"
    }],
    [{
        "txtEN": "WIN",
        "txtCH": "獨贏",
        "val": "WIN"
    }, {
        "txtEN": "PLA",
        "txtCH": "位置",
        "val": "PLA"
    }, {
        "txtEN": "W-P",
        "txtCH": "獨贏及位置",
        "val": "W-P"
    }],
    [{
        "txtEN": "WIN",
        "txtCH": "獨贏",
        "val": "WIN"
    }, {
        "txtEN": "PLA",
        "txtCH": "位置",
        "val": "PLA"
    }, {
        "txtEN": "W-P",
        "txtCH": "獨贏及位置",
        "val": "W-P"
    }],
    [{
        "txtEN": "WIN",
        "txtCH": "獨贏",
        "val": "WIN"
    }, {
        "txtEN": "PLA",
        "txtCH": "位置",
        "val": "PLA"
    }, {
        "txtEN": "W-P",
        "txtCH": "獨贏及位置",
        "val": "W-P"
    }]
];
var allupPoolWPQ = [
    [],
    [{
        "txtEN": "QIN",
        "txtCH": "連贏",
        "val": "QIN"
    }, {
        "txtEN": "QPL",
        "txtCH": "位置Q",
        "val": "QPL"
    }, {
        "txtEN": "QQP",
        "txtCH": "連贏及位置Q",
        "val": "QQP"
    }],
    [{
        "txtEN": "QIN",
        "txtCH": "連贏",
        "val": "QIN"
    }, {
        "txtEN": "QPL",
        "txtCH": "位置Q",
        "val": "QPL"
    }, {
        "txtEN": "QQP",
        "txtCH": "連贏及位置Q",
        "val": "QQP"
    }],
    [{
        "txtEN": "QIN",
        "txtCH": "連贏",
        "val": "QIN"
    }, {
        "txtEN": "QPL",
        "txtCH": "位置Q",
        "val": "QPL"
    }, {
        "txtEN": "QQP",
        "txtCH": "連贏及位置Q",
        "val": "QQP"
    }],
    [{
        "txtEN": "QIN",
        "txtCH": "連贏",
        "val": "QIN"
    }, {
        "txtEN": "QPL",
        "txtCH": "位置Q",
        "val": "QPL"
    }, {
        "txtEN": "QQP",
        "txtCH": "連贏及位置Q",
        "val": "QQP"
    }],
    [{
        "txtEN": "QIN",
        "txtCH": "連贏",
        "val": "QIN"
    }, {
        "txtEN": "QPL",
        "txtCH": "位置Q",
        "val": "QPL"
    }, {
        "txtEN": "QQP",
        "txtCH": "連贏及位置Q",
        "val": "QQP"
    }],
    [{
        "txtEN": "QIN",
        "txtCH": "連贏",
        "val": "QIN"
    }, {
        "txtEN": "QPL",
        "txtCH": "位置Q",
        "val": "QPL"
    }, {
        "txtEN": "QQP",
        "txtCH": "連贏及位置Q",
        "val": "QQP"
    }],
    [{
        "txtEN": "QIN",
        "txtCH": "連贏",
        "val": "QIN"
    }, {
        "txtEN": "QPL",
        "txtCH": "位置Q",
        "val": "QPL"
    }, {
        "txtEN": "QQP",
        "txtCH": "連贏及位置Q",
        "val": "QQP"
    }],
    [{
        "txtEN": "QIN",
        "txtCH": "連贏",
        "val": "QIN"
    }, {
        "txtEN": "QPL",
        "txtCH": "位置Q",
        "val": "QPL"
    }, {
        "txtEN": "QQP",
        "txtCH": "連贏及位置Q",
        "val": "QQP"
    }],
    [{
        "txtEN": "QIN",
        "txtCH": "連贏",
        "val": "QIN"
    }, {
        "txtEN": "QPL",
        "txtCH": "位置Q",
        "val": "QPL"
    }, {
        "txtEN": "QQP",
        "txtCH": "連贏及位置Q",
        "val": "QQP"
    }],
    [{
        "txtEN": "QIN",
        "txtCH": "連贏",
        "val": "QIN"
    }, {
        "txtEN": "QPL",
        "txtCH": "位置Q",
        "val": "QPL"
    }, {
        "txtEN": "QQP",
        "txtCH": "連贏及位置Q",
        "val": "QQP"
    }]
];
var allupPoolTRI = [
    [],
    [{
        "txtEN": "TRI",
        "txtCH": "單T",
        "val": "TRI"
    }],
    [{
        "txtEN": "TRI",
        "txtCH": "單T",
        "val": "TRI"
    }],
    [{
        "txtEN": "TRI",
        "txtCH": "單T",
        "val": "TRI"
    }],
    [{
        "txtEN": "TRI",
        "txtCH": "單T",
        "val": "TRI"
    }],
    [{
        "txtEN": "TRI",
        "txtCH": "單T",
        "val": "TRI"
    }],
    [{
        "txtEN": "TRI",
        "txtCH": "單T",
        "val": "TRI"
    }],
    [{
        "txtEN": "TRI",
        "txtCH": "單T",
        "val": "TRI"
    }],
    [{
        "txtEN": "TRI",
        "txtCH": "單T",
        "val": "TRI"
    }],
    [{
        "txtEN": "TRI",
        "txtCH": "單T",
        "val": "TRI"
    }],
    [{
        "txtEN": "TRI",
        "txtCH": "單T",
        "val": "TRI"
    }]
];
var allupPoolCWIN = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];
var allupPoolFCT = [
    [],
    [{
        "txtEN": "FCT",
        "txtCH": "二重彩",
        "val": "FCT"
    }],
    [{
        "txtEN": "FCT",
        "txtCH": "二重彩",
        "val": "FCT"
    }],
    [{
        "txtEN": "FCT",
        "txtCH": "二重彩",
        "val": "FCT"
    }],
    [{
        "txtEN": "FCT",
        "txtCH": "二重彩",
        "val": "FCT"
    }],
    [{
        "txtEN": "FCT",
        "txtCH": "二重彩",
        "val": "FCT"
    }],
    [{
        "txtEN": "FCT",
        "txtCH": "二重彩",
        "val": "FCT"
    }],
    [{
        "txtEN": "FCT",
        "txtCH": "二重彩",
        "val": "FCT"
    }],
    [{
        "txtEN": "FCT",
        "txtCH": "二重彩",
        "val": "FCT"
    }],
    [{
        "txtEN": "FCT",
        "txtCH": "二重彩",
        "val": "FCT"
    }],
    [{
        "txtEN": "FCT",
        "txtCH": "二重彩",
        "val": "FCT"
    }]
];
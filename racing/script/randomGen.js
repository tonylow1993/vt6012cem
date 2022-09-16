function randomLeg(raceNo, ranSize) {
    var r = createEmptyArray(fieldSizeWithReserve[raceNo]);
    var rCnt = (fieldSizeExcludeScratchAndReserve[raceNo] < ranSize) ? fieldSizeExcludeScratchAndReserve[raceNo] : ranSize;
    var i = 0;
    while (i < rCnt) {
        var n = Math.ceil(Math.random() * fieldSizeWithReserve[raceNo]);
        var runner = $.grep(normalRunnerList[raceNo], function(_obj) {
            return _obj.num == n;
        })[0];
        if (runner == null || runner.scratched || runner.standbyStatus != 'N') {
            continue;
        }
        if (!r['P' + runner.num]) {
            r['P' + runner.num] = true;
            i++;
        }
    }
    return r;
}

function randomBanker(raceNo, ranSize, legs) {
    var r = createEmptyArray(fieldSizeWithReserve[raceNo]);
    var rCnt = (fieldSizeExcludeScratchAndReserve[raceNo] < ranSize) ? fieldSizeExcludeScratchAndReserve[raceNo] : ranSize;
    var i = 0;
    while (i < rCnt) {
        var n = Math.ceil(Math.random() * fieldSizeWithReserve[raceNo]);
        var runner = $.grep(normalRunnerList[raceNo], function(_obj) {
            return _obj.num == n;
        })[0];
        if (runner == null || runner.scratched || runner.standbyStatus != 'N') {
            continue;
        }
        if (!r['P' + runner.num] && !legs['P' + runner.num]) {
            r['P' + runner.num] = true;
            i++;
        }
    }
    return r;
}
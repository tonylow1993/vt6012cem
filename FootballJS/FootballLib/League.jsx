var League = function(_strLeagueCode, _strLeagueName, _strShortName) {
    this._strLeagueCode = _strLeagueCode;
    this._strLeagueName = _strLeagueName;
    this._strShortName = _strShortName;
};

League.GetFlagPath = function(_strShortName) {
    return getConfig("nas_image_path") + "flag_" + _strShortName + ".gif" + cacheVersion;
};

//# sourceURL=/football/lib/League.js
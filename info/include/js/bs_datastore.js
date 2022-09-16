var dataStore = window.sessionStorage;

function SetDataStore(name, value) {
    dataStore.setItem(name, value);
}

function GetDataStore(name) {
    var val = dataStore.getItem(name);
    if (val == null)
        return "";
    return val;
}

// Clear all data but keep language
function ClearDataStore() {
    for (var key in dataStore) {
        if (key.indexOf("__extend") != 0) {
            dataStore.removeItem(key);
        }
    }
}

function ClearDataStoreItem(key) {
    try {
        return dataStore.removeItem(key);
    } catch (e) {}
}

function InitDataStore() {
    SetDataStore("session_id", 0);
    SetDataStore("is_logon", 0);
    SetDataStore("need_refresh_balance_after_eft", 0);
    SetDataStore("bs_loaded", "1");

    // Support SSO
    SetDataStore("sso_guid", "");
    SetDataStore("sso_sign_in_level", "0");
    SetDataStore("sso_web_id", "");
}

function isLogon() { // check is logon 
    return 1 == GetDataStore('is_logon');
}

function GetLanguage() {
    var lang = parseInt(dataStore.GetData("language"));
    if (!isNaN(lang))
        return lang;
    return 1;
}
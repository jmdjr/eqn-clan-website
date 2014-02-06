// these extension functions add quick efficient ways for breakingdown, processing and building url property lists.
//  format is key1=var1&key2=var2&key3=var3... etc.
$.extend({
    hashifyString: function (varstring) {
        var vars = [], hash;
        var hashes = varstring.split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },

    iterateHash: function (varhash, foreachHandle) {
        if (varhash != null && varhash.length != null) {
            for (var i = 0; i < varhash.length; ++i) {
                if (varhash[i] != "" && varhash[varhash[i]] != "") {
                    if (typeof (foreachHandle) === 'function') {
                        foreachHandle(varhash[i], varhash[varhash[i]]);
                    }
                }
            }
        }
    },

    appendToHash: function (hash, key, value) {
        hash.push(key);
        hash[key] = value;
    },

    getHashLastKeyValue: function (hash) {
        return { key: hash[hash.length - 1], value: hash[hash[hash.length - 1]] };
    },

    stringifyHash: function (varhash) {
        var str = "";
        this.iterateHash(varhash, function (a, b) { str = str + a + "=" + b + "&"; });
        str = str.slice(0, -1);
        return str;
    },

    getUrlVars: function () {
        return $.hashifyString(window.location.href.slice(window.location.href.indexOf('?') + 1));
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    }
});
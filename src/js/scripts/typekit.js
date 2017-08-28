'use strict';

var kitId = 'usm0mrn';

module.exports = function () {
    /*(function (d) {
        var config = {
                kitId: kitId,
                scriptTimeout: 3000,
                async: true
            },
            h = d.documentElement, t = setTimeout(function () {
                h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
            }, config.scriptTimeout), tk = d.createElement("script"), f = false, s = d.getElementsByTagName("script")[0], a;
        h.className += " wf-loading";
        tk.src = 'https://use.typekit.net/' + config.kitId + '.js';
        tk.async = true;
        tk.onload = tk.onreadystatechange = function () {
            a = this.readyState;
            if (f || a && a != "complete" && a != "loaded")return;
            f = true;
            clearTimeout(t);
            try {
                Typekit.load(config)
            } catch (e) {
            }
        };
        s.parentNode.insertBefore(tk, s)
    })(document);*/

    // improved from: https://blog.5apps.com/2014/02/21/using-typekit-the-right-way-with-an-improved-loading-script.html
    (function (d) {
        var tkTimeout = 3000;
        if (window.sessionStorage) {
            if (sessionStorage.getItem('useTypekit') === 'false') {
                tkTimeout = 0;
            }
        }
        var config = {
                kitId: kitId,
                scriptTimeout: tkTimeout
            },
            h = d.documentElement, t = setTimeout(function () {
                h.className = h.className.replace(/\bwf-loading\b/g, "") + "wf-inactive";
                if (window.sessionStorage) {
                    sessionStorage.setItem("useTypekit", "false")
                }
            }, config.scriptTimeout), tk = d.createElement("script"), f = false, s = d.getElementsByTagName("script")[0], a;
        h.className += "wf-loading";
        tk.src = '//use.typekit.net/' + config.kitId + '.js';
        tk.async = true;
        tk.onload = tk.onreadystatechange = function () {
            a = this.readyState;
            if (f || a && a != "complete" && a != "loaded")return;
            f = true;
            clearTimeout(t);
            try {
                Typekit.load(config)
            } catch (e) {
            }
        };
        s.parentNode.insertBefore(tk, s)
    })(document);
};
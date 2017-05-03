/**
 * Google Tag Manager snippet and data layer get initialized in this module.
 * Google Analytics and Google Tag Services scripts are inserted as well.
 */

// TODO add this module to the `common.js`

(function() {

    // Google Analytics
    var _gaq = _gaq || [];
    var pluginUrl =
        '//www.google-analytics.com/plugins/ga/inpage_linkid.js';
    _gaq.push(['_require', 'inpage_linkid', pluginUrl]);
    _gaq.push(['_setAccount', 'UA-18104017-1']);
    _gaq.push(['_setDomainName', 'guyspy.com']);
    _gaq.push(['_trackPageview']);

    (function () {
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
    })();

    // Google Universal Analytics
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-40198010-1', 'guyspy.com');

    // Set custom dimensions
    var dimensions = {};
    var custom_ga = "{{ custom_ga }}";
    if (custom_ga) {
        // TODO: set `idx` to a comprehensive var name (e.g. `returned_user`) as soon as GA gets disabled
        for (var idx in custom_ga) {
            if (custom_ga.hasOwnProperty(idx)) {
                dimensions['dimension' + idx] = custom_ga[idx];
                // TODO disable GA dims setup
                ga('set', dimensions['dimension' + idx], custom_ga[idx]);
            }
        }
    }
    // Tag page view in GA
    ga('send', 'pageview');

    // Safely instantiate Google Tag Manager dataLayer object and populate it with custom `dimensions`
    // Ref: http://www.lunametrics.com/blog/2016/03/21/gtm-data-layer-best-practices/
    var dataLayer = window.dataLayer = window.dataLayer || [{'dimensions': dimensions}];

    // Google Tag Manager snippet. It is to be inserted only after the GTM data layer gets initialized.
    (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
            'gtm.start': new Date().getTime(), event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src =
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-NL28SMD');

    // Google DFP
    (function () {
        var gads = document.createElement('script');
        gads.async = true;
        gads.type = 'text/javascript';
        var useSSL = 'https:' == document.location.protocol;
        gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
        var node = document.getElementsByTagName('script')[0];
        node.parentNode.insertBefore(gads, node);
    })();

})();

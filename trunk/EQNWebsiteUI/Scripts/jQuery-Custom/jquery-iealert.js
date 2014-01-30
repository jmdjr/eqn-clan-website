/*
 * IE Alert! jQuery plugin
 * Version 2.1
 * Author: David Nemes | @nmsdvid
 * http://nmsdvid.com/iealert/
 */

(function ($) {
    function initialize($obj, option) {

        if (ie < 9) {
            if (option.isOutdated != null) {
                option.isOutdated();
            }
        }
    }

    ; //end initialize function

    $.fn.iealert = function (options) {
        var defaults = {
            isOutdated: null
        };

        var option = $.extend({}, defaults, options);

        ie = (function () {

            var undef,
                v = 3,
                div = document.createElement('div'),
                all = div.getElementsByTagName('i');

            while (
                div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                all[0]
            );

            return v > 4 ? v : undef;

        }());
        // If browser is Internet Explorer
        if (($.cookie("outdatedPopup") === undefined || $.cookie("outdatedPopup") == null) && (ie >= 5) && (ie < 9)) {
            var $this = $(this);
            initialize($this, option);
            return true;
        }

        return false;
    };
})(jQuery);

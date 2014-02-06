
//
// Created By John Davis Jr
//
// This script will enable a tertiary navigation between pre-determined regions of details (structured html) using a fancy navigation scheme which
// rely on user interactions.  its a fancy navigator!
// Version 1.0.0
//
// Verified to work properly on jQuery 1.9.1.

(function ($) {
    /********************************************************************************/
    /*****      0. Initial Defaults                                            ******/
    /********************************************************************************/
    /*--- 0.1. initial defaults                               ----------------------*/
    var initialDefaults = {
    };

    /*--- 0.2. initial Cache                                  ----------------------*/
    var initialCache = {
    };

    /*--- 0.3. initial Cache                                  ----------------------*/
    // enables access to these properties through the data of the context.
    var access = function () {
        this.defaults = function (context, defaults) {
            if (defaults !== undefined) { $(context).data("defaults", defaults); }
            return $(context).data("defaults");
        };

        this.cache = function (context, cache) {
            if (cache !== undefined) { $(context).data("cache", cache); }
            return $(context).data("cache");
        };
    }();

    /********************************************************************************/
    /*****    6. Standard Methods                                              ******/
    /********************************************************************************/

    var methods = {
        /*--- 6.1. Get Navigation Item array Control               -----------------*/
        init: function (options) {

            // this refers to the selector used.
            $(this).each(function (index, context) {

                if (access.cache(context) != null) {
                    // if cache already exists on this element, it already has been initialized.
                    return;
                }

                var definedDefaults = $.extend(true, {}, initialDefaults, options);
                var definedCache = $.extend({}, initialCache);
                access.defaults(context, definedDefaults); access.cache(context, definedCache);
            });
        }
    };
/********************************************************************************/
/*****    7. Standard jQuery Extension function definition                 ******/
/********************************************************************************/

$.fn.ActivityNavigation = function (method) {
    if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
        return methods.init.apply(this, arguments);
    }
    else {
        $.error('Method ' + method + ' does not exist on jQuery.AnimateCard');
    }
};
})(jQuery);
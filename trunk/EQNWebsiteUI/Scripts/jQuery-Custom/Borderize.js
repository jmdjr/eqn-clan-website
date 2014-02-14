
//
// Created By John Davis Jr
//
// Version 1.0.0
//
// Verified to work properly on jQuery 1.10.2

// Assumes all cells are the same dimensions. cells being one of the 6 distinct areas that require images...
//  horizontal, vertical, top-left corner, top-right corner, bottom-left corner and bottom-right corner borders.
(function ($) {
    /********************************************************************************/
    /*****      0. Initial Defaults                                            ******/
    /********************************************************************************/
    /*--- 0.1. initial defaults                               ----------------------*/
    var initialDefaults = {
        tableCssClass: 'borderize-default-table'
    };

    /*--- 0.2. initial Cache                                  ----------------------*/
    var initialCache = {
    };

    /*--- 0.3. initial Cache                                  ----------------------*/
    // enables access to these properties through the data of the context.
    var access = new function () {
        this.defaults = function (context, defaults) {
            if (defaults !== undefined) { $(context).data("defaults", defaults); }
            return $(context).data("defaults");
        };

        this.cache = function (context, cache) {
            if (cache !== undefined) { $(context).data("cache", cache); }
            return $(context).data("cache");
        };

        this.getState = function (context) {
            return { _d: this.defaults(context), _c: this.cache(context) };
        }
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

                methods.wrapContext(this);
            });
        },

        wrapContext: function (context) {
            var _o = access.getState(context);
            var parent = $(context);
            var elements = $(context).children().wrapAll("<td class='borderize-center'></td>");
            elements = $(context).find('.borderize-center').detach();

            $("<table class='" + _o._d.tableCssClass + "'><tr class='borderize-top-row'><td class='borderize-top-left-corner'></td><td class='borderize-horizontal'></td><td class='borderize-top-right-corner'></td></tr>"
                + "<tr class='borderize-middle-row'><td class='borderize-vertical'></td>" + "<td class='placeholder'></td>" + "<td class='borderize-vertical'></td></tr>"
                + "<tr class='borderize-bottom-row'><td class='borderize-bottom-left-corner'></td><td class='borderize-horizontal'></td><td class='borderize-bottom-right-corner'>"
                + "</td></tr></table>")
            .appendTo(parent);
            parent.find('.placeholder').replaceWith(elements);
        }
    };
    /********************************************************************************/
    /*****    7. Standard jQuery Extension function definition                 ******/
    /********************************************************************************/

    $.fn.Borderize = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method ' + method + ' does not exist on jQuery.Borderize');
        }
    };
})(jQuery);
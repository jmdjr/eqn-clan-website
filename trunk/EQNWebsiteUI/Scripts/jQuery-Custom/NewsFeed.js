
//
// Created By John Davis Jr
//
// Version 1.0.0
//
// Verified to work properly on jQuery 1.10.2
// Requires Mustache.js, GoogleJsApi.js

(function ($) {
    /********************************************************************************/
    /*****      0. Initial Defaults                                            ******/
    /********************************************************************************/
    /*--- 0.1. initial defaults                               ----------------------*/
    var initialDefaults = {
        feed: 'https://forums.station.sony.com/everquestnext/index.php?forums/-/index.rss',
        template: "{{#item}}<div class='NewsFeedEntry'><a href='{{link}}' target='_blank'>{{title}}</a></div>{{/item}}",
        feedLimit: 20
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

        this.getState = function (context)
        {
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

                methods.LoadFeed(this);
            });
        },

        LoadFeed: function (context) {
            var _o = access.getState(context);
            var partialTemplate = _o._d.template;

            $.get('/Base/GetFeeds', '', function (Data) {
                var view = Data.rss.channel;
                var output = Mustache.render(partialTemplate, view);

                $(context).empty().append(output);
            });
        }
    };

/********************************************************************************/
/*****    7. Standard jQuery Extension function definition                 ******/
/********************************************************************************/

$.fn.NewsFeed = function (method) {
    if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
        return methods.init.apply(this, arguments);
    }
    else {
        $.error('Method ' + method + ' does not exist on jQuery.NewsFeed');
    }
};
})(jQuery);

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
        DisplayPane: '.anDisplayPane',
        DisplayTransition: 'Fade',
        AutoLoad: true,
        navPane: {
            height: 150,
            width: 600,
            rows: 1,
            columns: 4,
            pageByItemCount: 0,
            rowPadding: 10,
            columnPadding: 5,
            enableNavControls: true,
            enableSelectedElementFirst: true,
            enableCyclicalElementList: true
        },
        navItem: {
            height: 130,
            width: 115,
            TitlePosition: 'Top',
            selectedItemClass: 'anNavItemSelected',
            sectionTransitionDelay: 400
        },
        navItemImage: {
            height: 110,
            width: 110
        },
        navItemArray: {
        },
        OnItemSelect: $.noop(),
        OnItemSelected: $.noop(),
        OnPageLeft: $.noop(),
        OnPageRight: $.noop(),
        Selectors: {
            Main: '.anNavPane',
            NavItemArray: '.anNavItemArray',
            NavItem: '.anNavItem',
            NavItemTitle: '.anNavItemTitle',
            NavItemImage: '.anNavItemImage',
            NavItemSection: '.anNavItemSection',
            NavPageLeft: '.anNavPageLeft',
            NavPageRight: '.anNavPageRight',
            SelectedNavItem: '.anNavItemSelected'
        }
    };

    /*--- 0.2. initial Cache                                  ----------------------*/
    var initialCache = {
        SelectedNavItem: null,
        LastSelectedNavItem: null,
        NavItemOrder: null,
        OldNavItemOrder: null,
        items: null,
        reverseLeft: false,
        reverseRight: false
    };

    /*--- 0.3. initial Cache                                  ----------------------*/
    // enables access to these properties through the data of the context.
    var access = {
        defaults: function (context, defaults) {
            if (defaults !== undefined) { $(context).data("defaults", defaults); }
            return $(context).data("defaults");
        },
        cache: function (context, cache) {
            if (cache !== undefined) { $(context).data("cache", cache); }
            return $(context).data("cache");
        },

        SectionId: function (context, SectionId) {
            if (SectionId !== undefined) { $(context).data("SectionId", SectionId); }
            return $(context).data("SectionId");
        },

        defaultPosition: function (context, dPosition) {
            if (dPosition !== undefined) { $(context).data("dPosition", dPosition); }
            return $(context).data("dPosition");
        }
    };
    /********************************************************************************/
    /*****      1. Navigation Pane                                             ******/
    /********************************************************************************/
    var NavPane = {
        /*--- 1.1. Get navigation pane control from context       ------------------*/
        get: function (context, defaults) { return $(context).children(defaults.Selectors.Main); },

        /*--- 1.2. Initialize the Navigation Pane                 ------------------*/
        init: function (context) {
            var defaults = access.defaults(context), cache = access.cache(context);

            $(NavPane.get(context, defaults)).css({
                height: defaults.navPane.height,
                width: defaults.navPane.width,
                position: 'relative',
                overflow: 'hidden'
            });

            NavControls.init(context);
            NavItemArray.init(context);
        }
    }

    /********************************************************************************/
    /*****    2. Navigation Controls                                           ******/
    /********************************************************************************/
    var NavControls = {
        /*--- 2.1. Get Navigate Page Left control                 ------------------*/
        getNavPageLeft: function (context, defaults) { return NavPane.get(context, defaults).children(defaults.Selectors.NavPageLeft); },

        /*--- 2.2. Get Navigate Page Right control                ------------------*/
        getNavPageRight: function (context, defaults) { return NavPane.get(context, defaults).children(defaults.Selectors.NavPageRight); },

        /*--- 2.3. Initialize the Nav Controls                    ------------------*/
        init: function (context) {
            var defaults = access.defaults(context), cache = access.cache(context);

            var navPane = NavPane.get(context, defaults);
            var navArray = NavItemArray.get(context, defaults);
            var left = NavControls.getNavPageLeft(context, defaults);
            var right = NavControls.getNavPageRight(context, defaults);
            var navArraySize = NavItemArray.getNavArraySize(defaults);

            if (defaults.navPane.columns * defaults.navPane.rows >= NavItemArray.getItems(context, defaults).length) {
                defaults.navPane.enableNavControls = false;
            }
            else {
                defaults.navPane.enableNavControls = true;
            }
            access.defaults(context, defaults);

            if (defaults.navPane.enableNavControls) {
                left.show();
                right.show();
                left.children().show();
                right.children().show();
                left.add(right).css({
                    cursor: 'pointer',
                    position: 'relative',
                    '-moz-user-select': "none",
                    '-webkit-user-select': "none"
                });

                left.prop("onselectstart", "return false;");
                NavControls.EnablePageLeft(context, true);
                left.children().css({
                    position: 'absolute',
                    top: ($(left).height() / 2 - left.children().height() / 2)
                });

                right.prop("onselectstart", "return false;");
                NavControls.EnablePageRight(context, true);
                right.children().css({
                    position: 'absolute',
                    top: ($(right).height() / 2 - right.children().height() / 2)
                });
            } else { left.children().hide(); right.children().hide(); }
        },

        /*--- 2.4. Transitions items for Next Right page in      ------------------*/
        RotatePageRight: function (context) {
            var defaults = access.defaults(context), cache = access.cache(context);

            if (cache.items !== null) {
                var fullList = $(cache.NavItemOrder);
                var displayList = $(cache.items);

                var tailIndex = 0;

                if (defaults.navPane.pageByItemCount > 0) {
                    tailIndex = displayList.first();
                    tailIndex = fullList.index(tailIndex) + defaults.navPane.pageByItemCount;
                } else {
                    tailIndex = displayList.last();
                    tailIndex = fullList.index(tailIndex) + 1;
                }

                tailIndex = (tailIndex) % fullList.length;

                fullList.not(cache.items).finish().css({ left: NavItemArray.getNavArraySize(defaults).width, display: 'none' });

                NavItemArray.CollectAndOrderItems(context, tailIndex);

                if (defaults.navPane.pageByItemCount > 0) { fullList = fullList.not(cache.items); }

                fullList.finish().animate({ left: 0 - defaults.navItem.width }, {
                    complete: function () { $(this).css({ left: NavItemArray.getNavArraySize(defaults).width, display: 'none' }); }
                });

                NavItemArray.recalcPositions(context);
                if (defaults.OnPageRight !== undefined) { defaults.OnPageRight(context, null); }
            }
        },

        /*--- 2.5. Transitions items for Next Left page in       ------------------*/
        RotatePageLeft: function (context) {
            var defaults = access.defaults(context), cache = access.cache(context);

            if (cache.items !== null) {

                var fullList = $(cache.NavItemOrder);
                var displayList = $(cache.items);

                if (defaults.navPane.enableSelectedElementFirst) {
                    displayList = displayList.not(cache.SelectedNavItem);
                }

                var headIndex = -1;

                if (defaults.navPane.pageByItemCount > 0) {
                    headIndex = -1 * defaults.navPane.pageByItemCount;
                } else {
                    headIndex = fullList.index(headIndex) - defaults.navPane.columns * defaults.navPane.rows + 1;
                }

                headIndex = (headIndex + $(cache.NavItemOrder).length);

                fullList.not(cache.items).finish().css({ left: 0 - defaults.navItem.width, display: 'none' });

                NavItemArray.CollectAndOrderItems(context, headIndex);

                if (defaults.navPane.pageByItemCount > 0) { fullList = fullList.not(cache.items); }

                fullList.finish().animate({ left: NavItemArray.getNavArraySize(defaults).width }, {
                    complete: function () { $(this).css({ left: 0 - defaults.navItem.width, display: 'none' }); }
                });

                NavItemArray.recalcPositions(context);
                if (defaults.OnPageLeft !== undefined) { defaults.OnPageLeft(context, null); }
            }
        },

        EnablePageLeft: function (context, enabledFlag) {
            var defaults = access.defaults(context), cache = access.cache(context);
            var left = NavControls.getNavPageLeft(context, defaults);
            if (enabledFlag) {
                left.off('click').click(function () { NavControls.RotatePageLeft(context); });
            }
            else {
                left.off('click');
            }
        },

        EnablePageRight: function (context, enabledFlag) {
            var defaults = access.defaults(context), cache = access.cache(context);
            var right = NavControls.getNavPageRight(context, defaults);
            if (enabledFlag) {
                right.off('click').click(function () { NavControls.RotatePageRight(context); });
            }
            else {
                right.off('click');
            }
        }
    }

    /********************************************************************************/
    /*****    3. Navigation Item Array                                         ******/
    /********************************************************************************/
    var NavItemArray = {

        /*--- 3.1. Get Navigation Item array Control              ------------------*/
        get: function (context, defaults) { return NavPane.get(context, defaults).children(defaults.Selectors.NavItemArray); },

        /*--- 3.2. Get Navigation Item array Control              ------------------*/
        getItems: function (context, defaults) { return NavItemArray.get(context, defaults).children(defaults.Selectors.NavItem); },

        /*--- 3.3. Get Navigation Item array Control              ------------------*/
        getNavArraySize: function (defaults) {

            var dimension = {
                height: defaults.navPane.rows * (defaults.navItem.height + defaults.navPane.rowPadding),
                width: defaults.navPane.columns * (defaults.navItem.width + defaults.navPane.columnPadding)
            };

            if (defaults.navItemArray.height != null) {
                dimension.height = defaults.navItemArray.height;
            }

            if (defaults.navItemArray.width != null) {
                dimension.width = defaults.navItemArray.width;
            }
            return dimension;
        },

        /*--- 3.4. initialize navigation controls                 ------------------*/
        init: function (context) {
            var defaults = access.defaults(context), cache = access.cache(context);

            var items = NavItemArray.getItems(context, defaults);

            NavItemArray.get(context, defaults).css(NavItemArray.getNavArraySize(defaults));

            NavItemArray.get(context, defaults).css({
                position: 'relative',
                overflow: 'hidden'
            });

            cache.NavItemOrder = $(items);
            access.cache(context, cache);

            $(items).each(function (index, element) {
                NavItem.init(context, element, index);
            });

            if ((defaults.navPane.enableNavControls || defaults.navPane.enableSelectedElementFirst)
                && $(items).length < defaults.navPane.rows * defaults.navPane.columns * 2) {

                if ($(items).length < defaults.navPane.rows * defaults.navPane.columns) {
                    defaults.navPane.rows = 1;
                    defaults.navPane.columns = $(items).length;
                    access.defaults(context, defaults);
                    NavItemArray.get(context, defaults).css(NavItemArray.getNavArraySize(defaults));
                }

                var extensionItems = $(items).clone(true, true);
                NavItemArray.get(context, defaults).prepend(extensionItems);
                items = NavItemArray.getItems(context, defaults);
                cache.NavItemOrder = $(items);
                access.cache(context, cache);
            }
            NavItem.SelectItem(context, $(items).first());

            $(function () {
                if (defaults.OnItemSelect !== undefined) {
                    defaults.OnItemSelect(context, $(items).first());
                }
            });

            items.css({
                'position': 'absolute',
                'display': 'none',
                left: NavItemArray.getNavArraySize(defaults).width
            });

            NavItemArray.establishNavItems(context);
            NavItem.displayNavItemSection(context, defaults, null, cache.SelectedNavItem);
        },

        /*--- 3.5. Get Navigation Item array Control              ------------------*/
        establishNavItems: function (context) { this.CollectAndOrderItems(context); this.recalcPositions(context); },

        /*--- 3.6. Get Navigation Item array Control              ------------------*/
        CollectAndOrderItems: function (context, firstIndex) {
            var defaults = access.defaults(context), cache = access.cache(context);
            var items = $(cache.NavItemOrder);

            if (firstIndex === undefined) { firstIndex = 0; }
            if (defaults.navPane.enableCyclicalElementList) {
                var newBegining = items.slice(firstIndex);
                $.merge(newBegining, items.slice(0, firstIndex));
                items = newBegining;
                cache.NavItemOrder = newBegining;
            }

            items.css({ 'z-index': 0 });

            var totalVisible = defaults.navPane.rows * defaults.navPane.columns;

            items = items.slice(0, totalVisible);

            $(items).css({ 'z-index': 1 });
            $(cache.SelectedNavItem).css({ 'z-index': 2 });

            cache.items = items;
            access.cache(context, cache);
        },

        /*--- 3.7. Get Navigation Item array Control              ------------------*/
        recalcPositions: function (context) {
            var defaults = access.defaults(context), cache = access.cache(context);
            var cols = defaults.navPane.columns, rows = defaults.navPane.rows;
            var items = cache.items;
            $(items).each(function (index, element) {
                $(element).finish();

                var top = Math.floor(index / cols) * defaults.navItem.height + defaults.navPane.rowPadding * Math.floor(index / cols);
                var left = (index % cols) * defaults.navItem.width + defaults.navPane.columnPadding * (index % cols);

                $(element).css({ 'top': top, display: 'block' });

                $(element).finish().animate({ 'left': left });
            });
        }
    };

    /********************************************************************************/
    /*****    4. Navigate Item                                                 ******/
    /********************************************************************************/

    var NavItem = {
        /*--- 4.1. Get Navigation Item array Control              ------------------*/
        getNavItemTitle: function (item, defaults) { return $(item).children(defaults.Selectors.NavItemTitle); },

        /*--- 4.2. Get Navigation Item array Control              ------------------*/
        getNavItemImage: function (item, defaults) { return $(item).children('img'); },

        /*--- 4.3. Get Navigation Item array Control              ------------------*/
        getNavItemSection: function (item, defaults) { return $(item).children(defaults.Selectors.NavItemSection); },

        /*--- 4.4. Get Navigation Item array Control              ------------------*/
        getNavItemSectionId: function (item, SectionId) {
            if (SectionId !== undefined) {
                $(item).data("SectionId", SectionId);
                return $(item).data("SectionId");
            }

            return $(item).data("SectionId");
        },

        /*--- 4.5. initialize Navigation Items                    ------------------*/
        init: function (context, item, index) {
            var defaults = access.defaults(context), cache = access.cache(context);

            var title = NavItem.getNavItemTitle(item, defaults);
            var image = NavItem.getNavItemImage(item, defaults);
            var section = NavItem.getNavItemSection(item, defaults);

            if (defaults.navItem.TitlePosition === 'Bottom') {
                $(title).detach(); $(section).detach();
                $(item).append(title);
                $(item).append(section);
            }
            else if (defaults.navItem.TitlePosition === 'Top') {
                $(title).detach(); $(section).detach();
                $(item).prepend(title);
                $(item).append(section);
            }
            else if (defaults.navItem.TitlePosition === 'Only') {
                $(image).remove();
            }
            else if (defaults.navItem.TitlePosition === 'None') {
                $(title).remove();
                $(image).css({ top: defaults.navItem.height / 2 - defaults.navItemImage.height / 2 });
            }

            $(image).css({
                position: 'relative'
            });

            $(title).css('text-align', 'center');
            $(section).css({ display: 'none', position: 'relative'});

            $(item).css('cursor', 'pointer');

            NavItem.setOriginalSize(item, defaults);
            $(section).detach();
            $(section).appendTo(displayPane.get(context, defaults));

            access.SectionId(section, index);
            access.SectionId(item, index);

            NavItem.applyNavItemClicked(context, item);
            $(item).addClass('anNavItemIndex_' + index);
            access.cache(context, cache);
        },

        /*--- 4.6. Apply the click function to nav items          ------------------*/
        applyNavItemClicked: function (context, item) {
            var defaults = access.defaults(context), cache = access.cache(context);
            $(item).css({ cursor: 'pointer' });
            $(item).off("click").click(function () {

                if (defaults.OnItemSelect !== undefined) { defaults.OnItemSelect(context, item); }

                if ($(this).attr('class') == $(cache.SelectedNavItem[0]).attr('class')) { return; }
                NavItem.SelectItem(context, this);

                var fullList = $(cache.NavItemOrder);
                fullList.not(cache.items).finish().css({ left: NavItemArray.getNavArraySize(defaults).width, display: 'none' });

                if (defaults.navPane.enableSelectedElementFirst) {
                    NavItemArray.CollectAndOrderItems(context, fullList.index(cache.SelectedNavItem));
                }
                else {
                    NavItemArray.CollectAndOrderItems(context);
                }

                $(cache.NavItemOrder).not(cache.items).finish().animate({ left: 0 - defaults.navItem.width }, {
                    complete: function () { $(this).css({ left: NavItemArray.getNavArraySize(defaults).width }); }
                });


                NavItemArray.recalcPositions(context);
                if (defaults.OnItemSelected !== undefined) { defaults.OnItemSelected(context, item); }
            });
        },

        /*--- 4.7. Apply the click function to nav items          ------------------*/
        removeNaveItemClicked: function (item) {
            $(item).off("click");
            $(item).css({ cursor: 'default' });
        },

        /*--- 4.7. Get Navigation Item array Control               ------------------*/
        SelectItem: function (context, item) {
            var defaults = access.defaults(context), cache = access.cache(context);
            NavItem.displayNavItemSection(context, defaults, cache.SelectedNavItem, item);

            NavItemArray.get(context, defaults).children("." + defaults.navItem.selectedItemClass).removeClass(defaults.navItem.selectedItemClass);
            cache.LastSelectedNavItem = cache.SelectedNavItem;

            NavItemArray.get(context, defaults).children('.anNavItemIndex_' + NavItem.getNavItemSectionId(item)).addClass(defaults.navItem.selectedItemClass);
            cache.SelectedNavItem = $(item);

            // Save cache changes
            access.cache(context, cache);
        },

        /*--- 4.8. Display Navigtation Item's Section              ------------------*/
        displayNavItemSection: function (context, defaults, oldItem, newItem) {
            var d = $(defaults.DisplayPane); cache = access.cache(context);

            if ($(oldItem)[0] === $(newItem)[0]) return;

            var newSectionId = access.SectionId(newItem);
            var newDisplayItem = displayPane.getSection(context, defaults, newSectionId);
            var oldDisplayItems = displayPane.get(context, defaults).children();
            var cssIn = { opacity: 1, 'z-index': 1, display: 'block' }, cssOut = { opacity: 0, 'z-index': 0, display: 'block' };
            var newStart = { opacity: 0, 'z-index': 0, display: 'block' };
            var oldStart = { position: 'absolute', top: 0 };
            if (defaults.DisplayTransition == 'Fade') {
                cssIn = { opacity: 1, 'z-index': 1, display: 'block' };
                cssOut = { opacity: 0, 'z-index': 0, display: 'none' };
                newStart = { opacity: 0, 'z-index': 0, display: 'block', position: 'relative' };
            }

            $(cache.NavItemOrder).each(function (index, item) {
                NavItem.removeNaveItemClicked(item);
            });

            if (defaults.DisplayTransition == 'Slide' && newItem !== null && oldItem !== null) {
                var newItemIndx = $(cache.NavItemOrder).index(newItem);
                var oldItemIndx = $(cache.NavItemOrder).index(oldItem);
                cssIn = { left: 0, display: 'block' }
                cssOut = { left: (newItemIndx > oldItemIndx ? -1 : 1) * $(displayPane.get(context, defaults)).width(), display: 'block' }
                newStart = { left: (newItemIndx > oldItemIndx ? 1 : -1) * $(displayPane.get(context, defaults)).width(), display: 'block' };
            }

            if (oldItem !== null) {
                oldDisplayItems.css(oldStart);
                oldDisplayItems.not(newDisplayItem).finish().animate(cssOut, {
                    delay: defaults.navItem.sectionTransitionDelay,
                    complete: function () {
                        $(this).css({ display: 'none' });
                    }
                });
            }

            $(newDisplayItem).css(newStart);
            $(newDisplayItem).finish().animate(cssIn, {
                delay: defaults.navItem.sectionTransitionDelay,
                complete: function () {
                    $(cache.NavItemOrder).each(function (index, item) {
                        NavItem.applyNavItemClicked(context, item);
                    });
                }
            });
        },

        /*--- 4.9. Sets Navigation item to the defined size        ------------------*/
        setOriginalSize: function (item, defaults) {
            var image = NavItem.getNavItemImage(item, defaults);

            $(item).css({ height: defaults.navItem.height, width: defaults.navItem.width });
            $(image).css({ height: defaults.navItemImage.height, width: defaults.navItemImage.width });
        }
    }

    /********************************************************************************/
    /*****    5. Display Pane                                                  ******/
    /********************************************************************************/

    var displayPane = {
        /*--- 5.2. Gets the Display Pane from the current context          ----------*/
        get: function (context, defaults) { return $(context).children(defaults.DisplayPane); },

        /*--- 5.3. Get Section from display pane based on Section ID       ----------*/
        getSection: function (context, defaults, SectionId) {
            var pane = displayPane.get(context, defaults);
            var section = null, children = $(pane).children(), childIndex = -1;

            while (++childIndex < children.length && section == null) {
                if ($(children[childIndex]).data("SectionId") == SectionId) { section = children[childIndex]; }
            }

            return section;
        }
    }

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

                definedDefaults.pageByItemCount = definedDefaults.pageByItemCount < 0 ? 0 : definedDefaults.pageByItemCount < 0;

                access.defaults(context, definedDefaults); access.cache(context, definedCache);

                $(context).css({ position: 'relative' });

                if (definedDefaults.height !== undefined) { $(context).css({ height: definedDefaults.height }); }
                if (definedDefaults.width !== undefined) { $(context).css({ width: definedDefaults.width }); }

                if (definedDefaults.AutoLoad) { methods.begin.apply(context); }
            });
        },

        begin: function () {
            $(this).each(function (index, context) {
                NavPane.init(context);
            });
        },

        select: function (indexer) {
            $(this).each(function (index, context) {
                var defaults = access.defaults(context), cache = access.cache(context);

                if (typeof (indexer) === 'object' && $(context).find(indexer).length > 0) {
                  indexer = NavItemArray.get(context, defaults).children().index($(indexer));
                }

                if (typeof (indexer) === "number") {
                    var selectedItem = NavItemArray.getItems(context, defaults)[indexer];
                    $(selectedItem).click();
                }
            });
        },

        refresh: function () {
            $(this).each(function (index, context) {
                var defaults = access.defaults(context), cache = access.cache(context);
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
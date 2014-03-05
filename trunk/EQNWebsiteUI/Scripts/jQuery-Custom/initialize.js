var gridster;

function GetPartialView(partialViewURL, passingArguments, intoElement)
{
    if (partialViewURL != "" && partialViewURL != "#") {
        $.get(partialViewURL, passingArguments,
            function (result) {
                if (result == null || "" || intoElement == null) { return; }

                $(intoElement).empty().append(result);
            }
        );
    }
}

function PostPartialView(partialViewURL, passingArguments, intoElement) {
    if (partialViewURL != "" && partialViewURL != "#") {
        $.post(partialViewURL, passingArguments,
            function (result) {
                if (result == null || "" || intoElement == null) { return; }
                $(intoElement).empty().append(result);
            }
        );
    }
}

function RenderMenu(menuJSON) {
    var template = "<ul class='menu-list'>{{#items}}<li class='menuitem {{cssClass}}' data-index='{{index}}'><a href='{{href}}'><ul class='submenu-list'>{{#subItems}}{{>subMenu}}{{/subItems}}</ul></a></li>{{/items}}</ul>";
    return Mustache.render(template, menuJSON, {
        subMenu: "<li class='{{cssClass}}' data-index='{{index}}'><a href='{{href}}'>{{text}}</a></li>"
    });
}

$(function () {
        gridster = $('.widget-area').gridster({
            widget_margins: [0, 0],
            widget_base_dimensions: [75, 75],
            draggable:
                {
                    handle: '.jdWidget-titlebar-handle'
                }
        }).data("gridster");

        $('.menuitem a').off('click').on('click', function (e) {
            var href = $(this).attr('href');
            e.preventDefault();

            GetPartialView(href, null, '.LeftRegionWrapper');
        });

        $('.open-popup-link').magnificPopup({
            delgate: 'a',
            type: 'ajax',
            disableOn: 700,
            removalDelay: 160,
            mainClass: 'mfp-fade',

            midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
        });

        GetPartialView('/Home/Home', null, '.LeftRegionWrapper');


    }
);
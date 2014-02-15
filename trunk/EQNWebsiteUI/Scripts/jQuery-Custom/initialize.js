var gridster;

function GetPartialView(partialViewURL, passingArguments, intoElement)
{
    if (partialViewURL != "" && partialViewURL != "#") {
        $.get(partialViewURL, passingArguments,
            function (result) {
                if (result == null || "") { return; }

                $(intoElement).empty().append(result);
            }
        );
    }


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

            GetPartialView(href, null, '.NewsFeedWrapper');
        });
    });
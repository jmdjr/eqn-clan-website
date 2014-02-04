var gridster;
$(function () {
    //$('.menu-list')
    $(document).on('pageshow', function () {
        gridster = $('.widget-area').gridster({
            widget_margins: [0, 0],
            widget_base_dimensions: [75, 75],
            draggable:
                {
                    handle: '.jdWidget-titlebar-handle'
                }
        }).data("gridster");
    });
});
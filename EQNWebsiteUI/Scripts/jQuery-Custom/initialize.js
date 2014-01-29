var gridster;
$(function () {
    $('.menu-list').menubar();

    gridster = $('.widget-area').gridster({
        widget_margins: [3, 3],
        widget_base_dimensions: [75, 75],
        draggable:
            {
                handle: '.jdWidget-titlebar-handle'
            }
    }).data("gridster");
});
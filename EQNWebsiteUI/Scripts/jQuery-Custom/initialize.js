var gridster;
$(function () {
    $('.menu-list').menubar();

    gridster = $('.widget-area').gridster({
        widget_margins: [3, 3],
        widget_base_dimensions: [150, 75]
    }).data("gridster");
});
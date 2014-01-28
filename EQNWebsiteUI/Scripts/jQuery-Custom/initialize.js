
$(function () {
    $('.menu-list').menubar();

    $('.jdWidget-wrapper').gridster({
        widget_margins: [10, 10],
        widget_base_dimensions: [140, 140],
        widget_selector: "div.jdWidget-wrapper",
        autogenerate_stylesheet: false,
        draggable: {
            handle: "jdWidget-titlebar-handle"
        }
    });
});
jQuery(document).ready(function () {

    if(jQuery('body.highlight.detail').find('#highlight-form').length > 0) {
        initHighlightShopResource();
        initHighlightForm();
    }

});


initHighlightShopResource = function() {
    jQuery('#highlight_shopResource').multiSelect({
        selectableHeader: '<label for="highlight_shopResource">Shop-Auswahl:</label>',
        selectionHeader: '<label >zugewiesene Shop(s):</label>',
    });
}

var highlightValidator = null;

initHighlightForm = function() {

    highlightValidator = jQuery('#highlight-form').validator({
        disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        }
    });

};
jQuery(document).ready(function () {

    if(jQuery('body.coupon.detail').find('#coupon-form').length > 0) {
        initCouponDescriminatorResource();
        initCouponDatePicker();
        initCouponFormProperties();
        initCouponOptions();
        initCouponForm();
    }

});

initCouponDescriminatorResource = function() {
    jQuery('#coupon_descriminatorResource').multiSelect({
        selectableHeader: '<label for="coupon_descriminatorResource">Account-Auswahl:</label>',
        selectionHeader: '<label >zugewiesene Account(s):</label>',
    });
};

initCouponDatePicker = function() {
    jQuery.datetimepicker.setLocale('de');
    jQuery('#coupon_dateTill').datetimepicker({
        timepicker:false,
        format:'d.m.Y',
        debug:true
    });
    jQuery('#coupon_dateFrom').datetimepicker({
        timepicker:false,
        format:'d.m.Y',
        debug:true,
        onChangeDateTime:function(dp,$input){
            couponSetToDate(true);
        }
    });
};

initCouponFormProperties = function () {

    var type = getCouponTypeResource();
    var shop = getCouponShopResource();
    var descriminator = getCouponDescriminatorResource();
    var quantity = getCouponQuantity();
    
    if(jQuery('#coupon_id').val()) {
        
        jQuery('#coupon_dateTill').attr('data-greater', jQuery('#coupon_dateFrom').val());
        
        if (type == 'coupon') {
            jQuery('#coupon_dateTill').attr('data-error', 'zwichen gültig ab und gültig bis muss ein Zeitraum von 3 Jahren liegen.');
        } else {
            jQuery('#coupon_dateTill').attr('data-error', 'Gültig bis Datum muss später sein als gültig ab.');
        }
        
        jQuery('#coupon_shopResource').prop('disabled', true);
        jQuery("#coupon_hiddenShopResource").val(shop);
        jQuery('#coupon_forUserEmail').attr('data-remote','/admin/coupon/email-validate?coupon[descriminator]=' + descriminator);
        
    } else {
        
        if(shop) {
            jQuery('#coupon_code').prop('disabled', false);
            jQuery("#coupon_hiddenShopResource").val(shop);
            jQuery('#coupon_code').attr('data-remote', '/admin/coupon/validate?coupon[shop]=' + shop);
        } else {
            jQuery('#coupon_code').prop('disabled', true);
        }
        
    }

    initFormCouponTypeChange(type);
    initCouponQualityTypeChange(quantity);
    
};

getCouponTypeResource = function() {
    var type;
    if(jQuery('#coupon_id').val()) {
        type = jQuery('#coupon_typeResource option[disabled]:selected').val();
    } else {
        type = jQuery('#coupon_typeResource').val();
    }
    return type;
};

getCouponShopResource = function() {
    var shop;
    if(jQuery('#coupon_id').val()) {
        shop = jQuery('#coupon_shopResource option[disabled]:selected').val();
    } else {
        shop = jQuery('#coupon_shopResource').val();
    }
    return shop;
};

getCouponDescriminatorResource = function() {
    var descriminator = jQuery('#coupon_descriminatorResource option:selected').map(function(i,v) {
        return this.value;
    }).get();
    return descriminator;
};

getCouponQuantity = function() {
    var quantity = jQuery('#coupon_quantity').val();
    return quantity;
};

var couponValidator = null;

initCouponForm = function() {

    couponValidator = jQuery('#coupon-form').validator({
        //disable: false,
        feedback: {
            success: 'fa-check',
            error: 'fa-times'
        },
        custom: {
            greater: function($el) {
                var matchValue = $el.attr("data-greater");
                var error  = $el.attr("data-error");
                
                if(matchValue) {
                    var arrStartDate = matchValue.split(".");
                    var date1 = new Date(arrStartDate[2], arrStartDate[1], arrStartDate[0]);
                    var arrEndDate = $el.val().split(".");
                    var date2 = new Date(arrEndDate[2], arrEndDate[1], arrEndDate[0]);
                    if(date1 >= date2) {              
                        return error;
                    }
                }
            }
        }
    });

};

reInitCouponFormValidation = function () {
    jQuery('#coupon-form').validator('update');
};

initFormCouponTypeChange = function (type) {
    
    jQuery('#coupon_forUserEmail').prop('required', false);
    jQuery('#coupon_advantageValueCmb').prop('required', false);
    jQuery('#coupon_advantageValue').prop('required', false);

    var quantity = getCouponQuantity();
    initCouponQualityTypeChange(quantity);

    if(type == 'coupon') {
        changeFormPropertiesForCoupon();
    } else if(type == 'birthday' || type == 'newsletter') {
        changeFormPropertiesForBirthday();
    } else if(type == 'freeShipping') {
        changeFormPropertiesForFreeShipping();
    } else {
        changeFormPropertiesForRegular();
    }
};


initCouponQualityTypeChange = function(quantity) {
    var type = getCouponTypeResource();
    if(quantity == 1 || type == 'coupon' || type == 'birthday' || type == 'newsletter_consumer' || type == 'newsletter_professional') {
        jQuery('#coupon_isMultipleByUser').val(0);
        jQuery('#coupon_isMultipleByUser').addClass('btn-warning');
        jQuery('#coupon_isMultipleByUser').text('Nein');
        jQuery('#coupon_isMultipleByUser').prop('disabled', true);
        jQuery('#coupon_forUserEmail').prop('disabled', false);
    } else if(quantity > 1){
        jQuery('#coupon_isMultipleByUser').prop('disabled', false);
    }
};

initCouponOptions = function () {

    jQuery('#coupon_forUserEmail').prop('disabled', true);

    jQuery("#coupon_shopResource").unbind('change').bind('change', function(e) {
        if(this.value) {
            jQuery('#coupon_code').prop('disabled', false);
            jQuery('#coupon_code').attr('data-remote', '/admin/coupon/validate?coupon[shop]=' + this.value);
            jQuery('#coupon_hiddenShopResource').val(this.value);
            reInitCouponFormValidation();
        } else {
            jQuery('#coupon_code').prop('disabled', true);
        }
    });

    jQuery("#coupon_descriminatorResource").unbind('change').bind('change', function(e) {
        jQuery('#coupon_forUserEmail').prop('disabled', false);
        jQuery('#detail-save').addClass('disabled');
        jQuery('#detail-buffer').addClass('disabled');
        var descriminator = getCouponDescriminatorResource();
        jQuery('#coupon_forUserEmail').attr('data-remote','/admin/coupon/email-validate?coupon[descriminator]='+descriminator);
        reInitCouponFormValidation();
        jQuery('#coupon_forUserEmail').focus();
    });

    jQuery("#coupon_typeResource").unbind('change').bind('change', function(e) {
        initFormCouponTypeChange(this.value);
        reInitCouponFormValidation();
        couponSetToDate(false);
    });

    jQuery("#coupon_quantity").bind('keyup mouseup', function () {
        initCouponQualityTypeChange(this.value);
        jQuery("#coupon_hiddenQuantity").val(this.value);
    });

    jQuery("#coupon_forUserEmail").bind('keyup mouseup', function () {
        if(getCouponDescriminatorResource().length > 0) {
            jQuery("#ms-coupon_descriminatorResource").find('.ms-elem-selectable').addClass('disabled');
            jQuery("#ms-coupon_descriminatorResource").find('.ms-elem-selection').addClass('disabled');
        }
    });

};

changeFormPropertiesForCoupon = function() {
    jQuery('#coupon_quantity').val(1);
    jQuery('#coupon_hiddenQuantity').val(1)
    jQuery('#coupon_quantity').prop('disabled', true);

    jQuery('#coupon_isPercental').val(0);
    jQuery('#coupon_isPercental').prop('disabled', true);
    jQuery('#coupon_isPercental').addClass('btn-warning');
    jQuery('#coupon_isPercental').text('Wert in Währung');

    jQuery('#coupon_fromArticleSum').val('');
    jQuery('#coupon_fromArticleSum').prop('disabled', true);

    jQuery('.advantageValue').hide();
    jQuery('.advantageValueCmb').show();
    jQuery('#coupon_advantageValueCmb').prop('disabled', false);
    jQuery('#coupon_advantageValueCmb').prop('required', true);

    jQuery('#coupon_forUserEmail').prop('required', true);
};

changeFormPropertiesForBirthday = function() {
    jQuery('#coupon_quantity').val(1);
    jQuery('#coupon_hiddenQuantity').val(1)
    jQuery('#coupon_quantity').prop('disabled', true);

    jQuery('.advantageValueCmb').hide();
    jQuery('#coupon_advantageValueCmb').prop('disabled', true);
    jQuery('.advantageValue').show();
    jQuery('#coupon_advantageValue').prop('required', true);
    jQuery('#coupon_advantageValue').prop('disabled', false);

    jQuery('#coupon_fromArticleSum').prop('disabled', false);
    jQuery('#coupon_isPercental').prop('disabled', false);

    jQuery('#coupon_forUserEmail').prop('required', true);
};

changeFormPropertiesForFreeShipping = function() {
    jQuery('#coupon_quantity').prop('disabled', false);

    jQuery('#coupon_isPercental').val(0);
    jQuery('#coupon_isPercental').prop('disabled', true);
    jQuery('#coupon_isPercental').addClass('btn-warning');
    jQuery('#coupon_isPercental').text('Wert in Währung');

    jQuery('#coupon_advantageValue').val('');
    jQuery('#coupon_advantageValue').prop('disabled', true);
    jQuery('#coupon_advantageValue').prop('required',false);
    jQuery('.advantageValueCmb').hide();
    jQuery('#coupon_advantageValueCmb').prop('disabled', true);
    jQuery('.advantageValue').show();

    jQuery('#coupon_fromArticleSum').prop('disabled', false);

};

changeFormPropertiesForRegular = function () {
    jQuery('#coupon_quantity').prop('disabled', false);

    jQuery('#coupon_isPercental').prop('disabled', false);

    jQuery('#coupon_advantageValue').prop('required', true);
    jQuery('#coupon_advantageValue').prop('disabled', false);

    jQuery('.advantageValueCmb').hide();
    jQuery('#coupon_advantageValueCmb').prop('disabled', true);
    jQuery('.advantageValue').show();

    jQuery('#coupon_fromArticleSum').prop('disabled', false);
};

couponSetToDate = function(flag) {
    type = getCouponTypeResource();
    var fromDate = jQuery('#coupon_dateFrom').val();
    if(fromDate) {
        var dateAr = fromDate.split('.');
        fromDate = dateAr[1] + '/' + dateAr[0] + '/' + dateAr[2];
        var day = new Date(fromDate);
        var nextDay = new Date(day);
        if (type == 'coupon') {
            nextDay.setFullYear(day.getFullYear() + 3);
            month = '' + (
                nextDay.getMonth() + 1
            ),
                day = '' + nextDay.getDate(),
                year = nextDay.getFullYear();
            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
        } else {
            month = '' + (
                nextDay.getMonth() + 1
            ),
                day = '' + nextDay.getDate(),
                year = nextDay.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
        }

        toDate = [day, month, year].join('.');

        if (type == 'coupon') {
            jQuery('#coupon_dateTill').attr('data-error', 'zwichen gültig ab und gültig bis muss ein Zeitraum von 3 Jahren liegen.');
        } else {
            jQuery('#coupon_dateTill').attr('data-error', 'Gültig bis Datum muss später sein als gültig ab.');
        }

        jQuery('#coupon_dateTill').attr('data-greater', toDate);

        if(flag) {
            jQuery('#coupon_dateTill').datetimepicker("show");
        }
    }
};
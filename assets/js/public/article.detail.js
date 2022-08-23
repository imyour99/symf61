jQuery(document).ready(function () {
    
    if(jQuery('body.articleDetail').find('#articleDetail-gallery-thumbs').length > 0) {   
        initArticleDetailImageSlider();    
    }
    
    if(jQuery('body.articleDetail').find('.articleDetail-basic-rating').length > 0) {
        initArticleDetailVotesRating();
    }
    
    if(jQuery('body.articleDetail').find('#articleDetail-basic-option-tab-content select').length > 0) {   
        initArticleDetailVariantChangeEvent();             
    }
    
    if(jQuery('body.articleDetail .articleDetail-basic-option #articleDetail-basic-option-tab').find('button.nav-link').length > 0) {
        initArticleDetailTabEvent();
    }
    
    if(jQuery('body.articleDetail').find('.btn-tooltip').length > 0) {
        initArticleDetailBtnToolTip();    
    }
    
    if(jQuery('body.articleDetail').find('.votingOverview-comment-top-rating').length > 0) {   
        initArticleDetailCommentRating();             
    }
    
    if(jQuery('body.articleDetail').find('#votingOverview-button').length > 0) {   
        initArticleDetailCommentLoading();             
    }
    
    if(jQuery('body.articleDetail').find('#articleRecommend').length > 0) {  
        initArticleCarouselList('#articleRecommend');
    }
    if(jQuery('body.articleDetail').find('#articleTopseller').length > 0) {  
        initArticleCarouselList('#articleTopseller');
    }
});


initArticleDetailImageSlider = function() {
    jQuery('#articleDetail-gallery-thumbs .articleDetail-gallery-thumbs').unbind('click mouseover').bind('click mouseover', function(e) { 
        var index = jQuery(this).attr('data-index');
        initArticleDetailImageSliderThumb(index);
    });
};

initArticleDetailImageSliderThumb = function (imageNumber) {
    const sliderElement = document.getElementById('articleDetail-gallery');
    swiffyslider.slideTo(sliderElement, imageNumber);
};
        
initArticleDetailVotesRating = function() {
    
    jQuery(".articleDetail-basic-rating").starRating({
        readOnly: true,
        starSize: 20,
        totalStars: 5,
        useFullStars: false,
        forceRoundUp: false,
        starGradient: {
            start: '#4bbee6',
            end: '#66c8ea'
        }
    });
};

initArticleDetailCommentRating = function() {
  
    jQuery(".votingOverview-comment-top-rating").starRating({
        readOnly: true,
        starSize: 20,
        totalStars: 5,
        useFullStars: false,
        forceRoundUp: false,
        starGradient: {
            start: '#4bbee6',
            end: '#66c8ea'
        }
    });
};


initArticleDetailVariantChangeEvent = function() {
    
    jQuery('#input_request-0, #input_request-1, #input_meeting-0, #input_meeting-1, #input_meeting-2').unbind('change').bind('change', function(e) {        
        var url = jQuery(this).find(':selected').attr('data-url');
        window.location = url;
    });
    
    jQuery('#input_meeting-member, #input_request-member').unbind('change').bind('change', function(e) {    
        
         var type  = jQuery(this).attr("data-type");
         var combineid  = jQuery(this).attr("data-combineid");
         var price = parseFloat(jQuery('#' + type + '-articleCombine-' + combineid).attr("data-price"));
         var currency = jQuery('#' + type + '-articleCombine-' + combineid).attr("data-currency");
         var display = 'none';
         
         if(price > 0 && jQuery(this).val() > 0) {
             var newPrice = jQuery(this).val() * price;
             var roundedPrice = Math.round((newPrice + Number.EPSILON) * 100) / 100;
             var memberPrice  = roundedPrice.toFixed(2);
             var memberPrice = memberPrice.toString().replace('.', ',');
             jQuery('#memberPrice-' + type).html(currency + ' ' + memberPrice);
             display = 'block';
         }
         
        jQuery('.articleDetail-basic-option-member-priceBox.' + type).css({
            'display': display
        });
        
    });
    
};


initArticleDetailTabEvent = function() {
    
    if(jQuery('body.articleDetail .articleDetail-basic-option #articleDetail-basic-option-tab').find('button.nav-link.nav-link-request.active').length > 0) {
       initArticleDetailTabRequest();
       if(jQuery('#input_request-member').val() > 0) {
           jQuery("#input_request-member" ).trigger( "change" );
       }
    } 
    
    if(jQuery('body.articleDetail .articleDetail-basic-option #articleDetail-basic-option-tab').find('button.nav-link.nav-link-meeting.active').length > 0) {
       initArticleDetailTabMeeting();
       if(jQuery('#input_meeting-member').val() > 0) {
           jQuery("#input_meeting-member" ).trigger( "change" );
       }
    } 
    
    jQuery('button.nav-link[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        
        switch (e.relatedTarget.id) {
            case 'courseRequest-tab':
                articleDetailRequestValidator.validator('destroy');
                break;
            case 'courseMeeting-tab':
                articleDetailMeetingValidator.validator('destroy');
                break;
        }
        
        switch (e.target.id) {
            case 'courseRequest-tab':
                initArticleDetailTabRequest();
                break;
            case 'courseMeeting-tab':
                initArticleDetailTabMeeting();
                break;
        }
       
    });
    
};

initArticleDetailTabRequest = function() {
    initArticleDetailTabRequestForm();
    initArticleDetailTabRequestDatePicker();
};

initArticleDetailTabMeeting = function() {
    initArticleDetailTabMeetingForm();
};

initArticleDetailTabRequestForm = function() {
    
    articleDetailRequestValidator = jQuery('#formToBasket-request').validator({ 
        disable: false,
        custom: {
            checkrequestdate: function($el) {
                return checkRequestDate($el);
            }
        },
        feedback: {
            success: 'fas fa-check',
            error: 'fas fa-times'
        }      
    });
    
};

initArticleDetailTabMeetingForm = function() {
    
    articleDetailMeetingValidator = jQuery('#formToBasket-meeting').validator({ 
        disable: false,
        feedback: {
            success: 'fas fa-check',
            error: 'fas fa-times'
        }      
    });
    
};

initArticleDetailTabRequestDatePicker = function() {
    
    jQuery.datetimepicker.setLocale('de');
    jQuery('#input_request-date').datetimepicker({
        timepicker: false,
        format: 'd.m.Y',
        debug: true
    });
    
};

checkRequestDate = function($el) {
    
    var error  = $el.attr("data-error");
    var date = $el.val();
    
    if(date) {
      
        var arrDate = date.split(".");
        if(arrDate[2] && arrDate[1] && arrDate[0]) {
            
            var dateObject = new Date(arrDate[2] + '-' + arrDate[1] + '-' + arrDate[0]);
            
            var minDate = new Date(); 
            var pDays = 21;
            minDate.setDate(minDate.getDate() + pDays);
            
            if(dateObject < minDate) {
                return error;
            }
            
        }
        
    }
    
};

initArticleDetailBtnToolTip = function() {
    
    var options = {};
    options['trigger'] = 'hover click';
    options['html'] = true;
    
    jQuery('.btn-tooltip').tooltip(options);
    
};

initArticleDetailCommentLoading = function() {
    
    jQuery('#votingOverview-button').unbind('click').bind('click', function(e) {    
        
         e.preventDefault();
         
        var data = {};
        data['articleId'] = jQuery('#votingOverview-comment').data("article");
        data['page'] = parseInt(jQuery('#votingOverview-comment').data("page")) +1 ;
       
        refreshArticleDetailComments(data);
        
    });
    
};

refreshArticleDetailComments = function (data) {
    
    jQuery.ajax({
        type: 'POST',
        url: jQuery('#votingOverview-comment').data("url"),
        data: data,
        beforeSend: function () {
            
        },
        success: function (response) {
             if (response) {
                
                if (typeof response === 'object') {            
                    if (response.template !== undefined && response.template.length > 10) {
                        jQuery('#votingOverview-comment').empty().html(response.template).fadeTo(100, 0.1).fadeTo(200, 2.0);
                        jQuery('#votingOverview-comment').data('page', data['page']);
                        initArticleDetailCammentRating();
                    } else {
                        jQuery("#votingOverview-button").addClass("disabled");
                    }
                }
                
             }
        },
        complete: function () { // Stop loading
        
        }
    });
        
};
jQuery(document).ready(function () {
    
    //jQuery(window.dataLayer.gtmLoad).ready(function () {
   //window.addEventListener('UC_UI_INITIALIZED', function(event) {
      
        if(jQuery('body.articleList').find('#articleList').length > 0) {
            initTrackingArticleList(11);
        }
        
        if(jQuery('body.checkOut-start').find('#checkOut-signIn-form').length > 0) {
            initCheckoutTrackingClickOptionsLoginType();
        }
        
        jQuery('.trackProductClick').unbind('click').bind('click', function(e) {    
            trackingGTMclickOnProduct(jQuery(this).data("combineid"));
        });
        
        if(jQuery('body').find('#formContact').length > 0) {
            initTrackingFormContact();
        }
        
        if(jQuery('body').find('#welcomeSignUp').length > 0) {
            initTrackingFormWelcomeSignUp();
        }
        
        if(jQuery('body.landing').find('#landing-newsletter-form').length > 0) {
            initTrackingFooterNewsletterForm();
        }
        
        if(jQuery('body.checkOut-address').find('#checkOut-address-form').length > 0) {
            initTrackingCkeckoutStep(2, 'userType', jQuery('#checkOut-address-form').data('formtype'));
            initTrackingBasketContent(2);
        }
        
        if(jQuery('body.checkOut-payment').find('#checkOut-payment-form').length > 0) {
            initTrackingCkeckoutStep(3, 'paymentScreen', 'paymentScreen');
            initTrackingBasketContent(3);
        }
        
        if(jQuery('body.checkOut-overview').find('#checkOut-overview-form').length > 0) {
            initTrackingCkeckoutStep(4, 'payment', jQuery('#checkoutBasketTable').data('paymenttitle'));
            initTrackingBasketContent(4);
        }
        
        if(jQuery('body.checkOut-success').find('#checkout-ordering-success').length > 0) {
            initTrackingCkeckoutStep(5, 'purchased', jQuery('#checkout-ordering-success').data('total'));
            initTrackingOrderSuccess();
        }
        
        if(jQuery('body.articleDetail').find('#articleDetail-basic-option-tab').length > 0) {
            
            if(jQuery('body.articleDetail').find('#courseRequest.active').length > 0) {
                initTrackingArticleDetail('#courseRequest');
            } else if(jQuery('body.articleDetail').find('#courseMeeting.active').length > 0) {
                initTrackingArticleDetail('#courseMeeting');
            } 
        
            jQuery('button[data-bs-toggle="tab"]').on("shown.bs.tab", function(e) {
                var id = e.target.id;
                var tabId = id.replace(/-tab/, '');        
                initTrackingArticleDetail('#' + tabId);
            });
            
            trackingGTMaddToCart();
            
        }
        
        /*
        if(jQuery('body').find('#shopSearchDesktop, #shopSearchMobil').length > 0) {
            initTrackingShopSearch();
        }
        */
       
        /*
        if(jQuery('body.basket').find('#basketList').length > 0) {
            initTrackingBasketList();
        }
        */
       
        /*
        if(jQuery('body.checkOut-amazonPay').find('#checkOut-amazonPay-form').length > 0) {
            initTrackingCkeckoutStep(2.5, 'userType', 'checkoutAmazonPay');
            initTrackingBasketContent(2.5);
        }
        */
       
    //});
    
});

initTrackingArticleList = function(endPos) {
    
    var data = {};
    data['list'] = jQuery('#breadcrumbContainer').data('breadcrumbstring');
    data['impressions'] = getCurrentArticlePager(endPos);
    data['listvalue'] = 0;
    
    dataLayer.push({
        'event': 'viewList',
        'ecommerce': data
    });
    
};

getCurrentArticlePager = function(endPos) {
  
    startPos = endPos - 10;
    var impressions = [];
    
    jQuery("#articleList .btn-article.trackProductClick").each(function () {    
        
        var pos = parseInt(jQuery(this).data('position'));
        
        if(pos >= startPos && pos <= endPos) {
            
            var item = {};  
            item['name'] = jQuery(this).data('title');
            item['id'] = jQuery(this).data('combineid');
            item['price'] = jQuery(this).data('price');
            item['brand'] = jQuery(this).data('brand');
            item['category'] = jQuery(this).data('category');
            item['variant'] = jQuery(this).data('variant');
            item['list'] = jQuery('#breadcrumbContainer').data('breadcrumbstring');
            item['position'] = jQuery(this).data('position');
            impressions.push(item);
        
        }
        
    });
    
    return(impressions);
    
};

initCheckoutTrackingClickOptionsLoginType = function() {
    
    jQuery(".signInButtonLogin").unbind('click').bind('click', function(e) { 
        trackingGTMclickCheckoutOption("login");
    });
    
    jQuery(".signUpButtonRegister").unbind('click').bind('click', function(e) { 
        trackingGTMclickCheckoutOption("register");
    });
    
    /*
    jQuery(".checkoutButtonGuestSignUp").unbind('click').bind('click', function(e) { 
        trackingGTMclickCheckoutOption("guest");
    });
    */
};

trackingGTMclickCheckoutOption = function (loginMethodValue) {
    
    var data = {};
    data['checkout_step'] = 1;
    data['checkout_option'] = loginMethodValue;
    data['checkout_option_value'] = "login_method"
    
    dataLayer.push({
        'event': 'setCheckoutOption',
        'ecommerce': {
            'checkout': data
         }
    });
    
};

trackingGTMclickOnProduct = function (combineid) {
    
    var object = '#articleCombine-' + combineid;
    
    var data = {};
    data['name'] = jQuery(object).data("title");
    data['id'] = jQuery(object).data("combineid");
    data['price'] = jQuery(object).data("price");
    data['brand'] = jQuery(object).data("brand");
    data['category'] = jQuery(object).data("category");
    data['variant'] = jQuery(object).data("variant");
    data['position'] = jQuery(object).data("position");
    
    dataLayer.push({
        'event': 'productClick',
        'ecommerce': {
            'click': {
                'actionField': {
                    'list': jQuery('#breadcrumbContainer').data('breadcrumbstring')
                },      
                'products': [data]
             }
         }
    });

};

initTrackingFormContact = function() {
    
    jQuery("#formContact").submit(function (event) {
        dataLayer.push({
            'event': 'contactForm',
            'contactSource': 'contact'
        });
    });
    
};

initTrackingFooterNewsletterForm = function() {
    
    jQuery("#landing-newsletter-form").submit(function (event) {
        
        dataLayer.push({
            'event': 'lead',
            'actionField': {
                'content_name': 'Newsletter im Footer',
                'content_category': 'Newsletter'
            }
        });
    });
        
};

initTrackingCkeckoutStep = function(step, optionValue, formType) {
    
    var data = {};
    data['checkout_step'] = step;
    data['checkout_option_value'] = optionValue;
    data['checkout_option'] = formType;
    
    dataLayer.push({
        'event': 'setCheckoutOption',
        'ecommerce': {
            'checkout': data
         }
    });

};

initTrackingBasketContent = function(step) {
    
    var product = [];
    var totalValue = '';
    
    if(jQuery('#checkoutBasketTable').data('total') !== undefined) { 
        totalValue = jQuery('#checkoutBasketTable').data('total');
    }
        
    jQuery("#checkoutBasketTable tr.checkout-basket-article-info").each(function () {    
        var item = {};  
        item['name'] = jQuery(this).data('title');
        item['id'] = jQuery(this).data('combineid');
        item['price'] = jQuery(this).data('price');
        item['brand'] = jQuery(this).data('brand');
        item['category'] = jQuery(this).data('category');
        item['variant'] = jQuery(this).data('variant');
        item['quantity'] = jQuery(this).data('quantity');

        product.push(item);
    });
    
    var data = {};
    data['actionField'] = step;
    data['value'] = totalValue;
    data['products'] = [product];
    
    dataLayer.push({
        'event': 'checkout',
        'ecommerce': {
            'checkout': data
         }
    });
    
};

initTrackingOrderSuccess = function() {
    
    var product = [];
    var taxNorm = parseFloat(jQuery('#checkout-ordering-success').data('taxnorm'));
    var taxReduced = parseFloat(jQuery('#checkout-ordering-success').data('taxreduced'));
    var tax = taxNorm + taxReduced;
    
    jQuery("#checkout-ordering-success .orderArticle").each(function () {    
        var item = {};  
        item['name'] = jQuery(this).data('title');
        item['id'] = jQuery(this).data('combineid');
        item['price'] = jQuery(this).data('price');
        item['brand'] = jQuery(this).data('brand');
        item['category'] = jQuery(this).data('category');
        item['variant'] = jQuery(this).data('variant');
        item['quantity'] = jQuery(this).data('quantity');

        product.push(item);
    });
    
    var data = {};
    data['actionField'] = {};
    data['actionField']['id'] = jQuery('#checkout-ordering-success').data('ordernr');
    data['actionField']['revenue'] = jQuery('#checkout-ordering-success').data('total');
    data['actionField']['tax'] = tax;
    data['actionField']['coupon'] = jQuery('#checkout-ordering-success').data('coupon');
    data['actionField']['shipping'] = jQuery('#checkout-ordering-success').data('shippingpretax');
    data['products'] = [product];
    
    dataLayer.push({
        'event': 'purchased',
        'ecommerce': {
            'purchase': data
         }
    });
    
};

initTrackingArticleDetail = function(tabID) {
    
    var product = {};
    var impressions = [];
    var ecommerce = {};
    
    product['name'] = jQuery(tabID + ' .articleDetail-btn').data('title');
    product['id'] = jQuery(tabID + ' .articleDetail-btn').data('combineid');
    product['price'] = jQuery(tabID + ' .articleDetail-btn').data('price');
    product['brand'] = jQuery(tabID + ' .articleDetail-btn').data('brand');
    product['category'] = jQuery(tabID + ' .articleDetail-btn').data('category');
    product['variant'] = jQuery(tabID + ' .articleDetail-btn').data('variant');
    
    jQuery("#articleRecommend .btn-article.trackProductClick, #articleTopseller .btn-article.trackProductClick").each(function () {    
        var item = {};  
        item['name'] = jQuery(this).data('title');
        item['id'] = jQuery(this).data('combineid');
        item['price'] = jQuery(this).data('price');
        item['brand'] = jQuery(this).data('brand');
        item['category'] = jQuery(this).data('category');
        item['variant'] = jQuery(this).data('variant');
        item['list'] = jQuery('#breadcrumbContainer').data('breadcrumbstring');
        impressions.push(item);
    });
    
    ecommerce['detail'] = {};
    ecommerce['detail']['products'] = [product];
    ecommerce['impressions'] = impressions;
    
    dataLayer.push({
        'event': 'viewProduct',
        'ecommerce': ecommerce
    });
    
};

initTrackingFormWelcomeSignUp = function() {
    
    jQuery("#welcomeSignUp").submit(function (event) {
        
        dataLayer.push({
            'event': 'completeRegistration',
            'actionFieldRegistration': {
                'registration_name': 'Registrierung',
                'registration_value': 'consumer'
            }
        });
        
        if(jQuery('#user_userPerson_subscribedToNewsletter').length){
            if (jQuery('#user_userPerson_subscribedToNewsletter').is(':checked')) {
                dataLayer.push({
                    'event': 'lead',
                    'actionField': {
                        'content_name': 'Newsletter bei Consumer Registrierung',
                        'content_category': 'Newsletter'
                    }
                });
            }
        }

    });
    
};


trackingGTMaddProductToWishlist = function (combineid) {
    
    var htmlId = '';
    
    if(jQuery('body.articleDetail').find('#articleDetail-basic-option-tab').length > 0) {    
        if(jQuery('body.articleDetail').find('#courseRequest.active').length > 0) {
            htmlId = '#courseRequest #request-articleCombine-' + combineid;
        } else if(jQuery('body.articleDetail').find('#courseMeeting.active').length > 0) {
            htmlId = '#courseMeeting #meeting-articleCombine-' + combineid;
        }    
    } else {
        htmlId = '#articleCombine-' + combineid;
    }
    
    var product = [];
    var add = {};
    var item = {};  
    
    item['name'] = jQuery(htmlId).data("title");
    item['id'] = jQuery(htmlId).data("combineid");
    item['price'] = jQuery(htmlId).data("price");
    item['brand'] = jQuery(htmlId).data("brand");
    item['category'] = jQuery(htmlId).data("category");
    item['variant'] = jQuery(htmlId).data("variant");
    item['position'] = jQuery(htmlId).data("position");
    product.push(item);
    
    add['actionField'] = {};
    add['actionField']['list'] = jQuery('#breadcrumbContainer').data('breadcrumbstring');
    add['products'] = product;
    
    if(jQuery('body').find(htmlId).length > 0) {
        
        dataLayer.push({
            'event': 'addToWishlist',
            'ecommerce': {
                'add': add
            }
        });
        
    }
    
};

trackingGTMaddToCart = function () {
    
    jQuery('.articleDetail-btn').unbind('click').bind('click', function(e) {  
        
        var btn = this;
        var form = memberId = '';
        var id = jQuery(btn).attr("id");
        
        if(id.indexOf("request") >= 0) {
            form = '#formToBasket-request';
            memberId = '#input_request-member';
        } else if(id.indexOf("meeting") >= 0) {
            form = '#formToBasket-meeting';
            memberId = '#input_meeting-member';
        }
        
        if(jQuery(form).validator('validate').has('.has-error').length == 0) {
            
            var item = {};  
            var data = {};
            
            item['name'] = jQuery('#' + id).data('title');
            item['id'] = jQuery('#' + id).data('combineid');
            item['price'] = jQuery('#' + id).data('price');
            item['brand'] = jQuery('#' + id).data('brand');
            item['category'] = jQuery('#' + id).data('category');
            item['variant'] = jQuery('#' + id).data('variant');
            item['quantity'] = parseInt(jQuery(memberId).val());
           
            data['ecommerce'] = {};
            data['event'] = 'addToCart';
            data['ecommerce']['add'] = {};
            data['ecommerce']['add']['products'] = [item];
            
            // Clear the previous ecommerce object.
            dataLayer.push({ ecommerce: null });  
            dataLayer.push(data);

        }
        
    });
    
};





/*
initTrackingShopSearch = function() {
    
    jQuery("#shopSearchDesktop, #shopSearchMobil").submit(function (event) {
        dataLayer.push({
            'event': 'search',
            'searchvalue': jQuery(".search-field").val()
        });
    });
        
};
*/

/*
initTrackingBasketList = function() {
    
    var products = [];
    
    jQuery("#basketList .cartList-article").each(function () {    
        
        var item = {};  
        item['name'] = jQuery(this).data('title');
        item['combineid'] = jQuery(this).data('combineid');
        item['price'] = jQuery(this).data('price');
        item['brand'] = jQuery(this).data('brand');
        item['category'] = jQuery(this).data('category');
        item['variant'] = jQuery(this).data('variant');
        item['quantity'] = jQuery(this).data('quantity');
        
        products.push(item);
        
    });
    
    dataLayer.push({
        'event': 'checkout',
        'ecommerce': {
            'checkout': {
                'actionField': {
                    'step': 1
                },
                'value': jQuery('#basketCalculation').data('total'),
                'coupon': jQuery('#basketCalculation').data('coupon'),
                'products': products
            }
        }
    });
    
};
*/

/*
    if(jQuery('#signUp-professional-form').length){
        jQuery("#signUp-professional-form").submit(function (event) {
            dataLayer.push({
                'event': 'completeRegistration',
                'actionFieldRegistration': {
                    'registration_name': 'Registrierung',
                    'registration_value': 'professional'
                }
            });
            if(jQuery('#user_userPerson_subscribedToNewsletter').length){
                if (jQuery('#user_userPerson_subscribedToNewsletter').is(':checked')) {
                    dataLayer.push({
                        'event': 'lead',
                        'actionField': {
                            'content_name': 'Newsletter bei Professional Registrierung',
                            'content_category': 'Newsletter'
                        }
                    });
                }
            }

        });
    }

*/
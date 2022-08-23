initArticleBasic = function() {

    prepareArticleBasicSettings(false);
    initArticleBasicForm();   
    initArticleBasicCategoryResource();
    initArticleBasicBenefitResourceSelected();
    initArticleBasicLearningResourceSelected();
    initArticleBasicHowtoResourceSelected();
    initArticleBasicDosageResourceSelected();
    initArticleBasicFaqSelected();
    
};

prepareArticleBasicSettings = function(destroyIt) {
    destroyArticleBasicValidator(destroyIt);
};

destroyArticleBasicValidator = function(destroyIt)  {
    if(destroyIt == true) {       
        articleBasicValidator.validator('destroy');
        initArticleBasicForm();
    }
};

initArticleBasicForm = function() {
    
    articleBasicValidator = jQuery('#article-basic-form').validator({ 
        disable: false,
        feedback: {
            success: 'fas fa-check',
            error: 'fas fa-times'
        }      
    });
    
};

initArticleBasicCategoryResource = function() {
    
    jQuery('#article_shopResource').multiSelect({
        selectableHeader: '<label for="article_shopResource">Shop-Auswahl:</label>',
        selectionHeader: '<label >zugewiesene Shop(s):</label>',
    });
    
    jQuery('#article_categoryResource').multiSelect({
        selectableHeader: '<label for="article_categoryResource">Listen-Kategorien:</label>',
        selectionHeader: '<label >zugewiesene Kategorien:</label>',
    });
    
    jQuery('#article_variantResource').multiSelect({ 
        selectableHeader: '<label for="article_variantResource">Varianten-Auswahl:</label>',
        selectionHeader: '<label >zugewiesene Varianten:</label>',
    });
    
    jQuery('#article_benefitResource').multiSelect({ 
        keepOrder: true ,
        selectableHeader: '<label for="article_benefitResource">Benefit-Auswahl:</label>',
        selectionHeader: '<label >zugewiesene Benefits:</label>',
        afterSelect: function(values, text){
            
            jQuery('#article_benefitResource option[value="'+values+'"]').remove();
            jQuery('#article_benefitResource').append(jQuery("<option></option>").attr("value",values).attr('selected', 'selected'));
        
            var _self = this;

            if (this.$element.val().length >= 4 ){
                var selectables = this.$container.find('.ms-elem-selectable');
                selectables.addClass(_self.options.disabledClass);
            }
    
            
        },
        afterDeselect: function(values, text){
            
            jQuery('#article_benefitResource option[value="'+values+'"]').removeAttr('selected');
            
            var _self = this;

            if (this.$element.val() && this.$element.val().length <= 4 ){
                var selectables = this.$container.find('.ms-elem-selectable');
                selectables.removeClass(_self.options.disabledClass);
            }
        }
        
    });
    
    jQuery('#article_learningResource').multiSelect({ 
        keepOrder: true,
        selectableHeader: '<label for="article_learningResource">Lerninhalte-Auswahl:</label>',
        selectionHeader: '<label>zugewiesene Lerninhalte:</label>',
        afterSelect: function(values, text){
            
            jQuery('#article_learningResource option[value="'+values+'"]').remove();
            jQuery('#article_learningResource').append(jQuery("<option></option>").attr("value",values).attr('selected', 'selected'));
        
            var _self = this;

            if (this.$element.val().length >= 12 ){
                var selectables = this.$container.find('.ms-elem-selectable');
                selectables.addClass(_self.options.disabledClass);
            }
    
            
        },
        afterDeselect: function(values, text){
            
            jQuery('#article_learningResource option[value="'+values+'"]').removeAttr('selected');
            
            var _self = this;

            if (this.$element.val() && this.$element.val().length <= 12 ){
                var selectables = this.$container.find('.ms-elem-selectable');
                selectables.removeClass(_self.options.disabledClass);
            }
        }
    });
    
    jQuery('#article_howtoResource').multiSelect({ 
        keepOrder: true,
        selectableHeader: '<label for="article_howtoResource">Howto-Auswahl:</label>',
        selectionHeader: "<label >zugewiesene How To's:</label>",
        afterSelect: function(values, text){
            
            jQuery('#article_howtoResource option[value="'+values+'"]').remove();
            jQuery('#article_howtoResource').append(jQuery("<option></option>").attr("value",values).attr('selected', 'selected'));
        
            var _self = this;

            if (this.$element.val().length >= 4 ){
                var selectables = this.$container.find('.ms-elem-selectable');
                selectables.addClass(_self.options.disabledClass);
            }
    
            
        },
        afterDeselect: function(values, text){
            
            jQuery('#article_howtoResource option[value="'+values+'"]').removeAttr('selected');
            
            var _self = this;

            if (this.$element.val() && this.$element.val().length <= 4 ){
                var selectables = this.$container.find('.ms-elem-selectable');
                selectables.removeClass(_self.options.disabledClass);
            }
        }
        
    });
    
    jQuery('#article_dosageResource').multiSelect({ 
        keepOrder: true ,
        selectableHeader: '<label for="article_dosageResource">Förderungs-Auswahl:</label>',
        selectionHeader: '<label >zugewiesene Förderung:</label>',
        afterSelect: function(values, text){
            
            jQuery('#article_dosageResource option[value="'+values+'"]').remove();
            jQuery('#article_dosageResource').append(jQuery("<option></option>").attr("value",values).attr('selected', 'selected'));
        
            var _self = this;

            if (this.$element.val().length >= 1 ){
                var selectables = this.$container.find('.ms-elem-selectable');
                selectables.addClass(_self.options.disabledClass);
            }
    
            
        },
        afterDeselect: function(values, text){
            
            jQuery('#article_dosageResource option[value="'+values+'"]').removeAttr('selected');
            
            var _self = this;

            if (this.$element.val() && this.$element.val().length <= 1 ){
                var selectables = this.$container.find('.ms-elem-selectable');
                selectables.removeClass(_self.options.disabledClass);
            }
        }
        
    });
    
    jQuery('#article_faqResource').multiSelect({ 
        keepOrder: true ,
        selectableHeader: '<label for="article_faqResource">FAQ-Auswahl:</label>',
        selectionHeader: "<label >zugewiesene Faq's:</label>",
        afterSelect: function(values, text){
            
            jQuery('#article_faqResource option[value="'+values+'"]').remove();
            jQuery('#article_faqResource').append(jQuery("<option></option>").attr("value",values).attr('selected', 'selected'));
        
            var _self = this;

            if (this.$element.val().length >= 4 ){
                var selectables = this.$container.find('.ms-elem-selectable');
                selectables.addClass(_self.options.disabledClass);
            }
    
            
        },
        afterDeselect: function(values, text){
            
            jQuery('#article_faqResource option[value="'+values+'"]').removeAttr('selected');
            
            var _self = this;

            if (this.$element.val() && this.$element.val().length <= 4 ){
                var selectables = this.$container.find('.ms-elem-selectable');
                selectables.removeClass(_self.options.disabledClass);
            }
        }
        
    });
};

initArticleBasicBenefitResourceSelected = function() {
    
    var val = jQuery("#article_benefitResourceOrder").val().split(',');
    jQuery.each(val, function(key, id) {
        jQuery('#article_benefitResource').multiSelect('select', id);   
    });
        
};

initArticleBasicLearningResourceSelected = function() {
    
    var val = jQuery("#article_learningResourceOrder").val().split(',');
    jQuery.each(val, function(key, id) {
        jQuery('#article_learningResource').multiSelect('select', id);   
    });
        
};

initArticleBasicHowtoResourceSelected = function() {
    
    var val = jQuery("#article_howtoResourceOrder").val().split(',');
    jQuery.each(val, function(key, id) {
        jQuery('#article_howtoResource').multiSelect('select', id);   
    });
        
};

initArticleBasicDosageResourceSelected = function() {
    
    var val = jQuery("#article_dosageResourceOrder").val().split(',');
    jQuery.each(val, function(key, id) {
        jQuery('#article_dosageResource').multiSelect('select', id);   
    });
    
};

initArticleBasicFaqSelected = function() {
  
    var val = jQuery("#article_faq").val().split(',');
    jQuery.each(val, function(key, id) {
        jQuery('#article_faqResource').multiSelect('select', id);   
    });
    
};
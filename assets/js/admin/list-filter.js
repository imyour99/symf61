jQuery(document).ready(function () {
    
    if(jQuery('body.administration.filter').find('.list-form-filter').length > 0) {
        initListFilterDatePicker();
    }
    
    if(jQuery('body.administration.filter').find('#list-form-filter-reset').length > 0) {
        initFilterReset();
    }
    
    if(jQuery('body.administration.filter').find('#toogleListFilter').length > 0) {
        initFilterToogle();
    }
    
    
    
});

initFilterReset = function() {
    
    jQuery("#list-form-filter-reset").unbind('click').bind('click', function(e) {  
        
        e.preventDefault();
        
        jQuery('.list-form-filter *').filter(':input').each(function(key, value) {
            
            //console.log('found: ' + this.name + ' '  + this.id + ' ' + this.name.indexOf("[send]") );
            
            if(this.id && this.name) {
                
                if(this.name && jQuery(this).is('input') ) { 
                    
                    //console.log('reset: ' + this.id + ' ' + this.name); 
                    
                    if(this.name.indexOf("[page]") === -1 && this.name.indexOf("[send]") === -1) {
                        jQuery('#'+ this.id ).val('');
                    } else if(jQuery(this).data("preset")) {
                        jQuery('#'+ this.id ).val(jQuery(this).data("preset"));
                    }
                    
                    //console.log('nowReset: ' + this.id + ' ' + this.name + ' ' ); 
                    
                } else if(this.name && jQuery(this).is('select') ) {
                    jQuery('#'+ this.id).val(jQuery(this).data("preset"));
                } 
                
            } else if(this.id && jQuery(this).data("name") && jQuery(this).data("preset")) { // .btn-group-toggle
                
                value = presetButtonGroup(this);
                while (value != jQuery(this).data("preset")) {
                    jQuery("#" + this.id ).trigger( "click" );
                    value = presetButtonGroup(this);
                }                
            }
            
        });
        
        jQuery( ".list-form-filter" ).submit();
        
    });
};

presetButtonGroup = function($this) { 
    var name = jQuery($this).data("name"); 
    var radios = jQuery('input[type="radio"][name="' + name + '"]');
    var checked = radios.filter(':checked');
    return(checked.val());   
};


initListFilterDatePicker = function() {
    
    var dateInputs = document.querySelectorAll("[data-calendar='1']");
    var idString = '';
    
    for (var i in dateInputs) if (dateInputs.hasOwnProperty(i)) {
        
        if(i) {
            if(idString) {
                idString = idString + ', ';
            }
            idString = idString + '#' + dateInputs[i].id;
        }
    }
    
    if(idString) {
        jQuery.datetimepicker.setLocale('de');
        jQuery(idString).datetimepicker({
            timepicker:false,
            format:'d.m.Y',
            debug:true
        });
    }
    
    
};

initFilterToogle = function() {
    
     jQuery( "#toogleListFilter" ).unbind('click').bind('click', function(e) {  
        
        e.preventDefault();
        jQuery( "#list-form-filter-accordion" ).toggle( "slow" );

    });
    
};
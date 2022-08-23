
jQuery(document).ready(function () {
    
    if(jQuery('body').find('.input-group-toggle').length > 0) {
        checkedInputGroupToogle();
        initInputGroupToogle();
    }
    
    if(jQuery('body.list').find('.input-position-toggle').length > 0) {
        jQuery(".input-position-toggle").inputFilter(function(value) {
            return /^\d*$/.test(value);
        });
    }
    
    if(jQuery('[data-toggle=confirmation]').length > 0) {
        initBootstrapConfirmation();
    }

});

checkedInputGroupToogle = function() {
    
    jQuery(".btn-group-toggle").each(function() {
        changeInputGroupToogle(this);
    });
            
};

initInputGroupToogle = function() {
    
    jQuery('.btn-group-toggle').unbind('click').bind('click', function(e) {     
        e.preventDefault();
        
        var name = jQuery(this).data("name"); 
        var radios = jQuery('input[type="radio"][name="' + name + '"]');
        var checked = radios.filter(':checked');
        var next = radios.eq(radios.index(checked) + 1);
        if (!next.length) {
            next = radios.first();
        }
        
        next.prop("checked", true);    
        jQuery(radios).trigger('change');
        changeInputGroupToogle(this);
        
    });
   
};

changeInputGroupToogle = function($this) {
    
    var btnClasses = ["btn-danger", "btn-success", "btn-dark", "btn-warning", "btn-info"];
    var name = jQuery($this).data("name"); 
    var radios = jQuery('input[type="radio"][name="' + name + '"]');
    var checked = radios.filter(':checked');
        
    jQuery($this).removeClass(btnClasses.join(" ")).addClass(checked.data("btn-class")).html(checked.data("btn-label"));
  
};

initBootstrapConfirmation = function() {
    
    jQuery('[data-toggle=confirmation]').unbind('click').bind('click', function(e) {  
        e.preventDefault();
        startBootstrapConfirmation(jQuery(this));
    });
    
    
};

startBootstrapConfirmation = function($this) {
    
    jQuery( "#bsConfirm" ).remove();
    var modalContent = $this.data("content");
    var modalTitle = $this.data("title");
    var modalEventLabel = $this.data("btn-event-label");
    var modalEventClass = $this.data("btn-event-class");
    var modalEventIcon = $this.data("btn-event-icon");
    var modalCancelLabel = $this.data("btn-cancel-label");
    var modalCancelClass = $this.data("btn-cancel-class");
    var modalCancelIcon = $this.data("btn-cancel-icon");
    var modalHtml = '<div class="modal" id="bsConfirm" tabindex="-1"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">' + modalTitle +'</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><p>' + modalContent +'</p></div><div class="modal-footer"><button type="button" id="modalEventId" class="' + modalEventClass + '"><i class="' + modalEventIcon + '" aria-hidden="true"></i>' + modalEventLabel + '</button><button type="button" class="' + modalCancelClass + '" id="modalCancelId" data-bs-dismiss="modal"><i class="' + modalCancelIcon + '" aria-hidden="true"></i>' + modalCancelLabel + '</button></div></div></div></div>';
    var modalHref = null;
    if($this.prop('href') !== undefined) {
        modalHref = $this.prop('href');
    }
    
    
    jQuery("body").append(modalHtml);
    var myModal = new bootstrap.Modal(jQuery('#bsConfirm'));
    myModal.show();
    
    if(modalHref) {
        initBootstrapConfirmationEvent(modalHref);
    }
    
};

initBootstrapConfirmationEvent = function(modalHref) {
  
  jQuery('#modalEventId').unbind('click').bind('click', function(e) {  
      jQuery(location).attr('href', modalHref);
  });
    
};

(function($) {
    $.fn.inputFilter = function(inputFilter) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
        });
    };
}(jQuery));




var UIExtendedModals = function () {

    
    return {
        //main function to initiate the module
        init: function () {
            
            // general settings
            $.fn.modalmanager.defaults.resize = true;
            
            //ajax demo:
            var $modal = $('#ajax-modal');
            
            $('.ajax-modal').on('click', function(){
                // create the backdrop and wait for next modal to be triggered
                var el = $(this);
                $modal.load(el.attr('data-url'), '', function(){
                    $modal.modal();
                });
            });
        }
    };
}();

jQuery(document).ready(function() {    
   UIExtendedModals.init();
});

function ajaxModalEvent(aObj, wrapObj) {
    //ajax demo:
    var $modal = $('#ajax-modal');
	if (aObj) {
		$modal = $(aObj);
	}
	var $wrap = null;
	if (wrapObj) {
		$wrap = $(wrapObj);
	} else {
		$wrap = $(document.body);
	}
    // create the backdrop and wait for next modal to be triggered
	$wrap.load($modal.attr('data-url'), '', function(){
	    $modal.modal({modalOverflow: true});
	});
}

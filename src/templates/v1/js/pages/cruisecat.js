function removeallcompare(){
	$('#compare').val('');
	$('.lbltextcompare').html('Add to compare');
	$('input[type="checkbox"][class="star-chose"]').attr('checked', false);
	$('#compareModal').modal('hide');
}
function compare() {
	var ids=$('#compare').val();
	if(ids){
		$.ajax({
			  type: "POST",
			  url: '/ajax/cruise/popupcompare',
			  data: {ids:ids},
			  success: function(response){
				  $('#result-compare').html(response);
				  $('#compareModal').modal('show');
			  },
		});	
	}
}
function removecompare(id){
	var ids=$('#compare').val();
	if(ids){
		arrs=ids.split(',');
		if(arrs.length>0){
			for(i=0;i<arrs.length;i++){
				if(arrs[i]==id){
					 arrs.splice(i,1);
				}
			}
		}		
		$('#compare').val(arrs.join());
		ids=$('#compare').val();
		$('#label'+id).html('Add to compare');
		$('#cm'+id).attr('checked', false);
		if(arrs.length==0){
			$('#compareModal').modal('hide');
			return false;
		}
		$.ajax({
			  type: "POST",
			  url: '/ajax/cruise/popupcompare',
			  data: {ids:ids},
			  success: function(response){
				  $('#result-compare').html(response);
				  $('#compareModal').modal('show');
			  },
		});	
	}
}
function sort(sort) {
	 $('#sorthide').val(sort);
	 load();
}
function load(sort){
	var sort = $('#sorthide').val();
	var category_id = $('#category_id').val();
	var cruise_number = $('#show-number').val();
	$.ajax({
		  type: "POST",
		  url: '/ajax/cruise/catsort',
		  data: {category_id: category_id, sort: sort,cruise_number: cruise_number},
		  success: function(response){
			  $('#result').html(response);
		  },
	});	
}
$(document).ready(function(){
    var bgcal = $('.container').offset().left + 15;
    $('.cat-banner h1').css({
        'left': bgcal
    });
    $(".show-more").click(function(){
    	var cruise_number = $('#show-number').val();
    	var category_id = $('#category_id').val();
    	var sort = $('#sorthide').val();
        $.ajax({       
            type: "POST",
            url: "/ajax/cruise/showmore", 
            data: {cruise_number: cruise_number, category_id:category_id, sort: sort},
            success: function(data){
               $("#result").html(data); 
               var n = parseInt($('#show-number').val()) + 6;
               if(parseInt($('#show-number').val()) >= parseInt($('#cruise-number').val())){
                     $('.show-more').hide();
               }else{
                     $('#show-number').val( n ) ;
               }
            }
        });  
         
     });
     $('#readmore').click(function(){
          if ($(this).text() == "Read more"){
        	  $('.hg-more').addClass('open');
              $(this).text("Read Less");
          }else{
        	  $('.hg-more').removeClass('open');
        	  $(this).text("Read more");
          }
     });
    if($('input[type="checkbox"][class="star-chose"]').length){
 		$('input[type="checkbox"][class="star-chose"]').bind('click',function() {
 			if($(this).is(':checked')) { 				
 			}else{
 				$('.lbltextcompare',$(this).parent()).html('Add to compare');
 			}
 		    var arrs = new Array();
 	        $('input[type="checkbox"][class="star-chose"]').each(function() {            
 	        	 if($(this).is(':checked')) {
 		        	 if(arrs.length == 3) {
 			        	 alert('Maximum number of cruises to compare is 3');
 			        	 $(this).attr('checked', false);
 		        	 }
 			    	 else{
 	        		 	arrs[arrs.length] = $(this).val();
 			    	 }
 		 	     }
 	        });
 	        $('#compare').val(arrs.join());
 	        $('.lblcompare').html('Add to cruise comparison');
 	        if(arrs.length == 0) { 	        		
        		$('.lbltextcompare').html('Add to compare');
        	}
 	        if(arrs.length  > 0) {
 	        	
 	        	if(arrs.length == 1) { 	        		
 	        		 $('#label'+arrs[0]).html('ADDED - Select another cruise to compare');
 	        	}
 	        	else {
 		        	for(i=0;i<arrs.length;i++) {
 		        		$('#label'+arrs[i]).html('ADDED - <a href="javascript:void(0)" onclick="javascript:compare()">Compare selected cruises</a>');
 		        	}
 	        	}
 	        }
 	        
 	   });
 	}
    $('#sort,.sub-most').click(function(event){
        event.stopPropagation();
    });
    $("#sort").click(function(){
        $(".sub-most").show();
        $(".sub-most ul li").click(function(){
            $(".sub-most ul li").removeClass('active');
            $(this).addClass('active');
            $("#sort").val($(this).text());
            $(".sub-most").hide();
        });
    });
    $('body').click(function(){
        $(".sub-most").hide();
    });
});
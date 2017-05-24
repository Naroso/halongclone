$(document).ready(function(){

	$('#owl-home-2').owlCarousel({
		items : 1,
		itemsDesktop : [1199,1],
		itemsDesktopSmall : [980,1],
		itemsTablet: [768,1],
		navigation: true,
		lazyLoad : true,
		pagination: false,
		navigationText: false,
		singleItem : true,
		autoHeight : true
	});
	var delay=10; //1 second    	
	setTimeout(function() {
		var h_media = $('.wrap-media img').height() - 15;    	
		$('.h_media').css('height', h_media);
	}, delay);
	//Trang home
	if($('#hdnNameCruise').length){
		$('#txtName').keyup(function(){
		var keyword=$(this).val();
		if(keyword){
			$.ajax({
				  type: "POST",
				  url: '/ajax/cruise/loadcruisename',
				  data: {keyword: keyword },
				  success: function(response){
					  $('#resultCruiseName').html(response );
					  $('#resultCruiseName').css('display','block');
				  },
			});
		}		
		});
		
		var startdate=moment().toDate();
		if(moment().format('a')=='pm'){
			startdate=moment().add(1,'days').toDate();
		}
		if($('#check-in').length) {
            var picker2months = new Pikaday(
                {
                    numberOfMonths: 1,
                    field: $('#check-in')[0],
                    firstDay: 1,
                    minDate: startdate,
                    maxDate: new Date(2020, 12, 31),
                    yearRange: [2000, 2020],
                    onSelect: function() {
                        $('#hdnDate').val(this.getMoment().format('YYYY-MM-D'));
                    }
                });
		}

		
		$('#txtName,#prices,#duration,#triptype,.sub-form-search,#btn-wishlist-1,.sub-wishlist-1,.wishlist-fixed,.sub-wishlist-2').click(function(event){
			event.stopPropagation();
		});
		
		$("#prices").click(function(){
			$(".sub-prices").show();
			$(".sub-duration").hide();
			$(".sub-triptype").hide();
			$(".sub-des").hide();
			$(".sub-prices ul li").click(function(){
				$("#prices").val($(this).text());
				$('#hdnPrice').val($(this).attr('value'));
				$(".sub-prices").hide();
			});
		});
		$("#duration").click(function(){
			$(".sub-duration").show();
			$(".sub-prices").hide();
			$(".sub-triptype").hide();
			$(".sub-des").hide();
			$(".sub-duration ul li").click(function(){
				$("#duration").val($(this).text());
				$('#hdnDay').val($(this).attr('value'));
				$(".sub-duration").hide();
			});
		});
		$("#triptype").click(function(){
			$(".sub-triptype").show();
			$(".sub-prices").hide();
			$(".sub-duration").hide();
			$(".sub-des").hide();
			$(".sub-triptype ul li").click(function(){
				$("#triptype").val($(this).text());
				$('#hdnCategory').val($(this).attr('value'));
				$(".sub-triptype").hide();
			});
		});
		$('body').click(function(){
			$(".sub-form-search, .sub-wishlist-1, .sub-wishlist-2").hide();
            $('#btn-wishlist-1 .fa-heart').removeClass('active');
		});	
		$('.sons').click(function(){
            $(this).toggleClass('on');
            $('.son').slideToggle();
        });
	}
	if($("#owl-home-1").length){
        $("#owl-home-1").owlCarousel({
            items : 3,
            itemsDesktop : [1199,3],
            itemsDesktopSmall : [980,2],
            itemsTablet: [768,2],
            itemsTabletSmall: [680,1],
            lazyLoad : true,
            navigation : true,
            navigationText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"]
        });
	}
	if($("#owl-home-3").length){
		$("#owl-home-3").owlCarousel({
	        items : 3,
	        itemsDesktop : [1199,3],
	        itemsDesktopSmall : [980,2],
	        itemsTablet: [768,2],
	        itemsTabletSmall: [680,1],
	        lazyLoad : true,
	        pagination: false,
	        navigation : true,
	        navigationText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"]
	    });
	}
	if($("#owl-home-2").length){
		$('#owl-home-2').owlCarousel({
	        items : 1,
	        itemsDesktop : [1199,1],
	        itemsDesktopSmall : [980,1],
	        itemsTablet: [768,1],
	        navigation: true,
	        lazyLoad : true,
	        pagination: false,
	        navigationText: false,
	        singleItem : true,
	        autoHeight : true
	    });
	}
	$('.h_media-1').css('height', $('.wrap-media-1').height());
    $('.h_media-2').css('height', $('.wrap-media-2').height());
    
	$('[data-toggle="tooltip"]').tooltip();
	var wid = $(window).width();
	if( wid < 600){
        $('.h-header-dropdown').click(function(){
            $(this).toggleClass('active');
            $(this).parent().find('.h_show').slideToggle();
        });
    }
    $('.included-pop').click(function(){
        $(this).parent().find('.detail-included').toggle();
    });
    $('.included-close').click(function(){
        $(this).parent().parent().hide();
    });
});
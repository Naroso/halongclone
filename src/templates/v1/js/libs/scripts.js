function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}
function getprice(){
	var cruise = $('#getprice_cruise').val();
	var room = $('#getprice_room').val();
	var check_in = $('#getprice_date').val();
	var name = $('#getprice_name').val();
	var itinerary = $('#getprice_itinerary option:selected').val();
	var email = $('#getprice_email').val();
	if(name !="" && email !=""){
		if(!validateEmail(email)){
			alert('Please input a validate email');
			$('#sentemail').focus();
			return false;
		}
		$.ajax({
			type: "POST",
			url: '/ajax/cruise/getprice',
			data: {cruise:cruise, room:room, check_in:check_in, email:email, name:name, itinerary:itinerary},
			beforeSend: function(){
			    $('#btnGetprice i').addClass('fa-spinner fa-pulse fa-fw');
			},
			success: function(response){
				if($.trim(response)!=""){
					$('.getprice-message').html('Thank you, our customer service will contact you shortly!');
					$('#priceModal').modal('hide');
					$('#btnGetprice i').removeClass('fa-spinner fa-pulse fa-fw');
					$('.getprice-success').show();
					setTimeout("$('.getprice-success').hide('slow')", 3000);
				}
			},
		});
	}else{
		alert('Please complete the form before proceeding');
		return false;
	}
}
function wishlist(id,type){
	if(id){
		$.ajax({
			  type: "POST",
			  url: '/ajax/cruise/addwishlist',
			  data: {id:id,type:type},
			  success: function(response){
				  if($.trim(response)!=""){
					  if($.trim(response)=='ip_voted'){
							 alert('You already saved this tour!');
							 return false;
					  }else{
						  arr_res=response.split("|");
						  if ("0" in arr_res){
							  $('#t'+id).html(arr_res[0]);
						  }
						  if ("1" in arr_res){
							  $('.lblwishlist').html(arr_res[1]);
						  }
						  if ("2" in arr_res){
							  $('.resultwishlist').html(arr_res[2]);
						  }
					  }
				  }			  
			  },
		});
	}
}
jQuery(document).ready(function($) {
    "use strict";

    /*==============================
     Mobile check
     ==============================*/
    function mobilecheck() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return false;
        }
        return true;
    }

    var w = $(window).width();
    /*==============================
     Menu toggle mobile
     ==============================*/
    $('.hl-bars').click(function(){
        $('.menu-fixed').addClass('active');
        $('body').addClass('modal-open');
    });
    $('.close-menu-fixed').click(function(){
        $('.menu-fixed').removeClass('active');
        $('body').removeClass('modal-open');
    });

    /*==============================
     Header + Footer dropdown
     ==============================*/
    $('.ef-search').click(function(){
        $('.sub-search-top').addClass('open');
    });
    $('.tg-cruise').click(function(){
       $('.ft-cruises-body').slideToggle();
        $(this).toggleClass('click');
    });

    if(w>991){
        $('.d-close').click(function(){
            $('.sub-search-top').removeClass('open');
        });
    }else{
        $('.d-close').click(function(){
            $('.header-fix-top').slideUp();
        });
    }
	$('.bestcruise-more').click(function(){
	   $('.bestcruise').toggle();
		$(this).text(function(i, text){
			return text === "Show more" ? "Show less" : "Show more";
		})
	});
    /*==============================
     toggle mobile
     ==============================*/
    $('.dropdown-links .more').click(function(){
        $(this).toggleClass('on');
        $(this).next().slideToggle();
        if($(this).hasClass('on')){
        	return false;
        }
    });
    $('.dropdown-language a').click(function(){
        $(this).toggleClass('on');
        $('.list-languages').slideToggle();
    });
    /* wishlist */
    $('#btn-wishlist-1').click(function(){
        $(this).find('.fa-heart').toggleClass('active');
        $('.sub-wishlist-1').toggle();
    });
    $('.wishlist-fixed').click(function(){
        $('.sub-wishlist-2').toggle();
    });
    if($(".btnsave").length){
		$(".btnsave").click(function(){
			var element=$(this);
			var cruise_id=$(this).attr('id').substr(1);
			var arr_res;
			var element2=$('p.z_12',$(this));
			if(cruise_id){
				$.ajax({
					  type: "POST",
					  url: '/ajax/cruise/addwishlist',
					  data: {id: cruise_id,type:'cruise'},
					  success: function(response){
						  if($.trim(response)!=""){
							  if($.trim(response)=='ip_voted'){
									 alert('You already saved this cruise!');
									 return false;
							  }else{
								  arr_res=response.split("|");
								  if ("0" in arr_res){
									  $('.saveto').html(arr_res[0]+' people saved this');
									  element2.html(arr_res[0]+' people saved this');
								  }
								  if ("1" in arr_res){
									  $('.lblwishlist').html(arr_res[1]);
								  }
								  if ("2" in arr_res){
									  $('.resultwishlist').html(arr_res[2]);
								  }
								  //element.removeClass('btnsave');
								  element.attr('id',' ');
							  }
						  }
					  },
				});
			}
		});
	}
    if($(".btnwl").length){
		$(".btnwl").click(function(){
			var element=$(this);
			var cruise_id=$(this).attr('id').substr(1);
			var arr_res;
			if(cruise_id){
				$.ajax({
					  type: "POST",
					  url: '/ajax/cruise/addwishlist',
					  data: {id: cruise_id,type:'cruise' },
					  success: function(response){
						  if($.trim(response)!=""){
							  if($.trim(response)=='ip_voted'){
									 alert('You already saved this cruise!');
									 return false;
							  }else{
								  arr_res=response.split("|");
								  if ("0" in arr_res){
									  element.html(arr_res[0]);
								  }
								  if ("1" in arr_res){
									  $('.lblwishlist').html(arr_res[1]);
								  }
								  if ("2" in arr_res){
									  $('.resultwishlist').html(arr_res[2]);
								  }
								  element.addClass('love');
								  //element.attr('id','');
							  }
						  }
					  },
				});
			}
		});
    }
	$('.btn-newletter').click(function(){
		var email=$('#email-home').val();
		if(email.trim()==''){
			alert('Please input email');
			$('#email-home').focus();
			return false;
		}
		if(!validateEmail(email)){
			alert('Please input a validate email');		
			$('#email-home').focus();
			return false;
		}
		$.ajax({
			  type: "POST",
			  url: '/ajax/utility/newsletter/ajaxnewsletter',
			  data: {email:email},
			  beforeSend: function(i){
			  },
			  success: function(response){
				  if($.trim(response)=="RESULT_OK"){				 
					  alert('Thank you for subscribing to our newsletter. We have received your email address.');
				  }
			  },
		});
	});

	$('.btnGetprice').click(function(){
		var cruise = $(this).attr('alt');
		$('#getprice_cruise').val(cruise);
		if( cruise == 'Au Co Cruise'){
			$('#price-itinerary option[value="2 days / 1 night"]').remove();
		}
	});

	if($('#getprice_date').length) {
        var pickergetprice = new Pikaday(
            {
                numberOfMonths: 1,
                field: $('#getprice_date')[0],
                firstDay: 1,
                minDate: moment().toDate(),
                maxDate: new Date(2020, 12, 31),
                yearRange: [2000, 2020],
                onSelect: function() {
                    $('#hdnDate').val(this.getMoment().format('YYYY-MM-D'));
                }
            });
	}

	//$("img.lazy").lazyload();
	$(function() {
        $(window).scroll(function() {
            if($(this).scrollTop() != 0) {
                $('#toTop').fadeIn();
            } else {
                $('#toTop').fadeOut();
            }
        });

        $('#toTop').click(function() {
            $('body,html').animate({scrollTop:0},800);
        });
    });

});

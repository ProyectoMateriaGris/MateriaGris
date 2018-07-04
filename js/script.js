$(document).ready(function(){

	$(".main").css({"height":$(window).height() + "px"});

	var flag = false;
	var scroll;

	$(window).scroll(function(){
		scroll = $(window).scrollTop();

		if(scroll > 200){
			if(!flag){
				$("header").css({"background-color": "black"});

				$(".caja_log2 a").css({"color":"white"});
				$(".caja_log2 button").css({"color":"white"});
				$(".logo_title").css({"color":"white"});
				
				flag = true;
			}
		}else{
			if(flag){
				$("header").css({"background-color": "white"});
				$(".caja_log2 a").css({"color":"black"});
				$(".caja_log2 button").css({"color":"black"});
				$(".logo_title").css({"color":"rgb(58, 58, 58)"});
				flag = false;
			}
		}


	});

});
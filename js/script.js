$(document).ready(function(){

	$(".main").css({"height":$(window).height() + "px"});

	var flag = false;
	var scroll;

	$(window).scroll(function(){
		scroll = $(window).scrollTop();

		if(scroll > 200){
			if(!flag){
				$("header").css({"background-color": "black"});

				$(".link_login li a").css({"color":"white"});
				flag = true;
			}
		}else{
			if(flag){
				$("header").css({"background-color": "white"});
				$(".link_login li a").css({"color":"black"});
				flag = false;
			}
		}


	});

});
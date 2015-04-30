$(window).load(function(){
	var cual;

	function parseURL(){
		var str = window.location.href;
		cual = str.split('=')[1];
	}

	parseURL();

	pageload(cual); //funciona como constructor //opcion 2- imagenes opcion 1-si o no

	//sound.play();

	function pageload (cual)
	{
		if (cual==0){
			$("#vid").append("<video width='100%' height='66.6%' autoplay src='info/comp1.mp4' >");
			$("#vid").append("</video>");
		}
		else if (cual==2){
			$("#vid").append("<video width='100%' height='66.6%' autoplay src='info/comp2.mp4' >");
			$("#vid").append("</video>");
		}
		else if (cual==3){
			$("#vid").append("<video width='100%' height='66.6%' autoplay src='info/comp3.mp4' >");
			$("#vid").append("</video>");
		}
	}

	$(window).resize(function(){
			resize1x1($('#vid'));
	});
		    
	$('#menu').click(menu);
	
	function menu() {
		window.history.back();
	}

	function resize1x1 (toRes)
	{
		var width = $(toRes).css("width"); // 1:1
		$(toRes).css("height", width); // 1:1
	}
});
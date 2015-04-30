jQuery.fn.shake = function(intShakes, intDistance, intDuration) {
    this.each(function() {
        $(this).css("position","relative"); 
        for (var x=1; x<=intShakes; x++) {
        	$(this).animate({left:(intDistance*-1)}, (((intDuration/intShakes)/4)))
    		.animate({left:intDistance}, ((intDuration/intShakes)/2))
    		.animate({left:0}, (((intDuration/intShakes)/4)));
    		}
  		});
	return this;
	};

	
            function sound () {
                new buzz.sound("inst", {formats: ["mp3", "acc"]}).play();
            }

var currInfo = {
	correct : null,
	text : null,
	subText : null
};

var allInfo = {
	gamesCount : 2,
	games : [ //allInfo.games[]
	//juego 1
		[ //allInfo.games[0] ==> juego 1
			{ correct: 'B', text: "Cancha"},
			{ correct: 'A', text: "Pino"},

			{ //allInfo.games[0][1]
				titulo: "\u00bfA qu\u00e9 suena? - Varios rangos distintivos con imagenes",
				instru: "Haga clic en ´escuchar´ y seleccione la imagen correcta"
			}
		],
		[ //allInfo.games[1] ==> juego 2
			{ correct: 'A', text: "Lana - Luna"},
			{ correct: 'B', text: "Tractor - Tractor"},

			{
				titulo: "\u00bfA qu\u00e9 suena? - Varios rasgos distintivos, iguales: ¿si o no?", //opcion del si o no sin imagenes
				instru: "Haga clic en ´escuchar´ y seleccione la imagen correcta"
			}
		], 
		[ //allInfo.games[2] ==> juego 3
			{ correct: 'B', text: "Cancha"},
			{ correct: 'A', text: "Pino"},

			{
				titulo: "\u00bfA qu\u00e9 suena? - Un rango distintivo con imagenes",
				instru: "Haga clic en ´escuchar´ y seleccione la imagen correcta"
			}  
		],
		[ //allInfo.games[3] ==> juego 4
			{ correct: 'A', text: "Lana - Luna"},
			{ correct: 'B', text: "Tractor - Tractor"},

			{
				titulo: "\u00bfA qu\u00e9 suena? - Un rasgo distintivo, iguales: ¿si o no?",
				instru: "Haga clic en ´escuchar´ y seleccione la imagen correcta"
			}
		]
	],
};

$(document).ready(function(){
	var root = "info/";
	var sound;
	var gamesCount=allInfo.gamesCount, gameCurr,cantjuegos=-1, ultm,cambio=0;
	var cualJuego = 0;
	var cual = 'A';
	var $pic1 = $("#pic1"), $pic2 = $("#pic2");
	var array= [];
	var randarray=[];

	function parseURL(){
		var str = window.location.href;
		cualJuego = str.split('=')[1];
	}

	//eden
	function random(){
	    array.splice(0,array.length);
	    randarray.splice(0,randarray.length);
	    for (var i=0;i<gamesCount;i++)
	        array[i]=i+1;
	    while(array.length>0){
	        var elegida=Math.floor((Math.random() * array.length) + 1);
	        randarray[randarray.length]=array[elegida-1];
	        array.splice(elegida-1,1)
	    }
	}

	parseURL();
	if (cualJuego==1||cualJuego==3){
		$("#video").append('<a href="demo1.html?cual=3"> <img src="botones/demo.png" id="demo" style="width: 9vw; margin-top:2vw; margin-left:2.75vw;"/> ');
		$("#video").append('</a>');
	}
	else{
		$("#video").append('<a href="demo1.html?cual=2"> <img src="botones/demo.png" id="demo" style="width: 9vw; margin-top:2vw; margin-left:2.75vw;"/>');
		$("#video").append('</a>');
	}

	random();
	pageload(); //funciona como constructor //opcion 2- imagenes opcion 1-si o no
	gameload(); //funciona como init

	//sound.play();

	function pageload ()
	{
		$(window).resize(function(){
			resize1x1($('#sound'));
			resize1x1(pic1);
			resize1x1(pic2);
			resize1x1($('#ayuda'));
			//resize1x1($('#boton'));
			//resize1x1($('#correcto'));
		});
		    setText($("#txt"), allInfo.games[cualJuego][allInfo.games[cualJuego].length-1].titulo);
		    setText($("#subtxt"), allInfo.games[cualJuego][allInfo.games[cualJuego].length-1].instru);

		$(pic1).click(function(){
		    if (cambio==1) {
				imageClick(false, $(this));
		    }
		    else{
				imageClick(true, $(this));
		    }
		});

		$('#ayuda').click(ayuda);

		$('#menu').click(menu);

		$(pic2).click(function(){
		    if (cambio==1) {
				imageClick(true, $(this));
		    }
		    else{
				imageClick(false, $(this));
		    }
		});

		$('#sound').click(function(){
			sound.play();
		});

		$('.pasar').click(function(){
			reset();
		});
	}
	//eden
	function gameload() {
		cantjuegos++;
		cambio=0;

		    
		if (randarray.length==cantjuegos) {//genera devuelta el random
		    cantjuegos--;
		    ultm=randarray[cantjuegos];
		    random();
		    while (ultm==randarray[0])//Verifica q array no empieze igual como termino
			random();
		    cantjuegos=-1;
		    gameload();
		}
		else{
		    gameCurr=randarray[cantjuegos];
		    attachInfo();
		    setText($("#boton"), allInfo.games[cualJuego][randarray[cantjuegos]-1].text);
		    sound.play();
		    //setText($("#txt"), currInfo.text);
		    //setText($("#subtxt"), currInfo.subText);
		    if (Math.floor((Math.random()*2) + 1)==1) {// Random de posicion de imagenes
				loadImage(true, pic1);
				loadImage(false, pic2);
		    }
		    else{
				cambio=1;
				loadImage(true, pic2);
				loadImage(false, pic1);
		    }
		}}

	function attachInfo()
	{
		currInfo.correct = allInfo.games[cualJuego][gameCurr-1].correct;
		cual = currInfo.correct;
		sound = new buzz.sound(root+cualJuego+"/"+gameCurr+"/sound", 
			{formats: ["ogg", "mp3", "acc"]});
	}

	function reset()
	{
		$('.pasar').addClass('hidden');
		resetColor($('.fotos'));
		gameload();
	}

	function resetColor (img)
	{
		$(img).css("background-color", "transparent");
		$(img).css("opacity", "1");
	}

	function imageClick (which, dis) 
	{
		if (which)
			if (cual==='A')
			{
				$(dis).css("background-color", "#52CC52");
				$(dis).css("opacity", "0.7");
				letThru();
			}	
			else
				$(dis).shake(5,7,1000);
		else
			if (cual==='A')
				$(dis).shake(5,7,1000);
			else
			{
				$(dis).css("background-color", "#52CC52");
				$(dis).css("opacity", "0.9");
				letThru();
			}
	}

	function letThru ()
	{
		$('.hidden').removeClass('hidden');
		$('#boton')
	}

	function setText (parent, text)
	{
		$(parent).empty();
		$(parent).append(text); 
	}

	//hace el load de las imagenes
	function loadImage (first, parent)
	{
		$(parent).empty();
		var imgnumber = "img"+(first? 1 : 2);
		var imgname = "imagen"+(first? 'A':'B')+".jpg";

		$(parent).append("<img src='"+root+cualJuego+"/"+gameCurr+"/"+imgname+"' id='"+imgnumber+"' class='img-responsive' style='width: 100%; height: 44vh;'/>");
		resize1x1(parent);
	}

	function ayuda() {

	}

	function menu() {
		window.location.href = "index.html";
	}

	function resize1x1 (toRes)
	{
		//var width = $(toRes).css("width"); // 1:1
		//$(toRes).css("height", width); // 1:1


	}
});
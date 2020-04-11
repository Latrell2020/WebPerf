/* script benchmark footer */
$(document).ready(function() {
	var bench_number = $('.bench').length;
	// si on a au moins un benchmark récupéré, on affiche le premier
	if (bench_number > 0){
		$('#bench-displayed-content').html($('.bench').eq(0).children('.bench-content').html());
		$('#bench-displayed-title').html($('.bench').eq(0).children('.title-bench').html());
		$('#bench-displayed-date').html($('.bench').eq(0).children('.date-news').html());
	}
	$('.bench').eq(0).addClass('current-bench');
	// si on a au moins 2 benchmarks récupérés, on lance le cycle fadeIn/fadeOut
	if (bench_number > 1)
		timeoutFadeOut();
});

function timeoutFadeOut() {
	setTimeout(function() {
		startFadeOut()
	}, 4000);
}

function startFadeOut() {
	
	var nextBenchTitle = $('.bench.current-bench').next('.bench').children('.title-bench');
	if (nextBenchTitle.length == 0)
		nextBenchTitle = $('.title-bench').eq(0);
	
	var currentBenchTitle = $('.bench.current-bench').children('.title-bench');
	
	//si le prochain titre de benchmark est différent du titre courant
	if($(currentBenchTitle).html() != $(nextBenchTitle).html()) {
		
		//on fadeOut le titre et le contenu
		$('.fade-both').fadeOut(1000).promise().done(function() {
			
			var nextBench = $('.bench.current-bench').next('.bench');
			if (nextBench.length == 0){
				nextBench = $('.bench').eq(0);
			}
			
			//on remplace le contenu et le titre des bloc par ceux du prochain bench a afficher
			$('#bench-displayed-content').html($(nextBench).children('.bench-content').html());
			$('#bench-displayed-title').html($(nextBench).children('.title-bench').html());
			
			//on passe la classe current au prochain bench
			$('.bench.current-bench').removeClass('current-bench');
			$(nextBench).addClass('current-bench');
			startFadeIn();
		});
	} else {
		//sinon on fadeOut juste le contenu sans le titre
		$('.fade-content').fadeOut(1000).promise().done( function() {
			var nextBench = $('.bench.current-bench').next('.bench');
			if (nextBench.length == 0){
				nextBench = $('.bench').eq(0);
			}
			
			//on remplace le contenu des bloc par ceux du prochain bench a afficher
			$('#bench-displayed-content').html($(nextBench).children('.bench-content').html());
			$('#bench-displayed-date').html($(nextBench).children('.date-news').html());
			
			$('.bench.current-bench').removeClass('current-bench');
			$(nextBench).addClass('current-bench');
			startFadeIn();
		});
	}
}

function startFadeIn() {
	$('.fade-both').fadeIn(1000).promise().done( function() {
		timeoutFadeOut();
	});
}

/* mediacenter rollover scripts */
$(document).ready(function(){
	//boutons classiques
	$('.mediacenter-cat-container a').mouseover(function(){
		$(this).children('.mediacenter-container-cat-icon').css('background-position', 'center -50px');
		$(this).children('.mediacenter-cat-title').css({'color':'#3c3c3e', 'border-bottom':'1px solid #3c3c3e', 'border-top':'1px solid #3c3c3e'});
		$(this).parent().css('border', '1px solid #3c3c3e');
	}).mouseout(function(){
		$(this).children('.mediacenter-container-cat-icon').css('background-position', 'center top');
		$(this).children('.mediacenter-cat-title').css({'color':'#EB7703', 'border-bottom':'1px solid #EB7703', 'border-top':'1px solid #EB7703'});
		$(this).parent().css('border', '1px solid #EB7703');
	});
	//bouton webTV
	$('.mediacenter-cat-container-webtv a').mouseover(function(){
		$(this).children('.mediacenter-container-cat-icon-webtv').css('background-position', 'center -75px');
		$(this).parent().css('border', '1px solid #3c3c3e');	
	}).mouseout(function(){
		$(this).children('.mediacenter-container-cat-icon-webtv').css('background-position', 'center top');
		$(this).parent().css('border', '1px solid #EB7703');
	});
});
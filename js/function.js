$(document).ready(function() {

	// First screen full height
	function setHeiHeight() {
	    $('.full__height').css({
	        minHeight: $(window).height() + 'px'
	    });
	}
	setHeiHeight(); // устанавливаем высоту окна при первой загрузке страницы
	$(window).resize( setHeiHeight ); // обновляем при изменении размеров окна


	// Reset link whte attribute href="#"
	$('[href*="#"]').click(function(event) {
		event.preventDefault();
	});

	// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
	// $('#main__menu a[href^="#"]').click( function(){ 
	// 	var scroll_el = $(this).attr('href'); 
	// 	if ($(scroll_el).length != 0) {
	// 	$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
	// 	}
	// 	return false;
	// });

	// Stiky menu // Липкое меню. При прокрутке к элементу #header добавляется класс .stiky который и стилизуем
    // $(document).ready(function(){
    //     var HeaderTop = $('#header').offset().top;
        
    //     $(window).scroll(function(){
    //             if( $(window).scrollTop() > HeaderTop ) {
    //                     $('#header').addClass('stiky');
    //             } else {
    //                     $('#header').removeClass('stiky');
    //             }
    //     });
    // });


    // Mobile nav 
    $('body').on('click', '.navbar__top', function(event) {
        event.preventDefault();
        $(this).toggleClass('open');
    });

    // Ajax reload
    $("body").on("click", "a", function() {
            // $("body").html("Загрузка!");
            var wrap = $(".wrapper");
            var cont = $(".main__content");
            // var cont_old = $(".main__content.remove");
            var audio = document.getElementById("list_voice");
            var href = $(this).attr("href");

            cont.css('z-index', '10000');

            $.ajax({ type: "GET",
                url: href,
                cache: false,
                  success: function (data, html) {
                    // Title tag
                    document.title = data
                      .match(/<title>(.*?)<\/title>/)[1]
                      .trim();
                  
                    // Replace url In Browser
                    history.pushState('', '', href);
                  
                    // Body content
		            cont.addClass('slideLeft');
		            audio.play();
		            setTimeout(function() {
		            	cont.remove();
		            }, 1000);
		            wrap.append('<div class="main__content main__content_new"></div>');
                    var bodyContent = $(".header,.container_center,.footer",data);
		            // console.log(bodyContent)
                    $(".main__content_new").html(bodyContent);

                    var contHeight = bodyContent.height();

                    wrap.css('height', contHeight);

		            // console.log(contHeight);
		            $(".main__content").removeClass('main__content_new');
		            wrap.removeAttr('style')

                  },
                  error: function () {
                  	$("body").html('404 - Errore');
                  }
            });
        return false;
    });

});
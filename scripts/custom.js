(function($){
    "use strict";

    $(document).ready(function(){


    if($('header').hasClass('full-width')) {
        $('header').attr('data-full', 'yes');
    }  
    if($('header').hasClass('alternative')) {
        $('header').attr('data-alt', 'yes');
    }
    function menumobile(){
        var winWidth = $(window).width();
        if( winWidth < 973 ) {
            $('#navigation').removeClass('menu');
            $('#navigation li').removeClass('dropdown');
            $('header').removeClass('full-width');
            $('#navigation').superfish('destroy');
        } else {
            $('#navigation').addClass('menu');
            if($('header').data('full') === "yes" ) {
                 $('header').addClass('full-width')
            }
            $('#navigation').superfish({
                delay:       300,
                animation:   {opacity:'show'},
                speed:       200,
                speedOut:    50
            });
        }
        if( winWidth < 1272 ) {
            $('header').addClass('alternative').removeClass('full-width');
        } else {
            if($('header').data('alt') === "yes" ) {} else {
                $('header').removeClass('alternative');
            }
        }
    }

    $(window).resize(function (){
        menumobile();
    });
    menumobile();


        var jPanelMenu = $.jPanelMenu({
          menu: '#responsive',
          animated: false,
          duration: 200,
          keyboardShortcuts: false,
          closeOnContentClick: true
        });


        $('.menu-trigger').on('click',function(){
          var jpm = $(this);

          if( jpm.hasClass('active') )
          {
            jPanelMenu.off();
            jpm.removeClass('active');
          }
          else
          {
            jPanelMenu.on();
            jPanelMenu.open();
            jpm.addClass('active');
          }
          return false;
        });


        $('#jPanelMenu-menu').removeClass('sf-menu');
        $('#jPanelMenu-menu li ul').removeAttr('style');


        $(window).resize(function (){
          var winWidth = $(window).width();
          var jpmactive = $('.menu-trigger');
          if(winWidth>990) {
            jPanelMenu.off();
            jpmactive.removeClass('active');
          }
        });


    $('.responsive-table').stacktable();
    


        var pxShow = 400;
        var fadeInTime = 400;
        var fadeOutTime = 400;
        var scrollSpeed = 400;

        $(window).scroll(function(){
          if($(window).scrollTop() >= pxShow){
            $("#backtotop").fadeIn(fadeInTime);
          } else {
            $("#backtotop").fadeOut(fadeOutTime);
          }
        });

        $('#backtotop a').on('click',function(){
          $('html, body').animate({scrollTop:0}, scrollSpeed);
          return false;
        });
    


        $('#job-spotlight').showbizpro({
            dragAndScroll:"off",
            visibleElementsArray:[1,1,1,1],
            carousel:"off",
            entrySizeOffset:0,
            allEntryAtOnce:"off",
            rewindFromEnd:"off",
            autoPlay:"off",
            delay:2000,
            speed:400,
            easing:'easeOut'
        });

        $('#our-clients').showbizpro({
            dragAndScroll:"off",
            visibleElementsArray:[5,4,3,1],
            carousel:"off",
            entrySizeOffset:0,
            allEntryAtOnce:"off"
        });



        $('.fullwidthbanner').revolution({
            delay: 9000,
            startwidth: 1180,
            startheight: 585,
            onHoverStop: "on",
            navigationType: "none",
            navigationArrows: "verticalcentered",
            navigationStyle: "none",
            touchenabled: "on",
            navOffsetHorizontal: 0,
            navOffsetVertical: 20,
            stopAtSlide: -1,
            stopAfterLoops: -1,
            fullWidth: "on",
        });



        $('.testimonials-slider').flexslider({
            animation: "fade",
            controlsContainer: $(".custom-controls-container"),
            customDirectionNav: $(".custom-navigation a")
        });




        $('.counter').counterUp({
            delay: 10,
            time: 800
        });




        var config = {
          '.chosen-select'           : {disable_search_threshold: 10, width:"100%"},
          '.chosen-select-deselect'  : {allow_single_deselect:true, width:"100%"},
          '.chosen-select-no-single' : {disable_search_threshold:10, width:"100%"},
          '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
          '.chosen-select-width'     : {width:"95%"}
        };
        for (var selector in config) {
          $(selector).chosen(config[selector]);
        }


        $('.checkboxes').find('input:first').addClass('first')
        $('.checkboxes input').on('change', function() {
            if($(this).hasClass('first')){
                $(this).parents('.checkboxes').find('input').prop('checked', false);
                $(this).prop('checked', true);
            } else {
                $(this).parents('.checkboxes').find('input:first').not(this).prop('checked', false);
            }
        });


        
            $('body').magnificPopup({
                type: 'image',
                delegate: 'a.mfp-gallery',

                fixedContentPos: true,
                fixedBgPos: true,

                overflowY: 'auto',

                closeBtnInside: true,
                preloader: true,

                removalDelay: 0,
                mainClass: 'mfp-fade',

                gallery:{enabled:true},

                callbacks: {
                    buildControls: function() {
                        console.log('inside'); this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
                    }
                }
            });


            $('.popup-with-zoom-anim').magnificPopup({
                type: 'inline',

                fixedContentPos: false,
                fixedBgPos: true,

                overflowY: 'auto',

                closeBtnInside: true,
                preloader: false,

                midClick: true,
                removalDelay: 300,
                mainClass: 'my-mfp-zoom-in'
            });


            $('.mfp-image').magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                mainClass: 'mfp-fade',
                image: {
                    verticalFit: true
                }
            });


            $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,

                fixedContentPos: false
            });


    $("#contactform .submit").on('click',function(e) {


      e.preventDefault();
      var user_name       = $('input[name=name]').val();
      var user_email      = $('input[name=email]').val();
      var user_comment    = $('textarea[name=comment]').val();

      var proceed = true;
      if(user_name===""){
          $('input[name=name]').addClass('error');
            proceed = false;
          }
          if(user_email===""){
            $('input[name=email]').addClass('error');
            proceed = false;
          }
          if(user_comment==="") {
            $('textarea[name=comment]').addClass('error');
            proceed = false;
          }

          if(proceed) {
            $('.hide').fadeIn();
            $("#contactform .submit").fadeOut();
              var post_data = {'userName':user_name, 'userEmail':user_email, 'userComment':user_comment};

              $.post('contact.php', post_data, function(response){
                var output;
                if(response.type == 'error')
                  {
                    output = '<div class="error">'+response.text+'</div>';
                    $('.hide').fadeOut();
                    $("#contactform .submit").fadeIn();
                  } else {

                    output = '<div class="success">'+response.text+'</div>';
                    $('#contact div input').val('');
                    $('#contact textarea').val('');
                    $('.hide').fadeOut();
                    $("#contactform .submit").fadeIn().attr("disabled", "disabled").css({'backgroundColor':'#c0c0c0', 'cursor': 'default' });
                  }

                  $("#result").hide().html(output).slideDown();
                }, 'json');
            }
      });

    $("#contactform input, #contactform textarea").keyup(function() {
      $("#contactform input, #contactform textarea").removeClass('error');
      $("#result").slideUp();
    });





        var $accor = $('.accordion');

         $accor.each(function() {
            $(this).addClass('ui-accordion ui-widget ui-helper-reset');
            $(this).find('h3').addClass('ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-all');
            $(this).find('div').addClass('ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom');
            $(this).find("div").hide().first().show();
            $(this).find("h3").first().removeClass('ui-accordion-header-active ui-state-active ui-corner-top').addClass('ui-accordion-header-active ui-state-active ui-corner-top');
            $(this).find("span").first().addClass('ui-accordion-icon-active');
        });

        var $trigger = $accor.find('h3');

        $trigger.on('click', function(e) {
            var location = $(this).parent();

            if( $(this).next().is(':hidden') ) {
                var $triggerloc = $('h3',location);
                $triggerloc.removeClass('ui-accordion-header-active ui-state-active ui-corner-top').next().slideUp(300);
                $triggerloc.find('span').removeClass('ui-accordion-icon-active');
                $(this).find('span').addClass('ui-accordion-icon-active');
                $(this).addClass('ui-accordion-header-active ui-state-active ui-corner-top').next().slideDown(300);
            }
             e.preventDefault();
        });

    

        var link = $(".app-link");
        $('.close-tab').hide();

        $('.app-tabs div.app-tab-content').hide();
        link.on('click', function(e) {

            e.preventDefault();
            $(this).parents('div.application').find('.close-tab').fadeOut();
            if($(this).hasClass('opened')) {
                $(this).parents('div.application').find(".app-tabs div.app-tab-content").slideUp('fast');
                $(this).parents('div.application').find('.close-tab').fadeOut(10);
                $(this).removeClass('opened');
            } else {
                $(this).parents('div.application').find(".app-link").removeClass('opened');
                $(this).addClass('opened');
                var a = $(this).attr("href");
                $(this).parents('div.application').find(a).slideDown('fast').removeClass('closed').addClass('opened');
                $(this).parents('div.application').find('.close-tab').fadeIn(10);
            }

            $(this).parents('div.application').find(".app-tabs div.app-tab-content").not(a).slideUp('fast').addClass('closed').removeClass('opened');
            
        });

        $('.close-tab').on('click',function(e){
            $(this).fadeOut();
            e.preventDefault();
            $(this).parents('div.application').find(".app-link").removeClass('opened');
            $(this).parents('div.application').find(".app-tabs div.app-tab-content").slideUp('fast').addClass('closed').removeClass('opened');
        })


        $('.box-to-clone').hide();
        $('.add-box').on('click', function(e) {
            e.preventDefault();
            var newElem = $(this).parent().find('.box-to-clone:first').clone();
            newElem.find('input').val('');
            newElem.prependTo($(this).parent()).show();
            var height = $(this).prev('.box-to-clone').outerHeight(true);
            
            $("html, body").stop().animate({ scrollTop: $(this).offset().top-height}, 600);
        });

        $('body').on('click','.remove-box', function(e) {
            e.preventDefault();
            $(this).parent().remove();
        });



  

        var $tabsNav    = $('.tabs-nav'),
        $tabsNavLis = $tabsNav.children('li');

        $tabsNav.each(function() {
            var $this = $(this);

            $this.next().children('.tab-content').stop(true,true).hide()
            .first().show();

            $this.children('li').first().addClass('active').stop(true,true).show();
        });

        $tabsNavLis.on('click', function(e) {
            var $this = $(this);

            $this.siblings().removeClass('active').end()
            .addClass('active');

            $this.parent().next().children('.tab-content').stop(true,true).hide()
            .siblings( $this.find('a').attr('href') ).fadeIn();

            e.preventDefault();
        });
          var hash = window.location.hash;
    var anchor = $('.tabs-nav a[href="' + hash + '"]');
    if (anchor.length === 0) {
        $(".tabs-nav li:first").addClass("active").show();
        $(".tab-content:first").show();
    } else {
        anchor.parent('li').trigger( "click" );
    }

});

})(this.jQuery);


document.addEventListener("DOMContentLoaded", function() {
  // Khởi tạo login_status trong localStorage nếu chưa có
  if (!localStorage.getItem("login_status")) {
      localStorage.setItem("login_status", "false");
  }

  const loginLinksContainer = document.querySelector(".float-right");

  function renderLoginLinks() {
      const loginStatus = localStorage.getItem("login_status");
      const username = localStorage.getItem("current_user");

      if (loginStatus === "true" && username) {
          loginLinksContainer.innerHTML = `<li><a href="#">Xin chào, ${username}</a></li><li><a href="#" id="logout">Đăng xuất</a></li>`;

          document.getElementById("logout").addEventListener("click", function() {
              localStorage.setItem("login_status", "false");
              localStorage.removeItem("current_user");
              renderLoginLinks();
          });
      } else {
          loginLinksContainer.innerHTML = `
              <li><a href="my-account.html#tab2"><i class="fa fa-user"></i> Đăng ký</a></li>
              <li><a href="my-account.html"><i class="fa fa-lock"></i> Đăng nhập</a></li>
          `;
      }
  }

  function handleRegister(event) {
      event.preventDefault();

      const email = document.getElementById("reg_email").value;
      const password = document.getElementById("reg_password").value;
      const confirmPassword = document.getElementById("reg_password2").value;

      if (password !== confirmPassword) {
          alert("Mật khẩu không khớp!");
          return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || {};

      if (users[email]) {
          alert("Email này đã được đăng ký!");
          return;
      }

      users[email] = password;
      localStorage.setItem("users", JSON.stringify(users));
      alert("Đăng ký thành công! Hãy đăng nhập.");

      // Chuyển sang tab đăng nhập
      document.querySelector("a[href='#tab1']").click();
  }

  function handleLogin(event) {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const users = JSON.parse(localStorage.getItem("users")) || {};

      if (users[username] && users[username] === password) {
          localStorage.setItem("login_status", "true");
          localStorage.setItem("current_user", username);
          alert("Đăng nhập thành công!");
          renderLoginLinks();
      } else {
          alert("Sai tài khoản hoặc mật khẩu!");
      }
  }

  // Gắn sự kiện cho form đăng ký và đăng nhập
  const registerForm = document.querySelector("form.register");
  const loginForm = document.querySelector("form.login");

  if (registerForm) {
      registerForm.addEventListener("submit", handleRegister);
  }

  if (loginForm) {
      loginForm.addEventListener("submit", handleLogin);
  }

  // Render lại link đăng ký/đăng nhập dựa trên trạng thái
  renderLoginLinks();
});


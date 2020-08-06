$(function(){
  
  var $html = $('html');
  var $header = $('header');
  var $gnb = $('.gnbList')
  var $gnbLi = $('.gnbList > ul > li')
  var $gnbA = $('.gnbList > ul > li > a')
  var $gnbDepUl =  $('.gnbList > ul > li > ul');
  var $gnbDep =  $('.gnbList > ul > li > ul > li');
  var $gnbDepth =  $('.gnbList > ul > li > ul > li > a');
  var $navi =  $('#navi');
  var $naviBtn =  $('#naviBtn');
  var $pcNavi =  $('#pcNavi');
  var $pcNavi1 =  $('#pcNavi .navi1');
  var $pcNavi2 =  $('#pcNavi .navi2');
  
  
//	$gnbLi.each(function(){
//		$(this).mouseenter(function(){
//			$(this).children('a').css('width',$gnbDepth);
//		});
//	});
	
	// navi ani
  $gnbDepUl.each(function() {
    $(this).find('li').each(function( index ) {
      $(this).css({'animation-delay': (index/20)+'s'});
	  });
  });



  var menuEvent = function () {
    $header.each(function() {
      if( $html.is('.web') ){
        $(this).bind('mouseenter',function(){
          $(this).addClass('on');
        });
        $(this).bind('mouseleave',function(){
          $(this).removeClass('on');
        });        
      } else {
        $(this).unbind('mouseenter mouseleave')          
      }
    });

    $gnbDepth.each(function() {
      if( $html.is('.web') ){
        $(this).bind('mouseenter',function(){
          $gnbA.removeClass('hover');
          $(this).parent().parent().siblings('a').addClass('hover');
        });
        $(this).bind('mouseleave',function(){
          $gnbA.removeClass('hover');
        });
      } else {
        $(this).unbind('mouseenter mouseleave')
      }
    });

    $gnbA.each(function() {
      if( $html.is('.web') ){
        $(this).unbind('click');
      } else {
        $(this).unbind('click');
        $(this).click(function(){
          if ($(this).is('.hover')){
            $(this).siblings('ul').slideUp(300);
            $(this).removeClass('hover');
          } else {
            $gnbDepUl.slideUp(300);
            $gnbA.removeClass('hover');
            $(this).addClass('hover');
            $(this).siblings('ul').slideDown(300);
          }
        });
      }
    });


  }

  

  var menuWchk = function(){
    var winWidth = $(window).width();
    if(winWidth > 1020){ $html.addClass('web'); $html.removeClass('mobile');
    } else { $html.removeClass('web'); $html.addClass('mobile'); }
  
    menuEvent();
  }

  var linkLimits = function (){ 
    $('a[id^=topNavi]').click(function(event){
      var winWidth =  $(window).width();
      if (winWidth < 1020){ 
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
      }
    });
  }; 


	$naviBtn.bind('click',function(){
		var winHeight = $(window).height();	
		if (!$(this).is('.active')){
			$(this).addClass('active');
			$navi.animate({'right':'0','opacity':'1'},400);
			$navi.css({'height':winHeight,'overflow-y':'scroll'});
			//$gnb.css('height',winHeight-$topQuick.height());
			$pcNavi1.addClass('off');
			$pcNavi2.addClass('off');
			
			$('body').attr( 'data-pos', $(window).scrollTop() )
			$('html, body').css({'overflow-y':'hidden','position':'relative','height':'100%'});
			$('#allBg').css('height',winHeight);
		} else {
			$(this).removeClass('active');
			$navi.animate({'right':'-100%','opacity':'0'},400);
			$pcNavi1.removeClass('off');
			$pcNavi2.removeClass('off');

			$('html, body').css({'overflow-y':'auto','position':'static','height':'auto'})
			$(window).scrollTop( $('body').attr( 'data-pos' ) );
			$('#allBg').css('height','0');

			$gnbA.removeClass('hover');
			$gnbDepUl.removeAttr('style','');
			$gnb.removeAttr('style','');
			$navi.removeAttr('style','');
		}
	});

  
  var headerRe = function(){
    var winWidth = $(window).width();
    if (winWidth < 1040){
      $header.removeClass();
      if (!$('#mainS').length > 0){ $header.addClass('subCont');}
    } else {

    }    
    
    if(!navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/)){ 
      if ($naviBtn.is('.active')){ $naviBtn.click(); }
    }
  }

  var scrollDiv = function() {
    var $myTopH = $header.height()*1.4;
    var $tmp = $(window).scrollTop();
    if ($tmp <= $myTopH){ $header.removeClass('fixed');
    } else { $header.addClass('fixed');}
  }

  var mScrollDiv = function() {
    var $myTopH = $header.height()*1.4;
    var $tmp = $(window).scrollTop();
    if ($tmp <= $myTopH){ $header.removeClass('mfixed');
    } else { $header.addClass('mfixed');}
  }

  
  $('html').bind('mousewheel', function(e){
    if (!$html.is('.mobile')){  
      if(e.originalEvent.wheelDelta < 0) { $header.removeClass('move');
      } else { $header.addClass('move'); }
    }
  });


  $(window).load(function() {
    menuWchk();
    linkLimits();
    if (!$html.is('.mobile')){
      scrollDiv();      
    } else {
      mScrollDiv();
    }

    $(window).scroll(function() { 
      if (!$html.is('.mobile')){
        scrollDiv(); 
      } else {
        mScrollDiv(); 
      }
    });

  });
  if (!$('#mainS').length > 0){ $header.addClass('subCont');}

  $(window).resize(function() {
    menuWchk();
    linkLimits();
    headerRe();
  });

  $(window).on( "orientationchange", function( event ) { menuWchk(); linkLimits(); headerRe();} )

	

});
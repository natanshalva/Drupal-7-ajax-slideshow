/*
 * ##### Sasson - advanced drupal theming. #####
 *
 * SITENAME scripts.
 *
 */
(function($) {
    //  DUPLICATE AND UNCOMMENT
    
    Drupal.behaviors.general = {
        attach: function(context, settings) {
            
            var inMenuFirst = $(".n_con").find('.field-name-field-in-menu:first');
            inMenuFirst.css('font-weight' , 'bold');
            
            var inMenuLast = $(".n_con").find('.field-name-field-in-menu:last');
            inMenuLast.addClass('bordeNone');
                  
        }    
    };
    
    Drupal.behaviors.leftFlay = {
        attach: function(context, settings) {
            // alert('ok');
            var speed = 500;
            var n_front =  $("#n_front");
            var n_frontLi =   $("ul#n_front_li li:not(:eq(2))");
            var content =  $(".content");
            var blockBlock1 =  $(".front #block-block-1");
            var viewsRow = $('.views-row');
            var viewsTitle =  $(".views-row span.field-content:first a");
            var topMenu = $("#block-block-4"); 
            var topMenuLi = $("#block-block-4 li");
            var n_small_menu = $(".n_small_menu li");
            
         //   viewsRow.hide();
            
           // --------------------------------------------------- // 
            
          
            
           // console.log(viewOn , "viewOn");
            // move the main to the side 
            function movemein(viewOn){
                if( viewOn == true ){
                 console.log('now we move the block');
                    viewsRow.animate({"left": "-=1750px"}, speed , function(){
                    viewsRow.removeClass('thisOn');
                   //     viewsRow.css('display','none');                       
                        });
                }else{
                    n_front.animate({"left": "-=1750px"}, speed , function(){ $(this).hide(); } ) ;    
                } 
            };
            
            // --------------------------------------------------- // 
            
            function moveblock(box){
                var boxS = box.toString();
              var theRightView =  $(".views-row span.field-content a:contains(" + boxS + ")");  
            
             if (theRightView.size() > 0 ){
                var theSelectedBox = theRightView.parents('.views-row');
                viewsRow.stop();
                theSelectedBox.stop();
                theSelectedBox.addClass('thisOn ' + box );
                theSelectedBox.css('position', 'absulote');
                theSelectedBox.css('left', '1500px');
                theSelectedBox.animate({"left": "0px"}, speed);
               
                var topMenuSelect = $('#block-block-4 li[data-position=' + boxS +']');               
                topMenuSelect.addClass('topmenu-slected ' + boxS );
                topMenuSelect.siblings().removeClass('topmenu-slected');
                             
                var smallMenuSelect = $('.n_small_menu li[data-position=' + boxS +']');
                // console.log(smallMenuSelect);
                smallMenuSelect.addClass(boxS + '_bg pointer' );
                smallMenuSelect.siblings().removeClass();               
             }    
            };
            
          // --------------------------------------------------- // 
            
            // **** click on the main page ***
            n_frontLi.click(function() {
             var box = $(this).data('position');        
                movemein();
                moveblock(box) ;
            });
            
             
            // **** click on the top menu ***
            topMenuLi.click(function(){             
              var box = $(this).data('position');
                var thisOn = $(viewsRow).hasClass('thisOn');
                movemein(thisOn);               
                setTimeout(function (){
                 moveblock(box);
               },501);               
            });
            
            n_small_menu.click(function(){             
                var box = $(this).data('position');
                var thisOn = $(viewsRow).hasClass('thisOn');
                movemein(thisOn);               
                setTimeout(function (){
                 moveblock(box);
               },501);               
            });
            
            // **** click  ***   
            viewsRow.click(function(){
             movemein();
             
           });   
        }    
    };
    
    Drupal.behaviors.inText = {
        attach: function(context, settings) {
            
            var t = 500;
            var inMenu = $('.field-name-field-in-menu');       
            var itemMenu = $('.field-name-field-in-text-fi');
            var firstMenu = $('.field-name-field-in-text-fi:first-child');
            //firstMenu.addClass('youGood');
          //  itemMenu.fadeOut();

          
            firstMenu.fadeIn();
            //console.log(inMenu);
            inMenu.click(function(){
                $(this).css('font-weight' , 'bold');
                $(this).siblings().css('font-weight' , 'normal');
            var corent = $(this).index();
                corent++;
             //   console.log(corent);
              
             itemMenu.fadeOut(t);               
             $('.field-name-field-in-text-fi:nth-child(' + corent + ')').delay(t).fadeIn(t);
            })
            
        }    
    };
    
     var imgS;
    
     Drupal.behaviors.drawing = {
        attach: function(context, settings) {
            var drawing = $("#n_drawing");
            var drawingLi = $("#n_drawing li");
            var mainImg = $(".views-row-4 .field-name-field-image-fi img");
        
            // ajax return
                var fistuki_drawing_files = function(data){
                imgS = data.slice(2);
                }
             
                $.ajax({
                type: 'POST',
                url: Drupal.settings.basePath + 'ajax/drawing',
                dataType: 'json',
                success: fistuki_drawing_files ,
                data: 'test'
              });
             
             
                var interval = 7000; 
                var i = 1 ;
                
                    setInterval(ChangeImages, interval); 
                   
                    // function that will change the images
                    function ChangeImages() {
                      var images = imgS; // Line 2
                 
                    i++;
                    if (i == images.length ) {
                        i = 0;
                    }
                
                    $(mainImg).fadeOut('slow', function () {
                        $(this).attr('src', Drupal.settings.basePath + 'sites/default/files/drawing/' + images[i]);                     
                    }).fadeIn('slow');
                    };             
                  
            drawingLi.hover(function(){
        
            var drawingLiselect = $(this).index();
           
            if (imgS.length  <= drawingLiselect ){
                drawingLiselect = 1 ;
                } ;         
           var img = imgS[drawingLiselect];
             mainImg.attr('src' , Drupal.settings.basePath + 'sites/default/files/drawing/' + img );
      
            });      
 
        }    
    };
    
        
    Drupal.behaviors.mainImgR = {
    attach: function(context, settings) {
            
        var t = 5000;
      //  var mainImgR  = $(".field-name-field-image-fi img");
        var mainImgHide = $(".field-name-field-image-fi");
        var mainImgHideFirst = $(".n_left > .field-name-field-image-fi:first-child");
        
       // console.log(mainImgHide);
         mainImgHideFirst.addClass('active');
      
        setInterval(ImagesReplace, t );
        //console.log(inMenu);
  
   
        function ImagesReplace( ) {
           //  console.log("test");
            var active = $(".field-name-field-image-fi.active" );
           //  console.log(active , "active ");

             if ( active.length == 0 ) {
                  active = $( mainImgHide + ':last');     
             }
             
             
            var nextImg =   active.next().length ? active.next()
                  : mainImgHideFirst;
                          
             active.addClass('last-active');
          //   console.log(active , "active ");
             
            nextImg.css({opacity: 0.0})
            .addClass('active')
            .animate({opacity: 1.0}, 1000, function() {
            active.removeClass('active last-active');
            });
        }
        
        }    
    };    

    Drupal.behaviors.video = {
    attach: function(context, settings) {
            
        var videoDescription =  $(".field-name-field-video-description" );
        var video = $(".field-name-field-video");
          $(".field-name-field-video:eq(0)").show();
        
        
        videoDescription.click(function(){
          
          var num = $(this).index();
          //alert(num);
          video.hide();
          $(".field-name-field-video:eq(" + num + ")").show();
        });
        
        
       
        // var videoFirts = $(".video:first-child");
        
        //videoFirts.show();
        
        console.log(video , "videoFirts");
        
        
        }    
    };
        
        
        //$(window).hashchange(function() {
        //       
        //        var hash = location.hash;
        //       
        //        // Set the page title based on the hash.
        //        document.title = 'The hash is ' + (hash.replace(/^#/, '') || 'blank') + '.';
        //        // Iterate over all nav links, setting the "selected" class as-appropriate.
        //       $('#n_front li').each(function() {
        //            var that = $(this);
        //           that[that.attr('href') === hash ? 'addClass' : 'removeClass']('selected');      
        //        });
        //    })
        //  
        //    // Since the event is only triggered when the hash changes, we need to trigger
        //    // the event now, to handle the hash the page may have loaded with.   
        //   $(window).hashchange();
            
 
            
            
    //        
    //Drupal.behaviors.urlHistory = {
    //    attach: function(context, settings) {
    //    
    //    }
    //};
    
   // (function(window,undefined){

    //// Prepare
    //var History = window.History; // Note: We are using a capital H instead of a lower h
    //if ( !History.enabled ) {
    //     // History.js is disabled for this browser.
    //     // This is because we can optionally choose to support HTML4 browsers or not.
    //    return false;
    //}
    //
    //// Bind to StateChange Event
    //History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
    //    var State = History.getState(); // Note: We are using History.getState() instead of event.state
    //    History.log(State.data, State.title, State.url);
    //});
    //
    //// Change our States
    //History.pushState({state:1}, "State 1", "?state=1"); // logs {state:1}, "State 1", "?state=1"
    //History.pushState({state:2}, "State 2", "?state=2"); // logs {state:2}, "State 2", "?state=2"
    //History.replaceState({state:3}, "State 3", "?state=3"); // logs {state:3}, "State 3", "?state=3"
    //History.pushState(null, null, "?state=4"); // logs {}, '', "?state=4"
    //History.back(); // logs {state:3}, "State 3", "?state=3"
    //History.back(); // logs {state:1}, "State 1", "?state=1"
    //History.back(); // logs {}, "Home Page", "?"
    //History.go(2); // logs {state:3}, "State 3", "?state=3"

//})(window);
    
    
    
    
    
})(jQuery);

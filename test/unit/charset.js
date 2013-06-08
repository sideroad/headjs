/**
 * Unittests: javascript loader
 */

// or 'localhost'

(function($){
    'use strict';
    module('Load');

    asyncTest('load-different-encoding', 10, function () {
        var first = [
                'charset-tests/1sjis.js#Shift_JIS',
                'charset-tests/2utf8.js#UTF-8'
            ],
            second = [
                'charset-tests/3sjis.js#Shift_JIS',
                'charset-tests/4utf8.js#UTF-8'
            ];
      
      
        head.js.apply( head, first );
  
        head.ready(function(){
           ok(true, 'head.ready');
           ok( sjis );
           equal( sjis.A, 'あ');
           ok( sjis.utf8 );
           equal( sjis.utf8.A, 'あ');
        });
            
      
        setTimeout(function(){
        
            head.js.apply( head, second );
    
            head.ready(function(){
                ok(true, 'head.ready');
                ok( sjis.utf8.sjis );
                equal( sjis.utf8.sjis.A, 'あ');
                ok( sjis.utf8.sjis.utf8 );
                equal( sjis.utf8.sjis.utf8.A, 'あ');
                start();
            });

        }, 300);
     
    });


})(jQuery);



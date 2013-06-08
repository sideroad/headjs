/**
 * Unittests: javascript loader
 */

// or 'localhost'

(function($){
    'use strict';
    module('Load');

    asyncTest('load-different-encoding', function () {
        var first = [
                'charset-tests/1sjis.js#Shift_JIS',
                'charset-tests/2utf8.js#UTF-8',
                function(){
                    ok( sjis );
                    equal( sjis.A, 'あ');
                    ok( sjis.utf8 );
                    equal( sjis.utf8.A, 'あ');
                }
            ],
            second = [
                'charset-tests/1sjis.js#Shift_JIS',
                'charset-tests/2utf8.js#UTF-8',
                function(){
                    ok( sjis );
                    equal( sjis.A, 'あ');
                    ok( sjis.utf8 );
                    equal( sjis.utf8.A, 'あ');
                    head.js.apply(head, third);
                }
            ],
            third = [
                'charset-tests/3sjis.js#Shift_JIS',
                'charset-tests/4utf8.js#UTF-8',
                function(){
                    ok( sjis.utf8.sjis );
                    equal( sjis.utf8.sjis.A, 'あ');
                    ok( sjis.utf8.sjis.utf8 );
                    equal( sjis.utf8.sjis.utf8.A, 'あ');
                    start();

                }
            ];
        expect(12);
        head.js.apply(head, first);
        head.js.apply(head, second);
    });

})(jQuery);



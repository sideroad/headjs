module('head.load.js');

// INFO: Never link to raw.github.com as they do not return proper application-x/javascript headers
// INFO: Do not link 2 same libraries twice, or it will already be in cache
var libs = {
  mootools  : "http://ajax.googleapis.com/ajax/libs/mootools/1.4.5/mootools-yui-compressed.js",    
  jquery    : "http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js",
  jshint    : "http://ajax.aspnetcdn.com/ajax/jshint/r07/jshint.js",
  knockout  : "http://ajax.aspnetcdn.com/ajax/knockout/knockout-2.1.0.js",
  spin      : "http://fgnass.github.com/spin.js/dist/spin.min.js",
  stapes    : "http://hay.github.io/stapes/stapes.min.js",
  notificon : "http://makeable.github.io/Notificon/notificon.js",
  sly       : "http://darsa.in/sly/js/sly.min.js",
  underscore: "http://underscorejs.org/underscore-min.js",
};

function getStyle(ele, styleProp) {
    var y = "";

    if (ele.currentStyle) {
        y = ele.currentStyle[styleProp];
    }
    else if (window.getComputedStyle) {
        y = document.defaultView.getComputedStyle(ele, null).getPropertyValue(styleProp);
    }
    
    return y;
}

asyncTest("head option in head_conf", function() {
    expect(1);

    head_conf = {head: 'headJS'};
    head.load( {head: "../../media/libs/headjs/0.99/head.min.js"}, function() {
        ok(!!headJS, "Callback: headJS");
        head_conf = null;

        start();
    });

});

asyncTest("jquery, mootools (trigger via callback)", function() {
    expect(2);
    
    head.load(
        libs.mootools,
        libs.jquery,
        
        function() {                        
            $j = jQuery.noConflict();
                        
            ok(!!$j("#qunit-header").addClass, "Callback: jQuery");
            ok(!!$$("#qunit-header").addClass, "Callback: Mootools");
            
            start();
        }
    );
});

asyncTest("jquery (trigger via filename)", function () {
    expect(1);
    
    head.ready("jquery.min.js", function() {        
        ok(!!jQuery, "Filename: ready('jquery.min.js')");
        
        start();
    })
    
    .load("http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js");    
});


asyncTest('jshint, jquery, knockout (trigger via label)', function (assert) {
    expect(6);
       
     head.load(
        { jshint  : libs.jshint },
        { jquery  : "http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js" },
        { knockout: libs.knockout },
        function() {
            start();
        }
    )  
    
    .ready("jshint", function () {   
        ok(!!JSHINT, "Label: ready('jshint')");
        assert.step(1, "step1 jshint");
    })
    
    .ready("jquery", function () {
        ok(!!jQuery, "Label: ready('jquery')");
        assert.step(2, "step2 jquery");
    })
    
    .ready("knockout", function () {
        ok(!!ko, "Label: ready('knockout')");
        assert.step(3, "step3 knockout");
    });


});

asyncTest('async option', function (assert) {
    expect(12);

    head.load(
        { spin: libs.spin,
            options: {
                async: true
            }
        },
        { stapes   : libs.stapes },
        { notificon: libs.notificon,
            options: {
                async: true
            }
        },        
        { jquery     : 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js'},
        { underscore : libs.underscore,
            options: {
                async: true
            }
        },
        { sly: libs.sly },

        function() {
            ok(!!Spinner,   "Callback: Spinner");
            ok(!!Stapes,    "Callback: Stapes");
            ok(!!Notificon, "Callback: Notificon");
            ok(!!jQuery,    "Callback: jQuery");
            ok(!!_,         "Callback: _");
            ok(!!Sly,       "Callback: Sly");

            start();
        }
    )

    .ready(['spin', 'underscore', 'jQuery'], function() {
        ok(!!Spinner, "Label: ready('spin')");
        ok(!!_      , "Label: ready('underscore')");
        ok(!!jQuery , "Label: ready('jQuery')");
    })

    .ready('stapes', function() {
        assert.step(1, "step1 stapes");
    })

    .ready('notificon', function() {
        assert.step(2, "step2 notificon");
    })

    .ready('sly', function() {
       assert.step(3, "step3 sly");
    });

});

asyncTest('callback option', function (assert) {
    expect(8);

    function callbackSpin() {
        assert.step(1, "step1 spin");
    }

    function callbackStapes() {
        assert.step(2, "step2 stapes");
    }

    function callbackUnderscore() {
        ok(!!_, "Label: ready('underscore')");
    }

    head.load(
        {
            spin   : 'http://fgnass.github.com/spin.js/dist/spin.min.js',
            options: {
                callback: callbackSpin
            }
        },
        {
            stapes     : 'http://hay.github.com/stapes/stapes.min.js',
            options: {
                callback: callbackStapes
            }
        },
        {
            underscore : 'http://underscorejs.org/underscore-min.js',
            options: {
                async: true,
                callback: callbackUnderscore
            }
        },
        {
            sly    : 'http://darsa.in/sly/js/sly.min.js',
            options: {
                callback: function() {
                    assert.step(3, "step3 sly");
                }
            }
        },

        function(){
            ok(!!Spinner,   "Callback: Spinner");
            ok(!!Stapes,    "Callback: Stapes");
            ok(!!_,         "Callback: _");
            ok(!!Sly,       "Callback: Sly");

            start();
        }
    );

});

// INFO: will make had fail (and nothing else continues!) if file not exists
asyncTest("css (load)", function () {
    expect(1);

    head.ready("test.css", function () {
        var result = getStyle(document.getElementById("browserscope"), "display");
        ok(result === "block", "Filename: ready('test.css')");

        start();
    })

    .load("assets/test.css");
});
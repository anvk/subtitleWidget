/*
Copyright 2012 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

/*global jQuery, window, fluid*/

// JSLint options 
/*jslint white: true, funcinvoke: true, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, browser: true, forin: true, maxerr: 100, indent: 4 */

(function ($) {

    fluid.defaults("fluid.resourceFetcher", {
        gradeNames: ["fluid.eventedComponent", "autoInit"],
        finalInitFunction: "fluid.resourceFetcher.finalInit",
        events: {
            onReady: null
        },
        resourceTemplate: null
    });
    
    fluid.resourceFetcher.finalInit = function (that) {
        
        fluid.fetchResources({
                template: {
                    href: that.resourceTemplate,
                    dataType: "html",
                    forceCache: true
                }
            },
            function() {
                alert("got data!");
                that.events.onReady.fire(that);
        });
    };

})(jQuery);
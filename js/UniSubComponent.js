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

    fluid.defaults("fluid.unisubComponent", {
        gradeNames: ["fluid.eventedComponent", "fluid.modelComponent", "autoInit"],
        finalInitFunction: "fluid.unisubComponent.finalInit",
        preInitFunction: "fluid.unisubComponent.preInit",
        model: {
            languages: []
        },
        events: {
            onReady: null,
            modelReady: null
        },
        unisubLanguageLink: "http://www.universalsubtitles.org/api/1.0/subtitles/languages/",
        videoLink: null
    });
    
    fluid.unisubComponent.preInit = function (that) {
        that.loadLanguages = function (options) {
            $.ajax({
                dataType: "jsonp",
                url: options.url,
                success: function (data) {
                    that.applier.requestChange("languages", data);
                    that.events.modelReady.fire();
                    that.events.onReady.fire(that);
                }
            });
        };
        
        that.createUniSubURL = function(apiURL, videoURL) {
            return "".concat(apiURL, "?video_url=", videoURL);
        };
    };
    
    fluid.unisubComponent.finalInit = function (that) {
        
        var options = that.options;
        var callbackName = options.callbackName;
        
        var URL = that.createUniSubURL(options.unisubLanguageLink, options.videoLink);
        
        that.loadLanguages({
            callback: callbackName,
            url: URL
        });
    };

})(jQuery);
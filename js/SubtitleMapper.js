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

    fluid.defaults("fluid.subtitleMapper", {
        gradeNames: ["fluid.eventedComponent", "fluid.modelComponent", "autoInit"],
        finalInitFunction: "fluid.subtitleMapper.finalInit",
        model: {
            languages: []
        },
        events: {
            onReady: null
        }
    });
    
    fluid.subtitleMapper.finalInit = function (that) {
        var togo = fluid.copy(that.model);
        
        fluid.each(togo, function (element, key) {
            
            langChanged.push({
                label: element.name,
                srclang: element.code
            });
        });
        
        var data = {
            languages: langChanged,
            currentTracks: {
                captions: [0]
            }
        };
        
        that.applier.requestChange("", data);
        that.events.onReady.fire(that);
    };

})(jQuery);
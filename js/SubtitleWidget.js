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

    fluid.defaults("fluid.subtitleWidget", {
        gradeNames: ["fluid.viewComponent", "autoInit"],
        finalInitFunction: "fluid.subtitleWidget.finalInit",
        events: {
            onReady: null
        },
        styles: {
            mainWrap: "fl-subtitle-mainWrap",
            videoWrap: "fl-subtitle-videoWrap",
            widgetWrap: "fl-subtitle-widgetWrap"
        },
        components: {
            widget: {
                type: "fluid.videoPlayer.controllers.languageMenu",
                container: "{subtitleWidget}.widgetWrap",
                createOnEvent: "onMarkupReady",
                options: {
                }
            }
        },
        events: {
            onMarkupReady: null
        },
        videoSelector: null,    // A class we will use to get the iframe with the video
        mainWrap: null,
        widgetWrap: null,
        videoWrap: null
    });
    
    fluid.subtitleWidget.finalInit = function (that) {
        
        var styles = that.options.styles;
        var videoIframe = $(that.options.videoSelector);
        
        // First create a markup for the video where we want to attach our widget
        that.mainWrap = $("<div />").addClass(styles.mainWrap);
        that.widgetWrap = $("<div />").addClass(styles.widgetWrap);
        that.videoWrap = $("<div/>").addClass(styles.videoWrap);
        
        that.mainWrap.append(that.widgetWrap);
        that.mainWrap.append(that.videoWrap);
                
        that.mainWrap.insertBefore(videoIframe);
                
        videoIframe.appendTo(that.videoWrap);
        
        that.events.onMarkupReady.fire();
        that.events.onReady.fire(that);
    };


})(jQuery);
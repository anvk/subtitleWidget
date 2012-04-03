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
        preInitFunction: "fluid.subtitleWidget.preInit",
        postInitFunction: "fluid.subtitleWidget.postInit",
        finalInitFunction: "fluid.subtitleWidget.finalInit",
        model: {
            languages: []
        },
        events: {
            onReady: null,
            onUnisub: null,
            onFetcher: null,
            createPanel: {
                events: {
                    unisub: "{fluid.subtitleWidget}.events.onUnisub",
                    fetcher: "{fluid.subtitleWidget}.events.onFetcher"
                }
            },
            modelReady: null
        },
        listeners: {
            createPanel: {
                listener: "{fluid.subtitleWidget}.createPanelHandler",
                priority: "last"
            }
        },
        styles: {
            mainWrap: "fl-subtitle-mainWrap",
            videoWrap: "fl-subtitle-videoWrap",
            widgetWrap: "fl-subtitle-widgetWrap"
        },
        videoLink: "http://www.youtube.com/v/yEAxG_D1HDw?hl=en_US&fs=1&rel=0&hd=1&border=0&enablejsapi=1",
        components: {
            unisub: {
                type: "fluid.unisubComponent",
                options: {
                    videoLink: "{subtitleWidget}.options.videoLink",
                    model: "{subtitleWidget}.model",
                    applier: "{subtitleWidget}.applier",
                    events: {
                        onReady: "{fluid.subtitleWidget}.events.onUnisub",
                        modelReady: "{fluid.subtitleWidget}.events.modelReady"
                    }
                }
            },
/*
            subtitleMapper: {
                type: "fluid.subtitleMapper",
                options: {
                    model: "{subtitleWidget}.model",
                },
                createOnEvent: "modelReady"
            },
*/
            resourceFetcher: {
                type: "fluid.resourceFetcher",
                options: {
                    resourceTemplate: "../html/SubtitlePanel_template.html",
                    containerBody: "{fluid.subtitleWidget}.options.widgetWrap",
                    events: {
                        onReady: "{fluid.subtitleWidget}.events.onFetcher"
                    }
                }
            },
            widget: {
                type: "fluid.subtitlePanel",
                createOnEvent: "createPanel",
                container: "{subtitleWidget}.options.widgetWrap",
                options: {
                    videoLink: "{subtitleWidget}.options.videoLink",
                    resources: "{resourceFetcher}.options.resources",
                    model: "{subtitleWidget}.model"
                }
            }
        },
        videoSelector: null,    // A class we will use to get the iframe with the video
        mainWrap: null,
        widgetWrap: null,
        videoWrap: null
    });

    fluid.subtitleWidget.preInit = function (that) {
        that.createPanelHandler = function () {
            that.events.onReady.fire(that);
        };
    };
    
    fluid.subtitleWidget.postInit = function (that) {
        var styles = that.options.styles;
        var videoIframe = $(that.options.videoSelector);
        
        // First create a markup for the video where we want to attach our widget
        var mainWrap = $("<div />").addClass(styles.mainWrap);
        var widgetWrap = $("<div />").addClass(styles.widgetWrap);
        var videoWrap = $("<div/>").addClass(styles.videoWrap);
        
        mainWrap.append(widgetWrap);
        mainWrap.append(videoWrap);
                
        mainWrap.insertBefore(videoIframe);
                
        videoIframe.appendTo(videoWrap);
        
        that.options.mainWrap = mainWrap;
        that.options.widgetWrap = widgetWrap;
        that.options.videoWrap = videoWrap;
    };
    
    fluid.subtitleWidget.finalInit = function (that) {
        var b = 6;
    };


})(jQuery);
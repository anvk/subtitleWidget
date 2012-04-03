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

    "use strict";

    fluid.defaults("fluid.subtitlePanel", {
        gradeNames: ["fluid.rendererComponent", "autoInit"],
        renderOnInit: true,
        preInitFunction: "fluid.subtitlePanel.preInit",
        finalInitFunction: "fluid.subtitlePanel.finalInit",
        model: {
            languages: []
        },
        baseURL: "",
        protoTree: {
            menu: {
                decorators: [{
                    type: "fluid",
                    func: "fluid.subtitlePanel.menu"
                }, {
                    addClass: "{styles}.menu"
                }]
            },
            expander: [{
                type: "fluid.renderer.repeat",
                repeatID: "language",
                controlledBy: "languages",
                pathAs: "lang",
                tree: {
                    languageLink: {
                        target: "${{lang}.href}",
                        linktext: "${{lang}.name}",
                        decorators: {
                            addClass: "{styles}.languageLink"
                        }
                    }
                }
            }, {
                type: "fluid.renderer.condition",
                condition: "${haveSubtitles}",
                trueTree: {
                    addSubtitle: {
                        target: "YO MAMA",
                        linktext: {
                            messagekey: "addSubtitle"
                        },
                        decorators: {
                            addClass: "{styles}.addSubtitle"
                        }
                    },
                    languages: {
                        decorators: [{
                            addClass: "{styles}.languages"
                        }, {
                            type: "jQuery",
                            func: "css",
                            args: ["display", "none"]
                        }]
                    }
                }
            }]
        },
        repeatingSelectors: ["language"],
        selectors: {
            menu: ".flc-subtitle-panel-menu",
            languages: ".flc-subtitle-panel-languages",
            language: ".flc-subtitle-panel-language",
            languageLink: ".flc-subtitle-panel-language-link",
            addSubtitle: ".flc-subtitle-panel-addSubtitle"
        },
        styles: {
            menu: "fl-subtitle-panel-menu",
            languages: "fl-subtitle-panel-languages",
            languageLink: "fl-subtitle-panel-language-link",
            addSubtitle: "fl-subtitle-panel-addSubtitle"
        },
        events: {
            onReady: null,
            onHover: null
        },
        listeners: {
            afterRender: "{fluid.subtitlePanel}.afterRenderHanlder"
        },
        strings: {
            label: "CURRENT SUBTITLES",
            addSubtitle: "add subtitle"
        }
    });

    fluid.subtitlePanel.preInit = function (that) {
/*         that.applier.requestChange("languages", []); */
        that.applier.requestChange("haveSubtitles", that.model.languages.length > 0);
        var languages = that.model.languages;
        fluid.each(languages, function (language, index) {
            var lang = fluid.copy(language);
            lang.href = "";
            that.applier.requestChange(fluid.model.composeSegments("languages", index), lang);
        });

        that.afterRenderHanlder = function () {
            that.container.hover(function () {
                that.locate("languages").show();
            }, function () {
                that.locate("languages").hide();
            });
        };
    };
    
    fluid.subtitlePanel.finalInit = function (that) {
        var menu = that.locate("menu"),
            languages = that.locate("languages");

        that.locate("language").fluid("tabbable");
        menu.fluid("tabbable");

        menu.focus(function () {
            languages.show();
        });
        var union = menu.add(languages);
        fluid.deadMansBlur(union, {
                exclusions: {union: union}, 
                    handler: function () {
                    languages.hide();
                }
        });

        that.events.onReady.fire(that);
    };

    fluid.defaults("fluid.subtitlePanel.menu", {
        gradeNames: ["fluid.rendererComponent", "autoInit"],
        selectors: {
            label: ".flc-subtitle-panel-menu-label",
            addSubtitle: ".flc-subtitle-panel-menu-addSubtitle",
            tooltip: ".flc-subtitle-panel-menu-tooltip"
        },
        styles: {
            label: "fl-subtitle-panel-menu-label",
            tooltip: "fl-subtitle-panel-menu-tooltip"
        },
        renderOnInit: true,
        protoTree: {
            expander: {
                type: "fluid.renderer.condition",
                condition: "${haveSubtitles}",
                trueTree: {
                    label: {
                        messagekey: "label",
                        decorators: {
                            addClass: "{styles}.label"
                        }
                    }
                },
                falseTree: {
                    addSubtitle: {
                        target: "YO MAMA",
                        linktext: {
                            messagekey: "addSubtitle"
                        },
                        decorators: {
                            addClass: "{styles}.addSubtitle"
                        }
                    }
                }
            },
            tooltip: {
                decorators: {
                    addClass: "{styles}.tooltip"
                }
            }
        }
    });

    fluid.demands("fluid.subtitlePanel.menu", "fluid.subtitlePanel", {
        options: {
            model: "{fluid.subtitlePanel}.model",
            strings: "{fluid.subtitlePanel}.options.strings",
            styles: "{fluid.subtitlePanel}.options.styles"
        }
    });

})(jQuery);
/** jquery.slimscroll.min.js **/
(function(n){jQuery.fn.extend({slimScroll:function(i){var r=n.extend({width:"auto",height:"250px",size:"7px",color:"#000",position:"right",distance:"1px",start:"top",opacity:.4,alwaysVisible:!1,disableFadeOut:!1,railVisible:!1,railColor:"#333",railOpacity:.2,railDraggable:!0,railClass:"slimScrollRail",barClass:"slimScrollBar",wrapperClass:"slimScrollDiv",allowPageScroll:!1,wheelStep:20,touchScrollStep:200,borderRadius:"7px",railBorderRadius:"7px"},i);return this.each(function(){function y(t){var t,i,f;l&&(t=t||window.event,i=0,t.wheelDelta&&(i=-t.wheelDelta/120),t.detail&&(i=t.detail/3),f=t.target||t.srcTarget||t.srcElement,n(f).closest("."+r.wrapperClass).is(u.parent())&&h(i,!0),t.preventDefault&&!o&&t.preventDefault(),o||(t.returnValue=!1))}function h(n,t,i){var s,l,h;o=!1;s=n;l=u.outerHeight()-f.outerHeight();t&&(s=parseInt(f.css("top"))+n*parseInt(r.wheelStep)/100*f.outerHeight(),s=Math.min(Math.max(s,0),l),s=n>0?Math.ceil(s):Math.floor(s),f.css({top:s+"px"}));e=parseInt(f.css("top"))/(u.outerHeight()-f.outerHeight());s=e*(u[0].scrollHeight-u.outerHeight());i&&(s=n,h=s/u[0].scrollHeight*u.outerHeight(),h=Math.min(Math.max(h,0),l),f.css({top:h+"px"}));u.scrollTop(s);u.trigger("slimscrolling",~~s);nt();c()}function et(){window.addEventListener?(this.addEventListener("DOMMouseScroll",y,!1),this.addEventListener("mousewheel",y,!1),this.addEventListener("MozMousePixelScroll",y,!1)):document.attachEvent("onmousewheel",y)}function g(){a=Math.max(u.outerHeight()/u[0].scrollHeight*u.outerHeight(),ft);f.css({height:a+"px"});var n=a==u.outerHeight()?"none":"block";f.css({display:n})}function nt(){if(g(),clearTimeout(tt),e==~~e){if(o=r.allowPageScroll,it!=e){var n=~~e==0?"top":"bottom";u.trigger("slimscroll",n)}}else o=!1;if(it=e,a>=u.outerHeight()){o=!0;return}f.stop(!0,!0).fadeIn("fast");r.railVisible&&s.stop(!0,!0).fadeIn("fast")}function c(){r.alwaysVisible||(tt=setTimeout(function(){r.disableFadeOut&&l||p||w||(f.fadeOut("slow"),s.fadeOut("slow"))},1e3))}var l,p,w,tt,b,a,e,it,k="<div><\/div>",ft=30,o=!1,u=n(this),v,d,rt;if(u.parent().hasClass(r.wrapperClass)){if(v=u.scrollTop(),f=u.parent().find("."+r.barClass),s=u.parent().find("."+r.railClass),g(),n.isPlainObject(i)){if("height"in i&&i.height=="auto"&&(u.parent().css("height","auto"),u.css("height","auto"),d=u.parent().parent().height(),u.parent().css("height",d),u.css("height",d)),"scrollTo"in i)v=parseInt(r.scrollTo);else if("scrollBy"in i)v+=parseInt(r.scrollBy);else if("destroy"in i){f.remove();s.remove();u.unwrap();return}h(v,!1,!0)}return}r.height=r.height=="auto"?u.parent().height():r.height;rt=n(k).addClass(r.wrapperClass).css({position:"relative",overflow:"hidden",width:r.width,height:r.height});u.css({overflow:"hidden",width:r.width,height:r.height});var s=n(k).addClass(r.railClass).css({width:r.size,height:"100%",position:"absolute",top:0,display:r.alwaysVisible&&r.railVisible?"block":"none","border-radius":r.railBorderRadius,background:r.railColor,opacity:r.railOpacity,zIndex:2000}),f=n(k).addClass(r.barClass).css({background:r.color,width:r.size,position:"absolute",top:0,opacity:r.opacity,display:r.alwaysVisible?"block":"none","border-radius":r.borderRadius,BorderRadius:r.borderRadius,MozBorderRadius:r.borderRadius,WebkitBorderRadius:r.borderRadius,zIndex:3000}),ut=r.position=="right"?{right:r.distance}:{left:r.distance};s.css(ut);f.css(ut);u.wrap(rt);u.parent().append(f);u.parent().append(s);r.railDraggable&&f.bind("mousedown",function(i){var r=n(document);return w=!0,t=parseFloat(f.css("top")),pageY=i.pageY,r.bind("mousemove.slimscroll",function(n){currTop=t+n.pageY-pageY;f.css("top",currTop);h(0,f.position().top,!1)}),r.bind("mouseup.slimscroll",function(){w=!1;c();r.unbind(".slimscroll")}),!1}).bind("selectstart.slimscroll",function(n){return n.stopPropagation(),n.preventDefault(),!1});s.hover(function(){nt()},function(){c()});f.hover(function(){p=!0},function(){p=!1});u.hover(function(){l=!0;nt();c()},function(){l=!1;c()});u.bind("touchstart",function(n){n.originalEvent.touches.length&&(b=n.originalEvent.touches[0].pageY)});u.bind("touchmove",function(n){if(o||n.originalEvent.preventDefault(),n.originalEvent.touches.length){var t=(b-n.originalEvent.touches[0].pageY)/r.touchScrollStep;h(t,!0);b=n.originalEvent.touches[0].pageY}});g();r.start==="bottom"?(f.css({top:u.outerHeight()-f.outerHeight()}),h(0,!0)):r.start!=="top"&&(h(n(r.start).position().top,null,!0),r.alwaysVisible||f.hide());et()}),this}});jQuery.fn.extend({slimscroll:jQuery.fn.slimScroll})})(jQuery);
/** end jquery.slimscroll.min.js **/

/**
 * bootbox.js [v4.2.0]
 * http://bootboxjs.com/license.txt
 */
(function (root, factory) {

    "use strict";
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(["jquery"], factory);
    } else if (typeof exports === "object") {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require("jquery"));
    } else {
        // Browser globals (root is window)
        root.bootbox = factory(root.jQuery);
    }

}(this, function init($, undefined) {

    "use strict";

    // the base DOM structure needed to create a modal
    var templates = {
        dialog:
        "<div class='bootbox modal' tabindex='-1' role='dialog'>" +
        "<div class='modal-dialog'>" +
        "<div class='modal-content'>" +
        "<div class='modal-body'><div class='bootbox-body'></div></div>" +
        "</div>" +
        "</div>" +
        "</div>",
        header:
        "<div class='modal-header'>" +
        "<h4 class='modal-title'></h4>" +
        "</div>",
        footer:
            "<div class='modal-footer'></div>",
        closeButton:
            "<button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true'>&times;</button>",
        form:
            "<form class='bootbox-form'></form>",
        inputs: {
            text:
                "<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />",
            textarea:
                "<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>",
            email:
                "<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />",
            select:
                "<select class='bootbox-input bootbox-input-select form-control'></select>",
            checkbox:
                "<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>",
            date:
                "<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />",
            time:
                "<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />",
            number:
                "<input class='bootbox-input bootbox-input-number form-control' autocomplete=off type='number' />",
            password:
                "<input class='bootbox-input bootbox-input-password form-control' autocomplete='off' type='password' />"
        }
    };

    var defaults = {
        // default language
        locale: "zh_CN",
        // show backdrop or not
        backdrop: true,
        // animate the modal in/out
        animate: true,
        // additional class string applied to the top level dialog
        className: null,
        // whether or not to include a close button
        closeButton: true,
        // show the dialog immediately by default
        show: true,
        // dialog container
        container: "body"
    };

    // our public object; augmented after our private API
    var exports = {};

    /**
     * @private
     */
    function _t(key) {
        var locale = locales[defaults.locale];
        return locale ? locale[key] : locales.en[key];
    }

    function processCallback(e, dialog, callback) {
        e.stopPropagation();
        e.preventDefault();

        // by default we assume a callback will get rid of the dialog,
        // although it is given the opportunity to override this

        // so, if the callback can be invoked and it *explicitly returns false*
        // then we'll set a flag to keep the dialog active...
        var preserveDialog = $.isFunction(callback) && callback(e) === false;

        // ... otherwise we'll bin it
        if (!preserveDialog) {
            dialog.modal("hide");
        }
    }

    function getKeyLength(obj) {
        // @TODO defer to Object.keys(x).length if available?
        var k, t = 0;
        for (k in obj) {
            t ++;
        }
        return t;
    }

    function each(collection, iterator) {
        var index = 0;
        $.each(collection, function(key, value) {
            iterator(key, value, index++);
        });
    }

    function sanitize(options) {
        var buttons;
        var total;

        if (typeof options !== "object") {
            throw new Error("Please supply an object of options");
        }

        if (!options.message) {
            throw new Error("Please specify a message");
        }

        // make sure any supplied options take precedence over defaults
        options = $.extend({}, defaults, options);

        if (!options.buttons) {
            options.buttons = {};
        }

        // we only support Bootstrap's "static" and false backdrop args
        // supporting true would mean you could dismiss the dialog without
        // explicitly interacting with it
        options.backdrop = options.backdrop ? "static" : false;

        buttons = options.buttons;

        total = getKeyLength(buttons);

        each(buttons, function(key, button, index) {

            if ($.isFunction(button)) {
                // short form, assume value is our callback. Since button
                // isn't an object it isn't a reference either so re-assign it
                button = buttons[key] = {
                    callback: button
                };
            }

            // before any further checks make sure by now button is the correct type
            if ($.type(button) !== "object") {
                throw new Error("button with key " + key + " must be an object");
            }

            if (!button.label) {
                // the lack of an explicit label means we'll assume the key is good enough
                button.label = key;
            }

            if (!button.className) {
                if (total <= 2 && index === total-1) {
                    // always add a primary to the main option in a two-button dialog
                    button.className = "btn-primary";
                } else {
                    button.className = "btn-default";
                }
            }
        });

        return options;
    }

    /**
     * map a flexible set of arguments into a single returned object
     * if args.length is already one just return it, otherwise
     * use the properties argument to map the unnamed args to
     * object properties
     * so in the latter case:
     * mapArguments(["foo", $.noop], ["message", "callback"])
     * -> { message: "foo", callback: $.noop }
     */
    function mapArguments(args, properties) {
        var argn = args.length;
        var options = {};

        if (argn < 1 || argn > 2) {
            throw new Error("Invalid argument length");
        }

        if (argn === 2 || typeof args[0] === "string") {
            options[properties[0]] = args[0];
            options[properties[1]] = args[1];
        } else {
            options = args[0];
        }

        return options;
    }

    /**
     * merge a set of default dialog options with user supplied arguments
     */
    function mergeArguments(defaults, args, properties) {
        return $.extend(
            // deep merge
            true,
            // ensure the target is an empty, unreferenced object
            {},
            // the base options object for this type of dialog (often just buttons)
            defaults,
            // args could be an object or array; if it's an array properties will
            // map it to a proper options object
            mapArguments(
                args,
                properties
            )
        );
    }

    /**
     * this entry-level method makes heavy use of composition to take a simple
     * range of inputs and return valid options suitable for passing to bootbox.dialog
     */
    function mergeDialogOptions(className, labels, properties, args) {
        //  build up a base set of dialog properties
        var baseOptions = {
            className: "bootbox-" + className,
            buttons: createLabels.apply(null, labels)
        };

        // ensure the buttons properties generated, *after* merging
        // with user args are still valid against the supplied labels
        return validateButtons(
            // merge the generated base properties with user supplied arguments
            mergeArguments(
                baseOptions,
                args,
                // if args.length > 1, properties specify how each arg maps to an object key
                properties
            ),
            labels
        );
    }

    /**
     * from a given list of arguments return a suitable object of button labels
     * all this does is normalise the given labels and translate them where possible
     * e.g. "ok", "confirm" -> { ok: "OK, cancel: "Annuleren" }
     */
    function createLabels() {
        var buttons = {};

        for (var i = 0, j = arguments.length; i < j; i++) {
            var argument = arguments[i];
            var key = argument.toLowerCase();
            var value = argument.toUpperCase();

            buttons[key] = {
                label: _t(value)
            };
        }

        return buttons;
    }

    function validateButtons(options, buttons) {
        var allowedButtons = {};
        each(buttons, function(key, value) {
            allowedButtons[value] = true;
        });

        each(options.buttons, function(key) {
            if (allowedButtons[key] === undefined) {
                throw new Error("button key " + key + " is not allowed (options are " + buttons.join("\n") + ")");
            }
        });

        return options;
    }

    exports.alert = function() {
        var options;

        options = mergeDialogOptions("alert", ["ok"], ["message", "callback"], arguments);

        if (options.callback && !$.isFunction(options.callback)) {
            throw new Error("alert requires callback property to be a function when provided");
        }

        /**
         * overrides
         */
        options.buttons.ok.callback = options.onEscape = function() {
            if ($.isFunction(options.callback)) {
                return options.callback();
            }
            return true;
        };

        return exports.dialog(options);
    };

    exports.confirm = function() {
        var options;

        options = mergeDialogOptions("confirm", ["cancel", "confirm"], ["message", "callback"], arguments);

        /**
         * overrides; undo anything the user tried to set they shouldn't have
         */
        options.buttons.cancel.callback = options.onEscape = function() {
            return options.callback(false);
        };

        options.buttons.confirm.callback = function() {
            return options.callback(true);
        };

        // confirm specific validation
        if (!$.isFunction(options.callback)) {
            throw new Error("confirm requires a callback");
        }

        return exports.dialog(options);
    };

    exports.prompt = function() {
        var options;
        var defaults;
        var dialog;
        var form;
        var input;
        var shouldShow;
        var inputOptions;

        // we have to create our form first otherwise
        // its value is undefined when gearing up our options
        // @TODO this could be solved by allowing message to
        // be a function instead...
        form = $(templates.form);

        // prompt defaults are more complex than others in that
        // users can override more defaults
        // @TODO I don't like that prompt has to do a lot of heavy
        // lifting which mergeDialogOptions can *almost* support already
        // just because of 'value' and 'inputType' - can we refactor?
        defaults = {
            className: "bootbox-prompt",
            buttons: createLabels("cancel", "confirm"),
            value: "",
            inputType: "text"
        };

        options = validateButtons(
            mergeArguments(defaults, arguments, ["title", "callback"]),
            ["cancel", "confirm"]
        );

        // capture the user's show value; we always set this to false before
        // spawning the dialog to give us a chance to attach some handlers to
        // it, but we need to make sure we respect a preference not to show it
        shouldShow = (options.show === undefined) ? true : options.show;

        // check if the browser supports the option.inputType
        var html5inputs = ["date","time","number"];
        var i = document.createElement("input");
        i.setAttribute("type", options.inputType);
        if(html5inputs[options.inputType]){
            options.inputType = i.type;
        }

        /**
         * overrides; undo anything the user tried to set they shouldn't have
         */
        options.message = form;

        options.buttons.cancel.callback = options.onEscape = function() {
            return options.callback(null);
        };

        options.buttons.confirm.callback = function() {
            var value;

            switch (options.inputType) {
                case "text":
                case "textarea":
                case "email":
                case "select":
                case "date":
                case "time":
                case "number":
                case "password":
                    value = input.val();
                    break;

                case "checkbox":
                    var checkedItems = input.find("input:checked");

                    // we assume that checkboxes are always multiple,
                    // hence we default to an empty array
                    value = [];

                    each(checkedItems, function(_, item) {
                        value.push($(item).val());
                    });
                    break;
            }

            return options.callback(value);
        };

        options.show = false;

        // prompt specific validation
        if (!options.title) {
            throw new Error("prompt requires a title");
        }

        if (!$.isFunction(options.callback)) {
            throw new Error("prompt requires a callback");
        }

        if (!templates.inputs[options.inputType]) {
            throw new Error("invalid prompt type");
        }

        // create the input based on the supplied type
        input = $(templates.inputs[options.inputType]);

        switch (options.inputType) {
            case "text":
            case "textarea":
            case "email":
            case "date":
            case "time":
            case "number":
            case "password":
                input.val(options.value);
                break;

            case "select":
                var groups = {};
                inputOptions = options.inputOptions || [];

                if (!inputOptions.length) {
                    throw new Error("prompt with select requires options");
                }

                each(inputOptions, function(_, option) {

                    // assume the element to attach to is the input...
                    var elem = input;

                    if (option.value === undefined || option.text === undefined) {
                        throw new Error("given options in wrong format");
                    }


                    // ... but override that element if this option sits in a group

                    if (option.group) {
                        // initialise group if necessary
                        if (!groups[option.group]) {
                            groups[option.group] = $("<optgroup/>").attr("label", option.group);
                        }

                        elem = groups[option.group];
                    }

                    elem.append("<option value='" + option.value + "'>" + option.text + "</option>");
                });

                each(groups, function(_, group) {
                    input.append(group);
                });

                // safe to set a select's value as per a normal input
                input.val(options.value);
                break;

            case "checkbox":
                var values   = $.isArray(options.value) ? options.value : [options.value];
                inputOptions = options.inputOptions || [];

                if (!inputOptions.length) {
                    throw new Error("prompt with checkbox requires options");
                }

                if (!inputOptions[0].value || !inputOptions[0].text) {
                    throw new Error("given options in wrong format");
                }

                // checkboxes have to nest within a containing element, so
                // they break the rules a bit and we end up re-assigning
                // our 'input' element to this container instead
                input = $("<div/>");

                each(inputOptions, function(_, option) {
                    var checkbox = $(templates.inputs[options.inputType]);

                    checkbox.find("input").attr("value", option.value);
                    checkbox.find("label").append(option.text);

                    // we've ensured values is an array so we can always iterate over it
                    each(values, function(_, value) {
                        if (value === option.value) {
                            checkbox.find("input").prop("checked", true);
                        }
                    });

                    input.append(checkbox);
                });
                break;
        }

        if (options.placeholder) {
            input.attr("placeholder", options.placeholder);
        }

        if(options.pattern){
            input.attr("pattern", options.pattern);
        }

        // now place it in our form
        form.append(input);

        form.on("submit", function(e) {
            e.preventDefault();
            // @TODO can we actually click *the* button object instead?
            // e.g. buttons.confirm.click() or similar
            dialog.find(".btn-primary").click();
        });

        dialog = exports.dialog(options);

        // clear the existing handler focusing the submit button...
        dialog.off("shown.bs.modal");

        // ...and replace it with one focusing our input, if possible
        dialog.on("shown.bs.modal", function() {
            input.focus();
        });

        if (shouldShow === true) {
            dialog.modal("show");
        }

        return dialog;
    };

    exports.dialog = function(options) {
        options = sanitize(options);

        var dialog = $(templates.dialog);
        var body = dialog.find(".modal-body");
        var buttons = options.buttons;
        var buttonStr = "";
        var callbacks = {
            onEscape: options.onEscape
        };

        each(buttons, function(key, button) {

            // @TODO I don't like this string appending to itself; bit dirty. Needs reworking
            // can we just build up button elements instead? slower but neater. Then button
            // can just become a template too
            buttonStr += "<button data-bb-handler='" + key + "' type='button' class='btn " + button.className + "'>" + button.label + "</button>";
            callbacks[key] = button.callback;
        });

        body.find(".bootbox-body").html(options.message);

        if (options.animate === true) {
            dialog.addClass("fade");
        }

        if (options.className) {
            dialog.addClass(options.className);
        }

        if (options.title) {
            body.before(templates.header);
        }

        if (options.closeButton) {
            var closeButton = $(templates.closeButton);

            if (options.title) {
                dialog.find(".modal-header").prepend(closeButton);
            } else {
                closeButton.css("margin-top", "-10px").prependTo(body);
            }
        }

        if (options.title) {
            dialog.find(".modal-title").html(options.title);
        }

        if (buttonStr.length) {
            body.after(templates.footer);
            dialog.find(".modal-footer").html(buttonStr);
        }


        /**
         * Bootstrap event listeners; used handle extra
         * setup & teardown required after the underlying
         * modal has performed certain actions
         */

        dialog.on("hidden.bs.modal", function(e) {
            // ensure we don't accidentally intercept hidden events triggered
            // by children of the current dialog. We shouldn't anymore now BS
            // namespaces its events; but still worth doing
            if (e.target === this) {
                dialog.remove();
            }
        });

        /*
         dialog.on("show.bs.modal", function() {
         // sadly this doesn't work; show is called *just* before
         // the backdrop is added so we'd need a setTimeout hack or
         // otherwise... leaving in as would be nice
         if (options.backdrop) {
         dialog.next(".modal-backdrop").addClass("bootbox-backdrop");
         }
         });
         */

        dialog.on("shown.bs.modal", function() {
            dialog.find(".btn-primary:first").focus();
        });

        /**
         * Bootbox event listeners; experimental and may not last
         * just an attempt to decouple some behaviours from their
         * respective triggers
         */

        dialog.on("escape.close.bb", function(e) {
            if (callbacks.onEscape) {
                processCallback(e, dialog, callbacks.onEscape);
            }
        });

        /**
         * Standard jQuery event listeners; used to handle user
         * interaction with our dialog
         */

        dialog.on("click", ".modal-footer button", function(e) {
            var callbackKey = $(this).data("bb-handler");

            processCallback(e, dialog, callbacks[callbackKey]);

        });

        dialog.on("click", ".bootbox-close-button", function(e) {
            // onEscape might be falsy but that's fine; the fact is
            // if the user has managed to click the close button we
            // have to close the dialog, callback or not
            processCallback(e, dialog, callbacks.onEscape);
        });

        dialog.on("keyup", function(e) {
            if (e.which === 27) {
                dialog.trigger("escape.close.bb");
            }
        });
        $(options.container).append(dialog);

        dialog.modal({
            backdrop: options.backdrop,
            keyboard: false,
            show: false
        });

        if (options.show) {
            dialog.modal("show");
        }
        return dialog;
    };

    exports.setDefaults = function() {
        var values = {};

        if (arguments.length === 2) {
            // allow passing of single key/value...
            values[arguments[0]] = arguments[1];
        } else {
            // ... and as an object too
            values = arguments[0];
        }

        $.extend(defaults, values);
    };

    exports.hideAll = function() {
        $(".bootbox").modal("hide");
    };


    /**
     * standard locales. Please add more according to ISO 639-1 standard. Multiple language variants are
     * unlikely to be required. If this gets too large it can be split out into separate JS files.
     */
    var locales = {
        br : {
            OK      : "OK",
            CANCEL  : "Cancelar",
            CONFIRM : "Sim"
        },
        da : {
            OK      : "OK",
            CANCEL  : "Annuller",
            CONFIRM : "Accepter"
        },
        de : {
            OK      : "OK",
            CANCEL  : "Abbrechen",
            CONFIRM : "Akzeptieren"
        },
        en : {
            OK      : "OK",
            CANCEL  : "Cancel",
            CONFIRM : "OK"
        },
        es : {
            OK      : "OK",
            CANCEL  : "Cancelar",
            CONFIRM : "Aceptar"
        },
        fi : {
            OK      : "OK",
            CANCEL  : "Peruuta",
            CONFIRM : "OK"
        },
        fr : {
            OK      : "OK",
            CANCEL  : "Annuler",
            CONFIRM : "D'accord"
        },
        he : {
            OK      : "אישור",
            CANCEL  : "ביטול",
            CONFIRM : "אישור"
        },
        it : {
            OK      : "OK",
            CANCEL  : "Annulla",
            CONFIRM : "Conferma"
        },
        lt : {
            OK      : "Gerai",
            CANCEL  : "Atšaukti",
            CONFIRM : "Patvirtinti"
        },
        lv : {
            OK      : "Labi",
            CANCEL  : "Atcelt",
            CONFIRM : "Apstiprināt"
        },
        nl : {
            OK      : "OK",
            CANCEL  : "Annuleren",
            CONFIRM : "Accepteren"
        },
        no : {
            OK      : "OK",
            CANCEL  : "Avbryt",
            CONFIRM : "OK"
        },
        pl : {
            OK      : "OK",
            CANCEL  : "Anuluj",
            CONFIRM : "Potwierdź"
        },
        ru : {
            OK      : "OK",
            CANCEL  : "Отмена",
            CONFIRM : "Применить"
        },
        sv : {
            OK      : "OK",
            CANCEL  : "Avbryt",
            CONFIRM : "OK"
        },
        tr : {
            OK      : "Tamam",
            CANCEL  : "İptal",
            CONFIRM : "Onayla"
        },
        zh_CN : {
            OK      : "确定",
            CANCEL  : "取消",
            CONFIRM : "确认"
        },
        zh_TW : {
            OK      : "OK",
            CANCEL  : "取消",
            CONFIRM : "確認"
        }
    };

    exports.init = function(_$) {
        return init(_$ || $);
    };

    return exports;
}));
/** end bootbox.js **/

/**
 * Toastr
 * Version 2.0.1
 * Copyright 2012 John Papa and Hans Fjällemark.
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * Author: John Papa and Hans Fjällemark
 * Project: https://github.com/CodeSeven/toastr
 */
; (function (define) {
    define(['jquery'], function ($) {
        return (function () {
            var version = '2.0.1';
            var $container;
            var listener;
            var toastId = 0;
            var toastType = {
                error: 'error',
                info: 'info',
                success: 'success',
                warning: 'warning',
                custom: 'custom'
            };

            var toastr = {
                clear: clear,
                error: error,
                getContainer: getContainer,
                info: info,
                options: {},
                subscribe: subscribe,
                success: success,
                version: version,
                warning: warning,
                custom: custom
            };

            return toastr;

            //#region Accessible Methods
            function custom(message, title, optionsOverride) {
                return notify({
                    type: toastType.custom,
                    iconClass: getOptions().iconClass,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function error(message, title, optionsOverride) {
                return notify({
                    type: toastType.error,
                    iconClass: getOptions().iconClasses.error,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function info(message, title, optionsOverride) {
                return notify({
                    type: toastType.info,
                    iconClass: getOptions().iconClasses.info,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function subscribe(callback) {
                listener = callback;
            }

            function success(message, title, optionsOverride) {
                return notify({
                    type: toastType.success,
                    iconClass: getOptions().iconClasses.success,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function warning(message, title, optionsOverride) {
                return notify({
                    type: toastType.warning,
                    iconClass: getOptions().iconClasses.warning,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function clear($toastElement) {
                var options = getOptions();
                if (!$container) { getContainer(options); }
                if ($toastElement && $(':focus', $toastElement).length === 0) {
                    $toastElement[options.hideMethod]({
                        duration: options.hideDuration,
                        easing: options.hideEasing,
                        complete: function () { removeToast($toastElement); }
                    });
                    return;
                }
                if ($container.children().length) {
                    $container[options.hideMethod]({
                        duration: options.hideDuration,
                        easing: options.hideEasing,
                        complete: function () { $container.remove(); }
                    });
                }
            }
            //#endregion

            //#region Internal Methods

            function getDefaults() {
                return {
                    tapToDismiss: true,
                    toastClass: 'toast',
                    containerId: 'toast-container',
                    debug: false,

                    showMethod: 'fadeIn', //fadeIn, slideDown, and show are built into jQuery
                    showDuration: 300,
                    showEasing: 'swing', //swing and linear are built into jQuery
                    onShown: undefined,
                    hideMethod: 'fadeOut',
                    hideDuration: 1000,
                    hideEasing: 'swing',
                    onHidden: undefined,

                    extendedTimeOut: 1000,
                    iconClasses: {
                        error: 'fa-bolt toast-danger',
                        info: 'fa-comment toast-info',
                        success: 'fa-check toast-success',
                        warning: 'fa-exclamation toast-warning',
                        custom: 'toast-custom'
                    },
                    iconClass: 'toast-info',
                    positionClass: 'toast-bottom-right',
                    timeOut: 3000, // Set timeOut and extendedTimeout to 0 to make it sticky
                    titleClass: 'toast-title',
                    messageClass: 'toast-message',
                    target: 'body',
                    closeButton: true,
                    closeHtml: '<button>&times;</button>',
                    newestOnTop: true
                };
            }

            function publish(args) {
                if (!listener) {
                    return;
                }
                listener(args);
            }

            function notify(map) {
                var
                    options = getOptions(),
                    iconClass = map.iconClass || options.iconClass;

                if (typeof (map.optionsOverride) !== 'undefined') {
                    options = $.extend(options, map.optionsOverride);
                    iconClass = map.optionsOverride.iconClass || iconClass;
                }

                toastId++;

                $container = getContainer(options);
                var
                    intervalId = null,
                    $toastElement = $('<div/>'),
                    $titleElement = $('<div/>'),
                    $messageElement = $('<div/>'),
                    $closeElement = $(options.closeHtml),
                    response = {
                        toastId: toastId,
                        state: 'visible',
                        startTime: new Date(),
                        options: options,
                        map: map
                    };

                if (map.iconClass) {
                    $toastElement.addClass(options.toastClass).addClass(iconClass);
                }

                if (map.title) {
                    $titleElement.append(map.title).addClass(options.titleClass);
                    $toastElement.append($titleElement);
                }

                if (map.message) {
                    $messageElement.append(map.message).addClass(options.messageClass);
                    $toastElement.append($messageElement);
                }

                if (options.closeButton) {
                    $closeElement.addClass('toast-close-button');
                    $toastElement.prepend($closeElement);
                }

                if (options.positionClass) {
                    if ($container.attr("class") != options.positionClass) {
                        $container.html("");
                        $container.removeAttr('class');
                        $container.addClass(options.positionClass);
                    }
                }

                $toastElement.hide();
                if (options.newestOnTop) {
                    $container.prepend($toastElement);
                } else {
                    $container.append($toastElement);
                }


                $toastElement[options.showMethod](
                    { duration: options.showDuration, easing: options.showEasing, complete: options.onShown }
                );
                if (options.timeOut > 0) {
                    intervalId = setTimeout(hideToast, options.timeOut);
                }

                $toastElement.hover(stickAround, delayedhideToast);
                if (!options.onclick && options.tapToDismiss) {
                    $toastElement.click(hideToast);
                }
                if (options.closeButton && $closeElement) {
                    $closeElement.click(function (event) {
                        if (event.stopPropagation) {
                            event.stopPropagation();
                        } else if (event.cancelBubble !== undefined && event.cancelBubble !== true) {
                            event.cancelBubble = true;
                        }
                        hideToast(true);
                    });
                }

                if (options.onclick) {
                    $toastElement.click(function () {
                        options.onclick();
                        hideToast();
                    });
                }

                publish(response);
                if (isIE8orlower() == 0) {
                    var audioElement = document.getElementById('audio-alert');
                    if(!audioElement){
                        audioElement = document.createElement("audio");
                        audioElement.id = 'audio-alert';
                        audioElement.setAttribute("src", basePath + "/static/sound/alert.mp3");
                        audioElement.addEventListener("load", function () {
                            audioElement.play()
                        }, true);
                        audioElement.pause();
                        audioElement.play();
                    }else{
                        audioElement.play();
                    }
                    /*
                    var audioElement = document.createElement("audio");
                    audioElement.setAttribute("src", basePath + "public/sound/alert.mp3");
                    audioElement.addEventListener("load", function () {
                        audioElement.play()
                    }, true);
                    audioElement.pause();
                    audioElement.play();
                    */
                }

                if (options.debug && console) {
                    console.log(response);
                }

                return $toastElement;

                function hideToast(override) {
                    if ($(':focus', $toastElement).length && !override) {
                        return;
                    }
                    return $toastElement[options.hideMethod]({
                        duration: options.hideDuration,
                        easing: options.hideEasing,
                        complete: function () {
                            removeToast($toastElement);
                            if (options.onHidden) {
                                options.onHidden();
                            }
                            response.state = 'hidden';
                            response.endTime = new Date(),
                                publish(response);
                        }
                    });
                }

                function delayedhideToast() {
                    if (options.timeOut > 0 || options.extendedTimeOut > 0) {
                        intervalId = setTimeout(hideToast, options.extendedTimeOut);
                    }
                }

                function stickAround() {
                    clearTimeout(intervalId);
                    $toastElement.stop(true, true)[options.showMethod](
                        { duration: options.showDuration, easing: options.showEasing }
                    );
                }
            }
            function getContainer(options) {
                if (!options) { options = getOptions(); }
                $container = $('#' + options.containerId);
                if ($container.length) {
                    return $container;
                }
                $container = $('<div/>')
                    .attr('id', options.containerId)
                    .addClass(options.positionClass);
                $container.appendTo($(options.target));
                return $container;
            }

            function getOptions() {
                return $.extend({}, getDefaults(), toastr.options);
            }

            function removeToast($toastElement) {
                if (!$container) { $container = getContainer(); }
                if ($toastElement.is(':visible')) {
                    return;
                }
                $toastElement.remove();
                $toastElement = null;
                if ($container.children().length === 0) {
                    $container.remove();
                }
            }
            //#endregion

        })();
    });
}(typeof define === 'function' && define.amd ? define : function (deps, factory) {
    if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('jquery'));
    } else {
        window['toastr'] = factory(window['jQuery']);
    }
}));

function getInternetExplorerVersion() {
    var rv = -1;
    if (navigator.appName == "Microsoft Internet Explorer") {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
        if (re.exec(ua) != null) {
            rv = parseFloat(RegExp.$1)
        }
    }
    return rv
}
/*
function checkVersion() {
    var msg = "You're not using Windows Internet Explorer.";
    var ver = getInternetExplorerVersion();
    if (ver > -1) {
        if (ver >= 8) {
            msg = "You're using a recent copy of Windows Internet Explorer."
        } else {
            msg = "You should upgrade your copy of Windows Internet Explorer."
        }
    }
    alert(msg)
}
*/
function isIE8orlower() {
    var msg = "0";
    var ver = getInternetExplorerVersion();
    if (ver > -1) {
        if (ver >= 9) {
            msg = 0
        } else {
            msg = 1
        }
    }
    return msg
};
/** end toastr.js **/

function InitiateSideMenu() {
	var n = $("#sidebar").hasClass("menu-compact");	
    $(".sidebar-menu").slimscroll({
        height: "auto",
        position: "left",
        size: "3px",
        color: "#000"
    });
    
    $(".sidebar-menu").slimScroll({destroy: !0});
    $(".sidebar-menu").attr("style", "");
    
    $("#sidebar-collapse").on("click", function () {   	
        if ($("#sidebar").is(":visible") || $("#sidebar").toggleClass("hide"), $("#sidebar").toggleClass("menu-compact"), n = $("#sidebar").hasClass("menu-compact"), $(".sidebar-menu").closest("div").hasClass("slimScrollDiv") && ($(".sidebar-menu").slimScroll({destroy: !0}), $(".sidebar-menu").attr("style", "")), n) {    
        	$(".open > .submenu").removeClass("open");
        } else if ($(".page-sidebar").hasClass("sidebar-fixed")) {
        	alert(22);
        	$(".sidebar-menu").slimscroll({height: "auto", position: "left", size: "3px", color: "#000"});
        }  
    });   
    
    // $(".sidebar-menu").on("click", function (t) {
    //     var i = $(t.target).closest("a"), u, r, f;
    //     if (i && i.length != 0) {
    //         if (!i.hasClass("menu-dropdown"))return n && i.get(0).parentNode.parentNode == this && (u = i.find(".menu-text").get(0), t.target != u && !$.contains(u, t.target)) ? !1 : void 0;
    //         if (r = i.next().get(0), !$(r).is(":visible")) {
    //             if (f = $(r.parentNode).closest("ul"), n && f.hasClass("sidebar-menu"))return;
    //             f.find("> .open > .submenu").each(function () {
    //                 this == r || $(this.parentNode).hasClass("active") || $(this).slideUp(200).parent().removeClass("open")
    //             })
    //         }
    //         return n && $(r.parentNode.parentNode).hasClass("sidebar-menu") ? !1 : ($(r).slideToggle(200).parent().toggleClass("open"), !1)
    //     }
    // })
    
}

//$(window).resize(function(){
//    if($(".sidebar-menu").closest("div").hasClass("slimScrollDiv")){
//        $(".sidebar-menu").slimscroll({
//            height: $(window).height() - 75,
//            position: "left",
//            size: "3px",
//            color: "#000"
//        });
//    }
//});
//
//InitiateSideMenu();

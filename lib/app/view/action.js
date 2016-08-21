define(function () {

    return function (base, app) {
        var $ = app.core.$;
        var _ = app.core._;

        base._extendMethod('_setup', function() {
            if (this.options.autoAction) {
                // 代理默认的事件处理程序
                this.events || (this.events = {});
                $.extend(this.events, {
                    'click [data-action]': '_actionHandler',
                    'click [data-dlg-view]': '_dlgViewHandler',
                    'click [data-dlg-widget]': '_dlgWidgetHandler'
                });
            }
        });

        base._extend({
            options: {
                autoAction: false
            },
            methods: {
                _actionHandler: function (e, context) {
                    e.preventDefault();
                    //e.stopImmediatePropagation();

                    context || (context = this);
                    var $el = $(e.currentTarget);
                    if ($el.closest('script').length > 0) return;

                    var actionName = $el.data().action;
                    if (actionName.indexOf('Handler') < 0) {
                        actionName = actionName + 'Handler';
                    }

                    context[actionName] && context[actionName](e, app, _, $);
                },
                _getViewTriggerOptions: function (attr) {
                    var nameParts = attr.split('?');
                    var name = nameParts[0];
                    var options = {};
                    if (nameParts[1]) {
                        options = app.core.util.qsToJSON(nameParts[1]);
                    }
                    options._viewName = name;
                    return options;
                },
                _dlgViewHandler: function (e) {
                    var $el = $(e.currentTarget);
                    var options = this._getViewTriggerOptions($el.attr('data-dlg-view'));

                    var initializer = function (options) {
                        var ctor = app.view.ctor(options._viewName);
                        return new ctor(options);
                    };
                    this.viewWindow(options._viewName, initializer, options);
                },
                _dlgWidgetHandler: function (e) {
                    var $el = $(e.currentTarget);
                    var options = this._getViewTriggerOptions($el.attr('data-dlg-widget'));

                    this.widgetWindow(options._viewName, options);
                }
            }
        });
    };
});

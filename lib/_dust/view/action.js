define(function () {

    return function (base, app) {
        var $ = app.core.$;
        var _ = app.core._;

        base._extendMethod('_setup', function() {
            if (this.options.autoAction) {
                // 代理默认的事件处理程序
                this.events || (this.events = {});
                Object.assign(this.events, {
                    'click [data-action]': '_actionHandler'
                });
            }
        });

        base._extend({
            options: {
                autoAction: false
            },
            methods: {
                _actionHandler: function (e, context) {
                    var app = this.app();
                    var $ = app.core.$;
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
                }
            }
        });
    };
});

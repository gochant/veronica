define([
], function () {
    return function (app) {
        var $ = app.core.$;

        var changeMode = function (mode) {
            var qs = app.core.qs(mode);
            return qs;
        };

        var qs = changeMode(1);

        /**
         * ��ѯ�ַ�������
         * @type {veronica.QueryString}
         * @memberOf veronica.Application#
         */
        app.qs = qs;
    };
});

define([], function () {
    return function (app) {
        var extend = app.core._.extend;
        var logger = app.core.logger;
        var _ = app.core._;

        /**
         * ��ʾ�ı������ʻ���
         * @namespace
         * @memberOf veronica
         */
        app.i18n = app.provider.create();

        app.i18n.add('default', {
            /** �Ի������ */
            defaultDialogTitle: '�Ի���',
            /** �Ի���ر��ı� */
            windowCloseText: '�ر�',
            /** �������ı� */
            loadingText: '������...'
        });
    };
});

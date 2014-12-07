define([
    'artDialog'
], function (dialog) {
    return function (app) {
        app.ui || (app.ui = {});
        app.ui.dialog = dialog;
        app.ui.confirm = function (content, successCallback, cancelCallback) {
            app.ui.dialog({
                width: 250,
                quickClose: true,
                content: content || 'ȷ�Ͻ��иò�����',
                okValue: 'ȷ��',
                ok: function () {
                    successCallback && successCallback();
                },
                cancelValue: 'ȡ��',
                cancel: function () {
                    cancelCallback && cancelCallback();
                }
            }).showModal();
        };
    };
});

define([
], function () {
    return function (app) {

        var $ = app.core.$;
        app.request = {};

        app.request.get = function (url, data) {
            return $.get(url, data);
        };

        // ��ȡJSON
        app.request.getJSON = function (url, data) {
            return $.getJSON(url, data);
        };

        // ���븴�Ӷ������ GET ������Ҫ��̨����JSON�ַ����ķ����л���
        app.request.getComplex = function (url, data, options) {
            options || (options = {});

            return $.ajax($.extend({
                url: url,
                type: 'GET',
                contentType: "application/json",
                data: JSON.stringify(data)
            }, options));
        };

        // �ύ���Ӷ��󵽺�̨��ʹ ASP.NET MVC ���ܹ������������ݰ�
        app.request.postComplex = function (url, data) {
            return $.ajax($.extend({
                url: url,
                type: 'POST',
                contentType: "application/json",
                dataType: 'json',
                data: JSON.stringify(data)
            }, options));
        }

        app.request.post = function (url, data) {
            return $.post(url, data);
        }
    };
});

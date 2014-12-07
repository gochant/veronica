define([
    'form2js',
    'jquery-validation-unobtrusive',
    'jquery-inputmask',
    'jquery-form',
    'jquery-placeholder'
], function (form2js) {
    return function (app) {
        app.formUtil = app.formUtil || {};

        // �÷����ѷ���
        // Thx: http://stackoverflow.com/questions/1184624/convert-form-data-to-js-object-with-jquery
        app.formUtil.serializeObject = function ($form) {
            var o = {};
            var a = $form.serializeArray();
            $.each(a, function () {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };

        // ��ʱ����
        app.formUtil.init = function (options) {
            app.formUtil.enableInputMask(options.target);
            app.formUtil.enableValidate(options.target);
            app.formUtil.enablePlaceholder(options.target);
            app.formUtil.enableAjaxSubmit(options.target, options.submitCallback);
        }

        // ���� input mask
        app.formUtil.enableInputMask = function ($form) {
            $form.find('[data-inputmask]').inputmask();
        }

        // ���� validation
        app.formUtil.enableValidate = function ($form) {
            $.validator.unobtrusive.parse($form);
        }

        app.formUtil.enablePlaceholder = function ($form) {
            $form.find('[placeholder]').placeholder();
        }

        // ���ñ�ajax�ύ
        app.formUtil.enableAjaxSubmit = function ($form, callback) {
            $form.ajaxForm({
                beforeSubmit: function () {
                    return $form.valid();
                },
                success: callback
            });
        }

        // �����������л���JSON����
        app.formUtil.toJSON = function ($form) {
            var data = form2js($form.get(0));

            $.each($form.find('[data-form-list]'), function (i, item) {
                var $list = $(item);
                var field = $list.attr('data-form-list');
                var value = app.listUtil.toJSON($list);
                app.core.util.setter(data, field, value);
            });

            return data;
        }
    };
});

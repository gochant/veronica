define(function (require) {
    return function (mod) {
        // ��Ӳ���
        mod.addLayout({
            'normal': require('text!./normal-layout.html')
        });

        // ���ҳ��
        mod.addPage([{
            'user-list': {
                name: '�û��б�',
                layout: 'normal',
                widgets: [
                    'user-list@#hard@user-control'
                ]
            }
        }]);
    }
});

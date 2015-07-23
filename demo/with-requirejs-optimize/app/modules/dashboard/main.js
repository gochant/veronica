define(function (require) {
    return function (mod) {
        // ��Ӳ���
        mod.addLayout({
            'dashboard': require('text!./dashboard-layout.html')
        });

        // ���ҳ��
        mod.addPage([{
            'dashboard': {
                name: '�Ǳ���',
                layout: 'dashboard',
                widgets: [
                    'hello-veronica@#hard@dashboard',
                    'charts@#hard@dashboard',
                    'tiny_basic-haha@#hard@tiny_basic'
                ]
            }
        }]);
    }
});

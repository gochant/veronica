define([
    'chai', 'sinon', 'sinon-chai', 'veronica'
], function (chai, sinon, sinonChai, veronica) {

    chai.use(sinonChai);
    var _ = veronica._;
    var $ = veronica.$;

    describe('App - Widget', function(){
        var app;
        var target;

        beforeEach(function () {
            app = new veronica.createApp();
            target = new veronica.Widget.create(null, {
                app: app
            });
        });

        it('has props', function () {
            expect(target._id).to.not.be.undefined;
            expect(target._name).to.not.be.undefined;
        });

        it('has props', function () {
        });

    })

    describe('App - WidgetManager', function () {
        var app;
        var target;

        beforeEach(function () {
            app = new veronica.createApp();
            target = new veronica.WidgetManager({
                app: app
            });
        });

        it('has props', function () {
            expect(target._pool).to.eql({});
            expect(target._currBatchName).to.be.null;
            expect(target._currBatchConfigList).to.eql([]);
            expect(target._lastBatchConfigList).to.eql([]);
        });

        it('normalizeConfig', function () {
            var actual = target.normalizeConfig('xxx');
            expect(actual).to.eql({
                name: 'xxx',
                xtype: '',
                options: {
                    _name: 'xxx',
                    _hostNode: '.v-widget-root'
                }
            });

            var actual1 = target.normalizeConfig('xxx(j-j@c-c)=>#test');

            expect(actual1).to.eql({
                name: 'xxx',
                xtype: 'j-j@c-c',
                options: {
                    _name: 'xxx',
                    _hostNode: '#test'
                }
            });

            var actual2 = target.normalizeConfig({
                xtype: 'xx@yy',
                options: {
                    a: 1
                }
            });
            console.log(actual2);

            expect(actual2).to.eql({
                name: undefined,
                xtype: 'xx@yy',
                options: {
                    a: 1,
                    _name: undefined,
                    _hostNode: '.v-widget-root'
                }
            })
        });

        it('normalizeBatchConfig', function () {
            var actual = target.normalizeBatchConfig([{
                name: 'xx',
                xtype: 'yy'
            }], 'batch1');

            expect(actual).to.eql([{
                name: 'xx',
                xtype: 'yy',
                options: {
                    _name: 'xx',
                    _hostNode: '.v-widget-root',
                    _batchName: 'batch1'
                }
            }])
        });

        it('_isCurrBatch', function () {
            var stub = app.page.isCurrent = sinon.stub().returns(false);

            var actual = target._isCurrBatch('xx');
            expect(actual).to.be.false;

            var actual1 = target._isCurrBatch();
            expect(actual1).to.be.true;

        });

        it('start', function () {

        });

        it('clearDom', function () {

        });

        it('_updateCurrConfigList', function () {
            target._updateCurrConfigList(['xxx']);
            expect(target._currBatchConfigList).to.eql(['xxx']);

            target._updateCurrConfigList(['xxx2'], 'tt');
            expect(target._lastBatchConfigList).to.eql(['xxx']);
            expect(target._currBatchName).to.eql('tt');
            expect(target._currBatchConfigList).to.eql(['xxx2']);
        });

        it('_allowStart', function () {
            target._lastBatchConfigList = [{
                name: 'xx',
                xtype: 'yy',
                options: {
                    _hostNode: 'zz'
                }
            }];

            var actual1 = target._allowStart({
                name: 'z'
            });
            expect(actual1).to.be.true;

            var actual2 = target._allowStart({
                name: 'xx',
                xtype: 'yy'
            });
            expect(actual2).to.be.true;

            var actual3 = target._allowStart({
                name: 'xx',
                xtype: 'yy',
                options: {
                    _hostNode: 'zz'
                }
            });
            expect(actual3).to.be.false;

        });

        it('getByDom', function () {

        });

        it('findDom', function () {

        });

        it('stop', function () {

        });

        it('stopAll', function () {

        });

        it('stopByDom', function () {

        });

        it('recycle', function () {

        });
    })
});

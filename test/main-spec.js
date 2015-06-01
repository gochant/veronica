define(['chai', 'sinon', 'veronica'], function (chai, sinon, veronica) {

    var should = chai.should();

    function once(fn) {
        var returnValue, called = false;
        return function () {
            if (!called) {
                called = true;
                returnValue = fn.apply(this, arguments);
            }
            return returnValue;
        };
    }

    describe('hooks', function () {
        before(function () {
            // runs before all tests in this block
            console.log('before');
        })
        after(function () {
            // runs after all tests in this block
        })
        beforeEach(function () {
            // runs before each test in this block
        })
        afterEach(function () {
            // runs after each test in this block
        })
        // test cases
    })

    describe('sinon', function () {
        it("calls the original function", function () {
            var callback = sinon.spy();
            var proxy = once(callback);

            proxy();

            assert(callback.called);
        });
    });

    describe('Core', function () {

        var core = veronica;

        describe('Util', function () {
            describe('#decamelize', function () {
                it('should work normal string', function () {
                    var r = core.util.decamelize('test');
                    r.should.equal('test');
                });
                it('should work with symbol string', function () {
                    var r = core.util.decamelize('test-_+=!@#$%^&*()');
                    r.should.equal('test-_+=!@#$%^&*()');
                });
                it('should work with uppercase string', function () {
                    var r = core.util.decamelize('testA');
                    r.should.equal('test_a');
                });
            });
            describe('#extend', function () {
                it('different property', function () {
                    var obj = { a: '1', b: '2' };
                    var ext = { c: '3' };
                    var r = core.util.extend(obj, ext);
                    r.should.have.property('c').with.equal('3');
                });
                it('same property', function () {
                    var obj = { a: '1', b: '2' };
                    var ext = { b: '3' };
                    var r = core.util.extend(obj, ext);
                    r.should.have.property('b').with.equal('3');
                });
            });
            describe('#include', function () {
                it('extend constructor', function () {
                    var A = function () {
                    };
                    var r = core.util.include(A, {
                        say: function () {
                        }
                    });
                    r.should.have.property('say').with.be.a('function');
                });
                it('same property', function () {
                    var obj = { a: '1', b: '2' };
                    var ext = { b: '3' };
                    var r = core.util.extend(obj, ext);
                    r.should.have.property('b').with.equal('3');
                });
            });
        });

        describe('Loader', function () {
            describe('#useGlobalRequire', function () {
                it('ok', function () {
                    core.loader.useGlobalRequire.should.to.not.throw();
                })
            });
            describe('#useGlobalRequirejs', function () {
                it('ok', function () {
                    core.loader.useGlobalRequirejs();
                })
            });
            describe('#require', function () {
                core.loader.require();
            });
        });

    });
});
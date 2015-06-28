'use strict';

import Locator from 'src/locator';

describe('Locator', function () {
  describe('instance behavior', function () {
    beforeEach(function () {
      this.config = {config: true};
      this.locator = new Locator({config: this.config});
      this.Module = function () {};
    });

    describe('locate', function () {
      it('returns undefined if the module is not registered', function () {
        const instance = this.locator.locate(this.Module);
        expect(instance).not.to.be.defined;
      });

      it('returns the module that has been registered by type', function () {
        const instance = new this.Module();
        this.locator.set(this.Module, instance);
        const foundInstance = this.locator.locate(this.Module);
        expect(foundInstance).to.equal(instance);
      });

      it('returns the module that has been registered by string', function () {
        const instance = {};
        this.locator.set('instance', instance);
        const foundInstance = this.locator.locate('instance');
        expect(foundInstance).to.equal(instance);
      });
    });

    describe('get', function () {
      describe('if the module is not registered', function () {
        it('returns a new instance when a constructor is provided', function () {
          const instance = this.locator.get(this.Module);
          expect(instance).to.be.an.instanceOf(this.Module);
        });

        it('returns undefined when a string is provided', function () {
          const instance = this.locator.get('instance');
          expect(instance).not.to.be.defined;
        });
      });

      it('returns the module that has been registered by type', function () {
        const instance = new this.Module();
        this.locator.set(this.Module, instance);
        const foundInstance = this.locator.get(this.Module);
        expect(foundInstance).to.equal(instance);
      });

      it('returns the module that has been registered by string', function () {
        const instance = {};
        this.locator.set('instance', instance);
        const foundInstance = this.locator.get('instance');
        expect(foundInstance).to.equal(instance);
      });
    });

    describe('referential access', function () {
      beforeEach(function () {
        this.identifier1 = {};
        this.identifier2 = {};
        this.instance1 = 'i1';
        this.instance2 = 'i2';

        this.locator.set(this.identifier1, this.instance1);
        this.locator.set(this.identifier2, this.instance2);
      });

      it('ensures that values with the same toJSON are not clobbered', function () {
        expect(this.locator.get(this.identifier1)).to.equal(this.instance1);
        expect(this.locator.get(this.identifier2)).to.equal(this.instance2);
      });
    });
  });

  describe('static singleton methods', function () {
    beforeEach(function () {
      this.locator = Locator.instance();
      this.identifier = 'instance';
      this.instance = {instance: true};
      this.sandbox.stub(this.locator, 'set');
      this.sandbox.stub(this.locator, 'locate')
        .withArgs(this.identifier).returns(this.instance);
      this.sandbox.stub(this.locator, 'get')
        .withArgs(this.identifier).returns(this.instance);
    });

    afterEach(function () {
      Locator.__reset();
    });

    it('calls set on the instance', function () {
      Locator.set(this.identifier, this.instance);
      expect(this.locator.set).to.have.been.calledOnce
        .and.calledWithExactly(this.identifier, this.instance);
    });

    describe('locate', function () {
      beforeEach(function () {
        this.result = Locator.locate(this.identifier);
      });

      it('calls locate on the instance', function () {
        expect(this.locator.locate).to.have.been.calledOnce
          .and.calledWithExactly(this.identifier);
      });

      it('returns the result of instance.locate', function () {
        expect(this.result).to.equal(this.instance);
      });
    });

    describe('get', function () {
      beforeEach(function () {
        this.result = Locator.get(this.identifier);
      });

      it('calls locate on the instance', function () {
        expect(this.locator.get).to.have.been.calledOnce
          .and.calledWithExactly(this.identifier);
      });

      it('returns the result of instance.get', function () {
        expect(this.result).to.equal(this.instance);
      });
    });
  });
});

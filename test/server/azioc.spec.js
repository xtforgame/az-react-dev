/*eslint-disable no-unused-vars, no-undef */

import chai from 'chai';
import Azioc, { ServiceBase } from '../../src/server/azioc';

import {
  Class0NoName,
  Class1,
  Class2Dep1,
  Class3StartDep1,
} from '../test-data/azioc';

let expect = chai.expect;

describe('Azioc Test Cases', function(){
  describe('Basic', function(){

    it('Azioc should be a function', () => {
      expect(Azioc).to.be.an.instanceof(Function);
      return true;
    });

    it('ServiceBase should be a function', () => {
      expect(ServiceBase).to.be.an.instanceof(Function);
      return true;
    });

  });

  describe('Registration', function(){
    it('should be able to register a Class with $name', () => {
      let ioc = new Azioc();

      expect(ioc.register(Class2Dep1)).to.be.equal(true);
      expect(ioc.register(Class1)).to.be.equal(true);
      return true;
    });

    it('should fail while registering a Class without $name', () => {
      let ioc = new Azioc();
      expect(() => ioc.register(Class0NoName)).to.throw(Error, `$name not found, Class: ${Class0NoName.name}`);
      return true;
    });
  });

  describe('Start', function(){
    this.timeout(3000);
    it('should able to start', () => {
      let ioc = new Azioc();

      expect(ioc.register(Class2Dep1)).to.be.equal(true);
      expect(ioc.register(Class1)).to.be.equal(true);
      expect(ioc.start()).to.be.an.instanceof(Promise);
      
      return true;
    });

    it('should be able to get service instance after calling start', () => {
      let ioc = new Azioc();

      expect(ioc.register(Class2Dep1)).to.be.equal(true);
      expect(ioc.register(Class1)).to.be.equal(true);
      expect(ioc.start()).to.be.an.instanceof(Promise);

      let class2 = ioc.get(Class2Dep1.$name);
      expect(class2.class1).to.be.an.instanceof(Class1);
      expect(class2.class1.state).to.be.equal('created');
      return true;
    });

    it('should be able to get service instance after calling start', () => {
      let ioc = new Azioc();
      ioc.register(Class2Dep1);
      ioc.register(Class1);

      let p = ioc.start();
      let class2 = ioc.get(Class2Dep1.$name);
      expect(class2.class1.state).to.be.equal('created');

      return p
      .then(() => {
        expect(class2.class1.state).to.be.equal('started');
        expect(class2.state).to.be.equal('started');
      });
    });

    it('should be able to start in the right order', () => {
      let ioc = new Azioc();
      ioc.register([Class2Dep1, Class1, Class3StartDep1]);

      let class2 = ioc.get(Class2Dep1.$name);
      let class3 = ioc.get(Class3StartDep1.$name);

      let p1 = ioc.start().then(() => {
        expect(class2.class1.state).to.be.equal('started');
        expect(class3.class1.state).to.be.equal('started');
      });

      let p2 = new Promise(resolve => setTimeout(resolve, 1200))
      .then(() => {
        expect(class2.class1.state).to.be.equal('started');
        expect(class3.class1).to.be.equal(undefined);
      });

      return Promise.all([p1, p2]);
    });

  });

  // describe('Echo Test', function(){

  //   it('.then()', function(){
  //     return mainFunc(data01)
  //       .then(result => {
  //         expect(result).to.exists;
  //         expect(result.val01).to.equal(1);
  //       });
  //   });

  //   it('.catch()', function(){
  //     let then = false;
  //     return mainFunc(null, err01)
  //       .then(() => {
  //         then = 1;
  //         throw Error();
  //       })
  //       .catch(result => {
  //         if(then){
  //           throw Error();
  //         }
  //         expect(result).to.exists;
  //         expect(result.message).to.equal('Error');
  //       });
  //   });

  // });

});



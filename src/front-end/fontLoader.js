import FontFaceObserver from 'fontfaceobserver';
import {toSeqPromise} from 'common/utils';


let loadMin = () => toSeqPromise([
  ['Noto Sans TC', 400],
  ['Noto Sans TC', 700],
], (_, value) => {
  let observer = new FontFaceObserver(value[0], {
    weight: value[1],
  });
  return observer.load()
  .then(function () {
    console.log(`${value[0]}:${value[1]} is available`);
  }, function () {
    console.log(`${value[0]}:${value[1]} is not available`);
  })
});

let loadAll = () => toSeqPromise([
  ['Noto Sans SC', 400],
  ['Noto Sans SC', 700],
  ['Roboto', 400],
  ['Roboto', 700],
], (_, value) => {
  let observer = new FontFaceObserver(value[0], {
    weight: value[1],
  });
  return observer.load()
  .then(function () {
    // console.log(`${value[0]}:${value[1]} is available`);
  }, function () {
    console.log(`${value[0]}:${value[1]} is not available`);
  })
});

export default () => {
  let min = loadMin();
  let all = min.then(loadAll);
  return {min, all};
};

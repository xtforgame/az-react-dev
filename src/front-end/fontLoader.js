import FontFaceObserver from 'fontfaceobserver';
import { toSeqPromise } from 'common/utils';


const loadMin = () => toSeqPromise([
  ['Noto Sans TC', 400],
  ['Noto Sans TC', 700],
], (_, value) => {
  const observer = new FontFaceObserver(value[0], {
    weight: value[1],
  });
  return observer.load()
  .then(() => {
    // console.log(`${value[0]}:${value[1]} is available`);
  }, () => {
    console.warn(`${value[0]}:${value[1]} is not available`);
  });
});

const loadAll = () => toSeqPromise([
  ['Noto Sans SC', 400],
  ['Noto Sans SC', 700],
  ['Roboto', 400],
  ['Roboto', 700],
], (_, value) => {
  const observer = new FontFaceObserver(value[0], {
    weight: value[1],
  });
  return observer.load()
  .then(() => {
    // console.log(`${value[0]}:${value[1]} is available`);
  }, () => {
    console.warn(`${value[0]}:${value[1]} is not available`);
  });
});

export default () => {
  const min = loadMin();
  const all = min.then(loadAll);
  return { min, all };
};

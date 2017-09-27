export default class RouterBase {
  constructor(_props) {
    const props = _props || {};
    Object.keys(props).map(name => this[name] = props[name]);
  }
}

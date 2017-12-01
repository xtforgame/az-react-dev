// https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e
export default function getDisplayName(WrappedComponent) {
  return (WrappedComponent && (WrappedComponent.displayName || WrappedComponent.name)) || 'Component';
}

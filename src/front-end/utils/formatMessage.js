export default function formatMessage(intl, messageDescriptor, values) {
  try {
    return intl.formatMessage(messageDescriptor, values);
  } catch (e) {
    return messageDescriptor.defaultMessage;
  }
}

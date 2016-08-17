export default function typeLetters(selector) {
  return {
    isDescriptor: true,

    value(text) {
      for (let i = 0; i < text.length; i++) {
        keyEvent(selector, 'keypress', text.charCodeAt(i));
      }

      return this;
    }
  };
}

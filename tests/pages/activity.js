import { create, text, visitable, count, attribute } from 'tajpado/tests/page-object';

function typeLetters(selector) {
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

export default create({
  visit: visitable('/'),
  visitActivity: visitable('/activities/:activity_id'),

  write: typeLetters('.activity-script-viewer'),
  completed: text('.activity-script-viewer .completed'),
  pending: text('.activity-script-viewer .pending'),
  activityCompletedMessage: text('.activity-completed'),
  errorCount: text('.error-count'),
  errorMarkCount: count('.error-mark'),
  errorMarkTitle: attribute('title', '.error-mark')
});

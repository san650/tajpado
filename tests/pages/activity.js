import { create, text, visitable } from 'tajpado/tests/page-object';

function typeLetter(selector) {
  return {
    isDescriptor: true,

    value(c) {
      keyEvent(selector, 'keypress', c.charCodeAt(0));
    }
  };
}

export default create({
  visit: visitable('/'),

  typeLetter: typeLetter('.activity-script-viewer'),
  completed: text('.activity-script-viewer .completed'),
  pending: text('.activity-script-viewer .pending'),
  activityCompletedMessage: text('.activity-completed')
});

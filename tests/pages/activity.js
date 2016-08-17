import { create, text, visitable, count, attribute } from 'tajpado/tests/page-object';
import typeLetters from './helpers/type-letters';

export default create({
  visit: visitable('/'),
  visitActivity: visitable('/activities/:activity_id'),

  write: typeLetters('.activity-script-viewer'),
  completed: text('.activity-script-viewer .completed'),
  pending: text('.activity-script-viewer .pending'),
  activityCompletedMessage: text('.activity-completed'),
  errorCount: text('.error-count'),
  errorMarkCount: count('.error-mark'),
  errorMarkTitle: attribute('title', '.error-mark'),

  title: text('h3'),
  subtitle: text('h4')
});

import { test } from 'qunit';
import moduleForAcceptance from 'tajpado/tests/helpers/module-for-acceptance';
import Pretender from 'pretender';

moduleForAcceptance('Acceptance | ready set go');

const ACTIVITIES = {
  activities: [
    { id: 1, script: "abcd" }
  ]
};

function type(c) {
  keyEvent('.activity-script-viewer', 'keypress', c.charCodeAt(0));
}

test('passes the activity', function(assert) {
  new Pretender(function(){
    this.get('/api/activities.json', function() {
      return [200, {"Content-Type": "application/json"}, JSON.stringify(ACTIVITIES)];
    });
  });

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/activities/1');
    assert.equal(currentRouteName(), 'activity');
    assert.equal(find('.activity-script-viewer .completed').text(), '');
    assert.equal(find('.activity-script-viewer .pending').text(), 'abcd');
  });

  type('a');

  andThen(function() {
    assert.equal(find('.activity-script-viewer .completed').text(), 'a');
    assert.equal(find('.activity-script-viewer .pending').text(), 'bcd');
  });

  type('b');
  type('c');
  type('d');

  andThen(function() {
    assert.equal(find('.activity-script-viewer .completed').text(), 'abcd');
    assert.equal(find('.activity-script-viewer .pending').text(), '');
  });
});

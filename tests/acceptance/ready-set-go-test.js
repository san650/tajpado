import { test } from 'qunit';
import moduleForAcceptance from 'tajpado/tests/helpers/module-for-acceptance';
import Pretender from 'pretender';
import page from '../pages/activity';

moduleForAcceptance('Acceptance | ready set go');

const ACTIVITIES = {
  activities: [
    { id: 1, script: "aBcd" }
  ]
};

test('passes the activity', function(assert) {
  new Pretender(function(){
    this.get('/api/activities.json', function() {
      return [200, {"Content-Type": "application/json"}, JSON.stringify(ACTIVITIES)];
    });
  });

  page.visit();

  andThen(function() {
    assert.equal(currentURL(), '/activities/1');
    assert.equal(currentRouteName(), 'activity');
    assert.equal(page.completed, '');
    assert.equal(page.pending, 'aBcd');
  });

  page.typeLetter('a');

  andThen(function() {
    assert.equal(page.completed, 'a');
    assert.equal(page.pending, 'Bcd');
  });

  page.typeLetter('b');

  andThen(function(){
    assert.equal(page.completed, 'a');
    assert.equal(page.pending, 'Bcd', 'The match is case sensitive.');
  });

  page.typeLetter('B');
  page.typeLetter('c');
  page.typeLetter('d');

  andThen(function() {
    assert.equal(page.completed, 'aBcd');
    assert.equal(page.pending, '');
    assert.equal(page.activityCompletedMessage, 'Next activity');
  });
});

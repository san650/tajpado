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

function setupActivity(){
  return new Pretender(function(){
    this.get('/api/activities.json', function(){
      return [200, {"Content-Type": "application/json"}, JSON.stringify(ACTIVITIES)];
    });
  });
}

test('passes the activity', function(assert) {
  setupActivity();

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

  page.typeLetter('B');
  page.typeLetter('c');
  page.typeLetter('d');

  andThen(function() {
    assert.equal(page.completed, 'aBcd');
    assert.equal(page.pending, '');
    assert.equal(page.activityCompletedMessage, 'Next activity');
  });
});

test('restart activity', function(assert){
  setupActivity();

  page.visit();
  page.typeLetter('a');
  page.restart();

  andThen(function(){
    assert.equal(page.completed, '');
    assert.equal(page.pending, 'aBcd');
    assert.ok(!page.restartHasFocus, 'The button does not has the focus after click.');
  });
});

test('count errors', function(assert){
  setupActivity();

  page.visit();

  andThen(function(){
    assert.equal(page.errorCount, '0', 'Starts the game without errors.');
    assert.ok(!page.errorMarkCount, 'No error marks.');
  });

  page.typeLetter('a');

  andThen(function(){
    assert.equal(page.errorCount, '0');
  });

  page.typeLetter('b');

  andThen(function(){
    assert.equal(page.errorCount, '1', 'The text is case sensitive,  b is not equal B.');
    assert.ok(!page.errorMarkCount, 0);
  });

  page.typeLetter('r');

  andThen(function(){
    assert.equal(page.errorCount, '2', 'Wrong letter.');
    assert.ok(!page.errorMarkCount);
  });

  page.typeLetter('B');

  andThen(function(){
    //The error span is rendered after pass the current index
    assert.ok(page.errorMarkCount, 'Two errors in the same index.');
    assert.equal(page.errorMarkTitle, 'Attempts: 2', 'Title shows: "Attempts: 2"');
  });
});

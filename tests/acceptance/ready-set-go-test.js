import { test } from 'qunit';
import moduleForAcceptance from 'tajpado/tests/helpers/module-for-acceptance';
import Pretender from 'pretender';
import page from '../pages/activity';

moduleForAcceptance('Acceptance | ready set go');

const ACTIVITIES = {
  activities: [
    { id: 1, script: "abcd" },
    { id: 2, script: "aBcd" }
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
    assert.equal(page.pending, 'abcd');
  });

  page.typeLetter('a');

  andThen(function() {
    assert.equal(page.completed, 'a');
    assert.equal(page.pending, 'bcd');
  });

  page.typeLetter('b');
  page.typeLetter('c');
  page.typeLetter('d');

  andThen(function() {
    assert.equal(page.completed, 'abcd');
    assert.equal(page.pending, '');
    assert.equal(page.activityCompletedMessage, 'Next activity');
  });
});

test('count errors', function(assert){
  new Pretender(function(){
    this.get('/api/activities.json', function(){
      return [200, {"Content-Type": "application/json"}, JSON.stringify(ACTIVITIES)];
    });
  });

  page.visitActivity({activity_id: 2});

  andThen(function(){
    assert.equal(currentURL(), '/activities/2');
    assert.equal(currentRouteName(), 'activity');
    assert.equal(page.pending, 'aBcd');
    assert.equal(page.errorCount, '0', 'Starts the game without errors.');
    assert.equal(page.errorMarkCount, 0, 'No error marks.');

    page.typeLetter('a');

    andThen(function(){
      assert.equal(page.errorCount, '0');      
    });

    page.typeLetter('b');

    andThen(function(){
      assert.equal(page.errorCount, '1', 'The text is case sensitive,  b is not equal B.');
      assert.equal(page.errorMarkCount, 0);
    });

    page.typeLetter('r');

    andThen(function(){
      assert.equal(page.errorCount, '2', 'Wrong letter.');
      assert.equal(page.errorMarkCount, 0);
    });

    page.typeLetter('B');
    
    andThen(function(){
      //The error span is rendered after pass the current index
      assert.equal(page.errorMarkCount, 1, 'Two errors in the same index.');
      assert.equal(page.errorMarkTitle, 'Attempts: 2', 'Title shows: "Attempts: 2"');
    });
    
    page.typeLetter('c');
    page.typeLetter('d');

    andThen(function(){
      assert.equal(page.errorCount, '2', 'Game completed.');
    });
  });

});
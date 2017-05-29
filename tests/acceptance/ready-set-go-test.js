/* jshint ignore:start */
import { test } from 'qunit';
import moduleForAcceptance from 'tajpado/tests/helpers/module-for-acceptance';
import Pretender from 'pretender';
import page from '../pages/activity';

moduleForAcceptance('Acceptance | ready set go', {
  beforeEach() {
    this.server = new Pretender(function() {
      this.get('/api/activities.json', function() {
        return [200, { 'Content-Type': 'application/json' }, JSON.stringify(ACTIVITIES)];
      });
    });
  },

  afterEach() {
    this.server.shutdown();
  }
});

const ACTIVITIES = {
  activities: [
    {
      id: 1,
      title: 'title',
      subtitle: 'subtitle',
      script: 'aBcd'
    }
  ]
};

test('passes the activity', async function(assert) {
  await page.visit();

  assert.equal(currentURL(), '/activities/1');
  assert.equal(currentRouteName(), 'activity');
  assert.equal(page.completed, '');
  assert.equal(page.pending, 'aBcd');

  await page.write('a');

  assert.equal(page.completed, 'a');
  assert.equal(page.pending, 'Bcd');

  await page.write('b');

  assert.equal(page.completed, 'a');
  assert.equal(page.pending, 'Bcd', 'The match is case sensitive.');

  await page.write('Bcd');

  assert.equal(page.completed, 'aBcd');
  assert.equal(page.pending, '');
  assert.equal(page.activityCompletedMessage, 'Next activity');
});

test('count errors', async function(assert) {
  await page.visit();

  assert.equal(page.errorCount, '0', 'Starts the game without errors.');
  assert.equal(page.errorMarkCount, 0, 'No error marks.');

  await page.write('a');

  assert.equal(page.errorCount, '0');

  await page.write('b');

  assert.equal(page.errorCount, '1', 'The text is case sensitive,  b is not equal B.');
  assert.equal(page.errorMarkCount, 0);

  await page.write('r');

  assert.equal(page.errorCount, '2', 'Wrong letter.');
  assert.equal(page.errorMarkCount, 0);

  await page.write('B');

  // the error span is rendered after pass the current index
  assert.equal(page.errorMarkCount, 1, 'Two errors in the same index.');
  assert.equal(page.errorMarkTitle, 'Attempts: 2', 'Title shows: "Attempts: 2"');

  await page.write('cd');

  assert.equal(page.errorCount, '2', 'Game completed.');
});

test('displays the title and subtitle', async function(assert) {
  await page.visit();

  assert.equal(page.title, 'title', 'Displays the title');
  assert.equal(page.subtitle, 'subtitle', 'Display the subtitle');
});

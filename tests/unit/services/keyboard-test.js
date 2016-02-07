import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

var { merge } = Ember;

moduleFor('service:keyboard', 'Unit | Service | keyboard');

const LETTER = 97;

function mockEvent(props) {
  return merge({
    stopPropagation() {},
    preventDefault() {}
  }, props);
}

test('registers pressed key from event', function(assert) {
  let service = this.subject();

  service.pushKeyPressEvent(mockEvent({
    which: LETTER
  }));

  assert.deepEqual(service.get('keys'), ['a']);
});

test('ignores event when it has a modifier key', function(assert) {
  let service = this.subject();

  service.pushKeyPressEvent(mockEvent({
    metaKey: true,
    which: LETTER
  }));

  service.pushKeyPressEvent(mockEvent({
    ctrlKey: true,
    which: LETTER
  }));

  service.pushKeyPressEvent(mockEvent({
    altKey: true,
    which: LETTER
  }));

  assert.deepEqual(service.get('keys'), []);
});

test('fires an event when key event is valid', function(assert) {
  assert.expect(1);

  let service = this.subject();

  service.on('keyPress', function(key) {
    assert.equal(key, 'a');
  });

  service.pushKeyPressEvent(mockEvent({ which: LETTER }));
});

test('does not fire an event when key event is not valid ', function(assert) {
  assert.expect(0);

  let service = this.subject();

  service.on('keyPress', function() {
    assert.ok(false, 'stop propagation should not be called');
  });

  service.pushKeyPressEvent(mockEvent({
    ctrlKey: true,
    which: LETTER
  }));
});

test('stops event propagation when key is valid', function(assert) {
  assert.expect(1);

  let service = this.subject();

  service.pushKeyPressEvent(mockEvent({
    which: LETTER,
    stopPropagation() {
      assert.ok(true, 'stop propagation called');
    }
  }));
});

test('should not stops event propagation when key is invalid', function(assert) {
  assert.expect(0);

  let service = this.subject();

  service.pushKeyPressEvent(mockEvent({
    altKey: true,
    which: LETTER,
    stopPropagation() {
      assert.ok(false, 'stop propagation should not be called');
    }
  }));
});

test('prevents default behavior when key is valid', function(assert) {
  assert.expect(1);

  let service = this.subject();

  service.pushKeyPressEvent(mockEvent({
    which: LETTER,
    preventDefault() {
      assert.ok(true, 'prevents default called');
    }
  }));
});

test('should not prevent default behavior when key is invalid', function(assert) {
  assert.expect(0);

  let service = this.subject();

  service.pushKeyPressEvent(mockEvent({
    altKey: true,
    which: LETTER,
    preventDefault() {
      assert.ok(false, 'prevent default should not be called');
    }
  }));
});

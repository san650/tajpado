import Ember from 'ember';

/**
 * Subscribe to dependent object events
 *
 * @example
 *
 *   Ember.Component.extend({
 *     keyboard: inject.service(),
 *
 *     connectToKeyPressEvent: on('keyboard.keyPress', function(key) {
 *       ...
 *     })
 *   });
 *
 * @param {String} eventKey - event name or depedent key plus event name
 * @param {Function} cb - callback to be invoked by the event
 * @return {Object}
 */
export default function on(eventKey, cb) {
  let args = eventKey.split('.');
  let eventName;
  let dependentKey;

  if (args.length === 1) {
    eventName = args[0];
  } else {
    dependentKey = args[0];
    eventName = args[1];
  }

  if (dependentKey) {
    return Ember.on('init', function() {
      this.get(dependentKey).on(eventName, this, function() {
        // If the target object is beign destroyed, don't call the callback nothing
        if (this.get('isDestroying') || this.get('isDestroyed')) {
          return;
        }

        Ember.run(this, cb, ...arguments);
      });

      Ember.addListener(this, 'willDestroy', this, function() {
        this.get(dependentKey).off(eventName, cb);
      });
    });
  } else {
    return Ember.on(eventName, cb);
  }
}

import Ember from 'ember';
import on from 'tajpado/utils/on';

var { inject, $, run } = Ember;

export default Ember.Controller.extend({
  keyboard: inject.service(),

  initializeListener: on('init', function() {
    $(document).on('keypress', null, event => {
      run(() => {
        this.get('keyboard').pushKeyPressEvent(event);
      });
    });
  }),

  teardownListener: on('isDestroying', function() {
    $(document).off('keyPress');
  }),

  writeKeysToConsole: on('keyboard.keyPress', function(key) {
    console.log(`Key pressed: ${key}`);
  })
});

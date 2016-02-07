import Ember from 'ember';

var { inject, on, $, run } = Ember;

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

  writeKeysToConsole: on('init', function() {
    this.get('keyboard').on('keyPress', function(key) {
      console.log(`Key pressed: ${key}`);
    });
  })
});

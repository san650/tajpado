import Ember from 'ember';

var { inject, $, run, on } = Ember;

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
});

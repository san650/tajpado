import Ember from 'ember';
import on from 'tajpado/utils/on';

var { computed, inject } = Ember;

export default Ember.Component.extend({
  keyboard: inject.service(),
  classNames: ['editor'],

  // Expected Attributes
  script: null,

  // Properties
  completedIndex: 0,

  completed: computed('completedIndex', function() {
    return this.get('script').slice(0, this.get('completedIndex'));
  }),

  pending: computed('completedIndex', function() {
    return this.get('script').slice(this.get('completedIndex'));
  }),

  pendingSafe: computed('completedIndex', function() {
    var text = this.get('pending');

    return `<span>${text.slice(0, 1)}</span>${text.slice(1)}`.htmlSafe();
  }),

  connectToKeyPressEvent: on('keyboard.keyPress', function(key) {
    var script = this.get('script');
    var index = this.get('completedIndex');
    var scriptChar = script.charAt(index);

    if (key === scriptChar) {
      this.incrementProperty('completedIndex');
      // params: key, # pending, # completed, # total
      this.sendAction('onHit', key, this.get('pending.length'), this.get('completed.length'), this.get('script.length'));
    } else  {
      // params: actual, expected, # pending, # completed, # total
      this.sendAction('onMiss', scriptChar, key, this.get('pending.length'), this.get('completed.length'), this.get('script.length'));
    }

    if (this.get('completedIndex') === this.get('script').length) {
      this.sendAction('onCompleted');
    }
  })
});

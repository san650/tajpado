import Ember from 'ember';

var { computed, on, inject } = Ember;

export default Ember.Component.extend({
  keyboard: inject.service(),
  classNames: ['editor'],
  script: null,

  completedIndex: 0,

  completed: computed('completedIndex', function() {
    return this.get('script').slice(0, this.get('completedIndex'));
  }),

  pending: computed('completedIndex', function() {
    var text = this.get('script').slice(this.get('completedIndex'));

    return `<span>${text.slice(0, 1)}</span>${text.slice(1)}`.htmlSafe();
  }),

  connectToKeyPressEvent: on('init', function(key) {
    this.get('keyboard').on('keyPress', key => {
      if (this.get('isDestroying') || this.get('isDestroyed')) {
        return;
      }

      var script = this.get('script');
      var index = this.get('completedIndex');
      var scriptChar = script.charAt(index);

      if (key === scriptChar) {
        this.incrementProperty('completedIndex');
      }

      if (this.get('completedIndex') === this.get('script').length) {
        this.sendAction('onCompleted');
      }
    });
  })
});

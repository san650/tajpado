import Ember from 'ember';
import on from 'tajpado/utils/on';

var { computed, inject } = Ember;

export default Ember.Service.extend(Ember.Evented, {
  script: null,

  keyboard: inject.service(),
  isCompleted: false,
  completedIndex: 0,

  completed: computed('completedIndex', function() {
    return this.get('script').slice(0, this.get('completedIndex'));
  }),

  pending: computed('completedIndex', function() {
    return this.get('script').slice(this.get('completedIndex'));
  }),

  onKeyPress: on('keyboard.keyPress', function(key) {
    if (this.get('isCompleted')) {
      return;
    }

    var script = this.get('script');
    var index = this.get('completedIndex');
    var scriptChar = script.charAt(index);

    if (key === scriptChar) {
      this.incrementProperty('completedIndex');
      // params: key, # pending, # completed, # total
      this.trigger('onHit', key, this.get('pending.length'), this.get('completed.length'), this.get('script.length'));
    } else  {
      // params: actual, expected, # pending, # completed, # total
      this.trigger('onMiss', scriptChar, key, this.get('pending.length'), this.get('completed.length'), this.get('script.length'));
    }

    if (this.get('completedIndex') === this.get('script').length) {
      this.set('isCompleted', true);
      this.trigger('onCompleted');
    }
  })
});

import Ember from 'ember';
import on from 'tajpado/utils/on';

var { computed, inject } = Ember;

export default Ember.Service.extend(Ember.Evented, {
  current: null,

  keyboard: inject.service(),

  onKeyPress: on('keyboard.keyPress', function(key) {
    if (!this.get('current') || this.get('current.isCompleted')) {
      return;
    }


    var script = this.get('current.script');
    var index = this.get('current.completedIndex');
    var scriptChar = script.charAt(index);

    if (key === scriptChar) {
      this.incrementProperty('current.completedIndex');
      this.set('current.error', null);
      // params: key, # pending, # completed, # total
      this.trigger('onHit', key, this.get('current.pending.length'), this.get('current.completed.length'), script.length);
    } else  {
      this.set('current.error', `Expected "${scriptChar}" but was "${key}"`);

      // params: actual, expected, # pending, # completed, # total
      this.trigger('onMiss', scriptChar, key, this.get('current.pending.length'), this.get('current.completed.length'), script.length);
    }

    if (this.get('current.completedIndex') === script.length) {
      this.set('current.isCompleted', true);
      this.trigger('onCompleted');
    }
  })
});

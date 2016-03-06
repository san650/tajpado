import Ember from 'ember';
import on from 'tajpado/utils/on';
import Miss from 'tajpado/models/miss';

var { inject } = Ember;

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
      var errorMessage = `Expected "${scriptChar}" but was "${key}"`;

      this.set('current.error', errorMessage);

      this.get('current.errors').pushObject(Miss.create({
          index: index,
          message: errorMessage
        })
      );

      // params: actual, expected, # pending, # completed, # total
      this.trigger('onMiss', scriptChar, key, this.get('current.pending.length'), this.get('current.completed.length'), script.length);
    }

    if (this.get('current.isCompleted')) {
      this.trigger('onCompleted');
    }
  }),

  restartActivity(){
    this.get('current').setProperties({
      completedIndex: 0,
      error: null,
      errors: []
    });
  }
});

import Ember from 'ember';
import on from 'tajpado/utils/on';

var { inject } = Ember;

var errorIndex = Ember.Object.extend({
  index: 0,
  count: 0
});

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

      var item = this.get('current.errorsIndex').findBy('index', index);
      if(item === undefined){
        this.get('current.errorsIndex').pushObject(errorIndex.create({
          index: index,
          count: 1
        }));
      } else {
        item.set('count', item.get('count') + 1);
      }

      // params: actual, expected, # pending, # completed, # total
      this.trigger('onMiss', scriptChar, key, this.get('current.pending.length'), this.get('current.completed.length'), script.length);
    }

    if (this.get('current.isCompleted')) {
      this.trigger('onCompleted');
    }
  })
});

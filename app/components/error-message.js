import Ember from 'ember';

var { computed, run } = Ember;

export default Ember.Component.extend({
  classNames: ['error'],
  classNameBindings: ['isHidden'],

  isHidden: false,

  error: computed('activity.error', function() {
    this.set('isHidden', !this.get('activity.error'));

    setTimeout(() => {
      this.set('isHidden', true);
    }, 500);

    return this.get('activity.error');
  })
});

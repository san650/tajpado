import Ember from 'ember';

var { computed, run, observer } = Ember;

export default Ember.Component.extend({
  classNames: ['activity-errors-viewer'],
  classNameBindings: ['isHidden'],

  isHidden: false,

  error: computed('activity.error', function() {
    return this.get('activity.error');
  }),

  onNewError: observer('error', function() {
    this.set('isHidden', false);

    run.cancel(this.get('timerId'));

    var id = run.later(() => {
      this.set('isHidden', true);
    }, 500);

    this.set('timerId', id);
  })
});

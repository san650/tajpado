import Ember from 'ember';

var { computed } = Ember;

export default Ember.Component.extend({
  tagName: '',

  // Expected Attributes
  activity: null,

  // Computed
  completed: computed.alias('activity.completed'),
  pending: computed('activity.pending', function() {
    var text = this.get('activity.pending');

    if (!text) {
      return '';
    }

    return `<span>${text.slice(0, 1)}</span>${text.slice(1)}`.htmlSafe();
  })
});

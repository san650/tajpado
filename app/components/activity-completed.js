import Ember from 'ember';

var { computed } = Ember;

export default Ember.Component.extend({
  tagName: '',
  isVisible: computed.alias('activity.isCompleted'),
  nextActivityId: computed('activity', function() {
    return Number(this.get('activity.id')) + 1;
  })
});

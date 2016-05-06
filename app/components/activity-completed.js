import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: '',
  isHidden: computed.not('activity.isCompleted'),
  nextActivityId: computed('activity', function() {
    return Number(this.get('activity.id')) + 1;
  })
});

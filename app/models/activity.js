import Ember from 'ember';

var { computed, $ } = Ember;

var Activity = Ember.Object.extend({
  script: '',
  completedIndex: 0,
  error: null,

  isCompleted: computed('script', 'completedIndex', function() {
    return this.get('completedIndex') === this.get('script.length');
  }),

  completed: computed('script', 'completedIndex', function() {
    return this.get('script').slice(0, this.get('completedIndex'));
  }),

  pending: computed('script', 'completedIndex', function() {
    return this.get('script').slice(this.get('completedIndex'));
  })
});

Activity.reopenClass({
  find(id) {
    return $.get('/api/activities.json')
      .then(response => response.activities)
      .then(activities => activities[Number(id) - 1])
      .then(activity => Activity.create(activity));
  }
});

export default Activity;

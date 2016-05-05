import Ember from 'ember';

const { computed, $ } = Ember;

const Activity = Ember.Object.extend({
  script: '',
  completedIndex: 0,
  error: null,

  errors: computed(function() {
    return [];
  }),
  errorIndexes: computed('errors.[]', function() {
    return this.get('errors').mapBy('index').uniq();
  }),
  errorsCount: computed('errors.[]', function() {
    return this.get('errors').length;
  }),

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
    return $.getJSON('/api/activities.json')
      .then((response) => response.activities)
      .then((activities) => activities[Number(id) - 1])
      .then((activity) => Activity.create(activity));
  }
});

export default Activity;

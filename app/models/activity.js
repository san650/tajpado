import Ember from 'ember';

var { computed } = Ember;

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
  find() {
    return Activity.create({
      script: "A windmill is a mill that converts the " +
           "energy of wind into rotational energy by " +
           "means of vanes called sails or blades. " +
           "Traditional windmills were often used to " +
           "mill grain, pump water, or both. Most modern " +
           "windmills take the form of wind turbines used " +
           "to generate electricity, or windpumps used to " +
           "pump water, either for land drainage or to extract groundwater."
    });
  }
});

export default Activity;

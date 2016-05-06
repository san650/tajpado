import Ember from 'ember';

let { computed } = Ember;

export default Ember.Component.extend({
  tagName: '',

  // Expected Attributes
  activity: null,

  getErrorCountByIndex(index) {
    return this.get('activity.errors').filterBy('index', index).length;
  },

  // Computed
  completed: computed('activity.completed', function() {
    let completedText = this.get('activity.completed');
    let charArray = completedText.split('');

    this.get('activity.errorIndexes').forEach((item) => {
      charArray[item] = `<span class='error-mark' title='Attempts: ${this.getErrorCountByIndex(item)}'>${charArray[item]}</span>`;
    });
    return charArray.join('').htmlSafe();
  }),

  pending: computed('activity.pending', function() {
    let text = this.get('activity.pending');

    if (!text) {
      return '';
    }

    return `<span>${text.slice(0, 1)}</span>${text.slice(1)}`.htmlSafe();
  })
});

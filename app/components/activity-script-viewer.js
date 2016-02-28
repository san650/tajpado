import Ember from 'ember';

var { computed } = Ember;

export default Ember.Component.extend({
  tagName: '',

  // Expected Attributes
  activity: null,

  // Computed
  completed: computed('activity.completed', function(){
    var result = this.get('activity.completed');
    var charArray = result.split("");

    this.get('activity.errorsIndex').forEach((item)=>{
      var value = charArray[item.index];

      charArray[item.index] = `<span class='error-mark' title='Attempts: ${item.count}'>${value}</span>`;
    });
    return charArray.join('').htmlSafe();
  }),

  pending: computed('activity.pending', function() {
    var text = this.get('activity.pending');

    if (!text) {
      return '';
    }

    return `<span>${text.slice(0, 1)}</span>${text.slice(1)}`.htmlSafe();
  })
});

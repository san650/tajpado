import Ember from 'ember';

var { computed, on } = Ember;

export default Ember.Component.extend({
  tagName: 'div',
  attributeBindings: ['tabindex'],
  tabindex: 0,
  classNames: ['editor'],
  script: null,

  completedIndex: 0,

  completed: computed('completedIndex', function() {
    return this.get('script').slice(0, this.get('completedIndex'));
  }),

  pending: computed('completedIndex', function() {
    var text = this.get('script').slice(this.get('completedIndex'));

    return `<span>${text.slice(0, 1)}</span>${text.slice(1)}`.htmlSafe();
  }),

  autofocus: on('didInsertElement', function() {
    this.$().focus();
  }),

  keyPress(event) {
    event.preventDefault();

    var script = this.get('script');
    var index = this.get('completedIndex');
    var charCode = script.charCodeAt(index);

    if (event.keyCode === charCode) {
      this.incrementProperty('completedIndex');
    }


    this.sendAction('onKeyPress', String.fromCharCode(event.keyCode), String.fromCharCode(charCode));

    if (this.get('completedIndex') === this.get('script').length) {
      this.sendAction('onCompleted');
    }
  }
});

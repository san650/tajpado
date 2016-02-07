import Ember from 'ember';

var { computed } = Ember;

export default Ember.Service.extend(Ember.Evented, {
  keys: computed(function() {
    return [];
  }),

  pushKeyPressEvent(event) {
    if (event.metaKey || event.ctrlKey || event.altKey) {
      return;
    }

    event.stopPropagation();
    event.preventDefault();

    // FIXME: validate letter against a white list of supported alphabet letters
    var letter = String.fromCharCode(event.which);

    this.get('keys').pushObject(letter);
    this.trigger('keyPress', letter);
  }
});

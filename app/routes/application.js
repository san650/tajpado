import Ember from 'ember';
import Script from 'tajpado/models/script';

export default Ember.Route.extend({
  model() {
    return Script.find(0);
  },

  actions: {
    keyPress(actual, expected) {
      if (actual !== expected) {
        console.log(`Missed: actual: "${actual}", expected: "${expected}"`);
      }
    },

    completed() {
      console.log('Success!');
    }
  }
});

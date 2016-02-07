import Ember from 'ember';
import Script from 'tajpado/models/script';

export default Ember.Route.extend({
  model() {
    return Script.find(0);
  },

  actions: {
    completed() {
      console.log('Success!');
    }
  }
});

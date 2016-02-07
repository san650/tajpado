import Ember from 'ember';
import Script from 'tajpado/models/script';

export default Ember.Route.extend({
  model() {
    return Script.find(0);
  },

  actions: {
    completed() {
      console.log('Success!');
    },

    hit(key, pending, completed, total) {
      console.log({ key, pending, completed, total });
    },

    miss(expected, actual, pending, completed, total) {
      console.log({ expected, actual, pending, completed, total });
    }
  }
});

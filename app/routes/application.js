import Ember from 'ember';
import Script from 'tajpado/models/script';

export default Ember.Route.extend({
  model() {
    var activity = this.container.lookup('service:activity');
    activity.set('script', Script.find(0));

    return activity;
  }
});

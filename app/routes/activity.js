import Ember from 'ember';
import Activity from 'tajpado/models/activity';

var { inject } = Ember;

export default Ember.Route.extend({
  activityManager: inject.service(),

  model(params) {
    var activity = Activity.find(params["activity_id"]);

    return activity;
  },

  afterModel(activity) {
    this.set('activityManager.current', activity);
  }
});

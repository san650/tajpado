// jscs: disable requireCamelCaseOrUpperCaseIdentifiers

import Ember from 'ember';
import Activity from 'tajpado/models/activity';

const { inject } = Ember;

export default Ember.Route.extend({
  activityManager: inject.service(),

  model(params) {
    let activity = Activity.find(params.activity_id);

    return activity;
  },

  afterModel(activity) {
    this.set('activityManager.current', activity);
  }
});

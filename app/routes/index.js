import Ember from 'ember';

export default Ember.Route.extend({
  afterModel() {
    this.replaceWith('activity', { activity_id: 1 });
  }
});

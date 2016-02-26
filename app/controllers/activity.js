import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		restart(){
			Ember.$('.btn-restart').blur();
			return true;
		}
	}
});

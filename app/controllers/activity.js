import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		restart(){
			$('.btn-reset').blur();
			return true;
		}
	}
});

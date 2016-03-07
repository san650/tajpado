import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'button',
	classNameBindings: ['cssClass'],
	/*Expected property*/
	cssClass: '',
	/*Expected property*/
	text: 'Click me',

	click(){
		this.$().blur();
		this.sendAction();
	}
});
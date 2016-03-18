import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'button',

  classNameBindings: ['cssClass'],

  classNames: ['btn-restart'],

	/*Expected property*/
	text: 'Click me',

	click(){
		this.$().blur();
		this.sendAction();
	}
});

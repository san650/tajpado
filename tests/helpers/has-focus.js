import Ember from 'ember';

export function hasFocus(selector){
	return {
    isDescriptor: true,
    get: function() {
    	if(selector === 'undefined' || selector === ''){
    		return false;
    	}

    	var activeElement = Ember.$(document.activeElement).get(0);
    	var element = Ember.$(selector).get(0);
      return activeElement === element;
    }
  };
}

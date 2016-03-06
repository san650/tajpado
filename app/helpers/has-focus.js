import Ember from 'ember';

export function hasFocus(selector){
	return {
    isDescriptor: true,
    get: function() {
    	if(selector === 'undefined' || selector === ''){
    		return false;
    	}

    	var activeElement = $(document.activeElement).get(0);
    	var element = $(selector).get(0); 
      return activeElement === element;
    }
  }
}
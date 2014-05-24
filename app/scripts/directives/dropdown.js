'use strict';
var _HIDDEN = 'hidden';

angular.module('dropApp')
  .directive('cuDropdown', function () {
    return {
      restrict: 'A',
      controller : function ($document) {

      	var elementPool = {};

      	/**
      	 * Register an element with a spedific id
      	 * @param  {String} id      any number
      	 * @param  {Object} element registered element
      	 */
      	this.registerElement = function registerElement (id, element) {

      		// Check if the element is the first with this id
      		var pool = elementPool[id];
      		if (pool == undefined && element) {
      			elementPool[id] = element;
      		}

      		else {
      			console.error("Missing element parameter");
      		}
      	}

      	/**
      	 * Get the registered element
      	 * @param  {String}   id registered id
      	 * @param  {Function} cb - element (null if none);
      	 */
      	function getRegisteredElement (id, cb) {

      		// Check if there is registered elements
      		var element = elementPool[id];
      		if (element) { 	
      			cb(element);
      		}

      		return cb(null); // End signal
      	}

      	/**
      	 * Will hide the element if user click outside
      	 * of it.
      	 * @param  {Object} element element to hide
      	 * @param  {Function} cb - when element is hidden;
      	 */
      	function hideOnOutsideClick (element, callback) {
      		var cb = callback || angular.noop;

      		// Binds a click event on the whole document
			$document.on('click', element, function (event) {

				// Check if the click is outside the element
				if(!$(event.target).closest(element).length) {

					// Unbind and hide
					$document.off('click', element);
					element.addClass(_HIDDEN);
					cb();
				}
			}); 
      	} 

      	/**
      	 * Show the registered element
      	 * @param  {String} id 
      	 */
      	this.openAll = function openAll (id) {

      		getRegisteredElement(id, function (element) {
      			if (element != null) {
      				element.removeClass(_HIDDEN);
					hideOnOutsideClick(element);
      			}
      		});
      	};

      	/**
      	 * Hide the registered element
      	 * with the specified id
      	 * @param  {String} id 
      	 */
      	this.closeAll = function closeAll (id) {

      		getRegisteredElement(id, function (element) {
      			if (element != null) {
      				element.addClass(_HIDDEN);
      				hideOnOutsideClick(element);
      			}
      		});

      	};

      	/**
      	 * Toggle the registered element 
      	 * with the specified id
      	 * @param  {String} id 
      	 */
      	this.toggleAll = function trigger (id) {

      		getRegisteredElement(id, function (element) {
      			if (element != null) {
      				element.toggleClass(_HIDDEN);
      				hideOnOutsideClick(element);
      			}
      		});
      	};
      }
    };
  })
  .directive('cuDdTrigger', function () {
  	return {
  		restrict : 'A',
  		require : '^cuDropdown',
  		link: function postLink(scope, element, attrs, ctrl) {

  			// Defaul Settings
  			var mode 	= attrs.mode || 'open',
  				id 		= attrs['cuDdTrigger'] || 'default';

  			// Action definition
  			var modeAction = {
  				'open' : function () {
  					ctrl.openAll(id);
  				},
  				'close' : function () {
  					ctrl.closeAll(id);
  				},
  				'toggle' : function () {
  					ctrl.toggleAll(id);
  				}
  			};
  			
  			var action = modeAction[mode];
  			if (action) {
  				
	  			// Will trigger all body that have the same id
	  			element.on('click', function (e) {
	  				e.stopPropagation();
	  				action();
	  			});
  			}

  		}
  	}
  })
  .directive('cuDdBody', function () {
  	return {
  		restrict : 'A',
  		require : '^cuDropdown',
  		link: function postLink (scope, element, attrs, ctrl) {
  			var id = attrs['cuDdBody'] || 'default';

  			element.addClass(_HIDDEN);
  			ctrl.registerElement(id, element);


  		}
  	}
  });

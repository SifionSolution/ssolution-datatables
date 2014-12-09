/**
 * Some of the best practices:
 * 
 * 1: Always use jQuery 'data' method when referring to 'data-attributes'.
 * 
 * 2: Every private function should start with the underscore.
 * 
 * 3: Every event must trigger some event on the $element.
 * 		e.g. : The user selects a row. Then we do: $element.trigger('ssolution-table:row-selected', [theRow]);
 * 		e.g.2: Now, all you have to do is call: _trigger('row-selected', theRow, otherParameter);
 * 
 * 4: Every event that is triggered by this plugin must start with 'ssolution-table:'.
 * 
 * 5: Most of the workflow will be available for override (using the default).
 * 
 * 6: Every callback function must be called this way: _executeCallback(theFunction, param1, param2);
 * 		This private method will execute this function and pass _api as this and $element as the first param.
 * 
 */

;(function($, window, document, undefined) {
	$.SSolutionTable = function(element, options) {
		var _api = this,
			$element = $(element),
			defaults = {
			};

		_api.settings = {};

		_api.init = function() {
			_api.settings = $.extend(true, {}, defaults, options);
		};

		_api.foo_public_method = function() {
		};

		/**
		 * Executes a callback function if it can be executed.
		 * Passes _api as this and $element as the first parameter.
		 * Any additional parameter passed to this function will be passed to the callback.
		 */
		var _executeCallback = function(callback) {
			if (undefined != callback && typeof callback === 'function') {
				var args = arguments.slice(1);
				args.unshift($element);

				callback.apply(_api, args);
			}
		}
		/**
		 * Triggers an event in the $element.
		 * Automatically appends the 'ssolution-table:' prefix used for all events.
		 * Any additional parameter passed to this function will be passed to the callback.
		 */
		, _trigger = function(event) {
			if (undefined != event && typeof event === 'string') {
				event = 'ssolution-table:' + event;
				var args = arguments.slice(1);
				$element.trigger(event, args);
			}
		};

		_api.init();
	};

	$.fn.ssolutionTable = function(options) {
		return this.each(function() {
			if (undefined == $(this).data('plugin_ssolutionTable'))
				$(this).data('plugin_ssolutionTable', new $.SSolutionTable(this, options));
		});
	};
})(jQuery, window, document);
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

		var foo_private_method = function() {
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
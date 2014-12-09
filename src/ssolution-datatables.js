;(function($, window, document, undefined) {
	$.SSolutionTable = function(element, options) {
		var plugin = this,
			$element = $(element),
			defaults = {
			};

		plugin.settings = {};

		plugin.init = function() {
			plugin.settings = $.extend(true, {}, defaults, options);
		};

		plugin.foo_public_method = function() {
		};

		var foo_private_method = function() {
		};

		plugin.init();
	};

	$.fn.ssolutionTable = function(options) {
		return this.each(function() {
			if (undefined == $(this).data('plugin_ssolutionTable'))
				$(this).data('plugin_ssolutionTable', new $.SSolutionTable(this, options));
		});
	};
})(jQuery, window, document);
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
				url: '',
				httpMethod: 'get',
				rowSelection: 'single',
				cssClasses: {
					selecting: 'ui-selecting',
					selected: 'ui-selected'
				},
				toolButtons: function($table) {
					return undefined;
				},
				filterFields: function($table) {
					return undefined;
				},
				beforeReloadAjax: function($table) {},
				afterReloadAjax: function($table) {},
				serverParams: function($table, params) {
					return params;
				}
			};

		_api.settings = {};

		_api.init = function() {
			_api.settings = $.extend(true, {}, defaults, options);
			_addFnReloadAjaxToDataTables();

			_api.$dataTablesInstance = $element.DataTables({
				// TODO init
			});
		};

		/**
		 * Reloads the table.
		 * Fetchs using the same parameters used for last fetch.
		 */
		_api.reloadAjax = function() {
			_executeCallback('beforeReloadAjax');
			_api.$dataTablesInstance.fnReloadAjax();
			_executeCallback('afterReloadAjax');
		};

		/**
		 * Executes a callback function if it can be executed.
		 * Passes _api as this and $element as the first parameter.
		 * Any additional parameter passed to this function will be passed to the callback.
		 */
		var _executeCallback = function(callback) {
			if (undefined == callback)
				return;

			if (typeof callback === 'string') {
				_executeCallback(_api.settings[callback]);
			} else if (typeof callback === 'function') {
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
		}
		/**
		 * Adds the function fnReloadAjax to the DataTables.
		 */
		, _addFnReloadAjaxToDataTables = function() {
			$.fn.dataTableExt.oApi.fnReloadAjax = function(oSettings, sNewSource, fnCallback, bStandingRedraw) {
				if (typeof sNewSource != 'undefined' && sNewSource != null)
					oSettings.sAjaxSource = sNewSource;

				this.oApi._fnProcessingDisplay(oSettings, true);
				bStandingRedraw = true;
				var that = this;
				var iStart = oSettings._iDisplayStart;
				var aData = [];
				this.oApi._fnServerParams(oSettings, aData);
				oSettings.fnServerData(oSettings.sAjaxSource, aData, function(json) {
					that.oApi._fnClearTable(oSettings);
					var aData = (oSettings.sAjaxDataProp !== "") ? that.oApi
							._fnGetObjectDataFn(oSettings.sAjaxDataProp)(json) : json;
					for ( var i = 0; i < aData.length; i++) {
						that.oApi._fnAddData(oSettings, aData[i]);
					}
					oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
					that.fnDraw();
					if (typeof bStandingRedraw != 'undefined' && bStandingRedraw === true) {
						oSettings._iDisplayStart = iStart;
						that.fnDraw(false);
					}
					that.oApi._fnProcessingDisplay(oSettings, false);
					if (typeof fnCallback == 'function' && fnCallback != null) {
						fnCallback(oSettings);
					}
				}, oSettings);
			};
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
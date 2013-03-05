/**
 * Demo for https://github.com/gserg/simple-gdata-wrapper
 * Import data from spreadsheet list and convert it to the readable format
 * 
 * @author Sergiy Gedeon https://github.com/gserg
 * @version 20130303
 * @license WTFPL
 */

jQuery(document).ready(function ($) {
	'use strict';

	function showSpreadsheet(lines) {
		var line,
			i = 0,
			l = lines.length,
			tpl = '<table>',
			property;

		tpl += '<tr>';
		line = lines[0];
		for (property in line) {
			tpl += '<th>' + property + '</th>';
		}
		tpl += '</tr>';

		for (i = 0; i < l; i += 1) {
			line = lines[i];
			tpl += '<tr>';
			for (property in line) {
				tpl += '<td>' + line[property] + '</td>';
			}
			tpl += '</tr>';
		}
		tpl += '</table>';
		$('#result').append($(tpl));
	}

	$('#get-data').on('click', function (e) {
		var key = $('#key').val(),
			worksheetId = $('#worksheet-id').val();

		e.preventDefault();
		getGDataSpreadsheetList(key, worksheetId, showSpreadsheet);
	});
});

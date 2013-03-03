/**
 * Simple wrapper around the async call to the Google Data Spreadsheet API
 * Import data from spreadsheet list and convert it to the readable format
 * 
 * @author Sergiy Gedeon https://github.com/gserg
 * @version 20130303
 * @license WTFPL
 */

function getGDataSpreadsheetList(key, workSheetId, callback) {
	'use strict';

	function parseSpreadsheet(sheet) {
		var lines = sheet.feed.entry,
			line,
			i = 0,
			l = lines.length,
			j,
			n,
			prefix = 'gsx$',
			property,
			properties = [],
			result = [],
			resLine = {};

		// Grab the structure from first line
		line = lines[i];
		for (property in line) {
			if (property.indexOf(prefix) >= 0) {
				properties.push(property.replace(prefix, ''));
			}
		}

		n = properties.length;
		for (i = 0; i < l; i += 1) {
			line = lines[i];
			resLine = {};
			for (j = 0; j < n; j += 1) {
				property = properties[j];
				resLine[property] = line[prefix + property].$t;
			}
			result.push(resLine);
		}

		return result;
	}

	var url = 'https://spreadsheets.google.com/feeds/list/' + key + '/' + workSheetId + '/public/values?alt=json-in-script',
		request = jQuery.ajax({
			url: url,
			type: 'GET',
			dataType: 'jsonp'
		});

	request.done(function (data) {
		var lines = parseSpreadsheet(data);
		callback(lines);
	});

	request.fail(function (jqXHR, textStatus) {
		alert('Request failed: ' + textStatus);
	});

}

'use strict';

/**
 * @ngdoc overview
 * @name localeUtils
 *
 * TODOs:
 *   - Incorporate improvements for unseen chars (e.g., http://stackoverflow.com/a/3633725/132204)
 *   - Unit tests to verify proper sort order (see link above.)
 */

angular.module('localeUtils', []).

  factory('StringCompareFactory', function() {
    /* Adapted from StackOverflow answer by @mic at http://stackoverflow.com/a/3631861/132204. */

    return function (alphabet) {
      return function (a, b, dir, caseSensitive) {
        var pos = 0,
          min = Math.min(a.length, b.length);

        dir = dir || 1;
        caseSensitive = caseSensitive || false;
        if (!caseSensitive) {
          a = a.toLowerCase();
          b = b.toLowerCase();
        }

        // Skip every character that is equal in the two strings.
        while (a.charAt(pos) === b.charAt(pos) && pos < min) {
          pos++;
        }

        return alphabet.indexOf(a.charAt(pos)) > alphabet.indexOf(b.charAt(pos)) ? dir : -dir;
      };
    };
  }).

  factory('localeCompareFunctions', ['StringCompareFactory', function(StringCompareFactory) {
    return {
      'is': StringCompareFactory('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖaábdðeéfghiíjklmnoóprstuúvxyýþæö')
    }
  }]);
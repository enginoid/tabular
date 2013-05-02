'use strict';

/*
 * TODO:
 *
 * This is very much a work in progress.  Here are some things to do:
 *
 *   - The number of getters and setters in the tabular controller look very
 *     much like the wrong thing to do.
 *
 *   - There needs to be a way to have access to all of the data given to
 *     tabular as an expression separately from the data that is currently
 *     being viewed (to support pagination and filtering).
 *
 *   - The functionality for exporting probably belongs in an altogether separate
 *     module.
 *
 *   - The exporters factory is tightly coupled; adding a new exporter would
 *     require changes to the factory itself.
 *
 *   - It seems this code would be simpler if column names ('column' directive)
 *     were retrieved when they were needed through DOM traversal.  I'm not sure
 *     if that's a very angular thing to do, and it is less efficient.
 *
 *   - Browsers that don't have support for blobs or temporary download handlers
 *     should be gracefully degraded.
 *
 *   - This needs testing, and probably some structural changes to better
 *     support it.
 *
 *   - Is there really no better way to download with a name, than to create a
 *     hidden element and raise a click event on it?
 *
 */

angular.module('angularTable', []).
  directive('tabular', function () {
    return {
      controller: function ($scope) {
        $scope.columns = $scope.columns || [];
        $scope.tabular = {};  // per-plugin config

        this.getItems = function () {
          return $scope.rows;
        };

        this.setItems = function (items) {
          $scope.rows = items;
        };
      },
      link: function (scope, element, attrs, controller) {
        controller.watchExpression = attrs.tabular;
        scope.$watch(controller.watchExpression, function(newValue) {
          controller.setItems(newValue);
        });
      }
    }
  }).

  factory('exporters', function () {
    return {
      csv: function (columnIds, items) {
        var separator = ';',
          newline = '\n',
          lines = [columnIds.join(separator)];

        angular.forEach(items, function (item) {
          var columnValues = [];
          angular.forEach(columnIds, function (columnId) {
            columnValues.push(item[columnId]);
          });
          lines.push(columnValues.join(separator))
        });

        var content = lines.join(newline);
        return new Blob([content], {type: 'application/csv'})
      }
    }
  }).

  directive('hiddenCols', function () {
    return {
      require: 'tabular',
      link: function (scope, element, attrs, ctrl) {
        scope.tabular.hiddenCols = {
          idsObject: {}  // use hash structure for fast lookups
        };

        scope.hiddenCols = scope.columns || {};

        scope.hiddenCols.show = function (columnId) {
          delete scope.tabular.hiddenCols.idsObject[columnId];
        };

        scope.hiddenCols.hide = function (columnId) {
          scope.tabular.hiddenCols.idsObject[columnId] = true;
        };

        scope.hiddenCols.isHidden = function (columnId) {
          return scope.tabular.hiddenCols.idsObject[columnId] || false;
        };

        scope.hiddenCols.toggle = function (columnId) {
          if (this.isHidden(columnId)) {
            this.show(columnId);
          } else {
            this.hide(columnId);
          }
        };

        var hiddenColumnIds = scope.$eval(attrs.hiddenCols);
        angular.forEach(hiddenColumnIds, function (columnId) {
          scope.hiddenCols.hide(columnId);
        });
      }
    }
  }).

  directive('exportable', function ($location, $interpolate, exporters) {
    return {
      require: 'tabular',
      link: function (scope, element, attrs, ctrl) {
        scope.export = function (format, filename) {
          var exporter = exporters[format];

          filename = filename || 'table.'+format;
          if (exporter) {
            var columnIds = [];
            angular.forEach(scope.columns, function(column) {
              columnIds.push(column.id);
            });

            var blob = exporter(columnIds, ctrl.getItems());

            // Constructing a temporary element with an object URL seems to be
            // the only supported way to choose custom filenames.
            var a = document.createElement('a');
            a.href = window.URL.createObjectURL(blob);
            a.download = filename;
            a.click();
          } else {
            window.console && console.log("Export format not found:", format)
          }
        };
      }
    }
  }).

  directive('sortable', function ($filter) {
    return {
      require: 'tabular',
      link: function (scope, element, attrs, ctrl) {
        var ASC_PREFIX = '+',
          DESC_PREFIX = '-',
          orderBy = $filter('orderBy');

        scope.sorting = {};

        var splitExpression = function(expression) {
          expression = expression || '';
          return {
            prefix: expression[0],
            column: expression.substr(1)
          };
        };

        scope.isSortedAsc = function(column) {
          return scope.sorting.expression == DESC_PREFIX + column;
        };

        scope.isSortedDesc = function(column) {
          return scope.sorting.expression == ASC_PREFIX + column;
        };

        scope.sortByExpression = function(expression) {
          ctrl.setItems(orderBy(ctrl.getItems(), expression));
        };

        scope.sort = function (column) {
          var expressionParts = splitExpression(scope.sorting.expression),
            prefix = expressionParts.prefix;

          // To determine sort order, reverse the sort order if sorting the
          // currently sorted column.  Otherwise, use ascending sort as default
          if (expressionParts.column == column) {
            prefix = (prefix == ASC_PREFIX) ? DESC_PREFIX : ASC_PREFIX;
          } else {
            prefix = ASC_PREFIX;
          }

          var expression = prefix + column;

          scope.sorting.expression = expression;
          scope.sortByExpression(expression);
        };

        // We employ a watch event to ensure that whenever the watch
        // expression is changed (the table source data has been changed),
        // we automatically perform sorting again.
        scope.$watch(ctrl.watchExpression, function() {
          scope.sortByExpression(scope.sorting.expression);
        });

        // Initially sort by the string given to the sortable directive.
        if (attrs.sortable) {
          scope.sorting.expression = attrs.sortable;
          scope.sortByExpression(attrs.sortable);
        }

      }
    }
  }).

  /* Allows normal click behavior on anchors. */
  directive('eatClick', function() {
    return function(scope, element, attrs) {
      element.bind('click', function(event) {
        event.preventDefault();
      });
    }
  });

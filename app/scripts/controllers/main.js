'use strict';

angular.module('angularTableApp')
  .controller('MainCtrl', function ($scope) {

    var getLocaleCompare = function (columnName, locale) {
      return function (o1, o2) {
        var v1 = (o1 === undefined) ? '' : o1[columnName];
        var v2 = (o2 === undefined) ? '' : o2[columnName];

        v1 = v1.toLowerCase();
        v2 = v2.toLowerCase();

        return v1.localeCompare(v2, locale);
      }
    };

    $scope.columns = [
      {name: 'Name', id: 'name', sortPredicate: getLocaleCompare('name', 'is')},
      {name: 'E-mail', id: 'email', template: '<a href="mailto:{{row.email}}">{{row.email}}</a>'},
      {name: 'Age', id: 'age'},
      {name: 'Salary', id: 'salary', template: '{{row.salary | currency}}'},
      {name: 'Human', id: 'human', template: function (row) {
        return row.human ? '<i class="icon-ok"></i>' : '<i class="icon-remove"></i>';
      }}
    ];

    $scope.employees = [
      {name: 'Ásgeir', email: 'asgeir@flintstone.me', age: 23, salary: 70000, human: true},
      {name: 'Úlfur', email: 'ulfur@flintstone.me', age: 23, salary: 70000, human: true},
      {name: 'Ívar', email: 'ivar@flintstone.me', age: 23, salary: 70000, human: true},
      {name: 'Arnar', email: 'arnar@flintstone.me', age: 23, salary: 70000, human: true},
      {name: 'Björn', email: 'bjorn@flintstone.me', age: 23, salary: 70000, human: true},
      {name: 'Ægir', email: 'aegir@flintstone.me', age: 21, salary: 72000, human: true},
      {name: 'Þorsteinn', email: 'thorsteinn@flintstone.me', age: 4, salary: 32000, human: false}
    ];
  });

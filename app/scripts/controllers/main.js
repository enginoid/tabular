'use strict';

angular.module('angularTableApp')
  .controller('MainCtrl', function ($scope) {
    $scope.cols = [
      {name: 'Name', id: 'name'},
      {name: 'E-mail', id: 'email'},
      {name: 'Age', id: 'age', hidden: true},
      {name: 'Salary', id: 'salary', hidden: true}
    ];

    $scope.employees = [
      {name: 'Fred', email: 'fred@flintstone.me', age: 23, salary: 70000},
      {name: 'Wilma', email: 'wilma@flintstone.me', age: 21, salary: 72000}
    ];
  });

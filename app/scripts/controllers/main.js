'use strict';

angular.module('angularTableApp')
  .controller('MainCtrl', function ($scope) {
    $scope.columns = [
      {name: 'Name', id: 'name'},
      {name: 'E-mail', id: 'email', template: '<a href="mailto:{{value}}">{{value}}</a>'},
      {name: 'Age', id: 'age'},
      {name: 'Salary', id: 'salary', template: 'value | currency'},
      {name: 'Human', id: 'human'}
    ];

    $scope.employees = [
      {name: 'Fred', email: 'fred@flintstone.me', age: 23, salary: 70000, human: true},
      {name: 'Wilma', email: 'wilma@flintstone.me', age: 21, salary: 72000, human: true},
      {name: 'Dino', email: 'dino@flintstone.me', age: 4, salary: 32000, human: false}
    ];
  });

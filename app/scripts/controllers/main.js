'use strict';

angular.module('angularTableApp')
  .controller('MainCtrl', function ($scope) {
    $scope.employees = [
      {name: 'Fred', email: 'fred@flintstone.me'},
      {name: 'Wilma', email: 'wilma@flintstone.me'},
    ];
  });

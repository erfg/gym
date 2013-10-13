'use strict';

angular.module('gymApp')
  .directive('carousel', function () {
    return {
      restrict: 'C',
      link: function postLink(scope, element, attrs) {
          element.carousel({
              interval: 3500
          });
      }
    };
  });

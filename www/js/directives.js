'use strict';

/* Directives */
angular.module('myApp.directives', [])
    .directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
          elm.text(version);
}}])
.directive('showDiceNum', ['dicenum', function(item) {
                          
                           return function(scope, elm, attrs) {
                          
                           elm.text(version);
                          
                           }}])


(function withAngular(angular) {
    'use strict';

    var ConfigFunction = function($locationProvider, $stateProvider, $urlRouterProvider, hljsServiceProvider) {
            $urlRouterProvider.otherwise("/overview");
            $stateProvider
                .state('overview', {
                    url: "/overview",
                    templateUrl: "https://rawgit.com/codejets/butter/master/app/pages/overview.html"
                })
                .state('components', {
                    url: "/components",
                    templateUrl: "https://rawgit.com/codejets/butter/master/app/pages/components.html"
                })
                .state('download', {
                    url: "/download",
                    templateUrl: "https://rawgit.com/codejets/butter/master/app/pages/download.html"
                });


            hljsServiceProvider.setOptions({
                tabReplace: '    '
            });

        },
        RunFunction = function($rootScope) {
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
              $rootScope.currentState = toState.name;
          });
        },
        HomeController = function HomeController($scope, $location, $window) {

            var that = this,
                hash, setActiveLink = function setActiveLink(link) {
                    console.log(link)
                    that.activeLink = link;
                },
                setActiveSidemenuIndex = function setActiveSidemenuIndex(index) {
                    console.log(index);
                    that.activeSidemenuIndex = index;
                },
                toggleMobileMenu = function toggleMobileMenu(event, toggle) {

                    event.preventDefault();

                    if (toggle) {
                        that.mobileMenu = !that.mobileMenu;
                    }
                };

            if ($location.$$hash) {

                that.activeLink = $location.$$hash;
            } else {
                that.activeLink = 'layout-basics';
            }

            hljs.initHighlightingOnLoad();

            that.setActiveLink = setActiveLink;
            that.setActiveSidemenuIndex = setActiveSidemenuIndex;
            that.toggleMobileMenu = toggleMobileMenu;
        };

    angular.module('butter', [
            'ui.router', 'hljs', 'ngAnimate'
        ])
        .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', 'hljsServiceProvider', ConfigFunction])
        .run(RunFunction)
        .controller('HomeController', ['$scope', '$location', '$window', HomeController])

        .directive("navbar", function() {
            return {
                restrict: "E",
                templateUrl: "https://rawgit.com/codejets/butter/master/app/sections/navbar.html"
            };
        })
        .directive("typo", function() {
            return {
                restrict: "E",
                templateUrl: "https://rawgit.com/codejets/butter/master/app/sections/typo.html"
            };
        });

})(angular);

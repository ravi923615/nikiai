import angular from 'angular';
import angularMeteor from 'angular-meteor';
var num = 0;
angular.module('rssfeedreader',[
    angularMeteor
    ])
    .controller("RssFeedCtrl", ['$scope','$sce','FeedService','$interval', function ($scope,$sce,Feed,$interval) {
        Feed.parseFeed('https://www.reddit.com/.rss').then(function(res){
        $scope.feeds=res.data.responseData.feed.entries;
        $scope.$sce = $sce;
        })
        $scope.date = new Date();
        $scope.counter = 0;
        $scope.callAtInterval = function(){
            $scope.counter = num++;
        }
        $interval(function(){$scope.callAtInterval();},1000);
    }])
    .factory('FeedService',['$http',function($http){
    return {
        parseFeed : function(url){
            return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    }
}]);
function callAtInterval(){
    console.log(num++);
}
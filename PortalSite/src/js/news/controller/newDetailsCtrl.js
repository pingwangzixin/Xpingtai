app.controller('newDetailsCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
	$scope.showNews  = JSON.parse(sessionStorage.getItem('newss'));
	console.log($scope.showNews);
	
	//新闻详情去标签
	var ocontent = document.querySelector('.zy_new_con');
    ocontent.innerHTML = $scope.showNews.content;
    
    
}]);

//新闻展示时间过滤器
app.filter('timeFilter', function() {
	return function(obj) {
		//  	console.log(obj)
		if(obj != undefined) {
			return obj.substr(0, 10);
		} else {
			return;
		}
	}
});
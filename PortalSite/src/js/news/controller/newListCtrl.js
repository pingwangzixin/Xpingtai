app.controller('newListCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', 'templateServer', function($scope, $state, $timeout, $http, $location, $interval, templateServer) {

	//新闻列表 
	$scope.news;
	$http.post(newsIp + "MdjXTeacher/msgcenter/findNewsList.do", {
		json: "{'cpage':1,'pageSize':10,'type':'0'}"
	}).success(function(data) {
		$scope.news = data.resultData;
		console.log($scope.news)
	});

	//查看新闻详情
	$scope.lookMsgInfo = function(newss) {
		console.log(newss);
		sessionStorage.setItem('newss',JSON.stringify(newss));
		$state.go("wrap.new.newDetails");
	}

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
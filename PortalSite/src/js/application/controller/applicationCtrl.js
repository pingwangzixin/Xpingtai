app.controller('applicationCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
	
	//有用户id
	var userId = sessionStorage.getItem('userId') || 0;
	
	//应用切换
	$scope.applicaionState = {
		all : true,
		website : false,
		tool : false,
		game : false
	};
	$scope.applicaionSwitch = function (state){
		angular.forEach($scope.applicaionState,function (v,i){
			$scope.applicaionState[i] = false;
		});
		$scope.applicaionState[state] = true;
	};
	
	//应用{params:}
	$http.get(requireIp + 'jeuc/api/uc/ucMenu?parId=19').success(function (res){
		if(res.ret == 200){
			$scope.application = res.data;
			if(userId){
				angular.forEach($scope.application,function (v,i){
					v.href += '&userId=' + userId;
				});
			}else{
				angular.forEach($scope.application,function (v,i){
					v.href = path + '#/login';
				});
			}
		}
	}).error(function (){
		
	});

}]);
//新闻展示时间过滤器
app.filter('timeFilter',function(){
	return function(obj){
    	return obj.substr(0,10);
	}
});

app.controller('parentInfoCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
	//导航显示小标题
	$scope.navShowDet = {
		title : '个人设置',
		ifShow : false
	};
	
	//导航切换
	$scope.personalInfoState = 0;
//	$scope.personalInfoState = $stateParams.status;
	$scope.personalInfoTab = function (i){
		$scope.personalInfoState = i;
	};
	
	$scope.state={
		add_zinv:false,
	}
	

}]);


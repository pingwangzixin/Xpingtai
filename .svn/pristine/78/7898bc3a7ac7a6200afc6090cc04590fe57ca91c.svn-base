app.controller('regStrCtrl',['$scope','$state','$timeout','$http','$location','$interval','$stateParams','IDCheck',function($scope,$state,$timeout,$http,$location,$interval,$stateParams,IDCheck) {
	//导航显示小标题
	$scope.navShowDet = {
		title : '注册',
		ifShow : false
	};
	
	//导航切换
	$scope.personalInfoState = $stateParams.status;
	$scope.personalInfoState = $stateParams.status;
	$scope.personalInfoTab = function (i){
		$scope.personalInfoState = i;
	};
	
	//民族
	$http.get("file/nation.json").success(function (data) {
        $scope.nations = data.data;
        console.log( $scope.nations )
    });
	
	
	
}]);


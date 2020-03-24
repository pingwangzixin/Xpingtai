app.controller('managerInfoCtrl',['$scope','$state','$timeout','$http','$location','$interval','$stateParams','IDCheck',function($scope,$state,$timeout,$http,$location,$interval,$stateParams,IDCheck) {
	//导航显示小标题
	$scope.navShowDet = {
		title : '个人设置',
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
	
	//用户信息
	$scope.userInfo = {
		userName : '',
		userMobile : '',
		userId : '',
		userNation : '',
		userEmail : ''		
	};
	
//	console.log(IDCheck.checkID('150104198902210147'))
	//身份证号验证
	$scope.checked = IDCheck.checkID;
	
	//
	$scope.selectChange = function (n){
		console.log(n)
	};
	
}]);


app.controller('regAdminCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
	//导航显示小标题
	$scope.navShowDet = {
		title : '注册',
		ifShow : false
	};
	
	$scope.state={
		addGroup:false,
	}
	
	$scope.xuanze=true;
	$scope.tianjia=false;
	$scope.qiehuan="xz"
	//导航切换
	$scope.personalInfoState = 0;
//	$scope.personalInfoState = $stateParams.status;
	$scope.personalInfoTab = function (i){
		$scope.personalInfoState = i;
	};
	
	$scope.test=function(){
		if($scope.qiehuan=="xz"){
			$scope.xuanze=true;
			$scope.tianjia=false;
		}
		if($scope.qiehuan=="add"){
			$scope.xuanze=false;
			$scope.tianjia=true;
		}
	}
	
}]);


app.controller('roleCtrl',['$scope','$state','$timeout','$http','$location','$q','$rootScope',function($scope,$state,$timeout,$http,$location,$q,$rootScope) {
	
	//导航显示小标题
	$scope.navShowDet = {
		title : '系统管理',
		ifShow : false
	};
	
	//新增、删除、编辑按钮 、编辑框标题
	$scope.operationGroup = {
		add : false,
		delete : false,
		edit : false,
		roleTit : false
	};
    

	//配置权限
	$scope.rangeAcitive = false;
	$scope.range = [{id : '9',name : '课程中心'},{id : '7',name : '学情分析'},{id : '5',name : '门户管理'},{id : '4',name : '用户中心'},];
	
	//管辖范围
    $scope.jurisdictionSelected = '1238';
	$scope.jurisdiction = [{id : '1234',name : '小学'},{id : '1235',name : '初中'},{id : '1236',name : '城区'},{id : '12374',name : '县城'},{id : '1238',name : '省省省省省'}];
    
    //配置角色用户信息列表
    $scope.roleusers=[
        {"id":"1","name":"张三","rolerange":"小学","remakes":"这是备注啊"},{"id":"2","name":"李四","rolerange":"初中","remakes":"这是备注啊"},
    ]
    

}]);

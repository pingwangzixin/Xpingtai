
app.controller('wrapCtrl',['$scope','$state','$timeout','$http','$location','$q','$rootScope','templateServer',function($scope,$state,$timeout,$http,$location,$q,$rootScope,templateServer) {
		//是否登录
		/*$scope.$on('loggedIn',function (event,data){
			$scope.loggedIn = data;
		});*/
		$scope.userLoggedMsg = {};
		console.log(sessionStorage.getItem('userId'))
		var userId = sessionStorage.getItem('userId') || '';
		var userName = '';
		if(userId){
			$scope.loggedIn = true;
			$http.get(requireIp + 'jeuc/api/uc/ucUser/'+userId+'/1').success(function(data) {
				console.log(data);
				if(data.ret==200){
					$scope.userLoggedMsg = data.data.userInfo;
					console.log($scope.userLoggedMsg)
					$scope.userLoggedMsg.surname = $scope.userLoggedMsg.realname.substring(0,1);
					userName = $scope.userLoggedMsg.loginName;
				}
			}).error(function (){
				
			});
		}
		
		//退出登录
		$scope.loginOut = function (){
			$scope.loggedIn = false;
			sessionStorage.clear();
			$state.go('wrap.index',null,{reload:true})
			
		};
		
		//导航栏
		$scope.pcColumn = templateServer.serColumn;
		$scope.$on('column',function(data){
			$scope.pcColumn = templateServer.serColumn;
			console.log($scope.pcColumn)
		});
		
		//logo
		$scope.pcLogo = templateServer.serLogoBox;
		console.log($scope.pcLogo)
		
		//门户管理是否显示
		$scope.showAdmin = false;
		$scope.$on('adminShow', function(event, data) {  
	        console.log(event,data)
	        $scope.showAdmin = data;
		});
		
		//角色
		$scope.roles = [
			{name : '任课教师',checked : false},
			{name : '班主任',checked : false},
			{name : '学校管理员',checked : false}
		];
		
		//门户管理按钮
		$scope.adminBtn = false;
		$scope.roleSwitch = function(i){
			$scope.adminBtn = false;
			angular.forEach($scope.roles,function (e,i){
				e.checked = false;
			});
			$scope.roles[i].checked = true;
			if($scope.roles[i].name.indexOf('管理员') != -1){
				$scope.adminBtn = $scope.roles[i].checked ? true : false;
			}
		};
		
		//跳转个人账户
		$scope.myAccount = function (){
			window.location.href = 'http://111.207.13.88:8881/jeuc-web/#/teacher_index/teacher_center' + '?username=' + userName;
		};
		
}]);

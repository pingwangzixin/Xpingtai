app.controller('wrapCtrl',['$scope','$state','$timeout','$http','$location','$q','$rootScope',function($scope,$state,$timeout,$http,$location,$q,$rootScope) {
//	console.log($rootScope.token)
	
	
//	sessionStorage.setItem("user", '{
//  "ret": "1",
//  "teacherInfo": {
//      "teaSchoolId": "3227ad2507984a3db22c8c41cf673c8d",
//      "teaTel": "15100001111",
//      "teaPassword": "14e1b600b1fd579f47433b88e8d85291",
//      "teachingInfo": {},
//      "teaRole": "班主任,",
//      "teaEmail": "163@163.com",
//      "teaName": "张三",
//      "teaIdCard": "100000200006090000",
//      "teaGold": "teaGold",
//      "teaSex": "女",
//      "teaIfGive": "否",
//      "teaHomePage": "",
//      "teaId": "1e9e558ed46c4c17a0e49bb1cf87b1d4",
//      "teaAdmin": "",
//      "schoolName": "福海县初级中学",
//      "schoolArea": "福海县",
//      "teaTitle": "teaTitle",
//      "teaPoint": "teaPoint"
//  },
//  "message": "1",
//  "userRole": "tea",
//  "userId": "tea_1e9e558ed46c4c17a0e49bb1cf87b1d4"
//}');//用户信息存放session
	
//	var teaid = JSON.parse(sessionStorage.getItem("user"));
	
	
	//个人信息       
	$scope.personalMsg = {};
	var token = $location.$$search.token;
	if(token == null || token == "" || token == undefined){
		token = sessionStorage.getItem('token');
	}else{
		sessionStorage.setItem('token',token);
	}
//	sessionStorage.setItem('token',token);
	var url = jeucIp+"Api/UserInfo/getUser?token="+token+"&clientId="+id+"&clientSecret="+clientSecret;
//	var url = "http://192.168.9.98:8080/jeuc/Api/UserInfo/getTea?teaIdCard=100000200006090000"
	$http.get(url).success(function(res){
		if(res.ret != "1"){
			return ;
		}
		if(res.userRole == "tea"){
			sessionStorage.setItem("user",JSON.stringify(res.teacherInfo));
			$scope.personalMsg.name = res.teacherInfo.teaName;
			$scope.personalMsg.role = res.teacherInfo.teaRole;
			$scope.personalMsg.school = res.teacherInfo.schoolName;
			if(!$.isEmptyObject(res.teacherInfo.teachingInfo)){
				$scope.personalMsg.class = res.teacherInfo.teachingInfo[1].subStages;
			}
		}else{
			sessionStorage.setItem("user",JSON.stringify(res.studentInfo));
			$scope.personalMsg.name = res.studentInfo.stuName;
			$scope.personalMsg.role = "学生";
			$scope.personalMsg.school = res.studentInfo.stuClassInfo.schoolName;
			$scope.personalMsg.class= res.studentInfo.stuClassInfo.subStages
		}
		
		$scope.$broadcast('usertype',res.userRole)
		sessionStorage.setItem("type",res.userRole);
		$rootScope.userType = res.userRole;
		console.log($rootScope.userType);
	    $scope.showNav = res.userRole == 'tea' ? $scope.showNav =  true: $scope.showNav = false;
		
	});



	//退出
	$scope.logout = function(){
//		sessionStorage.removeItem("user");
		sessionStorage.clear();
		location.href = 'http://z.uuke.com.cn';
//		history.go(1); 
//		window.history.forward(1); 
//		$state.go('wrap.index');
	};
	
}]);

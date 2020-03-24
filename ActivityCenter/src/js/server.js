
var requireIp = 'http://116.255.134.2:8180/jyzx/';
var resourceIp = 'http://116.255.134.2:8180/';
var jeucIp='http://116.255.134.2:8082/jeuc/';
var commonFileUrl ="D:";
//var requireIp = 'http://localhost:8080/CourseCenter/';

//var jeucIp = 'http://192.168.9.98:8080/jeuc/';
//var resourceIp = 'http://localhost:8081/';
//var requireIp = 'http://localhost:8081/jyzx/';
//var resourceIp = 'http://116.255.134.2:8180/jyzx/';
//
/*app.service('perService',['$http','$timeout','$location',function($http,$timeout,$location) {
	console.log(id)
	console.log(clientSecret)
	var _this = this;
	_this.personalMsg = {};
	debugger;
	var token = $location.$$search.token;
	var url = jeucIp+"Api/UserInfo/getUser?token="+token+"&clientId="+id+"&clientSecret="+clientSecret;
	sessionStorage.setItem('token',token);
	$http.get(url).success(function(res){
		console.log(res)
		if(res.ret != "1"){
			return ;
		}
		if(res.userRole == "tea"){
			sessionStorage.setItem("user",JSON.stringify(res.teacherInfo));
			_this.personalMsg.name = res.teacherInfo.teaName;
			_this.personalMsg.role = res.teacherInfo.teaRole;
			_this.personalMsg.school = res.teacherInfo.schoolName;
			if(!$.isEmptyObject(res.teacherInfo.teachingInfo)){
				_this.personalMsg.class = res.teacherInfo.teachingInfo[1].subStages;
			}
		}else{
			sessionStorage.setItem("user",JSON.stringify(res.studentInfo));
			_this.personalMsg.name = res.studentInfo.stuName;
			_this.personalMsg.role = "学生";
			_this.personalMsg.school = res.studentInfo.stuClassInfo.schoolName;
			_this.personalMsg.class= res.studentInfo.stuClassInfo.subStages
		}
		debugger;
		sessionStorage.setItem("type",res.userRole);
		userType = res.userRole;
		console.log(userType);
	});

}]);*/
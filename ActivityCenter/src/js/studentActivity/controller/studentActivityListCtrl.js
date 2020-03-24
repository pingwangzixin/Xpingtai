app.controller('studentActivityListCtrl',['$scope','$state','$timeout','$http','$location',function($scope,$state,$timeout,$http,$location) {
	var user = sessionStorage.getItem("user");
	user = JSON.parse(user);
	var stuId = user.stuId;
	$http.get(requireIp+"activity/activitycenter/findStuActivity?stuId="+stuId).success(function(res){
		console.log(res);
		if(res.code != 200){
			return ;
		}
		var newData =[];
		angular.forEach(res.data, function(data,i,array){
			//data等价于array[index]
			var newActivity = {};
			if(data.xsstate == 0){
				newActivity.state = "未开始";
				newActivity.class ="zy_not_begin";
			}else if(data.xsstate == 1){
				newActivity.state = "进行中";
				newActivity.class ="zy_be_underway";
			}else {
				newActivity.state = "已结束";
				newActivity.class ="zy_is_over";
			}
			if(data.activity_state == 2){
				newActivity.state = "已结束";
				newActivity.class ="zy_is_over";
			}
				newActivity.id = data.activity_id;
			if(!$.isEmptyObject(data.activity_file)){
				newActivity.src = resourceIp+"resource/"+data.activity_file.substring(0,data.activity_file.lastIndexOf("/")-1);
			}else{
				newActivity.src = "./img/test1.jpg";
			}
			
			newActivity.cont = data.activity_deman;
			newActivity.title = data.activity_name;
			newActivity.time = data.activity_startdate.substring(0,10) +"~" +data.activity_enddate.substring(0,10);
			newData.push(newActivity);
		});
		console.log(newData)
	$scope.activityList= newData;
})
}]);


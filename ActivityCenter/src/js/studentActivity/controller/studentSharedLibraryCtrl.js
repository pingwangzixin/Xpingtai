 app.controller('studentSharedLibraryCtrl',['$scope','$state','$timeout','$http','$location',function($scope,$state,$timeout,$http,$location) {
	//分享列表
	
	
	$http.get(requireIp+"activity/activitycenter/findStudentSharedLibrary").success(function(res) {
	    console.log(res);
	    if(res.code==200){
	    	var newData =[];
	    	angular.forEach(res.data, function(data,i,array){
				//data等价于array[index]
				var newActivity = {};
				switch (data.activityType){
					case 1:
						newActivity.type = "生命教育";
						newActivity.class = "zy_education";
						break;
					case 2:
						newActivity.type = "习惯养成";
						newActivity.class = "zy_habit";
						break;
					case 3:
						newActivity.type = "法律法规";
						newActivity.class = "zy_law";
						break;
					case 4:
						newActivity.type = "思想品德";
						newActivity.class = "zy_character";
						break;
					default:
						newActivity.type = "其他";
						newActivity.class = "zy_other";
						break;
				}
				newActivity.id = data.activityId;
				newActivity.delete = true;
				if(!$.isEmptyObject(data.activityFile)){
					newActivity.src = resourceIp+"resource/"+data.activityFile.substring(0,data.activityFile.lastIndexOf("/")-1);
				}else{
					newActivity.src = "./img/test1.jpg";
				}
				newActivity.cont = data.activityDeman;
				newActivity.title = data.activityName;
				newActivity.time = data.activityStartdate +"~" +data.activityEnddate;
				newData.push(newActivity);
			});
			$scope.shareList = newData;
	    }
	   	console.log($scope.shareList);
	});
	
	
}]);


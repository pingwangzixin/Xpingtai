app.controller('myShareCtrl',['$scope','$state','$timeout','$http','$location',function($scope,$state,$timeout,$http,$location) {
	var user = sessionStorage.getItem("user");
	user = JSON.parse(user);
	var teaId = user.teaId;
	var teaRole =user.teaRole;
//	var teaRole =user.teaRole.substring(0,user.teaRole.length-1);

	$http.get(requireIp+"activity/activitycenter/findShare?teacherId="+teaId+"&roleName="+teaRole).success(function(res){
		console.log(res);
		if(res.code != 200){
			return ;
		}
		
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
		console.log(newData)
		$scope.myShareList= newData;
	});
	
	//活动删除
	$scope.deleteActivity = {
		popup : false,
		tip : false,
		tipWord : '',
		tipSrc : '',
		removeTar : null,
		id:'',
		flag:null
	};
	//删除按钮
	$scope.deleteBtn = function (tar,activityId){
		console.log(activityId);
		$scope.deleteActivity.activityId = activityId;
		$scope.deleteActivity.popup = true;
		$scope.deleteActivity.removeTar = angular.element(tar.target).parents('li');
	};
	
	//确认删除
	$scope.deleteSureBtn = function (){
		if($scope.deleteActivity.activityId == ''){
			return ;
		}
		var url = requireIp+"activity/activitycenter/del/"+$scope.deleteActivity.activityId+"?activityShared=1";
		
		console.log(url)
		$http.delete(url).success(function(res){
			console.log(res);
		});
		$scope.deleteActivity.popup = false;
		
//		angular.element(tar.target).parents('li').remove();
		$scope.deleteActivity.removeTar.remove();
		$scope.deleteActivity.tipWord = '删除成功';
		$scope.deleteActivity.tipSrc = 'succeed';
		$scope.deleteActivity.tip = true;
		$timeout(function (){
			$scope.deleteActivity.tip = false;
		},2000);
		
	};
}]);



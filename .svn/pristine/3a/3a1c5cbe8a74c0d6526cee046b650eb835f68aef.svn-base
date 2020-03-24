app.controller('myShareDetailCtrl',['$scope','$state','$timeout','$http','$location','$stateParams','$rootScope',function($scope,$state,$timeout,$http,$location,$stateParams,$rootScope) {
	console.log($stateParams.activityId);
	var user = sessionStorage.getItem("user");
	user = JSON.parse(user);
	var teaId = user.teaId;
	var teaRole =user.teaRole;
//	var teaRole =user.teaRole.substring(0,user.teaRole.length-1);
	var userRole = sessionStorage.getItem("type");
	//我的共享详情
	$scope.myShareDetail = {};
	$http.get(requireIp+"activity/activitycenter/findActivityCenter?activityId="+$stateParams.activityId).success(function(data) {
	    console.log(data);
		$scope.great = data.data.great;
		$scope.activityDetail=data.data.activityCenter;
	    if(data.code==200){
	     	if(!$.isEmptyObject(data.data.activityCenter.activityFile)) {
  				data.data.activityCenter.activityFile = resourceIp + "resource/" + data.data.activityCenter.activityFile.substring(0, data.data.activityCenter.activityFile.lastIndexOf("/") - 1);
  				console.log(data.data.activityCenter.activityFile)
	     	} else {
				data.data.activityCenter.activityFile = "./img/test1.jpg";
			}
  			//状态判断隐藏按钮
			if($scope.activityDetail.activityState==2){
				   	$scope.mastersummary=$scope.activityDetail.assignMastersummary;
				   	$("textarea").attr("readonly","readonly");//输入框不可用
				   	$scope.hidebtn=true;
			}
			$scope.myShareDetail = data.data.activityCenter;
			if(data.data.activityCenter.assignMastersummaryFile !="" && data.data.activityCenter.assignMastersummaryFile != null){
		    	var  amfile =data.data.activityCenter.assignMastersummaryFile ;
				var suffix = amfile.substring(amfile.lastIndexOf("."),amfile.lastIndexOf("/")-1);
		     	var relName =  amfile.substring(amfile.lastIndexOf("/")+1);
		        var filen = relName+suffix;
		        var oName = amfile.substring(0,amfile.lastIndexOf("/")-1)
				$scope.edit_file= relName;
				$scope.filedownload=requireIp+"/teacher/upload/downloadByPath.do?fileName="+filen+"&oName="+oName;
				if(relName !=""){
		    		$scope.deIsShowImg=true;//已上传文件显示
		    	}
			}
		}
	});
//	$scope.myShareList = [];
	//提交评论
	$scope.subBtn = function (){
		if($scope.commentContext==null||$scope.commentContext==""){
			$scope.myshow=true;
	 		$scope.tctips="请填写评论内容"
	 		$timeout(function(){
	 			$scope.myshow=false;
	 		},1000)
		}else{
//			$scope.myShareList.push({'commentContext' : $scope.commentContext});
//			console.log($scope.myShareList)
			$http({    
	            method: "POST",    
	            url: requireIp+"activity/activitycenter/saveOrReplay",    
	            data: {activityCenterId:$stateParams.activityId,commentContext:$scope.commentContext,
	            	commentUserId:teaId,commentUsername:user.teaName,commentUserType:userRole,
	            	commentSchool:user.schoolName},
		        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  
			}).success(function (data){
			 	console.log(data);
			 	if(data.message=="已有评论"){
			 		$scope.myshow=true;
			 		$scope.tctips="您已经评论过了"
			 		$timeout(function(){
			 			$scope.myshow=false;
			 		},1000)
			 	}else{
			 		$timeout(function(){
					 	location.reload();
					},1500)
			 	}
			 	 
			});
		}
	};
//	$scope.myShareList = [];
	//查询活动评论commentUsername  $scope.name
	$http.get(requireIp+"activity/activitycenter/findActivityCommentList?activityCenterId="+$stateParams.activityId).success(function(data){
		console.log(data)
//		console.log(data.data.list[0].commentUsername)
		if(data.code != 200){
			return ;
		}
		var newData =[];
		angular.forEach(data.data.list, function(data,i,array){
			var newActivity = {};
			if(data.commentUserType=="tea"){
				data.commentUserType= "教师";
			}else if(data.commentUserType=="stu"){
				data.commentUserType= "学生";
			}else if(data.commentUserType=="parent"){
				data.commentUserType= "家长";
			}
			
			newActivity.commentUserType = data.commentUserType;
			newActivity.commentUsername = data.commentUsername;
			newActivity.commentTime = data.commentTime;
			newActivity.commentContext = data.commentContext;
			newActivity.commentSchool = data.commentSchool;
			if(!$.isEmptyObject(data.userFace)) {
	    		newActivity.userFace = data.userFace;
	    	} else {
	    		data.userFace = "./img/test1.jpg";
	    		newActivity.userFace = data.userFace;
	    	}
			console.log(newActivity.userFace)
			newData.push(newActivity);
		});
		$scope.myShareList= newData;
		console.log(newData)
	});
}]);

app.filter('activityStateFilter',function(){
    return function(obj){
    	if(obj==0){
    		return "未开始";
    	}else if(obj==1){
    		return "进行中";
    	}else if(obj==2){
    		return "已结束";
    	}
    }
});
app.filter('activityType',function(){
    return function(obj){
    	if(obj=="tea"){
			return "教师";
		}else if(obj=="stu"){
			return "学生";
		}else if(obj=="parent"){
			return "家长";
		}
    }
});
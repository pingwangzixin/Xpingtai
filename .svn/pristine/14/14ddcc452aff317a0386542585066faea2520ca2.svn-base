app.controller('sharedLibraryDetailCtrl',['$scope','$state','$timeout','$http','$location','$stateParams','$rootScope',function($scope,$state,$timeout,$http,$location,$stateParams,$rootScope) {
console.log($stateParams.activityId);
var user = sessionStorage.getItem("user");
user = JSON.parse(user);
var teaId = user.teaId;
var teaRole =user.teaRole;
//	var teaRole =user.teaRole.substring(0,user.teaRole.length-1);
var userRole = sessionStorage.getItem("type");
$scope.ifLike = {
	like : false,
	likedTip : '赞一下',
	likedNum : 0
}
	//共享详情
	$scope.sharedLibraryDetail = {};
	$scope.activityComment = {};
	$http.get(requireIp+"activity/activitycenter/findActivityCenter?activityId="+$stateParams.activityId+"&userId="+teaId).success(function(data) {
		console.log(requireIp+"activity/activitycenter/findActivityCenter?activityId="+$stateParams.activityId+"&userId="+teaId);
	    console.log(data);
	    $scope.ifLike.likedNum = data.data.great;
	    $scope.activityComment = data.data.activityComment;
	    $scope.activityDetail=data.data.activityCenter;
	    if($scope.activityComment.great==0 || $scope.activityComment.great=="" || $scope.activityComment.great==null){
    		$scope.ifLike.like = false;
    		$scope.ifLike.likedTip = '赞一下';
    	}else{
    		$scope.ifLike.like = true;
    		$scope.ifLike.likedTip = '取消赞';
    	}
    	//状态判断隐藏按钮
		if($scope.activityDetail.activityState==2){
			   	$scope.mastersummary=$scope.activityDetail.assignMastersummary;
			   	$("textarea").attr("readonly","readonly");//输入框不可用
			   	$scope.hidebtn=true;
		}
	    if(data.code==200){
	    	if(!$.isEmptyObject(data.data.activityCenter.activityFile)) {
    		data.data.activityCenter.activityFile = resourceIp + "resource/" + data.data.activityCenter.activityFile.substring(0, data.data.activityCenter.activityFile.lastIndexOf("/") - 1);
    	} else {
    		data.data.activityCenter.activityFile = "./img/test1.jpg";
    	}
			$scope.sharedLibraryDetail=data.data.activityCenter;
	    }
	   
	});
	//提交评论
	$scope.subBtn = function (){
		if($scope.commentContext==null||$scope.commentContext==""){
			$scope.myshow=true;
	 		$scope.tctips="请填写评论内容"
	 		$timeout(function(){
	 			$scope.myshow=false;
	 		},1000)
		}else{
			$http({    
		            method: "POST",    
		            url: requireIp+"activity/activitycenter/saveOrReplay",    
		            data: {activityCenterId:$stateParams.activityId,commentContext:$scope.commentContext,
		            	commentUserId:teaId,commentUsername:user.teaName,commentUserType:
		            	userRole,commentSchool:user.schoolName},
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
//					 	$state.go('wrap.share.sharedLibrary');
						location.reload();
					 },1500)
			 	}
			 });
		}
	};

	
	$scope.dianZan = function(){
		//活动id
		$scope.activityComment.activityCenterId = $stateParams.activityId
		$scope.activityComment.userId = teaId;
//		$scope.activityComment.userName = user.teaName;
		$scope.activityComment.userType = userRole;
		$scope.activityComment.commentSchool = user.schoolName;
		var great = $scope.activityComment.great;
		if($scope.activityComment.great==0 || $scope.activityComment.great=="" || $scope.activityComment.great==null){
			$scope.activityComment.great = 1;
		}else{
			$scope.activityComment.great = 0;
		}
		console.log($scope.activityComment);
		
		$http.post(requireIp+"activity/activitycenter/updateActivityCommentGreat", $scope.activityComment).success(function(data) {
			console.log(data);
			if(data.code==200){
				//成功
				console.log("success");
				$scope.ifLike.likedNum = data.data.great;
		    }else{
		    	//失败
		    	console.log("error");
				$scope.activityComment.great = great;
		    }
			if($scope.activityComment.great==0 || $scope.activityComment.great=="" || $scope.activityComment.great==null){
	    		$scope.ifLike.like = false;
	    		$scope.ifLike.likedTip = '赞一下';
	    	}else{
	    		$scope.ifLike.like = true;
	    		$scope.ifLike.likedTip = '取消赞';
	    	}
		});
	}

//查询活动评论
	console.log(user.teaName)
	$http.get(requireIp+"activity/activitycenter/findActivityCommentList?activityCenterId="+$stateParams.activityId).success(function(data){
		console.log(data)
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
			
			newData.push(newActivity);
		});
		console.log(newData)
		$scope.myShareList= newData;
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

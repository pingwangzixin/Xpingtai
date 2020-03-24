app.controller('studentSharedLibraryDetailCtrl',['$scope','$state','$timeout','$http','$location','$stateParams','$rootScope',function($scope,$state,$timeout,$http,$location,$stateParams,$rootScope) {
	var user = sessionStorage.getItem("user");
	user = JSON.parse(user);
	console.log(user)
	var stuType = sessionStorage.getItem("type");
	var stuId = user.stuId;
	var stuName = user.stuName;
	var schoolName = user.stuClassInfo.schoolName;
	$scope.ifLike = {
		like : false,
		likedTip : '赞一下',
		likedNum : 0
	}
	
	//提交评论
	$scope.review = {
		submitBtn : false,
		sureSubmitBtn : false,
		tipSrc : '',
		sureTip : '',
		btnNone : false,
		ifEdit : false
	}

	
	console.log($stateParams)
	$scope.activityDetail = {};
	$scope.activityComment = {};
	$http.get(requireIp+"activity/activitycenter/findStudentSharedLibraryDetail?activityId="+$stateParams.activityId+"&userId="+stuId).success(function(data) {
	    console.log(data);
	    if(data.code==200){
	   		if(!$.isEmptyObject(data.data.activityCenter.activityFile)){
				data.data.activityCenter.activityFile = resourceIp+"/resource/"+data.data.activityCenter.activityFile.substring(0,data.data.activityCenter.activityFile.lastIndexOf("/")-1);
			}else{
				data.data.activityCenter.activityFile = "./img/test1.jpg";
			}
			$scope.activityDetail = data.data.activityCenter;
			$scope.activityComment = data.data.activityComment;
	    	$scope.ifLike.likedNum = data.data.great;
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
	    	if(!$.isEmptyObject($scope.activityComment.context) || $scope.activityDetail.activityState == 2){
	    		console.log(56456)
	    		$scope.review.submitBtn = false;
		    	$scope.review.btnNone = true;
		    	$scope.review.ifEdit = true;
	    	}
	    }
	});
	
	
	$scope.cliclLike = function (){
		//活动id
		$scope.activityComment.activityCenterId = $stateParams.activityId
		$scope.activityComment.userId = stuId;
		$scope.activityComment.userName = stuName;
		$scope.activityComment.userType = stuType;
		$scope.activityComment.commentSchool = schoolName;
		console.log(stuId+stuName+schoolName+stuType)
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
		});
		if($scope.activityComment.great==0 || $scope.activityComment.great=="" || $scope.activityComment.great==null){
			$scope.ifLike.like = false;
			$scope.ifLike.likedTip = '赞一下';
		}else{
			$scope.ifLike.like = true;
			$scope.ifLike.likedTip = '取消赞';
		}
	};
	
	//提示
	function tipsFn(word,src){
		$scope.review.sureSubmitBtn = true;
		$scope.review.tipSrc = src;
		$scope.review.sureTip = word;
		
		$timeout(function (){
	    	$scope.review.sureSubmitBtn = false;
	    },2000);
	}
	
	
	//显示是否提交评论
	$scope.submitReview = function (){
		$scope.review.submitBtn = true;
	};
	//评论
	$scope.sureSubmintReview = function (){
		//评论内容
		console.log($scope.activityComment.context);
		//活动id
		$scope.activityComment.activityCenterId = $stateParams.activityId
		$scope.activityComment.userId = stuId;
		$scope.activityComment.userName = stuName;
		$scope.activityComment.userType = stuType;
		$scope.activityComment.commentSchool = schoolName;
		console.log(stuId+stuName+schoolName+stuType)
		console.log($scope.activityComment);
		$http.post(requireIp+"activity/activitycenter/updateActivityCommentContext", $scope.activityComment).success(function(data) {
			console.log(data);
			if(data.code==200){
		    	//成功
		    	$scope.review.submitBtn = false;
		    	$scope.review.btnNone = true;
		    	$scope.review.ifEdit = true;
		    	tipsFn('提交成功','succeed');
		    }else{
		    	//失败
		    	$scope.review.submitBtn = false;
		    	tipsFn('提交失败','filed');
		    }
		});
		
	};
	
	
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
app.controller('activityDetailCtrl',['$scope','$state','$timeout','$http','$location','$stateParams','$rootScope',function($scope,$state,$timeout,$http,$location,$stateParams,$rootScope) {
	$scope.deIsShowImg=false;//已上传文件隐藏
	$scope.xzIsShowImg = false;//上传选择图片已上传隐藏
	console.log($stateParams.activityId);
	//活动详情
	$scope.activityDetail = {};
	//分享
	$scope.ifShare = {
		share : false,
		shareTip : '分享',
		likedNum : 0
	};
	$http.get(requireIp+"activity/activitycenter/findActivityCenter?activityId="+$stateParams.activityId).success(function(data) {
	    console.log(data);
	   if(data.code==200){
	   		if(!$.isEmptyObject(data.data.activityCenter.activityFile)){
				data.data.activityCenter.activityFile = resourceIp+"resource/"+data.data.activityCenter.activityFile.substring(0,data.data.activityCenter.activityFile.lastIndexOf("/")-1);
			}else{
				data.data.activityCenter.activityFile = "./img/test1.jpg";
			}
	    	$scope.activityDetail=data.data.activityCenter;
	    	console.log(data.data.activityCenter);
	    	if(data.data.activityCenter.activityShared == "1"){
	    		$scope.ifShare.share = true;
	    		$scope.ifShare.shareTip = '取消分享';
	    	}else{
	    		$scope.ifShare.share = false;
	    		$scope.ifShare.shareTip="分享"  ;
	    	}
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
        //状态判断隐藏按钮
		if($scope.activityDetail.activityState==2){
			   	$scope.mastersummary=$scope.activityDetail.assignMastersummary;
			   	console.log($scope.activityDetail.assignMastersummary+'----------------------')
			   	console.log($scope.activityDetail.activityState+'---------------------');
			   	$("#isshow").attr("readonly","readonly");//教师总结活动输入框不可用
			   	$scope.hidebtn=true;
		}
	   	console.log($scope.activityDetail);
	   	/*if($scope.activityDetail.activityState==0){
	   		$scope.ifShare.share = false;
	   	}else{
	   		$scope.ifShare.share = true;
	   	}*/
	});
	
	$scope.clickShare = function (){
		var share = 1;
		if($scope.ifShare.share){
			share = 0;
		}
		$http.post(requireIp+"activity/activitycenter/updateActivityShared", {activityId:$stateParams.activityId,shared:share}).success(function(data) {
			console.log(data);
			if(data.code==200){
				//成功
				if($scope.ifShare.share){
					$scope.ifShare.share = false;
					$scope.ifShare.shareTip = '分享';
				}else{
					$scope.ifShare.share = true;
					$scope.ifShare.shareTip = '取消分享';
				}
		    }else{
		    	//失败
		    	console.log("error");
				$scope.activityComment.great = great;
		    }
		});
		
	}
	
	//学生完成情况
	$scope.studentType = 0;
	$scope.switchStudentType = function (i){
		$scope.studentType = i;
	};
	
	$scope.styudentCompletion = {};
	$http.get(requireIp+"activity/activitycenter/getStyudentCompletion?activityId="+$stateParams.activityId).success(function(data) {
	    console.log(data);
	    if(data.code==200){
	    	$scope.styudentCompletion=data.data;
	    }
	   	console.log($scope.styudentCompletion);
	});
	
	//上传
    $scope.upload = function (e) {
            var fd = new FormData();
            var file = $('#file')[0].files[0];
            fd.append("filename", file);
            console.log(fd);
         
            fd.append("id", "tea_470_13110");
           $http({     
	                method:'POST',
	                url:requireIp+"activity/activitycenter/uploadImage",
	                data: fd,
                    headers: {'Content-Type':undefined},
	               transformRequest: angular.identity 
	               }).success( function ( data ){
                    console.log(data)
                    if(data.code == 200){
                        $scope.imgUrl = data.data.imgUrl; 
                           $scope.imgName2 = file.name; 
                           $scope.xzIsShowImg = true;//选择成功显示
                   }else{
                        
                  }
                
	           }).error(function(e){
	           		console.log(e)
	           })
        }
    
    
    
    $scope.submitActivity = {
		popup : false,
		tip : false,
		tipWord : '',
		tipSrc : ''
	};
	$scope.imgUrl = '';
    //提交按钮
	$scope.subBtn = function (){
		$scope.submitActivity.popup = true;
	};
	 //结束并总结活动
	$scope.subSureBtn = function (){
		if($scope.activityDetail.assignMastersummary==null||$scope.activityDetail.assignMastersummary==""){
			$scope.submitActivity.popup = false;
			$scope.myshow=true;
	 		$scope.tctips="请填写活动总结内容"
	 		$timeout(function(){
	 			$scope.myshow=false;
	 		},1500)
		}else{
			$http({    
		            method: "POST",    
		            url: requireIp+"activity/activitycenter/updateAssignMastersummary",    
		            data: {assignMastersummary:$scope.activityDetail.assignMastersummary,activityId:$stateParams.activityId,assignMastersummaryFile:$scope.imgUrl},  
		        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  
			 }).success(function (data){
			 	console.log(data);
			 	console.log($scope.activityDetail);
			 });
			 setTimeout(function () {
	            $state.go('wrap.list.activityList');
	         }, 800)
		}
	}
	
	$scope.studentActivity = {};
	$scope.studentActivityFiledownload="";
	$scope.studentActivityFilename="";
	$scope.StudentActivityComment = function(studentId){
		$scope.studentActivity = {};
		$http.get(requireIp+"activity/activitycenter/getStudentActivityComment?studentId="+studentId+"&activityId="+$stateParams.activityId).success(function(res) {
			if(res.code==200){
				$scope.studentActivity.comment = res.data.activityComment;
				$scope.studentActivity.stuname = res.data.assignStuname;
				if(res.data.assignFile!=null&&res.data.assignFile!=""){
					var  amfile = res.data.assignFile;
					var suffix = amfile.substring(amfile.lastIndexOf("."),amfile.lastIndexOf("/")-1);
			     	var relName =  amfile.substring(amfile.lastIndexOf("/")+1);
			        var filen = relName+suffix;
			        var oName = amfile.substring(0,amfile.lastIndexOf("/")-1)
					$scope.studentActivity.filename = relName;
					$scope.studentActivity.filedownload = requireIp+"teacher/upload/downloadByPath.do?fileName="+filen+"&oName="+oName;
				}
			}
			$(".zy_student_feedback_box").show();
		});
		
	}
	
	$scope.closeStudentActivity = function(){
		$(".zy_student_feedback_box").hide();
	}
	
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
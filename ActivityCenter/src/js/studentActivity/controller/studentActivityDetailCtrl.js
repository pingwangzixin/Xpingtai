app.controller('studentActivityDetailCtrl',['$scope','$state','$timeout','$http','$location','$stateParams','$rootScope',function($scope,$state,$timeout,$http,$location,$stateParams,$rootScope) {
	$scope.stuUpShowImg=false;//已上传文件隐藏
	$scope.stuUpShowImg=false;//未上传前图片的隐藏。
	console.log($rootScope.token)
	//活动详情
	var user = sessionStorage.getItem("user");
	user = JSON.parse(user);
	var stuId = user.stuId;
	$scope.activityDetail = {
		
	};
	$scope.imgUrl = '';
	$scope.teaActivity = {};
	$http.get(requireIp+"activity/activitycenter/findStuActivity?stuId="+stuId+"&id="+$stateParams.activityId).success(function(res){
		if(res.code != 200){
			return ;
		}
		console.log(res);
		$scope.activityDetail = res.data[0];
		$scope.activityDetail.activity_startdate = res.data[0].activity_startdate.substring(0,10);
		$scope.activityDetail.activity_enddate = res.data[0].activity_enddate.substring(0,10)
		$scope.activityDetail.activity_state = res.data[0].xsstate
		if(!$.isEmptyObject(res.data[0].activity_file)){
				$scope.activityDetail.activity_file = resourceIp + "resource/" + res.data[0].activity_file.substring(0, res.data[0].activity_file.lastIndexOf("/") - 1);	
		}else{
				$scope.activityDetail.activity_file = "./img/test1.jpg";
		}
		//$scope.activityDetail = res.data[0];
		//---------------------回显上传后详情的文件---------------------------------
		if(res.code == 200){
			if(!$.isEmptyObject(res.data[0].assign_file)){
				console.log(res.data[0].assign_file)
				var  stufile =res.data[0].assign_file ;
				var suffix = stufile.substring(stufile.lastIndexOf("."),stufile.lastIndexOf("/")-1);
		        var relName =  stufile.substring(stufile.lastIndexOf("/")+1);
		        var filen = relName+suffix;
		        var oName = stufile.substring(0,stufile.lastIndexOf("/")-1)
				$scope.edit_stufile= relName;
				$scope.stufiledownload=requireIp+"/teacher/upload/downloadByPath.do?fileName="+filen+"&oName="+oName;
				if(relName !=""){
		    		$scope.stuIsShowImg=true;//已上传文件显示
		    	}
			}
		}
		//学生查看教师活动总结
		if($scope.activityDetail.xsstate==2 || $scope.activityDetail.activity_state == 2){
			$http.get(requireIp+"activity/activitycenter/getTeaActivityCenter?teaId="+$scope.activityDetail.activity_createid+"&activityId="+$stateParams.activityId).success(function(data) {
			    console.log(requireIp+"activity/activitycenter/getTeaActivityCenter?teaId="+$scope.activityDetail.activity_createid+"&activityId="+$stateParams.activityId);
			    console.log(data);
			    $scope.teaActivity.assignMastersummary = data.data.assignMastersummary;
			    if(data.data.assignMastersummaryFile!=null&&data.data.assignMastersummaryFile!=""){
					var amfile = data.data.assignMastersummaryFile;
					var suffix = amfile.substring(amfile.lastIndexOf("."),amfile.lastIndexOf("/")-1);
			     	var relName =  amfile.substring(amfile.lastIndexOf("/")+1);
			        var filen = relName+suffix;
			        var oName = amfile.substring(0,amfile.lastIndexOf("/")-1)
					$scope.teaActivity.filename = relName;
					$scope.teaActivity.filedownload = requireIp+"teacher/upload/downloadByPath.do?fileName="+filen+"&oName="+oName;
				}
			    
			});
		}
		//系统当前日期 （结束日期小于当前系统日期则屏蔽反馈按钮）
		Date.prototype.Format = function(fmt){ //author: meizz   
		  var o = {   
		    "M+" : this.getMonth()+1,                 //月份   
		    "d+" : this.getDate(),                    //日   
		    "h+" : this.getHours(),                   //小时   
		    "m+" : this.getMinutes(),                 //分   
		    "s+" : this.getSeconds(),                 //秒   
		    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
		    "S"  : this.getMilliseconds()             //毫秒   
		  };   
		  if(/(y+)/.test(fmt))   
		    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
		  for(var k in o)   
		    if(new RegExp("("+ k +")").test(fmt))   
		  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
		  return fmt;   
		}
		$scope.mindataTime = new Date().Format("yyyy-MM-dd");
		console.log($scope.mindataTime)
		 //状态判断隐藏按钮
		if($scope.activityDetail.xsstate==2 || $scope.activityDetail.activity_state == 2 || $scope.activityDetail.activity_enddate < $scope.mindataTime){
		   	//$scope.mastersummary=$scope.activityDetail.assignMastersummary;
		   	$scope.hidebtn=true;
		   	$("textarea").attr("readonly","readonly");
		}
		//如果未结束则隐藏老师活动总结，结束则显示
		if($scope.activityDetail.activity_state!=2){
		   	$scope.hidebtn1=true;
		}
	});
	
	//提交活动
	$scope.submitActivity = {
		popup : false,
		tip : false,
		tipWord : '',
		tipSrc : ''
	};
	//提交按钮
	$scope.subBtn = function (){
		$scope.submitActivity.popup = true;
	};
	
//	console.log(sessionStorage.getItem('user'))
	
	//提示
	function tipsFn(word,src){
		$scope.submitActivity.tip = true;
		$scope.submitActivity.tipWord = word;
		$scope.submitActivity.tipSrc = src;
		$timeout(function (){
	    	$scope.submitActivity.tip = false;
	    },2000);
	}
	
	
	//确定按钮
	$scope.subSureBtn = function (a){
		var params =  {};
		params.id = $stateParams.activityId;
		/*params.stuId = "250104b59a754c8c9ed83f389eb51d84";*/
		params.stuId = stuId;
		params.sumry = $scope.activityDetail.activity_comment;
		params.file = $scope.imgUrl;
		if($scope.activityDetail.activity_comment==null||$scope.activityDetail.activity_comment==""){
			$scope.submitActivity.popup = false;
			$scope.myshow=true;
	 		$scope.tctips="请填写活动总结内容"
	 		$timeout(function(){
	 			$scope.myshow=false;
	 		},1500)
	 		return;
		}
		$http({    
	            method: "post",    
	            url: requireIp+"activity/activitycenter/updateAssign",    
	           data:params
	           ,
	        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  
		 }).success(function (data){
		 	
		 });
		
		$scope.submitActivity.popup = false;
		tipsFn('提交成功','succeed');
		$state.go('wrap.list.studentActivityList');
	};
	
	//图片上传
    $scope.upload = function (e) {
            var fd = new FormData();
            var file = $('#file')[0].files[0];
            fd.append("filename", file);
            if($.isEmptyObject(file)){
            	return;
            };
            console.log(fd);
         
            fd.append("id", stuId);
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
                          $scope.stuUpImg = file.name; 
                           $scope.stuUpShowImg = true;//选择成功显示 
                   }else{
                        
                  }
                
	           }).error(function(e){
	           		console.log(e)
	           })
          /*  $.ajax({
                url: requireIp+"activity/activitycenter/uploadImage"
                , type: "POST"
                , data: fd
                , dataType: "json"
                , processData: false
                , contentType: false
                , success: function (data) {
                	console.log(data);
                	if(data.code == 200){
                		$scope.imgUrl = data.data.imgUrl;
                	}
                }
                , xhr: function () {
                    var xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                            $(".tijiaocgtc").show();
                            $(".tijiaocgtc .gy_con p i").html("头像上传成功！");
                            setTimeout(function () {
                                $(".tijiaocgtc").hide();
                            }, 1500)
                            console.log("正在提交." + percentComplete.toString() + '%');
                        }
                    }, false);
                    return xhr;
                }
            });*/
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
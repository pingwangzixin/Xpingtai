app.controller('updateActivityCtrl',['$scope','$state','$timeout','$http','$location', '$stateParams','$rootScope',function($scope,$state,$timeout,$http,$location, $stateParams,$rootScope) {
	$scope.upIsShowImg = false//更新隐藏以上传文件
	console.log($stateParams);
	var user = sessionStorage.getItem("user");
	user = JSON.parse(user);
	var teaId = user.teaId;
	$scope.activity = {};
	$scope.imgUrl  = null;
	$http.get(requireIp+"activity/activitycenter/findActivityCenter?activityId="+$stateParams.activityId).success(function(res){
		console.log(res);
		if(res.code == 200){
			$scope.activity = res.data.activityCenter;
		 if(res.data.activityCenter){
		  $scope.updateimgName = res.data.activityCenter.activityFile.substring(res.data.activityCenter.activityFile.lastIndexOf("/")+1 );
		  	if($scope.updateimgName != ""){
			    $scope.upIsShowImg = true;//更新成功显示已上传文件
	
				}
			} 
		}
		console.log($scope.activity);
	});
	//活动类型
	$scope.selectType = $scope.activity.activityType;
	$scope.activityType = [
		{id : 1, name : '生命教育'},	
		{id : 2, name : '习惯养成'},	
		{id : 3, name : '法律法规'},	
		{id : 4, name : '思想品德'},	
		{id : 5,name : '其它'}
	];
	//活动类型切换
	$scope.changeType = function (i){
		$scope.activity.activityType =$scope.activityType[i].id;
	};
		//限制活动时间
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
//	//活动结束时间
//	$scope.activityOverTime = '';
	
	
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
	//确定按钮
	$scope.subSureBtn = function (){
		var params =  {};
		if($.isEmptyObject($scope.imgUrl)){
			params ={
				activityId:$scope.activity.activityId,
				activityName:$scope.activity.activityName,
				activityEnddate:$scope.activity.activityEnddate,
				activityType:$scope.activity.activityType,
				activityDeman:$scope.activity.activityDeman,
				activityFile:$scope.activity.activityFile}
		}else{
			params ={
				activityId:$scope.activity.activityId,
				activityName:$scope.activity.activityName,
				activityEnddate:$scope.activity.activityEnddate,
				activityType:$scope.activity.activityType,
				activityDeman:$scope.activity.activityDeman,
				activityFile:$scope.imgUrl}
		}
		console.log(params);
		$scope.submitActivity.popup = false;
		//提交验证
		if($scope.activity.activityName==null||$scope.activity.activityName==""){
			$scope.submitActivity.tipWord = '请补全活动名';
			$scope.submitActivity.tipSrc = 'succeed';
			$scope.submitActivity.tip = true;
			$timeout(function (){
				$scope.submitActivity.tip = false;
			},1000);
			$scope.submitActivity.popup = false;
		}else if($scope.activity.activityEnddate==null||$scope.activity.activityEnddate==""){
			$scope.submitActivity.tipWord = '请选择活动日期';
			$scope.submitActivity.tipSrc = 'succeed';
			$scope.submitActivity.tip = true;
			$timeout(function (){
				$scope.submitActivity.tip = false;
			},1000);
			$scope.submitActivity.popup = false;
		}else if($scope.activity.activityDeman==null||$scope.activity.activityDeman==""){
			$scope.submitActivity.tipWord = '请补全活动要求';
			$scope.submitActivity.tipSrc = 'succeed';
			$scope.submitActivity.tip = true;
			$timeout(function (){
				$scope.submitActivity.tip = false;
			},1000);
			$scope.submitActivity.popup = false;
		}else{
			$http({    
		            method: "POST",    
		            url: requireIp+"activity/activitycenter/addActivityCenter",    
		           data:params
		           ,
		        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  
			 }).success(function (data){
			 	console(data);
			 });
			$timeout(function (){
				 $state.go('wrap.list.activityList');
			},2000);
			$scope.submitActivity.tipWord = '提交成功';
			$scope.submitActivity.tipSrc = 'succeed';
			$scope.submitActivity.tip = true;
			$timeout(function (){
				$scope.submitActivity.tip = false;
			},2000);
		}
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
            fd.append("id", teaId);
                 $http({     
	               method:'POST',
	               url: requireIp+"activity/activitycenter/uploadImage",
	               data: fd,
                   headers: {'Content-Type':undefined},
	               transformRequest: angular.identity 
	               }).success( function ( data ){
                    console.log(data)
                    if(data.code == 200){
                       $scope.imgUrl = data.data.imgUrl; 
                       $scope.updateimgName = file.name;
                       $scope.upIsShowImg = true;//更新成功显示已上传文件
                   }else{
                        
                  }
                
	           }).error(function(e){
	           		console.log(e)
	           })
            /*$.ajax({
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


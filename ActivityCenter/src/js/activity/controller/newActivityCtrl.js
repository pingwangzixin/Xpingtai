app.controller('newActivityCtrl',['$scope','$state','$timeout','$http','$location','$rootScope',function($scope,$state,$timeout,$http,$location,$rootScope) {
	
	$scope.imgIsShow=false;//已上传文件隐藏
	var user = sessionStorage.getItem("user");
	user = JSON.parse(user);
	var teaId = user.teaId;
	var teaRole =user.teaRole;
//	var teaRole =user.teaRole.substring(0,user.teaRole.length-1);
	//活动类型
	$scope.selectType = 1;
	$scope.activityType = [
		{id : 1, name : '生命教育'},	
		{id : 2, name : '习惯养成'},	
		{id : 3, name : '法律法规'},	
		{id : 4, name : '思想品德'},	
		{id : 5,name : '其它'}
	];
	//活动类型切换
	$scope.changeType = function (i){
		$scope.selectType =$scope.activityType[i].id;
	};
	//控制日期选择范围
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
	//活动结束时间
	$scope.activityOverTime = '';

	
	//提交活动
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
	//确定按钮
	$scope.subSureBtn = function (){
		console.log($scope.activityName);
		console.log($scope.selectType);
		//提交验证
		if($scope.activityName==null||$scope.activityName==""){
			$scope.submitActivity.tipWord = '请补全活动名称';
			$scope.submitActivity.tipSrc = 'succeed';
			$scope.submitActivity.tip = true;
			$timeout(function (){
				$scope.submitActivity.tip = false;
			},1000);
			$scope.submitActivity.popup = false;
		}else if($scope.activityOverTime==null||$scope.activityOverTime==""){
			$scope.submitActivity.tipWord = '请选择活动日期';
			$scope.submitActivity.tipSrc = 'succeed';
			$scope.submitActivity.tip = true;
			$timeout(function (){
				$scope.submitActivity.tip = false;
			},1000);
			$scope.submitActivity.popup = false;
		}else if($scope.activityDeman==null||$scope.activityDeman==""){
			$scope.submitActivity.tipWord = '请补全活动要求';
			$scope.submitActivity.tipSrc = 'succeed';
			$scope.submitActivity.tip = true;
			$timeout(function (){
				$scope.submitActivity.tip = false;
			},1000);
			$scope.submitActivity.popup = false;
		}else{
			$("body").showLoading();
			$http({    
		            method: "POST",    
		            url: requireIp+"activity/activitycenter/addActivityCenter",    
		            data: {activityName:$scope.activityName,activityEnddate:$scope.activityOverTime,
		            	activityType:$scope.selectType,activityDeman:$scope.activityDeman,
		            	activityFile:$scope.imgUrl,activityCreateid:teaId,activityCreatename:teaRole},
		        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  
			}).success(function (data){
			 	if(data.code==200){
					//成功
					console.log("success");
					$scope.submitActivity.popup = false;
					$scope.submitActivity.tipWord = '提交成功';
					$scope.submitActivity.tipSrc = 'succeed';
					$scope.submitActivity.tip = true;
					$timeout(function (){
						$scope.submitActivity.tip = false;
					},2000);
			    }else{
			    	//失败
			    	console.log("error");
			    	$scope.submitActivity.popup = false;
					$scope.submitActivity.tipWord = '提交失败';
					$scope.submitActivity.tipSrc = 'error';
					$scope.submitActivity.tip = true;
					$timeout(function (){
						$scope.submitActivity.tip = false;
					},2000);
			    }
			    $("body").hideLoading();
			});
			$timeout(function (){
				$state.go('wrap.list.activityList',{token : $rootScope.token});
			},800);
		}
	};
	
	
	//base64转换图片
    /**
     * 将以base64的图片url数据转换为Blob
     * @param urlData
     * 用url方式表示的base64图片数据
     */
//  function convertBase64UrlToBlob(dataURI){
//      var byteString;
//      if (dataURI.split(',')[0].indexOf('base64') >= 0)
//          byteString = atob(dataURI.split(',')[1]);
//      else
//          byteString = unescape(dataURI.split(',')[1]);
//      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
//      var ia = new Uint8Array(byteString.length);
//      for (var i = 0; i < byteString.length; i++) {
//          ia[i] = byteString.charCodeAt(i);
//      }
//      return new Blob([ia], {
//          type: mimeString
//      });
//  }
	
	//图片上传
    $scope.upload = function (e) {
    	console.log(7898)
            var fd = new FormData();
            var file = $('#file')[0].files[0];
            fd.append("filename", file);
            if($.isEmptyObject(file)){
            	return;
            };
            fd.append("id", "tea_470_13110");
            $scope.fileName = file.name;
            console.log(file.name);
         $("body").showLoading();
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
                        $scope.imgName = file.name;
                        $scope.imgIsShow=true//上传成功显示已上传文件
                   }else{
                        
                  }
                $("body").hideLoading();
	           }).error(function(e){
	           		console.log(e)
	           		$("body").hideLoading();
	           })
        }

}]);


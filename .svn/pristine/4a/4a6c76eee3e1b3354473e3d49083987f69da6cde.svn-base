app.controller('activityListCtrl',['$scope','$state','$timeout','$http','$location','$rootScope',function($scope,$state,$timeout,$http,$location,$rootScope) {
	var user = sessionStorage.getItem("user");
	user = JSON.parse(user);
	var teaId = user.teaId;
	var teaRole =user.teaRole;
	$http.get(requireIp+"activity/activitycenter/findActivityCenterList?activityCreateid="+teaId+"&activityCreatename="+teaRole).success(function(res){
		console.log(res);
		if(res.code != 200){
			return ;
		}
		var newData =[];
		angular.forEach(res.data, function(data,i,array){
			//data等价于array[index]
			var newActivity = {};
			if(data.activityState == 0){
				newActivity.type = "未开始";
				newActivity.class ="zy_not_begin";
				newActivity.issued = true;
				newActivity.update = true;
				newActivity.delete = true;
			}else if(data.activityState == 1){
				newActivity.type = "进行中";
				newActivity.class ="zy_be_underway";
				newActivity.issued = false;
				newActivity.update = false;
				newActivity.delete = false;
			}else {
				newActivity.type = "已结束";
				newActivity.class ="zy_is_over";
				newActivity.issued = false;
				newActivity.update = false;
				newActivity.delete = true;
			}
			newActivity.id = data.activityId;
			
			if(!$.isEmptyObject(data.activityFile)){
				var imgSrc = data.activityFile.substring(0,data.activityFile.lastIndexOf("/")-1);
				newActivity.src = resourceIp+"resource/"+imgSrc;
			}else{
				newActivity.src = "./img/test1.jpg";
			}
			
			newActivity.cont = data.activityDeman;
			newActivity.title = data.activityName;
			newActivity.time = data.activityStartdate +"~" +data.activityEnddate;
			newData.push(newActivity);
		});
		console.log(newData)
		$scope.activityList= newData;
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
	$scope.deleteBtn = function (tar,activityId,activityType){
		console.log(activityId);
		$scope.deleteActivity.id = activityId;
		if(activityType !='未开始'){
			$scope.deleteActivity.flag = '1';
		}else{
			$scope.deleteActivity.flag = null;
		}
		$scope.deleteActivity.popup = true;
		$scope.deleteActivity.removeTar = angular.element(tar.target).parents('li');
	};
	
	//确认删除
	$scope.deleteSureBtn = function (){
		if($scope.deleteActivity.id == ''){
			return ;
		}
		var url = requireIp+"activity/activitycenter/"+$scope.deleteActivity.id;
		if($scope.deleteActivity.flag != null){
			url+="?flag=1"
		}
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
	
	
	//下发至学生
	$scope.issued = {
		issuedBox : false,
		selAllBtn : false,
		selAllBtnWord : '全选',
		selClassId : '',
		sureBtn : false
	};
	//选择班级
	$scope.issuedClass = [];
	$scope.userId="";
	$scope.userRole="";

	//保存下发
	$scope.sendParams = {
		"userId":teaId,
		"userRole":teaRole
	};
	//根据用户id查询班级
	$scope.findIssuedClass = function(activityId){
		$scope.sendParams.activityId = activityId;
		$scope.issuedClass = [];
		$scope.issuedList = [];
		$scope.sendParams.classId = "";
		$scope.issued.issuedBox = true;
		$http.get(requireIp+"activity/activitycenter/findClassByTeaId?userId="+teaId).success(function(data) {
		    if(data.code==200){
		    	$scope.issuedClass=data.data;
		    }
		});
	}
	
	//学生列表
	$scope.issuedList = [];
	var selectList = [];
	var beissuedLen = 0;
	//根据班级id查询学生
	$scope.findIssuedList = function(classId){
		$scope.issuedList = [];
		selectList = [];
		beissuedLen = 0;
		$scope.issued.sureBtn = false;
		$scope.issued.selAllBtn = false;
		$scope.issued.selAllBtnWord = '全选';
		$scope.sendParams.classId = classId;
		if(classId!==null){
			$http.get(requireIp+"activity/activitycenter/findStuInfoByCid?classId="+classId+"&activityId="+$scope.sendParams.activityId).success(function(data) {
			    if(data.code==200){
			    	$scope.issuedList=data.data;
			    	$scope.issued.selAllBtn = true;
			    	angular.forEach($scope.issuedList,function (ele,i){
						if( ! ele.beissued){
							beissuedLen ++;
						}
						if(! ele.beissued && ele.check){
							selectList.push(ele);
						}
					});
			    }
			});
		}
	}
	
	//全选
	$scope.selAll = function (){
		$scope.issued.sureBtn = true;
		selectList = [];
		if($scope.issued.selAllBtnWord == '全选'){
			$scope.issued.selAllBtnWord = '取消全选';
			angular.forEach($scope.issuedList,function (ele,i){
				if( ! ele.beissued){
					ele.check = true;
					selectList.push(ele);
				}
			});
		}else{
			$scope.issued.sureBtn = false;
			$scope.issued.selAllBtnWord = '全选';
			angular.forEach($scope.issuedList,function (ele,i){
				ele.check = false;
			});
			selectList = [];
		}
		console.log(selectList)
	};
	//多选
	$scope.selIssued = function (e,item){
		$scope.issued.sureBtn = true;
		item.check=!item.check;
		if( ! item.beissued && item.check){
			selectList.push(item);
		}else if( ! item.check){
			for(var i=0;i<selectList.length;i++){
				if(selectList[i] == item){
					selectList.splice(i,1);
					if(selectList == 0){
						$scope.issued.sureBtn = false;
					}
				}
			}
		}
		selectList.length == beissuedLen ? $scope.issued.selAllBtnWord = '取消全选' : $scope.issued.selAllBtnWord = '全选';
		console.log(beissuedLen)
		console.log(selectList.length)
		
	};
	
	//清空
	function empty(){
		selectList = [];
		$scope.issued.selAllBtn = false;
		$scope.issued.selAllBtnWord = '全选';
		$scope.issued.issuedBox = false;
		$scope.issued.selClassId = '';
		
		angular.forEach($scope.issuedList,function (ele,i){
			if( ! ele.beissued){
				ele.check = false;
			}
		});
	}

	
	//提示
	function tipsFn(word,src){
		$scope.deleteActivity.tip = true;
		$scope.deleteActivity.tipWord = word;
		$scope.deleteActivity.tipSrc = src;
		$timeout(function (){
	    	$scope.deleteActivity.tip = false;
	    },2000);
	}
	var sendFlag=true;
	//确认下发
	$scope.sureIssuedBtn = function (){
		if(sendFlag){
			sendFlag=false;
			$scope.sendParams.stuList = selectList;
			console.log(selectList);
			console.log(angular.toJson($scope.sendParams));
			$http.post(requireIp+"activity/activitycenter/sendActivityCenter",{"json":angular.toJson($scope.sendParams)}).success(function(data) {
			    	sendFlag=true;
			    if(data.code==200){
			    	empty();
			    	tipsFn('下发成功','succeed');
			    	$timeout(function (){
				    	location.reload();
				    },100);
			    }else{
			    	empty();
			    	tipsFn('下发失败','filed');
			    }
			});
		}
	};
	//取消下发
	$scope.canceIssuedBtn = function (){
		$scope.issued.sureBtn = false;
		empty();
		console.log(selectList)
	};

}]);


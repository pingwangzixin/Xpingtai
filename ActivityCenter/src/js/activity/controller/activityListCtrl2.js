app.controller('activityListCtrl',['$scope','$state','$timeout','$http','$location',function($scope,$state,$timeout,$http,$location) {
	
	$http.get("http://198.9.6.236:8080/CourseCenter/activity/activitycenter/findActivityCenterList?activityCreateid=tea_470_13110&activityCreatename=班主任").success(function(res){
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
			}else if(data.activityState == 1){
				newActivity.type = "进行中";
				newActivity.class ="zy_be_underway";
				newActivity.issued = false;
				newActivity.update = true;
			}else {
				newActivity.type = "已结束";
				newActivity.class ="zy_is_over";
				newActivity.issued = false;
				newActivity.update = false;
			}
			newActivity.id = data.activityId;
			newActivity.delete = true;
			if(!$.isEmptyObject(data.activityFile)){
				newActivity.src = "http://198.9.6.236:8080/resource/"+data.activityFile;
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

	//活动列表
//	$scope.activityList = [
//		{
//			type : '未开始',
//			class : 'zy_not_begin',
//			src : 'test1',
//			title : '爱心字典行动招募志愿者1111',
//			time : '2017-06-26~2017-04-30',
//			cont:'“爱心字典”行动旨在构建一座当地学生与志愿者之间的心灵沟通桥梁，通过“结对”形式为学生的全面发展提供力所能及的帮助。“爱心字典”行动旨在构建一座当地学生与志愿者之间的心灵沟通桥梁，通过“结对”形式为学生的全面发展提供力所能及的帮助。',
//			issued : true,
//			update : true,
//			delete : true
//		},
//		{
//			type : '进行中',
//			class : 'zy_be_underway',
//			src : 'test1',
//			title : '爱心字典行动招募志愿者2222',
//			time : '2017-06-26~2017-04-30',
//			cont:'“爱心字典”行动旨在构建一座当地学生与志愿者之间的心灵沟通桥梁，通过“结对”形式为学生的全面发展提供力所能及的帮助。“爱心字典”行动旨在构建一座当地学生与志愿者之间的心灵沟通桥梁，通过“结对”形式为学生的全面发展提供力所能及的帮助。',
//			issued : false,
//			update : true,
//			delete : true
//		},
//		{
//			type : '已结束',
//			class : 'zy_is_over',
//			src : 'test1',
//			title : '爱心字典行动招募志愿者3333',
//			time : '2017-06-26~2017-04-30',
//			cont:'“爱心字典”行动旨在构建一座当地学生与志愿者之间的心灵沟通桥梁，通过“结对”形式为学生的全面发展提供力所能及的帮助。“爱心字典”行动旨在构建一座当地学生与志愿者之间的心灵沟通桥梁，通过“结对”形式为学生的全面发展提供力所能及的帮助。',
//			issued : false,
//			update : false,
//			delete : true
//		}
//	];
	
	
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
		var url = "http://198.9.6.236:8080/CourseCenter/activity/activitycenter/"+$scope.deleteActivity.id;
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
	//sessionStorage.setItem("user", '{"teaIdCard":"100000200006090000","teaRole":"班主任"}');//用户信息存放session
	sessionStorage.setItem("user", '{"teaId":"1067b566476c43dfa35ac74303576ab6","userRole":"tea"}');//用户信息存放session
	var teaid = JSON.parse(sessionStorage.getItem("user"));
	$http.get("http://192.168.9.98:8080/jeuc/Api/UserInfo/getTea?teaId="+teaid.teaId).success(function(res){
		console.log("http://192.168.9.98:8080/jeuc/Api/UserInfo/getTea?teaId="+teaid.teaId);
		$scope.userId=res.teacherInfo.teaId;
		$scope.userRole=res.userRole;
		$scope.sendParams.userId = res.teacherInfo.teaId;
		$scope.sendParams.userRole = "班主任";
	});
	//保存下发
	$scope.sendParams = {};
	//根据用户id查询班级
	$scope.findIssuedClass = function(activityId){
		$scope.sendParams.activityId = activityId;
		$scope.issuedClass = [];
		$scope.issuedList = [];
		$scope.sendParams.classId = "";
		$scope.issued.issuedBox = true;
		if($scope.userRole=="tea"){
			$http.get("http://localhost:8080/CourseCenter/activity/activitycenter/findClassByTeaId?userId="+$scope.userId).success(function(data) {
			    if(data.code==200){
			    	$scope.issuedClass=data.data;
			    }
			});
		}
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
			$http.get("http://localhost:8080/CourseCenter/activity/activitycenter/findStuInfoByCid?classId="+classId).success(function(data) {
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
	
	//确认下发
	$scope.sureIssuedBtn = function (){
		$scope.sendParams.stuList = selectList;
		console.log(selectList);
		console.log(angular.toJson($scope.sendParams));
		$http.post("http://localhost:8080/CourseCenter/activity/activitycenter/sendActivityCenter",{"json":angular.toJson($scope.sendParams)}).success(function(data) {
		    if(data.code==2000){
		    	empty();
		    	tipsFn('下发成功','succeed');
		    }else{
		    	empty();
		    	tipsFn('下发失败','filed');
		    }
		});
	};
	//取消下发
	$scope.canceIssuedBtn = function (){
		$scope.issued.sureBtn = false;
		empty();
		console.log(selectList)
	};

}]);


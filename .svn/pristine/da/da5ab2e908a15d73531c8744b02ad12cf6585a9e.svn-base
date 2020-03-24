app.controller('indexCtrl',['$scope','$state','$timeout','$http','$location','$interval','$rootScope','templateServer',function($scope,$state,$timeout,$http,$location,$interval,$rootScope,templateServer) {
	//整体风格样式类名
	$rootScope.globalStyle = {};
	$scope.setColor = templateServer.serStyleSet;
	angular.forEach($scope.setColor,function (ele,i){
		if(ele.checked == true){
			$rootScope.globalStyle = ele;
		}
	});
	$scope.$on('changeColor',function (data){
		$scope.setColor = templateServer.serStyleSet;
		angular.forEach($scope.setColor,function (ele,i){
			if(ele.checked == true){
				$rootScope.globalStyle = ele;
			}
		});
	});
	
	//是否已登录用户
	$scope.loggedIn = false;
	$scope.$emit('loggedIn',$scope.loggedIn);
	
	$scope.userInfo = {
		username : '',
		password : ''
	};
	$scope.userLoggedMsg = {
		showTips : false,
		errorTip : ''
	};
	
	//有用户id
	var userId = sessionStorage.getItem('userId') || '';

	//显示登录后模板
	if(userId){$scope.loggedIn = true;}
	
	//登录
	var regExp = /^([G|L][1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X))|((13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8})$/;
	$scope.loginT = function (){
		if(! regExp.test($scope.userInfo.username) || $scope.userInfo.username == '' || $scope.userInfo.password == ''){
			$scope.userLoggedMsg.showTips = true;
			$scope.userLoggedMsg.errorTip = '用户名或密码错误';
		}else{
			$http.get(requireIp + 'jeuc/api/uc/login?username='+$scope.userInfo.username+"&password="+$scope.userInfo.password).success(function(data) {
	    		console.log(data);
	    		if(data.ret==200){
					sessionStorage.setItem('userId',data.data.id);
					$state.go('wrap.index',null,{reload:true})
	    		}else{
	    			$scope.userLoggedMsg.showTips = true;
	    			$scope.userLoggedMsg.errorTip = '用户名或密码错误';
	    		}
		    }).error(function(){
    			$scope.userLoggedMsg.errorTip = '系统错误';
		    });
		}
	}
	
	//登录后左侧二级导航
	$scope.loggedleftNav = [
		{name : '空间',href : '',icon : 'icon-kongjian',checked : true},
		{name : '班级',href : '',icon : 'icon-banji',checked : false},
		{name : '学校',href : '',icon : 'icon-xuexiao',checked : false},
	];
	
	//新闻列表
	$scope.news;
	$http.post(newsIp + "MdjXTeacher/msgcenter/findNewsList.do",{json:"{'cpage':1,'pageSize':10,'type':'0'}"}).success(function(data) {
        $scope.news = data.resultData;
        console.log($scope.news)
    });
  	
  	//新闻内容
  	$scope.renderFinish = function(){
	    console.log('渲染完之后的操作');
	    var ocontent = document.querySelectorAll('.zy_new_content');
	    console.log(ocontent)
    	angular.forEach($scope.news,function (v,i){
// 			var odiv = document.createElement('div');
//  		odiv.innerHTML = v.content;
      		ocontent[i].innerHTML = v.content;
    	});
    	
    	$timeout(function (){
			var moveBox = $(ocontent).parents('.zy_new_list');
			var html = moveBox.html();
			var i = 0;
			var timer = null;
			var liHeight = moveBox.children('li').outerHeight(true);
			var liLength = moveBox.children('li').length;
			moveBox.html(html + html);
			
			function toUp(){
				if(parseInt(moveBox.css('margin-top')) > (-liHeight * liLength)){
					i++;
					moveBox.animate({
						marginTop : -liHeight * i + 'px'
					},'slow');
				}else{
					i = 0;
					moveBox.css('margin-top','0px');
				}
			}
			
			timer = setInterval(function (){
				toUp();
				console.log(1)
			},2000);
			
			moveBox.hover(function (){
				clearInterval(timer);
			},function (){
				clearInterval(timer);
				timer = setInterval(toUp,2000);
			});
		});
	};
	
	/*$scope.$on('ngRepeatFinished',function (data){
		console.log(123456)
		var ocontent = document.querySelectorAll('.zy_new_content');
	    console.log(ocontent)
    	angular.forEach($scope.news,function (v,i){
 			var odiv = document.createElement('div');
    		odiv.innerHTML = v.content;
      		ocontent[i].innerHTML = v.content;
    	});
	});*/
  
	//空间展示
	$http.get(requireIp + "jeuc/api/ea/eaRecommend/findRecommended?type=1").success(function(data) {
       $scope.spaceschool = data.data;
         console.log(data.data);
	});
	$http.get(requireIp + "jeuc/api/ea/eaRecommend/findRecommended?type=2").success(function(data) {
       $scope.spacetea = data.data;
         console.log(data.data);
	});
	$http.get(requireIp + "jeuc/api/ea/eaRecommend/findRecommended?type=3").success(function(data) {
       $scope.spacestu = data.data;
         console.log(data.data);
	});
	
	//人数统计
	$scope.statistics = {
		total : {num : 0,p:"tot"},
		teacher : {num :0,p:"tea"},
		student : {num :0 ,p:"stu"},
		parent : {num : 0,p:"par"}
	}
	/*$http.get(requireIp + "jeuc/api/sys/userStatistics/findUserAmount?areaId=032f559f367a4d69acd2c675cbba06f0").success(function(data) {
		console.log("人数")
        console.log(data.data);
        $scope.statistics.total.num = data.data.amount;
        $scope.statistics.teacher.num = data.data.teacherAmount;
        $scope.statistics.student.num = data.data.studentAmount;
        $scope.statistics.parent.num = data.data.parentAmount;
        console.log($scope.statistics)
	});*/
	
	/*setTimeout(function (){
		$scope.statistics.total.num = 67;
        $scope.statistics.teacher.num = 8552;
        $scope.statistics.student.num = 300;
        $scope.statistics.parent.num = 1000;
        $scope.$broadcast('a',$scope.statistics);
	},2000);*/
	
	
	//登陆后左侧二级导航切换
	$scope.loggedleftNavTab = function(i){
		angular.forEach($scope.loggedleftNav,function (ele,index){
			ele.checked = false;
		});
		$scope.loggedleftNav[i].checked = true;
	};
	
	//门户管理按钮事件
	$scope.doorAdmin = false;
	$scope.doorAdminShow = function (){
		$scope.doorAdmin = !$scope.doorAdmin;
		$scope.$emit('adminShow',$scope.doorAdmin);
//		$scope.$broadcast('adminShow',$scope.doorAdmin);
		$scope.$on('doorAdminOut',function(event,data){
			$scope.doorAdmin = data;
		});
	};

	//应用{params:}
	$http.get(requireIp + 'jeuc/api/uc/ucMenu?parId=19').success(function (res){
		if(res.ret == 200){
			$scope.application = res.data;
			if(userId){
				angular.forEach($scope.application,function (v,i){
					v.href += '&userId=' + userId;
				});
			}else{
				angular.forEach($scope.application,function (v,i){
					v.href = path + '#/login';
				});
			}
		}
	}).error(function (){
		
	});

	//空间展示 应用监控
	$scope.state = {
		space : 0,
		watching : 0
	};
	
	//空间展示切换
	$scope.switchSpace = function (i){
		$scope.state.space = i;
	}
	//应用监控切换
	$scope.switchWatching = function (i){
		$scope.state.watching = i;
	}
	
	//显示组件
	$scope.pcassembly = templateServer.assembly;
	$scope.$on('assembly',function (){
		$scope.pcassembly = templateServer.assembly;
		console.log($scope.pcassembly);
	});
	
	
	
	
	//进度条
	$scope.speed = {
		active : {progress : 0,color : '#399fdf'},
		open : {progress : 50,color : '#f97046'}
	};
	
	//进度条事件
	console.log($scope.speed.active.progress)
	angular.element(document).bind('scroll',function (){
//		console.log($scope.pcassembly[3].checked)
		if($scope.pcassembly[3].checked == true && $('.zy_progress_chart').length){
			if(($(document).scrollTop() + $(window).height()) >= ($('.zy_progress_chart').offset().top + $('.zy_progress_chart').height() * 2)){
//				console.log($scope.speed.active.progress)
				$interval.cancel(timer);
				var timer = $interval(function (){
					$scope.speed.active.progress >= 100 ? $scope.speed.active.progress = 100 : $scope.speed.active.progress ++;
					$scope.speed.active.progress >= 80 ? $scope.speed.active.color = '#fff' : $scope.speed.active.color = '#399fdf';
					
					$scope.speed.open.progress >= 100 ? $scope.speed.open.progress = 100 : $scope.speed.open.progress ++;
					$scope.speed.open.progress >= 80 ? $scope.speed.open.color = '#fff' : $scope.speed.open.color = '#f97046';
					
				},30);
			}
		}
	})

}]);

//repeat 加载完之后
app.directive('repeatFinish',function($timeout){
    return {
        link: function(scope,element,attr){
//          console.log(scope.$index)
            if(scope.$last == true){
//              $timeout(function (){
                	console.log('ng-repeat执行完毕');
                	scope.$eval(attr.repeatFinish);
//					scope.$emit('ngRepeatFinished');
//              },50);
            }
        }
    }
});

//新闻无缝滚动
app.directive('seamlessRolling',function ($timeout){
	return {
		restrict : 'E',
		replace : true,
		scope : {
			news : "="		
		},
		template : '<li ng-repeat="newss in news" repeat-finish="renderFinish()"><h4><span ng-bind="newss.title"></span><i class="fr" ng-bind="newss.createTime|timeFilter"></i></h4><div class="zy_new_content"></div></li>',
		link : function (scope,ele,attrs){
			/*console.log(ele)
			$timeout(function (){
				var moveBox = $(ele).parent();
				var html = moveBox.html();
				var i = 0;
				var timer = null;
				var liHeight = moveBox.children('li').outerHeight(true);
				var liLength = moveBox.children('li').length;
				moveBox.html(html + html);
				
				function toUp(){
					if(parseInt(moveBox.css('margin-top')) > (-liHeight * liLength)){
						i++;
						moveBox.animate({
							marginTop : -liHeight * i + 'px'
						},'slow');
					}else{
						i = 0;
						moveBox.css('margin-top','0px');
					}
				}
				
				timer = setInterval(toUp,2000);
				
				moveBox.hover(function (){
					clearInterval(timer);
				},function (){
					clearInterval(timer);
					timer = setInterval(toUp,2000);
				});
			});*/
		}
	}
});

//新闻展示时间过滤器
app.filter('timeFilter',function(){
	return function(obj){
    	return obj.substr(0,10);
	}
});
	
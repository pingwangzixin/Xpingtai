app.controller('classroomctrl', ['$scope', '$state', '$timeout', '$http', '$location', '$interval', 'templateServer', function($scope, $state, $timeout, $http, $location, $interval, templateServer) {

	//导航显示小标题
	$scope.navShowDet = {
		title: '基础设置',
		ifShow: false
	};
	
	//获取老师数据的接口
	$scope.classes = [{
			"id": "1",
			"name": "刘颖"
		}, {
			"id": "2",
			"name": "张三"
		}, {
			"id": "3",
			"name": "刘思雨"
		}, {
			"id": "4",
			"name": "赵德华"
		}, {
			"id": "5",
			"name": "李思"
		}, {
			"id": "6",
			"name": "王武"
		}, {
			"id": "7",
			"name": "赵柳"
		},
		{
			"id": "8",
			"name": "陈思琪"
		}, {
			"id": "9",
			"name": "刘美琪"
		},
	]
	
	//获取学校年级接口
	$scope.nianjiList=[
		{"id":"1","name":"一年级"},
		{"id":"2","name":"二年级"},
		{"id":"3","name":"三年级"},
		{"id":"4","name":"四年级"},
		{"id":"5","name":"五年级"},
		{"id":"6","name":"六年级"}
	]
	
	//切换年级
	$scope.switchGrade=function($event,index){
		$($event.target).siblings().removeClass("active");
	 	$($event.target).addClass("active");
//	 	var grade = $scope.nianjiList.data[index];
//	 	
//	 	//获取页面数据
//		getPageData(grade.id);
	}
	
	//
	$http.get("http://z.uuke.com.cn:8082/jeuc/api/ea/eaUserCourse?gid=f7eaf70966df44b08df99345d9aed685").success(function(res){
		console.log(res)
		$scope.page=res.data;
		
		setTimeout(function(){
			/*table表格超出有滚动条*/
			function tableScoll(config){
				var boxW=$(config.boxName).width();
				var lengths=$(config.lengthsNmae).length;
				var boxNmae_table=$(config.boxNmae_table);
				console.log(boxW);
				console.log(boxNmae_table);
				console.log($(config.lengthsNmae));
				if(lengths>config.num && boxW>config.scw){
					lengths-=config.num;
					boxNmae_table.css({"width":config.min_w+lengths*config.tdW});
				}
			}
			tableScoll({
				"boxName":".wx_renke_taber",//外盒子宽度
				"lengthsNmae":".wx_renke_taber table tbody tr th",//具体的需要增加的数据
				"boxNmae_table":".wx_renke_taber table",//当前table表
				"num":1,//设定不能超过的个数
				"scw":1100,//设定不能超过的宽度
				"min_w":500,//表格最小宽度
				"tdW":120//超过部分每一个表格的宽度
			});
		},50)
		
	})
	
}])
app.controller('xuekectrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
	
	//导航显示小标题
	$scope.navShowDet = {
		title : '基础设置',
		ifShow : false
	};
	
	$scope.addxueke=true;
	
	$scope.state={
		"levelList":[
			{"id":"1","name":"小学"},
			{"id":"2","name":"初中"},
			{"id":"3","name":"高中"},
		],
		"levelIndex":"0"
	}
	
	$scope.schoolbranch=[
		{"nianji":"一年级","xueke":[{"id":"1","name":"语文"},{"id":"2","name":"数学"},{"id":"3","name":"音乐"}]},
		{"nianji":"二年级","xueke":[{"id":"1","name":"语文"},{"id":"2","name":"数学"},{"id":"3","name":"音乐"},{"id":"4","name":"美术"}]},
		{"nianji":"三年级","xueke":[{"id":"1","name":"语文"},{"id":"2","name":"数学"},{"id":"3","name":"音乐"},{"id":"4","name":"美术"},{"id":"5","name":"英语"}]},
		{"nianji":"四年级","xueke":[{"id":"1","name":"语文"},{"id":"2","name":"数学"},{"id":"3","name":"音乐"}]},
		{"nianji":"五年级","xueke":[{"id":"1","name":"语文"},{"id":"2","name":"数学"},{"id":"3","name":"音乐"},{"id":"4","name":"美术"},{"id":"5","name":"美术"},{"id":"6","name":"美术"},{"id":"7","name":"美术"},{"id":"8","name":"美术"},{"id":"9","name":"美术"}]},
		{"nianji":"六年级","xueke":[{"id":"1","name":"语文"},{"id":"2","name":"数学"},{"id":"3","name":"音乐"},{"id":"4","name":"美术"},{"id":"5","name":"英语"}]}
	]
	
	$scope.xuekelists=[
		{"xktype":"思想品德","xuekelist":[{"id":"1","name":"语文"},{"id":"2","name":"数学"},{"id":"3","name":"音乐"},{"id":"1","name":"语文"},{"id":"2","name":"数学"},{"id":"3","name":"音乐"},{"id":"1","name":"语文"},{"id":"2","name":"数学"},{"id":"3","name":"音乐"}]},
		{"xktype":"学业水平","xuekelist":[{"id":"1","name":"语文"},{"id":"2","name":"数学"},{"id":"3","name":"音乐"}]},
		{"xktype":"身心健康","xuekelist":[{"id":"1","name":"语文"},{"id":"2","name":"数学"},{"id":"3","name":"音乐"}]},
		{"xktype":"艺术修养","xuekelist":[{"id":"1","name":"语文"},{"id":"2","name":"数学"},{"id":"3","name":"音乐"}]},
		{"xktype":"社会实践","xuekelist":[{"id":"1","name":"语文"},{"id":"2","name":"数学"},{"id":"3","name":"音乐"}]},
	]
	
	$scope.classes=[
		{"id":"1","name":"语文","rept":"1"},
		{"id":"2","name":"数学","rept":"1"},
		{"id":"3","name":"英语","rept":"1"},
		{"id":"4","name":"政治"},
		{"id":"5","name":"历史"},
		{"id":"6","name":"地理"},
		{"id":"7","name":"生物"},
		{"id":"8","name":"化学"},
		{"id":"9","name":"物理"},
	]
	
	//切换小学。初中，高中
	$scope.changeLevel=function(n,m){
		$scope.state.levelIndex=n;
		console.log(n);
		console.log(m)
	}
	
	
	//鼠标移入班级出现叉号
     $scope.banjiguanli = function (n) {
             $scope.delbanji = n;
         }
	
         //点击叉号出现弹窗
     $scope.deltc = function (event) {
             $(".zy_addClassBox").show()
                 //确认删除弹窗
             $scope.suredel = function () {
                     angular.element(event.target).parent().addClass("wx_none"); //点击确定按钮，让当前选中的班级消失
                     $(".zy_addClassBox").hide()
                 }
                 //取消删除弹窗
             $scope.caldel = function () {
                     $(".zy_addClassBox").hide()
                     $scope.delbanji = false;
                 }
                 //点击确定删除班级
             $scope.suredel = function () {
                 $scope.delbjid = angular.element(event.target).siblings("p").html();
                 console.log($scope.delbjid)
                 $http.post(requireIp + '/ea/eaClass/delClassById', {
                     id: $scope.delbjid
                     ,updateBy:userId
                 }).success(function (res) {
                     $(".zy_warningBox").show();
                     $(".zy_addClassBox").hide()
                     setTimeout(function () {
                         $(".zy_warningBox").hide();
                     }, 1000)
                     angular.element(event.target).parent().addClass("wx_none");
                 })
             }
         }
     
     
     //点击+号 添加班级
     $scope.tjbanji = function (event) {
         angular.element(event.target).addClass("wx_none").siblings("span").removeClass("wx_none");
         $scope.baocun = function (event) {
             //获取年级ID
             $scope.gradeId = angular.element(event.target).parent().find("em").html();
             //获取班级名称
             $scope.className = angular.element(event.target).siblings("span.wx_ycsrk").children("input").val();
             if ($scope.className == "") {
                 $(".wx_erro_tc").show();
                 $(".wx_erro_tc .gy_con span").html("请输入班级名称");
                 setTimeout(function () {
                     $(".wx_erro_tc").hide();
                 }, 2000)
             }
             else {
                 //通过后台接口添加班级
                 $http.post(requireIp + "/ea/eaClass/insertClassInGrade", {
                     gradeId: $scope.gradeId
                     , className: $scope.className
                     ,createBy:userId
                 }).success(function (res) {
                     if (res.ret == '200') {
                         $(".zy_warningBox").show();
                         $(".zy_warningBox .gy_con i").html("添加成功");
                         setTimeout(function () {
                             window.location.reload();
                         }, 1500)
                     }
                     else {
                         $(".wx_erro_tc").show();
                         $(".wx_erro_tc .gy_con span").html(res.message);
                         setTimeout(function () {
                             $(".wx_erro_tc").hide();
                         }, 2000)
                     }
                 }).error(function (res) {
                     console.log(res)
                 })
             }
         }
         $scope.fangqi = function (event) {
             angular.element(event.target).addClass("wx_none").siblings("span").addClass("wx_none").siblings("span.add").removeClass("wx_none");
         }
     }
     
     
	
}])
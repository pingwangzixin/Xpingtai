app.controller('classctrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
	
	//导航显示小标题
	$scope.navShowDet = {
		title : '基础设置',
		ifShow : false
	};
	
	//根据学校Id,获取年级和班级列表
	$scope.officeId='office_6d667547cac640aa9390f6de7a5262b3'
	$http.post('http://192.168.9.98/jeuc/api/ea/eaClass/findClassAndGradeByOfficeId',{officeId:$scope.officeId}).success(function(res){
		$scope.xuexiao = res;
	})
	
	
	
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
                 $http.post('http://192.168.9.98/jdz-jeuc/api/ea/eaClass/delClassById', {
                     id: $scope.delbjid
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
         //点击叉号，关闭弹窗
     $scope.gbtc = function () {
             $(".zy_addClassBox").hide()
             $scope.delbanji = false;
         }
         //点击+号 添加班级
     $scope.tjbanji = function (n) {
         $scope.addClass=true;
         $scope.gradeId = n;
         $http.post('http://192.168.9.98/jeuc/api/ea/eaClass/findClassInfoByGid', {
             gradeId: n
         }).success(function (res) {
             var arrayObj = new Array();
             for(var i = 1;i<=50;i++){
                 var rept = "";
                 angular.forEach(res.data, function(data){
                    if(data.name == i){
                        rept = "1";
                    }
                 });
                 var obj = {
                     "id":i,
                     "name":i + "班",
                     "rept":rept
                 };
                 arrayObj.push(obj);
             }
             $scope.classes=arrayObj;
         })
     }

     $scope.sureadd = function () {
         var dom = $(".wx_addclassul .active");
         var className = "";
         $(".wx_addclassul .active").each(function(){
             className += $(this).data("cid") + ",";
         });
         //判断是否勾选班级
         if(className == ""){
             $(".wx_erro_tc").show();
             $(".wx_erro_tc .gy_con span").html("您没有勾选班级！");
             setTimeout(function () {
                 $(".wx_erro_tc").hide();
             }, 2000)
             return;
         }
         className = className.substring(0,className.length-1);
         $http.post('http://192.168.9.98/jdz-jeuc/api/ea/eaClass/insertClassInGrade', {
             gradeId: $scope.gradeId,
             className:className
         }).success(function (res) {
             $scope.addClass=false;
             if(res.ret == 200){
             	$http.post('http://192.168.9.98/jdz-jeuc/api/ea/eaClass/findClassAndGradeByOfficeId',{officeId:$scope.officeId}).success(function(res){
					$scope.xuexiao = res;
				})
                 $(".zy_warningBox").show();
                 $(".zy_warningBox .gy_con i").html("添加成功")
                 setTimeout(function () {
                     $(".zy_warningBox").hide();
                     $(".zy_warningBox .gy_con i").html("删除成功")
                 }, 1000)
             }else{
                 $(".wx_erro_tc").show();
                 $(".wx_erro_tc .gy_con span").html(res.message);
                 setTimeout(function () {
                     $(".wx_erro_tc").hide();
                 }, 2000)
             }
             $http.post('http://192.168.9.98/jdz-jeuc/api/ea/eaClass/findClassAndGradeByOfficeId', schoolId).success(function (res) {
                 $scope.xuexiao = res;
             })
         })

     }
	
	
}])
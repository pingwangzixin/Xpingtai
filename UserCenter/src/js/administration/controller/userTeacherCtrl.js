app.controller('userTeacherCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$q', '$rootScope', '$filter', function ($scope, $state, $timeout, $http, $location, $q, $rootScope, $filter) {
    //初始化
    var pageSize = 10;
    $scope.addteacherTc = true; //添加教师弹窗显示隐藏
    $scope.quxian = true; //区县搜索框显示和隐藏
    $scope.yitingyong = false; //已停用下拉列表显示和隐藏
    $scope.huishouzhan = false; //回收站下拉列表显示隐藏
    $scope.conformTc = true; //弹窗显示和隐藏
    $scope.inputrue=true; //区域选择下拉框显示和隐藏
    $scope.selectarea=true; //选择区域显示隐藏
    $scope.userTeacherHuishou = []  //删除的用户临时存放
    $scope.sex="男"
        //用户类型：区县0、校管理员1、教师班主任2、
    $scope.userType = 0;
    //用户状态
    $scope.userStates = [
            {
                "id": "1"
                , "name": "已注册"
            }
            , {
                "id": "2"
                , "name": "已停用"
            }
            , {
                "id": "3"
                , "name": "回收站"
            }
    ]
        //用户状态下拉
    $scope.ustate = "1"
    if ($scope.userType == 0) {
        $scope.quxian = false;
    }
    if ($scope.ustate == "1") {
        $scope.yizhuce = true;
        $scope.huishouzhan = false;
        $scope.yitingyong = false;
    }
    if ($scope.ustate == "2") {
        $scope.yizhuce = false;
        $scope.huishouzhan = false;
        $scope.yitingyong = true;
    }
    if ($scope.ustate == "3") {
        $scope.huishouzhan = true;
        $scope.yitingyong = false;
        $scope.yizhuce = false;
    }
    //下拉选中用户状态 改变编辑的ul列表内容
    $scope.userstateChange = function () {
            if ($scope.ustate == "1") {
                $scope.yizhuce = true;
                $scope.huishouzhan = false;
                $scope.yitingyong = false;
                $scope.userTeacher1 = $scope.userTeacher
            }
            if ($scope.ustate == "2") {
                $scope.yizhuce = false;
                $scope.huishouzhan = false;
                $scope.yitingyong = true;
            }
            if ($scope.ustate == "3") {
                $scope.huishouzhan = true;
                $scope.yitingyong = false;
                $scope.yizhuce = false;
                $scope.userTeacher1 = $scope.userTeacherHuishou;
            }
        }
        //模拟用户数据
    $scope.userTeacher = [
            {"name": "张三", "mobl": "13602222222", "role": "捷成管理员", "userId": "097635215263", "uStating": "0","sex":"男",'teacherNo':'1234567654',"range":[1,3]}, 
            {"name": "李四", "mobl": "13602226744", "role": "捷成管理员", "userId": "087647589323", "uStating": "0","sex":"男",'teacherNo':'1234678899004'}, 
            {"name": "胡歌天", "mobl": "13602256725", "role": "捷成管理员", "userId": "87893452390", "uStating": "1","sex":"男",'teacherNo':'865689010287654'}, 
            {"name": "刘和刚", "mobl": "13602246528", "role": "学校管理员", "userId": "35658709709", "uStating": "0","sex":"男",'teacherNo':'1234010287654'}, 
            {"name": "张思德", "mobl": "13602222222", "role": "捷成管理员", "userId": "324652476765", "uStating": "0","sex":"男",'teacherNo':'12349010287654'}, 
            {"name": "江京东", "mobl": "13605672243", "role": "学校管理员", "userId": "134666579976", "uStating": "0","sex":"男",'teacherNo':'16789010287654'}, 
            {"name": "刘和刚", "mobl": "13602222256", "role": "捷成管理员", "userId": "2364547876989", "uStating": "1","sex":"男",'teacherNo':'12389010287654'}, 
            {"name": "张思德", "mobl": "13602222926", "role": "区县管理员", "userId": "3543756876989", "uStating": "0","sex":"男",'teacherNo':'18910287654'}, 
            {"name": "周星星", "mobl": "13502222098", "role": "区县管理员", "userId": "3543756876075", "uStating": "0","sex":"男",'teacherNo':'1234010287654'}, 
            {"name": "李德凯", "mobl": "13802222888", "role": "区县管理员", "userId": "354375686544", "uStating": "0","sex":"男",'teacherNo':'123010287654'}, 
    ]
    //模拟学校数据
    $scope.schooldata=[
        {"id":"1","name":"牡丹江附属小学牡丹江附属小学","schadd":"牡丹江市","schtype":"1"},
        {"id":"2","name":"牡丹江附属中学","schadd":"牡丹江市","schtype":"1"},
        {"id":"3","name":"哈尔滨附属小学","schadd":"黑龙江省呼和浩特市城六区","schtype":"1"},
        {"id":"4","name":"重庆市附属小学","schadd":"重庆市城九区","schtype":"1"},
    ]
    //配置权限
	$scope.rangeAcitive = false;
	$scope.range = [
		{id:"1","name" : '区县管理员'},
		{id:"2","name" : '学校管理员'},
		{id:"3","name" : '校领导'},
		{id:"4","name" : '教导主任'},
        {id:"5","name" : '年级主任'},
		{id:"6","name" : '班主任'},
        {id:"7","name" : '学科组长'},
        {id:"8","name" : '教研员'},
        {id:"9","name" : '任课老师'},
	];
    
    //地区循环
    $scope.areas=[
        {id:"1","name":"朝阳区"},
        {id:"2","name":"海淀区"},
        {id:"3","name":"丰台区"},
        {id:"4","name":"西城区"},
        {id:"5","name":"东城区"},
        {id:"6","name":"昌平区"},
        {id:"7","name":"密云县"},
        {id:"8","name":"石景山区"},
        {id:"9","name":"通州区"},
        {id:"10","name":"顺义区"},
    ]
    
    $scope.sctypes=[
        {"id":"1","name":"幼儿园"},
        {"id":"2","name":"小学"},
        {"id":"3","name":"初中"},
        {"id":"4","name":"高中"},
        {"id":"5","name":"职中"},
        {"id":"6","name":"中专"},
        {"id":"7","name":"政府机构"},
        {"id":"8","name":"特殊教育"}
    ]
//    $scope.changeActive=1;
    $scope.changeId=function(index){
        $scope.changeActive=$scope.areas[index].id;
        console.log($scope.sty.name)
    }
    
    $scope.changeType=function(index){
        $scope.changeTypeid=$scope.sctypes[index].id;
    }
    
    
    //批量删除和全选操作
    //创建变量用来保存选中结果，作为你选取的checkbox的存储器
    $scope.selected = []; 
    var updateSelected = function (action, id) {
        if (action == 'add' && $scope.selected.indexOf(id) == -1) $scope.selected.push(id);
        if (action == 'remove' && $scope.selected.indexOf(id) != -1) $scope.selected.splice($scope.selected.indexOf(id), 1);
    };
    $scope.updateSelection = function ($event, id) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, id);
    };
    //全选操作  
    $scope.selectAll = function ($event) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        for (var i = 0; i < $scope.userTeacher1.length; i++) {
            var contact = $scope.userTeacher1[i];
            updateSelected(action, contact.userId);
        }
    };
    $scope.isSelected = function (id) {
        return $scope.selected.indexOf(id) >= 0;
    };
    $scope.isSelectedAll = function () {
        // 判断当前内容是否全部被选中，
        return $scope.selected.length === $scope.userTeacher1.length;
    };
    
    //点击操作按钮出现下拉菜单
    $scope.contrl = function (event) {
        //切换显示下拉列表
        if (angular.element(event.target).siblings("ul").is(":hidden")) {
            angular.element(event.target).siblings("ul").slideDown();
        }
        else {
            angular.element(event.target).siblings("ul").slideUp();
        }
        //移出隐藏
        angular.element(event.target).siblings("ul").mouseleave(function () {
                $(this).slideUp();
            })
            //鼠标移出tr时，隐藏list
        $scope.yincanglist = function (event) {
                angular.element(event.target).children().siblings("ul").slideUp()
            }
            //编辑
        $scope.editor = function (n) {
                $scope.addteacherTc = false;
                angular.element(event.target).siblings("ul").slideUp(0);
                //根据用户id（n）查询用户信息
                if(n=="097635215263"){
                    $scope.teacherName="张三";
                    $scope.teacherNo="123456789010287654";
                    $scope.sex="女";
                    $scope.teacherMobl="13602222222";
                }
            }
            //审核
        $scope.shenhe = function (index,n, m) {
                angular.element(event.target).siblings("ul").slideUp(0);
                angular.element(event.target).siblings("ul").closest("tr").find("i").removeClass("wx_yuan_cheng");
                angular.element(event.target).siblings("ul").closest("tr").find("span.wx_will_examine").html("");
            }
            //停用
        $scope.tingyong = function (n) {
                console.log(n)
            }
            //重置密码
        $scope.chongzhimima = function (n) {
                console.log(n)
            }
            //删除
        $scope.deluser = function (index, strId) {
                $scope.conformTc = false;
                angular.element(event.target).siblings("ul").slideUp(0);
                $scope.conformdel = function () {
                    $scope.conformTc = true;
                    $scope.userTeacher1.splice(index, 1);
                    $scope.userTeacherHuishou.push({"name": "张三", "mobl": "13602222222", "role": "捷成管理员", "userId": "0976352153263", "uStating": "0"})
                }
            }
            // 批量删除
        $scope.alldelete = function () {
            var datas = {
                userId: $scope.selected
            };

            if($scope.selected.length==0){
                alert("请至少选择一个再删除")
            }else{
                $scope.conformTc = false;
                angular.element(event.target).siblings("ul").slideUp(0);
                $scope.conformdel = function () {
                    $scope.conformTc = true;
                    
                }
            }
        };
        
        //批量审核
        $scope.piliangshenhe=function(){
            
            var datas = {
                userId: $scope.selected
            };

            if($scope.selected.length==0){
                alert("请至少选择一个再删除")
            }else{
                angular.element(event.target).siblings("ul").slideUp(0);
                angular.element(event.target).parents().find("tr").find("i").removeClass("wx_yuan_cheng");
                angular.element(event.target).parents().find("tr").find("span.wx_will_examine").html("");
            }
        }
        
        //还原
        $scope.resetUser = function (index, n) {
           
        }
    }
    
    //添加用户 确认提交按钮
    $scope.sureTj=function(){
        
        //身份证号验证
        var regExp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(regExp.test($scope.teacherNo)==false){
            alert("请输入正确的身份证号");
            return;
        }
        
        $scope.new=[]
        //循环出选中的li的id
        for(var i=0;i<$scope.range.length;i++){
            
           if($(".wx_add_ter_ul li").eq(i).hasClass("active")){
               $scope.new.push(i+1)
//               console.log($(".wx_add_ter_ul li").eq(i).html())
           }
            
        }
        //把id传给后台,修改角色
        console.log($scope.new)
    }
    
     //过滤查询教师信息
    $scope.userTeacher1 = $scope.userTeacher;
    $scope.selectTeacher = function () {
            if ($scope.teacherInfo == "" || $scope.teacherInfo == undefined) {
                $(".search_user_input").addClass("animated shake");
                $(".search_user_input").attr('placeholder', "请输入教师信息");
                $(".search_user_input").focus();
                setTimeout(function () {
                    $(".search_user_input").removeClass("animated shake");
                    $(".search_user_input").attr('placeholder', "请输入教师姓名/手机号")
                }, 1000)
            }
            else {
                $scope.userTeacher1 = $filter("filter")($scope.userTeacher, $scope.teacherInfo);
            }
        }
        //新增教师
    $scope.addteacher = function () {
        $scope.addteacherTc = false;
    }
        // 分页组件
    $scope.contentpageConfig = {
        currentPage: 1
        , pagesLength: 9
        , totalItems: 51
        , itemsPerPage: pageSize
        , perPageOptions: [5]
        , onChange: function () {
            
        }
    }
    

    //选择区域
    $scope.keyinput=function(){
        if($scope.sckey.length>0){
            $scope.inputrue=false;
            $scope.schooldata1=$filter("filter")($scope.schooldata,$scope.sckey)
        }else{
            $scope.inputrue=true;
        }
    }
    
    //点击出现下拉
    $scope.showxiala=function(){
        $scope.selectarea=false;
    }

}]);
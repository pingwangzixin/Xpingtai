app.controller('userStudentCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$q', '$rootScope', '$filter', function ($scope, $state, $timeout, $http, $location, $q, $rootScope, $filter) {
    //默认参数设置
    $scope.addstrTc = true;
    $scope.strHide = false;
    $scope.showlist = false;
    $scope.huishouzhan = false;
    $scope.yincang = false;
    $scope.conformTc = true;
    var pageSize = 10;
    $scope.userStudenthuishouzhan=[]
    
    
    //用户类型：区县0、校管理员1、班主任2、
    $scope.userType = 0;
    if ($scope.userType == 1) {
        $scope.strShow = true;
    }
    //用户状态
    $scope.userStates = [
            {
                "id": "1"
                , "name": "在校学生"
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
        //用户状态
    $scope.ustate = "1"
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
    }
    $scope.userStudent = [
            {
                "name": "张三"
                , "mobl": "13602222222"
                , "strId": "LZ11010819911222868"
                , "gradId": "三年级"
                , "classId": "2班"
                , "uStating": "0"
        }
        , {
                "name": "李四"
                , "mobl": "13602226744"
                , "strId": "LZ11010819911222448"
                , "gradId": "三年级"
                , "classId": "2班"
                , "uStating": "0"
        }
        , {
                "name": "胡歌天"
                , "mobl": "13602256725"
                , "strId": "LZ110108199112243888"
                , "gradId": "三年级"
                , "classId": "2班"
                , "uStating": "0"
        }
        , {
                "name": "刘和刚"
                , "mobl": "13602246528"
                , "strId": "LZ1101081991122340888"
                , "gradId": "三年级"
                , "classId": "2班"
                , "uStating": "0"
        }
        , {
                "name": "张思德"
                , "mobl": "13602222222"
                , "strId": "LZ110108199112220888"
                , "gradId": "三年级"
                , "classId": "2班"
                , "uStating": "0"
        }
        , {
                "name": "江京东"
                , "mobl": "13605672243"
                , "strId": "LZ11010819911228740888"
                , "gradId": "三年级"
                , "classId": "2班"
                , "uStating": "1"
        }
        , {
                "name": "刘和刚"
                , "mobl": "13602222256"
                , "strId": "LZ11010819454220888"
                , "gradId": "三年级"
                , "classId": "2班"
                , "uStating": "0"
        }
        , {
                "name": "张思德"
                , "mobl": "13602222926"
                , "strId": "LZ11010819456220888"
                , "gradId": "三年级"
                , "classId": "2班"
                , "uStating": "0"
        }
        , {
                "name": "胡歌天"
                , "mobl": "13602222672"
                , "strId": "LZ1101345112220888"
                , "gradId": "三年级"
                , "classId": "2班"
                , "uStating": "0"
        }
        , {
                "name": "李四"
                , "mobl": "13602256789"
                , "strId": "LZ110134512220888"
                , "gradId": "三年级"
                , "classId": "2班"
                , "uStating": "0"
        }
    , ]
        //总人数获取
    $scope.totalUser = $scope.userStudent.length;
    $scope.userStudent1 = $scope.userStudent;
    //编辑修改学生信息
    $scope.showUl = function (event) {
            angular.element(event.target).next().show()
        }
        //查询过滤学生信息
    $scope.selectStudent = function () {
            if ($scope.studentInfo == "" || $scope.studentInfo == undefined) {
                $(".search_user_input").addClass("animated shake");
                $(".search_user_input").attr('placeholder', "请输入学生信息");
                $(".search_user_input").focus();
                setTimeout(function () {
                    $(".search_user_input").removeClass("animated shake");
                    $(".search_user_input").attr('placeholder', "请输入学生姓名/学籍号")
                }, 1000)
            }
            else {
                $scope.userStudent1 = $filter("filter")($scope.userStudent, $scope.studentInfo)
            }
        }

        //新增学生
    $scope.addstudentInfo = function () {
            $scope.addstrTc = false;
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
        for (var i = 0; i < $scope.userStudent1.length; i++) {
            var contact = $scope.userStudent1[i];
            updateSelected(action, contact.strId);
        }
        
        console.log($scope.selected)
    };
    $scope.isSelected = function (id) {
        return $scope.selected.indexOf(id) >= 0;
    };
    $scope.isSelectedAll = function () {
        // 判断当前内容是否全部被选中，
        return $scope.selected.length === $scope.userStudent1.length;
    };
    
        // 分页组件
    $scope.contentpageConfig = {
            currentPage: 1
            , pagesLength: 9
            , totalItems: 100
            , itemsPerPage: pageSize
            , perPageOptions: [10]
            , onChange: function () {}
        }
        //操作按钮下拉菜单事件
    $scope.contrl = function (event) {
        //切换显示下拉列表
        if (angular.element(event.target).siblings("ul").is(":hidden")) {
            angular.element(event.target).siblings("ul").slideDown();
        }
        else {
            angular.element(event.target).siblings("ul").slideUp(100);
        }
        angular.element(event.target).siblings("ul").mouseleave(function () {
                $(this).slideUp(100);
            })
            //鼠标移出tr时，隐藏list
        $scope.yincanglist = function (event) {
                angular.element(event.target).children().siblings("ul").slideUp(100)
            }
            //编辑
        $scope.editor = function (n) {
                console.log(n);
                $scope.addstrTc = false;
                angular.element(event.target).siblings("ul").slideUp(100);
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
            //删除
        $scope.deluser = function (index, strId) {
            $scope.conformTc = false;
            angular.element(event.target).siblings("ul").slideUp(100);
            $scope.conformdel = function () {
                $scope.conformTc = true;
                $scope.userStudent1.splice(index, 1);
            }
        }
    }
    
    
    //新增学生 确认
    $scope.sureTj=function(){
        //验证学籍号
        var regExp = /^[G|L][1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        
        if(regExp.test($scope.studentNo)==false){
            alert("请输入正确的学籍号")
        }
    }
    
}]);
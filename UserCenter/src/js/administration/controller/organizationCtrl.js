app.controller('organizationCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$q', '$rootScope', '$filter', function ($scope, $state, $timeout, $http, $location, $q, $rootScope, $filter) {
    //初始化配置
    var pageSize = 10;
    $scope.xinzeng=false;
    $scope.addteacherTc=true;
    $scope.conformTc=true;

    //用户状态
    $scope.userStates = [
            {
                "id": "1"
                , "name": "注册机构"
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
        $scope.xinzeng=false;
    }
    if ($scope.ustate == "2") {
        $scope.yizhuce = false;
        $scope.huishouzhan = false;
        $scope.yitingyong = true;
        $scope.xinzeng=true;
    }
    if ($scope.ustate == "3") {
        $scope.huishouzhan = true;
        $scope.yitingyong = false;
        $scope.yizhuce = false;
        $scope.xinzeng=true;
    }
    //下拉选中用户状态 改变编辑的ul列表内容
    $scope.userstateChange = function () {
        if ($scope.ustate == "1") {
            $scope.yizhuce = true;
            $scope.huishouzhan = false;
            $scope.yitingyong = false;
            $scope.xinzeng=false;
        }
        if ($scope.ustate == "2") {
            $scope.yizhuce = false;
            $scope.huishouzhan = false;
            $scope.yitingyong = true;
            $scope.xinzeng=true;
        }
        if ($scope.ustate == "3") {
            $scope.huishouzhan = true;
            $scope.yitingyong = false;
            $scope.yizhuce = false;
            $scope.xinzeng=true;
        }
    }
    
    //新增机构
    $scope.range=[
        {"id":'1',"name":"幼儿园"},
        {"id":'2',"name":"小学"},
        {"id":'3',"name":"初中"},
        {"id":'4',"name":"中专"},
        {"id":'5',"name":"高职"},
        {"id":'6',"name":"高中"},
        {"id":'7',"name":"特殊教育学校"},
        {"id":'8',"name":"政府机构"},
    ]
    
    $scope.addjigouInfo=function(){
        $scope.addteacherTc=false;
    }
    
    $scope.changeaddtype=function(index){
        $scope.addtype=$scope.range[index].id;
    }
    
    $scope.sureTj=function(){
        console.log($scope.addtype)
    }
    
    
    $scope.schools = [
        {
            "schoolname": "林口县龙爪镇龙报希望小学"
            , "schoolType": "高中"
        }
        , {
            "schoolname": "牡丹江市海南朝鲜族乡朝鲜族中心校"
            , "schoolType": "政府机构"
        }
        , {
            "schoolname": "林口县龙爪镇龙报希望小学"
            , "schoolType": "初中"
        }
        , {
            "schoolname": "牡丹江市海南朝鲜族乡朝鲜族中心校"
            , "schoolType": "高中"
        }
        , {
            "schoolname": "林口县龙爪镇龙报希望小学"
            , "schoolType": "小学"
        }
        , {
            "schoolname": "林口县龙爪镇龙报希望小学"
            , "schoolType": "小学"
        }
        , {
            "schoolname": "牡丹江市海南朝鲜族乡朝鲜族中心校"
            , "schoolType": "高中"
        }
        , {
            "schoolname": "林口县龙爪镇龙报希望小学"
            , "schoolType": "小学"
        }
        , {
            "schoolname": "牡丹江市海南朝鲜族乡朝鲜族中心校"
            , "schoolType": "小学"
        }
        , {
            "schoolname": "林口县龙爪镇龙报希望小学"
            , "schoolType": "高中"
        }
            , ]
    $scope.contrl = function (event) {
        console.log(angular.element(event.target))
    }
    $scope.schools1 = $scope.schools;
    //查询机构信息
    $scope.selectSchool = function () {
            if ($scope.schoolInfo == "" || $scope.schoolInfo == undefined) {
                $(".search_user_input").addClass("animated shake");
                $(".search_user_input").attr('placeholder', "请输入机构信息");
                $(".search_user_input").focus();
                setTimeout(function () {
                    $(".search_user_input").removeClass("animated shake");
                    $(".search_user_input").attr('placeholder', "请输入机构类型/机构名称")
                }, 1000)
            }
            else {
                $scope.schools1 = $filter("filter")($scope.schools, $scope.schoolInfo);
            }
        }
        //实时查询过滤机构信息
    $scope.reltime = function () {
            $scope.schools1 = $filter("filter")($scope.schools, $scope.schoolInfo);
        }
        // 分页组件
    $scope.contentpageConfig = {
        currentPage: 1
        , pagesLength: 9
        , totalItems: 100
        , itemsPerPage: pageSize
        , perPageOptions: [10]
        , onChange: function () {}
    }
    
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
                console.log(n);
                $scope.addteacherTc = false;
                angular.element(event.target).siblings("ul").slideUp(100);
            }
            //审核
        $scope.shenhe = function (n, m) {
                console.log(n)
                console.log(m)
                angular.element(event.target).siblings("ul").slideUp(100);
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
        $scope.deluser = function (n) {
                console.log(n)
                $scope.conformTc=false;
            }
            //还原
        $scope.resetUser = function (n) {
            console.log(n)
        }
    }
    
    
}]);
app.controller('userParentCtrl', ['$scope', '$state', '$timeout', '$http', '$location', '$q', '$rootScope', '$filter', function ($scope, $state, $timeout, $http, $location, $q, $rootScope, $filter) {
    var pageSize = 10;
    $scope.parentTc = true;
    $scope.conformTc = true;
    //用户类型：区县0、校管理员1、班主任2、
    $scope.userType = 2;
    if ($scope.userType == 2) {
        $scope.parentShow = true;
    }
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
        //模拟数据
    $scope.userParent = [
        {
            "name": "张三"
            , "mobl": "13502222222"
            , "strId": "LZ114567348795460888"
            , "strName": "张八一"
            , "uStating": "0"
        }
        , {
            "name": "李四"
            , "mobl": "13602226744"
            , "strId": "LZ134534145620888"
            , "strName": "李八一"
            , "uStating": "0"
        }
        , {
            "name": "胡歌天"
            , "mobl": "13502256725"
            , "strId": "LZ110345345345362220888"
            , "strName": "胡八一"
            , "uStating": "0"
        }
        , {
            "name": "刘和刚"
            , "mobl": "13502246528"
            , "strId": "LZ1345345345346220888"
            , "strName": "刘八一"
            , "uStating": "0"
        }
        , {
            "name": "张思德"
            , "mobl": "13602222222"
            , "strId": "LZ134534545620888"
            , "strName": "张八一"
            , "uStating": "0"
        }
        , {
            "name": "江京东"
            , "mobl": "13305672243"
            , "strId": "LZ1134534112220888"
            , "strName": "江八一"
            , "uStating": "1"
        }
        , {
            "name": "刘和刚"
            , "mobl": "13802222256"
            , "strId": "LZ113453467560888"
            , "strName": "刘八一"
            , "uStating": "0"
        }
        , {
            "name": "张思德"
            , "mobl": "13602222926"
            , "strId": "LZ114353445743220888"
            , "strName": "张八一"
            , "uStating": "0"
        }
        , {
            "name": "胡歌天"
            , "mobl": "13702222672"
            , "strId": "LZ11034573420888"
            , "strName": "胡八一"
            , "uStating": "0"
        }
        , {
            "name": "李四"
            , "mobl": "13702256789"
            , "strId": "LZ114543564670888"
            , "strName": "李八一"
            , "uStating": "0"
        }
    , ]
    $scope.userParent1 = $scope.userParent;
    //总人数获取
    $scope.totalUser = $scope.userParent.length;
    //操作按钮
    $scope.contrl = function (event) {
            //切换显示下拉列表
            if (angular.element(event.target).siblings("ul").is(":hidden")) {
                angular.element(event.target).siblings("ul").slideDown();
            }
            else {
                angular.element(event.target).siblings("ul").slideUp();
            }
            //鼠标移出list隐藏下拉
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
                    $scope.parentTc = false;
                    angular.element(event.target).siblings("ul").slideUp(100);
                }
                //审核
                //审核
            $scope.shenhe = function (index, n, m) {
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
                    angular.element(event.target).siblings("ul").slideUp(100);
                    $scope.conformdel = function () {
                        $scope.conformTc = true;
                        $scope.userParent1.splice(index, 1);
                    }
                }
                //批量删除
            $scope.piliangdel = function () {
                $scope.conformTc = false;
                $scope.conformdel = function () {
                    $scope.conformTc = true;
                }
            }
        }
        //查询过滤家长信息
    $scope.selectParent = function () {
            if ($scope.parentInfo == "" || $scope.parentInfo == undefined) {
                $(".search_user_input").addClass("animated shake");
                $(".search_user_input").attr('placeholder', "请输入家长信息");
                $(".search_user_input").focus();
                setTimeout(function () {
                    $(".search_user_input").removeClass("animated shake");
                    $(".search_user_input").attr('placeholder', "请输入家长姓名/学籍号/手机号")
                }, 1000)
            }
            else {
                $scope.userParent1 = $filter("filter")($scope.userParent, $scope.parentInfo);
            }
        }
        //添加信息
    $scope.addParent = function () {
            $scope.parentTc = false;
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
        //新增学生 确认
    $scope.sureTj = function () {
            //验证学籍号
            var regExp = /^[G|L][1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
            var shoujiregExp = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/;
            if (regExp.test($scope.parentStuno) == false) {
                alert("请输入正确的学籍号")
            }
            if (shoujiregExp.test($scope.parentMobl) == false) {
                alert("请输入正确的手机")
            }
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
        for (var i = 0; i < $scope.userParent1.length; i++) {
            var contact = $scope.userParent1[i];
            updateSelected(action, contact.strId);
        }
        console.log($scope.selected)
    };
    $scope.isSelected = function (id) {
        return $scope.selected.indexOf(id) >= 0;
    };
    $scope.isSelectedAll = function () {
        // 判断当前内容是否全部被选中，
        return $scope.selected.length === $scope.userParent1.length;
    };
}]);
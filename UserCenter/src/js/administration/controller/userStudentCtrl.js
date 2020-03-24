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
    
    
    //根据班级Id查询学生列表
        
    $http.post('http://192.168.9.98/jdz-jeuc/api/uc/ucUser/findStuInfoByCid?gradeId=grade_1a04505fb32b479ebd33b24a54a5fd4f&classId=class_b02cc338a2814dd6bcf711aee99c2944').success(function(res){
     
        console.log(res)
    })
    
    $scope.userStudent =  [
            {
                "id": "405a86bd62024473aed548b45d1ce4a9",
                "remark": "",
                "createBy": "",
                "createDate": "2017-08-28 16:10:50.000",
                "updateBy": "",
                "updateDate": "",
                "delFlag": "0",
                "loginName": "G654323200308312329",
                "password": "14e1b600b1fd579f47433b88e8d85291",
                "realname": "白云飞",
                "sex": "女",
                "idCard": "",
                "userNation": "1",
                "userJiguan": "",
                "userAddress": "",
                "userEmail": "",
                "userPhone": "",
                "userMobile": "",
                "userQq": "",
                "userFace": "http://192.168.9.98:8080/resource/user/face/default.jpg",
                "birthday": "2017-01-02 00:00:00.0",
                "userIndex": "",
                "state": 1,
                "userType": "2",
                "source": "",
                "stuId": "",
                "stuNo": "G654323200308312329",
                "stuName": "",
                "year": "2016",
                "classId": "class_06c2411e1a134b7f8c08e1c448c066e9",
                "className": "1",
                "gradeId": "grade_1a04505fb32b479ebd33b24a54a5fd4f",
                "gradeName": "高一",
                "cuid": "5289d61ea0e140e581a700d93ed1a25b",
                "teaName": "吴指明",
                "officeId": "office_48e5a1ff1d9642cd83cfad3bd250b143",
                "officeName": "示例高中一",
                "officeCode": "",
                "officeGrade": "",
                "areaId": "",
                "areaName": "",
                "ifCourse": "",
                "subjectId": "",
                "subjectName": "",
                "stuPoints": "",
                "stuGold": "",
                "teaTitle": "",
                "teaRole": "",
                "subjectCourseName": "",
                "parId": "",
                "parName": "",
                "parEmail": "",
                "parMobile": "",
                "relationId": "",
                "pageNo": "",
                "pageSize": "",
                "keyword": "",
                "deviceName": "",
                "groupName": "高一1班1组",
                "deviceId": "",
                "groupId": ""
            },
            {
                "id": "8c23ef63259d461cb46b3a55cb86943e",
                "remark": "",
                "createBy": "",
                "createDate": "2017-08-28 16:10:50.000",
                "updateBy": "",
                "updateDate": "",
                "delFlag": "0",
                "loginName": "G654323200201261920",
                "password": "14e1b600b1fd579f47433b88e8d85291",
                "realname": "张伟",
                "sex": "女",
                "idCard": "",
                "userNation": "",
                "userJiguan": "",
                "userAddress": "",
                "userEmail": "",
                "userPhone": "",
                "userMobile": "",
                "userQq": "",
                "userFace": "http://192.168.9.98:8080/resource/user/face/default.jpg",
                "birthday": "",
                "userIndex": "",
                "state": 1,
                "userType": "2",
                "source": "",
                "stuId": "",
                "stuNo": "G654323200201261920",
                "stuName": "",
                "year": "2016",
                "classId": "class_06c2411e1a134b7f8c08e1c448c066e9",
                "className": "1",
                "gradeId": "grade_1a04505fb32b479ebd33b24a54a5fd4f",
                "gradeName": "高一",
                "cuid": "5289d61ea0e140e581a700d93ed1a25b",
                "teaName": "吴指明",
                "officeId": "office_48e5a1ff1d9642cd83cfad3bd250b143",
                "officeName": "示例高中一",
                "officeCode": "",
                "officeGrade": "",
                "areaId": "",
                "areaName": "",
                "ifCourse": "",
                "subjectId": "",
                "subjectName": "",
                "stuPoints": "",
                "stuGold": "",
                "teaTitle": "",
                "teaRole": "",
                "subjectCourseName": "",
                "parId": "",
                "parName": "",
                "parEmail": "",
                "parMobile": "",
                "relationId": "",
                "pageNo": "",
                "pageSize": "",
                "keyword": "",
                "deviceName": "",
                "groupName": "高一1班2组",
                "deviceId": "",
                "groupId": ""
            },
            {
                "id": "6ee06c6c51b34f758e27bab1e39a5ff0",
                "remark": "",
                "createBy": "",
                "createDate": "2017-08-28 16:10:50.000",
                "updateBy": "",
                "updateDate": "",
                "delFlag": "0",
                "loginName": "G654323200005212320",
                "password": "14e1b600b1fd579f47433b88e8d85291",
                "realname": "曹大卫",
                "sex": "女",
                "idCard": "",
                "userNation": "",
                "userJiguan": "",
                "userAddress": "",
                "userEmail": "",
                "userPhone": "",
                "userMobile": "",
                "userQq": "",
                "userFace": "http://192.168.9.98:8080/resource/user/face/default.jpg",
                "birthday": "",
                "userIndex": "",
                "state": 1,
                "userType": "2",
                "source": "",
                "stuId": "",
                "stuNo": "G654323200005212320",
                "stuName": "",
                "year": "2016",
                "classId": "class_06c2411e1a134b7f8c08e1c448c066e9",
                "className": "1",
                "gradeId": "grade_1a04505fb32b479ebd33b24a54a5fd4f",
                "gradeName": "高一",
                "cuid": "5289d61ea0e140e581a700d93ed1a25b",
                "teaName": "吴指明",
                "officeId": "office_48e5a1ff1d9642cd83cfad3bd250b143",
                "officeName": "示例高中一",
                "officeCode": "",
                "officeGrade": "",
                "areaId": "",
                "areaName": "",
                "ifCourse": "",
                "subjectId": "",
                "subjectName": "",
                "stuPoints": "",
                "stuGold": "",
                "teaTitle": "",
                "teaRole": "",
                "subjectCourseName": "",
                "parId": "",
                "parName": "",
                "parEmail": "",
                "parMobile": "",
                "relationId": "",
                "pageNo": "",
                "pageSize": "",
                "keyword": "",
                "deviceName": "",
                "groupName": "高一1班4组",
                "deviceId": "",
                "groupId": ""
            },
            {
                "id": "0100509771714390843ebce57742edca",
                "remark": "",
                "createBy": "",
                "createDate": "2017-08-28 16:10:50.000",
                "updateBy": "",
                "updateDate": "",
                "delFlag": "0",
                "loginName": "G654323200208240524",
                "password": "14e1b600b1fd579f47433b88e8d85291",
                "realname": "李建华",
                "sex": "女",
                "idCard": "",
                "userNation": "",
                "userJiguan": "",
                "userAddress": "",
                "userEmail": "",
                "userPhone": "",
                "userMobile": "",
                "userQq": "",
                "userFace": "http://192.168.9.98:8080/resource/user/face/default.jpg",
                "birthday": "",
                "userIndex": "",
                "state": 1,
                "userType": "2",
                "source": "",
                "stuId": "",
                "stuNo": "G654323200208240524",
                "stuName": "",
                "year": "2016",
                "classId": "class_06c2411e1a134b7f8c08e1c448c066e9",
                "className": "1",
                "gradeId": "grade_1a04505fb32b479ebd33b24a54a5fd4f",
                "gradeName": "高一",
                "cuid": "5289d61ea0e140e581a700d93ed1a25b",
                "teaName": "吴指明",
                "officeId": "office_48e5a1ff1d9642cd83cfad3bd250b143",
                "officeName": "示例高中一",
                "officeCode": "",
                "officeGrade": "",
                "areaId": "",
                "areaName": "",
                "ifCourse": "",
                "subjectId": "",
                "subjectName": "",
                "stuPoints": "",
                "stuGold": "",
                "teaTitle": "",
                "teaRole": "",
                "subjectCourseName": "",
                "parId": "",
                "parName": "",
                "parEmail": "",
                "parMobile": "",
                "relationId": "",
                "pageNo": "",
                "pageSize": "",
                "keyword": "",
                "deviceName": "",
                "groupName": "高一1班5组",
                "deviceId": "",
                "groupId": ""
            },
            {
                "id": "558dadc7e96e4821b5010846f8030c9e",
                "remark": "",
                "createBy": "",
                "createDate": "2017-08-28 16:10:50.000",
                "updateBy": "",
                "updateDate": "",
                "delFlag": "0",
                "loginName": "G654323200309110024",
                "password": "14e1b600b1fd579f47433b88e8d85291",
                "realname": "曹雄",
                "sex": "女",
                "idCard": "",
                "userNation": "",
                "userJiguan": "",
                "userAddress": "",
                "userEmail": "",
                "userPhone": "",
                "userMobile": "",
                "userQq": "",
                "userFace": "http://192.168.9.98:8080/resource/user/face/default.jpg",
                "birthday": "",
                "userIndex": "",
                "state": 1,
                "userType": "2",
                "source": "",
                "stuId": "",
                "stuNo": "G654323200309110024",
                "stuName": "",
                "year": "2016",
                "classId": "class_06c2411e1a134b7f8c08e1c448c066e9",
                "className": "1",
                "gradeId": "grade_1a04505fb32b479ebd33b24a54a5fd4f",
                "gradeName": "高一",
                "cuid": "5289d61ea0e140e581a700d93ed1a25b",
                "teaName": "吴指明",
                "officeId": "office_48e5a1ff1d9642cd83cfad3bd250b143",
                "officeName": "示例高中一",
                "officeCode": "",
                "officeGrade": "",
                "areaId": "",
                "areaName": "",
                "ifCourse": "",
                "subjectId": "",
                "subjectName": "",
                "stuPoints": "",
                "stuGold": "",
                "teaTitle": "",
                "teaRole": "",
                "subjectCourseName": "",
                "parId": "",
                "parName": "",
                "parEmail": "",
                "parMobile": "",
                "relationId": "",
                "pageNo": "",
                "pageSize": "",
                "keyword": "",
                "deviceName": "1261362955",
                "groupName": "高一1班1组",
                "deviceId": "",
                "groupId": ""
            },
            {
                "id": "28174adf62ef4475a8434ca4d500f626",
                "remark": "",
                "createBy": "",
                "createDate": "2017-08-28 16:10:50.000",
                "updateBy": "",
                "updateDate": "",
                "delFlag": "0",
                "loginName": "G654323200203250512",
                "password": "14e1b600b1fd579f47433b88e8d85291",
                "realname": "韩朝辉",
                "sex": "男",
                "idCard": "",
                "userNation": "",
                "userJiguan": "",
                "userAddress": "",
                "userEmail": "",
                "userPhone": "",
                "userMobile": "",
                "userQq": "",
                "userFace": "http://192.168.9.98:8080/resource/user/face/default.jpg",
                "birthday": "",
                "userIndex": "",
                "state": 1,
                "userType": "2",
                "source": "",
                "stuId": "",
                "stuNo": "G654323200203250512",
                "stuName": "",
                "year": "2016",
                "classId": "class_06c2411e1a134b7f8c08e1c448c066e9",
                "className": "1",
                "gradeId": "grade_1a04505fb32b479ebd33b24a54a5fd4f",
                "gradeName": "高一",
                "cuid": "5289d61ea0e140e581a700d93ed1a25b",
                "teaName": "吴指明",
                "officeId": "office_48e5a1ff1d9642cd83cfad3bd250b143",
                "officeName": "示例高中一",
                "officeCode": "",
                "officeGrade": "",
                "areaId": "",
                "areaName": "",
                "ifCourse": "",
                "subjectId": "",
                "subjectName": "",
                "stuPoints": "",
                "stuGold": "",
                "teaTitle": "",
                "teaRole": "",
                "subjectCourseName": "",
                "parId": "",
                "parName": "",
                "parEmail": "",
                "parMobile": "",
                "relationId": "",
                "pageNo": "",
                "pageSize": "",
                "keyword": "",
                "deviceName": "",
                "groupName": "高一1班3组",
                "deviceId": "",
                "groupId": ""
            },
            {
                "id": "c9205ea64e7b4086b603b41d06dd4158",
                "remark": "",
                "createBy": "",
                "createDate": "2017-08-28 16:10:50.000",
                "updateBy": "",
                "updateDate": "",
                "delFlag": "0",
                "loginName": "G654323200304180023",
                "password": "14e1b600b1fd579f47433b88e8d85291",
                "realname": "马君武",
                "sex": "女",
                "idCard": "",
                "userNation": "",
                "userJiguan": "",
                "userAddress": "",
                "userEmail": "",
                "userPhone": "",
                "userMobile": "",
                "userQq": "",
                "userFace": "http://192.168.9.98:8080/resource/user/face/default.jpg",
                "birthday": "",
                "userIndex": "",
                "state": 1,
                "userType": "2",
                "source": "",
                "stuId": "",
                "stuNo": "G654323200304180023",
                "stuName": "",
                "year": "2016",
                "classId": "class_06c2411e1a134b7f8c08e1c448c066e9",
                "className": "1",
                "gradeId": "grade_1a04505fb32b479ebd33b24a54a5fd4f",
                "gradeName": "高一",
                "cuid": "5289d61ea0e140e581a700d93ed1a25b",
                "teaName": "吴指明",
                "officeId": "office_48e5a1ff1d9642cd83cfad3bd250b143",
                "officeName": "示例高中一",
                "officeCode": "",
                "officeGrade": "",
                "areaId": "",
                "areaName": "",
                "ifCourse": "",
                "subjectId": "",
                "subjectName": "",
                "stuPoints": "",
                "stuGold": "",
                "teaTitle": "",
                "teaRole": "",
                "subjectCourseName": "",
                "parId": "",
                "parName": "",
                "parEmail": "",
                "parMobile": "",
                "relationId": "",
                "pageNo": "",
                "pageSize": "",
                "keyword": "",
                "deviceName": "2835993867",
                "groupName": "高一1班1组",
                "deviceId": "",
                "groupId": ""
            },
            {
                "id": "07b9cd5b48724fe1b74af0c3b279a77a",
                "remark": "",
                "createBy": "",
                "createDate": "2017-08-28 16:10:50.000",
                "updateBy": "",
                "updateDate": "",
                "delFlag": "0",
                "loginName": "G500382200305039201",
                "password": "14e1b600b1fd579f47433b88e8d85291",
                "realname": "李梓涵",
                "sex": "女",
                "idCard": "",
                "userNation": "",
                "userJiguan": "",
                "userAddress": "",
                "userEmail": "",
                "userPhone": "",
                "userMobile": "",
                "userQq": "",
                "userFace": "http://192.168.9.98:8080/resource/user/face/default.jpg",
                "birthday": "",
                "userIndex": "",
                "state": 1,
                "userType": "2",
                "source": "",
                "stuId": "",
                "stuNo": "G500382200305039201",
                "stuName": "",
                "year": "2016",
                "classId": "class_06c2411e1a134b7f8c08e1c448c066e9",
                "className": "1",
                "gradeId": "grade_1a04505fb32b479ebd33b24a54a5fd4f",
                "gradeName": "高一",
                "cuid": "5289d61ea0e140e581a700d93ed1a25b",
                "teaName": "吴指明",
                "officeId": "office_48e5a1ff1d9642cd83cfad3bd250b143",
                "officeName": "示例高中一",
                "officeCode": "",
                "officeGrade": "",
                "areaId": "",
                "areaName": "",
                "ifCourse": "",
                "subjectId": "",
                "subjectName": "",
                "stuPoints": "",
                "stuGold": "",
                "teaTitle": "",
                "teaRole": "",
                "subjectCourseName": "",
                "parId": "",
                "parName": "",
                "parEmail": "",
                "parMobile": "",
                "relationId": "",
                "pageNo": "",
                "pageSize": "",
                "keyword": "",
                "deviceName": "",
                "groupName": "高一1班3组",
                "deviceId": "",
                "groupId": ""
            },
            {
                "id": "1789d3e4c5b243b3ad54891392ad9a2a",
                "remark": "",
                "createBy": "",
                "createDate": "2017-08-28 16:10:50.000",
                "updateBy": "",
                "updateDate": "",
                "delFlag": "0",
                "loginName": "G654323200104200536",
                "password": "14e1b600b1fd579f47433b88e8d85291",
                "realname": "尚远志",
                "sex": "男",
                "idCard": "",
                "userNation": "",
                "userJiguan": "",
                "userAddress": "",
                "userEmail": "",
                "userPhone": "",
                "userMobile": "",
                "userQq": "",
                "userFace": "http://192.168.9.98:8080/resource/user/face/default.jpg",
                "birthday": "",
                "userIndex": "",
                "state": 1,
                "userType": "2",
                "source": "",
                "stuId": "",
                "stuNo": "G654323200104200536",
                "stuName": "",
                "year": "2016",
                "classId": "class_06c2411e1a134b7f8c08e1c448c066e9",
                "className": "1",
                "gradeId": "grade_1a04505fb32b479ebd33b24a54a5fd4f",
                "gradeName": "高一",
                "cuid": "5289d61ea0e140e581a700d93ed1a25b",
                "teaName": "吴指明",
                "officeId": "office_48e5a1ff1d9642cd83cfad3bd250b143",
                "officeName": "示例高中一",
                "officeCode": "",
                "officeGrade": "",
                "areaId": "",
                "areaName": "",
                "ifCourse": "",
                "subjectId": "",
                "subjectName": "",
                "stuPoints": "",
                "stuGold": "",
                "teaTitle": "",
                "teaRole": "",
                "subjectCourseName": "",
                "parId": "",
                "parName": "",
                "parEmail": "",
                "parMobile": "",
                "relationId": "",
                "pageNo": "",
                "pageSize": "",
                "keyword": "",
                "deviceName": "",
                "groupName": "高一1班5组",
                "deviceId": "",
                "groupId": ""
            },
            {
                "id": "a028c2008b2d4db68c65543ba4961489",
                "remark": "",
                "createBy": "",
                "createDate": "2017-08-28 16:10:50.000",
                "updateBy": "",
                "updateDate": "",
                "delFlag": "0",
                "loginName": "G230221199211183302",
                "password": "14e1b600b1fd579f47433b88e8d85291",
                "realname": "许志龙",
                "sex": "女",
                "idCard": "",
                "userNation": "",
                "userJiguan": "",
                "userAddress": "",
                "userEmail": "",
                "userPhone": "",
                "userMobile": "",
                "userQq": "",
                "userFace": "http://192.168.9.98:8080/resource/user/face/default.jpg",
                "birthday": "",
                "userIndex": "",
                "state": 1,
                "userType": "2",
                "source": "",
                "stuId": "",
                "stuNo": "G230221199211183302",
                "stuName": "",
                "year": "2016",
                "classId": "class_06c2411e1a134b7f8c08e1c448c066e9",
                "className": "1",
                "gradeId": "grade_1a04505fb32b479ebd33b24a54a5fd4f",
                "gradeName": "高一",
                "cuid": "5289d61ea0e140e581a700d93ed1a25b",
                "teaName": "吴指明",
                "officeId": "office_48e5a1ff1d9642cd83cfad3bd250b143",
                "officeName": "示例高中一",
                "officeCode": "",
                "officeGrade": "",
                "areaId": "",
                "areaName": "",
                "ifCourse": "",
                "subjectId": "",
                "subjectName": "",
                "stuPoints": "",
                "stuGold": "",
                "teaTitle": "",
                "teaRole": "",
                "subjectCourseName": "",
                "parId": "",
                "parName": "",
                "parEmail": "",
                "parMobile": "",
                "relationId": "",
                "pageNo": "",
                "pageSize": "",
                "keyword": "",
                "deviceName": "",
                "groupName": "高一1班1组",
                "deviceId": "",
                "groupId": ""
            }
        ]
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
            updateSelected(action, contact.id);
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
var app = angular.module('app',['ui.router','oc.lazyLoad','ngAnimate']);

app.run(['$rootScope','$location','$state',function($rootScope,$location,$state) {
    $rootScope.$on('$locationChangeSuccess',function(a,b,fromState) {
        window.scrollTo(0,0);
    });
    
    $rootScope.$on('$stateChangeSuccess',function(event,toState,toParams,fromState,fromParams){
        if(toState.name=='user'){
            $state.go('user.teacher');
        }
    });
}]);
app.factory('UserInterceptor', ["$q","$rootScope",function ($q,$rootScope) {
    return {
        request:function(config){
            console.log(config)
            config.headers["TOKEN"] = '12312312';
            return config;
        },
    };
}]);
app.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider","$httpProvider","$locationProvider",
    function ($provide, $compileProvider, $controllerProvider, $filterProvider,$httpProvider,$locationProvider) {
        // $httpProvider.interceptors.push('UserInterceptor');
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
//转化post请求传参-------------------------------------------------
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.transformRequest = [function(data) {
            var param = function(obj) {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i;
                for(name in obj) {
                    value = obj[name];
                    if(value instanceof Array) {
                        for(i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if(value instanceof Object) {
                        for(subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if(value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + '=' +
                            encodeURIComponent(value) + '&';
                    }
                }
                return query.length ? query.substr(0, query.length - 1) : query;
            };
            return angular.isObject(data) && String(data) !== '[object File]'
                ? param(data)
                : data;
        }];
        //转化post请求传参------------------------------------------------------
    }]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/wrap/index');
    $stateProvider
        .state('wrap',{
            url: "/wrap",
            templateUrl : 'tpl/wrap.html',
            controller:"wrapCtrl",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/wrapCtrl.js");
                }]
            }
        })
        .state('wrap.index',{			//首页
            url: "/index",
            templateUrl : 'tpl/index/index.html',
            controller:"indexCtrl",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/index/controller/indexCtrl.js");
                }]
            }
        })
        .state('organization',{			//系统管理——机构管理
            url: "/organization",
            templateUrl : 'tpl/administration/organization.html',
            controller:"organizationCtrl",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/administration/controller/organizationCtrl.js");
                }]
            }
        })
        .state('role',{			//系统管理——角色权限
            url: "/role",
            templateUrl : 'tpl/administration/role.html',
            controller:"roleCtrl",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/administration/controller/roleCtrl.js");
                }]
            }
        })
        .state('user',{			//系统管理——用户权限
            url: "/user",
            templateUrl : 'tpl/administration/user.html',
            controller:"userCtrl",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/administration/controller/userCtrl.js");
                }]
            }
        })
        .state('user.teacher',{			//系统管理——用户权限——教师
            url: "/user_teacher",
            templateUrl : 'tpl/administration/user_teacher.html',
            controller:"userTeacherCtrl",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/administration/controller/userTeacherCtrl.js");
                }]
            }
        })
        .state('user.student',{			//系统管理——用户权限——学生
            url: "/user_student",
            templateUrl : 'tpl/administration/user_student.html',
            controller:"userStudentCtrl",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/administration/controller/userStudentCtrl.js");
                }]
            }
        })
        .state('user.parent',{			//系统管理——用户权限——家长
            url: "/user_parent",
            templateUrl : 'tpl/administration/user_parent.html',
            controller:"userParentCtrl",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/administration/controller/userParentCtrl.js");
                }]
            }
        })

}]);

//图片加载失败替换
app.directive('errSrc', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('error', function() {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    }
});

//底部
app.directive('zFooter',function($timeout){
    return {
        restrict:'E',
        replace: true,
        scope:{
            content:'='
        },
        template:'<footer><p><span>主办：北京捷成世纪科技股份有限公司</span><span>承办：北京捷成世纪科技股份有限公司</span><span>技术支持：北京捷成世纪科技股份有限公司</span></p><p>Copyright©2013-2017jetsen.com.cn All Rights Reserved</p></footer>',
        link:function(scope,element,attrs){
//			console.log(angular.element('.zy_bg'))
			/*scope.bg_color = {color : '',length : 0};
			$timeout(function (){
				scope.bg_color.length = angular.element('.zy_bg').length;
				scope.bg_color.length % 2 ? scope.bg_color.color = '#f1f2f3' : scope.bg_color.color = '#fff';
				console.log(scope.bg_color.color) 
			});
			console.log(scope.bg_color.length) */
        }
    }
})


//人数统计
app.directive('zScore',function(){
    return {
        restrict:'E',
        replace: true,
        scope:{
            cont:'='
        },
        template:'<div class="z_numlist"><ul><li ng-repeat="i in length track by $index"><div class="ullist"><p>0</p><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>0</p></div></li></ul></div>',
        link:function(scope,element,attrs){
            scope.cont.fontSize = scope.cont.fontSize ? scope.cont.fontSize : 24;
            scope.length = new Array(scope.cont.num.toString().length);
            console.log(scope.cont)
            angular.element(document).bind('scroll',function (){
	            if($('.zy_watch_list').length && ($(document).scrollTop() + $(window).height()) >= $('.zy_watch_list').offset().top){
			        setTimeout(function(){
			            var arrNum = scope.cont.num.toString().split('');
			            var oul = element[0].querySelectorAll('.ullist');
			            var arrUl = [].slice.call(oul);
			            [].slice.call(oul).forEach(function(v,i){
			                arrUl[i].style.top = -scope.cont.fontSize*parseInt(arrNum[i])+'px'
			            })
			        }.bind(this));
	            }
         	});
            
            
        }
    }
})


//分页组件
app.directive('zjyPagination',function(){
    return {
        restrict: 'EA',
        template: '<div class="page-list">' +
        '<ul class="handle_paging clearfix" ng-show="conf.totalItems > 0">' +
        '<li class="firstpage" style="padding:0 5px;white-space: nowrap;border-left:1px solid #e4e4e4;width: auto;" ng-click="changeCurrentPage(1)">首页</li>'+
        '<li ng-class="{disabled: conf.currentPage == 1}" ng-click="prevPage()"><i class="iconfont icon-mjiantou-copy"></i>＜</li>' +
//        '<li class="firstpage" style="padding:0 5px;white-space: nowrap;border-left:1px solid #e4e4e4;width: auto;" ng-click="changeCurrentPage(1)">第一页</li>'+
        '<li ng-repeat="item in pageList track by $index" ng-class="{active: item == conf.currentPage, separate: item == \'...\'}" ' +
        'ng-click="changeCurrentPage(item)">' +
        '<span>{{ item }}</span>' +
        '</li>' +
        '<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()"><i class="iconfont icon-youjiatou"></i>＞</li>' +
        '<li class="lastpage" style="padding:0 5px;white-space: nowrap;width: auto;" ng-click="changeCurrentPage(conf.numberOfPages)">尾页</li>'+
//        '<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()"><i class="iconfont icon-youjiatou"></i></li>' +
        '</ul>' +
        '<div class="no-items" ng-show="conf.totalItems <= 0">暂无数据</div>' +
        '</div>',
        replace: true,
        scope: {
            conf: '='
        },
        link: function(scope, element, attrs) {
            var conf = scope.conf;
            var defaultPagesLength = 9;
            var defaultPerPageOptions = [5, 10, 15, 20, 30, 50];
            var defaultPerPage = 5;
            if(conf.pagesLength) {
                // 判断一下分页长度
                conf.pagesLength = parseInt(conf.pagesLength, 10);
                if(!conf.pagesLength) {
                    conf.pagesLength = defaultPagesLength;
                }
                // 分页长度必须为奇数，如果传偶数时，自动处理
                if(conf.pagesLength % 2 === 0) {
                    conf.pagesLength += 1;
                }
            } else {
                conf.pagesLength = defaultPagesLength
            }
            // 分页选项可调整每页显示的条数
            if(!conf.perPageOptions){
                conf.perPageOptions = defaultPagesLength;
            }
            // pageList数组
            function getPagination(newValue, oldValue) {
                // conf.currentPage
                if(conf.currentPage) {
                    conf.currentPage = parseInt(scope.conf.currentPage, 10);
                }
                if(!conf.currentPage) {
                    conf.currentPage = 1;
                }
                // conf.totalItems
                if(conf.totalItems) {
                    conf.totalItems = parseInt(conf.totalItems, 10);
                }
                // conf.totalItems
                if(!conf.totalItems) {
                    conf.totalItems = 0;
                    return;
                }
                if(conf.itemsPerPage) {
                    conf.itemsPerPage = parseInt(conf.itemsPerPage, 10);
                }
                if(!conf.itemsPerPage) {
                    conf.itemsPerPage = defaultPerPage;
                }
                conf.numberOfPages = Math.ceil(conf.totalItems/conf.itemsPerPage);
                // 如果分页总数>0，并且当前页大于分页总数
                if(scope.conf.numberOfPages > 0 && scope.conf.currentPage > scope.conf.numberOfPages){
                    scope.conf.currentPage = scope.conf.numberOfPages;
                }
                // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
                var perPageOptionsLength = scope.conf.perPageOptions.length;
                // 定义状态
                var perPageOptionsStatus;
                for(var i = 0; i < perPageOptionsLength; i++){
                    if(conf.perPageOptions[i] == conf.itemsPerPage){
                        perPageOptionsStatus = true;
                    }
                }
                // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
                if(!perPageOptionsStatus){
                    conf.perPageOptions.push(conf.itemsPerPage);
                }
                // 对选项进行sort
                conf.perPageOptions.sort(function(a, b) {return a - b});
                // 页码相关
                scope.pageList = [];
                if(conf.numberOfPages <= conf.pagesLength){
                    // 判断总页数如果小于等于分页的长度，若小于则直接显示
                    for(i =1; i <= conf.numberOfPages; i++){
                        scope.pageList.push(i);
                    }
                }else{
                    // 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
                    // 计算中心偏移量
                    var offset = (conf.pagesLength - 1) / 2;
                    if(conf.currentPage <= offset){
                        // 左边没有...
                        for(i = 1; i <= offset + 1; i++){
                            scope.pageList.push(i);
                        }
                        scope.pageList.push('...');
                        scope.pageList.push(conf.numberOfPages);
                    }else if(conf.currentPage > conf.numberOfPages - offset){
                        scope.pageList.push(1);
                        scope.pageList.push('...');
                        for(i = offset + 1; i >= 1; i--){
                            scope.pageList.push(conf.numberOfPages - i);
                        }
                        scope.pageList.push(conf.numberOfPages);
                    }else{
                        // 最后一种情况，两边都有...
                        scope.pageList.push(1);
                        scope.pageList.push('...');

                        for(i = Math.ceil(offset / 2) ; i >= 1; i--){
                            scope.pageList.push(conf.currentPage - i);
                        }
                        scope.pageList.push(conf.currentPage);
                        for(i = 1; i <= offset / 2; i++){
                            scope.pageList.push(conf.currentPage + i);
                        }

                        scope.pageList.push('...');
                        scope.pageList.push(conf.numberOfPages);
                    }
                }
                scope.$parent.conf = conf;
            }
            scope.prevPage = function() {
                if(conf.currentPage==1){
                    return false;
                }
                if(conf.currentPage > 1){
                    conf.currentPage -= 1;
                }
                getPagination();
                if(conf.onChange) {
                    conf.onChange();
                }
            };
            // nextPage
            scope.nextPage = function() {
                if(conf.currentPage==conf.numberOfPages){
                    return false;
                }
                if(conf.currentPage < conf.numberOfPages){
                    conf.currentPage += 1;
                }
                getPagination();
                if(conf.onChange) {
                    conf.onChange();
                }
            };
            // 变更当前页
            scope.changeCurrentPage = function(item) {
                if(item == '...'){
                    return;
                }else{
                    if(conf.currentPage==item){
                        return;
                    }
                    conf.currentPage = item;
                    getPagination();
                    // conf.onChange()函数
                    if(conf.onChange) {
                        conf.onChange(item);
                    }
                }
            };
            // 修改每页展示的条数
            scope.changeItemsPerPage = function() {
                // 一发展示条数变更，当前页将重置为1
                conf.currentPage = 1;
                getPagination();
                // conf.onChange()函数
                if(conf.onChange) {
                    conf.onChange();
                }
            };
            // 跳转页
            scope.jumpToPage = function() {
                num = scope.jumpPageNum;
                if(num.match(/\d+/)) {
                    num = parseInt(num, 10);
                    if(num && num != conf.currentPage) {
                        if(num > conf.numberOfPages) {
                            num = conf.numberOfPages;
                        }
                        // 跳转
                        conf.currentPage = num;
                        getPagination();
                        // conf.onChange()函数
                        if(conf.onChange) {
                            conf.onChange();
                        }
                        scope.jumpPageNum = '';
                    }
                }
            };
            scope.jumpPageKeyUp = function(e) {
                var keycode = window.event ? e.keyCode :e.which;
                if(keycode == 13) {
                    scope.jumpToPage();
                }
            }
            scope.$watch('conf.totalItems', function(value, oldValue) {
                // 在无值或值相等的时候，去执行onChange事件
                if(!value || value == oldValue) {
                    if(conf.onChange) {
                        // conf.onChange();
                    }
                }
                getPagination();
            })
        }
    }
});



/*//门户管理 模板
app.directive('templateSet',function (templateServer){
	return {
		restrice : 'CE',
		replace : true,
		templateUrl : './tpl/sharedTemplate/templateSetting.html',
		controller : 'templateSettingCtrl'
	}
});*/

//门户管理
app.directive('system',function(){
    return {
        restrict:'E',
        replace: true,
        templateUrl:'./tpl/sharedTemplate/system.html',
        link:function(scope,element,attrs){
            
        }
    }
})

var app = angular.module('app',['ui.router','oc.lazyLoad','ngAnimate','angularFileUpload']);
//sessionStorage.setItem('type','');
//sessionStorage.setItem('type','tea');

//var userType = sessionStorage.getItem('type');
//console.log(typeof sessionStorage.getItem('type'));
app.run(['$rootScope','$location','$state','$http',function($rootScope,$location,$state,$http) {
    $rootScope.$on('$locationChangeSuccess',function(a,b,fromState) {
        window.scrollTo(0,0);
    });
    $rootScope.userType = '';
   
//  $rootScope.showNav = $rootScope.userType == 'tea' ? $rootScope.showNav =  true: $rootScope.showNav = false;
    $rootScope.$on('$stateChangeSuccess',function(event,toState,toParams,fromState,fromParams){
    	if($rootScope.userType == 'tea'){
    		$rootScope.showNav = true;
    		if(toState.name=='wrap.list'){
        		$state.go('wrap.list.activityList');
    		}else if(toState.name=='wrap.share'){
    			$state.go('wrap.share.sharedLibrary');
    		} 
    	}else{
    		$rootScope.showNav = false;
    		if(toState.name=='wrap.list'){
        		$state.go('wrap.list.studentActivityList');
    		}else if(toState.name=='wrap.share'){
    			$state.go('wrap.share.studentSharedLibrary');
    		} 
    	}
	//      console.log(event,toState,toParams)
	//      console.log(fromState,fromParams)
	    
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
//          params : {token : null},
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/index/controller/indexCtrl.js");
                }]
            }
        })
        .state('wrap.list',{		//二级
            url: "/list",
            templateUrl : 'tpl/list.html',
//          params : {token : null}
        })
        .state('wrap.list.activityList',{		//活动列表
            url: "/activityList",
            templateUrl : 'tpl/activity/activityList.html',
            controller:"activityListCtrl",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/activity/controller/activityListCtrl.js");
                }]
            }
        })
        .state('activityDetail',{		//活动详情
            url: "/activityDetail",
            templateUrl : 'tpl/activity/activityDetail.html',
            controller:"activityDetailCtrl",
            params : {activityId : null,token : null},
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/activity/controller/activityDetailCtrl.js");
                }]
            }
        })
        .state('updateActivity',{		//更新活动
            url: "/updateActivity",
            templateUrl : 'tpl/activity/updateActivity.html',
            controller:"updateActivityCtrl",
            params : {activityId : null,token : null},
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/activity/controller/updateActivityCtrl.js");
                }]
            }
        })
        .state('wrap.newActivity',{		//新建活动
            url: "/newActivity",
            templateUrl : 'tpl/activity/newActivity.html',
            controller:"newActivityCtrl",
//          params : {token : null},
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/activity/controller/newActivityCtrl.js");
                }]
            }
        })
        .state('wrap.myShare',{			//我的共享
            url: "/myShare",
            templateUrl : 'tpl/activity/myShare.html',
            controller:"myShareCtrl",
//          params : {token : null},
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/activity/controller/myShareCtrl.js");
                }]
            }
        })
        .state('myShareDetail',{			//我的共享详情
            url: "/myShareDetail",
            templateUrl : 'tpl/activity/myShareDetail.html',
            controller:"myShareDetailCtrl",
            params : {activityId : null,token : null},
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/activity/controller/myShareDetailCtrl.js");
                }]
            }
        })
        .state('wrap.share',{		//二级
            url: "/share",
            templateUrl : 'tpl/share.html',
//          params : {token : null}
        })
        .state('wrap.share.sharedLibrary',{		//共享库
            url: "/sharedLibrary",
            templateUrl : 'tpl/activity/sharedLibrary.html',
            controller:"sharedLibraryCtrl",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/activity/controller/sharedLibraryCtrl.js");
                }]
            }
        })
        .state('sharedLibraryDetail',{		//共享库详情
            url: "/sharedLibraryDetail",
            templateUrl : 'tpl/activity/sharedLibraryDetail.html',
            controller:"sharedLibraryDetailCtrl",
            params : {activityId : null},
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/activity/controller/sharedLibraryDetailCtrl.js");
                }]
            }
        })
        //以下学生页面
        .state('wrap.list.studentActivityList',{		//活动列表
            url: "/studentActivityList",
            templateUrl : 'tpl/studentActivity/studentActivityList.html',
            controller:"studentActivityListCtrl",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/studentActivity/controller/studentActivityListCtrl.js");
                }]
            }
        })
      	.state('studentActivityDetail',{		//活动详情
            url: "/studentActivityDetail",
            templateUrl : 'tpl/studentActivity/studentActivityDetail.html',
            params : {activityId : null,token : null},
            controller:"studentActivityDetailCtrl",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/studentActivity/controller/studentActivityDetailCtrl.js");
                }]
            }
        })
      	.state('wrap.share.studentSharedLibrary',{		//共享库
            url: "/studentSharedLibrary",
            templateUrl : 'tpl/studentActivity/studentSharedLibrary.html',
            controller:"studentSharedLibraryCtrl",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/studentActivity/controller/studentSharedLibraryCtrl.js");
                }]
            }
        })
      	.state('studentSharedLibraryDetail',{		//共享库详情
            url: "/studentSharedLibraryDetail",
            templateUrl : 'tpl/studentActivity/studentSharedLibraryDetail.html',
            controller:"studentSharedLibraryDetailCtrl",
            params : {activityId : null,token : null},
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load("js/studentActivity/controller/studentSharedLibraryDetailCtrl.js");
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
//			
        }
    }
})


//日期组件
app.directive('zjyLaydate', function($timeout) {
    return {
        require: '?ngModel',
        restrict: 'ECA',
        scope: {
            ngModel: '=',
            maxDate:'@',
            minDate:'@'
        },
        link: function(scope, element, attr, ngModel) {
            var _date = null,_config={};
            $timeout(function(){
                // 初始化参数
                _config = {
                    elem: '#' + attr.id,
                    format: attr.format != undefined && attr.format != '' ? attr.format : 'YYYY-MM-DD',
                    max:attr.hasOwnProperty('maxDate')?attr.maxDate:'',
                    min:attr.hasOwnProperty('minDate')?attr.minDate:'',
                    choose: function(data) {
                        scope.$apply(setViewValue);

                    },
                    clear:function(){
                        ngModel.$setViewValue(null);

                    }
                };
                _date= laydate(_config);
                // 监听日期最大值
                if(attr.hasOwnProperty('maxDate')){
                    attr.$observe('maxDate', function (val) {
                        _config.max = val;
                    })
                }
                // 监听日期最小值
                if(attr.hasOwnProperty('minDate')){
                    attr.$observe('minDate', function (val) {
                        _config.min = val;
                    })
                }
                ngModel.$render = function() {
                    element.val(ngModel.$viewValue || '');
                };

                element.on('blur keyup change', function() {
                    scope.$apply(setViewValue);
                });
                setViewValue();
                function setViewValue() {
                    var val = element.val();
                    ngModel.$setViewValue(val);
                }
            },0);
        }
    };
});



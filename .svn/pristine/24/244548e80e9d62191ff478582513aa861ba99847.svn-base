var app = angular.module('app', ['ui.router', 'oc.lazyLoad', 'ngAnimate', 'ui.sortable', 'ui.tree']);

app.run(['$rootScope', '$location', '$state', function($rootScope, $location, $state) {
	$rootScope.$on('$locationChangeSuccess', function(a, b, fromState) {
		window.scrollTo(0, 0);
	});

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		if(toState.name == 'user') {
			$state.go('user.teacher');
		} else if(toState.name == 'wrap.new') {
			$state.go('wrap.new.newList');
		} else if(toState.name == 'wrap.resources') {
			$state.go('wrap.resources.resourcesIndex');
		}
		console.log(event, toState, toParams)
		console.log(fromState, fromParams)
	})
}]);

app.factory('UserInterceptor', ["$q", "$rootScope", function($q, $rootScope) {
	return {
		request: function(config) {
			console.log(config)
			config.headers["TOKEN"] = '12312312';
			return config;
		},
	};
}]);
app.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider", "$httpProvider", "$locationProvider",
	function($provide, $compileProvider, $controllerProvider, $filterProvider, $httpProvider, $locationProvider) {
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
			return angular.isObject(data) && String(data) !== '[object File]' ?
				param(data) :
				data;
		}];
		//转化post请求传参------------------------------------------------------
	}
]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/wrap/index');
	$stateProvider
		.state('wrap', {
			url: "/wrap",
			templateUrl: 'tpl/wrap.html',
			controller: "wrapCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/wrapCtrl.js");
				}]
			}
		})
		.state('wrap.index', { //首页
			url: "/index",
			templateUrl: 'tpl/index/index.html',
			controller: "indexCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/index/controller/indexCtrl.js");
				}]
			}
		})
		.state('login', { //登录
			url: "/login",
			templateUrl: 'tpl/index/login.html',
			controller: "indexCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/index/controller/indexCtrl.js");
				}]
			}
		})
		.state('register', { //注册
			url: "/register",
			templateUrl: 'tpl/index/register.html',
			controller: "registerCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/index/controller/registerCtrl.js");
				}]
			}
		})
		.state('wrap.resources', { //资源
			url: "/resources",
			templateUrl: 'tpl/resources/resources.html'
		})
		.state('wrap.resources.resourcesIndex', { //资源首页
			url: "/resourcesIndex",
			templateUrl: 'tpl/resources/resourcesIndex.html',
			controller: "resourcesIndexCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/resources/controller/resourcesIndexCtrl.js");
				}]
			}
		})
		.state('wrap.resources.resourcesSecondLevel', { //资源二级
			url: "/resourcesSecondLevel",
			templateUrl: 'tpl/resources/resourcesSecondLevel.html',
			controller: "resourcesSecondLevelCtrl",
			params : {'studySection' : null},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/resources/controller/resourcesSecondLevelCtrl.js");
				}]
			}
		})
		.state('wrap.resources.resourcesDetails', { //资源详情
			url: "/resourcesDetails",
			templateUrl: 'tpl/resources/resourcesDetails.html',
			controller: "resourcesDetailsCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/resources/controller/resourcesDetailsCtrl.js");
				}]
			}
		})
		.state('wrap.application', { //应用
			url: "/application",
			templateUrl: 'tpl/application/application.html',
			controller: "applicationCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/application/controller/applicationCtrl.js");
				}]
			}
		})
		//多页面
		.state('wrap.new', { //消息
			url: "/new",
			templateUrl: 'tpl/news/new.html'
		})
		.state('wrap.new.newList', { //消息列表
			url: "/newList",
			templateUrl: 'tpl/news/newList.html',
			controller: "newListCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/news/controller/newListCtrl.js");
				}]
			}
		})

		//单页面
		/*.state('wrap.news',{		//消息
		    url: "/news",
		    templateUrl : 'tpl/news/news.html',
		    controller:"newsCtrl",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load("js/news/controller/newsCtrl.js");
		        }]
		    }
		})*/

		.state('wrap.new.newDetails', { //消息详情
			url: "/newDetails",
			templateUrl: 'tpl/news/newDetails.html',
			controller: "newDetailsCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/news/controller/newDetailsCtrl.js");
				}]
			}
		})
		.state('wrap.help', { //帮助
			url: "/help",
			templateUrl: 'tpl/help/help.html',
			controller: "helpCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/help/controller/helpCtrl.js");
				}]
			}
		})
		.state('wrap.RQCode', { //校讯通
			url: "/RQCode",
			templateUrl: 'tpl/schoolPaper/RQCode.html',
			controller: "RQCodeCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/schoolPaper/controller/RQCodeCtrl.js");
				}]
			}
		})
		.state('organization', { //系统管理——机构管理
			url: "/organization",
			templateUrl: 'tpl/userCenter/organization.html',
			controller: "organizationCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/userCenter/controller/organizationCtrl.js");
				}]
			}
		})
		.state('role', { //系统管理——角色权限
			url: "/role",
			templateUrl: 'tpl/userCenter/role.html',
			controller: "roleCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/userCenter/controller/roleCtrl.js");
				}]
			}
		})
		.state('--', { //系统管理——用户权限
			url: "/user",
			templateUrl: 'tpl/userCenter/user.html',
			controller: "userCtrl",
//          params : {'user' : 0},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/userCenter/controller/userCtrl.js");
				}]
			}
		})
		.state('user.teacher', { //系统管理——用户权限——教师
			url: "/user_teacher",
			templateUrl: 'tpl/userCenter/user_teacher.html',
			controller: "userTeacherCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/userCenter/controller/userTeacherCtrl.js");
				}]
			}
		})
		.state('user.student', { //系统管理——用户权限——学生
			url: "/user_student",
			templateUrl: 'tpl/userCenter/user_student.html',
			controller: "userStudentCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/userCenter/controller/userStudentCtrl.js");
				}]
			}
		})
		.state('user.parent', { //系统管理——用户权限——家长
			url: "/user_parent",
			templateUrl: 'tpl/userCenter/user_parent.html',
			controller: "userParentCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/userCenter/controller/userParentCtrl.js");
				}]
			}
		})
		.state('teachingMaterial', { //基础设置--教材管理
			url: "/teachingMaterial",
			templateUrl: 'tpl/basicSettings/teachingMaterial.html',
			controller: "teachingMaterialCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/basicSettings/controller/teachingMaterialCtrl.js");
				}]
			}
		})
		.state('schoolManagement', { //基础设置--学校管理
			url: "/schoolManagement",
			templateUrl: 'tpl/basicSettings/schoolManagement.html',
			controller: "schoolManagementCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/basicSettings/controller/schoolManagementCtrl.js");
				}]
			}
		})
		.state('classctrl', { //基础管理--班级管理
			url: "/classctrl",
			templateUrl: 'tpl/basicSettings/classctrl.html',
			controller: "classctrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/basicSettings/controller/classctrl.js");
				}]
			}
		})
		.state('xuekectrl', { //基础管理--学科管理
			url: "/xuekectrl",
			templateUrl: 'tpl/basicSettings/xuekectrl.html',
			controller: "xuekectrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/basicSettings/controller/xuekectrl.js");
				}]
			}
		})
		.state('classroomctrl', { //基础管理--任课管理
			url: "/classroomctrl",
			templateUrl: 'tpl/basicSettings/classRoom.html',
			controller: "classroomctrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/basicSettings/controller/classroomctrl.js");
				}]
			}
		})
		.state('managerInfo', { //个人设置--管理者
			url: "/managerInfo",
			templateUrl: 'tpl/myAccount/managerInfo.html',
			controller: "managerInfoCtrl",
			params: {
				status: 0
			},
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/myAccount/controller/managerInfoCtrl.js");
				}]
			}
		})
		.state('teacherInfo', { //个人设置--教师
			url: "/teacherInfo",
			templateUrl: 'tpl/myAccount/teacherInfo.html',
			controller: "teacherInfoCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/myAccount/controller/teacherInfoCtrl.js");
				}]
			}
		})
		.state('parentInfo', { //个人设置--家长
			url: "/parentInfo",
			templateUrl: 'tpl/myAccount/parentInfo.html',
			controller: "parentInfoCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/myAccount/controller/parentInfoCtrl.js");
				}]
			}
		})
		.state('studentInfo', { //个人设置--学生
			url: "/studentInfo",
			templateUrl: 'tpl/myAccount/studentInfo.html',
			controller: "studentInfoCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/myAccount/controller/studentInfoCtrl.js");
				}]
			}
		})
		.state('regStr', { //注册--学生
			url: "/regStr",
			templateUrl: 'tpl/register/regStr.html',
			controller: "regStrCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/register/controller/regStrCtrl.js");
				}]
			}
		})
		.state('regPar', { //注册--家长
			url: "/regPar",
			templateUrl: 'tpl/register/regPar.html',
			controller: "regParCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/register/controller/regParCtrl.js");
				}]
			}
		})
		.state('regAdmin', { //注册--管理者
			url: "/regAdmin",
			templateUrl: 'tpl/register/regAdmin.html',
			controller: "regAdminCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/register/controller/regAdminCtrl.js");
				}]
			}
		})
		.state('regTea', { //注册--教师
			url: "/regTea",
			templateUrl: 'tpl/register/regTea.html',
			controller: "regTeaCtrl",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load("js/register/controller/regTeaCtrl.js");
				}]
			}
		})

}]);

//图片加载失败替换
app.directive('errSrc', function() {
	return {
		link: function(scope, element, attrs) {
			element.bind('error', function() {
				if(attrs.src != attrs.errSrc) {
					attrs.$set('src', attrs.errSrc);
				}
			});
		}
	}
});

//底部
app.directive('zFooter', function($timeout) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			content: '='
		},
		template: '<footer><p><span>主办：北京捷成世纪科技股份有限公司</span><span>承办：北京捷成世纪科技股份有限公司</span><span>技术支持：北京捷成世纪科技股份有限公司</span></p><p>Copyright©2013-2017jetsen.com.cn All Rights Reserved</p></footer>',
		link: function(scope, element, attrs) {
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
app.directive('zScore', function($timeout, $http) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			cont: '=cont'
		},
		template: '<div class="z_numlist"><ul><li ng-repeat="i in length track by $index"><div class="ullist"><p>0</p><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p><p>6</p><p>7</p><p>8</p><p>9</p><p>0</p></div></li></ul></div>',
		link: function(scope, element, attrs) {
			//      	console.log(element)
			//      	$timeout(function (){
			/*console.log(scope.cont)
            	scope.cont.fontSize = scope.cont.fontSize ? scope.cont.fontSize : 24;
            	scope.length = new Array(scope.cont.num.toString().length);*/
			//      	});
			//			console.log($watch)

			/*var aaa = scope.$watch(function(newValue,oldValue){
//              vm.name = $scope.name;
//				console.log(newValue,oldValue)
				return scope.cont; 
            },function (){
//          	console.log(scope.cont)
            });*/
			//			console.log(aaa)
			$http.get(requireIp + "jeuc/api/sys/userStatistics/findUserAmount?areaId=032f559f367a4d69acd2c675cbba06f0").success(function(data) {
				console.log("人数")
				console.log(data.data);
				if(scope.cont.p=="tot"){
					scope.cont.num = data.data.amount;
				}else if(scope.cont.p=="tea"){
					scope.cont.num = data.data.teacherAmount;
				}else if(scope.cont.p=="stu"){
					scope.cont.num = data.data.studentAmount;
				}else if(scope.cont.p=="par"){
					scope.cont.num = data.data.parentAmount;
				}
				scope.cont.fontSize = scope.cont.fontSize ? scope.cont.fontSize : 24;
				scope.length = new Array(scope.cont.num.toString().length);
				console.log(scope.cont)
				console.log(scope.length)

				angular.element(document).bind('scroll', function() {
					if($('.zy_watch_list').length && ($(document).scrollTop() + $(window).height()) >= $('.zy_watch_list').offset().top) {
						clearInterval(timer);
						var timer = setTimeout(function() {
							//console.log(scope.cont.num)
							var arrNum = scope.cont.num.toString().split('');
							var oul = element[0].querySelectorAll('.ullist');
							//var arrUl = Array.prototype.slice.call(oul);
							var arrUl = [].slice.call(oul);
							//[].slice.call(oul).forEach(function(v,i){
							arrUl.forEach(function(v, i) {
								arrUl[i].style.top = -scope.cont.fontSize * parseInt(arrNum[i]) + 'px'
							})
						}.bind(this));
					}
				});
			});

		}
	}
});

//门户管理 模板
app.directive('templateSet', function(templateServer) {
	return {
		restrice: 'CE',
		replace: true,
		templateUrl: './tpl/sharedTemplate/templateSetting.html',
		controller: 'templateSettingCtrl'
	}
});

//共用头部
app.directive('system', function($timeout) {
	return {
		restrict: 'E',
		replace: true,
		//      templateUrl:'./tpl/sharedTemplate/system.html',
		template: '<div class="zy_admin_set"><div class="zy_set_wrap_bg"><div class="zy_set_wrap"><div class="zy_set_bar clearfix"><div class="fl"><img src="./img/set_logo.png"/><span ng-bind="nav.title"></span></div><ul class="fl" ng-show="nav.ifShow"><li class="fl" ui-sref="organization" ui-sref-active="active">机构管理</li><li class="fl" ui-sref="user" ui-sref-active="active">用户管理</li><li class="fl" ui-sref="role" ui-sref-active="active">角色权限</li></ul><p class="zy_set_users fr"><i>李</i><span>李朋霖老师</span></p></div></div></div></div>',
		scope: {
			nav: '='
		},
		link: function(scope, element, attrs) {
			$timeout(function() {
				console.log(scope.nav)
			})

		}
	}
});

//身份证号码验证
app.factory('IDCheck',function (){
    function checkID(ID) {
//		console.log(ID);
        if(typeof ID !== 'string') return '非法字符串';
        var city = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
        var birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2));
        var d = new Date(birthday);
        var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate());
        var currentTime = new Date().getTime();
        var time = d.getTime();
        var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
        var sum = 0, i, residue;
        //if(!/^\d{17}(\d|x)$/i.test(ID)) return '非法身份证';
        if(!/^\d{17}(\d|x)$/i.test(ID)) return false;
        //if(city[ID.substr(0,2)] === undefined) return "非法地区";
        if(city[ID.substr(0,2)] === undefined) return false;
        //if(time >= currentTime || birthday !== newBirthday) return '非法生日';
        if(time >= currentTime || birthday !== newBirthday) return false;
        for(i=0; i<17; i++) {
          sum += ID.substr(i, 1) * arrInt[i];
        }
        residue = arrCh[sum % 11];
        //if (residue !== ID.substr(17, 1)) return '非法身份证哦';
        if (residue !== ID.substr(17, 1)) return false;
        console.log(city[ID.substr(0,2)]+","+birthday+","+(ID.substr(16,1)%2?" 男":"女"))
        return city[ID.substr(0,2)]+","+birthday+","+(ID.substr(16,1)%2?" 男":"女");
        return true;
    }
    return{
    	checkID : checkID
    }
    
});

//兼容滚动条
app.service('scrollbar',function(){
	function bind(obj, type, handler) {
		var node = typeof obj == "string" ? $(obj) : obj;
		if(node.addEventListener) {
			node.addEventListener(type, handler, false);
		} else if(node.attachEvent) {
			node.attachEvent('on' + type, handler);
		} else {
			node['on' + type] = handler;
		}
	}

	function mouseWheel(obj, handler) {
		var node = typeof obj == "string" ? $(obj) : obj;
		bind(node, 'mousewheel', function(event) {
			var data = -getWheelData(event);
			handler(data);
			if(document.all) {
				window.event.returnValue = false;
			} else {
				event.preventDefault();
			}
		});
		//火狐
		bind(node, 'DOMMouseScroll', function(event) {
			var data = getWheelData(event);
			handler(data);
			event.preventDefault();
		});

		function getWheelData(event) {
			var e = event || window.event;
			return e.wheelDelta ? e.wheelDelta : e.detail * 40;
		}
	}

	function addScroll() {
		this.init.apply(this, arguments);
	}
	addScroll.prototype = {
		init: function(mainBox, contentBox, className) {
			var mainBox = document.getElementById(mainBox);
			var contentBox = document.getElementById(contentBox);
			var scrollDiv = this._createScroll(mainBox, className);
			this._resizeScorll(scrollDiv, mainBox, contentBox);
			this._tragScroll(scrollDiv, mainBox, contentBox);
			this._wheelChange(scrollDiv, mainBox, contentBox);
			this._clickScroll(scrollDiv, mainBox, contentBox);
		},
		//创建滚动条
		_createScroll: function(mainBox, className) {
			var _scrollBox = document.createElement('div')
			var _scroll = document.createElement('div');
			var span = document.createElement('span');
			_scrollBox.appendChild(_scroll);
			_scroll.appendChild(span);
			_scroll.className = className;
			mainBox.appendChild(_scrollBox);
			_scroll.ondragstart = function() {
				return false;
			}
			return _scroll;
		},
		//调整滚动条
		_resizeScorll: function(element, mainBox, contentBox) {
			var p = element.parentNode;
			var conHeight = contentBox.offsetHeight;
			var _width = mainBox.clientWidth;
			var _height = mainBox.clientHeight;
			var _scrollWidth = element.offsetWidth;
			var _left = _width - _scrollWidth;
			p.style.width = _scrollWidth + "px";
			p.style.height = _height + "px";
			p.style.left = _left + "px";
			p.style.position = "absolute";
			p.style.background = "#ccc";
			p.className = 'scrollwrap';
			contentBox.style.width = (mainBox.offsetWidth - _scrollWidth) + "px";
			var _scrollHeight = parseInt(_height * (_height / conHeight));
			if(_scrollHeight >= mainBox.clientHeight) {
				element.parentNode.style.display = "none";
			}
			element.style.height = _scrollHeight + "px";
		},
		//拖动滚动条
		_tragScroll: function(element, mainBox, contentBox) {
			var mainHeight = mainBox.clientHeight;
			element.onmousedown = function(event) {
				var _this = this;
				var _scrollTop = element.offsetTop;
				var e = event || window.event;
				var top = e.clientY;
				document.onmousemove = scrollGo;
				document.onmouseup = function(event) {
					this.onmousemove = null;
				}

				function scrollGo(event) {
					var e = event || window.event;
					var _top = e.clientY;
					var _t = _top - top + _scrollTop;
					if(_t > (mainHeight - element.offsetHeight)) {
						_t = mainHeight - element.offsetHeight;
					}
					if(_t <= 0) {
						_t = 0;
					}
					element.style.top = _t + "px";
					contentBox.style.top = -_t * (contentBox.offsetHeight / mainBox.offsetHeight) + "px";
					_this._wheelData = _t;
				}
			}
			element.onmouseover = function() {
				this.style.background = "#444";
			}
			element.onmouseout = function() {
				this.style.background = "#666";
			}
		},
		//鼠标滚轮滚动，滚动条滚动
		_wheelChange: function(element, mainBox, contentBox) {
			var node = typeof mainBox == "string" ? $(mainBox) : mainBox;
			var flag = 0,
				rate = 0,
				wheelFlag = 0,
				_this = this;
			if(node) {
				mouseWheel(node, function(data) {
					wheelFlag += data;
					if(_this._wheelData >= 0) {
						flag = _this._wheelData;
						element.style.top = flag + "px";
						wheelFlag = _this._wheelData * 12;
						_this._wheelData = -1;
					} else {
						flag = wheelFlag / 12;
					}
					if(flag <= 0) {
						flag = 0;
						wheelFlag = 0;
					}
					if(flag >= (mainBox.offsetHeight - element.offsetHeight)) {
						flag = (mainBox.clientHeight - element.offsetHeight);
						wheelFlag = (mainBox.clientHeight - element.offsetHeight) * 12;
					}
					element.style.top = flag + "px";
					contentBox.style.top = -flag * (contentBox.offsetHeight / mainBox.offsetHeight) + "px";
				});
			}
		},
		_clickScroll: function(element, mainBox, contentBox) {
			var p = element.parentNode;
			var _this = this;
			p.onclick = function(event) {
				var e = event || window.event;
				var t = e.target || e.srcElement;
				var sTop = document.documentElement.scrollTop > 0 ? document.documentElement.scrollTop : document.body.scrollTop;
				var top = mainBox.offsetTop;
				var _top = e.clientY + sTop - top - element.offsetHeight / 2;
				if(_top <= 0) {
					_top = 0;
				}
				if(_top >= (mainBox.clientHeight - element.offsetHeight)) {
					_top = mainBox.clientHeight - element.offsetHeight;
				}
				if(t != element) {
					element.style.top = _top + "px";
					contentBox.style.top = -_top * (contentBox.offsetHeight / mainBox.offsetHeight) + "px";
					_this._wheelData = _top;
				}
			}
		}
	};
	this.scroollAction = function(mainBox, contentBox, className){
		new addScroll(mainBox, contentBox, className);
	}
})


//分页组件
app.directive('zjyPagination', function() {
	return {
		restrict: 'EA',
		template: '<div class="page-list">' +
			'<ul class="handle_paging clearfix" ng-show="conf.totalItems > 0">' +
			'<li class="firstpage" style="padding:0 5px;white-space: nowrap;border-left:1px solid #e4e4e4;width: auto;" ng-click="changeCurrentPage(1)">首页</li>' +
			'<li ng-class="{disabled: conf.currentPage == 1}" ng-click="prevPage()"><i class="iconfont icon-mjiantou-copy"></i>＜</li>' +
			//        '<li class="firstpage" style="padding:0 5px;white-space: nowrap;border-left:1px solid #e4e4e4;width: auto;" ng-click="changeCurrentPage(1)">第一页</li>'+
			'<li ng-repeat="item in pageList track by $index" ng-class="{active: item == conf.currentPage, separate: item == \'...\'}" ' +
			'ng-click="changeCurrentPage(item)">' +
			'<span>{{ item }}</span>' +
			'</li>' +
			'<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()"><i class="iconfont icon-youjiatou"></i>＞</li>' +
			'<li class="lastpage" style="padding:0 5px;white-space: nowrap;width: auto;" ng-click="changeCurrentPage(conf.numberOfPages)">尾页</li>' +
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
			if(!conf.perPageOptions) {
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
				conf.numberOfPages = Math.ceil(conf.totalItems / conf.itemsPerPage);
				// 如果分页总数>0，并且当前页大于分页总数
				if(scope.conf.numberOfPages > 0 && scope.conf.currentPage > scope.conf.numberOfPages) {
					scope.conf.currentPage = scope.conf.numberOfPages;
				}
				// 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
				var perPageOptionsLength = scope.conf.perPageOptions.length;
				// 定义状态
				var perPageOptionsStatus;
				for(var i = 0; i < perPageOptionsLength; i++) {
					if(conf.perPageOptions[i] == conf.itemsPerPage) {
						perPageOptionsStatus = true;
					}
				}
				// 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
				if(!perPageOptionsStatus) {
					conf.perPageOptions.push(conf.itemsPerPage);
				}
				// 对选项进行sort
				conf.perPageOptions.sort(function(a, b) {
					return a - b
				});
				// 页码相关
				scope.pageList = [];
				if(conf.numberOfPages <= conf.pagesLength) {
					// 判断总页数如果小于等于分页的长度，若小于则直接显示
					for(i = 1; i <= conf.numberOfPages; i++) {
						scope.pageList.push(i);
					}
				} else {
					// 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
					// 计算中心偏移量
					var offset = (conf.pagesLength - 1) / 2;
					if(conf.currentPage <= offset) {
						// 左边没有...
						for(i = 1; i <= offset + 1; i++) {
							scope.pageList.push(i);
						}
						scope.pageList.push('...');
						scope.pageList.push(conf.numberOfPages);
					} else if(conf.currentPage > conf.numberOfPages - offset) {
						scope.pageList.push(1);
						scope.pageList.push('...');
						for(i = offset + 1; i >= 1; i--) {
							scope.pageList.push(conf.numberOfPages - i);
						}
						scope.pageList.push(conf.numberOfPages);
					} else {
						// 最后一种情况，两边都有...
						scope.pageList.push(1);
						scope.pageList.push('...');

						for(i = Math.ceil(offset / 2); i >= 1; i--) {
							scope.pageList.push(conf.currentPage - i);
						}
						scope.pageList.push(conf.currentPage);
						for(i = 1; i <= offset / 2; i++) {
							scope.pageList.push(conf.currentPage + i);
						}

						scope.pageList.push('...');
						scope.pageList.push(conf.numberOfPages);
					}
				}
				scope.$parent.conf = conf;
			}
			scope.prevPage = function() {
				if(conf.currentPage == 1) {
					return false;
				}
				if(conf.currentPage > 1) {
					conf.currentPage -= 1;
				}
				getPagination();
				if(conf.onChange) {
					conf.onChange();
				}
			};
			// nextPage
			scope.nextPage = function() {
				if(conf.currentPage == conf.numberOfPages) {
					return false;
				}
				if(conf.currentPage < conf.numberOfPages) {
					conf.currentPage += 1;
				}
				getPagination();
				if(conf.onChange) {
					conf.onChange();
				}
			};
			// 变更当前页
			scope.changeCurrentPage = function(item) {
				if(item == '...') {
					return;
				} else {
					if(conf.currentPage == item) {
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
				var keycode = window.event ? e.keyCode : e.which;
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

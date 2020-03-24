app.controller('resourcesSecondLevelCtrl',['$scope','$state','$timeout','$http','$location','$stateParams',function($scope,$state,$timeout,$http,$location,$stateParams) {
	/*$scope.treeOptions = {
        accept: function(sourceNodeScope, destNodesScope, destIndex) {
            return true;
        }
    }*/
   	
   	//获取从哪个学段点击进入
// 	console.log($stateParams.studySection)
	var studySection = $stateParams.studySection;
   	
    //页面上单选事件
    $scope.radio = function (tar,arr,i){
//  	angular.forEach()
//  	console.log(tar,arr,i)
    	angular.element(tar.target).addClass('active').siblings().removeClass('active');
    };
    
    //每一行的更多按钮
    $scope.moreBtn = [false,false,false,false,false];
    
    //学段数据
    $scope.studySection = [
    	{id : '5646',name : '全部',checked : true},
    	{id : '5646',name : '小学',checked : false},
    	{id : '5646',name : '初中',checked : false},
    	{id : '5646',name : '高中',checked : false},
    	{id : '5646',name : '大学',checked : false}
    ];	
    
    //当前学段状态
    angular.forEach($scope.studySection,function (e,i){
    	e.checked = false;
    	switch (studySection){
    		case 'primarySchool':
    			$scope.studySection[1].checked = true;
    			break;
    		case 'juniorMiddleSchool':
    			$scope.studySection[2].checked = true;
    			break;
    		case 'highSchool':
    			$scope.studySection[3].checked = true;
    			break;
    		case 'university':
    			$scope.studySection[4].checked = true;
    			break;
    		default:
    			break;
    	}
    });
    
    
    //学科数据
    $scope.subject = [
    	{id : '5646',name : '全部',checked : true},
    	{id : '5646',name : '小学',checked : false},
    	{id : '5646',name : '初中',checked : false},
    	{id : '5646',name : '高中',checked : false},
    	
    	{id : '5646',name : '小学',checked : false},
    	{id : '5646',name : '初中',checked : false},
    	{id : '5646',name : '高中',checked : false},
    	{id : '5646',name : '小学',checked : false},
    	{id : '5646',name : '初中',checked : false},
    	{id : '5646',name : '高中',checked : false},
    	{id : '5646',name : '小学',checked : false},
    	{id : '5646',name : '初中',checked : false},
    	{id : '5646',name : '高中',checked : false},
    	{id : '5646',name : '小学',checked : false},
    	{id : '5646',name : '初中',checked : false},
    	{id : '5646',name : '高中',checked : false},
    	{id : '5646',name : '高中',checked : false},
    	{id : '5646',name : '高中',checked : false},
    	
    	{id : '5646',name : '大学',checked : false}
    ];
    
    //展示更多下拉
    $scope.showMore = function (tar){
    	var height = angular.element(tar.target).siblings().children('div').children('ul').height();
    	if(angular.element(tar.target).hasClass('active')){
    		console.log('you')
    		angular.element(tar.target).removeClass('active');
    		angular.element(tar.target).siblings().children('div').stop().animate({height: '42px'},200);
    	}else{
    		console.log('meiyou')
    		angular.element(tar.target).addClass('active');
    		angular.element(tar.target).siblings().children('div').stop().animate({height: height},200);
    	}
    };
    
    //学段、学科、版本、教材、年级都加载完之后
    setTimeout(function (){
    	angular.forEach(angular.element('.zy_resources_screen .zy_resources_screen_line>div'),function (ele,i){
//	   		console.log($(ele).width())
	   		if($(ele).width() >= 900){
	   			console.log('大了')
	   			$scope.$apply(function () {
	   				$scope.moreBtn[i] = true;
//	   				console.log($scope.moreBtn)
	            });
	   		}
	   	});
    });
    
    //左侧树高度  右侧li最有一个没border2px
    var lilength = 2;
    var leftTop = angular.element('.zy_zy_resources_tree_tit').outerHeight();
    var rightTop = angular.element('.zy_linear_right').outerHeight(true);
    var rightMiddle = angular.element('.zy_resources_screen_result_order').outerHeight();
    var rightBottom = angular.element('.zy_resources_screen_result_show ul li').outerHeight(true);
    var leftTreeHeight = rightTop + rightMiddle + rightBottom * lilength - leftTop - 2;
    angular.element('.zy_resources_tree').css('height',leftTreeHeight);
      
    // 分页组件
    var pageSize = 10;
    $scope.contentpageConfig = {
        currentPage: 1
        , pagesLength: 9
        , totalItems: 51
        , itemsPerPage: pageSize
        , perPageOptions: [5]
        , onChange: function () {
        	
   		}
    }
    
    //左侧树
    $scope.data = [
        {
            "id": 1,
            "title": "node1",
            "nodes": [
                {
                    "id": 11,
                    "title": "node1.1",
                    "icon" : true,
                    "nodes": [
                        {
                            "id": 111,
                            "title": "node1.1.1",
                            "icon" : false,
                            "nodes": [
                            	{
                            		"id": 1111,
				                    "title": "node1.1.1.1",
				                    "icon" : false,
				                    "nodes": [
				                    	{
		                            		"id": 11111,
						                    "title": "node1.1.1.1.1",
						                    "icon" : false,
						                    "nodes": [
						                    	{
				                            		"id": 111111,
								                    "title": "node1.1.1.1.1.1",
								                    "icon" : false,
								                    "nodes": []
				                            	}
						                    ]
		                            	}
				                    ]
                            	}
                            ]
                        }
                    ]
                },
                {
                    "id": 12,
                    "title": "node1.2",
                    "icon" : true,
                    "nodes": [
                    	{
                    		"id": 121,
		                    "title": "node1.2.1",
		                    "icon" : false,
		                    "nodes": []
                    	}
                    ]
                }
            ]
        },
        {
            "id": 2,
            "title": "node2",
            "nodrop": true,
            "nodes": [
                {
                    "id": 21,
                    "title": "node2.1",
                    "icon" : true,
                    "nodes": []
                },
                {
                    "id": 22,
                    "title": "node2.2",
                    "icon" : true,
                    "nodes": []
                }
            ]
        },
        {
            "id": 3,
            "title": "node3",
            "nodes": [
                {
                    "id": 31,
                    "title": "node3.1",
                    "icon" : true,
                    "nodes": []
                }
            ]
        },
        {
            "id": 4,
            "title": "node4",
            "nodes": []
        },
        {
            "id": 4,
            "title": "node4",
            "nodes": []
        },
        {
            "id": 4,
            "title": "node4",
            "nodes": []
        }
    ];
	
	
	
}]);

//滚动条调用
app.directive('ulwrapFinish',function(scrollbar){
    return {
    /*	scope : {
    		ulHeight : '='
    	},*/
        link: function(scope,element,attr){
//      	console.log(scope.ulHeight)
            if(scope.$last == true){
//          	console.log(scope.$last)
//          	console.log(element.parent().parent()[0].offsetHeight)
//          	console.log(document.querySelector('#addressul'))
//          	console.log(document.querySelector('#addressul').style.height)

				setTimeout(function (){
					console.log(element.parent()[0].offsetHeight)
	            	if(element.parent().parent()[0].offsetHeight < element.parent()[0].offsetHeight){
	                	scrollbar.scroollAction('addresswrap', 'addressul', 'scrollDiv');
	                }
				});

            }
        }
    }
})

//左侧树
app.directive('leftTree',function($timeout,scrollbar){
	return {
		restrict: 'EA',
		replace: true,
        scope: {
            conf: '='
        },
		link: function(scope, element, attrs) {
			
			/*function defaultShowFirst(){
				$('.zy_resources_tree_structure').children().first().children('.zy_bookopen').css('opacity','1');
				$('.zy_resources_tree_structure').children().first().children('.zy_bookclose').css('opacity','0');
				$('.zy_resources_tree_structure').children().first().children('.cxv').children('ul').show();
				$('.zy_resources_tree_structure').children().first().children('.cxv').children('ul').children().first().children('h3').addClass('active');
			}*/
//			defaultShowFirst();
			
//			console.log(element)
			element.on('click',function(e){
				//滚动条
				if(document.querySelector('.zy_resources_tree').offsetHeight < document.querySelector('.zy_resources_tree_structure').offsetHeight){
                	scrollbar.scroollAction('addresswrap', 'addressul', 'scrollDiv');
                }
				
//				$('.zy_resources_tree_structure').find('h3').removeClass('active');
				if($(this).next().children().length){
					console.log('有')
					$(this).next().toggle(200,function(){
						if($(this).next()[0].style.display == 'block'){
							if($(this).parent().hasClass('cxv')){
								$(this).parents('li').siblings().children('.cxv').children('h3').removeClass('active');
								$(this).addClass('active');
//								$(this).siblings('ul').children().children('h3').removeClass('active');
//								$('.cxv').children('h3').next().find('h3').removeClass('active');
//								$(this).siblings('ul').children().first().children('h3').addClass('active');
								
//								$(this).next().children().first().find('.zy_bookopen').stop().animate({opacity: '1'},200);
//								$(this).next().children().first().find('.zy_bookclose').stop().animate({opacity: '0'},200);
								$(this).parents('li').siblings().children('.cxv').children('ul').hide(200);
							}else{
								console.log($('.cxv').children('h3').next().find('h3').length)
								$('.cxv').children('h3').next().find('h3').removeClass('active');
								$(this).addClass('active');
								$('.cxv').children('h3').next().find('.zy_bookopen').stop().animate({opacity: '0'},200);
								$('.cxv').children('h3').next().find('.zy_bookclose').stop().animate({opacity: '1'},200);
								
								$(this).siblings('.zy_bookopen').stop().animate({opacity: '1'},200);
								$(this).siblings('.zy_bookclose').stop().animate({opacity: '0'},200);
								$(this).parent().siblings().children('ul').hide(200);
							}
//							console.log($(this).parents('.zy_resources_tree_structure').find('h3').length)
						}else{
							if($(this).parent().hasClass('cxv')){
								$(this).removeClass('active');
							}else{
								
							}
							
							/*$(this).parents('.zy_resources_tree_structure').find('h3').removeClass('active');
							$(this).addClass('active');
							$(this).parent().siblings('.zy_bookopen').stop().animate({opacity: '0'},200);
							$(this).parent().siblings('.zy_bookclose').stop().animate({opacity: '1'},200);*/
						}
					}.bind(this));
				}else{
					console.log('木有');
					/*$(this).parents('.zy_resources_tree_structure').find('h3').removeClass('active');
					if($(this).parent().hasClass('cxv')){
						$(this).parents('li').siblings().children('.cxv').children('ul').hide(200);
						$(this).parents('li').siblings().children('.zy_bookopen').stop().animate({opacity: '0'},200);
						$(this).parents('li').siblings().children('.zy_bookclose').stop().animate({opacity: '1'},200);
					}else{
						$(this).addClass('active');
					}
					console.log('没有节点');*/
				}
			});
			
//			console.log($('.zy_resources_tree_structure').children().first().children('.cxv').children('h3'))
//			$('.zy_resources_tree_structure').children().first().children('.cxv').children('h3').trigger('click')
	    }
	}
});




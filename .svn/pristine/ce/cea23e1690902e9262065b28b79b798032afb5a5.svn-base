app.controller('resourcesSecondLevelCtrl',['$scope','$state','$timeout','$http','$location',function($scope,$state,$timeout,$http,$location) {
	/*$scope.treeOptions = {
        accept: function(sourceNodeScope, destNodesScope, destIndex) {
            return true;
        }
    }*/
   
    //左侧树
    $scope.data = [
        {
            "id": 1,
            "title": "node1防守是的放假了代课教师分了快打暑假工恐龙当家过来看的结构",
            "nodes": [
                {
                    "id": 11,
                    "title": "node1.1",
                    "nodes": [
                        {
                            "id": 111,
                            "title": "node1.1.1",
                            "nodes": [
                            	{
                            		"id": 1111,
				                    "title": "node1.1.1.1",
				                    "nodes": [
				                    	{
		                            		"id": 11111,
						                    "title": "node1.1.1.1.1",
						                    "nodes": [
						                    	{
				                            		"id": 111111,
								                    "title": "node1.1.1.1.1.1",
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
                    "nodes": [
                    	{
                    		"id": 121,
		                    "title": "node1.2.1",
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
                    "nodes": []
                },
                {
                    "id": 22,
                    "title": "node2.2",
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
                    "nodes": []
                }
            ]
        },
        {
            "id": 4,
            "title": "node4",
            "nodes": []
        }
    ];
	
	
	
}]);

app.directive('leftTree',function($timeout){
	return {
		restrict: 'EA',
		replace: true,
        scope: {
            conf: '='
        },
		link: function(scope, element, attrs) {
			element.on('click',function(e){
//				var opan = $(this).next();
//				console.log(this.statuse)
				/*if(!this.statuse){
					opan.show(400);
					this.statuse = !this.statuse;
					
//					$(this).find('.zy_open').stop().animate({opacity: '1'},400);
//					$(this).find('.zy_close').stop().animate({opacity: '0'},400);
					if($(this).parent().hasClass('cxv')){
						this.statuse = !this.statuse;
//						$(this).parent().siblings().children('ul').hide(400);
//						console.log($(this).parent().siblings().children('h2').find('.zy_open'))
//						$(this).parent().siblings().children('h2').find('.zy_open').stop().animate({opacity: '1'},400);
//						$(this).parent().siblings().children('h2').find('.zy_close').stop().animate({opacity: '0'},400);
					}
				}else{
					opan.hide(400);
					this.statuse = !this.statuse;	
					
//					$(this).find('.zy_open').stop().animate({opacity: '0'},400);
//					$(this).find('.zy_close').stop().animate({opacity: '1'},400);
					
				}
				
//				this.statuse = !this.statuse;*/
				
				$('.zy_resources_tree_structure').find('h2').removeClass('active');
				if($(this).next().children().length){
//					console.log('有')
					$(this).next().toggle(200,function(){
						if($(this).next()[0].style.display == 'block'){
							if($(this).parent().hasClass('cxv')){
								$(this).parents('li').siblings().find('.zy_bookopen').stop().animate({opacity: '0'},200);
								$(this).parents('li').siblings().find('.zy_bookclose').stop().animate({opacity: '1'},200);
								$(this).parent().siblings('.zy_bookopen').stop().animate({opacity: '1'},200);
								$(this).parent().siblings('.zy_bookclose').stop().animate({opacity: '0'},200);
								
								$(this).parents('li').siblings().children('.cxv').children('ul').hide(200);
								$(this).siblings('ul').children().first().children('h2').addClass('active');
							}else{
//								$(this).parents('.zy_resources_tree_structure').find('h2').removeClass('active');
								$(this).addClass('active');
								$(this).parent().siblings().children('ul').hide(200);
							}
//							console.log($(this).parents('.zy_resources_tree_structure').find('h2').length)
						}else{
//							$(this).parents('.zy_resources_tree_structure').find('h2').removeClass('active');
							$(this).addClass('active');
							$(this).parent().siblings('.zy_bookopen').stop().animate({opacity: '0'},200);
							$(this).parent().siblings('.zy_bookclose').stop().animate({opacity: '1'},200);
						}
					}.bind(this));
				}else{
//					console.log('木有');
//					$(this).parents('.zy_resources_tree_structure').find('h2').removeClass('active');
					if($(this).parent().hasClass('cxv')){
						$(this).parents('li').siblings().children('.cxv').children('ul').hide(200);
					}else{
						$(this).addClass('active');
					}
					console.log('没有节点');
				}

				
				
				/*opan.style.transition='height .5s';
				if(!this.statuse){
					this.innerHTML = '-';
					opan.style.display = 'block';
					var offsetheight = opan.offsetHeight;
					opan.style.height = 0;
					$timeout(function(){
						opan.style.height = offsetheight+'px';
						opan.addEventListener('transitionend',function(){
							this.removeAttribute('style');
							this.style.display = 'block';
						})
					},0)
				}else{
					this.innerHTML = '+';
					var offsetheight = opan.offsetHeight;
					opan.style.height = offsetheight+'px';
					$timeout(function(){
						opan.style.height = 0+'px';
						opan.addEventListener('transitionend',function(){
							this.removeAttribute('style');
							this.style.display = 'none';
						});
					},0)
				}
				this.statuse = !this.statuse;
				this.state = true;
				$timeout(function(){
					this.state = false
				}.bind(this),500)*/
				/*var opan = $(this).parent().next()[0];
				if (opan.offsetHeight === 0) {
		            // 不可见，调用Slider.slideDown函数：在300毫秒内下拉
		            Slider.slideDown(opan, 300);
		        } else {
		            // 可见，调用Slider.slideUp函数：在300毫秒内上滑
		            Slider.slideUp(opan, 300);
		        }*/
//				$(this).parent().next().toggle(500)
			})
			
	    }
	}
})



/*app.directive('tree',function(){ 
  return{ 
    require:'?ngModel', 
    restrict:'A', 
    link:function($scope,element,attrs,ngModel){ 
		console.log(ngModel)
    	
      var setting = { 
        data :{ 
          simpleData:{ 
            enable:true
          } 
        }, 
        callback:{ 
          beforeClick:function(treeId, treeNode) {//点击菜单时进行的处理 
            var zTree = $.fn.zTree.getZTreeObj("tree"); 
            if (treeNode.isParent) { 
              zTree.expandNode(treeNode); 
              return false; 
            } else { 
              window.location.href=treeNode.url; 
              return true; 
            } 
          } 
        } 
      }; 
      //向控制器发送消息，进行菜单数据的获取 
      $scope.$emit("menu",attrs["value"]);//此处attrs["value"]为ul中的value值，此处作为标记使用 
      //接受控制器返回的菜单的消息 
      $scope.$on("menuData",function(event,data){ 
        $.fn.zTree.init(element, setting, data);//进行初始化树形菜单 
        var zTree = $.fn.zTree.getZTreeObj("tree"); 
        var selectName = $("#selectName").val(); 
        if(typeof selectName == "undefined" || selectName == ""){ 
          zTree.selectNode(zTree.getNodeByParam("id","1"));//默认第一个选中 
          $("#selectName").val(zTree.getSelectedNodes()[0].code);//赋值 
        }else{ 
          for(var i =0; i<data.length;i++){ 
            if(data[i]["code"] == selectName ){ 
              zTree.selectNode(zTree.getNodeByParam("code", data[i]["code"])); 
            } 
          } 
        } 
      }); 
  
    } 
  } 
}); */

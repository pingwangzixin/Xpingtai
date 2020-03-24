app.controller('templateSettingCtrl',['$scope','$state','$timeout','$http','$location','$q','$rootScope','templateServer',function(scope,$state,$timeout,$http,$location,$q,$rootScope,templateServer) {
	
	//退出按钮 退出门户管理
	scope.closeDoorAdmin = function (){
		scope.$parent.showAdmin = false;
		$rootScope.$broadcast('doorAdminOut',scope.$parent.showAdmin);
	};
	
//	function (scope,element,attr,ctrl,linker){
//			console.log(templateServer.test)
			//导航切换
//			scope.tabState = templateServer.test;
			scope.tabState = {
				stateA : 0,			//一级
				stateB : 0,			//二级
				statePlate : 0		//板式
			}
			scope.tabs = {
				classA : function (i){
					scope.tabState.stateA = i;
				},
				classB : function (i){
					scope.tabState.stateB = i;
				},
				classPlate : function (i){
					scope.tabState.statePlate = i;
				}
			};
			
			//风格
			scope.styleSet = templateServer.serStyleSet;
			
			//风格切换
			scope.changeStyle = function (i){
				angular.forEach(scope.styleSet,function (ele,index){
					scope.styleSet[index].checked = false;
				});
				scope.styleSet[i].checked = true;
				$rootScope.$broadcast('changeColor');
			};
			
			//logo
			scope.logoBox = templateServer.serLogoBox;
			//广告
			scope.adBox = [
				{span : '广告1',img : 'ad_1'},
				{span : '广告2',img : 'ad_1'},
				{span : '广告5',img : 'ad_1'},
				{span : '广告10',img : 'ad_1'},
				{span : '广告35+',img : 'ad_1'}
			];
			//上传按钮
			scope.fileBtn = {
				logoFile : scope.logoBox.length >= 2 ? false : true,		//logo
				adFile : scope.adBox.length >= 5 ? false : true				//ad
			}
			
			//logo删除
			scope.deleteLogo= function (tar){
				scope.logoBox.splice(angular.element(tar.target).parents('li').index(),1);
				angular.element(tar.target).parents('li').remove();
				scope.fileBtn.logoFile = scope.logoBox.length >= 2 ? false : true
			};
			
			//广告拖拽
			var adArr = [];
			scope.stop = function (e,ui){
				var ad = angular.forEach(scope.adBox,function (ele,i){
//					return ele.span;
					adArr.push(ele.span)
				}).join(',');
				/*var ad = scope.adBox.map(function(i){
			    	return i.span;
			    }).join(', ');*/
//			    console.log(ad)
//			    console.log(typeof ad)
//				adArr.push(ad);
				console.log(adArr)
				adArr = [];
			}
			
			
			scope.sortableOptions = {
				'ui-floating': true
			};
			
			//广告删除
			scope.deleteAd = function (tar){
				scope.adBox.splice(angular.element(tar.target).parents('li').index(),1);
				angular.element(tar.target).parents('li').remove();
				scope.fileBtn.adFile = scope.adBox.length >= 5 ? false : true
			};
			
			
			console.log($location.path());
			//板式---栏目
			scope.columnChoose = templateServer.serColumn;
			//栏目切换
			scope.transColumn = [];
			angular.forEach(scope.columnChoose,function (ele,i){
				if(ele.checked == true){
					scope.transColumn.push(ele)
				}
			});
			templateServer.serColumn = scope.transColumn;
			$rootScope.$broadcast('column');
			console.log(templateServer.serColumn);
			
			scope.changeColumn = function (i){
				scope.transColumn = [];
//				console.log(scope.columnChoose[i].href)
				var currentPage = scope.columnChoose[i].href != '' ? scope.columnChoose[i].href.replace(/\./, "/") : console.log('href为空');
//				console.log(currentPage)
				
				if($location.path().lastIndexOf(currentPage) != -1) {
					scope.columnChoose[i].checked = true;
					console.log('当前页面')
				}else{
					scope.columnChoose[i].checked = !scope.columnChoose[i].checked;
				}
				
				angular.forEach(scope.columnChoose,function (ele,i){
					if(ele.checked == true){
						scope.transColumn.push(ele)
					}
				});
				
				templateServer.serColumn = scope.transColumn;
				console.log(templateServer.serColumn)
				$rootScope.$broadcast('column');
			};
			
			//板式---排版
			scope.typesettingChoose = [ 
				{img : 'plate1',name: '板式一',checked : true},
				{img : 'plate2',name: '板式二',checked : false},
				{img : 'plate3',name: '板式三',checked : false}
			];
			//排版切换
			scope.changeTypesetting = function (i){
				angular.forEach(scope.typesettingChoose,function (ele,index){
					scope.typesettingChoose[index].checked = false;
				});
				scope.typesettingChoose[i].checked = true;
			};
			
			//板式---组件
			scope.assemblyChoose = templateServer.assembly;
			//组件切换
//			scope.transAssembly = [];
			scope.changeAssembly = function (i){
				$rootScope.$emit('assembly');
				scope.assemblyChoose[i].checked = !scope.assemblyChoose[i].checked;
				console.log(templateServer.assembly)
				/*angular.forEach(scope.assemblyChoose,function (ele,i){
					if(ele.checked == true){
						scope.transAssembly.push(ele)
					}
				});*/
//				templateServer.assembly = scope.transAssembly;
			};
			
			console.log(scope.assemblyChoose)
			
			
			
//		}
			

			

}]);

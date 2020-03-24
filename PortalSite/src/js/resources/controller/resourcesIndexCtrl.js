app.controller('resourcesIndexCtrl',['$scope','$state','$timeout','$http','$location',function($scope,$state,$timeout,$http,$location) {

	$http.get(resourcesIp + "edu-resource/a/resource/mrs_rmi/getResources?token=29B5DF07F7FC514807CE5FBC12EA1506&order=1&pageSize=6").success(function(data) {
       $scope.newResource = data.result.list;
       console.log("最新资源");
         console.log(data.result.list);
	});
	
	$http.get(resourcesIp + "edu-resource/a/resource/mrs_rmi/getResources?token=29B5DF07F7FC514807CE5FBC12EA1506&order=1&type=1&pageSize=10").success(function(data) {
       $scope.hotResource = data.result.list;
       	 console.log("最热资源");
         console.log(data.result.list);
	});
	
	$scope.rankingList = [];
	//资源排行榜
	$http.get(resourcesIp + "edu-resource/a/resource/mrs_rmi/getResources?token=29B5DF07F7FC514807CE5FBC12EA1506&order=1&type=1&pageSize=10").success(function(data){
		console.log(data)
		$scope.rankingList = data.result.list;
		console.log($scope.rankingList)
	}).error(function (){
		
	});
	
}])

//新闻展示时间过滤器
app.filter('timeFilter',function(){
	return function(obj){
//  	console.log(obj)
    	if(obj != undefined){
    		return obj.substr(0,10);
    	}else{
    		return;
    	}
	}
});
//资源图片过滤器
app.filter('imgFilter',function(){
	return function(obj){
//  	console.log(obj)
    	if(obj != undefined){
    		if(obj == "1"){
    			return "./img/resources_mp4.png";
    		}else if(obj == "2"){
    			return "./img/resources_ear.png";
    		}else if(obj == "3"){
    			return "./img/resources_pic.png";
    		}else if(obj == "5"){
    			return "./img/resources_ppt.png";
    		}else if(obj == "6"){
    			return "./img/resources_word.png";
    		}else if(obj == "7"){
    			return "./img/resources_excal.png";
    		}else if(obj == "8"){
    			return "./img/resources_mp4.png";
    		}else if(obj == "9"){
    			return "./img/resources_mp4.png";
    		}else if(obj == "10"){
    			return "./img/resources_mp4.png";
    		}
    	}else{
    		return;
    	}
	}
});



app.controller('newsCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
	
	//定义展示列表变量
	$scope.msg = {
		"showinfo":true
	};
	
	$scope.showNews;
	//新闻列表 
	$scope.news;
	$http.post(newsIp + "MdjXTeacher/msgcenter/findNewsList.do",{json:"{'cpage':1,'pageSize':10,'type':'0'}"}).success(function(data) {
        $scope.news = data.resultData;
        console.log($scope.news)
    });
	
	//查看新闻详情
	$scope.lookMsgInfo = function(newss){
		$scope.showNews = newss;
		console.log($scope.showNews);
		var ocontent = document.querySelector('.zy_new_con');
        ocontent.innerHTML = $scope.showNews.content;
		$scope.msg.showinfo = false;
	}
	
	//返回新闻列表
	$scope.goList = function (){
		$scope.msg.showinfo = true;
	};
}]);

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

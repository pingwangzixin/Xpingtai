app.controller('indexCtrl',['$scope','$state','$timeout','$http','$location','$interval','$rootScope',function($scope,$state,$timeout,$http,$location,$interval,$rootScope) {
//	console.log($rootScope.token);
	//活动类型
	$scope.activityList = [
		{tit: '生命教育', bg : '',con: '生命教育是直面生命和人的生死问题的教育，其目标在于使人们学会尊重生命、理解生命的意义以及生命与天人物我之间的关系，学会积极的生存、健康的生活与独立的发展，并通过彼此间对生命的呵护、记录、感恩和分享，由此获得身心灵的和谐，事业成功，生活幸福，从而实现自我生命的最大价值。'},
		{tit: '习惯养成', bg : '',con: '任何一个好习惯的养成都不会轻而易举。因此，我们培养学生习惯的时候一定要循序渐进，由浅入深，由近及远。尤其是开始时我们要宁少勿多、宁简勿繁、宁易勿难。先找一个学生比较容易做到的，做起来有兴趣的，而且能不断受到自己和周围人激励的习惯开始，这样就容易成功。'},
		{tit: '法律法规', bg : '',con: '法律法规是中华人民共和国现行有效的法律、行政法规、司法解释、地方法规、地方规章、部门规章及其他规范性文件以及对于该等法律法规的不时修改和补充。其中，法律有广义、狭义两种理解。广义上讲，法律泛指一切规范性文件；狭义上讲，仅指全国人大及其常委会制定的规范性文件。'},
		{tit: '思想品德', bg : '',con: '思想品德是一个多要素的综合系统，是人们在一定的思想的指导下，在品德行为中表现出来的较为稳定的心理特点、思想倾向和行为习惯的总和。它与一定的经济活动、政治活动、道德风尚及风俗习惯相联系。思想品德教育的实质是将一定社会的思想道德转化为受教育者个体的思想道德。'},
		{tit: '其它', bg : '',con: '除了上述四类之外的活动都可以归入"其他"类型中，该类活动是对其他四类活动的一个补充。老师可以从实际情况出发创建独立于四类活动之外的活动给学生下发完成。'},
	];
	
	/*console.log($rootScope.userType)
	$scope.personalMsg = {};
	var token = $location.$$search.token;
	sessionStorage.setItem('token',token);
//	$rootScope.token = '8ed9cc2e26a38e71c789e297736cd35a';
	var url = jeucIp+"Api/UserInfo/getUser?token="+token+"&clientId="+id+"&clientSecret="+clientSecret;
//	var url = "http://192.168.9.98:8080/jeuc/Api/UserInfo/getTea?teaIdCard=100000200006090000"
	$http.get(url).success(function(res){
		if(res.ret != "1"){
			return ;
		}
		if(res.userRole == "tea"){
			sessionStorage.setItem("user",JSON.stringify(res.teacherInfo));
			$scope.personalMsg.name = res.teacherInfo.teaName;
			$scope.personalMsg.role = res.teacherInfo.teaRole;
			$scope.personalMsg.school = res.teacherInfo.schoolName;
			if(!$.isEmptyObject(res.teacherInfo.teachingInfo)){
				$scope.personalMsg.class = res.teacherInfo.teachingInfo[1].subStages;
			}
		}else{
			sessionStorage.setItem("user",JSON.stringify(res.studentInfo));
			$scope.personalMsg.name = res.studentInfo.stuName;
			$scope.personalMsg.role = "学生";
			$scope.personalMsg.school = res.studentInfo.stuClassInfo.schoolName;
			$scope.personalMsg.class= res.studentInfo.stuClassInfo.subStages
		}
		console.log(res);
		
		
//		sessionStorage.setItem("type",res.userRole);
		$rootScope.userType = res.userRole;
		console.log($rootScope.userType);
	});*/
	
	
	//显示角色
	var type = sessionStorage.getItem('type');
	if(type){
		changetea(type);
	}else{
		$scope.$on('usertype',function(e,userType){
			$scope.roleList = [];
			console.log(userType)
			changetea(userType);
		})
	}
	
	
	function changetea(userType){
		if(userType == 'tea'){
			$scope.roleList = [
				{role : '任课教师', src: 'ami1', className : 'bounceInLeft', con : '任课教师即科任!科任可以对所教的班级创建、下发、修改、删除、共享、查看、统计活动,并对学生在活动中的反馈和家长在活动中的配合予以点赞推荐！'},
				{role : '班主任', src: 'ami2', className : 'bounceInLeft', con : '班主任可以对所管理的班级创建、下发、修改、删除、共享、查看、统计活动,并对学生在活动中的反馈和家长在活动中的配合予以点赞推荐！'},
				{role : '学年组长', src: 'ami3', className : 'bounceInDown', con : '学年组长可以对本学年的班级创建、下发、修改、删除、共享、查看、统计活动,并对学生在活动中的反馈和家长在活动中的配合予以点赞推荐！'},
				{role : '校管理员', src: 'ami4', className : 'bounceInRight', con : '任课教师即科任!科任可以对所教的班级创建、下发、修改、删除、共享、查看、统计活动,并对学生在活动中的反馈和家长在活动中的配合予以点赞推荐！'},
				{role : '市管理员', src: 'ami5', className : 'bounceInRight', con : '市管理员可以统计本地区学校进行的活动！'}
			];
		}else{
			$scope.roleList = [{role : '学生', src: 'ami6', className : 'bounceInDown', con : '可以参加学校和班级的活动，可以跟随家长一起对活动予以反馈，浏览共享活动点赞！'}];
		}
	}
//	console.log($scope.roleList)
}]);


app.controller('teachingMaterialCtrl',['$scope','$state','$timeout','$http','$location','$interval','templateServer',function($scope,$state,$timeout,$http,$location,$interval,templateServer) {
	//导航显示小标题
	$scope.navShowDet = {
		title : '基础设置',
		ifShow : false
	};
	
	$scope.state = {
		versionstate:0,
		versionList:['苏教版','粤语版','鲁教版','京改版','鲁人版','北大师版'],
		addContent:'',
		addContentState:false,
		subjectEdit:false,
		editTitle:'',
		editTitleId:'',
		importAlert:false,
		addsection:false,
		fileshow:false,
		versioinadd:1,
		filename:'',
		filesize:'',
		filetype:'',
		gradeLinkup:false,
	};
	$scope.data = {
		versionlist:['人教版1','人教版2','人教版3','人教版4','人教版5','人教版6','人教版7']
	};
	$scope.changeversion = function(index){
		$scope.state.versionstate = index;
	};
	$scope.toggle = function (scope) {
        scope.toggle();
      };
	$scope.dataTree = [
	  {
	    "id": 1,
	    "title": "node1",
	    "nodes": [
	      {
	        "id": 11,
	        "title": "node1.1",
	        "nodes": [
	          {
	            "id": 111,
	            "title": "node1.1.1",
	            "nodes": []
	          }
	        ]
	      },
	      {
	        "id": 12,
	        "title": "node1.2",
	        "nodes": []
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
	  }
	];
	$scope.insertVerBtn = function(){
		$scope.state.addsection = false;
		$scope.state.editTitle = '';
		$scope.state.versioinadd = 1;
		
	}
	$scope.remove = function (scope) {
        scope.remove();
      };

      $scope.toggle = function (scope) {
        scope.toggle();
      };
		$scope.editItem = function(scope){
			$scope.state.subjectEdit = true;
			$scope.state.editTitleId = scope.$modelValue.id;
			$scope.state.editTitle = scope.$modelValue.title;
		}
      $scope.moveLastToTheBeginning = function () {
        var a = $scope.data.pop();
        $scope.data.splice(0, 0, a);
      };

      $scope.newSubItem = function (scope) {
        var nodeData = scope.$modelValue;
        nodeData.nodes.push({
          id: nodeData.id * 10 + nodeData.nodes.length,
          title: '新增节点 —— 第' + (nodeData.nodes.length + 1) + '个',
          nodes: []
        });
      };
      function eachObj(obj,nodeid,nodetit){
      	if(obj.id == nodeid){
      		obj.title = nodetit;
      		return false;
      	}else{
      		if(obj.nodes.length){
      			obj.nodes.forEach(function(v){
      				eachObj(v,nodeid,nodetit)
      			})
      		}
      	}
      	
      }
      $scope.canceledit = function(){
      	$scope.state.subjectEdit = false;
      };
      $scope.sureEdit = function(){
      	var nodeid = $scope.state.editTitleId;
      	var title = $scope.state.editTitle;
      	$scope.dataTree.forEach(function(val){
      		eachObj(val,nodeid,title);
      	});
      	$scope.state.subjectEdit = false;
      };
      $scope.selectVersion = function(index,versionId){
		$scope.state.sectionindex = index;
		$scope.state.versionId = versionId;
	}
}])
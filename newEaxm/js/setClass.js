var dcId = getRequest().id;
var refresh = false;
//选科list
var selectSubList = [];
//年级名称
var gradeName = '';
var newClassId = '';
/**
 * 获取url参数
 */
function getRequest() {   
   var url = location.search; //获取url中"?"符后的字串   
   var theRequest = new Object();   
   if (url.indexOf("?") != -1) {   
      var str = url.substr(1);   
      strs = str.split("&");   
      for(var i = 0; i < strs.length; i ++) {   
         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);   
      }
   }
   return theRequest;
}


$(function(){
	
    $(".not-test").attr("name", dcId);
	findDivideClass();
	
	
	//tab切换
	$('.mlh_check a').click(function(){
		var index = $(this).index();
		$('.mlh_check a').removeClass('active').eq(index).addClass('active');
		$('.mlh_student').hide().eq(index).show();
		if(index==1){
			divisionResult();
			findTeacher();
		}
	});
	
	$('.step_top').click(function(){
		var index = $(this).index();
		$('.mlh_check a').removeClass('active').eq(index).addClass('active');
		$('.mlh_student').hide().eq(index).show();
	})
	
	$('#divide_select').on('change',function(){
		
		var index = $('#divide_select option:selected').attr('index');
		var data = {};
		var progress = {total:0,electiveCourse:0,nonElectiveCourse:0};
		if(index != undefined){
			data = selectSubList[index];
			progress = data.progress;
		}
		$('#total').html('分班总人数   '+progress.total+'人');
		$('#electiveCourse').html(gradeName+'人数   '+progress.electiveCourse+'人');
		$('#nonElectiveCourse').html('还有'+progress.nonElectiveCourse+'人由于未选科而没有参加分班');
		
		var subId = $(this).find('option:selected').val();
		var divideId =  $(".not-test").attr('name');
		$(".not-test").attr("id", subId);
		updateDivideClass(divideId,subId)
	});
	
	        
	//下拉列表 
	$('#grade_select').on('change',function(){
		var selectVal = $(this).find('option:selected').val();
        var selecttest = $(this).find('option:selected').text();
		 if($(this).val()){
            $('#newClassList tr').each(function(){
	        	var history_income_type = $(this).children().eq(0).attr('name');//收入类别
	        	if(selectVal==history_income_type){
	        		$('#newClassList tr').hide();
	        		$(this).show();
	        	}else if(selectVal == 0){
	        		$('#newClassList tr').show();
	        	}
	        })
	    }
	});
	
	//关闭设置班主任
	$('.mlh_tc .mlh_close').click(function(obj){
        $(obj.currentTarget.parentElement.parentElement.parentElement).hide();
    });
});

/*设置班主任弹框*/
function headTeacher(item){
	newClassId = item.id;
	$('#input_tea').val('');
	searchTeaBtn();
	$('.set_bzr li').removeClass('active');
	if(item.classAdviserId!=""){
		$('#'+item.classAdviserId).addClass('active');
	}
	$('#mlh_bzr').show();
}

/**
 * 查询老师
 */
function findTeacher(){
	$.ajax({
		type:"get",
		url: ucServerIp + "/api/uc/user",
		data:{delFlag:0,officeId:getRequest().schoolId,state:1,userType:1},
		success:function(resJson){
			var html = '';
			if(resJson.ret ==200){
				var data = resJson.data.list;
				$.each(data, function(i,o) {
					html += '<li id="'+o.id+'" data-areaid="'+o.cityId+'">'+o.realname+'</li>';
				});
			}
			$('.set_bzr').html(html);
			$('.set_bzr li').unbind('click');
			$('.set_bzr li').on('click',function(){
				$('.set_bzr li').removeClass('active');
				$(this).addClass('active');
			})
			divisionResult();
		}
	});
}
var submitFlag = false;
/**
 * 添加班主任
 */
function addClassAdviser(){
	if(submitFlag){
		return false;
	}
	var classAdviserId = $('.set_bzr .active').attr('id');
	var classAdviserName = $('.set_bzr .active').text();
	if(typeof(classAdviserId) == "undefined"){
		warnTips('请选择班主任');
		return;
	}
	var caArr = [{classAdviserId:classAdviserId,id:newClassId,classAdviserName:classAdviserName}]
	submitFlag = true;
	$.ajax({
		type:"put",
		url:serverIp + "/newClass/update",
		async:true,
		data:{data:JSON.stringify(caArr)},
		success:function(resJson){
			submitFlag = false;
			if(resJson.code == 200){
				successTips('set');
				$('#mlh_bzr').hide();
				findTeacher();
			}else{
				failTips('set');
			}
		},
		error:function(resJson){
			failTips('set');
		}
	});
	
	
}

/**
 * 添加导出连接
 */
function addExportHref(){
	$('.daochu').attr('href',serverIp + '/classNum/resultDown?export=true&type=resultDivideClassDown&fileName='+$('.divideClassName').html()+'&subjectId='+$(".not-test").attr('id')+'&divideId='+$(".not-test").attr('name'));
}
/**
 * 修改subId
 */
function updateDivideClass(id,subId){
	var data={};
	data.subjectId=subId
	$.ajax({
		type: "POST",
		datatype:"json",
		url: serverIp + "/divideClass/updateDivide",
		data: {"id":id, "data":JSON.stringify(data)},
		success:function(resJson){
			if(resJson.code == 200){
				divideListFill(id)
			}
		}
	})	
}

function divideListFill(id) {
	$.ajax({
		type: "get",
		datatype:"json",
		url: serverIp + "/divideClass/findSmallClassList/"+id,
		data: {},
		success: function(resJson) {
//			console.log(resJson);
			if(resJson.code==200){
				var resList = resJson.data;
				var html = '';
				$.each(resList, function(index,data) {
					html += '<tr>'
							+'<td name="'+data.subIds+'">'+data.subNames+'</td>'
							+'<td >'+data.sutNum+'</td>'
							+'<td><input type="text" id="res_'+index+'" name="'+index+'" placeholder="正整数" onkeyup="keySet(this.value,'+data.sutNum+',this.name)" ></td>'
							+'<td id="'+index+'"></td>'
						+'</tr>';
				});
				$('#divideClassList').html(html);
				
				var gradeOpts = '<option value="0">全部</option>';
				$.each(resList, function(index, item) {
					gradeOpts += '<option value="' + item.subIds + '">' + item.subNames + '</option>';
				});
				$('#grade_select').html(gradeOpts);
				findClassNum(id);
			} else if(resJson.code==403){
				warnTips('暂无数据');
			} else {
				warnTips('查询失败');
			}
		}
	});
}

/**
 * 查询是否分班
 */
function findClassNum(id){
	var subjectId =  $(".not-test").attr('id');
	$.ajax({
		type:"get",
		url: serverIp + "/divideClass/findSmallStuNum/"+id,
		data: {},
		async:false,
		success:function(resJson){
//			console.log(resJson)
			if(resJson.code==200){
				var data = resJson.data;
				if(data.length>0){
					$.each(data, function(index,item) {
//					console.log(item)
						$('#'+index).html(item.classPerson);
						$('#res_'+index).val(item.classNum);
						$('#res_'+index).data('perNum',item.classPerson);
					});
					 refresh = true;
					 $('#dcBtn').html('重新分班');
				}else{
					 refresh = false;
					  $('#dcBtn').html('下一步，开始分班');
				}
			}
		}
	});
	
}
/**
 * 计算班额数
 */
function keySet(parm,sutNum,index){
	var perNum = parm;
	if(isNaN(parm) || parm == ""){
		$("#"+index).html("");
	}else{
		if(sutNum != '' && sutNum != 0){
			perNum = Math.ceil(sutNum/parm);
		}
		$("#"+index).html(perNum);
		$("#res_"+index).data('perNum',perNum);
		
	}
}
//分班参数传入
function startDivision(){
	var divideId =  $(".not-test").attr('name');
	var subjectId =  $(".not-test").attr('id');
	if(subjectId == '' || subjectId === undefined){
		warnTips('请选择选科');
		return;
	}
	var subList=[];
	$("#divideClassList tr").each(function(){
		var map = new Object();
		map.ids = $(this).find("td").attr('name');
		$(this).find('input').each(function(index, item){
			$item = $(item);
			console.log($item)
			map.classNum = $(this).val();
			map.classPerson = $item.data('perNum');
		});
		if(map.classNum == ''){
			warnTips('请输入开课班级数');
			return;
		}
		subList.push(map);
	});
	var data = {};
	data.selectSubList=subList;
	data.divideId=divideId;
	data.subjectId=subjectId;
	console.log(data)
	$.ajax({
            type : "POST",
            url : serverIp + "/classNum/startDivision",
            data : JSON.stringify(data),
            contentType : "application/json",
            dataType : "json",
            success:function(resJson){
            	console.log(resJson.code)
				if (resJson.code == 200) {
					var index = $('.mlh_check a').index();
					$('.mlh_check a').removeClass('active').eq(1).addClass('active');
					$('.mlh_student').hide().eq(1).show();
					successTips('divide');
					divisionResult();
					findTeacher();
				}
            },
            complete:function(XMLHttpRequest, resJson) {
				
            }
        });
}

//分班数据回显
function divisionResult(){
	addExportHref();
	var divideId =  $(".not-test").attr('name');
	var subjectId =  $(".not-test").attr('id');
	$.ajax({
	    type : "get",
	    url : serverIp + "/newClass/makeStuCount",
	    data : {'divideId':divideId, 'subjectId':subjectId},
	    dataType : "json",
	    success:function(resJson) {
//	    	console.log(resJson.data)
	    	if(resJson.code==200){
				var resList = resJson.data;
				var html = '';
				$.each(resList, function(index,item) {
					var classJson = JSON.stringify(item);
					html += '<tr id="'+item.id+'">'
						+'<td name="'+item.ids+'">'+(index+1)+'</td>'
						+'<td>'+item.subnames+'</td>'
						+'<td><input  class="classNames" type="text" value="'+item.name+'"></td>'
						+'<td><input type="text" readonly="readonly" value="'+item.classAdviserName+'" onclick=headTeacher('+classJson+') /></td>'
//						+'<td>'+item.boy+'</td>'
//						+'<td>'+item.girl+'</td>'
//						+'<td>'+item.stuNum+'</td>'
						+'</tr>';
				});
				$('#newClass table tbody').html(html);
			}
	    }
	});
}

//修改班级名称
function updateClassName(){
	//组对象
	var classNumArray = [];
	var classNumObj = {};
	$('#newClassList tr').each(function(){
		classNumObj = {};
		classNumObj.id = $(this).attr('id');
		classNumObj.name = $(this).find('.classNames').val();
		classNumArray.push(classNumObj);
	})
	var data = JSON.stringify(classNumArray);
	$.ajax({
		url:serverIp+'/newClass/update',
		type:'put',
		data:{data:data},
		async:false,
		success:function(result){
			if(result.code==200){
				successTips('update');
				//保存成功，重新请求刷新
				divisionResult();
			}else{
				failTips('update');
				console.log('修改失败');
			}
		},error:function(msg){
			failTips('query');
		}
	});
}

/**
 * 根据Id查询分班
 */
function findDivideClass(){
	$.ajax({
		type:"get",
		url: serverIp +  "/divideClass/" + dcId,
		data:{},
		async:false,
		success:function(resJson){
			if(resJson.code == 200){
				var data = resJson.data;
				$('.divideClassName').html(data.name);
				$('#list_dc_name').html(data.name);
				oldSelSubId = data.subjectId;
				gradeName = data.gradeName;
				findSub(data.schoolYear,data.semester,data.gradeId,oldSelSubId);
				divideListFill(dcId);
			}
		}
	});
}
/**
 * 查询选科
 */
function findSub(schoolYear,semester,gradeId,subjectId) {
	$('#divide_select').html('<option data-total="0" data-yxnum="0" data-wxnum="0" value="">请选择</option>');
	$.ajax({
		type: "get",
		url: serverIp + "/selectsub",
		async:false,
		data: {schoolYear:schoolYear,semester:semester,gradeId:gradeId},
		success: function(resJson) {
			if(resJson.code == 200) {
				selectSubList = resJson.data;
				if(resJson.data.length>0){
					$.each(resJson.data, function(index,item) {
						$('#divide_select').append('<option index='+index+' data-gradename="'+item.gradeName+'" data-total="'+item.progress.total+'" data-yxnum="'+item.progress.electiveCourse+'" data-wxnum="'+item.progress.nonElectiveCourse+'" value="'+item.id+'">'+item.name+'</option>');
					});
					$('.not-test').attr('id', subjectId);
					$('#divide_select').val(subjectId);
					var index = $('#divide_select option:selected').attr('index');
					var data = selectSubList[index];
					var progress = data.progress;
					$('#total').html('分班总人数   '+progress.total+'人');
					$('#electiveCourse').html(gradeName+'人数   '+progress.electiveCourse+'人');
					$('#nonElectiveCourse').html('还有'+progress.nonElectiveCourse+'人由于未选科而没有参加分班');
				}
			}
		}
	});
}
/**
 * 警告提示
 */
function warnTips(msg){
	messagePrompt('warnTips', msg);
}

//消息弹窗
function messagePrompt(name, msg){
	$("#"+name+" .textContent").html(msg);
	$("#"+name).show();
	setTimeout(function(){
        $("#"+name).hide();
    },1500);
}

/**
 * 查询教师按钮
 */
function searchTeaBtn(){
	var teaName = $('#input_tea').val();
	$('.set_bzr li').each(function(i,o){
		if($(o).text().indexOf(teaName)==-1){
			$(o).hide();
		}else{
			$(o).show();
		}
	})
}


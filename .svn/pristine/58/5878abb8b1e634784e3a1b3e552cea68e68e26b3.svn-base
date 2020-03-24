//分班id
var divideClassId = '';
//选科id
var subjectId = '';
//年级名称
var gradeName = '';
//选科list
var selectSubList = [];
//选中的选科data
var selectSubData = [];
//所有的固定、走班行政、走班教学班额
var allSelectSub = {};
//
var subjectAssemble = {};
var newClassId = '';
$(function(){
	//获取到Url里面的参数 
	getUlrParam();
	//分班id
	divideClassId = $.getUrlParam('id');
	//初始化分班信息
	finddivideClassInfo();
	
	//头部切换
	$('.mlh_check a').click(function(){
		var index = $(this).attr('index');
		//查询组合回显数据
		findSelectSub(index);
		findScoreList();
		if(index=='1'){
			checkfixedSurplus('fixed');
		}else if(index=='2'){
			checkfixedSurplus('surplus');
		}else if(index=='3'){
			findTeacher();
		}
	});
	
	//选科change事件
	$('#selectSubList').change(function(){
		var index = $('#selectSubList option:selected').attr('index');
		subjectId = $('#selectSubList').val();
		if($('#selectSubList').val()!="qxz"){
			var data = selectSubList[index];
			var progress = data.progress;
			$('#total').html('分班总人数   '+progress.total+'人');
			$('#electiveCourse').html(gradeName+'人数   '+progress.electiveCourse+'人');
			$('#nonElectiveCourse').html('还有'+progress.nonElectiveCourse+'人由于未选科而没有参加分班');
			//根据选科id查询学生选科信息
			findStuSelectSubList(data.id, data.style);
		}else{
			$('#total').html('分班总人数   0人');
			$('#electiveCourse').html(gradeName+'人数   0人');
			$('#nonElectiveCourse').html('还有0人由于未选科而没有参加分班');
			//先清空
			selectSubData = [];
			$('#stuSelectSub').html("");
		}
	})
	
	//走班行政班额数计算
	$('#surplusClassNum').on('keyup', function(){
		var value = $(this).val();
		var count = Number($("#surplusCount").attr('count'));
		var classPerson = '';
		if(value>count){
			$(this).val(count);
			classPerson = 1;
//			alert('分班数不能大于人数');
		}else if(value!=''){
			classPerson = Math.ceil(count/value);
		}
		$('#surplusClassPerson').attr("classPerson", classPerson);
		$('#surplusClassPerson').html('班额数：'+classPerson+'人');
	})
	//分班结果预览，科目组合change事件
	$("#subjectAssemble").change(function(){
		var flag = true;
		$('.classNames').each(function(){
			if($(this).attr('cvalue')!=$(this).val()){
				flag = false;
			}
		})
		if(flag){
			findNewClassCount();
		} else{
			warnTips('是否要保存');
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
		data:{delFlag:0,officeId:$.getUrlParam('schoolId'),state:1,userType:1},
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
			findNewClassCount();
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

//初始化分班信息
function finddivideClassInfo(){
	$.ajax({
		url:serverIp+'/divideClass/'+divideClassId,
		type:'get',
		async:false,
		success:function(result){
			if(result.code==200){
				var data = result.data;
				gradeName = data.gradeName;
				subjectId = data.subjectId;
				$('.divideClassName').html('名称：'+data.name);
				//查询选科
				findSelectSubList(data.schoolYear, data.semester, data.gradeId);
			}else{
				console.log('查询失败');
			}
		},error:function(msg){
			failTips('query');
		}
	});
}

//根据分班年级查询选科
function findSelectSubList(schoolYear, semester, gradeId){
	//先清空
	selectSubList = [];
	$.ajax({
		url:serverIp+'/selectsub',
		type:'get',
		data:{schoolYear:schoolYear,semester:semester,gradeId:gradeId},
		async:false,
		success:function(result){
			var options = '<option value="qxz" >请选择</option>';
			if(result.code==200){
				var data = result.data;
				selectSubList = data;
				//循环选科
				var vdata = {};
				for(var i=0,len=data.length; i<len; i++){
					if(subjectId!=''&&subjectId==data[i].id){
						options += '<option index='+i+' selected="selected" value="'+data[i].id+'">'+data[i].name+'</option>';
						vdata = data[i];
					}else{
						options += '<option index='+i+' value="'+data[i].id+'">'+data[i].name+'</option>';
					}
				}
				$('#selectSubList').html(options);
				if($('#selectSubList').val()=='qxz'){
					$('#total').html('分班总人数   0人');
					$('#electiveCourse').html(gradeName+'人数   0人');
					$('#nonElectiveCourse').html('还有0人由于未选科而没有参加分班');
				}else{
					//回显该选科详情
					progress = vdata.progress;
					$('#total').html('分班总人数   '+progress.total+'人');
					$('#electiveCourse').html(gradeName+'人数   '+progress.electiveCourse+'人');
					$('#nonElectiveCourse').html('还有'+progress.nonElectiveCourse+'人由于未选科而没有参加分班');
					//根据选科id查询学生选科信息
					findStuSelectSubList(vdata.id, vdata.style);
				}
			}else{
				console.log('查询失败');
			}
		},error:function(msg){
			failTips('query');
		}
	});
}

//根据选科id查询学生选科信息
function findStuSelectSubList(id, style){
	//先清空
	selectSubData = [];
	$.ajax({
		url:serverIp+'/threesub',
		type:'get',
		data:{group:'true',subjectId:id},
		async:false,
		success:function(result){
			if(result.code==200){
				var data = result.data;
				selectSubData = data;
				var stuSelectSubList = '';
				//循环选科
				for(var i=0,len=data.length; i<len; i++){
					var ids = data[i].ids;
					if(ids.substring(ids.length-1, ids.length)==','){
						ids = ids.substring(0, ids.length-1)
					}
					stuSelectSubList += '<a href="#" class="mlh_btn" id="'+ids+'">'+data[i].name+'('+data[i].count+')</a>';
				}
				$('#stuSelectSub').html(stuSelectSubList);
				//选中、取消选中选科组合
				$('#stuSelectSub a').click(function(){
					if($(this).hasClass('active')){
						$(this).removeClass('active');
					}else{
						$(this).addClass('active');
					}
				});
				//根据选科id查询固定、走班行政、走班教学
				findSelectSub('0');
			}else{
				console.log('查询失败');
			}
		},error:function(msg){
			failTips('query');
		}
	});
}

//选取固定组合点击确定，保存优先固定分班组合
function submitFixedSelectSub(){
	var selectSubId = $('#selectSubList').val();
	if(selectSubId==''||selectSubId=='qxz'){
		warnTips('请选择选科');
		return false;
	}
	//获取固定、走班组合
	var dataObject = {};
	dataObject.subjectId = selectSubId;
	dataObject.divideId = divideClassId;
	var arrayData = [];
	var obj = new Object;
	
	var ctFlag = false;
	$('#stuSelectSub a').each(function(){
		obj = new Object;
		obj.ids = $(this).attr('id');
		if($(this).hasClass('active')){
			obj.classType = 1;
		}else{
			obj.classType = 2;
			ctFlag = true;
		}
		arrayData.push(obj);
	});
	if(ctFlag){
		//插入一条空的走班行政班开班
		obj = new Object;
		obj.classType = 3;
		obj.ids = 'hunheId';
		arrayData.push(obj);
	}
	
	dataObject.selectSubList = arrayData;
	var data = JSON.stringify(dataObject);
	//保存选中的组合为固定组合，未选中的组合为走班组合
	$.ajax({
		url:serverIp+'/middleDivideClassController',
		type:'post',
		data:{data:data},
		async:false,
		success:function(result){
			if(result.code==200){
				//保存成功，自动跳转到设置固定组合
				$('.mlh_check a').eq(1).click();
			}else{
				failTips('save');
				console.log('保存失败');
			}
		},error:function(msg){
			failTips('query');
		}
	});
}

//根据选科id查询固定、走班行政、走班教学
function findSelectSub(type){
	$.ajax({
		url:serverIp+'/middleDivideClassController/findList/'+divideClassId,
		type:'get',
		async:false,
		success:function(result){
			if(result.code==200){
				var data = result.data;
				allSelectSub = data;
				var fixedList = data.fixedList;
				var surplusList = data.surplusList;
				var surplus = data.surplus;
				if(type=='0'){
					for(var i=0,len=fixedList.length; i<len; i++){
						$('#stuSelectSub a[id="'+fixedList[i].ids+'"]').addClass('active');
					}
				}else if(type=='3'){
					//先清空
					subjectAssemble = {};
					var subjectAssembleJson = '';
					var html = '<option value="">全部</option>';
					//固定组合
					for(var i=0,len=fixedList.length; i<len; i++){
						for(var j=0,length=selectSubData.length; j<length; j++){
							if(fixedList[i].ids==selectSubData[j].ids){
								subjectAssembleJson += ',"'+ fixedList[i].ids +'":"'+ selectSubData[j].name+'"';
								html += '<option value="'+fixedList[i].ids+'">'+selectSubData[j].name+'</option>'
								break;
							}
						}
					}
//					查询追加剩余组合单科
					$.ajax({
						url:serverIp+'/middleDivideClassController/findStuOneSubCount/'+divideClassId+'/'+subjectId,
						type:'get',
						async:false,
						success:function(result){
							if(result.code==200){
								var data = result.data;
								var len = data.length;
								if(data.length>0){
									html += '<option value="hunheId">混合</option>';
									subjectAssembleJson += ',"hunheId":"混合"';
									for (var i=0; i<len; i++) {
										subjectAssembleJson += ',"' + data[i].id +'":"'+ data[i].name+'"';
										html += '<option value="'+data[i].id+'">'+data[i].name+'</option>'
									}
								}
							}else{
								console.log('查询失败');
							}
						},error:function(msg){
							failTips('query');
						}
					});
					
					subjectAssembleJson=subjectAssembleJson.substring(1);
					subjectAssemble = JSON.parse("{"+subjectAssembleJson+"}");
					$("#subjectAssemble").html(html);
					findNewClassCount();
				}
			}else{
				$("#subjectAssemble").html(''); 
				console.log('查询失败');
			}
		},error:function(msg){
			failTips('query');
		}
	});
}

//根据类型，回显展示固定、走班
function checkfixedSurplus(type){
	//选中的选科data---selectSubData
	//所有的固定、走班行政、走班教学班额---allSelectSub
	var count = 0;
	var html = '';
	var keyupCheck = "value=value.replace(/[^\\d]/g, '').replace(/^0{1,}/g,'')"; 
	if(type=='fixed'){
		//固定组合行政班级
		var fixedList = allSelectSub.fixedList;
		for(var i=0,len=fixedList.length; i<len; i++){
			for(var j=0,length=selectSubData.length; j<length; j++){
				if(fixedList[i].ids==selectSubData[j].ids){
					count+=selectSubData[j].count;
					html+='<tr classNumId="'+fixedList[i].id+'">'
							+'<td>'+selectSubData[j].name+'</td>'
							+'<td class="classCount">'+selectSubData[j].count+'</td>'
							+'<td class="classNumTd"><input class="classNum" onkeyup="'+keyupCheck+'" type="text" placeholder="请输入数字" value="'+checkNull(fixedList[i].classNum)+'"></td>'
							+'<td clas="classPerson">'+checkNull(fixedList[i].classPerson)+'</td>'
						+'</tr>';
					break;
				}
			}
		}
		$('#fixedCount').html('组合人数'+count+'人');
		$('#fixedTbody').html(html);
		//回显附件选项
//		$('input[name="kemu1"][value="'+fixedList[0].scoreBlance+'"]').attr('checked', true);
//		$(".scoreList").eq(0).val(fixedList[0].scoreId);
	}else{
		//剩余组合行政班级
		var surplus = allSelectSub.surplus;
		$('#surplusCount').attr('classNumId', surplus.id);
		$('#surplusClassNum').val(checkNull(surplus.classNum));
		$('#surplusClassPerson').attr("classPerson", checkNull(surplus.classPerson));
		$('#surplusClassPerson').html('班额数：'+checkNull(surplus.classPerson)+'人');
		//回显附件选项
//		$('input[name="kemu2"][value="'+surplus.scoreBlance+'"]').attr('checked', true);
//		$(".scoreList").eq(1).val(surplus.scoreId);
		
		//剩余组合教学班级
		getStuOneSubCount(keyupCheck);
	}
	//班额数计算
	$('.classNum').on('keyup', function(){
		var value = $(this).val();
		var count = Number($(this).parent().prev().html());
		var classPerson = '';
		if(value>count){
			$(this).val(count);
			classPerson = 1;
//						alert('分班数不能大于人数');
		}else if(value!=''){
			classPerson = Math.ceil(count/value);
		}
		$(this).parent().next().html(classPerson);
	})
}

//查询剩余组合单科
function getStuOneSubCount(keyupCheck){
	$.ajax({
		url:serverIp+'/middleDivideClassController/findStuOneSubCount/'+divideClassId+'/'+subjectId,
		type:'get',
		async:false,
		success:function(result){
			if(result.code==200){
				var html = '';
				var data = result.data;
				var surplusList = allSelectSub.surplusList;
				for(var i=0,len=surplusList.length; i<len; i++){
					for(var j=0,length=data.length; j<length; j++){
						if(surplusList[i].ids==data[j].id){
							html+='<tr classNumId="'+surplusList[i].id+'">'
									+'<td>'+data[j].name+'</td>'
									+'<td class="classCount">'+data[j].count+'</td>'
									+'<td class="classNumTd"><input class="classNum" onkeyup="'+keyupCheck+'" type="text" placeholder="请输入数字" value="'+checkNull(surplusList[i].classNum)+'"></td>'
									+'<td clas="classPerson">'+checkNull(surplusList[i].classPerson)+'</td>'
								+'</tr>';
							break;
						}
					}
				}
				//组合人数
				var count = 0;
				var surplusGroupList = allSelectSub.surplusGroupList;
				for(var i=0,len=surplusGroupList.length; i<len; i++){
					for(var j=0,length=selectSubData.length; j<length; j++){
						if(surplusGroupList[i].ids==selectSubData[j].ids){
							count+=selectSubData[j].count;
						}
					}
				}
				$('#surplusCount').attr('count', count);
				$('#surplusCount').html('剩余人数'+count+'人');
				$('#surplusTbody').html(html);
				//回显附件选项
//				$('input[name="kemu"][value="'+surplusList[0].scoreBlance+'"]').attr('checked', true);
//				$(".scoreList").eq(2).val(surplusList[0].scoreId);
				
			}else{
				console.log('查询失败');
			}
		},error:function(msg){
			failTips('query');
		}
	});
}

//根据分班id查询成绩附件
function findScoreList(){
	$.ajax({
		url:serverIp+'/middleDivideClassController/findScoreList/'+divideClassId,
		type:'get',
		async:false,
		success:function(result){
			if(result.code==200){
				var data = result.data;
				var html = '<option value="">请选择</option>';
				for(var i=0,len=data.length; i<len; i++){
					html += '<option value="'+data[i].id+'">'+data[i].fileRealName+'</option>';
				}
				html += '<option value="2018">2018开学测试成绩</option>';
				html += '<option value="2017">2017高一期末考试成绩</option>';
				$(".scoreList").html(html);
			}else{
				$(".scoreList").html('');
				console.log('查询成绩附件失败');
			}
		},error:function(msg){
			failTips('query');
		}
	});
}

//设置固定组合、设置剩余组合，提交修改班额数、成绩附件
function updateClassNum(type){
	//校验是否有必填项未填写
	var cFlag = false;
	var fjFlag = false;
	//需要提交的参数
	var scoreId = '';
	var scoreBlance = '';
	//获取班额数
	var bodyId = 'fixedTbody';
	if(type=='surplus'){
		bodyId = 'surplusTbody';
		scoreBlance = $('input[name="kemu"]:checked').val();
		scoreId = $('.scoreList').eq(2).val();
		//校验开班数、班额不能为空
		if(scoreBlance!='0'&&scoreId==''){
			//校验是否选择了按成绩分班，但是没有选择成绩附件
			fjFlag = true;
		}
	}else{
		scoreBlance = $('input[name="kemu1"]:checked').val();
		scoreId = $('.scoreList').eq(0).val();
	}
	//校验是否选择了按成绩分班，但是没有选择成绩附件
	if(scoreBlance!='0'&&scoreId==''){
		fjFlag = true;
	}
	//是否进行分班
	var divideInto = '';
	//组对象
	var classNumArray = [];
	var classNumObj = {};
	//如果等于走班，多加一条走班行政班开班数
	if(type=='surplus'){
		divideInto = divideClassId;
		classNumObj.id = $('#surplusCount').attr('classNumId');
		classNumObj.ids = 'hunheId';
		classNumObj.classNum = $('#surplusClassNum').val();
		classNumObj.classPerson = $('#surplusClassPerson').attr("classPerson");
		classNumObj.scoreBlance = $('input[name="kemu2"]:checked').val();
		classNumObj.scoreId = $('.scoreList').eq(1).val();
		if(classNumObj.classNum==''||classNumObj.classPerson==''){
			cFlag = true;
		}
		classNumArray.push(classNumObj);
	}
	$('#'+bodyId+' tr').each(function(){
		classNumObj = {};
		classNumObj.id = $(this).attr('classNumId');
		classNumObj.classNum = $(this).find('td').eq(2).find('.classNum').val();
		classNumObj.classPerson = $(this).find('td').eq(3).html();
		classNumObj.scoreId = scoreId;
		classNumObj.scoreBlance = scoreBlance;
		//校验开班数、班额不能为空
		if(classNumObj.classNum==''||classNumObj.classPerson==''){
			cFlag = true;
		}
		classNumArray.push(classNumObj);
	})
	if(cFlag){
		warnTips('请填写开班数');
		return false;
	}else if(fjFlag){//校验所有成绩附件
		warnTips('请选择成绩附件');
		return false;
	}
	var data = JSON.stringify(classNumArray);
	console.log(data);
	$.ajax({
		url:serverIp+'/middleDivideClassController/update',
		type:'post',
		data:{data:data, divideId: divideInto, createId: $.getUrlParam('createId')},
		async:false,
		success:function(result){
			if(result.code==200){
				//保存成功，自动跳转到设置固定组合
				if(type=='fixed'){
					$('.mlh_check a').eq(2).click();
				}else{
					$('.mlh_check a').eq(3).click();
				}
			}else{
				failTips('update');
				console.log('修改失败');
			}
		},error:function(msg){
			failTips('query');
		}
	});
}

//根据组合id查询班级、班级人数统计
function findNewClassCount(){
	var selectSubIds = $("#subjectAssemble").val();
	$.ajax({
		url:serverIp+'/newClass/findNewClassList',
		type:'get',
		data:{divideId: divideClassId, subjectId:subjectId, ids:selectSubIds},
		async:false,
		success:function(result){
			if(result.code==200){
				var data = result.data;
				var html='';
				for(var i=0,len=data.length; i<len; i++){
					var classJson = JSON.stringify(data[i]);
					var caName = typeof(data[i].classAdviserName) == "undefined" || data[i].classAdviserName ==null ?"":data[i].classAdviserName;
					html+='<tr id="'+data[i].id+'">'
							+'<td>'+(i+1)+'</td>'
							+'<td>'+subjectAssemble[data[i].ids]+'</td>'
							+'<td><input type="text" class="classNames" cvalue="'+data[i].name+'" value="'+data[i].name+'"></td>'
							+'<td><input type="text" readonly="readonly" value="'+caName+'" onclick=headTeacher('+classJson+') /></td>'
						/*	+'<td>'+data[i].boyCount+'</td>'
							+'<td>'+data[i].girlCount+'</td>'
							+'<td>'+(data[i].boyCount+data[i].girlCount)+'</td>'*/
						+'</tr>';
				}
				$('#classPreview').html(html);
			}else{
				$('#classPreview').html(''); 
			}
		},error:function(msg){
			failTips('query');
		}
	});
}
//修改班级名称
function updateClassName(){
	//组对象
	var classNumArray = [];
	var classNumObj = {};
	$('#classPreview tr').each(function(){
		classNumObj = {};
		classNumObj.id = $(this).attr('id');
		classNumObj.name = $(this).find('.classNames').val();
		classNumArray.push(classNumObj);
	})
	var data = JSON.stringify(classNumArray);
	console.log(data);
	$.ajax({
		url:serverIp+'/newClass/update',
		type:'put',
		data:{data:data},
		async:false,
		success:function(result){
			if(result.code==200){
				successTips('update');
				//保存成功，重新请求刷新
				findNewClassCount();
			}else{
				failTips('update');
				console.log('修改失败');
			}
		},error:function(msg){
			failTips('query');
		}
	});
}

//校验是否为null
function checkNull(value){
	return value==null?'':value;
}

//获取到Url里面的参数
function getUlrParam(){
	$.getUrlParam = function (name) {  
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');  
    	var r = window.location.search.substr(1).match(reg);  
    	if (r != null) return unescape(r[2]); return null;  
  	}
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
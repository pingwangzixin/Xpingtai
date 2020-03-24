var dcId = getRequest().id;
var schoolId = getRequest().schoolId;
var selSubId = '';
var refresh = false;
var oldSelSubId = '';
var newClassId = '';
$(function(){
	findOneSub();
	findDivideClass();
	//tab切换
	$('.mlh_check a').click(function(){
		var index = $(this).index();
		$('.mlh_check a').removeClass('active').eq(index).addClass('active');
		$('.mlh_student').hide().eq(index).show();
		if(index==1){
			findTeacher();
		}
	});
	
	//班级总表按钮
	$('.total_table_btn').click(function(){
		$('#class_total_sel').val('');
		$('#class_total_sel').trigger('change');
		$('#totalTable').show();
	})
	
	$('.mlh_tc .mlh_close').click(function(obj){
        $(obj.currentTarget.parentElement.parentElement.parentElement).hide();
    });
    
    $('.step_top').click(function(){
		var index = $(this).index();
		$('.mlh_check a').removeClass('active').eq(index).addClass('active');
		$('.mlh_student').hide().eq(index).show();
	})
})

/**
 * 添加结果导出连接
 */
function addExportResultHref(className,type,selId){
	$('.'+className).attr('href',serverIp + '/classNum?export=true&type='+type+'&fileName='+$('#list_dc_name').html()+'&subjectId='+selSubId+'&divideId='+dcId+'&ids='+$('#'+selId).val());
}

/**
 * 查询老师
 */
function findTeacher(){
	$.ajax({
		type:"get",
		url: ucServerIp + "/api/uc/user",
		data:{delFlag:0,officeId:schoolId,state:1,userType:1},
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
			findDivideResult();
		}
	});
}

/**
 * 添加班主任
 */
function addClassAdviser(){
	var classAdviserId = $('.set_bzr .active').attr('id');
	var classAdviserName = $('.set_bzr .active').text();
	if(typeof(classAdviserId) == "undefined"){
		warnTips('请选择班主任');
		return;
	}
	var caArr = [{classAdviserId:classAdviserId,id:newClassId,classAdviserName:classAdviserName}]
	$.ajax({
		type:"put",
		url:serverIp + "/newClass/update",
		async:true,
		data:{data:JSON.stringify(caArr)},
		success:function(resJson){
			if(resJson.code == 200){
				successTips('set');
				$('#mlh_bzr').hide();
				findTeacher();
			}else{
				failTips('set');
			}
		}
	});
	
	
}

/**
 * 查询分班结果
 */
function findDivideResult(){
	$('#result_table').empty();
	$('#class_total_table').empty();
	$('#one_sub_list').val('');
	$.ajax({
		type:"get",
		url:serverIp + "/newClass/findNeCladList",
		data:{divideId:dcId},
		success:function(resJson){
			if(resJson.code == 200){
				var data = resJson.data;
				var html = '';
				$.each(data, function(index,item) {
					var type = item.type == '0'?'行政班':'教学班';
					var classJson = JSON.stringify(item);
					var caName = typeof(item.classAdviserName) == "undefined" || item.classAdviserName ==null ?"":item.classAdviserName;
					html += '<tr id="'+item.id+'"><td>'+(index+1)+'</td>'+'<td>'+type+'</td>'+'<td><input  class="classNames" type="text" value="'+item.name+'"></td>'+"<td><input type='text' readonly='readonly' value='"+caName+"' onclick='headTeacher("+classJson+")' /></td>";
				});
				$('#result_table').html(html);
			}
		}
	})
	
	
}


//修改班级名称
function updateClassName(){
	//组对象
	var classNumArray = [];
	var classNumObj = {};
	$('#result_table tr').each(function(){
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
				findDivideResult();
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
 * 查询分班结果
	已废弃
 */
//function findResult(){
//	$('#result_table').empty();
//	$('#class_total_table').empty();
//	$('#one_sub_list').val('');
//	addExportResultHref('export_result','divideResult','one_sub_list');
//	addExportResultHref('export_total','classTotal','class_total_sel');
//	$.ajax({
//		type:"get",
//		url:serverIp + "/classNum",
//		data:{result:true,divideId:dcId,subjectId:selSubId},
//		success:function(resJson){
//			if(resJson.code == 200){
//				var data = resJson.data;
//				$.each(data, function(index,item) {
//					var rows = item.rows;
//					var classArr =  item.children;
//					for(var i=0;i<rows;i++){
//						$('#result_table').append('<tr class="class_result class_'+item.ids+'" id="'+item.ids+'_'+i+'"></tr>');
//					}
//					
//					for(var i=0;i<classArr.length;i++){
//						$('#class_total_table').append('<tr class="class_total_table class_total_'+item.ids+'" id="total_'+item.ids+'_'+i+'"></tr>');
//					}
//					
//					$('#result_table #'+item.ids+'_0').append('<td data-index="'+(index+1)+'" rowspan="'+rows+'">'+(index+1)+'</td><td rowspan="'+rows+'">'+item.idsName+'</td>')
//					$('#class_total_table #total_'+item.ids+'_0').append('<td data-index="'+(index+1)+'" rowspan="'+classArr.length+'">'+(index+1)+'</td><td rowspan="'+classArr.length+'">'+item.idsName+'</td><td rowspan="'+classArr.length+'">选考班</td><td rowspan="'+classArr.length+'">'+classArr.length+'</td>')
//					if(classArr.length>0){
//						var classRows = 0;
//						var groupRows = 0;
//						$.each(classArr, function(n,sitem) {
//							var classJson = JSON.stringify(sitem);
//							var caName = typeof(sitem.classAdviserName) == "undefined" || sitem.classAdviserName ==null ?"":sitem.classAdviserName;
//							$('#result_table #'+item.ids+'_'+classRows+'').append("<td rowspan="+sitem.rows+">"+sitem.className+"</td><td rowspan="+sitem.rows+"><input type='text' readonly='readonly' value='"+caName+"' onclick='headTeacher("+classJson+")' /></td><td rowspan="+sitem.rows+">"+sitem.count+"</td>");
//							$('#class_total_table #total_'+item.ids+'_'+n+'').append('<td>'+sitem.className+'</td><td>'+sitem.count+'</td>');
//							var groupArr =  sitem.children;
//							if(groupArr.length>0){
//								$.each(groupArr, function(g,group) {
//									$('#result_table #'+item.ids+'_'+groupRows+'').append('<td>'+group.subNames+'</td><td>'+group.count+'</td>');
//									groupRows++;
//								});
//							}
//							classRows += sitem.rows;
//						});
//					}
//				});
//			}else{
////				warnTips(resJson.message);
//			}
//			
//		}
//	});
//	
//}
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
/**
 * 查询单科科目
 */
function findOneSub(){
	$.ajax({
		type: "get",
		url: serverIp + "/onesub",
		data: {},
		success: function(resJson) {
			if(resJson.code == 200) {
				var html = '<option value="">全部</option>';
				$.each(resJson.data, function(index,item) {
					html += '<option value="'+item.id+'">'+item.name+'</option>';
				});
				$('#one_sub_list').html(html);
				$('#class_total_sel').html(html);
				
				var selArr = [{id:'one_sub_list',table:'result_table',className:'class_result',prefix:'class_',dataPre:''},{id:'class_total_sel',table:'class_total_table',className:'class_total_table',prefix:'class_total_',dataPre:'total_'}];
				$.each(selArr, function(i,sel) {
					$('#'+sel.id).on('change',function(){
						if(sel.id == 'one_sub_list'){
							addExportResultHref('export_result','divideResult',sel.id);
						}else{
							addExportResultHref('export_total','classTotal',sel.id);
						}
						if($(this).val() == ""){
							$('#'+sel.table+' .'+sel.className).each(function(){
								var $children = $(this).children().eq(0);
								$children.html($children.data('index'));
							})
							$('#'+sel.table+' .'+sel.className).show();
						}else{
							$('#'+sel.table+' .'+sel.className).hide();
							$('#'+sel.table+' .'+sel.prefix+$(this).val()).show();
							$('#'+sel.table+' #'+sel.dataPre+$(this).val()+'_0').children().eq(0).html('1');
						}
					})
				});
			}
		}
	});
}

/**
 * 查询是否分班
 */
function findClassNum(subjId){
	$.ajax({
		type:"get",
		url:serverIp +  "/classNum",
		data:{subjectId:subjId,divideId:dcId},
		async:false,
		success:function(resJson){
			if(resJson.code==200){
				var data = resJson.data;
				if(data.length>0){
					$.each(data, function(index,item) {
						$('#'+item.ids).val(item.classNum);
						$('#pernum_'+item.ids).html(item.classPerson);
						$('#'+item.ids).data('perNum',item.classPerson);
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
 * 保存分班
 */
function saveDivideClass(flag){
	$('#deleteTips').hide();
	var subId = $('#sel_sub').val();
	if(subId == '' || subId === undefined){
		warnTips('请选择选科');
		return;
	}
	
	var subArr = [];
	$('#sub_class_num input').each(function(index,item){
		var tem = {};
		$item = $(item);
		if($item.val()!=''){
			tem['classNum']  = parseInt($item.val());
			tem['classPerson']  = $item.data('perNum');
			tem['subjectId']  = $('#sel_sub').val();
			tem['ids']  = $item.data('id');
			tem['idsName']  = $item.data('subjectname');
			tem['divideId']  = dcId;
			subArr.push(tem);
		}
	})
	
	if(subArr.length != $('#sub_class_num input').length){
		warnTips('请设置开班数');
		return;
	}
	var newSelSubId = subArr[0].subjectId;
	if(oldSelSubId == newSelSubId){
		if(flag){
			$('#deleteTips').show();
			return;
		}else{
			refresh = true;
		}
	}
	
	$.ajax({
		type:"post",
		url:serverIp +  "/divideClass/",
		async:true,
		data:{data: JSON.stringify(subArr),divideClass:1,refresh:refresh},
		success:function(resJson){
			if(resJson.code==200){
				successTips('divide');
				 refresh = true;
				 oldSelSubId = newSelSubId;
				 $('#dcBtn').html('重新分班');
				 $('#result_tab').click();
			}else{
				warnTips(resJson.message);
			}
			
		}
	});
}

/**
 * 开班数校验
 * @param {Object} obj
 */
function validate(obj,total){                    
    var num = obj.value;
    var re=/^\d*$/;                  
    if(!re.test(num)){                        
        isNaN(parseInt(num))?obj.value='':obj.value=parseInt(num);  
    }   
    if(num=='0'||num>total){
    	obj.value='';
    	return;
    }
}

/**
 * 计算班额数
 * @param {Object} id
 * @param {Object} classNum
 * @param {Object} total
 */
function perNum(id,classNum,total){
	var perNum = total;
	if(classNum != '' && classNum != 0){
		perNum = Math.ceil(total/classNum);
	}
	$('#pernum_'+id).html(perNum);
	$('#'+id).data('perNum',perNum);
}

/**
 * 查询选科人数
 */
function findSelSubNum(subId){
	$.ajax({
		type:"get",
		url:serverIp + "/selectsub",
		data:{isProgress:'true',id:subId,style:'1'},
		success:function(resJson){
			if(resJson.code==200){
				var resList = resJson.data;
				var html = '';
				$.each(resList, function(index,item) {
					html += '<tr>\
								<td>'+item.name+'</td>\
								<td>'+item.count+'</td>\
								<td><input id="'+item.id+'" data-subjectname="'+item.name+'" data-id="'+item.id+'" onkeyup="validate(this,'+item.count+');perNum(\''+item.id+'\',this.value,'+item.count+')"  type="text" placeholder="正整数"></td>\
								<td id="pernum_'+item.id+'">'+item.count+'</td>\
							</tr>'
				});
				$('#sub_class_num').html(html);
				findClassNum(subId);
			}
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
				$('#dcName').html('名称：'+data.name);
				$('#list_dc_name').html(data.name);
				oldSelSubId = data.subjectId;
				findSub(data.schoolYear,data.semester,data.gradeId,oldSelSubId);
			}
		}
	});
}

/**
 * 查询选科
 */
function findSub(schoolYear,semester,gradeId,subjectId) {
	$('#sel_sub').html('<option data-total="0" data-yxnum="0" data-wxnum="0" value="">请选择</option>');
	$.ajax({
		type: "get",
		url: serverIp + "/selectsub",
		data: {schoolYear:schoolYear,semester:semester,gradeId:gradeId},
		success: function(resJson) {
			if(resJson.code == 200) {
				if(resJson.data.length>0){
					$.each(resJson.data, function(index,item) {
						$('#sel_sub').append('<option data-gradename="'+item.gradeName+'" data-total="'+item.progress.total+'" data-yxnum="'+item.progress.electiveCourse+'" data-wxnum="'+item.progress.nonElectiveCourse+'" value="'+item.id+'">'+item.name+'</option>');
					});
					$('#sel_sub').val(subjectId);
					selChange();
					$("#sel_sub").trigger("change");  
				}
			}
		}
	});
}

/**
 * 添加选科change事件
 */
function selChange(){
	$('#sel_sub').on('change',function(){
		selSubId = $(this).val();
		var yxNum = $(this).children('option:selected').data('yxnum');
		var wxNum = $(this).children('option:selected').data('wxnum');
		var total = $(this).children('option:selected').data('total');
		var gradeName = $(this).children('option:selected').data('gradename');
		gradeName = typeof(gradeName)=="undefined"?'年级':gradeName;
		$('#yxNum').html(yxNum);
		$('#wxNum').html(wxNum);
		$('#total').html(total);
		if(yxNum != 0 && wxNum == 0){
			activeInsertBtn();
		}else{
			cancelInsertBtn();
		}
		$('#sub_class_num').html('');
		if($(this).val() != ''){
			findSelSubNum($(this).val());
		}else{
			 $('#dcBtn').html('下一步，开始分班');
		}
	})
}

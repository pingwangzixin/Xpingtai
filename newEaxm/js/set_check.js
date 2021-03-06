var dcId = getRequest().id;
/** 获取url参数  */
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

var selSubId = '';
var oneSubMap = {};
var changeData = {}
var changeStuNum = 0;
var changeSelTemId = '';
var closeType = 'close';
$(function(){
	findDivideClass();
	findOneSub();
	findSubGroupList();
	$('#dc_detail_search_btn').click(function(){
		findDivideClassDetail();
		//subjectId:selSubId,divideId:dcId,className:$('#className_input').val(),stuName:$('#stuName_input').val()
	})
	//调班
    $('.tiaoban .daoru').click(function(){
    	resetChange($('#change_sel').children('option').eq(0).val());
        $('#mlh_change').show();
    });
    
    $('.mlh_tc .mlh_close').click(function(obj){
    	closeType = 'close';
    	if($(this).hasClass('change_close')){
    		var csn = $('#no_change_table .change_class').length;
			var unlined = $('#change_table tr').length;
			if(csn>0||unlined>0){
				$('#deleteTips').show();
				return;
			}
    	}
        $(obj.currentTarget.parentElement.parentElement.parentElement).hide();
    });
    
    // 全选
    $('.have-row .checkbox-all').on('change', function() {
        $('.have-row .checkbox-all').prop('checked', $(this).prop('checked'));
        $('.have-row tbody .nc_'+changeData.classId+' input[type="checkbox"]').prop('checked', $(this).prop('checked'));
    });
    
    $('.not-line .checkbox-all').on('change', function() {
        $('.not-line .checkbox-all').prop('checked', $(this).prop('checked'));
        $('.not-line tbody input[type="checkbox"]').prop('checked', $(this).prop('checked'));
    });
    
    divideListFill(dcId)
})


function divideListFill(id) {
	$.ajax({
		type: "get",
		datatype:"json",
		url: serverIp + "/divideClass/findSmallClassList/"+id,
		data: {},
		success: function(resJson) {
			console.log(resJson);
			if(resJson.code==200){
				var resList = resJson.data;
				$.each(resList, function(index,item) {
					findStuBySubId(item.subIds)
				});
			}
		}
	});
}

/**
 * 添加导出连接
 */
function addExportHref(){
	$('.daochu').attr('href',serverIp + '/classNum/resultStuDown?export=true&type=resultDivideClassDown&fileName='+$('#sel_sub_name').html()+'&subjectId='+selSubId+'&divideId='+dcId+'&className='+$('#className_input').val()+'&stuName='+$('#stuName_input').val());
}

/**
 * 重置调整弹窗
 */
function resetChange(id){
	changeStuNum = 0;
    $('#change_table').empty();
    $('#change_stu_num').html(changeStuNum);
    $('#change_sel').val(id);
    $('#change_sel').trigger('change');
}

/**
 * 放弃调整
 */
function abandon(){
	cancel('deleteTips');
	switch (closeType){
		case 'close':
			$('#mlh_change').hide();
			break;
		case 'select':
			resetChange(changeSelTemId);
			break;
		default:
			break;
	}
	
}

/**
 * 调整查询
 */
function changeSearch(){
	var searchName = $('#change_search_input').val();
	$('#no_change_table .nc_'+changeData.classId).hide();
	$('#no_change_table .nc_'+changeData.classId).each(function(){
		if($(this).children('td').eq(1).html().indexOf(searchName)!=-1){
			$(this).show();
		}
	})
}

/**
 * 保存调班
 */
function saveChangeClass(saveType){
	$changeStu = $('#no_change_table .change_class');
	var unlined = $('#change_table tr').length;
	if(unlined){
		warnTips('您有未安排班级的学生,请先将学生安排班级');
		cancel('deleteTips');
		return;
	}
	if($changeStu.length==0){
		successTips('adjust');
		return;
	}
	var changeStuArr = [];
	$changeStu.each(function(){
		$item = $(this);
		var tem = {};
		tem['newClassId'] = $item.data('newClassId');
		tem['studentId'] = $item.data('stuid');
		tem['oldClassId'] = $item.data('classid');
		changeStuArr.push(tem);
	})
	
	$.ajax({
		type:"put",
		url:serverIp + "/newClass",
		data:{data:JSON.stringify(changeStuArr)},
		success:function(resJson){
			if(resJson.code==200){
				successTips('adjust');
				$('#no_change_table .change_class').each(function(){
					$(this).removeClass('change_class');
				})
				if(saveType!='save'){
					abandon();
				}
			}else{
				warnTips(resJson.message);
				cancel('deleteTips');
			}
			
		}
	});
	
}

/**
 * 删除学生按钮
 */
function removeStu(){
	var $selTr = $('#no_change_table input[type="checkbox"]:checked').parents('tr');
	if($selTr.length==0){
		return;
	}
	var classId = changeData.classId;
	$selTr.each(function(){
		$(this).removeData('newClassId');
		$(this).removeClass('nc_'+classId);
		$(this).removeClass('change_class');
	})
	changeStuNum += $selTr.length;
	$('#change_table').prepend($selTr);
	$('#change_table input[type="checkbox"]:checked').prop("checked",false);
	if($('#no_change_table .nc_'+classId).length==0){
		$('#no_change_all').prop("checked",false);
	}
	$('#change_stu_num').html(changeStuNum);
	$('#change_sel_num').html($('#no_change_table .nc_'+classId).length);
}

/**
 * 添加学生按钮
 */
function insertStu(){
	var $selTr = $('#change_table input[type="checkbox"]:checked').parents('tr');
	if($selTr.length==0){
		return;
	}
	var newClassId = changeData.classId;
	if(($('#no_change_table .nc_'+newClassId).length+$selTr.length)>changeData.classPerson){
		warnTips('超过最大班额数('+changeData.classPerson+')，无法插入');
		return;
	}
	
	$selTr.each(function(){
		var oldClassId = $(this).data('classid');
		if(oldClassId!=newClassId){
			$(this).addClass('change_class');
			$(this).data('newClassId',newClassId);
		}
		$(this).addClass('nc_'+newClassId);
		$(this).children('td').eq(4).html(changeData.className);
	})
	changeStuNum -= $selTr.length;
	$('#no_change_table').prepend($selTr);
	$('#no_change_table input[type="checkbox"]:checked').prop("checked",false);
	if(changeStuNum == 0){
		$('#change_all').prop("checked",false);
	}
	$('#change_stu_num').html(changeStuNum);
	$('#change_sel_num').html($('#no_change_table .nc_'+newClassId).length);
}

/**
 * 查询科目下所有学生
 * @param {Object} ids
 */
function findStuBySubId(ids){
	$('#no_change_table').html('');
	$.ajax({
		type:"get",
		url:serverIp + "/stuselectsub",
		data:{newClass:true,subIds:ids,selectSubId:selSubId,divideId:dcId},
		success:function(resJson){
			if(resJson.code==200){
				var data = resJson.data;
				var html = "";
				$.each(data, function(index,item) {
					html+='<tr class="class_stu_table nc_'+item.newClassId+'" data-stuid="'+item.stuId+'" data-classid="'+item.newClassId+'">\
								<td>\
									<input type="checkbox" name="" class="checkbox">\
								</td>\
								<td>'+item.stuName+'</td>\
								<td>'+item.sex+'</td>\
								<td>'+changeData.idsName+'</td>\
								<td>'+item.newClassName+'</td>\
							</tr>';
				});
				$('#no_change_table').html(html);
			}
			findClassList(ids);
		}
	});
	
	
}

/**
 * 根据classId和selSubid查询学生
 * @param {Object} newClassId
 */
function findStuByNewClass(newClassId){
	$.ajax({
		type:"get",
		url:serverIp + "/stuselectsub",
		data:{newClass:true,classId:newClassId,selectSubId:selSubId},
		success:function(resJson){
			if(resJson.code==200){
				var data = resJson.data;
				var html = "";
				$.each(data, function(index,item) {
					html+='<tr data-stuid="'+item.stuId+'" data-classid="'+newClassId+'">\
								<td>\
									<input type="checkbox" name="" class="checkbox">\
								</td>\
								<td>'+item.stuName+'</td>\
								<td>'+item.sex+'</td>\
								<td>'+changeData.idsName+'</td>\
								<td>'+changeData.className+'</td>\
							</tr>';
				});
				$('#no_change_table').html(html);
			}
		}
	});
	
	
}

/**
 * 查询选科组合
 */
function findSubGroupList(){
	$('#change_sel').empty();
	$.ajax({
		type:"get",
		url:serverIp + "/threesub",
		data:{subjectId:selSubId},
		success:function(resJson){
			if(resJson.code==200){
				var data = resJson.data;
				$.each(data, function(index,item) {
					$('#change_sel').append('<option value="'+item.ids+'">'+item.name+'</option>');
				});
				changeData.ids = data[0].id;
				changeData.idsName =data[0].name;
				findStuBySubId(changeData.ids);
				$('#change_sel').unbind();
				$('#change_sel').on('change',function(){
					var csn = $('#no_change_table .change_class').length;
					var unlined = $('#change_table tr').length;
					if(csn>0||unlined>0){
						$('#deleteTips').show();
						changeSelTemId = $(this).val();
						$(this).val(changeData.ids);
						closeType = 'select';
						return;
					}
					changeData.ids = $(this).val();
					changeData.idsName = $(this).children('option:selected').text();
					findStuBySubId(changeData.ids);
				})
			}
			
		}
	});
}

/**
 * 根据学科查询班级
 * @param {Object} ids
 */
function findClassList(ids){
	$('#change_class_sel').empty();
	$.ajax({
		type:"get",
		url:serverIp + "/newClass",
		data:{subjectId:selSubId,divideId:dcId,ids:ids},
		success:function(resJson){
			if(resJson.code==200){
				var data = resJson.data;
				$.each(data, function(i,item) {
					$('#change_class_sel').append('<option data-classperson="'+item.classPerson+'" data-count="'+item.count+'" value="'+item.classId+'">'+item.className+'</option>');
				});
				$('#change_sel_num').html(data[0].count);
				changeData.classId = data[0].classId;
				changeData.className =  data[0].className;
				changeData.classPerson = data[0].classPerson;
				$('#no_change_table .class_stu_table').hide();
				$('#no_change_table .nc_'+changeData.classId).show();
				$('#change_class_sel').unbind();
				$('#change_class_sel').on('change',function(){
					changeData.classId = $('#change_class_sel').val();
					changeData.className =  $(this).children('option:selected').text();
					changeData.classPerson = $(this).children('option:selected').data('classperson');
					$('#change_sel_num').html($('#no_change_table .nc_'+$(this).val()).length);
					$('#no_change_table .class_stu_table').hide();
					$('#no_change_table .nc_'+$(this).val()).show();
				})
			}
			
		}
	});
	
}

/**
 * 查询分班明细
 */
function findDivideClassDetail(){
	$('#big_check_deatil_table').empty();
	addExportHref();
	$.ajax({
		type:"get",
		url:serverIp + "/classNum",
		data:{detail:true,subjectId:selSubId,divideId:dcId,className:$('#className_input').val(),stuName:$('#stuName_input').val()},
		success:function(resJson){
			if(resJson.code==200){
				var data = resJson.data;
				console.log(data)
				var html =''
				$.each(data, function(i,item) {
					html += '<tr>\
								<td>'+(i+1)+'</td>\
								<td>'+item.tinyClassName+'</td>\
								<td>'+item.stuName+'</td>\
								<td>'+item.idsName+'</td>\
								<td>'+item.oldClassName+'</td>';
					var childMap = {};
					$.each(item.children, function(n,child) {
						var parm = child.ids.split(',')
						var parmName = item.idsName.split(',')
						var className = child.className;
						for (var pm in parm) {
							var parmMap = {};
							parmMap.idsName = parmName[pm];
							parmMap.className=className;
							childMap[parm[pm]] = parmMap;
						}
					});
					for(var key in oneSubMap){
						if(typeof(childMap[key])=="undefined"){
							html+= '<td></td>';
						}else{
							html+= '<td>'+childMap[key].idsName+'</td>';
						}
					}
					html += '</tr>';	
				});
				$('#big_check_deatil_table').html(html);
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
				if(typeof(data.subjectId)!= "undefined"){
					selSubId = data.subjectId;
					findSub(data.subjectId);
				}
				
			}
		}
	});
}

/**
 * 查询选科
 */
function findSub(subId) {
	$('#sel_sub_name').html('');
	$.ajax({
		type: "get",
		url: serverIp + "/selectsub/"+subId,
		data: {},
		success: function(resJson) {
			if(resJson.code == 200) {
				$('#sel_sub_name').html(resJson.data.name);
				findDivideClassDetail();
			}
		}
	});
}


/**
 * 查询单科科目
 */
function findOneSub(){
	$.ajax({
		type: "get",
		url: serverIp + "/onesub",
		data: {},
		async:false,
		success: function(resJson) {
			if(resJson.code == 200) {
				var html = '<tr><td>序号</td><td>现行政班</td><td>姓名</td><td>选科科目</td><td>原班级</td>';
				if(resJson.data.length>0){
					$.each(resJson.data, function(index,item) {
						html += '<td>'+item.name+'</td>';
						oneSubMap[item.id] = index;
					});
				}
				html +='</tr>';
				$('#dc_detail_thead').html(html);
			} else {

			}
		}
	});
}

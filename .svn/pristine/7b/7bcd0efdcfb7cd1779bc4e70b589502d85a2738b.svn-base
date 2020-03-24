var sendNum=0;
var countNum = 0;


$(function(){
	
	
	//新建课表按钮
	$('.addkebiao').on('click',function(){
		$('#schedule_name').val('');
		$('.wx_addkeiao').show();
	})
	 //学年查询
	$('#sel_year').change(findSchedule);
	//学期查询
	$('#sel_term').change(findSchedule);
	//初始化查询课表
	findSchedule();
})

/**
 * 添加课表
 */
function addSchedule(){
	var name = $('#schedule_name').val();
	name = name.trim();
	if(name == ""){
		warnTips('请输入课表名称');
		return;
	}
	if(name.length>30){
		warnTips('名称最多30个字符');
		return;
	}
	if(getParameter('schoolId')==null||getParameter('schoolId')==''){
		window.location.href = portalIp;
		return false;
	}
	var params = {name:name,schoolId:getParameter("schoolId"),
		createId:getParameter("createId"),createName:getParameter("createName"),
		schoolYear:$('#sel_year').val(),semester:$('#sel_term').val()};
	$.ajax({
		type:"post",
		url: serverIp  + "/schedule",
		data:{data:JSON.stringify($.extend(true, params, baseData))},
		success:function(resJson){
			if(resJson.code==200){
				successTips()
				findSchedule();
				$('.wx_addkeiao').hide();
			}else{
				warnTips(resJson.message);
			}
		}
	});
}

/**
 * 查询课表
 */
function findSchedule(){
	var params = {schoolYear:$('#sel_year').val(),semester:$('#sel_term').val(), createId: getParameter("createId")};
	$.ajax({
		type:"get",
		url:serverIp  + "/schedule",
		data:params,
		success:function(resJson){
			var html = '';
			if(resJson.code==200){
				sendNum = 0;
				var data = resJson.data;
				$.each(data, function(index,item) {
					html += '<tr class="zxl_hide edit_'+item.id+'">'
								+'<td colspan="7" align="left" class="kebiaoname mlh_file">'
									+'<em class="kebiaoicon"></em>'
									+'<input id="name_'+item.id+'" class="text" type="text" name="" value="" placeholder="">'
									+'<button class="mlh_btn preserve" onclick=updateSchedule("'+item.id+'","update")>保存</button>'
									+'<button class="mlh_btn cancel" onclick="editScheduleCancel("'+item.id+'")">取消</button>'
								+'</td>'
							+'</tr>';
					html += '<tr class="normal_'+item.id+'">'
								+'<td class="kebiaoname" ondblclick=editSchedule(this,"'+item.id+'")><em class="kebiaoicon"></em>'+item.name+'</td>'
								+'<td class="kebiaodata">'+item.createTime+'</td>'
								+'<td></td>';
					if(item.state == 0){
						html += '<td></td>';
						html += '<td></td>';
					}else{
						var ckHref = addParams('paike/check_classSchedule.html?id='+item.id);
						html += '<td><a href="'+ckHref+'"><button class="index_huise"><em class="index_see"></em>查看</button></a></td>';
						if(item.state == 2){
							sendNum++;
							html+=	'<td><button type="button" onclick=updateSchedule("'+item.id+'","cancelPublish") class="index_lvse mlh_hide"><em class="index_fabu"></em>取消发布</button></td>';
						}else{
							html+=	'<td><button type="button" onclick=updateSchedule("'+item.id+'","publish") class="index_lvse"><em class="index_fabu"></em>发布</button></td>';
						}
					}
					var href = addParams('paike/set_kebiao.html?id='+item.id);
					html+= '<td>'
								+'<a href="'+href+'"><button class="index_lanse"><em class="index_paikeicon"></em>排课</button></a>'
								+'</td>'
								+'<td><button type="button" onclick=deleteTips(delSchedule,"'+item.id+'","'+item.state+'") class="index_hongse"><em class="index_delet"></em>删除</button></td>'
							+'</tr>'	
				});
			}else{
				warnTips('暂无数据');
			}
			$('#schedule_table').html(html);
		}
	})
}

/**
 * 修改课表
 * @param {Object} id
 * @param {Object} type
 */
function updateSchedule(id,type){
	var params = {};
	var state = '';
	switch (type){
		case 'update':
			params = {name:$('#name_'+id).val()}
			break;
		case 'publish':
			state = 2
			break;
		case 'cancelPublish':
			state = 1
			break;
		default:
			break;
	}
	if(type=='update'){
		$.ajax({
			type:"put",
			url:serverIp  + "/schedule/" + id,
			data:{data:JSON.stringify(params)},
			async:true,
			success:function(resJson){
				if(resJson.code==200){
					successTips(type);
					findSchedule();
					$('.img_guanbi').parents('.wx_tanchuang').hide();
				}else{
					warnTips(resJson.message);
				}
			}
		});
	}else{
		sendSchedule(id, state, type);
	}
	
}

/**
 * 删除课表
 * @param {Object} id
 */
function delSchedule(id,state){
	if(state == 2){
		warnTips('已发布的课表不能删除');
		return;
	}
	$.ajax({
		type:"delete",
		url:serverIp  + "/schedule/" + id,
		async:true,
		success:function(resJson){
			if(resJson.code==200){
				successTips('del');
				findSchedule();
				$('.img_guanbi').parents('.wx_tanchuang').hide();
			}else{
				warnTips(resJson.message);
			}
		}
	});
}

/**
 * 取消编辑课表
 * @param {Object} id
 */
function editScheduleCancel(id){
	$('.edit_'+id).hide();
	$('.normal_'+id).show();
}

/**
 * 编辑课表
 * @param {Object} id
 */
function editSchedule(obj,id){
	$('#name_'+id).val($(obj).text());
	$('.edit_'+id).show();
	$('.normal_'+id).hide();
}

//发布课表/取消发布课表
function sendSchedule(id, state, type){
	if(state==2&&sendNum>0){
		warnTips('请先取消已经发布的课表');
		return false;
	}
	$.ajax({
		type:"put",
		url:serverIp  + "/sendSchedule/" + id +'/'+ state,
		data:{areaCode:getParameter('areaCode')},
		async:true,
		success:function(resJson){
			if(resJson.code==200){
				successTips(type);
				findSchedule();
				$('.img_guanbi').parents('.wx_tanchuang').hide();
			}else{
				warnTips(resJson.message);
			}
		}
	});
}

function goClassify(){
	if(getParameter('schoolId')==null||getParameter('schoolId')==''){
		window.location.href = portalIp;
		return false;
	}
	window.location.href = '/goClass/classify.html'
		+'?schoolId='+getParameter('schoolId')
		+'&areaCode='+getParameter('areaCode')
		+'&createId='+getParameter('createId')
		+'&createName='+getParameter('createName')
		+'&schoolYear='+getParameter('schoolYear')
		+'&semester='+getParameter('semester');
}
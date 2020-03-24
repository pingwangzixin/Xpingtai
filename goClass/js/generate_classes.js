var divideId = '';
var gradeId = '';
$(function(){
	addTab(2);
	findScheduleById();
	//全部删除按钮
	$('#del_all_btn').on('click',function(){
		deleteTips(delAllGradeSub);
	})
})

/**
 * 保存年级学科
 */
function saveGradeSub(){
	var gsArr = [];
	var $item = $('#add_sub .active');
	if($item.length==0){
		warnTips('请选择要添加的学科')
		return;
	}
	var sort = $('#sub_table tbody tr').length;
	$item.each(function(i,o){
		var gs = {};
		gs.divideId = divideId;
		gs.scheduleId = scheduleId;
		gs.sid = o.dataset.id;
		gs.sname = o.text;
		gs.sort = sort+i;
		gsArr.push(gs);
	})
	
	$.ajax({
		type:"post",
		url:serverIp+"/gradeSubject",
		data:{data:JSON.stringify(gsArr)},
		success:function(resJson){
			if(resJson.code==200){
				$('.img_guanbi').click();
				successTips();
				findSubTable();
			}
			
		}
	});
	
}


/**
 * 添加教学班按钮
 */
function addSubBtn(){
	$('#add_sub_class_dialog').show();
}

/**
 * 根据Id查询课表
 */
function findScheduleById(){
	$.ajax({
		type:"get",
		url:serverIp  + "/schedule/"+scheduleId,
		async:false,
		success:function(resJson){
			if(resJson.code==200){
				var data = resJson.data;
				$('#schedule_name').html(data.name);
				$('#add_sub_grade').html(data.gradeName);
				divideId = data.divideId;
				gradeId = data.gradeId;
				findSubTable();
			}else{
				
			}
		}
	});
	
}

/**
 * 查询科目
 */
function findSubjcet(subMap){
	$.ajax({
		type:"get",
		url:userServiceIp+"/api/edu/eduSubject",
		data:{gradeId:gradeId},
		success:function(resJson){
			if(resJson.ret==200){
				var data = resJson.data;
				var html = '';
				$.each(data, function(i,o) {
					if(typeof(subMap[o.id])=="undefined"){
						html += '<a href="javascript:;" class="mlh_btn subjects" data-id="'+o.id+'">'+o.name+'</a>';
					}
				});
				$('#add_sub').html(html);
				
				$('#add_sub a').unbind('click');
				$('#add_sub a').on('click',function(){
					if($(this).hasClass('active')){
						$(this).removeClass('active');
					}else{
						$(this).addClass('active');
					}
				})
			}
		}
	});
	
}

/**
 * 查询科目列表
 */
function findSubTable(){
	$.ajax({
		type:"get",
		url:serverIp+"/gradeSubject",
		data:{scheduleId:scheduleId},
		success:function(resJson){
			var subMap = {};
			var html = '<tr class="mlh_th"><td>科目</td><td>教学班</td><td>操作</td></tr>';
			if(resJson.code==200){
				var data = resJson.data;
				$.each(data, function(i,o) {
					subMap[o.sid] = o.sname;
					var className = '';
					if(o.ucList.length>0){
						$.each(o.ucList, function(i,o) {
							className += o.className+","
						});
					}
					className = className.substr(0,className.length-1);
					html += '<tr>\
                                <td>'+o.sname+'</td>\
                                <td>'+className+'</td>\
                                <td><button onclick="deleteTips(delGradeSub,\''+o.id+'\')" class="index_hongse wx_qingkong"><em class="index_delet"></em>删除</button></td>\
                            </tr>';
				});
			}
			$('#sub_table').html(html);
			findSubjcet(subMap);
		}
	});
}

/**
 * 根据Id删除年级学科
 */
function delGradeSub(id){
	$.ajax({
		type:"delete",
		url:serverIp+"/gradeSubject/"+id,
		success:function(resJson){
			if(resJson.code==200){
				successTips('del');
				findSubTable();
			}else{
				failTips('del');
			}
		}
	});
}

/**
 * 删除全部年级学科
 */
function delAllGradeSub(){
	$.ajax({
		type:"delete",
		url:serverIp+"/gradeSubject?scheduleId="+scheduleId,
		success:function(resJson){
			if(resJson.code==200){
				successTips('del');
				findSubTable();
			}else{
				failTips('del');
			}
		}
	});
}

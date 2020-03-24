$(function(){
	addTab(1);
	findScheduleById();
})

/**
 * 根据Id查询课表
 */
function findScheduleById(){
	$.ajax({
		type:"get",
		url:serverIp  + "/schedule/"+scheduleId,
		success:function(resJson){
			if(resJson.code==200){
				var data = resJson.data;
				$('#schedule_name').html(data.name);
				$('#start_time').val(data.startTime);
				$('#sel_day').val(data.dayNum==null?1:data.dayNum);
				if(data.lastDay == 1){
					$('#selectjieshu').prop('checked',true);
				}
				$('#sel_am').val(data.amnoon==null?1:data.amnoon);
				$('#sel_pm').val(data.afternoon==null?1:data.afternoon);
//				$('#zbNum').val(data.optionalClassNum==null?'':data.optionalClassNum);
				findGradeByOfficeId(data);
			}else{
				
			}
		}
	});
	
}

/**
 * 根据学校Id查询年级
 * @param {Object} params
 */
function findGradeByOfficeId(params){
	$.ajax({
		type:"get",
		url:userServiceIp+'/api/ea/eaGrade',
		data:{officeId:params.schoolId},
		success:function(resJson){
			if(resJson.ret==200){
				var data = resJson.data;
				var html = '';
				$.each(data, function(index,item) {
					if(params.gradeId == item.gradeId){
						html += '<span class="active" data-id="'+item.gradeId+'">'+item.gradeName+'</span>';
					}else{
						html += '<span data-id="'+item.gradeId+'">'+item.gradeName+'</span>';
					}
				});
				$('#div_grade').html(html);
				$('.wx_nianji_width span').unbind('click');
				$('.wx_nianji_width span').on('click',function(){
					$('.wx_nianji_width span').removeClass('active');
					$(this).addClass('active');
					var param = {gradeId:$(this).data('id'),schoolYear:params.schoolYear,semester:params.semester};
					findDivideByGrade(param,params.divideId);
				})
				if($('.wx_nianji_width .active').length==0){
					$('.wx_nianji_width span').eq(0).addClass('active');
					$('.wx_nianji_width span').eq(0).click();
				}else{
					$('.wx_nianji_width .active').click();
				}
			}
		}
	});
}

/**
 * 根据年级查询分班
 */
function findDivideByGrade(params,divideId){
	$.ajax({
		type:"get",
		url:serverIp  + "/divideClass",
		data:params,
		success:function(resJson){
			var html = '<option value="qxz">请选择分班</option>';
			if(resJson.code==200){
				var data = resJson.data;
				$.each(data, function(i,o) {
					html += '<option value="'+o.id+'">'+o.name+'</option>';
				});
			}
			$('#sel_divide').html(html);
			if(divideId != null){
				$('#sel_divide').val(divideId);
			}
		}
	});
	
}

/**
 * 保存课表设置
 */
function saveScheduleSet(){
	var startTime = $('#start_time').val();
	var gradeId = $('#div_grade .active').data('id');
//	var optionalClassNum = $('#zbNum').val();
	if(startTime == ''){
		warnTips('请选择课表开始时间');
		return;
	}else if(gradeId == ''){
		warnTips('请选择年级');
		return;
	}else if($('#sel_divide').val()=='qxz'){
		warnTips('请选择分班结果');
		return;
	}
	/*if(optionalClassNum == ''){
		warnTips('请输入每周走班节数')
		return;
	}*/
	var params = {};
	params.startTime = startTime;
	params.gradeId = gradeId;
	params.gradeName = $('#div_grade .active').text();
//	params.optionalClassNum = optionalClassNum;
	params.dayNum = $('#sel_day').val();
	params.lastDay = $('#selectjieshu').is(':checked')?1:0;
	params.amnoon = $('#sel_am').val();
	params.afternoon = $('#sel_pm').val();
	params.divideId = $('#sel_divide').val();
	params.classNum = parseInt(params.amnoon)+parseInt(params.afternoon);
	params.weekClassNum = $('#selectjieshu').is(':checked')?params.classNum*params.dayNum-params.afternoon:params.classNum*params.dayNum;
	$.ajax({
		type:"put",
		url:serverIp  + "/schedule/"+scheduleId,
		data:{data:JSON.stringify(params)},
		success:function(resJson){
			if(resJson.code==200){
				$('#ul_tab a')[1].click();
				findScheduleById();
			}else{
				warnTips(resJson.message)
			}
		}
	});
}


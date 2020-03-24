var dayNum = 0;
$(function(){
	addTab(3);
	findScheduleById();
//	findTeachTask();
	findSubTable();
	
	$('.exportModel').click(function(){
		window.location.href = serverIp+"/userCourse/exportUserCourseModel?scheduleId="+scheduleId;
	})
	
	var ofile=document.getElementById('ofile');
	var oshow=document.getElementById('show');
	ofile.onchange=function(e){
	    var name=e.currentTarget.files[0].name;
	    oshow.innerHTML=name;
	}
	
})

/**
 * 点击导入学生选科
 */
function importClick(){
	$('#importForm').attr('action',serverIp+'/userCourse/importUserCourse');
	$('#scheduleId').val(scheduleId);
	$('#import').show();
	$('#show').html('');
	$('#ofile').val('');
	$('#importBtn').removeAttr('disabled','disabled');
	$('#importBtn').removeClass('disable_btn');
}

/**
 * 上传
 */
function saveImportExcel(){
	$('#importBtn').attr('disabled','disabled');
	$('#importBtn').addClass('disable_btn');
	$('#importForm').ajaxSubmit(function(resJson){
		if(resJson.code == 200){
			findTeachTask();
			$('#import').hide();
			successTips('import');
		}else{
			warnTips(resJson.message);
		}
		$('#importBtn').removeAttr('disabled','disabled');
		$('#importBtn').removeClass('disable_btn');
	})
	
}


/**
 * 保存授课
 */
function saveTeaCourse(id){
	var uname = $('#choose_tea a').text();
	var uid = $('#choose_tea a').data('id');
	var areaId = $('#choose_tea a').data('areaId');
	var classNum = $('#input_classNum').val();
	var twoNum = $('#input_twoNum').val();
	var classroom = $('#input_classRoom').val();
	var params = {};
	if($('#choose_tea a').length==0){
		warnTips('请选择任课教师');
		return;
	}
	if(classNum == 0){
		warnTips('请输入每周上课节数');
		return;
	}
	if(twoNum > (classNum/2)){
		warnTips('两节连上次数不能大于'+(classNum / dayNum));
		return;
	}
	params.uname = uname;
	params.uid = uid;
	params.classNum = classNum;
	params.twoNum = twoNum;
	params.classroom = classroom;
	params.areaId = areaId;
	
	$.ajax({
		type:"put",
		url:serverIp+"/userCourse/"+id,
		data:{data:JSON.stringify(params)},
		success:function(resJson){
			if(resJson.code == 200){
				successTips();
				findTeachTask();
				$('.img_guanbi').click();
			}else{
				warnTips(resJson.message);
			}
		}
	});
	
	
}

/**
 * 查询教师按钮
 */
function searchTeaBtn(){
	var teaName = $('#input_tea').val();
	$('#teacher_table a').each(function(i,o){
		if($(o).text().indexOf(teaName)==-1){
			$(o).hide();
		}else{
			$(o).show();
		}
	})
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
			var html = '<option value="">全部</option>';
			if(resJson.code==200){
				var data = resJson.data;
				$.each(data, function(i,o) {
					html += '<option value="'+o.sid+'">'+o.sname+'</option>';
				});
			}
			$('#sel_sub').html(html);
		}
	});
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
				dayNum = data.dayNum;
				$('#schedule_name').html(data.name);
				var gradeId = data.gradeId==null?'':data.gradeId;
				var gradeName = data.gradeName==null?'':data.gradeName;
				$('#sel_grade').html('<option value="'+gradeId+'">'+gradeName+'</option>');
				findTeacher(data.schoolId)
			}else{
				
			}
		}
	});
	
}

/**
 * 查询老师
 */
function findTeacher(schoolId){
	$.ajax({
		type:"get",
		url: userServiceIp + "/api/uc/user",
		data:{delFlag:0,officeId:schoolId,state:1,userType:1},
		success:function(resJson){
			var html = '';
			if(resJson.ret ==200){
				var data = resJson.data.list;
				$.each(data, function(i,o) {
					html += ' <a href="javascript:;" id="'+o.id+'" data-areaid="'+o.cityId+'" class="mlh_btn subjects">'+o.realname+'</a>';
				});
			}
			$('#teacher_table').html(html);
			$('#teacher_table a').unbind('click');
			$('#teacher_table a').on('click',function(){
				$('#teacher_table a').removeClass('active');
				$(this).addClass('active');
				$('#choose_tea').html('<a href="javascript:;" data-areaid="'+$(this).data('areaid')+'" data-id="'+$(this).attr('id')+'" class="mlh_btn">'+$(this).text()+'</a>');
			})
			findTeachTask();
		}
	});
}

/**
 * 查询教学任务列表
 */
function findTeachTask(){
	var sid = $('#sel_sub').val();
	var className = $('#input_class').val();
	$.ajax({
		type:"get",
		url:serverIp+"/userCourse",
		data:{scheduleId:scheduleId,sid:sid,className:className},
		success:function(resJson){
			var html = '<tr class="mlh_th"><td>科目</td><td>教学班名称</td><td>每周上课节数</td><td>两节连上次数</td><td>任课教师</td><td>上课教室</td><td>操作</td></tr>';
			if(resJson.code==200){
				var data = resJson.data;
				$.each(data, function(i,o) {
					var params = JSON.stringify(o);
					var classNum = o.classNum==null?0:o.classNum;
					var twoNum = o.twoNum==null?0:o.twoNum;
					var uname = o.uname==null?'':o.uname;
					var classroom = o.classroom==null?'':o.classroom;
					html += "<tr>\
                                <td>"+o.sname+"</td>\
                                <td>"+o.className+"</td>\
                                <td>"+classNum+"</td>\
                                <td>"+twoNum+"</td>\
                                <td>"+uname+"</td>\
                                <td>"+classroom+"</td>\
                                <td class='mlh_show'>\
                                	<button onclick=editUserCourseDialog("+params+") class='index_lanse wx_qingkong'><em class='index_edit'></em>编辑</button>\
                                </td>\
                            </tr>";
				});
			}
			$("#uc_table").html(html);
		}
	});
}

/**
 * 弹出任课选框
 */
function editUserCourseDialog(data){
	$('#edit_couse_sub').html(data.sname);
	$('#edit_couse_class').html(data.className);
	$('#edit_couse_dialog').show();	
	$('#teacher_table a').show();
	$('#teacher_table a').removeClass('active');
	if(data.uid != null){
		$('#teacher_table #'+data.uid).addClass('active');
		$('#teacher_table #'+data.uid).click();
	}else{
		$('#choose_tea').html('');
	}
	$('#input_tea').val('');
	$('#input_classNum').val(data.classNum==null?'':data.classNum);
	$('#input_twoNum').val(data.twoNum==null?'':data.twoNum);
	$('#input_classRoom').val(data.classroom==null?'':data.classroom);
	$('#add_tea_course').unbind("click");
	$('#add_tea_course').on('click',function(){
		saveTeaCourse(data.id);
	})
	
}

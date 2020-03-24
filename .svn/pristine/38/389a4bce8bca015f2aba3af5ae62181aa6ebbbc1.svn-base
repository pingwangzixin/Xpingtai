var scheduleData = {};
var nodeTimeData = [];
$(function(){
	csTab(4);
	findScheduleById();
	findOldClass();
	findGradeStu();
})

/**
 * 添加导出连接
 */
function addExportHref(studentId,studentName){
	window.location.href=serverIp+"/timeTable?exportStu=true&studentId="+studentId+"&studentName="+studentName+"&scheduleId="+scheduleId+"&divideId="+scheduleData.divideId;
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
				scheduleData = data;
				$('#schedule_name').html(data.name);
				$('#sel_grade').html('<option value="'+data.gradeId+'">'+data.gradeName+'</option>');
			}else{
				
			}
		}
	});
	
}

/**
 * 查询年级下的学生
 */
function findGradeStu(){
	var params = {stuClass:1,divideId:scheduleData.divideId};
	var classId = $('#sel_class').val();
	var stuName = $('#input_stu').val();
	if(classId == "" || classId == null){
		params.gradeId = scheduleData.gradeId;
	}else{
		params.classId = classId
	}
	params.stuName = stuName
	$('.stu_schedule').remove();
	$.ajax({
		type:"get",
		url:serverIp+"/stuselectsub",
		data:params,
		success:function(resJson){
			if(resJson.code==200){
				//回显作息时间
				findNodeTime();
				var data = resJson.data;
				$.each(data, function(i,o) {
					appendGoClassTable(o);
				});
				findclassSchedule();
			}
		}
	});
}

/**
 * 查询原行政班
 */
function findOldClass(){
	$.ajax({
		type:"get",
		url:userServiceIp+"/api/ea/eaClass",
		data:{gradeId:scheduleData.gradeId},
		async:false,
		success:function(resJson){
			if(resJson.ret==200){
				var data = resJson.data;
				var html = '<option value="">全部</option>';
				$.each(data, function(i,o) {
					html+= '<option value="'+o.id+'">'+o.name+'班</option>'
				});
				$('#sel_class').html(html);
				if(data!=undefined&&data.length>0){
					$('#sel_class').val(data[0].id);
				}
			}
		}
	});
	
}

//查询作息时间
function findNodeTime(liClass){
	$.ajax({
		url:serverIp  + "/nodeTime",
		type:"get",
		data:{scheduleId:scheduleId, divideId:scheduleData.divideId},
		async:false,
		success:function(result){
			if(result.code==200){
				nodeTimeData = result.data;
			}
			
		},
		dataType:"json"
	});
}

/**
 * 拼接课表
 * <i class="mlh_button mlh_dayin  dayin_tc"><em class="dayin"></em>打印</i>\
	<i class="mlh_button mlh_dayin"><em class="dayin"></em>打印设置</i>\
 */
function appendGoClassTable(data){
	var classSchedule = 'stu_schedule stu_schedule_'+data.id;
	var csHtml = '<li class="mlh_setclass clearfix '+classSchedule+'">\
                         	<b>姓名：'+data.realname+'</b>\
                         	<b>原行政班级：'+data.className+'班</b>\
                         	<p>\
	                         	<i onclick="addExportHref(\''+data.id+'\',\''+data.realname+'\')" class="mlh_addfz mlh_button mlh_bg"><em class="daochu"></em>导出</i>\
                         	</p>\
                        </li>';
		csHtml += '<li class="'+classSchedule+'">\
                    <table class="wx_setrenwu_table wx_setkemu_bupai">\
                        <thead>\
                        	<th style="width:150px;">节次</th>';
	for(var i=0;i<scheduleData.dayNum;i++){
		csHtml+='<th>星期'+changeDayStr(i+1)+'</th>'
	}
	var numStr = ["一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五"];
	csHtml+=' </thead><tbody>';
	for(var i=0;i<scheduleData.classNum;i++){
		csHtml+='<tr><td class="wx_jieci">第'+numStr[i]+'节</td>';
		for(var n = 0;n<scheduleData.dayNum;n++){
			var stuClass = "";	
			$.each(data.classList, function(m,o) {
				stuClass += " stu_schedule_class_"+o.classId+"_"+(n+1)+','+(i+1);
			});
			csHtml+='<td class="go_class'+stuClass+'" id="'+data.id+'_'+(n+1)+','+(i+1)+'"></td>';
		}
		csHtml+='</tr>';
	}
	csHtml+='</tbody></table></li>';
	$('#stu_schedule_ul').append(csHtml);
	if(!$.isEmptyObject(nodeTimeData)){
		$('.stu_schedule_'+data.id+' .wx_jieci').each(function(i, v){
			$(this).html($(this).html()+'<br>'+nodeTimeData[i].time)
		})
	}
}

/**
 * 查询班级课表
 */
function findclassSchedule(){
	$.ajax({
		type:"get",
		url:serverIp+"/timeTable",
		data:{scheduleId:scheduleId},
		success:function(resJson){
			if(resJson.code==200){
				var data = resJson.data;
				$.each(data, function(i,o) {
					var classRoom = o.classroom==null?'':"</br>["+o.classroom+"]";
					$('.stu_schedule_class_'+o.classId+"_"+o.weekNum+"\\,"+o.lessonNum).html(o.subjectName+"("+o.teacherName+')</br>('+o.className+')'+classRoom);
				});
			}
		}
	});
}

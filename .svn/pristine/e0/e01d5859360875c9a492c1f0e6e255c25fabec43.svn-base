var scheduleData = {};
var exportParams = {};
var nodeTimeData = [];
$(function(){
	csTab(3);
	findScheduleById();
	findSubTable();
	findScheduleTea();
})

/**
 * 添加导出连接
 */
function addExportHref(teacherId,teacherName){
	var className = $('#input_class').val();
	var subjectId = $('#sel_sub').val();
	window.location.href=serverIp+"/timeTable?exportTea=true&teacherId="+teacherId+"&teacherName="+teacherName+"&scheduleId="+scheduleId+"&className="+className+"&subjectId="+subjectId;
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
				})
			}
			$('#sel_sub').html(html);
		}
	});
}

/**
 *查询老师
 */
function findScheduleTea(){
	var className = $('#input_class').val();
	var sid = $('#sel_sub').val();
	$('.tea_schedule').remove();
	$.ajax({
		type:"get",
		url:serverIp+"/userCourse/findTeacherList",
		data:{scheduleId:scheduleId,sid:sid,className:className},
		success:function(resJson){
			var subMap = {};
			if(resJson.code==200){
				//回显作息时间
				findNodeTime();
				var data = resJson.data;
				$.each(data, function(i,o) {
					appendGoClassTable(o);
				})
				findTeaSchedule();
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
	var classSchedule = 'tea_schedule tea_schedule_'+data.uid;
	var csHtml = '<li class="mlh_setclass clearfix '+classSchedule+'">\
                         	<b>姓名：'+data.uname+'</b>\
                         	<p>\
	                         	<i onclick="addExportHref(\''+data.uid+'\',\''+data.uname+'\')" class="mlh_addfz mlh_button mlh_bg"><em class="daochu"></em>导出</i>\
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
			csHtml+='<td class="go_class" id="'+data.uid+'_'+(n+1)+','+(i+1)+'"></td>';
		}
		csHtml+='</tr>';
	}
	csHtml+='</tbody></table></li>';
	$('#tea_schedule_ul').append(csHtml);
	if(!$.isEmptyObject(nodeTimeData)){
		$('.tea_schedule_'+data.uid+' .wx_jieci').each(function(i, v){
			$(this).html($(this).html()+'<br>'+nodeTimeData[i].time)
		})
	}
}


/**
 * 查询班级课表
 */
function findTeaSchedule(){
	var className = $('#input_class').val();
	var subjectId = $('#sel_sub').val();
	$.ajax({
		type:"get",
		url:serverIp+"/timeTable",
		data:{scheduleId:scheduleId,className:className,subjectId:subjectId},
		success:function(resJson){
			if(resJson.code==200){
				var data = resJson.data;
				$.each(data, function(i,o) {
					var classRoom = o.classroom==null?'':"<span class=\"span_classromm\"></br>("+o.classroom+")</span>";
					if(o.teacherId.indexOf("|")){
						$.each(o.teacherId.split("|"), function(n,teaId) {
							$('#'+teaId+"_"+o.weekNum+"\\,"+o.lessonNum).html(o.subjectName.split("|")[n]+"<span class=\"span_teaName\"></br>("+o.className+')</span>'+classRoom);
						});
					}else{
						$('#'+o.teacherId+"_"+o.weekNum+"\\,"+o.lessonNum).html(o.subjectName+"<span class=\"span_teaName\"></br>("+o.className+')</span>'+classRoom);
					}
					
				});
			}
		}
	});
}

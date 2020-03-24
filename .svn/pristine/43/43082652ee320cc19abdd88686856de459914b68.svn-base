var scheduleData = {};
var nodeTimeData = [];
$(function(){
	csTab(1);
	findScheduleById();
	findSubTable();
	findScheduleClass();
	var checkBoxArr = [{id:'wx_shangwu',className:'span_teaName'},{id:'wx_xiawu',className:'span_classromm'}];
	$.each(checkBoxArr, function(i,o) {
		$('#'+o.id).click(function(){
			if($(this).prop('checked')){
				$('.'+o.className).show()
			}else{
				$('.'+o.className).hide()
			}
		})
	});
	$('#sel_class').click(function(){
		if($(this).val()==''){
			$('.class_schedule').show();
		}else{
			$('.class_schedule').hide();
			$('.class_schedule_'+$(this).val()).show();
		}
	})
})

/**
 * 添加导出连接
 */
function addExportHref(cid,className){
	window.location.href=serverIp+"/timeTable?export=true&classId="+cid+"&className="+className+"&scheduleId="+scheduleId+"&showTeacher="+$('#wx_shangwu').prop('checked')+"&showClassroom="+$('#wx_xiawu').prop('checked');
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
 *查询班级
 */
function findScheduleClass(){
	$.ajax({
		type:"get",
		url:serverIp+"/userCourse",
		data:{scheduleId:scheduleId,scheduleClass:1},
		success:function(resJson){
			var subMap = {};
			var html = '<option value="">全部</option>';
			if(resJson.code==200){
				//回显作息时间
				findNodeTime();
				var data = resJson.data;
				$.each(data, function(i,o) {
					html += '<option value="'+o.cid+'">'+o.className+'</option>';
					o.dayNum = scheduleData.dayNum;
					o.classNum = scheduleData.classNum;
					appendGoClassTable(o);
				})
				findclassSchedule();
			}
			$('#sel_class').html(html);
		}
	});
	
}

/**
 * 拼接课表
 * <i class="mlh_button mlh_dayin  dayin_tc"><em class="dayin"></em>打印</i>\
	<i class="mlh_button mlh_dayin"><em class="dayin"></em>打印设置</i>\
 */
function appendGoClassTable(data){
	var classSchedule = 'class_schedule class_schedule_'+data.cid;
	var csHtml = '<li class="mlh_setclass clearfix '+classSchedule+'">\
                         	<b>教学班：'+data.className+'</b>\
                         	<p>\
	                         	<i onclick="addExportHref(\''+data.cid+'\',\''+data.className+'\')" class="mlh_addfz mlh_button mlh_bg"><em class="daochu"></em>导出</i>\
                         	</p>\
                        </li>';
		csHtml += '<li class="'+classSchedule+'">\
                    <table class="wx_setrenwu_table wx_setkemu_bupai">\
                        <thead>\
                        	<th style="width:150px;">节次</th>';
	for(var i=0;i<data.dayNum;i++){
		csHtml+='<th>星期'+changeDayStr(i+1)+'</th>'
	}
	var numStr = ["一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五"];
	csHtml+=' </thead><tbody>';
	for(var i=0;i<data.classNum;i++){
		csHtml+='<tr><td class="wx_jieci">第'+numStr[i]+'节</td>';
		for(var n = 0;n<data.dayNum;n++){
			csHtml+='<td class="go_class" id="'+data.cid+'_'+(n+1)+','+(i+1)+'"></td>';
		}
		csHtml+='</tr>';
	}
	csHtml+='</tbody></table></li>';
	$('#class_schedule_ul').append(csHtml);
	if(!$.isEmptyObject(nodeTimeData)){
		$('.class_schedule_'+data.cid+' .wx_jieci').each(function(i, v){
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
					var classRoom = o.classroom==null?'':"<span class=\"span_classromm\"></br>("+o.classroom+")</span>";
					$('#'+o.classId+"_"+o.weekNum+"\\,"+o.lessonNum).html(o.subjectName+"<span class=\"span_teaName\"></br>("+o.teacherName+')</span>'+classRoom);
				});
			}
		}
	});
}

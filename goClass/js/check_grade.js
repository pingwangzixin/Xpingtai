var scheduleData = {};
$(function(){
	csTab(2);
	var checkBoxArr = [{id:'gd_showTeacher',className:'span_teaName'},{id:'gd_showClassRoom',className:'span_classromm'},{id:'zb_showTeacher',className:'span_teaName'},{id:'zb_showClassRoom',className:'span_classromm'}];
	$.each(checkBoxArr, function(i,o) {
		$('#'+o.id).click(function(){
			if($(this).prop('checked')){
				$('.'+o.className).show()
			}else{
				$('.'+o.className).hide()
			}
		})
	});
	findScheduleById();
	findScheduleClass();
})

/**
 * 添加导出连接
 */
function addExportHref(){
	var classType = $('input[name="shangke"]:checked').val();
	var showTeacher = classType == "gd"?$('#gd_showTeacher').prop('checked'):$('#zb_showTeacher').prop('checked');
	var showClassRoom = classType == "gd"?$('#gd_showClassRoom').prop('checked'):$('#zb_showClassRoom').prop('checked');
	window.location.href=serverIp+"/timeTable?export=true&classType="+classType+"&scheduleId="+scheduleId+"&showTeacher="+showTeacher+"&showClassroom="+showClassRoom;
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
				$('#gd_grade,#zb_grade').html(data.gradeName);
				$('#sel_grade').html('<option value="'+data.gradeId+'">'+data.gradeName+'</option>');
			}else{
				
			}
		}
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
				var data = resJson.data;
				appendGoClassTable(data);
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
	var weekHtml = "<tr><th>星期</th>";
	var jcHtml = "<tr><th>节次</th>"
	var numStr = ["一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五"];
	for(var i=0;i<scheduleData.dayNum;i++){
		weekHtml+='<th colspan="'+scheduleData.classNum+'">星期'+changeDayStr(i+1)+'</th>'
		for(var n=0;n<scheduleData.classNum;n++){
			jcHtml+='<th>第'+numStr[n]+'节</th>';
		}
	}
	weekHtml += "</tr>";
	jcHtml += "</tr>";
	$('#gd_th,#zb_th').html(weekHtml+jcHtml);
	
	var gdClassHtml = "";
	var zbClassHtml = "";
	$.each(data, function(i,o) {
		if(o.type == 1){
			zbClassHtml += appendDataTd(o);
		}else{
			gdClassHtml += appendDataTd(o);
		}
	})
	$('#gd_tbody').html(gdClassHtml);
	$('#zb_tbody').html(zbClassHtml);
}

/**
 * 拼接数据列
 * @param {Object} o
 */
function appendDataTd(o){
	html = "";
	html += '<tr><td class="wx_jieci">'+o.className+'</td>';
	for(var i=0;i<scheduleData.dayNum;i++){
		for(var n=0;n<scheduleData.classNum;n++){
			html+='<td id="'+o.cid+'_'+(i+1)+','+(n+1)+'"></td>';
		}
	}
	html += '</tr>';
	return html;
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
					var classRoom = o.classroom==null?'':"<span class=\"span_classromm\"></br>"+o.classroom+"</span>";
					$('#'+o.classId+"_"+o.weekNum+"\\,"+o.lessonNum).html(o.subjectName+"<span class=\"span_teaName\">("+o.teacherName+')</span>'+classRoom);
				});
			}
		}
	});
}


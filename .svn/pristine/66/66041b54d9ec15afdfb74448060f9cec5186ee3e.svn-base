var scheduleId = getRequest().id;
/**
 * 获取url参数
 */
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

$(function(){
	findtable();
	
	$(document).on('click',".wx_fenzu_span span",function(){
		var exam = $(this).attr("id")
		var index = $(this).index()-1;
		$('#guize span').removeClass('active').eq(index).addClass('active');
		$('#yupai span').removeClass('active').eq(index).addClass('active');
		timeTableClass(scheduleId, exam)
		$('.wx_setkemu_bupai tbody tr td').removeClass()
	});
	
	
})
//  根据科目  查询下面的班级
function timeTableClass(id,sid){
	$.ajax({
		url : serverIp+'/userCourse',
		data:{"scheduleId":id,"sid":sid},
		success:function(resData){
//			console.log(resData.data)
			var exam = resData.data;
			$('.wx_nianji_width span').remove();
			var classId= "";
			if(resData.code==200){
				$.each(exam, function(index, exam) {
					if(index==0){
						classId = exam.cid;
						$('.wx_nianji_width').append("<span class='active' name='"+exam.cid+"' id='"+exam.cid+"'>"+exam.className+"</span>")
					}else{
						$('.wx_nianji_width').append("<span name='"+exam.cid+"' id='"+exam.cid+"'>"+exam.className+"</span>")
					}
				})
			}
			$(document).on('click',"#yupai_width span",function(){
				$('.wx_setkemu_bupai tbodys tr td').removeClass()
				var index = $(this).index();
				$('#yupai_width span').removeClass('active').eq(index).addClass('active');
				findSubjectRule(id,$(this).attr("name"),sid)
				findPreSchedule(id,classId,sid)
			});
			$(document).on('click',"#guize_width span",function(){
				$('.wx_setkemu_bupai tbody tr td').removeClass()
				var index = $(this).index();
				$('#guize_width span').removeClass('active').eq(index).addClass('active');
				findSubjectRule(id,$(this).attr("name"),sid)
			})
			findSubjectRule(id,classId,sid)
			findPreSchedule(id,classId,sid)
		}
	})
}
// 排课表展示 
function findtable(){
	$.ajax({
		url : serverIp+'/schedule/'+scheduleId,
		data:{},
		success:function(resData){
//			console.log(resData.data)
			var exam = resData.data;
			if (resData.code== 200) {
				var gradeId = exam.gradeId==null?"":exam.gradeId;
				var gradeName = exam.gradeName==null?"":exam.gradeName;
				$('.selectClass').html('<option value="'+gradeId+'">'+gradeName+'</option>')				
				$('.timetable_name').html(exam.name)
				timetable(scheduleId)
				var dayNum = exam.dayNum
				var classNum =  exam.classNum
				var thead_html =  "<tr><th>节次</th>";
				var tbody_quarter_html =  "";
				var tbody_lesson_html =  "";
				var schar = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];
				for (var i=0;i<dayNum;i++) {
					thead_html+="<th>"+schar[i]+"</th>";
				}
				thead_html+="</tr>";
				$('#setrenwu_day').html(thead_html)
				$('#setrenwu_bupai').html(thead_html)
			//========================================
				var chnNumChar = ["一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十"];
				if(classNum <= 20){
					for (var i=0;i<classNum;i++) {
							tbody_quarter_html+="<tr><td class='wx_jieci'>第"+chnNumChar[i]+"节</td>";
							tbody_lesson_html+="<tr><td class='wx_jieci'>第"+chnNumChar[i]+"节</td>";
						for (var j=0;j<dayNum;j++) {
							tbody_quarter_html+="<td id='q_"+(i+1)+","+(j+1)+"' name='"+(i+1)+","+(j+1)+"'></td>";
							tbody_lesson_html+="<td id='l_"+(i+1)+","+(j+1)+"' name='"+(i+1)+","+(j+1)+"'></td>";
						}
					} 
					tbody_quarter_html+="</tr>";
					tbody_lesson_html+="</tr>";
					$('#setrenwu_quarter').html(tbody_quarter_html)
					$('#setkemu_lesson').html(tbody_lesson_html)
				}
			}
		}		
	})
 }
// 科目下面所有班级
function timetable(id){
	$.ajax({
		url : serverIp+"/gradeSubject",
		data:{"scheduleId":id},
		success:function(resData){
//			console.log(resData.data)
			var exam = resData.data;
			if (resData.code== 200) {
				$.each(exam, function(index, timeMap) {
					if(index==0){
						$('#yupai, #guize').append("<span class='active' id='"+timeMap.sid+"'>"+timeMap.sname+"</span>")
						timeTableClass(id,timeMap.sid)
					}else{
						$('#yupai, #guize').append("<span id='"+timeMap.sid+"'>"+timeMap.sname+"</span>")
					}
				});
				
			}
		}
	})
}

//（第一个）规则 - 排课表 数据获取并提交
function set_Paike(){
	var dataMap = {};
	dataMap.subAsk = $('.wx_setjieshu input[name="setjieshu"]:checked ').val();
	dataMap.scheduleId = scheduleId;
	dataMap.gradeId = $('.selectClass option').val()
	dataMap.gradeName = $('.selectClass option').html()
	dataMap.subjectId = $('#guize span[class=active]').attr("id")
	dataMap.subjectName= $('#guize span[class=active]').html();
	dataMap.classId = $('#guize_width span[class=active]').attr("name")
	dataMap.className = $('#guize_width span[class=active]').text()
	
	if(dataMap.gradeId==null||dataMap.gradeId==''){
		warnTips('请选择年级');
		return false;
	}else if(dataMap.subjectId==null||dataMap.subjectId==''){
		warnTips('请选择科目');
		return false;
	}else if(dataMap.classId==null||dataMap.classId==''){
		warnTips('请选择班级');
		return false;
	}
	
	var td_Map = new Array();
	$("#setrenwu_quarter tr").each(function(){
		$(this).find('td').each(function(index, item){
			if (index!= 0) {
				if ($(this).hasClass("wx_hongzi")) {
					td_Map.push($(this).attr("name"))
				}
			}
		})
	})
	dataMap.lessonList = td_Map
	$.ajax({
		type:"POST",
		url:serverIp+"/subjectRule",
		dataType : "json",
		data:{"data": JSON.stringify(dataMap)},
		success:function(resJson){
			if(resJson.code ==200){
				successTips('set');
				findSubjectRule(dataMap.scheduleId, dataMap.classId, dataMap.subjectId);
			}
		}
	});
}

// 排课表提交候回显
function findSubjectRule(scheduleId,classId,subjectId){
//	var  scheduleId ='383e05db22594299b69b29dd7737f576'
//	var  classId	='d33c18fac02c4cb589c0fc4ea488c57f'
//	var  subjectId	='subject_14'
	$.ajax({
		type:"GET",
		url:serverIp+"/subjectRule",
		data:{"scheduleId":scheduleId,"classId":classId,"subjectId":subjectId},
		success:function(resJson){
			var resList = resJson.data; 
//			console.log(resList)
			if(resJson.code ==200){
				if (resList.length != 0) {
				var cId = resList[0].classId;
				var subjectId = resList[0].subjectId;
				for (var i=0; i<resList.length ;i++) {
					$("#q_"+resList[i].lessonNum+"\\,"+resList[i].weekNum).addClass("wx_hongzi")
					$("#l_"+resList[i].lessonNum+"\\,"+resList[i].weekNum).addClass("wx_hongzi")
				}
				$('#guize span').removeClass();
				$('#guize_width span').removeClass();
				$('#'+subjectId).addClass("active");
				$('#'+cId).addClass("active");
				}
			}
		}
	})
}
// （第二个） 预排——  排课表 数据获取并提交
function set_lesson(){
	var dataMap = {};
	dataMap.scheduleId = scheduleId;
	dataMap.gradeId = $('.selectClass option').val()
	dataMap.gradeName = $('.selectClass option').html()
	dataMap.subjectId = $('#guize span[class=active]').attr("id")
	dataMap.subjectName= $('#guize span[class=active]').html();
	dataMap.classId = $('#guize_width span[class=active]').attr("name")
	dataMap.className = $('#guize_width span[class=active]').text()
	dataMap.type=1
	if(dataMap.gradeId==null||dataMap.gradeId==''){
		warnTips('请选择年级');
		return false;
	}else if(dataMap.subjectId==null||dataMap.subjectId==''){
		warnTips('请选择科目');
		return false;
	}else if(dataMap.classId==null||dataMap.classId==''){
		warnTips('请选择班级');
		return false;
	}
	var td_Map = new Array();
	$("#setkemu_lesson tr").each(function(){
		$(this).find('td').each(function(index, item){
			if (index!= 0) {
				if ($(this).hasClass("wx_duigou")) {
					td_Map.push($(this).attr("name"))
				}
			}
		})
	})
	dataMap.lessonList = td_Map
	$.ajax({
		type:"POST",
		url:serverIp+"/preSchedule",
		dataType : "json",
		data:{"data": JSON.stringify(dataMap)},
		success:function(resJson){
			if(resJson.code ==200){
				successTips('set');
				findPreSchedule(dataMap.scheduleId, dataMap.classId, dataMap.subjectId);
			}
		}
	});
}
// 排课表提交候回显
function findPreSchedule(scheduleId,classId,subjectId){
	$.ajax({
		type:"GET",
		url:serverIp+"/preSchedule",
		data:{"scheduleId":scheduleId,"classId":classId,"subjectId":subjectId},
		success:function(resJson){
			var resList = resJson.data; 
//			console.log(resList)
			if(resJson.code ==200){
				if (resList.length != 0) {
				var cId = resList[0].classId;
				var subjectId = resList[0].subjectId;
				for (var i=0; i<resList.length ;i++) {
					$("#q_"+resList[i].lessonNum+"\\,"+resList[i].weekNum).addClass("wx_duigou")
					$("#l_"+resList[i].lessonNum+"\\,"+resList[i].weekNum).addClass("wx_duigou")
				}
				$('#guize span').removeClass();
				$('#guize_width span').removeClass();
				$('#'+subjectId).addClass("active");
				$('#'+cId).addClass("active");
				}
			}
		}
	})
}

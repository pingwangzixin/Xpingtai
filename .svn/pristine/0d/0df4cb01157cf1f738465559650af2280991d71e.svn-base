var scheduleId = getRequest().id;
var count = 0;
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
	find_tea_table();
	tea_select_case();
	$('.paiming').html("0")
	
	$('.tea_data_insert').click(function(){
		$('#tea_rule_dialog').show();
	});
		
	$('.tea_setContent_click').click(function(){
		$('.tea_revise_paike tr td').removeClass()
		$('.tea_setContent_two').show()
	});
	
	$('.wx_qingkong').click(function(){
		var teacherId = $('.mlh_selectTeacher .active').attr("name");
		del_tea_data(scheduleId, teacherId)
	})
	
	$(document).on("click", ".mlh_selectTeacher span", function () {
		$('.tea_revise_names').empty();
		$('.mlh_selectTeacher span').removeClass();
		$(this).addClass("active");
		var teaName = $(this).text();
		var teaId = $('.mlh_selectTeacher .active').attr("name");
		findTeaSchedule(scheduleId,teaId,teaName);
    })
})

//======================= 教师规则

function add_kebiao(){
	if($('#tea_checked ul').find("li").length > 0){
		$('.techear_zero').hide();
		$('.tea_instructor').show();
	}else{
		$('.techear_zero').show();
		$('.techear_num').hide();
		$('#tea_rule_dialog').show()
	}
}
function tea_select_case(){
	$.ajax({
		type:"GET",
		url:serverIp+"/userCourse/findTeacherList",
		data:{"scheduleId":scheduleId},
		success:function(resJson){
			if (resJson.code == 200) {
				var teaList = resJson.data;
				var tea_html = "<ul>";
				var tea_single_html = "<ul>";
				$.each(teaList, function(index, tea) {
					if (tea != null) {
						tea_html+= "<li id='"+teaList[index].uid+"' >"+teaList[index].uname+"</li>"
						tea_single_html+= "<li name='"+teaList[index].uid+"' >"+teaList[index].uname+"</li>"
					}
				});
				tea_html+="</ul>";
				$('#tea_guize').html(tea_html);
				$('#st_guize').html(tea_single_html);
			}
		}
	})
}


//  添加教师规则 弹窗中   选择的教师添加到已选入
$(document).on('click', '#tea_guize ul li', function(){
	$('.techear_zero').hide();
	$('.techear_num').show();
	count += 1;
	$('.paiming').html(count)
	var tea_name = $(this).text()
	var tea_id   = $(this).attr("id")
	$(this).remove();
	var tea_html = '<li class="mlh_btn" id="'+tea_id+'">'+tea_name+'<i class="cuoicon close"></i></li>'
	$("#tea_checked ul").append(tea_html);
})
//  添加教师规则 弹窗中   从已选入的中删除放入教师列表中
$(document).on('click', '#tea_checked ul li', function(){
	var tea_name = $(this).text()
	var tea_id   = $(this).attr("id")
	count -= 1;
	$('.paiming').html(count)
	$(this).remove();
	var tea_html = '<li id="'+tea_id+'">'+tea_name+'</li>'
	$("#tea_guize ul").prepend(tea_html);
})

//  添加教师规则 弹窗中   选择的教师添加到已选入
$(document).on('click', '#st_guize ul li', function(){
	$('.techear_zero').hide();
	$('.techear_num').show();
	var tea_name = $(this).text()
	var tea_id   = $(this).attr("name")
	if ($('#st_single_fenzu ul li').length >0) {
		
	}else{
		$(this).remove();
		var tea_html = '<li class="mlh_btn" name="'+tea_id+'">'+tea_name+'<i class="cuoicon close"></i></li>'
		$("#st_single_fenzu ul").append(tea_html);
	}
})
//  添加教师规则 弹窗中   从已选入的中删除放入教师列表中
$(document).on('click', '#st_single_fenzu ul li', function(){
	var tea_name = $(this).text()
	var tea_id   = $(this).attr("name")
	$(this).remove();
	var tea_html = '<li name="'+tea_id+'">'+tea_name+'</li>'
	$("#st_guize ul").prepend(tea_html);
})


// 排课表展示 
function find_tea_table(){
	$.ajax({
		url : serverIp+'/schedule/'+scheduleId,
		data:{},
		success:function(resData){
//			console.log(resData.data)
			var exam = resData.data;
			if (resData.code== 200) {
				var dayNum = exam.dayNum
				var classNum =  exam.classNum
				var thead_html =  "<tr><th>节次</th>";
				var tbody_teacher_html =  "";
				var tbody_teaUpdata_html =  "";
				var schar = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];
				for (var i=0;i<dayNum;i++) {
					thead_html+="<th>"+schar[i]+"</th>";
				}
				thead_html+="</tr>";
				$('#tea_tab').html(thead_html)
				$('#tea_show_tab').html(thead_html)
				$('#tea_single_tab').html(thead_html)
				$('#tea_revise_tab').html(thead_html)
			//========================================
				var chnNumChar = ["一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十"];
				if(classNum <= 20){
					for (var i=0;i<classNum;i++) {
							tbody_teacher_html+="<tr><td class='wx_jieci'>第"+chnNumChar[i]+"节</td>";
							tbody_teaUpdata_html+="<tr><td class='wx_jieci'>第"+chnNumChar[i]+"节</td>";
						for (var j=0;j<dayNum;j++) {
							tbody_teacher_html+="<td id='t_"+(i+1)+","+(j+1)+"' name='"+(i+1)+","+(j+1)+"'></td>";
							tbody_teaUpdata_html+="<td id='tu_"+(i+1)+","+(j+1)+"' name='"+(i+1)+","+(j+1)+"'></td>";
						}
					} 
					tbody_teacher_html+="</tr>";
					$('#tea_paike').html(tbody_teacher_html)
					$('#tea_show_paike').html(tbody_teacher_html)
					$('#tea_single_paike').html(tbody_teacher_html)
					$('#tea_revise_paike').html(tbody_teaUpdata_html)
					findNonRepeatingName(scheduleId);
				}
			}
		}		
	})
 }
// 当没有教师时候  添加教师规则 多个教师的  提交
var dataMap = {};
function tea_new_add(){
	dataMap.scheduleId = scheduleId;
	var tea_Map = new Array();
	$(".tea_instructor li").each(function(index, tea){
		if ($(this).hasClass("mlh_btn")) {
			var tea_user = {};
			tea_user.id=$(this).attr("id");
			tea_user.name=$(this).text();
			tea_Map.push(tea_user)
		}
	})
	dataMap.teaList=tea_Map;
	var td_Map = new Array();
	$("#tea_paike tr").each(function(){
		$(this).find('td').each(function(index, item){
			if (index!= 0) {
				if ($(this).hasClass("wx_hongzi")) {
					td_Map.push($(this).attr("name"))
				}
			}
		})
	})
	dataMap.lessonList = td_Map
		console.log(dataMap)
	$.ajax({
		type:"POST",
		url:serverIp+"/teacherRule",
		dataType : "json",
		data:{"data": JSON.stringify(dataMap)},
		success:function(resJson){
			if(resJson.code ==200){
				$('.tea_no').hide();
				$('#tea_rule_dialog').hide();
				$('.tea_have').show();
				findNonRepeatingName(scheduleId);
				$('.paiming').html("0")
			}
		}
	});
	
}
//  查询出已选择的老师列表
function findNonRepeatingName(scheduleId){
	$.ajax({
		type:"GET",
		url:serverIp+"/teacherRule/findNonRepeatingNameList",
		data:{"scheduleId":scheduleId},
		success:function(resJson){
			var resList = resJson.data; 
			if(resJson.code ==200){
				if (resList.length != 0) {
					if ($('.mlh_selectTeacher span').length >0) {
						$(".mlh_selectTeacher span").remove();
					}
					for (var i=0; i<resList.length ;i++) {
						var html = "";
						if (i==0) {
							html = "<span class='active' name='"+resList[i].teacherId+"'>"+resList[i].teacherName+"</span>"
							findTeaSchedule(scheduleId,resList[i].teacherId,resList[i].teacherName);
						} else{
							html = "<span name="+resList[i].teacherId+">"+resList[i].teacherName+"</span>"
						}
						$("#"+resList[i].teacherId).remove();
						$(document).find("#st_guize ul li[name='"+resList[i].teacherId+"']").remove();
						$(".mlh_selectTeacher").append(html)
						$('.tea_revise_names').empty();
					}
				}
				$('.tea_no').hide();
				$('#tea_rule_dialog').hide();
				$('.tea_have').show();
			}else{
				$('.tea_have').hide();
			}
		}
	})
}

// 查询 某个老师 的排课表
function findTeaSchedule(scheduleId, teacherId, teaName){
	$.ajax({
		type:"GET",
		url:serverIp+"/teacherRule",
		data:{"scheduleId":scheduleId, "teacherId":teacherId},
		success:function(resJson){
			var resList = resJson.data; 
//			console.log(resList)
			if(resJson.code ==200){
				if (resList.length != 0) {
				var cId = resList[0].classId;
				var subjectId = resList[0].subjectId;
				$('#tea_paike tr td').removeClass();
				$('#tea_show_paike tr td').removeClass();
				$('#tea_revise_paike tr td').removeClass();
					for (var i=0; i<resList.length ;i++) {
						$("#t_"+resList[i].lessonNum+"\\,"+resList[i].weekNum).addClass("wx_hongzi")
						$("#tu_"+resList[i].lessonNum+"\\,"+resList[i].weekNum).addClass("wx_hongzi")
					}
					$(".tea_revise_names").append(teaName)
					$(".tea_revise_name").attr("name",teacherId)
				}
			}
		}
	})
}

// 修改教师规则弹框de  提交
function tea_revise_add (){
	dataMap.scheduleId	= scheduleId;
	dataMap.teacherId	= $(".tea_revise_name").attr("name");
	dataMap.teacherName = $(".tea_revise_names").text();
	dataMap.maxNum		= $('.tea_revise_class_num').val()
	var td_Map = new Array();
	$("#tea_revise_paike tr").each(function(){
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
		url:serverIp+"/teacherRule/teacherUpdata",
		dataType : "json",
		data:{"data": JSON.stringify(dataMap)},
		success:function(resJson){
			if(resJson.code ==200){
				$('.tea_no').hide();
				$('.tea_setContent_two').hide();
				$('.tea_have').show();
				findTeaSchedule(scheduleId,dataMap.teacherId,dataMap.teacherName)
			}
		}
	});
}

function del_tea_data(scheduleId, teaId){
	var data = {};
	data.scheduleId = scheduleId;
	data.teacherId = teaId;
	$.ajax({
		type:"post",
		url: serverIp+"/teacherRule/teacherDel",
		dataType : "json",
		data:{"data": JSON.stringify(data)},
		success:function(resJson){
			if(resJson.code ==200){
				$('.tea_revise_names').empty();
				findNonRepeatingName(scheduleId);
				if($('.mlh_selectTeacher span').length > 1){
					$('.tea_no').hide()
				}else{
					$('.tea_no').show()
				}
			}
		}
	});
}

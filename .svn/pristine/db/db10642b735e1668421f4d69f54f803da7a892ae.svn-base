var jetsenCourseIp = 'http://111.207.13.88:8892/JetsenCourse';
var serverIp = 'http://111.207.13.88:8892/JetsenNewNEMT';
//var serverIp = 'http://localhost:8080/JetsenNewNEMT';
var userServiceIp = 'http://111.207.13.88:8881/jeuc';
var portalIp = 'http://111.207.13.88:8883/#/wrap/index#top';
var baseData = {schoolId: getParameter('schoolId')};
var scheduleId = getRequest().id;

var stuYearArr = ['2017','2018'];
var termArr = [{id:1,name:'第一学期'},{id:2,name:'第二学期'}]

$(function(){
	//关闭弹窗
	$('.img_guanbi,.tc_anniu_quxiao').on('click',function(){
		$('.img_guanbi').parents('.wx_tanchuang').hide();
	})
//	initYearTerm();
	
	$('.iframheader').load(function(){
		$('.iframheader').contents().find("#createName").html(getParameter('createName'));
	})
})
/**
 * 弹出删除提示窗
 */
function deleteTips(delFunction,id,state){
	$('#deleteTips').show();
	$('#deleteTipsYesBtn').unbind("click");
	$('#deleteTipsYesBtn').on('click',function(){
		delFunction(id,state);
		$('#deleteTips').hide();
	})
}

function toLoginPass(){
	window.location.href = jetsenCourseIp + '/scheduleController/toLoginPass.do';
}

/**
 * 成功提示
 */
function successTips(type){
	var msg = '添加成功';
	switch (type){
		case 'update':
			msg = '修改成功';
			break;
		case 'del':
			msg = '删除成功';
			break;
		case 'adjust':
			msg = '调整成功';
			break;
		case 'publish':
			msg = '发布成功';
			break;
		case 'cancelPublish':
			msg = '取消发布成功';
			break;
		case 'set':
			msg = '设置成功';
			break;
		case 'import':
			msg = '导入成功';
			break;
		default:
			msg = '添加成功';
			break;
	}
	messagePrompt('successTips', msg);
}

/**
 * 失败提示
 */
function failTips(type){
	var msg = '添加失败';
	switch (type){
		case 'update':
			msg = '修改失败';
			break;
		case 'del':
			msg = '删除失败';
			break;
		case 'adjust':
			msg = '调整失败';
			break;
		case 'publish':
			msg = '发布成功';
			break;
		case 'cancelPublish':
			msg = '取消发布失败';
			break;
		case 'query':
			msg = '请求失败';
			break;
		case 'save':
			msg = '保存失败';
			break;
		case 'set':
			msg = '设置失败';
			break;
		case 'import':
			msg = '导入失败';
			break;
		default:
			msg = '添加失败';
			break;
	}
	messagePrompt('failTips', msg);
}

/**
 * 警告提示
 */
function warnTips(msg){
	messagePrompt('warnTips', msg);
}

//消息弹窗
function messagePrompt(name, msg){
	$("#"+name+" .textContent").html(msg);
	$("#"+name).show();
	setTimeout(function(){
        $("#"+name).hide();
    },1500);
}

/**
 * 取消按钮
 * @param tem
 */
function cancel(dialogId){
	 $('#'+dialogId).hide()
}

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

/**
 * 初始化tab标签
 * @param {Object} index
 */
function addTab(index){
	var urlArr = [	{url:addParams('./set_kebiao.html?id='+scheduleId), name:'设置课表'},
					{url:addParams('./generate_classes.html?id='+scheduleId), name:'生成教学班'},
					{url:addParams('./set_jiaoxuerenwu.html?id='+scheduleId), name:'设置教学任务'},
					{url:addParams('./set_paike_role.html?id='+scheduleId), name:'设置固定课规则'},
					{url:addParams('./set_goClass_time.html?id='+scheduleId), name:'设置走班时段'},
					{url:addParams('./zhineng_kebiao.html?id='+scheduleId), name:'智能编排课表'},
					{url:addParams('./set_weitiao.html?id='+scheduleId), name:'微调'}
				]
	var html = '';
	$.each(urlArr, function(i,o) {
		var liClass = "";
		if(index==(i+1)){
			liClass = "active";
		}
		html += '<a href="'+o.url+'">\
					<li class="'+liClass+'">'+o.name+'</li>\
				</a>';
	});
	$('#ul_tab').html(html);
}

/**
 * 初始化课表查看标签
 * @param {Object} index
 */
function csTab(index){
	var urlArr = [	{url: addParams('check_classSchedule.html?id='+scheduleId),name:'班级课表'},
					{url: addParams('check_gradeSchedule.html?id='+scheduleId),name:'年级课表'},
					{url: addParams('check_teacherSchedule.html?id='+scheduleId),name:'教师课表'},
//					{url: addParams('check_classroomSchedule.html?id='+scheduleId),name:'教室课表'},
					{url: addParams('check_studentSchedule.html?id='+scheduleId),name:'学生课表'}
				]
	var html = '';
	$.each(urlArr, function(i,o) {
		var liClass = "";
		if(index==(i+1)){
			liClass = "active";
		}
		html += '<a href="'+o.url+'">\
					<li class="'+liClass+'">'+o.name+'</li>\
				</a>';
	});
	$('#cs_tab').html(html);
}


function changeDayStr(day){
	var dayStr = '';
	switch (day){
		case 1:
			dayStr = "一";
			break;
		case 2:
			dayStr = "二";
			break;
		case 3:
			dayStr = "三";
			break;
		case 4:
			dayStr = "四";
			break;
		case 5:
			dayStr = "五";
			break;
		case 6:
			dayStr = "六";
			break;
		case 7:
			dayStr = "日";
			break;
		default:
			break;
	}
	return dayStr;
}

/**
 * 获取当前学年
 */
function getStuYear(){
	var now = new Date();
	var month = now.getMonth()+1;
	if(month<9){
		return now.getFullYear()-1;
	}else{
		return now.getFullYear();
	}
}

/**
 * 获取当前学期
 */
function getTerm(){
	var now = new Date();
	var month = now.getMonth()+1;
	if(month < 9 && month > 2){
		return "2";
	}else{
		return "1";
	}
}

/**
 * 初始化学年学期
 */
function initYearTerm(){
	var stuYearHtml = '<option value="">请选择</option>';
	var termHtml = '<option value="">请选择</option>';
	$.each(stuYearArr,function(i,o){
		stuYearHtml+= '<option value="'+o+'">'+o+'</option>';
	})
	$.each(termArr,function(i,o){
		termHtml+= '<option value="'+o.id+'">'+o.name+'</option>';
	})
	$('#sel_year').html(stuYearHtml);
	$('#sel_term').html(termHtml);
	$('#sel_year').val(getStuYear());
	$('#sel_term').val(getTerm());
}

//获取参数
function getParameter(param){
	var query = window.location.search;
	var iLen = param.length;
	var iStart = query.indexOf(param);
	if (iStart == -1){
		return "";
	}
	iStart += iLen + 1;
	var iEnd = query.indexOf("&", iStart);
	if (iEnd == -1){
		return query.substring(iStart);
	}
	return decodeURI(query.substring(iStart, iEnd));
}

function goIndex(){
	if(getParameter('schoolId')==null||getParameter('schoolId')==''){
		window.location.href = portalIp;
		return false;
	}
	window.location.href = '/goClass/index.html'
		+'?schoolId='+getParameter('schoolId')
		+'&areaCode='+getParameter('areaCode')
		+'&createId='+getParameter('createId')
		+'&createName='+getParameter('createName')
		+'&schoolYear='+getParameter('schoolYear')
		+'&semester='+getParameter('semester');
}

function addParams(url){
	if(getParameter('schoolId')==null||getParameter('schoolId')==''){
		window.location.href = portalIp;
		return false;
	}
	return url+='&schoolId='+getParameter('schoolId')
			+'&areaCode='+getParameter('areaCode')
			+'&createId='+getParameter('createId')
			+'&createName='+getParameter('createName')
			+'&schoolYear='+getParameter('schoolYear')
			+'&semester='+getParameter('semester');
}


//退出登录
function loginOut(){
	$.ajax({
		url: jetsenCourseIp+"/loginController/logout.do",
		dataType:"json",
		success:function(url){
			window.location.href = url;
		}
	})
}
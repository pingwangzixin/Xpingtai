var serverIp = 'http://111.207.13.88:8892/JetsenNewNEMT';
//var serverIp = 'http://localhost:8080/JetsenNewNEMT';
var jetsenCourseIp = 'http://111.207.13.88:8892/JetsenCourse';
var ucServerIp = 'http://111.207.13.88:8881/jeuc';
var portalIp = 'http://111.207.13.88:8883/#/wrap/index#top';
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
		case 'repair':
			msg = '设置补选成功';
			break;
		case 'divide':
			msg = '分班成功';
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
		case 'repair':
			msg = '设置补选失败';
			break;
		case 'divide':
			msg = '分班失败';
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

function goClassify(){
	if(getParameter('schoolId')==null||getParameter('schoolId')==''){
		window.location.href = portalIp;
		return false;
	}
	window.location.href = '/goClass/classify.html'
		+'?schoolId='+getParameter('schoolId')
		+'&areaCode='+getParameter('areaCode')
		+'&createId='+getParameter('createId')
		+'&createName='+getParameter('createName')
		+'&schoolYear='+getParameter('schoolYear')
		+'&semester='+getParameter('semester');
}

function goClassHtml(){
	if(getParameter('schoolId')==null||getParameter('schoolId')==''){
		window.location.href = portalIp;
		return false;
	}
	window.location.href = 'class.html'
		+'?schoolId='+getParameter('schoolId')
		+'&areaCode='+getParameter('areaCode')
		+'&createId='+getParameter('createId')
		+'&createName='+getParameter('createName')
		+'&schoolYear='+getParameter('schoolYear')
		+'&semester='+getParameter('semester');
}

$(function(){
	if(getParameter('schoolId')==null||getParameter('schoolId')==''){
		window.location.href = portalIp;
		return false;
	}
	$('#createName').html(getParameter('createName'));
})


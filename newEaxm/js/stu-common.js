var serverIp = 'http://111.207.13.88:8892/JetsenNewNEMT';
//var serverIp = 'http://localhost:8080/JetsenNewNEMT';
var jetsenCourseIp = 'http://111.207.13.88:8892/JetsenCourse';
var ucServerIp = 'http://47.93.207.20:9037/jeuc';
var portalIp = 'http://111.207.13.88:8883/#/wrap/index#top';

var classSelArr = [{id:'sel_class'},{id:'wx_class_sel',className:'wxstu_tr'},{id:'show_stu_list_sel',className:'show_tr'}];

var gradeTotalMap = {};

var showStuClassId = '';
var showStuIds = '';

var stuYearArr = ['2017','2018'];
var termArr = [{id:1,name:'第一学期'},{id:2,name:'第二学期'}]
/**
 * 拼接进度
 */
function appendProgress(dataList){
	$.each(dataList, function(index,item) {
//		findStuByGradeId(item);
		if(typeof(gradeTotalMap[item.gradeId])=="undefined"){
			findStuByGradeId(item);
		}else{
			appendData(item,gradeTotalMap[item.gradeId]);
		}
	});
}

/**
 * 计算进度
 * @param {Object} total
 * @param {Object} yxNum
 */
function jsProgress(total,yxNum){
	if(typeof(total)!="undefined"){
		var pro = (yxNum/total)*100;
		if(total == 0 || yxNum == 0){
			pro = 0;
		}
		return pro.toFixed(2)+'%';
	}else{
		return 0.00+'%';
	}
	
}

/**
 * 时间判断
 * @param {Object} time
 */
function compareTime(time){
	var flag = true;
	time = time.replace(/-/g,"-");//替换字符，变成标准格式  
	var now=Date.parse(new Date().Format('yyyy-MM-dd'));//取今天的日期  
	var endTime = Date.parse(time);  
	if(now>endTime){  
	  flag = false;
	} 
	return flag;
}

/**
 * 查询该年级下所有学生
 */
function findStuByGradeId(item){
	$('#show_check_'+item.id).data('total',0);
	$.ajax({
		type:"get",
		url: ucServerIp + "/api/uc/ucUser",
		data:{gradeId:item.gradeId,userType:'2',delFlag:'0',pageSize:1,pageNo:1},
		sync:false,
		success:function(resJson){
			var perNum = 0;
			if(resJson.ret==200){
				perNum = resJson.data.count;
			}
			gradeTotalMap[item.gradeId]=perNum;
			appendData(item,perNum);
		}
	});
}

/**
 * 拼接数据
 */
function appendData(item,perNum){
	var yxNum = item.progress.electiveCourse;
	var progress = jsProgress(perNum,yxNum);
	$('#pro_'+item.id).css('width',progress);
	$('#pro_str_'+item.id).html(progress);
	$('#pro_show_'+item.id).data('wxNum',perNum==0?0:perNum-yxNum);
	$('#pro_show_'+item.id).data('total',perNum);
	$('#pro_show_'+item.id).data('yxNum',yxNum);
	$('#pro_show_'+item.id).data('gradeName',item.gradeName);
	$('#pro_show_'+item.id).data('style',item.style);
	$('#pro_show_'+item.id).data('subId',item.id);
	$('#show_check_'+item.id).data('total',perNum);
}

/**
 * 查询班级
 */
function findClass(gradeId){
	$.each(classSelArr, function(i,s) {
		$('#'+s.id).empty();
		$('#'+s.id).append('<option value="">全部</option>');
	});
	$.ajax({
		type:"get",
		url:ucServerIp + '/api/ea/eaClass',
		data:{gradeId:gradeId},
		success:function(resJson){
			if(resJson.ret==200){
				var classList = resJson.data;
				var html = ''
				$.each(classList, function(index,item) {
					html+='<option value="'+item.id+'">'+item.name+'班</option>';
				});
				$.each(classSelArr, function(i,s) {
					$('#'+s.id).append(html)
					if(s.id!='sel_class'){
						$('#'+s.id).on('change',function(){
							if($(this).val()==''){
								$('.'+s.className).show();
							}else{
								$('.'+s.className).hide();
								$('.'+s.className+'_'+$(this).val()).show();
							}
							if(s.id=='show_stu_list_sel'){
								showStuClassId=$(this).val();
								addExportStudentHref('export_stuList','stuList');
							}
						})
					}
				});
			}
		}
	});
	
}

/**
 * 查询进度
 */
function findProgress(data){
	$.ajax({
		type:"get",
		url:serverIp + "/selectsub",
		data:{isProgress:'true',id:data.subId,style:data.style},
		success:function(resJson){
			if(resJson.code==200){
				var resList = resJson.data;
				$.each(resList, function(index,item) {
					$('#pro_list').append('<span>'+item.name+'   已选'+item.count+'人</span>');
				});
			}
		}
	});
	
}

//查看进度
function checkPro(obj){
	
	$('#pro_list').empty();
	$('#pro_grade').html('选科年级：'+obj.gradeName);
	$('#pro_total').html('总选科人数：'+obj.total+'人');
	$('#pro_yx').html('已选科人数：'+obj.electiveCourse+'人');
	$('#pro_wx').html('未选科人数：'+obj.nonElectiveCourse+'人');
	var data = {subId:obj.subId,style:obj.style}
	findProgress(data);
	$('#progess').show();
	
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

//激活添加按钮
function activeInsertBtn(){
	$(".addsub_gruop_insert_btn").attr('disabled',false);
	$('.addsub_gruop_insert_btn').removeClass('wx_noaccess_btn');
	$('.addsub_gruop_insert_btn').addClass('wx_sure_btn');
}

//取消添加按钮
function cancelInsertBtn(){
	$(".addsub_gruop_insert_btn").attr('disabled',true);
//	$('.addsub_gruop_insert_btn').removeAttr("onclick");
	$('.addsub_gruop_insert_btn').removeClass('wx_sure_btn');
	$('.addsub_gruop_insert_btn').addClass('wx_noaccess_btn');
}
/**
 * 取消按钮
 * @param tem
 */
function cancel(dialogId){
	 $('#'+dialogId).hide()
}

/**
 * 弹出删除提示窗
 */
function deleteTips(id,delFunction){
	  $('#deleteTips').show();
	  $('#deleteTipsYesBtn').unbind("click");
	  $('#deleteTipsYesBtn').on('click',function(){
	  		delFunction(id);
	  		$('#deleteTips').hide();
	  })
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
	$('#schoolYear').html(stuYearHtml);
	$('#term').html(termHtml);
	$('#schoolYear').val(getStuYear());
	$('#term').val(getTerm());
}

$(function(){
//	initYearTerm();
})


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

function goClassHtml(){
	/*if(getParameter('schoolId')==null||getParameter('schoolId')==''){
		window.location.href = portalIp;
		return false;
	}*/
	window.location.href = 'class.html'
		+'?schoolId='+getParameter('schoolId')
		+'&areaCode='+getParameter('areaCode')
		+'&createId='+getParameter('createId')
		+'&createName='+getParameter('createName')
		+'&schoolYear='+getParameter('schoolYear')
		+'&semester='+getParameter('semester');
}

$(function(){
	/*if(getParameter('schoolId')==null||getParameter('schoolId')==''){
		window.location.href = portalIp;
		return false;
	}*/
	$('#createName').html(getParameter('createName'));
})

/**
 * 格式化日期
 * @param {Object} fmt
 */
Date.prototype.Format = function(fmt) {
    var o = {
        "M+" : this.getMonth() + 1,
        "d+" : this.getDate(),
        "h+" : this.getHours(),
        "m+" : this.getMinutes(),
        "s+" : this.getSeconds(),
        "q+" : Math.floor((this.getMonth() + 3) / 3),
        "S" : this.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
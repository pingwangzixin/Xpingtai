var oneSubList = [];
var gradeStuList = [];
var subId = getRequest().subId; //sessionStorage.getItem('subId');
var total =  0;//getRequest().total; //sessionStorage.getItem('total');
var gradeId = '';//getRequest().gradeId; //sessionStorage.getItem('gradeId');
var name = '';//getRequest().name; //sessionStorage.getItem('name');
var yxStuMap = {};
var optType = 'insert';
var stuSubId = '';
var oneTime = true;
var initTime = true;
var yxPerNum = 0;
var baseData = {
	stuId: '',
	stuName: '',
	classId: '',
	className:''
}
$(function(){
	//tab切换
	$('.mlh_check a').click(function(){
		var index = $(this).index();
		var tabType = $(this).data('type');
		if(tabType =='sub'){
			findStuSubList()
		}else if(tabType =='stu'){
     		findOneSub();
		}else{
			findSubGroupList();
		}
		$('.mlh_check a').removeClass('active').eq(index).addClass('active');
		$('.mlh_student').hide().eq(index).show();
	});

	$('.mlh_tc .mlh_close').click(function(){
        $('#adjust').hide();
        $('#check').hide();
        $('#wxstu_dialog').hide();
    });
    $('.adjust .cancel').click(function(){
        $('#adjust').hide();
    });
    $(window).scroll(function(e){
        e.preventDefault();
    });
    //调整科目
    $('#kemu .mlh_btn').click(function(){
    	var index = $(this).index();
		$('#kemu a').removeClass('active').eq(index).addClass('active');
    });
     initSubInfo();
})
/**
 * 添加按学生导入选科连接
 */
function addExportStudentHref(className,type){
	var params = {};
	switch (type){
		case 'student':
			params = {selectSubId:subId,classId:$('#sel_class').val(),stuName:$('#stu_name_input').val()};
			break;
		case 'subject':
			params = {selectSubId:subId,subId:$('#sub_sel').val()};
			break;
		case 'group':
			params = {subjectId:subId,total:total};
			break;
		case 'stuList':
			params = {subIds:showStuIds,selectSubId:subId,classId:showStuClassId};
			break;
		default:
			break;
	}
	$('.'+className).attr('href',serverIp + '/selectsub?export=true&type='+type+'&fileName='+$('.sel_sub_name').html()+'&data='+JSON.stringify(params));
}


/**
 * 查看未选名单
 */
function showWxStu(){
	$('#wx_class_sel').val('');
	$('#wx_stu_tbody').empty();
	$('#wxstu_dialog').show();
	findWxStu(false);
}

/**
 * 查询未选学生
 */
function findWxStu(initTime){
	var temData = {gradeId:gradeId,userType:'2',delFlag:'0'};
	if(initTime){
		temData = $.extend(true, temData, {pageSize:0,pageNo:1});
	}
	$.ajax({
		type:"get",
		url: ucServerIp + "/api/uc/ucUser",
		data:temData,
		success:function(resJson){
			var perNum = 0;
			if(resJson.ret==200){
				perNum = resJson.data.count;
				$.each(resJson.data.list, function(index,stuItem) {
					if(typeof(yxStuMap[stuItem.id])=="undefined"){
						$('#wx_stu_tbody').append('<tr class="wxstu_tr wxstu_tr_'+stuItem.classId+'" id="wxstu_'+stuItem.id+'"></tr>');
						$('#wx_stu_tbody #wxstu_'+stuItem.id).append('<td>'+stuItem.stuName+'</td>');
						$('#wx_stu_tbody #wxstu_'+stuItem.id).append('<td>'+stuItem.className+'班</td>');
						$('#wx_stu_tbody #wxstu_'+stuItem.id).append('<td><a id="adjust_'+stuItem.id+'" href="javascript:;" onclick="adjustClick(this)">调整</a></td>');
						$('#adjust_'+stuItem.id).data('stuId',stuItem.id);
						$('#adjust_'+stuItem.id).data('stuName',stuItem.stuName);
						$('#adjust_'+stuItem.id).data('className',stuItem.className+'班');
						$('#adjust_'+stuItem.id).data('classId',stuItem.classId);
					}
				});
			}
			if(initTime){
				total = perNum;
				appendProNum(yxPerNum);
			}
		}
	});
	
	
}

/**
 * 查询组合下的学生
 */
function findGroupStuList(ids){
	$('#show_stu_list_sel').val('');
	$('#check').show();
	$('#table_group_stu_tbody').empty();
	showStuIds = ids;
	showStuClassId = '';
	addExportStudentHref('export_stuList','stuList');
	$.ajax({
		type:"get",
		url:serverIp + "/stuselectsub",
		data:{subIds:ids,selectSubId:subId},
		success:function(resJson){
			if(resJson.code==200){
				var resList = resJson.data;
				$.each(resList, function(index,item) {
					$('#table_group_stu_tbody').append('<tr id="show_'+item.id+'_'+item.stuId+'" class="show_tr show_tr_'+item.classId+'"></tr>');
					$('#table_group_stu_tbody #show_'+item.id+'_'+item.stuId).append('<td>'+item.subNames+'</td>');
					$('#table_group_stu_tbody #show_'+item.id+'_'+item.stuId).append('<td>'+item.stuName+'</td>');
					$('#table_group_stu_tbody #show_'+item.id+'_'+item.stuId).append('<td>'+item.className+'</td>');
				});
			}
		}
	});
}

/**
 * 查询科目组
 */
function findSubGroupList(){
	$('#group_table_tbody').empty();
	showStuClassId = '';
	addExportStudentHref('export_group','group');
	addExportStudentHref('export_group_batch','stuList')
	$.ajax({
		type:"get",
		url:serverIp + "/threesub",
		data:{group:true,subjectId:subId},
		success:function(resJson){
			if(resJson.code==200){
				var resList = resJson.data;
				$.each(resList, function(index,item) {
					$('#group_table_tbody').append('<tr id="group_'+item.id+'"></tr>');
					$('#group_table_tbody #group_'+item.id).append('<td>'+(index+1)+'</td>');
					$('#group_table_tbody #group_'+item.id).append('<td>'+item.name+'</td>');
					$('#group_table_tbody #group_'+item.id).append('<td>'+item.count+'</td>');
					$('#group_table_tbody #group_'+item.id).append('<td>'+jsProgress(total,item.count)+'</td>');
					$('#group_table_tbody #group_'+item.id).append('<td><a href="javascript:findGroupStuList(\''+item.ids+'\');" class="list">查看名单</a></td>');
				});
			}
		}
	});
	
}

/**
 * 查询学生科目列表
 */
function findStuSubList(){
	$('#sub_table_tbody').empty();
	addExportStudentHref('export_subject','subject');
	$.ajax({
		type:"get",
		url:serverIp + "/onesub",
		data:{selectSubId:subId,subId:$('#sub_sel').val()},
		success:function(resJson){
			if(resJson.code==200){
				var resList = resJson.data;
				$.each(resList, function(index,item) {
					$('#sub_table_tbody').append('<tr id="sub_'+item.subId+'_'+item.stuId+'"></tr>');
					$('#sub_table_tbody #sub_'+item.subId+'_'+item.stuId).append('<td>'+(index+1)+'</td>');
					$('#sub_table_tbody #sub_'+item.subId+'_'+item.stuId).append('<td>'+item.subName+'</td>');
					$('#sub_table_tbody #sub_'+item.subId+'_'+item.stuId).append('<td>'+item.stuName+'</td>');
					$('#sub_table_tbody #sub_'+item.subId+'_'+item.stuId).append('<td>'+item.className+'</td>');
				});
			}
		}
	});
}

/**
 * 查询单科科目
 */
function findOneSub(){
	$.ajax({
		type: "get",
		url: serverIp + "/onesub",
		data: {},
		success: function(resJson) {
			if(resJson.code == 200) {
				var subHtml = '<option value="">全部</option>';
				var html = '<td>序号</td><td>班级</td><td>姓名</td>';
				$.each(resJson.data, function(index,item) {
					html += '<td id="col_'+item.id+'">'+item.name+'</td>';
					subHtml += '<option value="'+item.id+'">'+item.name+'</option>'
				});
				html += '<td>操作</td>';
				$('#stu_table_title').html(html);
				if(oneTime){
					$('#sub_sel').html(subHtml);
					$('#sub_sel').on('change',function(){
						findStuSubList();
					})
					oneTime = false;
				}
				oneSubList = resJson.data;
				findYxStu('');
			} else {

			}
		}
	});
}

/**
 * 查询学生
 */
//function findStu(){
//	$('#stu_table_tbody').empty();
//	var classIdParams = $('#sel_class').val();
//	var stuNameParams = $('#stu_name_input').val();
//	var stuList = [{name:'zxl',id:'1',className:'1201',classId:'1'},{name:'tzy',id:'2',className:'1201',classId:'1'},{name:'gyc',id:'3',className:'1201',classId:'1'},{name:'gll',id:'4',className:'1201',classId:'1'}];
//	$.each(stuList, function(index,item) {
//		$('#stu_table_tbody').append('<tr id="stu_'+item.id+'">');
//		$('#stu_table_tbody').append('<td>'+(index+1)+'</td>');
//		$('#stu_table_tbody').append('<td>'+item.className+'</td>');
//		$('#stu_table_tbody').append('<td>'+item.name+'</td>');
//		$.each(oneSubList,function(sIndex,sItem){
//			$('#stu_table_tbody').append('<td id="stu_'+item.id+'_'+sItem.id+'">---</td>');
//		})
//		$('#stu_table_tbody').append('<td><a id="adjust_'+item.id+'" href="javascript:;" onclick="adjustClick(this)" class="adjustment">调整</a></td>');
//		$('#stu_table_tbody').append('</tr>');
//		
//		$('#adjust_'+item.id).data('stuId',item.id);
//		$('#adjust_'+item.id).data('stuName',item.name);
//		$('#adjust_'+item.id).data('className',item.className);
//		$('#adjust_'+item.id).data('classId',item.classId);
//	});
//	findYxStu();
//}

/**
 * 查询已选科学生
 */
function findYxStu(sxType){
	$('#stu_table_tbody').empty();
	var stuNameParams = $('#stu_name_input').val();
	addExportStudentHref('export_student','student');
	$.ajax({
		type: "get",
		url: serverIp + "/stuselectsub",
		data: {selectSubId:subId,classId:$('#sel_class').val(),stuName:stuNameParams},
		success: function(resJson) {
			var perNum = 0;
			if(resJson.code == 200) {
				var stuList = resJson.data;
				perNum = stuList.length;
				$.each(stuList, function(index,item) {
					yxStuMap[item.stuId]=item.stuId;
					$('#stu_table_tbody').append('<tr id="stu_'+item.stuId+'"></tr>');
					$('#stu_table_tbody #stu_'+item.stuId).append('<td>'+(index+1)+'</td>');
					$('#stu_table_tbody #stu_'+item.stuId).append('<td>'+item.className+'</td>');
					$('#stu_table_tbody #stu_'+item.stuId).append('<td>'+item.stuName+'</td>');
					$.each(oneSubList,function(sIndex,sItem){
						var limt = item.subIds.split(',').length;
						var ic = limt;
						$.each(item.subIds.split(','), function(o,s) {
							if(sItem.id==s){
								$('#stu_table_tbody #stu_'+item.stuId).append('<td id="stu_'+item.stuId+'_'+sItem.id+'"><i class="iconfont icon-duihao"></i></td>');
								ic --;
								return;
							}
						});
						if(limt == ic){
							$('#stu_table_tbody #stu_'+item.stuId).append('<td id="stu_'+item.stuId+'_'+sItem.id+'">---</td>');
						}
					})
					$('#stu_table_tbody #stu_'+item.stuId).append('<td><a id="adjust_'+item.stuId+'" href="javascript:;" onclick="adjustClick(this)" class="adjustment">调整</a></td>');
					
					$('#adjust_'+item.stuId).data('stuId',item.stuId);
					$('#adjust_'+item.stuId).data('stuName',item.stuName);
					$('#adjust_'+item.stuId).data('className',item.className);
					$('#adjust_'+item.stuId).data('classId',item.classId);
					$('#adjust_'+item.stuId).data('ids',item.subIds);
					$('#adjust_'+item.stuId).data('stuSubId',item.id);
				});
				/*$.each(resJson.data, function(index,item) {
					$.each(item.subIds.split(','), function(o,s) {
						$('#stu_'+item.stuId+'_'+s).html('<i class="iconfont icon-duihao"></i>');
					});
					$('#adjust_'+item.stuId).data('ids',item.subIds);
					$('#adjust_'+item.stuId).data('stuSubId',item.id);
				});*/
			} else {
			}
			yxPerNum = perNum;
			if(initTime){
				findWxStu(initTime);
				initTime = false;
//				appendProNum(perNum);
			}
			if(sxType=='adjust'){
				appendProNum(perNum);
			}
			
		}
	});
	
	
}

/**
 * 拼接人数
 * @param {Object} perNum
 */
function appendProNum(perNum){
	total = typeof(total)=="undefined"?0:total;
	$('#yxNum').html('已选科人数   '+perNum+'人');
	$('#totalNum').html('总选科人数   '+total+'人');
	var wxNum = total==0?0:total-perNum;
	$('#wxNum').html('未选科人数     '+wxNum+'人');
	$('.special_color').html(wxNum);
}

/**
 * 调整按钮
 */
function adjustClick(obj){
	baseData.stuId = $(obj).data('stuId');
	baseData.stuName = $(obj).data('stuName');
	baseData.className = $(obj).data('className');
	baseData.classId = $(obj).data('classId');
	if(typeof($(obj).data('stuSubId'))!= "undefined"){
		stuSubId = $(obj).data('stuSubId');
		optType = 'update';
		activeInsertBtn();
	}else{
		optType = 'insert';
		stuSubId = '';
		cancelInsertBtn();
	}
	$('#adjust').show();
	$('#dialog_adjust_className').html('班&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级：'+$(obj).data('className'));
	$('#dialog_adjust_stuName').html('学生姓名：'+$(obj).data('stuName'));
	findSubGroup($(obj).data('ids'))
}

/**
 * 根据选科id查询科目组
 */
function findSubGroup(ids){
	$.ajax({
		type: "get",
		url: serverIp + "/selectsub/"+subId,
		data: {},
		success: function(resJson) {
			if(resJson.code == 200) {
				var html = '';
				$.each(resJson.data.threeSubList, function(index,item) {
					if(ids == item.ids){
						html += '<a href="javascript:;" data-ids="'+item.ids+'" data.names="'+item.names+'" class="mlh_btn kemu active">'+item.name+'</a>';
					}else{
						html += '<a href="javascript:;" data-ids="'+item.ids+'" data.names="'+item.names+'" class="mlh_btn kemu">'+item.name+'</a>';
					}
						
				});
				$('#kemu').html(html);
				$('#kemu a').click(function(){
					$('#kemu a').removeClass('active');
					$(this).addClass("active");
					if($('#kemu .active').length==1){
						activeInsertBtn()
					}else{
						cancelInsertBtn()
					}
				})
			} else {

			}
		}
	});
}

/**
 * 根据选科id查询科目组
 */
function initSubInfo(){
	$.ajax({
		type: "get",
		url: serverIp + "/selectsub/"+subId,
		async:false,
		data: {},
		success: function(resJson) {
			if(resJson.code == 200) {
//				var html = '选科名称：'+resJson.data.name;
				$('.sel_sub_name').html(resJson.data.name);
				gradeId = resJson.data.gradeId;
				findClass(resJson.data.gradeId);
				findOneSub();
			} else {

			}
		}
	});
}

/**
 * 保存调整
 */
function adjustSave(){
	if($('#kemu .active').length<=0){
		return;
	}
	var data = {};
	data['subIds'] = $('#kemu .active').eq(0).data('ids');
	data['subNames'] = $('#kemu .active').eq(0).text();
	data['selectSubId'] = subId;
	data['style'] = 2;
	var requestType = optType=='insert'?'post':'put';
	var requestUri = optType=='insert'?serverIp + "/stuselectsub":serverIp + "/stuselectsub/"+ stuSubId;
	$.ajax({
		type:requestType,
		url:requestUri,
		data: {
			subJson: JSON.stringify($.extend(true, baseData, data))
		},
		success:function(resJson){
			if(resJson.code==200){
				$('#adjust').hide();
				if(optType=='insert'){
					$('#wx_stu_tbody tr[id=wxstu_'+baseData.stuId+']').remove()
				}
				findYxStu('adjust');
				successTips('adjust');
			}
		}
	});
}

function goStudentSelection(){
	if(getParameter('schoolId')==null||getParameter('schoolId')==''){
		window.location.href = portalIp;
		return false;
	}
	window.location.href='Student-selection.html?schoolId='+getParameter('schoolId')
		+'&createId='+getParameter('createId')
		+'&createName='+getParameter('createName')
		+'&schoolYear='+getParameter('schoolYear')
		+'&semester='+getParameter('semester');
}

var clickFlag = true;
var optType = 'insert';
var baseData = {
	schoolId: getParameter('schoolId'),
	createId: getParameter('createId'),
	createName: getParameter('createName'),
	schoolYear: getParameter('schoolYear'),
	semester: getParameter('semester')
}

var ofile=document.getElementById('ofile');
var oshow=document.getElementById('show');
ofile.onchange=function(e){
    var name=e.currentTarget.files[0].name;
    oshow.innerHTML=name;
}

$(function(){
	//初始化加载选科列表
	findSub() ;
	//新建选科
	$('.create_sub_btn').click(function() {
		$('#sub_id').val('');
		optType = 'insert';
		$('#sub_form')[0].reset();
		$('#edit .mlh_tc .title span').html('新建选科');
		$('#edit').show().find('.mlh_tc').height(500);
		$('#edit').show().find('.mlh_tc .table').height(410);
		$(".sanke").hide();
		$('.zzz').empty();
		findOneSub();
		findGrade('');
	})
	//保存选科
	$('#subSave').click(function() {
		insertSub();
	})
	//tab切换
	$('.mlh_check a').click(function(){
		var index = $(this).index();
		$('.mlh_check a').removeClass('active').eq(index).addClass('active');
		$('.mlh_student').hide().eq(index).show();
	});
	//点击弹窗
	$('.adjustment').click(function(){
		$('#adjust').show();
	});
	$('.mlh_tc .mlh_close').click(function(){
        $('#adjust').hide();
        $('#check').hide();
        $('#election').hide();
        $('#edit').hide();
        $('#progess').hide();
        $('#mlh_class').hide();
        $('#mlh_edit').hide();
        $('#import').hide();
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
    //查看名单
    $('.list').click(function(){
    	$('#check').show();
    });
    $(".checkbox label").click(function () {
        var theI = $(this).index();
        var selMumMsg = '允许学生任意选择3门科目';
        if(theI==0){
          $(".danke").show().parents('.mlh_tc').height(500);  
          $(".danke").show().parents('.mlh_tc .table').height(410);
          $(".sanke").hide();
        }else if(theI==1){
        	selMumMsg = '允许学生任意选择1个科目组';
           $(".danke").hide();  
		   $(".tzy").hide();  
           $(".tzy1").show(); 
        }else{
			$(".danke").hide();
			$(".tzy").show(); 
			$(".tzy1").hide();
			selMumMsg = '允许学生从12中组合中任意选择1个科目组';
			
		}    
        $('#selMumMsg').html(selMumMsg);
    });
    $('.tc_button .cancel').click(function(){
        $('#progess').hide();
    });
    //删除行
    $(".del a").click(function() {
        var link = $(this).parents(".table-tr");  
        link.remove();  
    });
    //添加科目组合按钮
	$('.addsub_group_btn').click(function(){
		$(".select_sub_gruop").show().parents('.mlh_tc').height("100%");
		$(".select_sub_gruop").show().parents('.mlh_tc .table').height(590);
	})
	//添加科目组合关闭按钮
	$('.addsub_gruop_close_btn').click(function(){
		$(".select_sub_gruop").hide().parents('.mlh_tc').height(500);
		$(".select_sub_gruop").hide().parents('.mlh_tc .table').height(410);
	})
	
	//学年查询
	$('#schoolYear').change(findSub)
	//学期查询
	$('#term').change(findSub)
})

//编辑按钮点击事件
function editClick(data){
	$('#edit .mlh_tc .title span').html('编辑选科');
	 var selMumMsg = '允许学生任意选择3门科目';
	optType = 'update';
	findOneSub();
	findGrade(data.gradeId);
	$('#sub_id').val(data.id);
	$('.zzz').empty();
	$('#subName').val(data.name);
	$('#startTime').val(data.startTime);
	$('#endTime').val(data.endTime);
	$(":radio[name='style'][value='" + data.style + "']").prop("checked", "checked");
	if(data.style==2){
		selMumMsg = '允许学生任意选择1个科目组';
		$.each(data.threeSubList, function(index,item) {
			$(".checkbox label").click();
			$('.zzz').append('<span class="mlh_btn selected" data-ids="'+item.ids+'" data-names="'+item.names+'">'+item.name+'<i class="iconfont icon-ICon- del_sub_goup"></i></span>');
		});
		$('.del_sub_goup').click(function(){
			$(this).parent().remove();
		})
	}
	$('#selMumMsg').html(selMumMsg);
	$('#edit').show().find('.mlh_tc').height(500);
	$('#edit').show().find('.mlh_tc .table').height(410);
}

/**
 * 点击查看按钮
 * @param {Object} obj
 */
function showCheck(obj){
//	sessionStorage.setItem('subId',$(obj).data('subid'));
//	sessionStorage.setItem('total',$(obj).data('total'));
//	sessionStorage.setItem('gradeId',$(obj).data('gradeid'));
//	sessionStorage.setItem('name',$(obj).data('name'));
//+'&total='+$(obj).data('total')+'&gradeId='+$(obj).data('gradeid')+'&name='+$(obj).data('name');
	if(getParameter('schoolId')==null||getParameter('schoolId')==''){
		window.location.href = portalIp;
		return false;
	}
	window.location.href='check.html?subId='+$(obj).data('subid')
						+'&schoolId='+getParameter('schoolId')
						+'&createId='+getParameter('createId')
						+'&createName='+getParameter('createName')
						+'&schoolYear='+getParameter('schoolYear')
						+'&semester='+getParameter('semester');
}

/**
 * 查询年级
 */
function findGrade(graParam) {
	$('#grade_select').html('');
	$.ajax({
		type:"get",
		url:ucServerIp +'/api/ea/eaGrade',
		data:{officeId:baseData.schoolId},
		success:function(resJson){
			if(resJson.ret==200){
				var gradeList = resJson.data;
				var gradeOpts = '';
				$.each(gradeList, function(index, item) {
					gradeOpts += '<option value="' + item.gradeId + '">' + item.gradeName + '</option>';
				});
				$('#grade_select').html(gradeOpts);
				if(graParam!=''){
					$('#grade_select').val(graParam);
				}
			}
		}
	});
	
}

/**
 * 添加选科
 */
function insertSub() {
	var data = {};
	var formData = $("#sub_form").serializeArray();
	$.each(formData, function(index,item) {
		data[item.name] = item.value;
	});
	
	data.name = data.name.trim();
	if(data.name==''){
		warnTips('请输入名称');
		return;
	}
	if(data.name.length > 30){
		warnTips('名称需在30字符以内');
		return;
	}
	if(data.startTime==''){
		warnTips('请选择开始时间');
		return;
	}
	if(data.endTime==''){
		warnTips('请选择结束时间');
		return;
	}
	if(data.style==2){
		var groupList = [];
		$('.zzz span').each(function(i){
			var group = {};
			group['ids'] = $(this).data('ids');
			group['name'] = $(this).text();
			group['names'] = $(this).data('names');
			groupList.push(group);
		})
		if(groupList<=0){
			warnTips('请添加一组科目组');
			return;
		}
		data['threeSubList']=groupList;
	}
	if(data.style==3){
		var groupList = [];
		$('.ttt span').each(function(i){
			var group = {};
			group['ids'] = $(this).data('ids');
			group['name'] = $(this).text();
			group['names'] = $(this).data('names');
			groupList.push(group);
		})
		data['threeSubList']=groupList;
	}
	data['gradeName'] = $("#grade_select").find("option:selected").text();
	data['schoolYear'] = $('#schoolYear').val();
	data['semester'] = $('#term').val();
	var requestType = optType=='insert'?'post':'put';
	var requestUri = optType=='insert'?serverIp + "/selectsub":serverIp + "/selectsub/"+ $('#sub_id').val();
	$.ajax({
		type: requestType,
		url: requestUri,
		data: {
			subJson: JSON.stringify($.extend(true, data,baseData ))
		},
		success: function(resJson) {
			if(resJson.code == 200) {
				$('#edit').hide();
				findSub();
				successTips(optType);
			} else {
				warnTips(resJson.message);
			}
		}
	});

}

/**
 * 查询选科
 */
function findSub() {
	var semester  = $('#term').val()
	var schoolYear = $('#schoolYear').val();
	$.ajax({
		type: "get",
		url: serverIp + "/selectsub",
		data: {schoolYear:schoolYear,semester:semester, createId: baseData.createId},
		success: function(resJson) {
			if(resJson.code == 200) {
				if(resJson.data.length>0){
					$('#sub_table').html(appendList(resJson.data));
				}else{
					$('#sub_table').html('');
				}
//				appendProgress(resJson.data);
			} else {
				$('#sub_table').html('');
				warnTips('暂无数据');
			}
		}
	});
}

/**
 * 补选事件
 */
function repairClick(data){
	$('#repair_title').html(data.name);
	$('#repair_num').html(data.progress.total);
	$('#repair_startTime').val(data.startTime);
	$('#repair_endTime').val(data.endTime);
	$('#repair_subId').val(data.id);
	var html = '';
	$.each(data.threeSubList, function(index,item) {
		html+='<a href="javascript:;" data-num="'+item.count+'" data-id="'+item.id+'" data-ids="'+item.ids+'" data-names="'+item.names+'" class="mlh_btn kemu_btn unchecked">'+item.name+'('+item.count+')</a>';
	});
	$('.checked-zuhe').empty();
	$('.checked-zuhe').html('已选组合：');
	$('#repair_group').html(html);
	$('#repair_group a').click(function(){
		if($(this).hasClass('active')){
			var reg = new RegExp(",","g");
			$(this).removeClass('active');
			$(this).addClass('unchecked');
			$('#repair_'+$(this).data('id')).remove();
			$('#repair_num').html(parseInt($('#repair_num').html())+$(this).data('num'));
		}else{
			$(this).addClass('active');
			$(this).removeClass('unchecked');
			$('.checked-zuhe').append('<span id="repair_'+$(this).data('id')+'">'+$(this).text()+'</span>');
			$('#repair_num').html(parseInt($('#repair_num').html())-$(this).data('num'));
		}
			
	})
	$('#election').show();
}

/**
 * 补选保存
 */
function repairSave(){
	var repairId = $('#repair_subId').val();
	var startTime = $('#repair_startTime').val();
	var endTime = $('#repair_endTime').val();
	var uncheckedGroup = [];
	$('.unchecked').each(function(){
		uncheckedGroup.push({id:$(this).data('id'),ids:$(this).data('ids'),subjectId:repairId})
	})
	if(startTime==''){
		warnTips('请选择开始时间');
		return;
	}
	if(endTime==''){
		warnTips('请选择结束时间');
		return;
	}
	
	if($('#repair_group .active').length<=0){
		warnTips('请选择补选科目组合');
		return;
	}
	var data = {startTime:startTime,endTime:endTime,threeSubList:uncheckedGroup}
	$.ajax({
		type:"put",
		url:serverIp + "/selectsub/"+ repairId,
		data: {
			subJson:JSON.stringify(data),
			isRepair:true
		},
		success:function(resJson){
			if(resJson.code==200){
				$('#election').hide();
				successTips('repair');
				findSub() ;
			}
		}
	});
}

/**
 * 拼接选科列表
 * @param {Object} list
 */
function appendList(list){
	var html = '';
	$.each(list, function(index,data) {
			var progress = data.progress;
			progress['gradeName'] = data.gradeName;
			progress['subId'] = data.id;
			progress['style'] = data.style;
			var proPrams = JSON.stringify(progress);
			var param = JSON.stringify(data);
				html += '<div class="table-tr">' 
			+ 			'<div class="table-th">' 
			+				'<i class="icon-file"></i>' 
			+				'<span class="title">'+data.name+'</span>' 
			+			'</div>' 
			+			'<div class="table-th">' 
			+				'<div class="check">' 
			+					"<a href='javascript:;' onclick='checkPro("+proPrams+")' id='pro_show_"+data.id+"' class=\"check-jindu\">查看进度...</a>"
			+				'</div>'
			+				'<div class="mlh_schedule">'
			+					'<div class="mlh_progress">'
			+						'<div class="progress">'
			+							'<div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: '+progress.progress+'">'
			+							'</div>'
			+						'</div>'
			+					'</div>'
			+					'<span class="percent">'+progress.progress+'</span>'
			+					'<div class="time">选科时间：'+data.startTime+'--'+data.endTime+'</div>'
			+				'</div>'
			+			'</div>'
			+			'<div class="table-th clearfix">'
			+				'<ul class="operate">'
			+					'<li class="item import">'
			+						"<a href='javascript:importClick("+param+");'><i class=\"iconfont icon-daoru\"></i>导入</a>"
			+					'</li>'
			+					'<li class="item repair">'
			+						"<a href='javascript:repairClick("+param+");'><i class=\"icon_election\"></i>按组合补选</a>"
			+					'</li>'
			+					'<li class="item edit">'
			+						"<a href='javascript:editClick("+param+");'><i class='iconfont icon-edit'></i>编辑</a>"
			+					'</li>'
			+					'<li class="item see">'
			+						'<a onclick="showCheck(this)" data-subid="'+data.id+'" id="show_check_'+data.id+'" href="javascript:;"><i class="iconfont icon-check"></i>查看</a>'
			+					'</li>'
			+					'<li class="item del">'
			+						'<a href="javascript:deleteTips(\''+data.id+'\',delSub);"><i class="iconfont icon-del"></i>删除</a>'
			+					'</li>'
			+				'</ul>'
			+			'</div>'
			+		'</div>';
	});
	return html;
}

/**
 * 点击导入学生选科
 */
function importClick(obj){
	$('#importForm').attr('action',serverIp+'/stuselectsub/importStuSelect');
	$('#importSubId').val(obj.id);
	$('#importStyle').val(obj.style);
	$('#import').show();
	$('#show').html('');
	$('#ofile').val('');
	$('#importBtn').removeAttr('disabled','disabled');
	$('#importBtn').removeClass('disable_btn');
}

/**
 * 上传
 */
function saveImportExcel(){
	$('#importBtn').attr('disabled','disabled');
	$('#importBtn').addClass('disable_btn');
	$('#importForm').ajaxSubmit(function(resJson){
		if(resJson.code == 200){
			findSub() ;
			$('#import').hide();
			successTips('import');
		}else{
			warnTips(resJson.message);
		}
		$('#importBtn').removeAttr('disabled','disabled');
		$('#importBtn').removeClass('disable_btn');
	})
	
}

/**
 * 导出模版
 */
function importModel(){
	window.location.href = serverIp+'/stuselectsub/downloadModel?fileName=stu_seletc.xlsx'
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
				var html = '';
				var subGroupHtml = '';
				if(resJson.data.length>0){
					$.each(resJson.data, function(index,item) {
						html += '<a href="javascript:;" class="course" style="text-decoration: none; cursor: default;">'+item.name+'</a>';
						subGroupHtml += '<a href="javascript:;" class="mlh_btn" data-id="'+item.id+'">'+item.name+'</a>';
					});
				}
				$('#onesub_list').html(html);
				$('.sub_group_div').html(subGroupHtml);
				addSubGroupClick();
			} else {

			}
		}
	});
}

/**
 * 删除选科
 * @param {Object} id
 */
function delSub(id){
	$.ajax({
		type: "delete",
		url: serverIp + "/selectsub/"+id,
		data: {},
		success: function(resJson) {
			if(resJson.code == 200) {
				successTips('del');
				findSub();
			} else {

			}
		}
	});
}

/**
 * 添加科目组点击事件
 */
function addSubGroupClick(){
	$('.sub_group_div a').click(function(){
		if($(this).hasClass('active')){
			$(this).removeClass("active");
		}else{
			if($('.sub_group_div .active').length<3){
				$(this).addClass("active");
			}
		}
		if($('.sub_group_div .active').length==3){
			activeInsertBtn();
			$('.addsub_gruop_insert_btn').unbind();
			$('.addsub_gruop_insert_btn').on('click',function(){
				var groupId = '';
				var groupName = '';
				var groupNames = '';
				$('.sub_group_div .active').each(function(i){
					groupName+=$(this).text().slice(0,1);
					groupNames+=i==$('.sub_group_div .active').length-1?$(this).text():$(this).text()+',';
					groupId += i==$('.sub_group_div .active').length-1?$(this).data('id'):$(this).data('id')+',';
				})
				if(repeatGroup(groupId)){
					$('.zzz').append('<span class="mlh_btn selected" data-ids="'+groupId+'" data-names="'+groupNames+'">'+groupName+'<i class="iconfont icon-ICon- del_sub_goup"></i></span>');
				}else{
					warnTips('已添加该组');
				}
					
				$('.del_sub_goup').click(function(){
					$(this).parent().remove();
				})
				cancelInsertBtn();
				$('.sub_group_div a').removeClass('active');
			})
		}else{
			cancelInsertBtn();
		}
	})
}

//判断是否有重复组
function repeatGroup(groupId){
	var flag = true;
	$('.zzz span').each(function(){
		if($(this).data('ids')==groupId)
			flag = false;
	})
	return flag;
}

function goClassify(){
	if(getParameter('schoolId')==null||getParameter('schoolId')==''){
		window.location.href = portalIp;
		return false;
	}
	window.location.href = '/goClass/classify.html?schoolId='+getParameter('schoolId')
		+'&createId='+getParameter('createId')
		+'&createName='+getParameter('createName')
		+'&schoolYear='+getParameter('schoolYear')
		+'&semester='+getParameter('semester');
}

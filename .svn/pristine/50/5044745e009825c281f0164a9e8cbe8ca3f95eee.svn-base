var divideClassId = '';
var optType = 'insert';
var selArr = ['nameBlance','sexBlance'];
var baseData = {
	schoolId: getParameter('schoolId'),
	createId: getParameter('createId'),
	createName: getParameter('createName'),
	schoolYear: getParameter('schoolYear'),
	semester: getParameter('semester')
}
$(function(){
	//初始化加载选科列表
	findDivideClass() ;
	$('.mlh_tc .mlh_close').click(function(obj){
		$(obj.currentTarget.parentElement.parentElement.parentElement).hide();
    });
    //学年查询
	$('#schoolYear').change(findDivideClass)
	//学期查询
	$('#term').change(findDivideClass)
	
	//删除行
    $(".del a").click(function() {
        var link = $(this).parents(".table-tr");  
        link.remove();  
    });
    findGrade('');
    //创建分班
    $('.addkebiao').click(function(){
    	$('#dcForm')[0].reset();
        $('#mlh_class').show();
        optType = 'insert';
        divideClassId = '';
        $.each(selArr, function(index,selName) {
			$('#dcForm input[name="'+selName+'"]').prop('checked',false);
		});
        $('.dcType a').removeClass('active');
        $('#type_1').addClass('active');
    });
    //选择分班类型
    $('.dcType a').click(function(){
    	$('.dcType a').removeClass('active');
    	$(this).addClass('active')
    });
})

/**
 * 编辑分班按钮
 */
function editDivideClass(data){
	$('#mlh_class').show();
	optType = 'update';
	$('#dcName').val(data.name);
	$('#grade_select').val(data.gradeId);
	$.each(selArr, function(index,selName) {
		if(data[selName] == 1){
			$('#dcForm input[name="'+selName+'"]').prop('checked',true);
		}else{
			$('#dcForm input[name="'+selName+'"]').prop('checked',false);
		}
	});
	$('.dcType a').removeClass('active');
	$('#type_'+data.type).addClass('active');
	divideClassId = data.id;
	
}

/**
 * 保存分班
 */
function saveDc(){
	var data = {};
	var formData = $("#dcForm").serializeArray();
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
	data['gradeName'] = $("#grade_select").find("option:selected").text();
	data['type']=$('.dcType .active').data('value');
	data['schoolYear'] = $('#schoolYear').val();
	data['semester'] = $('#term').val();
	data['createId'] = baseData.createId;
	data['createName'] = '';
	var requestType = optType=='insert'?'post':'put';
	var requestUri = optType=='insert'?serverIp + "/divideClass":serverIp + "/divideClass/"+ divideClassId;
	$.ajax({
		type:requestType,
		url:requestUri,
		data: {
			data: JSON.stringify($.extend(true, baseData, data))
		},
		success:function(resJson){
			if(resJson.code==200){
				$('#mlh_class').hide();
				successTips(optType);
				findDivideClass();
			}else{
				warnTips(resJson.message);
			}
		}
	});
}
/**
 * 查询选科
 */
function findDivideClass() {
	var semester  = $('#term').val()
	var schoolYear = $('#schoolYear').val();
	$.ajax({
		type: "get",
		url: serverIp + "/divideClass",
		data: {schoolYear:schoolYear,semester:semester, createId: baseData.createId},
		success: function(resJson) {
			if(resJson.code == 200) {
				$('#dc_table').html(appendList(resJson.data));
				 //编辑分班
				 $('.mlh_table .operate .edit').unbind('click')
			    $('.mlh_table .operate .edit').click(editDivideClass);
			} else {
				$('#dc_table').html('');
				warnTips('暂无数据');
			}
		}
	});
}

/**
 * 拼接分班列表
 * @param {Object} list
 */
function appendList(list){
	var html = '';
	//<li class="item see">\<a href="javaScript:void(0)" onclick=goClassCheck("'+checkHref+'")><i class="iconfont icon-check"></i>查看</a>\</li>\
	$.each(list, function(index,data) {
			var param = JSON.stringify(data);
			var dcHref = 'set_class.html';
			var checkHref = 'check.html';
			switch (data.type){
				case 1:
					dcHref = 'set_class.html';
					break;
				case 2:
					dcHref = 'branch_class.html';
					checkHref = 'middle_class_check.html';
					break;
				case 3:
					dcHref = 'big_class.html';
					checkHref = 'big_check.html';
					break;
			}
			dcHref += '?id='+data.id;
			checkHref += '?id='+data.id;
			html += '<div class="table-tr">\
						<div class="table-th">\
							<i class="icon-file"></i>\
							<span class="title">'+data.name+'</span>\
						</div>\
						<div class="table-th">\
						</div>\
						<div class="table-th clearfix">\
							<ul class="operate">\
								<li class="item repair">\
									<a href="javaScript:void(0)" onclick=goSetClass("'+dcHref+'")><i class="iconfont icon-fenban"></i>分班</a>\
								</li>\
								<li class="item edit">\
									<a href=\'javascript:editDivideClass('+param+');\'><i class="iconfont icon-edit"></i>编辑</a>\
								</li>\
								<li class="item del">\
									<a href="javascript:deleteTips(\''+data.id+'\',delDivideClass);"><i class="iconfont icon-del"></i>删除</a>\
								</li>\
							</ul>\
						</div>\
					</div>';
	});
	return html;
}

/**
 * 删除分班
 * @param {Object} id
 */
function delDivideClass(id){
	$.ajax({
		type: "delete",
		url: serverIp + "/divideClass/"+id,
		data: {},
		success: function(resJson) {
			if(resJson.code == 200) {
				successTips('del');
				findDivideClass();
			} else {

			}
		}
	});
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

function goSetClass(url){
	if(getParameter('schoolId')==null||getParameter('schoolId')==''){
		window.location.href = portalIp;
		return false;
	}
	window.location.href = url
		+'&schoolId='+getParameter('schoolId')
		+'&createId='+getParameter('createId')
		+'&createName='+getParameter('createName')
		+'&schoolYear='+getParameter('schoolYear')
		+'&semester='+getParameter('semester');
}

function goClassCheck(url){
	if(getParameter('schoolId')==null||getParameter('schoolId')==''){
		window.location.href = portalIp;
		return false;
	}
	window.location.href = url
		+'&schoolId='+getParameter('schoolId')
		+'&createId='+getParameter('createId')
		+'&createName='+getParameter('createName')
		+'&schoolYear='+getParameter('schoolYear')
		+'&semester='+getParameter('semester');
}
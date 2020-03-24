var subId = '';
var subStyle = '';
var stuSubId = '';
var optType = 'insert';
var baseData = {
	stuId: getParameter("stuId"),
	stuName: getParameter("stuName"),
	stuNo: getParameter("stuNo"),
	sex: getParameter("sex"),
	gradeId: getParameter("gradeId"),
	classId: getParameter("classId"),
	className:getParameter("className")+'班',
	type:getParameter("type")
	
}
$(function(){
	if(baseData.type==1){
		$(".mlh_header .right").hide();
	}
	//初始化加载选科列表
	findSub() ;
	$('.mlh_tc .mlh_close').click(function(){
        $('#adjust').hide();
        $('#check').hide();
        $('#election').hide();
        $('#edit').hide();
        $('#progess').hide();
        $('#mlh_class').hide();
        $('#mlh_edit').hide();
    });
    $(window).scroll(function(e){
        e.preventDefault();
    });
    //查询进度关闭
     $('.tc_button .cancel').click(function(){
        $('#progess').hide();
    });
    //学年查询
	$('#schoolYear').change(findSub)
	//学期查询
	$('#term').change(findSub)
})

/**
 * 查询是否选科
 */
function findStuSub(subParams){
	$.ajax({
		type:"get",
		url:serverIp + "/stuselectsub",
		data:{stuId:baseData.stuId,selectSubId:subParams.id},
		success:function(resJson){
			if(resJson.code==200){
				if(resJson.data.length==0){
					optType = 'insert';
				}else{
					optType = 'update';
					var subData = resJson.data[0];
					stuSubId = subData.id;
					if(subStyle == 1){
						var subIdsArr = subData.subIds.split(',');
						$.each(subIdsArr,function(index,item){
							$('#selSub_'+item).addClass('active');
						})
					}else{
						var regIds = subData.subIds.replace(/,/g,'\\,');
						$('#selSub_'+regIds).addClass('active');
					}
					if(compareTime(subParams.endTime)){
						activeInsertBtn();
					}
				}
			}
		}
	});
	
	
}

/**
 * 确认选科
 */
function saveSub(){
	if($('#subList .active').length<=0){
		return;
	}
	var data = {};
	if(subStyle == 2){
		data['subIds'] = $('#subList .active').eq(0).data('ids');
		data['subNames'] = $('#subList .active').eq(0).text();
	}else{
		if($('#subList .active').length<3){
			return;
		}
		var groupId = '';
		var groupName = '';
		var groupNames = '';
		$('#subList .active').each(function(i){
			groupName+=$(this).text().slice(0,1);
			groupNames+=i==$('#subList .active').length-1?$(this).text():$(this).text()+',';
			groupId += i==$('#subList .active').length-1?$(this).data('id'):$(this).data('id')+',';
		})
		data['subIds'] = groupId;
		data['subNames'] = groupName;
		data['subFullName'] = groupNames;
	}
	data['selectSubId'] = subId;
	data['style'] = subStyle;
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
				$('#edit').hide();
				successTips(optType);
				findSub() ;
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
		data: {perType:2,gradeId:baseData.gradeId,schoolYear:schoolYear,semester:semester},
		success: function(resJson) {
			if(resJson.code == 200) {
				$('#sub_table').html(appendList(resJson.data));
//				appendProgress(resJson.data);
			} else {
				$('#sub_table').html('');
				warnTips('暂无数据');
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
			var proPrams = JSON.stringify(data.progress);
			var param = JSON.stringify(data);
				html += '<div class="table-tr">' 
			+ 			'<div class="table-th">' 
			+				'<i class="icon-file"></i>' 
			+				'<span class="title">'+data.name+'</span>' 
			+			'</div>' 
			+			'<div class="table-th">' 
			+				'<div class="check">' 
			+					"<a href='javascript:;' onclick='checkPro("+proPrams+")' class=\"check-jindu\">查看进度...</a>"
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
			+				'<ul class="operate choose">'
			+					'<li class="item edit">'
			+						"<a href='javascript:editClick("+param+");'><i class='iconfont  icon-text'></i>选科</a>"
			+					'</li>'
			+				'</ul>'
			+			'</div>'
			+		'</div>';
	});
	return html;
}

//选科按钮点击事件
function editClick(data){
	var timeIn = compareTime(data.endTime);
	if(timeIn){
		$('#tipMsgTr').hide();
	}else{
		$('#tipMsgTr').show();
		cancelInsertBtn();
	}
	subId = data.id;
	subStyle = data.style;
	$('#subName').html(data.name);
	$('#gradeName').html(data.gradeName);
	$('#subTime').html(data.startTime+"--"+data.endTime);
	var subStyleText = data.style==1?'按单个科目选择':'按科目组选择'
	$('#selMumMsg').html(selMumMsg);
	var selMumMsg = data.style==1?'允许学生任意选择3门科目':'允许学生任意选择1个科目组'
	$('#subStyle').html(subStyleText);
	if(data.style==1){
		findOneSub(data,timeIn);
	}else{
		var html = '';
		$.each(data.threeSubList, function(index,item) {
			html+='<a href="javascript:;" id="selSub_'+item.ids+'" data-id="'+item.id+'" data-ids="'+item.ids+'" data-names="'+item.names+'" class="mlh_btn subjects">'+item.name+'</a>';
		});
		findStuSub(data);
		$('#subList').html(html);
		if(timeIn){
			$('#subList a').click(function(){
				$('#subList .active').removeClass('active');
				$(this).addClass("active");
				/*if($(this).hasClass('active')){
					$(this).removeClass('active')
				}else{
					if($('#subList .active').length<1){
						$(this).addClass("active");
					}
				}
				if($('#subList .active').length==1){
					activeInsertBtn()
				}else{
					cancelInsertBtn()
				}*/
				activeInsertBtn();
			})
		}
	}
	$('#edit').show();
}

/**
 * 查询单科科目
 */
function findOneSub(subParams,timeIn){
	$.ajax({
		type: "get",
		url: serverIp + "/onesub",
		data: {},
		success: function(resJson) {
			if(resJson.code == 200) {
				var html = '';
				$.each(resJson.data, function(index,item) {
					html += '<a href="javascript:;" id="selSub_'+item.id+'" data-id="'+item.id+'" class="mlh_btn subjects">'+item.name+'</a>';
				});
				$('#subList').html(html);
				findStuSub(subParams);
				if(timeIn){
					$('#subList a').unbind('click');
					$('#subList a').click(function(){
						if($(this).hasClass('active')){
							$(this).removeClass("active");
						}else{
							if($('#subList .active').length<3){
								$(this).addClass("active");
							}
						}
						if($('#subList .active').length==3){
							activeInsertBtn();
						}else{
							cancelInsertBtn();
						}
					})
				}
				
			} else {

			}
		}
	});
}

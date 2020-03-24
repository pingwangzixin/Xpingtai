$(function(){
	addTab(5);
	findScheduleById();
	//保存按钮事件
	$('#saveBtn').on('click',function(){
		saveGoClass($('#ul_tab a').eq(5).attr('href'));
	})
	
	//切换标签事件
	$('#ul_tab a').on('click',function(i,o){
		var href = $(this).attr('href');
		if($('.change_go').length>0){
			$(this).removeAttr('href');
			noSaveTips(saveGoClass,href);
		}
	})
})

/**
 * 未保存提示窗
 * @param {Object} delFunction
 * @param {Object} href
 */
function noSaveTips(delFunction,href){
	$('#deleteTips').show();
	$('#deleteTipsYesBtn').unbind("click");
	$('#deleteTipsYesBtn').on('click',function(){
		delFunction(href);
		$('#deleteTips').hide();
	})
	$('#deleteTipsNoBtn').unbind("click");
	$('#deleteTipsNoBtn').on('click',function(){
		$('#deleteTips').hide();
		window.location.href = href;
	})
}

/**
 * 查询走班时段
 */
function findGoClass(){
	$.ajax({
		type:"get",
		url:serverIp  + "/walkClass",
		data:{scheduleId:scheduleId},
		success:function(resJson){
			if(resJson.code==200){
				var data = resJson.data;
				$.each(data, function(i,o) {
					$('#'+o.weekNum+'\\,'+o.lessonNum).addClass('wx_duigou old_go');
				});
			}
		}
	});
	
}

/**
 * 保存走班数据
 */
function saveGoClass(href){
	var $item = $('#class_table .wx_duigou');
	var gc = {};
	var goClassArr = [];
	$item.each(function(i,o){
		var goClass = {};
		goClass.gradeId = $('#sel_grade').val();
		goClass.gradeName = $('#sel_grade').text();
		goClass.scheduleId = scheduleId;
		goClass.weekNum = parseInt($(o).attr('id').split(',')[0]);
		goClass.lessonNum = parseInt($(o).attr('id').split(',')[1]);
		goClassArr.push(goClass);
	})
	gc.scheduleId = scheduleId;
	gc.walkClassArr = goClassArr;
	$.ajax({
		type:"post",
		url:serverIp  + "/walkClass",
		data:{data:JSON.stringify(gc)},
		success:function(resJson){
			if(resJson.code==200){
				successTips();
				$('#class_table .go_class').removeClass('wx_duigou');
				findGoClass();
				window.location.href = href;
//				$('#ul_tab a')[5].click();
			}else{
				warnTips(resJson.message);
			}
		}
	});
	
	
}
var divideId = '';
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
				divideId = data.divideId;
				dayNum = data.dayNum;
				$('#schedule_name').html(data.name);
				var gradeId = data.gradeId==null?'':data.gradeId;
				var gradeName = data.gradeName==null?'':data.gradeName;
				$('#sel_grade').html('<option value="'+gradeId+'">'+gradeName+'</option>');
				appendGoClassTable(data);
			}else{
				warnTips(resJson.message);
			}
		}
	});
}

/**
 * 拼接走班表
 */
function appendGoClassTable(data){
	var dayTr = '<th>节次</th>';
	for(var i=0;i<data.dayNum;i++){
		dayTr+='<th>星期'+changeDayStr(i+1)+'</th>'
	}
	$('#day_tr').html(dayTr);
	var numStr = ["一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五"];
	
	var classHtml = '';
	for(var i=0;i<data.classNum;i++){
		classHtml+='<tr><td class="wx_jieci">第'+numStr[i]+'节</td>';
		for(var n = 0;n<data.dayNum;n++){
			classHtml+='<td class="go_class" id="'+(n+1)+','+(i+1)+'"></td>';
		}
		classHtml+='</tr>';
	}
	$('#class_table').html(classHtml);
	findGoClass();
	$(".wx_setrenwu_table tbody tr td").on("click",function(){
		if(!$(this).hasClass("wx_jieci")){
          	$(this).toggleClass("wx_duigou") ;
          	if($(this).hasClass('old_go')){
          		if($(this).hasClass('wx_duigou')){
          			$(this).removeClass('change_go');
          		}else{
          			$(this).addClass('change_go');
          		}
          	}else{
          		if($(this).hasClass('wx_duigou')){
          			$(this).addClass('change_go');
          		}else{
          			$(this).removeClass('change_go');
          		}
          	}
        }
		/*if($('#class_table .wx_duigou').length>data.optionalClassNum){
			$(this).toggleClass("wx_duigou");
			warnTips('走班节数不能超过设定值:'+data.optionalClassNum);
		};*/
        
    }) 

}
/*设置作息时间*/
function setSchedule(){
//	$('#nodeTimeBody').html(html);
	$('#setSchedule').show();
}
//日历
layui.use('laydate', function(){  
	var laydate = layui.laydate;
	lay('.starttime').each(function(){    
		laydate.render({      
			elem: this,
			type: 'time',
			range: '~',
			trigger: 'click'    
		});  
	}); 
	findNodeTime();
});

//保存作息时间
function saveNodeTime(){
	var list = [];
	var paramList = [];
	var param = {};
	$('.starttime').each(function(i){
		var nodeTime = $(this).html();
		if(nodeTime!=""){
			var nts = nodeTime.split(' ~ ');
			list.push(nts[0]);
			list.push(nts[1]);
		}
		param = {};
		param.scheduleId = scheduleId;
		param.divideId = divideId;
		param.node = i+1;
		param.time = nodeTime;
		paramList.push(param);
	})
	console.log(list);
	var flag = false;
	for(var i=1; i<list.length; i++){
		flag = checkTime(list[i-1], list[i]);
		if(flag){
			break;
		}
	}
	if(flag){
		//提示错误
		alert("时间段有误");
	}else{
		$.ajax({
			url:serverIp  + "/nodeTime",
			type:"post",
			data:{json:JSON.stringify(paramList)},
			success:function(data){
				if(data.code==200){
					successTips();
					$('#setSchedule').hide();
				}else{
					console.log("失败");
				}
			},
			dataType:"json"
		});
	}
}

function checkTime(time1, time2){
	var timeList1 = time1.split(':');
	var timeList2 = time2.split(':');
	if(timeList1[0]<timeList2[0]){
		return false;
	}else if(timeList1[0]>timeList2[0]){
		return true;	
	}else if(timeList1[0]==timeList2[0]){
		if(timeList1[1]<timeList2[1]){
			return false;
		}else if(timeList1[1]>timeList2[1]){
			return true;	
		}else if(timeList1[1]==timeList2[1]){
			if(timeList1[2]<timeList2[2]){
				return false;
			}else if(timeList1[2]>=timeList2[2]){
				return true;	
			}
		}
	}
}


function findNodeTime(){
	$.ajax({
		url:serverIp  + "/nodeTime",
		type:"get",
		data:{scheduleId:scheduleId, divideId:divideId},
		success:function(result){
			if(result.code==200){
				var data = result.data;
				if(data.length>0){
					$('.starttime').each(function(i){
						$(this).html(data[i].time);
					})
				}
			}else{
				console.log("失败");
			}
		},
		dataType:"json"
	});
}

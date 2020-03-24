$(function(){
	findScheduleById();
	sureShow();
	addTab(6);
})

var gradeName = '';
/**
 * 根据Id查询课表
 */
function findScheduleById(){
	$.ajax({
		type:'get',
		url:serverIp  + '/schedule/'+scheduleId,
		async:false,
		success:function(resJson){
			if(resJson.code==200){
				var data = resJson.data;
				$('#scheduleName').html(data.name);
				$('#weekDay').html('<b>每周天数：</b>'+(data.dayNum==null?"":data.dayNum));
				gradeName = data.gradeName==null?"":data.gradeName;
				var amnoon = data.amnoon==null?"":data.amnoon;
				var afternoon = data.afternoon==null?"":data.afternoon;
				$('#showGradeNode').html('<b>每天节数：</b>'+gradeName+' | 上午'+amnoon+'节   | 下午'+afternoon+'节 </li>');
				$('#zhinengnianji').next().html(gradeName);
			}
		}
	});
	
}

function createTimeTable(){
	if(gradeName==''){
		warnTips("请先设置课表");
		return false;
	}
	var flag=true;
	$.ajax({
		type:"get",
		url:serverIp+"/userCourse",
		data:{scheduleId:scheduleId},
		asyne:true,
		success:function(resJson){
			if(resJson.code==200){
				var data = resJson.data;
				$.each(data, function(i,o) {
					if(o.classNum==null){
						flag=false;
					}
				});
			}else{
				flag=false;
			}
			if(flag){
				createInsertTimeTable();
			}else{
				warnTips("请先设置教学任务");
			}
		}
	});
}

function loadingShow(){
	$("#loading").show();
}

function loadingHide(){
	$("#loading").hide();
}


//开始排课
function createInsertTimeTable(){
	loadingShow();
	noaccessShow();
	setTimeout(function(){
		$.ajax({
			url:serverIp  + '/timeTable',
			type:'post',
			data:{scheduleId: scheduleId},
			async:false,
			success:function(resJson){
				loadingHide();
				if(resJson.code==200){
					window.location.href = $('#ul_tab a').eq(6).attr('href');
				}else{
					sureShow();
				}
			},
			error:function(){
				loadingHide();
				sureShow();
			}
			
		});
	}, 500);
}

function sureShow(){
	$('.wx_sure_btn').show();
	$('.wx_noaccess_btn').hide();
}

function noaccessShow(){
	$('.wx_sure_btn').hide();
	$('.wx_noaccess_btn').show();
}

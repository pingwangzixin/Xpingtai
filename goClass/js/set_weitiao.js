var clickId = '';
var scheduleState = '';
var nodeTime = {"code":500};
$(function() {
    
    $(".wx_role_ul ul li").on("click", function() {
        var index = $(this).index()
        $(this).addClass("active").siblings().removeClass("active")
        $(".wx_set_guize_ul>div").eq(index).show().siblings().hide();
    });

    //点击td拖拽
    $(document).on("mousedown", "#tableId tbody tr td", function() {
        if (!$(this).hasClass("wx_jieci")) {
        	var subIds = $(this).attr('subjectId');
        	var id = $(this).attr('id');
    		if(subIds!=undefined&&subIds!=''){
    			$("table tr td").removeClass("wx_lvkuai");
    			$("table tr td").removeClass("wx_hongkuai");
    				$("table tr td").removeClass("wx_lankuai");
    			//删除未排科目样式
				removeClassAndAttr();
				$(this).removeClass("wx_lankuai");
    			$(this).addClass("wx_lvkuai");
    			$(this).attr('ondrop', 'tuozhuai(event,this)');
    			$(this).attr('ondragover', 'genzong(event)');
    			$(this).attr('draggable', 'true');
    			$(this).attr('ondragstart', 'draging(event, this)');
    			var classId = $('#assembleClass').val();
    			var node = $(this).attr('id');
    			var weekNum = node.substring(0,1);
    			var lessonNum = node.substring(1);
    			//查询不可排节次
    			findNoRowList(scheduleId, classId, subIds, weekNum, lessonNum);
    		}
        }
    });

    $(document).on("click", ".wx_weipaike span", function() {
        $(this).addClass("active").siblings().removeClass();
    })

	// 全选
    $('.have-row .checkbox-all').on('change', function() {
        $('.have-row .checkbox-all').prop('checked', $(this).prop('checked'));
        $('.have-row tbody input[type="checkbox"]').prop('checked', $(this).prop('checked'));
    });
    $('.not-line .checkbox-all').on('change', function() {
        $('.not-line .checkbox-all').prop('checked', $(this).prop('checked'));
        $('.not-line tbody input[type="checkbox"]').prop('checked', $(this).prop('checked'));
    });
    //调班
    $('.mlh_tiaoban').click(function(){
        $('#mlh_change').show();
    });
    $('.tc_con_tit .img_guanbi').click(function(){
        $('#mlh_change').hide();
    });
    
    //切换分组
    $('#assemble').change(function(){
    	clickId = '';
    	if($(this).val()=="xingzheng"){
    		findJeucClassByGradeId();
    	}else{
    		findClassByAssemble();
    	}
    	findNoScheduleSubject();
    })
    //切换班级
    $('#assembleClass').change(function(){
    	clickId = '';
    	findClassTimeTable();
    	findNoScheduleSubject();
    })
    
    //是否显示班级
    var checkBoxArr = [{id:'wx_xiawu',className:'span_classromm'}];
	$.each(checkBoxArr, function(i,o) {
		$('#'+o.id).click(function(){
			if($(this).prop('checked')){
				$('.'+o.className).show()
			}else{
				$('.'+o.className).hide()
			}
		})
	});
    
    addTab(7);
    //初始化排课信息
    findScheduleById();
    //查询作息时间
	findNodeTime();
    //组成空课表
    scheduleNum();
    //查询分班详情
    findDivideClassInfo();
    //查询组合
    findAssemble();
});

//查询作息时间
function findNodeTime(){
	$.ajax({
		url:serverIp  + "/nodeTime",
		type:"get",
		data:{scheduleId:scheduleId, divideId:divideId},
		async:false,
		success:function(result){
			nodeTime = result;
		},
		dataType:"json"
	});
}

//回显作息时间
function setNodeTime(){
	if(nodeTime!={}&&nodeTime.code==200){
		var data = nodeTime.data;
		if(!$.isEmptyObject(data)){
			$('#tbody .wx_jieci').each(function(i){
				$(this).append("<br/>"+data[i].time);
			})
		}
	}else{
		console.log("查询作息时间失败");
	}
}

function genzong(ev) {
    ev.preventDefault();
}

var yuandiv = null;

function draging(ev, divdom) {
    yuandiv = divdom;
    ev.dataTransfer.setData("text/html", divdom.innerHTML);
}

function tuozhuai(ev, divdom) {
    ev.preventDefault();
    yuandiv.className = "wx_lankuai";
    divdom.className = "wx_lvkuai";
    if(yuandiv.tagName=="SPAN"){
        yuandiv.style.display="none";
    }
    if (yuandiv != divdom) {
    	var type = yuandiv.getAttribute("type");
    	if(type=='1'){
    		divdom.innerHTML = yuandiv.getAttribute('subjectName');
    		var subjectName = yuandiv.getAttribute('subjectName');
    		var sid = yuandiv.getAttribute("subjectId");
    		var node = divdom.getAttribute("id");
    		var data = {};
    		data.scheduleId = scheduleId
    		data.gradeId = $('#grade_sel').val();
			data.gradeName = $('#grade_sel option:selected').html();
	    	data.subjectId = sid;
	    	data.subjectName = subjectName;
	    	data.classId = $('#assembleClass').val();
	    	data.className = $('#assembleClass option:selected').text();
	    	data.type = 2;
	    	data.weekNum = node.substring(0,1);;
	    	data.lessonNum = node.substring(1);
	    	console.log(data);
	    	var td_Map = new Array();
			td_Map.push(node);
			//进库保存
			addPreSchedule(data, node);
    	}else{
    		yuandiv.innerHTML = divdom.innerHTML;
    		divdom.innerHTML = ev.dataTransfer.getData("text/html");
		    var ySid = yuandiv.getAttribute("subjectId");
		    var nSid = divdom.getAttribute("subjectId");
	        var yNode = yuandiv.getAttribute("id");
		    var nNode = divdom.getAttribute("id");
	    	if(ySid!=nSid){
			    var data = {};
		    	data.scheduleId = scheduleId;
		    	data.classId = $('#assembleClass').val();
		    	data.yweekNum = yNode.substring(0,1)
		    	data.ylessonNum = yNode.substring(1);
		    	data.ysid = ySid;
		    	data.nweekNum = nNode.substring(0,1);;
		    	data.nlessonNum = nNode.substring(1);
		    	data.nsid = nSid;
		    	console.log(data);
			    //进库保存
				saveWeiTiao(data, nNode);
	    	}else{
	    		clickId = nNode;
	    		findClassTimeTable();
	    	}
    	}
    }
}
//分班id
var divideId = '';
//选科id
var selectSubId = '';
//分班类型
var diviedType = '';
var scheduleInfo;
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
				scheduleInfo = data;
				divideId = data.divideId;
				scheduleState = data.state;
				$('#schedule_name').html(data.name);
				var gradeId = data.gradeId==null?"":data.gradeId;
				var gradeName = data.gradeName==null?"":data.gradeName;
				//年级
				$('#grade_sel').html('<option value='+gradeId+'>'+gradeName+'</option>');
				if(data.lastDay == 1){
					$('#selectjieshu').prop('checked',true);
				}
				$('#sel_am').val(data.amnoon==null?1:data.amnoon);
				$('#sel_pm').val(data.afternoon==null?1:data.afternoon);
				$('#zbNum').val(data.optionalClassNum==null?'':data.optionalClassNum);
			}else{
				
			}
		}
	});
	
}
//查询分班详情
function findDivideClassInfo(){
	$.ajax({
		type:"get",
		url:serverIp  + "/divideClass/"+divideId,
		async:false,
		success:function(resJson){
			if(resJson.code==200){
				var data = resJson.data;
				selectSubId = data.subjectId;
				diviedType = data.type;
			}else{
				
			}
		}
	});
}

/**
 * 根据Id查询组合
 */
function findAssemble(){
	$.ajax({
		type:"get",
		url:serverIp  + "/middleDivideClassController/findAssemble/"+divideId,
		async:false,
		success:function(resJson){
			if(resJson.code==200){
				var data = resJson.data;
				var html = '';
				var type = 1;
				for (var i=0,len=data.length; i<len; i++) {
					if(data[i].id=='hunheId'||data[i].id=='xingzheng'){
						type = 2;
					}else if(data[i].id.indexOf(',')==-1){
						type = 3;
					}else{
						type = 1;
					}
					html+='<option type='+type+' value="'+data[i].id+'">'+data[i].name+'</option>';
				}
				$('#assemble').html(html);
				//根据组合Id查询班级
				findClassByAssemble();
				findNoScheduleSubject();
			}else{
				
			}
		}
	});
}

function findJeucClassByGradeId(){
	$.ajax({
		type:"get",
		url:userServiceIp  + '/api/ea/eaClass?gradeId='+$('#grade_sel').val(),
		async:false,
		success:function(resJson){
			if(resJson.ret==200){
				var data = resJson.data;
				var html = '';
				var cids = '';
				for (var i=0,len=data.length; i<len; i++) {
					cids+=','+data[i].id;
					html+='<option value="'+data[i].id+'">'+data[i].name+'班</option>';
				}
				$('#assembleClass').html(html);
				cids = cids.substring(0);
				//查询班级冲突状态
				findClassErrorState(cids);
				//查询班级课表
				findClassTimeTable();
			}
		}
	});
}

/**
 * 根据组合Id查询班级
 */
function findClassByAssemble(){
	var ids = $('#assemble').val();
	if(ids=="xingzheng"){
		findJeucClassByGradeId();
	}else if(ids!=null&&ids!=''){
		$.ajax({
			type:"get",
			url:serverIp  + '/newClass/findNewClassList?divideId='+divideId+'&subjectId='+selectSubId+'&ids='+ids,
			async:false,
			success:function(resJson){
				if(resJson.code==200){
					var data = resJson.data;
					var html = '';
					var cids = '';
					for (var i=0,len=data.length; i<len; i++) {
						cids+=','+data[i].id;
						html+='<option value="'+data[i].id+'">'+data[i].name+'</option>';
					}
					$('#assembleClass').html(html);
					cids = cids.substring(0);
					//查询班级冲突状态
					findClassErrorState(cids);
					//查询班级课表
					findClassTimeTable();
				}else{
					
				}
			}
		});
	}
}

//查询班级冲突状态
function findClassErrorState(cids){
	if(cids!=undefined&&cids!=''){
		$.ajax({
			type:"get",
			url:serverIp  + '/timeTable/findClassErrorState',
			data:{scheduleId:scheduleId,classIds:cids},
			async:false,
			success:function(resJson){
				if(resJson.code==200){
					var data = resJson.data;
					for (var i=0; i<data.length; i++) {
						$('#assembleClass option[value="'+data[i]+'"]').attr("error","error");
					}
				}
			}
		});
	}
}

//查询班级课表
function findClassTimeTable(){
	var classId = $('#assembleClass').val();
	if(classId!=null&&classId!=''){
		$.ajax({
			type:"get",
			url:serverIp  + '/timeTable',
			data:{scheduleId:scheduleId,classId:classId},
			async:false,
			success:function(resJson){
				//重置清空课表
				scheduleNum();
				if(resJson.code==200){
					var data = resJson.data;
					var weekLessonNun = '';
					var display = 'none';
					if($('#wx_xiawu').prop('checked')){
						display = 'inline';
					}
					for(var i=0,len=data.length; i<len; i++){
						weekLessonNun = data[i].weekNum+''+data[i].lessonNum;
						var classroom = '<span class="span_classromm" style="display: '+display+';"><br>'+(data[i].classroom==null?"":data[i].classroom)+'</span>';
						$('#'+weekLessonNun).html(data[i].subjectName+classroom);
						$('#'+weekLessonNun).attr('subjectId', data[i].subjectId);
						$('#'+weekLessonNun).attr('aloneType', data[i].aloneType);
						$('#'+weekLessonNun).attr('aloneSubId', data[i].aloneSubId);
					}
					if(clickId!=''){
						$('#'+clickId).mousedown();
					}
				}
			}
		});
	}
}

//删除已排
function deleteScheduleSub(){
	if(scheduleState==2){
		alert('课表已下发，不能删除节次');
		return false;
	}
	var subjectId = $('table tr td[class="checktd wx_lvkuai"]').attr('subjectId');
	var classId = $('#assembleClass').val();
	var weekNum = $('table tr td[class="checktd wx_lvkuai"]').attr('weeknum');
	var lessonNum = $('table tr td[class="checktd wx_lvkuai"]').attr('lessonnum');
	if(subjectId==undefined||subjectId==''){
		alert('请选择要删除的科目');
	}else{
		var params = {scheduleId:scheduleId,classId:classId,type:2,weekNum:weekNum,lessonNum:lessonNum};
		$.ajax({
			url:serverIp  + '/preSchedule',
			type:"put",
			data:params,
			async:false,
			success:function(resJson){
				if(resJson.code==200){
					console.log('删除成功');
					clickId = '';
					findClassTimeTable();
					findNoScheduleSubject();
				}
			}
		});
	}
}

//查询未排科目及节次
function findNoScheduleSubject(){
	var cid = $('#assembleClass').val();
	if(cid!=undefined&&cid!=''){
		$.ajax({
			type:"get",
			url:serverIp  + '/timeTable/findNoRowSubject',
			data:{scheduleId:scheduleId,cid:cid},
			async:false,
			success:function(resJson){
				if(resJson.code==200){
					var html = ''
					var data = resJson.data;
					if(data.length==0){
						$('#noScheduleSub').html('<p>课程已排满</p>');
					}else{
						var weekLessonNun = '';
						for(var i=0,len=data.length; i<len; i++){
							weekLessonNun = data[i].weekNum+''+data[i].lessonNum;
							html+='<em type="1" aloneType='+data[i].aloneType+' subjectId="'+data[i].sid+'" subjectName="'+data[i].sname+'" ondrop="tuozhuai(event,this)" ondragover="genzong(event)" draggable="true" ondragstart="draging(event, this)">'
							+data[i].sname
							+'('
							+data[i].classNum
							+')</em>';
						}
						$('#noScheduleSub').html(html);
						$('#noScheduleSub em').click(function(){
							//未排科目排入班级
							var subIds = $(this).attr('subjectId');
							if(subIds!=undefined&&subIds!=''){
								$("table tr td").removeClass("wx_lvkuai");
								$("table tr td").removeClass("wx_hongkuai");
								//删除未排科目样式
								removeClassAndAttr();
		        		
								$(this).addClass("wx_lvkuai");
								$(this).attr('ondrop', 'tuozhuai(event,this)');
								$(this).attr('ondragover', 'genzong(event)');
								$(this).attr('draggable', 'true');
								$(this).attr('ondragstart', 'draging(event, this)');
								var classId = $('#assembleClass').val();
								var weekNum = -1;
								var lessonNum = -1;
								//查询不可排节次
								findNoRowList(scheduleId, classId, subIds, weekNum, lessonNum);
							}
						})
					}
				}
			}
		});
	}
}

//获取不可排节次
function findNoRowList(scheduleId, classId, subjectId, weekNum, lessonNum){
	var type = $('#assemble option:selected').attr('type');
	var divType = 1;
	if(type=='1'){
		divType = 1;
	}else{
		divType = diviedType;
	}
	$.ajax({
		type:"get",
		url:serverIp  + '/timeTable/findNoRowList',
		data:{scheduleId:scheduleId, classId:classId, subjectId:subjectId, 
			weekNum:weekNum, lessonNum:lessonNum, divideId:divideId,
			selectSubId:selectSubId, type:divType},
		async:false,
		success:function(resJson){
			if(resJson.code==200){
//				if(type=='1'){
					$('table tr td[class!="wx_jieci"][class!="checktd wx_lvkuai"]').addClass("wx_lankuai");
					$('table tr td[class!="wx_jieci"][class!="checktd wx_lvkuai"]').attr('ondrop', 'tuozhuai(event,this)');
	        		$('table tr td[class!="wx_jieci"][class!="checktd wx_lvkuai"]').attr('ondragover', 'genzong(event)');
	        		$('table tr td[class!="wx_jieci"][class!="checktd wx_lvkuai"]').attr('draggable', true);
	        		$('table tr td[class!="wx_jieci"][class!="checktd wx_lvkuai"]').attr('ondragstart', 'draging(event, this)');
//				}else {
//					//变蓝非走班节次，变灰走班节次
//					findWalkClass(type)
//				}
				var data = resJson.data;
				for (var i=0,len=data.length; i<len; i++) {
					$('#'+data[i]).removeClass("wx_lankuai");
					$('#'+data[i]).addClass("wx_hongkuai");
					$('#'+data[i]).removeAttr('ondrop');
	        		$('#'+data[i]).removeAttr('ondragover');
	        		$('#'+data[i]).removeAttr('draggable');
	        		$('#'+data[i]).removeAttr('ondragstart');
				}
				var emLv = $('#noScheduleSub em.wx_lvkuai').attr('subjectId');
				if($('#noScheduleSub em.wx_lvkuai').size()>0){
					if($('#noScheduleSub em').size()==$('#tbody .checktd[subjectId=""]').size()){
						$('#tbody .checktd[subjectid!=""]').each(function(){
							$(this).removeClass("wx_lankuai");
							$(this).addClass("wx_hongkuai");
							$(this).removeAttr('ondrop');
			        		$(this).removeAttr('ondragover');
			        		$(this).removeAttr('draggable');
			        		$(this).removeAttr('ondragstart');
						})
					}else if($('#noScheduleSub em.wx_lvkuai').attr('aloneType')==1){
						$('#tbody .checktd[subjectid!=""][aloneSubId!="'+emLv+'"][aloneType!="2"]').each(function(){
							$(this).removeClass("wx_lankuai");
							$(this).addClass("wx_hongkuai");
							$(this).removeAttr('ondrop');
			        		$(this).removeAttr('ondragover');
			        		$(this).removeAttr('draggable');
			        		$(this).removeAttr('ondragstart');
						})
					}else if($('#noScheduleSub em.wx_lvkuai').attr('aloneType')==2){
						$('#tbody .checktd[subjectid!=""][aloneSubId!="'+emLv+'"][aloneType!="1"]').each(function(){
							$(this).removeClass("wx_lankuai");
							$(this).addClass("wx_hongkuai");
							$(this).removeAttr('ondrop');
			        		$(this).removeAttr('ondragover');
			        		$(this).removeAttr('draggable');
			        		$(this).removeAttr('ondragstart');
						})
					}else{
						$('#tbody .checktd[subjectid!=""]').each(function(){
							$(this).removeClass("wx_lankuai");
							$(this).addClass("wx_hongkuai");
							$(this).removeAttr('ondrop');
			        		$(this).removeAttr('ondragover');
			        		$(this).removeAttr('draggable');
			        		$(this).removeAttr('ondragstart');
						})
					}
				}
			}
		}
	});
}

//未排节次排入
function addPreSchedule(data, node){
	$.ajax({
		url: serverIp+"/preSchedule/insertObject",
		type: "POST",
		dataType : "json",
		data: data,
		success:function(resJson){
			if(resJson.code == 200){
				clickId = node;
			}
			findClassTimeTable();
			findNoScheduleSubject();
		}
	});
}

//修改科目节次
function saveWeiTiao(data, nNode){
    $.ajax({
		type:"put",
		url:serverIp  + '/timeTable/updateTimeTable',
		data:data,
		async:false,
		success:function(resJson){
			if(resJson.code == 200){
				clickId = nNode;
			}
			findClassTimeTable();
		}
	});
}

function findWalkClass(type){
	$.ajax({
		type:"get",
		url:serverIp  + '/walkClass',
		data:{scheduleId:scheduleId},
		async:false,
		success:function(resJson){
			if(resJson.code == 200){
				var data = resJson.data;
				if(type=='2'){
					$('table tr td[class!="wx_jieci"][class!="checktd wx_lvkuai"]').addClass("wx_lankuai");
					$('table tr td[class!="wx_jieci"][class!="checktd wx_lvkuai"]').attr('ondrop', 'tuozhuai(event,this)');
		    		$('table tr td[class!="wx_jieci"][class!="checktd wx_lvkuai"]').attr('ondragover', 'genzong(event)');
		    		$('table tr td[class!="wx_jieci"][class!="checktd wx_lvkuai"]').attr('draggable', true);
		    		$('table tr td[class!="wx_jieci"][class!="checktd wx_lvkuai"]').attr('ondragstart', 'draging(event, this)');
					for (var i=0,len=data.length; i<len; i++) {
						var id = data[i].weekNum+''+data[i].lessonNum;
						$('#'+id).removeClass("wx_lankuai");
						$('#'+id).addClass("wx_hongkuai");
						$('#'+id).removeAttr('ondrop');
		        		$('#'+id).removeAttr('ondragover');
		        		$('#'+id).removeAttr('draggable');
		        		$('#'+id).removeAttr('ondragstart');
					}
				}else{
					$('table tr td[class!="wx_jieci"]').addClass("wx_hongkuai");
					for (var i=0,len=data.length; i<len; i++) {
						var id = data[i].weekNum+''+data[i].lessonNum;
						$('#'+id).removeClass("wx_hongkuai");
						$('#'+id).addClass("wx_lankuai");
						$('#'+id).attr('ondrop', 'tuozhuai(event,this)');
			    		$('#'+id).attr('ondragover', 'genzong(event)');
			    		$('#'+id).attr('draggable', true);
			    		$('#'+id).attr('ondragstart', 'draging(event, this)');
					}
				}
			}
		}
	});
}

var weekClassNum = 0;
//组成空课表
function scheduleNum(){
	var dayNum = 0;
	var classNum = 0;
	weekClassNum = 0;
	var lastDay = 0;
	var amnoon = 0;
	if(scheduleInfo!=undefined){
		dayNum = scheduleInfo.dayNum;
		classNum = scheduleInfo.classNum;
		weekClassNum = scheduleInfo.weekClassNum;
		lastDay = scheduleInfo.lastDay;
		amnoon = scheduleInfo.amnoon;
	}
	var theadHtml = '<tr><th>节次</th>';
	var tbodyHtml = "";
	for (var i = 1; i <= dayNum; i++) {
		theadHtml += '<th>星期'+numToWeekNum(i)+'</th>';
	}
	theadHtml += '</tr>';
	for (var j = 1; j <= classNum; j++) {
		tbodyHtml += '<tr><td class="wx_jieci">第'+numToClassNum(j)+'节</td>';
		for (var i = 1; i <= dayNum; i++) {
			if(lastDay==1&&i==dayNum&&j>amnoon){
				tbodyHtml += '<td class="notCheck" id="'+i+""+j+'" weekNum="'+i+'" lessonNum="'+j+'"></td>';
			}else{
				tbodyHtml += '<td class="checktd" id="'+i+""+j+'" weekNum="'+i+'" lessonNum="'+j+'" csid="" subjectId=""></td>';
			}
		}
		tbodyHtml += "</tr>";
	}
	$("#thead").html(theadHtml);
	$("#tbody").html(tbodyHtml);
	//回显课表
	setNodeTime();
}

//删除未排节次样式和可移动属性
function removeClassAndAttr(){
	$('#noScheduleSub em').removeClass("wx_lvkuai");
	$('#noScheduleSub em').removeAttr('ondrop');
	$('#noScheduleSub em').removeAttr('ondragover');
	$('#noScheduleSub em').removeAttr('draggable');
	$('#noScheduleSub em').removeAttr('ondragstart');
}

//weekNum数字转换中文
function numToWeekNum(num){
	if(num==1){
		return "一";
	}else if(num==2){
		return "二";
	}else if(num==3){
		return "三";
	}else if(num==4){
		return "四";
	}else if(num==5){
		return "五";
	}else if(num==6){
		return "六";
	}else if(num==7){
		return "日";
	}
}

//classNum数字转换中文
function numToClassNum(num){
	if(num==1){
		return "一";
	}else if(num==2){
		return "二";
	}else if(num==3){
		return "三";
	}else if(num==4){
		return "四";
	}else if(num==5){
		return "五";
	}else if(num==6){
		return "六";
	}else if(num==7){
		return "七";
	}else if(num==8){
		return "八";
	}else if(num==9){
		return "九";
	}else if(num==10){
		return "十";
	}
}
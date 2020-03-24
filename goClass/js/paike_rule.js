var spaceDialogType = 'insert';
var clickFlag = true;
$(function () {
	addTab(4);
    $(".wx_role_ul ul li").on("click", function () {
        var index = $(this).index()
        $(this).addClass("active").siblings().removeClass("active")
        $(".wx_set_guize_ul>div").eq(index).show().siblings().hide();
        initList(index);
    })
    //初始化科目规则模块
//  initSubjectRule();
    schedulenames();
})
/**
 * 查询课表名称
 * @param scheduleId
 */    
function schedulenames(){
	$.ajax({
		type:"get",
		url:serverIp  + "/schedule/"+scheduleId,
		async:false,
		success:function(resJson){
			if(resJson.code==200){
				var data = resJson.data;
				$('.schedulename').html(data.name);
				$('.sel_sub').html('<option value="'+data.gradeId+'">'+data.gradeName+'</option>');
//				$('#schedule_name').html(data.name);
			}else{
				warnTips(resJson.message);
			}
		}
	});
}
/**
 * 点击标签初始化查询方法
 * @param index
 */
function initList(index){
	 switch(index)
     {
     case 0:
    	 break;
     case 1:
    	//教师规则
    	 initTeacherRule();
    	 break;
     case 3:
    	 //场地规则
    	 findSpaceRuleList();
    	 break;
     case 4:
    	 //合班规则
    	 findClassRuleList();
    	 break;
     case 5:
    	 //单双周规则
    	 findAloneWeekClass();
    	 break;
     default:
    	 
     }
 }

/**
 * 常见问题弹窗
 */
function helpTips(){
	$('#helpTips').show();
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
function deleteTips(id,type){
	  $('#deleteTips').show();
	  $('#deleteTipsYesBtn').unbind("click");
	  $('#deleteTipsYesBtn').on('click',function(){
		  $('.wx_delet_tips').hide();
		  switch (type) {
			case 'classRule':
				deleteClassRule(id);
				break;
			case 'classRuleClass':
				deleteClassRuleClass(id);
				break;
			case 'spaceRule':
				deleteSpaceRule(id)
				break;
			case 'weekRule':
				deleteWeekRule(id)
				break;
			default:
				break;
		}
	  })
}

/**
 * 成功提示
 */
function successTips(type){
	var msg = '添加成功';
	if('update'==type){
		msg = '修改成功';
	}else if('del'==type){
		msg = '删除成功';
	}
	messagePrompt('successTips', msg);
}

/**
 * 失败提示
 */
function failTips(){
	var msg = '添加失败';
	if('update'==type){
		msg = '修改失败';
	}else if('del'==type){
		msg = '删除失败';
	}
	messagePrompt('failTips', msg);
}

/**
 * 警告提示
 */
function warnTips(msg){
	messagePrompt('warnTips', msg);
}
/***********************************************************************************场地规则start**********************************************************************************/
 
/**
 * 查询场地规则列表
 */
 function findSpaceRuleList(){
	 var data = {scheduleId:scheduleId};
	 $.ajax({
		 url: serverIp+'/spaceRule',
		 data:data,
		 success:function(res){
			 var html = '';
			 if(res.code==200){
				 var list = res.data;
				 for(var i=0;i<list.length;i++){
					 var tem = list[i];
					 html += '<tr>\
		                         <td>'+(i+1)+'</td>\
		                         <td>'+tem.subjectName+'</td>\
		                         <td>'+tem.lessonMostNum+'</td>\
		                         <td><span class="wx_lanzi" onclick='+"'"+'updateSpaceDialog('+JSON.stringify(tem)+')'+"'"+'><em class="index_paikeicon"></em>修改</span><span class="wx_hongzi" onclick="deleteTips('+"'"+tem.id+"'"+","+"'spaceRule'"+')"><em class="index_delet"></em>删除</span> </td>\
		                     </tr>';
				 }
			 }
			 $('#spaceRuleTbody').html(html);
		 }
	 })
 }
 /**
  * 添加场地规则弹出框
  * @param tem
  */
 function insertSpaceDialog(){
	 spaceDialogType = 'insert';
	 $('#spaceDialogTitle').html('添加场地规则');
	 $('#spaceRuleDialog').show();
	 $("#spaceDialogSubject").empty();
	 findSubjectList(null,'insert');
	 $('#spaceRuleClassNum').val('');
	 $('#spaceTip').html('');
 }
 
 /**
  * 添加场地规则
  * @param tem
  */
 function insertSpaceRule(){
	 var data={};
	 var tipType = 'add';
	 var requestType = 'post';
	 var url = serverIp+'/spaceRule';
	 if(spaceDialogType == 'update'){
		 url = serverIp+'/spaceRule/'+$('#spaceRuleId').val();
		 tipType = 'update';
		 requestType = 'put';
	 }
	 var $Subject = $("#spaceDialogSubject .active");
	 if($Subject.length==0){
		 warnTips('请选择科目!')
		 return;
	 }
	 var subjectId = $Subject.attr('id');
	 var subjectName = $Subject.text();
	 var lessonMostNum = $('#spaceRuleClassNum').val();
	 if(lessonMostNum == ""){
		 warnTips('请输入科目在同一节次最多可排班级数!')
		 return;
	 }
	 if(parseInt(lessonMostNum)<1){
 		warnTips('请输入合法的班级数!')
		return;
 	 }
	 $.extend(true,data,{scheduleId:scheduleId,subjectId:subjectId,subjectName:subjectName,lessonMostNum:lessonMostNum})
	 $.ajax({
		 url:url,
		 data:{data:JSON.stringify(data)},
		 type:requestType,
		 success:function(res){
			 if(res.code==200){
				 $('#spaceRuleDialog').hide();
				 successTips(tipType);
				 findSpaceRuleList();
			 }else{
//				 warnTips(res.msg);
				 $('#spaceTip').html('提示:'+res.msg);
			 }
		 }
	 })
 }
 
 /**
  * 修改场地规则弹出框
  * @param tem
  */
 function updateSpaceDialog(spaceRule){
	 spaceDialogType = 'update';
	 $('#spaceDialogTitle').html('修改场地规则');
	 $("#spaceDialogSubject").empty();
	 $('#spaceRuleDialog').show();
	 findSubjectList(spaceRule,'update');
	 $('#spaceRuleClassNum').val(spaceRule.lessonMostNum);
	 $('#spaceRuleId').val(spaceRule.id);
	 $('#spaceTip').html('');
 }
 
 /**
  * 删除场地规则
  */
 function deleteSpaceRule(id){
	 $.ajax({
		 url:serverIp+'/spaceRule/'+id,
		 type:'delete',
		 success:function(res){
			 if(res.code==200){
				 successTips('del');
				 findSpaceRuleList();
			 }
		 }
	 })
 }
 
 /**
  * 根据课表Id查询科目
  * @param spaceRule
  */
 function findSubjectList(spaceRule,type){
	 $.ajax({
		type:"get",
		url:serverIp+"/spaceRule",
		data:{scheduleId:scheduleId,spaceSub:1},
		success:function(resJson){
			var data = resJson.data;
			var html ='';
			 if(resJson.code==200){
				 var subjectList = resJson.data;
				 if(type=='update'){
					 var subject = {sid:spaceRule.subjectId,sname:spaceRule.subjectName};
					 subjectList.splice(0,0,subject)
				 }
				 for(var i=0;i<subjectList.length;i++){
					 var tem = subjectList[i];
					 var active = spaceRule!= null&&spaceRule.subjectId == tem.sid?'active':'';
					 html += '<span id="'+tem.sid+'" class="'+active+'" >'+tem.sname+'</span>';
					
				 }
			 }
			 $('#spaceDialogSubject').html(html);
			 $("#spaceDialogSubject span").on("click", function () {
		         $(this).addClass("active").siblings().removeClass("active")
		         var classNum = spaceRule!= null&&$(this).attr('id')==spaceRule.sid?spaceRule.lessonMostNum:'';
		         $('#spaceRuleClassNum').val(classNum);
		     })
		}
	});
 }
 
 /***********************************************************************************场地规则end**********************************************************************************/
 
 
 /***********************************************************************************合班规则start**********************************************************************************/
 /**
  * 查询合班规则列表
  */
  function findClassRuleList(){
 	 var data = {scheduleId:scheduleId};
 	 $.ajax({
 		 url: serverIp+'/classRule',
 		 data:data,
 		 success:function(res){
 			var html = '';
 			 if(res.code==200){
 			 	$('.hb_have').show();
 				 	$('.hb_no').hide();
 				 var list = res.data;
 				 for(var i=0;i<list.length;i++){
 					 var tem = list[i];
 					html += '<tr>\
		                         <td class="cr_hb_name_width"><em class="kebiaoicon"></em>'+tem.className+'</td>\
		                         <td class="cr_hb_class_width">';
 					 			if(tem.childrenList.length>0){
 					 				for(var n=0;n<tem.childrenList.length;n++){
 					 					var sonTem = tem.childrenList[n];
 					 					html+= '<span id="'+sonTem.id+'">'+sonTem.className+'<em onclick="deleteTips('+"'"+sonTem.id+"'"+","+"'classRuleClass'"+')" class="cuoicon"></em></span>'
 					 				}
 					 			}
 					html+= '	 </td>\
		                         <td>\
		                             <button onclick="deleteTips('+"'"+tem.id+"'"+","+"'classRule'"+')" class="index_hongse"><em class="index_delet"></em>删除</button>\
		                         </td>\
		                     </tr>';
 				 }
 			 }else{
 			 	$('.hb_have').hide();
 				$('.hb_no').show();
 			 }
   			 $('.wx_heban_table').html(html);
 		 }
 	 })
  }
  
  /**
   * 添加合班规则弹出框
   * @param tem
   */
  function insertClassDialog(){
 	 $('#classDialogTitle').html('添加合班规则');
 	 $('#classRuleDialog').show();
 	 $("#classDialogSubject").empty();
	 findSub();
 	 $('#hb_tc_class').html('');
  }
  
  /**
   * 查询科目
   */
  function findSub(){
  	$.ajax({
		type:"get",
		url:serverIp+"/gradeSubject",
		data:{scheduleId:scheduleId},
		success:function(resJson){
			var html = '';
			if(resJson.code==200){
				var data = resJson.data;
				$.each(data, function(i,o) {
					html += '<span data-id="'+o.sid+'">'+o.sname+'</span>';
				});
			}
			$('#hb_tc_sub').html(html);
			$('#hb_tc_sub span').unbind('clcik');
			$('#hb_tc_sub span').on('click',function(){
				$('#hb_tc_sub span').removeClass('active');
				$(this).addClass('active');
				findClass($(this).data('id'));
			})
		}
	});
  }
  
  /**
   * 根据科目查询班级
   * @param {Object} sid
   */
  function findClass(sid){
  	$.ajax({
  		type:"get",
  		url:serverIp+"/classRule",
  		data:{scheduleId:scheduleId,subjectId:sid,noClassRule:1},
  		success:function(resJson){
  			var html = '';
  			if(resJson.code==200){
  				var data = resJson.data;
				$.each(data, function(i,o) {
					html += '<span data-id="'+o.classId+'">'+o.className+'</span>';
				});
  			}
  			$('#hb_tc_class').html(html);
  			$('#hb_tc_class span').unbind('clcik');
			$('#hb_tc_class span').on('click',function(){
				$(this).toggleClass('active');
			})
  		}
  	});
  	
  }
  
  /**
   * 添加合班规则
   * @param tem
   */
  function insertClassRule(){
 	 var data={};
 	 var url = serverIp+'/classRule';
 	 var $Subject = $("#hb_tc_sub .active");
 	 if($Subject.length==0){
 		 warnTips('请选择科目!')
 		 return;
 	 }
 	 var $classRuleClass = $('#hb_tc_class .active');
 	 if($classRuleClass.length<2){
 		 warnTips('请选择最少两个班级!')
		 return;
 	 }
 	 
	 var subjectId = $Subject.data('id');
 	 var subjectName = $Subject.text();
 	 
 	 var childrenList = [];
 	 for(var i=0;i<$classRuleClass.length;i++){
 		var temId = $classRuleClass.eq(i).data('id'); 
 		var temName = $classRuleClass.eq(i).text(); 
 		var tem = {};
 		tem.classId = temId;
 		tem.className = temName;
 		childrenList.push(tem);
 	 }
 	 data['scheduleId']=scheduleId;
 	 data['subjectId']=subjectId;
 	 data['subjectName']=subjectName;
 	 data['gradeId']=$('.sel_sub').val();
 	 data['gradeName']=$('.sel_sub').text();
 	 data['childrenList']=childrenList;
 	 $.ajax({
 		 url:url,
 		 type:'post',
 		 data:{data:JSON.stringify(data)},
 		 success:function(res){
 			 if(res.code==200){
 				 $('#classRuleDialog').hide();
 				successTips('add');
 				 findClassRuleList();
 			 }else{
 				 warnTips(res.msg);
 			 }
 		 }
 	 })
  }
  
  /**
   * 删除合班规则
   * @param id
   */
  function deleteClassRule(id){
	  $.ajax({
		  url:serverIp+'/classRule/'+id,
		  type:'delete',
		  success:function(res){
			  if(res.code==200){
				  successTips('del');
				  findClassRuleList();
			  }
		  }
	  })
  }
  
  
  /**
   * 删除合班规则班级
   * @param id
   */
  function deleteClassRuleClass(id){
	  $.ajax({
		  url:serverIp+'/classRuleClass/'+id,
		  type:'delete',
		  success:function(res){
			  if(res.code==200){
				  successTips('del');
				  findClassRuleList();
			  }
		  }
	  })
  }
  
/***********************************************************************************合班规则end**********************************************************************************/
  
/***********************************************************************************单双周规则start**********************************************************************************/
/**
 * 根据课表Id查询设置单双周的班级
 */
function findAloneWeekClass(){
	$.ajax({
		url:serverIp+'/userCourse',
		data:{scheduleId:scheduleId,aloneWeekClass:'1'},
		type:'get',
		success:function(res){
			var html = '';
			var classId = '';
			if(res.code==200){
				var data = res.data;
				$.each(data, function(i,o) {
					html += '<option value="'+o.classId+'">'+o.className+'</option>';
					
				});
				classId = data[0].classId;
			}else{
				html = '<option value="">请选择班级</option>';
			}
			findWeekSubject(classId);
			findWeekRule();
			$('#sel_class').html(html);
			$('#sel_class').unbind();
			$('#sel_class').on('change',function(){
				findWeekSubject($(this).val());
			})
		}
	})
}

/**
 * 查询单双周科目
 */
function findWeekSubject(classId){
	$('#weekSubject').empty();
	$('#weekSubject').removeClass('red_font');
	$.ajax({
		url:serverIp+'/aloneWeekRule',
		data:{scheduleId:scheduleId,classId:classId,notAloneWeekSub:'1'},
		type:'get',
		success:function(res){
			if(res.code==200){
				var list = res.data;
				for(var i=0;i<list.length;i++){
					var tem = list[i];
					$('#weekSubject').append('<span id="'+tem.sid+'">'+tem.sname+'</span>');
				}
			}else{
				$('#weekSubject').html('你还没有设置单双周科目，请返回“设置教学任务”，选择单周和双周分别上课的两门科目，将科目每周上课节次设为带0.5节的课时，如0.5、1.5、2.5等，如假设“阅读”和“写作”，上课节数分别设为0.5节，则课表显示为“阅读/写作”，表示单双周轮换。');
				$('#weekSubject').addClass('red_font');
			}
			$('#weekSubject span').on('click',function(){
				if($(this).hasClass('active')){
					$(this).removeClass("active");
				}else{
					if($('#weekSubject .active').length<2){
						$(this).addClass("active");
					}
				}
				if($('#weekSubject .active').length==2){
					$('#insertWeekBtn').removeClass('wx_noaccess_btn');
					$('#insertWeekBtn').addClass('wx_sure_btn');
					if(clickFlag){
						$('#insertWeekBtn').on('click',function(){
							insertWeekRule();
						})
					}
					clickFlag = false;
				}else{
					clickFlag = true;
					$('#insertWeekBtn').unbind("click");
					$('#insertWeekBtn').removeClass('wx_sure_btn');
					$('#insertWeekBtn').addClass('wx_noaccess_btn');
				}
			})
		}
		
	})
	
}

/**
 * 添加单双周规则
 */
function insertWeekRule(){
	var data = {};
	var classId = $('#sel_class').val();
	var className = $('#sel_class').find("option:selected").text();
	
	var subjectFirstId = $('#weekSubject .active')[0].id;
	var subjectFirstName = $('#weekSubject .active')[0].innerText;
	
	var subjectSecondId = $('#weekSubject .active')[1].id;
	var subjectSecondName = $('#weekSubject .active')[1].innerText;
	
	data['scheduleId'] = scheduleId;
	data['classId'] = classId;
	data['className'] = className;
	data['subjectFirstId'] = subjectFirstId;
	data['subjectFirstName'] = subjectFirstName;
	data['subjectSecondId'] = subjectSecondId;
	data['subjectSecondName'] = subjectSecondName;
	
	$.ajax({
		url:serverIp+'/aloneWeekRule',
		type:'post',
		data:{data:JSON.stringify(data)},
		success:function(res){
			if(res.code==200){
				successTips('add');
				findWeekSubject(classId);
				findWeekRule();
			}
		}
	})
	
	
	
}

/**
 * 查询单双周规则
 */
function findWeekRule(){
	var data = {};
	data['scheduleId'] = scheduleId;
	$.ajax({
		url:serverIp+'/aloneWeekRule',
		type:'get',
		data:data,
		success:function(res){
			var html = '';
			if(res.code==200){
				var list = res.data;
				for(var i=0;i<list.length;i++){
					var tem = list[i];
					html+='<p class="wx_huizi wx_ml100">('+tem.className+' | '+tem.subjectFirstName+'/'+tem.subjectSecondName+')<span onclick="deleteTips('+"'"+tem.id+"'"+","+"'weekRule'"+')" class="wx_delet_week">删除</span></p>';
				}
			}
			$('#weekRuleList').html(html);
		}
	})
	
	
}

/**
 * 删除单双周规则
 */
function deleteWeekRule(id){
	var classId = $('#sel_class').val();
	$.ajax({
		url:serverIp+'/aloneWeekRule/'+id,
		type:'delete',
		success:function(res){
			if(res.code==200){
				successTips('del');
				findWeekSubject(classId);
				findWeekRule();
			}
		}
	})
}
  
  
  
  /***********************************************************************************单双周规则end**********************************************************************************/

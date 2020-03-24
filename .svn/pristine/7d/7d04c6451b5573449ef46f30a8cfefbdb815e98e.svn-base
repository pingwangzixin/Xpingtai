//分班id
var divideClassId = '';
//选科id
var subjectId = '';
//单科、组合
var style = 1;
//选科list
var selectSubList = [];
//选中的选科data
var selectSubData = [];
//调班参数
var changeData = {}
var changeStuNum = 0;
var changeSelTemId = '';
var closeType = 'close';

$(function(){
	//获取到Url里面的参数 
	getUlrParam();
	//分班id
	divideClassId = $.getUrlParam('id');
	//初始化分班信息
	finddivideClassInfo();
	//查询选科信息
	getSelectSub();
	//查询组合
	findStuSelectSubList();
	
	//点击调班
	$(".daoru").click(function(){
		//根据选科查班级
		findMiddleSelectSubList(2)
		//查询调班第一个科目班级
		findNewClass();
		//查询学生
		findStuBySelSub();
	})
	//切换科目
	$("#change_sel").change(function(){
		var csn = $('#no_change_table .change_class').length;
		var unlined = $('#change_table tr').length;
		if(csn>0||unlined>0){
			$('#deleteTips').show();
			changeSelTemId = $(this).val();
			$(this).val(changeData.ids);
			closeType = 'select';
			return;
		}
		changeData.ids = $(this).val();
		changeData.idsName = $(this).children('option:selected').text();
		
		//根据选科查班级
		findNewClass();
		findStuBySelSub();
	})
	
	$('#dc_detail_search_btn').click(function(){
		findDivideClassDetail();
		//subjectId:selSubId,divideId:dcId,className:$('#className_input').val(),stuName:$('#stuName_input').val()
	})
	//调班
    $('.tiaoban .daoru').click(function(){
        $('#mlh_change').show();
    });
    
    $('.mlh_tc .mlh_close').click(function(obj){
    	closeType = 'close';
    	if($(this).hasClass('change_close')){
    		var csn = $('#no_change_table .change_class').length;
			var unlined = $('#change_table tr').length;
			if(csn>0||unlined>0){
				$('#deleteTips').show();
				return false;
			}
    	}
        $(obj.currentTarget.parentElement.parentElement.parentElement).hide();
    });
    
    // 全选
    $('.have-row .checkbox-all').on('change', function() {
        $('.have-row .checkbox-all').prop('checked', $(this).prop('checked'));
        $('.have-row tbody .nc_'+changeData.classId+' input[type="checkbox"]').prop('checked', $(this).prop('checked'));
    });
    
    $('.not-line .checkbox-all').on('change', function() {
        $('.not-line .checkbox-all').prop('checked', $(this).prop('checked'));
        $('.not-line tbody input[type="checkbox"]').prop('checked', $(this).prop('checked'));
    });
    
});

/**
 * 保存调班
 */
function saveChangeClass(saveType){
	$changeStu = $('#no_change_table .change_class');
	var unlined = $('#change_table tr').length;
	if(unlined){
		warnTips('您有未安排班级的学生,请先将学生安排班级');
		cancel('deleteTips');
		return;
	}
	if($changeStu.length==0){
		successTips('adjust');
		return;
	}
	var changeStuArr = [];
	$changeStu.each(function(){
		$item = $(this);
		var tem = {};
		tem['newClassId'] = $item.data('newClassId');
		tem['studentId'] = $item.data('stuid');
		tem['oldClassId'] = $item.data('classid');
		changeStuArr.push(tem);
	})
	
	$.ajax({
		type:"put",
		url:serverIp + "/newClass",
		data:{data:JSON.stringify(changeStuArr)},
		success:function(resJson){
			if(resJson.code==200){
				successTips('adjust');
				$('#no_change_table .change_class').each(function(){
					$(this).removeClass('change_class');
				})
				if(saveType!='save'){
					abandon();
				}
			}else{
				warnTips(resJson.message);
				cancel('deleteTips');
			}
			
		}
	});
	
}

/**
 * 删除学生按钮
 */
function removeStu(){
	var $selTr = $('#no_change_table input[type="checkbox"]:checked').parents('tr');
	if($selTr.length==0){
		return;
	}
	var classId = changeData.classId;
	$selTr.each(function(){
		$(this).removeData('newClassId');
		$(this).removeClass('nc_'+classId);
		$(this).removeClass('change_class');
	})
	changeStuNum += $selTr.length;
	$('#change_table').prepend($selTr);
	$('#change_table input[type="checkbox"]:checked').prop("checked",false);
	if($('#no_change_table .nc_'+classId).length==0){
		$('#no_change_all').prop("checked",false);
	}
	$('#change_stu_num').html(changeStuNum);
	$('#change_sel_num').html($('#no_change_table .nc_'+classId).length);
}

/**
 * 添加学生按钮
 */
function insertStu(){
	var $selTr = $('#change_table input[type="checkbox"]:checked').parents('tr');
	if($selTr.length==0){
		return;
	}
	var newClassId = changeData.classId;
	if(($('#no_change_table .nc_'+newClassId).length+$selTr.length)>changeData.classPerson){
		warnTips('超过最大班额数('+changeData.classPerson+')，无法插入');
		return;
	}
	
	$selTr.each(function(){
		var oldClassId = $(this).data('classid');
		if(oldClassId!=newClassId){
			$(this).addClass('change_class');
			$(this).data('newClassId',newClassId);
		}
		$(this).addClass('nc_'+newClassId);
	})
	changeStuNum -= $selTr.length;
	$('#no_change_table').prepend($selTr);
	$('#no_change_table input[type="checkbox"]:checked').prop("checked",false);
	if(changeStuNum == 0){
		$('#change_all').prop("checked",false);
	}
	$('#change_stu_num').html(changeStuNum);
	$('#change_sel_num').html($('#no_change_table .nc_'+newClassId).length);
}

/**
 * 调整查询
 */
function changeSearch(){
	var searchName = $('#change_search_input').val();
	$('#no_change_table .nc_'+changeData.classId).hide();
	$('#no_change_table .nc_'+changeData.classId).each(function(){
		if($(this).children('td').eq(1).html().indexOf(searchName)!=-1){
			$(this).show();
		}
	})
}

/**
 * 重置调整弹窗
 */
function resetChange(id){
	changeStuNum = 0;
    $('#change_table').empty();
    $('#change_stu_num').html(changeStuNum);
    $('#change_sel').val(id);
    $('#change_sel').trigger('change');
}

/**
 * 放弃调整
 */
function abandon(){
	cancel('deleteTips');
	switch (closeType){
		case 'close':
			$('#mlh_change').hide();
			break;
		case 'select':
			resetChange(changeSelTemId);
			break;
		default:
			break;
	}
	
}

//初始化分班信息
function finddivideClassInfo(){
	$.ajax({
		url:serverIp+'/divideClass/'+divideClassId,
		type:'get',
		async:false,
		success:function(result){
			if(result.code==200){
				var data = result.data;
				subjectId = data.subjectId;
				$('#divideName').html("选科名称："+data.name);
			}else{
				console.log('查询失败');
			}
		},error:function(msg){
			failTips('query');
		}
	});
}

//根据选科id查询学生选科信息
function findStuSelectSubList(){
	//先清空
	selectSubData = [];
	$.ajax({
		url:serverIp+'/selectsub',
		type:'get',
		data:{isProgress:'true','id':subjectId,'style':style},
		async:false,
		success:function(result){
			if(result.code==200){
				var data = result.data;
				selectSubData = data;
				var stuSelectSubList = '';
				//循环选科
				for(var i=0,len=data.length; i<len; i++){
					stuSelectSubList += '<a href="#" class="mlh_btn" id="'+data[i].id+'">'+data[i].name+'('+data[i].count+')</a>';
				}
				$('#stuSelectSub').html(stuSelectSubList);
				//选中、取消选中选科组合
				$('#stuSelectSub a').click(function(){
					if($(this).hasClass('active')){
						$(this).removeClass('active');
					}else{
						$(this).addClass('active');
					}
				});
				//根据选科id查询固定、走班行政、走班教学
				findMiddleSelectSubList(1);
				//初始化学生
				showInfo();
			}else{
				console.log('查询失败');
			}
		},error:function(msg){
			failTips('query');
		}
	});
}

//根据选科id查询选科信息
function getSelectSub(){
	$.ajax({
		url:serverIp+'/selectsub/'+subjectId,
		type:'get',
		async:false,
		success:function(result){
			if(result.code==200){
				//根据选科id查询固定、走班行政、走班教学
				var data = result.data;
				style = data.style;
			}else{
				console.log('查询失败');
			}
		},error:function(msg){
			failTips('query');
		}
	});
}

//查询学生
function showInfo(){
	var ids = $('#subjectAssemble').val();
	var name = $('#className').val();
	var stuName = $('#stuName').val();
	$.ajax({
		url:serverIp+'/middleDivideClassController/showInfo',
		type:'get',
		data:{divideId:divideClassId,subjectId:subjectId,ids:ids,name:name,stuName:stuName},
		async:false,
		success:function(result){
			if(result.code==200){
				var data = result.data;
				var html = '';
				for(var i=0,len=data.length; i<len; i++){
					var subIds = data[i].subIds;
					var sid = data[i].ids;
					html+='<tr>'
							+'<td>'+(i+1)+'</td>'
							+'<td>'+data[i].newClassName+'</td>'
							+'<td>'+data[i].stuName+'</td>'
							+'<td>'+checkSubNames(subIds)+'</td>'
							+'<td>'+data[i].className+'</td>';
							var split = [];
							if(sid=='hunheId'||sid.indexOf(',')==-1){
								split = data[i].jxName.split(',');
							}
							var slen = 3;
							for(var j=1,length=6; j<=length; j++ ){
								if((sid=='hunheId'||sid.indexOf(',')==-1)&&subIds.indexOf(j)!=-1){
									slen--;
									html+='<td>'+idToName(j)+'</td>'
								}else if(subIds.indexOf(j)!=-1){
									html+='<td>'+idToName(j)+'</td>'
								}else{
									html+='<td><br /></td>'
								}
							}
							
					html+='</tr>';
				}
				$('#showInfoList').html(html);
			}else{
				console.log('查询失败');
			}
		},error:function(msg){
			failTips('query');
		}
	});
}

//教学班级
function checkJxName(split, name){
	for(var n=0,length=split.length; n<=length; n++ ){
		if(split[n].indexOf(name)!=-1){
			return split[n];
		}
	}
}

function findMiddleSelectSubList(type){
	$.ajax({
		url:serverIp+'/middleDivideClassController/findMiddleSelectSubList',
		type:'get',
		data:{divideId:divideClassId,subjectId:subjectId},
		async:false,
		success:function(result){
			if(result.code==200){
				var data = result.data;
				var html = '';
				for(var i=0,len=data.length; i<len; i++){
					html+='<option value="'+data[i].ids+'">'+checkSubName(data[i].ids)+'</option>';
				}
				if(type==1){
					html='<option value="">全部</option>'+html;
					$("#subjectAssemble").html(html);
				}else{
					$("#change_sel").html(html);
				}
			}else{
				console.log('查询失败');
			}
		},error:function(msg){
			failTips('query');
		}
	});
}


//根据组合id查询班级、班级人数统计
function findNewClass(){
	var ids = $('#change_sel').val();
	$.ajax({
		url:serverIp+'/newClass/findNewClassList',
		type:'get',
		data:{divideId:divideClassId,subjectId:subjectId,ids:ids},
		async:false,
		success:function(result){
			if(result.code==200){
				var data = result.data;
				var html='';
				for(var i=0,len=data.length; i<len; i++){
					html+='<option value="'+data[i].id+'" classPerson="'+data[i].classPerson+'" count="'+(data[i].girlCount+data[i].boyCount)+'">'+data[i].name+'</option>';
				}
				$("#change_class_sel").html(html);
				$("#change_sel_num").html(data[0].girlCount+data[0].boyCount);
				changeData.classId = data[0].id;
				changeData.className =  data[0].name;
				changeData.classPerson = data[0].classPerson;
				console.log('查询成功');
			}else{
				console.log('查询失败');
			}
		},error:function(msg){
			failTips('query');
		}
	});
}

function findStuBySelSub(){
	$('#change_table').html('');
	$('#change_stu_num').html(0);
	var ids = $('#change_sel').val();
	$.ajax({
		url:serverIp+'/middleDivideClassController/showInfo',
		type:'get',
		data:{divideId:divideClassId,subjectId:subjectId,ids:ids},
		async:false,
		success:function(result){
			if(result.code==200){
				var data = result.data;
				var html = '';
				for(var i=0,len=data.length; i<len; i++){
					html+='<tr class="class_stu_table nc_'+data[i].newClassId+'" data-stuid="'+data[i].stuId+'" data-classid="'+data[i].newClassId+'">'
							+'<td><input id="" type="checkbox" name="" class="checkbox"></td>'
							+'<td>'+data[i].stuName+'</td>'
							+'<td>'+data[i].sex+'</td>'
							+'<td>'+data[i].subNames+'</td>'
							+'<td>'+data[i].newClassName+'</td>'
						+'</tr>';
				}
				$('#no_change_table').html(html);
				//绑定是否全选
				$('#no_change_table input[type="checkbox"]').on('click', function() {
			        var maxLen = $('#no_change_table .nc_'+changeData.classId+' input[type="checkbox"]').length;
			        var cheLen = $('#no_change_table input[type="checkbox"]:checked').length;
			        if(maxLen>0&&maxLen==cheLen){
			        	$('#no_change_all').prop('checked', true);
			        }else{
			        	$('#no_change_all').prop('checked', false);
			        }
			        
			        maxLen = $('#change_table input[type="checkbox"]').length;
			        cheLen = $('#change_table input[type="checkbox"]:checked').length;
			        if(maxLen>0&&maxLen==cheLen){
			        	$('#change_all').prop('checked', true);
			        }else{
			        	$('#change_all').prop('checked', false);
			        }
			    });
				
				$('#no_change_table .class_stu_table').hide();
				$('#no_change_table .nc_'+changeData.classId).show();
				$('#change_class_sel').unbind();
				$('#change_class_sel').on('change',function(){
					changeData.classId = $('#change_class_sel').val();
					changeData.className =  $(this).children('option:selected').text();
					changeData.classPerson = $(this).children('option:selected').attr('classperson');
					$('#change_sel_num').html($('#no_change_table .nc_'+$(this).val()).length);
					$('#no_change_table .class_stu_table').hide();
					$('#no_change_table .nc_'+$(this).val()).show();
				})
			}else{
				console.log('查询失败');
			}
		},error:function(msg){
			failTips('query');
		}
	});
}

function checkSubNames(ids){
	var names = '';
	var split = ids.split(',');
	for(var i=0,len=split.length; i<len; i++){
		names += ','+idToName(Number(split[i]));
	}
	names = names.substring(1);
	return names;
}

function idToName(id){
	var name = '';
	if(id==1){
		name='政治';
	}else if(id==2){
		name='历史';
	}else if(id==3){
		name='地理';
	}else if(id==4){
		name='物理';
	}else if(id==5){
		name='化学';
	}else if(id==6){
		name='生物';
	}
	return name;
}

function checkSubName(ids){
	var names = '';
	if(ids=='hunheId'){
		names = '混合行政班';
	}else{
		if(ids.indexOf(",")==-1){
			names = idToName(ids);
		}else{
			var split = ids.split(',');
			for(var i=0,len=split.length; i<len; i++){
				names += numToName(Number(split[i]));
			}
		}
	}
	return names;
}
function numToName(id){
	var name = '';
	if(id==1){
		name='政';
	}else if(id==2){
		name='历';
	}else if(id==3){
		name='地';
	}else if(id==4){
		name='物';
	}else if(id==5){
		name='化';
	}else if(id==6){
		name='生';
	}
	return name;
}

//获取到Url里面的参数
function getUlrParam(){
	$.getUrlParam = function (name) {  
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');  
    	var r = window.location.search.substr(1).match(reg);  
    	if (r != null) return unescape(r[2]); return null;  
  	}
}
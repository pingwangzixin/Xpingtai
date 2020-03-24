$(function(){
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
        $('#mlh_change').hide();
        $('#totalTable').hide();
        $('#teacherTable').hide();
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
    //补选
    $('.repair a').click(function(){
        $('#election').show();
    });
    //编辑
    $('.repair a').click(function(){
        $('#election').show();
    });
    $('.edit a').click(function(){
        $('#edit').show().find('.mlh_tc').height(400);
    });
    $(".danke").show();
    $(".checkbox label").click(function () {
        var theI = $(this).index();
        if(theI==0){
          $(".danke").show().parents('.mlh_tc').height(400);  
          $(".sanke").hide();
        }else{
           $(".danke").hide();  
           $(".sanke").show().parents('.mlh_tc').height("100%"); 
        }          
    });
    //查看
    $('.check-jindu').click(function(){
        $('#progess').show();
    });
    $('.tc_button .cancel').click(function(){
        $('#progess').hide();
    });
    //删除行
    $(".del a").click(function() {
        var link = $(this).parents(".table-tr");  
        link.remove();  
    });
    //创建分班
    $('.addkebiao').click(function(){
        $('#mlh_class').show();
    });
    //编辑分班
    $('.mlh_table .operate .edit').click(function(){
        $('#mlh_edit').show();
    });
    //调班
    $('.tiaoban .daoru').click(function(){
        $('#mlh_change').show();
    });
    //班级总表
    $('.mlh_query .class_table').click(function(){
        $('#totalTable').show();
    });
    //师资配比表
    $('.mlh_query .teacher_table').click(function(){
        $('#teacherTable').show();
    });
    // 全选
    $('.have-row .checkbox-all').on('change', function() {
        $('.have-row .checkbox-all').prop('checked', $(this).prop('checked'));
        $('.have-row tbody input[type="checkbox"]').prop('checked', $(this).prop('checked'));
    });
    $('.not-line .checkbox-all').on('change', function() {
        $('.not-line .checkbox-all').prop('checked', $(this).prop('checked'));
        $('.not-line tbody input[type="checkbox"]').prop('checked', $(this).prop('checked'));
    });

})
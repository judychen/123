$(function(){
	/*add timeAcl*/
	$("#btn_time_acl_add").click(function(){
		$("#time_acl_add").show();
		$("#time_acl_add").siblings().hide();
	});
	$("#btn_time_acl_add_cancel").click(function(){
		$("#time_acl_add").hide();
		$("#time_acl_main").show();
	});
	$("#btn_time_acl_add_ok").click(function(){
		$("#time_acl_add").hide();
		$("#time_acl_main").show();
	});

	/*edit timeAcl*/
	$("#btn_time_acl_edit").click(function(){
		$("#time_acl_edit").show();
		$("#time_acl_edit").siblings().hide();
	});
	$("#btn_time_acl_edit_cancel").click(function(){
		$("#time_acl_edit").hide();
		$("#time_acl_main").show();
	});
	$("#btn_time_acl_edit_ok").click(function(){
		$("#time_acl_edit").hide();
		$("#time_acl_main").show();
	});

	/*add timeAclRange*/
	$("#btn_time_acl_range_add").click(function(){
		$("#time_acl_range_add").show();
		$("#time_acl_range_add").siblings().hide();
	});
	$("#btn_time_acl_range_cancel").click(function(){
		$("#time_acl_range_add").hide();
		$("#time_acl_edit").show();
	});
	$("#btn_time_acl_range_ok").click(function(){
		$("#time_acl_range_add").hide();
		$("#time_acl_edit").show();
	});



});
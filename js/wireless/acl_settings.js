$(function(){
	/*add acl*/
	$("#btn_acl_add").click(function(){
		$("#acl_add").show();
		$("#acl_add").siblings().hide();
	});
	$("#btn_acl_add_cancel").click(function(){
		$("#acl_add").hide();
		$("#acl_main").show();
	});
	$("#btn_acl_add_ok").click(function(){
		$("#acl_add").hide();
		$("#acl_main").show();
	});

	/*edit acl*/
	$("#btn_acl_edit").click(function() {
		$("#acl_edit").show();
		$("#acl_edit").siblings().hide();
	});
	$("#btn_acl_edit_cancel").click(function(){
		$("#acl_edit").hide();
		$("#acl_main").show();
	});
	$("#btn_acl_edit_ok").click(function(){
		$("#acl_edit").hide();
		$("#acl_main").show();
	});

	/*add acl mac*/
	$("#btn_acl_mac_add").click(function(){
		$("#acl_mac_add").show();
		$("#acl_mac_add").siblings().hide();
	});
	$("#btn_acl_mac_cancel").click(function(){
		$("#acl_mac_add").hide();
		$("#acl_edit").show();
	});
	$("#btn_acl_mac_ok").click(function(){
		$("#acl_mac_add").hide();
		$("#acl_edit").show();
	});



});
$(function(){
	/*add domainset*/
	$("#btn_domainset_add").click(function(){
		$("#domainSet_add").show();
		$("#domainSet_add").siblings().hide();
	});
	$("#btn_domainset_cancel").click(function(){
		$("#domainSet_add").hide();
		$("#domainSet_main").show();
	});
	$("#btn_domainset_ok").click(function(){
		$("#domainSet_add").hide();
		$("#domainSet_main").show();
	});

	/*edit domainset*/
	$("#btn_domainset_edit").click(function(){
		$("#domainSet_edit").show();
		$("#domainSet_edit").siblings().hide();
	});
	$("#btn_domainset_edit_cancel").click(function(){
		$("#domainSet_edit").hide();
		$("#domainSet_main").show();
	});
	$("#btn_domainset_edit_ok").click(function(){
		$("#domainSet_edit").hide();
		$("#domainSet_main").show();
	});

	/*add domainkey*/
	$("#btn_domainkey_add").click(function(){
		$("#domainkey_add").show();
		$("#domainkey_add").siblings().hide();
	});
	$("#btn_domainkey_cancel").click(function(){
		$("#domainkey_add").hide();
		$("#domainSet_edit").show();
	});
	$("#btn_domainkey_ok").click(function(){
		$("#domainkey_add").hide();
		$("#domainSet_edit").show();
	});
	$("#btn_domainkey_clear").click(function(){
		
	});


});
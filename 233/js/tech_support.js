/* tech support */
function isInputValid_ftp_tech() {
	if ( $("#text_ftp_server_tech").val() == "" ) {
		myAlert("FTP服务器不能为空！", "text_ftp_server_tech");
		return false;
	}
	
	if ( $("#text_ftp_cfgName_tech").val() == "" ) {
		myAlert("文件名不能为空！", "text_ftp_cfgName_tech");
		return false;
	}

	if ( !isConfigNameValid($("#text_ftp_cfgName_tech").val()) ) {
		myAlert( "文件名只能包含_.字母和数字！", "text_ftp_cfgName_tech");
		return false;
	}

	if ( isHasChinese( $("#text_ftp_cfgName_tech").val() ) ) {
		myAlert("文件名不能包含中文！", "text_ftp_cfgName_tech");
		return false;
	}
	
	return true;
}
function isInputValid_tftp_tech() {
	if ( $("#text_tftp_server_tech").val() == "" ) {
		myAlert("TFTP服务器不能为空！", "text_tftp_server_tech");
		return false;
	}

	if ( $("#text_tftp_cfgName_tech").val() == "" ) {
		myAlert("文件名不能为空！", "text_tftp_cfgName_tech");
		return false;
	}

	if ( !isConfigNameValid($("#text_tftp_cfgName_tech").val() ) ) {
		myAlert( "文件名只能包含_.字母和数字！", "text_tftp_cfgName_tech");
		return false;
	}

	if ( isHasChinese( $("#text_tftp_cfgName_tech").val() ) ) {
		myAlert("文件名不能包含中文！", "text_tftp_cfgName_tech");
		return false;
	}
	
	return true;
}

function form_tech_export_local_download() {
	var url="setform/tech_support.tar?UID="+parent.uid;
	pageJump( url );
}

function form_cfg_export_local_tech() {
	var url="setform/form_check_access_privilege?UID="+parent.uid;
	var f = new myForm();
	f.add( "test", "test" );
	f.submit( url, form_tech_export_local_download);

/*
	progressTask( 60, form_tech_export_local_download, "诊断信息收集中，请等待。。。" );
	var url="setform/form_tech_support_export_local?UID="+parent.uid;
	var f = new myForm();
	f.add( "test", "test" );
	f.submit_2( url, upgrade_success, stop_progress );
	*/
}

function form_cfg_export_local_tech_success() {
	set_progress_quick( 10 );
}

function form_cfg_export_ftp_tech(){
	if ( !isInputValid_ftp_tech() )	
		return;

	var url="setform/form_tech_support_export_ftp?UID="+parent.uid;
	var f = new myForm();
	f.add( "ftpServer", $("#text_ftp_server_tech").val() );
	f.add( "ftpCfgName", $("#text_ftp_cfgName_tech").val() );
	f.add( "ftpUserName", $("#text_ftp_username_tech").val() );
	f.add( "ftpPassword", $("#text_ftp_password_tech").val() );
	f.submit( url, exportTechSupportSuccess );
}

function form_cfg_export_tftp_tech() {
	if ( !isInputValid_tftp_tech() )	
		return;

	var url="setform/form_tech_support_export_tftp?UID="+parent.uid;
	var f = new myForm();
	f.add( "tftpServer", $("#text_tftp_server_tech").val() );
	f.add( "tftpCfgName", $("#text_tftp_cfgName_tech").val() );
	f.submit( url, exportTechSupportSuccess );
}

function exportTechSupport() {
	var arrJqObj = $(".radio_method_tech");
	for(i = 0; i < arrJqObj.length; i++) {
		var tmp = $( arrJqObj[i] );
		if ( tmp.attr("checked") == "checked" ){
			if ( tmp.val() == "Local" ) {
				form_cfg_export_local_tech();
			} else if ( tmp.val() == "FTP" ) {
				form_cfg_export_ftp_tech();
			} else {
				form_cfg_export_tftp_tech();
			}
		}
	}
}

function changeMethod_tech(obj) {
	$obj = $(obj);
	if ( $(obj).val()=="Local" ){
		$(".tr_local_tech").css("display", "table-row");
		$(".tr_ftp_tech").css("display", "none");
		$(".tr_tftp_tech").css("display", "none");
	} else if ($(obj).val()=="FTP"){
		$(".tr_local_tech").css("display", "none");
		$(".tr_ftp_tech").css("display", "table-row");
		$(".tr_tftp_tech").css("display", "none");
	} else {
		$(".tr_local_tech").css("display", "none");
		$(".tr_ftp_tech").css("display", "none");
		$(".tr_tftp_tech").css("display", "table-row");
	}
}

function exportTechSupportSuccess( data ) {
	myAlert("一键导出成功！");
}
/* tech support, end */

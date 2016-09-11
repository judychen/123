function isInputValid_local(){
	if ( $("#fileField").val() == "" ) {
		myAlert("请选择升级文件！");
		//$("#fileField").focus().select();
		return false;
	}
	return true;
}

function isInputValid_ftp() {
	if ( $("#text_ftp_server").val() == "" ) {
		myAlert( "FTP服务器不能为空！", "text_ftp_server");
		return false;
	}

	if ( $("#text_ftp_cfgName").val() == "" ) {
		myAlert("文件名不能为空！", "text_ftp_cfgName");
		return false;
	}

	if ( !isImageNameValid($("#text_ftp_cfgName").val()) ) {
		myAlert( "文件名只能包含_-.字母数字和空格！", "text_ftp_cfgName");
		return false;
	}
	
	if ( isHasChinese( $("#text_ftp_cfgName").val() ) ) {
		myAlert("文件名不能包含中文！", "text_ftp_cfgName");
		return false;
	}

	return true;
}

function isInputValid_tftp() {
	if ( $("#text_tftp_server").val() == "" ) {
		myAlert( "TFTP服务器不能为空！", "text_tftp_server");
		return false;
	}
	
	if ( $("#text_tftp_cfgName").val() == "" ) {
		myAlert( "文件名不能为空！", "text_tftp_cfgName");
		return false;
	}

	if ( !isImageNameValid( $("#text_tftp_cfgName").val() ) ) {
		myAlert( "文件名只能包含_-.字母数字和空格！", "text_tftp_cfgName");
		return false;
	}

	if ( isHasChinese( $("#text_tftp_cfgName").val() ) ) {
		myAlert("文件名不能包含中文！", "text_tftp_cfgName");
		return false;
	}

	return true;
}

function changeMethod(obj) {
	$obj = $(obj);

	if ( $(obj).val() == "Local" ) {
		$(".tr_local").css("display", "table-row");
		$(".tr_ftp").css("display", "none");
		$(".tr_tftp").css("display", "none");
	} else if ($(obj).val() == "FTP" ) {
		$(".tr_local").css("display", "none");
		$(".tr_ftp").css("display", "table-row");
		$(".tr_tftp").css("display", "none");
	} else {
		$(".tr_local").css("display", "none");
		$(".tr_ftp").css("display", "none");
		$(".tr_tftp").css("display", "table-row");
	}
}

function upgrade() {
	var arrJqObj = $(".radio_method");
	for (var i = 0; i < arrJqObj.length; i++) {
		var tmp = $( arrJqObj[i] );
		if ( tmp.attr("checked") == "checked" ) {
			if ( tmp.val() == "Local" ) {
				if ( !isInputValid_local() )
					return;
				myAlertSelect("设备升级完成后将自动重启,确定要升级吗？", form_dev_imageUpgrade_local);
				//form_dev_imageUpgrade_local();
			} else if ( tmp.val() == "FTP" ) {
				if ( !isInputValid_ftp() )
					return;
				myAlertSelect("设备升级完成后将自动重启,确定要升级吗？", form_dev_imageUpgrade_ftp);
				//form_dev_imageUpgrade_ftp();
			} else {
				if ( !isInputValid_tftp() )
					return;
				myAlertSelect("设备升级完成后将自动重启,确定要升级吗？", form_dev_imageUpgrade_tftp);
				//form_dev_imageUpgrade_tftp();
			}
		}
	}
}

function form_dev_imageUpgrade_local() {
		showWaitConfig(true);
		$.ajaxFileUpload
		(
			{
				url: 'setform/form_dev_imageUpgrade_local?UID='+parent.uid, //用于文件上传的服务器端请求地址
				secureuri: false, //一般设置为false
				fileElementId: 'fileField', //文件上传空间的id属性  <input type="file" id="file" name="file" />
				//dataType: 'json', //返回值类型 一般设置为json
				dataType: 'text',
				success: function (data, status)  //服务器成功响应处理函数
				{
					showWaitConfig(false);
					//alert(data);
					//var reg = /<pre.+?>(.+)<\/pre>/g;
					//data.match(reg);
					//alert(RegExp.$1);
					//var jsonData = eval("("+RegExp.$1+")");
					var jsonData = eval( "("+data+")" );
					//alert("___success:"+jsonData.status);
					if ( jsonData.status == "ok" ) {
						upload_file_success();
						//func(data);
					} else if ( jsonData.status == "error" ){
						showError( true, jsonData.error);
					} else
						showError( true, "未知响应！" );	//never reach here

				},
				error: function (data, status, e)//服务器响应失败处理函数
				{
					alert(e);
				}
			}
		)
		return false;
	//}
}

function form_dev_imageUpgrade_ftp() {
	var url="setform/form_dev_imageUpgrade_ftp?UID="+parent.uid;
	var f = new myForm();
	f.add( "ftpServer", $("#text_ftp_server").val() );
	f.add( "ftpCfgName", $("#text_ftp_cfgName").val() );
	f.add( "ftpUserName", $("#text_ftp_username").val() );
	f.add( "ftpPassword", $("#text_ftp_password").val() );
	f.submit( url, upload_file_success );
}

function form_dev_imageUpgrade_tftp() {
	var url="setform/form_dev_imageUpgrade_tftp?UID="+parent.uid;
	var f = new myForm();
	f.add( "tftpServer", $("#text_tftp_server").val() );
	f.add( "tftpCfgName", $("#text_tftp_cfgName").val() );
	f.submit( url, upload_file_success);
}

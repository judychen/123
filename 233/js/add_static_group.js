function myhelp() {
	popHelp("igmpSnoopingAddStaticGroup");
}

function goBack() {
	/*var page = getQueryString("page");*/
	var url = "igmp_snooping.asp?UID="+parent.uid /*+ "&page=" + page*/;
	pageJump(url);
}

function isInputValid() {
	var group_ip = $("#text_group_ip").val();
	if ( !checkIP(group_ip) ) {
		myAlert("无效的组播IP地址", "text_group_ip");
		return false;
	}

	if ( !is_ip_multicast_address(group_ip) ) {
		myAlert("无效的组播IP地址", "text_group_ip");
		return false;
	}

	if ( is_ip_multicast_address_reserved(group_ip) ) {
		myAlert("无效的组播IP地址", "text_group_ip");
		return false;
	}

	return true;
}

function ok() {
	var group_ip = $("#text_group_ip").val();
	if ( !isInputValid() )
		return;

	var url="setform/form_igmp_snooping_add_static_group?UID="+parent.uid;
	var f = new myForm();
	f.add("group_ip", group_ip);
	f.submit( url, addStaticGroupSuccess );
}

function addStaticGroupSuccess( data ) {
	goBack();
}

function init() {
	setNavigationBar("网络设置>IGMP snooping>新增静态组播组");
} 

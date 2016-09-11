var arrWS;

function myhelp() {
	var nat = jsSpec.spec.nat;
	if ( typeof(nat) != "undefined" )
		popHelp("wizardSettings_nat_summary");
	else
		popHelp("wizardSettings_summary");
}

function isInputValid() {
	return true;
}

function _finish() {
	/* genarate form to post */
	var f = new myForm();
	var url="setform/form_wizard_set?UID=" + parent.uid;

	var temp;
	var step; 
	var nat = jsSpec.spec.nat;
	if ( typeof(nat) != "undefined" )
		step = 1;
	else
		step = 0;

	/* ip settings */
	temp = top.wizard[step++];
	f.add( "ip_mode", temp.ip_mode );
	if ( temp.ip_mode == "static" ) {
		f.add( "static_ip", temp.static_ip );
		f.add( "static_netmask", temp.static_netmask );
		f.add( "static_gateway", temp.static_gateway );
	}
	if ( temp.ip_mode == "pppoe" ) {
		f.add("pppoe_account", temp.pppoe_account);
		f.add("pppoe_password", temp.pppoe_password);
		f.add("pppoe_servicesname", temp.pppoe_servicesname);
		f.add("pppoe_mtu", temp.pppoe_mtu);
		f.add("pppoe_acname", temp.pppoe_acname);
	}
	f.add( "dns_mode", temp.dns_mode );
	if ( temp.dns_mode == "manual" ) {
		f.add( "dns_first", temp.dns_first );
		f.add( "dns_second", temp.dns_second );
	}

	/* admin password settings */
	temp = top.wizard[step++];
	f.add( "password", temp.pwd );
	f.add( "password_check", temp.pwd_check );

	/* vap ssid settings */
	temp = top.wizard[step++];
	//f.add( "ssid_1", temp.ssid_1 );
	//f.add( "ssid_2", temp.ssid_2 );
	var jsRadios = jsSpec.spec.radios;
	for ( var i = 0; i < jsRadios.length; i++ ) {
		eval( "f.add( \"ssid_" + i + "\", temp.ssid_" + i + " )" );
	}

	/* vap security settings */
	f.add( "encrypt", temp.encrypt );
	if ( temp.encrypt == "wpa_mix" ) {
		f.add( "psk", temp.psk );
	}

	//alert( f.html());
	f.submit( url, ajaxDone );
}

function finish() {
	myConfirm("配置完成设备将重启，确定重启吗？", false, _finish);
}

function gohome() {
	window.parent.location.href="index.asp";
}

function ajaxDone( data ) {
	progressTask( 30, gohome );
}

function generate_tr_ssid() {
	var jsRadios = jsSpec.spec.radios;

	var str = "";
	for ( var i = 0; i < jsRadios.length; i++ ) {
		str += "<tr>"
		str += "<td class=\"col1\">" + jsRadios[i].name + " SSID：</td>"
		str += "<td class=\"col2\"><span id=\"span_ssid_" + i + "\"></span></td>";
		str += "</tr>";
	}
	document.write( str );
}

function init() {
	setNavigationBar("配置向导>配置总览");
	var temp;
	var nat = jsSpec.spec.nat;
	/* link_mode */
	if ( typeof(nat) != "undefined" ) {
		temp = top.wizard[0];
		if ( temp.link_mode == "nat" )
			$("#span_link_mode").html("NAT模式");
		else
			$("#span_link_mode").html("桥接模式");
		step = 1;
	} else {
		step = 0;
		$(".part_nat_enable").css("display", "none");
	}

	/* ip settings */
	temp = top.wizard[step++];
	if ( temp.ip_mode == "dhcp" ) {
		$("#span_ip_mode").html("DHCP分配");
	} else if ( temp.ip_mode == "pppoe" ) {
		$("#span_ip_mode").html("PPPoE");
	} else  {
		$("#span_ip_mode").html( temp.static_ip + " / " + temp.static_netmask );
	}

	if ( temp.dns_mode == "manual" )
		$("#span_dns_mode").html("自动");
	else {
		var str = "";
		if ( temp.dns_first != "" )
			str += temp.dns_first;
		else if ( temp.dns_second != "" ) {
			if ( str != "" )
				str += " ";
			str += temp.dns_first;
		}
		$("#span_dns_mode").html( str );
	}

	/* admin password settings */
	temp = top.wizard[step++];
	if ( temp.pwd != "" ) {
		$("#span_admin_pwd").html( "已更改" );
	} else
		$("#span_admin_pwd").html( "未更改" );
	
	temp = top.wizard[step++];
	var jsRadios = jsSpec.spec.radios;
	for ( var i = 0; i < jsRadios.length; i++ ) {
		eval( "$(\"#span_ssid_" + i + "\").html( temp.ssid_" + i + " )" );
	}

	if ( temp.encrypt == "none" )
		$("#span_cipher").html( "None" );
	else
		$("#span_cipher").html( "WPA/WPA2" );
}

$(document).ready( function() {
	arrWS = loadWizardProgress("wizard_summary");

	init();
});

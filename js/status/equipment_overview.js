var eqo = new myGrid("eqo");

$(function(){
	temp = jsDataDevice.device[0];

	$("#product").html(temp.model);
	$("#serial").html(temp.serial);
	$("#ethmac").html(temp.ethmac);
	$("#hardversion").html(temp.hardversion);
	$("#softversion").html(temp.softversion);
	$("#bootversion").html(temp.bootversion);

	$("#uptime").html(temp.uptime);
	if(temp.cpu_usage == "0%")
		$("#cpu_usage").html( "<1%" );
	else
		$("#cpu_usage").html( temp.cpu_usage+"%" );
	$("#cpu_used").css("width", 2*(temp.cpu_usage));
	$("#cpu_free").css("width", 200-2*(temp.cpu_usage));
	$("#mem_usage").html(temp.mem_usage+"%");
	$("#mem_used").css("width", 2*(temp.mem_usage));
	$("#mem_free").css("width", 200-2*(temp.mem_usage));
	$("#gateway").html(temp.gateway);
	$("#dns").html(temp.dns);
	if ( typeof(jsCapwapStatus.day) != "undefined" ) {
			$("#capwap").html( jsCapwapStatus.status + "(" + jsCapwapStatus.day + "天"
				+ jsCapwapStatus.hour + "时" 
				+ jsCapwapStatus.munite + "分)" + "&nbsp;&nbsp;" + jsCapwapStatus.ip);
		} else
			$("#capwap").html( jsCapwapStatus.status + "&nbsp;&nbsp;" + jsCapwapStatus.ip);
	
	var arrInterface = new Array();
	var stat;
	var nCount = 0;
	for (var i = 0; i < jsDataInterface.pkg_interface.length; i++) {
		var tmp = jsDataInterface.pkg_interface[i];
		var ifName = tmp.sect_name;

		if(ifName.indexOf("Gigabit") != -1){
			eval( "stat = jsIfStatus[\"if_giga_eth_status\"][\"" + ifName + "\"]" );
		}else if(ifName.indexOf("Vlan") != -1){
			eval( "stat = jsIfStatus[\"if_vlan_status\"][\"" + ifName + "\"]" );
		}else{
			eval( "stat = jsIfStatus[\"if_eth_status\"][\"" + ifName + "\"]" );
		}

		if(tmp.sect_name.indexOf("Vlan") == -1){
			if ( typeof(tmp.linkmode) == "undefined" || tmp.linkmode == "bridge" )
				tmp.ipaddr = "--";
		}

		if(typeof(stat) != "undefined"){
			arrInterface[nCount++] = tmp.sect_name + ";" + tmp.ipaddr + ";" + stat;
		}

	}
	setNavigationBar("系统状态>设备概览>设备信息");
	eqo.pageview_add('接口', 0, '40%', MG_SORT_SELF, null, null, interface_sort_asc, interface_sort_dsc );
	eqo.pageview_add('IP地址/子网掩码', 1, '40%', MG_SORT_ASCII);
	eqo.pageview_add('状态', 2, '20%', MG_SORT_ASCII);
	eqo.pageview_init(arrInterface, 10, 'list_interface');

})

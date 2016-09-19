var jsDataDevice = {
	"device":[
		{
			"product":"AP3602",
			"model":"AP3602-WS1-FAT",
			"serial":"A2A9C11Z0091004",
			"ethmac":"34:CD:6D:F3:FE:A0",
			"softversion":"V200R006P02",
			"bootversion":"1.0.3",
			"hardversion":"A",
			"uptime":"2天11时28分",
			"cpu_usage":"0",
			"mem_usage":"63",
			"gateway":"172.20.90.1",
			"dns":"114.114.114.114"
		}
	]
};

var jsDataInterface = {
	"pkg_interface":[
		{
			"sect_name":"GigabitEthernet0/0",
			"ipaddr":"",
			"enabled":"enabled",
			"linkmode":"bridge",
			"mtu":"1500"
		},
		{
			"sect_name":"Vlan-interface1", 
			"ipaddr":"172.20.90.219/255.255.255.0",
			"enabled":"enabled",
			"mtu":"1500"
		}
	]
};

var jsIfStatus = {
	 "if_giga_eth_status":{
	 	"GigabitEthernet0/0":"UP"
	 }, 
	 "if_eth_status":{},
	 "if_vlan_status":{
	 	"Vlan-interface1":"UP"
	 } 
};

var jsCapwapStatus = {
	"status":"已连接",
	"day":"0",
	"hour":"01",
	"munite":"31",
	"server_name":"",
	"ip":"172.20.90.240"
};

var tg = new myGrid("tg");

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
	tg.pageview_add('接口', 0, '40%', MG_SORT_SELF, null, null, interface_sort_asc, interface_sort_dsc );
	tg.pageview_add('IP地址/子网掩码', 1, '40%', MG_SORT_ASCII);
	tg.pageview_add('状态', 2, '20%', MG_SORT_ASCII);
	tg.pageview_init(arrInterface, 10, 'list_interface');

})

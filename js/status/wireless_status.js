function formatPort( arrRow, index ) {
	return "WLAN-BSS" + arrRow[index];
}

function formatRadio( arrRow, index ) {
	if ( arrRow[index] == 0 )
		return "2.4G";
	else
		return "5G";
}

function formatAuth( arrRow, index ) {
	if ( arrRow[index] == "WPA2-Radius" )
		return "WPA2-802.1X";
	else if ( arrRow[index] == "WPA-auto" )
		return "WPA-Auto";
	else
		return arrRow[index];
}

function formatServiceEnabled( arrRow, index ) {
	if ( arrRow[index] == 1 )
		return "启用";
	else
		return "禁用";
}

var ws = new myGrid("ws");

var arrServiceList = new Array();

$(function(){
	setNavigationBar("系统状态>无线接入服务>无线服务列表");
	ws.pageview_add('端口', 0, '18%', MG_SORT_NUM, null, formatPort );
	ws.pageview_add('SSID', 1, '23%', MG_SORT_ASCII);
	ws.pageview_add('射频单元', 2, '18%', MG_SORT_ASCII, null, formatRadio );
	ws.pageview_add('认证方式', 3, '17%', MG_SORT_ASCII, null, formatAuth);
	ws.pageview_add('启用状态', 4, '17%', MG_SORT_ASCII, null, formatServiceEnabled );

	arrServiceList.length = 0;
	for(var i = 0; i < jsWirelessServ.data.length; i++){
		var service = jsWirelessServ.data[i];
		arrServiceList[i] = service.bss_id + ";";
		arrServiceList[i] += service.ssid + ";";
		arrServiceList[i] += service.radio_id + ";";
		arrServiceList[i] += service.auth + ";";
		arrServiceList[i] += service.up;
	}

	ws.pageview_init(arrServiceList, 10, "list_wireless_status");
	/*??*/

});




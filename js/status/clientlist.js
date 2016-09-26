
function getServiceTpl( bss_id ){

}

function getSsid( servTplId ) {

}

function formatSSID( arrRow, index ){
/*从id变成ssid，暂时未做*/
}

function formatRate( arrRow, index ){
	return arrRow[index];
}

function formatRSSI( arrRow, index ){
	if(arrRow[index] < 0)
		return " ";
	else
		return arrRow[index] - 95;
}


var arrClientList = new Array();
var cl = new myGrid('cl');

$(function(){
	setNavigationBar("系统状态>客户端>客户端列表");
		
	cl.pageview_add('MAC地址', 2, '13%', MG_SORT_ASCII);
	cl.pageview_add('IP地址', 3, '13%', MG_SORT_ASCII);
	cl.pageview_add('UpTime', 4, '10%', MG_SORT_ASCII, null);
	cl.pageview_add('SSID', 1, '18%', MG_SORT_ASCII, null, formatSSID);
	cl.pageview_add('RSSI', 6, '8%', MG_SORT_NUM, null, formatRSSI);
	cl.pageview_add('Idle', 7, '8%', MG_SORT_NUM); 
	cl.pageview_add('TxRate(Mbps)', 8, '15%', MG_SORT_NUM, null, formatRate);
	cl.pageview_add('RxRate(Mbps)', 9, '15%', MG_SORT_NUM, null, formatRate);

	arrClientList.length = 0;
	for ( var i = 0; i < jsClientList.data.length; i++ ) {
		var client = jsClientList.data[i];
		arrClientList[i] = client.radio + ";";
		arrClientList[i] += client.bss + ";";
		arrClientList[i] += client.mac + ";";
		arrClientList[i] += client.ip + ";";
		arrClientList[i] += client.uptime + ";";
		arrClientList[i] += client.aid + ";";
		arrClientList[i] += client.rssi + ";";
		arrClientList[i] += client.idle + ";";
		arrClientList[i] += client.tx_rate + ";";
		arrClientList[i] += client.rx_rate + ";";
		arrClientList[i] += client.cipher;
	}

	cl.pageview_init( arrClientList, 10, 'list_client' );

});
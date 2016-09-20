var jsClientList = {"status":"ok", "data":[{"radio":"0","bss":"1","mac":"18:CF:5E:7A:EC:D5","ip":"172.20.90.168","uptime":"00:00:12","aid":1,"rssi":39,"idle":0,"tx_rate":300,"rx_rate":299,"cipher":"None"}]};
/*jsradio和其他js文件重复了*/
/*var jsRadio = { 
	"pkg_wlan_radio": [
		{ 
		 	"sect_name": "WLAN-Radio0\/0", 
		    "beacon-interval": "100", 
		    "max-power": "auto", 
		    "dtim": "1", 
		    "fragment-threshold": "2346", 
		    "rts-threshold": "2346", 
		    "a-mpdu": "enabled", 
		    "mode": "gn", 
		    "channel": "6", 
		    "distance": "1", 
		    "bandwidth": "20", 
		    "dot11nonly": "disabled", 
		    "preamble": "short", 
		    "protection-mode": "cts-to-self", 
		    "short-gi": "enabled", 
		    "bind": [
		    	 { 
		    	 	"bind": "0-0" 
		    	 } 
		    ],
		    "rssi-access": "disabled", 
		    "rssi-access-threshold": "-80", 
		    "bcast-ratelimit": "disabled", 
		    "bcast-ratelimit-cir": "10", 
		    "bcast-ratelimit-cbs": "30", 
		    "atf": "disabled", 
		    "device_mode": "normal", 
		    "dot11aconly": "disabled" 
		}, 
		{ 
			"sect_name": "WLAN-Radio0\/1", 
			"beacon-interval": "100", 
			"max-power": "auto", 
			"dtim": "1", 
			"fragment-threshold": "2346", 
			"rts-threshold": "2346", 
			"a-mpdu": "enabled", 
			"mode": "an", 
			"channel": "149", 
			"distance": "1", 
			"bandwidth": "40", 
			"dot11nonly": "disabled", 
			"preamble": "short", 
			"protection-mode": "cts-to-self", 
			"short-gi": "enabled", 
			"bind": [
				{ 
				 	"bind": "1-1" 

				} 
			], 
			"rssi-access": "disabled", 
			"rssi-access-threshold": "-77", 
			"bcast-ratelimit": "disabled", 
			"bcast-ratelimit-cir": "10", 
			"bcast-ratelimit-cbs": "30", 
			"atf": "disabled", 
			"device_mode": "normal", 
			"dot11aconly": "disabled" 
		} 
	] 
};*/

var jsServTpl = {
	"pkg_wlan_service_template": [
		{ 
			"sect_name": "ServiceTemplate0", 
			"beacon_ssid_hide": "disabled", 
			"client_max": "127", 
			"ptk_lifetime": "3600", 
			"gtk_lifetime": "86400", 
			"ptk_enabled": "disabled", 
			"gtk_enabled": "disabled", 
			"wep_key_slot": "1", 
			"psk-key-type": "passphrase", 
			"psk-key-crypt": "plain", 
			"wep40_key_type_1": "passphrase", 
			"wep40_key_crypt_1": "plain", 
			"wep108_key_type_1": "passphrase", 
			"wep108_key_crypt_1": "plain", 
			"ssid": "CommSky_2.4G", 
			"cipher": "ccmp", 
			"authentication": "wpa2-psk", 
			"psk-key": "12345678", 
			"service-template": "enabled", 
			"m2u_enable": "disabled", 
			"dynamic-uplink-ratelimit": "0", 
			"dynamic-downlink-ratelimit": "0", 
			"static-uplink-ratelimit": "0", 
			"static-downlink-ratelimit": "0" 
		}, 
		{ 
			"sect_name": "ServiceTemplate1", 
			"beacon_ssid_hide": "disabled", 
			"client_max": "127", 
			"ptk_lifetime": "3600", 
			"gtk_lifetime": "86400", 
			"ptk_enabled": "disabled", 
			"gtk_enabled": "disabled", 
			"wep_key_slot": "1", 
			"psk-key-type": "passphrase", 
			"psk-key-crypt": "plain", 
			"wep40_key_type_1": "passphrase", 
			"wep40_key_crypt_1": "plain", 
			"wep108_key_type_1": "passphrase", 
			"wep108_key_crypt_1": "plain", 
			"psk-key": "12345678", 
			"m2u_enable": "disabled", 
			"dynamic-uplink-ratelimit": "0", 
			"dynamic-downlink-ratelimit": "0", 
			"static-uplink-ratelimit": "0", 
			"static-downlink-ratelimit": "0",
			"authentication": "open", 
			"cipher": "none", 
			"ssid": "123", 
			"service-template": "enabled"  
		} 
	] 
};

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
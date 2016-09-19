var jsWirelessServ = {
	"status":"ok", 
	"data":[
		{
			"bss_id":0, 
			"radio_id":0, 
			"ssid":"123", 
			"auth":"None", 
			"up":1 
		},
		{
			"bss_id":1, 
			"radio_id":1, 
			"ssid":"123", 
			"auth":"None", 
			"up":1 
		}
	]
};

var tg = new myGrid("tg");


var arrServiceList = new Array();

function load(){
	arrServiceList.length = 0;
	for(var i = 0; i < jsWirelessServ.data.length; i++){
		var service = jsWirelessServ.data[i];
		arrServiceList[i] = service.bss_id + ";";
		arrServiceList[i] += service.ssid + ";";
		arrServiceList[i] += service.radio_id + ";";
		arrServiceList[i] += service.auth + ";";
		arrServiceList[i] += service.up;
	}

	tg.pageview_init(arrServiceList, 10, "list_table");
	/*??*/
}

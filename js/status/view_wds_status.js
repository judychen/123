var jsWds = {
	"wds_status":{
		"mode":"disable"
	}
};

var tg = new myGrid("tg");
var arrFwd = new Array();

function init(){
	var status = jsWds.wds_status;
	var uplink = jsWds.uplink;
	var forward = jsWds.forward;

	if(typeof(status) == "undefined")
		return;
	if(status.mode == "disable"){
		$("#wds_mode").html("禁用");
		return;
	}else if(status.mode == "rootap"){
		$("#wds_mode").html("Root AP");
        $("#wds_status").html(status.status);
        $("#wds_ref_netid").html(status.ref_netid);
        $("#wds_level").html(status.level);
	}else{
		if(status.mode == "auto-repeater"){
			$("#wds_mode").html("Auto repeater");
		}else{
			$("#wds_mode").html("Static repeater");
		}
		$("#wds_status").html(status.status);
        $("#wds_ref_netid").html(status.ref_netid);
        $("#wds_level").html(status.level);
/*uptime admin fail and uplink???*/
	}

	/*$()???*/
	/*???*/

	setNavigationBar("系统状态>WDS状态");
}
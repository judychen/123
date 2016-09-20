var jsWds = {
	"wds_status":{
		"mode":"rootap",
		"status":"1",
		"ref_netid":"2",
		"level":"3"
	}
};

var wdsst = new myGrid("wdsst");
var arrFwd = new Array();

$(function(){
	setNavigationBar("系统状态>WDS状态");
	
	var status = jsWds.wds_status;
	var uplink = jsWds.uplink;
	var forward = jsWds.forward; 

	if(typeof(status) == "undefined")
		return;
	if(status.mode == "disable"){
		$("#wds_mode").html("禁用");
		$("#wds_status").parent().hide();
		$("#wds_uptime").parent().hide();
		$("#wds_ref_netid").parent().hide();
		$("#wds_level").parent().hide();
		return;
	}else if(status.mode == "rootap"){
		$("#wds_mode").html("Root AP");
	    $("#wds_status").html(status.status);
	    $("#wds_ref_netid").html(status.ref_netid);
	    $("#wds_level").html(status.level);
		$("#wds_uptime").parent().hide();
	}else{
		if(status.mode == "auto-repeater"){
			$("#wds_mode").html("Auto repeater");
		}else{
			$("#wds_mode").html("Static repeater");
		}
		$("#wds_status").html(status.status);
	    $("#wds_ref_netid").html(status.ref_netid);
	    $("#wds_level").html(status.level);
	    if ( typeof(status.uptime) != "undefined" ) {
            $("#wds_uptime").html(status.uptime);
        } 
	/*???*/
	}

});
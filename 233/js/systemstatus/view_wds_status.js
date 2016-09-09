var tg = new myGrid('tg');
var arrFwd = new Array();
function myhelp() {
	popHelp("wds_status");
}

function init() {
	var status = jsWds.wds_status;
	var uplink = jsWds.uplink;
	var forward = jsWds.forward;

    if ( typeof(status) == "undefined" )
        return;

	if ( status.mode == "disable" ) {
		$("#span_wds_mode").html("禁用");
		return;
	} else if ( status.mode == "rootap" ) {
        $("#span_wds_mode").html("Root AP");
        $("#span_wds_status").html(status.status);
        $("#span_wds_ref_netid").html(status.ref_netid);
        $("#span_wds_level").html(status.level);
	} else {
        if (status.mode == "auto-repeater") {
            $("#span_wds_mode").html("Auto repeater");
        }
        else {
            $("#span_wds_mode").html("Static repeater");
        }
        $("#span_wds_status").html(status.status);
        $("#span_wds_ref_netid").html(status.ref_netid);
        $("#span_wds_level").html(status.level);
        if ( typeof(status.uptime) != "undefined" ) {
            $("#span_wds_uptime").html(status.uptime);
            $(".part_uptime").css("display", "table-row");
        } else if ( typeof(status.lastFail) != "undefined" ) {
            $("#span_wds_lastFail").html(status.lastFail);
            $(".part_lastFail").css("display", "table-row");
        }


		if ( typeof(uplink) != "undefined" ) {
			$("#span_wds_ul_bssid").html(uplink.bssid);
			$("#span_wds_ul_channel").html(uplink.channel);
			$("#span_wds_ul_devMac").html(uplink.devMac);
			$("#span_wds_ul_netid").html(uplink.netid);
			$("#span_wds_ul_uplevel").html(uplink.uplevel);
			$(".part_uplink").css("display", "block");
		}
		
	}
    
	$(".part_wds_enable").css("display", "table-row");

	if ( typeof(forward) != "undefined" ) {
		for ( var i = 0; i < forward.length; i++ ) {
			arrFwd[i] = forward[i].destMac + ";"  
			arrFwd[i] += forward[i].nextMac + ";"  
			arrFwd[i] += forward[i].if_type;
		}
		tg.pageview_add('目的MAC地址', 0, '40%', MG_SORT_ASCII );
		tg.pageview_add('下一跳MAC地址', 1, '40%', MG_SORT_ASCII );
		tg.pageview_add('接口类型', 2, '20%', MG_SORT_ASCII );
		tg.pageview_init(arrFwd, 10, 'list_wds_forward' );
		$(".part_fwd").css("display", "block");
	}

	setNavigationBar("系统状态>WDS状态");

}

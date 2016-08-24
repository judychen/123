/* ping */
var strResult = "";
var ping_count = 0;
var form_ping;
var ping_begin = 0;	//begin of ring queue
var ping_pos = 0; //current postion
var ping_data = new Array();	//cache all response data
var success_count = 0;
var timeout_count = 0;
var total_time = 0;
var max_time = 0;
var min_time = 0;
var PING_CACHE_MAX = 40;
function show_ping_result( arrData ) {
	strResult = "";
	if ( arrData.length < PING_CACHE_MAX ) {
		for ( var i = 0; i < arrData.length; i++ ) {
			if ( arrData[i] < 0 )
				strResult = "Request time out<br/>" + strResult;
			else {
				if ( success_count + timeout_count > PING_CACHE_MAX )
					strResult = "64 bytes from " + $("#text_host_ip").val() + ":seq=" + (i + success_count + timeout_count - PING_CACHE_MAX) + " ttl=64 time=" + arrData[i] + " ms<br/>" + strResult;
				else
					strResult = "64 bytes from " + $("#text_host_ip").val() + ":seq=" + i + " ttl=64 time=" + arrData[i] + " ms<br/>" + strResult;
			}
			$("#ping_result").html( strResult );
		}
	} else if ( arrData.length == PING_CACHE_MAX ) {
		for ( var i = 0; i< arrData.length; i++ ) {
			ping_pos = ping_begin + i;	
			if ( ping_pos >= PING_CACHE_MAX  )
				ping_pos -= PING_CACHE_MAX;

			if ( arrData[ping_pos] < 0 )
				strResult = "Request time out<br/>" + strResult;
			else {
				if ( success_count + timeout_count > PING_CACHE_MAX )
					strResult = "64 bytes from " + $("#text_host_ip").val() + ":seq=" + (i + success_count + timeout_count -PING_CACHE_MAX) + " ttl=64 time=" + arrData[ping_pos] + " ms<br/>" + strResult;
				else
					strResult = "64 bytes from " + $("#text_host_ip").val() + ":seq=" + i + " ttl=64 time=" + arrData[ping_pos] + " ms<br/>" + strResult;
			}

			$("#ping_result").html( strResult );
		}
	} else {
		alert("error: never reach here, ping!");
	}
}

function ping_add( data ) {
	var ack_time;
	/* parse data */
	var n = data.indexOf( "time=" );
	if ( n == -1 ) {
		timeout_count++;
		ack_time = -1;
	} else { 
		success_count++;
		var m = data.indexOf( " ", n );
		ack_time = data.substr( n + 5, m - n - 5);

		if ( ack_time - max_time > 0.0001 ) {
			max_time = ack_time;
		}
		if ( min_time - ack_time > 0.0001 ) {
			min_time = ack_time; 
		}
		total_time += parseFloat(ack_time);
	}

	/* storing time in array */
	if ( ping_data.length < PING_CACHE_MAX ) {
		ping_data[ping_data.length] = ack_time;
	} else {
		ping_data[ping_begin++] = ack_time;
		if ( ping_begin >= PING_CACHE_MAX ) {
			ping_begin -= PING_CACHE_MAX;
		}
	}
}

function pingSuccess( data ) {
	var jsonData = eval("("+data+")");
	ping_add( jsonData.data );
	show_ping_result( ping_data );
	if ( ping_count > 0 ) {
		setTimeout("_ping()", 900);
	} else {
		var str = "";
		str += "--- " + $("#text_host_ip").val() + " ping statistics ---<br/>"
		str += (success_count + timeout_count) + " packets transmitted, " + success_count + " packets received, " + Math.round( timeout_count / (success_count + timeout_count) * 100 ) + "% packet loss<br/>";
		//alert( total_time);
		if ( success_count > 0 )
			str += "round-trip min/avg/max = " + min_time + "/" + ( Math.round((parseFloat(total_time) / success_count ) * 1000) / 1000 ) + "/" +  max_time +" ms<br/>";
		str += "<br/>";
		strResult = str + strResult;
		$("#ping_result").html( strResult );
		$("#ping_start").css("display", "inline");
		$("#ping_end").css("display", "none");
	}
}

function pingFaild() {
	ping_count = 0;
	$("#ping_start").css("display", "inline");
	$("#ping_end").css("display", "none");
}

function _ping() {
	ping_count--;

	var url="goform/form_dev_ping?UID="+parent.uid;
	form_ping.submit_2( url, pingSuccess, pingFaild );
}

function isInputValid() {
	if ( $("#text_host_ip").val() == "" ) {
		myAlert("主机不能为空！", "text_host_ip");
		return false;
	}
	if ( $("#text_ping_count").val() == "" ) {
		myAlert("次数不能为空！", "text_ping_count");
		return false;
	} else if ( !checkNumberRang( $("#text_ping_count").val(), 1, 9999 ) ) {
		myAlert("次数不正确，其值应为1-9999之间整数！", "text_ping_count");
		return false;
	}
	return true;
}

function ping() {
	if ( !isInputValid() ) {
		return;
	}
//	strResult = "";
	/* init ping variable */
	success_count = 0;
	timeout_count = 0;
	total_time = 0;
	max_time = 0;
	min_time = 9999;
	ping_data.length = 0;
	ping_begin = 0;
	ping_pos = 0;

	$("#ping_result").html( "" );
	ping_count = $("#text_ping_count").val();
	form_ping = new myForm();
	form_ping.add( "host_ip", $("#text_host_ip").val() );
	$("#ping_start").css("display", "none");
	$("#ping_end").css("display", "inline");
		
	_ping();
}
function stopPing() {
	ping_count = 0;
	//form_ping.abort();
	//show_ping_result( ping_data );
	//$("#ping_start").css("display", "inline");
	//$("#ping_end").css("display", "none");
}
/* ping, end */

var now_sec= 946662817;

function refreshTime() {
	var now = new Date();
	now.setTime(now_sec * 1000);//setTime(ms)
	var year = now.getFullYear();
	var month = now.getMonth()+1;
	if (month < 10) month = "0"+month;
	var day = now.getDate();
	if (day < 10) day = "0"+day;
	var hours = now.getHours();
	if (hours < 10) hours = "0"+hours;
	var minutes = now.getMinutes();
	if (minutes < 10) minutes= "0"+minutes;
	var seconds = now.getSeconds();
	if (seconds < 10) seconds= "0"+seconds;
	var strNow =  year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
	$("#time_current").text(strNow);
	now_sec = parseInt(now_sec)+1;//执行一次+1s
}

function changeTimeMode(){
	if($("#sel_timeMode").val() == "disabled"){
		$(".timeAuto").hide();
		$(".timeManual").show();
	}else{
		$(".timeAuto").show();
		$(".timeManual").hide();
	}
}

function change_year_month(){
	var year = $("#sel_timeYear").val();
	var month = $("#sel_timeMonth").val();
	/*var day = $("#sel_timeDay").val();*/

	var days = getDays(year, month);

	var str = "";
	for(var i = 1; i < days + 1; i++){
		if ( i < 10 )
			str += "<option value='" + i + "'>0" + i + "</option>";
		else
			str += "<option value='" + i + "'>" + i + "</option>";
	}

	$("#sel_timeDay").html( str );
}

function initime(){

	var year = "";
	for(var i = 2000; i < 2031; i++){
		
		year += "<option value='" + i + "'>" + i + "</option>";
	}

	$("#sel_timeYear").html( year );

	var month = "";
	for(var i = 0; i < 13; i++){
		
		if ( i < 10 )
			month += "<option value='" + i + "'>0" + i + "</option>";
		else
			month += "<option value='" + i + "'>" + i + "</option>";
	}

	$("#sel_timeMonth").html( month );

	var day = "";
	for(var i = 1; i < 32; i++){
		if ( i < 10 )
			day += "<option value='" + i + "'>0" + i + "</option>";
		else
			day += "<option value='" + i + "'>" + i + "</option>";
	}

	$("#sel_timeDay").html( day );



}


$(function(){
	refreshTime();
	setInterval(refreshTime, 1000);
	
	var jsNtpInfo = jsNtp.pkg_time[0];
	$("#sel_timeMode").val( jsNtpInfo.enabled );

	/*var str = "";
	for(var i = 0; i < 2037; i++){

	}*/

	$("#sel_timeMode").click(changeTimeMode);

	initime()

	$("#sel_timeYear").change(change_year_month);
	$("#sel_timeMonth").change(change_year_month);
});
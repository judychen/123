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
	$("#time_now").text(strNow);
	now_sec = parseInt(now_sec)+1;
}


$(function(){
	refreshTime();
	setInterval(refreshTime, 1000);
	load();
});
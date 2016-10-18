var radio0S = {
	"status" : "checked",
	"mode" :  "802.11g",
	"channel" :  "auto",
	"maxpower" :  "100",
	"beacon" :  "100",
	"dtim" :  "1",
	"fragThreshold" : "2346",
	"rtsThreshold" : "2346"
}

var radio1S = {
	"status" : "checked",
	"mode" :  "802.11g",
	"channel" :  "auto",
	"maxpower" :  "100",
	"beacon" :  "100",
	"dtim" :  "1",
	"fragThreshold" : "2346",
	"rtsThreshold" : "2346"
}

function checkValidRadio0(){
	
	if (!checkNumberRang($("#radio0_beacon").val(), 40, 3500 )){
		showError(true, "非法的Beacon帧间隔！");
		return false;
	}

	if (!checkNumberRang($("#radio0_dtim").val(), 1, 31 )){
		showError(true, "非法的DTIM间隔！");
		return false;
	}
			
	if (!checkNumberRang($("#radio0_fragThreshold").val(), 256, 2346 )) {
		showError(true, "非法的分片阈值");
		return false;
	}
			
	if ( !checkNumberRang($("#radio0_rtsThreshold").val(), 0, 2346 ) ) {
		showError(true, "非法的RTS-CTS阈值！");
		return false;
	}
			
	return true;

}

function checkValidRadio1(){
	
	if (!checkNumberRang($("#radio1_beacon").val(), 40, 3500 )){
		showError(true, "非法的Beacon帧间隔！");
		return false;
	}

	if (!checkNumberRang($("#radio1_dtim").val(), 1, 31 )){
		showError(true, "非法的DTIM间隔！");
		return false;
	}
			
	if (!checkNumberRang($("#radio1_fragThreshold").val(), 256, 2346 )) {
		showError(true, "非法的分片阈值");
		return false;
	}
			
	if ( !checkNumberRang($("#radio1_rtsThreshold").val(), 0, 2346 ) ) {
		showError(true, "非法的RTS-CTS阈值！");
		return false;
	}
			
	return true;

}

function validRadio0(){
	
	checkValidRadio0();

	if(checkValidRadio0()){
		radio0S.status = $("#radio0_status").attr("checked");
		radio0S.mode = $("#radio0_mode").val();
		radio0S.channel = $("#radio0_channel").val();
		radio0S.maxpower = $("#radio0_maxpower").val();
		radio0S.beacon = $("#radio0_beacon").val();
		radio0S.dtim = $("#radio0_dtim").val();
		radio0S.fragThreshold = $("#radio0_fragThreshold").val();
		radio0S.rtsThreshold = $("#radio0_rtsThreshold").val();
	}
}

function validRadio1(){

	checkValidRadio1();

	if(checkValidRadio1()){
		radio1S.status = $("#radio1_status").attr("checked");
		radio1S.mode = $("#radio1_mode").val();
		radio1S.channel = $("#radio1_channel").val();
		radio1S.maxpower = $("#radio1_maxpower").val();
		radio1S.beacon = $("#radio1_beacon").val();
		radio1S.dtim = $("#radio1_dtim").val();
		radio1S.fragThreshold = $("#radio1_fragThreshold").val();
		radio1S.rtsThreshold = $("#radio1_rtsThreshold").val();
	}
}

function cancelRadio0(){

	$("#radio0_status").attr("checked", radio0S.status);
	$("#radio0_mode").val(radio0S.mode);
	$("#radio0_channel").val(radio0S.channel);
	$("#radio0_maxpower").val(radio0S.maxpower);
	$("#radio0_beacon").val(radio0S.beacon);
	$("#radio0_dtim").val(radio0S.dtim);
	$("#radio0_fragThreshold").val(radio0S.fragThreshold);
	$("#radio0_rtsThreshold").val(radio0S.rtsThreshold);
	
}

function cancelRadio1(){
	
	$("#radio1_status").attr("checked", radio1S.status);
	$("#radio1_mode").val(radio1S.mode);
	$("#radio1_channel").val(radio1S.channel);
	$("#radio1_maxpower").val(radio1S.maxpower);
	$("#radio1_beacon").val(radio1S.beacon);
	$("#radio1_dtim").val(radio1S.dtim);
	$("#radio1_fragThreshold").val(radio1S.fragThreshold);
	$("#radio1_rtsThreshold").val(radio1S.rtsThreshold);
	
}

$(function(){
	$("#radio_setting0_ok").click(validRadio0);
	$("#radio_setting0_cancel").click(cancelRadio0);

	$("#radio_setting1_ok").click(validRadio1);
	$("#radio_setting1_cancel").click(cancelRadio1);
});
function changeAuth(){
    if($("#sel_auth").val() == "wep"){
        $(".wep_tr").show();
        $(".wpa_tr").hide();
       
    }else if ($("#sel_auth").val() == "wpa") {
        $(".wep_tr").hide();
        $(".wpa_tr").show();
        
    }else{
        $(".wep_tr").hide();
        $(".wpa_tr").hide(); 
    }
}


$(function(){

	$("#wireless_add_btn").click(function(){
		$("#wireless_add").show();
		$("#wireless_add").siblings().hide();
	});

	$("#wireless_add_ok").click(function(){
		$("#wireless_add").hide();
		$("#wireless_add").siblings().show();
	});

	$("#wireless_add_cancel").click(function(){
		$("#wireless_add").hide();
		$("#wireless_add").siblings().show();
	});
	
	$("#sel_auth").change(changeAuth);
});
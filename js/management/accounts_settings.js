var usersList = new Array();
var jsUsers = {
	 "pkg_usrmanage": [
	 	 { 
	 	 	"sect_name": "admin", 
	 	 	"name": "admin", 
	 	 	"level": "1", 
	 	 	"cipher": "0", 
	 	 	"password": "admin" 
	 	} 
	] 
};
var jsIdleTime = { 
	"pkg_idletime": [
		{ 
			"sect_name": "idletime", 
			"time": "0" 
		} 
	] 
};

function tabMenuClicked(){
		var $obj=$(this); //DOM Object to Jquery Object
	
/*		if ( $obj.attr('class')=="tabSelected" )
			return;
		else if( $obj.attr('class')=="tabHover" ){
			$obj.removeClass('tabHover');
			$obj.attr('class', 'tabSelected');
		}else{
			$obj.attr('class', 'tabSelected');
		}
		*//*明天写添加class的样式*/
		var idval = $obj.attr("id");
		
		$("#_" + idval).show();
		$("#_" + idval).siblings("div:not(':first')").hide();
		console.log("23");
		
}
	
	function tabMenuMouseover(){
		var $obj=this; //DOM Object to Jquery Object
	
		/*if ( $obj.attr('class')=="tabSelected" )
			return;
		else{
			$obj.attr('class', 'tabHover');
		}*/
		console.log("over");
	
	}

	function tabMenuMouseout(){
		console.log("out");
		/*var $obj=this; //DOM Object to Jquery Object
	
		if ( $obj.attr('class')=="tabHover" )
			$obj.removeClass('tabHover');*/
	}


$(function(){

$(".underline li").click(tabMenuClicked);
/*$(".underline li").mouseover(tabMenuMouseover);
$(".underline li").mouseout(tabMenuMouseout);*/
});

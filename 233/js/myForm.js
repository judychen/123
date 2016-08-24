function myForm() {
	if ( typeof( $("#myForm").html()) == "undefined" ){
		$(document.body).append("<form name=\"myForm\" id=\"myForm\"></form>");
	}
	$("#myForm").html("");
	this.ajaxEvent;
}

myForm.prototype = {
	add: function (name, value) {
		var elem = "<input type=\"hidden\" name=\""+name+"\" />";
		$("#myForm").append(elem);
		$("input[name=" + name + "]").val( value );
	},

	get: function ( url, successfunc ) {
		var obj = this;

		showWaitConfig(true);
		var ajaxEvent = $.ajax({
			cache: true,
			type: "GET",
			url: url,
			data:$("#myForm").serialize(),
			timeout:60000,//unit:ms, 1 minute
			async: true,
			success: function(data) {
				showWaitConfig(false);
				//successfunc( data );
				//obj._success( successfunc, data );
				alert("ok");
			},
			complete: function(XMLHttpRequest, status){
				if ( status == "timeout"){//status还有success,error等
					ajaxEvent.abort();				
					showError(true, "响应超时，请检查网络！");
				} else if ( status == "error"){
					showWaitConfig(false);
					showError(true, "请求失败！");
				}
			}
		});
	},
	html: function () {
		/* just for debug, show form info */
		//return str;
	},
	abort: function() {
		this.ajaxEvent.abort();
	},
	submit: function( url, successfunc ) {
		var obj = this;

		showWaitConfig(true);
		this.ajaxEvent = $.ajax({
			cache: true,
			type: "POST",
			url: url,
			data: $("#myForm").serialize(),
			timeout:60000,//unit:ms, 1 minute
			async: true,
			success: function(data) {
				showWaitConfig(false);
				//successfunc( data );
				obj._success( successfunc, data );
			},
			complete: function(XMLHttpRequest, status){
				if ( status == "timeout"){//status还有success,error等
					ajaxEvent.abort();				
					showError(true, "响应超时，请检查网络！");
				} else if ( status == "error"){
					showWaitConfig(false);
					showError(true, "请求失败！");
				}
			}
		});
	},

	/* don't show waiting.gif when waiting response  */
	submit_2: function ( url, successfunc, errFunc ) {
		var obj = this;

		//showWaitConfig(true);
		this.ajaxEvent = $.ajax({
			cache: true,
			type: "POST",
			url: url,
			data: $("#myForm").serialize(),
			timeout:60000,//unit:ms, 1 minute
			async: true,
			success: function(data) {
		//		showWaitConfig(false);
				//successfunc( data );
				obj._success( successfunc, data, errFunc );
			},
			complete: function(XMLHttpRequest, status){
				if ( status == "timeout"){//status还有success,error等
					ajaxEvent.abort();				
					showError(true, "响应超时，请检查网络！");
				} else if ( status == "error"){
					showWaitConfig(false);
					showError(true, "请求失败！");
				}
			}
		});
	},

	_success: function(func, data, errHandler){
		/*fix bug: should relogin when form request without valid UID*/
		var jsonData;
		try{
			jsonData = eval("("+data+")");
		} catch(e) {
			//alert( e.toString() );	
			window.parent.location = "login.asp";
			return;
		}

		//alert("___success:"+jsonData.status);
		if ( jsonData.status == "ok" ) {
			func(data);
		} else if ( jsonData.status == "error" ) {
			if ( typeof( errHandler ) == "function" )
				errHandler();
			showError( true, jsonData.error);
		} else {
			showError( true, "未知响应！" );	//never reach here
		}
	}

}

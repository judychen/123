var progress_id = "loading"; 
var myProgress = new Array();
//myProgress.dom;

function isHasParent() {
	if ( window.top != window.self )
		return true;
	else
		return false;
}

function SetProgress(progress) { 
	var jqDomProgress;
	/* remove for support SetProgress(0) during the initialization phase of the progress */
    //if (progress) { 
		if ( isHasParent() ) {
			jqDomProgress = $(window.parent.document).find("#" + progress_id + " > div");
		} else {
			jqDomProgress = $("#" + progress_id + " > div");
		}
		jqDomProgress.css("width", String(progress) + "%"); //控制#loading div宽度 
		jqDomProgress.html(String(progress) + "%"); //显示百分比 
    //} 
} 

var i_count = 0; 
var i_step = 1;
var _func;
var _interval;
var timer_p;
var enableSlower = false;
function jump(){
    var url = "img.html";
    window.parent.location.href=url;
}

//是否存在指定函数 
function isExitsFunction(funcName) {
    try {
        if (typeof(eval(funcName)) == "function") {
            return true;
        }
    } catch(e) {}
    return false;
}

function doProgress() { 
	if (i_count > 100) { 
/*
		//超时连接设备失败，弹出消息提示
		//$("#message").css("display", "none");
		//$("#msg_faild").css("display", "block");
		$(window.parent.document).find("#message").css("display", "none");
		$(window.parent.document).find("#msg_faild").css("display", "block");
*/
		showProgress( false );
		if ( typeof(_func) == "function" )
			_func();
		
	    return; 
	} 
	else { 
        timer_p = setTimeout("doProgress()", _interval);
        SetProgress(i_count);
        i_count++;
    }

/*
    pingUrl = "http://"+"192.168.1.1"+"/js/ping.js";
    if (i > 40)
        $.getScript(pingUrl,function(){});
    //判断js是否加载成功
    if(isExitsFunction("ping"))
       jump(); 
*/
} 

function showProgress(bShow, msg ){
	var jqDomMessage;
	var jqDomProgress;
	var jqDomZZC;
	var jqDomLoading;

	if ( isHasParent() ) {
		jqDomMessage = $(window.parent.document).find("#message");
		jqDomProgress = $(window.parent.document).find("#div_progress");
		jqDomZZC = $(window.parent.document).find("#zzc");
		//jqDomLoading = $(window.parent.document).find("#loading");
		jqDomLoading = $(window.parent.document).find("#" + progress_id);
	} else {
		jqDomMessage = $("#message");
		jqDomProgress = $("#div_progress");
		jqDomZZC = $("#zzc");
		//jqDomLoading = $("#loading");
		jqDomLoading = $(window.parent.document).find("#" + progress_id);
	}

	if ( bShow == true ) {
		if ( typeof(msg) == "string" )
			jqDomMessage.html( msg );
		else 
			jqDomMessage.html( "设备重启中，请等待。。。" );

		jqDomZZC.css("display", "block");
		jqDomProgress.css("display", "block");

		/* preload progress images */
		if (jqDomProgress.css("width") == "0px") {
			jqDomProgress.css("width", "400px" );
			jqDomLoading.css("width", "397px" );
			jqDomMessage.css("display", "block" );
		}
	} else {
		jqDomZZC.css("display", "none");
		jqDomProgress.css("display", "none");
	}
}

/* interval unit: second */
function progressTask( interval, func, msg ){
	i_step = 1;
	i_count = 0;
	_interval = interval * 10;
	_func = func;
	SetProgress(0); //initialize progress
	showProgress( true, msg );
	doProgress();
}

function set_progress( value ) {
	i_count = value;
}

/* if task done, run progress more quickly */
function set_progress_quick( value ) {
	_interval = _interval / value;
}

function set_progress_slow( value ) {
	_interval = _interval * value;
}

function enable_progress_slower() {
}
function disable_progress_slower() {
}

function stop_progress() {
	showProgress( false );
	clearTimeout(timer_p);
}

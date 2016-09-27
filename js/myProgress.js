var progress_id = "loading";
var myProgress = new Array();

var i_count = 0;
var i_step =1;
var _func;
var _interval;
var timer_p;
var enableSlower = false;

function jump() {
    /*todo*/
}

function isExitsFunction(funcName) {
    /*todo*/
}

function progressTask(interval, func, msg) {
    _interval = interval * 10;
    _func = func;
    SetProgress(0); //initialize progress
    showProgress( true, msg );
    doProgress();
}

function SetProgress(progress) {
    var jqDomProgress;
    
    jqDomProgress = $("#" + progress_id + ">div");
    jqDomProgress.css("width", String(progress) + "%"); 
    jqDomProgress.html(String(progress) + "%");
}

function showProgress(bShow, msg) {
    var jqDomProgress = $("#div_progress");
    var jqDomMessage = $("#message_reboot");
    
    var jqDomLoading = $("#" + progress_id);
    if(bShow){
        if ( typeof(msg) == "string" )
            jqDomMessage.html( msg );
        else 
            jqDomMessage.html( "设备重启中，请等待。。。" );

        jqDomProgress.show();
        jqDomMessage.show();

    } else {
      
        jqDomProgress.hide();
    }   
}

function doProgress() {
    if(i_count > 100){
        showProgress(false);
        /*if ( typeof(_func) == "function" )
            _func();
            再执行100%后的操作，这里应该指退出*/
        return;
    }else{
        timer_p = setTimeout("doProgress()", _interval);
        SetProgress(i_count);
        i_count++;
    }
}


function set_progress(value) {
    /*todo*/
}

function set_progress_quick(value) {
    /*todo*/
}

function set_progress_slow(value) {
    /*todo*/
}

function enable_progress_slower() {
    
}

function disable_progress_slower() {
    
}

function stop_progress() {
    /*todo*/
}











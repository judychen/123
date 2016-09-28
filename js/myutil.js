var entityMap = {
    "&": "&amp",
    "<": "&lt",
    ">": "&gt",
    '"': "&quot",
    "'": "&#39",
    "/": "&#x2F",
    " ": "&nbsp",
    "\u00A0": "&nbsp;"
};

var entityMapReg = {
    "$": "\\$",
    "(": "\\(",
    ")": "\\)",
    "*": "\\*",
    "+": "\\+",
    ".": "\\.",
    "[": "\\[",
    "]": "\\]",
    "?": "\\?",
    "\\": "\\\\",
    "^": "\\^",
    "{": "\\{",
    "}": "\\}",
    "|": "\\|"
};

function setNavigationBar() {
    $this = $(this);

    if($this.parent().attr("id") == "main_menu"){
        if($this.attr("id") == "m_wizard"){
            content = $this.find("span").html();

        }else{
            content = $this.find("span").html();
            content += ">";
            content += $this.find("li:first").html();
        }
    }else if($this.parent().attr("class") == "sub_menu"){
        content = $this.parent().prev("a").find("span").html();
        content += ">";
        content += $this.html();
    }else{
        return;
    }

    var tmp = "位置："+ content;
    $("#navigationBar").html(tmp);
    if(content == "") $("#navigationBar").css("display","none");
    else $("#navigationBar").css("display","block");
}




function tabMenu_init() {
    /*todo*/
}

function tabMenuClicked(){
    var $obj=$(this);

    if ( $obj.attr('class')=="tabSelected" )
        return;
    else if( $obj.hasClass("tabHover")){
        $obj.removeClass('tabHover');
        $obj.addClass('tabSelected');
        $obj.siblings().removeClass("tabSelected");
        console.log("2");
    }else{
        $obj.addClass('tabSelected');
        $obj.siblings().removeClass("tabSelected");
        console.log("3");
    }
    var idval = $obj.attr("id");

    $("#_" + idval).show();
    $("#_" + idval).siblings("div:not(':first')").hide();
}

function tabMenuMouseover(){
    var $obj=$(this);

    if ( $obj.hasClass("tabSelected"))
        return;
    else {
        $obj.addClass('tabHover');
    }
}

function tabMenuMouseout(){
    var $obj=$(this);

    if ( $obj.hasClass("tabHover")){
        $obj.removeClass('tabHover');
        console.log($obj.attr('class'));
    }
}

function getQueryString(name) {
    /*todo*/
}

function getRequest() {
    /*todo*/
}

function pageJump(url) {
    /*todo*/
}

/*控制zcc和dialog显示和隐藏*/
function showWaitConfig(bShow) {
    if(bShow == true){
        $("#zcc").css("display","blcok");
        $("#dialog").css("display","blcok");
    }else{
        $("#zcc").css("display","none");
        $("#dialog").css("display","none");
    }
}

function showError(bShow, errMsg) {
   if(bShow == true){
       $("#zcc").css("display","blcok");
       $("#errDlg").show();
       $("#errMsg").html(errMsg);
       /*?*/
   }else{
       /*？*/
       $("#zcc").css("display","none");
       $("#errDlg").hide();
   }

}

function myAlert(info/*, id*/) {
    /*?*/
    showError(true, info);
}

function myAlertSelect(info, funcselect) {
    /*???*/
    var jqDomSelectDlg = $("#save_select");
    jqDomSelectDlg.attr("checked", false);
    showSelect( true, true, info, funcselect);
}

function showSelect(bShow, bSave, errMsg, funcselect) {
    if( bShow == true){
        $("#prompt_okBtn").click(funcselect);
        $("#prompt_setwid").click(function(){
            $("#prompt").hide();
        });
        $("#prompt_cancelBtn").click(function(){
            $("#prompt").hide();
        });
        /*??*/
        $("#prompt").show();
        $("#selectMsg").html(errMsg);
    }else{
        /*???*/
        $("#prompt").hide();
       
    }
}

function select_reboot() {
    showSelect(false);
    progressTask( 35 );
}

function save_select_success() {
    /*todo*/
}

top.g_confirm_with_save = true;

function save_config() {
    /*todo*/
}

function selectOk() {
    /*todo*/
}

function myConfirm(info, bSave, funcOk) {
    /*todo*/
}

/*获得每个月的天数，按是否闰年枚举*/
function getDays(year, month) {
    var leapYear = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    var nonLeap = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 );
    if(isLeapYear(year)){
        return leapYear[month - 1];
    }else
        return nonLeap[month - 1];
}

//return: -1 means Unknown, 1 means A, 2 means B, 3 means C, 4 means D
function get_class_of_address(ip) {
    var arrIP = ip.split(".");/*ip必须是字符串*/
    if(!checkNumberRang(arrIP[0], 0, 255)) return -1;

    var n = parseInt(arrIP[0]);
    if(n >= 0 && n <= 127){
        return 1;
    }else if(n >= 128 && n <= 191 ){
        return 2;
    }else if(n >= 192 && n <= 223){
        return 3;
    }else {
        return 4;
    }
}

/*判断子网掩码有几位，从最高位开始，nMask为几，即几个1*/
/*子网掩码，从最高位开始，必须连续为1*/
function netmask_dotteQuad2num(netmask) {
    var arrNetmask = netmask.split(".");
    var temp_mask;
    var nMask = 0;

    for(var i = 0; i < 4; i++){
        temp_mask = arrNetmask[i];
        for(var j = 0; j < 8; j++){
            if((temp_mask & 0x80) == 0x80){
                nMask++;
                temp_mask = (temp_mask << 1);
            }else{
                return nMask;
            }
        }
    }

    return nMask;
}

/*从数字-》子网掩码，先得出子网掩码，再得出子网掩码数组，再拼接成字符串*/
function netmask_num2dottedQuad(num) {
    if(num == 0) return "0.0.0.0";

    var n = 0xFFFFFFFF;
    var left = 32 - num;/*left为0的个数*/
    var m = n << left;/*得出子网掩码*/

    var arrNetmask = new Array();
    arrNetmask[0] = (m >> 24) & 0xFF;
    arrNetmask[1] = (m >> 16) & 0xFF;
    arrNetmask[2] = (m >> 8) & 0xFF;
    arrNetmask[3] = (m >> 0) & 0xFF;

    var str = arrNetmask[0] + "." + arrNetmask[1] + "." + arrNetmask[2] + "." + arrNetmask[3];

    return str;
}

/*ms秒内睡眠*/
function sleep(ms) {
    var start = new Date().getTime();
    while(true){
        if(new Date().getTime() - start > ms ) break;
    }
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"'\/\s]/g, function(s){
        return entityMap[s];
    });/*第二个参数是回调函数*/
}

function escapeReg(str) {
    return String(str).replace(/[\$\(\)\*\+\.\[\]\?\\\^\{\}\|]/g, function(s){
        return entityMapReg[s];
    });/*第二个参数是回调函数*/
}

/*帮助文档，忽略*/
/*function popHelp(section) {
    /!*todo*!/
}*/

/*去除前后的空白*/
function strip_blank_boundary(value) {
    return value.replace(/(^\s*)|(\s*$)/g, "");
}

function getDayOfWeek(n) {
    switch ( n ){
        case 0: return "星期日";
        case 1: return "星期一";
        case 2: return "星期二";
        case 3: return "星期三";
        case 4: return "星期四";
        case 5: return "星期五";
        case 6: return "星期六";
        default: return "";
    }
}

function timeToString(n) {
    if(n < 10) return "0" + n;
    else return n;
}

/*从秒数返回字符串时间，如7210-》星期日 02 00*/
function secToString(sec) {
    var day = new Array();
    var nSec = parseInt(sec);
    var ret;
    day.weekday = parseInt(nSec / 86400);
    day.hour = parseInt((nSec % 86400) / 3600);
    day.minute = parseInt((nSec % 3600) / 60);
    ret = getDayOfWeek(day.weekday) + " " + timeToString(day.hour) + " " + timeToString(day.minute);
    return ret;
}

/*返回时间数组*/
function secToDHM(sec) {
    var day = new Array();
    var nSec = parseInt(sec);
    day.weekday = parseInt(nSec / 86400);
    day.hour = parseInt((nSec % 86400) / 3600);
    day.minute = parseInt((nSec % 3600) / 60);

    return day;
}
















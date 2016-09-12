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

function setNavigationBar(content) {
    var tmp = "位置："+ content;
    $("#navigationBar").html(tmp);
    if(content == "") $("#navigationBar").css("display","none");
    else $("#navigationBar").css("display","block");
}




function tabMenu_init() {
    /*todo*/
}

function tabMenuClicked(obj) {
    /*todo*/
}

function tabMenuMouseover(obj) {
    /*todo*/
}

function tabMenuMouseout() {
    /*todo*/
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
       $("#errDlg").css("display","blcok");
       $("#errMsg").html(errMsg);
       /*?*/
   }else{
       /*？*/
       $("#zcc").css("display","none");
       $("#errDlg").css("display","none");
   }

}

function myAlert(info, id) {
    /*?*/
    showError(true, info);
}

function showSelect(bShow, bSave, errMsg, funcselect) {
    /*todo*/
}

function select_reboot() {
    /*todo*/
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

function myAlertSelect(info, funcselect) {
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

/*验证*/
/*$(function(){
    console.log(get_class_of_address("243.0.0.0"));
 });*/

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

function netmask_dotteQuad2num(netmask) {
    /*todo*/
}

function netmask_num2dottedQuad(num) {
    /*todo*/
}

function sleep(ms) {
    /*todo*/
}

function escapeHtml(str) {
    /*todo*/
}

function secapeReg(str) {
    /*todo*/
}

function popHelp(section) {
    /*todo*/
}

function strip_blank_boundary(value) {
    /*todo*/
}

function getDayOfWeek(n) {
    /*todo*/
}

function timeToString(n) {
    /*todo*/
}

function secToString(sec) {
    /*todo*/
}

function secToDHM(sec) {
    /*todo*/
}














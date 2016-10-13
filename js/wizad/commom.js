var arr_nat_wizard_items = new Array(
    ["工作模式", "wizard_link_mode"],
    ["WAN设置", "wizard_wan_settings"],
    ["LAN设置", "wizard_lan_settings"],
    ["用户密码", "wizard_admin_pwd"],
    ["无线设置", "wizard_wireless_settings"],
    ["配置总览", "wizard_nat_summary"]
);

var arr_bridge_wizard_items = new Array(
    ["工作模式", "wizard_link_mode"],
    ["IP地址",	 "wizard_ip_settings"],
    ["用户密码", "wizard_admin_pwd"],
    ["无线设置", "wizard_wireless_settings"],
    ["配置总览", "wizard_summary"]
);

var arr_wizard_items = new Array(
    ["IP地址",	 "wizard_ip_settings"],
    ["用户密码", "wizard_admin_pwd"],
    ["无线设置", "wizard_wireless_settings"],
    ["配置总览", "wizard_summary"]
);

var arrIS = new Object();

function link_mode_changed(type) {
    if(type == "nat"){
        arr_wizard_items = arr_nat_wizard_items;
    }else{
        arr_wizard_items = arr_bridge_wizard_items;
    }
}

var g_wizard_hash = {};
function _wizard_click(url) {
    /*todo*/
}

function wizar_click(i) {
    /*todo*/
}

function isFirst() {
    if(arr_wizard_items[0][1] == g_wizard_hash.currentPage)
        return true;
    else
        return false;
}

function isLast() {
    if(arr_wizard_items[arr_wizard_items.length - 1][1] == g_wizard_hash.currentPage)
        return true;
    else
        return false;
}

function isCurrent(currentPage) {
    if(g_wizard_hash.currentPage == currentPage)
        return true;
    else
        return false;
}

function getCurrentIndex(currentPage) {

    for(var i = 0; i < arr_wizard_items.length; i++){
        if(arr_wizard_items[i][1] == currentPage) return i;
    }
    return -1;
}

function generateWizardNavigationBar() {
    var str = "";
    for(var i = 0; i < arr_wizard_items.length; i++){
        
        str += "<li class=\"wizard_step_head\">" + (i + 1) + "</li>";
        if(isCurrent(arr_wizard_items[i][1]))
            str += "<li class=\"wizard_step_cont current\">";
        else
            str += "<li class=\"wizard_step_cont\">";
        str += arr_wizard_items[i][0] + "</li>";
    }
    $("#wizard_step").html(str);
}

function generateWizardOptions() {
   
    if(isFirst())
        $("#wizard_prew").hide();
    else{
        $("#wizard_prew").show();
    }
    if(isLast()){
        $("#wizard_next").hide();
        $("#wizard_ok").show();
        console.log("ok"); 
    }else{
        $("#wizard_ok").hide();
        $("#wizard_next").show();   
    }

        
}

function initWizardDatas() {
    /*todo*/
}

function loadWizardProgress(currentPage, validFunc, okFunc) {
    /*???*/
    var index = getCurrentIndex(currentPage);

    var item = arr_wizard_items[index][1];

    $("#" + item).show();
    $("#" + item).siblings().hide();

    /*g_wizard_hash = ???*/
    g_wizard_hash.currentPage = currentPage;
    g_wizard_hash.validFunc = validFunc;
    g_wizard_hash.okFunc = okFunc;

    generateWizardNavigationBar();
    generateWizardOptions();

    /*return g_wizard_hash;*/
}

function wizard_next_step() {
    var check;
    for(var i=0; i < arr_wizard_items.length; i++){
        if(isCurrent(arr_wizard_items[i][1])){
            if(arr_wizard_items == arr_nat_wizard_items){
                switch (i){
               
                    case 0: check = validWizardLinkmode();break;
                    case 1: check = validWizardIp();break;
                    case 2: check = validWizardLan();break;
                    case 3: check = validWizardAdpwd();break;
                    case 4: check = validWizardWireless();break;
                    
                default: break;

                }
            }else{
                switch (i){
                    case 0: check = validWizardLinkmode();break;
                    case 1: check = validWizardIp();break;
                    case 2: check = validWizardAdpwd();break;
                    case 3: check = validWizardWireless();break;
                   
                default: break;

                }
            }

            if(check){
                loadWizardProgress(arr_wizard_items[i+1][1]);
                if(i == (arr_wizard_items.length -2)) loadSummaryData();
            }
            
            break;
        }
    }
}

function wizard_prew_step() {
    for(var i=0; i < arr_wizard_items.length; i++){
        if(isCurrent(arr_wizard_items[i][1])){
            loadWizardProgress(arr_wizard_items[i-1][1]);
            break;
        }
    }
}

function wizard_cancel() {
    $("#m_equipment_overview").parent().show();
    $("#m_equipment_overview").addClass('current');
    $("#equipment_overview").show();
    $("#equipment_overview").siblings().hide();
}

function wizard_ok() {
    validWizardSummary();

    reboot();
}

$(function(){
    $("#wizard_cancel").click(wizard_cancel);
    $("#wizard_ok").click(ok);
    $("#wizard_prew").click(wizard_prew_step);
    $("#wizard_next").click(wizard_next_step);
});




















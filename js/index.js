function logout() {
    /*todo*/
}

function save_cfg_success() {
    /*todo*/
}

function save() {
    /*todo*/
}

function jumpToWizard() {
    /*todo*/
}

function jump() {
    /*todo*/
}

$(function () {
    $("#main_menu>li").click(function () {
        $this = $(this);
        $siblings = $(this).siblings();
        $this.addClass("main_current");
        $this.find(".sub_menu").css("display","block");
        if($this.find(".sub_menu>li").hasClass("current")){
            $this.find(".sub_menu>li").removeClass("current");
        }
        $this.find(".sub_menu>li:first").addClass("current");
        if($siblings.hasClass("main_current")){
            $siblings.removeClass("main_current");
            $siblings.find(".sub_menu").css("display","none");
            $siblings.find(".sub_menu>li:first").removeClass("current");
        }
        event.stopPropagation();
    });
    $(".sub_menu>li").click(function () {
        $this = $(this);
        $siblings = $(this).siblings();
        $this.addClass("current");
        if($siblings.hasClass("current")){
            $siblings.removeClass("current");
        }
        event.stopPropagation();
    })

    showCont();
    /*tab�¼�*/
    $(".underline li").click(tabMenuClicked);
    $(".underline li").mouseover(tabMenuMouseover);
    $(".underline li").mouseout(tabMenuMouseout);
    /*navigationBar�¼�*/
    $("li").click(setNavigationBar);

});

function resize() {
    /*todo*/
}

function init() {
    /*todo*/
}

/*̫�������Ż�*/
function showCont(){
    /*������*/
    $("#m_wizard").click(function(){
        $("#wizard").show();
        $("#wizard").siblings().hide();
    });
    $("#m_system_status").click(function(){
        $("#equipment_overview").show();
        $("#equipment_overview").siblings().hide();
    });
    
    $("#m_wireless_settings").click(function(){
        $("#wireless_servers").show();
        $("#wireless_servers").siblings().hide();
    });$("#m_equipment_management").click(function(){
        $("#equipment_maintenance").show();
        $("#equipment_maintenance").siblings().hide();
    });

    /*ϵͳ״̬*/
    $("#m_equipment_overview").click(function(){
        $("#equipment_overview").show();
        $("#equipment_overview").siblings().hide();
    });
    $("#m_wireless_status").click(function(){
        $("#wireless_status").show();
        $("#wireless_status").siblings().hide();
    });
    $("#m_radio_status").click(function(){
        $("#radio_status").show();
        $("#radio_status").siblings().hide();
    });
    $("#m_clientlist").click(function(){
        $("#clientlist").show();
        $("#clientlist").siblings().hide();
    });

    /*��������*/
    $("#m_wireless_servers").click(function(){
        $("#wireless_servers").show();
        $("#wireless_servers").siblings().hide();
    });
    $("#m_radio_setting").click(function(){
        $("#radio_setting").show();
        $("#radio_setting").siblings().hide();
    });
    
    $("#m_domainSet_settings").click(function(){
        $("#domainSet_settings").show();
        $("#domainSet_settings").siblings().hide();
    });
    
    $("#m_acl_settings").click(function(){
        $("#acl_settings").show();
        $("#acl_settings").siblings().hide();
    });
    
    $("#m_time_acl_settings").click(function(){
        $("#time_acl_settings").show();
        $("#time_acl_settings").siblings().hide();
    });
   
    /*�豸����*/
    $("#m_equipment_maintenance").click(function(){
        $("#equipment_maintenance").show();
        $("#equipment_maintenance").siblings().hide();
    });
   
    $("#m_time_settings").click(function(){
        $("#time_settings").show();
        $("#time_settings").siblings().hide();
    });
    $("#m_syslog").click(function(){
        $("#syslog").show();
        $("#syslog").siblings().hide();
    });
    $("#m_accounts_settings").click(function(){
        $("#accounts_settings").show();
        $("#accounts_settings").siblings().hide();
    });
}


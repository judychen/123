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
});

function resize() {
    /*todo*/
}

function init() {
    /*todo*/
}

/*太戳，等优化*/
function showCont(){
    /*主标题*/
    $("#m_wizard").click(function(){
        $("#wizard").show();
        $("#wizard").siblings().hide();
    });
    $("#m_system_status").click(function(){
        $("#equipment_overview").show();
        $("#equipment_overview").siblings().hide();
    });
    $("#m_networ_settings").click(function(){
        $("#interface_settings").show();
        $("#interface_settings").siblings().hide();
    });
    $("#m_wireless_settings").click(function(){
        $("#wireless_servers").show();
        $("#wireless_servers").siblings().hide();
    });$("#m_equipment_management").click(function(){
        $("#equipment_maintenance").show();
        $("#equipment_maintenance").siblings().hide();
    });

    /*系统状态*/
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
    $("#m_view_wds_status").click(function(){
        $("#view_wds_status").show();
        $("#view_wds_status").siblings().hide();
    });

    /*网络设置*/
    $("#m_interface_settings").click(function(){
        $("#interface_settings").show();
        $("#interface_settings").siblings().hide();
    });
    $("#m_vlan_settings").click(function(){
        $("#vlan_settings").show();
        $("#vlan_settings").siblings().hide();
    });
    $("#m_dhcpd").click(function(){
        $("#dhcpd").show();
        $("#dhcpd").siblings().hide();
    });
    $("#m_arp").click(function(){
        $("#arp").show();
        $("#arp").siblings().hide();
    });
    $("#m_routeV4_settings").click(function(){
        $("#routeV4_settings").show();
        $("#routeV4_settings").siblings().hide();
    });
    $("#m_global_dns_settings").click(function(){
        $("#global_dns_settings").show();
        $("#global_dns_settings").siblings().hide();
    });
    $("#m_dnsmasq_settings").click(function(){
        $("#dnsmasq_settings").show();
        $("#dnsmasq_settings").siblings().hide();
    });
    $("#m_servers_manage").click(function(){
        $("#servers_manage").show();
        $("#servers_manage").siblings().hide();
    });
    $("#m_igmp_snooping").click(function(){
        $("#igmp_snooping").show();
        $("#igmp_snooping").siblings().hide();
    });
    $("#m_network_advanced_settings").click(function(){
        $("#network_advanced_settings").show();
        $("#network_advanced_settings").siblings().hide();
    });
    /*无线设置*/
    $("#m_wireless_servers").click(function(){
        $("#wireless_servers").show();
        $("#wireless_servers").siblings().hide();
    });
    $("#m_radio_setting").click(function(){
        $("#radio_setting").show();
        $("#radio_setting").siblings().hide();
    });
    $("#m_radio_speed_settings").click(function(){
        $("#radio_speed_settings").show();
        $("#radio_speed_settings").siblings().hide();
    });
    $("#m_portal_settings").click(function(){
        $("#portal_settings").show();
        $("#portal_settings").siblings().hide();
    });
    $("#m_domainSet_settings").click(function(){
        $("#domainSet_settings").show();
        $("#domainSet_settings").siblings().hide();
    });
    $("#m_AAA_settings").click(function(){
        $("#AAA_settings").show();
        $("#AAA_settings").siblings().hide();
    });
    $("#m_acl_settings").click(function(){
        $("#acl_settings").show();
        $("#acl_settings").siblings().hide();
    });
    $("#m_wds").click(function(){
        $("#wds").show();
        $("#wds").siblings().hide();
    });
    $("#m_time_acl_settings").click(function(){
        $("#time_acl_settings").show();
        $("#time_acl_settings").siblings().hide();
    });
    $("#m_wireless_probe").click(function(){
        $("#wireless_probe").show();
        $("#wireless_probe").siblings().hide();
    });
    $("#m_wireless_advanced_settings").click(function(){
        $("#wireless_advanced_settings").show();
        $("#wireless_advanced_settings").siblings().hide();
    });
    /*设备管理*/
    $("#m_equipment_maintenance").click(function(){
        $("#equipment_maintenance").show();
        $("#equipment_maintenance").siblings().hide();
    });
    $("#m_capwap").click(function(){
        $("#capwap").show();
        $("#capwap").siblings().hide();
    });
    $("#m_time_settings").click(function(){
        $("#time_settings").show();
        $("#time_settings").siblings().hide();
    });
    $("#m_syslog").click(function(){
        $("#syslog").show();
        $("#syslog").siblings().hide();
    });
    $("#m_syslog_setting").click(function(){
        $("#syslog_setting").show();
        $("#syslog_setting").siblings().hide();
    });
    $("#m_accounts_settings").click(function(){
        $("#accounts_settings").show();
        $("#accounts_settings").siblings().hide();
    });








}


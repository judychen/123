function myhelp() {
	popHelp("dnsmasq_settings");
}
var tg = new myGrid('tg');

function onSearch() {
	var keyWords = $("#text_keywords").val();
	tg.pageview_search( $("#sel_search_item").val(), keyWords );
}

function setCheckbox(status) {
    if ( status == "1" )
        $("#chk_status").attr("checked", true);
    else 
        $("#chk_status").attr("checked", false);
}

function Cancel() {
    /* 设置运行状态 */
	for (var i = 0; i < jsDnsmasq.pkg_dnsmasq.length; i++){
		var temp = jsDnsmasq.pkg_dnsmasq[i];
        if (temp.sect_name == "dnsmasq") {
            setCheckbox(temp.enable)
        } 
    }
}

function delDomainSuccess(data) {
    var jsData = eval("("+data+")");

    jsDnsmasq.pkg_dnsmasq = jsData.pkg_dnsmasq;

    load();
}

function Ok() {
    /* qsx_to_do:
     * enable or disable */
    var url = "";
    url = "setform/form_dnsmasq_enable?UID="+parent.uid;

    var f = new myForm();
    $("#myForm").html("");

    if ( $("#chk_status").attr("checked") )
        f.add( "enable", "1" );
    else
        f.add( "enable", "0" ); 
    f.submit(url, checkDnsmasqEnable);
    
    //load();
}
function addDomain() {
    pageJump("dnsmasq_add.asp?UID=" + parent.uid);
}
function editDomain( arrRow, indexRow ){
	var name = arrRow[0];
	var ip = arrRow[1];
    pageJump("dnsmasq_edit.asp?UID=" + parent.uid + "&edit_name=" + name + "&edit_ip=" + ip);
}

function delDomain( arrRow, indexRow ){
	var name = arrRow[0];
	var ip = arrRow[1];

	var f = new myForm();
	var url = "";
	$("#myForm").html("");
	url = "setform/form_dnsmasq_del_domain?UID="+parent.uid;

	f.add( "name", name);
	f.add( "ip", ip);

	f.submit( url, delDomainSuccess);
}

function formatStatus(arrRow, index){
	if ( arrRow[index] == "bind" ) {
		return "绑定";
	}
	else {
		return "未绑定";
	}
}


function formatIP(arrRow, index){
	if ( arrRow[index] == "dhcp" ) {
		return "DHCP分配";
	} else {
		return arrRow[index];
	}
}

function showVlanList() {
    var arrVlanIfList = new Array();
	var count = 0;

    var ifname = "";
    var iptype = "";
	for (var i = 0; i < jsVlan_interface.pkg_vlan_interface.length; i++){
		var temp = jsVlan_interface.pkg_vlan_interface[i];

        /* get interface name */
		ifname = temp.sect_name;

        /* get ip address */
		for (var j = 0; j < jsDialer.pkg_dialer.length; j++){
			var t_dialer = jsDialer.pkg_dialer[j];
			if ( t_dialer.sect_name == ifname) {
				if ( t_dialer.type == "static" ) {
					iptype = t_dialer.static_ipv4_address + "/" + t_dialer.static_ipv4_netmask;
				} else if ( t_dialer.type == "dhcp" ) {
					iptype = "dhcp";
				} 
			}
		}

        /* get bind status */
        bindstat = "unbind";
        for (var k = 0; k < jsDnsmasq.pkg_dnsmasq.length; k++){
            var bindif = jsDnsmasq.pkg_dnsmasq[k];
            if (bindif.sect_name == "bind") {
                if ("undefined" == typeof(bindif.vlan)) {
                    break;
                }
                for (var l = 0; l < bindif.vlan.length; l++) {
                    var bindiftmp = "Vlan-interface" + bindif.vlan[l].vlan
                    if (ifname == bindiftmp) {
                        bindstat = "bind";
                    }
                }
            } 
        }

		arrVlanIfList[count] = ifname + ";" + iptype + ";" + bindstat;
		count++;
	}

    var bindstat = "";
    var page = getQueryString("page");
    if (page != null)
        tg.pageview_init(arrVlanIfList, 10, 'tbl_vlanInterface', page);
    else
        tg.pageview_init(arrVlanIfList, 10, 'tbl_vlanInterface');
}

function load() {
    var arrDomainList = new Array();
    var count = 0;

    for (var i = 0; i < jsDnsmasq.pkg_dnsmasq.length; i++){
        var tmp = jsDnsmasq.pkg_dnsmasq[i];
        if (tmp.sect_name == "domain") {
            for (var key in tmp) {
                var list = tmp[key];
                if (typeof(list) != "object") {
                    continue;
                }
                for (var j=0; j < list.length; j++) {
                    var domain = key.replace(/\@/g, ".");
                    var ip = list[j][key];
                    arrDomainList[count] = domain + ";" + ip;
                    count++;
                }
            }
        }
    } 

	var page = getQueryString("page");
	if (page != null)
		tg.pageview_init(arrDomainList, 10, 'tbl_Domain', page);
	else
		tg.pageview_init(arrDomainList, 10, 'tbl_Domain');

}

function checkDnsmasqEnable(data) {

}

function bindVlanInterfaceSuccess( data ) {
	var jsData = eval("("+data+")");
	jsDnsmasq.pkg_dnsmasq= jsData.pkg_dnsmasq;
    load();
}

function unbindVlanInterfaceSuccess( data ) {
	var jsData = eval("("+data+")");
	jsDnsmasq.pkg_dnsmasq = jsData.pkg_dnsmasq;
    load();
}

function bindVlanInterface( arrRow, indexRow ) {
    var arrDatas = arrRow;
    var vlanIf = arrDatas[0];

    var f = new myForm();
    var url = "";
    $("#myForm").html("");
    url = "setform/form_dnsmasq_bind_if?UID="+parent.uid;

    var vlanid= vlanIf.slice(14);
    f.add("vlanid", vlanid);

    f.submit(url, bindVlanInterfaceSuccess);
}

function unbindVlanInterface( arrRow, indexRow ) {
    var arrDatas = arrRow;
    var vlanIf = arrDatas[0];

    var f = new myForm();
    var url = "";
    $("#myForm").html("");
    url = "setform/form_dnsmasq_unbind_if?UID="+parent.uid;

    var vlanid= vlanIf.slice(14);
    f.add("vlanid", vlanid);

    f.submit(url, unbindVlanInterfaceSuccess);

    load();
}

function init() {
    /* 设置导航 */
	setNavigationBar("网络设置>DNS代理>DNS代理管理");

    /* 设置运行状态 */
	for (var i = 0; i < jsDnsmasq.pkg_dnsmasq.length; i++){
		var temp = jsDnsmasq.pkg_dnsmasq[i];
        if (temp.sect_name == "dnsmasq") {
            setCheckbox(temp.enable)
        } 
    }

	/* 接口列表 */
    /*
	tg.pageview_add('接口', 0, '35%', MG_SORT_SELF, null, null, interface_sort_asc, interface_sort_dsc);
	tg.pageview_add('IP地址/子网掩码', 1, '35%', MG_SORT_ASCII, null, formatIP);
	tg.pageview_add('状态', 2, '15%', MG_SORT_ASCII, null, formatStatus);

	tg.pageview_set_OPwidth("%15");
	tg.pageview_add_btn("绑定", bindVlanInterface);
	tg.pageview_add_btn("解绑定", unbindVlanInterface);
    */
    
    /* domain list */
    tg.pageview_add('域名名称', 0, '55%', MG_SORT_ASCII);
    tg.pageview_add('IP地址', 1, '35%', MG_SORT_ASCII);

    tg.pageview_set_OPwidth("10%");
	tg.pageview_add_btn("编辑", editDomain);
	tg.pageview_add_btn("删除", delDomain);

	load();
}

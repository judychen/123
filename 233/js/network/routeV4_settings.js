function Cancel(){
}
function Ok(){
	alert("TODO:");
}
function addStaticRouter(){
	pageJump("routeV4_add.asp?UID=" + parent.uid);
}

function wirelessSetting(){
	var url = "wireless_setting.html";
	$(window.parent.document).find("#Frame_Content").attr("src",url);
}

function refreshSuccess(data){
	jsonData = eval("("+data+")");
	//if ( jsonData.status == "ok" ) {
		clientList.length = 0;
		for(i=0; i<jsonData.datas.length; i++){
			tmp = jsonData.datas[i];
			clientList[i] = tmp.ip+";"+tmp.nexthop+";"+tmp.netmask+";"+tmp.source+";"+tmp.pre+";"+tmp.interface;
		}
		tg.pageview_init(clientList, 10, 'list_table');
	//} else if ( jsonData.status == "error" ){
	//	showError(true, jsonData.datas);
	//}else
//		showError(true, "未知响应！");
}

function refresh_active() {
	var f = new myForm();
	var url="goform/form_route_v4_refresh?UID="+parent.uid;
	f.add("test", "test");
	f.submit( url, refreshSuccess );
}

function refresh_static_success( data ) {
	var jsData = eval("(" + data + ")");
	routeStaticList.pkg_route = jsData.pkg_route;
	load();
}

function refresh_static() {
	var f = new myForm();
	var url="goform/form_route_v4_refresh_static?UID="+parent.uid;
	f.add( "test", "test" );
	f.submit( url, refresh_static_success );
}

function delRouteSuccess(data){
	var jsData = eval("("+data+")");
	routeStaticList.pkg_route = jsData.pkg_route;
	load();
}

function delStaticRoute(arrRow, indexRow){
	//var arrDatas = arrRouteStatic[index].split(";");
	var arrDatas = arrRow;
	var ip = arrDatas[0];
	var netmask = arrDatas[2];
	var nexthop = arrDatas[1];
	var interface = arrDatas[4];
	var metric = arrDatas[3];

	var f = new myForm();
	var url="setform/form_route_v4_del?UID="+parent.uid;
	f.add( "ip", ip );
	f.add( "netmask", netmask );
	f.add( "nexthop", nexthop );
	f.add( "interface", interface );
	f.add( "metric", metric );
	
	f.submit( url, delRouteSuccess );
}

function formatRouteProto(arrRow, index){
	var ret;
	switch(arrRow[index]){
	case "0":
		ret = "Static";
		break;
	case "1":
		/*fix bug*/
		//ret = "Dialer";
		ret = "static";
		break;
	case "2":
		ret = "Direct";
		break;
	case "3":
		ret = "Local";
		break;
	default:
		ret = arrRow[index];
		break;
	}
	return ret;
}

function tabmenuHL( curTabmenu ){
	var tabname;
	if (curTabmenu == "" || curTabmenu == "生效路由")
		tabname = "生效路由";
		//tabmenu_jump("生效路由");
	else if ( curTabmenu == "静态路由") {
		//tabmenu_jump(curTabmenu);
		tabname = "静态路由";
	}
	var arrDom = $(".tabmenu a");
	for (i = 0; i < arrDom.length; i++){
		tmp = $(arrDom[i]);
		if (tmp.html() == tabname){
			//alert(tabname+" clicked");
			tmp.click();
		}
	}
}

function tabmenu_jump(page) {
	switch (page){
	case "生效路由":
		setNavigationBar("网络设置>IPv4路由>生效路由");
		$(".route_part_active").css('display','block'); 
		$(".route_part_static").css('display','none'); 
		refresh_active();
		break;
	case "静态路由":
		setNavigationBar("网络设置>IPv4路由>静态路由");
		$(".route_part_active").css('display','none'); 
		$(".route_part_static").css('display','block'); 
		refresh_static();
		break;
	default:
		alert("Unkown tab clicked!");
		break;
	}
}

function load() {
	arrRouteStatic.length = 0;
	for ( var i=0; i < routeStaticList.pkg_route.length; i++ ) {
		tmp = routeStaticList.pkg_route[i];
		arrRouteStatic[i] = tmp.ip+";"+tmp.nexthop+";"+tmp.netmask+";"+tmp.metric+";"+tmp.interface;
	}

	tg2.pageview_init(arrRouteStatic, 10, 'list_static');
}

$(document).ready(function(){
	tabMenu_init();
});

function formatNetmask( arrRow, index ) {
	return netmask_num2dottedQuad( arrRow[index] );
}

function onSearchRouteActive() {
	var keyWords = $("#text_keywords_active").val();
	tg.pageview_search( $("#search_item_active").val(), keyWords );
}

function onSearchRouteStatic() {
	var keyWords = $("#text_keywords_static").val();
	tg2.pageview_search( $("#search_item_static").val(), keyWords );
}

var tg = new myGrid('tg');
var tg2 = new myGrid('tg2');
function init(){
	tabmenuHL(curTabmenu);

	setNavigationBar("网络设置>IPv4路由>生效路由");
	clientList.length = 0;
	for(var i=0; i < routeActiveList.datas.length; i++){
		tmp = routeActiveList.datas[i];
		clientList[i] = tmp.ip+";"+tmp.nexthop+";"+tmp.netmask+";"+tmp.source+";"+tmp.pre+";"+tmp.interface;
	}
	tg.pageview_add('目的IP地址', 0, '20%', MG_SORT_ASCII);
	tg.pageview_add('子网掩码', 2, '15%', MG_SORT_ASCII, null, formatNetmask);
	tg.pageview_add("协议",3, "15%", MG_SORT_ASCII, null, formatRouteProto);
	tg.pageview_add("优先级",4, "15%", MG_SORT_NUM);
	tg.pageview_add("下一跳",1, "15%", MG_SORT_ASCII);
	tg.pageview_add('接口', 5, '14%', MG_SORT_SELF, null, null, interface_sort_asc, interface_sort_dsc);
	tg.pageview_init(clientList, 10, 'list_table');

	tg2.pageview_add('目的IP地址', 0, '20%', MG_SORT_ASCII);
	tg2.pageview_add('子网掩码', 2, '20%', MG_SORT_ASCII, null, formatNetmask);
	tg2.pageview_add("优先级",3, "18%", MG_SORT_NUM);
	tg2.pageview_add("下一跳",1, "18%", MG_SORT_ASCII);
	tg2.pageview_add('接口', 4, '18%', MG_SORT_SELF, null, null, interface_sort_asc, interface_sort_dsc);
	tg2.pageview_set_OPwidth("6%");
	tg2.pageview_add_btn("删除", delStaticRoute, null, null);

	load();
}

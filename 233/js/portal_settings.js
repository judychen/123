function myhelp() {
	popHelp("portalSettings");
}

function addPortal(){
	var url = "portal_add.asp?UID="+parent.uid;
	pageJump(url);
}

function portal_edit(arrRow, indexRow){
	var arrRow = arrRow;
	var schemeName = arrRow[0];
	
	var url = "portal_edit.asp?UID="+parent.uid+"&portal_scheme="+schemeName + "&page=" + tg.getCurrentPage();
	pageJump(url);
}

function portal_del(arrRow, indexRow){
	var arrRow = arrRow;
	var schemeName = arrRow[0];
	
	var url="setform/form_portal_del?UID="+parent.uid;
	var f = new myForm();
	
	f.add("portal_scheme", schemeName);
	
	f.submit( url, delPortalSuccess );
}

function delPortalSuccess( data ) {
	jsPortal = eval("("+data+")");
	load();
}

function onSearch() {
	var keyWords = $("#text_keywords").val();
	tg.pageview_search( $("#search_item").val(), keyWords );
}

function load() {
	var temp = jsPortal.pkg_portal;
	arrPortal.length = 0;
	for (i = 0; i< temp.length; i++) {
		arrPortal[i] = temp[i].sect_name;
		arrPortal[i] += ";";
		if ( typeof(temp[i].url) != "undefined" ) {
			arrPortal[i] += temp[i].url;
		} else {
			arrPortal[i] += "";
		}
		arrPortal[i] += ";";
		if ( typeof(temp[i].enabled) != "undefined" ) {
			arrPortal[i] += temp[i].enabled;
		} else {
			arrPortal[i] += "disabled";
		}
	}

	var page = getQueryString("page");
	if ( page != null )
		tg.pageview_init(arrPortal, 10, 'list_portal', page);
	else
		tg.pageview_init(arrPortal, 10, 'list_portal');
}

function formatStatus(arrRow, index) {
	var ret;

	if (arrRow[index] == "enabled" )
		return "启用";
	else if ( arrRow[index] == "disabled" )
		return "禁用";

	return "";
}

var tg = new myGrid('tg');
function init() {
	setNavigationBar("无线设置>Portal管理>Portal方案列表");

	tg.pageview_add('方案名称', 0, '20%', MG_SORT_ASCII);
	tg.pageview_add('URL', 1, '57%', MG_SORT_ASCII);
	tg.pageview_add('状态', 2, '10%', MG_SORT_ASCII, null, formatStatus);
	tg.pageview_add_btn("编辑", portal_edit);
	tg.pageview_add_btn("删除", portal_del);
	tg.pageview_set_OPwidth("13%");

	load();
}

var arrDomainSet = new Array();

function myhelp() {
	popHelp("domainSetSettings");
}

function addDomainSet(){
	var url = "domainSet_add.asp?UID=" + parent.uid;
	pageJump(url);
}

function domainSet_edit(arrRow, indexRow){
	var arrRow = arrRow;
	var schemeName = arrRow[0];
	
	var url = "domainSet_edit.asp?UID="+parent.uid+"&scheme="+schemeName + "&page=" + tg.getCurrentPage();
	pageJump(url);
}

function domainSet_del(arrRow, indexRow){
	var arrRow = arrRow;
	var schemeName = arrRow[0];
	
	var url="setform/form_domain_set_del?UID="+parent.uid;
	var f = new myForm();
	
	f.add("dns_set", schemeName);
	f.submit( url, delDomainSetSuccess );
}

function delDomainSetSuccess( data ) {
	jsDomainSet = eval("("+data+")");
	load();
}

function onSearch() {
	var keyWords = $("#text_keywords").val();
	tg.pageview_search( $("#search_item").val(), keyWords );
}

function load() {
	var temp = jsDomainSet.pkg_dns_set;
	arrDomainSet.length = 0;
	for (var i = 0; i < temp.length; i++) {
		arrDomainSet[i] = temp[i].sect_name;
		arrDomainSet[i] += ";";
		if ( typeof(temp[i].enabled ) != "undefined" ) {
			arrDomainSet[i] += temp[i].enabled;
		} else {
			arrDomainSet[i] += "disabled";
		}
	}

	var page = getQueryString("page");
	if ( page != null )
		tg.pageview_init(arrDomainSet, 10, 'list_domainSet', page);
	else
		tg.pageview_init(arrDomainSet, 10, 'list_domainSet');
}

function formatStatus(arrRow, index) {
	if (arrRow[index] == "enabled" )
		return "启用";
	else if ( arrRow[index] == "disabled" )
		return "禁用";

	return "";
}

var tg = new myGrid('tg');
function init() {
	setNavigationBar("无线设置>域名集管理>域名集列表");

	tg.pageview_add('方案名称', 0, '67%', MG_SORT_ASCII);
	tg.pageview_add('状态', 1, '20%', MG_SORT_ASCII, null, formatStatus);
	tg.pageview_add_btn("编辑", domainSet_edit);
	tg.pageview_add_btn("删除", domainSet_del);
	tg.pageview_set_OPwidth("13%");

	load();
}

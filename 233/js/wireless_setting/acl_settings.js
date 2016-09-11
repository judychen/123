function myhelp() {
	popHelp("aclSettings");
}

function addAcl(){
	var url = "acl_add.asp?UID="+parent.uid;
	pageJump(url);
}

function acl_edit(arrRow, indexRow){
	var arrRow = arrRow;
	var schemeName = arrRow[0];
	
	var url = "acl_edit.asp?UID="+parent.uid+"&acl_scheme="+schemeName + "&page=" + tg.getCurrentPage();
	pageJump(url);
}

function addApServiceSuccess() {
	var url = "AAA_settings.asp?UID="+parent.uid;
	pageJump(url);
}

function acl_del(arrRow, indexRow){
	var arrRow = arrRow;
	var schemeName = arrRow[0];
	
	var url="setform/form_acl_del?UID="+parent.uid;
	var f = new myForm();
	
	f.add("acl_scheme", schemeName);
	
	f.submit( url, delAclSuccess );
}

function delAclSuccess( data ) {
	jsAcl = eval("("+data+")");
	load();
}

function onSearch() {
	var keyWords = $("#text_keywords").val();
	tg.pageview_search( $("#search_item").val(), keyWords );
}

function load() {
	var temp = jsAcl.pkg_wlan_acl;
	arrAcl.length = 0;
	for (i = 0; i< temp.length; i++) {
		arrAcl[i] = temp[i].sect_name;
		arrAcl[i] += ";";
		if ( typeof(temp[i].policy) == "undefined" ) {
			arrAcl[i] += "";
		} else
			arrAcl[i] += temp[i].policy;
	}

	var page = getQueryString("page");
	if ( page != null )
		tg.pageview_init(arrAcl, 10, 'list_acl', page);
	else
		tg.pageview_init(arrAcl, 10, 'list_acl');
}

function formatPolicy(arrRow, index){
	var ret;

	if (arrRow[index] == "permit" )
		return "白名单";
	else if ( arrRow[index] == "deny" )
		return "黑名单";
	return "";
}

var tg = new myGrid('tg');
function init(){
	setNavigationBar("无线设置>ACL管理>ACL方案列表");

	tg.pageview_add('方案名称', 0, '47%', MG_SORT_ASCII);
	tg.pageview_add('策略', 1, '40%', MG_SORT_ASCII, null, formatPolicy);
	tg.pageview_add_btn("编辑", acl_edit);
	tg.pageview_add_btn("删除", acl_del);
	tg.pageview_set_OPwidth("13%");

	load();
}

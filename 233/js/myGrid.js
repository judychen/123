//var showline_func;//TODO:
//var showheader_func;//TODO:

/* enum MG_SORT_TYPE */
var MG_SORT_NONE = -1;
var MG_SORT_SELF = 99;
var MG_SORT_ASCII = 0;
var MG_SORT_NUM = 1;
/* enum MG_SORT_TYPE, end */

var pageview_selected; 
//var pageview_oncbxclick_func;
var sort_by_938233;	//938233 to prevent the variable redefintion

/* callback function for sort */
function pageview_ascii_sort_asc(a, b) {
	if (a == '') return 1;
	if (b == '') return -1;
	var s1 = a.split(';');
	var s2 = b.split(';');
	if (s1[sort_by_938233] > s2[sort_by_938233]) return 1;
	if (s1[sort_by_938233] == s2[sort_by_938233]) return 0;
	if (s1[sort_by_938233] < s2[sort_by_938233]) return -1;
}

function pageview_ascii_sort_dsc(a, b) {
	if (a == '') return -1;
	if (b == '') return 1;
	var s1 = a.split(';');
	var s2 = b.split(';');
	if (s1[sort_by_938233] > s2[sort_by_938233]) return -1;
	if (s1[sort_by_938233] == s2[sort_by_938233]) return 0;
	if (s1[sort_by_938233] < s2[sort_by_938233]) return 1;
}

function pageview_number_sort_asc(a, b) {
	if (a == '') return 1;
	if (b == '') return -1;
	var s1 = a.split(';');
	var s2 = b.split(';');
	return s1[sort_by_938233] - s2[sort_by_938233];
}

function pageview_number_sort_dsc(a, b) {
	if (a == '') return -1;
	if (b == '') return 1;
	var s1 = a.split(';');
	var s2 = b.split(';');
	return s2[sort_by_938233] - s1[sort_by_938233];
}

/* TODO: need be test */
function  ip_sort_asc(a, b) {
	if (a == '') return 1;
	if (b == '') return -1;
	return ip_sort(a, b);
}

function ip_sort_dsc(a, b) {
	if (a == '') return -1;
	if (b == '') return 1;
	return -ip_sort(a, b);
}

function ip_sort(a,b) {
    var aa=inet_aton(a);
    var bb=inet_aton(b);
    if (((aa > 0) && (bb > 0)) 
			|| ((aa < 0) && (bb < 0))) {
        return (aa-bb);
    } else if (aa == 0) {
        return -1;
    } else if (bb == 0) {
        return 1;
    } else {
        return(bb-aa);
    }
}

function inet_aton(ip) {
	iparray=ip.split(".");	
	if(iparray.length!=4)return -1;	
	return (Number(iparray[0])<<24|Number(iparray[1])<<16 |Number(iparray[2])<<8 |Number(iparray[3]) );
}

function inet_aton(ip)
{
	iparray=ip.split(".");	
	if(iparray.length!=4)return -1;	
	return (Number(iparray[0])<<24|Number(iparray[1])<<16 |Number(iparray[2])<<8 |Number(iparray[3]) );
}
/* TODO: need be test, end */

/* GigabitEthernet0/0 Ethernet0/0 Vlan_interface1 wlan_bss_sort */
function interface_sort_dsc( a, b ) {
	return 0 - interface_sort_asc( a, b );
}
function interface_sort_asc( a, b ) {
	if (a == '') return 1;
	if (b == '') return -1;
	var s1 = a.split(';');
	var s2 = b.split(';');
	var a = s1[sort_by_938233]; //strip the prefix "GigabitEthernet0/", leaving only the ID 
	var b = s2[sort_by_938233];

	if (a == '') return 1;
	if (b == '') return -1;
	if ( a.charAt(0) == 'G' ) {
		if ( b.charAt(0) == 'G' )
			return g_ethernet_sort( a, b );
		else
			return -1;
	} else if ( a.charAt(0) == 'E' ) {
		if ( b.charAt(0) == 'G' )
			return 1;
		else if ( b.charAt(0) == 'E')
			return ethernet_sort( a, b );
		else
			return -1;
	} else if ( a.charAt(0) == 'V' ) {
		if ( b.charAt(0) == 'V' )
			return vlan_interface_sort( a, b );
		else if ( b.charAt() == 'W')
			return -1;
		else
			return 1;
	} else if ( a.charAt(0) == 'W' ) {
		if ( b.charAt(0) == 'W' )
			return wlan_bss_sort( a, b );
		else
			return 1;
	}
}

function g_ethernet_sort( a, b ) {
	var id1 = a.slice( 17 ); //strip the prefix "GigabitEthernet0/", leaving only the ID 
	var id2 = b.slice( 17 );
	return id1 - id2;
}
function ethernet_sort( a, b ) {
	var id1 = a.slice( 10 ); //strip the prefix "Ethernet0/", leaving only the ID 
	var id2 = b.slice( 10 );
	return id1 - id2;
}
function vlan_interface_sort( a, b ) {
	var id1 = a.slice( 14 ); //strip the prefix "Vlan-interface", leaving only the ID 
	var id2 = b.slice( 14 );
	return id1 - id2;
}
function wlan_bss_sort( a, b ) {
	var id1 = a.slice( 8 ); //strip the prefix "WLAN-BSS", leaving only the ID 
	var id2 = b.slice( 8 );
	return id1 - id2;
}

/* callback function for sort, end */

//@cansort: detail see MG_SORT_TYPE 
//@linkfunc: hyperlink event
function pageview_item(title, index, width, cansort, linkfunc, formatfunc, sortAscFunc, sortDscFunc) {
	this.title = title;
	this.index = index;
	this.width = width;
	this.cansort = cansort;
	this.linkfunc = linkfunc;
	this.formatfunc = formatfunc;

	if ( cansort == MG_SORT_ASCII ) {
		this.sortAscFunc = pageview_ascii_sort_asc;
		this.sortDscFunc = pageview_ascii_sort_dsc;
	} else if ( cansort == MG_SORT_NUM ) {
		this.sortAscFunc = pageview_number_sort_asc;
		this.sortDscFunc = pageview_number_sort_dsc;
	} else if ( cansort == MG_SORT_SELF ) {
		this.sortAscFunc = sortAscFunc;
		this.sortDscFunc = sortDscFunc;
	}
}

function mG_changeClass(obj, className) {
	obj.className = className;
}

function myGrid(ObjName) {
	this.ObjName = ObjName; //对象名称，eg. tg_xxx = new myGrid("tg_xxx");
	this.start;				//当前页面在数组中的起始位置
	this.OPwidth = "1%";		//操作按钮所在列宽度
	this.bSeparateHdFt = false;	//表头表尾与正文分离，同时正文可滚动显示
	this.pageview_list;
	this.pageview_list_bak = new Array();//原始数据备份，用于取消过滤使用
	this.pageview_list_filter = new Array(); //过滤后数据
	this.pageview_showlist = new Array();//表格正文所有列属性
	this.pageview_length = 0;	//行数
	this.pageview_pagesize;		//每页行数
	this.pageview_npages;		//总页数
	this.pageview_current_page;	//当前页码
	this.pageview_table_div;	//Table 所在DIV
	this.pageview_title;		//列表名称
	this.pageview_btnlist = new Array();//按钮列信息
	this.sort_by;				//根据第几列排序
	this.sort_dir;
	this.pageview_have_checkbox = 0;	//0表示无checkBox;1表示全选/反选在表底栏;2表示全选/全不选在表头栏。
	this.pageview_checkbox_formatFunc; 
}

function pageview_oncbxclick(item)
{
	//pageview_selected[item] = document.getElementById('pageview_cb_'+this.ObjName+"_" + item).checked;
	//if(pageview_oncbxclick_func)
	//	pageview_oncbxclick_func(item);
}

function pageview_ischecked(index) {
	return pageview_selected[index];
}

myGrid.prototype = {
	//当存在formatFunc函数且返回false时，显示“--”代替checkBox
	_Add_CheckBoxFont: function (vs, p) {
		var str = "";
		if (this.pageview_have_checkbox != 0 ) {
			if ( typeof(this.pageview_checkbox_formatFunc) == "function" 
					&& this.pageview_checkbox_formatFunc(vs) == false )
				str += '<td><div class="disable_chk">--</div></td>';
			else
				str += '<td class="opCheckBox'+ 0 +'"><input type="checkbox" id="pageview_cb_' +this.ObjName+"_"+ p + '" '
					+ 'onclick="pageview_oncbxclick(' + p + ');"></td>';
		}
		return str;
	},
	_Add_opBtns: function (vs, p) {
		var str = "";
		//是否在表尾增加各操作按钮
		if ( this.pageview_btnlist.length > 0 ) {
			for ( var i = 0; i < this.pageview_btnlist.length; i++ ) {
				var btn = this.pageview_btnlist[i];
				if ( btn.formatFunc && !btn.formatFunc(vs, i) ) {
					str += "<td><div class='disabled_op'>--</div></td>";
				}
				else {
					str += "<td class=\"opBtn"+ i + "\">"
						+"<input type=\"button\" value=\""+btn.value+"\" onclick=\"" + this.ObjName + ".op_handle(" + i + "," + p + ");\" ";
					if( typeof(this.pageview_btnlist[i].classname) != "undefined" && this.pageview_btnlist[i].classname != null )
						str	+= "class=\""+ this.pageview_btnlist[i].classname+"\"" ;
					if( typeof(this.pageview_btnlist[i].title) != "undefined" && this.pageview_btnlist[i].title != null )
						str	+= "title=\"" + this.pageview_btnlist[i].title+"\"";
					str +=	"/></td>";
				}
			}
		}
		return str;
	},
	
	headerChkClick: function (obj){
		if ( obj.checked == true )
			this.selAll();
		else
			this.selNone();
	},

	selAll: function ()
	{
		var i;
		for(i = this.start; i < this.pageview_list.length; i++)
		{
			if(i - this.start >= this.pageview_pagesize)
				break;
			var dom = document.getElementById('pageview_cb_'+ this.ObjName+"_" + i);
			if(dom != null){//防止第1列checkbox中包含“--”选项
				dom.checked = true;
				pageview_oncbxclick(i);
			}
		}
	},

	selNone: function ()
	{
		var i;
		for(i = this.start; i < this.pageview_list.length; i++)
		{
			if(i - this.start >= this.pageview_pagesize)
				break;
			var dom = document.getElementById('pageview_cb_'+ this.ObjName+"_" + i);
			if(dom != null){//防止第1列checkbox中包含“--”选项
				dom.checked = false;
				pageview_oncbxclick(i);
			}
		}
	},
	
	selInvert: function()
	{
		var i;
		for(i = this.start; i < this.pageview_list.length; i++)
		{
			if(i - this.start >= this.pageview_pagesize)
				break;
			document.getElementById('pageview_cb_'+this.ObjName+"_" + i).checked = !document.getElementById('pageview_cb_'+this.ObjName+"_" + i).checked;
			pageview_oncbxclick(i);
		}
	},

	//生成表头栏
	genTblHeader: function(){
		var str = "";
		str += '<tr>';
		//首行标题栏是否预留checkbox空间 
		if( this.pageview_have_checkbox == 1 ){	
			str += '<td class=titleCell width="1%">'
			str	+= '</td>';
		}
		else if( this.pageview_have_checkbox == 2 ){	
			str += '<td class=titleCell width="1%">'
			str += '<input type="checkbox" onclick="javascript:' + this.ObjName + '.headerChkClick(this);" />';
			str	+= '</td>';
		}
		for(i = 0; i < this.pageview_showlist.length; i++) {
			if ( typeof(this.pageview_showlist[i].cansort) != "undefined"
					&& this.pageview_showlist[i].cansort != MG_SORT_NONE ) {
				str += '<td class=titleCell width=' + this.pageview_showlist[i].width + '>' 
					+ this.pageview_showlist[i].title 
					+ this.sort_img( i ) + '</td>';
			} else {
				str += '<td class=titleCell width=' + this.pageview_showlist.width + '>' 
					+ this.pageview_showlist[i].title + '</td>';
			}
		}
		//是否在表尾增加各操作按钮
		if(this.pageview_btnlist.length > 0)
		{
			str += '<td class=titleCell colSpan='+ this.pageview_btnlist.length + ' width='+this.OPwidth+'>操作</td>';
		}

		str += '</tr>';
		if ( this.bSeparateHdFt == true )
			str += '</table><div style="height:400px; overflow:auto;"><table>';
		return str;
	},

	genTblBody: function() {
	},

	//生成表底栏
	genTblFooter: function() {
		var str = "";	
		var colSpan = 0;
		if (this.pageview_have_checkbox != 0 )
			colSpan = 1;
		colSpan += this.pageview_showlist.length + this.pageview_btnlist.length;
		if ( this.bSeparateHdFt == true )
			str += '</table></div><table width="100%">';
		str += '<tr class="Tblfooter" bgColor=#eeeeee><td colSpan="' + colSpan + '" style="text-align:center; padding:0px;"><table width="100%" cellpadding="0" cellspacing="0"><tr>';
		str += '<td width="50%" align=left>共 ' + this.pageview_length + ' 条记录</td>';
		str += '<td align=left>';
		if(this.pageview_npages != 0)
			str += '第 ' + this.pageview_current_page + ' 页/共 ' + this.pageview_npages + ' 页&nbsp;&nbsp;';
		else
			str += '第 ' + this.pageview_current_page + ' 页/共 ' + 1 + ' 页&nbsp;&nbsp;';

		/* tune pages */
		var MAX_PAGE_DISPLAY_ONE_SIDE = 3;
		if ( this.pageview_npages != 0 ) {
			var nCountPages = 0;
			var leftTotalPages = this.pageview_current_page - 1;
			var rightTotalPages = this.pageview_npages - this.pageview_current_page;
			var prevPage, nextPage;

			//if ( this.pageview_current_page - MAX_PAGE_DISPLAY_ONE_SIDE > 1 ) {
			if ( this.pageview_current_page != 1 ) {
				str += '<a class="page" id="' + 'page_begin' + '" href="javascript:'+this.ObjName+'.pageview_goto(' + 1 + ');">' + "首页" + '</a>&nbsp;';
			} else {
				str += '<a class="activePage" id="' + 'page_begin' + '" href="javascript:;">' + "首页" + '</a>&nbsp;';
			}

			if ( leftTotalPages < MAX_PAGE_DISPLAY_ONE_SIDE && rightTotalPages > MAX_PAGE_DISPLAY_ONE_SIDE ) {
				rightTotalPages = 2 * MAX_PAGE_DISPLAY_ONE_SIDE - leftTotalPages;
			} else if ( leftTotalPages > MAX_PAGE_DISPLAY_ONE_SIDE && rightTotalPages < MAX_PAGE_DISPLAY_ONE_SIDE ) {
				leftTotalPages = 2 * MAX_PAGE_DISPLAY_ONE_SIDE - rightTotalPages;
			} else {
				leftTotalPages = MAX_PAGE_DISPLAY_ONE_SIDE;
				rightTotalPages = MAX_PAGE_DISPLAY_ONE_SIDE;
			}

			for ( var i = 0; i < leftTotalPages; i++ ) {
				prevPage = this.pageview_current_page - leftTotalPages + i;
				if ( prevPage >= 1 ) {
					str += '<a class="page" id="' + prevPage + '" href="javascript:'+this.ObjName+'.pageview_goto(' + prevPage + ');">' + prevPage + '</a>&nbsp;';
				}
			}

			str += '<a class="activePage" id="' + this.pageview_current_page + '" href="javascript:;">' + this.pageview_current_page + '</a>&nbsp;';

			for ( var i = 0; i < rightTotalPages; i++ ) {
				nextPage = this.pageview_current_page + i + 1;
				if ( nextPage <= this.pageview_npages  ) {
					str += '<a class="page" id="' + nextPage + '" href="javascript:'+this.ObjName+'.pageview_goto(' + nextPage + ');">' + nextPage + '</a>&nbsp;';
				}
			}

			//if ( this.pageview_current_page < this.pageview_npages - MAX_PAGE_DISPLAY_ONE_SIDE ) {
			if ( this.pageview_current_page != this.pageview_npages ) {
				str += '<a class="page" id="' + 'page_last' + '" href="javascript:'+this.ObjName+'.pageview_goto(' + this.pageview_npages + ');">' + "尾页" + '</a>&nbsp;';
			} else {
				str += '<a class="activePage" id="' + 'page_last' + '" href="javascript:;">' + "尾页" + '</a>&nbsp;';
			}
		}
		/* tune pages, end */

		str += '</td>';
		if(this.pageview_have_checkbox == 1)
			str += '<td align=right><a href="javascript:'+ this.ObjName + '.selAll();">全选</a>/<a href="javascript:'+ this.ObjName + '.selInvert();">反选</a><td>';
		str += '</tr></table></td></tr>';
		return str;
	},
	pageview_goto: function(pn) {
		pageview_selected.length = 0;
		/*
		if(pageview_oncbxclick_func && pageview_have_checkbox)	//换页重置所有checkBox状态
			pageview_oncbxclick_func(-1);
		*/

		var j; 
		var start;	//当前页面起始项在数组中位置 
		var p;		//数组下标
		var str = '', link, vs;
		this.pageview_current_page = pn;
		
		str += '<table width=100% border=0 align=center cellpadding=5 cellspacing=1 class=box_tn>';

		str += this.genTblHeader();//页表头	
	
		var ncnt = 0;
		//计算当前页面起始项在数组中位置
		for(start = 0; start < this.pageview_list.length; start++) {
			if( this.pageview_list[start] == "" )
				continue;
			ncnt++;
			if( ncnt > (pn - 1) * this.pageview_pagesize )
				break;
		}
		this.start = start;

		ncnt = 0;
		for( p = start; ncnt < this.pageview_pagesize; ) {
			if(p >= this.pageview_list.length) break;
			if(this.pageview_list[p] == '') {
				p++;
				continue;
			}
			ncnt ++;
			vs = this.pageview_list[p].split(';');

				
			if (ncnt % 2 == 1)	//奇数或偶数行
				str += "<tr class='odd' onmouseover='mG_changeClass(this,\"activeRow\")' onmouseout='mG_changeClass(this, \"odd\")' >";
			else
				str += "<tr class='even' onmouseover='mG_changeClass(this,\"activeRow\")' onmouseout='mG_changeClass(this, \"even\")' >";

			//首列前是否增加checkbox
			str += this._Add_CheckBoxFont(vs, p);

			//表格正文部分
			for (j = 0; j < this.pageview_showlist.length; j++) {
				if ( this.pageview_showlist[j].linkfunc )
					link = '<a href="javascript:' + this.pageview_showlist[j].linkfunc +
						'(' + p + ');">';
				else
					link = '';
					
				var text = "";
				if ( typeof(this.pageview_showlist[j].formatfunc) == "function" ) {
					text = this.pageview_showlist[j].formatfunc(vs, this.pageview_showlist[j].index);
				} else {
					text = vs[this.pageview_showlist[j].index];
				}
				
				str += '<td width=' + this.pageview_showlist[j].width +' class="myGrid_col' + j +'"' + 
					'>' + link + escapeHtml(text);

				if(link.length > 0)
					str += '</a></td>';
				else
					str += '</td>';
			}
			
			//是否在表尾增加各操作按钮
			str += this._Add_opBtns(vs, p);
			
			str += '</tr>';
			
			p ++;
		}
		
		str += this.genTblFooter();
		str += '</table>';
		
		this.pageview_table_div.innerHTML = str;
	},
	
	//title: title of the table 
	//index: col index 
	//width: col width  eg. 10px or 10%
	//cansort: detail see MG_SORT_TYPE 
	//linkfunc: item link event handler 
	//formatfunc: handler for format data before display
	pageview_add: function( title, index, width, cansort, linkfunc, formatfunc, sortAscFunc, sortDscFunc ) {
		if ( formatfunc != null && typeof(formatfunc) != "undefined" && typeof(formatfunc) != "function"){
			alert("error: typeof(formatfunc) must be function!");
		}
		this.pageview_showlist.length++;
		this.pageview_showlist[this.pageview_showlist.length-1] = new pageview_item(title, index, width
				, cansort, linkfunc, formatfunc, sortAscFunc, sortDscFunc);
	},
	
	pageview_btn: function(value, title, classname, linkfunc, formatFunc)
	{
		this.value = value;
		this.title = title;
		this.classname = classname;
		this.linkfunc = linkfunc;
		this.formatFunc = formatFunc;
	},

	//value: 按钮名称, string
	//funcName: 点击按钮响应的函数名称, string
	//tip: 鼠标滑过按钮显示的提示信息, string或null，可省略
	//class: 给按钮添加类, string或null,可省略 
	pageview_add_btn: function(value, funcName, tip, classname, formatFunc) {
		if ( typeof(funcName) != "function" ) {
			if ( typeof(funcName) == "string" ) {
				alert("the parameter is not a function, parameter value: " + funcName);
			} else
				alert("the parameter is not a function!" );
		}
		this.pageview_btnlist.length++;
		this.pageview_btnlist[this.pageview_btnlist.length-1] = new this.pageview_btn(value, tip, classname, funcName, formatFunc);
	},
	
	//0表示无checkBox;1表示全选/反选在表底栏;2表示全选/全不选在表头栏。
	pageview_add_checkbox: function(type, formatFunc) {
		this.pageview_have_checkbox = type;
		this.pageview_checkbox_formatFunc = formatFunc;
	},
	
	//width: 操作按钮列宽度 格式如"2px" 或 "30%"
	pageview_set_OPwidth: function( width ) {
		this.OPwidth = width;
	},

	pageview_separateHeadFoot: function( bSeparate ) {
		this.bSeparateHdFt = bSeparate;
	},

	sort_img: function (index) {
		var str = '';
		str += "<a class=\"sort\" href=\"javascript:"+this.ObjName+".pageview_sort("+ index + ");\">";
		if ( sort_by_938233 == this.pageview_showlist[index].index ) {
			if (this.sort_dir == 0) 
				str += '&nbsp;<img width=12 height=10 border=0 src="images/down.png"></img>';
			else 
				str += '&nbsp;<img width=12 height=10 border=0 src="images/up.png"></img>';
		}
		else
			str += '&nbsp;<img width=12 height=10 border=0 src="images/sort_none.png"></img>';
		str += '</a>';
		return str;
	},

	pageview_sort: function (index) {
		sort_by_938233 = this.pageview_showlist[index].index;

		if ( this.sort_dir == 0 ) {
			this.pageview_list.sort(this.pageview_showlist[index].sortAscFunc);
			this.sort_dir = 1;
		} else {
			this.pageview_list.sort(this.pageview_showlist[index].sortDscFunc);
			this.sort_dir = 0;
		}
		this.pageview_goto(1);
	},

	//参数说明
	//onCbxClick:
	pageview_init: function (plist, size, tblDiv, page) {
		var i;
		this.pageview_list = plist;
		//this.pageview_title = ptitle;
		this.pageview_length = 0;
		for(i = 0; i < plist.length; i ++) if(plist[i] != '') this.pageview_length ++;
		this.pageview_pagesize = size;
		if ( typeof(tblDiv) == "string" )
			this.pageview_table_div = document.getElementById( tblDiv );
		else
			this.pageview_table_div = tblDiv;
		//pageview_oncbxclick_func = onCbxClick;
		pageview_selected = new Array(plist.length);
		for(var i = 0; i < plist.length; i ++) pageview_selected[i] = false;
		this.pageview_npages = Math.round(this.pageview_length / this.pageview_pagesize);
		if(this.pageview_length - this.pageview_npages * this.pageview_pagesize > 0) this.pageview_npages ++;
		if ( typeof(page) == "undefined" 
				|| page == null || page == "null" )
			this.pageview_current_page = 1;
		else
			this.pageview_current_page = page;
		this.sort_by = -1;
		this.sort_dir = 1;
		this.pageview_goto(this.pageview_current_page);
	},

	pageview_search: function ( index, keyWords ) {
		if ( keyWords != "" ) {
			this.filter( index, keyWords );
			this.pageview_init( this.pageview_list_filter, this.pageview_pagesize, this.pageview_table_div );
		} else {
			this.pageview_init( this.pageview_list_bak, this.pageview_pagesize, this.pageview_table_div );
		}
	},

	filter: function ( index, data ) {
		this.pageview_list_filter.length = 0;
		var count = 0;
		var original_list;
		if ( this.pageview_list_bak.length != 0 )
			original_list = this.pageview_list_bak;
		else {
			this.pageview_list_bak = this.pageview_list;
			original_list = this.pageview_list;
		}

		/* get column */
		var column = 0;
		for ( var i = 0; i < this.pageview_showlist.length; i++ ) {
			if ( this.pageview_showlist[i].index == index )	{
				column = i;
				//alert( "column= " + i );
				break;
			}
		}
		/* get column, end */

		for ( var i = 0; i < original_list.length; i++ ) {
			var arrTemp = original_list[i].split(";");
			var exp = new RegExp( escapeReg(data), "i" );
			if ( this.pageview_showlist[column].formatfunc ) {
				var afterFormatData = this.pageview_showlist[column].formatfunc( arrTemp, index );
				//alert( "afterFormatData: " + afterFormatData );
				if ( exp.test( afterFormatData ) ) {
					this.pageview_list_filter[count++] = original_list[i];
				}
			} else {
				if ( exp.test( arrTemp[index] ) ) {
					this.pageview_list_filter[count++] = original_list[i];
				}
			}
			
		}
	},

	op_handle: function ( funcID, rowIndex ) {
		var func = this.pageview_btnlist[funcID].linkfunc;
		var strRow = this.pageview_list[rowIndex];
		var arrRow = strRow.split(";");

		if ( typeof(func) == "function" )
			func( arrRow, rowIndex );
		else
			alert("is not a function");
	},

	getCurrentPage: function() {
		return this.pageview_current_page;
	}
}

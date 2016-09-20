var MG_SORT_NONE = -1;
var MG_SORT_SELF = 99;
var MG_SORT_ASCII = 0;
var MG_SORT_NUM =1;

var pageview_selected;

var sort_by_938233;/*为啥？？？*/

/*???为啥要split？？？*/
function pageview_ascii_sort_asc(a, b){
    if(a == "") return 1;
    if(b == "") return -1;
    var s1 = a.split(";");/*？？？*/
    var s2 = b.split(";");
    if(s1[sort_by_938233] > s2[sort_by_938233]) return 1;/*？？？？*/
    if(s1[sort_by_938233] == s2[sort_by_938233]) return 0;
    if(s1[sort_by_938233] < s2[sort_by_938233]) return -1;
}

function pageview_ascii_sort_dsc(a ,b){
    return pageview_ascii_sort_asc(b,a);
}

function pageview_number_sort_asc(a, b){
    if(a == "") return 1;
    if(b == "") return -1;
    var s1 = a.split(";");
    var s2 = b.split(";");

    return s1[sort_by_938233] - s2[sort_by_938233];
}

function pageview_number_sort_dsc(a, b){
    return pageview_number_sort_asc(b, a);
}

function ip_sort_asc(a, b){
    if (a == '') return 1;
    if (b == '') return -1;
    return ip_sort(a, b);
}

function ip_sort_dsc(a, b) {
    return ip_sort(b, a);
}

function ip_sort(a, b){
    var aa = inet_aton(a);
    var bb = inet_aton(b);

    if(((aa > 0 ) && (bb > 0)) || ((aa < 0) && (bb < 0))){
        return aa-bb;   /*127 255 255 255 >0 但 128 0 0 0 < 0*/
    }else if(aa == 0){
        return -1;
    }else if(bb == 0){
        return 1;
    }else{
        return bb-aa;  /*若a为负，则b-a = 正 ，顺序调换 ；反正同样*/
    }
}

function inet_aton(ip){
    iparray = ip.split(".");
    if(iparray.length != 4) return -1;
    return (Number(iparray[0]) << 24 | Number(iparray[1]) << 16 | Number(iparray[2]) << 8 | Number(iparray[3]));
}

function interface_sort_dsc(a, b){
    /*todo*/
}

function interface_sort_asc(a, b){
    /*todo*/
}

function g_ethernet_sort(a, b){
    /*todo*/
}

function ethernet_sort(a, b){
    /*todo*/
}

function vlan_interface_sort(a, b){
    /*todo*/
}

function wlan_bss_srot(a, b){
    /*todo*/
}



/*验证*/
/*$(function(){
    console.log(ip_sort("127.255.255.255", "128.0.0.2"));
})*/


function pageview_item(title, index, width, cansort, linkfunc, formatfunc, sortAscFunc, sortDscFunc){
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

function mG_changeClass(){
    /*todo*/
}

function myGrid(ObjName){
    this.ObjName = ObjName;
    this.start;
    this.OPwidth = "1%";
    this.BseparateHdFt = false;
    this.pageview_list;
    this.pageview_list_bak = new Array();
    this.pagewiew_list_filter = new Array();
    this.pageview_showlist = new Array();
    this.pageview_length = 0;
    this.pageview_pagesize;
    this.pageview_npages;
    this.pageview_current_page;
    this.pageview_table_div;
    this.pageview_title;
    this.pageview_btnlist = new Array();
    this.sort_by;
    this.sort_dir;
    this.pageview_have_checkbox = 0;
    this.pageview_checkbox_formatFunc;
}

function pageview_oncbxclick(item){
    /*todo*/
}

function pageview_ischecked(index){
    /*todo*/
}

myGrid.prototype = {
    _Add_CheckBoxFont:function(){

    },
    _Add_opBtns:function(){

    },
    headerChkClick:function(){

    },
    selAll:function(){

    },
    selNone:function(){

    },
    selInvert:function(){

    },
    /*生成表头*/
    genTblHeader:function(){
        var str = "";
        str += '<thead><tr>';
/*        if( this.pageview_have_checkbox == 1 ){
            /!**!/
        }
        else if( this.pageview_have_checkbox == 2 ){
            /!**!/
        }*/
        /*排序判断暂??*/

        for(i = 0; i < this.pageview_showlist.length; i++){
            str += '<th>' + this.pageview_showlist[i].title + '</th>';
        }

    //是否在表尾增加各操作按钮/*<操作> ？？？*/
        str += "</th></thead>"

        return str;
    },
    //生成表底栏
    genTblFooter:function(){

        var str = "";
        var colSpan = 0;
        /*??*/
        colSpan += this.pageview_showlist.length;/*??*/

        str += '<tr><td colspan= "' + colSpan + '">';
        str += '<table class=\"tbl_page\"><tbody><tr>';
        str += '<td>共 ' + this.pageview_length + ' 条记录</td>';
        if(this.pageview_npages != 0)
            str += '<td>第 ' + this.pageview_current_page + ' 页/共 ' + this.pageview_npages + ' 页';
        else
            str += '<td>第 ' + this.pageview_current_page + ' 页/共 ' + 1 + ' 页';

        str += '</td>';
        str += '</tr></tbody></table></td></tr>';

        return str;

    },
    pageview_goto:function(pn){
        pageview_selected.length = 0;
        var j;
        var start;	//当前页面起始项在数组中位置
        var p;		//数组下标
        var str = '', link, vs;
        this.pageview_current_page = pn;

        str += '<table class=\"tbl\">';
        str += this.genTblHeader();

        var ncnt = 0;
/*ncnt加到>前一页x页数，即当前页面第一个的数量 好像ncnt不需要，start即可*/
        for(start = 0; start < this.pageview_list.length; start++) {
            if( this.pageview_list[start] == "" )
                continue;
            ncnt++;
            if( ncnt > (pn - 1) * this.pageview_pagesize )
                break;
        }

        this.start = start;

        ncnt = 0;

        for( p = start; ncnt < this.pageview_pagesize; ){
            if(p >= this.pageview_list.length) break;

            if(this.pageview_list[p] == '') {
                p++;
                continue;
            }
            ncnt ++;
            vs = this.pageview_list[p].split(';');

            if (ncnt % 2 == 1)	//奇数或偶数行
                str += "<tr class='odd'>";
            else
                str += "<tr class='even'>";

            /*??*/

            for (j = 0; j < this.pageview_showlist.length; j++) {
                /*link??*/
                link = '';

                var text = "";
                
                if ( typeof(this.pageview_showlist[j].formatfunc) == "function" ) {
                    text = this.pageview_showlist[j].formatfunc(vs, this.pageview_showlist[j].index);
                } else {
                    text = vs[this.pageview_showlist[j].index];
                }

                str += '<td>' + link + escapeHtml(text);

                /*??*/
                str += '</td>';
            }

            /*??*/
            str += '</tr>';

            p ++;

        }

        str += this.genTblFooter();
        str += '</table>';

        this.pageview_table_div.html(str);
    },
    //title: 表格标题
    //index: 表格序号
    //width: 表格宽度 eg. 10px or 10%
    //cansort: detail see MG_SORT_TYPE
    //linkfunc: item link event handler
    //formatfunc: handler for format data before display
    pageview_add:function(title, index, width, cansort, linkfunc, formatfunc, sortAscFunc, sortDscFunc){
        if ( formatfunc != null && typeof(formatfunc) != "undefined" && typeof(formatfunc) != "function"){
            alert("error: typeof(formatfunc) must be function!");
        }/*？？*/
        this.pageview_showlist.length++;
        this.pageview_showlist[this.pageview_showlist.length-1] = new pageview_item(title, index, width
            , cansort, linkfunc, formatfunc, sortAscFunc, sortDscFunc);

    },
    pageview_btn:function(){

    },
    pageview_add_btn:function(){

    },
    pageview_add_checkbox:function(){

    },
    pageview_set_OPwidth:function(){

    },
    pageview_separateHeadFoot:function(){

    },
    sort_img:function(){

    },
    pageview_sort:function(){

    },
    pageview_init:function(plist, size, tblDiv, page){

        var i;
        this.pageview_list = plist;
        this.pageview_length = 0; //数据个数,即行数
        for(i = 0; i < plist.length; i++){
            if(plist[i] != "") this.pageview_length++;
        }
        this.pageview_pagesize = size;
        /*初始化整个表格*/
        if(typeof(tblDiv) == "string")
            this.pageview_table_div = $("#" + tblDiv);
        else
            this.pageview_table_div = tblDiv;

        pageview_selected = new Array(plist.length);
        for(var i = 0; i < plist.length; i ++) pageview_selected[i] = false;
        /*这边两句用ceil不就好了嘛？*/
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
    pageview_search:function(){

    },
    filter:function(){

    },
    op_handle:function(){

    },
    getCurrentPage:function(){

    },

}












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

function pageview_ascii_sort_des(a ,b){
    return pageview_ascii_sort_asc(b,a);
}

function pageview_number_sort_asc(a, b){
    if(a == "") return 1;
    if(b == "") return -1;
    var s1 = a.split(";");
    var s2 = b.split(";");

    return s1[sort_by_938233] - s2[sort_by_938233];
}

function pageview_number_sort_des(a, b){
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


function pageview_item(){
    /*todo*/
}

function mG_changeClass(){
    /*todo*/
}

function myGrid(){
    /*todo*/
}

function pageview_oncbxclick(item){
    /*todo*/
}

function pageview_ischecked(index){
    /*todo*/
}

myGrid.prototype = {

}












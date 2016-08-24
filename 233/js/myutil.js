/* author:lsz */

var entityMap = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;",
	"/": "&#x2F;",
	" ": "&nbsp;",
	"\u00A0": "&nbsp;" /*added for fixed bug: ascii 160 and 32 both is space */
};

var entityMapReg = {
	"$": "\\$",
	"(": "\\(",
	")": "\\)",
	'*': "\\*",
	"+": "\\+",
	".": "\\.",
	"[": "\\[",
	"]": "\\]",
	"?": "\\?",
	"\\": "\\\\",
	"^": "\\^",
	"{": "\\{",
	"}": "\\}",
	"|": "\\|"
};

/* 设置导航栏信息 */
function setNavigationBar(content){
	var tmp = "位置："+content;
	$(window.parent.document).find("#navigationBar").html(tmp);
	if ( content == "" )
		$(window.parent.document).find("#navigationBar").css("display","none");
	else
		$(window.parent.document).find("#navigationBar").css("display","block");
}

/* TabMenu start */
/* Step1:define the function named tabmenu_jump 
** Step2:invoke the tabMenu_init()   
** Example:	
	$("document").ready( function(){
		tabMenu_init();
	});
*/
function tabMenu_init(){
		$(".tabmenu a").click(function(){
			tabMenuClicked(this);
		});
		$(".tabmenu a").mouseover(function(){
			tabMenuMouseover(this);
		});
		$(".tabmenu a").mouseout(function(){
			tabMenuMouseout(this);
		});
}

function tabMenuClicked(obj){
	var $obj=$(obj) //DOM Object to Jquery Object

	if ( $obj.parent().attr('class')=="tabSelected" )
		return;
	else if( $obj.parent().attr('class')=="tabHover" ||
			$obj.parent().attr('class')=="tabUnselected" ){
		$(".tabSelected").attr('class','tabUnselected');
		$obj.parent().attr('class', 'tabSelected');
	}
	
	tabmenu_jump($(obj).html()); 
}

function tabMenuMouseover(obj){
	var $obj=$(obj); //DOM Object to Jquery Object

	if ( $obj.parent().attr('class')=="tabSelected" )
		return;
	else if( $obj.parent().attr('class')=="tabUnselected" ){
		$obj.parent().attr('class', 'tabHover');
	}

}

function tabMenuMouseout(obj){
	var $obj=$(obj); //DOM Object to Jquery Object

	if ( $obj.parent().attr('class')=="tabHover" )
		$obj.parent().attr('class', 'tabUnselected');
}
/* TabMenu end */

//获取url参数 方法一
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);// window.location.search为获取url中？后的字符串
	if (r != null) return unescape(r[2]); return null;
}
//获取url参数，方法二
function GetRequest() {
   var url = location.search; //获取url中"?"符后的字串
   var theRequest = new Object();
   if (url.indexOf("?") != -1) {
	  var str = url.substr(1);
	  strs = str.split("&");
	  for(var i = 0; i < strs.length; i ++) {
		 theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
	  }
   }
   return theRequest;
}


//子页面跳转
function pageJump(url){
	$(window.parent.document).find("#Frame_Content").attr("src",url);
}

function showWaitConfig(bShow){
	if ( bShow == true ) {
		$(window.parent.document).find("#zzc").css("display", "block");
		$(window.parent.document).find("#dialog").css("display", "block");
	} else {
		$(window.parent.document).find("#zzc").css("display", "none");
		$(window.parent.document).find("#dialog").css("display", "none");
	}
}


//var _focus_obj = top._focus_obj;
function showError(bShow, errMsg) {
	if ( bShow == true ) {
		$(window.parent.document).find("#zzc").css("display", "block");
		$(window.parent.document).find("#errDlg").css("display", "block");
		$(window.parent.document).find("#errMsg").html(errMsg);

		$(window.parent.document).find("#errDlg_okBtn").focus().select();
		//top._focus_obj.focus().select();
	}
	else {
		if ( top._focus_obj != null ) {
			top._focus_obj.focus().select();
			top._focus_obj = null;
		}

		$(window.parent.document).find("#zzc").css("display", "none");
		$(window.parent.document).find("#errDlg").css("display", "none");
	}

}

function myAlert( info, id ) {
	if ( typeof(id) != "undefined" ) {
		top._focus_obj = $("#"+id);
	}
	else {
		top._focus_obj = null;
	}
	showError( true, info );
}
/*
function myAlert( info ) {
	showError( true, info );
}*/

function showSelect(bShow, bSave, errMsg, funcselect) {
	if ( bShow == true ) {
		top.Select_Config_handler = funcselect;
		$(window.parent.document).find("#zzc").css("display", "block");
		$(window.parent.document).find("#selectReboot").css("display", "block");
		$(window.parent.document).find("#selectMsg").html(errMsg);

		$(window.parent.document).find("#selectReboot_okBtn").focus().select();
		//top._focus_obj.focus().select();

		top.g_confirm_with_save = bSave;
		if (bSave) {
			$(window.parent.document).find("#myAlert_span_save").css("display", "block");
			$(window.parent.document).find("#selectReboot_Select").css("display", "block");
		} else {
			$(window.parent.document).find("#myAlert_span_save").css("display", "none");
			$(window.parent.document).find("#selectReboot_Select").css("display", "none");
		}
	}
	else {
		if ( top._focus_obj != null ) {
			top._focus_obj.focus().select();
			top._focus_obj = null;
		}

		$(window.parent.document).find("#zzc").css("display", "none");
		$(window.parent.document).find("#selectReboot").css("display", "none");
	}
}

/*function waitRebootComplete() {
	progressTask( 35, gohome );
}

function rebootSuccess() {
	waitRebootComplete();
}

function _reboot() {
	var url="setform/form_dev_reboot?UID="+parent.uid;
	var f = new myForm();
	f.add( "test", "test" );
	f.submit( url, rebootSuccess );
}*/
//add by puyg for bug 1878
function select_reboot() {
	showSelect(false);
	_reboot();
}

/*
function select_imageupgrade()
{
	//alert('select_imageupgrade');
	showSelect(false);
	var arrJqObj = $(".radio_method");
	for(i = 0; i < arrJqObj.length; i++) {
		var tmp = $( arrJqObj[i] );
		if ( tmp.attr("checked") == "checked" ) {
			if ( tmp.val() == "Local" ) {
				form_dev_imageUpgrade_local();
			} else if ( tmp.val() == "FTP") {
				form_dev_imageUpgrade_ftp();
			} else {
				form_dev_imageUpgrade_tftp();
			}
		}
	}
}*/

function save_select_success() {
	if ( typeof(top.Select_Config_handler) == "function" ) {
		top.Select_Config_handler();
	}
}

top.g_confirm_with_save = true;

function save_config()
{
	var url="setform/form_cfg_save?UID="+parent.uid;
	var f = new myForm();
	f.add( "test", "test" );
	f.submit( url, save_select_success);
}

function selectOk() {
	showSelect(false);
	if ( top.g_confirm_with_save && $("#selectReboot_Select").attr("checked") == "checked") {
		/* save config before reboot */
		save_config();
	} else {
		/* don't save config before reboot */
		if ( typeof(top.Select_Config_handler) == "function" ) {
			top.Select_Config_handler();
		}
	}
}

/* bSave: if display save checkbox or not */
function myConfirm(info, bSave, funcOk) {
	top._focus_obj = null;
	showSelect( true, bSave, info, funcOk );
}

function myAlertSelect( info, funcselect) {
	top._focus_obj = null;
	var jqDomSelectDlg = $(window.parent.document).find("#selectReboot_Select");
	jqDomSelectDlg.attr("checked", false);
	showSelect( true, true, info, funcselect);
}
//end by puyg

function getDays( year, month ) {
	var leapYear = new Array( 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 );
	var nonLeap = new Array( 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 );
	if ( isLeapYear( year ) )
		return leapYear[month - 1];
	else
		return nonLeap[month - 1];
}

//return: -1 means Unknown, 1 means A, 2 means B, 3 means C, 4 means D
function get_class_of_address( ip ) {
	var arrIP = ip.split(".");
	if ( !checkNumberRang(arrIP[0], 0, 255 ) ) {
		return -1;
	}
	var n = parseInt( arrIP[0] );

	if ( n >= 0 && n <= 127 ) {
		return 1;
	} else if ( n >= 128 && n <= 191 ) {
		return 2;
	} else if ( n >= 192 && n <= 223 ) {
		return 3;
	} else {
		return 4;
	}
}


function netmask_dotteQuad2num( netmask ) {
	var arrNetmask = netmask.split(".");
	var temp_mask;
	var nMask = 0;

	for ( var i = 0; i < 4; i++ ) {
		temp_mask = arrNetmask[i];
		for ( var j = 0; j < 8; j++ ) {
			if ( (temp_mask & 0x80) == 0x80) {
				nMask++;
				temp_mask = (temp_mask << 1);
			} else {
				return nMask;
			}
		}
	}

	return nMask;
}

//eg. change 24 to 255.255.255.0
function netmask_num2dottedQuad( num ) {
	if ( num == 0 )
		return "0.0.0.0";

	var n = 0xFFFFFFFF;
	var left = 32 - num;
	var m = (n << left);

	var arrNetmask = new Array();
	arrNetmask[0] = (m >> 24) & 0xFF;
	arrNetmask[1] = (m >> 16) & 0xFF;
	arrNetmask[2] = (m >> 8) & 0xFF;
	arrNetmask[3] = (m >> 0) & 0xFF;

	var str = arrNetmask[0] + "." + arrNetmask[1] + "." + arrNetmask[2] + "." + arrNetmask[3];
	return str;
}

function sleep( ms ) {
	var start = new Date().getTime();
	while (true) {
		if ( new Date().getTime() - start > ms )
			break;
	}
}

function escapeHtml( str ) {
	return String(str).replace( /[&<>"'\/\s]/g, function( s ) {
		return entityMap[s];
	});
}

function escapeReg( str ) {
	return String(str).replace( /[\$\(\)\*\+\.\[\]\?\\\^\{\}\|]/g, function( s ) {
		return entityMapReg[s];
	});
}

function popHelp( section ) {
	if ( window.win1 && !window.win1.closed ) {
		 window.win1.close();
	}
	var x=screen.availWidth / 4;
	var y=screen.availHeight / 4;
	//win1=window.open( "static/help.html?UID=" + parent.uid + "&t=" + parent.buildtime + "#" + section, "Help",'width=600,height=450,toolbar=no,status=no,scrollbars=yes,resizable=yes,menubar=no');
	win1=window.open( "help.html?UID=" + parent.uid + "&t=" + parent.buildtime + "#" + section, "Help",'width=600,height=450,toolbar=no,status=no,scrollbars=yes,resizable=yes,menubar=no');
	win1.moveTo(x,y);
}

function strip_blank_boundary( value ) {
	return value.replace(/(^\s*)|(\s*$)/g, "");
}

function getDayOfWeek( n ) {
	switch ( n ) {
		case 0:
			return "星期日";
		case 1:
			return "星期一";
		case 2:
			return "星期二";
		case 3:
			return "星期三";
		case 4:
			return "星期四";
		case 5:
			return "星期五";
		case 6:
			return "星期六";
		default:
			return "";
	}
}

function timeToString( n ) {
	if (n < 10)
		return "0" + n;
	else 
		return n;
}

function secToString( sec ) {
	var day = new Array();
	var nSec = parseInt(sec);
	var ret;
	day.weekday = parseInt( nSec / 86400 );
	day.hour = parseInt( (nSec % 86400) / 3600 );
	day.minute = parseInt( (nSec % 3600) / 60 );
	ret = getDayOfWeek( day.weekday ) + " " + timeToString(day.hour) + ":" + timeToString(day.minute);
	return ret;
}

function secToDHM( sec ) {
	var day = new Array();
	var nSec = parseInt(sec);
	day.weekday = parseInt( nSec / 86400 );
	day.hour = parseInt( (nSec % 86400) / 3600 );
	day.minute = parseInt( (nSec % 3600) / 60 );
	return day;
}

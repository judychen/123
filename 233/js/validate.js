/* 判断ip地址的合法性
*  advanced(option): 1 permit 0.0.0.0; 2 permit 255.255.255.255; 3 permit all; default not permit above
*/
function checkIP( value, advanced ) {
	/*fir bug for error ip like 00.00.00.00*/
    //var exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    var exp = /^(0|[1-9]\d?|1\d\d|2[0-4]\d|25[0-5])\.(0|[1-9]\d?|1\d\d|2[0-4]\d|25[0-5])\.(0|[1-9]\d?|1\d\d|2[0-4]\d|25[0-5])\.(0|[1-9]\d?|1\d\d|2[0-4]\d|25[0-5])$/;
    var reg = value.match(exp);
    if ( reg == null ) {
    	return false;
    }

	if ( value == "0.0.0.0" ) {
		if ( typeof(advanced) == "undefined" ) {
			return false;	
		} else {
			if ( advanced != "1" && advanced != "3" )
				return false;
		}
	} else if ( value == "255.255.255.255" ) {
		if ( typeof(advanced) == "undefined" ) {
			return false;
		} else {
			if ( advanced != "2" && advanced != "3" )
				return false;
		}
	}

	return true;
}

function checkMask(mask) {
	var obj = mask;
	var exp=/^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)|255.255.255.255$/;
	var reg = obj.match(exp);
	if (reg == null) {
		return false;	//"非法"
	}
	else {
		return true;	//"合法"
	}
}

function isMacValid( mac ) {
	var exp = /^[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}$/;
	if ( !exp.test(mac)  ) {
		myAlert("MAC地址格式不正确！");
		return false;
	}
	return true;
}

function isDomainNameValid( value ) {
	var exp=/^[a-zA-Z0-9\.\-]+$/
	var reg = value.match(exp);
	if (reg == null) {
		return false;
	}

	return true;
}

//2-4094
function checkVlanID(value){
	var exp=/^\d+[\-]{1}\d+$/
	var exp2=/^[0-9]+$/;
	var reg = value.match(exp);
	if (reg == null) {
		if ( value.match(exp2) == null )
			return false;
		else {
			if ( 1 < value && value < 4095 )
				return true;
			else
				return false;
		}
	}
	else {
		var arr = value.split("-");
		if(arr.length == 2){
			var nStart = parseInt(arr[0]);
			var nEnd= parseInt(arr[1]);
			if( nStart <= nEnd && 1 < nStart && nEnd < 4095 ){
				return true;
			}
			else
				return false;
		} else 
			return false;
	}
}

/* wep key can't include " ' ? ; and space */
function check_wep_key_ascii(value) {
	var exp = /^[^"'?;\s]+$/;
	var reg = value.match(exp);
	if (reg == null) {
    	return false;
    }
	return true;
}

/* wpa psk can't include " ' ? ; and space */
function check_psk_ascii(value){
	var exp = /^[^"'?;\s]+$/;
	var reg = value.match(exp);
	if (reg == null) {
    	return false;
    }
	return true;
}

/*
function test_checkWEP_key(){
	if ( checkWEP_key("aabbccddee") == false )
		alert("error 1");
	if ( checkWEP_key("aabbccddee123") == false )
		alert("error 2");
	if ( checkWEP_key("32aabbccddee") == true )
		alert("error 3");
	if ( checkWEP_key("aabbccddeef")  == true)
		alert("error 4");
	if ( checkWEP_key("aabbccddeeff") == true )
		alert("error 5");
	if ( checkWEP_key("11223344556677889900112233") == false )
		alert("error 6");
	if ( checkWEP_key("112233445566778899001122334") == true )
		alert("error 7");
	if ( checkWEP_key("112233445566778899001122334") == true )
		alert("error 8");
	if ( checkWEP_key("112233445566778899001122") == true )
		alert("error 9");
	if ( checkWEP_key("aabbccddgg") == true )
		alert("error 10");
	if ( checkWEP_key("12345") == false )
		alert("error 11");
	if ( checkWEP_key("1234") == true )
		alert("error 12");
	if ( checkWEP_key("123456") == true )
		alert("error 13");
	
}
*/

//判断vlan是否是1~4094之间的数字
function checkVlan(value){
	if (isNaN(value))
		return false;
	var nVlan = parseInt(value);
	if ( 0 >= nVlan || 4094 < nVlan)
		return false;

	return true;
}

//判断数字value是否在2个数值(包括)之间
function checkNumberRang(value, minValue, maxValue) {
	if ( (value == "") || (value.indexOf(" ") != -1 ) )
		return false;
		
	var exp = /^[\-]?[1-9][0-9]*$/;
	var reg = value.match( exp );
	
	if ( reg == null && value != 0  ) {
		return false;
	}
	
	var nValue = parseInt(value);

	//if ( isNaN( nValue ) )
		//return false;

	if ( minValue > nValue || nValue > maxValue )
		return false;

	return true;
}


function isHasChinese( value ) {
	var exp = /[^\x00-\xff]/;
	var reg = value.match( exp );
    if ( reg == null ) {
    	return false;
    }

	return true;
}

function getStrLeng(str){ 
    var realLength = 0; 
    var len = str.length; 
    var charCode = -1; 
    for(var i = 0; i < len; i++){ 
        charCode = str.charCodeAt(i); 
        if (charCode >= 0 && charCode <= 128) {  
            realLength += 1; 
        }else{  
            // 如果是中文则长度加3 
            realLength += 3; 
        } 
    }  
    return realLength; 
}

function checkStringLen(value, minLen, maxLen){
	var len = getStrLeng(value);
	
	if ( len < minLen || len > maxLen )
		return false;

	return true;
}

function isHexString( value ){
	var exp = /^[0-9a-fA-F]+$/;
	var reg = value.match(exp);
    if( reg == null ) {
    	return false;
    }
	return true;
}

/* check if the name of upgrade image is valid */
function isImageNameValid( value ) {
	var exp = /^[0-9a-zA-Z_\.\-\s]+$/;
	var reg = value.match(exp);
    if ( reg == null ) {
    	return false;
    }
	return true;
}

/* check if the file name for import/export is valid */
function isConfigNameValid( value ) {
	var exp = /^[0-9a-zA-Z_\.]+$/;
	var reg = value.match(exp);
    if ( reg == null ) {
    	return false;
    }
	return true;
}

//不包含" ' ; ?
function checkPassword( value ){
	var exp=/^[^"';?\s]+$/;
	var reg = value.match(exp);
	if (reg == null)
		return false;
	return true;
}

//只能包含数字、字母、下划线
function checkUserName( value ) {
	var exp=/^[0-9a-zA-Z_]+$/;
	var reg = value.match(exp);
	if (reg == null)
		return false;
	return true;
}

/* if one of visible input value include '?' or ' ', then return false */
function checkInputText() {
	var arrDoms = $(":text:visible");
	var str = "";
	var dom_id = "";
	var dom_value = "";

	for ( var i = 0; i < arrDoms.length; i++ ) {
		dom_value = $(arrDoms[i]).val();
		dom_id = $(arrDoms[i]).attr("id");

		if ( ( dom_value.indexOf("?") != -1 || dom_value.indexOf(" ") != -1 ) && dom_id != "text_keywords" ) {
			if ( typeof( myAlert ) != "undefined" ) {
				myAlert("输入内容不能包含字符？和空格", dom_id );
			} else {
				alert("输入内容不能包含字符？和空格");
			}
			return false;
		}
	}

	arrDoms = $(":password:visible");
	str = "";
	dom_id = "";
	dom_value = "";

	for ( var i = 0; i < arrDoms.length; i++ ) {
		dom_value = $(arrDoms[i]).val();
		dom_id = $(arrDoms[i]).attr("id");

		if ( ( dom_value.indexOf("?") != -1 || dom_value.indexOf(" ") != -1 ) && dom_id != "text_keywords" ) {
			if ( typeof( myAlert ) != "undefined" ) {
				myAlert("输入内容不能包含字符？和空格", dom_id );
			} else {
				alert("输入内容不能包含字符？和空格");
			}
			return false;
		}
	}

	return true;
}

/* is exist ; " \ ? and space */
function checkblank( value ){
	var exp=/^[^";\\?\s]+$/;
	var reg = value.match(exp);
	if (reg == null)
		return false;
	return true;
}

function is_has_blank_or_question( value ) {
	var exp = /^[^?\s]*$/;
	var reg = value.match(exp);
	if (reg == null)
		return true;

	return false;
}

function checkLetterAndNumber( value ) {
	var exp = /^[0-9a-zA-Z]+$/;
	var reg = value.match(exp);
	if ( reg == null )
		return false;
	return true;
}

function checkLetterAndNumberAndUnderline( value ) {
	var exp = /^[0-9a-zA-Z_]+$/;
	var reg = value.match(exp);
	if ( reg == null )
		return false;
	return true;
}

function isLeapYear( year ) {
	if ( (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0) ) {
		return true;
	}

	return false;
}

/* return value type is array, if success ret[0] = true, else ret[0] = false and ret[1] indicate what error happened */
function checkSSID( value ) {
	var ret = new Array();

	if ( value == "" ) {
		ret[0] = false;
		ret[1] = "SSID不能为空！";
		return ret;
	}

	if ( !checkStringLen( value, 1, 32) ) {
		ret[0] = false;
		ret[1] = "SSID长度应为1-32个字符，一个中文占3个字符！";
		return ret;
	}

	var exp=/^[^";\\?]+$/;
	var reg = value.match(exp);
	if ( reg == null ) {
		ret[0] = false;
		ret[1] = "SSID不正确，SSID不能包含? \" ; \\";
		return ret; 
	}
	
	ret[0] = true;
	return ret;
}

//不包含< > / \ ' " ; ?
function check_vlan_name_desc( value ) {
	//var exp = /^[\s0-9a-zA-Z_\-\s]+$/;
	var exp=/^[^"'?;<>\\/]+$/;
	var reg = value.match(exp);
	if ( reg == null )
		return false;
	return true;
}

function is_ip_multicast_address( value ) {
	var arrIP = value.split(".");
	if ( (parseInt(arrIP[0]) >= 224) && (parseInt(arrIP[0]) <= 239) )
		return true;

	return false;
}

function is_ip_multicast_address_reserved( value ) {
	var arrIP = value.split(".");
	if ( (parseInt(arrIP[0]) == 224) 
			&& (parseInt(arrIP[1]) == 0) 
			&& (parseInt(arrIP[2]) == 0) 
	) {
		return true;
	}

	return false;
}

function is_ip_loopback_address( value ) {
	var arrIP = value.split(".");
	if ( parseInt(arrIP[0]) == 127 ) {
		return true;
	}

	return false;
}

function is_ip_unicast_address( ip, netmask ) {
	var arrIP = ip.split(".");
	var arrNetmask = netmask.split(".");
	var arrHostID = new Array();
	var arrBroadcastAddress = new Array( 1, 3, 7, 15, 31, 63, 127, 255 );

	//var str_dbg = "";
	for ( var i = 0; i < 4; i++ ) {
		arrNetmask[i] ^= 0xFF;
		arrHostID[i] = arrIP[i] & arrNetmask[i];	
	//	str_dbg += arrHostID[i] + "\n";
	}

	//host ip all is 1
	if ( arrHostID[0] == arrNetmask[0] && arrHostID[1] == arrNetmask[1] 
			&& arrHostID[2] == arrNetmask[2] && arrHostID[3] == arrNetmask[3] ) {
		return false;
	}

	//host ip all is 0
	if ( arrHostID[0] == 0 && arrHostID[1] == 0 
			&& arrHostID[2] == 0 && arrHostID[3] == 0 ) {
		return false;
	}
	//alert( str_dbg );
	return true;
}

function is_equal_network_number( ip, ip2, netmask ) {
	var arr_ip1 = ip.split(".");
	var arr_ip2 = ip2.split(".");
	var arr_netmask = netmask.split(".");

	for ( var i = 0; i < 4; i++ ) {
		if ( (arr_ip1[i] & arr_netmask[i]) != (arr_ip2[i] & arr_netmask[i] ) ) {
			return false;	
		}
	}

	return true;
}

function is_ip_and_gateway_same_subnet( ip, netmask, gateway ) {
	var arr_dst_ip = ip.split(".");
	var arr_netmask = netmask.split(".");
	var arr_gateway = gateway.split(".");

	for ( var i = 0; i < 4; i++ ) {
		if ( (arr_dst_ip[i] & arr_netmask[i]) != (arr_gateway[i] & arr_netmask[i] ) ) {
			return false;	
		}
	}

	return true;
}

//note: parameter ip should be a valid ip addr like 192.168.1.1
function is_ip_reserved( ip ) {
	var arrIp = ip.split(".");
	if ( arrIp[0] == "0" || arrIp[0] == "255" ) {
		return true;
	}

	return false;
}
function checkPPPoEUserOrPwd( value ){
	var exp=/^[^"~?\\#\'\s]+$/;
	var reg = value.match(exp);
	if (reg == null)
		return false;
	return true;
}

//check the ip must be network number, not host number
function is_ip_network( network, netmask ) {
	var arrIP = network.split(".");
	var arrMask = netmask.split(".");
	if ( (arrIP[0] & arrMask[0]) != arrIP[0] || (arrIP[1] & arrMask[1]) != arrIP[1]
			|| (arrIP[2] & arrMask[2]) != arrIP[2] || (arrIP[3] & arrMask[3]) != arrIP[3] ) {
		return false;
	}
	return true;
}

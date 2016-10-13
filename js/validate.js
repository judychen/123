function checkIP(value, advanced){
    /*0-255*/
    var exp = /^([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])\.([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])\.([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])\.([1-9]?\d|1\d\d|2[0-4]\d|25[0-5])$/;
    

    var reg = value.match(exp);
    if(reg == null){
        return false;
    }

    if(value == "0.0.0.0"){
        /*????*/
    }else if(value = "255.255.255.255"){
        /*?????*/
    }

    return true;
}

function checkMask(mask){
    var obj = mask;
    var exp=/^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)|255.255.255.255$/;
    var reg = obj.match(exp);
    if(reg == null){
        return false;
    }else{
        return true;
    }
}

function isMacValid(mac){
    var exp = /^[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}$/;
    if(!exp.test(mac)){
        myAlert("MAC地址格式不正确！");
        return false;
    }
    return true;
}

function isDomainNameValid(value){
    var exp = /^(a-zA-z0-9\.\-)+$/;
    var reg = value.match(exp);
    if(reg == null){
        return false;
    }

    return true;
}

/*2-4094*/
function checkVlanID(value){
    var exp = /^\d+[\-]{1}\d+$/;
    var exp2 = /^\d+$/;
    var reg = value.match(exp);

    if(reg == null){
        if(value.match(exp2) == null){
            return false;
        }else{
            if( value > 1 && value < 4095 ) return true;
            else return false;
        }
    }else{
        var arr = value.split("-");
        if(arr.length == 2){
            var nStart = parseInt(arr[0]);
            var nEnd= parseInt(arr[1]);
            if(nStart < nEnd && nStart >1 && nEnd < 4095){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
}

/*不包含" ' ? ; 和空格*/
function check_wep_key_ascii(value){
    var exp = /^[^"'?;\s]+$/;
    var reg = value.match(exp);
    if (reg == null) {
        return false;
    }
    return true;
}

/*不包含" ' ? ; 和空格*/
function check_psk_ascii(value){
    var exp = /^[^"'?;\s]+$/;
    var reg = value.match(exp);
    if (reg == null) {
        return false;
    }
    return true;
}

/*1到4094之间的数字*/
function checkVlan(value){
    if (isNaN(value))
        return false;
    var nVlan = parseInt(value);
    if ( 0 >= nVlan || 4094 < nVlan)
        return false;

    return true;
}

function checkNumberRang(value, minValue, maxValue){
    var exp = /^[\-]?[1-9][0-9]*$/;/*至少一位数的整数*/
    var reg = value.match(exp); /*===split分割为字符串，所以可以用match。match必须为字符串====*/
    if(reg == null && value != 0) return false;
    var nValue = parseInt(value);
    if( nValue < minValue || nValue > maxValue) return false;
    return true;
}

function isHasChinese(value){
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
        if(charCode >= 0 && charCode <= 128){ /*0-127为一位的符号或英文*/
            realLength += 1;
        }else {
            realLength +=3;
        }
    }
    return realLength;
}

function checkStringLen(value, minLen, maxLen){
    var len = getStrLeng(value);
    console.log(len < minLen);
    if(len < minLen && len > maxLen){
        return false;
    }
    return true;
}

function isHexString(value){
    var exp = /^[0-9a-fA-F]+$/;
    var reg = value.match(exp);
    if(reg == null){
        return false;
    }
    return true;
}

function isImageNameValid(value){
    var exp = /^[0-9a-zA-Z_\.\-\s]+$/;
    var reg = value.match(exp);
    if ( reg == null ) {
        return false;
    }
    return true;
}

function isConfigNameValid(value){
    var exp = /^[0-9a-zA-Z_\.]+$/;
    var reg = value.match(exp);
    if ( reg == null ) {
        return false;
    }
    return true;
}

//不包含" ' ; ?
function checkPassword(value){
    var exp = /^[^"';?\s]+$/;
    var reg = value.match(exp);
    if (reg == null)
        return false;
    return true;
}

//只能包含数字、字母、下划线
function checkUserName(value){
    var exp=/^[0-9a-zA-Z_]+$/;
    var reg = value.match(exp);
    if (reg == null)
        return false;
    return true;
}

function checkInputText(){
    /*todo*/
}

function checkblank(value){
    var exp=/^[^";\\?\s]+$/;
    var reg = value.match(exp);
    if (reg == null)
        return false;
    return true;
}

function is_has_blank_or_question(value){
    var exp = /^[^?\s]*$/;
    var reg = value.match(exp);
    if (reg == null)
        return true;

    return false;
}

function checkLetterAndNumber(value){
    var exp = /^[0-9a-zA-Z]+$/;
    var reg = value.match(exp);
    if ( reg == null )
        return false;
    return true;
}

function checkLetterAndNumberandUnderline(value){
    var exp = /^[0-9a-zA-Z_]+$/;
    var reg = value.match(exp);
    if ( reg == null )
        return false;
    return true;
}

/*
闰年
1.非百年但能被4整除；
2.能被400整除
*/
function isLeapYear(year){
    if((year % 400 == 0) || (year % 100 != 0 && year % 4 == 0)){
        return true;
    } else
        return false;
}

function checkSSID(value){
    /*todo*/
}

function check_vlan_name_desc(value){
    var exp=/^[^"'?;<>\\/]+$/;
    var reg = value.match(exp);
    if ( reg == null )
        return false;
    return true;
}

function is_ip_multicast_address(value){
    /*todo*/
}

function is_ip_multicast_address_reserved(value){
    /*todo*/
}

function is_ip_loopback_address(value){
    /*todo*/
}

function is_ip_unicast_address(ip, netmask){
    /*todo*/
}

function is_equal_network_number(){
    /*todo*/
}

function is_ip_and_gatewap_same_subnet(){
    /*todo*/
}

function is_ip_reserved(){
    /*todo*/
}

function checkUserOrPwd(value){
    var exp=/^[^"~?\\#\'\s]+$/;
    var reg = value.match(exp);
    if (reg == null)
        return false;
    return true;
}

function is_ip_netword(){
    /*todo*/
}


















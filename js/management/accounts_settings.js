var usersList = new Array();
var jsUsers = {
	 "pkg_usrmanage": [
	 	{ 
	 	 	"name": "admin", 
	 	 	"level": "1", 
	 	 	"password": "admin" 
	 	}
	]
};

function format_level( arrRow, index ) {
	var level = arrRow[index];
	if ( level == 0 )
		return "普通用户";
	else if ( level == 1 )
		return "管理用户";
	else
		return "unkown";
}

function addUser(){
	/*？？？*/	
}

function editUser(arrRow, indexRow){
		
	/*？？？*/
}

function delUser(){
	
}

function btn_formatFunc( arrayRow, index ) {
		if( arrayRow[0] == "admin")
			return false;
		else
			return true;
}

function checkValidAccount(){
	if ( $("#account_add_name").val() == "" ) {
		showError(true, "用户名不能为空！");
		return false;
	}

	if ( !checkUserName( $("#account_add_name").val() ) ) {
		showError(true, "非法的用户名！");
		return false;
	}

	if ( $("#account_add_pass").val() == "" ) {
		showError(true, "用户密码不能为空！");	
		return false;
	}

	if ( checkPassword( $("#account_add_pass").val()) == false ) {
		showError(true, "非法的初始密码！");
		return false;
	}

	if ( $("#account_add_pass").val() != $("#account_add_passcheck").val() ) {
		showError(true, "两次输入的用户密码不一致！");
		return false;
	}
	return true;
}

function checkValidEditAccount(){
	if(($("#account_edit_check").is(":checked"))){
		if ( $("#account_edit_pass").val() == "" ) {
			showError(true, "用户密码不能为空！");	
			return false;
		}

		if ( checkPassword( $("#account_edit_pass").val()) == false ) {
			showError(true, "非法的初始密码！");
			return false;
		}

		if ( $("#account_edit_pass").val() != $("#account_edit_passcheck").val() ) {
			showError(true, "两次输入的用户密码不一致！");
			return false;
		}
	}

	return true;
}

function validAccount(){
	if(!checkValidAccount()){
		return false;
	}

	list = {
		"name": $("#account_add_name").val(),
		"level": $("#account_add_level").val(),
		"password": $("#account_add_passcheck").val()
	}

	jsUsers.pkg_usrmanage.push(list);

	return true;
}

function validEditAccount(){
	if(!checkValidEditAccount()){
		return false;
	}

	list = {
		"name": $("#account_edit_name").text(),
		"level": $("#account_edit_level").val(),
		"password": $("#account_add_passcheck").val()
	}

	jsUsers.pkg_usrmanage.push(list);

	return true;
}



var as = new myGrid("as");

$(function(){
	/*??*/
	as.pageview_add('用户名', 0, '50%', MG_SORT_ASCII);
	as.pageview_add('级别', 1, '40%', MG_SORT_NUM, null, format_level );
	
	as.pageview_add_btn("编辑", editUser);
	as.pageview_add_btn("删除", delUser);

    usersList.length = 0;
	for ( var i = 0; i < jsUsers.pkg_usrmanage.length; i++ ){
		var temp = jsUsers.pkg_usrmanage[i];
		usersList[i] = temp.name+";"+temp.level;
	}

	as.pageview_init(usersList, 10, 'list_accounts');

	btn0 = $("#list_accounts").find($(".opBtn0"));

	$("#accunts_add_btn").click(function(){
		$("#account_add_name").val("");
		$("#account_add_level").val(0);
		$("#account_add_pass").val("");
		$("#account_add_passcheck").val("");

		$("#accunts_add").show();
		$("#accunts_add").siblings().hide();
	});

	$("#accounts_add_ok").click(function(){
		if(validAccount()){
			$("#accunts_add").hide();
			$("#accunts_add").siblings().first().show();
			usersList.length = 0;
			for ( var i = 0; i < jsUsers.pkg_usrmanage.length; i++ ){
				var temp = jsUsers.pkg_usrmanage[i];
				usersList[i] = temp.name+";"+temp.level;
			}
			as.pageview_init(usersList, 10, 'list_accounts');

			

		}
	});

	$("#accounts_add_cancel").click(function(){
		
		$("#accunts_add").hide();
		$("#accunts_add").siblings().first().show();
	});

	$(".opBtn0").click(function() {
		btn0 = $("#list_accounts").find($(".opBtn0"));
		alert($(this).index());
	});

	

	/*for(var i = 0; i < jsUsers.pkg_usrmanage.length; i++ ){
		btn0.eq(i).click(function(){
			var tp = jsUsers.pkg_usrmanage[i];
			$("#accunts_edit").show();
			$("#accunts_edit").siblings().hide();

			$("#account_edit_name").text(tp.name);
			$("#account_edit_level").val(tp.level);

			$("#accounts_edit_ok").click(function(){

				if(checkValidEditAccount()){

					tp.level = $("#account_edit_level").val();
					if($("#account_edit_check").is(":checked")){
						tp.password = $("#account_edit_passcheck").val();
					}

					$("#accunts_edit").hide();
					$("#accunts_edit").siblings().first().show();
					for ( var i = 0; i < jsUsers.pkg_usrmanage.length; i++ ){
						var t = jsUsers.pkg_usrmanage[i];
						usersList[i] = t.name+";"+t.level;
					}
					as.pageview_init(usersList, 10, 'list_accounts');
				}
			});

			$("#accounts_edit_cancel").click(function(){
				
				$("#accunts_edit").hide();
				$("#accunts_edit").siblings().first().show();
			});
			console.log(i);
			alert(i);

		});

		btn1.eq(i).click(function() {
			for ( var i = 0; i < jsUsers.pkg_usrmanage.length; i++ ){
				var t = jsUsers.pkg_usrmanage[i];
				usersList[i] = t.name+";"+t.level;
			}
			as.pageview_init(usersList, 10, 'list_accounts');
		});


	}*/

	$("#account_edit_check").click(function(){
		if($("#account_edit_check").is(":checked")){
			$(".account_rest_pass").show();
		}else{
			$(".account_rest_pass").hide();
		}
	});

	
	


});




var usersList = new Array();
var jsUsers = {
	 "pkg_usrmanage": [
	 	 { 
	 	 	"sect_name": "admin", 
	 	 	"name": "admin", 
	 	 	"level": "1", 
	 	 	"cipher": "0", 
	 	 	"password": "admin" 
	 	},
	 	{ 
	 	 	"sect_name": "admin", 
	 	 	"name": "admin", 
	 	 	"level": "1", 
	 	 	"cipher": "0", 
	 	 	"password": "admin" 
	 	},
	 	{ 
	 	 	"sect_name": "admin", 
	 	 	"name": "admin", 
	 	 	"level": "1", 
	 	 	"cipher": "0", 
	 	 	"password": "admin" 
	 	},
	 	{ 
	 	 	"sect_name": "admin", 
	 	 	"name": "admin", 
	 	 	"level": "1", 
	 	 	"cipher": "0", 
	 	 	"password": "admin" 
	 	},
	 	{ 
	 	 	"sect_name": "admin", 
	 	 	"name": "admin", 
	 	 	"level": "1", 
	 	 	"cipher": "0", 
	 	 	"password": "admin" 
	 	},
	 	{ 
	 	 	"sect_name": "admin", 
	 	 	"name": "admin", 
	 	 	"level": "1", 
	 	 	"cipher": "0", 
	 	 	"password": "admin" 
	 	},
	 	{ 
	 	 	"sect_name": "admin", 
	 	 	"name": "admin", 
	 	 	"level": "1", 
	 	 	"cipher": "0", 
	 	 	"password": "admin" 
	 	},
	 	{ 
	 	 	"sect_name": "admin", 
	 	 	"name": "admin", 
	 	 	"level": "1", 
	 	 	"cipher": "0", 
	 	 	"password": "admin" 
	 	},
	 	{ 
	 	 	"sect_name": "admin", 
	 	 	"name": "admin", 
	 	 	"level": "1", 
	 	 	"cipher": "0", 
	 	 	"password": "admin" 
	 	},
	 	{ 
	 	 	"sect_name": "admin", 
	 	 	"name": "admin", 
	 	 	"level": "1", 
	 	 	"cipher": "0", 
	 	 	"password": "admin" 
	 	},
	 	{ 
	 	 	"sect_name": "admin", 
	 	 	"name": "admin", 
	 	 	"level": "1", 
	 	 	"cipher": "0", 
	 	 	"password": "admin" 
	 	},
	 	{ 
	 	 	"sect_name": "admin", 
	 	 	"name": "admin", 
	 	 	"level": "1", 
	 	 	"cipher": "0", 
	 	 	"password": "admin" 
	 	}
	]
};
var jsIdleTime = { 
	"pkg_idletime": [
		{ 
			"sect_name": "idletime", 
			"time": "0" 
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

function btn_formatFunc( arrayRow, index ) {
		if( arrayRow[0] == "admin")
			return false;
		else
			return true;
}

var as = new myGrid("as");

$(function(){
	/*??*/
	as.pageview_add('用户名', 0, '50%', MG_SORT_ASCII);
	as.pageview_add('级别', 1, '42%', MG_SORT_NUM, null, format_level );
	
	/*as.pageview_add_btn("编辑", editUser);*/
	/*as.pageview_add_btn("删除", delUser, null, null, btn_formatFunc);*/

    usersList.length = 0;
	for ( var i = 0; i < jsUsers.pkg_usrmanage.length; i++ ){
		var temp = jsUsers.pkg_usrmanage[i];
		usersList[i] = temp.name+";"+temp.level;
	}
	console.log(usersList);

	as.pageview_init(usersList, 10, 'list_accounts')

	$("#accunts_add_btn").click(function(){
		$("#accunts_add").show();
		$("#accunts_add").siblings().hide();
	});

	$("#accounts_add_ok").click(function(){
		$("#accunts_add").hide();
		$("#accunts_add").siblings().show();
	});

	$("#accounts_add_cancel").click(function(){
		$("#accunts_add").hide();
		$("#accunts_add").siblings().show();
	});
});




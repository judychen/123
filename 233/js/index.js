function logout() {
	$("#form").attr("action", "goform/logout?UID="+uid);
	//$("#form").attr("action", "goform/logout");
	$("#form").attr("method", "post");
	$("#form").append("<input type=\"hidden\" name=\"test\" value=\"test\" />");
	$("#form").submit();
}

function save_cfg_success() {
	set_progress_quick( 2 );
}

function save() {
	progressTask( 10, null, "当前配置写入Flash中，请等待。。。" );
	var url="setform/form_cfg_save?UID="+parent.uid;
	var f = new myForm();
	f.add( "test", "test" );
	f.submit_2( url, save_cfg_success, stop_progress );

/*
	var url="setform/form_cfg_save?UID="+uid;
	var f = new myForm();
	f.add( "test", "test" );
	f.submit( url, saveCfgSuccess );
*/
}

function jumpToWizard() {
	if ( typeof(top.wizard) != "undefined" && top.wizard.length != 0 ) {
		//delete top.wizard;
		top.wizard.length = 0;
	}
	var nat = jsSpec.spec.nat;
	if ( typeof(nat) != "undefined" ) {
		link_mode_changed("bridge");		
		jump('wizard_link_mode');
	} else {
		top.arr_wizard_items = arr_wizard_items;
		jump('wizard_ip_settings');
	}
}
		
function jump(page) {
	$("#Frame_Content").attr("src", page+".asp?UID="+ uid );
}

$("document").ready( function() {
	//$(".submenu").slideToggle("fast");
	$(".submenus").click( function() {
		if(currentMenu && currentMenu == this)
			return;
		if(this.className == 'submenus')
		{
			this.className='current';
			if(currentMenu)
			{
				currentMenu.className='submenus';
			}
			currentMenu = this;
		}
	});
	
	$(".btn_wizard").click( function() {
		$(".current").attr('class', 'submenus');
		$(".btn_current").parent().find(".submenu").slideToggle("nomarl");
		$(".btn_current").attr('class','btn_o');
		
		$(".btn_wizard").attr( 'class', "btn_wizard_active" );
		currentMenu = '';
	});

	$(".btn_o").click( function() {
		$(".btn_wizard_active").attr( 'class', "btn_wizard" );
		var elem = $(".btn_current").parent().find("a");
		//alert(elem.length);
		if( elem.length > 0 )
		{
			if($(this).attr('class') == 'btn_current') {
				if ( elem[0].className == "current" && $(this).attr('class') == 'btn_current') {
					return;
				}
			}
			else {
				$(".current").attr('class', 'submenus');
				$(".btn_current").parent().find(".submenu").slideToggle("nomarl");
				$(".btn_current").attr('class','btn_o');
				$(this).parent().find(".submenu").slideToggle("nomarl");
				$(this).attr('class','btn_current');
			}
			
		} else {
				$(".current").attr('class', 'submenus');
				$(".btn_current").parent().find(".submenu").slideToggle("nomarl");
				$(".btn_current").attr('class','btn_o');
				$(this).parent().find(".submenu").slideToggle("nomarl");
				$(this).attr('class','btn_current');
		}

		//点击一级菜单后，自动选中其下第一项子菜单
		var elem_a_array = $(".btn_current").parent().find("a");
		if ( elem_a_array[0] != null ) {
			$(elem_a_array[0]).click();
		}
	});

});

function resize(){
	$("#Frame_Content").height(0);
	$("#vertical_SLine").height(0);

	//var h1 = $("#header").height();
	//var h3 = $("#footer").height();
	/*
	var h2 = $("#td_iframe").height();
	
	if ( h2 < 768-136 ) {
		$("#Frame_Content").height(h2-2);
		$("#vertical_SLine").height(h2-2);
	}
	else {
		$("#Frame_Content").height(h2-2);
		$("#vertical_SLine").height(h2-2);
		
	}
	var h4 = $("#Frame_Content").height();
	*/

	/* new resize */
		var html_height = $("html").height();
		var tmp_height = html_height - 80 -26 -15 -15;
		$("#my_header").height( 80 );
		$("#my_banner").height( 26 );
		$("#my_footer").height( 15 );
		$("#td_iframe").height( tmp_height );
		$("#Frame_Content").height( tmp_height );
		$("#vertical_SLine").height( tmp_height );
	/* new resize, end */

	//遮罩层
	$("#zzc").width($("body").width());	//fix bug:当有滚动条时，滚动条外的内容无法遮挡bug

	/* dbg info */
	var strDbgMsg = $("#zzc").width()+":"+$("html").width()+":"+$("body").width() + "<br/>";
	strDbgMsg += "html height: " + $("html").height() + "<br/>";
	strDbgMsg += "header height: " + $("#my_header").height() + "<br/>";
	strDbgMsg += "banner_height:" + $("#my_banner").height() + "<br/>";
	strDbgMsg += "iframe_tr height: " + $("#td_iframe").height() + "<br/>";
	strDbgMsg += "footer  height: " + $("#my_footer").height() + "<br/>";
	var minus = $("html").height() - $("#my_header").height() - $("#my_banner").height() - $("#td_iframe").height() - $("#my_footer").height();
	strDbgMsg += "minus: " + minus + "<br/>";
	strDbgMsg += "frame height: " + $("#Frame_Content").height() + "<br/>";
	strDbgMsg += "html height: " + html_height + "<br/>";
	strDbgMsg += "tmp height: " + tmp_height + "<br/>";
	$("#dbg_msg").html( strDbgMsg );
	/* dbg info, end */
}

function init(){
	//$("#div_progress").css("display", "block");
	//$("#div_progress").css("display", "none");
	//$("#div_progress").css("height", "0px");
	resize();
	if ( wizard_flag == 1 )
		$("#menu_wizard").click();
	else
		$(".first_menu").click();

	$("#span_device_type").html( jsDataDevice.device[0].product );
	$("#span_username").html( "[" + username + "]" );
}

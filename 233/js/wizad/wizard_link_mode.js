var arrIS;
/****** struct of arrIS ******
* link_mode
*****************************/
function myhelp() {
	popHelp("wizardSettings_linkmode");
}

function init() {
	setNavigationBar("配置向导>工作模式");

	if ( typeof(arrIS.link_mode) != "undefined" ) {
		$("input[name='radio_link_mode'][value=" + arrIS.link_mode + "]").attr("checked", true);
	} else {
		if ( typeof(jsSpec.product) != "undefined" 
				&& jsSpec.product == "ap2401" ) {
			$("input[name='radio_link_mode'][value=nat]").attr("checked", true);
			_link_mode_changed();
		} else {
			$("input[name='radio_link_mode'][value=bridge]").attr("checked", true);
		}
	}
}

function ok() {
	arrIS.link_mode = $("input[name='radio_link_mode']:checked").val();
	//link_mode_changed(arrIS.link_mode);
}

function _link_mode_changed() {
	var link_mode = $("input[name='radio_link_mode']:checked").val();
	link_mode_changed( link_mode );
	top.wizard.length = 0;
	arrIS = loadWizardProgress("wizard_link_mode");
}

$(document).ready( function() {
	arrIS = loadWizardProgress("wizard_link_mode");
	init();
	$("input[name='radio_link_mode']").change( _link_mode_changed );
});

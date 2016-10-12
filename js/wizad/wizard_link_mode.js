
/****** struct of arrIS ******
 * link_mode
 *****************************/
function validWizardLinkmode() {
    arrIS.link_mode = $("input[name='radio_link_mode']:checked").val();
    return true;
}

function _link_mode_changed() {
    var lmode = $("input[name='radio_link_mode']:checked").val();
    link_mode_changed(lmode);
    /*??*/
    loadWizardProgress("wizard_link_mode");
}

$(function () {

    link_mode_changed();
    loadWizardProgress("wizard_link_mode");
/*    if(typeof (arrIS.link_mode) != "undefined"){
        $("input[name='radio_link_mode'][value=" + arrIS.link_mode + "]").attr("checked", "true");
    }else{
        /!*??*!/
        $("input[name='radio_link_mode'][value=bridge]").attr("checked", "true");
    }*/

    $("input[name='radio_link_mode']").change(_link_mode_changed);
});

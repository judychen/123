var arrIS = {};
/****** struct of arrIS ******
 * link_mode
 *****************************/
function ok() {
    arrIS.link_mode = $("input[name='radio_link_mode']:checked").val();
}

function _link_mode_changed() {
    var link_mode = $("input[name='radio_link_mode']:checked").val();
    link_mode_changed(link_mode);
    /*??*/
    arrIS = loadWizardProgress("wizard_link_mode");
}

$(function () {

    link_mode_changed();
    arrIS = loadWizardProgress("wizard_link_mode");
/*    if(typeof (arrIS.link_mode) != "undefined"){
        $("input[name='radio_link_mode'][value=" + arrIS.link_mode + "]").attr("checked", "true");
    }else{
        /!*??*!/
        $("input[name='radio_link_mode'][value=bridge]").attr("checked", "true");
    }*/

    $("input[name='radio_link_mode']").change(_link_mode_changed);
});

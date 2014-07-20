/**
 * Created by Oscar on 2014/7/19.
 */
function switch1(div) {
    var option=['one','two','three','four','five','six'];
    for(var i=0; i<option.length; i++) {
        if (document.getElementById(option[i])) {
            obj=document.getElementById(option[i]);
            obj.style.display=(option[i]==div)? "block" : "none";
        }
    }
}

window.onload=function () {switch1('one');}
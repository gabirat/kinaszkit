$(document).ready(function() {
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
if(getCookie("hesoyam") == "true"){
	let pass = new Audio("http://asash.io/pass.mp3");
	$(`<div style="text-align: center; width: 100%;"><div id="gtasa" style="position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%); z-index: 255252;"><img src="http://i.imgur.com/3Zzlw4U.png"/></div>`).hide().appendTo("body").fadeIn(3000);
	pass.play(); 
	setTimeout(function(){
		$("#gtasa").fadeOut(3000);
	}, 8200);
    document.cookie = "hesoyam=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
});
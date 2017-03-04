function onLoad(){
	
	document.addEventListener("deviceready", onDeviceReady, false);
	
}



function onDeviceReady(){
	
	$("#logout-key").on("click", function(){
		
		navigator.app.exitApp();
		
	});
	
}



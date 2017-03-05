function onLoad(){
	
	document.addEventListener("deviceready", onDeviceReady, false);
	
}



function onDeviceReady(){
	
	document.addEventListener("backbutton", onBackKeyDown, false);
	
}


function onBackKeyDown(){
	
	var backbutton = 0;
	
	if(backbutton == 0){
		backbutton++;
		window.plugins.toast.showShortBottom('Press again to exit');
		window.setTimeout(
			function(){
				backbutton = 0;
			},
			5000);
	}
	
	else{
		
		navigator.app.exitApp();
	}
}


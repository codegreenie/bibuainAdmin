//jQuery Document for Bibuain Admin App

function adminLogin(){
    
    var realUiUpdate = $("<h3>Verifying you</h3><img src='styles/css/images/ajax-loader.gif' style='display:block; margin: 0 auto;' />");
    $("#verifying-admin").html(realUiUpdate);
    
    $("#clik_2_verify_admin").trigger("click");
    
    
    var supplied_pin = $("#admin-pin").val();
    var stored_pin = window.localStorage.getItem("crypto-pin");
    if(stored_pin === supplied_pin){
        
        $.mobile.changePage("dashboard.html", {"data-transition" : "slideup", "data-direction" : "reverse"});
    }
    
    else{
        
        var error_msg = $("<img src='docs/imgs/warning.png' style='margin:0 auto; display:block;'/><h3>invalid PIN!</h3><a href='' data-rel='back' class='ui-btn'>OK</a>");
        $("#verifying-admin").html(error_msg);
    }
    
}






function twistNetwork(){
    
	$("#twisting-network").html("<h3>Saving...</h3><img src='styles/css/images/ajax-loader.gif' style='display:block; margin: 0 auto;' />");
    $("#click_2_twist_network").trigger("click");
    
    $.ajax({
        
        url : "http://www.codegreenie.com/php_hub/_BibuainAdmin/change_network_status.php",
        //url : "http://localhost/php_hub/_BibuainAdmin/change_network_status.php",
        type : "POST",
        dataType : "html",
        crossDomain : true,
        cache : true,
        data : {"my_command" : $("#ogas_choice").val()},
        success : function(statReturn){
        if(statReturn === "Done!"){
              $.mobile.changePage("dashboard.html", {"data-transition" : "slideup", "data-direction" : "reverse"});
          }
            
         else{
                
               $("#twisting-network").html('<img src="docs/imgs/warning.png" style="margin:0 auto; display:block;"/><h3>Save Failed: Try Again.</span><a href="" data-rel="back" class="ui-btn">OK</a>');
            }
        }
        ,
        error : function(jqXHR, error, status){
            console.log("error, status");
            $("#twisting-network").html('<img src="docs/imgs/warning.png" style="margin:0 auto; display:block;"/><h3>Save Failed: Try Again.</span><a href="" data-rel="back" class="ui-btn">OK</a>');
            
        }
        
    });
	
}





function updatePrices(){
    $("#twisting-prices").html("<h3>Saving...</h3><img src='styles/css/images/ajax-loader.gif' style='display:block; margin: 0 auto;' />");
    $("#click_2_twist_prices").trigger("click");
    
    $.ajax({
        url : "http://www.codegreenie.com/php_hub/_BibuainAdmin/update_prices.php",
        //url : "http://localhost/php_hub/_BibuainAdmin/update_prices.php",
        type : "POST",
        dataType : "html",
        crossDomain : true,
        cache : true,
        data : $("#update_prices_form").serialize(),
        success : function(updateReturn){
        
        if(updateReturn === "update successful"){
              
                    $.mobile.changePage("dashboard.html", {"data-transition" : "slideup", "data-direction" : "reverse"});
          }
        else{
             $("#twisting-prices").html('<img src="docs/imgs/warning.png" style="margin:0 auto; display:block;"/><h3>Save Failed: Try Again.</span><a href="" data-rel="back" class="ui-btn">OK</a>');
        }
        
		}
        ,
        error : function(jqXHR, error, status){
            console.log("error, status");
            $("#twisting-prices").html('<img src="docs/imgs/warning.png" style="margin:0 auto; display:block;"/><h3> Network Error!</h3><a href="" data-rel="back" class="ui-btn">OK</a>');
            
        }
        
    });
}






function getPrices(){
    $("#twisting-prices").html("<h3>Fetching Prices...</h3><img src='styles/css/images/ajax-loader.gif' style='display:block; margin: 0 auto;' />");
	
   $.ajax({
        url : "http://www.codegreenie.com/php_hub/_BibuainAdmin/fetch_current_prices.php",
        //url : "http://localhost/php_hub/_BibuainAdmin/fetch_current_prices.php",
        type : "GET",
        dataType : "html",
        crossDomain : true,
        cache : true,
        success : function(pricesReturn){
			
			$("#update_prices_form").html(pricesReturn);
		}
        ,
        error : function(jqXHR, error, status){
            console.log("error, status");
            $("#update_prices_form").html('<div class="text-center"><img src="docs/imgs/warning.png" style="margin:0 auto; display:block;"/><h3> Network Error!</h3></div>');
        }
        
    });
}



function loadRequests(){
    
	$("#all_requests_container").html("<h3>Fetching Data Requests...</h3><img src='styles/css/images/ajax-loader.gif' style='display:block; margin: 0 auto;' />");
	
    $.ajax({
        
        url : "http://www.codegreenie.com/php_hub/_BibuainAdmin/fetch_requests.php",
        //url : "http://localhost/php_hub/_BibuainAdmin/fetch_requests.php",
        type : "GET",
        dataType : "html",
        crossDomain : true,
        cache : true,
        success : function(reqReturn){
            $("#all_requests_container").html(reqReturn);
       }
        ,
        error : function(jqXHR, error, status){
            
            $("#all_requests_container").html("<h3>Couldn't fetch requests, try again later</h3><img src='docs/imgs/warning.png' style='display:block; margin: 0 auto;' />");
        }
        
    });
}





function pushSetStorage(ourID){
    
    var themID = $("#" + ourID);
    var dataName = themID.find("h2").html();
    var numDate = themID.find("span").html();
    var request_sn = themID.find("input[data-sn=request_sn]").val();
    var request_picture_path = themID.find("input[data-img-path=still_looking]").val();
    
   
  
    window.localStorage.setItem("dataName", dataName);
    window.localStorage.setItem("numDate", numDate);
    window.localStorage.setItem("request_sn", request_sn);
    window.localStorage.setItem("request_picture_path", request_picture_path);
    
}



function markDone(){
    
	$("#saving_as_done").html("<h3>Saving...</h3><img src='styles/css/images/ajax-loader.gif' style='display:block; margin: 0 auto;' />");
	
	$("#click_2_done").trigger("click");
	
	var theRequestSN  = window.localStorage.getItem("request_sn");
    $.ajax({
        
		url : "http://www.codegreenie.com/php_hub/_BibuainAdmin/mark_as_done.php",
        //url : "http://localhost/php_hub/_BibuainAdmin/mark_as_done.php",
        type : "POST",
        dataType : "html",
        data : {"sent_id" : theRequestSN},
        crossDomain : true,
        cache : true,
        success : function(statReturn){
				if(statReturn === "Done!"){
				  $.mobile.changePage("requests.html", {"data-transition" : "slideup", "data-direction" : "reverse"});
			  }
			  else{
				 
				 $("#saving_as_done").html('<img src="docs/imgs/warning.png" style="margin:0 auto; display:block;"/><h3>Save Failed: Try Again.</span><a href="" data-rel="back" class="ui-btn">OK</a>');  
			}
        }
        ,
        error : function(jqXHR, error, status){
            $("#saving_as_done").html('<img src="docs/imgs/warning.png" style="margin:0 auto; display:block;"/><h3>Save Failed: Try Again.</span><a href="" data-rel="back" class="ui-btn">OK</a>');
        }
        
    });
}









$(document).on("pagecreate", function(event){
	
	if(window.localStorage.getItem("crypto-pin") == null){
        window.localStorage.setItem("crypto-pin", "0845");
    }
	
	$(".home-key").on("click", function(){
			$.mobile.changePage("dashboard.html", {"data-transition" : "slideup", "data-direction" : "reverse"});
	});
	
});



$(document).on("pagecreate", "#index-page", function(){ //document.ready equivalent
		$("#verify-admin-login").on("click", function(){adminLogin();});
});
 
 
 
 
 $(document).on("pagecreate", "#network-places", function(){ //document.ready equivalent
	
	$("#save-network-status").on("click", function(){twistNetwork();});
	
    
});
 
 
 
 

 $(document).on("pagecreate", "#the-dashboard", function(){ //document.ready equivalent
 
	$("#go-to-network").on("click", function(){ $.mobile.changePage("twist_network.html", {"data-transition" : "slideup", "data-direction" : "reverse"}); });
	$("#go-to-requests").on("click", function(){ $.mobile.changePage("requests.html", {"data-transition" : "slideup", "data-direction" : "reverse"}); });
	$("#go-to-prices").on("click", function(){ $.mobile.changePage("prices.html", {"data-transition" : "slideup", "data-direction" : "reverse"}); });
	
 });
    
 
 
 $(document).on("pagecreate", "#all-requests", function(){ //document.ready equivalent   
    loadRequests(); 
   
   
 });
 
 
$(document).on("pagecreate", "#this-request", function(){ //document.ready equivalent   
    
    $("#this_request_container").html("<h3>Please wait...</h3><img src='styles/css/images/ajax-loader.gif' style='display:block; margin: 0 auto;' />");
	
    var theDataName = window.localStorage.getItem("dataName");
    var theDataTime = window.localStorage.getItem("numDate");
    var thePicturePath = window.localStorage.getItem("request_picture_path");
    
    $("#this_request_container").html("<ul data-role=listview data-inset=true <li><h2 class=text-main-color style=margin-bottom:-5px;>" + theDataName + "</h2><h2 class=text-mini-color>" + theDataTime + "</h2></li></ul><br><img src=http://www.codegreenie.com/php_hub/_BibuainSME/upload/" + thePicturePath + " style='display:block;margin:0 auto;max-width:300px;max-height:300px;'><br><button id=done-button type=button style='border:none; color:#fff; padding:10px 20px; border-radius:6px; background-color:#069;' >Mark as Done</button>");
    
        
        $("#done-button").on("click", function(){ markDone(); });
   
});   
    
	
	
    
	
	

	



$(document).on("pagecreate", "#prices-page", function(){ //document.ready equivalent
	
	getPrices();
	$("#update_prices_form").on("submit", function(){updatePrices();});

});
  

  

    
  
    
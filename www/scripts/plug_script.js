//jQuery Document for Bibuain Admin App

function adminLogin(){
    
    var realUiUpdate = $("<h3>Verifying you</h3><img src='styles/css/images/ajax-loader.gif' style='display:block; margin: 0 auto;' />");
    $("#verifying-admin").html(realUiUpdate);
    
    $("#clik_2_verify_admin").trigger("click");
    
    
    var supplied_pin = $("#admin-pin").val();
    var stored_pin = window.localStorage.getItem("crypto-pin");
    if(stored_pin === supplied_pin){
        
        $.mobile.changePage("dashboard.html", {"data-transition" : "pop"});
    }
    
    else{
        
        var error_msg = $("<img src='docs/imgs/warning.png' style='margin:0 auto; display:block;'/><h3>invalid PIN!</h3><a href='' data-rel='back' class='ui-btn'>OK</a>");
        $("#verifying-admin").html(error_msg);
    }
    
}



function navigate(pageYen){
    
    $.mobile.changePage(pageYen, {"data-transition" : "slide", "data-direction" : "reverse"});
}



function twistNetwork(){
    
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
              
                    navigate("dashboard.html");
          }
            
            else{
                
                $("#twisting_network").html('<h3> Network Status: <span style="font-weight:bold; color:#900;">Bad</span></h3><span>Save Failed: Try Again.</span><a href="" data-rel="back" class="ui-btn">OK</a>');
            }
        }
        ,
        error : function(jqXHR, error, status){
            console.log("error, status");
            $("#twisting_network").html('<h3> Network Error!</h3><a href="" data-rel="back" class="ui-btn">OK</a>');
            
        }
        
    });
}



function getPrices(){
    
    $.ajax({
        
        url : "http://www.codegreenie.com/php_hub/_BibuainAdmin/fetch_current_prices.php",
        //url : "http://localhost/php_hub/_BibuainAdmin/fetch_current_prices.php",
        type : "GET",
        dataType : "html",
        crossDomain : true,
        cache : true,
        success : function(pricesReturn){
            
            //window.alert(pricesReturn);
            $("#update_prices_form").html(pricesReturn);
       
        }
        ,
        error : function(jqXHR, error, status){
            console.log("error, status");
            $("#twisting_prices").html('<h3> Network Error!</h3><a href="" data-rel="back" class="ui-btn">OK</a>');
        }
        
    });
}



function loadRequests(){
    
    $.ajax({
        
        url : "http://www.codegreenie.com/php_hub/_BibuainAdmin/fetch_requests.php",
        //url : "http://localhost/php_hub/_BibuainAdmin/fetch_requests.php",
        type : "GET",
        dataType : "html",
        crossDomain : true,
        cache : true,
        success : function(reqReturn){
            
            //window.alert(reqReturn);
            $("#all_requests_container").html(reqReturn);
       
        }
        ,
        error : function(jqXHR, error, status){
            
            console.log(error, status);
        }
        
    });
}





function updatePrices(){
    
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
              
                    navigate("dashboard.html");
          }
            
            else{
                
                $("#twisting_prices").html('<h3>Save Failed: Try Again.</span><a href="" data-rel="back" class="ui-btn">OK</a>');
            }
        }
        ,
        error : function(jqXHR, error, status){
            console.log("error, status");
            $("#twisting_network").html('<h3> Network Error!</h3><a href="" data-rel="back" class="ui-btn">OK</a>');
            
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
              
                    navigate("requests.html");
          }
            
            else{
                
                window.alert(statReturn);
                console.log(statReturn);
        }
            
        }
        ,
        error : function(jqXHR, error, status){
            console.log("error, status");
        }
        
    });
}




$(document).on("pagecreate", function(){ //document.ready equivalent

    if(window.localStorage.getItem("crypto-pin") == null){
        window.localStorage.setItem("crypto-pin", "0845");
    }
    

    $("#verify-admin-login").on("click", function(){adminLogin();});
    
    $("#save-network-status").on("click", function(){twistNetwork();});
    
    getPrices();
    
   $("#update_prices_form").on("submit", function(){updatePrices();});
    
    loadRequests();
    
    var theDataName = window.localStorage.getItem("dataName");
    var theDataTime = window.localStorage.getItem("numDate");
    var thePicturePath = window.localStorage.getItem("request_picture_path");
    
    $("#this_request_container").html("<ul data-role=listview data-inset=true <li><h2 class=text-main-color style=margin-bottom:-5px;>" + theDataName + "</h2><h2 class=text-mini-color>" + theDataTime + "</h2></li></ul><br><img src=http://www.codegreenie.com/_BibuainSME/upload/" + thePicturePath + "        style='display:block;margin:0 auto;max-width:300px;max-height:300px;'><br><button id=done-button type=button style='border:none; color:#fff; padding:10px 20px; border-radius:6px; background-color:#069;' >Mark as Done</button>");
    
        
        $("#done-button").on("click", function(){
            
            markDone();
        });
    
    $("#home-key").on("click", function(){
            
            navigate("dashboard.html");
        });
    
});//document.ready equivalent






  

  

    
  
    

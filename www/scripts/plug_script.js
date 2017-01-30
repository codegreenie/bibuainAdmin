//jQuery Document for Bibuain SME Data App

function updateChecker(){
    
    $.ajax({
        
        url : "http://www.codegreenie.com/php_hub/_BibuainSME/update_checker.php",
        //url : "http://localhost/php_hub/_BibuainSME/update_checker.php",
        type : "GET",
        dataType : "html",
        crossDomain : true,
        cache : true,
        timeout : 4000,
        success : function(versionReturn){
            
           var thisUpdate = window.localStorage.getItem("my_version");
            if(versionReturn != thisUpdate){
                $("#version_display").html("v" + versionReturn);
                $("#clik_2_update").trigger("click");
            }
            
        },
        error : function(jqXHR, error, status){
            console.log("unable to check for updates", error);
            console.log(status);
        }
        
    });
    
}


function processReg(){
    
    var realUiUpdate = $("<h3>Sending OTP</h3><img src='styles/css/images/ajax-loader.gif' style='display:block; margin: 0 auto;' />");
    $("#sending-otp").html(realUiUpdate);
    
    
    
    $("#clik_2_send_otp").trigger("click");
    var thePhoneNumber = $("#reg-phone").val();
    
    $.ajax({
        
        url : "http://www.codegreenie.com/php_hub/_BibuainSME/process_signup.php",
        //url : "http://localhost/php_hub/_BibuainSME/process_signup.php",
        type : "POST",
        dataType : "html",
        crossDomain : true,
        cache : true,
        data : {"reg-phone" : thePhoneNumber},
        success : function(successReturn){
            
            if(successReturn === "Successful"){
            
            window.localStorage.setItem("my_phone_number", thePhoneNumber);
            console.log(successReturn);
            $.mobile.changePage("verify_otp.html", {"transition" : "slideup", "data-direction" : "reverse"});
            }
            
            else{
                console.log(successReturn);
                var error_return = $("<img src='docs/imgs/warning.png' style='margin:0 auto; display:block;'/><h3>Signup failed, Try Again</h3><a href='' data-rel='back' class='ui-btn'>OK</a>");
                $("#sending-otp").html(error_return);
                window.alert(successReturn);
            }
            
        },
        
        error : function(jqXHR, error, status){
            
            console.log(error + " " + status);
            var error_msg = $("<img src='docs/imgs/warning.png' style='margin:0 auto; display:block;'/><h3>Network Error, Try Again</h3><a href='' data-rel='back' class='ui-btn'>OK</a>");
            $("#sending-otp").html(error_msg);
            
        }
        
    });
    
}




function processOTP(){
    
    var realUiUpdate = $("<h3>Verifying you</h3><img src='styles/css/images/ajax-loader.gif' style='display:block; margin: 0 auto;' />");
    $("#verifying-otp").html(realUiUpdate);
    
    
    $("#clik_2_verify_otp").trigger("click");
    phone_number = window.localStorage.getItem("my_phone_number");
    supplied_otp = $("#sent-otp").val();
    
    
    $.ajax({
        
        url : "http://www.codegreenie.com/php_hub/_BibuainSME/verify_otp.php",
        //url : "http://localhost/php_hub/_BibuainSME/verify_otp.php",
        type : "POST",
        dataType : "html",
        crossDomain : true,
        cache : true,
        data : {"otp-phone" : phone_number, "otp-code" : supplied_otp},
        success : function(successReturn){
         if(successReturn === "Correct OTP"){
            
            console.log(successReturn);
             window.localStorage.setItem("my_otp", supplied_otp);
            $.mobile.changePage("buy_data.html", {"transition" : "slideup", "data-direction" : "reverse"});
            
         }
            
            else{
                
                var error_msg = $("<img src='docs/imgs/warning.png' style='margin:0 auto; display:block;'/><h3>OTP is invalid!</h3><a href='' data-rel='back' class='ui-btn'>OK</a>");
                $("#verifying-otp").html(error_msg);
            }
            
        },
        
        error : function(jqXHR, error, status){
            
            console.log(error + " " + status);
            var error_msg = $("<img src='docs/imgs/warning.png' style='margin:0 auto; display:block;'/><h3>Network Error, Try Again</h3><a href='' data-rel='back' class='ui-btn'>OK</a>");
            $("#verifying-otp").html(error_msg);
            
        }
        
    });
    
}


function pushSelectedPrice(thisPrice){
    
    var selectedPrice = $("#" + thisPrice).html();
    var selected_bank_price = $("#" + thisPrice).attr("data-bank-price");
    var selected_card_price = $("#" + thisPrice).attr("data-card-price");
    
   
    window.localStorage.setItem("selected_data", selectedPrice);
    window.localStorage.setItem("selected_bank_price", selected_bank_price);
    window.localStorage.setItem("selected_card_price", selected_card_price); 
    
    
    $("#data-select").html(selectedPrice);
    $("#close-data-popup").trigger("click");
    
}




function getLatestPrices(){
    $.ajax({
        
        url : "http://www.codegreenie.com/php_hub/_BibuainSME/fetch_latest_prices.php",
        //url : "http://localhost/php_hub/_BibuainSME/fetch_latest_prices.php",
        type : "GET",
        dataType : "html",
        crossDomain : true,
        cache : true,
        timeout : 5000,
        success : function(priceReturn){
            
           window.localStorage.setItem("current_prices", priceReturn);
            
        }
        ,
        error : function(jqXHR, error, status){
            
            window.localStorage.setItem("current_prices", "<span style='margin:10px 0px !important; background-color: #ffffff;'>Cannot get prices. Try again</span>");
        }
        
    });
}


function getLatestPricesEti(){
    $.ajax({
        
        url : "http://www.codegreenie.com/php_hub/_BibuainSME/fetch_latest_prices_eti.php",
        //url : "http://localhost/php_hub/_BibuainSME/fetch_latest_prices_eti.php",
        type : "GET",
        dataType : "html",
        crossDomain : true,
        cache : true,
        timeout : 5000,
        success : function(priceReturn){
            
           window.localStorage.setItem("current_prices_eti", priceReturn);
            
        }
        ,
        error : function(jqXHR, error, status){
            
             window.localStorage.setItem("current_prices_eti", "<span style'=margin:10px 0px !important; background-color: #ffffff;'>Cannot get prices. Try again</span>");
        }
        
    });
}




function networkHealth(){
    
    $("#network-stat").html(' <img src="styles/css/images/ajax-loader.gif" style="display:block; margin:0 auto;"><h3>Checking network...</h3>');
    
    $.ajax({
        
        url : "http://www.codegreenie.com/php_hub/_BibuainSME/network_health.php",
        //url : "http://localhost/php_hub/_BibuainSME/network_health.php",
        type : "GET",
        dataType : "html",
        crossDomain : true,
        cache : true,
        success : function(statReturn){
        
        
         if(statReturn === "Good"){
              
$("#network-stat").html('<h3> Network Status: <span style="font-weight:bold; color:#096;">Good</span></h3><span>You can purchase airtime data.</span><a href="" data-rel="back" class="ui-btn">OK</a>');
          }
            
            else{
                
                $("#network-stat").html('<h3> Network Status: <span style="font-weight:bold; color:#900;">Bad</span></h3><span>Internet Data purchase is currently unavailable. Please try again later</span><a href="" data-rel="back" class="ui-btn">OK</a>');
            }
            
        }
        ,
        error : function(jqXHR, error, status){
            
             console.log("error, status");
            $("#network-stat").html('<h3> Network Status: <span style="font-weight:bold; color:#900;">Error</span></h3><a href="" data-rel="back" class="ui-btn">OK</a>');
            
        }
        
    });
}




function getHistory(){
    var mySmartPhone = window.localStorage.getItem("my_phone_number");
    
    $.ajax({
        
        url : "http://www.codegreenie.com/php_hub/_BibuainSME/history_generator.php",
        //url : "http://localhost/php_hub/_BibuainSME/history_generator.php",
        type : "POST",
        dataType : "html",
        crossDomain : true,
        data : {"pushed_id" : mySmartPhone},
        cache : true,
        timeout : 5000,
        success : function(historyReturn){
            
           //window.alert(historyReturn);
            $("#history-container").html(historyReturn);
        }
        ,
        error : function(jqXHR, error, status){
         console.log(error, status);
        }
        
    });
}





$(document).on("pagecreate", function(){ //document.ready equivalent




//All auto execute codes upon app load v1.2.0
    
    $("#start-app").on("click", function(){
       
     
       
      if(window.localStorage.getItem("my_phone_number") === null || window.localStorage.getItem("my_otp") === null){
        $.mobile.changePage("reg_zone.html", {"transition" : "slideup", "data-direction" : "reverse"});  
      }
       
       else{
       $.mobile.changePage("buy_data.html", {"transition" : "slideup", "data-direction" : "reverse"});
       }
   });
    
    
    
 //Initiate initial cookies
    
    if(window.localStorage.getItem("selected_data") === null || window.localStorage.getItem("selected_bank_price") === null || window.localStorage.getItem("selected_card_price") === null)
    {
        
    window.localStorage.setItem("selected_data", "1GB - 700 Airtime");
    window.localStorage.setItem("selected_bank_price", "500");
    window.localStorage.setItem("selected_card_price", "700");
    window.localStorage.setItem("network_name", "MTN");
        
        console.log(window.localStorage.getItem("selected_data"));
    }
    
    
   
       
       window.localStorage.setItem("my_version", "2.0.4");
  
    
    updateChecker();


    $("#update-btn").on("click", function(){
       
        window.location = "http://build.phonegap.com/app/2396635/install";
    }); 

    
   
    
      $("#start-app-2").on("click", function(){
       
      
      if(window.localStorage.getItem("my_phone_number") === null || window.localStorage.getItem("my_otp") === null){
        $.mobile.changePage("reg_zone.html", {"transition" : "slideup", "data-direction" : "reverse"});  
      }
       
       else{
       $.mobile.changePage("buy_data.html", {"transition" : "slideup", "data-direction" : "reverse"});
       }
   });
    
   
   
    
    $("#phone-reg-form").on("submit", function(){processReg();});
    
    
    $("#verify-otp-form").on("submit", function(){processOTP();});
    
    
    
    getLatestPrices();
    var latest_prices_cookie = window.localStorage.getItem("current_prices");
   $("#mtn-data-list").empty().append(latest_prices_cookie);
    
    getLatestPricesEti();
    var latest_prices_cookie_eti = window.localStorage.getItem("current_prices_eti");
   $("#eti-data-list").empty().append(latest_prices_cookie_eti);
    
    
    $("#user_line").html("+234" + window.localStorage.getItem("my_phone_number"));
    $("#recharge-phone").val(window.localStorage.getItem("my_phone_number"));
    
     
     var get_selected_phone = window.localStorage.getItem("selected_phone");
    var get_selected_data =  window.localStorage.getItem("selected_data");
    var get_selected_network = window.localStorage.getItem("network_name");
    var get_selected_bank_price = window.localStorage.getItem("selected_bank_price");
    var get_selected_card_price = window.localStorage.getItem("selected_card_price"); 
    
    
    $("#phone_n_data").html("<span class='ui-icon-phone ui-icon-notext ui-btn-icon-left' style='position:relative;'></span>+234" + get_selected_phone + " | " + get_selected_data);
    $("#data_network").html("<span class='ui-icon-cloud ui-btn-icon-left' style='position:relative;'></span>" + get_selected_network);
    $("#data_price").html("<span class='ui-icon-tag ui-btn-icon-left' style='position:relative;'></span><del>N</del>" + get_selected_card_price + " Airtime");
    $("#data_bank_price").html("<span class='ui-icon-tag ui-btn-icon-left' style='position:relative;'></span><del>N</del>" + get_selected_bank_price + " Bank Deposit/Transfer");
    
    
    
    
    var mtnDataList = $("#mtn-data-list").children("li");
    mtnDataList.on("click", function(){
        
    var getID = $(this).attr("id");
    var network_name = $(this).attr("data-network-name");
    window.localStorage.setItem("network_name", network_name);
    pushSelectedPrice(getID);
    
    });
    
    
    
    var etiDataList = $("#eti-data-list").children("li");
    etiDataList.on("click", function(){
    
    var getID = $(this).attr("id");
    window.localStorage.setItem("network_name", "Etisalat");
    pushSelectedPrice(getID);
    
    });
    
    
    
    $("#process-order-button").on("click", function(){
    
   var selected_phone = $("#recharge-phone").val();
   window.localStorage.setItem("selected_phone", selected_phone);
        $.mobile.changePage("order_summary.html", {"transition" : "slideup", "data-direction" : "reverse"});
    });
    
    
   
    
 $("#push-to-payment").on("click", function(){
       
$.mobile.changePage("verify_payment.html", {"transition" : "slideup", "data-direction" : "reverse"});
    });
    
    
   

    
$("#goto-home").click(function(){
        
        $.mobile.changePage("buy_data.html", {"transition" : "slideup", "data-direction" : "reverse"});
    });
    

$("#footer-tour").click(function(){
        
        $.mobile.changePage("app_tour.html", {"transition" : "slideup", "data-direction" : "reverse"});
    });


    
    
$("#pull_network_stats").click(function(){
        
    networkHealth();
        
    });

    
getHistory(); 
    
   
   
});//document.ready equivalent









  

  

    
  
    

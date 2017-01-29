var pictureSource;
var destinationType;

   


function openCamera(){
    
    destinationType = Camera.DestinationType;
    pictureSource = Camera.PictureSourceType;
    
    navigator.camera.getPicture(cameraGood, cameraBad, 
    {
        quality : 50, 
        destinationType : destinationType.FILE_URI,
        sourceType : pictureSource.CAMERA
    }
    );
    
}





function cameraGood(imgObj){
    
    
    
   var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imgObj.substr(imgObj.lastIndexOf('/')+1);
    options.mimeType = "image/jpeg";
    
    
    var ft = new FileTransfer();
    ft.upload(imgObj, encodeURI("http://localhost/php_hub/_BibuainSME/media_upload.php"), win, fail, options); 
    
    
    /// var imgContainer = $("#img-container");
    //imgContainer.attr("src", "data:image/jpeg;base64," + imgObj);

}



function cameraBad(errorWhy){
    
    console.log("Unable to access camera " + errorWhy);
    var error_msg = $("<img src='docs/imgs/warning.png' style='margin:0 auto; display:block;'/><h3>Camera access denied!</h3><a href='' data-rel='back' class='ui-btn'>OK</a>");
    $("#camera-access-error").html(error_msg);
    $("#clik_2_cam_error").trigger("click");
}


    
  function openGallery(){
    
    destinationType = Camera.DestinationType;
    pictureSource = Camera.PictureSourceType;
    
    navigator.camera.getPicture(cameraGood, cameraBad, 
    {
        quality : 50, 
        destinationType : destinationType.FILE_URI,
        sourceType : pictureSource.PHOTOLIBRARY
     }
    );
    
}  
    

    
    $("#open-cam-btn").on("click", function(){openCamera();});
    $("#open-gallery-btn").on("click", function(){openGallery();});








       
    function win(r) {
        
            window.alert("Successfully uploaded");
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
        }





        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
            //console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }





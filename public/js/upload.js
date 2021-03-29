$("document").ready(function(){
    setTimeout(function(){
        $(".upload-form").slideDown(1000, function(){
            console.log("done");
        })
    }, 500);
})
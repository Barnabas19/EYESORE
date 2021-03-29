$("document").ready(function(){
    setTimeout(function(){
        $(".text").slideDown("5000", "linear");
        setTimeout(function(){
            $(".form").fadeIn(1000, function(){
                console.log("faded in");
            });
        }, 500)
    }, 1000);
});
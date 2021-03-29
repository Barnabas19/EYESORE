$("document").ready(function(){
    setTimeout(function(){
        $(".anchor").animate({ opacity: "1.0" }, 2000)
        setTimeout(function(){
            $(".back-anchor").animate({ opacity: "1.0" }, 2000)
        }, 500)
    }, 1000)
    setTimeout(function(){
        $(".list-item").animate({ opacity: "1.0" }, 2000);
    }, 500)
})
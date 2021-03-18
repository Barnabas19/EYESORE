module.exports = {
    landing: (req, res)=>{
        var viewModel = {
            paragraph: "Get access to beautiful photos to feed your imagination, images are served based on selected categories"
        }
        res.render('index', viewModel);
    }
}
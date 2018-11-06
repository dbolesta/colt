var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB     = require("./seeds");


//seedDB();
// connect the database
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true }); 

// set up stuff lol idk
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); // so we can serve files from the 'public' directory
app.set("view engine", "ejs");


// routes
app.get("/", function(req, res){
    res.render("home");
});

app.get("/campgrounds", function(req, res){
    // get all campgrounds from db
    Campground.find(function(err, campgrounds){
        if (err) return console.error(err);
        res.render("index", {campgrounds: campgrounds});
    });
});


// post it!
app.post("/campgrounds", function(req, res){
    console.log("Made it to post page"); 
    
    Campground.create(req.body, function(err, campground){
        if (err) return console.error(err);
        console.log(campground + " was successfully created");
        res.redirect("/campgrounds");
    });
    
    
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

// show
app.get("/campgrounds/:id", function(req, res){
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, camp){
        if (err) return console.error(err);
        res.render("show", {camp: camp});
    });
});


//================
// COMMENTS ROUTES
//================

// new
app.get("/campgrounds/:id/comments/new", function(req, res){
    res.render("new");
});





// listen
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp is listening on port " + process.env.PORT);
});
var express       = require("express"),
    methodOverride = require("method-override"),
    bodyParser    = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    mongoose      = require("mongoose"),
    app           = express();

mongoose.connect("mongodb://localhost:27017/blog_app" , { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify : false});
app.set("view engine" , "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

var blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body: String,
    created: {type: Date , default: Date.now}
});
var Blog = mongoose.model("Blog" , blogSchema);

// Blog.create({
//     title: "How machine learning is changing the world!",
//     image: "data:image/jpeg;base64,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",
//     body : "Machine learning is a method of data analysis that automates analytical model building. It is a branch of artificial intelligence based on the idea that systems can learn from data, identify patterns and make decisions with minimal human intervention."
// } , function(err , newBlog){
//     if(err){
//         console.log(err);
//     } else{
//         console.log("NEW BLOG CREATED!");
//         console.log(newBlog);
//     }
// })

//RESTful routes
//index

app.get("/blogs" , function(req , res){
    Blog.find({}, function(err , rblogs){
        if(err){
            console.log(err);
        }
        else{
            res.render("index" , {blogs: rblogs})
        }
    })
})
app.get("/" , function(req , res){
    res.redirect("/blogs");
})
//new get
app.get("/blogs/new" , function(req , res){
    res.render("new");
})
//create route
app.post("/blogs" , function(req , res){
    //create blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog , function(err , newBlog){
        if(err){
            res.render("new");
        }
        else{
            res.redirect("/blogs")
        }
    })
    //redirect
})
//show
app.get("/blogs/:id" , function(req, res) {
    Blog.findById(req.params.id , function(err , foundBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("show", {blog : foundBlog});
        }
    });
})
//edit
app.get("/blogs/:id/edit" , function(req, res) {
    Blog.findById(req.params.id , function(err , editBlog){
        if(err){
            console.log(err);
        }
        else{
            res.render("edit" , {blog : editBlog});
        }
    })
})
//PUT REQUEST
app.put("/blogs/:id" , function(req , res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id , req.body.blog , function(err , updatedBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs/"+ req.params.id);
        }
    })
}) 
//delete ROUTE
app.delete("/blogs/:id" , function(req , res){
    Blog.findByIdAndRemove(req.params.id , function(err , delBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs");
        }
    })
})




app.listen(process.env.PORT , process.env.IP , function(){
    console.log("Server is running!!!");
})
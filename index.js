const express=require("express")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")

const app=express();
app.set('view engine','ejs')


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://sudeep:test123@cluster0.mpx93rw.mongodb.net/todolistdb");

const itemschema= mongoose.Schema({
    name:String
});

const item=mongoose.model("item",itemschema)
const i1=new item({
    name:"Welcome to your Todolist"
});
const i2=new item({
    name:"Hit the + button to add a new item"
});
const i3=new item({
    name:"Hit the <-- button to add a new item"
});


const defaultitem=[i1,i2,i3]


app.get("/",function(req,resp){
    item.find({}).then((res)=>{
        if(res.length==0){
            item.insertMany(defaultitem).then((res)=>{
            console.log("successful")
            }).catch((err)=>{
            console.log(err)
            })
            resp.redirect("/")
        }
        else{
            resp.render("list",{listTitle:"Today",newListItems:res})
        }
        
    }).catch((err)=>{
        console.log(err)
    });
    
})

app.post("/",function(req,res){
    const itemname=req.body.newItem;
    console.log(itemname)
    const i1=new item({
        name:itemname
    })
    i1.save()
    res.redirect("/")
})

app.post("/delete",function(req,res){
    const itemcheckedid=req.body.checkbox
    item.deleteOne({_id:itemcheckedid}).then(()=>{
        console.log("suceesfully deleted")
        res.redirect("/")
    }).catch((err)=>{
        console.log(err)
    })
})

app.listen(3000,function(){
    console.log("server started on part 3000")

})
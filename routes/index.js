//Require express dependencies
var express = require('express');

//Require module of student from student.js file
var studentModel = require('../modules/student');

//creat a object of route
var router = express.Router();

//query for find result from collection
var student=studentModel.find({});




// start routing.... 

router.get('/', function(req, res, next) {

  //execute object student to fetch data
  student.exec(function(err,data){
      if(err) throw err;   //throw err if occur
        res.render('index', { title: 'Student Records',records:data, msg:''}); //render data for ejs page
      
  });
  
});

//creating route for post methods 

router.post("/",function(req,res,next){

//creat a object of student model

  var studentDetails = new studentModel({
    name: req.body.uname,           //take value from ejs view from
    email:req.body.email,
    class:req.body.class,
    gender:req.body.gender,
    contact:req.body.contact,      //which indicate data in Number Form
  });

  studentDetails.save( function(err,res1){              // Use studentDetails.save() to store data into database   and also refresh the table by using function(err,res1)    
    if(err)  throw err;                             //if err is occure
    student.exec(function(err,data){               //
      if(err) throw err;                            //throw err if occur
        res.render('index', { title: 'student Records',records:data,msg:'Record Inseret Successfully'}); //render data for ejs page
      

  });
  


 
});  

});


//route for delete row
router.get('/delete/:id',function(req,res,next){
  var id = req.params.id;
  var del = studentModel.findByIdAndDelete(id);

  del.exec(function(err){
    if(err) throw err;

    student.exec(function(err,data){
      if(err) throw err;
      res.render('index', { title: 'Student Records',records:data,msg:'Record Deleted Successfully'});
    });

  })


});

//route to edit .js page
router.get('/edit/:id', function(req, res, next) {

  var id = req.params.id;
  var edit = studentModel.findById(id);

//execute object student to fetch data
    edit.exec(function(err,data){
    if(err) throw err;   //throw err if occur
      res.render('edit', { title: 'Edit Student Records',records:data}); //render data for ejs page
    
});

});

//route to update
router.post('/update/', function(req, res, next) {

  
  var update = studentModel.findByIdAndUpdate(req.body.id,{
    name: req.body.uname,           //take value from ejs view from
    email:req.body.email,
    class:req.body.class,
    gender:req.body.gender,
    contact:req.body.contact,
  });

//execute object student to fetch data
    update.exec(function(err,data){
    if(err) throw err;   //throw err if occur
    student.exec(function(err,data){
      if(err) throw err;   //throw err if occur
        res.render('index', { title: 'Student Records',records:data, msg:'Data Updated Sucessfully'}); //render data for ejs page
      
  });
});

});


//route to search by name

router.post("/search/",function(req,res,next){
var flrtname = req.body.uname;
console.log(flrtname);

var studentfilter = studentModel.find({name:flrtname});
studentfilter.exec(function(err,data){
  if(err) throw err;
  res.render('index',{title:'Student Records',records:data,msg:''});
})

});

//Export route module
module.exports = router;

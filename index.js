const express = require('express');
const path = require('path'); 
const port = 8000; //used to onnect the views folder with the index.js directory and to use the path.join function
const bodyParser = require('body-parser');

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs'); //basically app is a JS object so now we have created a new key - view-engine which corresponds to ejs value ..
app.set('views', path.join(__dirname,'views'));

app.use(bodyParser.urlencoded({extended : false}));//iska kaam hai form se data ko decode krne ka from string to readable object type understanding ..

// this urlencoded reads only the form data and not the string or query params ..

app.use(express.static('assets'));//app.use generally almost always signifies a middleware 
//this express.static is actually used to access the static files that i might have like the simple css or js files .. for more understanding see i have linked the assets folder here wherein my static files are located ..


// important 

//middlewares launch hote hain after a request is sent from browser but before an action is taken by controller 

// jb bhi kabhi request call ki jaati hai kisi bhi controller ko to saare middlewares ek ek baar to use ho hi jaate hain aise me agar multiple requests call hongi to middlewares bhi multiiple times call ho jaayenge ..



//middleware 1
// app.use(function(req,res,next){
//     req.myName = "Saksham"; 

// ye hm kya kar rahe hain ki basically hr middleware ke pass hr request ka access rehta hai to hm req ko manipulate kr rahe hain middleware ki help se kyunki hm aisa kar sakte hain 


//     // console.log('middleware 1 called !');
//     next();
// });

//middleware 2

// app.use(function(req,res,next){
//     // console.log('main kyun bataun', req.myName)
//     // console.log('middleware 2 called');
//     next();
// })

var contactList123asdasadsd = [
    {
        name : "Arpan",
        phone : "111111"
    },
    {
        name : "tony stark",
        phone: "1123454"
    },
    {
        name : "Coding Ninja",
        phone : "342535"
    }
]


app.get('/',function(req,res){
    // console.log(__dirname);
    // res.send('Cool, it is running');
   

    Contact.find({}, function(err,contacts){ //this Contacts.find fetches the data from the db  // this {} is actually used for query different types of data from the database //this empty {} signifies that no filter on fetching data from db is used 
        if (err){
            console.log('Error in fetching contacts from db');
            return;
        }
        
        return res.render('home', {title : "My Contacts List",
        // contact_list: contactList
        contact_list: contacts //this contacts is now iterating through the database 
    
    });


});
});

// app.get('/practise',function(req,res){
//     return res.render('practise',{
//         title: "let us play with ejs"
//     });
// });

app.post('/create-contact',function(req,res){
//   contactList.push(
//     {
//         name : req.body.name,
//         phone : req.body.phone
//     }
//ye use kiya tha app.use(bodyparser url encoding) waale feature ka jiski wajah se ye padh paa raha tha 
//   );
    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err)
        {
            console.log('error in createing a contact');
            return ;
        }

        console.log('*****', newContact);
        return res.redirect('back');
    });

    // return res.redirect('/practise');
    // return res.redirect('/');
});

app.get('/delete-contact/', function(req,res){
    
    //get the id from query in the ul

    let id = req.query.kurkure;

    //find the contact in the database using id and delete

    Contact.findByIdAndDelete(id,function(err){

        if(err)
        {
        console.log('Error found in database');
        return ;
        }    
   
        return res.redirect('back');

    });

    

    //console.log(req.query) ;
    //let phone = req.query.phone ;
    // let contactIndex = contactList.findIndex(contact => contact.phone ==phone);

    // if (contactIndex != -1)
    // {
    //     contactList.splice(contactIndex,1);
    // }










// Understanding query params  

    // app.get('/delete-contact/',function(req,res){
    //     console.log(req.params);

    // }) will print name : ____  phone : _____ 









});

app.listen(port,function(err){
    if(err)
    {
        console.log('error in running the server');
    }
    console.log('yup my express serve is running on port', port);
});
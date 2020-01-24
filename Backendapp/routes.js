
var About =require('./models/contacts');
module.exports=function(expobj){
    expobj.post('/api/abouts',(req,res)=>{
        console.log("First Name : "+req.body.first_name+ '\nLast Name :'+req.body.last_name+ '\nContact Number :'+req.body.phone);
        let newContact =new About({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone
        });
        newContact.save(function(err,contact){
            if(err)
            {
                res.json({msg:'failed to add contact'});

            }
            else{
                res.json({msg:'contact added successfully '});
            }
        });
    });
    expobj.get('/api/abouts',function(req,res){
        About.find(function(err,abouts){
            if(err)
            res.send(err);
            else
            res.json(abouts);
        });
    });
};



exports.register = (req,res)=>{
  var user = req.body;

  req.checkBody('name', 'Name is required').notEmpty();

  var errors = req.validationErrors;

  if(errors){
    res.render('register',{
      errors: errors
    });
  }  
};

exports.login = (req, res) =>{
  
};
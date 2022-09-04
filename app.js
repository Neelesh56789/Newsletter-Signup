//jshint esversion:6

const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname+"/signup.html")
})

app.post("/", function(req,res){
  const firstName=req.body.fname;
  const lastName=req.body.lname;
  const email=req.body.email;

  var data={
    members: [
      {
      emailAddress: email,
      status: "subscribed",

      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
    ]
  };

  const jsonData=JSON.stringify(data);

  const url="https://us11.api.mailchimp.com/3.0/lists/f911b1bbea";

  const options={
    method: "POST",
    auth: "Neelesh:e581246b8f3f60423d5dd6fed676fec5-us11"
  }
  const request=https.request(url, options, function(response){

    if(response.statusCode===200)
    {
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
  //console.log(firstName, lastName, email);
});
app.post("/failure", function(response){
  response.send("/")
})

app.listen(3000, function(){
  console.log("Server is running on port 3000");
})



//e581246b8f3f60423d5dd6fed676fec5-us11
//f911b1bbea

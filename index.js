var { exec } = require("child_process");
var { spawn } = require("child_process");
var express  = require("express");
var app  = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path=require('path')
var crypto = require('crypto');
var uuid = require('uuid');
var mysql = require('mysql');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const cors = require("cors");
const multer = require('multer');
app.use(cors({ origin: "*" }));

app.listen(3001, () => {
    console.log("The server started on port 3000 !!!!!!");
});







storage = multer.diskStorage({
    destination: './uploads',
    filename: function(req, file, cb) {
     
        cb(null, "outputtttttt.pdf");
        //console.log(req.body)
    
    }
  });
  storage2 = multer.diskStorage({
    destination: './uploads',
    filename: function(req, file, cb) {
     
        cb(null, "outputtttttt.png");
        //console.log(req.body)
    
    }
  });

  //******************************************************************** */

  app.post("/upload2",
  multer({
    storage: storage
  }).single('upload'), function(req, res) {
    //console.log(req.file);
    console.log(req.file);
  
  projectname=req.file.originalname;
  classs=req.query.id;
  console.log(classs); 
   console.log(projectname);
  
   exec("auto-multiple-choice meptex --src /home/hamza/MC-Projects/"+projectname+"/DOC-calage.xy --progression-id MEP --progression 1 --data /home/hamza/MC-Projects/"+projectname+"/data", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        console.log('maptrex image with success');
        
        
       
    }
    exec("auto-multiple-choice getimages /home/hamza/backend/uploads/outputtttttt.pdf --progression-id analyse --list /home/hamza/MC-Projects/"+projectname+"/scans/path --vector-density 250 --copy-to /home/hamza/MC-Projects/"+projectname+"/scans/ --orientation portrait ", (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
        console.log('get image success');
          console.log(`stderr: ${stderr}`);
          
        
        
      } 
      
   
     
      exec("auto-multiple-choice analyse  --multiple --tol-marque 0.2,0.2 --prop 0.8 --bw-threshold 0.6 --progression-id analyse --progression 1 --n-procs 0 --data /home/hamza/MC-Projects/"+projectname+"/data --projet /home/hamza/MC-Projects/"+projectname+"/ --cr /home/hamza/MC-Projects/"+projectname+"/cr --liste-fichiers /home/hamza/MC-Projects/"+projectname+"/scans/path  --no-ignore-red –try-three ", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
          console.log('Analyse with success');
            console.log(`stderr: ${stderr}`);
            
        }    
    
        exec("auto-multiple-choice prepare --out-corrige-indiv /home/hamza/MC-Projects/"+projectname+"/DOC-indiv-solution.pdf --n-copies 0 --with xelatex --filter plain --filtered-source /home/hamza/MC-Projects/"+projectname+"/DOC-filtered.tex  --progression-id bareme --progression 1 --data /home/hamza/MC-Projects/"+projectname+"/data --mode bk /home/hamza/MC-Projects/"+projectname+"/source.txt", (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
          if (stderr) {
            console.log('Prepare with success');
              console.log(`stderr: ${stderr}`);
              
          }    
       
          exec("auto-multiple-choice note  --data /home/hamza/MC-Projects/"+projectname+"/data --seuil 0.15 --seuil-up 1 --grain 0.5 --arrondi inf --notemax 20 --plafond --notenull 0 --notemin  --postcorrect-student  --postcorrect-copy  --no-postcorrect-set-multiple --progression-id notation --progression 1", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
              console.log('note with success');
                console.log(`stderr: ${stderr}`);
               
            } 
            
         
         
          exec("auto-multiple-choice annotate  --single-output output.pdf --cr /home/hamza/MC-Projects/"+projectname+"/cr --project /home/hamza/MC-Projects/"+projectname+"/ --projects /home/hamza/MC-Projects/ --data /home/hamza/MC-Projects/"+projectname+"/data --subject /home/hamza/MC-Projects/"+projectname+"/DOC-sujet.pdf --corrected /home/hamza/MC-Projects/"+projectname+"/DOC-indiv-solution.pdf  ", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
              console.log('anotatenote with success');
                console.log(`stderr: ${stderr}`);
                
            } 
           
            exec("sudo auto-multiple-choice association-auto --data /home/hamza/MC-Projects/"+projectname+"/data --notes-id student.number --liste /home/hamza/MC-Projects/"+classs+".csv --liste-key num --csv-build-name  --encodage-liste UTF-8  --no-pre-association", (error, stdout, stderr) => {
              if (error) {
                  console.log(`error: ${error.message}`);
                  
              }
              if (stderr) {
                  console.log(`stderr: ${stderr}`);
                  console.log('get image with success');
                
                 
              }
             
          
            exec(" sudo auto-multiple-choice export --module ods --data /home/hamza/MC-Projects/"+projectname+"/data --useall  --sort n --fich-noms /home/hamza/MC-Projects/"+classs+".csv --noms-encodage UTF-8   --no-rtl --output /home/hamza/MC-Projects/"+projectname+"/exports/last.ods --option-out groupsums=0 --option-out nom= --option-out stats= --option-out code= --option-out groupsep=. --option-out columns=student.copy,student.key,student.name --option-out statsindic=", (error, stdout, stderr) => {
              if (error) {
                  console.log(`error: ${error.message}`);
                  
              }
              if (stderr) {
                  console.log(`stderr: ${stderr}`);
                  console.log('get image with success');
                  
                 
              }
            
            });
          });
        });});
      });  });
    });
  });  });
  
          
          /*var img = fs.readFileSync("/home/hamza/backend/uploads/"+"ffff-1.png");
  res.writeHead(200, {'Content-Type': 'image/png' });
  res.end(img, 'binary');  */ 


        

 /*
app.post("/upload",
  multer({
    storage: storage2
  }).single('upload'), function(req, res) {
  console.log(req.file);
   console.log(req.body);
  
  pn=req.body.pnn;
   console.log(pn);
  // res.redirect("" + req.body);
   // console.log(req.body.pnn.toString+"*************");

   exec("rm -f /home/hamza/MC-Projects/"+pn+"/data/capture.sqlite ", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
      console.log('get image success');
      console.log(`stderr: ${stderr}`);
        
      
      
    } 
    exec("sudo rm -f  /home/hamza/MC-Projects/"+pn+"/cr/corrections/pdf/* ", (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
        console.log('get image success');
          console.log(`stderr: ${stderr}`);
          
        
        
      } 

    exec("rm -f /home/hamza/MC-Projects/"+pn+"/data/scoring.sqlite ", (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
        console.log('get image success');
          console.log(`stderr: ${stderr} `);
          
        
        
      } 
      exec("rm -f /home/hamza/MC-Projects/"+pn+"/data/report.sqlite ", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
          console.log('get image success');
            console.log(`stderr: ${stderr}`);
            
          
          
        } 
        exec("rm  -f /home/hamza/MC-Projects/"+pn+"/data/association.sqlite", (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
          if (stderr) {
            console.log('get image success');
              console.log(`stderr: ${stderr}`);
              
            
            
          } 
          exec("rm -f /home/hamza/MC-Projects/"+pn+"/scans/* ", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
              console.log('get image success');
                console.log(`stderr: ${stderr}`);
                
            } 
   exec("auto-multiple-choice getimages /home/hamza/backend/uploads/DOC-sujet.png --progression-id analyse --list /home/hamza/MC-Projects/"+pn+"/scans/path --vector-density 250 --copy-to /home/hamza/MC-Projects/"+pn+"/scans/ --orientation portrait ", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
      console.log('get image success');
        console.log(`stderr: ${stderr}`);
        
      
      
    } 
    
 
   
    exec(" auto-multiple-choice analyse  --multiple --tol-marque 0.2,0.2 --prop 0.8 --bw-threshold 0.6 --progression-id analyse --progression 1 --n-procs 0 --data /home/hamza/MC-Projects/"+pn+"/data --projet /home/hamza/MC-Projects/"+pn+"/ --cr /home/hamza/MC-Projects/"+pn+"/cr --liste-fichiers /home/hamza/MC-Projects/"+pn+"/scans/path  --no-ignore-red –try-three ", (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
        console.log('Analyse with success');
          console.log(`stderr: ${stderr}`);
          
      }    
  
      exec("auto-multiple-choice prepare --out-corrige-indiv /home/hamza/MC-Projects/"+pn+"/DOC-indiv-solution.pdf --n-copies 0  --with xelatex --filter plain --filtered-source /home/hamza/MC-Projects/"+pn+"/DOC-filtered.tex  --progression-id bareme --progression 1 --data /home/hamza/MC-Projects/"+pn+"/data --mode bk /home/hamza/MC-Projects/"+pn+"/source.txt", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
          console.log('Prepare with success');
            console.log(`stderr: ${stderr}`);
            
        }    
     
        exec(" auto-multiple-choice note  --data /home/hamza/MC-Projects/"+pn+"/data --seuil 0.15 --seuil-up 1 --grain 0.5 --arrondi inf --notemax 20 --plafond --notenull 0 --notemin  --postcorrect-student  --postcorrect-copy --no-postcorrect-set-multiple --progression-id notation --progression 1", (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
          if (stderr) {
            console.log('note with success');
              console.log(`stderr: ${stderr}`);
             
          } 
          
       
       
        exec(" auto-multiple-choice annotate --cr /home/hamza/MC-Projects/"+pn+"/cr --project /home/hamza/MC-Projects/"+pn+"/ --projects /home/hamza/MC-Projects/ --data /home/hamza/MC-Projects/"+pn+"/data --subject /home/hamza/MC-Projects/"+pn+"/DOC-sujet.pdf --corrected /home/hamza/MC-Projects/"+pn+"/DOC-indiv-solution.pdf ", (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
          if (stderr) {
            console.log('anotatenote with success');
              console.log(`stderr: ${stderr}`);
              
          } 

          exec("rm -f  /home/hamza/backend/uploads/* ", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
              console.log('get image success');
                console.log(`stderr: ${stderr}`);
                
              
              
            } 
            exec("mv -f /home/hamza/MC-Projects/"+pn+"/cr/corrections/pdf/* /home/hamza/backend/uploads/fff.pdf", (error, stdout, stderr) => {
              if (error) {
                  console.log(`error: ${error.message}`);
                  return;
              }
              if (stderr) {
                console.log('get image success');
                  console.log(`stderr: ${stderr}`);
                  
                 
                
              } 
              exec("pdftocairo  ./uploads/fff.pdf ./uploads/ffff -png ", (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                  console.log('get image success');
                    console.log(`stderr: ${stderr}`);
                   
                   
                     
                }
          
          var img = fs.readFileSync("/home/hamza/backend/uploads/"+"ffff-1.png");
  res.writeHead(200, {'Content-Type': 'image/png' });
  res.end(img, 'binary');   

}); }); }); }); }); }); }); }); }); }); }); });
        }); 
      });   }); 
       
    */
   
  //************************* correction sumultane partie Mobile***********************************************
  app.post("/upload",
  multer({
    storage: storage2
  }).single('upload'), function(req, res) {
  console.log(req.file);
   console.log(req.body);
  
  pn=req.body.pnn;
   console.log(pn);
 // res.redirect();
   // console.log(req.body.pnn.toString+"*************");

   
   exec("rm -f /home/hamza/MC-Projects/"+pn+"/data/capture.sqlite ", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
      console.log('get image success');
      console.log(`stderr: ${stderr}`);
        
      
      
    } 
    exec("sudo rm -f  /home/hamza/MC-Projects/"+pn+"/cr/corrections/pdf/* ", (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
        console.log('get image success');
          console.log(`stderr: ${stderr}`);
          
        
        
      } 

    exec("rm -f /home/hamza/MC-Projects/"+pn+"/data/scoring.sqlite ", (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
        console.log('get image success');
          console.log(`stderr: ${stderr} `);
          
        
        
      } 
      exec("rm -f /home/hamza/MC-Projects/"+pn+"/data/report.sqlite ", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
          console.log('get image success');
            console.log(`stderr: ${stderr}`);
            
          
          
        } 
        exec("rm  -f /home/hamza/MC-Projects/"+pn+"/data/association.sqlite", (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
          if (stderr) {
            console.log('get image success');
              console.log(`stderr: ${stderr}`);
              
            
            
          } 
          exec("rm -f /home/hamza/MC-Projects/"+pn+"/scans/* ", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
              console.log('get image success');
                console.log(`stderr: ${stderr}`);
                
            } 
           
   exec("auto-multiple-choice getimages /home/hamza/backend/uploads/outputtttttt.png --progression-id analyse --list /home/hamza/MC-Projects/"+pn+"/scans/path --vector-density 250 --copy-to /home/hamza/MC-Projects/"+pn+"/scans/ --orientation portrait ", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
      console.log('get image success');
        console.log(`stderr: ${stderr}`);
        
      
      
    } 
    
 
   
    exec(" auto-multiple-choice analyse  --multiple --tol-marque 0.2,0.2 --prop 0.8 --bw-threshold 0.6 --progression-id analyse --progression 1 --n-procs 0 --data /home/hamza/MC-Projects/"+pn+"/data --projet /home/hamza/MC-Projects/"+pn+"/ --cr /home/hamza/MC-Projects/"+pn+"/cr --liste-fichiers /home/hamza/MC-Projects/"+pn+"/scans/path  --no-ignore-red –try-three ", (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
        console.log('Analyse with success');
          console.log(`stderr: ${stderr}`);
          
      }    
  
      exec("auto-multiple-choice prepare --out-corrige-indiv /home/hamza/MC-Projects/"+pn+"/DOC-indiv-solution.pdf --n-copies 0  --with xelatex --filter plain --filtered-source /home/hamza/MC-Projects/"+pn+"/DOC-filtered.tex  --progression-id bareme --progression 1 --data /home/hamza/MC-Projects/"+pn+"/data --mode bk /home/hamza/MC-Projects/"+pn+"/source.txt", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
          console.log('Prepare with success');
            console.log(`stderr: ${stderr}`);
            
        }    
     
        exec(" auto-multiple-choice note  --data /home/hamza/MC-Projects/"+pn+"/data --seuil 0.15 --seuil-up 1 --grain 0.5 --arrondi inf --notemax 20 --plafond --notenull 0 --notemin  --postcorrect-student  --postcorrect-copy --no-postcorrect-set-multiple --progression-id notation --progression 1", (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
          if (stderr) {
            console.log('note with success');
              console.log(`stderr: ${stderr}`);
             
          } 
          
       
       
        exec(" auto-multiple-choice annotate --cr /home/hamza/MC-Projects/"+pn+"/cr --project /home/hamza/MC-Projects/"+pn+"/ --projects /home/hamza/MC-Projects/ --data /home/hamza/MC-Projects/"+pn+"/data --subject /home/hamza/MC-Projects/"+pn+"/DOC-sujet.pdf --corrected /home/hamza/MC-Projects/"+pn+"/DOC-indiv-solution.pdf ", (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
          if (stderr) {
            console.log('anotatenote with success');
              console.log(`stderr: ${stderr}`);
              
          } 

});  
       
    
   
}); }); }); }); }); }); }); }); }); });
res.end();

}); 

 
             
 


 

  
  



    
  
  

  /*app.post("/upload",
  multer({
    storage: storage
  }).single('upload'), function(req, res) {
    //console.log(req.file);
  //  console.log(req.body);
   // console.log(req.body.name)
  // res.redirect("" + req.body);
   // console.log(req.file.filename);
  // exec("mv  ./uploads/outputtttttt /home/hamza/Music ", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
      console.log('Projet created with success');
        console.log(`stderr: ${stderr}`);
        return;
    }
    return res.status(200).end();
  });
    return res.status(200).end(); 
  });*/

app.get('/uploads/:upload1/', function (req, res){
  dirname = req.params.upload1;
  
  console.log(dirname);

  
 
   
    var img = fs.readFileSync("/home/hamza/MC-Projects/"+dirname+"/"+"DOC-sujet.pdf");
   res.writeHead(200, {'Content-Type': 'application/pdf' });
   res.end(img, 'binary');   

 
  
   
});
app.get('/upload5/:upload5/', function (req, res){
  dirname = req.params.upload5;
  
  console.log(dirname);

  
 
   
    var img = fs.readFileSync("/home/hamza/MC-Projects/"+dirname+"/cr/corrections/pdf/"+"output.pdf");
   res.writeHead(200, {'Content-Type': 'application/pdf' });
   res.end(img, 'binary');   

 
  
   
});
app.get('/upload4/:place/', function (req, res){
  dirname = req.params.place;
  
  console.log(dirname);

 
    exec(" sudo sh  execlconvert.sh "+dirname, (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          
      }
      if (stderr) {
        console.log('Projet created with success');
          console.log(`stderr: ${stderr}`);
     
      }
      console.log(`stdout: ${stdout}`);

      /*exec("sudo libreoffice --convert-to pdf  /home/hamza/MC-Projects/"+dirname+"/exports/*.html", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
          console.log('Projet created with success');
            console.log(`stderr: ${stderr}`);

            
        }
  
 
  
  });*/ 
  var img = fs.readFileSync("/home/hamza/MC-Projects/"+dirname+"/exports/"+"last.pdf");
  res.writeHead(200, {'Content-Type': 'application/pdf' });
  res.end(img, 'binary'); 
 
});   });
 


app.get('/uploads/:upload/:place/', function (req, res){
  file = req.params.upload;
  placee=req.params.place;
  console.log(placee);
  
    


  exec("cp -i /home/hamza/MC-Projects/"+placee+"/"+file+"  ./uploads/ ", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
      console.log('Projet created with success');
        console.log(`stderr: ${stderr}`);
       
       
        
    }
   // return res.status(200).end();
    

  

   exec("pdftocairo  ./uploads/"+file+" ./uploads/ffff -png ", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
      
      console.log('get image success');
        console.log(`stderr: ${stderr}`);
       
       
    } 
    var img = fs.readFileSync("/home/hamza/backend/uploads/"+"ffff-1.png");
    res.writeHead(200, {'Content-Type': 'image/png'  });
    res.end(img, 'binary')
   
  ;
  exec("rm -f  /home/hamza/backend/uploads/* ", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
      console.log('get image success');
        console.log(`stderr: ${stderr}`);
        
      
      
    } });
  });
  });


 
  

});

//**************************** upload exemen correction partie Mobile ****************************************************


app.get('/uploadss/:place/', function (req, res){
  //file = req.params.upload;
  placee=req.params.place;
  console.log(placee);
  
    


  exec("mv -f /home/hamza/MC-Projects/"+placee+"/cr/corrections/pdf/*  ./uploads/xx.pdf ", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
      console.log('Projet created with success');
        console.log(`stderr: ${stderr}`);
       
       
        
    }
   // return res.status(200).end();
    

  

   exec("pdftocairo  ./uploads/xx.pdf ./uploads/ffff -png ", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
      
      console.log('get image success');
        console.log(`stderr: ${stderr}`);
       
       
    } 
    var img = fs.readFileSync("/home/hamza/backend/uploads/"+"ffff-1.png");
    res.writeHead(200, {'Content-Type': 'image/png'  });
    res.end(img, 'binary')
   
  ;
  exec("rm -f  /home/hamza/backend/uploads/* ", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
      console.log('get image success');
        console.log(`stderr: ${stderr}`);
        
      
      
    } });
  });
  });

  
 
  

});


//Connect to MySQL
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pim'

});




//register



// create a new project************************************************************************************
app.post('/correction', (req,res,next)=> {
  var post_data=req.body;
  var projectname=post_data.pn;
  var post_data=req.body;
  var contenu =post_data.cn;
  console.log(projectname);

  exec("auto-multiple-choice getimages /home/hamza/MC-Projects/hbtkd/"+projectname+"/output.pdf --progression-id analyse --list /home/hamza/MC-Projects/"+projectname+"/scans/path --vector-density 250 --copy-to /home/hamza/MC-Projects/"+projectname+"/scans/ --orientation portrait", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        console.log('get image with success');
        return;
       
    }
    console.log(`stdout: ${stdout}`);

    exec("auto-multiple-choice getimages /home/hamza/MC-Projects/hbtkd/"+projectname+"/output.pdf --progression-id analyse --list /home/hamza/MC-Projects/"+projectname+"/scans/path --vector-density 250 --copy-to /home/hamza/MC-Projects/"+projectname+"/scans/ --orientation portrait", (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          console.log('get image with success');
          return;
         
      }
      console.log(`stdout: ${stdout}`);

      exec("auto-multiple-choice getimages /home/hamza/MC-Projects/hbtkd/"+projectname+"/output.pdf --progression-id analyse --list /home/hamza/MC-Projects/"+projectname+"/scans/path --vector-density 250 --copy-to /home/hamza/MC-Projects/"+projectname+"/scans/ --orientation portrait", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            console.log('get image with success');
            return;
           
        }
        console.log(`stdout: ${stdout}`);

        exec("auto-multiple-choice getimages /home/hamza/MC-Projects/hbtkd/"+projectname+"/output.pdf --progression-id analyse --list /home/hamza/MC-Projects/"+projectname+"/scans/path --vector-density 250 --copy-to /home/hamza/MC-Projects/"+projectname+"/scans/ --orientation portrait", (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
          if (stderr) {
              console.log(`stderr: ${stderr}`);
              console.log('get image with success');
              return;
             
          }
          console.log(`stdout: ${stdout}`);
        });
      });
    });
  });


});

//generer le tex de examin*************************************************************************************
app.post('/go', (req,res,next)=> {
  var post_data=req.body;
  var projectname=post_data.pn;
  console.log(projectname);
  

exec("cd /home/hamza/MC-Projects/"+projectname+"/  | ls -l ",(error, stdout, stderr) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
  }
  console.log(`stdout: ${stdout}`);
});


});


// prepare examin 1 step
app.post('/preapare', (req,res,next)=> {
  var post_data=req.body;
  var projectname=post_data.pn;
  console.log(projectname);
  

exec("sudo  auto-multiple-choice prepare --with pdflatex --filter plain --filtered-source /home/hamza/MC-Projects/"+projectname+"/DOC-filtered.tex  --out-sujet /home/hamza/MC-Projects/"+projectname+"/DOC-sujet.pdf --out-corrige /home/hamza/MC-Projects/"+projectname+"/DOC-corrige.pdf --out-corrige-indiv /home/hamza/MC-Projects/"+projectname+"/DOC-indiv-solution.pdf --out-catalog /home/hamza/MC-Projects/"+projectname+"/DOC-catalog.pdf --out-calage /home/hamza/MC-Projects/"+projectname+"/DOC-calage.xy --mode s[sc]k --n-copies 0 /home/hamza/MC-Projects/"+projectname+"/source.txt --prefix /home/hamza/MC-Projects/"+projectname+"/ --latex-stdout --data /home/hamza/MC-Projects/"+projectname+"/data"
, (error, stdout, stderr) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      console.log('exam prepared  with success');
      return;
  }
  console.log(`stdout: ${stdout}`);
});
//create various SQLite files in the data directory.
});
app.post('/genmaptex', (req,res,next)=> {
  var post_data=req.body;
  var projectname=post_data.pn;
  console.log(projectname);
  

exec("sudo  auto-multiple-choice meptex --src /home/hamza/MC-Projects/"+projectname+"/DOC-calage.xy --progression-id MEP --progression 1 --data /home/hamza/MC-Projects/"+projectname+"/data", (error, stdout, stderr) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      console.log('created various SQLite  with success');
      return;
     
  }
  console.log(`stdout: ${stdout}`);
});
});
/////get image from pdf

/*app.post('/gencorrection', (req,res,next)=> {
  var post_data=req.body;
  var projectname=post_data.pn;
  console.log(projectname);


  exec(" sudo auto-multiple-choice prepare --with pdflatex --filter plain --filtered-source /home/hamza/MC-Projects/"+projectname+"/DOC-filtered.tex  --out-sujet /home/hamza/MC-Projects/"+projectname+"/DOC-sujet.pdf --out-corrige /home/hamza/MC-Projects/"+projectname+"/DOC-corrige.pdf --out-corrige-indiv /home/hamza/MC-Projects/"+projectname+"/DOC-indiv-solution.pdf --out-catalog /home/hamza/MC-Projects/"+projectname+"/DOC-catalog.pdf --out-calage /home/hamza/MC-Projects/"+projectname+"/DOC-calage.xy --mode s[sc]k --n-copies 0 /home/hamza/MC-Projects/"+projectname+"/source.txt --prefix /home/hamza/MC-Projects/"+projectname+"/ --latex-stdout --data /home/hamza/MC-Projects/"+projectname+"/data"
, (error, stdout, stderr) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      console.log('exam prepared  with success');
      return;
  }
  console.log(`stdout: ${stdout}`);
});
exec("auto-multiple-choice meptex --src /home/hamza/MC-Projects/"+projectname+"/DOC-calage.xy --progression-id MEP --progression 1 --data /home/hamza/MC-Projects/"+projectname+"/data", (error, stdout, stderr) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      console.log('created various SQLite  with success');
      return;
     
  }
  console.log(`stdout: ${stdout}`);
});
  

exec("auto-multiple-choice getimages /home/hamza/MC-Projects/hbtkd/"+projectname+"/output.pdf --progression-id analyse --list /home/hamza/MC-Projects/"+projectname+"/scans/path --vector-density 250 --copy-to /home/hamza/MC-Projects/"+projectname+"/scans/ --orientation portrait", (error, stdout, stderr) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      console.log('get image with success');
      return;
     
  }
  console.log(`stdout: ${stdout}`);
});
exec(" auto-multiple-choice getimages /home/hamza/MC-Projects/hbtkd/"+projectname+"/output.pdf --progression-id analyse --list /home/hamza/MC-Projects/"+projectname+"/scans/path --vector-density 250 --copy-to /home/hamza/MC-Projects/"+projectname+"/scans/ --orientation portrait", (error, stdout, stderr) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      console.log('analyse with success');
      return;
     
  }
  console.log(`stdout: ${stdout}`);
});
exec("auto-multiple-choice analyse  --multiple --tol-marque 0.2,0.2 --prop 0.8 --bw-threshold 0.6 --progression-id analyse --progression 1 --n-procs  --data /home/hamza/MC-Projects/hbtkd/data --projet /home/hamza/MC-Projects/hbtkd/ --cr /home/hamza/MC-Projects/hbtkd/cr --debug /tmp/AMC-DEBUG-KCx5zZ3b.log  --liste-fichiers /home/hamza/MC-Projects/hbtkd/scans/path --no-ignore-red –try-threOnecopiee", (error, stdout, stderr) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      console.log('marked with success');
      return;
     
  }
  console.log(`stdout: ${stdout}`);
});
exec("auto-multiple-choice note --data /home/hamza/MC-Projects/"+projectname+"/data --seuil 0.15 --seuil-up 1 --grain 0.5 --arrondi inf --notemax 20 --plafond --notenull 0 --notemin  --postcorrect-student  --postcorrect-copy --no-postcorrect-set-multiple --progression-id notation --progression 1", (error, stdout, stderr) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      console.log('note with success');
      return;
     
  }
  console.log(`stdout: ${stdout}`);
});});*/


//***************************************scoring**************************************************

app.post('/scoringdata', (req,res,next)=> {
  var post_data=req.body;
  var projectname=post_data.pn;
  console.log(projectname);
  

exec("auto-multiple-choice prepare --mode b --prefix /home/hamza/MC-Projects/"+projectname+"/ /home/hamza/MC-Projects/"+projectname+"/source.tex --data /home/hamza/MC-Projects/"+projectname+"data/"
, (error, stdout, stderr) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
  }
  console.log(`stdout: ${stdout}`);
});




});
//***************************************************************************************************** */
app.get("/getmodule",(req,res,next)=>{
  console.log(req.params.f);

  con.query('SELECT * FROM module ',[req.params.f],function(error,result,fields){
   con.on('error',function(err){
     console.log('[MYSQL]ERROR',err);
   });
   if(result && result.length)
   {
     res.send(result);
     console.log(result)
   }
   else
   {
     res.end(JSON.stringify('No'));
   }
  });
});
app.get("/getclass",(req,res,next)=>{
  console.log(req.params.f);

  con.query('SELECT * FROM class',[req.params.f],function(error,result,fields){
   con.on('error',function(err){
     console.log('[MYSQL]ERROR',err);
   });
   if(result && result.length)
   {
     res.send(result);
     console.log(result)
   }
   else
   {
     res.end(JSON.stringify('No'));
   }
  });
});

app.get("/getexamen/:f",(req,res,next)=>{
  console.log(req.params.f);

  con.query('SELECT * FROM examen WHERE idens = ? ',[req.params.f],function(error,result,fields){
   con.on('error',function(err){
     console.log('[MYSQL]ERROR',err);
   });
   if(result && result.length)
   {
     res.end(JSON.stringify(result));
     console.log(result)
   }
   else
   {
     res.end(JSON.stringify('No'));
   }
  });
});
app.get("/getexamenday/:f",(req,res,next)=>{
  console.log(req.params.f);

  con.query('SELECT * FROM examen where DATEDIFF(CURRENT_TIMESTAMP, date)= -1 and  idens = ? ',[req.params.f],function(error,result,fields){
   con.on('error',function(err){
     console.log('[MYSQL]ERROR',err);
   });
   if(result && result.length)
   {
     res.end(JSON.stringify(result));
     console.log(result)
   }
   else
   {
     res.end(JSON.stringify('No'));
   }
  });
});

app.get("/getexamen2/:f",(req,res,next)=>{
  console.log(req.params.f);

  con.query('SELECT * FROM examen WHERE idens = ? ',[req.params.f],function(error,result,fields){
   con.on('error',function(err){
     console.log('[MYSQL]ERROR',err);
   });
   if(result && result.length)
   {
     res.json(result);
     console.log(result)
   }
   else
   {
     res.end(JSON.stringify('No'));
   }
  });
});


app.get("/getmodule/:f",(req,res,next)=>{
  console.log(req.params.f);

  con.query('SELECT * FROM module WHERE id = ? ',[req.params.f],function(error,result,fields){
   con.on('error',function(err){
     console.log('[MYSQL]ERROR',err);
   });
   if(result && result.length)
   {
     res.end(JSON.stringify(result[0]));
     console.log(result)
   }
   else
   {
     res.end(JSON.stringify('No'));
   }
  });
});
app.get("/getmodule2/:f",(req,res,next)=>{
  console.log(req.params.f);

  con.query('SELECT modulename FROM module WHERE id = ? ;',[req.params.f],function(error,result,fields){
   con.on('error',function(err){
     console.log('[MYSQL]ERROR',err);
   });
   if(result && result.length)
   {
     res.json(result);
     console.log(result)
   }
   else
   {
     res.end(JSON.stringify('No'));
   }
  });
});
app.get("/getclass2/:f",(req,res,next)=>{
  console.log(req.params.f);

  con.query('SELECT pseudoclass FROM class WHERE id = ? ',[req.params.f],function(error,result,fields){
   con.on('error',function(err){
     console.log('[MYSQL]ERROR',err);
   });
   if(result && result.length)
   {
     res.json(result);
     console.log(result)
   }
   else
   {
     res.end(JSON.stringify('No'));
   }
  });
});
app.get("/getclass/:f",(req,res,next)=>{
  console.log(req.params.f);

  con.query('SELECT pseudoclass FROM class WHERE id = ? ',[req.params.f],function(error,result,fields){
   con.on('error',function(err){
     console.log('[MYSQL]ERROR',err);
   });
   if(result && result.length)
   {
     res.end(JSON.stringify(result[0]));
     console.log(result)
   }
   else
   {
     res.end(JSON.stringify('No'));
   }
  });
});


//PASSWORD UTIL
var genRandomString = function (length) {
  return crypto.randomBytes(Math.ceil(length / 2))
      .toString('hex') //convert to hexa format
      .slice(0, length);
};

var sha512 = function (password, salt) {
  var hash = crypto.createHmac('sha512', salt); //Use SHA512
  hash.update(password);
  var value = hash.digest('hex');
  return {
      salt: salt,
      passwordHash: value
  };
};

function saltHashPassword(userPassword) {
  var salt = genRandomString(16);
  var passwordData = sha512(userPassword, salt);
  return passwordData;
}


function checkHashPassword(userPassword, salt) {
  var passwordData = sha512(userPassword, salt);
  return passwordData;
}


app.post('/verif', (req, res, next) => {


  var post_data = req.body;
  var email = post_data.email;
  con.query('Select * From enseignant where email=?', [email], function (err, result, fields) {
      con.on('error', function (err) {
          console.log('[MySQL ERROR]', err);
      });
      if (result && result.length)
          res.json('User already exists!!!');
      else
          res.json('User safe');

  });
});
app.post('/register', (req, res, next) => {
  var post_data = req.body;
  var uid = uuid.v4();
  var plaint_password = post_data.password;
  var hash_data = saltHashPassword(plaint_password);
  var password = hash_data.passwordHash;
  var salt = hash_data.salt;
  var name = post_data.name;
  var email = post_data.email;
  var numtel = post_data.numtel;
  var adresse = post_data.adresse;

  console.log(name);
  console.log(email);
  console.log(password);
  console.log(salt);
  console.log(numtel);
  console.log(adresse);

   con.query('Select * From enseignant where email=?', [email], function (err, result, fields) {
      con.on('error', function (err) {
          console.log('[MySQL ERROR]', err);
      });
      if (result && result.length)
          res.json('User already exists!!!');
      else {
          console.log("imaaaaaaaaaaggggggeee");

      con.query('INSERT INTO enseignant (name, email, encrypted_password, salt, adresse, numtel) VALUES (?,?,?,?,?,?)',
              [name, email, password, salt, adresse, numtel], function (err, result, fields) {
                  con.on('error', function (err) {
                      console.log('[MySQL ERROR]', err);
                      res.json('Register error: ', err);
                  });
                  res.json('Register successful');

              })
      }
  });

});


//login************
app.post('/login', (req, res, next) => {
  var post_data = req.body;
  var user_password = post_data.password;
  var email = post_data.email;

  
  con.query('Select * From enseignant where email=?', [email], function (err, result, fields) {
      con.on('error', function (err) {
          console.log('[MySQL ERROR]', err);
      });
      if (result && result.length) {
          var salt = result[0].salt;
          var encrypted_password = result[0].encrypted_password;
          var hashed_password = checkHashPassword(user_password, salt).passwordHash;

          if (encrypted_password == hashed_password){
              res.end(JSON.stringify(result[0]));
              console.log(result[0]);
             res.send(result[0]);

          }
          else{
              res.end(JSON.stringify('Wrong Password'));
          }

         }
      else {
          res.json('User not exists!!!');
      }
  });

});





// create new amc project

app.post('/newprojet', (req,res,next)=> {
  var post_data=req.body;
  //var projectname=post_data.pn;
  var matiere=post_data.matiere;
  var idmodule=post_data.idmodule;
  var date=post_data.date;
  var idclass=post_data.idclass;
  var idens=post_data.idens;
  var contenu =post_data.cn;
  var nbc=post_data.nb;
  
  //console.log(projectname);
  console.log(date);


con.query('INSERT INTO examen (matiere,  idclass, idens,idmodule) VALUES (?,?,?,?);',
[matiere,  idclass, idens,idmodule], function (err, result, fields) {
    con.on('error', function (err) {
      console.log('[MySQL ERROR]', err);
    });
       
    res.json(result.insertId+matiere);
     console.log(result);
   var route =result.insertId;
   

   //res.json(route);
console.log("1  records Inserted, ID:"+ result.insertId);

exec("sh new_project.sh "+route+matiere, (error, stdout, stderr) => {
    if (error) {
     console.log(`error: ${error.message}`);
     
 }
    if (stderr) {
          
          console.log(`stderr: ${stderr}`);
     
 }
 console.log(`stdout: ${stdout}`);
 console.log('Projet created with success');
     const file = fs.createWriteStream('/home/hamza/MC-Projects/'+route+matiere+'/source.txt');

        file.write(contenu);
        file.end('');



       exec("sudo  auto-multiple-choice prepare --with pdflatex --filter plain --filtered-source /home/hamza/MC-Projects/"+route+matiere+"/DOC-filtered.tex  --out-sujet /home/hamza/MC-Projects/"+route+matiere+"/DOC-sujet.pdf --out-corrige /home/hamza/MC-Projects/"+route+matiere+"/DOC-corrige.pdf --out-corrige-indiv /home/hamza/MC-Projects/"+route+matiere+"/DOC-indiv-solution.pdf --out-catalog /home/hamza/MC-Projects/"+route+matiere+"/DOC-catalog.pdf --out-calage /home/hamza/MC-Projects/"+route+matiere+"/DOC-calage.xy --mode s[sc]k --n-copies "+nbc+" /home/hamza/MC-Projects/"+route+matiere+"/source.txt --prefix /home/hamza/MC-Projects/"+route+matiere+"/ --latex-stdout --data /home/hamza/MC-Projects/"+route+matiere+"/data"
, (error, stdout, stderr) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      console.log('exam prepared  with success');
      return;
  }
  console.log(`stdout: ${stdout}`);
  exec("sudo  auto-multiple-choice meptex --src /home/hamza/MC-Projects/"+route+matiere+"/DOC-calage.xy --progression-id MEP --progression 1 --data /home/hamza/MC-Projects/"+route+matiere+"/data", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        console.log('created various SQLite  with success');
        return;
       
    }
    console.log(`stdout: ${stdout}`);
  });






    });  });





    });

    
   //res.end(route+matiere);   
    
})

//*************************************************************************************************************************** */
app.post('/registerad', (req, res, next) => {
  var post_data = req.body;
  var uid = uuid.v4();
  var plaint_password = post_data.password;
  var hash_data = saltHashPassword(plaint_password);
  var password = hash_data.passwordHash;
  var salt = hash_data.salt;
  var name = post_data.name;
  var email = post_data.email;
  var numtel = post_data.numtel;
  var adresse = post_data.adresse;

  console.log(name);
  console.log(email);
  console.log(password);
  console.log(salt);
  console.log(numtel);
  console.log(adresse);

   con.query('Select * From admin where email=?', [email], function (err, result, fields) {
      con.on('error', function (err) {
          console.log('[MySQL ERROR]', err);
      });
      if (result && result.length)
          res.json('User already exists!!!');
      else {

      con.query('INSERT INTO admin (name, email, encrypted_password, salt, adresse, numtel) VALUES (?,?,?,?,?,?)',
              [name, email, password, salt, adresse, numtel], function (err, result, fields) {
                  con.on('error', function (err) {
                      console.log('[MySQL ERROR]', err);
                      res.json('Register error: ', err);
                  });
                  res.json('Register successful');

              })
      }
  });

});

app.post('/updateprofileT', (req, res, next) => {
  var post_data = req.body;
  var uid = uuid.v4();
  var id = post_data.id;
  var plaint_password = post_data.password;
  var hash_data = saltHashPassword(plaint_password);
  var password = hash_data.passwordHash;
  var salt = hash_data.salt;
  
  
  var numtel = post_data.numtel;
  var adresse = post_data.adresse;
  

  /*console.log(name);
  console.log(email);
  console.log(password);
  console.log(salt);
  console.log(numtel);
  console.log(adresse);*/

   con.query('Update enseignant SET encrypted_password = ? ,salt = ?,adresse = ?, numtel = ?   where id = ? ', [password,salt,adresse,numtel,id], function (err, result, fields) {
      con.on('error', function (err) {
          console.log('[MySQL ERROR]', err);
          res.json('Register error: ', err);
      });
      
                  res.json('update successful');

              })
      })
      app.get('/teachers', (req, res, next) => {


   
        con.query('Select * From enseignant ', function (err, result, fields) {
            con.on('error', function (err) {
                console.log('[MySQL ERROR]', err);
            });
            if (result && result.length)
                res.json(result);
            else
                res.json(err);
    
        });
    });
    app.get('/students', (req, res, next) => {
    
    
       
        con.query('Select * From etudiant ', function (err, result, fields) {
            con.on('error', function (err) {
                console.log('[MySQL ERROR]', err);
            });
            if (result && result.length)
                res.json(result);
            else
                res.json(err);
    
        });
    });
    app.post('/class', (req, res, next) => {
        var post_data = req.body;
        var level = post_data.level;
    
       
        con.query('Select DISTINCT * From class WHERE level =? ', [level],function (err, result, fields) {
            con.on('error', function (err) {
                console.log('[MySQL ERROR]', err);
            });
            if (result && result.length)
                res.json(result);
            else
                res.json(err);
    
        });
    });
    
    app.get('/Allclasses', (req, res, next) => {
    
    
       
      con.query('Select DISTINCT * From class ', function (err, result, fields) {
          con.on('error', function (err) {
              console.log('[MySQL ERROR]', err);
          });
          if (result && result.length)
              res.json(result);
          else
              res.json(err);
  
      });
  });
    app.get('/lvl', (req, res, next) => {
    
    
       
        con.query('Select DISTINCT level From class ', function (err, result, fields) {
            con.on('error', function (err) {
                console.log('[MySQL ERROR]', err);
            });
            if (result && result.length)
                res.json(result);
            else
                res.json(err);
    
        });
    });
app.post('/updateprofileST', (req, res, next) => {
  var post_data = req.body;
  var uid = uuid.v4();
  var id = post_data.id;
  var plaint_password = post_data.password;
  var hash_data = saltHashPassword(plaint_password);
  var password = hash_data.passwordHash;
  var salt = hash_data.salt;
  
  
  var numtel = post_data.numtel;
  var adresse = post_data.adresse;
  

  /*console.log(name);
  console.log(email);
  console.log(password);
  console.log(salt);
  console.log(numtel);
  console.log(adresse);*/

   con.query('Update etudiant SET encrypted_password = ? ,salt = ?,adresse = ?, numtel = ?   where id = ? ', [password,salt,adresse,numtel,id], function (err, result, fields) {
      con.on('error', function (err) {
          console.log('[MySQL ERROR]', err);
          res.json('Register error: ', err);
      });
      
                  res.json('update successful');

              })
      })
app.post('/registerst', (req, res, next) => {
  var post_data = req.body;
  var uid = uuid.v4();
  var plaint_password = post_data.password;
  var hash_data = saltHashPassword(plaint_password);
  var password = hash_data.passwordHash;
  var salt = hash_data.salt;
  var name = post_data.name;
  var email = post_data.email;
  var numtel = post_data.numtel;
  var adresse = post_data.adresse;
  var idclass = post_data.idclass;

  console.log(name);
  console.log(email);
  console.log(password);
  console.log(salt);
  console.log(numtel);
  console.log(adresse);

   con.query('Select * From etudiant where email=?', [email], function (err, result, fields) {
      con.on('error', function (err) {
          console.log('[MySQL ERROR]', err);
      });
      if (result && result.length)
          res.json('User already exists!!!');
      else {
          console.log("imaaaaaaaaaaggggggeee");

      con.query('INSERT INTO etudiant (name, email, encrypted_password, salt, adresse, numtel, idclass) VALUES (?,?,?,?,?,?,?)',
              [name, email, password, salt, adresse, numtel,idclass], function (err, result, fields) {
                  con.on('error', function (err) {
                      console.log('[MySQL ERROR]', err);
                      res.json('Register error: ', err);
                  });
                  res.json('Register successful');

              })
      }
  });

});




app.post('/sm', (req, res, next)=> {
  var post_data = req.body;
  var name = post_data.name;
  var email = post_data.email;
  var nodemailer = require('nodemailer');
  var password = post_data.password;

var transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
  user: 'autocorrectionesprit@gmail.com',
  pass: 'Hatem123456'
}
});


var mailOptions = {
from: 'autocorrectionesprit@gmail.com',
to: email,
subject: 'Welcome to esprit autocorrection',
text: 'Good morning '+name+', now you have an account in esprit autocorrection plateform, you can login using your email and this generated password : '+password+'\n'+' please make sure to change your password using the "edit" tab'
};

transporter.sendMail(mailOptions, function(error, info){
if (error) {
  console.log(error);
} else {
  res.json('Email sent: ' + info.response);
}
});
})
app.post('/delst', (req, res, next) => {


  var post_data = req.body;
  var id = post_data.id;
  con.query('DELETE From etudiant where id=?', [id], function (err, result, fields) {
      con.on('error', function (err) {
          console.log('[MySQL ERROR]', err);
      });
      if (result && result.length)
          res.json('delete successful');
      else
          res.json('delete successful');

  });
});
app.post('/delt', (req, res, next) => {


  var post_data = req.body;
  var id = post_data.id;
  con.query('DELETE From enseignant where id = ?', [id], function (err, result, fields) {
      con.on('error', function (err) {
          console.log('[MySQL ERROR]', err);
      });
      if (result && result.length)
          res.json('delete successful');
      else
          res.json('delete successful');

  });
});

//login************
app.post('/loginad', (req, res, next) => {
  var post_data = req.body;
  var user_password = post_data.password;
  var email = post_data.email;

  console.log('email', email);
  console.log('emaillllllllllllllllll');

  con.query('Select * From admin where email=?', [email], function (err, result, fields) {
      con.on('error', function (err) {
          console.log('[MySQL ERROR]', err);
      });
      if (result && result.length) {
          var salt = result[0].salt;
          var encrypted_password = result[0].encrypted_password;
          var hashed_password = checkHashPassword(user_password, salt).passwordHash;
          if (encrypted_password == hashed_password)
              res.end(JSON.stringify(result[0]));
          else
              res.end(JSON.stringify('Wrong Password'));
      }
      else {
          res.json('User not exists!!!');
      }
  });

});

app.post('/loginst', (req, res, next) => {
  var post_data = req.body;
  var user_password = post_data.password;
  var email = post_data.email;

  console.log('email', email);
  console.log('emaillllllllllllllllll');

  con.query('Select * From etudiant where email=?', [email], function (err, result, fields) {
      con.on('error', function (err) {
          console.log('[MySQL ERROR]', err);
      });
      if (result && result.length) {
          var salt = result[0].salt;
          var encrypted_password = result[0].encrypted_password;
          var hashed_password = checkHashPassword(user_password, salt).passwordHash;
          if (encrypted_password == hashed_password)
              res.end(JSON.stringify(result[0]));
          else
              res.end(JSON.stringify('Wrong Password'));
      }
      else {
          res.json('User not exists!!!');
      }
  });

});
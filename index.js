const express = require('express')
const path = require("path")
const bodyParser = require('body-parser');
const { createPool } = require('mysql');
const mysql = require('mysql')


const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "lab_management",
    connectionLimit: 20
})
 


const ejsMate = require('ejs-mate');
const { release } = require('os');

const port = 3000


const app = express()
app.use(express.static(path.join(__dirname, "/public")))
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));
//----------------------------------------------------------------------------------------------------------
//home page
app.get('/',(req,res)=>{
    console.log("home")
    res.render('home.ejs')
    
})
//admin login
app.get('/admin/login',(req,res)=>{
    console.log("admin_login")
   res.render('admin_login.ejs')
  
})
//user locin
app.get('/user/login',(req,res)=>{
    console.log("user_login")
   res.render('user_login.ejs')
  
})

//admin space
app.get('/adminlogin',(req,res)=>{
    console.log("admin_login")
   res.render('admin_space.ejs')
    
}) 

// //view lab
// app.get('/viewlab',(req,res)=>{
//     console.log("admin_login")
//    res.render('view.ejs')
    
// }) 
// app.get('/updatelab',(req,res)=>{
//     console.log("admin_login")
//    res.render('update_lab.ejs')
    
// }) 
// app.get('/reglab',(req,res)=>{
  
//    res.render('reg_lab.ejs')
    
// })  
app.get('/new_lab',(req,res)=>{
    
   res.render('new_lab.ejs')
    
}) 
 
//.......................................... 
//login admin validation
app.post('/admin/login', (req, res) => {
    //fmuser='h',fmpass='h',fmtype='h';
    let {fmuser,fmpass,fmtype}=req.body
    console.log('data',fmuser,fmpass,fmtype); 
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            var sql = `select * from dbmanagement_login where user_id = '${fmuser}'  AND pass= '${fmpass}' AND type= '${fmtype}')`;
            result.query(sql, (err, rows, fields) => {
                if (err) console.log(err)
                else if( rows[0].pass=fmpass ) {
                    //console.log(rows[0].type)
                    res.redirect('/admin/login')
                }
                else{  
                    res.redirect('/login')
                }
            })
        }
    })

})
app.post('/user/login', (req, res) => {
    //fmuser='h',fmpass='h',fmtype='h';
    let {fmuser,fmpass,fmtype}=req.body
    console.log('data',fmuser,fmpass,fmtype); 
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            var sql = `select * from dbmanagement_login where user_id = '${fmuser}'  AND pass= '${fmpass}' AND type= '${fmtype}')`;
            result.query(sql, (err, rows, fields) => {
                if (err) console.log(err)
                else if( rows[0].pass=fmpass ) {
                    //console.log(rows[0].type)
                    res.redirect('/user/login')
                }
                else{  
                    res.redirect('/login')
                }
            })
        }
    })

})

//new lab
app.post('/new_lab', (req, res) => {
    //fmuser='h',fmpass='h',fmtype='h';
    let {newlab_id,newlab_type,newlab_capacty,newlab_incharge_name,newlab_discripition}=req.body
    console.log('data',newlab_id,newlab_type,newlab_capacty,newlab_incharge_name,newlab_discripition); 
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            var sql = `INSERT INTO lab (l_lab_id,l_type,l_capacty,l_lab_inchargename,l_description)VALUES ('${newlab_id}','${newlab_type}',${newlab_capacty},${newlab_incharge_name},'${newlab_discripition}')`;
            result.query(sql, (err, rows, fields) => {
                if (err) console.log(err)
                else{
                    console.log(fields);
                }
            })
        }
    })

})
//----------------------------------------------------
//Select a labe
app.get('/viewlab', (req, res) => {
    pool.getConnection((err, result) => {
        if (err) console.log(err.message)
        else {
            console.log('student connected')
            console.log(result)
            var sql = `select * from lab;`
            result.query(sql, (err, rows, fiels) => {
                if (err) console.log(err)
                else {
                    console.log(rows)
                    result.release()
                    res.render('view_lab.ejs', { rows })

                }
            })
        }
    })
})
///-------------------------------------------------

app.listen(port, function () {
    console.log("Started")
})

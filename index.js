const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
const port = 8000;

// เก็บ user
let users = []
let counter =1

/*
GET /users สำหรับ get ข้อมูล user ทั้งหมด
POST /user สำหรับสร้าง create user ใหม่บันทึกเข้าไป
PUT /user/:id สำหรับ update ข้อมูล user รายคนที่ต้องการบันทึกเข้าไป
DELETE /user/:id สำหรับลบ user รายคนที่ต้องการออกไป
GET /user/:id สำหรับ get ข้อมูล user รายคนที่ต้องการ
*/
// path = GET /users

app.get('/users/:id', async(req, res) => {  
try{
  let id = req.params.id;
  const results = await conn.query('SELECT * FROM users WHERE id = ?', id)
  if (results[0].length == 0) {
    throw {statusCode: 404, message: 'User not found'}
  }
  res.json(results[0][0])
} catch (error) {
  console.error('errorMessage',error.message)
  let statusCode = error.statusCode || 500
  res.status(statusCode).json({
    message: 'something went wrong',
    errorMessage: error.message
  })
}

// path = POST/user
app.post('/users', (req, res) => {
  try{
    let user = req.body;
    let user = req.body;
  const results = await conn.query('INSERT INTO users SET ?',user)
  console.log('results',results)
  res.json({
    message: 'user created',
    data: results[0]
  })
  } catch (error) {
      res.status(500).json({
        message: 'something went wrong',
        errorMessage: error.message
      })   
  }
})

// path = PUT /user/:id
app.put('/user/:id', async (req, res) => {
  
  try{
    let id = req.params.id;
  let updateUser = req.body;
  const results = await conn.query(
    'UPDATE users SET ? WHERE id = ?',
    [updateUser, id]
  )
  res.json({
    message: 'User Update Complete',
    data: results[0]
  })
  } catch (error) {
      console.error('errorMessage',error.message)   
      res.status(500).json({
        message: 'something went wrong',
        errorMessage: error.message
      })   
  }


  res.json({
    message: 'User updated',
    data: {
      user: updateUser,
      indexUpdated: selectedIndex
    }
 });
})

// path = DELETE /user/:id
app.delete('/user/:id', (req, res) => {
  try {
    let id = req.params.id;
  const results = await conn.query('DELETE FROM Users WHERE id = ?',id)
  res.json({
    message: 'Delete User Complete',
    data: results[0]
  })
  } catch (error) {
      console.error('errorMessage',error.message)   
      res.status(500).json({
        message: 'something went wrong',
        errorMessage: error.message
      })   
    }
  });



app.listen(port, (req,res) => {
  console.log('Server is running on port '+ port);

});
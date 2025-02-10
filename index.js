const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
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
app.get('/users', (req, res) => {
  res.json(users);
})

// path = POST/user
app.post('/user', (req, res) => {
  let user = req.body;
  user.id = counter
  counter += 1
  users.push(user);
  res.json({
    message: 'User created',
    user: user
  });
})

// path = PUT /user/:id
app.put('/user/:id', (req, res) => {
  let id = req.params.id;
  let updateUser = req.body;
// หา index ของ user ที่ต้องการ update
  let selectedIndex = users.findIndex(user => user.id == id)
// update ข้อมูล user
if (updateUser.firstname) {
  users[selectedIndex].firstname = updateUser.firstname
}
  
if (updateUser.lastname) {
  user[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname
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
  let id = req.params.id;
  // หา index ของ user ที่ต้องการลบ
  let selectedIndex = users.findIndex(user => user.id == id)

  users.splice(selectedIndex, 1)
  res.json({
    message: "Deleted Completed",
    indexDeleted: selectedIndex
  });
})

app.listen(port, (req,res) => {
  console.log('Server is running on port '+ port);
});
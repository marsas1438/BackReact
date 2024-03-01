const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors())

const students = [
    {
        "id": 1,
        "career": "Software engineering" ,
        "firstName": "Marco",
        "surName": "Sastoque",
        "birthDate": new Date('1995-04-29'),
        "sex": "M" 
    },
    {
        "id": 2,
        "career": "Software engineering" ,
        "firstName": "Lina",
        "surName": "Medina",
        "birthDate": new Date('1995-03-29'),
        "sex": "F" 
    },
    {
        "id": 3,
        "career": "Software engineering" ,
        "firstName": "Carlos",
        "surName": "Perez",
        "birthDate": new Date('1999-01-07'),
        "sex": "M" 
    }
]

const PORT = process.env.PORT || 3000

app.get('/students', (req, res) => {
    res.json(students);
});

app.get('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(e => e.id === studentId);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
});

app.post('/students', (req, res) => {
    const newStudent = req.body;
    console.log(newStudent);
    newStudent.id = students.length + 1;
    students.push(newStudent);
    res.json(newStudent);
});

app.delete('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(e => e.id === studentId);
    if (studentIndex !== -1) {
      const removedStudent = students.splice(studentIndex, 1)[0];
      res.json(removedStudent);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  });

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
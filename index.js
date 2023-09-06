import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
const secretKey = '1234'; 
const payload = {
    "usuario": "tulio",
    "apellido": "triviño"
};

let token = jwt.sign(payload, secretKey);

// Rutas

app.get('/token', (req, res) => {
    try {
        res.sendStatus(200);
        console.log(`El token es: ${token}`);
    } catch (error) {
        console.log(error)
    } 
});

app.post('/verificar', (req, res) => {
    try {
        if (token === req.body.token) {
            let verificar = jwt.verify(req.body.token, secretKey, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
            res.sendStatus(200)
            console.log('Token verificado.')
        } else {
            console.log('Token incorrecto')
        }
    } catch (error) {
        console.log(error)
    }
});

app.listen(3000, () => {
    console.log('Servicio levantado en http://localhost:3000')
})
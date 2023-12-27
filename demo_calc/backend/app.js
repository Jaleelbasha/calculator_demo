const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Importing Calc schema
const Calc = require('./models/calculate');

const app = express();

// Connecting database through mongodb atlas url
mongoose.connect("mongodb+srv://Jaleel:Jaleel123@cluster0.muqyjro.mongodb.net/test-calculator?retryWrites=true&w=majority")
    .then(() => {
        console.log('Connected to database!');
    })
    .catch((error) => {
        console.log('Error', error);
        console.log('Connection failed!');
    })

// For extracting JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// To remove CORS errors.
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    )
    // Passing request to next middleware/route function.
    next();
})

// Storing result in database and returing response.
app.post("/api/store", (req, res, next) => {
    // Evaluating for result.
    let evaluatedResult = eval(req.body.value);

    // Assigning values to schema.
    const calc = new Calc({
        value: evaluatedResult
    });
     // Saving in database.
    calc.save()
    .then((result) => {
        // Fetching saved document and returnig to api call.
        console.log("Result: ", result.value);
        res.status(200).json({
            message: 'Saved successfully',
            data: result.value
         });
    });

   
});

module.exports = app;
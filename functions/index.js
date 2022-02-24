const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51KW15JSCMrLhn7MUYGIXDSWfpjHVSSWU63dVLrZswAbtK3KjwR1PVU7mP5OX5A6gE1CZzDxHzKwZzBcJcWOYTK0b00aGlCx6tk')

//API


//App config
const app = express();

//Middleware
app.use(cors({ origin: true }));
app.use(express.json());

//API routes
app.get("/", (request, response) => response.status(200).send('hola'));

app.post("/payment/create", async (request, response) => {
    const total = request.query.total;

    console.log('Request recieved', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunit of currency
        currency: "inr",
    });

    //201 = ok - created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

//Listen command
exports.api = functions.https.onRequest(app);


//example endpoint
//http://localhost:5001/clone-c378e/us-central1/api
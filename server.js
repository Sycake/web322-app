/*********************************************************************************
WEB322 – Assignment 02
I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
No part of this assignment has been copied manually or electronically from any other source (including 3rd party web sites) or distributed to other students.

Name: Ke Ke
Student ID: 153229224
Date: 2024.06.11
Vercel Web App URL: 
GitHub Repository URL: 

********************************************************************************/ 

const express = require('express');
const path = require('path');
const storeService = require('./store-service');  // Assuming store-service.js is in the same directory

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Redirect from root to /about
app.get('/', (req, res) => {
    res.redirect('/about');
});

// Serve the About page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Shop route returns all published items as JSON
app.get('/shop', (req, res) => {
    storeService.getPublishedItems()
        .then(items => {
            res.json(items);
        })
        .catch(err => {
            res.status(500).json({ message: "Error retrieving published items: " + err });
        });
});

// Items route returns all items as JSON
app.get('/items', (req, res) => {
    storeService.getAllItems()
        .then(items => {
            res.json(items);
        })
        .catch(err => {
            res.status(500).json({ message: "Error retrieving all items: " + err });
        });
});


// Categories route returns all categories as JSON
app.get('/categories', (req, res) => {
    storeService.getCategories()
        .then(categories => {
            res.json(categories);
        })
        .catch(err => {
            res.status(500).json({ message: "Error retrieving categories: " + err });
        });
});


// 404 - Not Found handler for unmatched routes
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Initialize store data before starting the server
storeService.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Failed to initialize data:', error);
        process.exit(1); // Exit if data cannot be initialized
    });


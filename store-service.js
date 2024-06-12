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
const fs = require('fs');
const path = require('path');

// File paths
const itemsFilePath = path.join(__dirname, 'data', 'items.json');
const categoriesFilePath = path.join(__dirname, 'data', 'categories.json');

let items = [];
let categories = [];

// Initialize data
function initialize() {
    return new Promise((resolve, reject) => {
        fs.readFile(itemsFilePath, 'utf8', (err, data) => {
            if (err) {
                reject("Unable to read items file");
                return;
            }
            items = JSON.parse(data);

            fs.readFile(categoriesFilePath, 'utf8', (err, data) => {
                if (err) {
                    reject("Unable to read categories file");
                    return;
                }   
                categories = JSON.parse(data);
                resolve();
            });
        });
    });
}


function getAllItems() {
    return new Promise((resolve, reject) => {
        if (items.length === 0) {
            reject("No items returned");
        } else {
            resolve(items);
        }
    });
}

function getPublishedItems() {
    return new Promise((resolve, reject) => {
        const publishedItems = items.filter(item => item.published);
        if (publishedItems.length === 0) {
            reject("No published items returned");
        } else {
            resolve(publishedItems);
        }
    });
}

// Get categories
function getCategories() {
    return new Promise((resolve, reject) => {
        if (categories.length === 0) {
            reject("No categories returned");
        } else {
            resolve(categories);
        }
    });
}


module.exports = {
    initialize,
    getAllItems,
    getPublishedItems,
    getCategories
};
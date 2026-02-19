Invoice Management System

A full-stack Invoice Management System built using Angular, Node.js, Express, and MySQL.

This application allows users to create invoices, add line items, record payments, and automatically calculate totals, tax, balance, and invoice status.

Overview

The system provides complete invoice lifecycle management including:

Invoice creation

Line item management

Automatic subtotal and tax calculation

Payment tracking

Status updates (Draft, Partial, Paid)

Balance tracking

Archive and restore functionality

Features

Create and view invoices

Add invoice line items (description, quantity, unit price)

Automatic subtotal calculation

Tax percentage support

Add payments to invoices

Automatic invoice status updates:

DRAFT

PARTIAL

PAID

Balance due tracking

Archive and restore invoices

Invoice Calculations

The system performs automatic financial calculations:

Subtotal = Sum of (Quantity × Unit Price)

Tax Amount = Subtotal × (Tax Percentage / 100)

Total = Subtotal + Tax

Amount Paid = Sum of all recorded payments

Balance Due = Total − Amount Paid

Technology Stack
Frontend

Angular

TypeScript

HTML

CSS

Backend

Node.js

Express

mysql2 (Promise-based)

Database

MySQL

Project Structure
invoice-app/
│
├── frontend/      Angular application
├── backend/       Express API
│   ├── db.js
│   ├── server.js
│
└── README.md

Backend Setup

Navigate to the backend directory:

cd backend


Install dependencies:

npm install


Create the MySQL database:

CREATE DATABASE invoice_db;
USE invoice_db;


Update db.js with your MySQL credentials:

host: 'localhost',
user: 'root',
password: 'your_password',
database: 'invoice_db'


Start the backend server:

node server.js


The backend runs at:

http://localhost:3000

Frontend Setup

Navigate to the frontend directory:

cd frontend


Install dependencies:

npm install


Start the Angular development server:

ng serve


The frontend runs at:

http://localhost:4200

API Endpoints
Method	Endpoint	Description
GET	/api/invoices	Retrieve all invoices
GET	/api/invoices/:id	Retrieve invoice details
POST	/api/invoices	Create a new invoice
POST	/api/invoices/:id/payments	Add payment to invoice
POST	/api/invoices/:id/archive	Archive an invoice
POST	/api/invoices/:id/restore	Restore an archived invoice
Learning Outcomes

This project demonstrates:

Full-stack application development

RESTful API design

MySQL database integration

Async/await with promise-based database handling

Angular HTTP client integration

Business logic implementation for financial calculations

Handling ENUM constraints and database validation

Author

Datla Maheeja
Full-Stack Developer
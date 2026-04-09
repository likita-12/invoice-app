# 📄 Invoice Management System

A full-stack **Invoice Management System** built using **Angular, Node.js, Express, and MySQL**.

This application allows users to create invoices, manage line items, track payments, and automatically calculate totals, tax, balance, and invoice status.

---

## 🚀 Overview

The system provides complete invoice lifecycle management:

- Create invoices  
- Manage line items  
- Automatic subtotal and tax calculation  
- Record payments  
- Track invoice status (Draft, Partial, Paid)  
- Balance tracking  
- Archive and restore invoices  

---

## 🧩 Features

- Create and view invoices  
- Add invoice line items (description, quantity, unit price)  
- Automatic subtotal calculation  
- Tax percentage support  
- Add payments to invoices  
- Automatic invoice status updates:
  - **DRAFT**
  - **PARTIAL**
  - **PAID**
- Balance due tracking  
- Archive and restore invoices  

---

## 🧮 Invoice Calculations

Subtotal = Sum of (Quantity × Unit Price)

Tax Amount = Subtotal × (Tax Percentage / 100)

Total = Subtotal + Tax

Amount Paid = Sum of all recorded payments

Balance Due = Total − Amount Paid


---

## 🛠️ Tech Stack

### Frontend
- Angular
- TypeScript
- HTML
- CSS

### Backend
- Node.js
- Express.js
- mysql2 (Promise-based)

### Database
- MySQL

---

## 📁 Project Structure
```bash
invoice-app/
│
├── backend/
│ ├── db.js
│ ├── server.js
│ ├── package.json
│ └── package-lock.json
│
├── frontend/
│ ├── .vscode/
│ │ ├── extensions.json
│ │ ├── launch.json
│ │ └── tasks.json
│ │
│ ├── src/
│ │ ├── app/
│ │ │ ├── create-invoice/
│ │ │ │ ├── create-invoice.component.ts
│ │ │ │ ├── create-invoice.component.html
│ │ │ │ ├── create-invoice.component.css
│ │ │ │ └── create-invoice.component.spec.ts
│ │ │ │
│ │ │ ├── app.component.ts
│ │ │ ├── app.component.html
│ │ │ ├── app.component.spec.ts
│ │ │ └── app.module.ts
│ │ │
│ │ ├── assets/
│ │ │ └── .gitkeep
│ │ │
│ │ ├── favicon.ico
│ │ ├── index.html
│ │ ├── main.ts
│ │ └── styles.css
│ │
│ ├── angular.json
│ ├── package.json
│ ├── package-lock.json
│ ├── tsconfig.json
│ ├── tsconfig.app.json
│ ├── tsconfig.spec.json
│ ├── .editorconfig
│ ├── .gitignore
│ └── README.md
│
└── README.md
```

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
```
Configure Database (db.js)
```
host: 'localhost',
user: 'root',
password: 'your_password',
database: 'invoice_db'
```
Run Backend Server
```
node server.js
```
Backend runs on:
👉 http://localhost:3000

💻 Frontend Setup
```
cd frontend
npm install
ng serve
```
Frontend runs on:
👉 http://localhost:4200

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/invoices | Retrieve all invoices |
| GET    | /api/invoices/:id | Retrieve invoice details |
| POST   | /api/invoices | Create a new invoice |
| POST   | /api/invoices/:id/payments | Add payment |
| POST   | /api/invoices/:id/archive | Archive an invoice |
| POST   | /api/invoices/:id/restore | Restore an archived invoice |


## 🎯 Learning Outcomes

- Full-stack application development  
- RESTful API design  
- MySQL database integration  
- Async/await with promise-based queries  
- Angular HTTP client integration  
- Business logic implementation for financial calculations  
- Handling ENUM constraints and validation  

---

## 👨‍💻 Author

**Bojja Likita Reddy**  
Full-Stack Developer  

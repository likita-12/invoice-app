require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Invoice API Running");
});


// ✅ CREATE INVOICE (🔥 THIS WAS MISSING)
app.post("/api/invoices", async (req, res) => {
  try {
    console.log("Incoming data:", req.body);

    const { invoiceNumber, customerName, taxPercent } = req.body;

    if (!invoiceNumber || !customerName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const query = `
      INSERT INTO invoices (invoice_number, customer_name, tax_percentage)
      VALUES (?, ?, ?)
    `;

    const [result] = await db.promise().query(query, [
      invoiceNumber,
      customerName,
      taxPercent
    ]);

    console.log("✅ Invoice created:", result.insertId);

    res.json({
      message: "Invoice created successfully",
      id: result.insertId
    });

  } catch (error) {
    console.error("❌ Create invoice error:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// GET ALL
app.get('/api/invoices', async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT * FROM invoices ORDER BY id DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// GET BY ID
app.get('/api/invoices/:id', async (req, res) => {
  try {
    const invoiceId = req.params.id;

    const [invoice] = await db.promise().query(
      `SELECT * FROM invoices WHERE id = ?`,
      [invoiceId]
    );

    if (invoice.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    const [lines] = await db.promise().query(
      `SELECT * FROM invoice_lines WHERE invoiceId = ?`,
      [invoiceId]
    );

    const [payments] = await db.promise().query(
      `SELECT * FROM payments WHERE invoiceId = ?`,
      [invoiceId]
    );

    res.json({
      invoice: invoice[0],
      lines,
      payments
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// PAYMENTS
app.post("/api/invoices/:id/payments", async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const amount = Number(req.body.amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than 0" });
    }

    const [invoiceResult] = await db.promise().query(
      "SELECT * FROM invoices WHERE id = ?",
      [invoiceId]
    );

    if (invoiceResult.length === 0) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    const invoice = invoiceResult[0];

    const [lines] = await db.promise().query(
      "SELECT * FROM invoice_lines WHERE invoiceId = ?",
      [invoiceId]
    );

    const subtotal = lines.reduce((sum, item) => {
      return sum + Number(item.lineTotal || 0);
    }, 0);

    const taxAmount = subtotal * (Number(invoice.tax_percentage) / 100);
    const total = subtotal + taxAmount;

    const [payments] = await db.promise().query(
      "SELECT * FROM payments WHERE invoiceId = ?",
      [invoiceId]
    );

    const amountPaid = payments.reduce((sum, p) => sum + Number(p.amount), 0);
    const balanceDue = total - amountPaid;

    if (amount > balanceDue) {
      return res.status(400).json({ message: "Overpayment not allowed" });
    }

    await db.promise().query(
      "INSERT INTO payments (invoiceId, amount, paymentDate) VALUES (?, ?, CURDATE())",
      [invoiceId, amount]
    );

    const newAmountPaid = amountPaid + amount;
    const newBalance = total - newAmountPaid;
    const newStatus = newBalance === 0 ? "PAID" : "PARTIAL";

    await db.promise().query(
      "UPDATE invoices SET amount_paid=?, balance_due=?, status=? WHERE id=?",
      [newAmountPaid, newBalance, newStatus, invoiceId]
    );

    res.json({
      message: "Payment added successfully",
      newAmountPaid,
      newBalance,
      status: newStatus
    });

  } catch (error) {
    console.error("Payment route error:", error);
    res.status(500).json(error);
  }
});


// ARCHIVE
app.post("/api/invoices/:id/archive", async (req, res) => {
  try {
    const invoiceId = req.params.id;

    await db.promise().query(
      "UPDATE invoices SET is_archived = true WHERE id = ?",
      [invoiceId]
    );

    res.json({ message: "Invoice archived successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});


// RESTORE
app.post("/api/invoices/:id/restore", async (req, res) => {
  try {
    const invoiceId = req.params.id;

    await db.promise().query(
      "UPDATE invoices SET is_archived = false WHERE id = ?",
      [invoiceId]
    );

    res.json({ message: "Invoice restored successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});

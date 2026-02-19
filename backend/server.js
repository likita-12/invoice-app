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
app.get('/api/invoices/:id', async (req, res) => {
  try {
    const invoiceId = req.params.id;

    const [invoice] = await db.query(
      `SELECT * FROM invoices WHERE id = ?`,
      [invoiceId]
    );

    if (invoice.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    const [lines] = await db.query(
      `SELECT * FROM invoice_lines WHERE invoiceId = ?`,
      [invoiceId]
    );

    const [payments] = await db.query(
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


app.post("/api/invoices/:id/payments", async (req, res) => {
  try {
    console.log("=== PAYMENT ROUTE HIT ===");

    const invoiceId = req.params.id;
    const amount = Number(req.body.amount);

    console.log("Invoice ID:", invoiceId);
    console.log("Amount:", amount);

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than 0" });
    }

    // 1️⃣ Check invoice exists
    const [invoiceResult] = await db.query(
      "SELECT * FROM invoices WHERE id = ?",
      [invoiceId]
    );

    if (invoiceResult.length === 0) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    const invoice = invoiceResult[0];

    // 2️⃣ Get invoice lines
    const [lines] = await db.query(
      "SELECT * FROM invoice_lines WHERE invoiceId = ?",
      [invoiceId]
    );

    const subtotal = lines.reduce((sum, item) => {
      return sum + Number(item.lineTotal || 0);
    }, 0);


    const taxAmount = subtotal * (Number(invoice.taxPercent) / 100);
    const total = subtotal + taxAmount;

    // 3️⃣ Get payments
    const [payments] = await db.query(
      "SELECT * FROM payments WHERE invoiceId = ?",
      [invoiceId]
    );

    const amountPaid = payments.reduce((sum, p) => sum + Number(p.amount), 0);
    const balanceDue = total - amountPaid;

    if (amount > balanceDue) {
      return res.status(400).json({ message: "Overpayment not allowed" });
    }

    // 4️⃣ Insert payment
    await db.query(
      "INSERT INTO payments (invoiceId, amount, paymentDate) VALUES (?, ?, CURDATE())",
      [invoiceId, amount]
    );

    const newAmountPaid = amountPaid + amount;
    const newBalance = total - newAmountPaid;
    const newStatus = newBalance === 0 ? "PAID" : "PARTIAL";


    // 5️⃣ Update invoice
    await db.query(
      "UPDATE invoices SET amountPaid=?, balanceDue=?, status=? WHERE id=?",
      [newAmountPaid, newBalance, newStatus, invoiceId]
    );

    console.log("Payment added successfully");

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




app.post("/api/invoices/:id/archive", (req, res) => {
  const invoiceId = req.params.id;

  db.query(
    "UPDATE invoices SET isArchived = true WHERE id = ?",
    [invoiceId],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Invoice archived successfully" });
    }
  );
});

app.post("/api/invoices/:id/restore", (req, res) => {
  const invoiceId = req.params.id;

  db.query(
    "UPDATE invoices SET isArchived = false WHERE id = ?",
    [invoiceId],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Invoice restored successfully" });
    }
  );
});
app.get('/api/invoices', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT *
      FROM invoices
      ORDER BY id DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});





app.listen(3000, () => {
  console.log("Server running on port 3000");
});

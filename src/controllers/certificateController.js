const express = require('express');
const router = express.Router();
const pdfService = require('../services/pdfService');
const mailService = require('../services/mailService');


// POST /api/interns/:id/complete
router.post('/interns/:id/complete', async (req, res) => {
try {
const internId = req.params.id;
// In real app: fetch intern from DB. Here assume name & email provided
const { name, email, role, signatoryName, signatoryTitle } = req.body;


if (!name || !email) {
return res.status(400).json({ error: 'name and email required in body for demo' });
}


// 1) Generate PDF
const pdfBuffer = await pdfService.generateCertificate({ name, role, signatoryName, signatoryTitle });


// 2) Save to disk or upload to S3 - pdfService can return path or URL
const saved = await pdfService.savePdfToLocal({ buffer: pdfBuffer, filename: `certificate_${internId}.pdf` });


// 3) Send email
await mailService.sendCertificateEmail({ to: email, name, attachment: { filename: `certificate_${internId}.pdf`, content: pdfBuffer } });


// 4) record issuance in DB (omitted here)


res.json({ ok: true, message: 'Certificate generated & emailed', path: saved.path });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'internal_error', details: err.message });
}
});


module.exports = router;

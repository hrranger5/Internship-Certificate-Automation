const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');


const TEMPLATE_PATH = path.join(__dirname, '..', '..', 'templates', 'certificate-template.pdf');
const OUTPUT_DIR = process.env.STORAGE_LOCAL_PATH || path.join(process.cwd(), 'generated');


async function generateCertificate({ name, role = '', signatoryName = '', signatoryTitle = '' }) {
// Load a blank PDF certificate template (recommended: a single-page background design)
const existingPdfBytes = await fs.readFile(TEMPLATE_PATH);


const pdfDoc = await PDFDocument.load(existingPdfBytes);


// Embed a readable font (or custom font from assets)
const font = await pdfDoc.embedFont(StandardFonts.Helvetica);


const pages = pdfDoc.getPages();
const page = pages[0];
const { width, height } = page.getSize();


// Example: draw intern name centered
const fontSizeName = 32;
const nameWidth = font.widthOfTextAtSize(name, fontSizeName);
page.drawText(name, {
x: (width - nameWidth) / 2,
y: height * 0.55,
size: fontSizeName,
font,
});


// Role / description
if (role) {
const roleSize = 18;
const roleWidth = font.widthOfTextAtSize(role, roleSize);
page.drawText(role, {
x: (width - roleWidth) / 2,
y: height * 0.50,
size: roleSize,
font,
});
}


// Signatory
const signSize = 14;
const signText = `${signatoryName || 'Signatory'}\n${signatoryTitle || ''}`;
page.drawText(signText, {
x: width * 0.65,
y: height * 0.20,
size: signSize,
font,
});


// Optional: add date
const dateStr = new Date().toLocaleDateString('en-GB');
page.drawText(dateStr, {
x: width * 0.15,
y: height * 0.20,
size: 12,
font,
});


const pdfBytes = await pdfDoc.save();
return Buffer.from(pdfBytes);
}


async function savePdfToLocal({ buffer, filename }) {
await fs.mkdir(OUTPUT_DIR, { recursive: true });
const filePath = path.join(OUTPUT_DIR, filename);
await fs.writeFile(filePath, buffer);
module.exports = { generateCertificate, savePdfToLocal };

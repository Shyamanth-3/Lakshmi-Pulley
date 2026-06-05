import nodemailer from 'nodemailer';

// --- HTML Sanitization ---
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// --- Email Template ---
function buildEmailHTML(data) {
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  // Build technical details rows
  let technicalRows = '';
  if (data.productCategory === 'V-Pulleys') {
    technicalRows = `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 14px; width: 40%; vertical-align: top;">Motor Pulley Size</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #1F2937; font-size: 14px; font-weight: 500;">${sanitize(data.motorPulleySize) || '—'}</td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 14px; width: 40%; vertical-align: top;">Driven Equipment Pulley Size</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #1F2937; font-size: 14px; font-weight: 500;">${sanitize(data.drivenPulleySize) || '—'}</td>
      </tr>
    `;
  } else {
    technicalRows = `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 14px; width: 40%; vertical-align: top;">Power to Transmit</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #1F2937; font-size: 14px; font-weight: 500;">${sanitize(data.powerToTransmit) || '—'}</td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 14px; width: 40%; vertical-align: top;">Speed of Shafts (RPM)</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #1F2937; font-size: 14px; font-weight: 500;">${sanitize(data.shaftSpeed) || '—'}</td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 14px; width: 40%; vertical-align: top;">Driving Shaft Diameter</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #1F2937; font-size: 14px; font-weight: 500;">${sanitize(data.drivingShaftDia) || '—'}</td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 14px; width: 40%; vertical-align: top;">Driven Shaft Diameter</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #1F2937; font-size: 14px; font-weight: 500;">${sanitize(data.drivenShaftDia) || '—'}</td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 14px; width: 40%; vertical-align: top;">Motor / Prime Mover Type</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #1F2937; font-size: 14px; font-weight: 500;">${sanitize(data.motorType) || '—'}</td>
      </tr>
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 14px; width: 40%; vertical-align: top;">Duty Hours per Day</td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #1F2937; font-size: 14px; font-weight: 500;">${sanitize(data.dutyHours) || '—'}</td>
      </tr>
    `;
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Product Enquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0B2447; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0B2447;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; width: 100%;">
          
          <!-- HEADER -->
          <tr>
            <td style="background: linear-gradient(135deg, #0B2447 0%, #19376D 100%); border-radius: 16px 16px 0 0; padding: 40px 32px; text-align: center; border-bottom: 3px solid #A5D7E8;">
              <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; color: #FFFFFF; letter-spacing: -0.5px;">
                Lakshmi Engineering Enterprises
              </h1>
              <div style="display: inline-block; background-color: rgba(165, 215, 232, 0.15); border: 1px solid rgba(165, 215, 232, 0.3); border-radius: 20px; padding: 6px 20px; margin-top: 12px;">
                <span style="color: #A5D7E8; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px;">New Product Enquiry</span>
              </div>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background-color: #F3F4F6; padding: 32px 24px;">

              <!-- Contact Information Card -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFFFFF; border-radius: 12px; border: 1px solid #E5E7EB; margin-bottom: 24px; overflow: hidden;">
                <tr>
                  <td style="background-color: #19376D; padding: 14px 20px;">
                    <h2 style="margin: 0; font-size: 15px; font-weight: 600; color: #FFFFFF; text-transform: uppercase; letter-spacing: 1px;">
                      👤 Contact Information
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 14px; width: 40%; vertical-align: top;">Full Name</td>
                        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #1F2937; font-size: 14px; font-weight: 600;">${sanitize(data.fullName)}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 14px; vertical-align: top;">Company</td>
                        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #1F2937; font-size: 14px; font-weight: 500;">${sanitize(data.companyName) || '—'}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 14px; vertical-align: top;">Email</td>
                        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #1F2937; font-size: 14px; font-weight: 500;">
                          <a href="mailto:${sanitize(data.email)}" style="color: #19376D; text-decoration: none;">${sanitize(data.email)}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 16px; color: #6B7280; font-size: 14px; vertical-align: top;">Phone</td>
                        <td style="padding: 12px 16px; color: #1F2937; font-size: 14px; font-weight: 500;">
                          <a href="tel:${sanitize(data.phone)}" style="color: #19376D; text-decoration: none;">${sanitize(data.phone)}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Product Requirements Card -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFFFFF; border-radius: 12px; border: 1px solid #E5E7EB; margin-bottom: 24px; overflow: hidden;">
                <tr>
                  <td style="background-color: #19376D; padding: 14px 20px;">
                    <h2 style="margin: 0; font-size: 15px; font-weight: 600; color: #FFFFFF; text-transform: uppercase; letter-spacing: 1px;">
                      📦 Product Requirements
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 14px; width: 40%; vertical-align: top;">Category</td>
                        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #1F2937; font-size: 14px; font-weight: 500;">
                          <span style="display: inline-block; background-color: #EFF6FF; color: #19376D; padding: 3px 12px; border-radius: 12px; font-size: 13px; font-weight: 600;">${sanitize(data.productCategory)}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 14px; vertical-align: top;">Quantity</td>
                        <td style="padding: 12px 16px; border-bottom: 1px solid #E5E7EB; color: #1F2937; font-size: 14px; font-weight: 500;">${sanitize(data.quantity) || '—'}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 16px; color: #6B7280; font-size: 14px; vertical-align: top;">Description</td>
                        <td style="padding: 12px 16px; color: #1F2937; font-size: 14px; line-height: 1.6;">${sanitize(data.description) || '—'}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Technical Details Card -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFFFFF; border-radius: 12px; border: 1px solid #E5E7EB; overflow: hidden;">
                <tr>
                  <td style="background-color: #19376D; padding: 14px 20px;">
                    <h2 style="margin: 0; font-size: 15px; font-weight: 600; color: #FFFFFF; text-transform: uppercase; letter-spacing: 1px;">
                      ⚙️ Technical Specifications
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      ${technicalRows}
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color: #0B2447; border-radius: 0 0 16px 16px; padding: 28px 32px; text-align: center; border-top: 3px solid #19376D;">
              <p style="margin: 0 0 6px 0; color: #A5D7E8; font-size: 12px;">
                📅 Submitted: ${timestamp}
              </p>
              <p style="margin: 0 0 6px 0; color: #576CBC; font-size: 12px;">
                🌐 Source: lakshmipulleys.in
              </p>
              <p style="margin: 12px 0 0 0; color: #3A4F7A; font-size: 11px; font-style: italic;">
                This email was generated automatically from the website enquiry form.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// --- Serverless Handler ---
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      fullName,
      companyName,
      email,
      phone,
      productCategory,
      quantity,
      description,
      // Pulley fields
      motorPulleySize,
      drivenPulleySize,
      // Coupling fields
      powerToTransmit,
      shaftSpeed,
      drivingShaftDia,
      drivenShaftDia,
      motorType,
      dutyHours,
    } = req.body;

    // --- Validate required fields ---
    const errors = [];
    if (!fullName || !fullName.trim()) errors.push('Full Name is required');
    if (!email || !email.trim()) errors.push('Email Address is required');
    if (!phone || !phone.trim()) errors.push('Phone Number is required');

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email.trim())) {
      errors.push('Invalid email address format');
    }

    if (errors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }

    // --- Verify env vars ---
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, COMPANY_EMAIL } = process.env;
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !COMPANY_EMAIL) {
      console.error('Missing SMTP environment variables');
      return res.status(500).json({ error: 'Server configuration error. Please contact the administrator.' });
    }

    // --- Create transporter ---
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT, 10),
      secure: parseInt(SMTP_PORT, 10) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // --- Build email ---
    const data = {
      fullName: fullName?.trim(),
      companyName: companyName?.trim(),
      email: email?.trim(),
      phone: phone?.trim(),
      productCategory: productCategory || 'Not specified',
      quantity: quantity?.trim(),
      description: description?.trim(),
      motorPulleySize: motorPulleySize?.trim(),
      drivenPulleySize: drivenPulleySize?.trim(),
      powerToTransmit: powerToTransmit?.trim(),
      shaftSpeed: shaftSpeed?.trim(),
      drivingShaftDia: drivingShaftDia?.trim(),
      drivenShaftDia: drivenShaftDia?.trim(),
      motorType: motorType?.trim(),
      dutyHours: dutyHours?.trim(),
    };

    const htmlContent = buildEmailHTML(data);

    // --- Send email ---
    await transporter.sendMail({
      from: `"Lakshmi Pulleys Website" <${SMTP_USER}>`,
      to: COMPANY_EMAIL,
      subject: `New Enquiry: ${data.productCategory} — ${data.fullName}`,
      html: htmlContent,
      replyTo: data.email,
    });

    return res.status(200).json({ success: true, message: 'Enquiry submitted successfully' });
  } catch (error) {
    console.error('Enquiry submission error:', error);
    return res.status(500).json({ error: 'Failed to send enquiry. Please try again later.' });
  }
}

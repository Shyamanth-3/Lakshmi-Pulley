import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeading from '../components/SectionHeading';
import { site, enquiryPhones, enquiryProductOptions } from '../data/site';
import { getProduct, getProductByName } from '../data/products';
import { Send, Sparkles, Loader2, AlertCircle } from 'lucide-react';

const DRAFT_KEY = 'lp-enquiry-draft';

const initialFormData = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  productCategory: enquiryProductOptions[0],
  quantity: '',
  description: '',
  drawingReference: '',
  // Pulley fields
  motorPulleySize: '',
  drivenPulleySize: '',
  // Coupling fields
  powerToTransmit: '',
  shaftSpeed: '',
  drivingShaftDia: '',
  drivenShaftDia: '',
  motorType: '',
  dutyHours: '',
};

// Reads a saved draft. Never trusts its shape — malformed/foreign localStorage content is discarded
// rather than crashing the form, and only known field names ever reach state.
function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return null;
    return { ...initialFormData, ...parsed };
  } catch {
    return null;
  }
}

function validate(formData) {
  const errors = {};
  if (!formData.fullName.trim()) errors.fullName = 'Full name is required.';
  if (!formData.email.trim() && !formData.phone.trim()) {
    errors.email = 'Provide an email address or a phone number.';
    errors.phone = 'Provide an email address or a phone number.';
  } else if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (!formData.quantity.trim()) errors.quantity = 'Quantity is required.';
  return errors;
}

// Native input/textarea with a visible label and accessible error association — used for every
// field below instead of a custom control library.
function Field({ id, label, required, error, as = 'input', className = '', children, ...props }) {
  const Tag = as;
  return (
    <div className={className}>
      <label htmlFor={id} className={required ? 'field-required' : ''}>{label}</label>
      {children ?? (
        <Tag id={id} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} {...props} />
      )}
      {error && <p id={`${id}-error`} className="field-error">{error}</p>}
    </div>
  );
}

export default function Enquiry() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Untrusted URL input, resolved only through canonical product data — an invalid slug is simply ignored.
  const productSlug = searchParams.get('product');
  const variantId = searchParams.get('variant');
  const sizeCode = searchParams.get('size');
  const contextProduct = productSlug ? getProduct(productSlug) : undefined;
  const contextVariant = contextProduct?.variants?.find((v) => v.id === variantId);

  const [formData, setFormData] = useState(() => {
    const draft = loadDraft() ?? initialFormData;
    if (!contextProduct) return draft;
    const contextLine = [
      contextVariant && `Variant: ${contextVariant.name}`,
      sizeCode && `Size: ${sizeCode}`,
    ].filter(Boolean).join(' · ');
    return {
      ...draft,
      productCategory: contextProduct.name,
      // Only prefill an empty description — never overwrite text the user already had in a saved draft.
      description: draft.description || contextLine,
    };
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Save the draft as the user types; skip the initial render's write-back of what we just loaded.
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
    } catch {
      // localStorage unavailable (private mode, quota, SSR) — draft persistence is a convenience, not required.
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const startOver = () => {
    setFormData(initialFormData);
    setFieldErrors({});
    setError('');
    try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError('Please fix the highlighted fields below.');
      return;
    }
    setFieldErrors({});
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error('Server returned an invalid response. Make sure the app is deployed to Vercel.');
      }

      if (!response.ok) {
        throw new Error(result.details ? result.details.join(', ') : result.error || 'Something went wrong');
      }

      try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
      navigate('/enquiry/thank-you', {
        state: {
          fullName: formData.fullName,
          productName: formData.productCategory,
          variantName: contextVariant?.name,
          sizeCode: sizeCode || undefined,
          // The current API does not return one; wired through for if/when it does — never fabricated here.
          reference: result.reference,
        },
      });
    } catch (err) {
      // Draft is left exactly as-is (the save effect already persisted it) so nothing is lost on retry.
      setError(err.message || 'Failed to submit enquiry. Please try again, or contact us directly below.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const rfqFields = getProductByName(formData.productCategory)?.rfq?.fields;
  const isPulleyEnquiry = rfqFields === 'v-pulley' || rfqFields === 'timing-pulley';

  return (
    <div className="bg-surface pb-20 pt-8">
      <div className="container mb-4">
        <Breadcrumb items={[{ label: 'Request Enquiry' }]} />
      </div>

      <div className="container">
        {/* SectionHeading (shared, out of scope to redesign here) only renders an h2, so add the page's
            real h1 for heading hierarchy — visually hidden since SectionHeading already shows the title. */}
        <h1 className="sr-only">Product Enquiry Form</h1>
        <SectionHeading
          title="Product Enquiry Form"
          subtitle="Provide us with details about your requirements and our technical team will get back to you."
        />

        <div className="flex flex-col lg:flex-row gap-12">

            {/* Form */}
            <div className="lg:w-2/3">
              <form onSubmit={handleSubmit} noValidate className="panel">

                {error && (
                  <div role="alert" className="mb-6 flex items-start gap-3 bg-error-bg border border-error text-error px-5 py-4 rounded-md">
                    <AlertCircle size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-sm">Submission Failed</p>
                      <p className="text-sm mt-1">{error}</p>
                    </div>
                  </div>
                )}

                {/* 1. Product */}
                <h3 className="mb-6 pb-2 border-b border-primary-50">1. Product</h3>
                {contextProduct && (
                  <p className="text-meta mb-4">
                    Preselected from the {contextProduct.name} page
                    {contextVariant && <> — {contextVariant.name}</>}
                    {sizeCode && <>, size {sizeCode}</>}. Change it below if needed.
                  </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <Field id="productCategory" label="Product" required>
                    <select id="productCategory" name="productCategory" value={formData.productCategory} onChange={handleChange}>
                      {enquiryProductOptions.map((name) => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                  </Field>
                  <Field
                    id="quantity" label="Quantity Required" required
                    name="quantity" type="text" placeholder="e.g. 50 nos"
                    value={formData.quantity} onChange={handleChange}
                    error={fieldErrors.quantity}
                  />
                </div>

                {/* 2. Technical Requirements */}
                <h3 className="mb-6 pb-2 border-b border-primary-50 flex justify-between items-end">
                  2. Technical Requirements
                  <span className="text-meta bg-primary-50 px-2 py-1 rounded">Optional</span>
                </h3>
                {isPulleyEnquiry ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <Field id="motorPulleySize" label="Size of Pulley on Motor" name="motorPulleySize" type="text" placeholder="Eg: 250mm PCD X 5 Grooves X SPB" value={formData.motorPulleySize} onChange={handleChange} />
                    <Field id="drivenPulleySize" label="Size of Pulley on Driven Eqp." name="drivenPulleySize" type="text" placeholder="Eg: 475mm PCD X 5 Grooves X SPB" value={formData.drivenPulleySize} onChange={handleChange} />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <Field id="powerToTransmit" label="Power to be Transmitted (KW / HP)" name="powerToTransmit" type="text" placeholder="e.g. 15 KW" value={formData.powerToTransmit} onChange={handleChange} />
                    <Field id="shaftSpeed" label="Speed of shafts (RPM)" name="shaftSpeed" type="text" placeholder="e.g. 1500 RPM" value={formData.shaftSpeed} onChange={handleChange} />
                    <Field id="drivingShaftDia" label="Diameter of Driving Shaft" name="drivingShaftDia" type="text" placeholder="e.g. 40mm" value={formData.drivingShaftDia} onChange={handleChange} />
                    <Field id="drivenShaftDia" label="Diameter of Driven Shaft" name="drivenShaftDia" type="text" placeholder="e.g. 50mm" value={formData.drivenShaftDia} onChange={handleChange} />
                    <Field id="motorType" label="Type of Motor / Prime mover" name="motorType" type="text" value={formData.motorType} onChange={handleChange} />
                    <Field id="dutyHours" label="No. of Duty Hours per Day" name="dutyHours" type="text" placeholder="e.g. 12 hours" value={formData.dutyHours} onChange={handleChange} />
                  </div>
                )}

                {/* 3. Application / Duty */}
                <h3 className="mb-6 pb-2 border-b border-primary-50">3. Application / Duty</h3>
                <div className="mb-10">
                  <Field
                    id="description" label="Application / duty description" as="textarea"
                    name="description" rows="3" placeholder="Describe where you intend to use this..."
                    value={formData.description} onChange={handleChange}
                  />
                </div>

                {/* 4. Drawing / Supporting Document */}
                <h3 className="mb-6 pb-2 border-b border-primary-50">4. Drawing / Supporting Document</h3>
                <div className="mb-10">
                  <Field
                    id="drawingReference" label="Drawing / reference (optional)"
                    name="drawingReference" type="text" placeholder="Link to a drawing (Drive, WeTransfer, etc.) or a reference note"
                    value={formData.drawingReference} onChange={handleChange}
                  />
                  <p className="field-help">We don't accept file uploads yet — share a link, or note that you'll email a drawing separately.</p>
                </div>

                {/* 5. Contact Details */}
                <h3 className="mb-6 pb-2 border-b border-primary-50">5. Contact Details</h3>
                <p className="text-meta mb-4">Full name and at least one of email or phone are required.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <Field id="fullName" label="Full Name" required name="fullName" type="text" value={formData.fullName} onChange={handleChange} error={fieldErrors.fullName} />
                  <Field id="companyName" label="Company Name" name="companyName" type="text" value={formData.companyName} onChange={handleChange} />
                  <Field id="email" label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} error={fieldErrors.email} />
                  <Field id="phone" label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} error={fieldErrors.phone} />
                </div>

                {/* 6. Review / submit — everything above stays visible and editable, so there's no separate review step */}
                <p className="text-sm text-primary-600 mb-4">
                  By submitting this form you agree to our <Link to="/privacy" className="text-primary-600 hover:text-accent font-medium">Privacy Policy</Link>.
                </p>
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-primary-100">
                  <button type="button" onClick={startOver} className="btn btn-outline">
                    Start Over
                  </button>
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary text-lg px-8">
                    {isSubmitting ? (
                      <>Sending... <Loader2 size={20} className="animate-spin" aria-hidden="true" /></>
                    ) : (
                      <>Send Enquiry <Send size={20} aria-hidden="true" /></>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar info */}
            <div className="lg:w-1/3">
              <div className="panel bg-primary-700 border-primary-700 text-white sticky top-24">
                <div className="w-12 h-12 bg-white/20 rounded-md flex items-center justify-center mb-6">
                  <Sparkles className="text-accent" size={24} aria-hidden="true" />
                </div>
                <h3 className="text-white mb-4">Need help selecting?</h3>
                <p className="text-primary-100 leading-relaxed mb-6">
                  If you need technical assistance selecting the right drive or coupling size, fill in the optional technical fields above.
                </p>
                <div className="bg-white/10 p-4 rounded-md border border-white/10">
                  <div className="font-semibold text-accent mb-1">Direct Contact</div>
                  {enquiryPhones.map((phone) => (
                    <div key={phone} className="text-sm text-primary-100">{phone}</div>
                  ))}
                  <div className="mt-2">
                    {site.contact.emails.map((e) => (
                      <div key={e} className="text-sm text-primary-100">{e}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
      </div>
    </div>
  );
}

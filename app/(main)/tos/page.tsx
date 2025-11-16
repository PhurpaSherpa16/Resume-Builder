import { Metadata } from "next";

export const metadata : Metadata = {
    title : "Terms of Services."
}

export default function page() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-6 tex-black">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">
        Welcome to our Resume and CV Builder (referred to as “we”, “our” or
        “the Service”). By accessing or using our platform, you agree to comply
        with the following Terms of Service. If you do not agree, please do not
        use our service.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Service Overview</h2>
      <p className="mb-4">
        We provide an online resume and CV building service that allows users to
        create, edit, download, and manage professional resumes. Some features
        may require a paid subscription.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. Account Registration</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>You must provide accurate information during sign-up.</li>
        <li>You are responsible for maintaining your account security.</li>
        <li>Any activity under your account is your responsibility.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Subscription & Payments</h2>
      <p className="mb-4">
        We use <strong>Stripe</strong> as our secure payment gateway. By
        subscribing, you authorize us to charge your provided payment method.
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Subscriptions auto-renew unless cancelled.</li>
        <li>Prices may change, but you will be notified in advance.</li>
        <li>
          All payments are handled by Stripe. We do not store your card
          information.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Refund Policy</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>
          Due to the nature of digital services, we do not guarantee refunds.
        </li>
        <li>
          If you face a billing issue, contact support and we will review your
          request.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Permitted Use</h2>
      <p className="mb-4">
        You agree NOT to:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Copy or redistribute our templates or service code.</li>
        <li>Use automated systems to scrape or extract data.</li>
        <li>Upload harmful, illegal, or misleading information.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Content Ownership</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Your resume data belongs to you.</li>
        <li>
          Our templates, platform, and UI components remain our intellectual
          property.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">7. Data & Privacy</h2>
      <p className="mb-4">
        We follow industry best practices to protect your data. For more
        details, please check our Privacy Policy.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">8. Termination</h2>
      <p className="mb-4">
        We reserve the right to suspend or terminate your account if you violate
        these Terms.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">9. Disclaimer</h2>
      <p className="mb-4">
        Our service is provided “as is” without warranties. We are not
        responsible for job outcomes, hiring results, or loss caused by using
        our platform.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">10. Limitation of Liability</h2>
      <p className="mb-4">
        To the maximum extent permitted by law, we are not liable for indirect,
        incidental, or consequential damages.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">11. Governing Law</h2>
      <p className="mb-4">
        These Terms are governed by applicable laws of your jurisdiction unless
        otherwise required by local regulations.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Contact</h2>
      <p>
        If you have questions regarding these Terms, contact us at:
        <br />
        <strong>support@yourdomain.com</strong>
      </p>

      <p className="mt-8 text-sm opacity-70">
        Last Updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
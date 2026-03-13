import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-xl font-bold mb-3 text-base-content">{title}</h2>
    <div className="text-base-content/70 leading-relaxed space-y-3">{children}</div>
  </div>
);

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-base-100 pb-24 rounded-4xl">
      <Helmet>
        <title>Privacy Policy — BokBok</title>
        <meta name="description" content="Read BokBok's Privacy Policy to learn how we handle your data and protect your privacy on our real-time chat platform." />
        <link rel="canonical" href="https://bokbok.chat/privacy" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Background glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-[30%] left-[-10%] w-[30%] h-[50%] bg-primary/20 blur-[100px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
        {/* Header */}
        <div className="mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 badge badge-secondary badge-outline mb-4 px-4 py-3 text-xs font-semibold tracking-wider uppercase">
            Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Privacy{" "}
            <span className="bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          <p className="text-base-content/60 text-lg">
            Last updated: <span className="font-medium text-base-content/80">March 13, 2026</span>
          </p>
          <div className="divider mt-6" />
        </div>

        {/* Body */}
        <div className="animate-fade-in-up animation-delay-100">
          <Section title="1. Introduction">
            <p>
              BokBok ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, and safeguard information when you use our real-time chat
              service at bokbok.chat.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>BokBok is designed with minimal data collection in mind. We may collect:</p>
            <ul className="list-disc list-inside space-y-1.5 mt-2 ml-2">
              <li>
                <strong className="text-base-content/90">Display Names:</strong> The nickname you choose
                when joining a room. This is stored in your browser's local storage only.
              </li>
              <li>
                <strong className="text-base-content/90">Chat Messages:</strong> Messages sent in rooms
                are stored temporarily in our database and deleted when the room expires.
              </li>
              <li>
                <strong className="text-base-content/90">Usage Data:</strong> We may collect anonymous
                usage data (e.g., page visits, browser type) via server logs for operational purposes.
              </li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-1.5 mt-2 ml-2">
              <li>Provide and maintain the BokBok chat service.</li>
              <li>Enable real-time communication within chat rooms.</li>
              <li>Monitor and improve the performance and stability of the service.</li>
              <li>Detect and prevent abuse, spam, or violations of our Terms of Service.</li>
            </ul>
          </Section>

          <Section title="4. Local Storage">
            <p>
              BokBok uses your browser's <code className="bg-base-300 px-1.5 py-0.5 rounded text-sm font-mono">localStorage</code> to remember your chosen nickname for each chat room. This data lives
              entirely on your device and is never transmitted to our servers independently. You can clear
              it at any time through your browser settings.
            </p>
          </Section>

          <Section title="5. Data Retention">
            <p>
              Chat messages are stored only for the lifetime of the room to which they belong. Once a room
              expires, all messages within it are permanently and automatically deleted from our servers.
              We do not retain message history beyond the room's expiration.
            </p>
          </Section>

          <Section title="6. Cookies">
            <p>
              BokBok does not use tracking cookies or advertising cookies. We may use session-level
              browser storage for core functionality only.
            </p>
          </Section>

          <Section title="7. Third-Party Services">
            <p>
              We do not sell, trade, or share your personal information with third parties for marketing
              purposes. We may use infrastructure providers (e.g., hosting, CDN) who may have access to
              server logs, subject to their own privacy policies.
            </p>
          </Section>

          <Section title="8. Security">
            <p>
              We take reasonable technical measures to protect the data we hold. However, no method of
              transmission over the Internet or electronic storage is 100% secure. Use BokBok accordingly
              and avoid sharing sensitive personal information in chat rooms.
            </p>
          </Section>

          <Section title="9. Children's Privacy">
            <p>
              BokBok is not intended for children under 13. We do not knowingly collect information from
              children. If you believe a child has provided personal information through our service,
              please contact us and we will promptly remove it.
            </p>
          </Section>

          <Section title="10. Your Rights">
            <p>
              Since BokBok collects minimal data and stores nicknames only in your local browser,
              most data is under your direct control. For any data held on our servers (chat messages
              within active rooms), you may contact us to request deletion.
            </p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. We will notify users by updating
              the "Last updated" date at the top of this page. Continued use of BokBok after changes
              constitutes acceptance of the revised Policy.
            </p>
          </Section>

          <Section title="12. Contact Us">
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us at{" "}
              <a href="mailto:hello@bokbok.chat" className="text-primary font-medium hover:underline">
                hello@bokbok.chat
              </a>
              .
            </p>
          </Section>
        </div>

        {/* Footer nav */}
        <div className="divider mt-10" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 text-sm text-base-content/50">
          <Link to="/" className="hover:text-primary transition-colors">← Back to Home</Link>
          <Link to="/terms" className="hover:text-primary transition-colors">Terms &amp; Conditions →</Link>
        </div>
      </div>
    </div>
  );
}

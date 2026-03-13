import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-xl font-bold mb-3 text-base-content">{title}</h2>
    <div className="text-base-content/70 leading-relaxed space-y-3">{children}</div>
  </div>
);

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-base-100 pb-24 rounded-4xl">
      <Helmet>
        <title>Terms & Conditions — BokBok</title>
        <meta name="description" content="Read BokBok's Terms and Conditions to understand the rules governing your use of our real-time chat platform." />
        <link rel="canonical" href="https://bokbok.chat/terms" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-[30%] right-[-5%] w-[30%] h-[50%] bg-secondary/10 blur-[100px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
        {/* Header */}
        <div className="mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 badge badge-primary badge-outline mb-4 px-4 py-3 text-xs font-semibold tracking-wider uppercase">
            Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Terms &amp;{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Conditions
            </span>
          </h1>
          <p className="text-base-content/60 text-lg">
            Last updated: <span className="font-medium text-base-content/80">March 13, 2026</span>
          </p>
          <div className="divider mt-6" />
        </div>

        {/* Body */}
        <div className="animate-fade-in-up animation-delay-100">
          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using BokBok ("the Service"), you agree to be bound by these Terms and
              Conditions. If you do not agree with any part of these terms, you may not use the Service.
            </p>
          </Section>

          <Section title="2. Description of Service">
            <p>
              BokBok is a real-time, ephemeral public chat platform. Users can create or join temporary
              chat rooms without creating an account. Rooms automatically expire based on the expiration
              time set at creation.
            </p>
          </Section>

          <Section title="3. User Conduct">
            <p>You agree not to use BokBok to:</p>
            <ul className="list-disc list-inside space-y-1.5 mt-2 ml-2">
              <li>Post, transmit, or share content that is unlawful, defamatory, abusive, or offensive.</li>
              <li>Harass, threaten, or intimidate other users.</li>
              <li>Share personal information of others without their consent.</li>
              <li>Distribute spam, malware, or any malicious content.</li>
              <li>Attempt to disrupt or compromise the integrity or security of the Service.</li>
              <li>Impersonate any person or entity.</li>
            </ul>
          </Section>

          <Section title="4. Intellectual Property">
            <p>
              All content, design, logos, and trademarks displayed on BokBok are the property of BokBok or
              its respective owners. You may not copy, reproduce, or redistribute any part of the Service
              without explicit written permission.
            </p>
          </Section>

          <Section title="5. Ephemeral Nature of Content">
            <p>
              All chat rooms and their contents are temporary. BokBok does not guarantee the persistence of
              any messages or data. Once a room expires, all associated messages are permanently deleted. You
              are solely responsible for saving any content you wish to keep.
            </p>
          </Section>

          <Section title="6. Privacy">
            <p>
              Your use of BokBok is also governed by our{" "}
              <Link to="/privacy" className="text-primary font-medium hover:underline">
                Privacy Policy
              </Link>
              , which is incorporated into these Terms by reference.
            </p>
          </Section>

          <Section title="7. Disclaimer of Warranties">
            <p>
              BokBok is provided on an "as is" and "as available" basis without warranties of any kind,
              either express or implied. We do not warrant that the Service will be uninterrupted, error-free,
              or free of viruses or other harmful components.
            </p>
          </Section>

          <Section title="8. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, BokBok and its operators shall not be liable for any
              indirect, incidental, special, or consequential damages arising from your use of or inability
              to use the Service.
            </p>
          </Section>

          <Section title="9. Changes to Terms">
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately
              upon posting to the Service. Your continued use of BokBok after any changes constitutes your
              acceptance of the new Terms.
            </p>
          </Section>

          <Section title="10. Contact">
            <p>
              If you have any questions about these Terms, please contact us at{" "}
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
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy →</Link>
        </div>
      </div>
    </div>
  );
}

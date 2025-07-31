import { Metadata } from "next"
import Link from "next/link"
import { BlurFade } from "components/magicui/blur-fade"
import { TextAnimate } from "components/magicui/text-animate"

export const metadata: Metadata = {
  title: "Privacy Policy - AI Copilot Vibe",
  description: "Privacy Policy for AI Copilot Vibe - Learn how we protect and handle your data.",
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <BlurFade delay={0.1}>
        <div className="mb-8">
          <TextAnimate animation="slideUp" duration={0.8} className="mb-4 text-4xl font-bold">
            Privacy Policy
          </TextAnimate>
          <TextAnimate animation="fadeIn" delay={0.2} duration={0.8} className="text-muted-foreground text-lg">
            {`Last updated: ${new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}`}
          </TextAnimate>
        </div>
      </BlurFade>

      <BlurFade delay={0.3}>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Introduction</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              AI Copilot Vibe ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you use our AI coding
              assistant service, including our website and related services (collectively, the "Service").
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By using our Service, you agree to the collection and use of information in accordance with this Privacy
              Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Information We Collect</h2>

            <h3 className="mb-3 text-xl font-medium">Personal Information</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              We may collect the following personal information:
            </p>
            <ul className="text-muted-foreground mb-6 space-y-2">
              <li>• Email address (for account creation and communication)</li>
              <li>• Name and profile information</li>
              <li>• Payment information (processed securely through third-party providers)</li>
              <li>• GitHub account information (when you connect your GitHub account)</li>
            </ul>

            <h3 className="mb-3 text-xl font-medium">Usage Information</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              We automatically collect certain information about your use of our Service:
            </p>
            <ul className="text-muted-foreground mb-6 space-y-2">
              <li>• API usage patterns and frequency</li>
              <li>• Code interaction data (anonymized and aggregated)</li>
              <li>• Device information and browser type</li>
              <li>• IP address and location data</li>
              <li>• Service performance and error logs</li>
            </ul>

            <h3 className="mb-3 text-xl font-medium">GitHub Integration Data</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              When you connect your GitHub account, we may access:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>• Repository information and metadata</li>
              <li>• Code content for AI assistance purposes</li>
              <li>• Commit history and branch information</li>
              <li>• Collaboration and contribution data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              We use the collected information for the following purposes:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>• Providing and maintaining our AI coding assistant service</li>
              <li>• Processing payments and managing subscriptions</li>
              <li>• Improving our AI models and service quality</li>
              <li>• Sending important service updates and notifications</li>
              <li>• Providing customer support and technical assistance</li>
              <li>• Analyzing usage patterns to enhance user experience</li>
              <li>• Ensuring service security and preventing abuse</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Data Security and Storage</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="text-muted-foreground mb-6 space-y-2">
              <li>• Encryption of data in transit and at rest</li>
              <li>• Regular security audits and monitoring</li>
              <li>• Access controls and authentication measures</li>
              <li>• Secure data centers and infrastructure</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Your code and repository data are processed securely and are not stored permanently unless necessary for
              service functionality. We do not share your code with third parties or use it for training purposes
              without explicit consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Information Sharing and Disclosure</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              We do not sell, trade, or rent your personal information. We may share information in the following
              circumstances:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>• With service providers who assist in operating our Service</li>
              <li>• When required by law or to protect our rights</li>
              <li>• In connection with a business transfer or acquisition</li>
              <li>• With your explicit consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Your Rights and Choices</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              You have the following rights regarding your personal information:
            </p>
            <ul className="text-muted-foreground mb-6 space-y-2">
              <li>• Access and review your personal data</li>
              <li>• Request correction of inaccurate information</li>
              <li>• Request deletion of your account and data</li>
              <li>• Opt-out of marketing communications</li>
              <li>• Data portability and export options</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              To exercise these rights, please contact us at privacy@aicopilotvibe.com.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Cookies and Tracking</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              We use cookies and similar technologies to enhance your experience:
            </p>
            <ul className="text-muted-foreground space-y-2">
              <li>• Essential cookies for service functionality</li>
              <li>• Analytics cookies to understand usage patterns</li>
              <li>• Preference cookies to remember your settings</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Third-Party Services</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Our Service integrates with third-party services, including:
            </p>
            <ul className="text-muted-foreground mb-6 space-y-2">
              <li>• GitHub (for repository access and integration)</li>
              <li>• Payment processors (for subscription management)</li>
              <li>• Analytics providers (for service improvement)</li>
              <li>• AI model providers (for coding assistance)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              These services have their own privacy policies, and we encourage you to review them.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. We ensure
              appropriate safeguards are in place to protect your data in accordance with applicable data protection
              laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Service is not intended for children under 13 years of age. We do not knowingly collect personal
              information from children under 13. If you become aware that a child has provided us with personal
              information, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy
              Policy periodically.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="text-muted-foreground space-y-2">
              <p>Email: privacy@aicopilotvibe.com</p>
              <p>
                Website:{" "}
                <Link href="/" className="text-primary hover:underline">
                  aicopilotvibe.com
                </Link>
              </p>
            </div>
          </section>
        </div>
      </BlurFade>

      <BlurFade delay={0.5}>
        <div className="border-border mt-12 border-t pt-8">
          <Link href="/" className="text-primary hover:text-primary/80 inline-flex items-center transition-colors">
            ← Back to Home
          </Link>
        </div>
      </BlurFade>
    </>
  )
}

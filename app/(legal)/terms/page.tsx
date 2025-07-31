import { Metadata } from "next"
import Link from "next/link"
import { BlurFade } from "components/magicui/blur-fade"
import { TextAnimate } from "components/magicui/text-animate"

export const metadata: Metadata = {
  title: "Terms of Service - AI Copilot Vibe",
  description: "Terms of Service for AI Copilot Vibe - Learn about our service terms and conditions.",
}

export default function TermsOfServicePage() {
  return (
    <>
      <BlurFade delay={0.1}>
        <div className="mb-8">
          <TextAnimate animation="slideUp" duration={0.8} className="mb-4 text-4xl font-bold">
            Terms of Service
          </TextAnimate>
          <div className="text-muted-foreground text-lg">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </div>
        </div>
      </BlurFade>

      <BlurFade delay={0.3}>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Agreement to Terms</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              These Terms of Service ("Terms") govern your use of AI Copilot Vibe ("Service") operated by AI Copilot
              Vibe ("us," "we," or "our"). By accessing or using our Service, you agree to be bound by these Terms.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If you disagree with any part of these Terms, then you may not access the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Description of Service</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              AI Copilot Vibe provides an AI-powered coding assistant service that offers:
            </p>
            <ul className="text-muted-foreground mb-6 space-y-2">
              <li>• Unlimited access to AI coding assistance</li>
              <li>• GitHub repository integration</li>
              <li>• Daily token resets for continuous usage</li>
              <li>• Code analysis and suggestions</li>
              <li>• Development workflow optimization</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              The Service is designed to enhance developer productivity and is provided on a subscription basis.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">User Accounts and Registration</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              To access certain features of the Service, you must create an account. When creating an account, you agree
              to:
            </p>
            <ul className="text-muted-foreground mb-6 space-y-2">
              <li>• Provide accurate, current, and complete information</li>
              <li>• Maintain and update your account information</li>
              <li>• Keep your account credentials secure and confidential</li>
              <li>• Accept responsibility for all activities under your account</li>
              <li>• Notify us immediately of any unauthorized use</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              You must be at least 13 years old to create an account. If you are under 18, you represent that you have
              your parent's or guardian's permission to use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Subscription and Payment Terms</h2>

            <h3 className="mb-3 text-xl font-medium">Subscription Plans</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Our Service is offered through various subscription plans. Current pricing is available on our website and
              may be updated from time to time.
            </p>

            <h3 className="mb-3 text-xl font-medium">Payment Processing</h3>
            <ul className="text-muted-foreground mb-6 space-y-2">
              <li>• Payments are processed securely through third-party providers</li>
              <li>• Subscriptions automatically renew unless cancelled</li>
              <li>• You authorize us to charge your payment method for recurring fees</li>
              <li>• All fees are non-refundable except as required by law</li>
            </ul>

            <h3 className="mb-3 text-xl font-medium">Cancellation and Refunds</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              You may cancel your subscription at any time through your account settings. Cancellation will take effect
              at the end of your current billing period. We do not provide refunds for partial months of service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Acceptable Use Policy</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT
              to:
            </p>
            <ul className="text-muted-foreground mb-6 space-y-2">
              <li>• Use the Service for any illegal or unauthorized purpose</li>
              <li>• Violate any applicable laws or regulations</li>
              <li>• Infringe upon the rights of others</li>
              <li>• Transmit malicious code, viruses, or harmful content</li>
              <li>• Attempt to gain unauthorized access to our systems</li>
              <li>• Reverse engineer or attempt to extract source code</li>
              <li>• Use the Service to compete with or harm our business</li>
              <li>• Share your account credentials with others</li>
              <li>• Exceed reasonable usage limits or abuse the Service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">GitHub Integration</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              When you connect your GitHub account to our Service:
            </p>
            <ul className="text-muted-foreground mb-6 space-y-2">
              <li>• You grant us permission to access your repositories as specified</li>
              <li>• You remain responsible for your GitHub account and repositories</li>
              <li>• You must comply with GitHub's terms of service</li>
              <li>• You can revoke access at any time through GitHub or our Service</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              We will only access the repositories and data you explicitly authorize and will use this access solely to
              provide our Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Intellectual Property Rights</h2>

            <h3 className="mb-3 text-xl font-medium">Our Rights</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The Service, including its software, design, content, and trademarks, is owned by us and protected by
              intellectual property laws. You may not copy, modify, distribute, or create derivative works without our
              permission.
            </p>

            <h3 className="mb-3 text-xl font-medium">Your Rights</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              You retain all rights to your code and content. By using our Service, you grant us a limited license to
              process your code solely for the purpose of providing our AI assistance features.
            </p>

            <h3 className="mb-3 text-xl font-medium">AI-Generated Content</h3>
            <p className="text-muted-foreground leading-relaxed">
              Code suggestions and content generated by our AI are provided as-is. You are responsible for reviewing,
              testing, and validating any AI-generated content before use.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Privacy and Data Protection</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Your privacy is important to us. Our collection and use of your information is governed by our Privacy
              Policy, which is incorporated into these Terms by reference.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate security measures to protect your data, but you acknowledge that no system is
              completely secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Service Availability and Modifications</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              We strive to provide reliable service but cannot guarantee 100% uptime. We may:
            </p>
            <ul className="text-muted-foreground mb-6 space-y-2">
              <li>• Temporarily suspend the Service for maintenance</li>
              <li>• Modify or discontinue features with reasonable notice</li>
              <li>• Update these Terms as necessary</li>
              <li>• Implement usage limits to ensure fair access</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              We will provide advance notice of significant changes when possible.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Disclaimers and Limitations</h2>

            <h3 className="mb-3 text-xl font-medium">Service Disclaimers</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR
              IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>

            <h3 className="mb-3 text-xl font-medium">AI Limitations</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Our AI assistance is not perfect and may produce incorrect, incomplete, or inappropriate suggestions. You
              are responsible for:
            </p>
            <ul className="text-muted-foreground mb-6 space-y-2">
              <li>• Reviewing and testing all AI-generated code</li>
              <li>• Ensuring compliance with applicable laws and standards</li>
              <li>• Maintaining appropriate backups and version control</li>
              <li>• Not relying solely on AI suggestions for critical decisions</li>
            </ul>

            <h3 className="mb-3 text-xl font-medium">Limitation of Liability</h3>
            <p className="text-muted-foreground leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR
              CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE SERVICE.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Termination</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Either party may terminate this agreement at any time:
            </p>
            <ul className="text-muted-foreground mb-6 space-y-2">
              <li>• You may cancel your subscription and delete your account</li>
              <li>• We may suspend or terminate accounts for violations of these Terms</li>
              <li>• We may discontinue the Service with reasonable notice</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              Upon termination, your access to the Service will cease, and we may delete your account data in accordance
              with our Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Dispute Resolution</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Any disputes arising from these Terms or your use of the Service will be resolved through:
            </p>
            <ul className="text-muted-foreground mb-6 space-y-2">
              <li>• Good faith negotiation between the parties</li>
              <li>• Binding arbitration if negotiation fails</li>
              <li>• Applicable law of the jurisdiction where we operate</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">General Provisions</h2>

            <h3 className="mb-3 text-xl font-medium">Entire Agreement</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and us
              regarding the Service.
            </p>

            <h3 className="mb-3 text-xl font-medium">Severability</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full
              force and effect.
            </p>

            <h3 className="mb-3 text-xl font-medium">Updates to Terms</h3>
            <p className="text-muted-foreground leading-relaxed">
              We may update these Terms from time to time. We will notify you of material changes and your continued use
              of the Service constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Contact Information</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="text-muted-foreground space-y-2">
              <p>Email: legal@aicopilotvibe.com</p>
              <p>
                Website:{" "}
                <Link href="/" className="text-primary hover:underline">
                  aicopilotvibe.com
                </Link>
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Acknowledgment</h2>
            <p className="text-muted-foreground leading-relaxed">
              By using AI Copilot Vibe, you acknowledge that you have read, understood, and agree to be bound by these
              Terms of Service.
            </p>
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

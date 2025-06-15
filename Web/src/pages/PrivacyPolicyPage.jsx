
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="shadow-lg border-border/60 bg-card">
          <CardHeader className="text-center">
             <FileText className="w-10 h-10 text-primary mx-auto mb-3" />
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
            <p className="text-sm text-muted-foreground">Last Updated: 2025-05-02</p>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground leading-relaxed prose prose-blue max-w-none">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">1. Introduction</h2>
              <p>Welcome to SlideSpace ("we," "us," or "our"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">2. Information We Collect</h2>
              <p>We may collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.</p>
              <p>The personal information we collect may include the following:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Personal Information Provided by You: Name, email address, password, contact preferences.</li>
                <li>Uploaded Content: Scientific papers (PDF, DOCX) that you upload for processing.</li>
                <li>Usage Data: Information about how you use our website and services, such as IP address, browser type, operating system, access times, and pages viewed.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">3. How We Use Your Information</h2>
              <p>We use personal information collected via our website for a variety of business purposes described below:</p>
               <ul className="list-disc list-inside space-y-1">
                 <li>To provide, operate, and maintain our services.</li>
                 <li>To improve, personalize, and expand our services.</li>
                 <li>To understand and analyze how you use our services.</li>
                 <li>To develop new products, services, features, and functionality.</li>
                 <li>To communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
                 <li>To process your transactions.</li>
                 <li>To find and prevent fraud.</li>
               </ul>
            </section>

             <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">4. Sharing Your Information</h2>
              <p>We do not share your uploaded scientific papers or generated presentations with third parties, except as necessary to provide the service (e.g., with cloud storage providers under strict confidentiality agreements) or as required by law.</p>
              <p>We may share aggregated, anonymized usage data for analytics and improvement purposes.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">5. Data Security</h2>
              <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>
            </section>

             <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">6. Your Privacy Rights</h2>
              <p>Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. Please contact us to exercise these rights.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">7. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date. We encourage you to review this Privacy Policy frequently to be informed of how we are protecting your information.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">8. Contact Us</h2>
              <p>If you have questions or comments about this Privacy Policy, please contact us at: privacy@slidespace.example.com</p>
            </section>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicyPage;
  
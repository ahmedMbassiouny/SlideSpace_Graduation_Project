
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const TermsOfServicePage = () => {
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
            <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
             <p className="text-sm text-muted-foreground">Last Updated: 2025-05-02</p>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground leading-relaxed prose prose-blue max-w-none">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">1. Acceptance of Terms</h2>
              <p>By accessing or using the SlideSpace website and services ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then you may not access the Service.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">2. Description of Service</h2>
              <p>SlideSpace provides a platform that uses artificial intelligence to summarize uploaded scientific papers (PDF, DOCX) and generate presentation slides. Users can edit, preview, export, and share these presentations.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">3. User Accounts</h2>
              <p>To access certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for any activities or actions under your account.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">4. User Content and Intellectual Property</h2>
              <p>You retain full ownership of the scientific papers you upload ("User Content"). By uploading User Content, you grant SlideSpace a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and process the User Content solely for the purpose of providing the Service to you.</p>
              <p>You are responsible for ensuring that you have the necessary rights and permissions to upload and process the User Content. SlideSpace does not claim ownership over the generated presentations, but owns the underlying technology and AI models used to create them.</p>
            </section>

             <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">5. Acceptable Use</h2>
              <p>You agree not to use the Service for any unlawful purpose or in any way that interrupts, damages, or impairs the service. You agree not to upload content that is infringing, libelous, defamatory, obscene, or otherwise objectionable.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">6. Service Availability and Modifications</h2>
              <p>We strive to keep the Service operational, but we may need to interrupt the Service for maintenance or other reasons. We reserve the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">7. Disclaimers</h2>
              <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. SlideSpace makes no warranties, expressed or implied, regarding the accuracy, reliability, or completeness of the generated content. Use the Service at your own risk.</p>
            </section>

             <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">8. Limitation of Liability</h2>
              <p>In no event shall SlideSpace, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">9. Governing Law</h2>
              <p>These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>
            </section>

             <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">10. Changes to Terms</h2>
              <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">11. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us at: legal@slidespace.example.com</p>
            </section>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TermsOfServicePage;
  
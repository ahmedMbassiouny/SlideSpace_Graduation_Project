
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { HelpCircle, Search, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const faqData = [
  { id: 'faq1', question: 'What file types are supported?', answer: 'SlideSpace currently supports PDF (.pdf) and Microsoft Word (.docx) files for upload.' },
  { id: 'faq2', question: 'How accurate is the AI summarization?', answer: 'Our custom AI model is trained on a vast dataset of scientific papers to provide high-quality summaries and slide structures. Accuracy can vary based on paper complexity and formatting, but we continuously improve the model.' },
  { id: 'faq3', question: 'Can I edit the generated slides?', answer: 'Yes! After generation, you can edit the text content of each slide, rearrange bullet points, and modify titles directly within the Slide Generation page before exporting.' },
  { id: 'faq4', question: 'What export formats are available?', answer: 'You can export your final presentation as either a Microsoft PowerPoint file (.pptx) or a PDF file (.pdf).' },
  { id: 'faq5', question: 'Is my uploaded data secure?', answer: 'We take data security seriously. Your uploaded documents and generated presentations are stored securely. Please refer to our Privacy Policy for more details.' },
];

const HelpFAQPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [contactName, setContactName] = React.useState('');
  const [contactEmail, setContactEmail] = React.useState('');
  const [contactMessage, setContactMessage] = React.useState('');
  const { toast } = useToast();

  const filteredFaq = faqData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Placeholder for submission logic
    console.log("Contact form submitted:", { contactName, contactEmail, contactMessage });
    toast({ title: "Message Sent", description: "Thank you for contacting us. We'll get back to you soon." });
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-primary flex items-center justify-center">
          <HelpCircle className="w-8 h-8 mr-3" /> Help & FAQ
        </h1>

        {/* FAQ Section */}
        <Card className="mb-12 shadow-lg border-border/60 bg-card">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search FAQs..."
                className="pl-8 w-full md:w-1/2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {filteredFaq.length > 0 ? filteredFaq.map(item => (
                <AccordionItem value={item.id} key={item.id}>
                  <AccordionTrigger className="text-lg hover:text-primary">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              )) : (
                 <p className="text-center text-muted-foreground py-4">No matching FAQs found.</p>
              )}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Form Section */}
        <Card className="shadow-lg border-border/60 bg-card">
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>Still have questions? Send us a message.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactName">Name</Label>
                  <Input id="contactName" value={contactName} onChange={(e) => setContactName(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input id="contactEmail" type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required />
                </div>
              </div>
              <div>
                <Label htmlFor="contactMessage">Message</Label>
                <Textarea id="contactMessage" rows={5} value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full md:w-auto">
                <Send className="w-4 h-4 mr-2" /> Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default HelpFAQPage;
  
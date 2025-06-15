import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Upload,
  PlayCircle,
  UserPlus,
  FileText,
  Cpu,
  Presentation,
  ArrowRight,
} from "lucide-react"; // Added ArrowRight
import { Link } from "react-router-dom";

const HomePage = ({ user }) => {
  const featureCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const features = [
    {
      icon: <Upload className="w-8 h-8 text-primary" />,
      title: "Effortless Upload",
      description: "Simply upload your PDF or DOCX scientific papers.",
    },
    {
      icon: <Cpu className="w-8 h-8 text-primary" />,
      title: "AI Summarization",
      description: "Our custom AI model analyzes and summarizes key content.",
    },
    {
      icon: <Presentation className="w-8 h-8 text-primary" />,
      title: "Instant Presentations",
      description: "Get clean, editable slides generated automatically.",
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Customize & Export",
      description: "Edit slides easily and export as PDF or PPTX.",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <motion.section
        className="w-full pt-20 pb-24 text-center bg-gradient-to-b from-white via-blue-50 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container px-4 mx-auto md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            {/* Placeholder Logo */}
            <FileText className="w-16 h-16 text-primary" />
          </motion.div>
          <motion.h1
            className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            SlideSpace
          </motion.h1>
          <motion.p
            className="max-w-2xl mx-auto mb-8 text-lg text-gray-600 md:text-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Transform scientific papers into presentation-ready slides instantly
            with AI.
          </motion.p>
          <motion.div
            className="transition flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button
              size="lg"
              className=" shadow-lg hover:shadow-xl transition-shadow"
              asChild
            >
              <Link to="/upload">
                <Upload className="w-5 h-5 mr-2" /> Upload Paper
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="shadow-lg hover:shadow-xl transition-shadow"
              asChild
            >
              {/* Link to demo section */}
              <a href="#demo"><PlayCircle className="w-5 h-5 mr-2" /> Watch Demo</a>
            </Button>
            {user ? (
              " "
            ) : (
              <>
                <Button
                  size="lg"
                  variant="secondary"
                  className="shadow-lg hover:shadow-xl transition-shadow duration-500 ease-in-out"
                  asChild
                >
                  <Link to="/signup">
                    <UserPlus className="w-5 h-5 mr-2" /> Sign Up
                  </Link>
                </Button>
              </>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Overview Section */}
      <section className="w-full py-16 bg-gray-50">
        <div className="container px-4 mx-auto md:px-6">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-800">
            How SlideSpace Works
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 feature-card text-center transition-transform duration-300 transform bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={featureCardVariants}
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="link" asChild>
              <Link to="/features">
                See All Features <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Visual Placeholder Section */}
      <section className="w-full py-16" id="demo">
        <div className="container px-4 mx-auto text-center md:px-6">
          <h2 className="mb-6 text-3xl font-bold text-gray-800">
            Visualize the Transformation
          </h2>
          <p className="max-w-3xl mx-auto mb-10 text-lg text-gray-600">
            See how easily your complex research papers become clear, concise
            presentations.
          </p>
          <div className="relative bg-white border rounded-lg shadow-xl border-border aspect-video max-w-4xl mx-auto overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 via-transparent to-gray-100 opacity-80">
              <Presentation className="w-24 h-24 text-primary opacity-50" />
            </div>

            <div className=" p-0  xlg relative z-10 flex items-center justify-center w-full h-full">
              <video autoPlay loop muted className=" w-full h-full object-cover">
                <source src="../../media/Generate_aad63333.mp4" type="video/mp4" />
              </video>
            </div>  
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-20 bg-gradient-to-t from-blue-100 via-blue-50 to-white">
        <div className="container px-4 mx-auto text-center md:px-6">
          <motion.h2
            className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Simplify Your Research Workflow?
          </motion.h2>
          <motion.p
            className="max-w-xl mx-auto mb-8 text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Sign up today and start converting your papers into powerful
            presentations in minutes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {user ? (
              <Button
                size="lg"
                variant="outline"
                className="shadow-lg hover:shadow-xl transition-shadow"
                asChild
              >
                <Link to="/upload">
                  <PlayCircle className="w-5 h-5 mr-2" /> Try now
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  size="lg"
                  className="shadow-lg hover:shadow-xl transition-shadow"
                  asChild
                >
                  <Link to="/signup">
                    Get Started for Free <UserPlus className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

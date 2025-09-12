"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Contact info with updated details
const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "info@shrimarvels.com",
    description: "For inquiries & collaborations",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+91 9714422666",
    description: "Mon-Sat, 10am to 7pm",
  },
  {
    icon: MapPin,
    title: "Morbi Office",
    details: "8-A, National Highway, Gujarat 363642",
    // description: "Main Showroom",
  },
  {
    icon: MapPin,
    title: "Delhi Office",
    details: "Marble Market, Mangolpuri, New Delhi",
    // description: "Regional Office",
  },
];

// Main component for the Contact Page
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert("Thank you for your message! We'll be in touch soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  // Form field change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFE2C8] to-[#E7DFC9] antialiased pt-24">
      {/* Header Section */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-[#5C4421] mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-[#84632e] max-w-3xl mx-auto">
          We are here to help you with your inquiries. Reach out to us through
          any of the channels below.
        </p>
      </motion.div>

      {/* Contact Info Cards */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={info.title}
                className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-md border border-white/50 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-[#B79962] to-[#F3C77B] rounded-full flex items-center justify-center text-white">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-[#5C4421] mb-2">
                  {info.title}
                </h3>
                <p className="text-[#84632e] font-medium mb-1">
                  {info.details}
                </p>
                <p className="text-gray-500 text-sm">{info.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Form and Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-white/60 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/50"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-[#5C4421] mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#5C4421] mb-2"
                  >
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-white/80 border-zinc-300 text-[#5C4421]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#5C4421] mb-2"
                  >
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-white/80 border-zinc-300 text-[#5C4421]"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-[#5C4421] mb-2"
                >
                  Subject *
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-white/80 border-zinc-300 text-[#5C4421]"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#5C4421] mb-2"
                >
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-white/80 border-zinc-300 text-[#5C4421] resize-none"
                  placeholder="Tell us more..."
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#B79962] to-[#F3C77B] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>

          {/* Maps Section */}
          <div className="space-y-8">
            <motion.div
              className="bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-xl font-semibold text-[#5C4421] mb-4 text-center">
                Morbi, Gujarat
              </h3>
              <div className="aspect-video overflow-hidden rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.824810398717!2d70.8282363154287!3d22.82008798500736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39598cd43806a8f1%3A0x3a2325c52e4d026!2sShri%20Marvels!5e0!3m2!1sen!2sin!4v1678886400000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                ></iframe>
              </div>
            </motion.div>
            <motion.div
              className="bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-[#5C4421] mb-4 text-center">
                Kishangarh, Rajasthan
              </h3>
              <div className="aspect-video overflow-hidden rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3585.9600548362135!2d74.872513!3d26.588528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396cb21bbbbbbbb%3A0xcccccccccccccccc!2sKishangarh%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v123456789"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

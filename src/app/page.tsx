"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaChartLine,
  FaExchangeAlt,
  FaShieldAlt,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { RiBillFill } from "react-icons/ri";
import { Hexagon } from "lucide-react";
import { BackgroundElements } from "@/components/ui/BackgroundElements";

export default function Homepage() {
  const [isHovered, setIsHovered] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const faqs = [
    {
      question: "How do I off-ramp with Framp?",
      answer: "Connect your Solana wallet, choose your bank and off-ramp stablecoins in seconds."
    },
    {
      question: "Is my money safe?",
      answer: "Framp partners with regulated liquidity providers and uses secure smart contracts to manage Our Liquidity Pool."
    },
    {
      question: "What savings options do you offer?",
      answer: "You can enable auto-saving from each transaction or balance—and soon, earn yield on stablecoins."
    },
    {
      question: "What countries do you support?",
      answer: "We're launching in Nigeria first, with more African markets coming soon."
    },
    {
      question: "Do I need a bank account?",
      answer: "Yes, you need bank accounts to get your converted Crypto to Fiat, and convert your Fiat to Crypto."
    },
    {
      question: "Will Framp be launching its Token?",
      answer: "No, there'll be no token for Framp as our aim is to provide financial services to our customers only."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-[90vh] sm:min-h-[80vh] flex items-center justify-center bg-white dark:bg-background/90 py-10 sm:py-0 relative overflow-hidden">
        <BackgroundElements />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <motion.div
              className="w-full lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-black dark:text-white mb-4">
                Your <span className="text-[#7b77b9]">Turbo</span>Charged
                <span className="block sm:inline"> Finance Buddy</span>
              </h1>
              <p className="text-lg sm:text-xl text-black/80 dark:text-white/80 max-w-xl mx-auto lg:mx-0 mb-8">
                The all-in-one hub with a blend of TradFi and DeFi to enhance
                your Ramping Experience
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  asChild
                  className="bg-[#7b77b9] hover:bg-[#7b77b9]/90 text-white rounded-full"
                >
                  <Link href="/waitlist">
                    Join Waitlist <FaArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-[#7b77b9]/30 hover:bg-[#7b77b9]/10 text-black dark:text-white rounded-full"
                >
                  <Link href="/about">Learn More</Link>
                </Button>
          </div>
            </motion.div>

            <motion.div
              className="w-full lg:w-1/2 mt-8 lg:mt-0 flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                animate={{
                  y: isHovered ? -15 : 0,
                  transition: { duration: 0.5, ease: "easeInOut" },
                }}
              >
                <Image
                  src="/images/hero.svg"
                  alt="Framp"
                  width={600}
                  height={450}
                  className="max-w-full h-auto object-contain"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="product" className="py-20 bg-muted/95 dark:bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
              Everyday Finance Reimagined
            </h2>
            <p className="text-lg text-black/70 dark:text-white/70">
              Seamlessly bridge your digital assets with real-world needs
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {/* Feature 1 */}
            <motion.div
              variants={item}
              className="bg-white dark:bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-black/10 dark:border-white/10"
            >
              <div className="w-12 h-12 rounded-full bg-[#7b77b9]/10 dark:bg-[#7b77b9]/20 flex items-center justify-center mb-4">
                <FaExchangeAlt className="text-[#7b77b9] h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
               Off-Ramp to Fiat
              </h3>
              <p className="text-black/70 dark:text-white/70">
                Withdraw stablecoins directly to your bank. Fast, no hidden charges and complaint.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              variants={item}
              className="bg-white dark:bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-black/10 dark:border-white/10"
            >
              <div className="w-12 h-12 rounded-full bg-[#7b77b9]/10 dark:bg-[#7b77b9]/20 flex items-center justify-center mb-4">
                <RiBillFill className="text-[#7b77b9] h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
                Auto-Saving Engine
              </h3>
              <p className="text-black/70 dark:text-white/70">
               Every time you spend or off-ramp, a small % is saved-helping you build financial discipline.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              variants={item}
              className="bg-white dark:bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-black/10 dark:border-white/10"
            >
              <div className="w-12 h-12 rounded-full bg-[#7b77b9]/10 dark:bg-[#7b77b9]/20 flex items-center justify-center mb-4">
                <FaChartLine className="text-[#7b77b9] h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
                Utility Bills Payments
              </h3>
              <p className="text-black/70 dark:text-white/70">
                Top up airtime, pay electricity, or internet-directly from ypur crypto wallet.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              variants={item}
              className="bg-white dark:bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-black/10 dark:border-white/10"
            >
              <div className="w-12 h-12 rounded-full bg-[#7b77b9]/10 dark:bg-[#7b77b9]/20 flex items-center justify-center mb-4">
                <FaShieldAlt className="text-[#7b77b9] h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
                User-Centered Mobile Design
              </h3>
              <p className="text-black/70 dark:text-white/70">
                Built for everyday use. Clean UI, simple flows, designed for mobile-first users.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>



    {/* About Us Section */}
    <section className="py-20 bg-white dark:bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black dark:text-white">
              About Us
            </h2>
            <div className="bg-muted/50 dark:bg-muted/20 rounded-2xl p-8 md:p-12 border border-black/10 dark:border-white/10">
              <p className="text-lg md:text-xl text-black/80 dark:text-white/80 leading-relaxed mb-6">
                Framp is on a mission to unlock <span className="text-[#7b77b9] font-semibold">Stablecoin utility for Everyday Finance Globally</span>.
              </p>
              <p className="text-lg text-black/70 dark:text-white/70 leading-relaxed">
                We're a team of builders passionate about fixing fragmented financial experiences—combining ramps, yield, and real-world use into one smooth app.
              </p>
            </div>
          </motion.div>
        </div>
      </section>



      {/* FAQ Section */}
      <section id="FAQ" className="py-20 bg-white dark:bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-black/70 dark:text-white/70">
              Everything you need to know about Framp
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={item}
                className="mb-4"
              >
                <div className="bg-muted/50 dark:bg-muted/20 rounded-xl border border-black/10 dark:border-white/10 overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/70 dark:hover:bg-muted/30 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-black dark:text-white pr-4">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openFAQ === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      {openFAQ === index ? (
                        <FaMinus className="text-[#7b77b9] h-4 w-4" />
                      ) : (
                        <FaPlus className="text-[#7b77b9] h-4 w-4" />
                      )}
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFAQ === index ? "auto" : 0,
                      opacity: openFAQ === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-black/70 dark:text-white/70 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/95 dark:bg-muted/10 relative overflow-hidden">
        <BackgroundElements />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            className="max-w-5xl mx-auto p-8 md:p-12 rounded-2xl backdrop-blur-sm relative overflow-hidden bg-white/50 dark:bg-background/50 border border-black/10 dark:border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#7b77b9]/10 via-transparent to-[#7b77b9]/10 opacity-30"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-black dark:text-white">
                Ready to revolutionize your financial experience?
              </h2>
              <p className="text-black/70 dark:text-white/70 text-center mb-8">
                Join thousands on our waitlist to be among the first to
                experience Framp.
              </p>
              <div className="flex justify-center">
                <Button
                  size="lg"
                  asChild
                  className="bg-[#7b77b9] hover:bg-[#7b77b9]/90 text-white px-8 rounded-full"
                >
                  <Link href="/waitlist">
                    Join Waitlist <FaArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
    </section>
    </Layout>
  );
}
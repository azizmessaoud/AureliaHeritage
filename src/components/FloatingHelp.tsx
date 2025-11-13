import { useState } from "react";
import { MessageCircle, X, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const FloatingHelp = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 bg-white rounded-2xl shadow-2xl border-2 border-orange-200 p-6 w-80"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Need Help?</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Have questions about workshops or registration? We're here to help!
            </p>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start border-orange-200 hover:bg-orange-50"
                onClick={() => window.location.href = "mailto:info@aureliaheritage.com"}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email Us
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-orange-200 hover:bg-orange-50"
                onClick={() => window.location.href = "tel:+21612345678"}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Us
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Get help"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>
    </div>
  );
};

export default FloatingHelp;


import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react';

interface PaymentFormProps {
  selectedPlan: any;
  selectedAddons: any;
  onBack: () => void;
  theme: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ selectedPlan, selectedAddons, onBack, theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    discordUsername: '',
    serverName: '',
    additionalNotes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    const basePrice = parseInt(selectedPlan.price.replace('₹', ''));
    const unitsPrice = (selectedAddons?.units || 0) * parseInt(selectedPlan.addons.unit.replace('₹', ''));
    const backupsPrice = (selectedAddons?.backups || 0) * parseInt(selectedPlan.addons.backup.replace('₹', ''));
    return basePrice + unitsPrice + backupsPrice;
  };

 
  const sendToDiscord = async () => {
    const webhookUrl = 'https://discord.com/api/webhooks/1390708963229831180/iIcQEkMPv1_bWKzvg58UWBq-c84msuMit4Sh6aw5xa4HaCYyUgdl3fA82W8g2vZLofsp';

    const orderDetails = {
      embeds: [
        {
          title: "🎮 New Order Received!",
          color: 0x7C3AED,
          fields: [
            {
              name: "👤 Customer Information",
              value: `**Name:** ${formData.name}\n**Email:** ${formData.email}\n**Phone:** ${formData.phone}\n**Discord:** ${formData.discordUsername}`,
              inline: false
            },
            {
              name: "📍 Address",
              value: `${formData.address}\n${formData.city}, ${formData.state} - ${formData.pincode}`,
              inline: false
            },
            {
              name: "🎯 Plan Details",
              value: `**Plan:** ${selectedPlan.name} Plan\n**Type:** ${selectedPlan.planType}\n**RAM:** ${selectedPlan.ram}\n**CPU:** ${selectedPlan.cpu}\n**Storage:** ${selectedPlan.storage}\n**Location:** ${selectedPlan.location}`,
              inline: true
            },
            {
              name: "🔧 Add-ons",
              value: `**Extra Units:** ${selectedAddons?.units || 0}\n**Backup Slots:** ${selectedAddons?.backups || 0}`,
              inline: true
            },
            {
              name: "💰 Pricing",
              value: `**Base Price:** ₹${selectedPlan.price.replace('₹', '')}\n**Add-ons:** ₹${((selectedAddons?.units || 0) * parseInt(selectedPlan.addons.unit.replace('₹', ''))) + ((selectedAddons?.backups || 0) * parseInt(selectedPlan.addons.backup.replace('₹', '')))}\n**Total:** ₹${calculateTotal()}`,
              inline: true
            },
            {
              name: "🎮 Server Details",
              value: `**Server Name:** ${formData.serverName || 'Not specified'}\n**Additional Notes:** ${formData.additionalNotes || 'None'}`,
              inline: false
            }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "CraftDomains Order System"
          }
        }
      ]
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails)
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to send to Discord');
      }
    } catch (error) {
      console.error('Error sending to Discord:', error);
      setIsSubmitted(true); // fallback success
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    await sendToDiscord();
    setIsSubmitting(false);
  };

  
};

export default PaymentForm;

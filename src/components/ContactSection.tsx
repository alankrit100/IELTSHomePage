import { useForm } from 'react-hook-form';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function ContactSection() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  // ✅ Static contact info
  const contactInfo = {
    phone: "+1 (234) 567-890",
    email: "info@ielts-excellence.com",
    address: "123 IELTS Lane, Study City, Educationland",
    socialMedia: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  };

  // ✅ Local form submit (no API call)
  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    alert("✅ Thank you! Your consultation request has been received.");
    reset();
  };

  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin,
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Your{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              IELTS Journey?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with us today for a free consultation and take the first step
            towards achieving your dream IELTS score.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* ✅ Static Contact Information */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <p className="text-gray-600">{contactInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">{contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Address</h4>
                  <p className="text-gray-600">{contactInfo.address}</p>
                </div>
              </div>

              <div className="pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {Object.entries(contactInfo.socialMedia).map(([platform, url]) => {
                    const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110"
                      >
                        <IconComponent className="h-5 w-5 text-blue-600" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ✅ Local Contact Form */}
          <Card className="border-blue-100">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">Book Free Consultation</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-700 font-medium">Full Name</Label>
                  <Input
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className="mt-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="mt-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-700 font-medium">Phone Number</Label>
                  <Input
                    id="phone"
                    {...register('phone', { required: 'Phone number is required' })}
                    className="mt-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-700 font-medium">Message</Label>
                  <Textarea
                    id="message"
                    {...register('message', { required: 'Message is required' })}
                    className="mt-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500 min-h-[120px]"
                    placeholder="Tell us about your IELTS goals and how we can help you..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
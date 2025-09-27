import { GraduationCap, Facebook, Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

export function InstituteFooter() {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Courses', href: '#courses' },
    { name: 'Testimonials', href: '#about' },
  ];

  const socialLinks = [
    { platform: 'Facebook', url: 'https://facebook.com', Icon: Facebook },
    { platform: 'Instagram', url: 'https://instagram.com', Icon: Instagram },
    { platform: 'Twitter', url: 'https://twitter.com', Icon: Twitter },
    { platform: 'LinkedIn', url: 'https://linkedin.com', Icon: Linkedin },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Branding and Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">IELTS Excellence</span>
            </div>
            <p className="text-sm max-w-xs">
              Your definitive partner in achieving global academic and professional success.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-4">Navigate</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm hover:text-white hover:underline transition-all duration-200 transform hover:-translate-y-px"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact and Social */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
            <a href="mailto:info@ieltsexcellence.com" className="flex items-center justify-center md:justify-end space-x-2 text-sm hover:text-white transition-colors duration-200 mb-4">
              <Mail className="h-4 w-4" />
              <span>info@ieltsexcellence.com</span>
            </a>
            <div className="flex justify-center md:justify-end space-x-4">
              {socialLinks.map(({ platform, url, Icon }) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform}
                  className="bg-gray-800 p-2 rounded-full hover:bg-indigo-500 transition-all duration-200 transform hover:scale-110"
                >
                  <Icon className="h-5 w-5 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-gray-700/50 mt-12 pt-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} IELTS Excellence. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
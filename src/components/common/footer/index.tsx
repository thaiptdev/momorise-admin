import React from "react";

const Footer: React.FC = () => {
  const footerLinks = [
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Support" },
  ];

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            © 2025 Momorise. All rights reserved.
          </div>
          <div className="flex space-x-6">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

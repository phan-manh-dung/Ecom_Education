import React from 'react';

const FooterComponent: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-auto">
      <div className="container mx-auto text-center">
        <h3 className="text-lg font-semibold mb-2">FooterComponent</h3>
        <p className="text-gray-300">
          © 2024 E-commerce Education. All rights reserved.
        </p>
        <div className="mt-4 space-x-4">
          <a href="/privacy" className="hover:text-blue-300">Privacy Policy</a>
          <a href="/terms" className="hover:text-blue-300">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;

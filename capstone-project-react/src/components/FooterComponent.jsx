import React from 'react';

function FooterComponent() {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="text-center p-3">
        © {new Date().getFullYear()} Mu Supermarket Inc. - All Rights Reserved
      </div>
    </footer>
  );
}

export default FooterComponent;

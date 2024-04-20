import React from 'react';

function FooterComponent() {
  return (
    <footer className="SfondoArancione text-center text-lg-start OrangeText bg-dark">
      <div className="text-center p-3">
        © {new Date().getFullYear()} Mu Supermarket Inc. - All Rights Reserved
      </div>
    </footer>
  );
}

export default FooterComponent;

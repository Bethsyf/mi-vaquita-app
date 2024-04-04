import React from 'react';
import { Link } from 'react-router-dom';

const FooterView = () => {
  return (
    <div className="mt-6">
      <img
        src="logo-wwc.png"
        alt="Workflow"
        className="w-20 h-25 m-auto md:hidden"
      />
      <div className="hidden text-center fixed bottom-0 left-0 w-full justify-between font-bold py-4 px-10 text-xl md:flex">
        <p>
          Made with ❤️ by&nbsp;
          <Link
            to="https://github.com/Bethsyf"
            target="_blank"
            rel="noopener noreferrer"
          >
            @Bethsyf
          </Link>
        </p>
        <p>Navigating Frontiers: Coding a JavaScriptApp</p>
        <p>WWCode Medellín</p>
      </div>
    </div>
  );
};

export default FooterView;

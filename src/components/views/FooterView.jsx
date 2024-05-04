import { Link } from 'react-router-dom';
import logo from '../../assets/logo-wwc.png';

const FooterView = () => {
  return (
    <div className="mt-6">
      <img
        src={logo}
        alt="Workflow"
        className="w-20 h-25 m-auto md:hidden mb-4"
      />
      <div className="hidden text-center bottom-0 left-0 w-full justify-between font-bold py-4 px-10 text-xl md:flex">
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

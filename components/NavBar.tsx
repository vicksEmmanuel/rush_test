import Link from 'next/link';
import { useRouter } from 'next/router';

const NavBar = () => {
  const { pathname } = useRouter();
  const color = 'text-blue-700';

  return (
    <nav className="border-gray-200 px-2 sm:px-4 py-2.5 bg-gray-900 z-50 relative w-screen">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href={'/'}>
          <div className="flex items-center cursor-pointer">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Game Shop Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              GameShop
            </span>
          </div>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
            <li>
              <div
                className={`block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent ${
                  !(pathname === '/history' || pathname === '/addItems')
                    ? color
                    : 'text-white'
                }`}
                aria-current="page"
              >
                <Link href={'/'}>Home</Link>
              </div>
            </li>
            <li>
              <div
                className={`block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent ${
                  pathname === '/history' ? color : 'text-white'
                }`}
              >
                <Link href={'/history'}>Shopping History</Link>
              </div>
            </li>
            <li>
              <div
                className={`block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent ${
                  pathname === '/addItems' ? color : 'text-white'
                }`}
              >
                <Link href={'/addItems'}>Add Items</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

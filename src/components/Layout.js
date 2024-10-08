import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const withAuth = (WrappedComponent) => {
  const AuthCheck = (props) => {
    const router = useRouter();

    useEffect(() => {
      const isAuthenticated = localStorage.getItem('Authenticated');

      if (!isAuthenticated) {
        router.push('/auth/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthCheck;
};

const Layout = withAuth(({ children, useContainer = true }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const content = useContainer ? (
    <div className='min-w-[120vh] min-h-[80vh] flex items-center justify-center mx-auto  shadow-container rounded-xl relative overflow-hidden'>
      {children}
    </div>
  ) : (
    children
  );

  return (
    <div className={`flex flex-col lg:flex-row h-screen ${isMobile ? 'lg:hidden' : ''}`}>
      {!isMobile && <Sidebar />}
      <div className="flex flex-col flex-grow w-full">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          {content}
        </main>
      </div>
    </div>
  );
});

export default Layout;
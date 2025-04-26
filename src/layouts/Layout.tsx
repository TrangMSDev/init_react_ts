import React from 'react';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';

interface LayoutProps {
    children?: React.ReactNode;
  }

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className='app'>
            {/* your header here */}
            <Header/>
           <main>{children}</main> 

           <Footer/>
           {/* your footer here */}
        </div>
    );
};

export default Layout;
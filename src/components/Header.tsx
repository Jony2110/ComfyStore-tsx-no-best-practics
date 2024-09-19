import {  MouseEvent } from 'react';
import { Link, NavLink } from 'react-router-dom';


const Headers: React.FC = () => {
  
 
 

 

  const handleTheme = (event: MouseEvent<HTMLInputElement>) => {
    const themeMode = (event.target as HTMLInputElement).checked ? 'dark' : 'light';
    document.querySelector('html')?.setAttribute('data-theme', themeMode);
    localStorage.setItem('theme', themeMode);
    
  };

 

  return (
    <div>
      <div className="header-auth bg-neutral p-2">
        <div className="container mx-auto max-w-[1024px]">
           
            <div className="flex justify-end gap-4 text-white items-center">
              <p className="hover:underline" >Sign in / Guest</p>
              <p className="hover:underline" >Create Account</p>
            </div>
          
        </div>
      </div>

      <div className="header-main bg-base-200">
        <div className="navbar bg-base-200 container mx-auto p-3 max-w-[1024px]">
          <div className="navbar-start">
            <Link className="hidden lg:flex btn btn-primary text-3xl items-center active" to="/">
              C
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-2">
              <li><NavLink to="/">Product</NavLink></li>
             
             
            </ul>
          </div>
          <div className="navbar-end gap-2">
            <label className="swap swap-rotate">
              <input type="checkbox" onClick={handleTheme} />
              <svg className="swap-on h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17Z..." />
              </svg>
              <svg className="swap-off h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08..." />
              </svg>
            </label>
            <div  className="indicator cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17..." />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headers;

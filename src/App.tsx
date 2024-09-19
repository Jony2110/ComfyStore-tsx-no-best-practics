import { useState, createContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Products from './pages/Products';
import ProductDetails from './pages/productsDetails';

interface Product {
  id: number;
  name: string;
  price: number;
  color?: string;  // Optional properties
  amount?: number; // Optional properties
}

interface UserContextProps {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

interface TokenContextProps {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

interface ThemeContextProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);
export const TokenContext = createContext<TokenContextProps | undefined>(undefined);
export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

function App() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product & { color: string; amount: number; }) => {
    setCartItems([...cartItems, product]);
  };

  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<string | null>(localStorage.getItem('user'));
  const [theme, setTheme] = useState<string>('light');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedTheme = localStorage.getItem('theme');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedTheme) {
      document.querySelector('html')?.setAttribute('data-theme', storedTheme);
      setTheme(storedTheme);
    }
  }, []);

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <TokenContext.Provider value={{ token, setToken }}>
          <ThemeContext.Provider value={{ theme, setTheme }}>
            <Routes>
              <Route path='/' element={<MainLayout><Products /></MainLayout>} />
              <Route path='/product/:id' element={<MainLayout><ProductDetails addToCart={addToCart} /></MainLayout>} />
            </Routes>
          </ThemeContext.Provider>
        </TokenContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;

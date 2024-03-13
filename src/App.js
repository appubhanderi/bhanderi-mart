import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BhanderiMart from './components/BhanderiMart';
import { CartProvider } from 'react-use-cart'



function App() {

  return (
    <>
      <CartProvider>
        <BhanderiMart />
      </CartProvider>

    </>
  );
}

export default App;
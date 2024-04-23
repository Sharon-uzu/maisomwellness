import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Screen/Login';
import Create from './Screen/Create';
import Dashboard from './Screen/Dashboard';
import Sales from './Screen/Sales';
import Invoice from './Screen/Invoice';
import { PersistGate } from 'redux-persist/integration/react';
import store from './redux/store';
import { Provider } from 'react-redux';
import ProductSales from './Screen/product-sales';

// admin
import Dashboardadmin from "./Screen/admin/dashboard"
import SalesMgt from './Screen/admin/sales-mgt';
import StaffMgt from './Screen/admin/staff-mgt';
import ProductMgt from './Screen/admin/product-mgt';

function App() {
  return (
    <div className="App">
      <Provider store={store().store}>
        <PersistGate loading={null} persistor={store().persistor}>

          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/create' element={<Create />} />
            {/* <Route path='/dashboard' element={<Sales />} /> */}
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/sales' element={<Sales />} />
            <Route path='/product-sales' element={<ProductSales />} />
            <Route path='/invoice' element={<Invoice />} />


            {/* Admin */}
            <Route path='/admin-dashboard' element={<Dashboardadmin />} />
            <Route path='/admin-salse-management' element={<SalesMgt />} />
            <Route path='/admin-staff-management' element={<StaffMgt />} />
            <Route path='/admin-product-management' element={<ProductMgt />} />


          </Routes>
        </PersistGate>
      </Provider>
    </div >
  );
}

export default App;

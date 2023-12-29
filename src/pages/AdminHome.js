import AdminProductList from "../features/admin/components/AdminProductList";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";

function AdminHome() {
  return (
        <div>
            <Navbar>
                <AdminProductList></AdminProductList>
            </Navbar>
           
        </div>
  )
}
export default AdminHome

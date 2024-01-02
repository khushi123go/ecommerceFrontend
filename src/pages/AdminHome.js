import AdminProductList from "../features/admin/components/AdminProductList";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";

function AdminHome() {
  return (
        <div>
            <Navbar>
                <AdminProductList></AdminProductList>
            </Navbar>
           <Footer></Footer>
        </div>
  )
}
export default AdminHome

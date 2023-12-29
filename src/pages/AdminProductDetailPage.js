import AdminProductDetail from "../features/admin/components/AdminProductDetail"
import Navbar from "../features/navbar/Navbar"
import ProductDetail from "../features/product/components/ProductDetail"


function AdminProductDetailPage() {
    return (
        <Navbar>
            <AdminProductDetail></AdminProductDetail>
        </Navbar>
    )
}

export default AdminProductDetailPage

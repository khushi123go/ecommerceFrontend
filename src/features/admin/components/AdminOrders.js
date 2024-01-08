import React, { useEffect, useState } from 'react'
import { ITEMS_PER_PAGE, discountedPrice } from '../../../app/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrdersAsync ,selectOrders,selectTotalOrders, updateOrderAsync} from '../../order/orderSlice';
import { ArrowDownIcon, ArrowUpIcon, EyeIcon, PencilIcon } from '@heroicons/react/24/outline';
import Pagination from '../../common/Pagination';

function AdminOrders() {
    
    const dispatch = useDispatch()
    const orders = useSelector(selectOrders);
    const totalOrders = useSelector(selectTotalOrders)
    const [page,setPage] = useState(1);
    useEffect(()=>{
        const pagination = {_page:page,_limit:ITEMS_PER_PAGE};
        dispatch(fetchAllOrdersAsync(pagination))
    },[dispatch,page])

    const [editableOrderId,setEditableOrderId] = useState(-1);


    const handleEdit=(order)=>{
       setEditableOrderId(order.id)
    }
    const handleShow=()=>{
        console.log("handleShow");
    }

    const handleUpdate=(e,order)=>{
      const updatedOrder = {...order,status:e.target.value}
      dispatch(updateOrderAsync(updatedOrder))
      setEditableOrderId(-1)
    }
    const handleSort=(sortOption)=>{
      const sort = {_sort:sortOption.sort,_order:sortOption.order};
      console.log({sort});
      setSort(sort)
    }

    const chooseColor = (status)=>{
      switch (status) {
        case 'pending' :
          return 'bg-purple-200 text-purple-600';
        case 'dispatched' :
           return 'bg-yellow-200 text-yellow-600';
        case 'delivered' :
           return 'bg-green-200 text-green-600';
        case 'cancelled' :
           return 'bg-red-200 text-red-600'; 
      }
    }
    const [filter, setFilter] = useState({});
    const [sort,setSort] = useState({})
    const handlePage = (page) => {
      setPage(page);
    };
  
    useEffect(() => {
      const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
      
      dispatch(fetchAllOrdersAsync({ sort, pagination }));
    }, [dispatch, page, sort]);

    return (
        <>
        <div>
          <div className="p-6 overflow-scroll px-0 w-full" >
    <table className="mt-4 bg-white w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
            <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70" onClick={(e)=>handleSort({sort:'id',order:sort?._order==='asc'?'desc':'asc'})}>
              ORDER#
              {sort._sort === 'id' &&
                      (sort._order === 'asc' ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
            </p>
          </th>
          <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
            <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
              ITEMS{" "}
            </p>
          </th>
          <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
          <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70" onClick={(e)=>handleSort({sort:'totalAmount',order:sort?._order==='asc'?'desc':'asc'})}>
              TOTAL AMOUNT
              {sort._sort === 'totalAmount' &&
                      (sort._order === 'asc' ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
            </p>
          </th>
          <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
            <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
              SHIPPING ADDRESS{" "}
            </p>
          </th>
          <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
            <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
              STATUS{" "}
            </p>
          </th>
         
          <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
            <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
              Actions
            </p>
          </th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order=><tr>
          <td className="p-4 border-b border-blue-gray-50">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                  {order.id}
                  </p>
                
              </div>
            </div>
          </td>
          <td className="p-4 border-b border-blue-gray-50">
            {order.items.map(item=><div className="flex items-center gap-3">
              <img
                src={item.product.thumbnail}
                alt={item.product.title}
                className="inline-block relative object-cover object-center !rounded-full w-9 h-9 rounded-md"
              />
              <div className="flex flex-col">
                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                  {item.product.title} - #{item.quantity} - ₹{discountedPrice(item)*83}
                </p>
                
              </div>
            </div>)}
          </td>
          <td className="p-4 border-b border-blue-gray-50">
            <div className="flex flex-col">
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                {83*(order.totalAmount)}
              </p>
              
            </div>
          </td>
          <td className="p-4 border-b border-blue-gray-50">
            <div className="flex flex-col">
              <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
               <div> <strong>{order.selectedAddress.name}</strong> ,{" "}</div>
               <div>{order.selectedAddress.street},{" "}</div> 
               <div>{order.selectedAddress.city},{" "}</div> 
               <div>{order.selectedAddress.state},{" "}</div> 
               <div> {order.selectedAddress.pinCode},{" "}</div>
               <div>{order.selectedAddress.phone},{" "}</div> 


              </p>
              
            </div>
          </td>
          <td className="p-4 border-b border-blue-gray-50">
            <div className="w-max">
              <div
                
              >
                {order.id === editableOrderId ? (
                <select onChange={e=>handleUpdate(e,order)}>
                  <option value=''>Choose -status</option>
                  <option value='pending'>Pending</option>
                  <option value='dispatched'>Dispatched</option>
                  <option value='delivered'>Delivered</option>
                  <option value='cancelled'>Cancelled</option>
                </select>
                ) :(
                   <span className={`${chooseColor(order.status)}py-1 px-3 rounded-full text-s`}>{order.status}</span>

                )
               }
              </div>
            </div>
          </td>
          {/* <td className="p-4 border-b border-blue-gray-50">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              23/04/18
            </p>
          </td> */}
          <td className="p-4 border-b border-blue-gray-50">
            <div className='md:inline-flex'>
                <div className='w-4 mr-5 transform hover:text-purple-500 hover:scale-110'>
                <EyeIcon className='w-6 h-6' onClick={e=>handleShow(order)}></EyeIcon>
            </div>
            <div className='w-4 mr-2 transform hover:text-purple-500 hover:scale-110'>
                <PencilIcon className='w-6 h-6' onClick={e=>handleEdit(order)}></PencilIcon>
            </div>
            </div>
            
            
          </td>
        </tr>)}
        
      </tbody>
    </table>
         </div>
         <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders}
      ></Pagination>
        </div>
  
  
</>

    )
}

export default AdminOrders

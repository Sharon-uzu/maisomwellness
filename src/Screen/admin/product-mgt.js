import React, { useState } from 'react'
import Sidebar from '../../Components/Sidebar'
import DashHeader from '../../Components/DashHeader'
import { NumberWithCommas } from '../../utils'
import { SaveInvoiceModel, fetchAllProducts } from '../../service/supabase-service'
import { connect } from 'react-redux'
import { Invoice_Product, Products, View_invoice } from '../../redux/state/action'
import { Link, useNavigate } from 'react-router-dom'
import { CircularProgress, Divider } from '@mui/material'
import logo from '../../images/logo.jpeg'
import AdminSidebar from '../../Components/admin-sidebar'
import { IoFilterSharp } from 'react-icons/io5'
import Modal from "react-modal";



const Productmgt = ({
    disp_products, disp_view_invoice,
    appState, disp_invoice_products
}) => {
    const AllProducts = appState.AllProducts;
    const User = appState.User;
    const InvoiceProducts = appState.AllInvoiceProducts


    const [product, setProduct] = useState(true)
    const [service, setService] = useState(true)
    const [productSearch, setProductSearch] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [multiple, setmultiple] = useState([])
    const [selectedProduct, setselectedProduct] = useState(null)
    const [quantities, setQuantity] = useState(1)
    const navigate = useNavigate();
    const [loading, setloading] = React.useState(false)
    const [selectCategory, setselectCategory] = React.useState("Semi Permanent Brows")
    const uniqueCategories = [...new Set(AllProducts && AllProducts.filter(e => e.category != "Products").map(item => item.category))];

    function GetAllProducts() {
        fetchAllProducts()
            .then(response => {
                console.log(response)
                disp_products(response.data)
            })
            .catch(error => {

            })
    }





    React.useEffect(() => {
        GetAllProducts()
    }, []);



    const Products = [
        {
            names:'Maggi',
            price:'$430',
            quantity:'43 Packets',
            thresh:'12 Packets',
            expDate: '11/12/22',
            status:'In-stock',
        },

        {
            names:'Bru',
            price:'$530',
            quantity:'7 Packets',
            thresh:'3 Packets',
            expDate: '21/12/22',
            status:'Out-of-stock',
        },

        {
            names:'Red bull',
            price:'$600',
            quantity:'13 Packets',
            thresh:'9 Packets',
            expDate: '1/12/22',
            status:'Low stock',
        },


        {
            names:'Maggi',
            price:'$430',
            quantity:'43 Packets',
            thresh:'12 Packets',
            expDate: '11/12/22',
            status:'In-stock',
        },

        {
            names:'Bru',
            price:'$530',
            quantity:'7 Packets',
            thresh:'3 Packets',
            expDate: '21/12/22',
            status:'Out-of-stock',
        },

        {
            names:'Red bull',
            price:'$600',
            quantity:'13 Packets',
            thresh:'9 Packets',
            expDate: '1/12/22',
            status:'Low stock',
        },
    ]


    const getStatusColor = (status) => {
        switch (status) {
            case 'In-stock':
                return '#10A760'; // Green
            case 'Out-of-stock':
                return '#FF0000'; // Red
            case 'Low stock':
                return '#E19133'; // Orange
            default:
                return '#000'; // Default color
        }
    };



    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };



    return (
        <div>

            {loading && <div style={{
                position: "fixed",
                height: "100%",
                width: "100%",
                left: 0,
                top: 0,
                backgroundColor: "rgb(0,0,0,0.8)",
                zIndex: 100,
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                flexDirection: "column"
            }} >
                <CircularProgress />
                <spam style={{ color: "white" }} >Please wait.....</spam>
            </div>}


            {/* {console.log(AllProducts)} */}
            <section className='main-dash'>

                <AdminSidebar />

                <div className='main'>
                    <DashHeader User={User} />

                    <section className='products'  >


                        {/* {

                            product ? (
                                <>
                                    {multiple.length > 0 &&
                                        <div className='sale-form' style={{ padding: 0 }}  >


                                            <section style={{ backgroundColor: "#fff", width: "100%", marginTop: -40 }}  >

                                                {multiple.length > 0 &&
                                                    <div className='invoice-s' id="pdf-content" >

                                                        <section className='invoice'>

                                                            <table className='table1'>
                                                                <tr className='tr1'
                                                                    style={{
                                                                        paddingBottom: 10,
                                                                        paddingTop: 10,
                                                                    }}
                                                                >
                                                                    <th style={{
                                                                        fontSize: 11,
                                                                        fontWeight: 500,
                                                                        width: "110%"
                                                                    }} >PROD.</th>
                                                                    <th style={{
                                                                        fontSize: 11,
                                                                        fontWeight: 500,
                                                                        width: "70%"
                                                                    }} >PRICE</th>
                                                                </tr>
                                                                {multiple.map((item, index) => {
                                                                    return <tr style={{ marginBottom: 10 }} >
                                                                        <td style={{
                                                                            fontSize: 11,
                                                                            fontWeight: 700,
                                                                            paddingRight: 10,
                                                                            width: "80%"
                                                                        }}  >{item.name}</td>
                                                                        <td style={{
                                                                            fontSize: 11,
                                                                            fontWeight: 500,
                                                                            width: "40%"
                                                                        }} > {NumberWithCommas(`₦${item.metaData.price}`)} </td>

                                                                    </tr>
                                                                })}


                                                            </table>
                                                        </section>
                                                        <Divider style={{ marginTop: -10, marginBottom: 20, marginRight: 10 }} />

                                                        <div style={{
                                                            display: "flex",
                                                            flex: "row",
                                                            justifyContent: "space-between",
                                                            paddingBottom: 15
                                                        }} >
                                                            <p
                                                                onClick={() => {
                                                                    setmultiple([])
                                                                    setProductSearch("")
                                                                }}
                                                                style={{
                                                                    backgroundColor: '#fff',
                                                                    color: "#FA5A7D",
                                                                    padding: 5,
                                                                    paddingRight: 10,
                                                                    paddingLeft: 10,
                                                                    marginLeft: 10,
                                                                    borderRadius: 6,
                                                                    cursor: "pointer"
                                                                }}
                                                            >
                                                                Close
                                                            </p>


                                                            <p
                                                                onClick={() => {
                                                                    let sum = 0;

                                                                    for (let i = 0; i < multiple.length; i++) {
                                                                        sum += multiple[i].totalCost;
                                                                    }


                                                                    setloading(true)
                                                                    SaveInvoiceModel({
                                                                        product: multiple,
                                                                        salesRep: User.name,
                                                                        amount: sum,
                                                                        vat: parseInt(sum * 0.7 / 100),
                                                                        invoiceID: new Date().getTime(),
                                                                        generated_by: User.name,
                                                                        branch: User.branch
                                                                    })
                                                                        .then(response => {
                                                                            if (response.error) {
                                                                                setloading(false)
                                                                            }

                                                                            navigate("/invoice");
                                                                            disp_view_invoice(true)

                                                                            disp_invoice_products({
                                                                                vat: parseInt(sum * 0.7 / 100),
                                                                                totalPrice: sum,
                                                                                product: multiple,
                                                                                invoiceID: response.data[0].invoiceID
                                                                            })
                                                                            disp_view_invoice(true)
                                                                            navigate("/invoice")


                                                                        })
                                                                        .catch(error => {
                                                                            setloading(false)
                                                                        })




                                                                }}
                                                                style={{
                                                                    backgroundColor: '#000', color: "white",
                                                                    padding: 5,
                                                                    paddingRight: 10,
                                                                    paddingLeft: 10,
                                                                    marginRight: 10,
                                                                    borderRadius: 6,
                                                                    cursor: "pointer"
                                                                }}
                                                            >Edit</p>

                                                            <p
                                                                onClick={() => {
                                                                    let sum = 0;

                                                                    for (let i = 0; i < multiple.length; i++) {
                                                                        sum += multiple[i].totalCost;
                                                                    }


                                                                    setloading(true)
                                                                    SaveInvoiceModel({
                                                                        product: multiple,
                                                                        salesRep: User.name,
                                                                        amount: sum,
                                                                        vat: parseInt(sum * 0.7 / 100),
                                                                        invoiceID: new Date().getTime(),
                                                                        generated_by: User.name,
                                                                        branch: User.branch
                                                                    })
                                                                        .then(response => {
                                                                            if (response.error) {
                                                                                setloading(false)
                                                                            }

                                                                            navigate("/invoice");
                                                                            disp_view_invoice(true)

                                                                            disp_invoice_products({
                                                                                vat: parseInt(sum * 0.7 / 100),
                                                                                totalPrice: sum,
                                                                                product: multiple,
                                                                                invoiceID: response.data[0].invoiceID
                                                                            })
                                                                            disp_view_invoice(true)
                                                                            navigate("/invoice")


                                                                        })
                                                                        .catch(error => {
                                                                            setloading(false)
                                                                        })




                                                                }}
                                                                style={{
                                                                    backgroundColor: 'crimson', color: "white",
                                                                    padding: 5,
                                                                    paddingRight: 10,
                                                                    paddingLeft: 10,
                                                                    marginRight: 10,
                                                                    borderRadius: 6,
                                                                    cursor: "pointer"
                                                                }}
                                                            >Delete</p>

                                                        </div>
                                                    </div>
                                                }
                                            </section>
                                        </div>
                                    }


                                    <div className='salesProductPreviewHolder' >
                                        <div className='sale-form' style={{ backgroundColor: "#fff" }} >
                                            <section style={{
                                                display: "flex",
                                                flexDirection: "row"
                                            }} >
                                                <div>
                                                    <text style={{
                                                        fontSize: 12,
                                                        fontWeight: 500
                                                    }} >Select category</text>
                                                    <div style={{
                                                        // display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                    }} >

                                                        <select
                                                            style={{
                                                                // flex:1,
                                                                width: 230
                                                            }}
                                                            onChange={(e) => {
                                                                setselectCategory(e.target.value)
                                                                setmultiple([])
                                                            }}
                                                            value={selectCategory} >
                                                            {uniqueCategories.map((item, index) => {
                                                                return <option key={index} value={item} >{item}</option>
                                                            })}
                                                            <option value="Products" >Products</option>
                                                        </select>

                                                        <button
                                                            onClick={() => {

                                                            }}
                                                            style={{
                                                                // flex:1,
                                                                backgroundColor: '#000',
                                                                color: "white",
                                                                height: 40,
                                                                borderRadius: 6,
                                                                cursor: "pointer",
                                                                marginLeft: 60
                                                            }}
                                                        >Add </button>

                                                    </div>

                                                </div>
                                            </section>

                                        </div>

                                        <div className='salesProductPreview' style={{ marginTop: -18 }}  >
                                            {
                                                AllProducts && AllProducts.filter(e => e.category == selectCategory).map((item, index) => {
                                                    return <div
                                                        onClick={() => {
                                                            setselectedProduct(item)
                                                            setmultiple([item])

                                                        }}
                                                        key={index} style={{
                                                            backgroundColor: multiple.filter(e => e.id == item.id).length < 1 ? "#fff" : "rgb(0,0,0,0.1)",
                                                            margin: 9,
                                                            width: 120,
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "center",
                                                            justifyContent: "space-between",
                                                            padding: 2,
                                                            boxShadow: " 0 0 12px 0 rgba(0,0,0,.1)"
                                                        }} >
                                                        <img src={logo} style={{ cursor: 'pointer', width: 90, marginTop: 10, opacity: 0.8 }} alt='logo' />
                                                        <div style={{
                                                            padding: 7,
                                                        }} >
                                                            <text style={{
                                                                fontSize: 9,
                                                                fontWeight: 500
                                                            }} >{item.name}</text>
                                                        </div>
                                                    </div>
                                                })
                                            }

                                        </div>


                                    </div>
                                </>
                            ) : null
                        } */}



                        <div className="product-top">
                            <div className="product-c">
                                <h2>Overall Inventory</h2>
                            
                                <div className="prod1">
                                    <h3 style={{color:'#1570EF'}}>Categories</h3>
                                    <h6>14</h6>
                                    <p>Last 7 days</p>
                                </div>

                                <div className="prod1 prod2">
                                    <div className="p2-c">

                                        <h3 style={{color:"#E19133"}}>Total Products</h3>
                                        <div className='p-f1'>
                                            <h6>868</h6>
                                            <h6>$25000</h6>
                                        </div>

                                        <div className='p-f1'>
                                            <p>Last 7 days</p>
                                            <p>Revenue</p>
                                        </div>

                                    </div>
                                    
                                </div>

                                <div className="prod1 prod2">

                                    <div className="p2-c">

                                        <h3 style={{color:'#845EBC'}}>Top Selling</h3>
                                        <div className='p-f1'>
                                            <h6>5</h6>
                                            <h6>$2500</h6>
                                        </div>

                                        <div className='p-f1'>
                                            <p>Last 7 days</p>
                                            <p>Cost</p>
                                        </div>

                                    </div>
                                    
                                </div>


                                <div className="prod1 prod2">
                                    <div className="p2-c">

                                        <h3 style={{color:'#F36960'}}>Low Stocks</h3>
                                        <div className='p-f1'>
                                            <h6>2</h6>
                                            <h6>12</h6>
                                        </div>

                                        <div className='p-f1'>
                                            <p>Ordered</p>
                                            <p>Not in stock</p>
                                        </div>

                                    </div>
                                    
                                </div>

                            </div>


                        </div>

                        <div className="product-table">
                            <div className="p-t-c">

                                <div className="p-top">
                                    <h2>Products</h2>

                                    <div className='p-btns'>
                                        <button style={{cursor:'pointer'}} onClick={toggleModal}>Add Product</button>
                                        <button className='filter'>
                                            <IoFilterSharp className='fil'/>
                                            Filters
                                        </button>
                                        <button className='filter'>Download All</button>
                                    </div>
                                </div>


                                <table>
                                    <tr>
                                        <th>Products</th>
                                        <th>Buying Price</th>
                                        <th>Quantity</th>
                                        <th>Threshold Value</th>
                                        <th>Expiry Date</th>
                                        <th>Availability</th>
                                       
                                    </tr>


                                    {
                                        Products.map((Product, id)=>{
                                            const statusColor = getStatusColor(Product.status);
                                            return(
                                                <tr key={id}>
                                                    
                                                    <td>{Product.names}</td>
                                                    <td>{Product.price}</td>
                                                    <td>{Product.quantity}</td>
                                                    <td>{Product.thresh}</td>
                                                    <td>{Product.expDate}</td>
                                                    <td style={{ color: statusColor}}>{Product.status}</td>
                                                    
                                                </tr>
                                            )
                                        })
                                    }
                                    

                                    
                                </table>

                            </div>
                        </div>



                    </section>

                    

                </div>


                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={toggleModal}
                    contentLabel="Example Modal"
                    className={`bg-transparnt`}
                    style={{ 
                    overlay: {
                        position: "fixed",
                        top: "0",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "hsla(0, 0%, 0%, .8)",
                        zIndex:100000,
                        
                    },
                    }}
                >
                    <div className='modal1'>
                    <div className='modal1-content'>
                        <div className='close'>
                        <button onClick={() => setIsModalOpen(false)} style={{cursor:'pointer'}}>X</button>
                        </div>

                        <form className='product-form'>

                            <div>
                                <p>Product Name</p>
                                <input type="text" />
                            </div>

                            <div>
                                <p>Price</p>
                                <input type="text" placeholder='$32' />
                            </div>

                        

                            <div>
                                <p>Images</p>
                                <input type="file"
                                    accept="image/*"
                                    multiple
                                />
                            </div>

        

                            <div>
                                <p>Catergory</p>
                                <select name="" id="">

                                    <option value="skin">Sin cares</option>
                                    <option value="hair">Hair spa</option>

                                </select>
                            </div>

                            <div className='des'>
                                <p>Description</p>
                                <textarea></textarea>
                            </div>

                            <div className='btn'>
                                <button type="submit">SEND</button>
                            </div>
                        
                        </form>
                        

                    </div>

                    </div>
                    
                </Modal>

            </section>

        </div>


    )
}


const mapStateToProps = (state) => {
    return {
        appState: state.user,
    };
};


const mapDispatchToProps = (dispatch, encoded) => {
    return {
        disp_products: (payload) => dispatch(Products(payload)),
        disp_invoice_products: (payload) => dispatch(Invoice_Product(payload)),
        disp_view_invoice: (payload) => dispatch(View_invoice(payload)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Productmgt); 
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
                    {/* <DashHeader User={User} /> */}

                    <section className='sale-m' style={{
                        // backgroundColor: "red"
                    }} >


                        {

                            product ? (
                                <>
                                    {multiple.length > 0 &&
                                        <div className='sale-form' style={{ padding: 0 }}  >


                                            <section style={{ backgroundColor: "#fff", width: "100%", marginTop: -40 }}  >
                                                {/* paste here */}

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
                                                                        // backgroundColor: "red",
                                                                        width: "110%"
                                                                    }} >PROD.</th>
                                                                    <th style={{
                                                                        fontSize: 11,
                                                                        fontWeight: 500,
                                                                        // backgroundColor: "red",
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
                                                            // backgroundColor: "red",
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
                                                                    // Initialize sum variable
                                                                    let sum = 0;

                                                                    // Iterate through each object in the array
                                                                    for (let i = 0; i < multiple.length; i++) {
                                                                        // Add the price of the current object to the sum
                                                                        sum += multiple[i].totalCost;
                                                                    }
                                                                    // console.log(parseInt(sum*0.7/100))


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
                                                                    // Initialize sum variable
                                                                    let sum = 0;

                                                                    // Iterate through each object in the array
                                                                    for (let i = 0; i < multiple.length; i++) {
                                                                        // Add the price of the current object to the sum
                                                                        sum += multiple[i].totalCost;
                                                                    }
                                                                    // console.log(parseInt(sum*0.7/100))


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
                                                            // setProductSearch(item.name)
                                                            setselectedProduct(item)
                                                            setmultiple([item])

                                                        }}
                                                        key={index} style={{
                                                            backgroundColor: multiple.filter(e => e.id == item.id).length < 1 ? "#fff" : "rgb(0,0,0,0.1)",
                                                            margin: 9,
                                                            width: 120,
                                                            // height: 150,
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
                                                            // backgroundColor:"red"
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
                        }
                    </section>


                </div>

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
import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import DashHeader from '../Components/DashHeader'
import { NumberWithCommas } from '../utils'
import { SaveInvoiceModel, fetchAllProducts } from '../service/supabase-service'
import { connect } from 'react-redux'
import { Invoice_Product, Products, View_invoice } from '../redux/state/action'
import { Link, useNavigate } from 'react-router-dom'
import { CircularProgress, Divider } from '@mui/material'
import logo from '../images/logo.jpeg'


const Productsales = ({
    disp_products, disp_view_invoice,
    appState, disp_invoice_products
}) => {
    const AllProducts = appState.AllProducts;
    const User = appState.User;


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

    function handleInputChange(text) {
        const filteredSuggestionsByAllCharacter = AllProducts.filter(e => e.type == "PRODUCT").filter(
            state =>
                state.name.toLowerCase().includes(text.toLowerCase()) ||
                state.category.toLowerCase().includes(text.toLowerCase())
        );
        setProductSearch(text); // save typed characters to state
        setSuggestions(filteredSuggestionsByAllCharacter); // save filtered data to state
    }

    return (
        <div>
            {/* {console.log(User)} */}
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

                <Sidebar />

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
                                                                    <th style={{
                                                                        fontSize: 11,
                                                                        fontWeight: 500,
                                                                        // backgroundColor: "red",
                                                                        width: "50%"
                                                                    }} >QUAN.</th>
                                                                    <th style={{
                                                                        fontSize: 11,
                                                                        fontWeight: 500,
                                                                        // backgroundColor: "red",
                                                                        width: "40%"
                                                                    }} >SUBTOTAL</th>
                                                                    {/* <th>Action</th> */}
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
                                                                        <td style={{
                                                                            fontSize: 11,
                                                                            fontWeight: 500,
                                                                            width: "70%"
                                                                        }} >
                                                                            <div style={{
                                                                                display: "flex",
                                                                                flex: "row",
                                                                                justifyContent: "center",
                                                                                alignItems: "center",
                                                                                // backgroundColor:"red"
                                                                            }} >
                                                                                {/* <input
                                                                                style={{
                                                                                    height:30,
                                                                                    width:60
                                                                                }}
                                                                                    onChange={(e) => {
                                                                                        setQuantity(e.target.value);
                                                                                        console.log(e.target.value)
                                                                                    }}
                                                                                    value={item.qty}

                                                                                    type="number"
                                                                                    placeholder='QTY' /> */}

                                                                                <select
                                                                                    style={{
                                                                                        height: 30,
                                                                                        width: 60,
                                                                                        marginTop: -5
                                                                                    }}
                                                                                    onChange={(e) => {
                                                                                        let findIndex = multiple.findIndex(e => e.id == item.id)
                                                                                        let newData = {
                                                                                            ...item,
                                                                                            qty: e.target.value
                                                                                        }
                                                                                        multiple.splice(findIndex, 1, newData)
                                                                                        setmultiple(multiple)
                                                                                        setselectedProduct(item)
                                                                                    }}
                                                                                // value={item.qty} 
                                                                                >
                                                                                    {
                                                                                        [
                                                                                            1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                                                                                            11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                                                                                            21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                                                                                            31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                                                                                            41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
                                                                                            51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
                                                                                            61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
                                                                                            71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
                                                                                            81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
                                                                                            91, 92, 93, 94, 95, 96, 97, 98, 99, 100
                                                                                        ].map((item, index) => {
                                                                                            return <option key={index} >{item}</option>
                                                                                        })
                                                                                    }

                                                                                </select>

                                                                            </div>

                                                                        </td>
                                                                        <td style={{
                                                                            fontSize: 11,
                                                                            fontWeight: 500,
                                                                            // backgroundColor: "black",
                                                                            width: "40%"
                                                                        }} >
                                                                            {NumberWithCommas(`₦${item.metaData.price * item.qty}`)}
                                                                        </td>
                                                                        {/* <td
                                                                        onClick={() => {
                                                                            let position = multiple.findIndex(e => e.name == item.name)
                                                                            multiple.splice(position, 1) 
                                                                            setProductSearch("") 
                                                                            console.log(multiple)
                                                                        }}
                                                                        style={{
                                                                            cursor: "pointer",
                                                                            color: "crimson"
                                                                        }} >Remove </td> */}
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
                                                                Clear all
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
                                                                        branch:User.branch
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
                                                            >Generate quote</p>
                                                        </div>
                                                    </div>
                                                }
                                            </section>
                                        </div>
                                    }


                                    <div className='salesProductPreviewHolder' >
                                        <div className='sale-form' style={{ backgroundColor: "#fff" }} >

                                            <section>
                                                <h2>Search for products</h2>
                                                <div>
                                                    <input
                                                        onChange={(e) => {
                                                            setselectedProduct(null)
                                                            handleInputChange(e.target.value);
                                                        }}
                                                        value={productSearch}
                                                        type="text" name="" id="" placeholder='Enter product name' />

                                                    <div className='salesProductPreview' style={{ marginTop: 8 }}  >

                                                        {productSearch.length > 0 && !selectedProduct && suggestions.map((item, index) => {
                                                            return <div
                                                                onClick={() => {
                                                                    // setProductSearch(item.name)
                                                                    setselectedProduct(item)

                                                                    if (multiple.filter(e => e.id == item.id).length < 1) {
                                                                        multiple.push({
                                                                            ...item,
                                                                            qty: quantities,
                                                                            totalCost: item.metaData.price * quantities
                                                                        })
                                                                        setmultiple(multiple)
                                                                        console.log(multiple)
                                                                        setProductSearch("")
                                                                    }



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

                                                            // <div
                                                            //     onClick={() => {
                                                            //         setProductSearch(items.name)
                                                            //         setselectedProduct(items)
                                                            //         console.log(items)
                                                            //     }}

                                                            //     style={{
                                                            //         display: "flex",
                                                            //         flexDirection: "column",
                                                            //         backgroundColor: "#e5e5e5",
                                                            //         marginBottom: 12,
                                                            //         padding: 10, 
                                                            //         borderRadius: 7
                                                            //     }}>
                                                            //     <b
                                                            //         style={{
                                                            //             color: "black",
                                                            //             fontSize: 13,
                                                            //             cursor: "pointer", 

                                                            //         }}>{items.name}</b>
                                                            // </div>
                                                        })}

                                                    </div>
                                                </div>
                                            </section>


                                        </div>

                                        <div className='salesProductPreview' style={{ marginTop: -18 }}  >
                                            {
                                                AllProducts && AllProducts.filter(e => e.type == "PRODUCT").map((item, index) => {
                                                    return <div
                                                        onClick={() => {
                                                            // setProductSearch(item.name)
                                                            setselectedProduct(item)

                                                            if (multiple.filter(e => e.id == item.id).length < 1) {
                                                                multiple.push({
                                                                    ...item,
                                                                    qty: quantities,
                                                                    totalCost: item.metaData.price * quantities
                                                                })
                                                                setmultiple(multiple)
                                                                console.log(multiple)
                                                                setProductSearch("")
                                                            }



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


export default connect(mapStateToProps, mapDispatchToProps)(Productsales); 
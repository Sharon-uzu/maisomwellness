import React, { useState } from 'react'
import Sidebar from '../../Components/Sidebar'
import DashHeader from '../../Components/DashHeader'
import { PiExportBold } from "react-icons/pi";
import { BsFileBarGraphFill } from "react-icons/bs";
import { BiSolidReceipt } from "react-icons/bi";
import { IoIosPricetags } from "react-icons/io";
import { FaDeleteLeft, FaUserPlus } from "react-icons/fa6";
import Chart from 'react-apexcharts';
import { IoFilterOutline } from "react-icons/io5";
import { Backdrop, Box, CircularProgress, Divider, Fade, Modal, colors } from '@mui/material';
import { connect } from 'react-redux';
import { AdminDeleteInvoice, deleteInvoice, fetchAllInvoicesAdmin, fetchAllInvoicesBySalesRep, fetchStaffsModel } from '../../service/supabase-service';
import { Invoice_Product, Saved_invoices, View_invoice } from '../../redux/state/action';
import { Notify, NumberWithCommas, formatDate } from '../../utils';
import { FaArrowAltCircleRight, FaPrint, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import AdminSidebar from '../../Components/admin-sidebar';



const Staffmgt = ({
    appState, disp_savedInvoice, disp_invoice_products, disp_view_invoice
}) => {
    const User = appState.User;
    const InvoiceProducts = appState.AllInvoiceProducts
    const SavedInvoices = appState.SavedInvoices;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [staffs, setstaffs] = React.useState([])

    // const SavedInvoices = []

    const [loading, setloading] = React.useState(false)
    const [amount_Array, setamount_Array] = React.useState([])
    const navigate = useNavigate();

    const amountSold = SavedInvoices && SavedInvoices.length > 0 ? SavedInvoices.filter(e => e.paid == true).reduce((acc, item) => acc + parseInt(item.amount), 0) : 0;


    const style = {
        position: 'absolute',
        top: '3%',
        left: '25%',
        // transform: 'translate(-50%, -50%)',
        width: "50%",
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 4,
        maxHeight: "90%",
        p: 4,
        overflow: "auto",
    };


    function FetchStaffs() {
        setloading(true)
        fetchStaffsModel()
            .then(response => {
                setloading(false)
                if (!response.error) {
                    setstaffs(response.data)
                } else {
                    alert(response.error.message)
                    setstaffs([])
                }
                console.log(response)
            })
            .catch(error => {
                setloading(false)
                setstaffs([])
            })
    }


    React.useEffect(() => {
        FetchStaffs()

    }, [])


    return (
        <div>
            {/* {console.log(amount_Array)} */}

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

            <section className='main-dash'>

                <AdminSidebar />

                <div className='main'>
                    {/* <DashHeader User={User} /> */}


                    <div className="product">
                        <div className="top">
                            <h3>Staff management</h3>

                            <div>

                            </div>

                        </div>
                        {/* {console.log(SavedInvoices)} */}

                        <table>
                            <tr>
                                <th><b>ID</b></th>
                                <th><b>Name</b></th>
                                <th><b>Account type</b></th>
                                <th><b>Password</b></th>
                                <th><b>Branch</b></th>
                                {/* <th><b>Action</b></th> */}
                            </tr>

                            {staffs && staffs.map((item, index) => {
                                return <tr className='t-row'>

                                    <td>{item.uuid.slice(-5)}</td>
                                    <td>{item.name}</td>
                                    <td>{item.type}</td>
                                    <td><b>{item.password}</b></td>
                                    <td><b>{item.branch}</b></td>
                                    {/* <td
                                        onClick={() => {
                                            handleOpen()
                                        }}
                                        style={{
                                            cursor: "pointer",
                                            color: "#252C58",
                                            fontWeight: 700,
                                            textAlign: "center"
                                        }} >View <FaArrowAltCircleRight /> </td> */}

                                </tr>
                            })}


                        </table>


                    </div>


                </div>

            </section>



            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>

                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "center",
                            // backgroundColor: "darkred",
                            width: "100%",
                            // height: 70,
                            padding: 10
                        }}>
                            <section className='invoice' style={{ padding: 20, backgroundColor: "lightgrey", }} id="pdf-content">

                                <Divider style={{ marginTop: 0 }} />
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 20,
                                    marginBottom: 6,
                                }}>
                                    <b style={{ color: "#000", fontSize: 14 }} >Invoice No.:</b>
                                    <p style={{ color: "#000", fontSize: 13 }} >{InvoiceProducts.invoiceID}</p>
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: 6,
                                }}>
                                    <b style={{ color: "#000", fontSize: 14 }} >Date:</b>
                                    <p style={{ color: "#000", fontSize: 13 }} >{formatDate(InvoiceProducts.created_at)}</p>
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: 6,
                                }}>
                                    <b style={{ color: "#000", fontSize: 14 }} >Sales Person:</b>
                                    <p style={{ color: "#000", fontSize: 13 }} >{User.name}</p>
                                </div>

                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: 6,
                                }}>
                                    <b style={{ color: "#000", fontSize: 14 }} >Branch</b>
                                    <p style={{ color: "#000", fontSize: 13 }} >{InvoiceProducts.branch}</p>
                                </div>


                                <table className='table1' style={{ marginTop: 30 }} >
                                    <tr className='tr1'>
                                        <th style={{
                                            fontSize: 11,
                                            fontWeight: 500,
                                            // backgroundColor: "red",
                                            width: "16%",
                                            color: "#000"
                                        }}>S/N</th>
                                        <th style={{
                                            fontSize: 11,
                                            fontWeight: 500,
                                            // backgroundColor: "#fff",
                                            width: "90%",
                                            color: "#000"
                                        }}>PRODUCT</th>
                                        <th style={{
                                            fontSize: 11,
                                            fontWeight: 500,
                                            // backgroundColor: "#000",
                                            width: "30%",
                                            color: "#000"
                                        }}>PRICE</th>
                                        <th style={{
                                            fontSize: 11,
                                            fontWeight: 500,
                                            // backgroundColor: "red",
                                            width: "30%",
                                            color: "#000"
                                        }}>QTY.</th>
                                        <th style={{
                                            fontSize: 11,
                                            fontWeight: 500,
                                            // backgroundColor: "#000",
                                            width: "30%",
                                            color: "#000"
                                        }}>SUBTOTAL</th>
                                    </tr>
                                    {
                                        InvoiceProducts && InvoiceProducts.product && InvoiceProducts.product.map((items, index) => {
                                            return <tr key={index} style={{ marginBottom: 5 }} >
                                                <td style={{
                                                    fontSize: 11,
                                                    fontWeight: 500,
                                                    // backgroundColor: "red",
                                                    width: "16%",
                                                    color: "#000"
                                                }}>{index + 1}</td>
                                                <td style={{
                                                    fontSize: 11,
                                                    fontWeight: 500,
                                                    color: "#000",
                                                    marginRight: 8,
                                                    width: "90%",
                                                    fontWeight: 700,
                                                }}>{items.name}</td>
                                                <td style={{
                                                    fontSize: 11,
                                                    fontWeight: 500,
                                                    // backgroundColor: "red",
                                                    width: "30%",
                                                    textAlign: "center",
                                                    color: "#000"
                                                }}> {NumberWithCommas(`₦${items.metaData.price}`)} </td>
                                                <td style={{
                                                    fontSize: 11,
                                                    fontWeight: 500,
                                                    // backgroundColor: "red",
                                                    width: "30%",
                                                    textAlign: "center",
                                                    color: "#000"
                                                }}>{items.qty}</td>
                                                <td style={{
                                                    fontSize: 11,
                                                    fontWeight: 500,
                                                    // backgroundColor: "red",
                                                    width: "30%",
                                                    textAlign: "center",
                                                    color: "#000"
                                                }}> {NumberWithCommas(`₦${items.metaData.price * items.qty}`)} </td>
                                            </tr>
                                        })
                                    }

                                </table>

                                <Divider style={{ marginTop: 20 }} />

                                {InvoiceProducts.paid && <>

                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        // justifyContent: "space-between",
                                        marginTop: 20,
                                        marginBottom: 6,
                                    }}>
                                        <b style={{ color: "#000", fontSize: 10 }} >Cost of product</b>
                                        <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} > ₦{NumberWithCommas(InvoiceProducts.payData.productCost)}</p>
                                    </div>
                                    {InvoiceProducts.payData.discount_amount &&
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            // justifyContent: "space-between",
                                            marginTop: 20,
                                            marginBottom: 6,
                                        }}>
                                            <b style={{ color: "#000", fontSize: 10 }} >Discount</b>
                                            <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} > ₦{NumberWithCommas(InvoiceProducts.payData.discount_amount)}</p>
                                        </div>
                                    }

                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        // justifyContent: "space-between",
                                        marginTop: 20,
                                        marginBottom: 6,
                                    }}>
                                        <b style={{ color: "#000", fontSize: 10 }} >VAT</b>
                                        <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} >₦{NumberWithCommas(InvoiceProducts.payData.taxAmount)}</p>
                                    </div>

                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        // justifyContent: "space-between",
                                        marginTop: 20,
                                        marginBottom: 6,
                                    }}>
                                        <b style={{ color: "#000", fontSize: 10 }} >Total</b>
                                        <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} >₦{NumberWithCommas(InvoiceProducts.payData.productCostPlusVat)}</p>
                                    </div>


                                    <Divider style={{ marginTop: 20 }} />

                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginTop: 20,
                                        marginBottom: 6,
                                    }}>
                                        <b style={{ color: "#000", fontSize: 14 }} >Payment method</b>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        // justifyContent: "space-between",
                                        marginTop: 20,
                                        marginBottom: 6,
                                    }}>
                                        <b style={{ color: "#000", fontSize: 10 }} >{InvoiceProducts.payData.paymentMetheod}: </b>
                                        <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} > ₦{NumberWithCommas(InvoiceProducts.payData.amountToPay)}</p>
                                    </div>


                                    {InvoiceProducts.payData.complimentaryMethod != "SELECT" && <>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            // justifyContent: "space-between",
                                            marginTop: 20,
                                            marginBottom: 6,
                                        }}>
                                            <b style={{ color: "#000", fontSize: 10 }} >{InvoiceProducts.payData.complimentaryMethod}: </b>
                                            <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} >₦{NumberWithCommas(InvoiceProducts.payData.productCostPlusVat - InvoiceProducts.payData.amountToPay)}</p>
                                        </div>
                                    </>}



                                    {InvoiceProducts.customerphone && <>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            // justifyContent: "space-between",
                                            marginTop: 20,
                                            marginBottom: 6,
                                        }}>
                                            <b style={{ color: "#000", fontSize: 10 }} >Customer phone: </b>
                                            <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} >{InvoiceProducts.customerphone}</p>
                                        </div>
                                    </>}
                                    {InvoiceProducts.marketerid ? <>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            // justifyContent: "space-between",
                                            marginTop: 20,
                                            marginBottom: 6,
                                        }}>
                                            <b style={{ color: "#000", fontSize: 10 }} >Customer type </b>
                                            <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} >Referred</p>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            // justifyContent: "space-between",
                                            marginTop: 20,
                                            marginBottom: 6,
                                        }}>
                                            <b style={{ color: "#000", fontSize: 10 }} >Marketer: </b>
                                            <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} >{InvoiceProducts.marketerid}</p>
                                        </div>
                                    </> : <>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            // justifyContent: "space-between",
                                            marginTop: 20,
                                            marginBottom: 6,
                                        }}>
                                            <b style={{ color: "#000", fontSize: 10 }} >Customer type </b>
                                            <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} >Walk-in customer</p>
                                        </div>
                                    </>}

                                </>
                                }


                            </section>

                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 20,
                            backgroundColor: "#fff",
                            width: "100%", height: 70,
                            padding: 10
                        }}>

                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }} >

                                <p
                                    onClick={() => {
                                        handleClose()
                                    }}
                                    style={{
                                        backgroundColor: '#fff',
                                        color: "#FA5A7D",
                                        padding: 5,
                                        paddingRight: 10,
                                        paddingLeft: 10,
                                        // marginLeft: 10,
                                        borderRadius: 6,
                                        cursor: "pointer",
                                        fontSize: 13,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: 500
                                    }}
                                >
                                    Close   <FaTimes style={{ marginLeft: 2 }} />
                                </p>


                                <p
                                    onClick={() => {
                                        handleClose()
                                        setloading(true)
                                        AdminDeleteInvoice(InvoiceProducts.invoiceID)
                                            .then(responseX => {
                                                fetchAllInvoicesAdmin()
                                                    .then(response => {
                                                        disp_savedInvoice(response.data)
                                                        Notify("Quote deleted successfully")
                                                        setTimeout(() => {
                                                            setloading(false)
                                                            disp_view_invoice(null)
                                                        }, 2000);

                                                    })
                                                    .catch(error => {
                                                        setloading(false)
                                                    })

                                            })
                                            .catch(error => {
                                                setloading(false)

                                            })
                                    }}
                                    style={{
                                        backgroundColor: '#fff', color: "#FA5A7D",
                                        padding: 5,
                                        paddingRight: 10,
                                        paddingLeft: 10,
                                        marginLeft: 10,
                                        borderRadius: 6,
                                        cursor: "pointer",
                                        fontSize: 13,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: 500
                                    }}
                                >
                                    Delete   <FaDeleteLeft style={{ marginLeft: 2 }} />
                                </p>


                            </div>
                        </div>



                    </Box>
                </Fade>
            </Modal>




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
        disp_savedInvoice: (payload) => dispatch(Saved_invoices(payload)),
        disp_invoice_products: (payload) => dispatch(Invoice_Product(payload)),
        disp_view_invoice: (payload) => dispatch(View_invoice(payload)),

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Staffmgt);

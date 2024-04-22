import React, { useState } from 'react'
import Sidebar from '../../Components/Sidebar'
import DashHeader from '../../Components/DashHeader'
import { PiExportBold } from "react-icons/pi";
import { BsFileBarGraphFill } from "react-icons/bs";
import { BiSolidReceipt } from "react-icons/bi";
import { IoIosPricetags } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa6";
import Chart from 'react-apexcharts';
import { IoFilterOutline } from "react-icons/io5";
import { Backdrop, Box, CircularProgress, Divider, Fade, Modal, colors } from '@mui/material';
import { connect } from 'react-redux';
import { fetchAllInvoicesAdmin, fetchAllInvoicesBySalesRep } from '../../service/supabase-service';
import { Invoice_Product, Saved_invoices, View_invoice } from '../../redux/state/action';
import { NumberWithCommas, formatDate } from '../../utils';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import AdminSidebar from '../../Components/admin-sidebar';



const Dashboard = ({
  appState, disp_savedInvoice, disp_invoice_products, disp_view_invoice
}) => {
  const User = appState.User;
  const InvoiceProducts = appState.AllInvoiceProducts
  const SavedInvoices = appState.SavedInvoices;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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


  function FetchInvoices() {
    setloading(true)
    fetchAllInvoicesAdmin()
      .then(response => {
        console.log(response)
        setloading(false)
        if (!response.error) {
          disp_savedInvoice(response.data)
        } else {
          alert(response.error.message)
          disp_savedInvoice([])
        }

      })
      .catch(error => {
        setloading(false)
        disp_savedInvoice([])
      })
  }


  React.useEffect(() => {
    // Get current date and time
    const currentDate = new Date();

    // Extract date components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
    const day = String(currentDate.getDate()).padStart(2, '0');

    // Extract time components
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');

    // Get timezone offset in minutes and convert to hours and minutes
    const timezoneOffsetHours = Math.abs(currentDate.getTimezoneOffset() / 60);
    const timezoneOffsetMinutes = Math.abs(currentDate.getTimezoneOffset() % 60);
    const timezoneSign = currentDate.getTimezoneOffset() > 0 ? '-' : '+';

    // Construct the formatted date string
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezoneSign}${String(timezoneOffsetHours).padStart(2, '0')}:${String(timezoneOffsetMinutes).padStart(2, '0')}`;

    FetchInvoices()

    if (SavedInvoices.length > 0) {
      let amountArray = []
      for (let i = 0; i < SavedInvoices.length; i++) {
        const element = SavedInvoices[i];
        amountArray.push(element.amount)

      }
      setamount_Array(amountArray)
    }
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

        {
          User.type == "Admin" ? <AdminSidebar /> : <Sidebar />
        }

        <div className='main'>
          <DashHeader User={User} />

          <div className="first">

            <div className="first-l">

              <div className="first-l-top">
                <div>
                  <h3>Today’s Sales</h3>
                  <p>Sales Summary</p>
                </div>

                {/* <span className='export'>
                  <PiExportBold className='e-i' />
                  export

                </span> */}

              </div>

              <div className="first-l-cards">

                <div className="first-l-card" style={{ backgroundColor: '#FFE2E5', wordWrap: "break-word" }}>
                  <div>
                    <span style={{ backgroundColor: '#FA5A7D' }}>
                      <BsFileBarGraphFill className='c-i' />
                    </span>
                    <h2>₦{NumberWithCommas(amountSold)}</h2>
                    <h6>Total Sales.</h6>
                    {/* <p>+8% from yesterday</p> */}
                  </div>

                </div>
                <div className="first-l-card" style={{ backgroundColor: '#FFF4DE' }}>
                  <div>
                    <span style={{ backgroundColor: '#FF947A' }}>
                      <BiSolidReceipt className='c-i' />
                    </span>
                    <h2>{SavedInvoices && SavedInvoices.length}</h2>
                    <h6>Total Order</h6>
                    {/* <p>+5% from yesterday</p> */}
                  </div>
                </div>

                <div className="first-l-card" style={{ backgroundColor: '#DCFCE7' }}>
                  <div>
                    <span style={{ backgroundColor: '#3CD856' }}>
                      <IoIosPricetags className='c-i' />
                    </span>
                    <h2>{SavedInvoices && SavedInvoices.filter(e => e.paid == true).length}</h2>
                    <h6>Product Sold</h6>
                    {/* <p>+1.2% from yesterday</p> */}

                  </div>
                </div>


                <div className="first-l-card" style={{ backgroundColor: '#F3E8FF' }}>
                  <div>
                    <span style={{ backgroundColor: '#BF83FF' }}>
                      <FaUserPlus className='c-i' />
                    </span>
                    <h2>{SavedInvoices && SavedInvoices.filter(e => e.customerphone.length > 5).length}</h2>
                    <h6>Walk-in Customers</h6>
                    {/* <p>+0.5% from yesterday</p> */}
                  </div>
                </div>

              </div>

            </div>

            <div className="first-r">
              <div>
                <h3>Concervion volume</h3>
                {/* <Chart 
                  options={state.options}
                  series={state.series}
                  type="line"
                  width="100%"
                  height='300'
                  
                  
                  
                /> */}


                <Chart
                  type='line'
                  width='100%'
                  height='270'
                  series={[
                    {
                      names: 'one',
                      data: amount_Array,
                      // data: [800, 88, 150, 240, 80]
                    },
                    // {
                    //   names: 'two',
                    //   data: [1,2,3,4,5]
                    // }
                  ]}

                  options={
                    {
                      colors: ['#FA5A7D', '#BF83FF'],
                      xaxis: {
                        categories: [1, 2, 3, 4, 5]
                      },

                    }


                  }
                />


              </div>

            </div>

          </div>



          <div className="product">
            <div className="top">
              <h3>Today's sales</h3>

              <div>
                {/* <button>Add Product</button> */}

                {/* <span className="fil">
                  <IoFilterOutline className='f-i' />
                  filter
                </span> */}

                {/* <span className="fil">Download All</span> */}

              </div>

            </div>
            {/* {console.log(SavedInvoices)} */}

            <table>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Item(s)</th>
                <th>Customer type</th>
                <th>Date</th>
                <th>Sales rep</th>
                <th>Branch</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

              {SavedInvoices && SavedInvoices.map((item, index) => {
                return <tr className='t-row'>

                  <td>{item.invoiceID}</td>
                  <td>₦{NumberWithCommas(item.amount)}</td>
                  <td>{item.product.length}</td>
                  <td>{item.marketerid ? "Referred" : "Walk-in"}</td>
                  <td>{formatDate(item.created_at)}</td>
                  <td><b>{item.generated_by}</b></td>
                  <td><b>{item.branch}</b></td>
                  <td className='av' style={{ color: item.paid == true ? "green" : "crimson" }} >{item.paid == true ? "PAID" : "NOT PAID"}</td>
                  <td
                    onClick={() => {
                      handleOpen()
                      disp_invoice_products(item)
                      console.log(item)
                      // disp_view_invoice(true)
                      // navigate("/invoice")
                    }}
                    style={{
                      cursor: "pointer",
                      color: "#252C58",
                      fontWeight: 700,
                      textAlign: "center"
                    }} >View <FaArrowAltCircleRight /> </td>

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
                  {/* <p style={{ color: "#000", fontSize: 13 }} >{getFormattedDate()}</p> */}
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

                {InvoiceProducts.paid && <>


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
                    <b style={{ color: "#000", fontSize: 10 }} >{"paymentMetheod"}: </b>
                    <p style={{ color: "#000", fontSize: 10, marginLeft: 10 }} > ₦{NumberWithCommas(InvoiceProducts.payData.amountToPay)}</p>
                  </div>
                  {"complimentaryMethod" != "SELECT" && <>
                    <div style={{
                      display: "flex",
                      flexDirection: "row",
                      // justifyContent: "space-between",
                      marginTop: 20,
                      marginBottom: 6,
                    }}>
                      <b style={{ color: "#000", fontSize: 10 }} >{"complimentaryMethod"}: </b>
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

            <Divider style={{ marginTop: 20 }} />


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


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar'
import DashHeader from '../Components/DashHeader'
import { PiExportBold } from "react-icons/pi";
import { BsFileBarGraphFill } from "react-icons/bs";
import { BiSolidReceipt } from "react-icons/bi";
import { IoIosPricetags } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa6";
import Chart from 'react-apexcharts';
import { IoFilterOutline } from "react-icons/io5";
import { CircularProgress, colors } from '@mui/material';
import { connect } from 'react-redux';
import { fetchAllInvoicesByBranch, fetchAllInvoicesBySalesRep } from '../service/supabase-service';
import { Invoice_Product, Saved_invoices, View_invoice } from '../redux/state/action';
import { NumberWithCommas, formatDate } from '../utils';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import AdminSidebar from '../Components/admin-sidebar';



const Dashboard = ({
  appState, disp_savedInvoice, disp_invoice_products, disp_view_invoice
}) => {
  const User = appState.User;
  const SavedInvoices = appState.SavedInvoices
  // const SavedInvoices = []

  const [loading, setloading] = React.useState(false)
  const [amount_Array, setamount_Array] = React.useState([])
  const navigate = useNavigate();

  const amountSold = SavedInvoices && SavedInvoices.length > 0 ? SavedInvoices.filter(e => e.paid == true).reduce((acc, item) => acc + parseInt(item.amount), 0) : 0;



  function FetchInvoices() {
    setloading(true)
    fetchAllInvoicesByBranch(User.branch)
      .then(response => {
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

              <div className="first-l-cards" style={{zIndex:1}}>

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
              <h3>Quotes raised</h3>

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
                <th>Status</th>
                {/* <th>Action</th> */}
              </tr>

              {SavedInvoices && SavedInvoices.map((item, index) => {
                return <tr className='t-row'>

                  <td>{item.invoiceID}</td>
                  <td>₦{NumberWithCommas(item.amount)}</td>
                  <td>{item.product.length}</td>
                  <td>{item.marketerid ? "Referred" : "Walk-in"}</td>
                  <td>{formatDate(item.created_at)}</td>
                  <td className='av' style={{ color: item.paid == true ? "green" : "crimson", textAlign:'start' }} >{item.paid == true ? "PAID" : "NOT PAID"}</td>
                  {/* <td
                    onClick={() => {
                      disp_invoice_products({
                        invoiceID: item.invoiceID
                      })
                      disp_view_invoice(true)
                      navigate("/invoice")
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

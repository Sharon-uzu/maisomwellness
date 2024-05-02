import React, { useState } from 'react'
import AdminSidebar from '../../Components/admin-sidebar'
import DashHeader from '../../Components/DashHeader'
import { CircularProgress, Divider } from '@mui/material'
import { CiSearch } from "react-icons/ci";
import PayCard from '../../Components/PayCard'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#62B2FD', '#9BDFC4', '#F99BAB', '#FFB44F', '#9F97F7'];

const data = [
  { name: 'Marketing', value: 400, price: '$4,000' },
  { name: 'Sales', value: 300, price: '$3,000' },
  { name: 'Admin', value: 300, price: '$3,000' },
  { name: 'HR Dev.', value: 200, price: '$25,00' },
  { name: 'Operations', value: 200, price: '$12,500' },
];


const Payments = [
    {
        id:1,
        to:'Ahmed Rashdan',
        value:'10,000.00',
        time:'09:30:12 - 28/03/23',
        status:'Completed',
    },

    {
        id:2,
        to:'Ahmed Rashdan',
        value:'10,000.00',
        time:'09:30:12 - 28/03/23',
        status:'Completed',
    },

    {
        id:3,
        to:'Ralph Edward',
        value:'50,000.00',
        time:'09:30:12 - 28/03/23',
        status:'Pending',
    },

    {
        id:4,
        to:'Ahmed Rashdan',
        value:'10,000.00',
        time:'09:30:12 - 28/03/23',
        status:'Completed',
    },

    {
        id:5,
        to:'Ahmed Rashdan',
        value:'10,000.00',
        time:'09:30:12 - 28/03/23',
        status:'Completed',
    },

    {
        id:6,
        to:'Ralph Edward',
        value:'50,000.00',
        time:'09:30:12 - 28/03/23',
        status:'Pending',
    },
]


const getBgColor = (bg) => {
    switch (bg) {
        case 'Completed':
            return '#EDFFFB'; // Green
        case 'Pending':
            return '#FFF2F3'; // Red
        default:
            return '#000000'; // Default color
    }
};

const getStatusColor = (status) => {
    switch (status) {
        case 'Completed':
            return '#36B293'; // Green
        case 'Pending':
            return '#E5454E'; // Red
        default:
            return '#fff'; // Default color
    }
};



const renderCustomLegend = () => {
    return (
      <div>
        {data.map((entry, index) => (
          <div key={`legend-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', marginLeft: '20px' }}>
            <div style={{ width: '10px', height: '10px', backgroundColor: COLORS[index % COLORS.length], marginRight: '10px' }} />
            <span>{entry.name} - {entry.price}</span>
          </div>
        ))}
      </div>
    );
  };


  

const Payroll = ({
    disp_products, disp_view_invoice,
    appState, disp_invoice_products
}) => {

   

    const [loading, setloading] = React.useState(false)

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
                    <DashHeader />

                    <div className="payroll">

                        <div className="pay-top">


                            <div className="paytop-l">

                                <div className="paycard">
                                    <PayCard info = 'Company Expenses' price='$360,978,720' btn = '+27.56%' color='#226BAF' bg='#D6E5F3'/>
                                </div>

                                <div className="paycard">
                                    <PayCard info = 'Monthly Payroll' price='$60,978,720' btn = '-18.56%' color='#CD1010' bg='#F3D6D6'/>
                                </div>

                                <div className="paycard">
                                    <PayCard info='Upcoming Payments' price='$10,978,720' btn='+27.56%' color='#226BAF' bg='#D6E5F3'/>
                                </div>

                                <div className="paycard">
                                    <div className="trans">

                                        <div className="trans-c">
                                            <h6>Transactions</h6>

                                            <div className='trans-s'>
                                                <div className="trans1">
                                                    <p>Completed</p>
                                                    <h5 style={{color:'#36B293'}}>287</h5>
                                                </div>

                                                <div className="trans1">
                                                    <p>Upcoming</p>
                                                    <h5 style={{color:'#4C98FF'}}>100</h5>
                                                </div>

                                                <div className="trans1">
                                                    <p>Pending</p>
                                                    <h5 style={{color:'#F6BB22'}}>90</h5>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <div className="paytop-r">

                                <div className='pie' style={{ height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                    <PieChart width={400} height={200} >
                                        <Pie
                                        data={data}
                                        cx={100}
                                        cy={100}
                                        width={400} height={200}
                                        outerRadius={70}
                                        fill="#8884d8"
                                        dataKey="value"
                                        >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend
                                        content={renderCustomLegend}
                                        layout="vertical"
                                        align="right"
                                        verticalAlign="middle"
                                        iconSize={10}
                                        iconType="circle"
                                        />
                                    </PieChart>
                                </div>
                                
                            </div>


                        </div>


                        <div className="payroll-table">
                            <div className="p-t-c">

                            
                                <div className="pay-t-top">
                                    <h2>Transaction</h2>

                                    <div className="search">
                                        <input type="search" placeholder='Type to search' />
                                        <CiSearch className='s-i'/>
                                    </div>
                                </div>



                                <table>
                                    <tr>
                                        <th>To</th>
                                        <th>Value</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                        
                                    </tr>


                                    {
                                        Payments.map((Payment, id)=>{
                                            const statusColor = getStatusColor(Payment.status);
                                            const BgColor = getBgColor(Payment.status);
                                            return(
                                                <tr key={id}>
                                                    <td>{Payment.to}</td>
                                                    <td>{Payment.value}</td>
                                                    <td>{Payment.time}</td>
                                                    <td><button style={{ color: statusColor, backgroundColor:BgColor }}>{Payment.status}</button></td>
                                                    
                                                </tr>
                                            )
                                        })
                                    }
                                    

                                    
                                </table>




                            </div>


                        </div>


                    </div>



                       


                        

                                    

                </div>

            </section>

        </div>


    )
}








export default Payroll; 
import React, { Component } from 'react'
import axios from 'axios';
import './reservation.css';
import moment from 'moment'
import { Table } from 'reactstrap';
import { connect } from "react-redux";


class ListReservation extends Component {
    constructor(props){
        super(props)
        this.state={
            reservationsList:[],
            selectedRadio:"",
            reservations:[]
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3005/reservation/view',{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            this.setState(()=>({
                reservationsList:response.data
            }))
           
        })
    }
    handleRadioUpcoming=(e)=>{
  
      this.setState({

        selectedRadio:e.target.value,
        reservations:this.state.reservationsList.filter((item)=>{
          
          return new Date(item.date)>new Date()
        })
      })
   
    }

    handleRadioPast=(e)=>{
   
      this.setState({
        selectedRadio:e.target.value,
        
        reservations:this.state.reservationsList.filter((item)=>{
          
          return new Date(item.date)<new Date()
        })
      })
      
    
    }
    handleRadioAll=(e)=>{
   
      this.setState({
        selectedRadio:e.target.value,
        reservations:this.state.reservationsList
          
        
      })
  
  
    }

    
    render() {
        return (
            <div>
                <h1 className="pt-4">List of booked reservations </h1>
                 {this.state.reservationsList.length<1 && <h3>No reservation done yet</h3>}
                <div  className="radiobtn pt-3">

                  <div className="pr-5">
                    <input type="radio"
                    checked={this.state.selectedRadio==="upcoming reservations"}
                    className="mr-2"
                    value="upcoming reservations"  
                    onChange={this.handleRadioUpcoming}
                    />
                    <label className="headercolor"  >
                      Upcoming Reservations
                    </label>
                  </div>

                  <div className="pr-5">
                    <input type="radio"
                     checked={this.state.selectedRadio==="past reservations"}
                    className="mr-2"
                    value="past reservations"
                    onChange={this.handleRadioPast}
                    />
                    <label className="headercolor">
                      Past Reservations
                    </label>
                  </div>

                  <div className="pr-5">
                  <div >
                    <input type="radio"
                    checked={this.state.selectedRadio==="all reservations"}
                    className="mr-2"
                    value="all reservations"
                    onChange={this.handleRadioAll}
                    />
                    <label className="headercolor">
                      All Reservations
                    </label>
                  </div>
                </div>
                </div>
              <div className="pt-3">
              <Table hover>
                <thead>
                  <tr> 
                    <th> Name </th>  
                    <th>Mobile </th>
                    <th>Service</th>
                    <th> Date </th>
                    <th> Slot </th>
                    <th> Message </th> 
                  </tr>
                </thead>

              <tbody>
              {
                this.state.reservations.map(form =>{
                  return (
                    
                    <tr scope="row" key ={form._id}>
                      <td> { form.username.username } </td>
                      <td> { form.mobile } </td>
                      <td> { form.service }</td>
                  <td>{moment(new Date(form.date)).format('DD-MM-YYYY')}</td>
                      <td> { form.timeSlot }</td>
                      <td> { form.message}</td>
                    </tr>
                  )
                })
              }
              </tbody>
              </Table>
              </div>  
            
          </div>
        )
    }
}
const mapStateToProps=state=>{
  return{
    user:state.user,
    reservations:state.reservations
  }
}

export default  connect(mapStateToProps)(ListReservation)

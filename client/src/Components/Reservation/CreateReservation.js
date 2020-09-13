import React, { Component, useState,useEffect } from 'react'
import axios from 'axios' 
import { ToastContainer, toast } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './reservation.css';
import { connect } from 'react-redux';

const CreateReservation =()=> {

    // constructor(){
    //     super()
    //     this.state={
    //         service:'',
    //         servicesArray:['Hair Cut','Face Wash','Face-De-Tan','Make-Up'],
    //         date:'',
    //         timeSlot:'',
    //         message:'',
    //         mobile:'',
    //         username:'',
    //         slotArrayInitial:['10-11','11-12','12-1','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
    //         slotArray1:[],
    //         loggedInUserId:'',
    //         error:false,
    //         notice:''      
    //     }
        
    // }

    const [service,useservice]=useState('')
    const [servicesArray,useservicesArray]=useState(['Hair Cut','Face Wash','Face-De-Tan','Make-Up'])
    const [date,usedate]=useState('')
    const [timeSlot,usetimeSlot]=useState('')
    const [message,usemessage]=useState('')
    const [mobile,usemobile]=useState('')
    const [username,useusername]=useState('')
    const [slotArrayInitial,useslotArrayInitial]=useState(['10-11','11-12','12-1','2-3','3-4','4-5','5-6','6-7','7-8','8-9'])
    const [slotArray1,useslotArray1]=useState([])
    const [loggedInUserId,useloggedInUserId]=useState('')
    const [error,useerror]=useState(false)
    const [notice,usenotice]=useState('')


    const errMessage=()=>{
        if(
            service ==="" &&  
            mobile === "" &&
            date===""&&
            timeSlot===""&&
            mobile.length===10
        ){
            //this.setState({error:true})
            useerror(true)

        }
    }
    // componentDidMount(){
        // axios.get('http://localhost:3005/users/loggedinuser',{
        //     headers:{
        //         'x-auth':localStorage.getItem('token')
        //     }
        // })

        // .then((response)=>{
        //     this.setState(()=>({
        //         loggedInUserId:response.data._id
        //     }))
        // })


        // .catch(err=>console.log(err))
    // }

    useEffect(()=>{

        axios.get('http://localhost:3005/users/loggedinuser',{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })

        .then((response)=>{
            // this.setState(()=>({
            //     loggedInUserId:response.data._id
            // }))
            useloggedInUserId(response.data._id)
        })


        .catch(err=>console.log(err))
        
    },[])

  
    // const handleChange=(e)=>{
    //     e.persist()
    //     // this.setState(()=>({
    //     //     [e.target.name]:e.target.value
    //     // }))



    // }


    const handleDateChange=(e)=>{
        e.persist()
        const date=e.target.value
        // this.setState({date},function(){
        //     const formData={
        //         date:this.state.date
        //     }
               
            
        
           
        
        const formData={
            date:e.target.value
        }

        axios.post(`http://localhost:3005/reservation/find-slots`,formData,{
                headers:{
                    'x-auth':localStorage.getItem('token')
                }
        })
        .then(response=>{
            // this.setState(()=>({
            //    slotsOnDate:response.data,
            //     slotArray1:slotArrayInitial.filter(function(item){
            //         return response.data.indexOf(item)===-1
            //     })
                
            // }))
            console.log(response)

            useslotArray1({
                slotArray1:slotArrayInitial.filter(function(item){
                    return response.data.indexOf(item)===-1
                })
            })
            
    
        })


    }
        
        

    

    const handleSubmit=(e)=>{
        e.preventDefault()
        
        if(this.state.mobile.length!==10){
            this.setState({
                notice:'mobile number must be of 10 digits'
            })

            setTimeout(()=>{
                this.setState({notice:''})

            },2000)
            return
        }
        const formData={
            date:this.state.date,
            service:this.state.service,
            timeSlot:this.state.timeSlot,
            message:this.state.message,
            username:this.state.loggedInUserId,
            mobile:this.state.mobile

        }

        axios.post(`http://localhost:3005/reservation/create`,formData,{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
          
            
            if(response.data.error){
              
                this.setState(()=>({
                    date:'',timeSlot:'',message:'',mobile:'',username:'',service:''
                }))


            }else{
                
                
                this.setState(()=>({
                    date:'',timeSlot:'',message:'',mobile:'',username:'',service:''
                }))
                this.props.history.push('/reservation/view')

                
            }
 
        })
        .catch(err=>{
            console.log(err)
        })

    }
    const notify = () => {
        toast.success("Request Sent Successfully", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
        this.setState({error:false})
        
      };

        
        return (
            
            <div>
                <h1 className="pt-3">Reservation form</h1>
                <ToastContainer />
                <div className="col-md-8">
                {error?(<div style={{color:'red' ,textAlign:'center'}}>All fields are required</div>):null}<br/>
                    <Form onSubmit={handleSubmit}>
                        <div>

                            <div>
                                <FormGroup row>
                                    <Label sm={2} className="headercolor">
                                        Mobile : 
                                    </Label>
                                    <Col sm={10}>
                                        <Input type="text"
                                            name="mobile"
                                            value={mobile}
                                            //onChange={this.handleChange}
                                            onChange={(e)=>{
                                                e.persist()
                                                usemobile(e.target.value)
                                            }}
                                            className="form-control"
                                            placeholder="10 digit number"
                                        ></Input>
                                    </Col>
                                </FormGroup>
                            </div>
                        {notice && <p style={{color:'red' ,textAlign:'center'}}> {notice} </p>}
                            <div>
                                <FormGroup row>
                                    <Label sm={2} className="headercolor">
                                        Service :
                                    </Label>
                                    <Col sm={10}>
                                        <Input  type="select" value={service} name="service" onChange={

                                            (e)=>{useservice(e.target.value)}
                                            }>
                                            <option value="">select</option>
                                            {
                                                servicesArray.map((item)=>{
                                                    return <option key={item} value={item}>{item}</option>
                                                })
                                            }
                                        </Input>
                                    </Col>
                                </FormGroup>
                            </div>
                            <div>
                                <FormGroup row>
                                <Label sm={2} className="headercolor">
                                    Date :
                                </Label>
                                    <Col sm={5}>
                                    <Input type="date"
                                        name="date"
                                        value={date}
                                        
                                        onChange={
                                            handleDateChange
                                            // (e)=>{
                                            //     usedate(e.target.value)
                                            // }
                                        }
                                        className="form-control"
                                        placeholder="person email"
                                    > 
                                    </Input>
                                    </Col>
                                </FormGroup>
                            </div>

                            <div>
                                <FormGroup row>
                                <Label sm={2} className="headercolor">
                                    Available Time Slots :
                                </Label>
                                <Col sm={10}>
                                    <Input type="select" value={timeSlot} name="timeSlot" onChange={
                                        (e)=>{
                                            e.persist()
                                            usetimeSlot(e.target.value)
                                        }
                                    }>
                                        <option value="">select</option>
                                        {
                                            slotArray1.map((slot)=>{
                                                return <option key={slot} value={slot}>{slot}</option>
                                            })
                                        }
                                    </Input>
                                </Col>
                                </FormGroup>
                            </div>

                            <div>
                                <FormGroup row>
                                    <Label sm={2} className="headercolor">
                                        Note (If Any):
                                    </Label>
                                    <Col sm={5}>
                                        <Input
                                        type="textarea"
                                        value={message}
                                        onChange={
                                            (e)=>{
                                                e.persist()
                                                usemessage(e.target.value)
                                            }
                                        }
                                        name="message">
                                        </Input>
                                    </Col>
                                </FormGroup>
                            </div>

                            <Button type="submit" color="primary" size="sm"  onClick={
                                mobile!==""&&
                                date!==""&&
                                service!==""&&
                                timeSlot!==""&&
                                mobile.length===10
                                ?notify
                                :errMessage

                            }>
                            Submit
                            </Button>

                          
                        </div>
                    </Form>
                </div>
                
            </div>
        )
    
}
const mapStateToProps = state => {
    return {
      user: state.user,
      reservations:state.reservations
    };
  };
export default connect(mapStateToProps)(CreateReservation)

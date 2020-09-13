import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import './reservation.css';
import moment from 'moment';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';

const ListReservation = () => {
  const [selectedRadio, useselectedRadio] = useState('');
  const [reservations, usereservations] = useState([]);
  const [reservationsList, usereservationsList] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3005/reservation/view', {
        headers: {
          'x-auth': localStorage.getItem('token')
        }
      })
      .then(response => {
        usereservationsList(response.data);
      });
  }, []);

  const handleRadioUpcoming = e => {
    useselectedRadio(e.target.value);
    usereservations(
      reservationsList.filter(item => {
        return new Date(item.date) > new Date();
      })
    );
  };

  const handleRadioPast = e => {
    useselectedRadio(e.target.value);
    usereservations(
      reservationsList.filter(item => {
        return new Date(item.date) < new Date();
      })
    );
  };
  const handleRadioAll = e => {
    useselectedRadio(e.target.value);
    usereservations(reservationsList);
  };

  return (
    <div>
      <h1 className='pt-4'>List of booked reservations </h1>
      {reservationsList.length < 1 && <h3>No reservation done yet</h3>}
      <div className='radiobtn pt-3'>
        <div className='pr-5'>
          <input
            type='radio'
            checked={selectedRadio === 'upcoming reservations'}
            className='mr-2'
            value='upcoming reservations'
            onChange={handleRadioUpcoming}
          />
          <label className='headercolor'>Upcoming Reservations</label>
        </div>

        <div className='pr-5'>
          <input
            type='radio'
            checked={selectedRadio === 'past reservations'}
            className='mr-2'
            value='past reservations'
            onChange={handleRadioPast}
          />
          <label className='headercolor'>Past Reservations</label>
        </div>

        <div className='pr-5'>
          <div>
            <input
              type='radio'
              checked={selectedRadio === 'all reservations'}
              className='mr-2'
              value='all reservations'
              onChange={handleRadioAll}
            />
            <label className='headercolor'>All Reservations</label>
          </div>
        </div>
      </div>
      <div className='pt-3'>
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
            {reservations.map(form => {
              return (
                <tr scope='row' key={form._id}>
                  <td> {form.username.username} </td>
                  <td> {form.mobile} </td>
                  <td> {form.service}</td>
                  <td>{moment(new Date(form.date)).format('DD-MM-YYYY')}</td>
                  <td> {form.timeSlot}</td>
                  <td> {form.message}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    user: state.user,
    reservations: state.reservations
  };
};

export default connect(mapStateToProps)(ListReservation);

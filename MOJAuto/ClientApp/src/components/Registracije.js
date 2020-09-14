import React from 'react';
import carService from '../services/carService';
import { Component } from 'react';
import alertify from "alertifyjs";

export class Registracije extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registrationsForUser: [],
            registrationsForCarById: []
        }
    }

    componentDidMount() {
        
        if (this.props.match.params.id) {
            // get registrations for given car id
            const carId = this.props.match.params.id;
            this.getRegistrationsByCarId(carId);            
        } else {
            // get all registrations for user
            this.getRegistrationsForUser();            
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            // call the fetch function again
            this.getRegistrationsForUser();
        }
    }

    getRegistrationsForUser() {
        carService.GetRegistrationsForUser().then(regs => {
            this.setState({
                registrationsForUser: regs
            })
        }).catch(er => {
            alertify.error("Greška prilikom dobavljanja unosa o registraciji!");
        })
    }

    getRegistrationsByCarId(carId) {
        carService.GetRegistrationsByCarId(carId).then(regs => {
            this.setState({
                registrationsForCarById: regs
            })
        }).catch(er => {
            alertify.errog("Greška prilikom dobavljanja unosa o registraciji!");
        })
    }


    render() {
        const carId = this.props.match.params.id;
        const noRegs = this.state.registrationsForCarById.length === 0 && this.state.registrationsForUser.length === 0;


        return (
            <div>
                <h3>Registracije component</h3>

                {
                    noRegs ? 
                        <p>Nemate unosa o registracijama.</p>
                        :
                    carId ?
                        <div>
                            Registrations by id
                        </div>
                        :
                        <div>
                            All regs
                        </div>
                }
            </div>    
        )
    }
}
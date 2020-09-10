import React from 'react';
import carService from '../services/carService';
import { Component } from 'react';
import alertify from "alertifyjs";


export class UsersCars extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersCars: null
        };
    }


    componentDidMount() {

        carService.GetUsersCars().then(cars => {

            let listOfCars = cars.map(createCarsDescriptionList);              

            this.setState({
                listOfCars: listOfCars
            });

        })
        .catch(er => {
            alertify.error("Greška pri dobavljanju automobila za korisnika!");
        });
        
    }
    
    
    render() {
        const { listOfCars } = this.state;
        return (
            <div>
                <h5>
                    Moji automobili:
                </h5>

                <div className="row">
                    {listOfCars}
                </div>
            </div>
        )
    }
    
}


function createCarsDescriptionList(usercar, idx) {
    return (
        <div key={idx} className="col-sm-6">
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">{usercar.model}</h5>
                    <div className="card-text">
                        <dl className="row">
                            <dt className="col-sm-9">Godina proizvodnje:</dt>
                            <dd className="col-sm-3">{usercar.manufactureYear}</dd>

                            <dt className="col-sm-9">Kilometraza pri kupovini:</dt>
                            <dd className="col-sm-3">
                                {usercar.kilometrage}
                            </dd>

                            <dt className="col-sm-9">Kubikaža:</dt>
                            <dd className="col-sm-3">
                                {usercar.engineCubicCapacity}
                            </dd>

                            <dt className="col-sm-9 ">Snaga motora (kW):</dt>
                            <dd className="col-sm-3">
                                {usercar.enginePowerKW}
                            </dd>

                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )

};

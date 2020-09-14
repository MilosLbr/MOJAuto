import React from 'react';
import carService from '../services/carService';
import { Component } from 'react';
import alertify from "alertifyjs";
import { Link } from 'react-router-dom';


export class UsersCars extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listOfCars: []
        };
    }


    componentDidMount() {
        
        carService.GetUsersCars().then(cars => {           

            this.setState({
                listOfCars: cars
            });

        })
        .catch(er => {
            alertify.error("Greška pri dobavljanju automobila za korisnika!");
        });
        
    }
    
    
    render() {
        let { listOfCars } = this.state;

        let carsToCardsDescList = listOfCars.map(createCarsDescriptionList); 
        
        return (
            <div>
                {listOfCars.length > 0 ?
                    <div>
                        <h5>
                            Moji automobili:
                        </h5>

                        <div className="row">
                            {carsToCardsDescList}
                        </div>
                    </div>
                    :
                    <div>
                        Niste upisali nijedan automobil.
                    </div>
                }
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
                    <div className="card-text text-muted">
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
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <Link to={"/registracije/" +  usercar.id }  className="text-success">Pregledaj registracije</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={"/potrosnjagoriva/" + usercar.id } className="text-info">Pregledaj potrošnju goriva</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={"/servisi/" + usercar.id } className="text-danger">Pregledaj servise</Link>
                    </li>
                </ul>
            </div>           
            
        </div>
    )

};

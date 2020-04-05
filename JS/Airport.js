const MilitaryType = require('./models/MilitaryType');
const ExperimentalPlane = require('./Planes/ExperimentalPlane');
const MilitaryPlane = require('./Planes/MilitaryPlane');
const PassengerPlane = require('./Planes/PassengerPlane');

class Airport {

    constructor(planes) {
        this.planes = planes;
    }

    static print(planes) {
        return JSON.stringify(planes);
    }

    getPlanes() {
        return this.planes;
    }

    getPassengerPlanes() {
        let passengerPlanes = [];

        for (let plane of this.planes) {
            if (plane instanceof PassengerPlane) {passengerPlanes.push(plane);}
        }

        return passengerPlanes;
    }

    getMilitaryPlanes() {
        let militaryPlanes = [];

        this.planes.forEach(plane => {
            if (plane instanceof MilitaryPlane) {
                militaryPlanes.push(plane);
            }
        });

        return militaryPlanes;
    }

    getPassengerPlaneWithMaxPassengersCapacity() {
        let passengerPlanes = this.getPassengerPlanes();
        let planeWithMaxPassengersCapacity = passengerPlanes[0];

        for (let i = 0; i < passengerPlanes.length; i++) {
            if (passengerPlanes[i].passengersCapacity > planeWithMaxPassengersCapacity.passengersCapacity) {
                planeWithMaxPassengersCapacity = passengerPlanes[i];
            }
        }

        return planeWithMaxPassengersCapacity;
    }

    getTransportMilitaryPlanes() {
        let transportMilitaryPlanes = [];
        let militaryPlanes = this.getMilitaryPlanes();

        for (let i = 0; i < militaryPlanes.length; i++) {
            if (militaryPlanes[i].getMilitaryType() === MilitaryType.TRANSPORT) {
                transportMilitaryPlanes.push(militaryPlanes[i]);
            }
        }

        return transportMilitaryPlanes;
    }

    getBomberMilitaryPlanes() {
        let bomberMilitaryPlanes = [];
        let militaryPlanes = this.getMilitaryPlanes();

        for (let i = 0; i < militaryPlanes.length; i++) {
            if (militaryPlanes[i].getMilitaryType() === MilitaryType.BOMBER) {
                bomberMilitaryPlanes.push(militaryPlanes[i]);
            }
        }

        return bomberMilitaryPlanes;
    }

    getExperimentalPlanes() {
        let experimentalPlanes  = [];

        this.planes.forEach(plane => {
            if (plane instanceof ExperimentalPlane) {
                experimentalPlanes.push(plane);
            }
        });

        return experimentalPlanes;
    }

    sortByMaxDistance() {
        this.planes.sort((a, b) => (a.getMaxFlightDistance() > b.getMaxFlightDistance()) ? 1 : -1);
        return this;
    }

    sortByMaxSpeed() {
        this.planes.sort((a, b) => (a.getMaxSpeed() > b.getMaxSpeed()) ? 1 : -1);
        return this;
    }

    sortByMaxLoadCapacity() {
        this.planes.sort((a, b) => (a.getMaxLoadCapacity() > b.getMaxLoadCapacity()) ? 1 : -1);
        return this;
    }
}

module.exports = Airport;

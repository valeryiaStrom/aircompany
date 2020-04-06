const assert = require('chai').assert;

const ClassificationLevel = require('../models/ClassificationLevel');
const ExperimentalTypes = require('../models/ExperimentalTypes');
const MilitaryType = require('../models/MilitaryType');
const ExperimentalPlane = require('../Planes/ExperimentalPlane');
const MilitaryPlane = require('../Planes/MilitaryPlane');
const PassengerPlane = require('../Planes/PassengerPlane');
const Airport = require('../Airport');

describe('Airport', () => {
    let planeWithMaxPassengerCapacity = new PassengerPlane('Boeing-747', 980, 16100, 70500, 242);

    let planes = [
        new PassengerPlane('Boeing-737', 900, 12000, 60500, 164),
        new PassengerPlane('Boeing-737-800', 940, 12300, 63870, 192),
        planeWithMaxPassengerCapacity,
        new PassengerPlane('Airbus A320', 930, 11800, 65500, 188),
        new PassengerPlane('Airbus A330', 990, 14800, 80500, 222),
        new PassengerPlane('Embraer 190', 870, 8100, 30800, 64),
        new PassengerPlane('Sukhoi Superjet 100', 870, 11500, 50500, 140),
        new PassengerPlane('Bombardier CS300', 920, 11000, 60700, 196),
        new MilitaryPlane('B-1B Lancer', 1050, 21000, 80000, MilitaryType.BOMBER),
        new MilitaryPlane('B-2 Spirit', 1030, 22000, 70000, MilitaryType.BOMBER),
        new MilitaryPlane('B-52 Stratofortress', 1000, 20000, 80000, MilitaryType.BOMBER),
        new MilitaryPlane('F-15', 1500, 12000, 10000, MilitaryType.FIGHTER),
        new MilitaryPlane('F-22', 1550, 13000, 11000, MilitaryType.FIGHTER),
        new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, MilitaryType.TRANSPORT),
        new ExperimentalPlane("Bell X-14", 277, 482, 500, ExperimentalTypes.HIGH_ALTITUDE, ClassificationLevel.SECRET),
        new ExperimentalPlane("Ryan X-13 Vertijet", 560, 307, 500, ExperimentalTypes.VTOL, ClassificationLevel.TOP_SECRET)
    ];
    
    let airport;

    beforeEach(() => {
        airport = new Airport(planes);
    });

    it('should have military planes with transport type', () => {
        let transportMilitaryPlanes = airport.getTransportMilitaryPlanes();
        let hasMilitaryPlanesWithTransportType = false;
        for (let militaryPlane of transportMilitaryPlanes) {
            if (militaryPlane.getMilitaryType() === MilitaryType.TRANSPORT) {
                hasMilitaryPlanesWithTransportType = true;
                break;
            }
        }
        assert.isTrue(hasMilitaryPlanesWithTransportType);
    });

    it('should check passenger plane with max passenger capacity', () => {
        let expectedPlaneWithMaxPassengersCapacity = airport.getPassengerPlaneWithMaxPassengersCapacity();
        assert.isTrue( expectedPlaneWithMaxPassengersCapacity === planeWithMaxPassengerCapacity);
    });


    it('should get passenger plane with max load capacity', () => {
        let planesSortedByMaxLoadCapacity = airport.sortByMaxLoadCapacity();
        let nextPlaneMaxLoadCapacityIsHigherThanCurrent = true;
        for (let i = 0; i < planesSortedByMaxLoadCapacity.length - 1; i++) {
            let currentPlane = planesSortedByMaxLoadCapacity[i];
            let nextPlane = planesSortedByMaxLoadCapacity[i + 1];
            if (currentPlane.getMaxLoadCapacity() > nextPlane.getMaxLoadCapacity()) {
                nextPlaneMaxLoadCapacityIsHigherThanCurrent = false;
                break;
            }
        }
        assert.isTrue(nextPlaneMaxLoadCapacityIsHigherThanCurrent);
    });

    it('should have at least one bomber in military planes', () => {
        let bomberMilitaryPlanes = airport.getBomberMilitaryPlanes();
        let hasAtLeastOneBomberInMilitaryPlanes = false;
        for (let militaryPlane of bomberMilitaryPlanes) {
            if (militaryPlane.getMilitaryType() === MilitaryType.BOMBER) {
                hasAtLeastOneBomberInMilitaryPlanes = true;
                break;
            }
        }
        assert.isTrue(hasAtLeastOneBomberInMilitaryPlanes);
    });

    it('should check that experimental planes have classification level higher than unclassified', () => {
        let experimentalPlanes = airport.getExperimentalPlanes();
        let hasUnclassifiedPlanes = false;
        for (let experimentalPlane of experimentalPlanes) {
            if (experimentalPlane.classificationLevel === ClassificationLevel.UNCLASSIFIED) {
                hasUnclassifiedPlanes = true;
            }
        assert.isFalse(hasUnclassifiedPlanes);
        }
    });
});
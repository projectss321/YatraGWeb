import { NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

export class commonfunction {
    static base64textString: string;

    constructor() {

    }

    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    static distanceCalc(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = this.toRad(lat2 - lat1);
        var dLon = this.toRad(lon2 - lon1);
        lat1 = this.toRad(lat1);
        lat2 = this.toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    static toRad(Value) {
        return Value * Math.PI / 180;
    }

    static getDateDifference(toDate, fromDate) {
        fromDate = new Date(fromDate);
        toDate = new Date(toDate);

        return Math.floor((Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()) - Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate())) / (1000 * 60 * 60 * 24));
    }


    static NgbModalOptions() {
        let NgbModalOptions: NgbModalOptions = {
            backdrop: 'static',
            keyboard: false,
            animation: false,
            backdropClass: 'no-backdrop',
            centered: false
        }
        return NgbModalOptions;
    }

    static handleReaderLoaded(readerEvt) {
        var binaryString = readerEvt.target.result;
               this.base64textString= btoa(binaryString);
            //    console.log(btoa(binaryString));

            return this.base64textString;
       }
}
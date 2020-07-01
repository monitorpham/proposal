import { ArrayType } from '@angular/compiler';

export class Progress {
    constructor(id, progress, startDate, endDate, performBy, note){
        this.id = id
        this.startDate = startDate
        this.endDate = endDate
        this.performBy = performBy
        this.progress = progress
    }

    "id": string;
    "startDate": null;
    "endDate": null;
    "performBy": string;
    "progress": string;
    
}
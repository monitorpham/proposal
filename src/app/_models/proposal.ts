import { ArrayType } from '@angular/compiler';

export class Proposal {
    id: number;
    contentProposal: String;
    Group: String;
    startDate: String;
    endDate: String;
    hospitalDepartment: String;
    currentProgressName: String;
    registerBy: String;
    note: String;

    public convertDate(dateString: String) {
        if (dateString) {
            let arr = dateString.split('T')
            return arr[0]
        }
        return ' '
    }
}
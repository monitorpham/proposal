import { ArrayType } from '@angular/compiler';

export class Proposal {
    id: number;
    contentProposal: String;
    Group: String;
    startDate: String;
    endDate: String;
    hospitalDepartment: String;
    hospitalDepartmentId: number;
    currentProgressName: String;
    registerBy: "Admin";
    note: String;
    remainingDate: String
    additionalDate: number
    deadLine: String
    status: any
    asignee: String

    public convertDate(dateString: String) {
        if (dateString) {
            let arr = dateString.split('T')
            let temp = arr[0].toString()
            let arr2 = temp.split('-')
            // debugger;
            return arr2[2] + '-' + arr2[1] + '-' + arr2[0]
        }
        return ''
    }
}
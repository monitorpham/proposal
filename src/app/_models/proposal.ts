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
            return arr[0]
        }
        return ' '
    }
}
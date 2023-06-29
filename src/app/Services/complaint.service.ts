import { Injectable } from '@angular/core';
import { Complaint } from '../Models/Complaint/complaint';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {
  constructor() {}

  public getComplaintsFromServer() {
    return fetch(
      'http://localhost:8089/TunisieCamp/Complaint/retrieve-all-Complaints'
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.map((complaint: Complaint) => {
          return new Complaint(
            complaint.id,
            complaint.object,
            complaint.message,
            complaint.date,
            complaint.reponse,
            complaint.user_id,
            complaint.admin_id
          );
        });
      });
  }

  public addComplaintToServer(complaint: Complaint) {
    return fetch('http://localhost:8089/TunisieCamp/Complaint/add-Complaint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(complaint.toJSON()),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
  }
}

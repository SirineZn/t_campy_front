import { Injectable } from '@angular/core';
import { Complaint } from '../Models/Complaint/complaint';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {
  public complaints!: Promise<Complaint[]>;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchComplaintsFromServer();
  }

  public async fetchComplaintsFromServer() {
    await this.http
      .get<Complaint[]>(
        'http://localhost:8089/TunisieCamp/Complaint/retrieve-all-Complaints'
      )
      .subscribe((data) => {
        this.complaints = Promise.resolve(data);
      });
  }

  public async addComplaintToServer(complaint: Complaint) {
    await this.http
      .post(
        'http://localhost:8089/TunisieCamp/Complaint/add-Complaint',
        complaint.toJSON()
      )
      .subscribe((data) => {
        this.fetchComplaintsFromServer();
      });
  }

  public async deleteComplaintFromServer(id: number) {
    await this.http
      .delete(
        'http://localhost:8089/TunisieCamp/Complaint/delete-Complaint/' + id
      )
      .subscribe((data) => {
        this.fetchComplaintsFromServer();
      });
  }

  public async updateComplaintFromServer(complaint: Complaint) {
    await this.http
      .put(
        'http://localhost:8089/TunisieCamp/Complaint/update-Complaint/' +
          complaint.id,
        complaint.toJSON()
      )
      .subscribe((data) => {
        this.fetchComplaintsFromServer();
      });
  }
}

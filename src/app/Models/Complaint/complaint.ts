export class Complaint {
  private _id: number;
  private _object: string;
  private _message: string;
  private _date: Date;
  private _reponse: string;
  private _user_id: number;
  private _admin_id: number;

  constructor(
    id: number,
    object: string,
    message: string,
    date: Date,
    reponse: string,
    user_id: number,
    admin_id: number
  ) {
    this._id = id;
    this._object = object;
    this._message = message;
    this._date = date;
    this._reponse = reponse;
    this._user_id = user_id;
    this._admin_id = admin_id;
  }

  get id(): number {
    return this._id;
  }

  get object(): string {
    return this._object;
  }

  get message(): string {
    return this._message;
  }

  get date(): Date {
    return this._date;
  }

  get reponse(): string {
    return this._reponse;
  }

  get user_id(): number {
    return this._user_id;
  }

  get admin_id(): number {
    return this._admin_id;
  }

  set id(value: number) {
    this._id = value;
  }

  set object(value: string) {
    this._object = value;
  }

  set message(value: string) {
    this._message = value;
  }

  set date(value: Date) {
    this._date = value;
  }

  set reponse(value: string) {
    this._reponse = value;
  }

  set user_id(value: number) {
    this._user_id = value;
  }

  set admin_id(value: number) {
    this._admin_id = value;
  }

  public static fromJson(rawComplaint: any): Complaint {
    if (rawComplaint === undefined || rawComplaint === null) {
      return null as any;
    }
    return new Complaint(
      rawComplaint.id,
      rawComplaint.object,
      rawComplaint.message,
      rawComplaint.date,
      rawComplaint.reponse,
      rawComplaint.user_id,
      rawComplaint.admin_id
    );
  }

  public static fromJsonArray(rawComplaints: any[]): Complaint[] {
    if (rawComplaints === undefined || rawComplaints === null) {
      return [];
    }
    return rawComplaints.map(this.fromJson);
  }

  public toJson(): any {
    return {
      id: this.id,
      object: this.object,
      message: this.message,
      date: this.date,
      reponse: this.reponse,
      user_id: this.user_id,
      admin_id: this.admin_id,
    };
  }

  public static compare(a: Complaint, b: Complaint): number {
    if (a.date > b.date) {
      return -1;
    } else if (a.date < b.date) {
      return 1;
    } else {
      return 0;
    }
  }

  public sort(complaints: Complaint[]): Complaint[] {
    return complaints.sort(Complaint.compare);
  }

  public filter(
    complaints: Complaint[],
    filter: string,
    user_id: number
  ): Complaint[] {
    if (filter === 'all') {
      return complaints;
    } else if (filter === 'user') {
      return complaints.filter((complaint) => complaint.user_id === user_id);
    } else if (filter === 'admin') {
      return complaints.filter((complaint) => complaint.admin_id === user_id);
    } else {
      return complaints;
    }
  }
}

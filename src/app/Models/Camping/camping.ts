import { Activity } from '../Activity/activity';
import { Localisation } from '../Localisation/localisation';
import { Reservation } from '../Reservation/reservation';
import { Topic } from '../forum/forum.model';

export class Camping {
  private id: number;
  private name: string;
  private description: string;
  private nombreDePlace: number;
  private categoryMaterielDemande: string;
  private localisation: Localisation;
  private forums: Topic[];
  private reservations: Reservation[];
  private activities: Activity[];

  constructor(
    id: number,
    name: string,
    description: string,
    nombreDePlace: number,
    categoryMaterielDemande: string,
    localisation: Localisation,
    forums: Topic[],
    reservations: Reservation[],
    activities: Activity[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.nombreDePlace = nombreDePlace;
    this.categoryMaterielDemande = categoryMaterielDemande;
    this.localisation = localisation;
    this.forums = forums;
    this.reservations = reservations;
    this.activities = activities;
  }

  public static fromJson(json: any): Camping {
    return new Camping(
      json.id,
      json.name,
      json.description,
      json.nombreDePlace,
      json.categoryMaterielDemande,
      json.localisation,
      json.forums,
      json.reservations,
      json.activities
    );
  }

  public static fromJsonArray(jsonCamping: any[]): Camping[] {
    const campings: Camping[] = [];
    jsonCamping.forEach((element) => {
      campings.push(Camping.fromJson(element));
    });
    return campings;
  }

  public toJson(): any {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      nombreDePlace: this.nombreDePlace,
      categoryMaterielDemande: this.categoryMaterielDemande,
      localisation: this.localisation,
      forums: this.forums,
      reservations: this.reservations,
      activities: this.activities,
    };
  }

  public static empty(): Camping {
    return new Camping(0, '', '', 0, '', Localisation.empty(), [], [], []);
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getNombreDePlace(): number {
    return this.nombreDePlace;
  }

  public getCategoryMaterielDemande(): string {
    return this.categoryMaterielDemande;
  }

  public getLocalisation(): Localisation {
    return this.localisation;
  }

  public getForums(): Topic[] {
    return this.forums;
  }

  public getReservations(): Reservation[] {
    return this.reservations;
  }

  public getActivities(): Activity[] {
    return this.activities;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public setNombreDePlace(nombreDePlace: number): void {
    this.nombreDePlace = nombreDePlace;
  }

  public setCategoryMaterielDemande(categoryMaterielDemande: string): void {
    this.categoryMaterielDemande = categoryMaterielDemande;
  }

  public setLocalisation(localisation: Localisation): void {
    this.localisation = localisation;
  }

  public setForums(forums: Topic[]): void {
    this.forums = forums;
  }

  public setReservations(reservations: Reservation[]): void {
    this.reservations = reservations;
  }

  public setActivities(activities: Activity[]): void {
    this.activities = activities;
  }

  public addForum(topic: Topic): void {
    this.forums.push(topic);
  }

  public addReservation(reservation: Reservation): void {
    this.reservations.push(reservation);
  }

  public addActivity(activity: Activity): void {
    this.activities.push(activity);
  }

  public removeForum(topic: Topic): void {
    this.forums = this.forums.filter((t) => t.getId() !== topic.getId());
  }

  public removeReservation(reservation: Reservation): void {
    this.reservations = this.reservations.filter(
      (r) => r.getId() !== reservation.getId()
    );
  }

  public removeActivity(activity: Activity): void {
    this.activities = this.activities.filter(
      (a) => a.getId() !== activity.getId()
    );
  }

  public toString(): string {
    return (
      'Camping: ' +
      this.id +
      ' ' +
      this.name +
      ' ' +
      this.description +
      ' ' +
      this.nombreDePlace +
      ' ' +
      this.categoryMaterielDemande +
      ' ' +
      this.localisation +
      ' ' +
      this.forums +
      ' ' +
      this.reservations +
      ' ' +
      this.activities
    );
  }

  public equals(obj: any): boolean {
    if (this === obj) {
      return true;
    }
    if (!(obj instanceof Camping)) {
      return false;
    }
    const other: Camping = obj as Camping;
    return (
      this.id === other.id &&
      this.name === other.name &&
      this.description === other.description &&
      this.nombreDePlace === other.nombreDePlace &&
      this.categoryMaterielDemande === other.categoryMaterielDemande &&
      this.localisation === other.localisation &&
      this.forums === other.forums &&
      this.reservations === other.reservations &&
      this.activities === other.activities
    );
  }
}

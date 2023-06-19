export class Topic {

  public id: string;
  public title: string;
  public description: string;
  public date: string;
  public author: string;
  public tags: string[];
  public likes: number;
  public dislikes: number;
  public Status: string;
  public category: string;

  constructor(id: string, title: string, description: string, date: Date, author: string, tags: string[],
            likes: number, dislikes: number,
            Status: string,
            category: string)
  {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date.toUTCString();
    this.author = author;
    this.tags = tags;
    this.likes = likes;
    this.dislikes = dislikes;
    this.Status = Status;
    this.category = category;
  }

  public static fromJson(json: any): Topic {
    return new Topic(json.id, json.title, json.description, new Date(json.date), json.author, json.tags,
      json.likes, json.dislikes, json.Status, json.category);
  }

  public isOpened(): boolean {
    return this.Status === 'Open';
  }

  public open(): void {
    this.Status = 'Open';
  }

  public close(): void {
    this.Status = 'Closed';
  }
}

export class Topic {

  public id: string;
  public title: string;
  public description: string;
  public date: string;
  public author: string;
  public tags: string[];
  public likes: number;
  public dislikes: number;
  public category: string;

  constructor(id: string, title: string, description: string, date: Date, author: string, tags: string[],
            likes: number, dislikes: number,
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
    this.category = category;
  }
}

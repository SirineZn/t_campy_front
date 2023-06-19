export class Topic {
  protected id: string;
  protected title: string;
  protected description: string;
  protected date: string;
  protected author: string;
  protected tags: string[];
  protected likes: number;
  protected dislikes: number;
  protected Status: string;
  protected category: string;
  protected comments!: string[];

  constructor(
    id: string,
    title: string,
    description: string,
    date: Date,
    author: string,
    tags: string[],
    likes: number,
    dislikes: number,
    Status: string,
    category: string,
    comments: string[] = []
  ) {
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
    return new Topic(
      json.id,
      json.title,
      json.description,
      new Date(json.date),
      json.author,
      json.tags,
      json.likes,
      json.dislikes,
      json.Status,
      json.category
    );
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

  public like(): void {
    this.likes++;
  }

  public dislike(): void {
    this.dislikes++;
  }

  public addComment(comment: string): void {
    this.comments.push(comment);
  }

  public getComments(): string[] {
    return this.comments;
  }

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getDate(): string {
    return this.date;
  }

  public getAuthor(): string {
    return this.author;
  }

  public getTags(): string[] {
    return this.tags;
  }

  public getLikes(): number {
    return this.likes;
  }

  public getDislikes(): number {
    return this.dislikes;
  }

  public getStatus(): string {
    return this.Status;
  }

  public getCategory(): string {
    return this.category;
  }

  public toJson(): any {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      date: this.date,
    };
  }
}

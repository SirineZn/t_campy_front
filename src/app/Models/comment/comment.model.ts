export class Comment {
  protected id!: number;
  protected comment!: string;
  protected author_id!: number;
  protected post_id!: number;
  protected created_at!: Date;
  protected updated_at!: Date;

  constructor(
    id: number = 0,
    comment: string,
    author_id: number,
    post_id: number,
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id;
    this.comment = comment;
    this.author_id = author_id;
    this.post_id = post_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  public getId(): number {
    return this.id;
  }

  public getComment(): string {
    return this.comment;
  }

  public getUserId(): number {
    return this.author_id;
  }

  public getPostId(): number {
    return this.post_id;
  }

  public getCreatedAt(): string {
    return this.created_at.toUTCString();
  }

  public getUpdatedAt(): string {
    return this.updated_at.toUTCString();
  }

  public setId(id: number): void {
    this.id = id;
  }

  public setComment(comment: string): void {
    this.comment = comment;
  }

  public setUserId(author_id: number): void {
    this.author_id = author_id;
  }

  public setPostId(post_id: number): void {
    this.post_id = post_id;
  }

  public setCreatedAt(created_at: Date): void {
    this.created_at = created_at;
  }

  public setUpdatedAt(updated_at: Date): void {
    this.updated_at = updated_at;
  }

  public updateDate(): void {
    this.updated_at = new Date();
  }
}

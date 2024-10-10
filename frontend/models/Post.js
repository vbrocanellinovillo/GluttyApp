export class Post {
  constructor(
    id,
    name,
    username,
    userImage,
    content,
    tags,
    date,
    comments,
    likes
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.userImage = userImage;
    this.content = content;
    this.tags = tags;
    this.date = date;
    this.comments = comments;
    this.likes = likes;
  }
}

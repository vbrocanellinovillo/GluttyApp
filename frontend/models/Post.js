export class Post {
  constructor(
    id,
    name,
    username,
    userImage,
    content,
    tags,
    date,
    comments_number,
    likes,
    images,
    faved,
    liked,
    comments
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.userImage = userImage;
    this.content = content;
    this.tags = tags;
    this.date = date;
    this.comments_number = comments_number;
    this.likes = likes;
    this.images = images;
    this.faved = faved;
    this.liked = liked;
    this.comments = comments;
  }
}

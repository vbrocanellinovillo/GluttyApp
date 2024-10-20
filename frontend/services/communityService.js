import { backendUrl } from "../constants/backend";
import { Post } from "../models/Post";
import { formatDateToYYYYMMDD } from "../utils/dateFunctions";
import { httpRequest } from "../utils/http";
import { Tag } from "../models/Tag";

const url = backendUrl + "comunidad/";

function getPosts(postsArray) {
  const posts = [];

  for (let dataPoint of postsArray) {
    const postDate = new Date(dataPoint.created_at);
    const date = formatDateToYYYYMMDD(postDate);

    const newPost = new Post(
      dataPoint.id,
      dataPoint.name,
      dataPoint.user,
      dataPoint.profile_picture,
      dataPoint.body,
      dataPoint.labels,
      date,
      dataPoint.likes,
      dataPoint.comments_number,
      dataPoint.images,
      dataPoint.user_faved,
      dataPoint.user_liked
    );

    posts.push(newPost);
  }

  return posts;
}

function getTags(tagsArray) {
  const tags = [];

  for (let tag of tagsArray) {
    const newTag = new Tag(tag.id, tag.name);
    tags.push(newTag);
  }

  return tags;
}

export async function getInitialPosts(token) {
  const requestUrl = url + "get-popular-posts/";

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const data = await httpRequest(requestUrl, requestOptions);
    return getPosts(data);
  } catch (error) {
    throw new Error(error.message);
  }
}

// MIS POSTS
export async function getMyPosts(token) {
  const requestUrl = url + "get-my-posts/";

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const data = await httpRequest(requestUrl, requestOptions);

    return getPosts(data);
  } catch (error) {
    throw new Error(error.message);
  }
}

// GET FEED
export async function getFeed(token, option, signal) {
  let requestUrl = url;

  if (option === 1) {
    requestUrl += "get-popular-posts/";
  } else {
    requestUrl += "get-recent-posts/";
  }

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal,
  };

  try {
    const data = await httpRequest(requestUrl, requestOptions);

    return getPosts(data);
  } catch (error) {
    throw new Error(error.message);
  }
}

// PUBLICACIÓN DEL POST
export async function createPost(post, labels, pictures, token) {
  const requestUrl = url + "create-post/";

  const formdata = new FormData();

  formdata.append("content", post);

  formdata.append("labels", JSON.stringify(labels));

  pictures.forEach((photo) => {
    formdata.append("images", {
      uri: photo.uri,
      name: photo.fileName || "photo",
      type: photo.mimeType,
    });
  });

  formdata.append("token", token);

  const requestOptions = {
    method: "POST",
    body: formdata,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await httpRequest(requestUrl, requestOptions);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

// ES LA CONSULTA DEL POST
export async function getPostById(id, token) {
  const requestUrl = url + "get-post/";
  const formdata = new FormData();

  formdata.append("id", id);

  const requestOptions = {
    body: formdata,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await httpRequest(requestUrl, requestOptions);
    const postDate = new Date(response.created_at);
    const date = formatDateToYYYYMMDD(postDate);

    const newPost = new Post(
      response.id,
      response.name,
      response.user,
      response.profile_picture,
      response.body,
      response.labels,
      date,
      response.likes,
      response.comments_number,
      response.images,
      response.user_faved,
      response.user_liked
    );
    return newPost;
  } catch (error) {
    throw new Error(error.message);
  }
}

// LIKE DEL POST
export async function addLike(idPost) {}

// COMENTAR EL POST
export async function addComment(idPost, comment) {}

export async function searchCommunity(token, searchTerm, signal) {
  const requestUrl = url + "search-labels/";

  const formdata = new FormData();

  formdata.append("q", searchTerm);

  const requestOptions = {
    method: "POST",
    body: formdata,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal,
  };

  try {
    const response = await httpRequest(requestUrl, requestOptions);
    return getTags(response.labels);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deletePost(token, searchTerm, signal) {
 
}

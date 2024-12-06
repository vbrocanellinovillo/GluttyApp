import { backendUrl } from "../constants/backend";
import { Post } from "../models/Post";
import { UserSearch } from "../models/UserSearch";
import { Tag } from "../models/Tag";
import { httpRequest } from "../utils/http";
import { CommunitySearchResult } from "../models/CommunitySearchResult";

const url = backendUrl + "comunidad/";

function getPosts(postsArray) {
  const posts = [];

  for (let dataPoint of postsArray) {
    const newPost = new Post(
      dataPoint.post_id,
      dataPoint.name,
      dataPoint.user,
      dataPoint.profile_picture,
      dataPoint.body,
      dataPoint.labels,
      dataPoint.created_at,
      dataPoint.comments_number,
      dataPoint.likes,
      dataPoint.images,
      dataPoint.user_faved,
      dataPoint.user_liked,
      null
    );

    posts.push(newPost);
  }

  return posts;
}

function getResults(resultsArray) {
  const searchResults = [];

  for (let dataPoint of resultsArray) {
    const isUser = dataPoint?.is_user;

    const idResult = dataPoint?.id;
    const name = dataPoint?.name;

    let result;
    if (isUser) {
      result = new UserSearch(idResult, name, dataPoint?.profile_picture);
    } else {
      result = new Tag(idResult, name);
    }

    const searchResult = new CommunitySearchResult(
      dataPoint?.id_front,
      isUser,
      result
    );

    searchResults.push(searchResult);
  }

  return searchResults;
}

export async function getInitialPosts(token, page, pageSize) {
  const requestUrl = url + "get-popular-posts/";

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ page: page, page_size: pageSize }),
  };

  try {
    const data = await httpRequest(requestUrl, requestOptions);
    return getPosts(data.posts);
  } catch (error) {
    throw new Error(error.message);
  }
}

// MIS POSTS
export async function getMyPosts(token, page, pageSize) {
  const requestUrl = `${url}get-my-posts/?page=${page}&page_size=${pageSize}`;

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const data = await httpRequest(requestUrl, requestOptions);

    return getPosts(data.posts);
  } catch (error) {
    throw new Error(error.message);
  }
}

// GET FEED
export async function getFeed(token, option, filters, signal, page, pageSize) {
  let requestUrl = url;

  const tagsId = filters && filters?.map((filter) => filter.id).join(",");

  const adaptedFilters =
    filters &&
    filters.map((filter) => ({
      id: filter?.id,
      is_user: filter?.isUser,
    }));

  if (option === 1) {
    requestUrl += "get-popular-posts/";
  } else {
    requestUrl += "get-recent-posts/";
  }

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      labels: adaptedFilters,
      page: page,
      page_size: pageSize,
    }),
    signal,
  };

  try {
    const data = await httpRequest(requestUrl, requestOptions);

    return getPosts(data.posts);
  } catch (error) {
    throw new Error(error.message);
  }
}

//get fav
export async function getFavorite(token, page, pageSize) {
  let requestUrl = `${url}get-favorites/?page=${page}&page_size=${pageSize}`;

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const data = await httpRequest(requestUrl, requestOptions);

    return getPosts(data.posts);
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

    // const postDate = new Date(response.created_at);
    //const date = formatDateTimeToYYYYMMDDHHMMSS(postDate);
    const newPost = new Post(
      response.post_id,
      response.name,
      response.user,
      response.profile_picture,
      response.body,
      response.labels,
      response.created_at,
      response.comments_number,
      response.likes,
      response.images,
      response.user_faved,
      response.user_liked,
      response.comments
    );

    return newPost;
  } catch (error) {
    throw new Error(error.message);
  }
}

// LIKE DEL POST
export async function addLike(id, token) {
  const requestUrl = url + "toggle-like/";

  const formdata = new FormData();

  formdata.append("id", id);

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

//FAV DEL POST
export async function addFavorite(id, token) {
  const requestUrl = url + "toggle-favorite/";

  const formdata = new FormData();

  formdata.append("id", id);

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

// COMENTAR EL POST
export default async function addComment(idPost, comment, token) {
  const requestUrl = url + "add-comment/";

  const formdata = new FormData();

  formdata.append("id", idPost);
  formdata.append("comment", comment);

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

    return getResults(response.results);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deletePost(id, token) {
  const requestUrl = url + "delete-post/";

  const formdata = new FormData();

  formdata.append("id", id);

  formdata.append("token", token);

  const requestOptions = {
    method: "DELETE",
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

export async function deleteComment(id, token) {
  const requestUrl = url + "delete-comment/";

  const formdata = new FormData();

  formdata.append("id", id);

  formdata.append("token", token);

  const requestOptions = {
    method: "DELETE",
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

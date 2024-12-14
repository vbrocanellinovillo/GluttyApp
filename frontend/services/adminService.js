import { backendUrl } from "../constants/backend";
import { Post } from "../models/Post";
import { ReportedUser } from "../models/ReportedUser";
import { httpRequest } from "../utils/http";

const url = backendUrl + "usuarios/";

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
/* 
- POST /usuarios/report/ : me mandan report_type (USER o POST), reported_id (username o id del posteo) 

- POST /usuarios/get-reported-posts/ : me pueden mandar page y page_size para paginación, 
devuelve los posteos con toda la info que se manda en la comunidad por ejemplo get recent posts, 
y se ordenan por cantidad de reportes - también les mando por posteo el report_count que es la cant 
de veces que los reportaron */

export async function report(reportType, reportId, token) {
    const formdata = new FormData();
    formdata.append("report_type", reportType);
    formdata.append("reported_id", reportId);
  
    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const requestUrl = url + "report/";
  
    try {
      const response = await httpRequest(requestUrl, requestOptions);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //GET /usuarios/get-reported-users/ : no se los pagine pero si quieren lo agrego 
  //- les mando id, username, name, profile picture y report count

  export async function getReportedUsers(token) {
    const requestUrl = url + "get-reported-users/";
  
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    //id, name, usename, picture, reportsNumber
    try {
      const response = await httpRequest(requestUrl, requestOptions);
      //console.log('response',response);

      const reportedUsers = response.reported_users.map(reportedUser => new ReportedUser(
        reportedUser.user_id, reportedUser.name, reportedUser.username, reportedUser.profile_picture,
        reportedUser.report_count,
      ))      

      return reportedUsers;

    } catch (error) {
      throw new Error(error.message);
    }
  }



  export async function getPostsReportedUser(id_usuario, token, page, pageSize) {
    
    const requestUrl = backendUrl + "comunidad/get-posts-by-user/";
  
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id_usuario,
        page: page,
        page_size: pageSize,
      }),
    };
  
    try {
      const data = await httpRequest(requestUrl, requestOptions);
      return getPosts(data.posts);
    } catch (error) {
      throw new Error(error.message);
    }
  }

// POSTEOS
///usuarios/get-reported-posts/
export async function getReportedPosts(token, page, pageSize) {
  const requestUrl = url + "get-reported-posts/";
  
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      page: page,
      page_size: pageSize,
    }),
  };
  try {
    const data = await httpRequest(requestUrl, requestOptions);
    return getPosts(data.posts);
  } catch (error) {
    throw new Error(error.message);
  }
}




  //POST /usuarios/resolve-report/ : me mandan el report_id es que se resuelva sin que hagan nada
  export async function resolveReport(id_report, token) {
    console.log("id_report", id_report);
    const requestUrl = url + "resolve-report/";
    const formdata = new FormData();
    formdata.append("report_id", id_report);


    const requestOptions = {
      method: "POST",
      body: formdata,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const data = await httpRequest(requestUrl, requestOptions);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }


  //POST /usuarios/block-user/ : me mandan el report_id y la reason (razon por bloqueo)
  export async function blockUser(id_report, reason, token) {
    console.log("reasonnn del back", reason);
    const requestUrl = url + "block-user/";
    const formdata = new FormData();
    
    formdata.append("report_id", id_report);
    formdata.append("reason", reason);
  
    const requestOptions = {
      method: "POST",
      body: formdata,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const data = await httpRequest(requestUrl, requestOptions);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }


  export async function banPost(id_post, token) {
    const requestUrl = url + "ban-post/";
    const formdata = new FormData();
    
    formdata.append("post_id", id_post);

    const requestOptions = {
      method: "DELETE",
      body: formdata,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const data = await httpRequest(requestUrl, requestOptions);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  export async function resolvePost(id_post, token) {
    const requestUrl = url + "resolve-post-report/";
    const formdata = new FormData();
    formdata.append("post_id", id_post);


    const requestOptions = {
      method: "POST",
      body: formdata,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const data = await httpRequest(requestUrl, requestOptions);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
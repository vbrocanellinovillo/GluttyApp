import { backendUrl } from "../constants/backend";
import { Post } from "../models/Post";
import { formatDateToYYYYMMDD, getRandomDate } from "../utils/dateFunctions";
import { sleep } from "../utils/utilFunctions";
import { httpRequest } from "../utils/http";
import { err } from "react-native-svg";

const url = backendUrl + "comunidad/";

async function getData() {
  await sleep(3000);

  const posts = [
    {
      id: 1,
      name: "María López",
      username: "maria_lopez",
      content:
        "¡Hola a todos! ¿Algún lugar recomendado en Buenos Aires donde vendan productos aptos para celíacos? Me está costando encontrar variedad de alimentos sin gluten.",
      tags: ["Buenos Aires", "sin gluten", "productos"],
      likes: 120,
      comments: 35,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
      image: "https://picsum.photos/seed/1/300",
    },
    {
      id: 2,
      name: "Julián Fernández",
      username: "julian_fernandez",
      content:
        "Probé hacer mi propio pan sin gluten en casa y salió espectacular. Si a alguien le interesa, puedo compartir la receta. ¡Es muy fácil!",
      tags: ["receta", "pan sin gluten", "cocina"],
      likes: 230,
      comments: 62,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
      image: "https://picsum.photos/seed/2/300",
    },
    {
      id: 3,
      name: "Sofía Gutiérrez",
      username: "sofia_gutierrez",
      content:
        "Chicos, encontré una pizzería en Córdoba que hace pizzas sin gluten. Se llama 'Pizza Libre Celi', ¡totalmente recomendada! ¿Alguien más ha ido?",
      tags: ["pizzería", "Córdoba", "sin gluten"],
      likes: 340,
      comments: 85,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
      image: "https://picsum.photos/seed/3/300",
    },
    {
      id: 4,
      name: "Lucía Ramírez",
      username: "lucia_ramirez",
      content:
        "Quiero comenzar una dieta sin gluten y me cuesta organizar las comidas. ¿Alguien tiene ideas o sugerencias para planificar menús semanales?",
      tags: ["menú", "planificación", "dieta sin gluten"],
      likes: 180,
      comments: 50,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
      image: "https://picsum.photos/seed/4/300",
    },
    {
      id: 5,
      name: "Martín Cabrera",
      username: "martin_cabrera",
      content:
        "Alguien más tuvo problemas para encontrar productos sin gluten en supermercados de Rosario? Me cuesta mucho encontrar galletitas aptas.",
      tags: ["supermercado", "Rosario", "sin gluten"],
      likes: 90,
      comments: 24,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
      image: "https://picsum.photos/seed/5/300",
    },
    {
      id: 6,
      name: "Carla Pérez",
      username: "carla_perez",
      content:
        "¡Buen día! Hoy fui a hacerme los análisis de seguimiento de mi celiaquía y todo salió perfecto. Es un gran alivio saber que estoy cuidando bien mi alimentación. ¡Sigan firmes!",
      tags: ["análisis", "celiaquía", "salud"],
      likes: 305,
      comments: 110,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
      image: "https://picsum.photos/seed/6/300",
    },
    {
      id: 7,
      name: "Florencia Medina",
      username: "florencia_medina",
      content:
        "¡Alerta de producto nuevo! Fui al dietético y encontré unas galletitas sin gluten riquísimas. Son de la marca 'Naturalis', ¿las conocían?",
      tags: ["productos nuevos", "dietético", "sin gluten"],
      likes: 410,
      comments: 145,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
      image: "https://picsum.photos/seed/7/300",
    },
    {
      id: 8,
      name: "Nicolás Márquez",
      username: "nicolas_marquez",
      content:
        "Alguien ha viajado a Mendoza y puede recomendarme restaurantes con opciones sin gluten? Estoy planeando unas vacaciones y quiero estar preparado.",
      tags: ["viajes", "Mendoza", "restaurantes"],
      likes: 215,
      comments: 60,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
      image: "https://picsum.photos/seed/8/300",
    },
    {
      id: 9,
      name: "Verónica Suárez",
      username: "veronica_suarez",
      content:
        "Me diagnosticaron celiaquía hace dos meses y estoy un poco perdida con qué alimentos consumir. ¿Qué productos básicos no pueden faltar en mi cocina?",
      tags: ["diagnóstico", "productos básicos", "ayuda"],
      likes: 150,
      comments: 80,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
      image: "https://picsum.photos/seed/9/300",
    },
    {
      id: 10,
      name: "Diego Sánchez",
      username: "diego_sanchez",
      content:
        "Hoy probé hacer una torta sin gluten con harina de almendra. ¡Quedó increíble! Si a alguien le interesa, les paso la receta.",
      tags: ["receta", "torta sin gluten", "harina de almendra"],
      likes: 270,
      comments: 65,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
      image: "https://picsum.photos/seed/10/300",
    },
    {
      id: 11,
      name: "Laura Giménez",
      username: "laura_gimenez",
      content:
        "¿Saben si el helado de Freddo es apto para celíacos? Me encanta pero no quiero arriesgarme.",
      tags: ["helado", "Freddo", "consulta"],
      likes: 135,
      comments: 45,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
      image: "https://picsum.photos/seed/11/300",
    },
    {
      id: 12,
      name: "Cecilia Castro",
      username: "cecilia_castro",
      content:
        "Hoy fue mi primer día cocinando para mi familia entera con opciones sin gluten. ¡Todos quedaron encantados! Es un desafío, pero se puede.",
      tags: ["cocina", "familia", "sin gluten"],
      likes: 395,
      comments: 92,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
      image: "https://picsum.photos/seed/12/300",
    },
    {
      id: 13,
      name: "Gonzalo Pérez",
      username: "gonzalo_perez",
      content:
        "Gente, encontré unos alfajores sin gluten espectaculares en Mar del Plata. Se llaman 'Dulce Vida', ¡recomendadísimos!",
      tags: ["alfajores", "Mar del Plata", "recomendación"],
      likes: 280,
      comments: 70,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
      image: "https://picsum.photos/seed/13/300",
    },
    {
      id: 14,
      name: "Santiago Oviedo",
      username: "santiago_oviedo",
      content:
        "Hola a todos. ¿Qué marcas de cervezas sin gluten recomiendan? Estoy armando una reunión con amigos y no quiero que me falte algo.",
      tags: ["cerveza", "sin gluten", "reunión"],
      likes: 320,
      comments: 105,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
      image: "https://picsum.photos/seed/14/300",
    },
  ];

  return posts;
}

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
  console.log(labels);
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

  console.log("fd", formdata);
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

import { backendUrl } from "../constants/backend";

const url = backendUrl + "estudios/";
import { Post } from "../models/Post";
import { getRandomDate } from "../utils/dateFunctions";
import { sleep } from "../utils/utilFunctions";

async function getData() {
  //await sleep(3000);

  const posts = [
    {
      id: 1,
      name: "Caspar Ogborn",
      username: "caspar_ogborn",
      content:
        "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.",
      tags: ["Chevrolet", "Sedan", "Electric"],
      likes: 961,
      comments: 892,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
    },
    {
      id: 2,
      name: "Annaliese Bellino",
      username: "annaliese_bellino",
      content:
        "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
      tags: ["Hyundai", "SUV", "Hybrid"],
      likes: 414,
      comments: 429,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
    },
    {
      id: 3,
      name: "Bentley Bardell",
      username: "bentley_bardell",
      content:
        "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
      tags: ["Hyundai", "Crossover", "Manual"],
      likes: 95,
      comments: 603,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
    },
    {
      id: 4,
      name: "Colas Catton",
      username: "colas_catton",
      content:
        "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
      tags: ["Plymouth", "Convertible", "Classic"],
      likes: 942,
      comments: 617,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
    },
    {
      id: 5,
      name: "Hunter Thomerson",
      username: "hunter_thomerson",
      content:
        "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.",
      tags: ["Toyota", "Truck", "4x4"],
      likes: 25,
      comments: 324,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
    },
    {
      id: 6,
      name: "Thelma Avieson",
      username: "thelma_avieson",
      content:
        "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
      tags: ["Chevrolet", "Coupe", "Sport"],
      likes: 573,
      comments: 589,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
    },
    {
      id: 7,
      name: "Floyd Kinvan",
      username: "floyd_kinvan",
      content:
        "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
      tags: ["Dodge", "Muscle", "V8"],
      likes: 522,
      comments: 275,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
    },
    {
      id: 8,
      name: "Vitoria Woolner",
      username: "vitoria_woolner",
      content:
        "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.",
      tags: ["Lexus", "Luxury", "Sedan"],
      likes: 884,
      comments: 664,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
    },
    {
      id: 9,
      name: "Dermot Tother",
      username: "dermot_tother",
      content:
        "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.",
      tags: ["Lincoln", "SUV", "Luxury"],
      likes: 861,
      comments: 196,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
    },
    {
      id: 10,
      name: "Robby Radleigh",
      username: "robby_radleigh",
      content:
        "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
      tags: ["Chrysler", "Minivan", "Family"],
      likes: 755,
      comments: 328,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
    },
    {
      id: 11,
      name: "Shalna Costellow",
      username: "shalna_costellow",
      content:
        "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
      tags: ["Ford", "SUV", "Off-road"],
      likes: 917,
      comments: 606,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
    },
    {
      id: 12,
      name: "Lavinie Norcop",
      username: "lavinie_norcop",
      content:
        "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
      tags: ["Lamborghini", "Sport", "Exotic"],
      likes: 518,
      comments: 481,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
    },
    {
      id: 13,
      name: "Trenna Ranner",
      username: "trenna_ranner",
      content:
        "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
      tags: ["Mazda", "Sedan", "Hatchback"],
      likes: 631,
      comments: 361,
      date: getRandomDate(new Date(2020, 0, 1), new Date(2024, 9, 7)),
    },
  ];

  return posts;
}

export async function getInitialPosts(token) {
  try {
    const data = await getData();

    const posts = [];

    for (let dataPoint of data) {
      const newPost = new Post(
        dataPoint.id,
        dataPoint.name,
        dataPoint.username,
        dataPoint.content,
        dataPoint.tags,
        dataPoint.date,
        dataPoint.likes,
        dataPoint.comments
      );

      posts.push(newPost);
    }

    return posts;
  } catch (error) {}
}

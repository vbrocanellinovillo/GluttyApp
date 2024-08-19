import { backendUrl } from "../constants/backend";
import { Branch } from "../models/Branch";
import { httpRequest } from "../utils/http";
import { sleep } from "../utils/utilFunctions";

const url = backendUrl + "comercios/";

export async function sendPdf(selectedDocuments, token) {
  console.log(selectedDocuments);

  const requestUrl = url + "upload-menu/";

  const formdata = new FormData();

  for (let index = 0; index < selectedDocuments.length; index++) {
    const element = selectedDocuments[index];
    formdata.append("menu", element);
  }

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

export async function addBranch(branch, token) {
  console.log(branch);
  
  const requestUrl = url + "add-branch/";

  const formdata = new FormData();

  formdata.append("name", branch.name);
  formdata.append("phone", branch.phone);
  formdata.append("optional_phone", branch.optionalPhone);
  formdata.append(
    "separated_kitchen",
    branch.separatedKitchen ? "True" : "False"
  );
  formdata.append("just_takeaway", branch.onlyTakeAway ? "True" : "False");
  formdata.append("address", branch.address);
  formdata.append("latitude", branch.coordinates.latitude);
  formdata.append("longitude", branch.coordinates.longitude);
  // Queda lo de la ubicación y las fotos

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

const getData = async () => {
  await sleep(2000);

  const data = [
    {
      name: "Mongoose, small indian",
      phone: "201534248458551",
      optionalPhone: "5010121582152964",
      separatedKitchen: false,
      onlyTakeAway: false,
      address: "PO Box 76221",
      coordinates: {
        latitude: -31.417339,
        longitude: -64.183319,
      },
      photos: "http://dummyimage.com/138x100.png/cc0000/ffffff",
    },
    {
      name: "Wapiti, elk",
      phone: "3541354404781099",
      optionalPhone: "4903520913775190701",
      separatedKitchen: true,
      onlyTakeAway: true,
      address: "PO Box 98446",
      coordinates: {
        latitude: -31.429431,
        longitude: -64.197871,
      },
      photos: "http://dummyimage.com/144x100.png/dddddd/000000",
    },
    {
      name: "Frilled dragon",
      phone: "5596993260955948",
      optionalPhone: "589356149101254826",
      separatedKitchen: false,
      onlyTakeAway: true,
      address: "Apt 726",
      coordinates: {
        latitude: -31.441185,
        longitude: -64.195308,
      },
      photos: "http://dummyimage.com/100x100.png/ff4444/ffffff",
    },
    {
      name: "Yellow-billed hornbill",
      phone: "3550333878189003",
      optionalPhone: "3586123994767172",
      separatedKitchen: false,
      onlyTakeAway: true,
      address: "5th Floor",
      coordinates: {
        latitude: -31.424729,
        longitude: -64.162401,
      },
      photos: "http://dummyimage.com/242x100.png/5fa2dd/ffffff",
    },
    {
      name: "Squirrel glider",
      phone: "3545320906817182",
      optionalPhone: "5518827196094221",
      separatedKitchen: true,
      onlyTakeAway: false,
      address: "Room 819",
      coordinates: {
        latitude: -31.418117,
        longitude: -64.190521,
      },
      photos: "http://dummyimage.com/241x100.png/cc0000/ffffff",
    },
    {
      name: "Red kangaroo",
      phone: "3552536483617550",
      optionalPhone: "4936447228045070",
      separatedKitchen: false,
      onlyTakeAway: true,
      address: "Apt 1909",
      coordinates: {
        latitude: -31.423091,
        longitude: -64.195898,
      },
      photos: "http://dummyimage.com/247x100.png/5fa2dd/ffffff",
    },
    {
      name: "Silver-backed jackal",
      phone: "677135342421046995",
      optionalPhone: "3581402371968677",
      separatedKitchen: true,
      onlyTakeAway: false,
      address: "Apt 364",
      coordinates: {
        latitude: -31.431807,
        longitude: -64.170259,
      },
      photos: "http://dummyimage.com/202x100.png/dddddd/000000",
    },
    {
      name: "Black swan",
      phone: "5610527098970836",
      optionalPhone: "3581282751320214",
      separatedKitchen: true,
      onlyTakeAway: false,
      address: "5th Floor",
      coordinates: {
        latitude: -31.437106,
        longitude: -64.178779,
      },
      photos: "http://dummyimage.com/111x100.png/dddddd/000000",
    },
    {
      name: "Snowy egret",
      phone: "6304538272991919",
      optionalPhone: "3570052567270017",
      separatedKitchen: true,
      onlyTakeAway: true,
      address: "10th Floor",
      coordinates: {
        latitude: -31.435516,
        longitude: -64.169922,
      },
      photos: "http://dummyimage.com/152x100.png/ff4444/ffffff",
    },
    {
      name: "African lion",
      phone: "3556592811133675",
      optionalPhone: "56022593950969915",
      separatedKitchen: true,
      onlyTakeAway: false,
      address: "1st Floor",
      coordinates: {
        latitude: -31.441847,
        longitude: -64.173102,
      },
      photos: "http://dummyimage.com/185x100.png/cc0000/ffffff",
    },
    {
      name: "Sifaka, verreaux's",
      phone: "3534173711815898",
      optionalPhone: "348987274539336",
      separatedKitchen: false,
      onlyTakeAway: false,
      address: "15th Floor",
      coordinates: {
        latitude: -31.428671,
        longitude: -64.160142,
      },
      photos: "http://dummyimage.com/222x100.png/ff4444/ffffff",
    },
    {
      name: "Shrike, southern white-crowned",
      phone: "3554864872899763",
      optionalPhone: "3577568711291198",
      separatedKitchen: true,
      onlyTakeAway: false,
      address: "PO Box 56388",
      coordinates: {
        latitude: -31.440128,
        longitude: -64.169854,
      },
      photos: "http://dummyimage.com/210x100.png/ff4444/ffffff",
    },
    {
      name: "Cobra, cape",
      phone: "3576262997524396",
      optionalPhone: "5641828388248210994",
      separatedKitchen: false,
      onlyTakeAway: false,
      address: "PO Box 18083",
      coordinates: {
        latitude: -31.429633,
        longitude: -64.178435,
      },
      photos: "http://dummyimage.com/105x100.png/ff4444/ffffff",
    },
    {
      name: "Otter, giant",
      phone: "3581448644090393",
      optionalPhone: "3588209482226173",
      separatedKitchen: false,
      onlyTakeAway: false,
      address: "PO Box 20600",
      coordinates: {
        latitude: -31.434915,
        longitude: -64.163728,
      },
      photos: "http://dummyimage.com/177x100.png/cc0000/ffffff",
    },
    {
      name: "Red-tailed phascogale",
      phone: "4844267853266515",
      optionalPhone: "3578324973647274",
      separatedKitchen: true,
      onlyTakeAway: false,
      address: "Apt 89",
      coordinates: {
        latitude: -31.438291,
        longitude: -64.174261,
      },
      photos: "http://dummyimage.com/130x100.png/dddddd/000000",
    },
    {
      name: "Rat, desert kangaroo",
      phone: "3573284822850187",
      optionalPhone: "3545244279726103",
      separatedKitchen: false,
      onlyTakeAway: true,
      address: "PO Box 61898",
      coordinates: {
        latitude: -31.431912,
        longitude: -64.186352,
      },
      photos: "http://dummyimage.com/160x100.png/5fa2dd/ffffff",
    },
    {
      name: "Red-headed woodpecker",
      phone: "3567095206551870",
      optionalPhone: "3584103620792994",
      separatedKitchen: true,
      onlyTakeAway: true,
      address: "Room 1960",
      coordinates: {
        latitude: -31.435718,
        longitude: -64.167901,
      },
      photos: "http://dummyimage.com/200x100.png/5fa2dd/ffffff",
    },
  ];

  return data;
};

export async function getMapPoints(token) {
  const requestUrl = url + "noniideabro/";

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    // const response = await httpRequest(requestUrl, requestOptions);
    const data = await getData();

    const restaurants = [];

    for (dataPoint of data) {
      const restaurant = new Branch(
        dataPoint.name,
        dataPoint.phone,
        dataPoint.optionalPhone,
        dataPoint.onlyTakeAway,
        dataPoint.separatedKitchen,
        dataPoint.address,
        dataPoint.coordinates,
        dataPoint.photos
      );

      restaurants.push(restaurant);
    }

    return restaurants;
  } catch (error) {
    throw new Error(error.message);
  }
}

export class Branch {
  constructor(
    name,
    phone,
    optionalPhone,
    onlyTakeAway,
    separatedKitchen,
    address,
    coordinates,
    photos
  ) {
    this.name = name;
    this.phone = phone;
    this.optionalPhone = optionalPhone;
    this.separatedKitchen = separatedKitchen;
    this.onlyTakeAway = onlyTakeAway;
    this.address = address;
    this.coordinates = coordinates;
    this.photos = photos;
  }
}

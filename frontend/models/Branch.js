export class Branch {
  constructor(
    name,
    phone,
    optionalPhone,
    separatedKitchen,
    onlyTakeAway,
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

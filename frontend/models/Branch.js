export class Branch {
  constructor(
    name,
    phone,
    optionalPhone,
    separatedKitchen,
    onlyTakeAway,
    schedules,
    address,
    coordinates,
    photos
  ) {
    this.name = name;
    this.phone = phone;
    this.optionalPhone = optionalPhone;
    this.separatedKitchen = separatedKitchen;
    this.schedules = schedules;
    this.onlyTakeAway = onlyTakeAway;
    this.address = address;
    this.coordinates = coordinates;
    this.photos = photos;
  }
}

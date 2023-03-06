class AdoptedAnimal {
  constructor(image, name, type, bread, age) {
    this.image = image;
    this.name = name;
    this.type = type;
    this.bread = bread;
    this.age = age;
  }
}

class AdoptedManager {
  adoptedList = [];

  addToAdopted = (animal) => {
    if (this.adoptedList.includes(animal.name)) {
      console.log("test");
    } else {
      this.adoptedList.push(
        new AdoptedAnimal(
          animal.image,
          animal.name,
          animal.type,
          animal.bread,
          animal.age
        )
      );
    }
  };
}

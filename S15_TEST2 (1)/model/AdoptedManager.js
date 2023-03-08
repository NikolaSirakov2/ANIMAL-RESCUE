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
  adoptedList = JSON.parse(localStorage.getItem("adoptedList")) || [];

  addToAdopted = (animal) => {
    
      this.adoptedList.push(
        new AdoptedAnimal(
          animal.image,
          animal.name,
          animal.type,
          animal.bread,
          animal.age
        )
      );
    
      localStorage.setItem('adoptedList', JSON.stringify(this.adoptedList));
  };
}

class Animal {
    constructor(name, image, type, bread, age, sex, neededAmount, currentlyRisedAmount){
        this.name = name;
        this.image = image;
        this.type = type;
        this.bread = bread;
        this.age = age;
        this.sex = sex;
        this.neededAmount = neededAmount;
        this.currentlyRisedAmount = currentlyRisedAmount;
    }
}

class AnimalsManager {
    constructor(){
        this.animalsList = JSON.parse(localStorage.getItem("animalsList"))|| DATA.map(animal => new Animal(
            animal.name,
            animal.image,
            animal.type,
            animal.bread,
            animal.age,
            animal.sex,
            animal.neededAmount,
            animal.currentlyRisedAmount
        ));

    }

    

    search = (keyword) => {

        return this.animalsList.filter(animal => {
            return animal.name.toLowerCase().includes(keyword.trim().toLowerCase());
        })
    }

    searchByType = (keyword) => {

        return this.animalsList.filter(animal => {
            return animal.type.toLowerCase().includes(keyword.trim().toLowerCase());
        })
    }
}
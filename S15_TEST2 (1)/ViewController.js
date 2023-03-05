class ViewController {
    constructor(){
        window.addEventListener('load', this.handleHashChange);
        window.addEventListener('hashchange', this.handleHashChange);
        this.animalsManager = new AnimalsManager();
    }

    handleHashChange = () => {
        

        let hash = window.location.hash.slice(1) || "home";

        let pageIds = ["home", "adopted", "user"];

        pageIds.forEach(id => {
            let page = document.getElementById(id);

            if(hash === id){
                page.style.display = "flex";
            } else {
                page.style.display = "none";
            }
        });

        switch(hash){
            case 'home':
                this.renderHomePage();
                break;
        }
    }

    renderAnimalsCard = (animalsList, container) => {
        container.innerHTML = "";

        animalsList.forEach((animal) => {

            console.log(animal.image);

            let card = createElement("div");
            card.classList.add("card");
            card.style.width = "200px";
            card.style.background = "white";

            let photo = createElement("img");
            photo.src = "http://img.recipepuppy.com/1.jpg";
            photo.style.width = "200px";

            let name = createElement("div");
            name.innerText = animal.name;

            let family = createElement("div");
            family.innerText = animal.type;

            let bread = createElement("div");
            bread.innerText = animal.bread;

            let age = createElement("div");
            age.innerText = animal.age;

            card.append (name, family, bread, age);

            container.appendChild(card);
        })
    }

    renderHomePage = () => {
        let searchByName = document.getElementById("searchByName");
    let searchByType = document.getElementById("searchByType");

    searchByType.addEventListener("input", (e) => {
      if (e.target.value !== "default") {
        let result = this.animalsManager.searchByType(e.target.value);
        this.renderAnimalsCard(result, animalsContainer);
      } else if (e.target.value === "default") {
        let animalsContainer = document.querySelector(
          "#home .container"
        );
        this.renderAnimalsCard(this.animalsManager.recipeList, animalsContainer);
      }
    });

    searchByName.addEventListener("input", (e) => {
      let result = this.animalsManager.search(e.target.value);

      this.renderAnimalsCard(result, animalsContainer);
    });

    let animalsContainer = document.querySelector("#home .container");

    this.renderAnimalsCard(this.animalsManager.animalsList, animalsContainer);
    }
}

let viewController = new ViewController();
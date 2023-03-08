class ViewController {
    constructor(){
        window.addEventListener('load', this.handleHashChange);
        window.addEventListener('hashchange', this.handleHashChange);
        this.animalsManager = new AnimalsManager();
        this.adoptedManager = new AdoptedManager();
        this.donateManager = new DonateManager();
        this.userManager = new UserManager();
    }

    handleHashChange = () => {
        

        let hash = window.location.hash.slice(1) || "home";

        let pageIds = ["home", "adopted", "user", "donate"];

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
            case 'adopted':
                this.renderAdoptedPage();
                break;
            case 'user':
                this.renderUserPage();
                break;
        }
    }

    renderAnimalsCard = (animalsList, container) => {
        container.innerHTML = "";

        animalsList.forEach((animal) => {

            let card = createElement("div");
            card.classList.add("card");
            card.style.width = "200px";
            card.style.background = "white";

            let photo = createElement("img");   
            photo.src = `./images/${animal.image}`;
            photo.style.width = "200px";

            let name = createElement("div");
            name.innerText = animal.name;

            let family = createElement("div");
            family.innerText = animal.type;

            let bread = createElement("div");
            bread.innerText = animal.bread;

            let age = createElement("div");
            age.innerText = `възраст: ${animal.age} години`;

            let neededSum = createElement("div");
            neededSum.innerText = `neededSum: ${animal.currentlyRisedAmount}/${animal.neededAmount}`;

            let adoptButton = createElement("button");
            adoptButton.style.width = "90px";
            adoptButton.innerText = "Adopt";
            adoptButton.addEventListener("click", () => {
                this.adoptedManager.addToAdopted(animal);
                card.style.display = "none";
                let index = animalsList.indexOf(animal);
                animalsList.splice(index, 1);
            });

            
            let donateButton = createElement("button");
            donateButton.style.width = "90px";
            donateButton.innerText = "Donate";
            donateButton.style.margin = "0 5px";
            donateButton.addEventListener("click", () => {
                let donateContainer = document.getElementById("donateBlank");
                viewController.renderDonatePage(animal.name, donateContainer);
            })

            if(animal.currentlyRisedAmount >= animal.neededAmount){
                donateButton.style.display = "none"
            }
            

            card.append (photo, name, family, bread, age, neededSum, adoptButton, donateButton);

            container.appendChild(card);
        })
    }

    renderAdoptedCard = (adoptedList, container) => {
        container.innerHTML = "";

        adoptedList.forEach((animal) => {

            let card = createElement("div");
            card.classList.add("card");
            card.style.width = "200px";
            card.style.background = "white";

            let photo = createElement("img");   
            photo.src = `./images/${animal.image}`;
            photo.style.width = "200px";

            let name = createElement("div");
            name.innerText = animal.name;

            let family = createElement("div");
            family.innerText = animal.type;

            let bread = createElement("div");
            bread.innerText = animal.bread;

            let age = createElement("div");
            age.innerText = `възраст: ${animal.age} години`;

            let date = createElement("div");
            date.innerText = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;

            let leaveButton = createElement("button");
            leaveButton.style.width = "90px";
            leaveButton.innerText = "Leave";
            leaveButton.addEventListener("click", () => {
                this.animalsManager.animalsList.push(animal);
                card.style.display = "none";
                let index = adoptedList.indexOf(animal);
                adoptedList.splice(index, 1);
                localStorage.setItem('adoptedList', JSON.stringify(adoptedList));
            });

            card.append (photo, name, family, bread, age, date, leaveButton);

            container.appendChild(card);
        })
    }

    renderHomePage = () => {
        let searchByName = document.getElementById("searchByName");
        let searchByType = document.getElementById("searchByType");

    searchByType.addEventListener("input", (e) => {
      if (e.target.value !== "default") {
        searchByName.value = "";
        let result = this.animalsManager.searchByType(e.target.value);
        this.renderAnimalsCard(result, animalsContainer);
      } else if (e.target.value === "default") {
        searchByName.value = "";
        let animalsContainer = document.querySelector("#home .container");
        this.renderAnimalsCard(this.animalsManager.animalsList, animalsContainer);
      }
    });

    searchByName.addEventListener("input", (e) => {
      let result = this.animalsManager.search(e.target.value);

      this.renderAnimalsCard(result, animalsContainer);
    });

    let animalsContainer = document.querySelector("#home .container");

    this.renderAnimalsCard(this.animalsManager.animalsList, animalsContainer);
    }

    renderAdoptedPage = () => {
        let adoptedContainer = document.querySelector("#adopted .container");

        this.renderAdoptedCard(this.adoptedManager.adoptedList, adoptedContainer);
    }
    
    renderDonatePage = (name, container) => {
        window.location.href = 'http://127.0.0.1:5500/S15_TEST2%20(1)/index.html#donate';

        container.innerHTML = "";

        let page = document.createElement("div");
        page.id = "donoPage";
        

        let header = createElement("h1");
        header.innerText = `How much do you want to donate for ${name}?`;
        

        let donor = createElement("input");
        donor.type = "text";
        donor.style.height = "2vh";
        donor.style.width = "90%";
        donor.placeholder = "Your name";

        let money = createElement("input");
        money.type = "number";
        money.style.height = "2vh";
        money.style.width = "90%";
        money.placeholder = "Sum";

        let donateButt = createElement("button");
        donateButt.style.height = "5vh";
        donateButt.style.width = "30%";
        donateButt.innerText = "DONATE";
        donateButt.style.margin = "0 0 50px 0";
        donateButt.addEventListener("click", () => {
            colon1.innerText = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
            colon2.innerText = name;
            colon3.innerText = money.value;
        })

        let historyTitle = createElement("h1");
        historyTitle.innerText = "Donations history";

        let table = createElement("table");
        table.style.width = "100%";
        table.style.border = "2px";
        table.style.height = "30%";

        let row1 = createElement("tr");
        row1.style.height = "30%";

        let collon1 = createElement("td");
        collon1.innerText = "date";
        collon1.style.width = "20%";
        

        let collon2 = createElement("td");
        collon2.innerText = "animal name";
        collon2.style.width = "40%";
    
        let collon3 = createElement("td");
        collon3.innerText = "donated sum";
        collon3.style.width = "35%";

        row1.append(collon1, collon2, collon3);

        let row2 = createElement("tr");
        row2.style.height = "70%";
        row2.style.fontSize = "15px";

        let colon1 = createElement("td");
        colon1.innerText = "";

        let colon2 = createElement("td");
        colon2.innerText = "";
        
    
        let colon3 = createElement("td");
        colon3.innerText = "";

        row2.append(colon1, colon2, colon3);

        table.append(row1,row2)

        page.append(header, donor, money, donateButt, historyTitle, table);

        container.appendChild(page);
    }

    renderUserPage = () => {
        let register = document.getElementById('registerForm');

        register.onsubmit = (e) => {
            e.preventDefault();
            let username = e.target.elements.username.value.trim();
            let pass = e.target.elements.pass.value.trim();
            let confirm = e.target.elements.confirm.value.trim();

            this.userManager.createUser(username, pass, confirm);
            
        }

        let form = document.getElementById('loginForm');

        form.onsubmit = (e) => {
            e.preventDefault();
            let username = e.target.elements.username.value.trim();
            let pass = e.target.elements.pass.value.trim();
            
            this.userManager.logIn(username, pass);
        }

        let logOut = document.getElementById('logoutButt');

        logOut.addEventListener('click', this.userManager.logOut);
    }
}

let viewController = new ViewController();
class Pet {
    constructor(type, name, thirstRate){
        this.type = type;
        this.name = name;
        this.boredom = 0;
        this.thirst = 75;
        this.hunger = 0;
        this.img = [`img/${this.type.toLowerCase()}Play.png`, `img/${this.type.toLowerCase()}Hungry.png`, `img/${this.type.toLowerCase()}Sleep.png`, `img/${this.type.toLowerCase()}Thirst.png`];
        this.thirstRate = thirstRate  //allows the setting of a thirstRate, depending on the animal
    }

    promFunc () {                           //creates a promise with a 1 second delay that adjusts the thirst by thirst rate and increases hunger and boredom by 1
        console.log("starting counter");
        return new Promise(resolve => {
          setTimeout(() =>{
            resolve('done');
            this.thirst += this.thirstRate;
            console.log(this.thirst);
            this.hunger += 5;
            console.log(this.hunger);
            this.boredom += 2;
            console.log(this.boredom);
            console.log("counter done");
            thirstCount.value = 100 - this.thirst;
            hungerCount.value = 100 - this.hunger;
            boredomCount.value = 100 - this.boredom;
          }, this.thirstRate*1000);
        });
      };
      
      
        async count(){                      //calls promise asyncronously every second until thirst hits 100
            while (this.thirst < 100) {
                await this.promFunc()
                console.log(this.thirst);
                if (this.thirst >= 100) {
                    alert(`${this.name} died of thirst.`)  
                    location.reload();  
                } else if (this.hunger >= 100) {
                    alert(`${this.name} died of hunger.`)  
                    location.reload();  
                }else if(this.boredom >= 100) {
                    alert(`${this.name} died of boredom.`) 
                    location.reload();   
                }

                checkLevels();

            }    
             
        }

    drink() {
        if (this.thirst <= 20){
            this.thirst = 0;
        } else {
            this.thirst -= 20;
        }
    }

    eat() {
        if (this.hunger <= 20){
            this.hunger = 0;
        } else {
            this.hunger -= 20;
        }
    }

    play() {
        if (this.boredom <= 20){
            this.boredom = 0;
        } else {
            this.boredom -= 20;
        }
    }

    revive() {                              //resets thirst to 0 and starts count() again
        this.thirst = 0;
        this.count()
    }
}

let petSel = document.getElementById("newPet");
let img = document.getElementsByClassName("img")[0];
let stats = document.getElementsByClassName("stats")[0];
let input1 = document.getElementsByClassName("input")[0];
let input2 = document.getElementsByClassName("input")[1];
let name = document.getElementById("name");
let nameBtn = document.getElementById("nameBtn");
let thirstCount = document.getElementById("thirstCount");
let hungerCount = document.getElementById("hungerCount");
let boredomCount = document.getElementById("boredomCount");
let feedBtn = document.getElementById("feed");
let waterBtn = document.getElementById("water");
let playBtn = document.getElementById("play");
let actionBtns = document.getElementsByClassName("action");
let btnsDiv = document.getElementById("btns");
let title = document.getElementById("title");
let imgAndInfo = document.getElementById("imgAndInfo");
let info = document.getElementById("info");


let gameScreen = () => {

    imgAndInfo.style.display = "flex";
    imgAndInfo.style.justifyContent = "space-around";
    imgAndInfo.style.flexWrap = "wrap";

    img.style.display = "inline-block";
    img.style.width = "200px";
    info.style.width = "auto";

    stats.style.display = "flex";
    stats.style.flexWrap = "wrap"; 
    stats.style.flexDirection = "space-around";

    btnsDiv.style.display = "flex";
    btnsDiv.style.justifyContent = "space-around";
    for (let i = 0; i < actionBtns.length; i++) {
        actionBtns[i].style.display = "inline-block";
        actionBtns[i].style.width = "20%";
        actionBtns[i].style.margins = "auto";
    }
    
}

let getOpt = () => {
    petSel = document.getElementById("newPet").value.toLowerCase();
}


// const cat = new Pet('Cat', 'Kitty', 5);
// const rabbit = new Pet('Rabbit', 'Thumper', 7);
// const bird = new Pet('Bird', 'Tweety', 0.001);

let createImg = (animal, i) => { 
    console.log(`<img src = "${animal.img[i]}" alt = "Picture of ${animal.name}" />`);
                                            //Should creat a picture of pet.
     img.innerHTML = `<img src = "${animal.img[i]}" alt = "Picture of ${animal.name}" />`;
}

// createImg(cat, 0);

// cat.count();

let revFunc = (animal) => {                           //revive cat 
    return new Promise(resolve => {
            resolve('done');
            animal.revive();

    });
};


async function revcount(){                      
    await revFunc(cat);
}    

let checkLevels = () => {
    if(petSel.hunger >= 80){
        info.textContent =`${petSel.name} is getting very hungry!`;
        createImg(petSel, 1);
    } else if(petSel.thirst >= 80){
        info.textContent =`${petSel.name} is getting very thirsty!`;
        createImg(petSel, 3);
    }else if(petSel.boredom >= 80){
        createImg(petSel, 2);
        info.textContent =`${petSel.name} is getting very bored!`;
    }

    if(petSel.hunger < 80 && petSel.thirst < 80 && petSel.boredom < 80){
        createImg(petSel, 0);
        info.textContent = "";
    } 
    
    
}


// revcount();

/* ========================================================================================================================*/
//User input:

petSel.addEventListener('change', ()=>{
    input1.style.display = 'none';
    input2.style.display = 'block';
});


nameBtn.addEventListener('click', ()=> {
    getOpt();
    console.log(petSel); //cat

    if( petSel == "cat" ) {
        const cat = new Pet('Cat', name.value, 5);
        petSel = cat;
    } else if ( petSel == "rabbit" ) {
        const rabbit = new Pet('Rabbit', name.value, 7);
        petSel = rabbit;
    } else if ( petSel == "bird" ) {
        const bird = new Pet('Bird', name.value, 1);
        petSel = bird;
    }
    
    title.textContent = name.value.toUpperCase();
    input2.style.display = 'none';

    createImg(petSel, 0);

    petSel.count();

    gameScreen();

});
    



let start = () => {

} 

feedBtn.addEventListener('click', ()=> {
  
    petSel.eat()

    hungerCount.value = 100 - petSel.hunger;
           
    
})

waterBtn.addEventListener('click', ()=> {
    
    petSel.drink() 

    thirstCount.value = 100 - petSel.thirst; 
})

playBtn.addEventListener('click', ()=> {

    petSel.play();

    boredomCount.value = 100 - petSel.boredom
})
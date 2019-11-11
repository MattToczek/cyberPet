class Pet {
    constructor(type, name, thirstRate){
        this.type = type;
        this.name = name;
        this.boredom = 0;
        this.thirst = 0;
        this.hunger = 0;
        this.img = [`img/${this.type.toLowerCase()}Play.png`, `img/${this.type.toLowerCase()}Hungry.png`, `img/${this.type.toLowerCase()}Sleep.png`, `img/${this.type.toLowerCase()}Thirst.png`];
        this.thirstRate = thirstRate || 5;  //allows the setting of a thirstRate, depending on the animal
    }

    promFunc () {                           //creates a promise with a 1 second delay that adjusts the thirst by thirst rate and increases hunger and boredom by 1
        console.log("starting counter");
        return new Promise(resolve => {
          setTimeout(() =>{
            resolve('done');
            this.thirst += this.thirstRate;
            this.hunger += 1;
            this.boredom += 1;
            console.log("counter done");
            console.log(this.thirst);
          }, 10);
        });
      };
      
      
        async count(){                      //calls promise asyncronously every second until thirst hits 100
            while (this.thirst < 100) {
                await cat.promFunc()
            }    
            console.log(`${this.name} died of thirst.`)  
    }

    revive() {                              //resets thirst to 0 and starts count() again
        this.thirst = 0;
        this.count()
    }
}

let petSel = document.getElementById("petOpt");
let img = document.getElementsByClassName("img")[0];



const cat = new Pet('Cat', 'Kitty', 5);

let createImg = (animal, i) => {                       
    console.log(`<img src = "${animal.img[i]}" alt = "Picture of ${animal.name}" />`);
                                            //Should creat a picture of pet.
     img.innerHTML = `<img src = "${animal.img[i]}" alt = "Picture of ${animal.name}" />`;
}

//createImg(cat, 0);

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



// revcount();


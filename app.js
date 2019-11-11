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
            this.hunger += 5;
            this.boredom += 2;
            console.log("counter done");
            thirstCount.value = 100 - this.thirst;
            hungerCount.value = 100 - this.hunger;
            boredomCount.value = 100 - this.boredom;
          }, this.thirstRate*1000);
        });
      };
      
      
        async count(){                      //calls promise asyncronously every second until thirst hits 100
            while (this.thirst < 100) {
                await cat.promFunc()
                console.log(this.thirst);
                if (this.thirst >= 100) {
                    alert(`${this.name} died of thirst.`)    
                } else if (this.hunger >= 100) {
                    alert(`${this.name} died of hunger.`)    
                }else if(this.boredom >= 100) {
                    alert(`${this.name} died of boredom.`)    
                }

                // if (this.thirst >= 80) {
                //     thirstCount.style.color = "red" ;  
                // } else if (this.hunger >= 80) {
                //     hungerCount.style.color = "red" 
                // }else if(this.boredom >= 80) {
                //     boredomCount.style.color = "red"   
                // }

            }    
             
    }

    revive() {                              //resets thirst to 0 and starts count() again
        this.thirst = 0;
        this.count()
    }
}

let petSel = document.getElementById("newPet");
let img = document.getElementsByClassName("img")[0];
let input = document.getElementsByClassName("input")[0];
let screenDivs = document.getElementsByClassName("pet");
let thirstCount = document.getElementById("thirstCount");
let hungerCount = document.getElementById("hungerCount");
let boredomCount = document.getElementById("boredomCount");

let gameScreen = () => {
    for (let i = 0; i < screenDivs.length; i++) {
        screenDivs[i].style.display = "block";
        
    }
}

let getOpt = () => {
    petSel = document.getElementById("newPet").value.toLowerCase();
}


const cat = new Pet('Cat', 'Kitty', 5);
const rabbit = new Pet('Rabbit', 'Thumper', 7);
const bird = new Pet('Bird', 'Tweety', 0.001);

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



// revcount();

/* ========================================================================================================================*/
//User input:

petSel.addEventListener('change', ()=>{
    input.style.display = 'none';
    getOpt();
    console.log(petSel); //cat

    if( petSel == "cat" ) {
        petSel = cat;
    } else if ( petSel == "rabbit" ) {
        petSel = rabbit;
    } else if ( petSel == "bird" ) {
        petSel = bird;
    }
    
    createImg(petSel, 0);

    petSel.count();

    gameScreen();

});



let start = () => {

} 



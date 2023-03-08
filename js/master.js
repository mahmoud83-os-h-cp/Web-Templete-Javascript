//check if thereis color-option 
let mainColor = localStorage.getItem("color-option");
// console.log(mainColor);
if (mainColor !== null) {

    document.documentElement.style.setProperty("--main-color", mainColor);

    //remove class active from all color-list 
    document.querySelectorAll(".color-list li").forEach(element => {
        element.classList.remove("active");

        //check if dataset of color === localstorage item color 
        if (element.dataset.color === mainColor) {
            element.classList.add("active");
        }
    });
}

//random background option 

let backgoundOption = true;

//variable to control background interval 
let backgroundInterval;

//switch if there is background option in localstorage 
let backgroundLocalItem = localStorage.getItem("background-option");

if (backgroundLocalItem !== null) {

    if (backgroundLocalItem === "true") {

        backgoundOption = true;

    } else {

        backgoundOption = false;

    }

    //remove class active from background-option 
    document.querySelectorAll(".random-container span").forEach(element => {
        element.classList.remove("active");
    })

    if (backgroundLocalItem === "true") {

        document.querySelector(".random-container .yes").classList.add("active");

    } else {

        document.querySelector(".random-container .no").classList.add("active");

    }
}



//toggle spin class icon 
document.querySelector(".toggle-setting .gear").onclick = function() {

    //toggle class fa-spin 
    this.classList.toggle("fa-spin");


    //toggle class main to setting-box open
    document.querySelector(".setting-box").classList.toggle("open");
}

//switch colors
const colorLi = document.querySelectorAll(".color-list li");

//loop on colorLi
colorLi.forEach(li => {

    //click on every li
    li.addEventListener("click", (e) => {

        //set color in root
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

        //set color in localstorage
        localStorage.setItem("color-option", e.target.dataset.color);

        handleActive(e);

    });
});




//switch background option 

const randombackEl = document.querySelectorAll(".random-container span");

//loop on spans 

randombackEl.forEach(span => {

    span.addEventListener("click", (e) => {

        handleActive(e);

        if (e.target.dataset.back === "yes") {

            backgoundOption = true;
            randomizeImg();
            localStorage.setItem("background-option", true);
        } else {

            backgoundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background-option", false);
        }
    });
});


//selct landing page 
let landingPage = document.querySelector(".landing-page");

// selct img array 
let imgArray = ["../images/g1.jpeg", "../images/g2.jpg", "../images/g4.jpg", "../images/g6.jpg", "../images/land5.jpg"]



//function to randomize img 
function randomizeImg() {
    if (backgoundOption === true) {
        backgroundInterval = setInterval(() => {
            //get random number 
            let randomNumber = Math.floor(Math.random() * imgArray.length);
            //change background image 
            landingPage.style.backgroundImage = "url('../images/" + imgArray[randomNumber] + "')"
        }, 1000);
    }
}

randomizeImg();


//selct our-skills 

let ourSkills = document.querySelector(".our-skills");


window.onscroll = function() {

    //offset top of div 
    let offSetTop = ourSkills.offsetTop;
    // console.log(offSetTop)

    //offset height of div 
    let offSetHeight = ourSkills.offsetHeight;
    // console.log(offSetHeight)
    //window height 
    let windowHeight = this.innerHeight;
    // console.log(windowHeight)
    //page offset on scroll 
    let pageOffSet = this.pageYOffset;
    // console.log(pageOffSet)
    if (pageOffSet >= (offSetTop + offSetHeight - windowHeight)) {

        let allSkills = document.querySelectorAll(".our-skills .skill-box .skill-progress span");

        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
}

//create overly with the image 
let overlay = document.querySelectorAll(".our-gallary img");

//loop on the image 
overlay.forEach(img => {
    img.addEventListener("click", (e) => {

        //create popup-overly 
        let popupOverlay = document.createElement("div");

        //add class to popup-overlay 
        popupOverlay.className = 'popup-overlay';

        //add popup-overlay to the body 
        document.body.appendChild(popupOverlay);

        //create popup-box 
        let popupBox = document.createElement("div");

        //add class to popup-box 
        popupBox.className = 'popup-box'

        if (img.alt !== null) {

            //create heading 
            let imagHeading = document.createElement("h3");

            //create img heading text 
            let imagHeadingText = document.createTextNode(img.alt);

            //add img heading text to heading 
            imagHeading.appendChild(imagHeadingText);

            //add heading to popup-box 
            popupBox.appendChild(imagHeading);
        }

        //create div-image 
        let popupImage = document.createElement("img");

        //set image sourse 
        popupImage.src = img.src;

        //add poup-image to poup-box 
        popupBox.appendChild(popupImage);

        //add popup-box to the body 
        document.body.appendChild(popupBox);

        //create closebutton 
        let closeButton = document.createElement("span");

        //create closebutton text 
        let closeButtonText = document.createTextNode("x");


        //add class to close button 
        closeButton.className = 'close-button';

        //add closebutton text to close button 
        closeButton.appendChild(closeButtonText);

        //add close button to popup-box 
        popupBox.appendChild(closeButton);

    });
});

//remove popup 
document.addEventListener("click", function(e) {

    if (e.target.className == 'close-button') {


        //remove popbox
        e.target.parentNode.remove();

        //remove popup-overlay 
        document.querySelector(".popup-overlay").remove();
    }
});

//selct all bullets 
const allBullets = document.querySelectorAll(".nav-bullet .bullet");

//selct all bullets 
const allLnks = document.querySelectorAll(".links a");


function scrollToView(elements) {

    elements.forEach(ele => {

        ele.addEventListener("click", (e) => {

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({

                behavior: "smooth"
            });
        });
    });
}
scrollToView(allBullets);
scrollToView(allLnks);

//handel active state 
function handleActive(ev) {

    //remove class active from childern 
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");
    });

    //add class active on self 
    ev.target.classList.add("active");

}

let bulletOption = document.querySelectorAll(".bullets-option span");

let bulletContiner = document.querySelector(".nav-bullet");

let localIemBullet = localStorage.getItem("bullet-option");

if (localIemBullet !== null) {

    bulletOption.forEach(span => {
        span.classList.remove("active");
    })
    if (localIemBullet === 'block') {

        bulletContiner.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");

    } else {
        bulletContiner.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletOption.forEach(span => {

    span.addEventListener("click", (e) => {

        if (e.target.dataset.display === 'show') {

            bulletContiner.style.display = 'block';
            localStorage.setItem('bullet-option', 'block');
        } else {

            bulletContiner.style.display = 'none';
            localStorage.setItem('bullet-option', 'none');
        }
        handleActive(e);
    });
});

//rest option 
document.querySelector(".button-option").onclick = function() {

    // localStorage.clear();
    localStorage.removeItem("color-option");
    localStorage.removeItem("background-option");
    localStorage.removeItem("bullet-option");

    //reload window 
    window.location.reload();
}

//select toggle and menu 
let toggleMenu = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleMenu.onclick = function(e) {
    e.stopPropagation();
    //add class menu-active to toggle-menu 
    this.classList.toggle("menu-active");

    //add class open to tlinks 
    tLinks.classList.toggle("open");
}

document.addEventListener("click", (e) => {

    //check if it outside from menu and toogle 
    if (e.target !== toggleMenu && e.target !== tLinks) {

        //chenk if menu contain class open 
        if (tLinks.classList.contains('open')) {

            toggleMenu.classList.toggle("menu-active");
            tLinks.classList.toggle("open")
        }
    }

});

//stop propagation on menu 
tLinks.onclick = function(e) {
    e.stopPropagation();
}
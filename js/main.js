
// cheek color option in local storage
let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  document.querySelectorAll(".colors-list li").forEach(element => {
    element.classList.remove("active");
    if (element.dataset.color === mainColor) {
      element.classList.add("active")
    };
  });
};
// open and close settings box
let settingsBox = document.querySelector('.settings-box');
let settingsIcon = document.querySelector('.toggle-settings');
settingsIcon.onclick = function () {
  settingsBox.classList.toggle("open");
  document.querySelector('.toggle-settings .gear').classList.toggle("fa-spin");
}
let backgroundOption = true;
let backgroundInterval;
//  cheek if theres local storage random background item 
let backgroundLocalItem = localStorage.getItem("background_option");
if (backgroundLocalItem !== null) {
  
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  // remove active class from all span
  document.querySelectorAll(".random-background span").forEach((ele) => {
    ele.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector('.yes').classList.add('active');
  } else { document.querySelector(".no").classList.add('active') };
};
// switch colors
const colorsLi = Array.from(document.querySelectorAll('.colors-list li'));
colorsLi.forEach(li => {
  li.addEventListener("click", (e) =>{
    // set color on root
    document.documentElement.style.setProperty("--main-color",e.target.dataset.color)
    // set color in local storage
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  })
});
// switch background option
const randomBackground = Array.from(document.querySelectorAll('.random-background span'));
randomBackground.forEach(span => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomImg();
      localStorage.setItem('background_option', true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem('background_option', false);
    };
  });
});
//  change background img url
let landingPage = document.querySelector(".landing-page");
let imgsArray = ["01.jpg", "03.jpg", "04.jpg", "05.jpg",];
function randomImg() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
    let randomNumber = Math.floor(Math.random() * imgsArray.length);
    landingPage.style.backgroundImage = `url("images/${imgsArray[randomNumber]}")`;
    }, 10000);
  };
};
randomImg();
// progress on scroll moving to left
let sectionProgress = document.querySelector('.our-skills')
let progressSpan = Array.from(document.querySelectorAll('.our-skills span'));
window.onscroll = function () {
  if (scrollY >= sectionProgress.offsetTop - 100) {
    progressSpan.forEach(span => {
      span.style.width = span.dataset.width;
    });
  };
};
// create popup with the img
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
  img.addEventListener('click', (e) => {
    // create overlay element
    let overlay = document.createElement('div');
    overlay.className = "overlay-popup";
    // append overlay to the body
    document.body.appendChild(overlay);
    // create the popup
    let popupBox = document.createElement('div');
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      let title = document.createElement('h4');
      title.className = "popup-title";
      let titleText = document.createTextNode(img.alt)
      // append text to title
      title.appendChild(titleText);
      popupBox.appendChild(title);
    }
    let popupImg = document.createElement('img');
    popupImg.src = img.src;
    // append img to div 
    popupBox.appendChild(popupImg);
    // append popup box to body
    document.body.appendChild(popupBox);
    // create close span
    let closeSpan = document.createElement('span');
    closeSpan.className = 'close-popup';
    let closeSpanText = document.createTextNode('x');
    closeSpan.appendChild(closeSpanText);
    popupBox.appendChild(closeSpan);
  });
});
// close popup
document.addEventListener('click', (e) => {
  if (e.target.className == "close-popup") {
    document.querySelector('.popup-box').remove();
    document.querySelector('.overlay-popup').remove();
  };
});
// select all bullets
const allBullets = document.querySelectorAll('.nav-bullets .bullets');
scrollSection(allBullets);
// select all links
const allLinks = document.querySelectorAll('.links a');
scrollSection(allLinks);
// function scroll to chosen section
function scrollSection(elements) {
  elements.forEach(ele => {
    ele.addEventListener("click", (e) => {
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
};
// function handle active class 
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  ev.target.classList.add('active')
};
// bullets option 
let bullets = document.querySelectorAll('.show-bullets span');
let bulletLocalItem = localStorage.getItem("bullets-option");
if (bulletLocalItem !== null) {
  bullets.forEach(span => {
    span.classList.remove('active');
  });
  if (bulletLocalItem === "block") {
    document.querySelector('.nav-bullets').style.display = 'block';
    document.querySelector('.show-bullets .yes').classList.add('active');
  } else {
    document.querySelector('.nav-bullets').style.display = 'none';
    document.querySelector('.show-bullets .no').classList.add('active');
  };
};
bullets.forEach(span => {
  span.addEventListener('click', e => {
    if (span.dataset.bullets == "yes") {
      document.querySelector('.nav-bullets').style.display = 'block';
      localStorage.setItem('bullets-option', "block");
    } else {
      document.querySelector('.nav-bullets').style.display = 'none';
      localStorage.setItem('bullets-option', "none");
    };
    
    handleActive(e);
  });
});
// reset option
let btnREset = document.querySelector('.settings-box .reset-option');
btnREset.onclick = function () {
  localStorage.clear();
  window.location.reload();
};
// open and close mega menu
let btnBars = document.querySelector('.header-area .fa-bars');
let linksContainer = document.querySelector('.header-area .links');
btnBars.onclick = function () {
  linksContainer.classList.toggle("open")
}
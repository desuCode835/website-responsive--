// active humberger menu
let menuIcon = document.querySelector(".menu-icon");
let navlist = document.querySelector(".navlist");
menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("active");
    navlist.classList.toggle("active");
    document.body.classList.toggle("open");
});

// remove nav list
navlist.addEventListener("click", () => {
    navlist.classList.remove("active");
    menuIcon.classList.remove("active");
    document.body.classList.remove("open");
})


// rotate text js code
let text = document.querySelector(".text p");

text.innerHTML = text.innerHTML.split("").map((char,i)=>
    `<b style="transform:rotate(${i *6.3}deg")>${char}</b>`
).join("");


// switch between about button

const buttons = document.querySelectorAll(".about-btn button");
const contents = document.querySelectorAll(".content");

buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
        contents.forEach(content => content.style.display = "none");
        contents[index].style.display = "block";
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    });
});


// portofolio filter

var mixer = mixitup('.portofolio-gallery', {
    selectors: {
        target: '.portofolio-box'
    },
    animation: {
        duration: 500
    }
});


// Infinite swiperjs

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay:{
        delay:3000,
        disableOnInteraction:false,
    },

    breakpoints: {
        576:{
            slidesPerView:2,
            spaceBetween:10,
        },
        1200:{
            slidesPerView:3,
            spaceBetween:20,
        }
    }
});


// Skill progress bar

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bar = document.querySelectorAll(".skills svg circle");

window.addEventListener("scroll", () => {
    if(!skillsPlayed)
    skillCounter()
});


function hasReached(el) {
    let topPosition = el.getBoundingClientRect().top;
    if(window.innerHeight >= topPosition + el.offsetHeight)return true;
    return false;
}

function updateCount(num, maxNum) {
    let curentNum = +num.innerText;

    if(curentNum < maxNum) {
        num.innerText = curentNum + 1;
        setTimeout(() => {
            updateCount(num, maxNum)
        },12)
    }
}


let skillsPlayed = false;


function skillCounter() {
    if(!hasReached(first_skill))return;
    skillsPlayed = true;
    sk_counters.forEach((counter,i) => {
        let target = +counter.dataset.target;
        let strokeValue = 465 - 465 * (target / 100);

        progress_bar[i].style.setProperty("--target", strokeValue);

        setTimeout(() => {
            updateCount(counter, target);
        }, 400)
    });

    progress_bar.forEach(p => p.style.animation = "progress 2s ease-in-out forwards");
}


// side progress bar

let calcSrcollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let pos = document.documentElement.scrollTop;

    let calcHeight =document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100)/calcHeight);

    if(pos > 100) {
        scrollProgress.style.display = "grid";
    }else {
        scrollProgress.style.display = "none";
    }

    scrollProgress.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });

    scrollProgress.style.background = `conic-gradient(#fff ${scrollValue}%, #e6006d ${scrollValue}%)`
}

window.onscroll = calcSrcollValue;
window.onload = calcSrcollValue;

// active menu

let menLi = document.querySelectorAll("header ul li a");
let section = document.querySelectorAll('section');

function activeMenu() {
    let len = section.length;
    while(--len && window.scrollY + 97 < section[len].offsetTop){}
    menuLi.forEach(sec => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
}

activeMenu();
window.addEventListener("scroll", activeMenu);


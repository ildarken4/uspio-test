// Swiper

const swiper = new Swiper('.works-slider', {
    autoplay: {
        delay: 5000,
    },
    slidesPerView: 1,
    spaceBetween: 15,
    loop: true,
    breakpoints: {
        992: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        750: {
          slidesPerView: 2,
          spaceBetween: 30
        }
    },
    on: {
        init() {
          this.el.addEventListener('mouseenter', () => {
            this.autoplay.stop();
          });
    
          this.el.addEventListener('mouseleave', () => {
            this.autoplay.start();
          });
        }
    },
});

// модальние окна с изображениями 
var images = document.getElementsByClassName('image-open');
var modalImg = document.getElementById("modal-image");

for (var i = 0; i < images.length; i++) {
  images[i].onclick = function(){
    modalImg.src = this.src;
  }
}


// отправка email

var emailInput = document.getElementById('emailInput');
var sendButton = document.getElementById('send-email');


sendButton.addEventListener('click', function() {
    var email = document.getElementById("emailInput").value;
    // var data = {
    //     email: email
    // };
    // console.log(data);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "save_email.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.send("email=" + encodeURIComponent(email));

    var getEmailWord = new XMLHttpRequest();
    getEmailWord.open("GET", "emails.json", true);
    getEmailWord.onreadystatechange = function() {
        if (getEmailWord.readyState == 4 && getEmailWord.status == 200) {
            var data = JSON.parse(getEmailWord.responseText);
            var word = data.word;
            sendButton.textContent = word;
            sendButton.classList.add('apply')
        }
    };
    getEmailWord.send();
});










// мобильное меню

let menuToggler = document.querySelector('.nav-toggler');
let menuOpened = false;

menuToggler.addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('nav').classList.toggle('active');
    showDialog();
})

const showDialog = () => {
    if (!menuOpened){
        const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
        const body = document.body;
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}`;
        menuOpened = true
    } else {
        const body = document.body;
        const scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        menuOpened = false
    }
  
};
window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});
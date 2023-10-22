let buttonsFooter = document.querySelectorAll(".buttonFooter");

buttonsFooter.forEach((element) => {
    element.addEventListener("click", () => {

        if(element.getAttribute("data-id") == "1"){
            window.location.href = "../home/index.html";
        }else if(element.getAttribute("data-id") == "2"){
            window.location.href = "../add/index.html";
        }else if(element.getAttribute("data-id") == "3"){
            window.location.href = "../calendary/index.html";
        }
        
    });
});

let buttonsContentPage = document.querySelectorAll(".item");

buttonsContentPage.forEach((element) =>{
    element.addEventListener('click',()=>{
        if(element.getAttribute("data-item") == 1){
            let circle = element.querySelector(".circle");
            circle.querySelector(".fa-circle").classList.remove("fa-regular");
            circle.querySelector(".fa-circle").classList.add("fa-solid");
            setTimeout(()=>{
                circle.querySelector(".fa-circle").classList.add("fa-regular");
                circle.querySelector(".fa-circle").classList.remove("fa-solid");      
            }, 1000)
        }else if(element.getAttribute("data-item") == 2){
            let circle = element.querySelector(".circle");
            circle.querySelector(".fa-circle").classList.remove("fa-regular");
            circle.querySelector(".fa-circle").classList.add("fa-solid");
            setTimeout(()=>{
                circle.querySelector(".fa-circle").classList.add("fa-regular");
                circle.querySelector(".fa-circle").classList.remove("fa-solid");      
            }, 1000)
        }else if(element.getAttribute("data-item") == 3){
            let circle = element.querySelector(".circle");
            circle.querySelector(".fa-circle").classList.remove("fa-regular");
            circle.querySelector(".fa-circle").classList.add("fa-solid");
            setTimeout(()=>{
                circle.querySelector(".fa-circle").classList.add("fa-regular");
                circle.querySelector(".fa-circle").classList.remove("fa-solid");      
            }, 1000)
        }else if(element.getAttribute("data-item") == 4){
            let circle = element.querySelector(".circle");
            circle.querySelector(".fa-circle").classList.remove("fa-regular");
            circle.querySelector(".fa-circle").classList.add("fa-solid");
            setTimeout(()=>{
                circle.querySelector(".fa-circle").classList.add("fa-regular");
                circle.querySelector(".fa-circle").classList.remove("fa-solid");      
            }, 1000)
        }
    });
})


let reminders = document.querySelectorAll(".itemReminder");
let contClicksReminders = 0;

reminders.forEach(element =>{
    element.querySelector(".showReminder").addEventListener("click", () =>{
        contClicksReminders++;
        if(contClicksReminders % 2 != 0){
            element.querySelector(".description").style.display = "flex";
            element.querySelector(".fa-eye").classList.add("fa-eye-slash");
            element.querySelector(".fa-eye").classList.remove("fa-eye");
        }else{
            element.querySelector(".description").style.display = "none";
            element.querySelector(".fa-eye-slash").classList.add("fa-eye");
            element.querySelector(".fa-eye-slash").classList.remove("fa-eye-slash");

        }
    });
})

let buttonConfig = document.querySelector(".configSpan");
let buttonBackConfig = document.querySelector(".backContent");
let buttonNotification = document.querySelector(".notificationSpan");
let buttonBackNotification = document.querySelector(
  ".backContentNotificaciones"
);

buttonConfig.addEventListener("click", () => {
  document.querySelector(".spawnConfiguracion").style.left = "0%";
});

buttonNotification.addEventListener("click", () => {
  document.querySelector(".spawnNotificaciones").style.right = "0%";
});

buttonBackNotification.addEventListener("click", () => {
  document.querySelector(".spawnNotificaciones").style.right = "-100%";
});

buttonBackConfig.addEventListener("click", () => {
  document.querySelector(".spawnConfiguracion").style.left = "-100%";
});

//Spawn Notificaciones

let buttonsTrayNotifications = document.querySelectorAll(".itemTray");
let contClicksTrayNotifications = 0;

buttonsTrayNotifications.forEach((element) => {
  if (!element.classList.contains("liActive")) {
    element.addEventListener("click", () => {
      buttonsTrayNotifications.forEach((element) => {
        element.style.backgroundColor = "rgb(255, 255, 255, .2)";
      });

      element.style.backgroundColor = "rgba(69, 69, 69, 0.5)";
    });
  } else {
    element.addEventListener("click", () => {
      contClicksTrayNotifications++;
      if (contClicksTrayNotifications % 2 != 0) {
        element.querySelector(".arrow").style.transform = "rotate(-180deg)";
      } else {
        element.querySelector(".arrow").style.transform = "rotate(0deg)";
      }
    });
  }
});

let numberReminder = 0;


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


//Reminder Form

let addReminder = document.querySelector(".contentAddReminder");
let closeAddReminder = document.querySelector(".closeReminder");

addReminder.addEventListener("click", () =>{
    document.querySelector(".contentBlockPage").style.top = "0%";
});

closeAddReminder.addEventListener("click", () =>{
  document.querySelector(".contentBlockPage").style.top = "100%";
});


let sendReminder = document.querySelector(".inputConfirm");
let inputNumberFrequency = document.querySelector(".inputNumberFrequency");
let hoursReminder = {};

function createHoursElements(number){

  if(document.querySelectorAll(".itemTimeDate")){
    let hoursTimeDate = document.querySelectorAll(".itemTimeDate");
    hoursTimeDate.forEach(element =>{
      element.remove();
    })
  }

  for(let i = 1; i <= number; i++){
    let listTimeDate = document.querySelector(".listTimeDate");

    let liTimeDate = document.createElement("li");
    liTimeDate.className = "itemTimeDate";
  
    let labelTimeDate = document.createElement("label");
    labelTimeDate.textContent = "Hora del recordatorio ";
  
    let sNumberTimeDate = document.createElement("strong");
    sNumberTimeDate.className = "numberTimeDate";
    sNumberTimeDate.textContent = i;
    sNumberTimeDate.style.fontWeight = "lighter";
  
    let inputTimeDate = document.createElement("input");
    inputTimeDate.type = "time";
    inputTimeDate.name = "inputTimeDate";
    inputTimeDate.className = "inputTimeDate";
  
    listTimeDate.appendChild(liTimeDate);
  
    liTimeDate.appendChild(labelTimeDate);
    labelTimeDate.appendChild(sNumberTimeDate);
    liTimeDate.appendChild(inputTimeDate);
  
  }

}

function clearInputs() {
  let spawnPopup = document.querySelector(".spawnPopupNewReminder");
  let allInputs = spawnPopup.querySelectorAll(".clear");

  for (let i = 0; i < allInputs.length; i++) {
      allInputs[i].value = "";
  }

  document.querySelectorAll(".itemTimeDate").forEach(element =>{
    element.remove();
  })
}


inputNumberFrequency.addEventListener("keyup", () =>{
  createHoursElements(inputNumberFrequency.value);
});

let flagContinueAddReminder = true;

sendReminder.addEventListener("click", () => {

  let nameReminder = document.querySelector(".inputName").value;
  flagContinueAddReminder = true;

  if(nameReminder.length <= 18 && nameReminder.length > 0){
    document.querySelector(".inputName").style.border = "1px solid";
    document.querySelector(".inputName").style.animation = "none 0.3s";
  }else{
    flagContinueAddReminder = false;
    document.querySelector(".inputName").style.border = "2px solid tomato";
    document.querySelector(".inputName").style.animation = "errInput 0.3s";
  }

  let nameMedicine = document.querySelector(".inputDescription").value;
  if(nameMedicine.length <= 18 && nameMedicine.length > 0){
    document.querySelector(".inputDescription").style.animation = "none 0.3s";
    document.querySelector(".inputDescription").style.border = "1px solid";
  }else{
    flagContinueAddReminder = false;
    document.querySelector(".inputDescription").style.border = "2px solid tomato";
    document.querySelector(".inputDescription").style.animation = "errInput 0.3s";
  }
  
  let inputTimeInit = document.querySelector(".inputTimeInit").value;
  if(inputTimeInit == ""){
    flagContinueAddReminder = false;
    document.querySelector(".inputTimeInit").style.border = "2px solid tomato";
    document.querySelector(".inputTimeInit").style.animation = "errInput 0.3s";
  }else{
    document.querySelector(".inputTimeInit").style.animation = "none 0.3s";
    document.querySelector(".inputTimeInit").style.border = "1px solid";
  }

  let inputTimeEnd = document.querySelector(".inputTimeEnd").value;
  if(inputTimeEnd == ""){
    flagContinueAddReminder = false;
    document.querySelector(".inputTimeEnd").style.border = "2px solid tomato";
    document.querySelector(".inputTimeEnd").style.animation = "errInput 0.3s";
  }else{
    document.querySelector(".inputTimeEnd").style.animation = "none 0.3s";
    document.querySelector(".inputTimeEnd").style.border = "1px solid";
  }

  let inputNumberFrequency = document.querySelector(".inputNumberFrequency").value;
  if(inputNumberFrequency <= 0){
    flagContinueAddReminder = false;
    document.querySelector(".inputNumberFrequency").style.border = "2px solid tomato";
    document.querySelector(".inputNumberFrequency").style.animation = "errInput 0.3s";
  }else{
    document.querySelector(".inputNumberFrequency").style.animation = "none 0.3s";
    document.querySelector(".inputNumberFrequency").style.border = "1px solid";
  }

  let inputTimeDate = document.querySelectorAll(".inputTimeDate");
  
  if(inputNumberFrequency > 0){
      inputTimeDate.forEach(element =>{
        if(element.value <= 0){
          flagContinueAddReminder = false;
          element.style.border = "2px solid tomato";
          element.style.animation = "errInput 0.3s";      
        }else{
          element.style.animation = "none 0.3s";
          element.style.border = "1px solid";      
        }
      })
  }

  for(let i = 0; i < inputTimeDate.length; i++){
    hoursReminder[i] = inputTimeDate.item(i).value;
  }

  if(flagContinueAddReminder){
    createReminder(nameReminder, nameMedicine, inputTimeInit, inputTimeEnd, inputNumberFrequency, hoursReminder);
    document.querySelector(".contentBlockPage").style.top = "100%";
    clearInputs();
  }else{
    console.log("Llenar bien los campos");
  }

});

function createReminder(nameReminder,nameMedicine ,timeInit ,timeEnd ,numberFrequency ,hoursReminder){
  let listReminder = document.querySelector(".listReminder");

  let newli = document.createElement("li");
  newli.className = "itemReminder";

  let contentTopReminder = document.createElement("div");
  contentTopReminder.className = "contentTopReminder";

  let titleReminder = document.createElement("h3");
  titleReminder.className = "titleReminder";
  titleReminder.textContent = nameReminder;

  let showReminder = document.createElement("span");
  showReminder.className = "showReminder";

  let eyeReminder = document.createElement("i");
  eyeReminder.className = "fa-solid fa-eye fa-lg";
  eyeReminder.id = "eye";

  let description = document.createElement("div");
  description.className = "description";

  let pNameMedicine = document.createElement("p");
  pNameMedicine.className = "pNameMedicine";
  pNameMedicine.textContent = "Medicina: ";
  let sNameMedicine = document.createElement("strong");
  sNameMedicine.className = "nameMedicine";
  sNameMedicine.textContent = nameMedicine;

  let pTimeInit = document.createElement("p");
  pTimeInit.className = "pTimeInit";
  pTimeInit.textContent = "Fecha de inicio: ";
  let sTimeInit = document.createElement("strong");
  sTimeInit.className = "timeInit";
  sTimeInit.textContent = timeInit;

  let pTimeEnd = document.createElement("p");
  pTimeEnd.className = "pTimeEnd";
  pTimeEnd.textContent = "Fecha de finalizacion: ";
  let sTimeEnd = document.createElement("strong");
  sTimeEnd.className = "timeEnd";
  sTimeEnd.textContent = timeEnd;

  let pNumberFrequency = document.createElement("p");
  pNumberFrequency.className = "pNumberFrequency";
  pNumberFrequency.textContent = "Frecuencia por dia del recordatorio: ";
  let sNumberFrequency = document.createElement("strong");
  sNumberFrequency.className = "numberFrequency";
  sNumberFrequency.textContent = numberFrequency;

  // Construir la jerarquía de elementos
  showReminder.appendChild(eyeReminder);
  contentTopReminder.appendChild(titleReminder);
  contentTopReminder.appendChild(showReminder);
  newli.appendChild(contentTopReminder);
  newli.appendChild(description);
  description.appendChild(pNameMedicine);
  description.appendChild(pTimeEnd);
  description.appendChild(pTimeInit);
  pNameMedicine.appendChild(sNameMedicine);
  pTimeInit.appendChild(sTimeInit);
  pTimeEnd.appendChild(sTimeEnd);
  description.appendChild(pNumberFrequency);
  pNumberFrequency.appendChild(sNumberFrequency);
  for(let i = 0; i < numberFrequency; i++){
    let pTimeDate = document.createElement("p");
    pTimeDate.className = "pTimeDate";
    pTimeDate.textContent = `Hora del recordatorio ${i+1}: `;
    let sTimeDate = document.createElement("strong");
    sTimeDate.className = "timeDate";
    sTimeDate.textContent = hoursReminder[i];
    description.appendChild(pTimeDate);
    pTimeDate.appendChild(sTimeDate);
  }
  // Agregar el nuevo <li> a la lista
  listReminder.appendChild(newli);

let reminders = document.querySelectorAll(".itemReminder");
let contClicksReminders = 0;

reminders.forEach(element =>{
    element.querySelector(".showReminder").addEventListener("click", () =>{
        contClicksReminders++;
        if(contClicksReminders % 2 != 0){
            element.querySelector(".description").style.display = "flex";
            element.querySelector("#eye").classList.add("fa-eye-slash");
            element.querySelector("#eye").classList.remove("fa-eye");
        }else{
            element.querySelector(".description").style.display = "none";
            element.querySelector("#eye").classList.add("fa-eye");
            element.querySelector("#eye").classList.remove("fa-eye-slash");
        }
    });
})

numberReminder++;

}

setInterval(()=>{
  if(numberReminder <= 0){
    document.querySelector(".itemReminderNone").style.display = "block";
  }else{
    document.querySelector(".itemReminderNone").style.display = "none";
  }
},100)


// let reminders = document.querySelectorAll(".itemReminder");
// let contClicksReminders = 0;

// reminders.forEach(element =>{
//     element.querySelector(".showReminder").addEventListener("click", () =>{
//         contClicksReminders++;
//         if(contClicksReminders % 2 != 0){
//             element.querySelector(".description").style.display = "flex";
//             element.querySelector(".fa-eye").classList.add("fa-eye-slash");
//             element.querySelector(".fa-eye").classList.remove("fa-eye");
//         }else{
//             element.querySelector(".description").style.display = "none";
//             element.querySelector(".fa-eye-slash").classList.add("fa-eye");
//             element.querySelector(".fa-eye-slash").classList.remove("fa-eye-slash");

//         }
//     });
// })


//Reminder Form
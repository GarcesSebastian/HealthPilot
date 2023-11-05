const checkAudio = new Audio();

let timeReminder = {
  dataSpan: [],
  hour: [],
  minute: [],
};

let dateReminder = {
  dataSpan: [],
  day: [],
  month: [],
  year: [],
};

let dateReminderEnd = {
  dataSpan: [],
  day: [],
  month: [],
  year: [],
};

let contentReminder = {
  dataSpan: [],
  title: [],
  medicine: [],
  sound: [],
  soundDuration: [],
};

let reminder = {
  contentReminder: contentReminder,
  timeReminder: timeReminder,
  dateReminder: dateReminder,
  dateReminderEnd: dateReminderEnd,
};

let notifications = {
  type: [],
  name: [],
  hour: [],
  minute: []
};

let messageMotivational = [
  "Tu salud es tu mayor riqueza. Cuida de tu corazón y mantenlo fuerte para disfrutar de una vida plena y activa.",
  "Cada paso que das hacia una vida más saludable es un paso hacia un futuro más brillante y lleno de energía.",
  "Tu corazón es un tesoro invaluable. Protégelo con buenos hábitos y una actitud positiva.",
  "No permitas que la hipertensión te defina. Tú tienes el poder de controlarla y vivir una vida plena.",
  "Cada elección saludable que haces te acerca a un mañana más lleno de vitalidad y menos preocupaciones.",
  "Recuerda que cada día es una nueva oportunidad para cuidar de tu salud. ¡Aprovecha cada momento!",
  "La hipertensión no tiene por qué ser un obstáculo insuperable. Con determinación y cuidado, puedes mantenerla bajo control.",
  "Tú eres fuerte y capaz de superar cualquier desafío, incluso la hipertensión. Cree en ti mismo y en tu capacidad para manejarla.",
  "La vida es un regalo precioso. Aprovecha cada día para cuidar de tu salud y vivir plenamente.",
  "Nunca subestimes el poder de tu actitud positiva. Con pensamientos optimistas y hábitos saludables, puedes superar cualquier adversidad.",
  "Cada latido de tu corazón es una oportunidad para amar la vida. Cuídalo y permite que te lleve a nuevos horizontes.",
  "El viaje hacia una vida más saludable comienza con un solo paso. Hoy es el día perfecto para dar ese paso.",
  "La determinación es tu mejor aliada en la lucha contra la hipertensión. Nunca te rindas, y verás resultados sorprendentes.",
  "Tus sueños y metas merecen un corazón fuerte y saludable. Mantén tu visión clara y trabaja hacia un futuro vibrante.",
  "Cada pequeño cambio en tus hábitos suma. Celebra cada victoria, por más pequeña que sea.",
  "Tú tienes el poder de escribir tu propia historia de salud. Asegúrate de que sea una historia de superación y éxito.",
  "La hipertensión puede ser un obstáculo, pero también puede ser un trampolín hacia una vida mejor. Elige la segunda opción.",
  "Recuerda que el autocuidado es un acto de amor propio. Mereces vivir con bienestar y alegría.",
  "La fuerza interior que necesitas para enfrentar la hipertensión está dentro de ti. Confía en ti mismo y en tu capacidad para superar desafíos.",
  "Tu salud es un regalo que debes valorar todos los días. Aprovecha este regalo y vive con gratitud y determinación.",
  "Cada día que eliges cuidar de tu salud, estás escribiendo un capítulo de resistencia y determinación en tu historia.",
  "La hipertensión es solo un obstáculo en tu camino hacia una vida más saludable. Supérala con confianza y perseverancia.",
  "Tu bienestar es tu responsabilidad. Toma el control de tu salud y construye un futuro lleno de vitalidad.",
  "El amor propio es la base de la salud. Trátate con cariño y haz elecciones que nutran tu cuerpo y mente.",
  "Cada esfuerzo que haces por mantener tu presión arterial bajo control te acerca a una vida más equilibrada y activa.",
  "La vida es un regalo, y mereces disfrutarla al máximo. No dejes que la hipertensión te impida hacerlo.",
  "La paciencia es tu aliada en esta batalla. Los resultados positivos pueden llevar tiempo, pero valen la pena.",
  "La adversidad puede revelar tu verdadera fortaleza. Aprovecha el desafío de la hipertensión para crecer y mejorar.",
  "Nunca subestimes el impacto de las pequeñas mejoras en tu estilo de vida. Cada cambio cuenta en tu viaje hacia la salud.",
  "El autocuidado es un acto de amor hacia ti mismo. Practica el autocuidado diariamente para sentirte mejor.",
  "Cada latido de tu corazón es un recordatorio de la vida que fluye a través de ti. Cuídalo y vívela plenamente.",
  "No importa cuán lejos estés de tus metas de salud; cada paso te acerca más a ellas. Mantén la determinación.",
  "La resiliencia es tu superpoder. Supera los obstáculos con la fuerza de tu espíritu y el cuidado de tu salud.",
  "Tus sueños merecen un corazón fuerte para convertirse en realidad. Trabaja en tu salud y persigue tus aspiraciones con pasión.",
  "Cada día es una oportunidad para tomar decisiones saludables. Aprovecha cada día como un nuevo comienzo.",
  "La positividad es la luz que ilumina tu camino hacia la salud. Mantén una actitud optimista en tu viaje.",
  "No estás solo en esto. Busca apoyo y comparte tu lucha con seres queridos o grupos de apoyo.",
  "La consistencia es la clave del éxito. Mantén tus hábitos saludables de manera constante y verás resultados positivos.",
  "El amor y el apoyo de quienes te rodean son tu mayor fortaleza. Permite que te impulsen hacia un futuro saludable.",
  "Tú eres capaz de superar la hipertensión y vivir una vida plena. Cree en ti mismo y en tu capacidad para triunfar.",
  "La adversidad puede revelar tu verdadera fortaleza. Aprovecha el desafío de la hipertensión para crecer y mejorar.",
  "Nunca subestimes el impacto de las pequeñas mejoras en tu estilo de vida. Cada cambio cuenta en tu viaje hacia la salud.",
  "El autocuidado es un acto de amor hacia ti mismo. Practica el autocuidado diariamente para sentirte mejor.",
  "Cada latido de tu corazón es un recordatorio de la vida que fluye a través de ti. Cuídalo y vívela plenamente.",
  "No importa cuán lejos estés de tus metas de salud; cada paso te acerca más a ellas. Mantén la determinación.",
  "La resiliencia es tu superpoder. Supera los obstáculos con la fuerza de tu espíritu y el cuidado de tu salud.",
  "Tus sueños merecen un corazón fuerte para convertirse en realidad. Trabaja en tu salud y persigue tus aspiraciones con pasión.",
  "Cada día es una oportunidad para tomar decisiones saludables. Aprovecha cada día como un nuevo comienzo.",
  "La positividad es la luz que ilumina tu camino hacia la salud. Mantén una actitud optimista en tu viaje.",
  "No estás solo en esto. Busca apoyo y comparte tu lucha con seres queridos o grupos de apoyo.",
  "La consistencia es la clave del éxito. Mantén tus hábitos saludables de manera constante y verás resultados positivos.",
  "El amor y el apoyo de quienes te rodean son tu mayor fortaleza. Permite que te impulsen hacia un futuro saludable.",
  "Tú eres capaz de superar la hipertensión y vivir una vida plena. Cree en ti mismo y en tu capacidad para triunfar.",
  "Cada día que eliges cuidar de tu salud, estás escribiendo un capítulo de resistencia y determinación en tu historia.",
  "La hipertensión es solo un obstáculo en tu camino hacia una vida más saludable. Supérala con confianza y perseverancia.",
  "Tu bienestar es tu responsabilidad. Toma el control de tu salud y construye un futuro lleno de vitalidad.",
  "El amor propio es la base de la salud. Trátate con cariño y haz elecciones que nutran tu cuerpo y mente.",
  "Cada esfuerzo que haces por mantener tu presión arterial bajo control te acerca a una vida más equilibrada y activa.",
];

let messageDataRandom = [
  "La hipertensión arterial es una afección crónica en la que la fuerza de la sangre contra las paredes de las arterias es alta.",
  "Puede ser una enfermedad silenciosa, ya que a menudo no presenta síntomas visibles.",
  "La hipertensión no controlada puede aumentar el riesgo de enfermedades cardíacas, accidentes cerebrovasculares y problemas renales.",
  "Cambios en la dieta, como reducir la sal y aumentar la ingesta de frutas y verduras, pueden ayudar a controlar la presión arterial.",
  "El ejercicio regular es una forma efectiva de mantener la presión arterial bajo control.",
  "El estrés crónico puede contribuir a la hipertensión. La gestión del estrés es importante en el control de la enfermedad.",
  "Las mediciones de la presión arterial se expresan en dos números: sistólica (la presión en las arterias cuando el corazón late) y diastólica (la presión cuando el corazón está en reposo).",
  "La hipertensión es más común en adultos mayores, pero puede afectar a personas de todas las edades.",
  "El consumo excesivo de alcohol puede aumentar la presión arterial.",
  "El tabaquismo también es un factor de riesgo para la hipertensión.",
  "La genética desempeña un papel en la predisposición a la hipertensión.",
  "Las complicaciones de la hipertensión pueden incluir daño a los vasos sanguíneos, insuficiencia cardíaca, ataque al corazón y accidente cerebrovascular.",
  "El monitoreo regular de la presión arterial es esencial para controlar la hipertensión.",
  "Los medicamentos recetados a menudo se utilizan para tratar la hipertensión cuando los cambios en el estilo de vida no son suficientes.",
  "La hipertensión es una de las principales causas de muerte en todo el mundo.",
  "La pérdida de peso puede ayudar a reducir la presión arterial en personas con sobrepeso u obesidad.",
  "La hipertensión puede afectar negativamente la función renal.",
  "El consumo excesivo de sal es un factor de riesgo importante para la hipertensión.",
  "El seguimiento constante de la presión arterial en el hogar puede ser útil para el control de la enfermedad.",
  "La meditación y la relajación pueden ser efectivas en la reducción del estrés y la presión arterial.",
  "La hipertensión no controlada puede dañar los vasos sanguíneos y órganos vitales.",
  "La presión arterial alta a menudo no causa síntomas hasta que haya daño significativo.",
  "La hipertensión es una enfermedad tratable, y muchas personas pueden llevar vidas saludables con el tratamiento adecuado.",
  "La presión arterial puede fluctuar a lo largo del día debido a la actividad y el estrés.",
  "El control de la hipertensión a menudo implica una combinación de cambios en el estilo de vida y medicamentos.",
  "Las complicaciones graves de la hipertensión pueden incluir insuficiencia cardíaca congestiva y daño a los riñones.",
  "La hipertensión no controlada puede aumentar el riesgo de aneurismas arteriales.",
  "La enfermedad cardíaca es una de las principales complicaciones de la hipertensión no controlada.",
  "La hipertensión es un factor de riesgo importante para el accidente cerebrovascular.",
  "La educación y la conciencia son fundamentales para prevenir y controlar la hipertensión.",
  "El tratamiento de la hipertensión generalmente es un compromiso a largo plazo.",
  "El diagnóstico temprano y el tratamiento adecuado pueden prevenir complicaciones graves.",
  "El estrés crónico puede aumentar la presión arterial y empeorar la hipertensión.",
  "La presión arterial se puede medir en casa con dispositivos de monitoreo de la presión arterial.",
  "Las complicaciones de la hipertensión pueden incluir daño a los ojos y la visión.",
  "La hipertensión es una de las principales causas de enfermedad renal crónica.",
  "Los niños y los adolescentes también pueden desarrollar hipertensión, especialmente si tienen sobrepeso o antecedentes familiares.",
  "El control de la hipertensión puede ayudar a prevenir problemas de salud graves en el futuro.",
  "La hipertensión es a menudo llamada 'el asesino silencioso' debido a su falta de síntomas evidentes.",
  "La hipertensión arterial puede ser hereditaria, lo que significa que puede transmitirse de padres a hijos.",
  "La obesidad es un factor de riesgo importante para la hipertensión, ya que el exceso de peso puede aumentar la presión arterial.",
  "Las personas con diabetes tienen un mayor riesgo de desarrollar hipertensión.",
  "El consumo excesivo de cafeína puede temporariamente elevar la presión arterial.",
  "El apoyo social y emocional puede desempeñar un papel importante en la gestión de la hipertensión.",
  "Las complicaciones cerebrovasculares, como los accidentes cerebrovasculares, son más comunes en personas con hipertensión no controlada.",
  "Las personas con hipertensión deben limitar la ingesta de alcohol y seguir las recomendaciones de su médico.",
  "El tratamiento de la hipertensión puede incluir una combinación de medicamentos, cambios en la dieta y ejercicio.",
  "El estrés laboral crónico puede contribuir al desarrollo de la hipertensión.",
  "El ejercicio regular, como caminar o nadar, puede ayudar a reducir la presión arterial.",
  "El control adecuado de la hipertensión puede reducir el riesgo de daño a los órganos vitales.",
  "El seguimiento regular con un médico es esencial para el manejo efectivo de la hipertensión.",
  "La hipertensión es más común en personas de ascendencia africana.",
  "Las complicaciones de la hipertensión pueden incluir daño a los vasos sanguíneos en el cerebro.",
  "La hipertensión gestacional puede afectar a las mujeres durante el embarazo y generalmente se resuelve después del parto.",
  "La hipertensión pulmonar es una forma específica de hipertensión que afecta las arterias pulmonares.",
  "El control del peso y la actividad física son componentes clave en el manejo de la hipertensión.",
  "Las personas con hipertensión deben limitar la ingesta de alimentos ricos en sodio, como alimentos procesados y enlatados.",
  "La presión arterial puede variar en función de la hora del día y las actividades diarias.",
  "El tratamiento de la hipertensión a menudo implica un enfoque individualizado para cada paciente."
];

function separatorURL(URL){
  let URLnone = URL.replace("blob:http://127.0.0.1:5500/", "");
  console.log(URLnone);
}

function encryptData(data) {
  const key = "A1B2C3D4";
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), key);
  return encryptedData.toString();
}

function decryptData(encryptedData) {
  const key = "A1B2C3D4";
  const bytes = CryptoJS.AES.decrypt(encryptedData, key);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}

function getReminderLocalStorage(){
  const encryptedData = localStorage.getItem("reminders");
  if (encryptedData) {
    const decryptedData = decryptData(encryptedData);
    reminder = decryptedData;
    timeReminder = decryptedData.timeReminder;
    dateReminder = decryptedData.dateReminder;
    dateReminderEnd = decryptedData.dateReminderEnd;
    contentReminder = decryptedData.contentReminder;
  }

  let indexSoundsFiles = soundFiles.indexOf(contentReminder.sound[0]);

  let checkSounds = document.querySelectorAll(".checkSound");

  checkSounds.forEach(element =>{
    if(element.getAttribute("data-check") == (indexSoundsFiles + 1).toString()){
      element.checked = true;
      checkSounds.forEach(elementRemove =>{
        if(elementRemove.getAttribute("data-check") != element.getAttribute("data-check")){
          elementRemove.checked = false;
        }
      });
    }
    
  });
}

function getNotificationsLocalStorage() {
  const encryptedData = localStorage.getItem("notifications");
  if (encryptedData) {
    const decryptedData = decryptData(encryptedData);
    notifications = decryptedData.notifications;
    for (let i = 0; i < notifications.type.length; i++) {
      createNotificationAppNew(notifications.name[i], notifications.type[i], notifications.hour[i], notifications.minute[i]);
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  getLocation();
  createMarkerClinic();
  createMarkerPharmacy();
  requestNotification();
  let contentFlagConfigNotificationGet = localStorage.getItem("notifConfig");

  if(contentFlagConfigNotificationGet){
    let arrayBooleanNotification = JSON.parse(contentFlagConfigNotificationGet);
    flagGetNotification = arrayBooleanNotification[0];
    flagGetNotificationReminder = arrayBooleanNotification[1];
    flagGetNotificationSound = arrayBooleanNotification[2];
    flagGetNotificationSpam = arrayBooleanNotification[3];

    document.querySelector(".reminderNotification").checked = flagGetNotificationReminder;
    document.querySelector(".soundNotification").checked = flagGetNotificationSound;
    document.querySelector(".spamNotification").checked = flagGetNotificationSpam;


    if(flagGetNotification){
      document.querySelector(".stateToggleNotificaciones").textContent = "Activado";
    }else{
      document.querySelector(".stateToggleNotificaciones").textContent = "Desactivado";
    }

  }else{
    let contentFlagConfigNotification = [true, true, true, true];
    localStorage.setItem("notifConfig", JSON.stringify(contentFlagConfigNotification));
  
    let contentFlagConfigNotificationGet = localStorage.getItem("notifConfig");
    let arrayBooleanNotification = JSON.parse(contentFlagConfigNotificationGet);
    flagGetNotification = arrayBooleanNotification[0];
    flagGetNotificationReminder = arrayBooleanNotification[1];
    flagGetNotificationSound = arrayBooleanNotification[2];
    flagGetNotificationSpam = arrayBooleanNotification[3];

    document.querySelector(".reminderNotification").checked = flagGetNotificationReminder;
    document.querySelector(".soundNotification").checked = flagGetNotificationSound;
    document.querySelector(".spamNotification").checked = flagGetNotificationSpam;


    if(flagGetNotification){
      document.querySelector(".stateToggleNotificaciones").textContent = "Activado";
    }else{
      document.querySelector(".stateToggleNotificaciones").textContent = "Desactivado";
    }
  }

  getReminderLocalStorage();
  setReminderLocalStorage();
  getNotificationsLocalStorage();

  if(document.querySelector(".reminderNotification").checked == false && document.querySelector(".soundNotification").checked == false && document.querySelector(".spamNotification").checked == false){
    flagGetNotification = false;
    flagGetNotificationReminder = false;
    flagGetNotificationSound = false;
    flagGetNotificationSpam = false;
    document.querySelector(".stateToggleNotificaciones").textContent =
      "Desactivado";
  }

  if(document.querySelector(".reminderNotification").checked == true){
    flagGetNotificationReminder = true;
    document.querySelector(".stateToggleNotificaciones").textContent =
    "Activado";
  }else{
    flagGetNotificationReminder = false;
    flagGetNotificationSound = false;
    document.querySelector(".soundNotification").checked = false;
  }

});

function setReminderLocalStorage() {
  const encryptedData = encryptData({
    contentReminder: contentReminder,
    timeReminder: timeReminder,
    dateReminder: dateReminder,
    dateReminderEnd: dateReminderEnd,
  });
  localStorage.setItem("reminders", encryptedData);
}

function setNotificationsLocalStorage() {
  const encryptedData = encryptData({
    notifications: notifications
  });
  localStorage.setItem("notifications", encryptedData);
}

let searchGeoJSON = "../../../GeoJson/searchGeo.geojson";
let geoJSONPath = "../../../GeoJson/pharmacy.geojson";
let clinicGeoJSONPath = "../../../GeoJson/clinic.geojson";
let contPharmacy = 0;
let contDefaultPharmacy = 0;
let contClinic = 0;
let contDefaultClinic = 0;

let startPoint = null;
let endPoint = null;
let routingControl = null;
let routingControlClinic = null;

let flagRoutePharmacy = false;
let flagRouteClinica = false;

let contentFlagConfigNotification = []; 
let flagGetNotification = true;
let flagGetNotificationReminder = true;
let flagGetNotificationSound = true;
let flagGetNotificationSpam = true;

function requestNotification(){
  Notification.requestPermission().then(result =>{
    console.log("Respuesta: "+ result);
  })
}

let audio = new Audio("../../../sound/sound.mp3");

function detenerAudio() {
  if(flagGetNotificationSound == true){
    if(contentReminder.sound[0] == undefined || contentReminder.sound[0] == null){
      audio.pause();
      audio.currentTime = 0;
    }else{
      checkAudio.src = contentReminder.sound[0];
      checkAudio.pause();
      checkAudio.currentTime = 0;
    }
  }
}

function setNotification(x) {
  if (Notification.permission === "granted") {
    let indexSpan = contentReminder.dataSpan.indexOf(x);
    let waitNotification;

    const options = {
      body:
        contentReminder.title[indexSpan] +
        "\n" +
        "Recordatorio para dosis de la medicina " +
        contentReminder.medicine[indexSpan],
      icon: "../../../img/logo_small_icon_only_inverted.png",
    };

    if(flagGetNotificationSound == true){
      if(contentReminder.sound[0] == undefined || contentReminder.sound[0] == null){
        audio.play();
      }else{
        checkAudio.src = contentReminder.sound[0];
        checkAudio.play();
      }
    }

    const notificacion = new Notification("HealthPilot", options);

    document.querySelector(".btnPauseNotification").addEventListener("click", () =>{
      detenerAudio();
      notificacion.close();
      clearTimeout(waitNotification);
      document.querySelector(".spawnPauseNotification").style.right = "-20%";
    });

    if(contentReminder.soundDuration[0] != null || contentReminder.soundDuration[0] != undefined){
      waitNotification = setTimeout(() => {
        detenerAudio();
        notificacion.close();
        document.querySelector(".spawnPauseNotification").style.right = "-20%";
      }, contentReminder.soundDuration[0] * 1000);
    }else{
      audio.addEventListener("canplaythrough", function () {
        detenerAudio();
        notificacion.close();
        document.querySelector(".spawnPauseNotification").style.right = "-20%";
      });
    }

  } else if (Notification.permission === "denied") {
  } else if (Notification.permission === "default") {
  }
}


function getDate() {
  const fechaActual = new Date();
  const dia = fechaActual.getDate();
  const mes = fechaActual.getMonth() + 1;
  const anio = fechaActual.getFullYear();

  let date = {
    day: dia,
    month: mes,
    year: anio,
  };

  return date;
}

function getDateTime() {
  const fechaActual = new Date();
  const hour = fechaActual.getHours();
  const minute = fechaActual.getMinutes();
  const second = fechaActual.getSeconds();

  let dateTime = {
    hours: hour,
    minutes: minute,
    seconds: second,
  };

  return dateTime;
}

setInterval(()=>{
  if(document.querySelectorAll(".itemNotifications").length > 0){
    document.querySelector(".numberNotification").style.display = "block";
  }else{
    document.querySelector(".numberNotification").style.display = "none";
  }
},100);

function createNotificationApp(name) {

  if(name !== null || type !== null || hour !== null || minute !== null){

  let timeActuality = new Date();
  let hourActuality = timeActuality.getHours();
  let minuteActuality = timeActuality.getMinutes();
  let amPm = hourActuality >= 12 ? "p.m" : "a.m";

  if (hourActuality > 12) {
    hourActuality -= 12;
  }

  let listNotifications = document.querySelector(".listNotifications");

  let itemNotifications = document.createElement("li");
  itemNotifications.className = "itemNotifications";
  let newAttributeValue = (document.querySelectorAll(".itemNotifications").length + 1).toString();
  itemNotifications.setAttribute("data-notificacion", `${newAttributeValue}`);

  let infoNotifications = document.createElement("div");
  infoNotifications.className = "infoNotifications";

  let titleNotification = document.createElement("h4");
  titleNotification.className = "titleNotification";
  titleNotification.textContent = "Recordatorio";

  let descriptionNotification = document.createElement("p");
  descriptionNotification.className = "descriptionNotification";
  descriptionNotification.innerHTML = `Tienes un recordatorio de <strong class="addNotification"> ${name} </strong> pendiente, por favor confirme si ya lo recibio.`;
  
  let fechaNotification = document.createElement("h5");
  fechaNotification.className = "fechaNotification";
  fechaNotification.textContent = `${hourActuality}:${minuteActuality} ${amPm}`;

  let moreNotification = document.createElement("span");
  moreNotification.className = "moreNotification";

  let iMoreNotification = document.createElement("i");
  iMoreNotification.className = "fa-solid fa-check fa-lg";

  listNotifications.appendChild(itemNotifications);
  itemNotifications.appendChild(infoNotifications);
  itemNotifications.appendChild(moreNotification);
  moreNotification.appendChild(iMoreNotification  );
  infoNotifications.appendChild(titleNotification);
  infoNotifications.appendChild(descriptionNotification);
  infoNotifications.appendChild(fechaNotification);

  notifications.dataNotification.push(newAttributeValue);
  notifications.type.push("Recordatorio");
  notifications.name.push(name);
  notifications.hour.push(hourActuality);
  notifications.minute.push(minuteActuality);

  moreNotification.addEventListener("click", () => {
    itemNotifications.remove();
  
    for (let i = 0; i < notifications.dataNotification.length; i++) {
      if (notifications.dataNotification[i] === newAttributeValue) {
        notifications.dataNotification.splice(i, 1);
        notifications.type.splice(i, 1);
        notifications.name.splice(i, 1);
        notifications.hour.splice(i, 1);
        notifications.minute.splice(i, 1);
      }
    }

    setNotificationsLocalStorage();

  });

  }
}

function createNotificationAppNew(name, type, hour, minute) {
  if(name !== null || type !== null || hour !== null || minute !== null){
    let hourActuality = hour;
    let minuteActuality = minute;
    let amPm = hourActuality >= 12 ? "p.m" : "a.m";
  
    if (hourActuality > 12) {
      hourActuality -= 12;
    }
  
    let listNotifications = document.querySelector(".listNotifications");
  
    let itemNotifications = document.createElement("li");
    itemNotifications.className = "itemNotifications";
    let newAttributeValue = (document.querySelectorAll(".itemNotifications").length + 1).toString();
    itemNotifications.setAttribute("data-notificacion", `${newAttributeValue}`);
  
    let infoNotifications = document.createElement("div");
    infoNotifications.className = "infoNotifications";
  
    let titleNotification = document.createElement("h4");
    titleNotification.className = "titleNotification";
    titleNotification.textContent = type;
  
    let descriptionNotification = document.createElement("p");
    descriptionNotification.className = "descriptionNotification";
    descriptionNotification.innerHTML = `Tienes un recordatorio de <strong class="addNotification"> ${name} </strong> pendiente, por favor confirme si ya lo recibio.`;
    
    let fechaNotification = document.createElement("h5");
    fechaNotification.className = "fechaNotification";
    fechaNotification.textContent = `${hourActuality}:${minuteActuality} ${amPm}`;
  
    let moreNotification = document.createElement("span");
    moreNotification.className = "moreNotification";
  
    let iMoreNotification = document.createElement("i");
    iMoreNotification.className = "fa-solid fa-check fa-lg";
  
    listNotifications.appendChild(itemNotifications);
    itemNotifications.appendChild(infoNotifications);
    itemNotifications.appendChild(moreNotification);
    moreNotification.appendChild(iMoreNotification  );
    infoNotifications.appendChild(titleNotification);
    infoNotifications.appendChild(descriptionNotification);
    infoNotifications.appendChild(fechaNotification);
  
    
    moreNotification.addEventListener("click", () => {
      itemNotifications.remove();
    
      for (let i = 0; i < notifications.dataNotification.length; i++) {
        if (notifications.dataNotification[i] === newAttributeValue) {
          notifications.dataNotification.splice(i, 1);
          notifications.type.splice(i, 1);
          notifications.name.splice(i, 1);
          notifications.hour.splice(i, 1);
          notifications.minute.splice(i, 1);
        }
      }
  
      setNotificationsLocalStorage();
  
    });
  
  }  

}

setInterval(() => {
  let timeNotification = getDateTime();
  let dateNotification = getDate();
  let inputSpan;

  for (let i = 0; i < dateReminder.day.length; i++) {
    if (
      dateNotification.day == dateReminder.day[i] &&
      dateNotification.month == dateReminder.month[i] &&
      dateNotification.year == dateReminder.year[i]
    ) {
      inputSpan = dateReminder.dataSpan[i];
      for (let j = 0; j < timeReminder.dataSpan.length; j++) {
        if (
          timeNotification.hours === parseInt(timeReminder.hour[j]) &&
          timeNotification.minutes === parseInt(timeReminder.minute[j]) &&
          timeNotification.seconds === 0 && inputSpan === timeReminder.dataSpan[j]
        ) {
          if(flagGetNotificationReminder == true){
            if(flagGetNotificationSound == true){
              document.querySelector(".spawnPauseNotification").style.right = "4%";
            }
            createNotificationApp(contentReminder.title[i]);
            setNotificationsLocalStorage();
            setNotification(timeReminder.dataSpan[j]);
          }else{
            createNotificationApp(contentReminder.title[i]);
            setNotificationsLocalStorage();
          }
        }
      }
    }
  }

  for (let i = 0; i < dateReminderEnd.day.length; i++) {
    if (
      dateNotification.day == dateReminderEnd.day[i] &&
      dateNotification.month == dateReminderEnd.month[i] &&
      dateNotification.year == dateReminderEnd.year[i]
    ) {
      document.querySelectorAll(".itemReminder").forEach((element) => {
        if (element.getAttribute("data-span") == dateReminderEnd.dataSpan[i]) {
          element.remove();
        }
      });
    clearReminderFunc(dateReminderEnd.dataSpan[i]);
    }
  }
}, 1000);

function quitarTildesYEspacios(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, "");
}

function deleteRoute() {
  if (routingControl) {
    map.removeControl(routingControl);
  }
}

let buttonsFooter = document.querySelectorAll(".buttonFooter");

buttonsFooter.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.getAttribute("data-id") == "1") {
      window.location.href = "../home/index.php";
    } else if (element.getAttribute("data-id") == "2") {
      window.location.href = "../add/index.php";
    }
  });
});

let buttonsContentPage = document.querySelectorAll(".item");

buttonsContentPage.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.getAttribute("data-item") == 1) {
      let circle = element.querySelector(".itemCircle");
      circle.querySelector(".fa-circle").classList.remove("fa-regular");
      circle.querySelector(".fa-circle").classList.add("fa-solid");
      
      document.querySelector(".spawnContentPet").style.top = "0%";
      
      setTimeout(() => {
        circle.querySelector(".fa-circle").classList.add("fa-regular");
        circle.querySelector(".fa-circle").classList.remove("fa-solid");
      }, 1000);
    } else if (element.getAttribute("data-item") == 2) {
      let circle = element.querySelector(".itemCircle");
      circle.querySelector(".fa-circle").classList.remove("fa-regular");
      circle.querySelector(".fa-circle").classList.add("fa-solid");

      document.querySelector(".contentBlockEncuestas").style.display = "flex";
      document.querySelector(".spawnEncuestas").style.display = "flex";

      setTimeout(() => {
        circle.querySelector(".fa-circle").classList.add("fa-regular");
        circle.querySelector(".fa-circle").classList.remove("fa-solid");
      }, 1000);
    } else if (element.getAttribute("data-item") == 3) {
      let circle = element.querySelector(".itemCircle");
      circle.querySelector(".fa-circle").classList.remove("fa-regular");
      circle.querySelector(".fa-circle").classList.add("fa-solid");
      document.querySelector(".spawnConfiguracion").style.left = "0%";
      setTimeout(()=>{
        document.querySelector(".spawnConsultar").style.left = "0%";
      },100);
      setTimeout(() => {
        circle.querySelector(".fa-circle").classList.add("fa-regular");
        circle.querySelector(".fa-circle").classList.remove("fa-solid");
      }, 1000);
    } else if (element.getAttribute("data-item") == 4) {
      let circle = element.querySelector(".itemCircle");
      circle.querySelector(".fa-circle").classList.remove("fa-regular");
      circle.querySelector(".fa-circle").classList.add("fa-solid");
      document.querySelector(".contentMap").style.top = "0%";
      setTimeout(() => {
        circle.querySelector(".fa-circle").classList.add("fa-regular");
        circle.querySelector(".fa-circle").classList.remove("fa-solid");
      }, 1000);
    }
  });
});

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

let root = document.documentElement;
let buttonsGeneral = document
  .querySelector(".configGeneral")
  .querySelectorAll(".itemConfig");

buttonsGeneral.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.getAttribute("data-general") == "1") {
      document.querySelector('.color-input').click();
      document.querySelector(".color-input").addEventListener("change", () =>{
        let colorInput = document.querySelector('.color-input').value;
        root.style.setProperty("--background_1", colorInput);
      });
    } else if (element.getAttribute("data-general") == "2") {
    } else if (element.getAttribute("data-general") == "3") {

      document.querySelector(".spawnConfigCuenta").style.left = "0%";
    
    }
  });
});

//Spawn Notificaciones

let map = L.map("map", {
  zoomControl: false
}).setView([0, 0], 13);

const customZoomControl = L.control.zoom({
  position: 'bottomright',
});


customZoomControl.addTo(map);

L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}",
  {
    minZoom: 0,
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: "png",
  }
).addTo(map);

var pharmacyIcon = L.icon({
  iconUrl: "../../../img/markets/marketFarmacia.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

var clinicIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/7987/7987089.png ",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

var clientIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/7291/7291700.png ",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

var transparentIcon = L.divIcon({
  className: 'transparent-icon',
  iconSize: [0, 0],
});


function createRouteToPlace(latlng) {
  if (routingControl) {
    map.removeControl(routingControl);
  }

  routingControl = L.Routing.control({
    waypoints: [
      L.latLng(startPoint.lat, startPoint.lon),
      L.latLng(latlng),
    ],
    routeWhileDragging: false,
    show: false
  }).addTo(map);

  const routingContainer = document.querySelector(".leaflet-routing-container");
  if (routingContainer) {
    routingContainer.style.display = "none";
  }
  

  routingControl.on("routesfound", function (e) {
    let route = e.routes[0];
    let distance = route.summary.totalDistance;
    let time = route.summary.totalTime;

    let distanceInKm = distance / 1000;
    let timeInMinutes = (time / 60) * 2;

    document.querySelector(".distanceLabel").textContent ="Distancia: "+ distanceInKm.toFixed(1) + "km";
    document.querySelector(".timeLabel").textContent ="Tiempo estimado: "+ timeInMinutes.toFixed(1) + " minutos";
  });
}

function createMarkerPharmacy() {
  fetch(geoJSONPath)
    .then((response) => response.json())
    .then((data) => {
      L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
          contPharmacy++;
          if (feature.properties.name == "default") {
            contDefaultPharmacy++;
          }
          const marker = L.marker(latlng, { icon: pharmacyIcon }).bindPopup(
            `<div class="contentRoutePharmacy">
              <h3>${feature.properties.name}</h3>
              <button class="buttonRoutePharmacy">Como llegar</button>
            </div>`
          );
          marker.addTo(map);

          marker.addEventListener("popupopen", () => {
            if(document.querySelector(".buttonRoutePharmacy")){
              document.querySelector(".buttonRoutePharmacy").addEventListener("click", () => {
                flagRoutePharmacy = true;
                flagRouteClinica = false;
                map.removeLayer(marker);
                createRouteToPlace(latlng);
                map.addLayer(marker);
              });
            }
          });

          return marker;
        },
      });

      console.log("Número total de farmacias: " + contPharmacy);
      console.log("Número de farmacias sin nombre: " + contDefaultPharmacy);
    })
    .catch((error) => {
      console.error("Error al cargar datos del GeoJSON: " + error);
    });
}


function deleteMarkerPharmacy() {
  fetch(clinicGeoJSONPath)
    .then((response) => response.json())
    .then((data) => {
      const filteredData = data.features.filter(
        (feature) => feature.properties.amenity == "clinic"
      );

      map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      if (checkClinic.checked != false) {
          createMarkerClinic();
          if(!flagRouteClinica){
            deleteRoute();
          }
      }
    })
    .catch((error) => {
      console.error("Error al cargar datos del GeoJSON: " + error);
    });
}

function createMarkerClinic() {
  fetch(clinicGeoJSONPath)
    .then((response) => response.json())
    .then((data) => {
      L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
          contClinic++;
          if (feature.properties.name == "default") {
            contDefaultClinic++;
          }
          const marker = L.marker(latlng, { icon: clinicIcon }).bindPopup(
            `<div class="contentRouteClinic">
            <h3>${feature.properties.name}</h3>
            <button class="buttonRouteClinic">Como llegar</button>
            </div>
            `
          );
          marker.addTo(map);

          marker.addEventListener("popupopen", () => {
            if(document.querySelector(".buttonRouteClinic")){
              document.querySelector(".buttonRouteClinic").addEventListener("click", () => {
                flagRoutePharmacy = false;
                flagRouteClinica = true;
                map.removeLayer(marker);
                createRouteToPlace(latlng);
                map.addLayer(marker);
              });
            }
          });
          

          return marker;
        },
      }).addTo(map);

      marker.addEventListener("popupopen", () => {
        document.querySelector(".buttonRouteClinic").addEventListener("click", () => {
          map.removeLayer(marker);
          createRouteToClinic(latlng);
        });
      });

      console.log("Número total de Hospitales: " + contClinic);
      console.log("Número de Hospitales sin nombre: " + contDefaultClinic);
    })
    .catch((error) => {
      console.error("Error al cargar datos del GeoJSON: " + error);
    });
}

function deleteMarkerClinic() {
  fetch(geoJSONPath)
    .then((response) => response.json())
    .then((data) => {
      const filteredData = data.features.filter(
        (feature) => feature.properties.amenity == "pharmacy"
      );

      map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      if (checkPharmacy.checked != false) {
          createMarkerPharmacy();
          if(!flagRoutePharmacy){
            deleteRoute();
          }
      }
    })
    .catch((error) => {
      console.error("Error al cargar datos del GeoJSON: " + error);
    });
}

var marker;

function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;

      startPoint = {
        lat: lat,
        lon: lon,
      };

      if (marker) {
        map.removeLayer(marker);
      }

      marker = L.marker([lat, lon], { icon: clientIcon }).addTo(map);
      var popupContent = `<h3>Ubicacion Actual</h3><p style="font-size:12px;">Lat:${lat} - Lon:${lon}</p>`;
      marker.bindPopup(popupContent);
      marker
        .getPopup()
        .setContent(
          `<div style="width:100%; height:100%; display:flex; flex-direction:colum; aling-items:center; justify-content:center;">${popupContent}</div>`
        );

      marker.addEventListener("mouseover", () => {
        marker.bindPopup(popupContent).openPopup();
      });

      marker.addEventListener("mouseout", () => {
        marker.bindPopup(popupContent).closePopup();
      });

      map.setView([lat, lon], 15);

      if (endPoint) {
        createRouteToPlace(endPoint);
      }
    });
  } else {
    alert("Tu navegador no admite la geolocalización.");
  }
}


let buttonLocation = document.querySelector(".location");
buttonLocation.addEventListener("click", getLocation);

map.on("click", onMapClick);

function onMapClick(e) {
  if (marker) {
    map.removeLayer(marker);
  }

  marker = L.marker(e.latlng, { icon: clientIcon }).addTo(map);
  var popupContent = `<h3>Ubicacion Actual</h3><p style="font-size:12px;">Lat:${e.latlng.lat.toFixed(
    5
  )} - Lon:${e.latlng.lng.toFixed(5)}</p>`;
  marker.bindPopup(popupContent);
  marker
    .getPopup()
    .setContent(
      `<div style="width:100%; height:100%; display:flex; flex-direction:colum; aling-items:center; justify-content:center;">${popupContent}</div>`
    );

  marker.addEventListener("mouseover", () => {
    marker.bindPopup(popupContent).openPopup();
  });

  marker.addEventListener("mouseout", () => {
    marker.bindPopup(popupContent).closePopup();
  });
  console.log(e.latlng.lng + " , " + e.latlng.lat);
}

let srchLocation = document.querySelector(".srchLocation");
let btnCoords = document.querySelector(".searchButtonLocation");

function findLocation(name) {
  fetch(searchGeoJSON)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar el archivo GeoJSON");
      }
      return response.json();
    })
    .then((geojsonData) => {
      geojsonData.features.forEach((feature) => {
        if (feature.properties.amenity == "hospital") {
          if (checkClinic.checked == true) {
            if (quitarTildesYEspacios(feature.properties.name).toLowerCase() == name) {
              let lat = feature.geometry.coordinates[1];
              let lon = feature.geometry.coordinates[0];
              map.setView([lat, lon], 18);
            }
          }
        } else if (feature.properties.amenity == "pharmacy") {
          if (checkPharmacy.checked == true) {
            if (quitarTildesYEspacios(feature.properties.name).toLowerCase() == name) {
              let lat = feature.geometry.coordinates[1];
              let lon = feature.geometry.coordinates[0];
              map.setView([lat, lon], 18);
            }
          }
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

btnCoords.addEventListener("click", () => {
  findLocation(quitarTildesYEspacios(srchLocation.value).toLowerCase());
});

let inputSearchLocation = document.querySelector(".srchLocation");
let contentSearchJSON = document.querySelector(".contentSearchJSON");

contentSearchJSON.addEventListener("mouseleave", () => {
  contentSearchJSON.style.display = "none";
  inputSearchLocation.style.borderRadius = "5px";
});


function fetchData(inputValue) {

  inputValue = quitarTildesYEspacios(inputValue).toLowerCase();

  let splitInputValue = inputValue.split('');
  let placeContent = {
    amenity: [],
    name: [],
    coordsLat: [],
    coordsLon: [],
    id: []
  };
  let count = 0;

  return fetch(searchGeoJSON)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar el archivo GeoJSON");
      }
      return response.json();
    })
    .then((geojsonData) => {
      geojsonData.features.forEach((feature) => {
        if(count < 5){
          let flagSearch = true;
          let name = quitarTildesYEspacios(feature.properties.name).toLowerCase();
          let splitName = name.split('');

          for(let i = 0; i < splitInputValue.length; i++){
            if(splitInputValue[i] != splitName[i]){
              flagSearch = false;
              break;
            }
          }

          if(flagSearch == true){
            placeContent.amenity.push(feature.properties.amenity);
            placeContent.name.push(feature.properties.name);
            placeContent.coordsLat.push(feature.geometry.coordinates[0]);
            placeContent.coordsLon.push(feature.geometry.coordinates[1]);
            placeContent.id.push(feature.id);
            count++;
          }
        }

      });

      return placeContent;
    })
    .catch((error) => {
      console.error(error);
    });
}

// Evento cuando se escribe en el input
inputSearchLocation.addEventListener("input", (event) => {
  contentSearchJSON.style.display = "block";
  inputSearchLocation.style.borderRadius = "initial";
  inputSearchLocation.style.borderTopLeftRadius = "5px"
  inputSearchLocation.style.borderTopRightRadius = "5px"
  
  let inputValue = quitarTildesYEspacios(event.target.value);

  fetchData(inputValue).then((placeContent) => {

    let length = placeContent.amenity.length;

    if(document.querySelector(".itemSearch")){
      document.querySelectorAll(".itemSearch").forEach(element =>{
        element.remove();
      });
    }
    for(let i = 0; i < length; i++){
      let listSearch = document.querySelector(".listSearch");

      let itemSearch = document.createElement("li");
      itemSearch.className = "itemSearch"
      itemSearch.setAttribute("data-search", placeContent.id[i].toString());
    
      let iconSearch = document.createElement("span");
      iconSearch.className = "iconSearch";

      let iconSearchi = document.createElement("i");
      if(placeContent.amenity[i] == "hospital"){
        iconSearch.className = "fa-solid fa-hospital fa-lg";
      }else if(placeContent.amenity[i] == "pharmacy"){
        iconSearch.className = "fa-solid fa-prescription-bottle-medical fa-lg";
      }

      let labelSearch = document.createElement("label");
      labelSearch.className = "labelSearch";
      labelSearch.textContent = placeContent.name[i];

      listSearch.appendChild(itemSearch);
      itemSearch.appendChild(iconSearch);
      itemSearch.appendChild(labelSearch);
      iconSearch.appendChild(iconSearchi);

      let itemsSearch = document.querySelectorAll(".itemSearch");

      itemsSearch.forEach(element =>{
        element.addEventListener("click", () =>{
          for(let i = 0; i < placeContent.id.length; i++){
            if(placeContent.id[i] == element.getAttribute("data-search")){
              map.setView([placeContent.coordsLon[i], placeContent.coordsLat[i]], 18);
              contentSearchJSON.style.display = "none";
              inputSearchLocation.style.borderRadius = "5px";
              inputSearchLocation.value = placeContent.name[i];
            }
          }
        });
      })
    }

  });
});

let checkClinic = document.querySelector(".filterClinic");
let checkPharmacy = document.querySelector(".filterPharmacy");

checkClinic.addEventListener("change", () => {
  if (checkClinic.checked == true) {
    createMarkerClinic();
  }else if(checkClinic.checked == false && checkPharmacy.checked == false){
    deleteRoute();
    deleteMarkerClinic();
  }else {
    deleteMarkerClinic();
  }
});

checkPharmacy.addEventListener("change", () => {
  if (checkPharmacy.checked == true) {
    createMarkerPharmacy();
  }else if(checkClinic.checked == false && checkPharmacy.checked == false){
    deleteRoute();
    deleteMarkerPharmacy();
  } else {
    deleteMarkerPharmacy();
  }
});

let buttonCloseFilter = document.querySelector(".closeFilterChecks");
let contClicksCloseFilter = 0;

buttonCloseFilter.addEventListener("click", () => {
  contClicksCloseFilter++;
  if (contClicksCloseFilter % 2 != 0) {
    document.querySelector(".filterMap").style.right = "-29%";
  } else {
    document.querySelector(".filterMap").style.right = "0%";
  }
});


//Spawn Config Notifications

function setKeyLocalStorage(){
  contentFlagConfigNotification = [flagGetNotification, flagGetNotificationReminder, flagGetNotificationSound, flagGetNotificationSpam];
  localStorage.setItem("notifConfig", JSON.stringify(contentFlagConfigNotification));  
}
let contentConfiguracion = document.querySelector(".contentConfiguracion");
let spawnConfigNotifications = document.querySelector(".spawn");
let btnSpawnConfigNotifications =
  contentConfiguracion.querySelector(".itemConfig");

let contentNavConfig = document.querySelector(".contentNavConfig");
let btnBackSpawnConfigNotifications =
  contentNavConfig.querySelector(".backContent");

btnSpawnConfigNotifications.addEventListener("click", () => {
  spawnConfigNotifications.style.left = "0%";
});

btnBackSpawnConfigNotifications.addEventListener("click", () => {
  spawnConfigNotifications.style.left = "-100%";
});

//Variables

let configGeneral = document.querySelector(".configGeneralNotification");
let btnActiveNotificationPush = configGeneral.querySelector(".itemConfig");

btnActiveNotificationPush.addEventListener("click", () => {
  if (flagGetNotification) {
    flagGetNotification = false;
    flagGetNotificationReminder = false;
    flagGetNotificationSound = false;
    flagGetNotificationSpam = false;
    document.querySelector(".stateToggleNotificaciones").textContent =
      "Desactivado";
      document.querySelectorAll(".itemNotif").forEach(element =>{
        element.querySelector(".checkNotification").checked = false;
      });
    } else {
    flagGetNotification = true;
    flagGetNotificationReminder = true;
    flagGetNotificationSound = true;
    flagGetNotificationSpam = true;
    document.querySelector(".stateToggleNotificaciones").textContent =
      "Activado";
      document.querySelectorAll(".itemNotif").forEach(element =>{
        element.querySelector(".checkNotification").checked = true;
      });
  }
  setKeyLocalStorage();
});

document.querySelector(".reminderNotification").addEventListener("change", () =>{
  if(document.querySelector(".reminderNotification").checked == false && document.querySelector(".soundNotification").checked == false && document.querySelector(".spamNotification").checked == false){
    flagGetNotification = false;
    flagGetNotificationReminder = false;
    flagGetNotificationSound = false;
    flagGetNotificationSpam = false;
    document.querySelector(".stateToggleNotificaciones").textContent =
      "Desactivado";
  }

  if(document.querySelector(".reminderNotification").checked == true){
    flagGetNotificationReminder = true;
    document.querySelector(".stateToggleNotificaciones").textContent =
    "Activado";
  }else{
    flagGetNotificationReminder = false;
    flagGetNotificationSound = false;
    document.querySelector(".soundNotification").checked = false;
  }
  setKeyLocalStorage();
});

document.querySelector(".soundNotification").addEventListener("change", () =>{
  if(document.querySelector(".reminderNotification").checked == false && document.querySelector(".soundNotification").checked == false && document.querySelector(".spamNotification").checked == false){
    flagGetNotification = false;
    flagGetNotificationReminder = false;
    flagGetNotificationSound = false;
    flagGetNotificationSpam = false;
    document.querySelector(".stateToggleNotificaciones").textContent =
      "Desactivado";
  }

  if(document.querySelector(".soundNotification").checked == true){
    flagGetNotificationSound = true;
    flagGetNotificationReminder = true;
    document.querySelector(".reminderNotification").checked = true;
    document.querySelector(".stateToggleNotificaciones").textContent =
    "Activado";
  }else{
    flagGetNotificationSound = false;
  }
  setKeyLocalStorage();
});

document.querySelector(".spamNotification").addEventListener("change", () =>{
  if(document.querySelector(".reminderNotification").checked == false && document.querySelector(".soundNotification").checked == false && document.querySelector(".spamNotification").checked == false){
    flagGetNotification = false;
    flagGetNotificationReminder = false;
    flagGetNotificationSound = false;
    flagGetNotificationSpam = false;
    document.querySelector(".stateToggleNotificaciones").textContent =
      "Desactivado";
  }

  if(document.querySelector(".spamNotification").checked == true){
    flagGetNotificationSpam = true;
    document.querySelector(".stateToggleNotificaciones").textContent =
    "Activado";
  }else{
    flagGetNotificationSpam = false;
  }
  setKeyLocalStorage();
});


//Sound

let allItemConfig = document.querySelectorAll(".itemConfig");

const soundFiles = [
  "../../../sound/sound.mp3",
  "../../../sound/sound2.mp3",
  "../../../sound/sound3.mp3",
  "../../../sound/sound4.mp3"
];

let sounds = Array.from(allItemConfig).filter(element => {
  const soundNumber = element.getAttribute("data-sound");
  return soundNumber === "1" || soundNumber === "2" || soundNumber === "3" || soundNumber === "4";
});

let audioSounds = [null, null, null, null];

sounds.forEach(element => {
  let iconPlaySound = element.querySelector(".iconPlaySound");
  let soundNumber = parseInt(element.getAttribute("data-sound"));

  iconPlaySound.addEventListener("click", () => {
    if (audioSounds[soundNumber - 1] === null) {
      for (let i = 0; i < audioSounds.length; i++) {
        if (audioSounds[i]) {
          const previousIcon = sounds[i].querySelector(".iconPlaySound").getElementsByTagName("i").item(0);
          previousIcon.className = "fa-regular fa-circle-play fa-lg";
          audioSounds[i].pause();
          audioSounds[i].removeEventListener("ended", endedHandler);
          audioSounds[i] = null;
        }
      }
      audioSounds[soundNumber - 1] = new Audio(soundFiles[soundNumber - 1]);
      audioSounds[soundNumber - 1].addEventListener("ended", endedHandler);
      const currentIcon = iconPlaySound.getElementsByTagName("i").item(0);
      currentIcon.className = "fa-regular fa-circle-pause fa-lg";
      audioSounds[soundNumber - 1].play();
    } else {
      const currentIcon = iconPlaySound.getElementsByTagName("i").item(0);
      currentIcon.className = "fa-regular fa-circle-play fa-lg";
      audioSounds[soundNumber - 1].pause();
      audioSounds[soundNumber - 1].removeEventListener("ended", endedHandler);
      audioSounds[soundNumber - 1] = null;
    }
  });

  function endedHandler() {
    const currentIcon = iconPlaySound.getElementsByTagName("i").item(0);
    currentIcon.className = "fa-regular fa-circle-play fa-lg";
  }
});

let checkSounds = document.querySelectorAll(".checkSound");
let flagActiveCheckSounds = true;

checkSounds.forEach(element =>{
  element.addEventListener('change',function(){
    if(element.checked == false){
      element.checked = true;
      let routeSound = soundFiles[parseFloat(element.getAttribute("data-check")) - 1];
      contentReminder.sound[0] = routeSound.toString();
    }else{
      let dataCheck = element.getAttribute("data-check");
      let routeSound = soundFiles[parseFloat(element.getAttribute("data-check")) - 1];
      contentReminder.sound[0] = routeSound.toString();
      checkSounds.forEach(checkSound =>{
        if(checkSound.getAttribute("data-check") != dataCheck){
          checkSound.checked = false;
        }
      });
    }
    
    setReminderLocalStorage();
  });
});

//Sound


//Spawn Config Notifications


//Spawn content pet

let backContentPet = document.querySelector(".backContentPet");

backContentPet.addEventListener("click", () =>{
  document.querySelector(".spawnContentPet").style.top = "100%";
});

let allItem = document.querySelectorAll(".item");
let itemPets = Array.from(allItem).filter(element =>{
  return element.getAttribute("data-pet") === "1" || element.getAttribute("data-pet") === "2" || element.getAttribute("data-pet") === "3"; 
})

let shownMessagesIndices = [];
let shownMessagesIndicesData = [];

itemPets.forEach(element => {
  element.addEventListener("click", () => {
    if (element.getAttribute("data-pet") === "1") {

      let random;
      do {
        random = Math.floor(Math.random() * messageMotivational.length);
      } while (shownMessagesIndices.includes(random));

      shownMessagesIndices.push(random);

      if (shownMessagesIndices.length === messageMotivational.length) {
        shownMessagesIndices = [];
        console.log("restart");
      }
      
      document.querySelector(".contentPetBlock").style.display = "flex";
      document.querySelector(".spawnPopupMessageMotivational").style.display = "flex";
      document.querySelector(".motivationalMessage").textContent = messageMotivational[random];
    } else if (element.getAttribute("data-pet") === "2") {

      document.querySelector(".contentPetBlock").style.display = "flex";
      document.querySelector(".spawnPopupQuest").style.display = "flex";
      document.querySelector(".popup-contentQuest").style.display = "flex";

    } else if (element.getAttribute("data-pet") === "3") {

      let random;
      do {
        random = Math.floor(Math.random() * messageDataRandom.length);
      } while (shownMessagesIndicesData.includes(random));

      shownMessagesIndicesData.push(random);

      if (shownMessagesIndicesData.length === messageDataRandom.length) {
        shownMessagesIndicesData = [];
        console.log("restart");
      }
      
      document.querySelector(".contentPetBlock").style.display = "flex";
      document.querySelector(".spawnPopupMessageMotivational").style.display = "flex";
      document.querySelector(".motivationalMessage").textContent = messageDataRandom[random];
    }
  });
});

let closePopupPet = document.querySelector(".closePopupPet");

closePopupPet.addEventListener("click", () =>{
    document.querySelector(".spawnPopupMessageMotivational").style.display = "none";
    document.querySelector(".contentPetBlock").style.display = "none";
});

let closePopupPetQuest = document.querySelector(".closePopupPetQuest");

closePopupPetQuest.addEventListener("click", () =>{
  document.querySelector(".contentPetBlock").style.display = "none";
  document.querySelector(".spawnPopupQuest").style.display = "none";
  document.querySelector(".popup-contentQuest").style.display = "none";
});

//Spawn content pet


//Spawn config cuenta

document.querySelector(".backContentCuenta").addEventListener("click", ()=>{
  document.querySelector(".spawnConfigCuenta").style.left = "-100%";
});

//Spawn config cuenta

//Spawn almacenar info medica

let btnItemConfigDataMedical = document.querySelector(".configDatosMedicos").querySelectorAll(".itemConfig");

btnItemConfigDataMedical.forEach(element =>{
  element.addEventListener("click", () =>{
    if(element.getAttribute("data-dataMedical") == "1"){

      document.querySelector(".spawnAlmacenar").style.left = "0%";
    
    }else if(element.getAttribute("data-dataMedical") == "2"){
  
      document.querySelector(".spawnConsultar").style.left = "0%";

    }
  })
});

document.querySelector(".backContentAlmacenar").addEventListener("click", ()=>{
  document.querySelector(".spawnAlmacenar").style.left = "-100%";
});

document.querySelector(".backContentConsultar").addEventListener("click", ()=>{
  document.querySelector(".spawnConsultar").style.left = "-100%";
});


//Spawn almacenar info medica

//Spawn password and security

let itemCuenta2 = document.querySelectorAll(".itemCuentaConfig");

itemCuenta2.forEach(element =>{
  element.addEventListener("click", () =>{
    if(element.getAttribute("data-cuenta") == "1"){
      document.querySelector(".spawnPasswordAndSecurity").style.left = "0%";
    }else if(element.getAttribute("data-cuenta") == "2"){
      document.querySelector(".spawnDataPersonal").style.left = "0%";
    }
  });
});

document.querySelector(".backPasswordAndSecurity").addEventListener("click", ()=>{
  document.querySelector(".spawnPasswordAndSecurity").style.left = "-100%";
});

let closeSpawnResetPassword = document.querySelector(".closePopupPassword");

closeSpawnResetPassword.addEventListener("click", () =>{
  document.querySelector(".spawnPopupPassword").style.display = "none";
  document.querySelector(".contentPasswordBlock").style.display = "none";
});

let btnResetPassword = document.querySelectorAll(".itemPasswordReset");

btnResetPassword.forEach(element =>{

  element.addEventListener("click", () =>{
    if(element.getAttribute("data-resetpassword") === "1"){
      document.querySelector(".spawnPopupPassword").style.display = "flex";
      document.querySelector(".contentPasswordBlock").style.display = "flex";
    }
  });

});

let codeResetPassword = document.querySelector(".codeResetPassword");

codeResetPassword.addEventListener("input", () => {
  let valueCode = codeResetPassword.value;
  let lenCode = valueCode.length;
  if (lenCode > 6) {
    codeResetPassword.value = valueCode.slice(0, 6);
  }
});


//Spawn password and security


//Spawn informacion personal

let backDataPersonal = document.querySelector(".backDataPersonal");

backDataPersonal.addEventListener("click", () =>{
  document.querySelector(".spawnDataPersonal").style.left = "-100%";
});

function spawNotificationAlert(){
  document.querySelector(".spawnNotificationAlert").style.top = "0%";

  setTimeout(() => {
    document.querySelector(".spawnNotificationAlert").style.top = "-40%";
  }, 4000);
}

setInterval(()=>{
  if(document.querySelector(".reminderNotification").checked == false && document.querySelector(".soundNotification").checked == false && document.querySelector(".spamNotification").checked == false){
    flagGetNotification = false;
    flagGetNotificationReminder = false;
    flagGetNotificationSound = false;
    flagGetNotificationSpam = false;
    document.querySelector(".stateToggleNotificaciones").textContent =
      "Desactivado";
  }
},100);


//Spawn Encuestas

let itemEncuestas = document.querySelectorAll(".itemEncuestas");

itemEncuestas.forEach(element =>{

  element.addEventListener("click", () =>{
    if(element.getAttribute("data-encuesta") === "1"){
      document.querySelector(".contentBlockEncuestas").style.display = "none";
      document.querySelector(".spawnEncuestas").style.display = "none";    
      window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLScng2HcNn_d0fkuEfVTDQk6KRr3Qd9o_7F-1pD9Kf5sHgwXOQ/viewform?pli=1";
    }else if(element.getAttribute("data-encuesta") === "2"){
      document.querySelector(".contentBlockEncuestas").style.display = "none";
      document.querySelector(".spawnEncuestas").style.display = "none";    
      window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLScyHI0tJTdP9h9E8C6dIspdrI3OpLUHrhK23b-oFHRjZrxNoA/viewform";
    }else if(element.getAttribute("data-encuesta") === "3"){
      document.querySelector(".contentBlockEncuestas").style.display = "none";
      document.querySelector(".spawnEncuestas").style.display = "none";    
      window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLScng2HcNn_d0fkuEfVTDQk6KRr3Qd9o_7F-1pD9Kf5sHgwXOQ/viewform";
    }
  });

});

let closeEncuestas = document.querySelector(".closeContentEncuestas");

closeEncuestas.addEventListener("click", ()=>{
  document.querySelector(".contentBlockEncuestas").style.display = "none";
  document.querySelector(".spawnEncuestas").style.display = "none";
});

//Spawn Encuestas
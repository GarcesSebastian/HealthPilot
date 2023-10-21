window.addEventListener("DOMContentLoaded", () => {
  getLocation();
});

let buttonsFooter = document.querySelectorAll(".buttonFooter");

buttonsFooter.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.getAttribute("data-id") == "1") {
      window.location.href = "../home/index.html";
    } else if (element.getAttribute("data-id") == "2") {
      window.location.href = "../add/index.html";
    } else if (element.getAttribute("data-id") == "3") {
      window.location.href = "../calendary/index.html";
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
      setTimeout(() => {
        circle.querySelector(".fa-circle").classList.add("fa-regular");
        circle.querySelector(".fa-circle").classList.remove("fa-solid");
      }, 1000);
    } else if (element.getAttribute("data-item") == 2) {
      let circle = element.querySelector(".itemCircle");
      circle.querySelector(".fa-circle").classList.remove("fa-regular");
      circle.querySelector(".fa-circle").classList.add("fa-solid");
      setTimeout(() => {
        circle.querySelector(".fa-circle").classList.add("fa-regular");
        circle.querySelector(".fa-circle").classList.remove("fa-solid");
      }, 1000);
    } else if (element.getAttribute("data-item") == 3) {
      let circle = element.querySelector(".itemCircle");
      circle.querySelector(".fa-circle").classList.remove("fa-regular");
      circle.querySelector(".fa-circle").classList.add("fa-solid");
      setTimeout(() => {
        circle.querySelector(".fa-circle").classList.add("fa-regular");
        circle.querySelector(".fa-circle").classList.remove("fa-solid");
      }, 1000);
    } else if (element.getAttribute("data-item") == 4) {
      let circle = element.querySelector(".itemCircle");
      circle.querySelector(".fa-circle").classList.remove("fa-regular");
      circle.querySelector(".fa-circle").classList.add("fa-solid");
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

let buttonsGeneral = document
  .querySelector(".configGeneral")
  .querySelectorAll(".itemConfig");

buttonsGeneral.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.getAttribute("data-general") == "1") {
      let color = prompt("Digite algo");
      let root = document.documentElement;
      root.style.setProperty("--background_1", color);
    }
  });
});

//Spawn Notificaciones

let map = L.map("map").setView([0, 0], 13);

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
  iconUrl: "../../../img/markets/marketPharmacy.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

var clientIcon = L.icon({
  iconUrl: "../../../img/markets/player.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

fetch("../../../GeoJson/export.geojson")
  .then((response) => response.json())
  .then((data) => {
    L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: pharmacyIcon }).bindPopup(
          `<h3>${feature.properties.name}</h3>`
        );
      },
    }).addTo(map);
  });

var marker;

function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;

      if (marker) {
        map.removeLayer(marker);
      }

      marker = L.marker([lat, lon]).addTo(map);
      marker
        .bindPopup("<h3 style='font-size:14px;'>¡Tu ubicación!</h3>")
        .openPopup();

      map.setView([lat, lon], 15);
    });
  } else {
    alert("Tu navegador no admite la geolocalización.");
  }
}

function findLocation(lat, lon) {
  marker = L.marker([lat, lon]).addTo(map);
  marker
    .bindPopup("<h3 style='font-size:14px;'>¡Tu ubicación!</h3>")
    .openPopup();

  map.setView([lat, lon], 15);
}

let buttonLocation = document.querySelector(".location");
buttonLocation.addEventListener("click", getLocation);

map.on("click", onMapClick);

function onMapClick(e) {
  if (marker) {
    map.removeLayer(marker);
  }

  marker = L.marker(e.latlng).addTo(map);
  marker
    .bindPopup("<h3 style='font-size:14px;'>¡Tu ubicación!</h3>")
    .openPopup();
    console.log(e.latlng);
}

let latitudCoord = document.querySelector(".latitud");
let longitudCoords = document.querySelector(".longitud");
let btnCoords = document.querySelector(".searchButtonLocation");

btnCoords.addEventListener("click", () => {
  findLocation(latitudCoord.value, longitudCoords.value);
});

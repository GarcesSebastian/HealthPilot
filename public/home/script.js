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
let buttonNotification = document.querySelector(".notificationSpan");

buttonConfig.addEventListener("click", () =>{
    window.location.href = "#";
});

buttonNotification.addEventListener("click", () =>{
    window.location.href = "#";
});



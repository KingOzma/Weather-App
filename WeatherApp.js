window.addEventListener('load', ()=> {
    let long;
    let lat;
    let tempDescription = document.querySelector(".temp-description");
    let tempDegrees = document.querySelector(".temp-degrees");
    let locTimezone = document.querySelector(".loc-timezone");
    let degreeField = document.querySelector(".temperature");
    const degreeSpan = document.querySelector(".temperature span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/4a23bba4539b45b4d3b8ac662d30967c/${lat},${long}`;

            fetch(api)
            .then(reaction => {
                return reaction.json();
            })
            .then(data => {
                const {temperature, summary, icon} = data.currently;
                //Set DOM Elements from the API
                tempDegrees.textContent = temperature;
                tempDescription.textContent = summary;
                locTimezone.textContent = data.timezone

                //Convert Farhenheit to Celesius
                let celsius = (temperature - 32) * (5 / 9);

                //Place Icon
                placeIcons(icon, document.querySelector('.icon'));

                //Change F to C
                  degreeField.addEventListener('click', () =>{
                      if(degreeSpan.textContent === "F"){
                        degreeSpan.textContent = "C";
                        tempDegrees.textContent = Math.floor(celsius);
                      } else {
                          degreeSpan.textContent = "F";
                          tempDegrees.textContent = temperature;
                      }
                  });
            });
        });
    }
    
    function placeIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
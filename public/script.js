const search = document.querySelector('[data-city-search]');
const searchBox = new google.maps.places.SearchBox(search);

searchBox.addListener('places_changed', () =>{
    const place = searchBox.getPlaces()[0];
    if(place == null) return;

    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();

    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude : latitude,
            longitude : longitude
            }) 
        }).then(res => res.json()).then(data => {
            
            setWeatherData(data, place.formatted_address);
        })

    });

    const icon = new Skycons({color : '#222'});
    const statusElement = document.querySelector('[data-status]');
    const locationElement = document.querySelector('[data-location]');
    const windElement = document.querySelector('[data-wind]');
    const percipitationElement = document.querySelector('[data-precipitation]');
    const temperatureElement = document.querySelector('[data-temperature]');
    setWeatherColor('clear-day');
    icon.set('icon', 'clear-day');
    icon.play();

    function setWeatherData(data, place){
        locationElement.textContent = place;
        statusElement.textContent = data.summary;
        temperatureElement.textContent = data.temperature;
        percipitationElement.textContent = data.precipProbability * 100 + '%';
        windElement.textContent = data.windSpeed;
        icon.set('icon', data.icon)
        setWeatherColor(data.icon);
        icon.play();
    }

    function setWeatherColor(icon){
        switch(icon){
            case 'clear-day':
                document.body.style.background = "linear-gradient(rgb(77, 148, 255),skyblue)";
                break;
            case 'partly-cloudy-day':
                document.body.style.background = "linear-gradient(white,skyblue)";
                break;
            case 'clear-night':
                document.body.style.background = "linear-gradient(rgb(77, 148, 255),navy)";
                break;
            case 'partly-cloudy-night':
                document.body.style.background = "linear-gradient(white,skyblue)";
                break;    
            case 'cloudy':
                document.body.style.background = "linear-gradient(darkgray,white)";
                break;
            case 'rain':
                document.body.style.background = "linear-gradient(darkgray,gray)";
                break; 
            case 'sleet':
                document.body.style.background = "linear-gradient(gray,skyblue)";
                break;
            case 'snow':
                document.body.style.backgroundColor = "white";
                break;
            case 'wind':
                document.body.style.background = "linear-gradient(lightgray,skyblue)";
                break;
            case 'fog':
                document.body.style.backgroundColor = "gray";
                break;  
        }
    }


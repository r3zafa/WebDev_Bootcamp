    // mapboxgl.accessToken = 'pk.eyJ1IjoicjN6YWZhIiwiYSI6ImNrdmpqNzNzeDBoMTkyeG4xc2hvZWZtZjMifQ.pjVINyD4kfGTRG8BfOvOew';
    // const map = new mapboxgl.Map({
    //     container: 'map', // container ID
    //     style: 'mapbox://styles/mapbox/streets-v11', // style URL
    //     center: [-74.5, 40], // starting position [lng, lat]
    //     zoom: 9 // starting zoom
    // });


    mapboxgl.accessToken = mapBoxToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: geoData, // starting position [lng, lat]
        zoom: 8 // starting zoom
    });

    map.addControl(new mapboxgl.NavigationControl());



    // Create a default Marker and add it to the map.
    const marker1 = new mapboxgl.Marker({ color: 'red' })
        .setLngLat(geoData)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
                `<h6>${campTitle}</h6><p>${campLocation}</p>`
            )
        ).addTo(map);
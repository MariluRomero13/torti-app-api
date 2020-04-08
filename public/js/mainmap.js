function initMap(){
    var map = document.getElementById('map')

    

    const options = {
        center:{
            lat: 25.538477,
            lng: -103.326825
        },
        zoom:15
    }

    const mapa = new google.maps.Map(map,options)
}
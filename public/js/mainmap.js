google.maps.event.addDomListener(window,"load",function(){


    var map = document.getElementById('map')

    var inputlat = document.getElementById('lat')
    var inputlng = document.getElementById('lng')
    

    const options = {
        center:{
            lat: 25.538477,
            lng: -103.326825
        },
        zoom:15
    }

    const mapa = new google.maps.Map(map,options)

    marker = new google.maps.Marker({
        map:mapa,
        draggable:true,
        animation:google.maps.Animation.Drop,
        position:new google.maps.LatLng( 25.538477,-103.326825)
    })

    marker.addListener('dragend',function(event){
        inputlat.value = this.getPosition().lat()
        inputlng.value = this.getPosition().lng()
    })

    var autocomplete = document.getElementById('autocomplete');

    const search = new google.maps.places.Autocomplete(autocomplete);
    search.bindTo('bounds',mapa)

    search.addListener('place_changer',function(){

        var place = search.getPlace()

        if(!place.geometry.viewport){
             window.alert("Error al mostrar el lugar");
             return;
        }

        if(place.geometry.viewport){
            mapa.fitBounds(place.geometry.viewport)
        }else{
            mapa.setCenter(place.geometry.location)
            mapa.setZoom(18)
        }
    })

})
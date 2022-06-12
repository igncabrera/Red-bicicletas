var map = L.map('map').setView([-34.6012424, -58.3861497], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

$.ajax({
    dataType: "json",
    url: "api/bikes",
    success: function(result){
        console.log(result)
        result.bikes.forEach(function(bike){
            L.marker(bike.location, {title: bike.id}).addTo(map);
        })
    }
})
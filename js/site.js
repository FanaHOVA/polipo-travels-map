jQuery(function($) {
    // Asynchronously Load the map API
    var script = document.createElement('script');
    script.src = "//maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
    document.body.appendChild(script);
});

function createHtml(city, slug) {
  return ['<div class="info_content">' +
          '<h3>' + city + '</h3>' +
          '<p><a href="http://moltopolipo.com/' + slug + '/">Recap of our trip</a></p>' +        '</div>']
}

function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);

    // Multiple Markers
    var markers = [
        ['Rome, Italy', 41.890251,12.492373],
        ['Los Angeles, California', 34.0522,-118.2437],
        ['Las Vegas, Nevada', 36.1699,-115.1398],
        ['Philadelphia, Pennsylvania', 39.9526, -75.1652],
        ['Milwaukee, Wisconsin', 43.0389, -87.9065],
        ['Chicago, Illinois', 41.8781, -87.6298],
        ['Washington, DC', 38.9072, -77.0369],
        ['San Francisco, California', 37.7749, -122.4194],
        ['Dallas, Texas', 32.7767, -96.7970],
        ['Paris, France', 48.8566, 2.3522],
        ['Amsterdam, Netherlands', 52.3702, 4.8952],
        ['London, United Kingdom', 51.5074, 0.1278],
        ['Florence, Italy', 43.7696, 11.2558],
        ['New York City, NY', 40.7128, -74.0059]
    ];

    // Info Window Content
    var infoWindowContent = [
        createHtml("Rome, Italy", "rome"),
        createHtml("Los Angeles, California", "los-angeles"),
        createHtml("Las Vegas, Nevada", "las-vegas"),
        createHtml("Philadelphia, Pennsylvania", "philadelphia"),
        createHtml("Milwaukee, Wisconsin", "milwaukee"),
        createHtml("Chicago, Illinois", "chicago"),
        createHtml("Washington, DC", "washington"),
        createHtml("San Francisco, California", "san-francisco"),
        createHtml("Dallas, Texas", "dallas"),
        createHtml("Paris, France", "paris"),
        createHtml("Amsterdam, Netherlands", "amsterdam"),
        createHtml("London, United Kingdom", "london"),
        createHtml("Florence, Italy", "florence"),
        createHtml("New York City, NY", "new-york'city")
    ];

    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;

    // Loop through our array of markers & place each one on the map
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });

        // Allow each marker to have an info window
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(3);
        google.maps.event.removeListener(boundsListener);
    });

}

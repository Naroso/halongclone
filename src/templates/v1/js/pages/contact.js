(function ($) {
    $(document).ready(function () {
        $('#form').validate({
            rules: {
                first_name: {
                    required: true
                },
                last_name: {
                    required: true
                },
                phone: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                remail: {
                    required: true,
                    email:true,
                    equalTo: "#email"
                }
            },
            messages: {
                first_name: {
                    required: "Please fill missing information"
                },
                last_name: {
                    required: "Please fill missing information"
                },
                phone: {
                    required: "Please fill missing information"
                },
                email: {
                    required: "Please fill missing information",
                    email: "Please input valid email address"
                },
                remail:{
                    required: "Please fill missing information",
                    email: "Please input your valid email address",
                    equalTo: "This must be the exact same as your email address"
                }
            }
        });

        function initMap() {
            var myCenter=new google.maps.LatLng(21.03024,105.84983);
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                scrollwheel: false,
                center: myCenter
            });
            var contentString = "Blue Dragon Tours";
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            var marker = new google.maps.Marker({
                position: myCenter,
                map: map,
                icon: "../images/map-marker.png",
                title: 'Blue Dragon Tours'
            });
            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
        }
        $(document).ready(function(){
            initMap();
        });

    })
})(jQuery)
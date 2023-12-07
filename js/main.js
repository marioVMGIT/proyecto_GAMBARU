/*Abajo encontrara los diferentes usos de esta hoja JS dentro de las páginas de este 
proyectos*/

(function ($) {
  "use strict";

  // Uso para los Dropdows y los Hover del mouse 1 Uso JavaScript
  $(document).ready(function () {
    function toggleNavbarMethod() {
      if ($(window).width() > 992) {
        $(".navbar .dropdown")
          .on("mouseover", function () {
            $(".dropdown-toggle", this).trigger("click");
          })
          .on("mouseout", function () {
            $(".dropdown-toggle", this).trigger("click").blur();
          });
      } else {
        $(".navbar .dropdown").off("mouseover").off("mouseout");
      }
    }
    toggleNavbarMethod();
    $(window).resize(toggleNavbarMethod);
  });

  // Uso Botón para volver al inicio
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Date and time picker
  $("#date").datetimepicker({
    format: "L",
  });
  $("#time").datetimepicker({
    format: "LT",
  });

  // Carrousel de Servicios
  $(".service-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    loop: true,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
  });

  // Carrousel de Precios
  $(".pricing-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    margin: 30,
    loop: true,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
    },
  });

  // Carrousel de Testimonios
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    margin: 30,
    dots: true,
    loop: true,
    items: 1,
  });
  $(".pat-carousel").owlCarousel({
    autoplay: false,
    smartSpeed: 1500,
    margin: 30,
    dots: true,
    loop: true,
    items: 1,
  });

  // Estilo Modal para el video
  var $videoSrc;
  $(".btn-play").click(function () {
    $videoSrc = $(this).data("src");
  });
  console.log($videoSrc);
  $("#videoModal").on("shown.bs.modal", function (e) {
    $("#video").attr(
      "src",
      $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
    );
  });
  $("#videoModal").on("hide.bs.modal", function (e) {
    $("#video").attr("src", $videoSrc);
  });
})(jQuery);

//Iniciar Mapa API y Crear Ruta
function iniciarMap() {
  var coord = { lat: 10.059308, lng: -84.200822 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: coord,
  });
  var marker = new google.maps.Marker({
    position: coord,
    map: map,
  });

  // Agrega el evento click al botón
  document.getElementById("rutaButton").addEventListener("click", function () {
    generarRuta(map, coord);
  });
}

function generarRuta(map, destination) {
  // Verifica si el navegador soporta la geolocalización
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var origin = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Crea una solicitud de dirección
        var directionsService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer({
          map: map,
        });

        var request = {
          origin: origin,
          destination: destination,
          travelMode: "DRIVING", // Puedes cambiar esto según tus necesidades
        };

        // Calcula la ruta y la muestra en el mapa
        directionsService.route(request, function (result, status) {
          if (status == "OK") {
            directionsRenderer.setDirections(result);
          } else {
            alert("Error al generar la ruta: " + status);
          }
        });
      },
      function () {
        alert("Error al obtener la ubicación actual.");
      }
    );
  } else {
    alert("Tu navegador no soporta la geolocalización.");
  }
}





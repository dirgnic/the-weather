let loc = document.getElementById("location")
let oras = document.getElementById("oras")
let weather = document.getElementById("weather")
let temp = document.getElementById("temp")
let f
let b =  document.getElementById("myBtn")
let lat, long;
let img = document.getElementById("img")
let st;
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);

  } else {
    loc.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  loc.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
  lat = Number(position.coords.latitude)
  long = Number(position.coords.longitude)
  long = long.toString()
  lat = lat.toString()

  console.log(long, lat)

  let request = new XMLHttpRequest()


  let link = 'https://fcc-weather-api.glitch.me//api/current?lon='+ long +'&lat='+ lat


  request.open('GET', link, true)

  request.onload = function() {

   let data =  JSON.parse(this.response)
   oras.innerHTML = data.name + " (" + data.sys.country + ")"
   weather.innerHTML = data.weather[0].main
   st = Number(data.main.temp).toFixed(2)
   temp.innerHTML = st.toString()+"&#176;"+"C"
   img.src =  data.weather[0].icon

   b.addEventListener("click", change);

   function change() {
    if(b.value === "C")
      {
      st = Number(data.main.temp * 9/5 + 32).toFixed(2)
      b.value = "F"
      temp.innerHTML = st.toString() + "&#176;"+"F"
      }
     else
       {
           b.value = "C"
      st = Number(data.main.temp).toFixed(2)
          temp.innerHTML = st.toString() + "&#176;"+"C"
       }
     b.innerHTML = b.value
     console.log(b.value)

   }

   console.log(data)


  }
 request.send()

 }

 getLocation()

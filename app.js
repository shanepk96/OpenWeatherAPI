class Fetch {
  async getCurrent(input) {
    const myKey = "";

    //make request to url

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${myKey}`
    );

    const data = await response.json();

    console.log(data);

    return data;
  }
}

class updateUI {
  constructor(){
    this.cityName = document.querySelector('.cityName')
    this.main_string = document.querySelector('.main_string')
    this.highs = document.querySelector('.hightemp')
    this.lows = document.querySelector('.lowtemp')
    this.videoUpdate = document.querySelector('.videoUpdate')
  }

  updateUI(data){
    this.cityName.innerHTML = data.name;
    this.main_string.innerHTML = data.weather[0].description;
    this.highs.innerHTML = data.main.temp_max;
    this.lows.innerHTML = data.main.temp_min;
    let vidURL = ''
    switch(data.weather[0].main){
      case 'Clear':
        vidURL = 'videos/sunny.mp4'
        break;
      case 'Clouds':
        vidURL = 'videos/clouds.mp4'
        break;
      default:
        vidURL = 'videos/clouds.mp4'
    }

    this.videoUpdate.innerHTML = '';
    this.videoUpdate.innerHTML = `<video autoplay muted loop id="myVideo">
        <source src=${vidURL} type="video/mp4" class="myvideo">
    </video>`;
  }

}


const ft = new Fetch();
const ui = new updateUI();

let UIInputValue = document.querySelector('.city-name')
document.querySelector('.mybtn').addEventListener('click', () => {
  ft.getCurrent(UIInputValue.value).then((myInfo) => ui.updateUI(myInfo));
});

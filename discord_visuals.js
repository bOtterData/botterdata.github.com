// FIREBASEN SETTIÄ
var config = {
      "apiKey": "AIzaSyCRlwc_0YwgbeY12i9Bhe3oIcCHwyJbcm8",
      "authDomain": "botter-bot.firebaseapp.com",
      "databaseURL": "https://botter-bot.firebaseio.com",
      "projectId": "botter-bot",
      "storageBucket": "botter-bot.appspot.com",
      "messagingSenderId": "963103793875"
}

firebase.initializeApp(config);

let data = {};
let font;
var database = firebase.database();
var ref = database.ref('profiles');

var buttons = [];
var bars = {};

let chart = [];

function preload() {
  ref.on('value', gotData, errData);
  font = loadFont("Whitney Medium.ttf");
}

function setup() {
  textFont(font);

  createCanvas(900, 900);
  frameRate(60);
  buttons.push(new Button("Rahat", 20, 10, 70, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Aktiivisuus", 30 + 70*1, 10, 70, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Peak", 40 + 70*2, 10, 70, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Perustulo", 50  + 70*3, 10, 70, 20, [100, 100, 100], [200, 200, 200]));

  buttons.push(new Button("ES", 20, 10 + 30, 70, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Tyhjät ES", 30 + 70*1, 10 + 30, 70, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Annetut", 40 + 70*2, 10 + 30, 70, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Saadut", 50 + 70*3, 10 + 30, 70, 20, [100, 100, 100], [200, 200, 200]));

  buttons.push(new Button("Slot-Pelit", width - 10 - 100*5, 10, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("KTEM-Pelit", width - 10 - 100*4, 10, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Ryhmäpelit", width - 10 - 100*3, 10, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Harpoon-Pelit", width - 10 - 100*2, 10, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Harpoon-Voitot", width - 10 - 100, 10, 90, 20, [100, 100, 100], [200, 200, 200]));

  buttons.push(new Button("Slot-Voitot", width - 10 - 100*5, 10 + 30, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("KTEM-Voitot", width - 10 - 100*4, 10 + 30, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Ryhmäpeli W%", width - 10 - 100*3, 10 + 30, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Harpoon-Osumat", width - 10 - 100*2, 10 + 30, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Harpoon-Hävityt", width - 10 - 100, 10 + 30, 90, 20, [100, 100, 100], [200, 200, 200]));

  buttons.push(new Button("Slot-Häviöt", width - 10 - 100*5, 70, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("KTEM-Häviöt", width - 10 - 100*4, 70, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Ryhmäpelinetto", width - 10 - 100*3, 70, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Harpoon-Acc", width - 10 - 100*2, 70, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Harpoon-Netto", width - 10 - 100, 70, 90, 20, [100, 100, 100], [200, 200, 200]));

  buttons.push(new Button("Slot-Netto", width - 10 - 100*5, 100, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("KTEM-Netto", width - 10 - 100*4, 100, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button(" ", width - 10 - 100*3, 100, 90, 20, [40, 40, 40], [200, 200, 200]));
  buttons.push(new Button(" ", width - 10 - 100*2, 100, 90, 20, [40, 40, 40], [200, 200, 200]));
  buttons.push(new Button(" ", width - 10 - 100, 100, 90, 20, [40, 40, 40], [200, 200, 200]));


  chart.push(new Chart('rahat'));
  buttons[0].activated();

}

function draw() {
  frameRate(60);
  background(45);

  if (frameCount < 120) {
    return;
  }

  fill(40);
  noStroke();
  rect(60 + 70*4, 10, (width - 20 - 100*5) - (60  + 70*4), 30*4 - 10, 3, 3, 3, 3);


  if (frameCount == 100) {
    chart[0].create();
  }

  if (frameCount % 30 == 0) {
    for (let c of chart) {
      c.update();
    }
  }

  for (let i of buttons) {
    i.show();
  }

  var items = Object.keys(bars).map(function(key) {
    return [key, bars[key]];
  });

  for (let i of items) {
    bars[i[0]].show();
  }

}

function Button( _text,  _x,  _y,  _w,  _h,  _c1,  _c2) {
   this.text = _text;
   this.x = _x;
   this.y = _y;
   this.w = _w;
   this.h = _h;
   this.c1 = _c1;
   this.c2 = _c2;

  this.intersects = function( _x,  _y) {
    if (this.x <= _x && this.x + this.w > _x && this.y <= _y && this.y + this.h > _y) {
      return true;
    }
    return false;
  }

  this.show = function() {
    noStroke();
    fill(this.c1);
    rect(this.x, this.y, this.w, this.h, 3, 3, 3, 3);
    fill(this.c2);
    textAlign(CENTER, CENTER);
    textSize(11.5);
    text(this.text, this.x + this.w/2 , this.y + this.h/2 + this.h/5.2);
  }

  this.activated = function() {
    this.c1 = [50, 100, 100];
  }

  this.deactivated = function() {
    this.c1 = _c1;
    this.c2 = _c2;
  }
}

function Bar(_id, _x, _y, _w, _h, _c1, _c2, _name, _value, _yksikkö) {

  this.x = _x;
  this.w_n = 0;
  this.w = _w;
  this.h = _h;

  this.y = _y;
  this.c1 = _c1;
  this.c2 = _c2;
  this.w_n = constrain(this.w_n, 0, this.w);
  this.name = _name;
  this.value = _value;
  this.yksikkö = _yksikkö;


  this.show = function() {

    if (this.w_n != this.w) {
      this.update();

    }
    opacity = map(this.w_n, 0, this.w, 0, 235);
    this.h = constrain(this.h, 0, 100);

    fill(40);
    rect(this.x, this.y, width - 40, this.h, 0, this.h/10, this.h/10, 0);

    fill(this.c1);
    rect(this.x, this.y, Math.floor(this.w_n), this.h, this.h/10, this.h/10, this.h/10, this.h/10);

    fill(this.c2[0], opacity);
    textAlign(LEFT, CENTER);
    textSize(this.h - this.h/3);
    text(this.name + " (" + this.value + " " + yksikkö + ")", this.x + this.h/3, this.y + this.h/2 + this.h/4.5);

  }

  this.update = function() {
    this.w_n += (this.w - this.w_n) / 20;
  }

  this.set = function(_x, _y, _w, _h, _c1, _c2, _value, _name) {
    this.x = _x;
    this.w = _w;
    this.h = _h;
    this.y = _y;
    this.value = _value;
    this.c1 = _c1;
    this.c2 = _c2;
    this.name = _name;
  }

}

function Chart(_address) {

  var address;
  let top_bar = 70*4/2;
  let left_bar = 20;
  let right_bar = 20;
  let bottom_bar = 10;
  let space_between = 8;
  let lenitems = 0;

  if (_address == "rahat") {
    address = 'data[id]["omistus"]["rahat"]';
    yksikkö = "coins";
  }
  if (_address == "aktiivisuus") {
    address = 'data[id]["aika_kannuilla"]';
    yksikkö = "mins";
  }
  if (_address == "peak") {
    address = 'data[id]["omistus"]["maxrahat"]';
    yksikkö = "coins";
  }
  if (_address == "perustulo") {
    address = 'data[id]["omistus"]["perustulo"]';
    yksikkö = "coins / min";
  }
  if (_address == "es") {
    address = 'data[id]["omistus"]["ES"]';
    yksikkö = "ES";
  }
  if (_address == "tyhjät") {
    address = 'data[id]["omistus"]["ES_tyhjät"]';
    yksikkö = "tölkit";
  }
  if (_address == "annetut") {
    address = 'data[id]["omistus"]["annetut_rahat"]';
    yksikkö = "coins";
  }
  if (_address == "saadut") {
    address = 'data[id]["omistus"]["saadut_rahat"]';
    yksikkö = "coins";
  }
  if (_address == "Slot-Pelit") {
    address = 'data[id]["pelit"]["slot_pelit"]';
    yksikkö = "kpl";
  }
  if (_address == "KTEM-Pelit") {
    address = 'data[id]["pelit"]["KTEM_pelit"]';
    yksikkö = "kpl";
  }
  if (_address == "Ryhmäpelit") {
    address = 'data[id]["pelit"]["ryhmäpelit"]';
    yksikkö = "kpl";
  }
  if (_address == "Harpoon-Pelit") {
    address = 'data[id]["pelit"]["harpoon_pelit"]';
    yksikkö = "kpl";
  }
  if (_address == "Harpoon-Accuracy") {
    address = '(data[id]["pelit"]["harpoon_osumat"] * 100 / (data[id]["pelit"]["harpoon_pelit"] + 0.0000000001)).toFixed(2)';
    yksikkö = "%";
  }
  if (_address == "Slot Voitetut") {
    address = 'data[id]["pelit"]["slot_voitot_yhteensä"]';
    yksikkö = "coins";
  }
  if (_address == "KTEM-Voitot") {
    address = 'data[id]["pelit"]["KTEM_voitot"]';
    yksikkö = "coins";
  }
  if (_address == "Ryhmäpeli W%") {
    address = '(data[id]["pelit"]["ryhmäpelivoitot"] * 100 / (data[id]["pelit"]["ryhmäpelit"] + 0.000001)).toFixed(2)';
    yksikkö = "%";
  }
  if (_address == "Harpoon-Osumat") {
    address = 'data[id]["pelit"]["harpoon_osumat"]';
    yksikkö = "kpl";
  }
  if (_address == "Harpoon-Voitot") {
    address = 'data[id]["pelit"]["harpoon_voitetut"]';
    yksikkö = "coins";
  }
  if (_address == "KTEM-Netto") {
    address = 'data[id]["pelit"]["KTEM_voitot"] - data[id]["pelit"]["KTEM_häviöt"]';
    yksikkö = "coins";
  }
  if (_address == "KTEM-Häviöt") {
    address = 'data[id]["pelit"]["KTEM_häviöt"]';
    yksikkö = "coins";
  }
  if (_address == "Ryhmäpelinetto") {
    address = 'data[id]["pelit"]["ryhmäpelivoitot_yht"] - data[id]["pelit"]["ryhmäpelihäviöt_yht"]';
    yksikkö = "coins";
  }
  if (_address == "Harpoon-Netto") {
    address = 'data[id]["pelit"]["harpoon_voitetut"] - data[id]["pelit"]["harpoon_hävityt"]';
    yksikkö = "coins";
  }
  if (_address == "Harpoon-Hävityt") {
    address = 'data[id]["pelit"]["harpoon_hävityt"]';
    yksikkö = "coins";
  }
  if (_address == "Slot Häviöt") {
    address = 'data[id]["pelit"]["slot_häviöt_yhteensä"]';
    yksikkö = "coins";
  }
  if (_address == "Slot-Netto") {
    address = 'data[id]["pelit"]["slot_voitot_yhteensä"] - data[id]["pelit"]["slot_häviöt_yhteensä"]';
    yksikkö = "coins";
  }


  this.create = function() {

    var dict = {};
    let ids = Object.keys(data); // Lista ID

    for (let id of ids) {
      if (id == "date") continue;
      value = eval(address);
       // DICT ID -> Value
      if (floor(value) != 0 ) {
        dict[id] = value;
        bars[id] = new Bar(id, 0, 0, 0, 0, [0, 0, 0], [0, 0, 0], "name", value, yksikkö);
      }
    }

    var items = Object.keys(dict).map(function(key) {
      return [key, dict[key]];
    });

    items.sort(function(first, second) {
      return second[1] - first[1];
    });

    let space = floor((height - top_bar - bottom_bar) / items.length);
    space = constrain(space, 0 , 100);
    let suurin = items[0][1];
    let pienin = items[items.length-1][1];

    let maxi;
    if (Math.abs(pienin) > suurin) {
       maxi = Math.abs(pienin);
    } else {
       maxi = suurin;
    }


    let count = 0;
    lenitems = items.length;
    for (var i of items) {

      _x = left_bar;
      _y = top_bar + count*space;
      _w = map(i[1], 0, maxi, 0, width - left_bar - right_bar);
      _h = space - space_between;
      _c1 = [100, 100, 100];
      _c2 = [200, 200, 200];
      _value = i[1];

      if (_value < 0) {
        _c1 = [255, 60, 60];
      }

      _name = data[i[0]]["nimi"];

      bars[i[0]].set(_x, _y, _w, _h, _c1, _c2, _value, _name);

      count++;
    }

  }

  this.update = function() {

    var dict = {};
    let ids = Object.keys(data); // Lista ID

    for (let id of ids) {
      if (id == "date") continue;
      value = eval(address);
      if (floor(value) != 0) {
        dict[id] = value; // DICT ID -> Value
      }

    }

    var items = Object.keys(dict).map(function(key) {
      return [key, dict[key]];
    });

    if (lenitems != items.length) {
      bars = {};
      this.create();
      return;
    }

    items.sort(function(first, second) {
      return second[1] - first[1];
    });

    let space = floor((height - top_bar - bottom_bar) / items.length);
    space = constrain(space, 0 , 100);
    let suurin = items[0][1];
    let pienin = items[items.length-1][1];

    let maxi;
    if (Math.abs(pienin) > suurin) {
       maxi = Math.abs(pienin);
    } else {
       maxi = suurin;
    }

    let count = 0;
    for (var i of items) {

      _x = left_bar;
      _y = top_bar + count*space;
      _w = map(i[1], 0, maxi, 0, width - left_bar - right_bar);
      _h = space - space_between;
      _c1 = [100, 100, 100];
      _c2 = [200, 200, 200];
      _value = i[1];
      if (_value < 0) {
        _c1 = [255, 60, 60];
      }
      _name = data[i[0]]["nimi"];

      bars[i[0]].set(_x, _y, _w, _h, _c1, _c2, _value, _name);

      count++;
    }
  }


}


function mousePressed() {

  if (buttons[0].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[0].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('rahat'));
    chart[0].create();
  }
  if (buttons[1].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[1].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('aktiivisuus'));
    chart[0].create();
  }
  if (buttons[2].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[2].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('peak'));
    chart[0].create();
  }
  if (buttons[3].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[3].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('perustulo'));
    chart[0].create();
  }
  if (buttons[4].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[4].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('es'));
    chart[0].create();
  }
  if (buttons[5].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[5].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('tyhjät'));
    chart[0].create();
  }
  if (buttons[6].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[6].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('annetut'));
    chart[0].create();
  }
  if (buttons[7].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[7].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('saadut'));
    chart[0].create();
  }

  ////////////////////


  if (buttons[8].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[8].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('Slot-Pelit'));
    chart[0].create();
  }
  if (buttons[9].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[9].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('KTEM-Pelit'));
    chart[0].create();
  }
  if (buttons[10].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[10].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('Ryhmäpelit'));
    chart[0].create();
  }
  if (buttons[11].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[11].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('Harpoon-Pelit'));
    chart[0].create();
  }
  if (buttons[12].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[12].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('Harpoon-Voitot'));
    chart[0].create();
  }
  if (buttons[13].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[13].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('Slot Voitetut'));
    chart[0].create();
  }
  if (buttons[14].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[14].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('KTEM-Voitot'));
    chart[0].create();
  }
  if (buttons[15].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[15].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('Ryhmäpeli W%'));
    chart[0].create();
  }
  if (buttons[16].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[16].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('Harpoon-Osumat'));
    chart[0].create();
  }
  if (buttons[17].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[17].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('Harpoon-Hävityt'));
    chart[0].create();
  }
  if (buttons[18].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[18].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('Slot Häviöt'));
    chart[0].create();
  }
  if (buttons[19].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[19].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('KTEM-Häviöt'));
    chart[0].create();
  }
  if (buttons[20].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[20].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('Ryhmäpelinetto'));
    chart[0].create();
  }
  if (buttons[21].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[21].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('Harpoon-Accuracy'));
    chart[0].create();
  }
  if (buttons[22].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[22].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('Harpoon-Netto'));
    chart[0].create();
  }
  if (buttons[23].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[23].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('Slot-Netto'));
    chart[0].create();
  }
  if (buttons[24].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[24].activated();
    chart = [];
    bars = {};
    chart.push(new Chart('KTEM-Netto'));
    chart[0].create();
  }


}

// FIREBASEN DATAKÄSITTELYFUNKTIOITA
function gotData(_data) {
  data = _data.val();
}

function errData(err) {
  console.log("Error!");
  console.log(err);
}

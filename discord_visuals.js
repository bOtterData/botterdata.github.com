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
  buttons.push(new Button("Aktiivisuus", 30 + 70 * 1, 10, 70, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Peak", 40 + 70 * 2, 10, 70, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Perustulo", 50 + 70 * 3, 10, 70, 20, [100, 100, 100], [200, 200, 200]));

  buttons.push(new Button("ES", 20, 10 + 30, 70, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Tyhjät ES", 30 + 70 * 1, 10 + 30, 70, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Annetut", 40 + 70 * 2, 10 + 30, 70, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Saadut", 50 + 70 * 3, 10 + 30, 70, 20, [100, 100, 100], [200, 200, 200]));

  buttons.push(new Button("Slot-Pelit", width - 10 - 100 * 5, 10, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("KTEM-Pelit", width - 10 - 100 * 4, 10, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Ryhmäpelit", width - 10 - 100 * 3, 10, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Harpoon-Pelit", width - 10 - 100 * 2, 10, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Harpoon-Voitot", width - 10 - 100, 10, 90, 20, [100, 100, 100], [200, 200, 200]));

  buttons.push(new Button("Slot-Voitot", width - 10 - 100 * 5, 10 + 30, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("KTEM-Voitot", width - 10 - 100 * 4, 10 + 30, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Ryhmäpeli W%", width - 10 - 100 * 3, 10 + 30, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Harpoon-Osumat", width - 10 - 100 * 2, 10 + 30, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Harpoon-Hävityt", width - 10 - 100, 10 + 30, 90, 20, [100, 100, 100], [200, 200, 200]));

  buttons.push(new Button("Slot-Häviöt", width - 10 - 100 * 5, 70, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("KTEM-Häviöt", width - 10 - 100 * 4, 70, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Ryhmäpelinetto", width - 10 - 100 * 3, 70, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Harpoon-Acc", width - 10 - 100 * 2, 70, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Harpoon-Netto", width - 10 - 100, 70, 90, 20, [100, 100, 100], [200, 200, 200]));

  buttons.push(new Button("Slot-Netto", width - 10 - 100 * 5, 100, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("KTEM-Netto", width - 10 - 100 * 4, 100, 90, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("SLOT DATA", width - 10 - 100 * 3, 100, 90, 20, [40, 40, 40], [200, 200, 200]));
  buttons.push(new Button("KTEM DATA", width - 10 - 100 * 2, 100, 90, 20, [40, 40, 40], [200, 200, 200]));
  buttons.push(new Button("HARPOON DATA", width - 10 - 100, 100, 90, 20, [40, 40, 40], [200, 200, 200]));

  buttons.push(new Button("Yleinen", 20, 70, 150, 20, [100, 100, 100], [200, 200, 200]));
  buttons.push(new Button("Pelit yleinen", 40 + 70 * 2, 70, 150, 20, [100, 100, 100], [200, 200, 200]));

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
  rect(60 + 70 * 4, 10, (width - 20 - 100 * 5) - (60 + 70 * 4), 30 * 4 - 10, 3, 3, 3, 3);


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

function Button(_text, _x, _y, _w, _h, _c1, _c2) {
  this.text = _text;
  this.x = _x;
  this.y = _y;
  this.w = _w;
  this.h = _h;
  this.c1 = _c1;
  this.c2 = _c2;

  this.intersects = function(_x, _y) {
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
    text(this.text, this.x + this.w / 2, this.y + this.h / 2 + this.h / 5.2);
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
    rect(this.x, this.y, width - 40, this.h, 0, this.h / 10, this.h / 10, 0);

    fill(this.c1);
    rect(this.x, this.y, Math.floor(this.w_n), this.h, this.h / 10, this.h / 10, this.h / 10, this.h / 10);

    fill(this.c2[0], opacity);
    textAlign(LEFT, CENTER);
    textSize(this.h - this.h / 3);
    text(this.name + " (" + this.value + " " + yksikkö + ")", this.x + this.h / 3, this.y + this.h / 2 + this.h / 4.5);

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

function StaticBar(_x, _y, _w, _h, _c1, _c2, _name, _value, _yksikkö) {

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
    rect(this.x, this.y, width - 40, this.h, 0, this.h / 10, this.h / 10, 0);

    if (this.value < 0) {
      _c1 = [255, 60, 60];
    }

    fill(this.c1);
    rect(this.x, this.y, this.w, this.h, this.h / 10, this.h / 10, this.h / 10, this.h / 10);

    fill(this.c2[0], opacity);
    textAlign(LEFT, CENTER);
    textSize(this.h - this.h / 3);
    text(this.name + ": " + this.value + " " + this.yksikkö, this.x + this.h / 3, this.y + this.h / 2 + this.h / 4.5);

  }

  this.update = function() {
    this.w_n += (this.w - this.w_n) / 20;
  }

  this.set = function(_value, _name, _c) {
    this.value = _value;
    this.name = _name;
    this.c1 = _c;
  }

}

function Chart(_address) {

  var address;
  let top_bar = 70 * 4 / 2;
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
      if (floor(value) != 0) {
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
    space = constrain(space, 0, 100);
    let suurin = items[0][1];
    let pienin = items[items.length - 1][1];

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
      _y = top_bar + count * space;
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
    space = constrain(space, 0, 100);
    let suurin = items[0][1];
    let pienin = items[items.length - 1][1];

    let maxi;
    if (Math.abs(pienin) > suurin) {
      maxi = Math.abs(pienin);
    } else {
      maxi = suurin;
    }

    let count = 0;
    for (var i of items) {

      _x = left_bar;
      _y = top_bar + count * space;
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

function OverAll() {

  let top_bar = 70 * 4 / 2;
  let left_bar = 20;
  let right_bar = 20;
  let bottom_bar = 10;
  let space_between = 8;

  let ids = Object.keys(data); // Lista ID

  // Kaikki rahat
  let all_money = 0;
  for (let id of ids) {
    if (id == "date") continue;
    all_money += data[id]["omistus"]["rahat"];
  }

  // Kaikki minuutit
  let minutes = 0;
  for (let id of ids) {
    if (id == "date") continue;
    minutes += data[id]["aika_kannuilla"];
  }
  minutes = minutes + " mins (" + (minutes/60).toFixed(2) + " h)";

  // Kaikki ES
  let es = 0;
  for (let id of ids) {
    if (id == "date") continue;
    es += data[id]["omistus"]["ES"];
  }

  // Juodut ES
  let es_t = 0;
  for (let id of ids) {
    if (id == "date") continue;
    es_t += data[id]["omistus"]["ES_tyhjät"];
  }

  // Harpuunat
  let harpoons = 0;
  for (let id of ids) {
    if (id == "date") continue;
    if (data[id]["omistus"]["kultainen_harppuuna"]) {
      harpoons += 1;
    }
  }

  let items = [
    ["Kaikki rahat", "coins", all_money],
    ["Kaikki minuutit", "", minutes],
    ["Kaikki ES", "kpl", es],
    ["Kaikki Tölkit", "kpl", es_t],
    ["Kultaiset Harpuunat", "kpl", harpoons]
  ];

  let space = floor((height - top_bar - bottom_bar) / items.length);
  space = constrain(space, 0, 70);

  this.create = function() {
    let count = 0;
    for (var i of items) {
      _x = left_bar;
      _y = top_bar + count * space;
      _w = width - left_bar - right_bar
      _h = space - space_between;
      _c1 = [100, 100, 100];
      _c2 = [200, 200, 200];
      _value = i[0];

      if (_value < 0) {
        _c1 = [255, 60, 60];
      }

      _name = i[2];

      bars[count] = new StaticBar(_x, _y, _w, _h, _c1, _c2, _value, _name, i[1]);
      count++;
    }
  }

  this.update = function() {

    let ids = Object.keys(data); // Lista ID

    // Kaikki rahat
    let all_money = 0;
    for (let id of ids) {
      if (id == "date") continue;
      all_money += data[id]["omistus"]["rahat"];
    }

    // Kaikki minuutit
    let minutes = 0;
    for (let id of ids) {
      if (id == "date") continue;
      minutes += data[id]["aika_kannuilla"];
    }
    minutes = minutes + " mins (" + (minutes/60).toFixed(2) + " h)";

    // Kaikki ES
    let es = 0;
    for (let id of ids) {
      if (id == "date") continue;
      es += data[id]["omistus"]["ES"];
    }

    // Juodut ES
    let es_t = 0;
    for (let id of ids) {
      if (id == "date") continue;
      es_t += data[id]["omistus"]["ES_tyhjät"];
    }

    // Harpuunat
    let harpoons = 0;
    for (let id of ids) {
      if (id == "date") continue;
      if (data[id]["omistus"]["kultainen_harppuuna"]) {
        harpoons += 1;
      }
    }

    let items = [
      ["Kaikki rahat", "coins", all_money],
      ["Kaikki minuutit", "", minutes],
      ["Kaikki ES", "kpl", es],
      ["Kaikki Tölkit", "kpl", es_t],
      ["Kultaiset Harpuunat", "kpl", harpoons]
    ];

    let count = 0;
    for (var i of items) {
      _x = left_bar;
      _y = top_bar + count * space;
      _w = width - left_bar - right_bar
      _h = space - space_between;
      _c1 = [100, 100, 100];
      _c2 = [200, 200, 200];
      _value = i[2];

      if (_value < 0) {
        _c1 = [255, 60, 60];
      }

      _name = i[0];

      bars[count].set(_value, _name, _c1);

      count++;
    }
  }



}

function OverAllGames() {

  let top_bar = 70 * 4 / 2;
  let left_bar = 20;
  let right_bar = 20;
  let bottom_bar = 10;
  let space_between = 8;

  let ids = Object.keys(data); // Lista ID

  // Kaikki voitot
  let all_wins = 0;
  for (let id of ids) {
    if (id == "date") continue;
    all_wins += data[id]["pelit"]["slot_voitot_yhteensä"];
    all_wins += data[id]["pelit"]["KTEM_voitot"];
    all_wins += data[id]["pelit"]["harpoon_voitetut"];
  }

  // Kaikki häviöt
  let all_loses = 0;
  for (let id of ids) {
    if (id == "date") continue;
    all_loses += data[id]["pelit"]["slot_häviöt_yhteensä"];
    all_loses += data[id]["pelit"]["KTEM_häviöt"];
    all_loses += data[id]["pelit"]["harpoon_hävityt"];
  }

  let all_wins_h = 0;
  for (let id of ids) {
    if (id == "date") continue;
    all_wins_h += data[id]["pelit"]["harpoon_voitetut"];
  }

  let all_wins_k = 0;
  for (let id of ids) {
    if (id == "date") continue;
    all_wins_k += data[id]["pelit"]["KTEM_voitot"];
  }

  let all_wins_s = 0;
  for (let id of ids) {
    if (id == "date") continue;
    all_wins_s += data[id]["pelit"]["slot_voitot_yhteensä"];
  }

  // Netto
  let netto = all_wins - all_loses;

  let palatutsp = (all_wins * 100 / all_loses).toFixed(2);

  let s_pp = (all_wins_s * 100 / all_wins).toFixed(2);
  let k_pp = (all_wins_k * 100 / all_wins).toFixed(2);
  let h_pp = (all_wins_h * 100 / all_wins).toFixed(2);

  let items = [
    ["Kaikki voitot", "coins", all_wins],
    ["Kaikki häviöt", "coins", all_loses],
    ["Netto", "coins", netto],
    ["Palautus-%", "%", palatutsp],
    ["Voittojen osuus - Slot", "%", s_pp],
    ["Voittojen osuus - KTEM", "%", k_pp],
    ["Voittojen osuus - Harpoon", "%", h_pp],

  ];

  let space = floor((height - top_bar - bottom_bar) / items.length);
  space = constrain(space, 0, 70);

  this.create = function() {
    let count = 0;
    for (var i of items) {
      _x = left_bar;
      _y = top_bar + count * space;
      _w = width - left_bar - right_bar
      _h = space - space_between;
      _c1 = [100, 100, 100];
      _c2 = [200, 200, 200];
      _value = i[0];

      _name = i[2];

      if (i[2] < 0) {
        _c1 = [255, 60, 60];
      }

      bars[count] = new StaticBar(_x, _y, _w, _h, _c1, _c2, _value, _name, i[1]);
      count++;
    }
  }

  this.update = function() {

    let ids = Object.keys(data); // Lista ID

    // Kaikki voitot
    let all_wins = 0;
    for (let id of ids) {
      if (id == "date") continue;
      all_wins += data[id]["pelit"]["slot_voitot_yhteensä"];
      all_wins += data[id]["pelit"]["KTEM_voitot"];
      all_wins += data[id]["pelit"]["harpoon_voitetut"];
    }

    // Kaikki häviöt
    let all_loses = 0;
    for (let id of ids) {
      if (id == "date") continue;
      all_loses += data[id]["pelit"]["slot_häviöt_yhteensä"];
      all_loses += data[id]["pelit"]["KTEM_häviöt"];
      all_loses += data[id]["pelit"]["harpoon_hävityt"];
    }

      let all_wins_h = 0;
      for (let id of ids) {
        if (id == "date") continue;
        all_wins_h += data[id]["pelit"]["harpoon_voitetut"];
      }

      let all_wins_k = 0;
      for (let id of ids) {
        if (id == "date") continue;
        all_wins_k += data[id]["pelit"]["KTEM_voitot"];
      }

      let all_wins_s = 0;
      for (let id of ids) {
        if (id == "date") continue;
        all_wins_s += data[id]["pelit"]["slot_voitot_yhteensä"];
      }

      // Netto
      let netto = all_wins - all_loses;

      let palatutsp = (all_wins * 100 / all_loses).toFixed(2);

      let s_pp = (all_wins_s * 100 / all_wins).toFixed(2);
      let k_pp = (all_wins_k * 100 / all_wins).toFixed(2);
      let h_pp = (all_wins_h * 100 / all_wins).toFixed(2);

      let items = [
        ["Kaikki voitot", "coins", all_wins],
        ["Kaikki häviöt", "coins", all_loses],
        ["Netto", "coins", netto],
        ["Palautus-%", "%", palatutsp],
        ["Voittojen osuus - Slot", "%", s_pp],
        ["Voittojen osuus - KTEM", "%", k_pp],
        ["Voittojen osuus - Harpoon", "%", h_pp],

      ];

      let count = 0;
      for (var i of items) {
        _x = left_bar;
        _y = top_bar + count * space;
        _w = width - left_bar - right_bar
        _h = space - space_between;
        _c1 = [100, 100, 100];
        _c2 = [200, 200, 200];
        _value = i[2];

        if (_value < 0) {
          _c1 = [255, 60, 60];
        }

        _name = i[0];

        bars[count].set(_value, _name, _c1);

        count++;
      }
    }



}

function SlotChart() {

  let top_bar = 70 * 4 / 2;
  let left_bar = 20;
  let right_bar = 20;
  let bottom_bar = 10;
  let space_between = 8;

  let ids = Object.keys(data); // Lista ID

  // Kaikki voitot
  let all_wins1 = 0;
  for (let id of ids) {
    if (id == "date") continue;
    all_wins1 += data[id]["pelit"]["slot_voitot_yhteensä"];
  }

  // Kaikki häviöt
  let all_loses1 = 0;
  for (let id of ids) {
    if (id == "date") continue;
    all_loses1 += data[id]["pelit"]["slot_häviöt_yhteensä"];
  }

  // Kaikki pelit
  let all_games1 = 0;
  for (let id of ids) {
    if (id == "date") continue;
    all_games1 += data[id]["pelit"]["slot_pelit"];
  }

  // Netto
  let netto1 = all_wins1 - all_loses1;

  let palautus = (all_wins1 / all_loses1) * 100;

  let poggers3 = 0;
  for (let id of ids) {
    if (id == "date") continue;
    poggers3 += data[id]["pelit"]["slot_yksittäisvoitot"]["poggers3"];
  }

  let poggers2 = 0;
  for (let id of ids) {
    if (id == "date") continue;
    poggers2 += data[id]["pelit"]["slot_yksittäisvoitot"]["poggers2"];
  }

  let poggers1 = 0;
  for (let id of ids) {
    if (id == "date") continue;
    poggers1 += data[id]["pelit"]["slot_yksittäisvoitot"]["poggers1"];
  }

  let sasu = 0;
  for (let id of ids) {
    if (id == "date") continue;
    sasu += data[id]["pelit"]["slot_yksittäisvoitot"]["sasu"];
  }

  let karvis = 0;
  for (let id of ids) {
    if (id == "date") continue;
    karvis += data[id]["pelit"]["slot_yksittäisvoitot"]["karvis"];
  }

  let alfa = 0;
  for (let id of ids) {
    if (id == "date") continue;
    alfa += data[id]["pelit"]["slot_yksittäisvoitot"]["alfa"];
  }

  let meloni = 0;
  for (let id of ids) {
    if (id == "date") continue;
    meloni += data[id]["pelit"]["slot_yksittäisvoitot"]["meloni"];
  }


  let items = [
    ["Kaikki pelit", "kpl", all_games1],
    ["Kaikki voitot", "coins", all_wins1],
    ["Kaikki häviöt", "coins", all_loses1],
    ["Netto", "coins", netto1],
    ["Palautus-%", "%", palautus.toFixed(2)],
    ["3 x Poggers", "kpl", poggers3],
    ["2 x Poggers", "kpl", poggers2],
    ["1 x Poggers", "kpl", poggers1],
    ["3 x Sasu", "kpl", sasu],
    ["3 x Karvis", "kpl", karvis],
    ["3 x Alfa", "kpl", alfa],
    ["3 x Meloni", "kpl", meloni]
  ];

  let space = floor((height - top_bar - bottom_bar) / items.length);
  space = constrain(space, 0, 70);

  this.create = function() {
    let count = 0;
    for (var i of items) {
      _x = left_bar;
      _y = top_bar + count * space;
      _w = width - left_bar - right_bar
      _h = space - space_between;
      _c1 = [100, 100, 100];
      _c2 = [200, 200, 200];
      _value = i[0];

      _name = i[2];

      if (i[2] < 0) {
        _c1 = [255, 60, 60];
      }

      bars[count] = new StaticBar(_x, _y, _w, _h, _c1, _c2, _value, _name, i[1]);
      count++;
    }
  }

  this.update = function() {

    let ids = Object.keys(data); // Lista ID

    let all_wins1 = 0;
    for (let id of ids) {
      if (id == "date") continue;
      all_wins1 += data[id]["pelit"]["slot_voitot_yhteensä"];
    }

    // Kaikki häviöt
    let all_loses1 = 0;
    for (let id of ids) {
      if (id == "date") continue;
      all_loses1 += data[id]["pelit"]["slot_häviöt_yhteensä"];
    }

    // Kaikki pelit
    let all_games1 = 0;
    for (let id of ids) {
      if (id == "date") continue;
      all_games1 += data[id]["pelit"]["slot_pelit"];
    }

    // Netto
    let netto1 = all_wins1 - all_loses1;

    let palautus = (all_wins1 / all_loses1) * 100;

    let poggers3 = 0;
    for (let id of ids) {
      if (id == "date") continue;
      poggers3 += data[id]["pelit"]["slot_yksittäisvoitot"]["poggers3"];
    }

    let poggers2 = 0;
    for (let id of ids) {
      if (id == "date") continue;
      poggers2 += data[id]["pelit"]["slot_yksittäisvoitot"]["poggers2"];
    }

    let poggers1 = 0;
    for (let id of ids) {
      if (id == "date") continue;
      poggers1 += data[id]["pelit"]["slot_yksittäisvoitot"]["poggers1"];
    }

    let sasu = 0;
    for (let id of ids) {
      if (id == "date") continue;
      sasu += data[id]["pelit"]["slot_yksittäisvoitot"]["sasu"];
    }

    let karvis = 0;
    for (let id of ids) {
      if (id == "date") continue;
      karvis += data[id]["pelit"]["slot_yksittäisvoitot"]["karvis"];
    }

    let alfa = 0;
    for (let id of ids) {
      if (id == "date") continue;
      alfa += data[id]["pelit"]["slot_yksittäisvoitot"]["alfa"];
    }

    let meloni = 0;
    for (let id of ids) {
      if (id == "date") continue;
      meloni += data[id]["pelit"]["slot_yksittäisvoitot"]["meloni"];
    }

    let items = [
      ["Kaikki pelit", "kpl", all_games1],
      ["Kaikki voitot", "coins", all_wins1],
      ["Kaikki häviöt", "coins", all_loses1],
      ["Netto", "coins", netto1],
      ["Palautus-%", "%", palautus.toFixed(2)],
      ["3 x Poggers", "kpl", poggers3],
      ["2 x Poggers", "kpl", poggers2],
      ["1 x Poggers", "kpl", poggers1],
      ["3 x Sasu", "kpl", sasu],
      ["3 x Karvis", "kpl", karvis],
      ["3 x Alfa", "kpl", alfa],
      ["3 x Meloni", "kpl", meloni]
    ];

    let count = 0;
    for (var i of items) {
      _x = left_bar;
      _y = top_bar + count * space;
      _w = width - left_bar - right_bar
      _h = space - space_between;
      _c1 = [100, 100, 100];
      _c2 = [200, 200, 200];
      _value = i[2];

      if (_value < 0) {
        _c1 = [255, 60, 60];
      }

      _name = i[0];

      bars[count].set(_value, _name, _c1);

      count++;
    }
  }



}

function KTEMChart() {

  let top_bar = 70 * 4 / 2;
  let left_bar = 20;
  let right_bar = 20;
  let bottom_bar = 10;
  let space_between = 8;

  let ids = Object.keys(data); // Lista ID

  // Kaikki voitot
  let all_wins2 = 0;
  for (let id of ids) {
    if (id == "date") continue;
    all_wins2 += data[id]["pelit"]["KTEM_voitot"];
  }

  // Kaikki häviöt
  let all_loses2 = 0;
  for (let id of ids) {
    if (id == "date") continue;
    all_loses2 += data[id]["pelit"]["KTEM_häviöt"];
  }

  // Kaikki pelit
  let all_games2 = 0;
  for (let id of ids) {
    if (id == "date") continue;
    all_games2 += data[id]["pelit"]["KTEM_voitetut_pelit"];
  }

  // Netto
  let netto2 = all_wins2 - all_loses2;

  let palautus2 = (all_wins2 / all_loses2) * 100;

  let keskimpanos2 = (all_loses2 + all_wins2/2) / all_games2;


  let items = [
    ["Kaikki pelit", "kpl", all_games2],
    ["Kaikki voitot", "coins", all_wins2],
    ["Kaikki häviöt", "coins", all_loses2],
    ["Netto", "coins", netto2],
    ["Palautus-%", "%", palautus2.toFixed(2)],
    ["Keskimääräinen panos", "coins", keskimpanos2.toFixed(0)]
  ];

  let space = floor((height - top_bar - bottom_bar) / items.length);
  space = constrain(space, 0, 70);

  this.create = function() {
    let count = 0;
    for (var i of items) {
      _x = left_bar;
      _y = top_bar + count * space;
      _w = width - left_bar - right_bar
      _h = space - space_between;
      _c1 = [100, 100, 100];
      _c2 = [200, 200, 200];
      _value = i[0];

      _name = i[2];

      if (i[2] < 0) {
        _c1 = [255, 60, 60];
      }

      bars[count] = new StaticBar(_x, _y, _w, _h, _c1, _c2, _value, _name, i[1]);
      count++;
    }
  }

  this.update = function() {

    // Kaikki voitot
    let all_wins2 = 0;
    for (let id of ids) {
      if (id == "date") continue;
      all_wins2 += data[id]["pelit"]["KTEM_voitot"];
    }

    // Kaikki häviöt
    let all_loses2 = 0;
    for (let id of ids) {
      if (id == "date") continue;
      all_loses2 += data[id]["pelit"]["KTEM_häviöt"];
    }

    // Kaikki pelit
    let all_games2 = 0;
    for (let id of ids) {
      if (id == "date") continue;
      all_games2 += data[id]["pelit"]["KTEM_voitetut_pelit"];
    }

    // Netto
    let netto2 = all_wins2 - all_loses2;

    let palautus2 = (all_wins2 / all_loses2) * 100;

    let keskimpanos2 = (all_loses2 + all_wins2/2) / all_games2;


    let items = [
      ["Kaikki pelit", "kpl", all_games2],
      ["Kaikki voitot", "coins", all_wins2],
      ["Kaikki häviöt", "coins", all_loses2],
      ["Netto", "coins", netto2],
      ["Palautus-%", "%", palautus2.toFixed(2)],
      ["Keskimääräinen panos", "coins", keskimpanos2.toFixed(0)]
    ];

    let count = 0;
    for (var i of items) {
      _x = left_bar;
      _y = top_bar + count * space;
      _w = width - left_bar - right_bar
      _h = space - space_between;
      _c1 = [100, 100, 100];
      _c2 = [200, 200, 200];
      _value = i[2];

      if (_value < 0) {
        _c1 = [255, 60, 60];
      }

      _name = i[0];

      bars[count].set(_value, _name, _c1);

      count++;
    }
  }



}

function HarpoonChart() {

  let top_bar = 70 * 4 / 2;
  let left_bar = 20;
  let right_bar = 20;
  let bottom_bar = 10;
  let space_between = 8;

  let ids = Object.keys(data); // Lista ID

  // Kaikki voitot
  let all_wins3 = 0;
  for (let id of ids) {
    if (id == "date") continue;
    all_wins3 += data[id]["pelit"]["harpoon_voitetut"];
  }

  // Kaikki häviöt
  let all_loses3 = 0;
  for (let id of ids) {
    if (id == "date") continue;
    all_loses3 += data[id]["pelit"]["harpoon_hävityt"];
  }

  // Kaikki pelit
  let all_games3 = 0;
  for (let id of ids) {
    if (id == "date") continue;
    all_games3 += data[id]["pelit"]["harpoon_pelit"];
  }

  // Kaikki pelit
  let all_hits = 0;
  for (let id of ids) {
    if (id == "date") continue;
    all_hits += data[id]["pelit"]["harpoon_osumat"];
  }

  // Netto
  let netto3 = all_wins3 - all_loses3;

  let palautus3 = (all_wins3 / all_loses3) * 100;

  let keskimpanos3 = all_loses3 / all_games3;

  let k_accuracy = (all_hits * 100 / all_games3).toFixed(2);

  // Kaikki pelit
  let hait = 0;
  for (let id of ids) {
    if (id == "date") continue;
    hait += data[id]["pelit"]["harpoon_yksittäiset"]["harpoon_hai"];
  }

  // Kaikki pelit
  let pallot = 0;
  for (let id of ids) {
    if (id == "date") continue;
    pallot += data[id]["pelit"]["harpoon_yksittäiset"]["harpoon_pallo"];
  }

  // Kaikki pelit
  let valaat = 0;
  for (let id of ids) {
    if (id == "date") continue;
    valaat += data[id]["pelit"]["harpoon_yksittäiset"]["harpoon_valas"];
  }

  let hai_p = (hait * 100 / all_hits).toFixed(2);
  let pallo_p = (pallot * 100 / all_hits).toFixed(2);
  let valas_p = (valaat * 100 / all_hits).toFixed(2);

  let items = [
    ["Kaikki pelit", "kpl", all_games3],
    ["Osumat", "kpl", all_hits],
    ["Kaikki voitot", "coins", all_wins3],
    ["Kaikki häviöt", "coins", all_loses3],
    ["Netto", "coins", netto3],
    ["Palautus-%", "%", palautus3.toFixed(2)],
    ["Keskimääräinen Acc", "%", k_accuracy],
    ["Hait", "kpl", hait.toFixed(0)],
    ["Pallot", "kpl", pallot.toFixed(0)],
    ["Valaat", "kpl", valaat.toFixed(0)],
    ["Hait-% osumista", "%", hai_p],
    ["Pallot-% osumista", "%", pallo_p],
    ["Valaat-% osumista", "%", valas_p]
  ];

  let space = floor((height - top_bar - bottom_bar) / items.length);
  space = constrain(space, 0, 70);

  this.create = function() {
    let count = 0;
    for (var i of items) {
      _x = left_bar;
      _y = top_bar + count * space;
      _w = width - left_bar - right_bar
      _h = space - space_between;
      _c1 = [100, 100, 100];
      _c2 = [200, 200, 200];
      _value = i[0];

      _name = i[2];

      if (i[2] < 0) {
        _c1 = [255, 60, 60];
      }

      bars[count] = new StaticBar(_x, _y, _w, _h, _c1, _c2, _value, _name, i[1]);
      count++;
    }
  }

  this.update = function() {

    // Kaikki voitot
    let all_wins3 = 0;
    for (let id of ids) {
      if (id == "date") continue;
      all_wins3 += data[id]["pelit"]["harpoon_voitetut"];
    }

    // Kaikki häviöt
    let all_loses3 = 0;
    for (let id of ids) {
      if (id == "date") continue;
      all_loses3 += data[id]["pelit"]["harpoon_hävityt"];
    }

    // Kaikki pelit
    let all_games3 = 0;
    for (let id of ids) {
      if (id == "date") continue;
      all_games3 += data[id]["pelit"]["harpoon_pelit"];
    }

    // Kaikki pelit
    let all_hits = 0;
    for (let id of ids) {
      if (id == "date") continue;
      all_hits += data[id]["pelit"]["harpoon_osumat"];
    }

    // Netto
    let netto3 = all_wins3 - all_loses3;

    let palautus3 = (all_wins3 / all_loses3) * 100;

    let keskimpanos3 = all_loses3 / all_games3;

    let k_accuracy = (all_hits * 100 / all_games3).toFixed(2);

    // Kaikki pelit
    let hait = 0;
    for (let id of ids) {
      if (id == "date") continue;
      hait += data[id]["pelit"]["harpoon_yksittäiset"]["harpoon_hai"];
    }

    // Kaikki pelit
    let pallot = 0;
    for (let id of ids) {
      if (id == "date") continue;
      pallot += data[id]["pelit"]["harpoon_yksittäiset"]["harpoon_pallo"];
    }

    // Kaikki pelit
    let valaat = 0;
    for (let id of ids) {
      if (id == "date") continue;
      valaat += data[id]["pelit"]["harpoon_yksittäiset"]["harpoon_valas"];
    }

    let hai_p = (hait * 100 / all_hits).toFixed(2);
    let pallo_p = (pallot * 100 / all_hits).toFixed(2);
    let valas_p = (valaat * 100 / all_hits).toFixed(2);

    let items = [
      ["Kaikki pelit", "kpl", all_games3],
      ["Osumat", "kpl", all_hits],
      ["Kaikki voitot", "coins", all_wins3],
      ["Kaikki häviöt", "coins", all_loses3],
      ["Netto", "coins", netto3],
      ["Palautus-%", "%", palautus3.toFixed(2)],
      ["Keskimääräinen Acc", "%", k_accuracy],
      ["Hait", "kpl", hait.toFixed(0)],
      ["Pallot", "kpl", pallot.toFixed(0)],
      ["Valaat", "kpl", valaat.toFixed(0)],
      ["Hait-% osumista", "%", hai_p],
      ["Pallot-% osumista", "%", pallo_p],
      ["Valaat-% osumista", "%", valas_p]
    ];

    let count = 0;
    for (var i of items) {
      _x = left_bar;
      _y = top_bar + count * space;
      _w = width - left_bar - right_bar
      _h = space - space_between;
      _c1 = [100, 100, 100];
      _c2 = [200, 200, 200];
      _value = i[2];

      if (_value < 0) {
        _c1 = [255, 60, 60];
      }

      _name = i[0];

      bars[count].set(_value, _name, _c1);

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

  if (buttons[28].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[28].activated();
    chart = [];
    bars = {};
    chart.push(new OverAll());
    chart[0].create();
  }
  if (buttons[29].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[29].activated();
    chart = [];
    bars = {};
    chart.push(new OverAllGames());
    chart[0].create();
  }

  if (buttons[25].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[25].activated();
    chart = [];
    bars = {};
    chart.push(new SlotChart());
    chart[0].create();
  }

  if (buttons[26].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[26].activated();
    chart = [];
    bars = {};
    chart.push(new KTEMChart());
    chart[0].create();
  }

  if (buttons[27].intersects(mouseX, mouseY)) {
    for (let b of buttons) {
      b.deactivated();
    }
    buttons[27].activated();
    chart = [];
    bars = {};
    chart.push(new HarpoonChart());
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

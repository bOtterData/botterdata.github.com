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
var ref = database.ref('users');

let buttons1 = [];
let buttons = [];
let game_btns = [];
var bars = {};
var yleiset;
var peliyleiset;

let chart = [];

function preload() {
  ref.on('value', gotData, errData);
  font = loadFont("Whitney Medium.ttf");
}

function setup() {
  textFont(font);

  var canvas = createCanvas(1100, 900);
  canvas.parent('sketch-holder');
  frameRate(25);


  var labels = ["Rahat", "Aktiivisuus", "Peak", "Perustulo", "ES", "Tyhjät ES", "Varastetut", "Muut var."];

  var count = 0;
  var x = 20;
  var y = 10;

  for (let s = 0; s < 2; s++){
    buttons1.push([]);
    for (let c = 0; c < 4; c++) {
      buttons1[s].push(new Button(labels[count], x + 80*s, y + 30*c, 70, 20, [100, 100, 100], [200, 200, 200]));
      count++;
    }
  }

  var labels = [
    ["Slot-Pelit", "KTEM-Pelit", "Ryhmäpelit", "Harpoon-Pelit", "Harpoon-Voitot", "BJ-Pelit"],
    ["Slot-Voitot", "KTEM-Voitot", "Ryhmäpelit W%", "Harpoon-Osumat", "Harpoon-Hävityt", "BJ-Voitot"],
    ["Slot-Häviöt", "KTEM-Häviöt", "Ryhmäpelinetto", "Harpoon-Acc", "Harpoon-Netto", "BJ-Häviöt"],
    ["Slot-Netto", "KTEM-Netto", " ", " ", " ", "BJ-Netto"],
  ];

  var x1 = 130 + 20;

  var count = 0;
  var x = width - 100*6 - 10 - x1;
  var y = 10;

  for (let s = 0; s < 6; s++){
    buttons.push([]);
    for (let c = 0; c < 4; c++) {
      buttons[s].push(new Button(labels[c][s], x + 100*s, y + 30*c, 90, 20, [100, 100, 100], [200, 200, 200]));
      count++;
    }
  }

  var labels = [
    ["SLOT DATA"],
    ["KTEM DATA"],
    ["HARPOON DATA"],
    ["BJ DATA"],
  ];

  var count = 0;
  for (let s = 0; s < 1; s++){
    game_btns.push([]);
    for (let c = 0; c < 4; c++) {
      game_btns[s].push(new Button(labels[c][s], x + + 100*6 + 130*s, y + 30*c, 140, 20, [40, 40, 40], [200, 200, 200]));
      count++;
    }
  }

  var x = 20;
  var mutka = (width - 100*6 - 10 - x1) + 100*6 + 130*0;
  yleiset = new Button("Yleiset", x + 80*2, 10, (x + 80*5) - (x + 80*3) - 10, 50, [40, 40, 40], [200, 200, 200]);
  peliyleiset = new Button("Pelit yleiset", x + 80*2, 70, (x + 80*5) - (x + 80*3) -10, 50, [40, 40, 40], [200, 200, 200]);


  chart.push(new Chart('rahat'));
  buttons[0][0].activated();

}

function draw() {
  background(45);

  if (frameCount < 120) {
    return;
  }

  if (frameCount == 100) {
    chart[0].create();
  }

  if (frameCount % 48 == 0) {
    for (let c of chart) {
      c.update();
    }
  }


  for (let r = 0; r < 2; r++){
    for (let c = 0; c < 4; c++) {
      buttons1[r][c].show();
    }
  }

  for (let r = 0; r < 6; r++){
    for (let c = 0; c < 4; c++) {
      buttons[r][c].show();
    }
  }

  for (let s = 0; s < 1; s++){
    game_btns.push([]);
    for (let c = 0; c < 4; c++) {
      game_btns[s][c].show();

    }
  }
  yleiset.show();
  peliyleiset.show();


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
    let txts = map(this.h, 20, 50, 11.5, 18);
    let lift = map(this.h, 20, 50, 5, 8);
    textSize(txts);
    text(this.text, this.x + this.w / 2, this.y + this.h / 2 + this.h / lift );
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
    address = 'data[id]["inventory"]["money"]';
    yksikkö = "coins";
  }
  if (_address == "aktiivisuus") {
    address = 'data[id]["basic_statistics"]["minutes_on_channel"]';
    yksikkö = "mins";
  }
  if (_address == "peak") {
    address = 'data[id]["basic_statistics"]["peak_money"]';
    yksikkö = "coins";
  }
  if (_address == "perustulo") {
    address = 'data[id]["inventory"]["income"]';
    yksikkö = "coins / min";
  }
  if (_address == "es") {
    address = 'data[id]["inventory"]["items"]["ES"]';
    yksikkö = "ES";
  }
  if (_address == "tyhjät") {
    address = 'data[id]["inventory"]["items"]["ES_can"]';
    yksikkö = "tölkit";
  }
  if (_address == "money_stolen") {
    address = 'data[id]["basic_statistics"]["money_stolen"]';
    yksikkö = "coins";
  }
  if (_address == "money_stolen_from_you") {
    address = 'data[id]["basic_statistics"]["money_stolen_from_you"]';
    yksikkö = "coins";
  }
  if (_address == "Slot-Pelit") {
    address = 'data[id]["game_slot"]["games"]';
    yksikkö = "kpl";
  }
  if (_address == "KTEM-Pelit") {
    address = 'data[id]["game_KTEM"]["games"]';
    yksikkö = "kpl";
  }
  if (_address == "Ryhmäpelit") {
    address = 'data[id]["game_ryhmäpeli"]["games"]';
    yksikkö = "kpl";
  }
  if (_address == "Harpoon-Pelit") {
    address = 'data[id]["game_harpoon"]["games"]';
    yksikkö = "kpl";
  }
  if (_address == "Harpoon-Accuracy") {
    address = '(data[id]["game_harpoon"]["hits"] * 100 / (data[id]["game_harpoon"]["games"] + 0.0000000001)).toFixed(2)';
    yksikkö = "%";
  }
  if (_address == "Slot Voitetut") {
    address = 'data[id]["game_slot"]["money_won"]';
    yksikkö = "coins";
  }
  if (_address == "KTEM-Voitot") {
    address = 'data[id]["game_KTEM"]["money_won"]';
    yksikkö = "coins";
  }
  if (_address == "Ryhmäpeli W%") {
    address = '(data[id]["game_ryhmäpeli"]["games_won"] * 100 / (data[id]["game_ryhmäpeli"]["games"] + 0.000001)).toFixed(2)';
    yksikkö = "%";
  }
  if (_address == "Harpoon-Osumat") {
    address = 'data[id]["game_harpoon"]["hits"]';
    yksikkö = "kpl";
  }
  if (_address == "Harpoon-Voitot") {
    address = 'data[id]["game_harpoon"]["games_won"]';
    yksikkö = "coins";
  }
  if (_address == "KTEM-Netto") {
    address = 'data[id]["game_KTEM"]["money_won"] - data[id]["game_KTEM"]["money_lost"]';
    yksikkö = "coins";
  }
  if (_address == "KTEM-Häviöt") {
    address = 'data[id]["game_KTEM"]["money_lost"]';
    yksikkö = "coins";
  }
  if (_address == "Ryhmäpelinetto") {
    address = 'data[id]["game_ryhmäpeli"]["money_won"] - data[id]["game_ryhmäpeli"]["money_lost"]';
    yksikkö = "coins";
  }
  if (_address == "Harpoon-Netto") {
    address = 'data[id]["game_harpoon"]["money_won"] - data[id]["game_harpoon"]["money_lost"]';
    yksikkö = "coins";
  }
  if (_address == "Harpoon-Hävityt") {
    address = 'data[id]["game_harpoon"]["money_lost"]';
    yksikkö = "coins";
  }
  if (_address == "Slot Häviöt") {
    address = 'data[id]["game_slot"]["money_lost"]';
    yksikkö = "coins";
  }
  if (_address == "Slot-Netto") {
    address = 'data[id]["game_slot"]["money_won"] - data[id]["game_slot"]["money_lost"]';
    yksikkö = "coins";
  }
  if (_address == "BJ-Pelit") {
    address = 'data[id]["game_blackjack"]["games"]';
    yksikkö = "kpl";
  }
  if (_address == "BJ-Voitot") {
    address = 'data[id]["game_blackjack"]["money_won"]';
    yksikkö = "coins";
  }
  if (_address == "BJ-Häviöt") {
    address = 'data[id]["game_blackjack"]["money_lost"]';
    yksikkö = "coins";
  }
  if (_address == "BJ-Netto") {
    address = 'data[id]["game_blackjack"]["money_won"] - data[id]["game_blackjack"]["money_lost"]';
    yksikkö = "coins";
  }

  this.create = function() {

    var dict = {};
    let ids = Object.keys(data); // Lista ID

    for (let id of ids) {
      if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
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

      _name = data[i[0]]["name"];

      bars[i[0]].set(_x, _y, _w, _h, _c1, _c2, _value, _name);

      count++;
    }

  }

  this.update = function() {

    var dict = {};
    let ids = Object.keys(data); // Lista ID

    for (let id of ids) {
      if (id == "date") continue;
      if (id == "deck") continue;
      if (id == "dj") continue;
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
      _name = data[i[0]]["name"];

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
    if (id == "deck") continue;
    if (id == "dj") continue;
    all_money += data[id]["inventory"]["money"];
  }

  // Kaikki minuutit
  let minutes = 0;
  for (let id of ids) {
    if (id == "date") continue;
    if (id == "deck") continue;
    if (id == "dj") continue;
    minutes += data[id]["basic_statistics"]["minutes_on_channel"];
  }
  minutes = minutes + " mins (" + (minutes/60).toFixed(2) + " h)";

  // Kaikki ES
  let es = 0;
  for (let id of ids) {
    if (id == "date") continue;
    if (id == "deck") continue;
    if (id == "dj") continue;
    es += data[id]["inventory"]["items"]["ES"];
  }

  // Juodut ES
  let es_t = 0;
  for (let id of ids) {
    if (id == "date") continue;
    if (id == "deck") continue;
    if (id == "dj") continue;
    es_t += data[id]["inventory"]["items"]["ES_can"];
  }

  // Harpuunat
  let harpoons = 0;
  for (let id of ids) {
    if (id == "date") continue;
    if (id == "deck") continue;
    if (id == "dj") continue;
    if (data[id]["inventory"]["key_items"]["golden_harpoon"]) {
      harpoons += 1;
    }
  }

  // Valaankasvattajat
  let valaank = 0;
  for (let id of ids) {
    if (id == "date") continue;
    if (id == "deck") continue;
    if (id == "dj") continue;
    if (data[id]["inventory"]["key_items"]["whale_breeding_program"]) {
      valaank += 1;
    }
  }

  let items = [
    ["Kaikki rahat", "coins", all_money],
    ["Kaikki minuutit", "", minutes],
    ["Kaikki ES", "kpl", es],
    ["Kaikki Tölkit", "kpl", es_t],
    ["Kultaiset Harpuunat", "kpl", harpoons],
    ["Valaankasvattajat", "kpl", valaank],
    ["Season 2 alkoi", "", "30.8.2018"]
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
    if (id == "deck") continue;
    if (id == "dj") continue;
      all_money += data[id]["inventory"]["money"];
    }

    // Kaikki minuutit
    let minutes = 0;
    for (let id of ids) {
      if (id == "date") continue;
      if (id == "deck") continue;
      if (id == "dj") continue;
      minutes += data[id]["basic_statistics"]["minutes_on_channel"];
    }
    minutes = minutes + " mins (" + (minutes/60).toFixed(2) + " h)";

    // Kaikki ES
    let es = 0;
    for (let id of ids) {
      if (id == "date") continue;
      if (id == "deck") continue;
      if (id == "dj") continue;
      es += data[id]["inventory"]["items"]["ES"];
    }

    // Juodut ES
    let es_t = 0;
    for (let id of ids) {
      if (id == "date") continue;
      if (id == "deck") continue;
      if (id == "dj") continue;
      es_t += data[id]["inventory"]["items"]["ES_can"];
    }

    // Harpuunat
    let harpoons = 0;
    for (let id of ids) {
      if (id == "date") continue;
      if (id == "deck") continue;
      if (id == "dj") continue;
      if (data[id]["inventory"]["key_items"]["golden_harpoon"]) {
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

function deactivateAll() {
  for (let r = 0; r < 2; r++){
    for (let c = 0; c < 4; c++) {
        buttons1[r][c].deactivated();
    }
  }
  for (let r = 0; r < 6; r++){
    for (let c = 0; c < 4; c++) {
        buttons[r][c].deactivated();
    }
  }

  for (let s = 0; s < 1; s++){
    for (let c = 0; c < 4; c++) {
      game_btns[s][c].deactivated();
    }
  }

  yleiset.deactivated();
  peliyleiset.deactivated();
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
    if (id == "deck") continue;
    if (id == "dj") continue;
        all_wins += data[id]["game_slot"]["money_won"];
        all_wins += data[id]["game_KTEM"]["money_won"];
        all_wins += data[id]["game_harpoon"]["money_won"];
        all_wins += data[id]["game_blackjack"]["money_won"];
  }

  // Kaikki häviöt
  let all_loses = 0;
  for (let id of ids) {
    if (id == "date") continue;
    if (id == "deck") continue;
    if (id == "dj") continue;
    all_loses += data[id]["game_slot"]["money_lost"];
    all_loses += data[id]["game_KTEM"]["money_lost"];
    all_loses += data[id]["game_harpoon"]["money_lost"];
    all_loses += data[id]["game_blackjack"]["money_lost"];
  }

  let all_wins_h = 0;
  for (let id of ids) {
    if (id == "date") continue;
    if (id == "deck") continue;
    if (id == "dj") continue;
    all_wins_h += data[id]["game_harpoon"]["games_won"];
  }

  let all_wins_k = 0;
  for (let id of ids) {
    if (id == "date") continue;
    if (id == "deck") continue;
    if (id == "dj") continue;
    all_wins_k += data[id]["game_KTEM"]["games_won"];
  }

  let all_wins_s = 0;
  for (let id of ids) {
    if (id == "date") continue;
    if (id == "deck") continue;
    if (id == "dj") continue;
    all_wins_s += data[id]["game_harpoon"]["games_won"];
  }

  let all_wins_b = 0;
  for (let id of ids) {
    if (id == "date") continue;
    if (id == "deck") continue;
    if (id == "dj") continue;
    all_wins_b += data[id]["game_blackjack"]["games_won"];
  }


  // Netto
  let netto = all_wins - all_loses;

  let palatutsp = (all_wins * 100 / all_loses).toFixed(2);

  let s_pp = (all_wins_s * 100 / all_wins).toFixed(2);
  let k_pp = (all_wins_k * 100 / all_wins).toFixed(2);
  let h_pp = (all_wins_h * 100 / all_wins).toFixed(2);
  let b_pp = (all_wins_b * 100 / all_wins).toFixed(2);

  let items = [
    ["Kaikki voitot", "coins", all_wins],
    ["Kaikki häviöt", "coins", all_loses],
    ["Netto", "coins", netto],
    ["Palautus-%", "%", palatutsp],
    ["Voittojen osuus - Slot", "%", s_pp],
    ["Voittojen osuus - KTEM", "%", k_pp],
    ["Voittojen osuus - Harpoon", "%", h_pp],
    ["Voittojen osuus - BJ", "%", b_pp],

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
      if (id == "deck") continue;
      if (id == "dj") continue;
          all_wins += data[id]["game_slot"]["money_won"];
          all_wins += data[id]["game_KTEM"]["money_won"];
          all_wins += data[id]["game_harpoon"]["money_won"];
          all_wins += data[id]["game_blackjack"]["money_won"];
    }

    // Kaikki häviöt
    let all_loses = 0;
    for (let id of ids) {
      if (id == "date") continue;
      if (id == "deck") continue;
      if (id == "dj") continue;
      all_loses += data[id]["game_slot"]["money_lost"];
      all_loses += data[id]["game_KTEM"]["money_lost"];
      all_loses += data[id]["game_harpoon"]["money_lost"];
      all_loses += data[id]["game_blackjack"]["money_lost"];
    }

    let all_wins_h = 0;
    for (let id of ids) {
      if (id == "date") continue;
      if (id == "deck") continue;
      if (id == "dj") continue;
      all_wins_h += data[id]["game_harpoon"]["games_won"];
    }

    let all_wins_k = 0;
    for (let id of ids) {
      if (id == "date") continue;
      if (id == "deck") continue;
      if (id == "dj") continue;
      all_wins_k += data[id]["game_KTEM"]["games_won"];
    }

    let all_wins_s = 0;
    for (let id of ids) {
      if (id == "date") continue;
      if (id == "deck") continue;
      if (id == "dj") continue;
      all_wins_s += data[id]["game_harpoon"]["games_won"];
    }

    let all_wins_b = 0;
    for (let id of ids) {
      if (id == "date") continue;
      if (id == "deck") continue;
      if (id == "dj") continue;
      all_wins_b += data[id]["game_blackjack"]["games_won"];
    }

    // Netto
    let netto = all_wins - all_loses;

    let palatutsp = (all_wins * 100 / all_loses).toFixed(2);

    let s_pp = (all_wins_s * 100 / all_wins).toFixed(2);
    let k_pp = (all_wins_k * 100 / all_wins).toFixed(2);
    let h_pp = (all_wins_h * 100 / all_wins).toFixed(2);
    let b_pp = (all_wins_b * 100 / all_wins).toFixed(2);

    let items = [
      ["Kaikki voitot", "coins", all_wins],
      ["Kaikki häviöt", "coins", all_loses],
      ["Netto", "coins", netto],
      ["Palautus-%", "%", palatutsp],
      ["Voittojen osuus - Slot", "%", s_pp],
      ["Voittojen osuus - KTEM", "%", k_pp],
      ["Voittojen osuus - Harpoon", "%", h_pp],
      ["Voittojen osuus - BJ", "%", b_pp]

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
if (id == "deck") continue;
if (id == "dj") continue;
    all_wins1 += data[id]["game_slot"]["money_won"];
  }

  // Kaikki häviöt
  let all_loses1 = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    all_loses1 += data[id]["game_slot"]["money_lost"];
  }

  // Kaikki pelit
  let all_games1 = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    all_games1 += data[id]["game_slot"]["games"];
  }

  // Netto
  let netto1 = all_wins1 - all_loses1;

  let palautus = (all_wins1 / all_loses1) * 100;

  let poggers3 = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    poggers3 += data[id]["game_slot"]["wins"]["poggers3"];
  }

  let poggers2 = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    poggers2 += data[id]["game_slot"]["wins"]["poggers2"];
  }

  let poggers1 = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    poggers1 += data[id]["game_slot"]["wins"]["poggers1"];
  }

  let sasu = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    sasu += data[id]["game_slot"]["wins"]["sasu"];
  }

  let karvis = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    karvis += data[id]["game_slot"]["wins"]["karvis"];
  }

  let alfa = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    alfa += data[id]["game_slot"]["wins"]["alfa"];
  }

  let meloni = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    meloni += data[id]["game_slot"]["wins"]["jesilmero"];
  }


  let items = [
    ["Kaikki pelit", "kpl", all_games1],
    ["Kaikki voitot", "coins", all_wins1],
    ["Kaikki häviöt", "coins", all_loses1],
    ["Netto", "coins", netto1],
    ["Palautus-%", "%", palautus.toFixed(2)],
    ["3 x Poggers", "kpl", poggers3],
    ["3 x Meloni", "kpl", meloni],
    ["2 x Poggers", "kpl", poggers2],
    ["3 x Alfa", "kpl", alfa],
    ["3 x Karvis", "kpl", karvis],
    ["3 x Sasu", "kpl", sasu],
    ["1 x Poggers", "kpl", poggers1]
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
if (id == "deck") continue;
if (id == "dj") continue;
      all_wins1 += data[id]["game_slot"]["money_won"];
    }

    // Kaikki häviöt
    let all_loses1 = 0;
    for (let id of ids) {
      if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
      all_loses1 += data[id]["game_slot"]["money_lost"];
    }

    // Kaikki pelit
    let all_games1 = 0;
    for (let id of ids) {
      if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
      all_games1 += data[id]["game_slot"]["games"];
    }

    // Netto
    let netto1 = all_wins1 - all_loses1;

    let palautus = (all_wins1 / all_loses1) * 100;

    let poggers3 = 0;
    for (let id of ids) {
      if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
      poggers3 += data[id]["game_slot"]["wins"]["poggers3"];
    }

    let poggers2 = 0;
    for (let id of ids) {
      if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
      poggers2 += data[id]["game_slot"]["wins"]["poggers2"];
    }

    let poggers1 = 0;
    for (let id of ids) {
      if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
      poggers1 += data[id]["game_slot"]["wins"]["poggers1"];
    }

    let sasu = 0;
    for (let id of ids) {
      if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
      sasu += data[id]["game_slot"]["wins"]["sasu"];
    }

    let karvis = 0;
    for (let id of ids) {
      if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
      karvis += data[id]["game_slot"]["wins"]["karvis"];
    }

    let alfa = 0;
    for (let id of ids) {
      if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
      alfa += data[id]["game_slot"]["wins"]["alfa"];
    }

    let meloni = 0;
    for (let id of ids) {
      if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
      meloni += data[id]["game_slot"]["wins"]["jesilmero"];
    }

    let items = [
      ["Kaikki pelit", "kpl", all_games1],
      ["Kaikki voitot", "coins", all_wins1],
      ["Kaikki häviöt", "coins", all_loses1],
      ["Netto", "coins", netto1],
      ["Palautus-%", "%", palautus.toFixed(2)],
      ["3 x Poggers", "kpl", poggers3],
      ["3 x Meloni", "kpl", meloni],
      ["2 x Poggers", "kpl", poggers2],
      ["3 x Alfa", "kpl", alfa],
      ["3 x Karvis", "kpl", karvis],
      ["3 x Sasu", "kpl", sasu],
      ["1 x Poggers", "kpl", poggers1]
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
if (id == "deck") continue;
if (id == "dj") continue;
    all_wins2 += data[id]["game_KTEM"]["money_won"];
  }

  // Kaikki häviöt
  let all_loses2 = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    all_loses2 += data[id]["game_KTEM"]["money_lost"];
  }

  // Kaikki pelit
  let all_games2 = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    all_games2 += data[id]["game_KTEM"]["games_won"];
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
if (id == "deck") continue;
if (id == "dj") continue;
      all_wins2 += data[id]["game_KTEM"]["money_won"];
    }

    // Kaikki häviöt
    let all_loses2 = 0;
    for (let id of ids) {
      if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
      all_loses2 += data[id]["game_KTEM"]["money_lost"];
    }

    // Kaikki pelit
    let all_games2 = 0;
    for (let id of ids) {
      if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
      all_games2 += data[id]["game_KTEM"]["games_won"];
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

function BJChart() {

  let top_bar = 70 * 4 / 2;
  let left_bar = 20;
  let right_bar = 20;
  let bottom_bar = 10;
  let space_between = 8;

  let ids = Object.keys(data); // Lista ID

  // Kaikki voitot
  let all_wins6 = 0;
  for (let id of ids) {
    if (id == "date") continue;
    if (id == "deck") continue;
    if (id == "dj") continue;
    all_wins6 += data[id]["game_blackjack"]["money_won"];
  }

  // Kaikki häviöt
  let all_loses6 = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    all_loses6 += data[id]["game_blackjack"]["money_lost"];
  }

  // Kaikki pelit
  let all_games6 = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    all_games6 += data[id]["game_blackjack"]["games"];
  }

  // Kaikki pelit
  let all_panos = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    all_panos += data[id]["game_blackjack"]["all_bets"];
  }

  // Kaikki pelit
  let kortit = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    kortit += data[id]["game_blackjack"]["cards_played"];
  }

  // Kaikki pelit
  let k1 = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    k1 += data[id]["game_blackjack"]["21"];
  }

  // Kaikki pelit
  let hit = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    hit += data[id]["game_blackjack"]["hit"];
  }

  // Kaikki pelit
  let double = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    double += data[id]["game_blackjack"]["double"];
  }
  // Kaikki pelit
  let stand = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    stand += data[id]["game_blackjack"]["stand"];
  }
  // Kaikki pelit
  let all_wins_g6 = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    all_wins_g6 += data[id]["game_blackjack"]["games_won"];
  }

  // Kaikki pelit
  let all_loses_g6 = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    all_loses_g6 += data[id]["game_blackjack"]["games_lost"];
  }

  // Netto
  let netto6 = all_wins6 - all_loses6;

  let palautus6 = (all_wins6 / all_loses6) * 100;

  let keskimpanos6 = (all_panos) / all_games6;


  let items = [
    ["Kaikki pelit", "kpl", all_games6],
    ["Voitetut pelit", "kpl", all_wins_g6],
    ["Hävityt pelit", "kpl", all_loses_g6],
    ["Kaikki voitot", "coins", all_wins6],
    ["Kaikki häviöt", "coins", all_loses6],
    ["Netto", "coins", netto6],
    ["Palautus-%", "%", palautus6.toFixed(2)],
    ["Pelatut kortit", "kpl", kortit],
    ["Keskimääräinen panos", "coins", keskimpanos6.toFixed(0)],
    ["Kaikki panokset", "coins", all_panos],
    ["Blackjackit", "kpl", k1],
    ["Hit", "kpl", hit],
    ["Stand", "kpl", stand],
    ["Double", "kpl", double],
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
    let all_wins6 = 0;
    for (let id of ids) {
      if (id == "date") continue;
      if (id == "deck") continue;
      if (id == "dj") continue;
      all_wins6 += data[id]["game_blackjack"]["money_won"];
    }

    // Kaikki häviöt
    let all_loses6 = 0;
    for (let id of ids) {
      if (id == "date") continue;
  if (id == "deck") continue;
  if (id == "dj") continue;
      all_loses6 += data[id]["game_blackjack"]["money_lost"];
    }

    // Kaikki pelit
    let all_games6 = 0;
    for (let id of ids) {
      if (id == "date") continue;
  if (id == "deck") continue;
  if (id == "dj") continue;
      all_games6 += data[id]["game_blackjack"]["games"];
    }

    // Kaikki pelit
    let all_panos = 0;
    for (let id of ids) {
      if (id == "date") continue;
  if (id == "deck") continue;
  if (id == "dj") continue;
      all_panos += data[id]["game_blackjack"]["all_bets"];
    }

    // Kaikki pelit
    let kortit = 0;
    for (let id of ids) {
      if (id == "date") continue;
  if (id == "deck") continue;
  if (id == "dj") continue;
      kortit += data[id]["game_blackjack"]["cards_played"];
    }

    // Kaikki pelit
    let k1 = 0;
    for (let id of ids) {
      if (id == "date") continue;
  if (id == "deck") continue;
  if (id == "dj") continue;
      k1 += data[id]["game_blackjack"]["21"];
    }

    // Kaikki pelit
    let hit = 0;
    for (let id of ids) {
      if (id == "date") continue;
  if (id == "deck") continue;
  if (id == "dj") continue;
      hit += data[id]["game_blackjack"]["hit"];
    }

    // Kaikki pelit
    let double = 0;
    for (let id of ids) {
      if (id == "date") continue;
  if (id == "deck") continue;
  if (id == "dj") continue;
      double += data[id]["game_blackjack"]["double"];
    }
    // Kaikki pelit
    let stand = 0;
    for (let id of ids) {
      if (id == "date") continue;
  if (id == "deck") continue;
  if (id == "dj") continue;
      stand += data[id]["game_blackjack"]["stand"];
    }
    // Kaikki pelit
    let all_wins_g6 = 0;
    for (let id of ids) {
      if (id == "date") continue;
  if (id == "deck") continue;
  if (id == "dj") continue;
      all_wins_g6 += data[id]["game_blackjack"]["games_won"];
    }

    // Kaikki pelit
    let all_loses_g6 = 0;
    for (let id of ids) {
      if (id == "date") continue;
  if (id == "deck") continue;
  if (id == "dj") continue;
      all_loses_g6 += data[id]["game_blackjack"]["games_lost"];
    }

    // Netto
    let netto6 = all_wins6 - all_loses6;

    let palautus6 = (all_wins6 / all_loses6) * 100;

    let keskimpanos6 = (all_panos) / all_games6;


    let items = [
      ["Kaikki pelit", "kpl", all_games6],
      ["Voitetut pelit", "kpl", all_wins_g6],
      ["Hävityt pelit", "kpl", all_loses_g6],
      ["Kaikki voitot", "coins", all_wins6],
      ["Kaikki häviöt", "coins", all_loses6],
      ["Netto", "coins", netto6],
      ["Palautus-%", "%", palautus6.toFixed(2)],
      ["Pelatut kortit", "kpl", kortit],
      ["Keskimääräinen panos", "coins", keskimpanos6.toFixed(0)],
      ["Kaikki panokset", "coins", all_panos],
      ["Blackjackit", "kpl", k1],
      ["Hit", "kpl", hit],
      ["Stand", "kpl", stand],
      ["Double", "kpl", double],
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
if (id == "deck") continue;
if (id == "dj") continue;
    all_wins3 += data[id]["game_harpoon"]["games_won"];
  }

  // Kaikki häviöt
  let all_loses3 = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    all_loses3 += data[id]["game_harpoon"]["games_lost"];
  }

  // Kaikki pelit
  let all_games3 = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    all_games3 += data[id]["game_harpoon"]["games"];
  }

  // Kaikki pelit
  let all_hits = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    all_hits += data[id]["game_harpoon"]["hits"];
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
if (id == "deck") continue;
if (id == "dj") continue;
    hait += data[id]["game_harpoon"]["targets"]["shark"];
  }

  // Kaikki pelit
  let pallot = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    pallot += data[id]["game_harpoon"]["targets"]["balloon"];
  }

  // Kaikki pelit
  let valaat = 0;
  for (let id of ids) {
    if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
    valaat += data[id]["game_harpoon"]["targets"]["whale"];
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
if (id == "deck") continue;
if (id == "dj") continue;
      all_wins3 += data[id]["game_harpoon"]["games_won"];
    }

    // Kaikki häviöt
    let all_loses3 = 0;
    for (let id of ids) {
      if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
      all_loses3 += data[id]["game_harpoon"]["games_lost"];
    }

    // Kaikki pelit
    let all_games3 = 0;
    for (let id of ids) {
      if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
      all_games3 += data[id]["game_harpoon"]["games"];
    }

    // Kaikki pelit
    let all_hits = 0;
    for (let id of ids) {
      if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
      all_hits += data[id]["game_harpoon"]["hits"];
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
if (id == "deck") continue;
if (id == "dj") continue;
      hait += data[id]["game_harpoon"]["targets"]["shark"];
    }

    // Kaikki pelit
    let pallot = 0;
    for (let id of ids) {
      if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
      pallot += data[id]["game_harpoon"]["targets"]["balloon"];
    }

    // Kaikki pelit
    let valaat = 0;
    for (let id of ids) {
      if (id == "date") continue;
if (id == "deck") continue;
if (id == "dj") continue;
      valaat += data[id]["game_harpoon"]["targets"]["whale"];
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

  var labels = ["rahat", "aktiivisuus", "peak", "perustulo", "es", "tyhjät", "money_stolen", "money_stolen_from_you"];

  var count = 0;
  for (let r = 0; r < 2; r++){
    for (let c = 0; c < 4; c++) {
      if (buttons1[r][c].intersects(mouseX, mouseY)) {
        deactivateAll();
        buttons1[r][c].activated();
        chart = [];
        bars = {};
        chart.push(new Chart(labels[count]));
        chart[0].create();
      }
      count++;
    }
  }
  ////////////////////

  var labels = [
    ["Slot-Pelit", "KTEM-Pelit", "Ryhmäpelit", "Harpoon-Pelit", "Harpoon-Voitot", "BJ-Pelit"],
    ["Slot Voitetut", "KTEM-Voitot", "Ryhmäpeli W%", "Harpoon-Osumat", "Harpoon-Hävityt", "BJ-Voitot"],
    ["Slot Häviöt", "KTEM-Pelit", "Ryhmäpelinetto", "Harpoon-Accuracy", "Harpoon-Netto", "BJ-Häviöt"],
    ["Slot-Netto", "KTEM-Netto", " ", " ", " ", "BJ-Netto"],
  ];

  var count = 0;
  for (let r = 0; r < 6; r++){
    for (let c = 0; c < 4; c++) {
      if (labels[c][r] == " " ) continue;
      if (buttons[r][c].intersects(mouseX, mouseY)) {
        deactivateAll();
        buttons[r][c].activated();
        chart = [];
        bars = {};
        chart.push(new Chart(labels[c][r]));
        chart[0].create();
      }
      count++;
    }
  }

  var labels = [
    ["SLOT DATA"],
    ["KTEM DATA"],
    ["HARPOON DATA"],
    ["BJ DATA"],
  ];

  var count = 0;
  for (let s = 0; s < 1; s++){
    for (let c = 0; c < 4; c++) {
      if (game_btns[s][c].intersects(mouseX, mouseY)) {
      deactivateAll();
      game_btns[s][c].activated();
      chart = [];
      bars = {};
      if (labels[c][s] == "SLOT DATA") {
        chart.push(new SlotChart());
      }
      if (labels[c][s] == "KTEM DATA") {
        chart.push(new KTEMChart());
      }
      if (labels[c][s] == "HARPOON DATA") {
        chart.push(new HarpoonChart());
      }
      if (labels[c][s] == "BJ DATA") {
        chart.push(new BJChart());
      }

      chart[0].create();

    }
  }
  }
  if (yleiset.intersects(mouseX, mouseY)) {
    deactivateAll();
    yleiset.activated();
    chart = [];
    bars = {};
    chart.push(new OverAll());
    chart[0].create();
  }
  if (peliyleiset.intersects(mouseX, mouseY)) {
    deactivateAll();
    peliyleiset.activated();
    chart = [];
    bars = {};
    chart.push(new OverAllGames());
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

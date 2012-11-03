//GAME OF LIFE
//MADE BY CESAR VARGAS
//learning javascript & jquery
//
var generation = 0;
var tam = 50;
var intervalID;
var running = false;
//Cria as divs
document.write("<div id='content'>");
document.write("<h1>Conway`s Game of Life</h1>");
for(var i = 0; i < tam; i++) {
   for(var j = 0; j < tam; j++) {
      document.write("<div class='canvas' style='float:left;' id='");
      document.write(i);
      document.write("-");
      document.write(j);
      document.write("'></div>");
   }
   document.write("<div style='clear:both;'></div>");
}

//Cria o array das divs e inicializa todos com false ( não selecionado )
var array_divs = {};
var array_temp = {};
false_array();

//Ao clicar nas divs
$('.canvas').click(function() {
   if(!array_divs[$(this).attr('id')]) {
      $(this).css("background-color", "black");
      array_divs[$(this).attr('id')] = true;
   } else {
      $(this).css("background-color", "white");
      array_divs[$(this).attr('id')] = false;
   }

   //alert(array_divs[$(this).attr('id')]);
});

//Ao passar o mouse
$('.canvas').mouseover(function() {
   $('#position').html($(this).attr('id'));
});

function false_array() {
   for(var i = 0; i < tam; i++)
   for(var j = 0; j < tam; j++)
   array_divs[i + "-" + j] = false;
}

function set_true(i, j) {
   array_divs[i + "-" + j] = true;
}

function calcula_array_temp() {
   array_temp = {};
   for(var i = 0; i < tam; i++) {
      for(var j = 0; j < tam; j++) {
         var count_vivos = 0;
         if(array_divs[i + '-' + (j - 1)]) count_vivos++;
         if(array_divs[i + '-' + (j + 1)]) count_vivos++;
         if(array_divs[(i - 1) + '-' + (j - 1)]) count_vivos++;
         if(array_divs[(i - 1) + '-' + (j + 1)]) count_vivos++;
         if(array_divs[(i - 1) + '-' + j]) count_vivos++;
         if(array_divs[(i + 1) + '-' + (j - 1)]) count_vivos++;
         if(array_divs[(i + 1) + '-' + (j + 1)]) count_vivos++;
         if(array_divs[(i + 1) + '-' + j]) count_vivos++;
         //Regras do jogo
         if(count_vivos < 2 && array_divs[i + '-' + j]) array_temp[i + '-' + j] = false;
         else if(count_vivos > 3 && array_divs[i + '-' + j]) array_temp[i + '-' + j] = false;
         else if(count_vivos == 2 && array_divs[i + '-' + j]) array_temp[i + '-' + j] = true;
         else if(count_vivos == 3 && array_divs[i + '-' + j]) array_temp[i + '-' + j] = true;
         else if(count_vivos == 3 && !array_divs[i + '-' + j]) array_temp[i + '-' + j] = true;
         else array_temp[i + '-' + j] = false;
      }
   }
}

function update_divs() {
   for(var i = 0; i < tam; i++)
   for(var j = 0; j < tam; j++)
   if(array_divs[i + '-' + j]) $('#' + i + '-' + j).css("background-color", "black");
   else $('#' + i + '-' + j).css("background-color", "white");
   $('#generation').html(generation);
}

function nova_geracao() {
   generation++;
   calcula_array_temp();
   array_divs = array_temp;
   update_divs();
}

function reset() {
   false_array();
   generation = 0;
   update_divs();
}


function go() {
   if(!running) {
      $('#inputRun').attr('value', "Stop!");
      intervalID = setInterval(function() {
         nova_geracao()
      }, 130);
      $('#status').css("color", "green").html('Running!');
   } else {
      $('#inputRun').attr('value', "Run!");
      clearInterval(intervalID);
      $('#status').css("color", "red").html('Stopped!');
   }
   running = !running;
}
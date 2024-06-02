function key(event) {
    // alert(event.which);

    if (event.which == 13) {
      //Enter
      if (rw == 0) {

        fid = f();

        rw = setInterval(run, 100);
        rs.play();
        bw = setInterval(background, 100);
        sw = setInterval(updateScore, 100);
        fw = setInterval(move, 100);
      }
    }
  
  //clearInterval is used to stop an animation we have started
  if (event.which == 32) { // 32= key cord of the space bar
    if (jw == 0) {
      clearInterval(rw); //to stop running before jumping
      rs.pause();
      jw = setInterval(jump, 100);
      js.play();
    }
  
  }

}

var rs = new Audio("run.mp3"); //rs = run sound //creating an audio object and assigning it to the global variable run sound (rs)
rs.loop = true; // to loop the sound track 
var js = new Audio("jump.mp3"); //js = jump sound

var m = 800;
var fid = 0;

function f() {
  for (var y = 0; y < 20; y++) { //if u wanna change the no of obstacles, change the value of "y" in both f() and move() functions
    var i = document.createElement("img");
    i.src = "flame.gif";
    i.className = "i";

    i.style.marginLeft = m + "px";
    m = m + 500;

    i.id = "a" + y;

    document.getElementById("b").appendChild(i);
  }
}

var r = 1;
var rw = 0;

function run() {
  var rimg = document.getElementById("boy");

  r = r + 1;

  if (r == 9) {
    r = 1;
  }

  rimg.src = "Run (" + r + ").png";
}

var b = 0;
var bw = 0;

function background() {
  b = b - 20;

  document.getElementById("b").style.backgroundPositionX = b + "px";
}

var a = 0;
var sw = 0;

function updateScore() {
  a = a + 5;

  document.getElementById("score").innerHTML = a;
}

var fw = 0;  //fw variable has the job of moving the obstacles 

function move() //move function moves the obstacles 
{
  for (var y = 0; y < 20; y++) //y=no of obstacles
  {
    var z = getComputedStyle(document.getElementById("a" + y));

    var p = parseInt(z.marginLeft);

    
    p = p - 20; 

    document.getElementById("a" + y).style.marginLeft = p + "px";
    
    //alert(p);

    //160px -boy hits the obstacle 
    //60- go away from the obstacles


    //boy dying ( game over)
    if(p >=60 & p <=160 ) // boy is inside the obstacle in this range
     {
       // alert(mt); //mt = 260
       if(mt > 300) //when boy dies cus he hit the top of the obstacle 
        {
          clearInterval(rw);
          rs.pause();//pause the run sound 

           clearInterval(jw);
           clearInterval(bw);
           clearInterval(sw); //stopping score 
           clearInterval(fw); //stopping the movement of obstacles 

           setInterval(dead,100);//calling the dead animation (dead animation doesnt need a worker (dw) since it only works once in the game)
           ds.play();
       }
     } 
   
  }
}

var ds = new Audio("dead.mp3");


var j = 1;
var jw = 0;
var mt = 320; //mt=margin top for boy in css 

function jump() {
  var jimg = document.getElementById("boy");

  if (j <= 6) { 
    mt = mt - 30;

  }

  if (j >= 7) {
    mt = mt + 30;
  }

  jimg.style.marginTop = mt + "px";

  j = j + 1;

  if (j == 13) {
    j = 1;
    clearInterval(jw);
    jw = 0;
    rw = setInterval(run, 100);
    rs.play();
 

  if (bw == 0)
  {
    bw = setInterval(background,100);
  }

  if (sw == 0)
  {
    sw = setInterval(updateScore,100);
  }

  if (fw == 0)
  {
    fw = setInterval(move,100);
  }

  if (fid ==0)
  {
    fid = f();
  }
}
  jimg.src = "Jump (" + j + ").png";
}
 
var d = 0;

function dead()
{
  
  var dimg = document.getElementById("boy");//dimg = dead image 

  d = d+1;

  if(d==11)
  {
    
    d = 10;

    dimg.style.marginTop = "320px";  //to take the boy down if he died while jumping (use the value in css boy margin top)
    
    document.getElementById("end").style.visibility = "visible";

    document.getElementById("endscore").innerHTML = a;

  }

 
  dimg.src = "Dead (" + d + ").png";

}

function reload(){

    location.reload();
}
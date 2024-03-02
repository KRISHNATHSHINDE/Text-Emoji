//ENCRYPTION CODE
var clutter = "";
function encryption() {
  document.querySelector("#encrypt-btn").addEventListener("click", function () {
    // STORING INPUT
    var input = document.getElementById("txtmsg").value;
    // console.log(input);

    // STORING PASSWORD
    var password = document.getElementById("password").value;
    // console.log(password);

    // SPLITTING THE INPUT
    var str = input.split("");
    // console.log(str);

    // CONVERTING TO EMOJI
    str.forEach((element) => {
      clutter += `&#128${element.charCodeAt()} `;
    });
    // console.log(clutter);

    document.querySelector("#result").innerHTML = clutter;

    // STORING IN LOCAL STORAGE
    var dataarr = [];

    if (JSON.parse(localStorage.getItem("data1"))) {
      dataarr = JSON.parse(localStorage.getItem("data1"));
      dataarr.push({ pass: password, input: input, clutter: clutter });
    } else {
      dataarr = [{ pass: password, input: input, clutter: clutter }];
    }
    // console.log(dataarr);
    localStorage.setItem(`data1`, JSON.stringify(dataarr));
  });
}

// DECRYPTION CODE
function decryption() {
  document.querySelector("#decrypt-btn").addEventListener("click", function () {
    var clutter2 = "";

    // GETTING THE EMOJI INPUT
    var input2 = document.querySelector("#emomsg").value;

    // GETTING THE FINAL PASSWORD
    var password2 = document.querySelector("#finalpassword").value;

    var user = JSON.parse(localStorage.getItem("data1"));
    // console.log(user);

    // CONVERTING TO MESSAGE
    var str2 = input2.split(" ");

    str2.forEach((element) => {
      clutter2 += `&#${element.codePointAt(0)} `;
    });
    // console.log(clutter2);

    var found;
    for (const i of user) {
      if (i.clutter == clutter2) {
        found = i;
        // console.log(i);
      }
    }

    // console.log("user:", user);
    // console.log("password2:", password2);
    // console.log("found:", found);
    if (found && found.clutter === clutter2) {
      document.querySelector("#result").style.display = "block";
      document.querySelector("#result").style.color = "#eee";
      document.querySelector("#result").innerHTML = found.input;
    } else {
      document.querySelector("#result").style.display = "block";
      document.querySelector("#result").style.color = "red";
      document.querySelector("#result").innerHTML = "Wrong Password";
    }
  });
}

// TRANSITION CODE
function btnClicking() {
  document.querySelector("#dec-btn").addEventListener("click", function () {
    document.querySelector("#decryption").style.display = "block";
    document.querySelector("#encryption").style.display = "none";
    document.querySelector("#dec-btn").style.backgroundColor = "#333";
    document.querySelector("#enc-btn").style.backgroundColor = "#222";
    document.querySelector("#main #title #arrow").innerHTML = "&larr;";
    document.querySelector("#result").style.display = "none";
  });
  document.querySelector("#enc-btn").addEventListener("click", function () {
    document.querySelector("#encryption").style.display = "block";
    document.querySelector("#decryption").style.display = "none";
    document.querySelector("#enc-btn").style.backgroundColor = "#333";
    document.querySelector("#dec-btn").style.backgroundColor = "#222";
    document.querySelector("#main #title #arrow").innerHTML = "&rarr;";
    document.querySelector("#result").style.display = "none";
  });

  document.querySelector("#encrypt-btn").addEventListener("click", function () {
    document.querySelector("#result").style.display = "block";
  });
  document.querySelector("#decrypt-btn").addEventListener("click", function () {
    document.querySelector("#result").style.display = "block";
  });
}

encryption();

decryption();

btnClicking();

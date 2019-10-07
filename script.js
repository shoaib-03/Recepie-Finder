// Create Card Elements Dynamically
var cardGrid = document.getElementById("card-grid");

const createCardDynamically = obj => {
  let card = document.createElement("div");
  card.className = "card";

  let image = document.createElement("img");
  image.src = obj.thumbnail;
  image.id = "thumbnail";

  let cardTitle = document.createElement("h2");
  cardTitle.className = "title";
  let titleText = document.createTextNode(obj.title);
  cardTitle.appendChild(titleText);

  card.appendChild(image);
  card.appendChild(cardTitle);

  return card;
};
// -----------------------------------------------

// Receive Input Box Text and check conditions
let inputBox = document.getElementById("search-box");
let searchBtn = document.getElementById("search-btn");
let text = document.getElementById("empty");

const checkvalue = () => {
  let strPtrn = /[a-z]{4}/;
  let capsPtrn = /^[A-Z]/;

  var currentInputValue = inputBox.value;

  if (strPtrn.test(currentInputValue)) {
    if (capsPtrn.test(currentInputValue)) {
      getData(currentInputValue);
    } else {
      alert("First letter should be capital.");
    }
  } else {
    alert("Enter a valid name!");
  }
  text.style.display = "none";
};
//------------------------------------------------------

// Adding EventListner
inputBox.addEventListener("keyup", e => {
  if (e.keyCode === 13) {
    checkvalue();
  }
});
searchBtn.addEventListener("click", () => {
  checkvalue();
});
// ---------------------------------------------------------

let cardList = [];
// Get data through API
const getData = searchStr => {
  let http = new XMLHttpRequest();

  http.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        var data = JSON.parse(this.responseText);
        cardList = data;
        cardGrid.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
          cardGrid.appendChild(createCardDynamically(data[i]));
        }
      }
    }
  };

  http.open(
    "GET",
    `https://5d76bf96515d1a0014085cf9.mockapi.io/playlist?search=${searchStr}`,
    true
  );
  http.send();
};
// -----------------------------------------------------

// Sorting the cards array

var aBtn = document.getElementById("ascending");
var dBtn = document.getElementById("descending");

// Ascending Order Sort
aBtn.addEventListener("click", () => {
  cardList.sort((a, b) => {
    let titleA = a.title;
    let titleB = b.title;

    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0;
  });

  cardGrid.innerHTML = "";

  for (let i = 0; i < cardList.length; i++) {
    cardGrid.appendChild(createCardDynamically(cardList[i]));
  }
});

// Descending Order Sort
dBtn.addEventListener("click", () => {
  cardList.sort((a, b) => {
    let titleA = a.title;
    let titleB = b.title;

    if (titleA > titleB) {
      return -1;
    }
    if (titleA < titleB) {
      return 1;
    }
    return 0;
  });

  cardGrid.innerHTML = "";

  for (let i = 0; i < cardList.length; i++) {
    cardGrid.appendChild(createCardDynamically(cardList[i]));
  }
});

// let myTitleList = [];

// aBtn.addEventListener("click", () => {
//   var cardDivs = document.querySelectorAll(".title");
//   var cardArray = Array.prototype.slice.call(cardDivs, 0);

//   console.log(cardArray);

//   for (let i = 0; i < cardArray.length; i++) {
//     console.log(cardArray[i].textContent);
//     myTitleList.push(cardArray[i].textContent);
//   }
//   console.log(myTitleList);

//   myTitleList.sort();

//   console.log(myTitleList);
// });

// $('#alphBnt').on('click', function () {
//   var alphabeticallyOrderedDivs = $divs.sort(function (a, b) {
//       return $(a).find("h1").text() > $(b).find("h1").text();
//   });
//   $("#container").html(alphabeticallyOrderedDivs);
// });

// {/* <input type='checkbox' onchange='handleChange(this);'> */}

// function handleChange(checkbox) {
//     if(checkbox.checked == true){
//         document.getElementById("submit").removeAttribute("disabled");
//     }else{
//         document.getElementById("submit").setAttribute("disabled", "disabled");
//    }
// }

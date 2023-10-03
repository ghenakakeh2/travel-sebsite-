// start header
let navbar = document.querySelector('.navbar');
window.onscroll = () => {

  if (window.scrollY >= 800) {
    navbar.classList.add('background');
  }
  else {
    navbar.classList.remove('background');
  }

};







// start home section
let prebtn = document.querySelector('.home .left');
let nextbtn = document.querySelector('.home .right');
let slidesvedio = document.querySelectorAll('.home .slide .video-slide');
let slidescontent = document.querySelectorAll('.home .slide .content');

let numberofslides = slidesvedio.length;
let slidenumber = 0;
// next slide
nextbtn.addEventListener("click", () => {
  slidesvedio.forEach((video) => {
    video.classList.remove("active");
  })
  slidescontent.forEach((content) => {
    content.classList.remove("active");
  })
  slidenumber++;
  if (slidenumber > numberofslides - 1) {
    slidenumber = 0;
  }
  slidesvedio[ slidenumber ].classList.add("active");
  slidescontent[ slidenumber ].classList.add("active")
});
// pre button
prebtn.addEventListener("click", () => {
  slidesvedio.forEach((video) => {
    video.classList.remove("active");
  })
  slidescontent.forEach((content) => {
    content.classList.remove("active");
  })
  slidenumber--;
  if (slidenumber < 0) {
    slidenumber = numberofslides - 1;
  }
  slidesvedio[ slidenumber ].classList.add("active");
  slidescontent[ slidenumber ].classList.add("active")
});




// start about section
document.querySelectorAll('.about .video-continer .conroles .control-btn').forEach((btn) => {
  btn.onclick = () => {
    let src = btn.getAttribute('data-src');
    document.querySelector('.about .video-continer .video').src = src;
  }
});







// start back end section


//setting all varibes
// let theinput = document.querySelector('.box-continer .add-tasks input');
let addbtn = document.querySelector('.add-Reservation .plus');
let bookForm = document.querySelector('.book .book-form');
let closeformbtn = document.querySelector('.book .book-form .close-form');
let savebtn = document.querySelector('.book .book-form .save');
let inputForm = document.querySelectorAll('.book .book-form .inputbox input');
let nameinput = inputForm[ 0 ];

let placeinput = inputForm[ 1 ];
let dateinput = inputForm[ 2 ];
let numberinput = inputForm[ 3 ];
let ReservationContiner = document.querySelector('.Reservation-content');






addbtn.addEventListener("click", () => {
  bookForm.classList.add("active");
});


closeformbtn.addEventListener("click", () => {
  bookForm.classList.remove("active");
})


let arryofReservation = new Array();//arry objects
if (localStorage.getItem("Reservations")) {
  arryofReservation = JSON.parse(localStorage.getItem("Reservations"));//transform from object to arry
  getelmentfromlocal();

}

////////////////////////////////////////////////////////////
//adding the task
savebtn.onclick = function () {
  if (savebtn.classList.contains("update")) {
    savebtn.classList.remove("update")
    update_ticket();
  } else {
    save_ticket();
  }

  // make the input empty
  inputForm.forEach((input) => {
    input.value = '';
  })
}

// function add reservation to arry
function AddReservationToArry(name, place, date, number) {
  let Reservation = {
    namee: name,
    placee: place,
    datee: date,
    numbere: number
  }
  arryofReservation.push(Reservation);
}

// function add reservation to page

function AddElementToPageFrom(arryofReservation) {
  ReservationContiner.innerHTML = "";
  arryofReservation.forEach((Reservation) => {
    // let discrbtionspan=document.createElement("span");

    //create a new task 
    let mainspan = document.createElement("span");
    let name = document.createElement("span");
    let place = document.createElement("span");
    let date = document.createElement("span");
    let number = document.createElement("span");


    // let namediscrbtion = document.createElement("span");
    // let placediscrbtion = document.createElement("span");
    // let datediscrbtion = document.createElement("span");
    // let numberdiscrbtion = document.createElement("span");


    let deleteelement = document.createElement("span");
    let modifyelement = document.createElement("span");


    //create text to span

    let textname = document.createTextNode(Reservation.namee);
    let textplace = document.createTextNode(Reservation.placee);
    let textdate = document.createTextNode(Reservation.datee);
    let textnumber = document.createTextNode(Reservation.numbere);



    // let textnamedis = document.createTextNode("Name");
    // let textplacedis = document.createTextNode("Place");
    // let textdatedis = document.createTextNode("Date");
    // let textnumberdis = document.createTextNode("Number");

    //create text to delete butten
    let textdelete = document.createTextNode("X");
    let textmodify = document.createTextNode("modify");

    //add text to delete butten
    // namediscrbtion.appendChild(textnamedis);
    // placediscrbtion.appendChild(textplacedis);
    // datediscrbtion.appendChild(textdatedis);
    // numberdiscrbtion.appendChild(textnumberdis);

    // discrbtionspan.appendChild(namediscrbtion);
    // discrbtionspan.appendChild(placediscrbtion);
    // discrbtionspan.appendChild(datediscrbtion);
    // discrbtionspan.appendChild(numberdiscrbtion);


    deleteelement.appendChild(textdelete);
    name.appendChild(textname);
    place.appendChild(textplace);
    date.appendChild(textdate);
    number.appendChild(textnumber);
    modifyelement.appendChild(textmodify);



    //add class to delete butten
    name.className = 'name';
    place.className = 'place';
    date.className = 'date';
    number.className = "number"
    modifyelement.className = 'modify';
    deleteelement.className = 'delete';
    // discrbtionspan.className='discrbtion';

    //add delete butten to main span
    mainspan.appendChild(name);
    mainspan.appendChild(place);
    mainspan.appendChild(date);
    mainspan.appendChild(number);
    mainspan.appendChild(modifyelement);


    mainspan.appendChild(deleteelement);

    //add class to span 
    mainspan.className = 'Reservation-box';
    //add the task to the continer 
    // ReservationContiner.appendChild(discrbtionspan);

    ReservationContiner.appendChild(mainspan);


  });

};

function addelementtothelocalstorage(arryofReservation) {
  window.localStorage.setItem("Reservation", JSON.stringify(arryofReservation));

}
function getelmentfromlocal() {
  let Reservations = JSON.parse(window.localStorage.getItem("Reservation"));
  AddElementToPageFrom(Reservations);
}
// //delete butten
document.addEventListener('click', (e) => {
  //delete task
  if (e.target.className == 'delete') {

    for (let i = 0; i < arryofReservation.length; i++) {
      if (arryofReservation[ i ].namee === e.target.parentNode.firstChild.innerHTML) {
        if (i == 0) {
          arryofReservation.splice(arryofReservation.indexOf(arryofReservation[ i ]), arryofReservation.indexOf(arryofReservation[ i ] + 1));
        }
        else {
          arryofReservation.splice(arryofReservation.indexOf(arryofReservation[ i ]), arryofReservation.indexOf(arryofReservation[ i ]));

        }

      }


    }
    addelementtothelocalstorage(arryofReservation);
    e.target.parentNode.remove();

  }
  if (ReservationContiner.childElementCount == 0) {
    noTaskMassage();
  }

});
// modify butten

document.addEventListener('click', (e) => {

  if (e.target.className == 'modify') {
    bookForm.classList.add("active");
    let Reservationbox = document.getElementsByClassName('Reservation-box');
    let Reservationbox_span = document.querySelectorAll('.Reservation-box span');


    console.log(Reservationbox_span)
    let rindex;
    for (let i = 0; i < Reservationbox.length; i++) {
      if (Reservationbox[ i ] == e.target.parentNode) {
        rindex = i;

        document.getElementsByClassName('nameinput').value = Reservationbox_span[ 0 ].innerHTML;
        document.getElementsByClassName('placeinput').value = Reservationbox_span[ 1 ].innerHTML;
        document.getElementsByClassName('dateinput').value = Reservationbox_span[ 2 ].innerHTML;
        document.getElementsByClassName('numberinput').value = Reservationbox_span[ 4 ].innerHTML;


      }

    }
    // console.log(Reservationbox)
    // let parent=e.target.parentNode;
    // console.log(parent)
    //     // let inputs=document.querySelectorAll(parent 'span');
    //    let namemodify,placemodify,datemodify,numbermodify;
    //     savebtn.onclick=() => {

    //         // inputForm.forEach((input) => {
    //         //     if(input.value!=""){

    //         //     }
    //         // })
    //         for(let i=0;i<inputForm.length;i++){

    //                 if(inputForm[i].value!=""){

    //                     inputindex=i;
    //                    if(inputindex==0){
    //                     namemodify=inputForm[i].value;
    //                     placemodify=arryofReservation;
    //                     datemodify=inputForm[i].value;
    //                     numbermodify=inputForm[i].value;



    //                    }
    //                    else if(inputindex==1){
    //                     placemodify=inputForm[i].value;
    //                    }
    //                    else if(inputindex==2){
    //                     datemodify=inputForm[i].value;
    //                 }
    //                 else{
    //                     numbermodify=inputForm[i].value;
    //                 }

    //                 }

    //         }
    //         AddReservationToArry(namemodify,placemodify,datemodify,numbermodify);
    //         AddElementToPageFrom(arryofReservation);  
    //         // make the input empty
    //         inputForm.forEach((input) => {
    //             input.value='';
    //         })

    //     }






  }
  // inputForm.forEach((input) => {
  //     input.value=arryofReservation[i];
  //  })
  // addelementtothelocalstorage(arryofReservation);
  // e.target.parentNode.remove();

}
  // if (ReservationContiner.childElementCount == 0) {
  //     noTaskMassage();
  // }

);



// //function to create no task massage
function noTaskMassage() {
  let nomassagespan = document.createElement('span');
  let textnomassage = document.createTextNode("No Reservation To Show");
  nomassagespan.appendChild(textnomassage);
  nomassagespan.className = 'no-Reservation-massage';
  ReservationContiner.appendChild(nomassagespan);
}





// ############ Start Backend ############
// Get All Tickets function
let get_all_tickets = async function () {

  fetch("http://127.0.0.1:8000/api/allTickets", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      }
    })
    .then((data) => {
      ReservationContiner.innerHTML = '';

      // insert data to body in table
      for (let index = 0; index < data.data.length; index++) {
        ReservationContiner.innerHTML += `
        <span class="Reservation-box">
          <span class="name">${data.data[ index ].name}</span>
          <span class="place">${data.data[ index ].place}</span>
          <span class="date">${data.data[ index ].date}</span>
          <span class="number">${data.data[ index ].num_members}</span>
          <span class="modify" onclick="show_edit_ticket(${data.data[ index ].id})">modify</span>
          <span class="delete" onclick="delete_ticket(${data.data[ index ].id})">X</span>
        </span>`;
      }
    });
};

let name_t = document.getElementById("name_t");
let place_t = document.getElementById("place_t");
let data_t = document.getElementById("data_t");
let num_members_t = document.getElementById("num_members_t");

// Start Save Reservation Or Ticket
let save_ticket = async function () {
  let data = {
    name: name_t.value,
    place: place_t.value,
    date: data_t.value,
    num_members: num_members_t.value,
  };

  fetch("http://127.0.0.1:8000/api/store", {
    method: "Post",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      }
    })
    .then((data) => {
      bookForm.classList.remove("active");
      get_all_tickets();
    });
}
get_all_tickets();

// Delete function
let delete_ticket = async function (id) {
  let data = {
    id: id
  };

  fetch("http://127.0.0.1:8000/api/delete", {
    method: "Post",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      }
    })
    .then((data) => {
      get_all_tickets();
    });
};

// update function
let id_edit_ticket;
function show_edit_ticket(id) {
  id_edit_ticket = id;
  // show edit ticket modal
  bookForm.classList.add("active");
  savebtn.classList.add("update");
  // Get Data Of Selected Ticket
  get_data_edit_ticket(id);
}

let update_ticket = async function () {
  let data = {
    id: id_edit_ticket,
    name: name_t.value,
    place: place_t.value,
    date: data_t.value,
    num_members: num_members_t.value,
  };

  fetch("http://127.0.0.1:8000/api/update", {
    method: "Post",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      }
    })
    .then((data) => {
      bookForm.classList.remove("active");
      get_all_tickets();
    });
};

let get_data_edit_ticket = async function (id) {
  let data = {
    id: id
  };

  fetch("http://127.0.0.1:8000/api/edit", {
    method: "Post",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      }
    })
    .then((data) => {
      name_t.value = data.data.name;
      place_t.value = data.data.place;
      data_t.value = data.data.date;
      num_members_t.value = data.data.num_members;
    });
};
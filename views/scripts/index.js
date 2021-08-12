const form = document.getElementById("contactForm");

//1.
const formEvent = form.addEventListener("submit", (event) => {
    event.preventDefault();

    //2.
    let mail = new FormData(form);

    //3.
    sendMail(mail);
})
const sendMail = (mail) => {
    //1.
    fetch("/send", {
        method: "post", //2.
        body: mail, //3.

    }).then((response) => {
        return response.json();
    });
};



// const form = document.getElementById("contactForm");

// //1.
// const formEvent = form.addEventListener("submit", (event) => {
//     event.preventDefault();

//     //2.
//     let mail = new FormData(form);

//     //3.
//     sendMail(mail);
// })
// const sendMail = (mail) => {
//     //1.
//     fetch("/send", {
//         method: "post", //2.
//         body: mail, //3.

//     }).then((response) => {
//         return response.json();
//     });
// };


// const contactForm = document.querySelector('.contact-form');

// let name = document.getElementById('name');
// let email = document.getElementById('email');
// let subject = document.getElementById('subject');
// let message = document.getElementById('message');

// contactForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     let formData = {
//         name: name.value,
//         email: email.value,
//         subject: subject.value,
//         message: message.value
//     }

//     let xhr = new XMLHttpRequest();
//     xhr.open('POST', '/');
//     xhr.setRequestHeader('content-type', 'application/json');
//     xhr.onload = function () {
//         console.log(xhr.responseText);
//         if (xhr.responseText == 'success') {
//             alert('Email sent')
//             name.value = '';
//             email.value = '';
//             subject.value = '';
//             message.value = '';
//         } else {
//             alert('Something went wrong!')
//         }
//     }

//     xhr.send(JSON.stringify(formData));

// });
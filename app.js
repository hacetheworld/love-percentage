// Get DOM Variables

const userBox = document.querySelector('.user');
const headline = document.querySelector('.headline');
const firstInput = document.querySelector('.input-1');
const lastInput = document.querySelector('.input-2');
const tagline = document.querySelector('.tagline');
const submitButton = document.querySelector('.submitBtn');
const inputBox = document.querySelector('.input-box');
const resultDiv = document.getElementById('results');
const message = document.querySelector('.message-1');
const formalMessage = document.querySelector('.message');
const userName = document.querySelector('.username');
const userSubmitButton = document.querySelector('.userSubmitButton');

// Add eventlitner to the buttton and enter key

submitButton.addEventListener('click', fetchDatafromUI);

document.addEventListener('keypress', function (e) {

    if (e.keyCode === 13) {
        fetchDatafromUI();
    }



})
// fetchDatafromUI function

function fetchDatafromUI() {

    // get values
    const firstName = firstInput.value.toString();
    const lastName = lastInput.value.toString();

    //hide values
    userBox.style.display = 'none';
    tagline.style.display = 'none';
    inputBox.style.display = 'none';
    resultDiv.style.display = 'flex'
    //validation

    if (firstName !== '' && lastName !== '') {

        getDataFromApi(firstName, lastName);
    }


}


// getDataFromApi

function getDataFromApi(firstName, lastName) {
    fetch(`https://love-calculator.p.rapidapi.com/getPercentage?fname=${firstName}&sname=${lastName}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "love-calculator.p.rapidapi.com",
                "x-rapidapi-key": "e9ee3480abmsh8316a7d6c5faaa1p1e4cfejsnf1e116733a70"
            }
        })
        .then(response => {
            return response.json();
        }).then(result => {
            showDataIntoUi(result);

        })
        .catch(err => {
            showError(err);


        });
}

//showDataIntoUi

function showDataIntoUi(result) {

    const percentage = result.percentage;


    if (percentage > 75) {
        message.textContent = `Congratulation,${userName.value}`;
        formalMessage.innerHTML = `${result.fname} ${result.sname} love's you <span> ${result.percentage}% </span> You have an amazing Choice ${userName.value}, Congratulation.`;
    } else if (percentage > 40 && percentage <= 75) {
        message.textContent = `Congratulation,${userName.value}`;
        formalMessage.innerHTML = `${result.fname} ${result.sname} love's you <span> ${result.percentage}% </span>. I Think You need to work on your Relationship , but you have an Good Choice , Congratulation.`;
    } else if (percentage > 25 && percentage <= 40) {
        message.textContent = `Hey,${userName.value}`;
        formalMessage.innerHTML = `${result.fname} ${result.sname} love's you <span> ${result.percentage}% </span>,Your relationship is in danger .  You Need to talk about it with ${result.fname} ${result.sname}.  Best Of Luck.`;
    } else {
        message.textContent = `Hey,${userName.value}`;
        formalMessage.innerHTML = `${result.fname} ${result.sname} love's you <span> ${result.percentage}% </span>,${result.fname} ${result.sname} is not interested in you. But don't feel bad you will find someone else, Best Of Luck.`;
    }

    setTimeout(() => {
        clearData();
    }, 10000);


}

//showError

function showError(error) {
    resultDiv.style.color = 'red';
    message.textContent = `Hey,${userName.value}`;
    formalMessage.innerHTML = `Please check your spelling mistake or try again thank you`;


    setTimeout(() => {
        clearData();

    }, 3000);
}

// Popup






userSubmitButton.addEventListener('click', function () {

    headline.textContent = `Welcome ${userName.value}`;
    document.getElementById('popup').style.display = 'none';
    document.getElementById('popup').style.visibility = 'hidden';


});



//console.log();

window.onload = function () {
    popup();

}

function popup() {
    document.getElementById('popup').style.display = 'flex';
}

// clearData

function clearData() {
    resultDiv.style.display = 'none';
    userBox.style.display = 'block';
    tagline.style.display = 'block';
    inputBox.style.display = 'flex';
    firstInput.value = '';
    lastInput.value = '';
    message.textContent = ``;
    formalMessage.textContent = ``;
    resultDiv.style.color = '';
}
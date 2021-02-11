
// DOM References
const form = document.getElementById('form');
const email = document.getElementById('email');
const spinnerWrapper = document.getElementById('container-spinner');
const grayWrapper = document.getElementById('container-gray');
const zeroWrapper = document.getElementById('container-zero');
const formTitle = document.querySelector('#form h1');
const formParagraph = document.querySelector('#form p');
const userWrapper = document.querySelector('#container-user');

// Fetch API
const fetchApi = (value) => {

    const ltvUrl = `https://ltv-data-api.herokuapp.com/api/v1/records.json?email=${value}`;

    fetch(ltvUrl)
        .then(resp => resp.json())
        .then((data) => renderUser(data))
        .catch((err) => {
            throw err
        })
}

// Handle email success
const handleSuccess = (email) => {
    const formControl = email.parentElement;
    formControl.className = ('form-control success');
    fetchApi(email.value);
}

// Handle email error msg
const handleError = (email, message) => {
    const formControl = email.parentElement;
    formControl.className = ('form-control error');
    const small = formControl.querySelector('small');
    small.innerText = message;
    email.style.border = '3px solid red';
}

// Check email is valid
const checkEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.value.trim())) {
        handleSuccess(email);
    } else {
        handleError(email, `Please add a valid email address`);
    }
}

// Run Basic Startup Process
const runSpinner = () => {
    spinnerWrapper.className = ('spinner show'); // makes spinner visible

    if (userWrapper.classList.contains('show')) {
        userWrapper.className = 'user'; // remove user modal
    } else if (zeroWrapper.classList.contains('show')) {
        zeroWrapper.className = 'zero-wrap'; // remove zero results modal
    } else if (grayWrapper) {
        grayWrapper.remove(); // Removes Article Section
    }

    formTitle.innerHTML = `Can’t Find The Right Person?`;
    formParagraph.innerHTML = `<span>Try Again</span> - Make a new search`;
}

// Give Telephone Numbers right format
let numbArr = [];
const getNumbers = (numbers) => {
    numbers.forEach(number => {
        let local = number.substring(0, 3);
        local = `(${local}) `;
        let num = number.substring(3, 6);
        num = `${num}-`;
        number = local + num + number.slice(6);
        numbArr.push(number);
    });
    return numbArr;
}

// Render the User HTML
const renderUser = ({ first_name, last_name, address, email, phone_numbers, relatives }) => {

    runSpinner();

    setTimeout(() => {
        if (first_name && last_name) {
            spinnerWrapper.className = ('spinner');

            const phoneNumber = getNumbers(phone_numbers);

            const result = `
                <h1>1 Result</h1>
                <p>Look at the result below to see the details of the person you're searched for.</p>
                <div class="user-info">
                    <div class="head-user">
                        <div class="avatar">
                            <img src="./assets/imgs/icn_person@2x.png" alt="">
                        </div>
                        <div class="name-info">
                            <h2>${first_name} ${last_name}, 35</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <div class="personal-info">
                        <div class="col-one">
                            <h3>Address</h3>
                            <p>${address}</p>
                            <h3>Email</h3>
                            <p>${email}</p>
                        </div>
                        <div class="col-two">
                            <h3>Phone Numbers</h3>
                            <ul>
                                <li>${phoneNumber[0]}</li>
                                <li>${phoneNumber[1]}</li>
                                <li>${phoneNumber[2]}</li>
                            </ul>
                            <h3>Relatives</h3>
                            <p>${relatives[0]}</br>
                            ${relatives[1]}</p>
                        </div>
                    </div>
                        </div>
                    </div>
                </div>`;

            userWrapper.innerHTML = result;
            userWrapper.className = ('user show');

        } else {
            spinnerWrapper.className = ('spinner');
            zeroWrapper.className = ('zero-wrap show');
        }
    }, 1200);
}

// Submit Event Listener
form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkEmail(email);
});

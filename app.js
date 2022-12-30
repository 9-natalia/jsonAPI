// LocalStorage
// const tokens = JSON.parse(localStorage.getItem())

const apiUrl = "http://localhost:8000/"

const inputService = document.querySelector('#inputService');
const buttonService = document.querySelector('#buttonService');

const resultRow = document.querySelector('#resultRow');
const headerRow = document.querySelector('#headerRow');

const buttonLogin = document.querySelector('#buttonLogin');
const buttonHome = document.querySelector('#buttonLogin');
const buttonPayment = document.querySelector('#buttonPayment');

const navHeader = `
    <nav class="navbar navbar-expand-lg navbar-light bg-white" >
        <div class="container">
            <button type="submit" class="btn btn-primary" id="buttonHome" onclick="homePay()">
                Inicio
            </button>
            <div class="collapse navbar-collapse" id="navbarScroll">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item dropdown">
                        <button class="btn btn-outline-success" type="button" id="buttonPayment" onclick="generateCardPay()">
                            Añadir nuevo pago
                        </button>
                    </li>
                    <li class="nav-item dropdown">
                        <button class="btn btn-outline-primary" type="button" id="buttonService" onclick="searchService()">
                            Servicios
                        </button>
                    </li>
                </ul>
                <form class="d-flex" role="search" style="width: 30%; margin: auto">
                    <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQwzxyZlRhGWRLVi2mOD50mBdPl7x4rYaPmviLHrJSbGJmBxaSw" class="rounded float-end" style="width: 50%; margin: auto">
                    <button class="btn btn-outline-warning" type="button" id="buttonSignOff" onclick="buttonSignOff()">
                        Cerrar Sesión
                    </button>
                </form>
            </div>
        </div>
    </nav>
`;

// buttonService.onclick = searchService();
async function searchService() {
    resultRow.innerHTML = "";
    try {
        const response = await fetch(
            apiUrl + "v2/servicios/"
        );
        const data = await response.json();
        console.log(data);
        if (data && data.length) {
            const services = data;
            services.forEach((service) => {
                resultRow.innerHTML += generateCard(service);
            });
        }
    } catch (error) {
        console.log(error);
    }
}

function generateCard(service) {
    return `
    <div class="col-12 col-sm-6 col-md-4">
        <div class="card" >
            <img src="${service.url_logo}" class="card-img-top" >
            <div class="card-body">
                <h5 class="card-title">${service.name}</h5>
                <p>${service.description}</p>
            </div>
        </div>
    </div>
    `;
};


// buttonLogin
buttonLogin.onclick = function(){
    homePay()
};


async function login(){
    resultRow.innerHTML = "";
    try {
        const response = await fetch(
            apiUrl + "v1/user/login/"
        );
        const data = await response.json();
        console.log(data);
        console.log(email);
        console.log(password);
        if (data && data.length) {
            const user = data;
            user.forEach((service) => {
                headerRow.innerHTML += navHeader;
                resultRow.innerHTML += cardPay(pay);
            });
        }
    } catch (error) {
        console.log(error);
    }
};

// buttonInicio
async function homePay(){
    resultRow.innerHTML = "";
    headerRow.innerHTML = "";
    try {
        const response = await fetch(
            apiUrl + "v2/pagos/"
        );
        const data = await response.json();
        console.log(data);
        if (data && data.length) {
            const payment = data;
            payment.forEach((pay) => {
                headerRow.innerHTML += navHeader;
                resultRow.innerHTML += cardPay(pay);
            });
        }
    } catch (error) {
        console.log(error);
    }
};

function cardPay(pay) {
    return `
    <div class="card" >
    <table class="table">
        <tr>
            <th scope="col">#</th>
            <th scope="col">${pay.service_name}</th>
            <th scope="col">${pay.paymentDate}</th>
            <th scope="col">${pay.amount}</th>
        </tr>
    </table>
    </div>
    `;
}

//buttonPayment = AddPayment()
// async function AddPayment(){
//     resultRow.innerHTML = "";
//     resultRow.innerHTML += generatePayment();
// };

function generatePayment(){
    return `
    <form>
    <div class="mb-3">
        <input type="password" class="form-control" id="" placeholder="ExpirationDate">
    </div>
    <div class="mb-3">
        <input type="password" class="form-control" id="" placeholder="Amount">
    </div>
    <select class="form-select" >
        <option selected>Select Service</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
    </select>
    <button type="submit" class="btn btn-primary m-sm-3">Añadir</button>
    </form>
    `;
}

function generateCardPay(){
    headerRow.innerHTML = "";
    headerRow.innerHTML += navHeader;
    resultRow.innerHTML = "";
    resultRow.innerHTML += generatePayment(); 
};


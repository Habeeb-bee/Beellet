'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Habeeb Irving',
  movements: [200, 4500000, -400, 30000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2023-11-18T21:31:17.178Z',
    '2023-12-23T07:42:02.383Z',
    '2023-01-28T09:15:04.904Z',
    '2023-04-01T10:17:24.185Z',
    '2023-10-20T14:11:59.604Z',
    '2023-10-27T17:01:17.194Z',
    '2023-10-25T23:36:17.929Z',
    '2023-10-26T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'ar-SA', // de-DE

};

const account2 = {
  owner: 'Ameen Bond',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2023-10-20T14:11:59.604Z',
    '2023-10-27T17:01:17.194Z',
    '2023-10-25T23:36:17.929Z',
    '2023-10-26T10:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-GB',

};

const account3 = {
  owner: 'Br G String',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',

};

const account4 = {
  owner: 'Sabith Gsquare ',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-GB',

};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const movementsContainer = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const movementDate = function (date, locale) {
const calcDaysPassed =  (date1, date2) =>
  Math.round(Math.abs(date2 - date1) / (1000 *60 * 60 *24));
  
const daysPassed = calcDaysPassed(new Date(), date); 


if (daysPassed == 0) {
  return 'Today'
}
if (daysPassed == 1) {
 return 'Yesterday'
}

if (daysPassed >= 2 && daysPassed < 7 ) {
 return `${daysPassed} days ago`
}
if (daysPassed == 7) {
 return 'A week ago'
}

 return new Intl.DateTimeFormat(locale).format(date) ;

 
}


const forCur = function (value, locale, currency ) {
  
  return  new Intl.NumberFormat(locale, {style: 'currency',
currency:currency}).format(value);
}



// Display Moves  //
const displayMoves = function (moves ,  sort = false) {

  movementsContainer.innerHTML= '';

  const mov = sort ? moves.movements.slice().sort( (a , b) => a-b) : moves.movements;

  mov.forEach( function (move, i) {
    const type = move > 0 ? 'deposit': 'withdrawal';

  
    const date = new Date(moves.movementsDates[i]);
    const displayDate = movementDate(date, moves.locale) ;
     
    const cur = forCur(move, moves.locale, moves.currency )
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value"> ${cur}</div>
  </div>` 


  movementsContainer.insertAdjacentHTML('afterbegin', html)
  });
  
}

  
const displayBalance = function (bal) {
  bal.balance = bal.movements.reduce(function (acc, cur) {
    return acc + cur
  },0);        
  labelBalance.textContent = forCur(bal.balance, bal.locale, bal.currency)

}


const displayIncome = function(income) {
  const incomes = income.movements.filter(function (income){return income>0}).reduce(function (mov, acc){return mov + acc},0)
  labelSumIn.textContent = forCur(incomes, income.locale, income.currency);
  }

 


const displayOut = function(out) {
  const outs = out.movements.filter(function (out){return out<0}).reduce(function (mov, acc){return mov+ acc},0)
  labelSumOut.textContent = forCur(outs, out.locale, out.currency);
  }



  
const displayInt = function(acc) {
  const ints = acc.movements
  .filter(function (int){return int>0})
  .map(function(int) {return (int * acc.interestRate)
    /100})
  .reduce(function (mov, acc){return mov+ acc},0)
  labelSumInterest.textContent = forCur(ints, acc.locale, acc.currency);

  console.log(`${Math.abs(ints)}€`);
  }




const username = function (acc) {
  acc.forEach(function (acc) {
    acc.name= acc.owner.toLowerCase().split(' ').map(function(use){return use[0]}).join(''); 
  })
}

username(accounts);
 

// Events ///////
let currentAccount;








btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); 
  currentAccount = 
  accounts.find( acc => acc.name === inputLoginUsername.value);


  if ( currentAccount ?.pin === Number(inputLoginPin.value) ) {

    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}`

    containerApp.style.opacity = 100;

    const now = new Date();
   const options = {
  hour : 'numeric',
  minute : 'numeric',
  day : 'numeric',
  weekday: 'short',
  month: 'numeric',
  year:'numeric'
};

  // const locale = navigator.language;

  labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);




    
  }


  inputLoginUsername.value = ''
  inputLoginPin.value = ''
  inputLoginPin.blur()

  
  displayMoves(currentAccount);
  displayBalance(currentAccount);
  displayIncome(currentAccount);
  displayInt(currentAccount); 
  displayOut(currentAccount); 
});


btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recievAcc =
    accounts.find( acc => acc.name === inputTransferTo.value);
  
  console.log(amount, recievAcc);
  

  if (amount >0 &&currentAccount.balance >= amount && recievAcc && recievAcc?.name !== currentAccount.name) {
     
      currentAccount.movements.push(-amount);
      recievAcc.movements.push(amount);

      
      currentAccount.movementsDates.push(new Date().toISOString());
      recievAcc.movementsDates.push(new Date().toISOString());

        
displayMoves(currentAccount);
displayBalance(currentAccount);
displayIncome(currentAccount);
displayInt(currentAccount); 
displayOut(currentAccount); 

  }


  
  inputTransferTo.value = ''
  inputTransferAmount.value = ''
  inputTransferAmount.blur()



});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault(); 

  const amount = Math.floor(inputLoanAmount.value);
  if( amount > 0 && currentAccount.movements.some ( mov => mov >= amount * 0.1 )) {
currentAccount.movements.push(amount);

currentAccount.movementsDates.push(new Date().toISOString());



displayMoves(currentAccount);
displayBalance(currentAccount);
displayIncome(currentAccount);
displayInt(currentAccount); 
displayOut(currentAccount); 
  }
  
  inputLoanAmount.value = '';
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
})



btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (inputCloseUsername.value === currentAccount.name && Number(inputClosePin.value) === currentAccount.pin ) {
    const index = accounts.findIndex(arr => arr.name === currentAccount.name);
    accounts.splice(index,1)
    containerApp.style.opacity = 0;
  }

  ;})

  let sorted = false;

  btnSort.addEventListener('click', function(e){
    e.preventDefault();
    displayMoves(currentAccount, !sorted);

    sorted = !sorted;
  })



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////




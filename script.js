document.getElementById("investment-form").addEventListener("submit", Calculate);


function Calculate(e) {
    e.preventDefault();

let initialInvest = parseFloat(document.getElementById("initial-investment").value);
let monthlyInvest = parseFloat(document.getElementById("monthly-contribution").value);
let interestRate = parseFloat(document.getElementById("annual-interest-rate").value);
let years = parseInt(document.getElementById("number-of-years").value, 10);

let platformFee = parseFloat(document.getElementById("platform-fee").value) || 0;

if (
    isNaN(initialInvest) ||
    isNaN(monthlyInvest) ||
    isNaN(interestRate) ||
    isNaN(years)
  ) {
    showErrorModal(
      "Invalid input. Please enter numeric values in all of the fields."
    );
    return;
  }

  let deposit = initialInvest;
  for (let i = 1; i <= years; i++) {
    deposit += monthlyInvest * 12;
}

let yearprofit = deposit*(interestRate /100);
deposit += yearprofit;

let totalPlatformFees = platformFee * years;

let userInvest = initialInvest + years * 12 * monthlyInvest;
let profit = deposit - userInvest;

displayResult(userInvest, deposit.toFixed(2), profit.toFixed(2), totalPlatformFees.toFixed(2));
}

function displayResult(userInvest, finalBalance, totalProfit,totalPlatformFees) {
    const yourInvestmentElement = document.getElementById("your-investment");
    const finalBalanceElement = document.getElementById("final-balance");
    const totalProfitElement = document.getElementById("total-profit");
    const platformFeesElement = document.getElementById("platform-fees");

 
    yourInvestmentElement.textContent = `Your Investment: ${userInvest}`;
    finalBalanceElement.textContent = `Final Balance: ${finalBalance}`;
    totalProfitElement.textContent = `Total Profit: ${totalProfit}`;
    platformFeesElement.textContent = `Platform Fees: ${totalPlatformFees}`;

    const resultModal = document.getElementById("result-modal");
    resultModal.style.display = "block";

    document.getElementById("close-result-modal").addEventListener("click", function () {
        resultModal.style.display = "none";
    });
}

function showErrorModal(message) {
    const errorModal = document.createElement("div");
    errorModal.className = "modal";
    errorModal.id = "error-modal";
    errorModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Error</h5>
                <button type="button" class="btn-close" id="close-error-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p id="error-message">${message}</p>
            </div> 
        </div>
    `;
    document.body.appendChild(errorModal);

    errorModal.style.display = "block";

    document.getElementById("close-error-modal").addEventListener("click", function () {
        errorModal.style.display = "none";
        document.body.removeChild(errorModal);
    });
}
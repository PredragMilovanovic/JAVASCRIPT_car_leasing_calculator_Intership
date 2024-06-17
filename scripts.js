// Wait for the DOM content to load before executing JavaScript
document.addEventListener('DOMContentLoaded', () => {
	// Selecting necessary elements from the DOM
    const carTypeSelect = document.getElementById('car-type');
    const carValueInput = document.getElementById('car-value');
    const carValueRange = document.getElementById('car-value-range');
    const leasePeriodInput = document.getElementById('lease-period');
    const downPaymentInput = document.getElementById('down-payment');
    const downPaymentRange = document.getElementById('down-payment-range');

    const leasingCostElement = document.getElementById('leasing-cost');
    const downPaymentAmountElement = document.getElementById('down-payment-amount');
    const downPaymentPercentElement = document.getElementById('down-payment-percent');
    const monthlyInstallmentElement = document.getElementById('monthly-installment');
    const interestRateElement = document.getElementById('interest-rate');

// Function to update the leasing calculator based on user input
    const updateLeasingCalculator = () => {
		// Retrieve values from input elements
        const carType = carTypeSelect.value;
        const carValue = parseFloat(carValueInput.value);
        const leasePeriod = parseInt(leasePeriodInput.value);
        const downPaymentPercent = parseInt(downPaymentInput.value);
		
// Calculate down payment amount and remaining car value
        const downPayment = carValue * (downPaymentPercent / 100);
        const remainingValue = carValue - downPayment;
// Determine annual interest rate based on car type
        const annualInterestRate = carType === 'new' ? 2.99 : 3.7;
        const monthlyInterestRate = annualInterestRate / 12 / 100;
        const numberOfPayments = leasePeriod;

 // Calculate the monthly installment using the formula for an annuity
        const monthlyInstallment = (remainingValue * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
 // Calculate total leasing cost     
	 const leasingCost = (monthlyInstallment * numberOfPayments) + downPayment;
 // Update DOM elements with calculated values
        leasingCostElement.textContent = leasingCost.toFixed(2);
        downPaymentAmountElement.textContent = downPayment.toFixed(2);
        downPaymentPercentElement.textContent = downPaymentPercent;
        monthlyInstallmentElement.textContent = monthlyInstallment.toFixed(2);
        interestRateElement.textContent = annualInterestRate.toFixed(2);
    };
 // Event listeners to update the calculator when input values change
    carValueInput.addEventListener('input', () => {
        carValueRange.value = carValueInput.value;
        updateLeasingCalculator();
    });
    
    carValueRange.addEventListener('input', () => {
        carValueInput.value = carValueRange.value;
        updateLeasingCalculator();
    });

    leasePeriodInput.addEventListener('input', updateLeasingCalculator);
    
    downPaymentInput.addEventListener('input', () => {
        downPaymentRange.value = downPaymentInput.value;
        updateLeasingCalculator();
    });

    downPaymentRange.addEventListener('input', () => {
        downPaymentInput.value = downPaymentRange.value;
        updateLeasingCalculator();
    });
    
    carTypeSelect.addEventListener('change', updateLeasingCalculator);

    // Initial calculation
    updateLeasingCalculator();
});
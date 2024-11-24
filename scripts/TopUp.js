const expYearSelect = document.getElementById('expYear');
const currentYear = new Date().getFullYear();

for (let year = 2022; year <= 2042; year++) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    expYearSelect.appendChild(option);
}

document.getElementById('payment-btn').addEventListener('click', function (event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const district = document.getElementById('district').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const expMonth = document.getElementById('expMonth').value;
    const expYear = document.getElementById('expYear').value;
    const cvv = document.getElementById('cvv').value;

    // Kiểm tra thông tin đầy đủ
    if (!fullName || !email || !address || !city || !district || !cardNumber || !expMonth || !expYear || !cvv) {
        const errorPopup = document.getElementById('error-popup');
        errorPopup.style.display = 'block';
        setTimeout(() => {
            errorPopup.style.display = 'none';
        }, 4000);
        return;
    }

    // Hiển thị popup xác nhận thanh toán
    const confirmPopup = document.getElementById('payment-confirmation');
    confirmPopup.style.display = 'flex';

    let countdown = 3;
    const countdownElement = document.getElementById('countdown');
    const confirmButton = document.getElementById('confirm-payment');
    const cancelButton = document.getElementById('cancel-payment');

    const interval = setInterval(() => {
        countdownElement.textContent = `Đếm ngược: ${countdown}`;
        if (countdown <= 0) {
            clearInterval(interval);
            countdownElement.textContent = '';
            confirmButton.style.display = 'inline-block';
        }
        countdown--;
    }, 1000);

    cancelButton.addEventListener('click', () => {
        confirmPopup.style.display = 'none';
    });

    confirmButton.addEventListener('click', () => {
        const popup = document.getElementById('payment-popup');
        popup.style.display = 'flex';

        let progress = 0;
        const progressBar = document.getElementById('payment-progress');
        const completeButton = document.getElementById('complete-payment');

        const paymentInterval = setInterval(() => {
            progress += 10;
            progressBar.style.width = `${progress}%`;
            progressBar.setAttribute('aria-valuenow', progress);

            if (progress >= 100) {
                clearInterval(paymentInterval);
                completeButton.style.display = 'inline-block';
            }
        }, 500);

        completeButton.addEventListener('click', function () {
            const paymentAmountElement = document.getElementById('paymentAmount');
            
            // Kiểm tra xem phần tử paymentAmount có tồn tại hay không
            if (paymentAmountElement) {
                const paymentValue = paymentAmountElement.value; // Lấy giá trị thanh toán
                let currentBalance = localStorage.getItem('balance') ? parseInt(localStorage.getItem('balance')) : 0;
                currentBalance += parseInt(paymentValue); // Cộng thêm số tiền thanh toán vào số dư hiện tại
        
                // Lưu lại số dư mới vào localStorage
                localStorage.setItem('balance', currentBalance);
        
                // Điều hướng về trang index.html
                window.location.href = 'index.html';
            } else {
                console.error('Không tìm thấy phần tử #paymentAmount');
            }
        });
    });
});

// Kiểm tra giá trị thanh toán từ localStorage và hiển thị trong header khi vào trang index.html
if (window.location.href.indexOf("index.html") > -1) {
    const paymentValue = localStorage.getItem('paymentValue');
    if (paymentValue) {
        const balanceElement = document.getElementById('balance');
        
        // Kiểm tra xem phần tử #balance có tồn tại không
        if (balanceElement) {
            balanceElement.textContent = `Số dư: ${paymentValue}`;
        } else {
            console.error('Không tìm thấy phần tử #balance trong index.html');
        }

        // Xóa giá trị thanh toán sau khi hiển thị
        localStorage.removeItem('paymentValue');
    }
}

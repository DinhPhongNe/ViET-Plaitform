class Header {
    constructor() {
        this.logo = 'images/logo.png';
        this.menuItems = [
            { name: 'Trang chủ', link: 'index.html', isCurrent: true },
            { name: 'Trang', link: '#', subMenu: [
                { name: 'Liên hệ', link: 'contact.html' },
                { name: 'Hồ sơ của bạn', link: 'resume-page.html' },
                { name: 'Chăm sóc khách hàng', link: 'customer_services.html' },
                { name: 'Bảng gói kế hoạch', link: 'pricing-tables.html' },
                { name: 'Hướng dẫn sử dụng', link: 'tutorialPage.html' },
                { name: 'Blog', link: 'blog.html' }
            ]},
            { name: 'Cho học viên', link: '#', subMenu: [
                { name: 'Tìm gia sư', link: 'browse-jobs.html' },
                { name: 'Tìm môn học', link: 'browse-categories.html' },
                { name: 'Vào học cùng gia sư', link: 'join_call.html' }
            ]},
            { name: 'Cho gia sư', link: '#', subMenu: [
                { name: 'Thêm việc làm', link: 'add-job.html' },
                { name: 'Quản lý học viên', link: 'manage-applications.html' }
            ]},
            { name: 'Số dư', link: '#', subMenu: [
                { name: 'Nạp thêm tiền', link: 'TopUp.html' },
                { name: 'Số dư còn lại: ', id: 'balance-display', link: '404.html' }
            ]},
        ];
        this.loginLinks = [
            { icon: 'fa-user', text: 'Đăng ký', link: 'my-account.html#tab2' },
            { icon: 'fa-lock', text: 'Đăng nhập', link: 'my-account.html' }
        ];
    }

    renderLogo() {
        return `
            <div id="logo">
                <h1>
                    <a href="index.html">
                        <img src="${this.logo}" alt="ViET" />
                    </a>
                </h1>
            </div>
        `;
    }

    renderMenu() {
        let menuHTML = `<ul id="responsive">`;

        this.menuItems.forEach(item => {
            if (item.subMenu) {
                menuHTML += `
                    <li>
                        <a href="${item.link}">${item.name}</a>
                        <ul>
                            ${item.subMenu.map(sub => `
                                <li><a href="${sub.link}" id="${sub.id || ''}">${sub.name}</a></li>
                            `).join('')}
                        </ul>
                    </li>
                `;
            } else {
                menuHTML += `
                    <li><a href="${item.link}" ${item.isCurrent ? 'id="current"' : ''}>${item.name}</a></li>
                `;
            }
        });

        menuHTML += `</ul>`;
        return menuHTML;
    }

    renderLoginLinks() {
        return `
            <ul class="float-right">
                ${this.loginLinks.map(link => `
                    <li><a href="${link.link}"><i class="fa ${link.icon}"></i> ${link.text}</a></li>
                `).join('')}
            </ul>
        `;
    }

    renderMobileNavigation() {
        return `
            <div id="mobile-navigation">
                <a href="#menu" class="menu-trigger"><i class="fa fa-reorder"></i> Menu</a>
            </div>
        `;
    }

    // Hàm cập nhật số dư hiển thị trên menu
    updateBalanceDisplay(balance) {
        const balanceElement = document.getElementById('balance-display');
        if (balanceElement) {
            // Dùng Intl.NumberFormat để format số tiền
            const formattedBalance = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(balance);
            balanceElement.textContent = `Số dư còn lại: ${formattedBalance}`;
        }
    }
    

    render() {
        const headerContainer = document.getElementById('header-container');
        headerContainer.innerHTML = `
            <div class="container">
                <div class="sixteen columns">
                    ${this.renderLogo()}
                    <nav id="navigation" class="menu">
                        ${this.renderMenu()}
                        ${this.renderLoginLinks()}
                    </nav>
                    ${this.renderMobileNavigation()}
                </div>
            </div>
        `;
    
        // Cập nhật số dư khi load trang
        const balance = localStorage.getItem('balance') ? parseInt(localStorage.getItem('balance')) : 0;
        this.updateBalanceDisplay(balance); // Hiển thị số dư đã cộng vào
    }
}

// Khởi tạo và render Header
const header = new Header();
header.render();

// // Lưu số dư sau khi thanh toán
// const paymentAmount = 1000; // Ví dụ: người dùng thanh toán 1000 VND
// let currentBalance = localStorage.getItem('balance') ? parseInt(localStorage.getItem('balance')) : 0;
// currentBalance += paymentAmount; // Cộng thêm số tiền thanh toán vào số dư hiện tại

// // Lưu lại số dư mới vào localStorage
// localStorage.setItem('balance', currentBalance);
class Header {
    constructor() {
        this.logo = 'images/logo.png';
        this.menuItems = [
            { name: 'Trang chủ', link: 'index.html', isCurrent: true },
            { name: 'Trang', link: '#', subMenu: [
                { name: 'Liên hệ', link: 'contact.html' },
                { name: 'Hồ sơ của bạn', link: 'resume-page.html', id: 'forceLogin'},
                { name: 'Chăm sóc khách hàng', link: 'customer_services.html', id: 'forceLogin' },
                { name: 'Hướng dẫn sử dụng', link: 'tutorialPage.html' },
                { name: 'Blog', link: 'blog.html', id: 'forceLogin'}
            ]},
            { name: 'Học viên', link: '#', subMenu: [
                { name: 'Tìm gia sư', link: 'browse-jobs.html' },
                { name: 'Tìm môn học', link: 'browse-categories.html' },
                { name: 'Vào học cùng gia sư', link: 'join_call.html', id: 'forceLogin' }
            ]},
            { name: 'Gia sư', link: '#', subMenu: [
                { name: 'Thêm việc làm', link: 'add-job.html', id: 'forceLogin' },
                { name: 'Quản lý học viên', link: 'manage-applications.html', id: 'forceLogin' }
            ]},
            { name: 'Số giờ học', link: '#', subMenu: [
                { name: 'Nạp thêm giờ học', link: 'TopUp.html', id: 'forceLogin' },
                { name: 'Số giờ còn lại: ', id: 'lesson-balance-display', link: '404.html' }
            ]},
        ];
        this.loginLinks = [
            { icon: 'fa-user', text: 'Đăng ký', link: 'my-account.html#tab2' },
            { icon: 'fa-lock', text: 'Đăng nhập', link: 'my-account.html' }
        ];

        // Đơn giá tính giờ học (200k/h)
        this.lessonRate = 200000;

        // Khởi tạo lessonHours trong localStorage nếu chưa có
        if (localStorage.getItem('lessonHours') === null) {
            localStorage.setItem('lessonHours', 0);
        }
        // Khởi tạo balance trong localStorage nếu chưa có
        if (localStorage.getItem('balance') === null) {
            localStorage.setItem('balance', 0);
        }
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
        let menuHTML = '<ul id="responsive">';

        this.menuItems.forEach(item => {
            if (item.subMenu) {
                menuHTML += `
                    <li>
                        <a href="${item.link}">${item.name}</a>
                        <ul>
                            ${item.subMenu.map(sub => 
                                `<li><a href="${sub.link}" id="${sub.id || ''}">${sub.name}</a></li>`
                            ).join('')}
                        </ul>
                    </li>
                `;
            } else {
                menuHTML += `
                    <li><a href="${item.link}" ${item.isCurrent ? 'id="current"' : ''}>${item.name}</a></li>
                `;
            }
        });

        menuHTML += '</ul>';
        return menuHTML;
    }

    renderLoginLinks() {
        return `
            <ul class="float-right">
                ${this.loginLinks.map(link => 
                    `<li><a href="${link.link}"><i class="fa ${link.icon}"></i> ${link.text}</a></li>`
                ).join('')}
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

    // Hàm cập nhật số giờ học hiển thị trên menu
    updateLessonBalanceDisplay() {
        const balanceElement = document.getElementById('lesson-balance-display');
        const lessonHours = localStorage.getItem('lessonHours');
        if (balanceElement) {
            balanceElement.textContent = `Số giờ còn lại: ${lessonHours} giờ`;
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
    
        // Cập nhật số giờ học khi load trang
        this.updateLessonBalanceDisplay();
    }

    // Hàm nạp thêm giờ học
    addLessons(amount) {
        let currentBalance = parseInt(localStorage.getItem('balance')) || 0;

        // Cộng dồn số tiền nạp vào balance
        currentBalance += amount;
        localStorage.setItem('balance', currentBalance);

        // Tính số giờ học từ số tiền đã nạp và lưu lại
        const lessonHours = Math.floor(currentBalance / this.lessonRate);
        localStorage.setItem('lessonHours', lessonHours);

        // Cập nhật hiển thị
        this.updateLessonBalanceDisplay();
    }

    // Hàm tự động trừ giờ học mỗi tháng (ví dụ: 8 giờ/tháng)
    deductMonthlyLessons() {
        const monthlyHours = 8;
        let currentHours = localStorage.getItem('lessonHours') ? parseInt(localStorage.getItem('lessonHours')) : 0;

        if (currentHours >= monthlyHours) {
            currentHours -= monthlyHours;
            localStorage.setItem('lessonHours', currentHours);
            this.updateLessonBalanceDisplay();
        } else {
            console.warn('Không đủ giờ học để trừ!');
        }
    }
}

// Khởi tạo và render Header
const header = new Header();
header.render();

// Ví dụ nạp thêm giờ học (nạp 5 triệu -> 25 giờ)
// header.addLessons(5000000);

// Ví dụ trừ giờ học mỗi tháng
// header.deductMonthlyLessons();

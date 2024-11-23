// Class Header sẽ quản lý tất cả các phần của header
class Header {
    constructor() {
        this.logo = 'images/logo.png';
        this.menuItems = [
            { name: 'Trang chủ', link: 'index.html', isCurrent: true },
            { name: 'Trang', link: '#', subMenu: [
                { name: 'Hồ sơ của bạn', link: 'resume-page.html' },
                { name: 'Bảng gói kế hoạch', link: 'pricing-tables.html' },
                { name: 'Liên hệ', link: 'contact.html' }
            ]},
            { name: 'Cho học viên', link: '#', subMenu: [
                { name: 'Tìm gia sư', link: 'browse-jobs.html' },
                { name: 'Tìm môn học', link: 'browse-categories.html' },
            ]},
            { name: 'Cho gia sư', link: '#', subMenu: [
                { name: 'Thêm việc làm', link: 'add-job.html' },
                { name: 'Quản lý học viên', link: 'manage-applications.html' }
            ]},
            { name: 'Blog', link: 'blog.html' }
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
                                <li><a href="${sub.link}">${sub.name}</a></li>
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
    }
}

// Khởi tạo và render Header
const header = new Header();
header.render();

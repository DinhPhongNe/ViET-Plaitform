class Footer {
    constructor() {
        this.sections = [
            {
                title: "Giới thiệu",
                content: "Chúng tôi cam kết mang đến giải pháp tốt nhất cho bạn. Với đội ngũ chuyên nghiệp và nền tảng hiện đại, chúng tôi luôn đồng hành cùng bạn trên con đường phát triển.",
                buttonText: "Bắt đầu ngay",
                buttonLink: "#",
                id: 'forceLogin'
            },
            {
                title: "Công ty",
                links: [
                    { name: "Về chúng tôi", link: "#" },
                    { name: "Tuyển dụng", link: "#" },
                    { name: "Blog", link: "#" },
                    { name: "Điều khoản dịch vụ", link: "#" },
                    { name: "Chính sách bảo mật", link: "#" },
                    { name: "Cổng thông tin tuyển dụng", link: "#" }
                ]
            },
            {
                title: "Truyền thông",
                links: [
                    { name: "Tin tức", link: "#" },
                    { name: "Thông cáo báo chí", link: "#" },
                    { name: "Giải thưởng", link: "#" },
                    { name: "Phản hồi từ khách hàng", link: "#" },
                    { name: "Cột mốc phát triển", link: "#" }
                ]
            },
            {
                title: "Khám phá",
                links: [
                    { name: "Gia sư theo danh mục", link: "#" },
                    { name: "Gia sư tại thành phố Hồ Chí Minh", link: "#" },
                    { name: "Gia sư tại thành phố Hà Nội", link: "#" },
                    { name: "Gia sư tại thành phố Đà Nẵng", link: "#" },
                    { name: "Gia sư tại thành phố Hải Phòng", link: "#" },
                    { name: "Tìm việc làm", link: "#" }
                ]
            }
        ];
        
        this.socialLinks = [
            { platform: "facebook", icon: "fa-facebook", link: "#" },
            { platform: "youtube", icon: "fa-youtube", link: "#" },
            { platform: "instagram", icon: "fa-instagram", link: "#" },
            { platform: "github", icon: "fa-github", link: "#" }
        ];

        this.copyright = "© Copyright 2024 by <a href='#'>ViET Platform</a>. All Rights Reserved.";
    }

    renderSection(section) {
        let sectionHTML = `<div class="four columns">
            <h4>${section.title}</h4>`;
        
        if (section.content) {
            sectionHTML += `<p>${section.content}</p>`;
            sectionHTML += `<a href="${section.buttonLink}" class="button">${section.buttonText}</a>`;
        } else if (section.links) {
            sectionHTML += `<ul class="footer-links">`;
            section.links.forEach(link => {
                sectionHTML += `<li><a href="${link.link}">${link.name}</a></li>`;
            });
            sectionHTML += `</ul>`;
        }
        sectionHTML += `</div>`;
        return sectionHTML;
    }

    renderSocialLinks() {
        return `
            <ul class="social-icons">
                ${this.socialLinks.map(link => `
                    <li>
                        <a class="${link.platform}" href="${link.link}">
                            <i class="fa ${link.icon}"></i>
                        </a>
                    </li>
                `).join('')}
            </ul>
        `;
    }

    render() {
        const footerContainer = document.getElementById('footer-container');
        footerContainer.innerHTML = `
            <!-- Main -->
            <div id="footer">
                <div class="container">
                    ${this.sections.map(section => this.renderSection(section)).join('')}
                </div>
            </div>

            <!-- Bottom -->
            <div class="container">
                <div class="footer-bottom">
                    <div class="sixteen columns">
                        <h4>Theo dõi chúng tôi tại</h4>
                        ${this.renderSocialLinks()}
                        <div class="copyrights">
                            ${this.copyright}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

const footer = new Footer();
footer.render();

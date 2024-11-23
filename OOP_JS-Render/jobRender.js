class Job {
    constructor(avatar_img, title, field_name, pricePerHour, description, link) {
        this.avatar_img = avatar_img;
        this.title = title;
        this.field_name = field_name;
        this.pricePerHour = pricePerHour;
        this.description = description;
        this.link = link;
    }

    renderJobItem() {
        return `
            <li>
                <a href="${this.link}">
                    <img src="${this.avatar_img}" alt="${this.title}" />
                    <div class="job-list-content">
                        <h4>${this.title} <span class="full-time">Full-Time</span></h4>
                        <div class="job-icons">
                            <span><i class="fa-solid fa-user"></i>${this.field_name}</span>
                            <span><i class="fa fa-money"></i> ${this.pricePerHour} / giờ</span>
                        </div>
                        <p>${this.description}</p>
                    </div>
                </a>
                <div class="clearfix"></div>
            </li>
        `;
    }
}

class JobList {
    constructor(jobsData) {
        this.jobs = jobsData.map(jobData => new Job(
            jobData.avatar_img,
            jobData.title,
            jobData.field_name,
            jobData.pricePerHour,
            jobData.description,
            jobData.link
        ));
    }

    renderJobList() {
        return this.jobs.map(job => job.renderJobItem()).join('');
    }

    renderSearchForm() {
        return `
            <form action="#" method="get" class="list-search">
                <button><i class="fa fa-search"></i></button>
                <input type="text" placeholder="job title, keywords or company name" value="" />
                <div class="clearfix"></div>
            </form>
        `;
    }

    renderPagination() {
        return `
            <div class="pagination-container">
                <nav class="pagination">
                    <ul>
                        <li><a href="#" class="current-page">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li class="blank">...</li>
                        <li><a href="#">22</a></li>
                    </ul>
                </nav>
                <nav class="pagination-next-prev">
                    <ul>
                        <li><a href="#" class="prev">Previous</a></li>
                        <li><a href="#" class="next">Next</a></li>
                    </ul>
                </nav>
            </div>
        `;
    }

    render() {
        // Chỉ cập nhật phần danh sách công việc
        const jobListContainer = document.getElementById('job-list-container');
        jobListContainer.innerHTML = `
            ${this.renderSearchForm()}
            <ul class="job-list full">
                ${this.renderJobList()}
            </ul>
            <div class="clearfix"></div>
            ${this.renderPagination()}
        `;
    }
}

// Dữ liệu việc làm được thêm trực tiếp vào trong script
const jobData = [
    {
        "avatar_img": "images/job-list-logo-01.png",
        "title": "Marketing Coordinator - SEO / SEM Experience",
        "field_name": "Nguyen Van A",
        "pricePerHour": "150.000₫",
        "description": "The SEO/SEM Specialist will work with industry leaders and top retailers to define and deliver best practices through innovative SEO methodologies.",
        "link": "job-page.html"
    },
    {
        "avatar_img": "images/job-list-logo-01.png",
        "title": "Web Developer",
        "field_name": "Nguyen Thi B",
        "pricePerHour": "200.000₫",
        "description": "Looking for a web developer to join our team for front-end and back-end development.",
        "link": "job-page.html"
    }
];

// Khởi tạo và hiển thị danh sách công việc
const jobList = new JobList(jobData);
jobList.render();

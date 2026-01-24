// CV Loader - Loads language data and components
(async function() {
    // Get language from URL parameter or default to 'de'
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang') || 'de';

    // Get base path (for cv.html in root)
    const basePath = window.location.pathname.includes('/cv.html') ? '.' : '';

    try {
        // Load language data
        const response = await fetch(`${basePath}/data/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load ${lang}.json: ${response.status}`);
        }
        const data = await response.json();

        // Create language switcher directly (no need for component file)
        const switcherHTML = `
            <div class="language-switcher">
                <a href="cv.html?lang=en" data-lang="en" ${lang === 'en' ? 'class="active"' : ''}>EN</a>
                <span class="separator">/</span>
                <a href="cv.html?lang=de" data-lang="de" ${lang === 'de' ? 'class="active"' : ''}>DE</a>
            </div>
        `;
        document.getElementById('language-switcher-container').innerHTML = switcherHTML;

        // Update page title and lang attribute
        document.title = data.meta.title;
        document.documentElement.lang = data.meta.lang;

        // Populate header
        document.getElementById('name').textContent = data.header.name;
        document.getElementById('portfolio-label').textContent = data.header.portfolioLabel;
        document.getElementById('portfolio-text').textContent = data.header.portfolio;
        document.getElementById('portfolio-link').href = data.header.portfolioUrl;
        document.getElementById('location-label').textContent = data.header.locationLabel;
        document.getElementById('location').textContent = data.header.location;
        document.getElementById('phone-label').textContent = data.header.phoneLabel;
        document.getElementById('phone').textContent = data.header.phone;
        document.getElementById('email-label').textContent = data.header.emailLabel;
        document.getElementById('email').textContent = data.header.email;
        document.getElementById('linkedin-label').textContent = data.header.linkedinLabel;
        document.getElementById('linkedin-text').textContent = data.header.linkedin;
        document.getElementById('linkedin-link').href = data.header.linkedinUrl;
        document.getElementById('xing-label').textContent = data.header.xingLabel;
        document.getElementById('xing-text').textContent = data.header.xing;
        document.getElementById('xing-link').href = data.header.xingUrl;
        document.getElementById('github-label').textContent = data.header.githubLabel;
        document.getElementById('github-text').textContent = data.header.github;
        document.getElementById('github-link').href = data.header.githubUrl;

        // Populate skills
        document.getElementById('skills-title').textContent = data.skills.title;
        const skillsList = document.getElementById('skills-list');
        skillsList.innerHTML = data.skills.items.map(item =>
            `<li><strong>${item.category}</strong> ${item.skills}</li>`
        ).join('');

        // Populate additional info
        document.getElementById('additional-info-title').textContent = data.additionalInfo.title;
        document.getElementById('languages-label').textContent = data.additionalInfo.languages;
        document.getElementById('languages-list').textContent = data.additionalInfo.languagesList;

        // Populate summary
        document.getElementById('summary-title').textContent = data.summary.title;
        document.getElementById('summary-text').textContent = data.summary.text;

        // Populate experience
        document.getElementById('experience-title').textContent = data.experience.title;
        const experienceContainer = document.getElementById('experience-container');
        experienceContainer.innerHTML = data.experience.jobs.map((job, index) => `
            <h3>${job.title}</h3>
            <p><strong>${job.company}</strong>${job.location ? ', ' + job.location : ''} — ${job.period}</p>
            <ul>
                ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
            </ul>
            ${index < data.experience.jobs.length - 1 ? '' : ''}
        `).join('');

        // Populate education
        document.getElementById('education-title').textContent = data.education.title;
        const educationContainer = document.getElementById('education-container');
        educationContainer.innerHTML = data.education.items.map(item => `
            <p><strong>${item.degree}</strong></p>
            <p>${item.school} — ${item.period}</p>
        `).join('');

        // Populate projects
        document.getElementById('projects-title').textContent = data.projects.title;
        const projectsContainer = document.getElementById('projects-container');
        projectsContainer.innerHTML = data.projects.items.map(project => `
            <h3>${project.name}</h3>
            <p class="justify">${project.description}</p>
            <p><strong>Link:</strong>
                <a href="${project.link}">${project.linkText}</a>${project.link2 ? ', <a href="' + project.link2 + '">' + project.linkText2 + '</a>' : ''}
            </p>
        `).join('');

    } catch (error) {
        console.error('Error loading CV data:', error);
        // Show error to user
        document.body.innerHTML += `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #f44336; color: white; padding: 20px; border-radius: 8px; text-align: center;">
                <h2>Error loading CV</h2>
                <p>Failed to load language data. Please check the console for details.</p>
                <p>Error: ${error.message}</p>
            </div>
        `;
    }
})();

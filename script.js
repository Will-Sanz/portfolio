document.addEventListener('DOMContentLoaded', () => {
    const projects = [
        {
            title: 'Project One',
            description: 'An awesome project that does amazing things.',
            link: '#'
        },
        {
            title: 'Project Two',
            description: 'Another cool project with interesting features.',
            link: '#'
        }
    ];

    const projectList = document.getElementById('project-list');
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank">View</a>
        `;
        projectList.appendChild(card);
    });
});

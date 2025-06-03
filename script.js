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

    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalLink = document.getElementById('modal-link');
    const closeButton = document.querySelector('.close-button');

    const projectList = document.getElementById('project-list');
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <button class="view-project">View</button>
        `;
        card.querySelector('.view-project').addEventListener('click', () => {
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            modalLink.href = project.link;
            modal.classList.remove('hidden');
        });
        projectList.appendChild(card);
    });

    closeButton.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
});

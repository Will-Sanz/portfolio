document.addEventListener('DOMContentLoaded', () => {
    const projects = [
        {
            title: 'Project One',
            description: 'An awesome project that does amazing things.',
            link: '#',
            image: 'https://via.placeholder.com/300x200'
        },
        {
            title: 'Project Two',
            description: 'Another cool project with interesting features.',
            link: '#',
            image: 'https://via.placeholder.com/300x200'
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
            <img src="${project.image}" alt="${project.title}">
            <div class="card-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <button class="view-project">View</button>
            </div>
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

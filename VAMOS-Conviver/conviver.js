
document.addEventListener('DOMContentLoaded', () => {
    // ---------- Dados do Modal ----------
    const modalData = {
        amizade: {
            title: 'Amizade',
            icon: '👥',
            content: `
                <p>Os amigos são muitas vezes a primeira pessoa a quem recorremos quando precisamos de apoio emocional.</p>
                <h3>Porque é importante?</h3>
                <ul>
                    <li>Criam um espaço seguro para partilhar sentimentos</li>
                    <li>Ajudam a reduzir o isolamento</li>
                    <li>Podem identificar mudanças no teu comportamento</li>
                    <li>Oferecem apoio prático e emocional</li>
                </ul>
                <h3>Como pedir ajuda a um amigo?</h3>
                <ul>
                    <li>“Posso falar contigo sobre uma coisa que me está a preocupar?”</li>
                    <li>“Sinto-me um pouco perdido últimamente, podes ouvir-me?”</li>
                </ul>
                <p><strong>Dica:</strong> Escolhe um momento calmo e um local onde se sintam confortáveis.</p>
            `
        },
        familia: {
            title: 'Família',
            icon: '🏠',
            content: `
                <p>A família pode ser uma das redes de apoio mais fortes, mesmo quando nem sempre é fácil falar abertamente.</p>
                <h3>Vantagens</h3>
                <ul>
                    <li>Conhecem-te há mais tempo</li>
                    <li>Normalmente querem o teu bem</li>
                    <li>Podem ajudar a procurar recursos profissionais</li>
                </ul>
                <h3>Como abordar a conversa?</h3>
                <ul>
                    <li>Escolhe um momento em que estejam disponíveis e calmos</li>
                    <li>Começa com frases simples: “Preciso de falar convosco sobre algo importante”</li>
                    <li>Não precisas de contar tudo de uma vez</li>
                </ul>
                <p><strong>Nota:</strong> Se a comunicação em casa for difícil, podes começar por um professor ou profissional da escola.</p>
            `
        },
        professores: {
            title: 'Professores',
            icon: '📚',
            content: `
                <p>Os professores passam muito tempo contigo e estão atentos a mudanças de comportamento, rendimento ou humor.</p>
                <h3>Como podem ajudar?</h3>
                <ul>
                    <li>Ouvir-te de forma confidencial</li>
                    <li>Ajustar expectativas académicas se necessário</li>
                    <li>Encaminhar-te para os serviços de psicologia ou orientação</li>
                    <li>Mediar situações difíceis na escola</li>
                </ul>
                <h3>Como pedir ajuda?</h3>
                <ul>
                    <li>Pede para falar a sós no final da aula ou no intervalo</li>
                    <li>“Professor(a), posso falar consigo sobre uma situação pessoal?”</li>
                </ul>
                <p><strong>Lembra-te:</strong> A maioria dos professores prefere que fales do que fiques a sofrer em silêncio.</p>
            `
        },
        profissionais: {
            title: 'Profissionais da Escola',
            icon: '🩺',
            content: `
                <p>Psicólogos escolares, orientadores educativos e outros profissionais estão especificamente preparados para te apoiar.</p>
                <h3>O que fazem?</h3>
                <ul>
                    <li>Escuta ativa e confidencial</li>
                    <li>Ajudam a gerir ansiedade, stress e conflitos</li>
                    <li>Orientam em decisões importantes</li>
                    <li>Podem encaminhar para apoio externo se necessário</li>
                </ul>
                <h3>Como marcar uma conversa?</h3>
                <ul>
                    <li>Pede ao diretor de turma ou a um professor para te ajudar a marcar</li>
                    <li>Procura o gabinete de psicologia/orientação da escola</li>
                    <li>Muitas escolas aceitam pedidos anónimos ou através de formulários</li>
                </ul>
                <p><strong>Importante:</strong> O que disseres é tratado com confidencialidade (exceto em situações de risco grave).</p>
            `
        }
    };

    // ---------- Elementos DOM ----------
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.getElementById('modalClose');
    const cards = document.querySelectorAll('.card[data-modal]');
    const fabHelp = document.getElementById('fabHelp');
    const helpModalOverlay = document.getElementById('helpModalOverlay');
    const helpModalClose = document.getElementById('helpModalClose');

    let currentQuestion = 0;
    let score = 0;
    let answered = false;

    // ---------- Menu Mobile ----------
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // ---------- Active Nav Link on Scroll ----------
    const sections = document.querySelectorAll('section[id]');

    function highlightNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);

    // ---------- Modal de Cards ----------
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const key = card.getAttribute('data-modal');
            const data = modalData[key];

            if (data) {
                modalContent.innerHTML = `
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">${data.icon}</div>
                    <h2>${data.title}</h2>
                    ${data.content}
                `;
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // ---------- Modal de Ajuda (FAB) ----------
    fabHelp.addEventListener('click', () => {
        helpModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    function closeHelpModal() {
        helpModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    helpModalClose.addEventListener('click', closeHelpModal);
    helpModalOverlay.addEventListener('click', (e) => {
        if (e.target === helpModalOverlay) closeHelpModal();
    });

    // Fechar modais com Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeHelpModal();
        }
    });

    // ---------- Animações ao Scroll (Intersection Observer) ----------
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: parar de observar depois de animar
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
});
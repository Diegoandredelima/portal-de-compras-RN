/**
 * ===================================================================
 * SCRIPT PARA A PÁGINA MEEPP (MICROEMPRESAS E EMPRESAS DE PEQUENO PORTE)
 * ===================================================================
 * 
 * Este script contém as funcionalidades interativas da página MEEPP,
 * incluindo:
 * 1. Controle do menu lateral (off-canvas)
 * 2. Rolagem suave para âncoras internas
 * 3. Sistema de abas para conteúdo dinâmico
 * 4. Funcionalidade de acordeão para o FAQ
 * 5. Animações de entrada para elementos ao rolar a página
 * 
 * @version 1.0
 * @date 2025-07-16
 */

document.addEventListener('DOMContentLoaded', function() {

    // --- FUNCIONALIDADE 1: MENU LATERAL (OFF-CANVAS) ---
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const offcanvasMenu = document.getElementById('offcanvas-menu');
    const offcanvasBackdrop = document.getElementById('offcanvas-backdrop');

    if (menuToggle) {
        const openOffcanvasMenu = () => {
            offcanvasMenu.classList.add('active');
            offcanvasBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        };
        const closeOffcanvasMenu = () => {
            offcanvasMenu.classList.remove('active');
            offcanvasBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        };
        menuToggle.addEventListener('click', openOffcanvasMenu);
        closeMenu.addEventListener('click', closeOffcanvasMenu);
        offcanvasBackdrop.addEventListener('click', closeOffcanvasMenu);
        offcanvasMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeOffcanvasMenu));
    }

    // --- FUNCIONALIDADE 2: ROLAGEM SUAVE ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    const headerHeight = document.querySelector('.sticky-header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            }
        });
    });

    // --- FUNCIONALIDADE 3: ABAS (TABS) ---
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    if (tabTriggers.length > 0) {
        const tabContents = document.querySelectorAll('.tab-content');
        tabTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                tabTriggers.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                document.getElementById(this.dataset.tab).classList.add('active');
            });
        });
    }

    // --- FUNCIONALIDADE 4: FAQ (ACCORDION) ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const wasActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!wasActive) item.classList.add('active');
            });
        });
    }

    // --- FUNCIONALIDADE 5: ANIMAÇÃO AO ROLAR ---
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.card, .section-header, .stat-card').forEach(el => observer.observe(el));
    }
});
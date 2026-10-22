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

    // --- FUNCIONALIDADE 1: ROLAGEM SUAVE ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.length > 1) {
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

    // --- FUNCIONALIDADE 2: ABAS (TABS) ACESSÍVEIS ---
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    if (tabTriggers.length > 0) {
        const tabContents = document.querySelectorAll('.tab-content');
        tabTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                tabTriggers.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                tabContents.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');
                const panel = document.getElementById(this.dataset.tab);
                if (panel) panel.classList.add('active');
            });
        });
    }

    // --- FUNCIONALIDADE 3: FAQ (ACCORDION ACESSÍVEL VIA TECLADO) ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach((item, idx) => {
            const question = item.querySelector('.faq-question');
            if (!question) return;
            question.setAttribute('role', 'button');
            question.setAttribute('tabindex', '0');
            question.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');

            const toggleItem = () => {
                const wasActive = item.classList.contains('active');
                faqItems.forEach(i => {
                    i.classList.remove('active');
                    const q = i.querySelector('.faq-question');
                    if (q) q.setAttribute('aria-expanded', 'false');
                });
                if (!wasActive) {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                }
            };

            question.addEventListener('click', toggleItem);
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleItem();
                }
            });
        });
    }

    // --- FUNCIONALIDADE 4: ANIMAÇÃO AO ROLAR ---
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
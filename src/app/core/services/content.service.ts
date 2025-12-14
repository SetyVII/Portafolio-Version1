import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Technology {
    name: string;
    logo: string;
}

export interface Project {
    number: string;
    title: string;
    stack: string;
    description: string;
    image: string;
}

export interface Stat {
    label: string;
    value: string;
}

export interface ContactItem {
    platform: string;
    value: string;
    link: string;
    icon: string;
}

export interface PortfolioContent {
    hero: {
        greeting: string;
        name: string;
        role: string;
        tagline: string;
        scrollIndicator: string;
    };
    about: {
        title: string;
        highlight: string;
        description1: string;
        description2: string;
        stats: {
            location: Stat;
            experience: Stat;
            focus: Stat;
            status: Stat;
        };
        currentlyHacking: {
            label: string;
            value: string;
        }
    };
    technologies: Technology[];
    projects: {
        title: string;
        period: string;
        items: Project[];
    };
    contact: {
        subtitle: string;
        title: string;
        bgText: string;
        items: ContactItem[];
    };
}

@Injectable({
    providedIn: 'root'
})
export class ContentService {

    private technologies: Technology[] = [
        { name: 'Angular', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg' },
        { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
        { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
        { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
        { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
        { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
        { name: 'Spring Boot', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
        { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
        { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
        { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
        { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
        { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
        { name: 'C#', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg' }
    ];

    private contactItems: ContactItem[] = [
        {
            platform: 'Phone',
            value: '+34 664156430',
            link: 'tel:+34664156430',
            icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
        },
        {
            platform: 'Email',
            value: 'sebastianvh111@gmail.com',
            link: 'mailto:sebastianvh111@gmail.com',
            icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
        },
        {
            platform: 'LinkedIn',
            value: 'linkedin.com/in/sebastianvilavila',
            link: 'https://www.linkedin.com/in/sebastianvilavila/',
            icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 2a2 2 0 11-2 2 2 2 0 012-2z'
        },
        {
            platform: 'GitHub',
            value: 'SetyVII',
            link: 'https://github.com/SetyVII',
            icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
        }
    ];

    /* En Content */
    private enContent: PortfolioContent = {
        hero: {
            greeting: "HELLO",
            name: "I'M SEBASTIAN",
            role: "Full Stack Developer &",
            tagline: "PASSIONATE ABOUT CODING.",
            scrollIndicator: "Scroll to Explore"
        },
        about: {
            title: "Who am",
            highlight: "I?",
            description1: "I’m a developer driven by the pursuit of structure, performance, and elegance.",
            description2: "I don’t just write code—I design systems that are built to scale, endure, and inspire. My philosophy is rooted in minimalism: refining every detail until only the essential remains, revealing the true power of simplicity in digital design.",
            stats: {
                location: { label: "LOCATION", value: "MADRID, SPAIN" },
                experience: { label: "EXPERIENCE", value: "CURRENTLY A STUDENT" },
                focus: { label: "FOCUS", value: "Full Stack" },
                status: { label: "STATUS", value: "Available" }
            },
            currentlyHacking: {
                label: "CURRENTLY HACKING ON:",
                value: "ANGULAR / JAVA"
            }
        },
        technologies: this.technologies,
        projects: {
            title: "SELECTED WORK",
            period: "(2023 — PRESENT)",
            items: [
                {
                    number: "01.",
                    title: "E-Commerce Platform",
                    stack: "ANGULAR / SPRING BOOT",
                    description: "A full-featured shopping platform engineered for scalability.",
                    image: "https://placehold.co/400x250/222/FFF?text=Shop"
                },
                {
                    number: "02.",
                    title: "Task Manager",
                    stack: "REACT / NODE.JS",
                    description: "Real-time collaboration tool using WebSockets.",
                    image: "https://placehold.co/400x250/222/FFF?text=Task"
                },
                {
                    number: "03.",
                    title: "Portfolio v1",
                    stack: "HTML / CSS",
                    description: "The foundation of my digital identity.",
                    image: "https://placehold.co/400x250/222/FFF?text=Port"
                }
            ]
        },
        contact: {
            subtitle: "I'M HERE",
            title: "LET'S TALK",
            bgText: "CONTACT",
            items: this.contactItems
        }
    };

    /* Es Content */
    private esContent: PortfolioContent = {
        hero: {
            greeting: "HOLA",
            name: "SOY SEBASTIAN",
            role: "Desarrollador Full Stack &",
            tagline: "APASIONADO POR EL CÓDIGO.",
            scrollIndicator: "Desliza para Explorar"
        },
        about: {
            title: "¿Quién soy",
            highlight: "Yo?",
            description1: "Soy un desarrollador obsesionado con las estructuras complejas, el rendimiento y la perfección estética.",
            description2: "No solo escribo código, pero si lo amo; construyo arquitecturas digitales entedibles y resistentes. Mi enfoque se basa en el minimalismo: eliminar lo no esencial para revelar el núcleo poderoso de una aplicación. Y un pragmatismo que me permite resolver problemas de manera eficiente.",
            stats: {
                location: { label: "UBICACIÓN", value: "MADRID, ESPAÑA" },
                experience: { label: "EXPERIENCIA", value: "ESTUDIANTE" },
                focus: { label: "ENFOQUE", value: "Full Stack" },
                status: { label: "ESTADO", value: "Disponible" }
            },
            currentlyHacking: {
                label: "TRABAJANDO EN:",
                value: "ANGULAR / JAVA"
            }
        },
        technologies: this.technologies,
        projects: {
            title: "TRABAJOS",
            period: "(2024 — PRESENTE)",
            items: [
                {
                    number: "01.",
                    title: "Plataforma E-Commerce",
                    stack: "ANGULAR / SPRING BOOT",
                    description: "Una plataforma de compras completa diseñada para la escalabilidad.",
                    image: "https://placehold.co/400x250/222/FFF?text=Shop"
                },
                {
                    number: "02.",
                    title: "Gestor de Tareas",
                    stack: "REACT / NODE.JS",
                    description: "Herramienta de colaboración en tiempo real usando WebSockets.",
                    image: "https://placehold.co/400x250/222/FFF?text=Task"
                },
                {
                    number: "03.",
                    title: "Portafolio v1",
                    stack: "HTML / CSS",
                    description: "La base de mi identidad digital.",
                    image: "https://placehold.co/400x250/222/FFF?text=Port"
                }
            ]
        },
        contact: {
            subtitle: "¿Tienes una idea?",
            title: "HABLEMOS",
            bgText: "CONTACTO",
            items: this.contactItems
        }
    };

    private contentSubject = new BehaviorSubject<PortfolioContent>(this.enContent);
    content$ = this.contentSubject.asObservable();

    public currentLang: 'en' | 'es' = 'en';

    constructor() { }

    toggleLanguage() {
        if (this.currentLang === 'en') {
            this.currentLang = 'es';
            this.contentSubject.next(this.esContent);
        } else {
            this.currentLang = 'en';
            this.contentSubject.next(this.enContent);
        }
    }

    getContent(): PortfolioContent {
        return this.contentSubject.value;
    }
}

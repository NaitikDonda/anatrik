
document.addEventListener('DOMContentLoaded', () => {

    gsap.registerPlugin(ScrollTrigger);

    let lenis;

    function initLenis() {
        lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.95,
            touchMultiplier: 1.5,
            infinite: false
        });

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    }

    function initHeroIntro() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            gsap.set('.hero-media-container', { clipPath: 'inset(0% 0% 0% 0%)' });
            gsap.set('.hero-bg-image', { scale: 1.0 });
            gsap.set('.anantrik-nav', { opacity: 1, y: 0 });
            gsap.set('.title-line-inner', { y: '0%', opacity: 1 });
            gsap.set(['.hero-subtitle', '.hero-cta-box'], { opacity: 1, y: 0, scale: 1 });
            return;
        }

        const introTl = gsap.timeline({
            defaults: {
                ease: 'power3.out'
            }
        });

        introTl.to('.hero-media-container', {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.6,
            ease: 'power3.inOut'
        }, 0);

        introTl.to('.hero-bg-scale-wrapper', {
            scale: 1.0,
            duration: 2.2,
            ease: 'power2.out'
        }, 0);

        introTl.to('.anantrik-nav', {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power2.out'
        }, 0.6);

        introTl.to('.line-1 .title-line-inner', {
            y: '0%',
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out'
        }, 0.75);

        introTl.to('.line-2 .title-line-inner', {
            y: '0%',
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out'
        }, 0.9);

        introTl.to('.hero-subtitle', {
            opacity: 0.92,
            y: 0,
            duration: 0.9,
            ease: 'power2.out'
        }, 1.2);

        introTl.to('.hero-cta-box', {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'back.out(1.4)'
        }, 1.35);
    }

    function initHeroScroll() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        ScrollTrigger.create({
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            pin: '.hero-media-container',
            pinSpacing: false
        });

        gsap.to('.hero-dark-overlay', {
            opacity: 1.5,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        gsap.to('.hero-center-content', {
            opacity: 0,
            ease: 'power1.in',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        gsap.to('.line-1 .title-line-inner', {
            xPercent: -40,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: '75% top',
                scrub: true
            }
        });

        gsap.to('.line-2 .title-line-inner', {
            xPercent: 40,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: '75% top',
                scrub: true
            }
        });

    }

    function initEcosystemAnimation() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        let mm = gsap.matchMedia();

        mm.add("(min-width: 1101px)", () => {
            const ecoSection = document.querySelector('.eco-system-section');
            if (!ecoSection) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ecoSection,
                    start: "top top",
                    end: "+=4000",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                }
            });

            // Initial state: cards start outside composition but within reasonable distance
            // Education enters from above, crossing over heading and paragraph
            gsap.set('.card-top', { 
                y: -580, 
                rotation: -6, 
                scale: 0.94,
                opacity: 0.8
            });

            // Logistics starts from left and moves diagonally through the central composition
            gsap.set('.card-left', { 
                x: -750, 
                y: -120, 
                rotation: -5, 
                scale: 0.94,
                opacity: 0.8
            });

            // Automotive starts from right and moves diagonally toward its final position
            gsap.set('.card-right', { 
                x: 750, 
                y: -120, 
                rotation: -7, 
                scale: 0.94,
                opacity: 0.8
            });

            // Commercial starts below and moves upward
            gsap.set('.card-bottom', { 
                y: 650, 
                rotation: -4, 
                scale: 0.94,
                opacity: 0.8
            });

            // Center icon starts visible at scale
            gsap.set('.center-icon-wrapper', {
                opacity: 0.6,
                scale: 0.8
            });

            // Master timeline choreography
            // 0 - 0.85: Cards smoothly enter and settle into the cross shape
            // 1.2 - 5.2: The entire cross layout orbits 270 degrees clockwise

            tl.addLabel("start", 0);

            tl.to('.card-top', {
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                ease: "power2.out",
                duration: 0.85
            }, "start");

            tl.to('.card-left', {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                ease: "power2.out",
                duration: 0.85
            }, "start");

            tl.to('.card-right', {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                ease: "power2.out",
                duration: 0.85
            }, "start");

            tl.to('.card-bottom', {
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                ease: "power2.out",
                duration: 0.85
            }, "start");

            // Center icon scales up to full opacity and prominence at center of all cards
            tl.to('.center-icon-wrapper', {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
            }, "start+=0.3");

            // After settling, rotate the entire layout and counter-rotate the cards
            tl.addLabel("rotateStart", "start+=1.2");

            tl.to('.cross-layout', {
                rotation: 270,
                duration: 4,
                ease: "none"
            }, "rotateStart");

            tl.to('.cross-card', {
                rotation: -270,
                duration: 4,
                ease: "none"
            }, "rotateStart");

        });

        mm.add("(max-width: 1100px)", () => {
            gsap.from('.cross-card', {
                y: 50,
                opacity: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.eco-system-section',
                    start: 'top 80%',
                    end: 'top 30%',
                    scrub: 1
                }
            });
        });
    }

    initLenis();
    initHeroIntro();
    initHeroScroll();
    initEcosystemAnimation();


});

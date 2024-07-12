"use client"

import { useRef, useEffect } from 'react';
import './cards.css'
import Link from 'next/link';

const Premium: React.FC = () => {
    console.clear();
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const cardsContainerInnerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const overlayRef = useRef<HTMLDivElement>(null);
  
    const applyOverlayMask = (e: PointerEvent) => {
      const overlayEl = e.currentTarget as HTMLDivElement;
      const x = e.pageX - (cardsContainerRef.current?.offsetLeft || 0);
      const y = e.pageY - (cardsContainerRef.current?.offsetTop || 0);
  
      overlayEl.style.setProperty('--opacity', '1');
      overlayEl.style.setProperty('--x', `${x}px`);
      overlayEl.style.setProperty('--y', `${y}px`);
    };
  
    const createOverlayCta = (overlayCard: HTMLDivElement, ctaEl: Element | null) => {
      const overlayCta = document.createElement('div');
      overlayCta.classList.add('cta');
      overlayCta.textContent = ctaEl?.textContent || '';
      overlayCta.setAttribute('aria-hidden', 'true');
      overlayCard.append(overlayCta);
    };
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const observer = new ResizeObserver((entries) => {
          entries.forEach((entry) => {
            const cardIndex = cardsRef.current.indexOf(entry.target as HTMLDivElement);
            let width = entry.borderBoxSize[0].inlineSize;
            let height = entry.borderBoxSize[0].blockSize;
  
            if (cardIndex >= 0) {
              if (overlayRef.current?.children[cardIndex]) {
                overlayRef.current.children[cardIndex].setAttribute('style', `width: ${width}px; height: ${height}px;`);
              }
            }
          });
        });
  
        const cardsContainer = cardsContainerRef.current;
        const overlay = overlayRef.current;
  
        if (cardsContainer && overlay) {
          const cards = Array.from(cardsContainer.querySelectorAll('.card')) as HTMLDivElement[];
          cardsRef.current = cards;
  
          cards.forEach((card) => {
            const overlayCard = document.createElement('div');
            overlayCard.classList.add('card');
            createOverlayCta(overlayCard, card.lastElementChild);
            overlay.append(overlayCard);
            observer.observe(card);
          });
  
          document.body.addEventListener('pointermove', applyOverlayMask);
  
          return () => {
            document.body.removeEventListener('pointermove', applyOverlayMask);
            observer.disconnect();
          };
        }
      }
    }, []);
    return (
        <main className="text-center flex flex-col items-center mt-6 md:h-[85vh]">
            <p className="text-xl md:text-3xl font-semibold">Pricing</p>
            <section className="flex space-x-8 w-[80%] md:w-[60%] mt-10 mb-20">
                <div className="main__cards cards" ref={cardsContainerRef}>
                    <div className="cards__inner" ref={cardsContainerInnerRef}>
                        <div className="cards__card card">
                            <h2 className="card__heading">Freeview</h2>
                            <p className="card__price">$0.00</p>
                            <ul role="list" className="card__bullets flow">
                                <li>Access to standard film and series content</li>
                                <li>Get suggestions and keep a list of favorites</li>
                                <li>Basic Email support</li>
                            </ul>
                            <Link href="/" className="card__cta cta">Get Started</Link>
                        </div>

                        <div className="cards__card card">
                            <h2 className="card__heading">Spotlight</h2>
                            <p className="card__price">$19.99</p>
                            <ul role="list" className="card__bullets flow">
                                <li>Get suggestions according to your taste</li>
                                <li>Get notifications on favorite star movie release</li>
                                <li>Priority Email support</li>
                                <li>Exclusive access to content curated just for you</li>
                            </ul>
                            <a href="" className="card__cta cta">Upgrade to Spotlight</a>
                        </div>

                        <div className="cards__card card">
                            <h2 className="card__heading">All Access Pass</h2>
                            <p className="card__price">$49.99</p>
                            <ul role="list" className="card__bullets flow">
                                <li>All Spotlight features</li>
                                <li>Get favorite star movie ticket as soon as available</li>
                                <li>Daily updates on the fild industry</li>
                                <li>Exclusive content and early access to new features</li>
                            </ul>
                            <a href="#ultimate" className="card__cta cta">Go Ultimate</a>
                        </div>
                    </div>

                    <div className="overlay cards__inner" ref={overlayRef}></div>
                </div>

            </section>
        </main>

    )
}

export default Premium;
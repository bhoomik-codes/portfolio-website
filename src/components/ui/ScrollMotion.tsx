'use client';

import { useEffect } from 'react';

export default function ScrollMotion() {
  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealTargets.forEach(target => target.classList.add('is-in-view'));
      return;
    }

    document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in-view');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

    revealTargets.forEach(target => observer.observe(target));

    // Filters can add fresh cards after the first viewport pass.
    const mutations = new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(node => {
        if (!(node instanceof HTMLElement)) return;
        if (node.matches('[data-reveal]')) observer.observe(node);
        node.querySelectorAll<HTMLElement>('[data-reveal]').forEach(target => observer.observe(target));
      }));
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      document.documentElement.classList.remove('motion-ready');
    };
  }, []);

  return null;
}

'use client';

import { useState } from 'react';
import type { ContactFormData } from '@/types';

const emptyForm: ContactFormData = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<ContactFormData>(emptyForm);
  const [error, setError] = useState('');
  const [openedMail, setOpenedMail] = useState(false);

  const update = (field: keyof ContactFormData, value: string) => {
    setForm(previous => ({ ...previous, [field]: value }));
    setError('');
    setOpenedMail(false);
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.subject.trim() || !form.message.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Add your name, a valid email address, a subject, and a message.');
      return;
    }
    const body = `${form.message.trim()}\n\nFrom: ${form.name.trim()} (${form.email.trim()})`;
    window.location.href = `mailto:2007bhoomiksevta11@gmail.com?subject=${encodeURIComponent(form.subject.trim())}&body=${encodeURIComponent(body)}`;
    setOpenedMail(true);
  };

  return (
    <section id="contact" className="story-section contact-section">
      <div className="section-marker"><span>04</span><span>Next horizon</span></div>
      <div className="section-shell contact-layout">
        <div className="contact-copy" data-reveal>
          <p className="eyebrow">A new beginning</p>
          <h2>What shall we<br /><em>build next?</em></h2>
          <p className="section-intro">Have an interesting problem, a role, or an idea you want to explore? I&apos;d like to hear about it.</p>
          <a className="contact-email" href="mailto:2007bhoomiksevta11@gmail.com">2007bhoomiksevta11@gmail.com <span aria-hidden="true">↗</span></a>
          <p className="contact-location">Based in India · Open to internships, freelance, and full-time opportunities</p>
          <div className="contact-socials">
            <a href="https://github.com/bhoomik-codes" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://linkedin.com/in/bhoomik-sevta" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </div>

        <form className="contact-form" onSubmit={submit} noValidate data-reveal>
          <div className="form-pair">
            <label>Name<input autoComplete="name" value={form.name} onChange={event => update('name', event.target.value)} /></label>
            <label>Email<input type="email" autoComplete="email" value={form.email} onChange={event => update('email', event.target.value)} /></label>
          </div>
          <label>Subject<input value={form.subject} onChange={event => update('subject', event.target.value)} /></label>
          <label>Message<textarea rows={5} value={form.message} onChange={event => update('message', event.target.value)} /></label>
          {error && <p className="form-message" role="alert">{error}</p>}
          {openedMail && <p className="form-message" role="status">Your email app should open with your message ready. Review it there and press Send.</p>}
          <button className="button-primary" type="submit">Prepare email <span aria-hidden="true">↗</span></button>
        </form>
      </div>
    </section>
  );
}

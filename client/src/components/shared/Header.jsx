import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const NAV_LINKS = [
  { label: "Speakers", href: "#speakers" },
  { label: "Schedule", href: "#schedule" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Team", href: "#team" },
  { label: "Venue", href: "#venue" },
];

export default function Header() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container site-header__inner">
        <a href="#top" className="site-header__logo">
          TEDx<span>BITSHyderabad</span>
        </a>

        <nav className="site-header__nav">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={activeSection === link.href ? "is-active" : ""}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <button className="site-header__admin-btn" onClick={() => navigate("/admin/login")}>
            Admin
          </button>
          <button
            type="button"
            className={`site-header__burger${menuOpen ? " is-open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span  />
            <span />
          </button>
        </div>
      </div>

      <nav className={`site-header__mobile-nav${menuOpen ? " is-open" : ""}`}>
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            style={{ transitionDelay: `${i * 40}ms` }}
            onClick={() => setMenuOpen(false)}
          >
            <span className="site-header__mobile-nav-index">0{i + 1}</span>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
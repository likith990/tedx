
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

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a href="#top" className="site-header__logo">
          TEDx<span>BITSHyderabad</span>
        </a>
        <nav className="site-header__nav">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <button
          className="site-header__admin-btn"
          onClick={() => navigate("/admin/login")}
        >
          Admin
        </button>
      </div>
    </header>
  );
}
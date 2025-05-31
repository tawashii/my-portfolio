import { memo } from 'react';
import { FaHeart, FaGithub, FaTwitter } from 'react-icons/fa';
import '../styles/Footer.css';

// フッターコンポーネント
const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/tawashi',
      icon: <FaGithub aria-hidden="true" />
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/tawashi',
      icon: <FaTwitter aria-hidden="true" />
    }
  ];

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-content">
        <div className="footer-main">
          <p className="footer-text">
            Built with{' '}
            <span className="heart-icon" role="img" aria-label="love">
              <FaHeart aria-hidden="true" />
            </span>{' '}
            using React
          </p>
          <p className="copyright">
            &copy; {currentYear} tawashi. All rights reserved.
          </p>
        </div>
        
        <nav className="social-links" aria-label="ソーシャルメディアリンク">
          <ul>
            {socialLinks.map(({ name, url, icon }) => (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="social-link"
                >
                  {icon}
                  <span className="sr-only">{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;

import { motion } from 'framer-motion'
import { FaGithub, FaTwitter, FaPen, FaUser } from 'react-icons/fa'
import { useReducedMotion } from '../hooks/usePreferences'
import { useState, useCallback } from 'react'

// Contactセクションコンポーネント
function Contact() {
  const prefersReducedMotion = useReducedMotion()
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })

  const socialLinks = [
    {
      platform: "GitHub",
      url: "https://github.com/tawashii",
      icon: <FaGithub />,
      label: "GitHubプロフィール"
    },
    {
      platform: "X (Twitter)",
      url: "https://x.com/tawashii_",
      icon: <FaTwitter />,
      label: "X (Twitter)プロフィール"
    },
    {
      platform: "Zenn",
      url: "https://zenn.dev/taa_wash1",
      icon: <FaPen />,
      label: "Zennプロフィール"
    },
    {
      platform: "LAPRAS",
      url: "https://lapras.com/public/tawashi",
      icon: <FaUser />,
      label: "LAPRASプロフィール"
    }
  ]

  const animationConfig = prefersReducedMotion
    ? { initial: {}, whileInView: {} }
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" }
      }

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setFormStatus({ type: 'info', message: '送信中...' });

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    // バリデーション
    if (!data.name || !data.email || !data.message) {
      setFormStatus({
        type: 'error',
        message: '必須項目を入力してください。'
      });
      return;
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setFormStatus({
        type: 'error',
        message: '有効なメールアドレスを入力してください。'
      });
      return;
    }

    try {
      // お使いのフォーム送信サービスのAPI URLに変更してください
      const response = await fetch('https://api.formspree.io/f/your-form-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: 'メッセージを送信しました。折り返しご連絡いたします。'
        });
        e.target.reset();
      } else {
        throw new Error('送信に失敗しました');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({
        type: 'error',
        message: '送信に失敗しました。時間をおいて再度お試しください。'
      });
    }
  }, [])

  return (
    <section 
      id="contact" 
      className="section"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <h2 
          id="contact-title" 
          className="section-title"
          tabIndex="-1"
        >
          Contact
        </h2>
        <motion.div
          className="contact-content"
          {...animationConfig}
        >
          <p className="contact-text">
            お気軽にご連絡ください。新しい機会をお待ちしております。
          </p>
          
          <nav 
            className="social-links"
            aria-label="ソーシャルリンク"
          >
            {socialLinks.map(link => (
              <a 
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={link.label}
              >
                {link.icon}
                <span>{link.platform}</span>
              </a>
            ))}
          </nav>

          <form 
            className="contact-form"
            onSubmit={handleSubmit}
            aria-label="お問い合わせフォーム"
            noValidate
          >
            {formStatus.message && (
              <div 
                className={`form-status form-status--${formStatus.type}`}
                role="alert"
                aria-live="polite"
              >
                {formStatus.message}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="name">お名前</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                aria-required="true"
                autoComplete="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">メールアドレス</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                aria-required="true"
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">メッセージ</label>
              <textarea
                id="message"
                name="message"
                required
                aria-required="true"
                rows="5"
              />
            </div>

            <button 
              type="submit"
              className="submit-button"
              aria-label="フォームを送信"
            >
              送信する
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default React.memo(Contact)

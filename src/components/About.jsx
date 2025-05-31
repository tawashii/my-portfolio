import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/usePreferences';

// Aboutセクションコンポーネント
function About() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: "-50px" }
      };

  const roles = [
    {
      title: "Technical Writer",
      description: "技術文書の作成とコンテンツ管理"
    },
    {
      title: "Technical Support",
      description: "製品サポートとユーザーコミュニケーション"
    },
    {
      title: "Corporate Engineer",
      description: "社内システムの運用と業務改善"
    }
  ];

  return (
    <section 
      id="about" 
      className="section"
      aria-labelledby="about-title"
    >
      <div className="container">
        <motion.div
          className="about-content"
          {...containerVariants}
        >
          <h1 
            id="about-title" 
            className="about-title"
            tabIndex="-1"
          >
            tawashi
          </h1>
          <div className="roles-grid">
            {roles.map((role, index) => (
              <motion.div
                key={role.title}
                className="role-card"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <h2 className="role-title">{role.title}</h2>
                <p className="role-description">{role.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;

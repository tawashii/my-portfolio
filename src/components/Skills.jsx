import { memo } from 'react'
import { motion } from 'framer-motion'
import { FaBook, FaCode, FaChartLine, FaProjectDiagram } from 'react-icons/fa'
import '../styles/Skills.css'

// Skillsセクションコンポーネント
const Skills = memo(function Skills() {
  const skillCategories = [
    {
      title: "ドキュメント・コミュニケーション",
      icon: <FaBook aria-hidden="true" />,
      skills: [
        "マニュアルサイトの執筆、ディレクション",
        "スケジュール策定、進行管理",
        "プレゼンテーションスキル",
        "教育・トレーニングスキル"
      ]
    },
    {
      title: "技術スキル",
      icon: <FaCode aria-hidden="true" />,
      skills: [
        "Markdown, HTML, CSS, Python, SQL",
        "学習中: JavaScript, Go, Ruby",
        "Git, GitHub, VSCode",
        "Linux, Windowsサーバー, VMware"
      ]
    },
    {
      title: "分析・品質保証",
      icon: <FaChartLine aria-hidden="true" />,
      skills: [
        "データ分析・改善提案",
        "QAプロセス設計・実施",
        "パフォーマンス分析",
        "ユーザビリティテスト"
      ]
    },
    {
      title: "プロジェクト管理",
      icon: <FaProjectDiagram aria-hidden="true" />,
      skills: [
        "アジャイル開発手法",
        "チームリーダーシップ",
        "リスク管理",
        "ステークホルダー管理"
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  }

  return (
    <section 
      className="skills-section"
      aria-labelledby="skills-heading"
    >
      <h2 id="skills-heading" className="section-title">スキル</h2>
      <motion.div
        className="skills-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {skillCategories.map((category, index) => (
          <motion.article
            key={category.title}
            className="skill-card"
            variants={itemVariants}
          >
            <div className="skill-header" aria-hidden="true">
              {category.icon}
            </div>
            <h3 className="skill-title">{category.title}</h3>
            <ul className="skill-list" role="list">
              {category.skills.map((skill, skillIndex) => (
                <li key={skillIndex}>{skill}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
})

Skills.displayName = 'Skills'
export default Skills
import { motion } from 'framer-motion'
import { FaUsers, FaChartBar, FaBook, FaBug } from 'react-icons/fa'
import { useReducedMotion } from '../hooks/usePreferences'

function WorkExperience() {
  const prefersReducedMotion = useReducedMotion()

  const experiences = [
    {
      period: "2024年4月 - 2024年6月",
      title: "QAエンジニア",
      icon: <FaBug />,
      achievements: [
        "ソフトウェアの試験設計・実施（テストケース約200項目）",
        "リリース作業の実施（5回）",
        "不具合報告、再現確認",
        "開発チームとの連携による仕様確認"
      ]
    },
    {
      period: "2022年1月 - 2024年12月",
      title: "テクニカルライター",
      icon: <FaBook />,
      achievements: [
        "製品マニュアルサイトの執筆・更新・ディレクション",
        "リリーススケジュールに合わせた記事作成計画・進行管理",
        "マニュアル移行プロジェクトのマネジメント（3ヶ月）",
        "GitHub管理体制への移行プロジェクト主導",
        "利用ツール：kintone, Jira, Confluence, GitHub, VSCode等"
      ]
    },
    {
      period: "2020年2月 - 2022年1月",
      title: "IT担当・データアナリスト",
      icon: <FaChartBar />,
      achievements: [
        "社内システムの運用管理（アルファスコープ、Zendesk、VMware）",
        "ユーザーアンケートの実施・分析・改善提案",
        "問い合わせ内容のテキストマイニング分析",
        "自チームの研修チューター担当",
        "採用面接（新卒、中途）担当"
      ]
    },
    {
      period: "2018年4月 - 2020年1月",
      title: "テクニカルサポート",
      icon: <FaUsers />,
      achievements: [
        "製品利用/検討ユーザーの問い合わせ対応（電話・メール）",
        "対応製品：サイボウズ Office（導入社数のべ78,000社）",
        "一日の対応件数：電話約20件、メール約5～10件",
        "ユーザーイベントでのブース担当",
        "新卒向け合同説明会などの採用活動"
      ]
    }
  ]

  const animationConfig = prefersReducedMotion
    ? { initial: {}, whileInView: {} }
    : {
        initial: { opacity: 0, x: -50 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, margin: "-50px" }
      }

  return (
    <section 
      id="experience" 
      className="section"
      aria-labelledby="experience-title"
    >
      <div className="container">
        <h2 
          id="experience-title" 
          className="section-title"
          tabIndex="-1"
        >
          Work Experience
        </h2>
        <div 
          className="timeline"
          role="list"
        >
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.period}
              className="timeline-item"
              role="listitem"
              {...animationConfig}
              transition={{ 
                delay: prefersReducedMotion ? 0 : index * 0.2,
                duration: 0.5,
                ease: "easeOut"
              }}
            >
              <div 
                className="timeline-icon" 
                aria-hidden="true"
              >
                {exp.icon}
              </div>
              <div className="timeline-content">
                <div 
                  className="timeline-date"
                  aria-label={`期間: ${exp.period}`}
                >
                  {exp.period}
                </div>
                <h3 className="timeline-title">{exp.title}</h3>
                <ul 
                  className="timeline-achievements"
                  aria-label={`${exp.title}での主な実績`}
                >
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// パフォーマンス最適化のためにメモ化
export default React.memo(WorkExperience)
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { lazy, Suspense, useRef } from 'react'
import { useReducedMotion } from '../hooks/usePreferences'
import { useLazyLoad } from '../utils/lazyLoad'

// プロジェクト画像の遅延読み込み
const ProjectImage = lazy(() => import('./ProjectImage'))

// Projectsセクションコンポーネント
function Projects() {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef(null)
  const isVisible = useLazyLoad(containerRef)

  const projects = [
    {
      title: "ポートフォリオサイト",
      description: "React.js、Viteを使用して作成したポートフォリオサイト。レスポンシブデザイン、ダークモード対応、アクセシビリティ対応、テスト実装など、モダンなWeb開発プラクティスを実践。",
      technologies: ["React", "Vite", "CSS", "Framer Motion", "Vitest", "Testing Library"],
      features: [
        "レスポンシブデザイン",
        "ダークモード対応",
        "アクセシビリティ対応",
        "パフォーマンス最適化",
        "自動テスト"
      ],
      image: "/project-portfolio.jpg",
      github: "https://github.com/tawashii/portfolio",
      demo: "https://tawashii.github.io/portfolio/"
    },
    {
      title: "マニュアル作成支援ツール",
      description: "Python、OpenAI APIを使用して、既存の技術マニュアルを解析し、新規マニュアルの作成を支援するツール。テキストマイニングとLLMを活用して、ドキュメント品質の向上と作成時間の短縮を実現。",
      technologies: ["Python", "OpenAI API", "pandas", "scikit-learn", "Streamlit"],
      features: [
        "マニュアル解析機能",
        "テキストマイニング",
        "類似度分析",
        "文章生成支援",
        "品質チェック"
      ],
      image: "/manual-tool.jpg",
      github: "https://github.com/tawashii/manual-assistant",
      inProgress: true
    },
    {
      title: "QA自動化フレームワーク",
      description: "Playwright、TypeScriptを使用したE2Eテスト自動化フレームワーク。CIパイプラインと統合し、テストの実行、レポート生成、不具合管理を自動化。",
      technologies: ["TypeScript", "Playwright", "GitHub Actions", "Jest"],
      features: [
        "E2Eテスト自動化",
        "ビジュアルリグレッションテスト",
        "テストレポート自動生成",
        "CI/CD連携",
        "不具合追跡"
      ],
      image: "/qa-framework.jpg",
      github: "https://github.com/tawashii/qa-framework",
      inProgress: true
    }
  ]

  const animationConfig = prefersReducedMotion
    ? { initial: {}, whileInView: {} }
    : {
        initial: { opacity: 0, scale: 0.9 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true, margin: "-50px" }
      }

  return (
    <section 
      id="projects" 
      className="section"
      aria-labelledby="projects-title"
      ref={containerRef}
    >
      <div className="container">
        <h2 
          id="projects-title" 
          className="section-title"
          tabIndex="-1"
        >
          Projects
        </h2>
        {isVisible && (
          <div 
            className="projects-grid"
            role="list"
            aria-label="プロジェクト一覧"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="project-card"
                role="listitem"
                {...animationConfig}
                transition={{ 
                  delay: prefersReducedMotion ? 0 : index * 0.2,
                  duration: 0.5,
                  ease: "easeOut"
                }}
              >
                <div className="project-content">
                  <h3>{project.title}</h3>
                  {project.inProgress && (
                    <span 
                      className="status-badge" 
                      role="status"
                      aria-label="準備中のプロジェクト"
                    >
                      準備中
                    </span>
                  )}
                  <p>{project.description}</p>
                  <div 
                    className="project-tech"
                    aria-label="使用技術"
                  >
                    {project.technologies.map(tech => (
                      <span 
                        key={tech} 
                        className="tech-tag"
                        role="listitem"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title}のGitHubリポジトリを開く (新しいタブで開きます)`}
                      className="project-link"
                    >
                      <FaGithub aria-hidden="true" /> 
                      <span>GitHub</span>
                    </a>
                    {!project.inProgress && (
                      <a 
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title}のデモを開く (新しいタブで開きます)`}
                        className="project-link"
                      >
                        <FaExternalLinkAlt aria-hidden="true" />
                        <span>Demo</span>
                      </a>
                    )}
                  </div>
                </div>
                <Suspense fallback={<div className="image-placeholder" />}>
                  {project.image && (
                    <ProjectImage 
                      src={project.image} 
                      alt={`${project.title}のスクリーンショット`} 
                    />
                  )}
                </Suspense>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default React.memo(Projects)

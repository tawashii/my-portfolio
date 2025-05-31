/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://your-portfolio-domain.com', // あなたのポートフォリオサイトのドメインに変更してください
  generateRobotsTxt: true,
  outDir: './dist',
  generateIndexSitemap: false,
  exclude: ['/404'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://your-portfolio-domain.com/sitemap.xml' // あなたのポートフォリオサイトのドメインに変更してください
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
      }
    ]
  }
}

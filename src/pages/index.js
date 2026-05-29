import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            开始阅读
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/docs/maintenance">
            维护说明
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout title="首页" description="B0weny-qwq 的个人笔记站">
      <HomepageHeader />
      <main>
        <section className={styles.section}>
          <div className="container">
            <Heading as="h2">笔记分类</Heading>
            <div className={styles.grid}>
              <Link className={styles.card} to="/docs/study/example-note">
                <h3>学习笔记</h3>
                <p>记录课程、论文、技术文档、实验过程和复盘。</p>
              </Link>
              <Link className={styles.card} to="/docs/maintenance">
                <h3>维护指南</h3>
                <p>查看新增笔记、图片引用、本地预览和上传发布流程。</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

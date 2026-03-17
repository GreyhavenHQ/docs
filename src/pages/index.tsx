import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx(styles.heroBanner)}>
      <div className="container">
        <p className={styles.heroEyebrow}>Documentation</p>
        <Heading as="h1" className={styles.heroTitle}>
          Sandbox and proxy tools<br />for sovereign AI.
        </Heading>
        <p className={styles.heroSubtitle}>
          Opinioned. Transparent. Secure.
        </p>
        <div className={styles.heroButtons}>
          <Link
            className="button button--primary button--lg"
            to="/greywall/quickstart">
            Get started →
          </Link>
          <Link
            className={clsx('button button--lg', styles.buttonSecondary)}
            to="/greyproxy">
            Explore Greyproxy
          </Link>
        </div>
      </div>
    </header>
  );
}

function ProductCard({
  title,
  tagline,
  description,
  to,
  tags,
}: {
  title: string;
  tagline: string;
  description: string;
  to: string;
  tags: string[];
}) {
  return (
    <div className="col col--6">
      <Link to={to} className={styles.productCard}>
        <div className={styles.productCardHeader}>
          <div>
            <span className={styles.productTitle}>{title}</span>
            <span className={styles.productTagline}>{tagline}</span>
          </div>
          <span className={styles.productArrow}>→</span>
        </div>
        <p className={styles.productDescription}>{description}</p>
        <div className={styles.productTags}>
          {tags.map((t) => (
            <span key={t} className={styles.productTag}>{t}</span>
          ))}
        </div>
      </Link>
    </div>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Greyhaven Docs"
      description="Documentation for Greywall and Greyproxy — sandbox and proxy tools for semi-trusted command execution">
      <HomepageHeader />
      <main>
        {/* Products */}
        <section className={styles.productsSection}>
          <div className="container">
            <div className="row">
              <ProductCard
                title="Greywall"
                tagline="Command sandbox"
                description="Wraps any command in a deny-by-default OS sandbox. Restricts filesystem writes, blocks network by default, and routes traffic through a SOCKS5 proxy. Supports Linux and macOS."
                to="/greywall"
                tags={['Linux', 'macOS', 'Go library', 'AI agents']}
              />
              <ProductCard
                title="Greyproxy"
                tagline="Network proxy"
                description="A managed SOCKS5/HTTP/DNS proxy with a built-in dashboard, live rule engine, and REST API. Use standalone or as the network layer for Greywall."
                to="/greyproxy"
                tags={['HTTP', 'SOCKS5', 'DNS', 'Dashboard']}
              />
            </div>
          </div>
        </section>

        {/* Together callout */}
        <section className={styles.calloutSection}>
          <div className="container">
            <div className={styles.callout}>
              <div className={styles.calloutText}>
                <strong>Using both together?</strong>{' '}
                Greywall sandboxes your commands while Greyproxy gives you a
                live dashboard to review and approve network traffic in real time.
              </div>
              <Link to="/greyproxy/using-with-greywall" className={styles.calloutLink}>
                How they fit together →
              </Link>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className={styles.stepsSection}>
          <div className="container">
            <Heading as="h2" className={styles.stepsHeading}>
              Get started in minutes
            </Heading>
            <div className="row">
              {[
                {
                  n: '01',
                  title: 'Install',
                  body: (
                    <>
                      Install greywall via Homebrew on macOS or the install
                      script on Linux. Run{' '}
                      <code>greywall setup</code> to also install greyproxy.
                    </>
                  ),
                },
                {
                  n: '02',
                  title: 'Learn',
                  body: (
                    <>
                      Run <code>greywall --learning</code> to trace what
                      filesystem paths your command needs and auto-generate a
                      config profile.
                    </>
                  ),
                },
                {
                  n: '03',
                  title: 'Sandbox',
                  body: (
                    <>
                      Run any command inside the sandbox. Monitor blocked
                      requests with <code>-m</code> and approve domains from
                      the Greyproxy dashboard.
                    </>
                  ),
                },
              ].map(({n, title, body}) => (
                <div key={n} className="col col--4">
                  <div className={styles.step}>
                    <span className={styles.stepNumber}>{n}</span>
                    <Heading as="h3" className={styles.stepTitle}>{title}</Heading>
                    <p className={styles.stepBody}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.stepsCta}>
              <Link className="button button--primary button--lg" to="/greywall/quickstart">
                Quickstart guide →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

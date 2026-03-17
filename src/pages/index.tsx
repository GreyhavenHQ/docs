import type {ReactNode} from 'react';
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
          Greyhaven Docs
        </Heading>
        <p className="hero__subtitle">
          Sandbox and proxy tools for running semi-trusted commands safely
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg margin-right--md"
            to="/greywall/quickstart">
            Get Started with Greywall →
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
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
  description,
  to,
  badges,
}: {
  title: string;
  description: string;
  to: string;
  badges: string[];
}) {
  return (
    <div className="col col--6">
      <div className="card shadow--md margin-bottom--lg" style={{height: '100%'}}>
        <div className="card__header">
          <Heading as="h3">{title}</Heading>
          <div>
            {badges.map((b) => (
              <span
                key={b}
                className="badge badge--secondary margin-right--sm"
                style={{fontSize: '0.75rem'}}>
                {b}
              </span>
            ))}
          </div>
        </div>
        <div className="card__body">
          <p>{description}</p>
        </div>
        <div className="card__footer">
          <Link className="button button--primary button--sm" to={to}>
            View Docs →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Greyhaven Docs"
      description="Documentation for Greywall and Greyproxy — sandbox and proxy tools for semi-trusted command execution">
      <HomepageHeader />
      <main>
        <section className="container margin-top--xl margin-bottom--xl">
          <div className="row">
            <ProductCard
              title="Greywall"
              description="Wraps commands in a deny-by-default sandbox. Restricts filesystem access to the current directory. Routes all network traffic through a SOCKS5 proxy. Supports Linux and macOS."
              to="/greywall"
              badges={['Linux', 'macOS', 'Go']}
            />
            <ProductCard
              title="Greyproxy"
              description="A managed SOCKS5/HTTP/DNS proxy with a built-in web dashboard, live rule engine, and REST API. Use it standalone or as the network layer for Greywall."
              to="/greyproxy"
              badges={['HTTP', 'SOCKS5', 'DNS', 'Dashboard']}
            />
          </div>

          <div className="row margin-top--lg">
            <div className="col">
              <div
                className="alert alert--info"
                role="alert"
                style={{borderRadius: 8}}>
                <strong>Using both together?</strong> Greywall sandboxes your
                commands and Greyproxy gives you a live dashboard to review and
                approve network traffic.{' '}
                <Link to="/greyproxy/using-with-greywall">
                  Learn how they fit together →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          className="padding-vert--xl"
          style={{background: 'var(--ifm-color-emphasis-100)'}}>
          <div className="container">
            <Heading as="h2" className="text--center margin-bottom--xl">
              Get Started in Minutes
            </Heading>
            <div className="row">
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <Heading as="h3">1. Install</Heading>
                  <p>
                    Install greywall via Homebrew on macOS or the install
                    script on Linux. Run <code>greywall setup</code> to also
                    install greyproxy.
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <Heading as="h3">2. Learn</Heading>
                  <p>
                    Use <code>greywall --learning</code> to trace what filesystem
                    paths your command needs and auto-generate a config profile.
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <Heading as="h3">3. Sandbox</Heading>
                  <p>
                    Run any command inside the sandbox. Monitor blocked requests
                    with <code>-m</code> and approve domains from the Greyproxy
                    dashboard.
                  </p>
                </div>
              </div>
            </div>
            <div className="text--center margin-top--xl">
              <Link
                className="button button--primary button--lg"
                to="/greywall/quickstart">
                Quickstart Guide →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

import { notFound } from "next/navigation";
import sanitizeHtml from "sanitize-html";
import { Button } from "@/components/ui/Button";
import { LocalizedLink } from "@/components/ui/LocalizedLink";
import { PageHero } from "@/components/ui/PageHero";
import { Icon } from "@/components/icons";
import { getDict, href, type Lang } from "@/i18n";
import { getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { formatDate, stripHtml } from "@/lib/utils";
import { siteUrl } from "@/lib/seo";

function sanitizeBody(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "h2",
      "h3",
      "h4",
      "p",
      "ul",
      "ol",
      "li",
      "strong",
      "em",
      "b",
      "i",
      "a",
      "blockquote",
      "br",
      "hr",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
    },
    disallowedTagsMode: "discard",
  });
}

export async function BlogPostPage({
  lang,
  slug,
}: {
  lang: Lang;
  slug: string;
}) {
  const post = await getPostBySlug(lang, slug);
  if (!post) notFound();

  const t = getDict(lang);
  const related = await getRelatedPosts(lang, slug, 4);
  const body = sanitizeBody(post.content);
  const dateLabel = formatDate(post.published_at || post.created_at, lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.meta_description || stripHtml(post.excerpt),
    datePublished: post.published_at || post.created_at,
    dateModified: post.published_at || post.created_at,
    author: {
      "@type": "Organization",
      name: post.author_name,
    },
    publisher: {
      "@type": "Organization",
      name: t.common.brand,
    },
    inLanguage: lang === "zh" ? "zh-CN" : "en",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": siteUrl() + href(lang, `blog/${post.slug}`),
    },
  };

  return (
    <>
      <PageHero
        lang={lang}
        crumbs={[
          { label: t.nav[0].label, to: "" },
          { label: t.blog.breadcrumb, to: "blog" },
          { label: post.title },
        ]}
        title={post.title}
        sub={post.excerpt}
      />

      <section className="content-block">
        <div className="container">
          <div style={{ marginBottom: 28 }}>
            <LocalizedLink
              lang={lang}
              to="blog"
              className="blog-card__read"
              style={{ color: "var(--brand-600)" }}
            >
              <Icon
                name="arrow-right"
                style={{ transform: "rotate(180deg)" }}
              />
              {t.blog.backLabel}
            </LocalizedLink>
          </div>

          <div className="article">
            <div className="article__body">
              <div className="article__meta-bar">
                <div className="article__author">
                  <span className="article__author-avatar">
                    {post.author_name.charAt(0)}
                  </span>
                  <span>
                    <strong style={{ color: "var(--brand-900)" }}>
                      {post.author_name}
                    </strong>
                    <br />
                    {post.author_role}
                  </span>
                </div>
                <span>{dateLabel}</span>
                <span>{post.read_time}</span>
                <span>{post.category}</span>
              </div>

              <div dangerouslySetInnerHTML={{ __html: body }} />
            </div>

            <aside className="article__sidebar">
              <div className="sidebar-card">
                <h4>{t.blog.writtenBy}</h4>
                <div className="article__author">
                  <span className="article__author-avatar">
                    {post.author_name.charAt(0)}
                  </span>
                  <span>
                    <strong style={{ color: "var(--brand-900)" }}>
                      {post.author_name}
                    </strong>
                    <br />
                    <span style={{ color: "var(--text-muted)" }}>
                      {post.author_role}
                    </span>
                  </span>
                </div>
              </div>

              {related.length > 0 && (
                <div className="sidebar-card">
                  <h4>{t.blog.relatedTitle}</h4>
                  {related.map((r) => (
                    <LocalizedLink
                      key={r.slug}
                      lang={lang}
                      to={`blog/${r.slug}`}
                      className="related-link"
                    >
                      {r.title}
                    </LocalizedLink>
                  ))}
                </div>
              )}

              <div className="sidebar-card sidebar-card--dark">
                <h4>{t.contact.emergencyTitle}</h4>
                <p>{t.contact.emergencyText}</p>
                <Button lang={lang} to="contact" variant="primary" icon="phone">
                  {t.contact.emergencyCta}
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

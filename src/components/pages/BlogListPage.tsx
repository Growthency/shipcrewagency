import { Reveal } from "@/components/fx/Reveal";
import { LocalizedLink } from "@/components/ui/LocalizedLink";
import { PageHero } from "@/components/ui/PageHero";
import { Icon } from "@/components/icons";
import { getDict, type Lang } from "@/i18n";
import { getPublishedPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { IMG } from "@/lib/media";

type CoverKey =
  | "guide"
  | "compliance"
  | "operations"
  | "industry"
  | "checklist"
  | "default";

/** Map an en/zh category string to a cover background + emoji key. */
function coverKey(category: string): CoverKey {
  switch (category) {
    case "Guide":
    case "指南":
      return "guide";
    case "Compliance":
    case "合规":
      return "compliance";
    case "Operations":
    case "运营":
      return "operations";
    case "Industry":
    case "行业":
      return "industry";
    case "Checklist":
    case "清单":
      return "checklist";
    default:
      return "default";
  }
}

const COVER_EMOJI: Record<CoverKey, string> = {
  guide: "📘",
  compliance: "🛡️",
  operations: "⚓",
  industry: "🌐",
  checklist: "✅",
  default: "🚢",
};

export async function BlogListPage({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const posts = await getPublishedPosts(lang);

  return (
    <>
      <PageHero
        lang={lang}
        crumbs={[
          { label: t.nav[0].label, to: "" },
          { label: t.blog.breadcrumb },
        ]}
        title={t.blog.title}
        sub={t.blog.sub}
      />

      <section className="content-block">
        <div className="container">
          {posts.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                color: "var(--text-secondary)",
                fontSize: "1.05rem",
                padding: "40px 0",
              }}
            >
              {t.blog.empty}
            </p>
          ) : (
            <Reveal>
              <div className="blog-grid">
                {posts.map((post, i) => {
                  const key = coverKey(post.category);
                  const featured = i === 0;
                  return (
                    <LocalizedLink
                      key={post.slug}
                      lang={lang}
                      to={`blog/${post.slug}`}
                      className="blog-card"
                      style={featured ? { gridColumn: "1 / -1" } : undefined}
                    >
                      <div className="blog-card__cover">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="blog-card__photo"
                          src={post.featured_image || IMG.blog[key]}
                          alt=""
                          aria-hidden="true"
                        />
                        <span className="blog-card__cat">{post.category}</span>
                      </div>
                      <div className="blog-card__body">
                        <div className="blog-card__meta">
                          <span>
                            {formatDate(
                              post.published_at || post.created_at,
                              lang,
                            )}
                          </span>
                          <span>{post.read_time}</span>
                        </div>
                        <h3 className="blog-card__title">{post.title}</h3>
                        <p className="blog-card__excerpt">{post.excerpt}</p>
                        <span className="blog-card__read">
                          {t.common.readArticle}
                          <Icon name="arrow-right" />
                        </span>
                      </div>
                    </LocalizedLink>
                  );
                })}
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}

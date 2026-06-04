import Image from "next/image";
import { Reveal } from "@/components/fx/Reveal";
import { LocalizedLink } from "@/components/ui/LocalizedLink";
import { PageHero } from "@/components/ui/PageHero";
import { Pagination } from "@/components/ui/Pagination";
import { Icon } from "@/components/icons";
import { getDict, type Lang } from "@/i18n";
import { getPublishedPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { IMG } from "@/lib/media";

function coverKey(category: string): string {
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
    case "Welfare":
    case "福祉":
      return "welfare";
    default:
      return "default";
  }
}

const PER_FIRST = 7; // 1 featured + 6
const PER_REST = 9; // 3 × 3

export async function BlogListPage({
  lang,
  page = 1,
}: {
  lang: Lang;
  page?: number;
}) {
  const t = getDict(lang);
  const all = await getPublishedPosts(lang);

  const totalPages =
    all.length <= PER_FIRST
      ? 1
      : 1 + Math.ceil((all.length - PER_FIRST) / PER_REST);
  const cur = Math.min(Math.max(1, page || 1), totalPages);
  const start = cur === 1 ? 0 : PER_FIRST + (cur - 2) * PER_REST;
  const count = cur === 1 ? PER_FIRST : PER_REST;
  const posts = all.slice(start, start + count);

  return (
    <>
      <PageHero
        lang={lang}
        crumbs={[{ label: t.nav[0].label, to: "" }, { label: t.blog.breadcrumb }]}
        title={t.blog.title}
        sub={t.blog.sub}
      />

      <section className="content-block">
        <div className="container">
          {all.length === 0 ? (
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
            <>
              <Reveal>
                <div className="blog-grid">
                  {posts.map((post, i) => {
                    const key = coverKey(post.category);
                    const featured = cur === 1 && i === 0;
                    return (
                      <LocalizedLink
                        key={post.slug}
                        lang={lang}
                        to={`blog/${post.slug}`}
                        className={`blog-card${featured ? " blog-card--featured" : ""}`}
                      >
                        <div className="blog-card__cover">
                          <Image
                            className="blog-card__photo"
                            src={post.featured_image || IMG.blog[key] || IMG.blog.default}
                            alt={post.title}
                            fill
                            sizes={
                              featured
                                ? "100vw"
                                : "(max-width: 820px) 100vw, (max-width: 1100px) 50vw, 33vw"
                            }
                            style={{ objectFit: "cover" }}
                          />
                          <span className="blog-card__cat">{post.category}</span>
                        </div>
                        <div className="blog-card__body">
                          <div className="blog-card__meta">
                            <span>
                              {formatDate(post.published_at || post.created_at, lang)}
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

              <Pagination lang={lang} base="blog" current={cur} total={totalPages} />
            </>
          )}
        </div>
      </section>
    </>
  );
}

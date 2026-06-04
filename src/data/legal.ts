import type { Lang } from "@/i18n";

/** A single legal document section: a heading and one-or-more HTML paragraphs. */
export interface LegalSection {
  heading: string;
  /** Pre-formatted HTML (paragraphs, lists). Rendered with dangerouslySetInnerHTML. */
  body: string;
}

export interface LegalDoc {
  title: string;
  updated: string;
  sections: LegalSection[];
}

export type LegalDocKey = "privacy" | "terms" | "cookies";

export type LegalData = Record<Lang, Record<LegalDocKey, LegalDoc>>;

/**
 * Real, professional legal copy for a maritime crew manning agency.
 * GDPR-aware. Provided in English and Simplified Chinese.
 *
 * NOTE: This is strong template copy written for a manning-agency context.
 * It is informational and should be reviewed by qualified legal counsel and
 * adapted to the operator's registered entity, jurisdiction, and processing
 * activities before being relied upon in production.
 */
export const legal: LegalData = {
  en: {
    privacy: {
      title: "Privacy Policy",
      updated: "Last updated: 1 January 2026",
      sections: [
        {
          heading: "1. Introduction",
          body: `<p>Ship Crew Agency ("we", "us", "our", or the "Company") is a global ship crew manning agency providing maritime workforce solutions to shipowners, fleet managers, ship management companies, and offshore operators. We are committed to protecting the privacy of seafarers, clients, website visitors, and business contacts.</p>
<p>This Privacy Policy explains what personal data we collect, why we collect it, how we use and share it, how long we keep it, and the rights you have over it. It applies to our website, our recruitment and crewing services, and all related communications. Please read it carefully.</p>`,
        },
        {
          heading: "2. Who We Are (Data Controller)",
          body: `<p>For the purposes of the EU General Data Protection Regulation (GDPR), the UK GDPR, and other applicable data protection laws, Ship Crew Agency acts as the data controller for the personal data described in this Policy. Where we process seafarer data on behalf of a shipowner or ship manager under a manning agreement, we may act as a processor on their instructions; in those cases the relevant client's privacy notice may also apply.</p>
<p>If you have any questions about this Policy or how we handle your data, you can contact us using the details in the "Contact Us" section below.</p>`,
        },
        {
          heading: "3. Personal Data We Collect",
          body: `<p>Because crew manning is a document-intensive, compliance-driven activity, we may collect the following categories of personal data:</p>
<ul>
<li><strong>Identity and contact data</strong> — full name, nationality, date and place of birth, photographs, postal address, email address, and telephone or messaging numbers.</li>
<li><strong>Seafarer professional data</strong> — rank, seagoing service records, sea time, vessel types served, certificates of competency (COC), STCW certificates and endorsements, GMDSS and specialist training records, seaman's book / discharge book details, and references.</li>
<li><strong>Documentation and eligibility data</strong> — passport and seaman's book numbers, visa and travel documentation, flag-state endorsements, and right-to-work or eligibility information.</li>
<li><strong>Health data</strong> — medical fitness certificates (such as ENG1 or flag-state equivalents) and vaccination records required for deployment. This is "special category" data and is handled with additional safeguards.</li>
<li><strong>Client and business contact data</strong> — names, job titles, company details, and contact information of shipowner, operator, and ship-management representatives.</li>
<li><strong>Inquiry data</strong> — information you provide through our crew inquiry forms, including vessel type, service required, ranks required, and free-text messages.</li>
<li><strong>Technical and usage data</strong> — IP address, browser type, device information, and pages visited, collected via cookies and similar technologies (see our Cookie Policy).</li>
</ul>`,
        },
        {
          heading: "4. How We Use Your Data and Our Legal Bases",
          body: `<p>We only process personal data where we have a lawful basis to do so under the GDPR. Our purposes and corresponding legal bases include:</p>
<ul>
<li><strong>Providing crewing and recruitment services</strong> — sourcing, screening, and deploying seafarers, and matching candidates to vessel requirements. Legal basis: performance of a contract, and our legitimate interests in operating a recruitment business.</li>
<li><strong>Verifying credentials and compliance</strong> — confirming STCW, MLC 2006, flag-state, and medical requirements. Legal basis: legal obligation, contractual necessity, and, for health data, reasons of substantial public interest and employment law obligations relating to maritime safety.</li>
<li><strong>Responding to inquiries</strong> — handling crew requests and business enquiries. Legal basis: legitimate interests and steps taken at your request prior to entering a contract.</li>
<li><strong>Communication and administration</strong> — managing deployment logistics, documentation, and ongoing assignments. Legal basis: contract performance and legitimate interests.</li>
<li><strong>Legal and regulatory compliance</strong> — meeting maritime, immigration, tax, and record-keeping obligations. Legal basis: legal obligation.</li>
<li><strong>Website operation and improvement</strong> — analytics and security. Legal basis: legitimate interests and, where required, consent.</li>
</ul>
<p>Where we rely on consent (for example, certain marketing or non-essential cookies), you may withdraw that consent at any time.</p>`,
        },
        {
          heading: "5. How We Share Your Data",
          body: `<p>We do not sell your personal data. We share it only as necessary to deliver our services and meet our obligations, including with:</p>
<ul>
<li><strong>Shipowners, ship managers, and operators</strong> to whom you are proposed or assigned as crew.</li>
<li><strong>Flag-state administrations, maritime authorities, and approved medical examiners</strong> for verification and endorsement.</li>
<li><strong>Travel, visa, and port agents</strong> involved in crew change and deployment logistics.</li>
<li><strong>Service providers and processors</strong> (such as IT hosting, communications, and database providers) acting under contract and only on our instructions.</li>
<li><strong>Authorities, regulators, or legal advisers</strong> where required by law, to establish or defend legal claims, or to protect safety.</li>
</ul>`,
        },
        {
          heading: "6. International Data Transfers",
          body: `<p>Maritime crewing is global by nature. Your personal data may be transferred to, and processed in, countries outside your own, including outside the European Economic Area (EEA) or the United Kingdom, where vessels are flagged, crew join, or service providers operate.</p>
<p>Where we transfer personal data internationally, we put appropriate safeguards in place, such as transfers to countries with an adequacy decision, or the use of Standard Contractual Clauses (SCCs) and additional protection measures, to ensure your data remains protected to an equivalent standard.</p>`,
        },
        {
          heading: "7. Data Retention",
          body: `<p>We keep personal data only for as long as necessary for the purposes set out in this Policy, including to provide our services, comply with maritime, legal, tax, and regulatory obligations, and resolve disputes.</p>
<p>Seafarer records are typically retained for the duration of the working relationship and for a defined period afterwards in line with statutory and industry requirements. When data is no longer required, it is securely deleted or anonymised. Specific retention periods are available on request.</p>`,
        },
        {
          heading: "8. Your Rights",
          body: `<p>Subject to applicable law, you have the right to:</p>
<ul>
<li>Access the personal data we hold about you and obtain a copy.</li>
<li>Request correction of inaccurate or incomplete data.</li>
<li>Request erasure of your data where there is no lawful reason for us to keep it.</li>
<li>Object to, or request restriction of, certain processing.</li>
<li>Request portability of data you provided to us, in a structured, machine-readable format.</li>
<li>Withdraw consent at any time where processing is based on consent.</li>
<li>Lodge a complaint with a supervisory authority, such as your local data protection regulator.</li>
</ul>
<p>To exercise any of these rights, please contact us using the details below. We may need to verify your identity before responding.</p>`,
        },
        {
          heading: "9. Data Security",
          body: `<p>We implement appropriate technical and organisational measures to protect personal data against unauthorised access, loss, misuse, or alteration. These include access controls, encryption in transit, secure hosting, and staff confidentiality obligations. While no system can be guaranteed to be completely secure, we continually review and improve our safeguards.</p>`,
        },
        {
          heading: "10. Changes to This Policy and Contact",
          body: `<p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The "Last updated" date above shows when it was last revised. Material changes will be communicated where appropriate.</p>
<p>For any privacy questions or to exercise your rights, contact us at <a href="mailto:info@shipcrewagency.com">info@shipcrewagency.com</a>.</p>`,
        },
      ],
    },
    terms: {
      title: "Terms of Service",
      updated: "Last updated: 1 January 2026",
      sections: [
        {
          heading: "1. Agreement to These Terms",
          body: `<p>These Terms of Service ("Terms") govern your access to and use of the Ship Crew Agency website and the information, inquiry forms, and content made available through it (the "Site"). By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, please do not use the Site.</p>
<p>Engagement of our crew manning and recruitment services is governed by a separate written manning or service agreement. In the event of any conflict between these Terms and a signed service agreement, the service agreement prevails for the services it covers.</p>`,
        },
        {
          heading: "2. About Our Services",
          body: `<p>Ship Crew Agency is a maritime crew manning and recruitment agency. The Site provides general information about our services, crew categories, compliance practices, and a means to submit crew inquiries. Content on the Site is provided for general information only and does not constitute a binding offer, a guarantee of crew availability, or professional, legal, or compliance advice.</p>`,
        },
        {
          heading: "3. Eligibility and Acceptable Use",
          body: `<p>You may use the Site only for lawful purposes and in accordance with these Terms. You agree not to:</p>
<ul>
<li>Use the Site in any way that breaches applicable laws or regulations.</li>
<li>Submit false, misleading, or fraudulent information, including in crew inquiry forms.</li>
<li>Attempt to gain unauthorised access to the Site, its servers, or connected systems.</li>
<li>Introduce malicious code, or interfere with the proper operation or security of the Site.</li>
<li>Use automated means to scrape, harvest, or collect data from the Site without our consent.</li>
</ul>`,
        },
        {
          heading: "4. Crew Inquiries and Submissions",
          body: `<p>When you submit a crew inquiry or other information, you confirm that the information is accurate and that you are authorised to provide it. Submitting an inquiry does not create a contract for services or any obligation on us to supply crew. Any engagement will be confirmed only through a separate written agreement and proposal.</p>
<p>Personal data submitted through the Site is handled in accordance with our Privacy Policy.</p>`,
        },
        {
          heading: "5. Intellectual Property",
          body: `<p>The Site and all of its content — including text, graphics, logos, the Ship Crew Agency name and marks, layout, and design — are owned by or licensed to the Company and are protected by intellectual property laws. You may view and print Site content for your own internal, non-commercial reference. You may not reproduce, distribute, modify, or create derivative works from the Site without our prior written permission.</p>`,
        },
        {
          heading: "6. Third-Party Links",
          body: `<p>The Site may contain links to third-party websites or resources. These are provided for convenience only. We do not control and are not responsible for the content, accuracy, or practices of any third-party site, and inclusion of a link does not imply endorsement. Accessing third-party sites is at your own risk and subject to their terms.</p>`,
        },
        {
          heading: "7. Disclaimers",
          body: `<p>The Site is provided on an "as is" and "as available" basis. To the fullest extent permitted by law, we disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, accuracy, and non-infringement. We do not warrant that the Site will be uninterrupted, error-free, secure, or free of harmful components, or that any information on it is complete or current.</p>`,
        },
        {
          heading: "8. Limitation of Liability",
          body: `<p>To the fullest extent permitted by law, the Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or goodwill, arising out of or in connection with your use of, or inability to use, the Site. Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable law.</p>`,
        },
        {
          heading: "9. Indemnity",
          body: `<p>You agree to indemnify and hold harmless the Company and its officers, employees, and agents from any claims, liabilities, damages, losses, and expenses arising out of your breach of these Terms or your misuse of the Site.</p>`,
        },
        {
          heading: "10. Governing Law and Changes",
          body: `<p>These Terms are governed by the laws of the jurisdiction in which the Company is established, without regard to conflict-of-law principles, and the courts of that jurisdiction shall have jurisdiction over any dispute, subject to any mandatory consumer protections.</p>
<p>We may revise these Terms from time to time. The "Last updated" date indicates the latest revision, and continued use of the Site after changes constitutes acceptance of the updated Terms. Questions about these Terms can be sent to <a href="mailto:info@shipcrewagency.com">info@shipcrewagency.com</a>.</p>`,
        },
      ],
    },
    cookies: {
      title: "Cookie Policy",
      updated: "Last updated: 1 January 2026",
      sections: [
        {
          heading: "1. About This Cookie Policy",
          body: `<p>This Cookie Policy explains how Ship Crew Agency uses cookies and similar technologies on our website. It should be read together with our Privacy Policy, which explains how we handle personal data more generally. By using our website, you agree to the use of cookies as described here, except where your consent is required and not given.</p>`,
        },
        {
          heading: "2. What Are Cookies?",
          body: `<p>Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work, to improve efficiency, and to provide information to site operators. Similar technologies — such as pixels, local storage, and software development kits — perform comparable functions, and references to "cookies" in this Policy include these technologies.</p>`,
        },
        {
          heading: "3. Types of Cookies We Use",
          body: `<p>We use the following categories of cookies:</p>
<ul>
<li><strong>Strictly necessary cookies</strong> — essential for the website to function, such as page navigation, security, and remembering your language preference (English or Simplified Chinese). These cannot be switched off in our systems.</li>
<li><strong>Performance and analytics cookies</strong> — help us understand how visitors interact with the website by collecting aggregated, and where possible anonymised, information. This helps us improve content and usability.</li>
<li><strong>Functional cookies</strong> — enable enhanced functionality and personalisation, such as remembering choices you make.</li>
</ul>
<p>We do not use cookies to build advertising profiles. If this changes, we will update this Policy and obtain consent where required.</p>`,
        },
        {
          heading: "4. Third-Party Cookies",
          body: `<p>Some cookies may be set by third-party service providers, for example analytics or content delivery providers that help us operate and measure the website. These providers process data in accordance with their own privacy and cookie policies. We take reasonable steps to ensure such providers handle data responsibly.</p>`,
        },
        {
          heading: "5. Legal Basis for Cookies",
          body: `<p>We place strictly necessary cookies on the basis of our legitimate interests in operating a secure and functional website. For non-essential cookies (such as analytics and functional cookies), where required by applicable law we rely on your consent, which you can give, decline, or withdraw at any time.</p>`,
        },
        {
          heading: "6. Managing Your Cookie Preferences",
          body: `<p>You can control and manage cookies in several ways. Most web browsers allow you to refuse or delete cookies through their settings. Please note that blocking strictly necessary cookies may affect the functionality of the website, including your saved language preference.</p>
<p>For more information on managing cookies, you can consult the help documentation of your browser.</p>`,
        },
        {
          heading: "7. Changes and Contact",
          body: `<p>We may update this Cookie Policy from time to time to reflect changes in technology, law, or our practices. The "Last updated" date above shows the most recent revision. If you have any questions about our use of cookies, please contact us at <a href="mailto:info@shipcrewagency.com">info@shipcrewagency.com</a>.</p>`,
        },
      ],
    },
  },

  zh: {
    privacy: {
      title: "隐私政策",
      updated: "最后更新：2026年1月1日",
      sections: [
        {
          heading: "1. 引言",
          body: `<p>Ship Crew Agency（"我们"、"本公司"）是一家全球船舶配员代理机构，为船东、船队管理者、船舶管理公司及海上作业运营商提供海事人力解决方案。我们致力于保护海员、客户、网站访问者及业务联系人的隐私。</p>
<p>本隐私政策说明了我们收集哪些个人数据、收集的目的、如何使用与共享这些数据、保存多久，以及您对这些数据享有的权利。本政策适用于我们的网站、招聘与配员服务以及所有相关沟通。请您仔细阅读。</p>`,
        },
        {
          heading: "2. 我们是谁（数据控制者）",
          body: `<p>就欧盟《通用数据保护条例》（GDPR）、英国 GDPR 及其他适用的数据保护法律而言，Ship Crew Agency 为本政策所述个人数据的数据控制者。在我们依据配员协议代表船东或船舶管理人处理海员数据的情形下，我们可能作为处理者按其指示行事；在此类情形中，相关客户的隐私声明亦可能适用。</p>
<p>如您对本政策或我们的数据处理方式有任何疑问，可通过下文"联系我们"一节中的方式与我们联系。</p>`,
        },
        {
          heading: "3. 我们收集的个人数据",
          body: `<p>由于船舶配员是一项文件密集、以合规为导向的业务，我们可能收集以下类别的个人数据：</p>
<ul>
<li><strong>身份与联系数据</strong> —— 姓名、国籍、出生日期与地点、照片、通讯地址、电子邮箱以及电话或即时通讯号码。</li>
<li><strong>海员职业数据</strong> —— 职级、海上服务记录、海上资历、所服务的船舶类型、适任证书（COC）、STCW 证书及签注、GMDSS 与专业培训记录、海员证／离船证明详情以及推荐人信息。</li>
<li><strong>证件与资格数据</strong> —— 护照与海员证号码、签证与旅行证件、船旗国签注以及工作资格或资质信息。</li>
<li><strong>健康数据</strong> —— 派遣所需的体检合格证书（如 ENG1 或船旗国等效证书）及疫苗接种记录。此为"特殊类别"数据，将采取额外保护措施处理。</li>
<li><strong>客户与业务联系数据</strong> —— 船东、运营商及船舶管理方代表的姓名、职务、公司信息及联系方式。</li>
<li><strong>咨询数据</strong> —— 您通过配员咨询表单提供的信息，包括船舶类型、所需服务、所需职级及自由文本留言。</li>
<li><strong>技术与使用数据</strong> —— 通过 Cookie 及类似技术收集的 IP 地址、浏览器类型、设备信息及访问页面（详见我们的 Cookie 政策）。</li>
</ul>`,
        },
        {
          heading: "4. 我们如何使用您的数据及法律依据",
          body: `<p>我们仅在 GDPR 项下具备合法依据时处理个人数据。我们的处理目的及相应法律依据包括：</p>
<ul>
<li><strong>提供配员与招聘服务</strong> —— 物色、筛选并派遣海员，并将候选人与船舶需求相匹配。法律依据：合同的履行，以及我们经营招聘业务的合法利益。</li>
<li><strong>核验资质与合规</strong> —— 确认 STCW、MLC 2006、船旗国及体检要求。法律依据：法律义务、合同必要性；对健康数据而言，则基于重大公共利益理由及与海事安全相关的雇佣法义务。</li>
<li><strong>回应咨询</strong> —— 处理配员请求与业务咨询。法律依据：合法利益及应您请求在订立合同前采取的步骤。</li>
<li><strong>沟通与行政管理</strong> —— 管理派遣物流、文件及在岗事务。法律依据：合同履行与合法利益。</li>
<li><strong>法律与监管合规</strong> —— 履行海事、移民、税务及记录保存义务。法律依据：法律义务。</li>
<li><strong>网站运营与改进</strong> —— 分析与安全。法律依据：合法利益，并在法律要求时基于同意。</li>
</ul>
<p>在我们以同意为依据时（例如某些营销或非必要 Cookie），您可随时撤回该同意。</p>`,
        },
        {
          heading: "5. 我们如何共享您的数据",
          body: `<p>我们不会出售您的个人数据。我们仅在提供服务及履行义务所必需的范围内共享数据，包括与以下各方共享：</p>
<ul>
<li><strong>船东、船舶管理人及运营商</strong>，即向其推荐或派遣您担任船员的一方。</li>
<li><strong>船旗国主管机关、海事当局及经认可的体检医师</strong>，用于核验与签注。</li>
<li><strong>旅行、签证及港口代理</strong>，参与换班与派遣物流。</li>
<li><strong>服务提供商与处理者</strong>（如 IT 托管、通讯及数据库提供商），依据合同并仅按我们的指示行事。</li>
<li><strong>主管当局、监管机构或法律顾问</strong>，在法律要求、确立或抗辩法律主张或保护安全所需时。</li>
</ul>`,
        },
        {
          heading: "6. 数据的跨境传输",
          body: `<p>海事配员本质上是全球性的。您的个人数据可能被传输至您所在国家以外的国家（包括欧洲经济区（EEA）或英国境外）并在该等国家处理，例如船舶注册地、船员上船地或服务提供商运营所在地。</p>
<p>在跨境传输个人数据时，我们将采取适当的保障措施，例如向具备充分性认定的国家传输，或采用标准合同条款（SCC）及附加保护措施，以确保您的数据持续受到同等标准的保护。</p>`,
        },
        {
          heading: "7. 数据保留",
          body: `<p>我们仅在为实现本政策所述目的（包括提供服务、遵守海事、法律、税务及监管义务以及解决争议）所必需的期间内保留个人数据。</p>
<p>海员记录通常在工作关系存续期间，以及之后按照法定及行业要求所确定的期间内予以保留。当数据不再需要时，将被安全删除或匿名化。具体的保留期限可应请求提供。</p>`,
        },
        {
          heading: "8. 您的权利",
          body: `<p>在适用法律的范围内，您有权：</p>
<ul>
<li>访问我们持有的与您相关的个人数据并获取副本。</li>
<li>要求更正不准确或不完整的数据。</li>
<li>在我们没有合法理由保留数据时，要求删除您的数据。</li>
<li>反对某些处理活动或要求限制处理。</li>
<li>以结构化、机器可读的格式要求转移您向我们提供的数据。</li>
<li>在处理以同意为依据时随时撤回同意。</li>
<li>向监管机构（如您当地的数据保护监管机关）提起投诉。</li>
</ul>
<p>如需行使上述任何权利，请通过下方方式与我们联系。在回应前，我们可能需要核实您的身份。</p>`,
        },
        {
          heading: "9. 数据安全",
          body: `<p>我们采取适当的技术与组织措施，保护个人数据免遭未经授权的访问、丢失、滥用或篡改，包括访问控制、传输加密、安全托管及员工保密义务。尽管没有任何系统能够保证绝对安全，我们仍会持续审查并改进我们的保护措施。</p>`,
        },
        {
          heading: "10. 本政策的变更与联系方式",
          body: `<p>我们可能会不时更新本隐私政策，以反映我们做法的变化或法律要求。上方的"最后更新"日期显示其最近一次修订的时间。如有重大变更，我们将在适当情况下予以告知。</p>
<p>如有任何隐私相关问题或需行使您的权利，请通过 <a href="mailto:info@shipcrewagency.com">info@shipcrewagency.com</a> 与我们联系。</p>`,
        },
      ],
    },
    terms: {
      title: "服务条款",
      updated: "最后更新：2026年1月1日",
      sections: [
        {
          heading: "1. 对本条款的接受",
          body: `<p>本服务条款（"条款"）规范您对 Ship Crew Agency 网站及其所提供的信息、咨询表单与内容（"本网站"）的访问与使用。访问或使用本网站，即表示您同意受本条款约束。如您不同意，请勿使用本网站。</p>
<p>对我们配员与招聘服务的委托，受另行签署的书面配员或服务协议规范。如本条款与已签署的服务协议之间存在冲突，则就该协议所涵盖的服务而言，以服务协议为准。</p>`,
        },
        {
          heading: "2. 关于我们的服务",
          body: `<p>Ship Crew Agency 是一家海事船舶配员与招聘代理机构。本网站提供有关我们服务、船员类别、合规做法的一般信息，以及提交配员咨询的途径。本网站内容仅供一般参考，不构成具有约束力的要约、船员可供性的保证，亦不构成专业、法律或合规建议。</p>`,
        },
        {
          heading: "3. 资格与可接受使用",
          body: `<p>您仅可将本网站用于合法目的，并须遵守本条款。您同意不得：</p>
<ul>
<li>以任何违反适用法律或法规的方式使用本网站。</li>
<li>提交虚假、误导或欺诈性信息，包括在配员咨询表单中。</li>
<li>试图未经授权访问本网站、其服务器或相连系统。</li>
<li>植入恶意代码，或干扰本网站的正常运行或安全。</li>
<li>未经我们同意，使用自动化手段抓取、采集或收集本网站数据。</li>
</ul>`,
        },
        {
          heading: "4. 配员咨询与提交",
          body: `<p>当您提交配员咨询或其他信息时，即表示您确认该信息准确无误，且您已获授权提供该信息。提交咨询并不构成服务合同，亦不使我们负有供应船员的任何义务。任何委托仅通过另行签署的书面协议与方案予以确认。</p>
<p>通过本网站提交的个人数据，将按照我们的隐私政策处理。</p>`,
        },
        {
          heading: "5. 知识产权",
          body: `<p>本网站及其全部内容——包括文本、图形、徽标、Ship Crew Agency 名称与标识、版面与设计——均由本公司拥有或经许可使用，并受知识产权法律保护。您可为自身内部、非商业参考之目的查看与打印本网站内容。未经我们事先书面许可，您不得复制、分发、修改本网站或据其创作衍生作品。</p>`,
        },
        {
          heading: "6. 第三方链接",
          body: `<p>本网站可能包含指向第三方网站或资源的链接，仅为方便而提供。我们不控制亦不对任何第三方网站的内容、准确性或做法负责，且链接的存在并不意味着认可。访问第三方网站的风险由您自行承担，并受其条款约束。</p>`,
        },
        {
          heading: "7. 免责声明",
          body: `<p>本网站按"现状"及"可用"基础提供。在法律允许的最大范围内，我们不作任何明示或默示的保证，包括对适销性、特定用途适用性、准确性及不侵权的保证。我们不保证本网站将不间断、无错误、安全或不含有害成分，亦不保证其上任何信息完整或为最新。</p>`,
        },
        {
          heading: "8. 责任限制",
          body: `<p>在法律允许的最大范围内，对于因您使用或无法使用本网站而引起或与之相关的任何间接、附带、特殊、后果性或惩罚性损害，或任何利润、收入、数据或商誉损失，本公司概不负责。本条款中的任何内容均不排除或限制依适用法律不得排除或限制的责任。</p>`,
        },
        {
          heading: "9. 赔偿",
          body: `<p>您同意就因您违反本条款或滥用本网站而引起的任何索赔、责任、损害、损失及费用，对本公司及其高级职员、雇员与代理人作出赔偿并使其免受损害。</p>`,
        },
        {
          heading: "10. 适用法律与变更",
          body: `<p>本条款受本公司设立地司法管辖区的法律管辖，不考虑法律冲突原则，且在符合任何强制性消费者保护规定的前提下，该司法管辖区的法院对任何争议具有管辖权。</p>
<p>我们可能不时修订本条款。"最后更新"日期表示最近一次修订，且在变更后继续使用本网站即构成对更新条款的接受。有关本条款的问题可发送至 <a href="mailto:info@shipcrewagency.com">info@shipcrewagency.com</a>。</p>`,
        },
      ],
    },
    cookies: {
      title: "Cookie 政策",
      updated: "最后更新：2026年1月1日",
      sections: [
        {
          heading: "1. 关于本 Cookie 政策",
          body: `<p>本 Cookie 政策说明 Ship Crew Agency 如何在我们的网站上使用 Cookie 及类似技术。本政策应与我们的隐私政策一并阅读，后者更全面地说明了我们如何处理个人数据。使用我们的网站，即表示您同意按此处所述使用 Cookie，但在法律要求取得您同意而您未给予同意的情形除外。</p>`,
        },
        {
          heading: "2. 什么是 Cookie？",
          body: `<p>Cookie 是您访问网站时放置于您设备上的小型文本文件。它们被广泛用于使网站正常运行、提升效率并向网站运营者提供信息。类似技术——如像素、本地存储及软件开发工具包——具有相近功能，本政策中提及的"Cookie"包括此类技术。</p>`,
        },
        {
          heading: "3. 我们使用的 Cookie 类型",
          body: `<p>我们使用以下类别的 Cookie：</p>
<ul>
<li><strong>严格必要的 Cookie</strong> —— 网站运行所必需，例如页面导航、安全以及记住您的语言偏好（英文或简体中文）。这些 Cookie 无法在我们的系统中关闭。</li>
<li><strong>性能与分析 Cookie</strong> —— 通过收集汇总的、并在可能情况下匿名化的信息，帮助我们了解访问者如何与网站互动，从而改进内容与可用性。</li>
<li><strong>功能性 Cookie</strong> —— 启用增强功能与个性化，例如记住您所做的选择。</li>
</ul>
<p>我们不使用 Cookie 来构建广告画像。如有变更，我们将更新本政策并在法律要求时取得同意。</p>`,
        },
        {
          heading: "4. 第三方 Cookie",
          body: `<p>某些 Cookie 可能由第三方服务提供商设置，例如帮助我们运营与衡量网站的分析或内容分发提供商。这些提供商依据其各自的隐私与 Cookie 政策处理数据。我们采取合理措施确保此类提供商负责任地处理数据。</p>`,
        },
        {
          heading: "5. 使用 Cookie 的法律依据",
          body: `<p>我们基于运营安全且功能完善网站的合法利益放置严格必要的 Cookie。对于非必要的 Cookie（如分析与功能性 Cookie），在适用法律要求时，我们以您的同意为依据，您可随时给予、拒绝或撤回该同意。</p>`,
        },
        {
          heading: "6. 管理您的 Cookie 偏好",
          body: `<p>您可通过多种方式控制与管理 Cookie。大多数网页浏览器允许您通过其设置拒绝或删除 Cookie。请注意，屏蔽严格必要的 Cookie 可能会影响网站功能，包括您已保存的语言偏好。</p>
<p>有关管理 Cookie 的更多信息，您可查阅浏览器的帮助文档。</p>`,
        },
        {
          heading: "7. 变更与联系方式",
          body: `<p>我们可能会不时更新本 Cookie 政策，以反映技术、法律或我们做法的变化。上方的"最后更新"日期显示最近一次修订。如您对我们使用 Cookie 有任何疑问，请通过 <a href="mailto:info@shipcrewagency.com">info@shipcrewagency.com</a> 与我们联系。</p>`,
        },
      ],
    },
  },
};

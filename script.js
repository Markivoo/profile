// --- SINGLE PAGE APPLICATION (SPA) ROUTER ---
const tabMapping = {
  'home': 'home', 'about': 'about', 'experience': 'experience',
  'capabilities': 'capabilities', 'impact': 'impact', 'contact': 'contact'
};

const navLinks = document.querySelectorAll('.nav nav a');
const tabSections = document.querySelectorAll('.tab-section');
const menu = document.querySelector('.hamb');
const navContainer = document.querySelector('.nav nav');

let isFullPageMode = true;
let lastFocusedElement = null;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function showModal(modal, focusTarget) {
  if (!modal) return;
  lastFocusedElement = document.activeElement;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (focusTarget) window.setTimeout(() => focusTarget.focus(), 40);
}

function switchTab(targetHash) {
  const rawTarget = targetHash.replace('#', '');
  if (!rawTarget || rawTarget === 'home') {
    isFullPageMode = true;
    tabSections.forEach(sec => sec.style.display = 'block');
    if (rawTarget === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
    navLinks.forEach(link => link.classList.remove('active'));
    const homeLink = document.querySelector('nav a[href="#home"]');
    if(homeLink) homeLink.classList.add('active');
  } else {
    isFullPageMode = false;
    const activeTabId = tabMapping[rawTarget] || rawTarget;
    tabSections.forEach(sec => sec.style.display = 'none');
    const targetSection = document.getElementById(`tab-${activeTabId}`);
    if (targetSection) targetSection.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'auto' });
    navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`nav a[href="#${activeTabId}"]`);
    if(activeLink) activeLink.classList.add('active');
  }
  if(navContainer) {
    navContainer.classList.remove('mobile');
    if(menu) menu.setAttribute('aria-expanded', 'false');
  }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetHash = this.getAttribute('href');
    history.pushState(null, null, targetHash);
    switchTab(targetHash);
  });
});

window.addEventListener('popstate', () => { switchTab(window.location.hash); });
window.addEventListener('load', () => { switchTab(window.location.hash); });

const sectionsForScroll = [...document.querySelectorAll('main section[id]')];
const ob = new IntersectionObserver(entries => {
  if (!isFullPageMode) return; 
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });
sectionsForScroll.forEach(section => ob.observe(section));

if(menu && navContainer) {
  menu.addEventListener('click', () => {
    const isOpen = navContainer.classList.toggle('mobile');
    menu.setAttribute('aria-expanded', String(isOpen));
  });
}

// --- 3D HERO IMAGE HOVER & CLICK LOGIC ---
const tiltContainer = document.getElementById('hero-tilt');
if (tiltContainer) {
  tiltContainer.addEventListener('mousemove', (e) => {
    if (prefersReducedMotion.matches) return;
    const rect = tiltContainer.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;
    tiltContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    tiltContainer.style.transition = 'none'; 
  });
  tiltContainer.addEventListener('mouseleave', () => {
    tiltContainer.style.transform = `rotateX(0deg) rotateY(0deg)`;
    tiltContainer.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'; 
  });
  tiltContainer.addEventListener('click', () => {
    const detailModal = document.getElementById('detail-modal');
    document.getElementById('modal-title').innerText = "Where Business Meets Technology";
    document.getElementById('modal-icon').innerText = "◫";
    document.getElementById('modal-tags').innerHTML = `<span>Business Context</span><span>Analytics</span><span>Technology</span>`;
    document.getElementById('modal-body').innerHTML = `
      <p><strong>I build the bridge between business questions, enterprise data and technology, turning complex information into trusted analytics that organisations can use to operate and make decisions.</strong></p>
      <p>My career has developed across three connected dimensions:</p>
      <ul>
        <li><strong>Business Understanding:</strong> I understand the processes behind the data.</li>
        <li><strong>Analytics:</strong> I understand how information needs to be structured, analysed and communicated.</li>
        <li><strong>Technology:</strong> I understand how the underlying data platforms and processing systems need to work.</li>
      </ul>
    `;
    showModal(detailModal, document.querySelector('#detail-modal .modal-close'));
  });
}

// --- MODAL: LET'S CONNECT ---
const connectModal = document.getElementById('connect-modal');
const btnLetsConnect = document.getElementById('btn-lets-connect');
if(btnLetsConnect) {
  btnLetsConnect.addEventListener('click', () => {
    showModal(connectModal, document.querySelector('#connect-modal .modal-close'));
  });
}

// --- MODAL: RICH CONTENT DATA ---
const detailsData = {
  // 1. CAPABILITIES & LEADERSHIP
  "Analytics Leadership": `
    <p>I translate business and management priorities into analytics roadmaps, reporting capabilities and data initiatives. The objective is not simply to produce more reports. It is to make analytics dependable, repeatable and aligned with the way the business operates.</p>
    <h4>My work includes:</h4>
    <ul>
      <li>Analytics strategy and roadmap definition</li>
      <li>Business requirement discovery & stakeholder management</li>
      <li>Prioritisation of analytics initiatives</li>
      <li>KPI and reporting definition</li>
      <li>Executive and management reporting</li>
      <li>Cross-functional coordination between business, finance and technology teams</li>
      <li>Establishing standards for reporting, data quality and governance</li>
      <li>Team mentoring and capability development</li>
    </ul>
  `,
  "Enterprise Business Intelligence": `
    <p>I design and support BI environments that bring together operational, financial and transactional data into a consistent reporting ecosystem. I focus particularly on eliminating situations where different teams use different versions of the same number.</p>
    <h4>Areas include:</h4>
    <ul>
      <li>Power BI dashboard development & DAX analytical modelling</li>
      <li>Executive reporting & KPI frameworks</li>
      <li>Operational, Revenue, and Financial analytics</li>
      <li>Data model design & Automated reporting</li>
      <li>Incremental data processing & self-service analytics</li>
    </ul>
    <h4>BI Philosophy</h4>
    <p>A good dashboard should answer three questions: <strong>What is happening? Why is it happening? Where does the business need to act?</strong></p>
  `,
  "Finance & ERP Analytics": `
    <p>A significant part of my current work sits at the intersection of finance, ERP data and analytics. The objective is to transform complex ERP and financial data into structured, traceable and usable information for finance teams and management.</p>
    <h4>This includes working with:</h4>
    <ul>
      <li>General Ledger, Accounts Payable, and Accounts Receivable</li>
      <li>Customer balances, Vendor balances, and Ageing analysis</li>
      <li>Revenue and Bank/Supplier/Customer transactions</li>
      <li>Forex transactions and Financial period reporting</li>
      <li>ERP data extraction, transformation, and transaction-level validation</li>
    </ul>
  `,
  "Data Platform & Engineering": `
    <p>Although my career originated in analytics and business reporting, I have progressively moved deeper into the data platform layer. I work across: <strong>SQL → Python/PySpark → ETL/ELT → Data Platforms → Analytical Models → BI</strong>.</p>
    <h4>This includes:</h4>
    <ul>
      <li>Enterprise data processing & Data pipeline design</li>
      <li>Incremental processing & large-volume transaction handling</li>
      <li>Cloud data architecture (Azure Synapse, AWS Glue, Athena, S3)</li>
      <li>Data validation, source-to-report lineage, and performance optimisation</li>
    </ul>
    <h4>Cost & Performance Optimisation</h4>
    <p>Optimisation is evaluated as a balance between: <strong>Performance + Reliability + Cost + Business Impact</strong> rather than cost reduction alone.</p>
  `,
  "Business First": `
    <p>Technology should solve a business problem.</p>
    <p>I start by understanding what the business actually needs before choosing the technical approach. The goal is to ensure every dashboard, pipeline, and report delivers tangible value rather than just technical complexity.</p>
  `,
  "Trusted Numbers": `
    <p>The value of analytics depends on trust.</p>
    <p>A report is useful only when stakeholders understand the definition, source and logic behind the information. When reporting supports finance and executive decisions, I enforce reconciliation, source-to-final checks, and strict data governance.</p>
  `,
  "Build for Scale": `
    <p>A solution that works once is not necessarily a good solution.</p>
    <p>I prefer repeatable processes, reusable data structures, automation and standardised reporting logic. Moving recurring work from manual handling into repeatable workflows makes operations easier to monitor, maintain and extend.</p>
  `,
  "Stay Technical": `
    <p>Leadership in analytics should not create distance from the technology.</p>
    <p>I believe understanding the data, code, architecture and technical constraints makes business leadership more effective. I maintain hands-on expertise across SQL, Python, and Power BI models to architect practical solutions rapidly.</p>
  `,

  // 2. FROM DATA TO DECISIONS (FLOW CARDS)
  "Step 01: Business Need": `
    <p><strong>Start with the business question.</strong></p>
    <ul>
      <li>What decision needs to be made?</li>
      <li>What process needs better visibility?</li>
      <li>What problem is currently consuming manual effort?</li>
      <li>What information does finance, operations or leadership actually need?</li>
    </ul>
  `,
  "Step 02: Source Systems": `
    <p><strong>Identify the systems that contain the required information.</strong> A reporting problem is often actually a source-data or integration problem.</p>
    <ul>
      <li>ERP & Finance systems</li>
      <li>Transactional databases & Operational applications</li>
      <li>CSV / flat files & Cloud storage</li>
      <li>Supporting reference data</li>
    </ul>
  `,
  "Step 03: Data Processing": `
    <p><strong>Transform raw source information into a structured analytical dataset.</strong></p>
    <ul>
      <li>Extraction, Transformation, and Standardisation</li>
      <li>Data mapping, Joining, and Aggregation</li>
      <li>Incremental processing</li>
      <li>Business-rule application & Exception handling</li>
    </ul>
  `,
  "Step 04: Validation & Controls": `
    <p><strong>Before information becomes a management number, it needs to be validated.</strong> The objective is to make the number explainable, not merely available.</p>
    <ul>
      <li>Record-count validation & Duplicate detection</li>
      <li>Source-to-target reconciliation</li>
      <li>Business-rule validation & Mapping checks</li>
      <li>Exception reporting & Period/Amount validation</li>
    </ul>
  `,
  "Step 05: Analytics & BI": `
    <p><strong>Once the data foundation is reliable, analytics becomes much more effective.</strong></p>
    <ul>
      <li>Power BI dashboards & KPI monitoring</li>
      <li>Finance & Operational reports</li>
      <li>Exception dashboards & Ageing analysis</li>
      <li>Reconciliation views & Trend analysis</li>
    </ul>
  `,
  "Step 06: Business Decision": `
    <p><strong>The final purpose is action.</strong> Better analytics should help teams:</p>
    <ul>
      <li>Identify issues earlier & reduce manual investigation</li>
      <li>Understand financial movements & monitor operational performance</li>
      <li>Improve process control & reconcile information faster</li>
      <li>Make decisions with greater confidence</li>
    </ul>
  `,

  // 3. TECHNOLOGY & TOOLS (TECH CARDS)
  "Data & Programming": `
    <p><strong>SQL:</strong> Advanced querying, transformation, reconciliation, analytical processing and data validation.</p>
    <p><strong>Python:</strong> Automation, data processing, transformation and analytical workflows.</p>
    <p><strong>PySpark:</strong> Distributed processing of high-volume datasets and scalable transformation workflows.</p>
  `,
  "BI & Visualization": `
    <p><strong>Power BI:</strong> Enterprise dashboards, management reporting, KPI monitoring and analytical visualisation.</p>
    <p><strong>DAX:</strong> Business calculations, time intelligence, analytical measures and reporting logic.</p>
    <p><strong>Excel / VBA:</strong> Financial analysis, modelling, reporting automation and process optimisation in earlier-generation environments.</p>
  `,
  "Cloud & Data Platforms": `
    <p><strong>Azure Synapse Analytics:</strong> Enterprise data processing, analytical workloads and cloud data architecture.</p>
    <p><strong>AWS Glue:</strong> Cloud ETL and data processing.</p>
    <p><strong>AWS Athena:</strong> Serverless analytical querying.</p>
    <p><strong>Amazon S3:</strong> Cloud data storage and data-lake-oriented workflows.</p>
  `,
  "Enterprise Systems": `
    <p>Deep familiarity with mapping analytics to business and transactional architecture.</p>
    <ul>
      <li>ERP & Finance systems</li>
      <li>Transactional databases</li>
      <li>Customer & Vendor data</li>
      <li>Banking & General Ledger data</li>
    </ul>
  `,
  "Integration & Governance": `
    <p>Designing workflows that treat validation as a continuous process, not just a final step.</p>
    <ul>
      <li>ETL / ELT & Data pipelines</li>
      <li>Data transformation & Data modelling</li>
      <li>Validation frameworks & Reconciliation</li>
      <li>Exception handling & Access controls</li>
    </ul>
  `,

  // 4. CAREER EVOLUTION (TIMELINE CARDS)
  "DTDC Courier & Cargo": `
    <p><strong>Operations & Customer Relationship Management (2012-2014)</strong></p>
    <p>Started my career close to the operational side of the business, working with customers, requirements, service issues, regional reporting and operational coordination. This experience provided an early understanding of how business processes generate data and how operational information is used to monitor performance.</p>
  `,
  "HomeShop18": `
    <p><strong>MIS & Reporting (2014-2016)</strong></p>
    <p>Moved deeper into structured reporting and business information. Responsibilities included daily, weekly and monthly reporting, data analysis, management information and coordination between business requirements and reporting outputs.</p>
  `,
  "Macro Commerce": `
    <p><strong>Finance Analytics (2016-2017)</strong></p>
    <p>Moved into finance-oriented analytics, working with revenue, expenses, cost of sales and CAPEX. This was an important step in developing a stronger understanding of financial analysis and reporting automation.</p>
  `,
  "DEN Networks": `
    <p><strong>Sales Operations & Business Analytics (2017-2022)</strong></p>
    <p>Worked across sales operations, reporting processes, business analysis and performance management. This period strengthened my experience in stakeholder engagement, process mapping, operational analysis and structured reporting.</p>
  `,
  "OYO": `
    <p><strong>Business Analytics (2022-2023)</strong></p>
    <p>Worked on business architecture, requirements analysis, process understanding, performance indicators, trend analysis, root-cause analysis and management reporting. This experience further strengthened the connection between business processes and analytical solutions.</p>
  `,

  // 5. EXPERIENCE / WORK GRID
  "Analytics Manager at TBO.COM": `
    <p><strong>Analytics Manager · January 2023 - Present</strong></p>
    <p>I currently lead analytics and business intelligence initiatives across finance, revenue and operations in a multi-entity global environment.</p>
    <h4>Working Across the Enterprise Data Stack</h4>
    <ul>
      <li><strong>Business Layer:</strong> Finance, Revenue, Operations, Reconciliation.</li>
      <li><strong>Enterprise Systems:</strong> ERP, Financial transactions, Customer/Vendor transactions.</li>
      <li><strong>Data Processing:</strong> SQL, Python, PySpark, ETL/ELT, Business-rule processing.</li>
      <li><strong>Cloud Data Platform:</strong> Azure Synapse, AWS Glue, AWS Athena, Amazon S3.</li>
      <li><strong>Analytics Layer:</strong> Power BI, DAX, Data models, Executive dashboards.</li>
      <li><strong>Governance & Controls:</strong> Validation, Reconciliation, Data quality, Auditability.</li>
    </ul>
  `,
  "Finance Reporting & Analytics": `
    <p>Built and supported analytical processes that convert ERP and transactional data into finance-ready reporting. The focus is on improving visibility while reducing dependence on manual data preparation.</p>
    <h4>Key areas include:</h4>
    <ul>
      <li>General Ledger reporting</li>
      <li>Accounts Payable & Accounts Receivable</li>
      <li>Supplier balance analysis & Vendor/Debtor ageing</li>
      <li>Revenue analysis & Financial transaction analysis</li>
      <li>Reconciliation & Financial-period reporting</li>
      <li>Transaction-level controls & Management reporting</li>
    </ul>
  `,
  "ERP Data Processing & Reconciliation": `
    <p>Worked extensively with ERP transaction data where correctness depends on both technical processing and finance/business rules. The analytical layer is designed to retain traceability from the final reporting output back towards the underlying transactions.</p>
    <h4>This includes:</h4>
    <ul>
      <li>High-volume transaction processing</li>
      <li>Source-to-target reconciliation</li>
      <li>Transaction mapping & Financial validation</li>
      <li>Data completeness checks & Exception identification</li>
      <li>Controlled processing & Audit-friendly data flows</li>
      <li>Reconciliation across multiple transaction sources</li>
    </ul>
  `,
  "Forex Analytics": `
    <p>Designed analytical logic for foreign-exchange related transactions across ledger and subledger data. The solution involves bringing together multiple transaction sources, mapping transactions across currencies, and separating forex and non-forex impacts.</p>
    <h4>The process includes validation around:</h4>
    <ul>
      <li>Transaction source, Voucher, Currency, Transaction amount</li>
      <li>Source record identifiers & Mapping hierarchy</li>
      <li>Duplicate detection & Unmapped transactions</li>
      <li>Reconciliation between source and final datasets</li>
    </ul>
    <p>This enables finance teams to analyse realised, unrealised, exposure and related forex movements using a consistent analytical structure.</p>
  `,
  "Accounts Receivable & Payable Analytics": `
    <p>Developed reporting and analytical views around outstanding customer and supplier positions. The aim is to move from static ageing reports towards a more analytical understanding of open balances and movements.</p>
    <h4>Examples include:</h4>
    <ul>
      <li>Customer ageing & Vendor ageing</li>
      <li>Supplier balances & Debtor balances</li>
      <li>Outstanding transaction analysis</li>
      <li>Period-based movement & Exception identification</li>
      <li>Balance reconciliation</li>
    </ul>
  `,
  "Revenue Analytics": `
    <p>Developed reporting capabilities around revenue and transaction data to provide management with better visibility into business performance.</p>
    <h4>The analytical layer supports:</h4>
    <ul>
      <li>Revenue trends & Entity-level analysis</li>
      <li>Transaction-level investigation</li>
      <li>Period comparison & Business-unit analysis</li>
      <li>Exception analysis & Management reporting</li>
    </ul>
  `,
  "Data Platform Modernisation": `
    <p>My technical journey has progressively moved from traditional reporting and Excel-based analytics into cloud-based enterprise data platforms. This transition has allowed me to work not only with the final analytical output but also with the infrastructure and processing layers underneath it.</p>
    <h4>Evolution:</h4>
    <p>Excel / VBA → SQL & Structured Reporting → Python Automation → Cloud ETL → Enterprise Data Platforms → Power BI & Semantic Analytics</p>
    <h4>Areas I work with:</h4>
    <ul>
      <li>Azure Synapse Analytics & Azure data environments</li>
      <li>AWS Glue, AWS Athena, Amazon S3</li>
      <li>SQL Server, Python, PySpark</li>
      <li>Power BI, DAX, ERP data</li>
    </ul>
  `,

  // 6. IMPACT METRICS
  "14+ Years Experience": `
    <p><strong>14+ Years of Cross-Functional Experience</strong></p>
    <p>My background covers a wide spectrum of the analytics lifecycle, including operations, MIS, finance analytics, business reporting, and enterprise BI. This breadth allows me to understand technical problems through a deep business and financial lens.</p>
  `,
  "200+ Hours Saved": `
    <p><strong>200+ Hours of Manual Effort Eliminated Monthly</strong></p>
    <p>A significant part of my work involves identifying processes where analysts or finance teams repeatedly perform manual steps (downloading files, combining datasets, cleaning data in Excel) and converting those processes into structured, automated workflows in SQL, Python, or PySpark.</p>
  `,
  "100+ Users Supported": `
    <p><strong>100+ Business & Leadership Users Supported</strong></p>
    <p>Enterprise reporting and BI capabilities developed and governed to support operational users up to C-suite leadership. The focus is on ensuring all stakeholders work from common definitions and a single source of truth.</p>
  `,
  "200M+ Records Processed": `
    <p><strong>200M+ Transactions Processed in Enterprise Workflows</strong></p>
    <p>High-volume transactional data successfully ingested, processed, and validated. This requires robust cloud data architecture, incremental processing design, and strict optimization to balance performance and cost.</p>
  `,
  "15+ Workflows Governed": `
    <p><strong>15+ Enterprise Reporting Workflows Governed</strong></p>
    <p>Managing recurring finance and reporting workflows that support critical operational and management processes. This includes defining reporting SLAs, data quality standards, and access control policies.</p>
  `,
  "15+ Data Sources": `
    <p><strong>15+ Data Sources Consolidated</strong></p>
    <p>Brought together data from highly fragmented systems, including ERP platforms, flat files, cloud storage, and operational applications, into consistent, reconciled analytical views.</p>
  `,
  "80% Reduction in Effort": `
    <p><strong>80% Reduction in Manual Processing Effort</strong></p>
    <p>Significant reduction in manual reporting dependencies across selected automated workflows. This allows business teams to focus on investigating exceptions rather than preparing data.</p>
  `,
  "3 Days to 4 Hours": `
    <p><strong>Turnaround Time Reduced from 3 Days to 4 Hours</strong></p>
    <p>Drastic acceleration of selected reporting and close-related processes through the implementation of automated pipelines, optimized data models, and incremental refresh strategies.</p>
  `
};

const detailModal = document.getElementById('detail-modal');
const modalTitle = document.getElementById('modal-title');
const modalIcon = document.getElementById('modal-icon');
const modalTags = document.getElementById('modal-tags');
const modalBody = document.getElementById('modal-body');

// Combined all interactive card classes here
const interactiveSelectors = '.work-card, .glass, .role-card, .flow-card, .tech-card, .timeline-card, .metric';

document.querySelectorAll(interactiveSelectors).forEach(card => {
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');

  const openDetails = () => {
    // Determine the title based on the element type
    let title = card.getAttribute('data-title');
    if (!title) {
      const heading = card.querySelector('h2, h3, b, strong');
      title = heading ? heading.innerText : 'Details';
    }

    const icon = card.getAttribute('data-icon') || '◎';
    modalTitle.innerText = title;
    modalIcon.innerText = icon;
    modalTags.innerHTML = '';

    const tagsData = card.getAttribute('data-tags');
    if (tagsData) {
      tagsData.split(',').forEach(tag => modalTags.innerHTML += `<span>${tag.trim()}</span>`);
    } else {
      const existingTags = card.querySelectorAll('.tags span');
      if (existingTags.length) existingTags.forEach(tag => modalTags.innerHTML += `<span>${tag.innerText}</span>`);
    }

    // Load rich text from database or fallback to the brief paragraph in HTML
    if (detailsData[title]) {
      modalBody.innerHTML = detailsData[title];
    } else {
      const paragraph = card.querySelector('p, small');
      modalBody.innerHTML = `<p>${paragraph ? paragraph.innerHTML : 'Detailed information coming soon.'}</p>`;
    }

    showModal(detailModal, document.querySelector('#detail-modal .modal-close'));
  };

  card.addEventListener('click', openDetails);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openDetails();
    }
  });
});

const closeAllModals = () => {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  });
  document.body.style.overflow = '';
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
  lastFocusedElement = null;
};

document.querySelectorAll('.modal-close').forEach(btn => btn.addEventListener('click', closeAllModals));
document.querySelectorAll('.modal-overlay').forEach(modal => modal.addEventListener('click', (e) => {
  if (e.target === modal) closeAllModals();
}));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllModals(); });
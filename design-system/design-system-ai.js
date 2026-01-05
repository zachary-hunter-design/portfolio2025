// design-system-ai.js
import fs from 'fs';
import path from 'path';

class DesignSystemAI {
  constructor() {
    this.schema = this.loadSchema();
    this.promptTemplates = this.createPromptTemplates();
  }

  loadSchema() {
    try {
      const schemaPath = path.join(process.cwd(), 'design-system-schema.json');
      return JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    } catch (error) {
      console.error('Error loading design system schema:', error);
      return null;
    }
  }

  createPromptTemplates() {
    return {
      systemPrompt: this.createSystemPrompt(),
      caseStudyPrompt: this.createCaseStudyTemplate(),
      componentPrompt: this.createComponentTemplate(),
      pagePrompt: this.createPageTemplate()
    };
  }

  createSystemPrompt() {
    return `You are a UX design assistant that strictly follows Zac Hunter's design system.

DESIGN SYSTEM CONSTRAINTS:
You MUST follow these rules exactly:

COLOR SYSTEM:
- Use ONLY these CSS variables:
  Primary: var(--primary-blue), var(--primary-pink), var(--primary-green), var(--primary-orange)
  Light: var(--light-blue), var(--light-pink), var(--light-green), var(--light-orange)
  Lightest: var(--lightest-blue), var(--lightest-pink), var(--lightest-green), var(--lightest-orange)
  Functional: var(--text-dark), var(--text-light), var(--border-gray), var(--bg-light), var(--btn-hover)

TYPOGRAPHY CLASSES:
- Headers: .hero-primary, .hero-accent, .header1-primary, .header2-primary, .header2-accent, .header3-primary
- Body: .body-primarylrg, .body-primary-bold, .body-primary
- Special: .btn-label, .metric-lrg, .caption-spaced, .quote

COMPONENTS:
- Layout: .container, .main-page, .grid-2-2, .cards-3, .basic-section
- Cards: .card, .hero-card, .stat-card, .project-card
- Buttons: .btn, .btn-square (with .btn-primary/.btn-secondary variants)
- Navigation: .navbar, .nav-links, .nav-link, .nav-link-active
- Images: .basic-image, .image-help, .image-caption, .case-header-img

HIGHLIGHT SYSTEM:
- Use <span class="highlight-text combo-[color]-light"> for inline highlights
- Available colors: combo-blue-light, combo-pink-light, combo-green-light, combo-orange-light

RESPONSIVE RULES:
- Use clamp() for all spacing and typography
- Mobile-first: min-width media queries only
- Breakpoints: 480px, 768px, 1024px
- All interactive elements: min-height: 44px

ACCESSIBILITY:
- All images: descriptive alt text
- Interactive elements: appropriate ARIA labels
- Semantic HTML structure
- Keyboard navigation support

STRICT PROHIBITIONS:
- NO inline styles (except background-image on project cards)
- NO hardcoded hex/color values
- NO custom CSS classes (use design system only)
- NO skipping required wrapper elements

CONTENT PATTERNS:
CASE STUDY PATTERN:
1. .case-header-img
2. .case-titles (h1.hero-primary + h2.header2-accent)
3. .summary-duties (.summary + .duties-list)
4. #intro section with .text-block
5. Alternating .image-text/.text-block sections
6. .comparison-table for metrics

HOME PAGE PATTERN:
1. .hero with .hero-background
2. .hero-content with avatar
3. .hero-cards (3 .stat-card)
4. .projects with .project-card-container

YOUR TASK: Generate design-system-compliant HTML based on user requests.
OUTPUT: Only valid HTML that follows all rules above.`;
  }

  createCaseStudyTemplate() {
    return `Generate a case study page with this structure:

{caseStudyData}

REQUIRED STRUCTURE:
1. <img src="{headerImage}" class="case-header-img" alt="{altText}">
2. <div class="case-titles">
   <h1 class="hero-primary">{title}</h1>
   <h2 class="header2-accent">{subtitle}</h2>
</div>
3. <div class="summary-duties">
   <div class="summary">
     <h2 class="header1-primary">Executive Summary</h2>
     {summaryContent}
   </div>
   <hr class="vertical-hr"/>
   <div class="duties-list">
     {dutiesContent}
   </div>
</div>
4. <div id="intro">
   <div class="text-block">
     <h2 class="header1-primary">Introduction</h2>
     {introContent}
   </div>
</div>
5. {contentSections}
6. {metricsTable}
7. Standard footer with contact info

USE HIGHLIGHTS: For key metrics and findings, use:
<span class="highlight-text combo-blue-light">text</span>
<span class="highlight-text combo-green-light">text</span>
<span class="highlight-text combo-orange-light">text</span>
<span class="highlight-text combo-pink-light">text</span>`;
  }

  createComponentTemplate() {
    return `Generate a {componentType} component:

Properties: {properties}

AVAILABLE COMPONENT TYPES:
- card: Use .card with inner content structure
- button: Use .btn or .btn-square with variant
- metric: Use .metric-lrg in .card with .header2-accent
- highlight: Use .highlight-text with appropriate color
- grid: Use .grid-2-2 or .cards-3
- section: Use .basic-section with .text-block

OUTPUT: HTML only, no explanations.`;
  }

  createPageTemplate() {
    return `Generate a {pageType} page:

{pageData}

PAGE TYPES:
- caseStudy: Follow case study pattern
- home: Follow home page pattern
- about: Follow about page pattern

OUTPUT: Complete HTML page with header, main, footer.`;
  }

  generateCaseStudy(data) {
    const template = this.promptTemplates.caseStudyPrompt;
    
    const filledTemplate = template
      .replace('{caseStudyData}', JSON.stringify(data, null, 2))
      .replace('{headerImage}', data.headerImage || '')
      .replace('{altText}', data.altText || 'Case study header image')
      .replace('{title}', data.title || '')
      .replace('{subtitle}', data.subtitle || '')
      .replace('{summaryContent}', this.generateSummaryContent(data))
      .replace('{dutiesContent}', this.generateDutiesContent(data))
      .replace('{introContent}', this.generateIntroContent(data))
      .replace('{contentSections}', this.generateContentSections(data))
      .replace('{metricsTable}', this.generateMetricsTable(data));

    return {
      systemPrompt: this.promptTemplates.systemPrompt,
      userPrompt: filledTemplate,
      constraints: this.getConstraintsForType('caseStudy')
    };
  }

  generateSummaryContent(data) {
    let html = `<p class="body-primary">${data.executiveSummary || ''}</p>`;
    
    if (data.metrics && Array.isArray(data.metrics)) {
      html += '<ul style="margin-left: 2rem; display: flex; flex-direction: column; gap: .5rem;">';
      data.metrics.forEach((metric, index) => {
        const colors = ['combo-blue-light', 'combo-orange-light', 'combo-pink-light', 'combo-green-light'];
        const color = colors[index % colors.length];
        html += `<li class="body-primary"><span class="highlight-text ${color}">${metric}</span></li>`;
      });
      html += '</ul>';
    }
    
    if (data.additionalSummary) {
      html += `<p class="body-primary">${data.additionalSummary}</p>`;
    }
    
    return html;
  }

  generateDutiesContent(data) {
    const duties = data.duties || [
      { icon: 'user-circle-duotone.svg', label: 'Role:', value: 'UX Designer' },
      { icon: 'calendar-dots-duotone.svg', label: 'Duration:', value: '3 months' },
      { icon: 'list-checks-duotone.svg', label: 'Responsibilities:', value: 'UX Research, UX Design, Wireframing, Prototyping' }
    ];

    let html = '';
    duties.forEach(duty => {
      html += `
        <div class="duties-item">
          <img src="../assets/images/icons/${duty.icon}" alt="${duty.label.toLowerCase()} icon"/>
          <div class="duties-text-div">
            <p>${duty.label}</p>
            <p class="body-primary-bold">${duty.value}</p>
          </div>
        </div>`;
    });
    
    return html;
  }

  generateIntroContent(data) {
    return `
      <h3 class="header2-accent">${data.problemStatement || 'What is this project about?'}</h3>
      <p class="body-primary">${data.introduction || ''}</p>`;
  }

  generateContentSections(data) {
    const sections = data.sections || [];
    let html = '';
    
    sections.forEach((section, index) => {
      const colorVariants = ['blue', 'orange', 'green', 'pink'];
      const color = colorVariants[index % colorVariants.length];
      
      html += `
        <div class="text-block" style="margin-bottom: ${index === sections.length - 1 ? '1rem' : '3rem'}">
          <h2 class="header1-primary">${section.title}</h2>
          ${section.subtitle ? `<h3 class="header2-accent">${section.subtitle}</h3>` : ''}
          <p class="body-primary">${section.content}</p>
        </div>`;
      
      if (section.image) {
        html += `
          <figure>
            <figcaption class="image-caption caption-spaced">
              ${section.imageCaption || 'Screenshot of design'}
            </figcaption>
            <img class="basic-image image-help" src="${section.image}" 
                 alt="${section.imageAlt || 'Design screenshot'}">
          </figure>`;
      }
    });
    
    return html;
  }

  generateMetricsTable(data) {
    if (!data.comparisonMetrics || !Array.isArray(data.comparisonMetrics)) {
      return '';
    }

    const colors = ['blue', 'pink', 'orange', 'green'];
    
    let tableHTML = `
      <table class="comparison-table">
        <thead>
          <tr>
            <th class="header3-primary"></th>
            <th class="header3-primary" style="color: var(--text-light)">Original Design</th>
            <th class="header3-primary" style="color: var(--text-light)">Redesign</th>
            <th class="header3-primary" style="color: var(--text-light)">Difference</th>
          </tr>
        </thead>
        <tbody>`;

    data.comparisonMetrics.forEach((metric, index) => {
      const color = colors[index % colors.length];
      tableHTML += `
        <tr>
          <th class="header3-primary trh combo-${color}">${metric.metric}</th>
          <td class="body-primarylrg combo-${color}-light">${metric.original}</td>
          <td class="body-primarylrg combo-${color}-light">${metric.redesign}</td>
          <td class="body-primarylrg combo-${color}-light td-right">${metric.difference}</td>
        </tr>`;
    });

    tableHTML += `
        </tbody>
      </table>`;
    
    return tableHTML;
  }

  getConstraintsForType(type) {
    const constraints = {
      caseStudy: [
        'Must include case-header-img',
        'Must include case-titles with hero-primary and header2-accent',
        'Must include summary-duties section',
        'Must include #intro section',
        'Must use highlight-text for key points',
        'Must include appropriate alt text for images'
      ],
      component: [
        'Use only design system CSS classes',
        'No inline styles',
        'Include accessibility attributes',
        'Use appropriate semantic HTML'
      ],
      page: [
        'Include proper HTML structure',
        'Include navigation',
        'Include footer',
        'Follow mobile-first responsive design'
      ]
    };
    
    return constraints[type] || [];
  }

  validateOutput(html, type) {
    const errors = [];
    const warnings = [];
    
    // Check for inline styles
    const inlineStyleRegex = /style="[^"]*"/g;
    const inlineStyles = html.match(inlineStyleRegex);
    if (inlineStyles) {
      inlineStyles.forEach(style => {
        if (!style.includes('background-image') && !style.includes('background-size') && !style.includes('background-position')) {
          errors.push(`Inline style found: ${style}`);
        }
      });
    }
    
    // Check for hardcoded colors
    const colorRegex = /#[0-9a-fA-F]{3,6}/g;
    const hardcodedColors = html.match(colorRegex);
    if (hardcodedColors) {
      errors.push(`Hardcoded colors found: ${hardcodedColors.join(', ')}`);
    }
    
    // Check for required components based on type
    if (type === 'caseStudy') {
      if (!html.includes('case-header-img')) errors.push('Missing case-header-img');
      if (!html.includes('case-titles')) errors.push('Missing case-titles');
      if (!html.includes('summary-duties')) errors.push('Missing summary-duties');
    }
    
    // Check for typography classes
    const textElements = ['<h1', '<h2', '<h3', '<h4', '<h5', '<h6', '<p', '<span', '<a'];
    textElements.forEach(element => {
      const regex = new RegExp(`${element}[^>]*>`, 'g');
      const matches = html.match(regex);
      if (matches) {
        matches.forEach(match => {
          if (!match.includes('class="') && !match.includes('image-caption')) {
            warnings.push(`Text element without class: ${match.substring(0, 50)}`);
          }
        });
      }
    });
    
    return { errors, warnings };
  }

  formatForLLM(promptData) {
    return {
      system: promptData.systemPrompt,
      user: promptData.userPrompt,
      constraints: promptData.constraints,
      format: 'html'
    };
  }
}

// Example usage
const ai = new DesignSystemAI();

// Generate a new case study
const caseStudyData = {
  title: "Redesigning a Healthcare Portal for Better Patient Engagement",
  subtitle: "Improving appointment scheduling and medication tracking through user-centered design",
  headerImage: "../assets/images/healthcare/portal-cover.webp",
  altText: "Healthcare portal dashboard showing patient information",
  executiveSummary: "I led a complete redesign of a healthcare patient portal that increased patient engagement by 45% and reduced support calls by 30%.",
  metrics: [
    "45% increase in patient portal logins",
    "30% reduction in support calls",
    "62% faster appointment scheduling",
    "Patient satisfaction scores improved from 68% to 92%"
  ],
  additionalSummary: "The redesign focused on simplifying complex medical information and creating intuitive workflows for elderly patients.",
  duties: [
    { icon: "user-circle-duotone.svg", label: "Role:", value: "Lead UX Designer" },
    { icon: "calendar-dots-duotone.svg", label: "Duration:", value: "4 months" },
    { icon: "list-checks-duotone.svg", label: "Responsibilities:", value: "User Research, UX/UI Design, Prototyping, Usability Testing" }
  ],
  problemStatement: "How can we make healthcare portals more accessible for elderly patients?",
  introduction: "Healthcare portals are often designed with technical users in mind, leaving elderly patients struggling with complex interfaces. Our research showed that patients over 65 were 3x more likely to call support for help with basic tasks like viewing test results or scheduling appointments.",
  sections: [
    {
      title: "Understanding the Problem",
      subtitle: "Research revealed key pain points",
      content: "Through user interviews and analytics review, we identified three main issues: medical jargon confused patients, appointment scheduling required too many steps, and medication information was buried in complex tables.",
      image: "../assets/images/healthcare/research-insights.webp",
      imageAlt: "Research insights showing patient pain points"
    },
    {
      title: "The Design Solution",
      subtitle: "Simplifying complex medical information",
      content: "We created a tiered information architecture that surfaces critical information first, uses plain language explanations for medical terms, and provides visual medication tracking.",
      image: "../assets/images/healthcare/design-solution.webp",
      imageAlt: "New healthcare portal design showing simplified interface"
    }
  ],
  comparisonMetrics: [
    { metric: "Monthly Active Users", original: "42%", redesign: "61%", difference: "+19%" },
    { metric: "Appointment Scheduling Time", original: "4m 15s", redesign: "1m 35s", difference: "-2m 40s" },
    { metric: "Support Call Volume", original: "320/month", redesign: "224/month", difference: "-96/month" },
    { metric: "Patient Satisfaction", original: "68%", redesign: "92%", difference: "+24%" }
  ]
};

const prompt = ai.generateCaseStudy(caseStudyData);
const validation = ai.validateOutput(`<html>...`, 'caseStudy');

console.log('System Prompt:', prompt.systemPrompt.substring(0, 200) + '...');
console.log('\nValidation Results:', validation);

// Export for use in other files
export default DesignSystemAI;
// scripts/generate-case-study.js
#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import DesignSystemAI from '../design-system-ai.js';

const ai = new DesignSystemAI();

const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'Case study title:',
    validate: input => input.length > 0 ? true : 'Title is required'
  },
  {
    type: 'input',
    name: 'subtitle',
    message: 'Case study subtitle:'
  },
  {
    type: 'input',
    name: 'slug',
    message: 'URL slug (e.g., healthcare-portal):',
    validate: input => /^[a-z0-9-]+$/.test(input) ? true : 'Use lowercase letters, numbers, and hyphens only'
  },
  {
    type: 'input',
    name: 'headerImage',
    message: 'Header image path (relative to assets/images/):',
    default: 'project/cover.webp'
  },
  {
    type: 'input',
    name: 'executiveSummary',
    message: 'Executive summary (1-2 sentences):'
  },
  {
    type: 'checkbox',
    name: 'metrics',
    message: 'Select key metrics to highlight:',
    choices: [
      'Success rate improvement',
      'Time reduction',
      'User satisfaction increase',
      'Task completion improvement',
      'Conversion rate increase',
      'Error rate reduction'
    ]
  },
  {
    type: 'input',
    name: 'role',
    message: 'Your role:',
    default: 'UX Designer'
  },
  {
    type: 'input',
    name: 'duration',
    message: 'Project duration:',
    default: '3 months'
  }
];

async function generateCaseStudy() {
  console.log('🎨 Generating new case study...\n');
  
  const answers = await inquirer.prompt(questions);
  
  // Construct case study data
  const caseStudyData = {
    title: answers.title,
    subtitle: answers.subtitle,
    headerImage: `../assets/images/${answers.headerImage}`,
    altText: `${answers.title} - case study header image`,
    executiveSummary: answers.executiveSummary,
    metrics: answers.metrics.map(metric => `${metric} through data-driven design`),
    duties: [
      { icon: 'user-circle-duotone.svg', label: 'Role:', value: answers.role },
      { icon: 'calendar-dots-duotone.svg', label: 'Duration:', value: answers.duration },
      { icon: 'list-checks-duotone.svg', label: 'Responsibilities:', value: 'UX Research, UX Design, Wireframing, Prototyping' }
    ]
  };
  
  // Generate the prompt
  const prompt = ai.generateCaseStudy(caseStudyData);
  
  // Create file
  const fileName = `${answers.slug}.html`;
  const filePath = path.join('case-studies', fileName);
  
  const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Case Study: ${answers.title}</title>
    <link rel="stylesheet" href="../assets/css/alt-main.css" />
    <link rel="stylesheet" href="../assets/css/alt-components.css" />
    <link rel="stylesheet" href="../assets/css/responsive.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&display=swap" rel="stylesheet"/>
</head>
<body>
    <header>
        <nav class="navbar">
          <div class="name-links-div">
          <div class="name-div">
                  <a class="header3-primary" href="../index.html">Zachary Hunter</a>
          </div>
          <ul class="nav-links">
              <li class="nav-link"><a href="../index.html">Home</a></li>
              <li class="nav-link"><a href="../about.html">About Me</a></li>
          </ul>
          </div>
      </nav>
    </header>
    
    <main>
        <!-- GENERATED CONTENT WILL GO HERE -->
        <!-- Use this prompt with Cursor/GPT: -->
        <!--
        ${prompt.systemPrompt.substring(0, 500)}...
        
        ${prompt.userPrompt}
        -->
        
        <div style="padding: 3rem; background: var(--lightest-blue); border-radius: var(--border-radius); margin: 2rem;">
            <h2 class="header1-primary">🚀 Design System Generated Content</h2>
            <p class="body-primary">Copy the prompt above and use it with Cursor or ChatGPT to generate the case study content that follows design system constraints.</p>
            <div class="hero-buttons" style="margin-top: 1.5rem;">
                <button onclick="copyPrompt()" class="btn btn-primary btn-label">Copy Prompt to Clipboard</button>
            </div>
        </div>
    </main>
    
    <footer class="site-footer">
        <!-- Standard footer -->
    </footer>
    
    <script>
        function copyPrompt() {
            const prompt = \`${prompt.systemPrompt}\\n\\n${prompt.userPrompt}\`;
            navigator.clipboard.writeText(prompt);
            alert('Prompt copied to clipboard! Paste into Cursor or ChatGPT.');
        }
    </script>
</body>
</html>`;
  
  // Write file
  fs.writeFileSync(filePath, htmlTemplate);
  
  console.log('\n✅ Case study template created!');
  console.log(`📁 File: ${filePath}`);
  console.log('\n📋 Next steps:');
  console.log('1. Add your images to assets/images/');
  console.log('2. Use the generated prompt with Cursor/GPT to fill in content');
  console.log('3. Run "npm run validate" to check for design system compliance');
  console.log(`\n🔗 Add to index.html: <a href="case-studies/${fileName}">${answers.title}</a>`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateCaseStudy().catch(console.error);
}

export { generateCaseStudy };
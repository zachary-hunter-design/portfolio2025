// scripts/validate-design-system.js
import DesignSystemValidator from './design-system-validator.js';
import fs from 'fs';
import path from 'path';

const validator = new DesignSystemValidator();

// Get all HTML files
const htmlFiles = [];
function findHTMLFiles(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      findHTMLFiles(filePath);
    } else if (file.endsWith('.html')) {
      htmlFiles.push(filePath);
    }
  });
}

findHTMLFiles('.');

console.log(`🔍 Validating ${htmlFiles.length} HTML files against design system...\n`);

let totalViolations = 0;
let totalWarnings = 0;

htmlFiles.forEach(file => {
  console.log(`📄 ${file}`);
  const violations = validator.validateHTMLFile(file);
  
  if (violations.length > 0) {
    totalViolations += violations.length;
    violations.forEach(violation => {
      if (violation.type === 'WARNING') {
        totalWarnings++;
        console.log(`  ⚠️  ${violation.message}`);
      } else {
        console.log(`  ❌ ${violation.type}: ${violation.message}`);
      }
    });
    console.log('');
  } else {
    console.log('  ✅ Passed\n');
  }
});

console.log('='.repeat(50));
console.log(`RESULTS: ${totalViolations} violations, ${totalWarnings} warnings`);

if (totalViolations > 0) {
  console.log('\n❌ Some files need attention. Please fix violations before committing.');
  process.exit(1);
} else {
  console.log('\n✅ All files comply with the design system!');
  process.exit(0);
}
const fs = require('fs');
const path = require('path');

const pagesDir = './src/pages/';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx') && f !== 'UserDashboard.tsx' && f !== 'AdminDashboard.tsx');

files.forEach(file => {
  let content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  
  // Replace top bar, header, nav
  content = content.replace(/\{\/\* Top Contact Bar \*\/\}\s*<div className="top-bar">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '');
  content = content.replace(/\{\/\* Main Header \*\/\}\s*<header className="header-main">[\s\S]*?<\/header>/g, '');
  content = content.replace(/<header className="header-main"[\s\S]*?<\/header>/g, '');
  content = content.replace(/\{\/\* Navigation Menu \*\/\}\s*<nav className="nav-menu">[\s\S]*?<\/nav>/g, '');
  content = content.replace(/<nav className="nav-menu"[\s\S]*?<\/nav>/g, '');
  
  // Replace footer
  content = content.replace(/\{\/\* Footer \*\/\}\s*<footer className="footer">[\s\S]*?<\/footer>/g, '');
  content = content.replace(/<footer className="footer"[\s\S]*?<\/footer>/g, '');
  
  // Replace Modals
  content = content.replace(/\{\/\* MODALS \*\/\}\s*\{activeModal && \([\s\S]*?<\/div>\s*\)\}/g, '');

  fs.writeFileSync(path.join(pagesDir, file), content);
});
console.log("Pages fixed!");

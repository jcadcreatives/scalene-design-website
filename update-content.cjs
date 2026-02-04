// Run this after editing EDIT-ME.txt: node update-content.cjs

const fs = require('fs');

const text = fs.readFileSync('EDIT-ME.txt', 'utf8');
const lines = text.split('\n');

function getValue(prefix) {
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith(prefix + ':')) {
      return trimmed.substring(prefix.length + 1).trim();
    }
  }
  return '';
}

function getSection(sectionName) {
  const sectionLines = [];
  let inSection = false;

  for (const line of lines) {
    if (line.includes('--- ' + sectionName)) {
      inSection = true;
      continue;
    }
    if (inSection && line.includes('---')) {
      break;
    }
    if (inSection) {
      sectionLines.push(line.trim());
    }
  }
  return sectionLines.filter(l => l);
}

function getPortfolioImages(sectionName) {
  const sectionLines = getSection('PORTFOLIO: ' + sectionName);
  const images = [];

  for (const line of sectionLines) {
    if (line.startsWith('Image:')) {
      const parts = line.substring(6).trim().split('|').map(p => p.trim());
      if (parts.length >= 3) {
        images.push({ file: parts[0], name: parts[1], subtitle: parts[2] });
      }
    }
  }
  return images;
}

function getPortfolioDesc(sectionName) {
  const sectionLines = getSection('PORTFOLIO: ' + sectionName);
  for (const line of sectionLines) {
    if (line.startsWith('Category Description:')) {
      return line.substring(21).trim();
    }
  }
  return '';
}

function getTestimonials() {
  const sectionLines = getSection('TESTIMONIALS');
  const testimonials = [];
  let current = null;

  for (const line of sectionLines) {
    if (line.startsWith('Testimonial')) {
      if (current && current.quote) testimonials.push(current);
      current = {};
    } else if (current) {
      if (line.startsWith('Quote:')) current.quote = line.substring(6).trim();
      if (line.startsWith('Name:')) current.name = line.substring(5).trim();
      if (line.startsWith('Business:')) current.business = line.substring(9).trim();
    }
  }
  if (current && current.quote) testimonials.push(current);
  return testimonials;
}

function getStats() {
  const stats = [];
  const heroLines = getSection('HERO SECTION');

  for (const line of heroLines) {
    if (line.startsWith('Stat')) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const parts = line.substring(colonIndex + 1).split('|').map(p => p.trim());
        if (parts.length >= 2) {
          stats.push({ value: parts[0], label: parts[1] });
        }
      }
    }
  }
  return stats;
}

const content = {
  "_HOW_TO_USE": "Auto-generated from EDIT-ME.txt. Run: node update-content.cjs",
  hero: {
    tagline: getValue('Tagline'),
    headline: getValue('Headline'),
    description: getValue('Description'),
    buttonText: getValue('Button Text'),
    stats: getStats()
  },
  portfolio: {
    listing: {
      title: "Listing Images",
      description: getPortfolioDesc('LISTING IMAGES'),
      images: getPortfolioImages('LISTING IMAGES')
    },
    aplus: {
      title: "A+ Content",
      description: getPortfolioDesc('A+ CONTENT'),
      images: getPortfolioImages('A+ CONTENT')
    },
    brand: {
      title: "Brand Story",
      description: getPortfolioDesc('BRAND STORY'),
      images: getPortfolioImages('BRAND STORY')
    },
    storefront: {
      title: "Storefronts",
      description: getPortfolioDesc('STOREFRONTS'),
      images: getPortfolioImages('STOREFRONTS')
    }
  },
  testimonials: getTestimonials(),
  contact: {
    email: getValue('Email'),
    phone: getValue('Phone'),
    calendly: getValue('Calendly')
  }
};

fs.writeFileSync('content.json', JSON.stringify(content, null, 2));
console.log('✅ content.json updated from EDIT-ME.txt!');
console.log('   Now push to GitHub to see changes on your site.');

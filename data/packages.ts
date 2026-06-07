export type PackagePlan = {
  name: string;
  price: string;
  suitableFor?: string;
  includes?: string;
  features: string[];
  addOns?: string[];
  maintenance: string;
  featured?: boolean;
};

export type PackageCategory = {
  title: string;
  subtitle: string;
  href: string;
  summaryLabel: string;
  highlights: string[];
  plans: PackagePlan[];
};

export const packageCategories: PackageCategory[] = [
  {
    title: "Corporate Websites",
    subtitle: "Company profile and corporate web systems for credible digital presence.",
    href: "/company-profile",
    summaryLabel: "Corporate Websites",
    highlights: ["Company Profile", "Mobile Responsive", "Lead Generation Ready"],
    plans: [
      {
        name: "Starter",
        price: "Rp 5 Juta",
        suitableFor: "UMKM, personal brand, jasa profesional, perusahaan baru.",
        features: [
          "Custom Design",
          "Domain & Hosting Setup",
          "Mobile & Desktop Responsive",
          "Admin Dashboard",
          "Kelola Konten Sendiri",
          "Artikel & News System",
          "WhatsApp Integration",
          "Contact Form",
          "Google Maps Integration",
          "SSL Security",
          "SEO Basic",
          "High Performance Infrastructure",
          "Backup & Version Control"
        ],
        addOns: ["Multi Bahasa + Rp 1 Juta"],
        maintenance: "Rp 3,5 Juta / Tahun"
      },
      {
        name: "Business",
        price: "Rp 10 Juta",
        includes: "Semua fitur Starter +",
        features: [
          "Maksimal 10 Halaman",
          "Product Catalog",
          "Product Categories",
          "Advanced CMS",
          "SEO Structure",
          "Inquiry Form",
          "Business Email"
        ],
        addOns: ["Multi Bahasa + Rp 1 Juta"],
        maintenance: "Rp 7 Juta / Tahun",
        featured: true
      },
      {
        name: "Corporate",
        price: "Rp 15 Juta",
        includes: "Semua fitur Business +",
        features: [
          "Sanity CMS",
          "Corporate Design System",
          "Lead Generation Structure",
          "Export Ready Architecture",
          "Download Center",
          "Certification Section",
          "Corporate Content Architecture"
        ],
        addOns: ["Multi Bahasa Premium + Rp 2 Juta"],
        maintenance: "Rp 10,5 Juta / Tahun"
      }
    ]
  },
  {
    title: "Store & E-Commerce",
    subtitle: "Online store infrastructure from catalog to checkout and enterprise commerce.",
    href: "/ecommerce",
    summaryLabel: "Store & E-Commerce",
    highlights: ["Online Store", "Checkout System", "Payment Gateway"],
    plans: [
      {
        name: "Starter",
        price: "Rp 5 Juta",
        features: [
          "Custom Design",
          "Domain",
          "Product Catalog",
          "Product Categories",
          "Admin Dashboard",
          "Product Management",
          "WhatsApp Ordering",
          "Mobile Responsive",
          "SEO Basic",
          "SSL Security"
        ],
        maintenance: "Rp 3,5 Juta / Tahun"
      },
      {
        name: "Business",
        price: "Rp 10 Juta",
        includes: "Semua fitur Starter +",
        features: [
          "Shopping Cart",
          "Checkout System",
          "Customer Account",
          "Product Management",
          "Order Management",
          "Basic Inventory",
          "SEO Structure",
          "Business Email"
        ],
        maintenance: "Rp 7 Juta / Tahun",
        featured: true
      },
      {
        name: "Professional",
        price: "Rp 15 Juta",
        includes: "Semua fitur Business +",
        features: [
          "Payment Gateway",
          "Customer Dashboard",
          "Voucher & Promo",
          "Email Notification",
          "Advanced Catalog",
          "Analytics Dashboard"
        ],
        addOns: ["Multi Bahasa + Rp 1 Juta"],
        maintenance: "Rp 10,5 Juta / Tahun"
      },
      {
        name: "Enterprise",
        price: "Mulai Rp 25 Juta",
        includes: "Semua fitur Professional +",
        features: [
          "Multi Vendor",
          "B2B Pricing",
          "Distributor Portal",
          "Customer Portal",
          "ERP Integration",
          "Custom Workflow"
        ],
        maintenance: "Rp 17,5 Juta / Tahun"
      }
    ]
  },
  {
    title: "Web Applications",
    subtitle: "Custom dashboards, workflow systems, and business applications.",
    href: "/web-app",
    summaryLabel: "Web Applications",
    highlights: ["Dashboard System", "CRM / ERP", "Membership Platform"],
    plans: [
      {
        name: "Starter",
        price: "Rp 10 Juta",
        features: [
          "Custom Dashboard",
          "User Login System",
          "Admin Panel",
          "Database Integration",
          "CRUD Management",
          "Responsive Design",
          "SSL Security",
          "Cloud Deployment"
        ],
        maintenance: "Rp 7 Juta / Tahun"
      },
      {
        name: "Business",
        price: "Rp 25 Juta",
        includes: "Semua fitur Starter +",
        features: [
          "Multi Role User",
          "Reporting Dashboard",
          "Data Export",
          "Activity Logs",
          "Search & Filter System",
          "Notification System",
          "API Integration"
        ],
        maintenance: "Rp 17,5 Juta / Tahun",
        featured: true
      },
      {
        name: "Professional",
        price: "Rp 50 Juta",
        includes: "Semua fitur Business +",
        features: [
          "Advanced Workflow",
          "Analytics Dashboard",
          "Approval System",
          "Team Management",
          "Document Management",
          "Advanced API Integration",
          "Performance Optimization"
        ],
        maintenance: "Rp 35 Juta / Tahun"
      },
      {
        name: "Enterprise",
        price: "Mulai Rp 75 Juta",
        includes: "Semua fitur Professional +",
        features: [
          "ERP Integration",
          "CRM Integration",
          "Multi Branch System",
          "Advanced Permission",
          "Audit Trail",
          "Enterprise Architecture",
          "Custom Business Logic"
        ],
        maintenance: "Rp 52,5 Juta / Tahun"
      }
    ]
  },
  {
    title: "AI Ecosystem",
    subtitle: "Integrated business systems with AI assistants, automation, and knowledge workflows.",
    href: "/ai-ecosystem",
    summaryLabel: "AI Ecosystem",
    highlights: ["AI Chatbot", "AI Automation", "AI Assistant"],
    plans: [
      {
        name: "Starter",
        price: "Rp 25 Juta",
        features: ["Company Profile", "Store System", "Admin Dashboard", "Lead Management"],
        maintenance: "Rp 17,5 Juta / Tahun"
      },
      {
        name: "Business",
        price: "Rp 50 Juta",
        includes: "Semua fitur Starter +",
        features: [
          "CRM",
          "Customer Database",
          "Sales Dashboard",
          "Marketing Dashboard",
          "Analytics System"
        ],
        maintenance: "Rp 35 Juta / Tahun",
        featured: true
      },
      {
        name: "AI Ecosystem",
        price: "Rp 75 Juta",
        includes: "Semua fitur Business +",
        features: [
          "AI Chatbot",
          "AI Customer Service",
          "AI Product Generator",
          "AI Content Generator",
          "AI Sales Assistant"
        ],
        maintenance: "Rp 52 Juta / Tahun"
      },
      {
        name: "Enterprise",
        price: "Mulai Rp 100 Juta",
        includes: "Semua fitur AI Ecosystem +",
        features: [
          "AI Workflow Automation",
          "AI Knowledge Base",
          "AI Document Processing",
          "AI Company Assistant",
          "Custom AI Development"
        ],
        maintenance: "Rp 70 Juta / Tahun"
      }
    ]
  }
];

export function getPackageCategoryByHref(href: string) {
  const category = packageCategories.find((item) => item.href === href);

  if (!category) {
    throw new Error(`Package category not found for href: ${href}`);
  }

  return category;
}

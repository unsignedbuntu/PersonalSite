// src/app/page.tsx
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import BlogSectionSSR from "@/components/BlogSectionSSR";
import ProjectsSectionSSR from "@/components/ProjectsSectionSSR";
import ContactSection from "@/components/ContactSection";
import ScrollIndicator from "@/components/ScrollIndicator";

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Fetch functions
async function getBlogPosts() {
  try {
    console.log('🌐 Server-side API çağrısı: Blog Posts');
    const res = await fetch(`${API_BASE_URL}/api/posts`, {
      next: { revalidate: 60, tags: ['blog-posts'] } // ISR: 1 dakika cache + tag ile manuel revalidation
    });
    
    if (!res.ok) {
      console.error('Failed to fetch blog posts:', res.status);
      return []; // Empty array instead of fallback
    }
    
    const data = await res.json();
    console.log('📦 Server-side Blog Data:', data);
    return data;
  } catch (error) {
    console.error('❌ Server-side Blog Error:', error);
    return []; // Empty array - SSR component will handle empty state
  }
}

async function getProjects() {
  try {
    console.log('🌐 Server-side API çağrısı: Projects');
    const res = await fetch(`${API_BASE_URL}/api/projects`, {
      next: { revalidate: 300, tags: ['projects'] } // ISR: 5 dakika cache + tag ile manuel revalidation
    });
    
    if (!res.ok) {
      console.error('Failed to fetch projects:', res.status);
      return []; // Empty array instead of fallback
    }
    
    const data = await res.json();
    console.log('📦 Server-side Projects Data:', data);
    return data;
  } catch (error) {
    console.error('❌ Server-side Projects Error:', error);
    return []; // Empty array - SSR component will handle empty state
  }
}

export default async function Home() {
  // Server-side data fetching
  const [blogPosts, projects] = await Promise.all([
    getBlogPosts(),
    getProjects()
  ]);

  return (
    <main>
      {/* Bu iki component'in en üstte olması önemlidir */}
      <Header />
      <ScrollIndicator />
      
      {/* Bunlar ise sayfanın içeriğini oluşturur */}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSectionSSR projects={projects} />
      <BlogSectionSSR posts={blogPosts} />
      <ContactSection />
    </main>
  );
}

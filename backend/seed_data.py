# backend/seed_data.py
"""
Database'e initial data ekleme script'i
Bu script'i bir kez çalıştırarak veritabanına örnek veri ekleyebilirsin
"""

from database import SessionLocal, BlogPost, Project
import json
from datetime import datetime

def seed_blog_posts():
    """Blog yazılarını database'e ekle"""
    db = SessionLocal()
    
    # Önce mevcut veri var mı kontrol et
    if db.query(BlogPost).first():
        print("❌ Blog posts already exist, skipping...")
        db.close()
        return
    
    blog_posts_data = [
        {
            "title": "Modern Web Geliştirme Teknikleri",
            "excerpt": "React, Next.js ve TypeScript kullanarak modern web uygulamaları geliştirme sürecinde dikkat edilmesi gereken önemli noktalar.",
            "content": "Bu yazıda modern web geliştirme tekniklerini detaylı olarak inceleyeceğiz. React'in component-based yapısı, Next.js'in SSR özellikleri ve TypeScript'in tip güvenliği gibi konular üzerinde duracağız.",
            "category": "Web Development",
            "tags": ["React", "Next.js", "TypeScript"],
            "read_time": "5 dk",
            "slug": "modern-web-gelistirme-teknikleri-20240915"
        },
        {
            "title": "AI ve Machine Learning Trendleri",
            "excerpt": "Yapay zeka ve makine öğrenmesi alanındaki son gelişmeler ve bu teknolojilerin gelecekteki potansiyel kullanım alanları.",
            "content": "Yapay zeka dünyasında yaşanan hızlı değişimler ve machine learning algoritmalarının günlük hayattaki uygulamaları hakkında detaylı bir inceleme.",
            "category": "AI/ML",
            "tags": ["AI", "Machine Learning", "Python"],
            "read_time": "7 dk",
            "slug": "ai-ve-machine-learning-trendleri-20240915"
        },
        {
            "title": "Clean Code Prensipleri",
            "excerpt": "Temiz kod yazmanın önemi ve sürdürülebilir yazılım geliştirme süreçlerinde uygulanması gereken best practice'ler.",
            "content": "Temiz kod yazmak sadece bir tercih değil, zorunluluktur. Bu yazıda SOLID prensipleri, kod okunabilirliği ve maintainability konularını ele alacağız.",
            "category": "Software Engineering",
            "tags": ["Clean Code", "Best Practices", "Development"],
            "read_time": "6 dk",
            "slug": "clean-code-prensipleri-20240915"
        }
    ]
    
    try:
        for post_data in blog_posts_data:
            db_post = BlogPost(
                title=post_data["title"],
                excerpt=post_data["excerpt"],
                content=post_data["content"],
                category=post_data["category"],
                tags=json.dumps(post_data["tags"]),
                read_time=post_data["read_time"],
                slug=post_data["slug"],
                author_id=1  # Admin user ID
            )
            db.add(db_post)
        
        db.commit()
        print(f"✅ {len(blog_posts_data)} blog posts added successfully!")
        
    except Exception as e:
        print(f"❌ Error adding blog posts: {e}")
        db.rollback()
    finally:
        db.close()

def seed_projects():
    """Projeleri database'e ekle"""
    db = SessionLocal()
    
    # Önce mevcut veri var mı kontrol et
    if db.query(Project).first():
        print("❌ Projects already exist, skipping...")
        db.close()
        return
    
    projects_data = [
        {
            "name": "Modern E-Commerce Platform",
            "description": "Full-stack graduation project with AI-powered features. .NET Core Web API backend with comprehensive e-commerce functionality, Next.js frontend with modern UX, and Python microservice for AI image generation. Features multi-layer Redis caching, JWT authentication, and gamified loyalty program.",
            "technologies": [".NET Core", "Next.js", "TypeScript", "Python", "Redis", "SQL Server", "Entity Framework", "JWT", "Docker", "Stable Diffusion AI"],
            "github": "https://github.com/unsignedbuntu",
            "demo": None
        },
        {
            "name": "RepsyAPI - Software Package System",
            "description": "Enterprise-grade REST API for software package management inspired by Maven/npm. Features modular architecture with pluggable storage strategies (Filesystem & Minio S3), PostgreSQL database, and Docker containerization. Supports package deployment, versioning, and download operations.",
            "technologies": ["Java", "Spring Boot", "PostgreSQL", "Minio S3", "Docker", "Maven", "REST API"],
            "github": "https://github.com/unsignedbuntu/RepsyAPI",
            "demo": None
        },
        {
            "name": "ESBAŞ B2B Data Processing System",
            "description": "Professional internship project for real-time proximity card data processing. ASP.NET Core Web API backend integrated with MSSQL database and Entity Framework Core. React frontend with real-time filtering capabilities for B2B environment data visualization.",
            "technologies": ["ASP.NET Core", "Entity Framework", "MSSQL", "React", "Proximity Card Integration", "Real-time Processing"],
            "github": "https://github.com/unsignedbuntu",
            "demo": None
        },
        {
            "name": "University Code Repository",
            "description": "Comprehensive collection of academic projects and coursework including data structures implementations, OOP concepts, database systems, and automata theory. Features algorithms in C, Java projects, and educational resources developed throughout computer engineering studies.",
            "technologies": ["C", "Java", "Data Structures", "OOP", "Database Design", "Algorithms"],
            "github": "https://github.com/unsignedbuntu/FinalYearProject_Mobile",
            "demo": None
        },
        {
            "name": "Personal Portfolio Website",
            "description": "Modern portfolio website built from scratch to showcase full-stack development skills. Features FastAPI backend with dynamic content management, Next.js frontend with smooth animations, and comprehensive project showcase system.",
            "technologies": ["FastAPI", "Next.js", "TypeScript", "Python", "Framer Motion", "Tailwind CSS"],
            "github": "https://github.com/atalaydev/portfolio",
            "demo": "https://atalaydev.vercel.app"
        }
    ]
    
    try:
        for project_data in projects_data:
            db_project = Project(
                name=project_data["name"],
                description=project_data["description"],
                technologies=json.dumps(project_data["technologies"]),
                github=project_data["github"],
                demo=project_data["demo"]
            )
            db.add(db_project)
        
        db.commit()
        print(f"✅ {len(projects_data)} projects added successfully!")
        
    except Exception as e:
        print(f"❌ Error adding projects: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("🌱 Seeding database with initial data...")
    seed_blog_posts()
    seed_projects()
    print("🎉 Database seeding completed!")

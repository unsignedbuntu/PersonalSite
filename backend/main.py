# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# FastAPI uygulaması oluştur
app = FastAPI(
    title="Portfolio API",
    description="Kişisel portfolyo sitesi için backend API",
    version="1.0.0"
)

# CORS ayarları - Frontend'den isteklere izin vermek için
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic modelleri
class BlogPost(BaseModel):
    id: int
    title: str
    excerpt: str
    content: Optional[str] = None
    date: str
    readTime: str
    category: str
    tags: List[str]
    slug: str

class Project(BaseModel):
    id: int
    name: str
    description: str
    technologies: List[str]
    github: str
    demo: Optional[str] = None

class ContactMessage(BaseModel):
    name: str
    email: str
    message: str

# Geçici veri - İleride database'den gelecek
blog_posts = [
    {
        "id": 1,
        "title": "Modern Web Geliştirme Teknikleri",
        "excerpt": "React, Next.js ve TypeScript kullanarak modern web uygulamaları geliştirme sürecinde dikkat edilmesi gereken önemli noktalar.",
        "content": "Bu yazıda modern web geliştirme tekniklerini detaylı olarak inceleyeceğiz...",
        "date": "2024-01-15",
        "readTime": "5 dk",
        "category": "Web Development",
        "tags": ["React", "Next.js", "TypeScript"],
        "slug": "modern-web-gelistirme-teknikleri"
    },
    {
        "id": 2,
        "title": "AI ve Machine Learning Trendleri",
        "excerpt": "Yapay zeka ve makine öğrenmesi alanındaki son gelişmeler ve bu teknolojilerin gelecekteki potansiyel kullanım alanları.",
        "content": "Yapay zeka dünyasında yaşanan hızlı değişimler...",
        "date": "2024-01-10",
        "readTime": "7 dk",
        "category": "AI/ML",
        "tags": ["AI", "Machine Learning", "Python"],
        "slug": "ai-ve-machine-learning-trendleri"
    },
    {
        "id": 3,
        "title": "Clean Code Prensipleri",
        "excerpt": "Temiz kod yazmanın önemi ve sürdürülebilir yazılım geliştirme süreçlerinde uygulanması gereken best practice'ler.",
        "content": "Temiz kod yazmak sadece bir tercih değil, zorunluluktur...",
        "date": "2024-01-05",
        "readTime": "6 dk",
        "category": "Software Engineering",
        "tags": ["Clean Code", "Best Practices", "Development"],
        "slug": "clean-code-prensipleri"
    }
]

projects_data = [
    {
        "id": 1,
        "name": "Modern E-Commerce Platform",
        "description": "Full-stack graduation project with AI-powered features. .NET Core Web API backend with comprehensive e-commerce functionality, Next.js frontend with modern UX, and Python microservice for AI image generation. Features multi-layer Redis caching, JWT authentication, and gamified loyalty program.",
        "technologies": [".NET Core", "Next.js", "TypeScript", "Python", "Redis", "SQL Server", "Entity Framework", "JWT", "Docker", "Stable Diffusion AI"],
        "github": "https://github.com/unsignedbuntu",
        "demo": None
    },
    {
        "id": 2,
        "name": "RepsyAPI - Software Package System",
        "description": "Enterprise-grade REST API for software package management inspired by Maven/npm. Features modular architecture with pluggable storage strategies (Filesystem & Minio S3), PostgreSQL database, and Docker containerization. Supports package deployment, versioning, and download operations.",
        "technologies": ["Java", "Spring Boot", "PostgreSQL", "Minio S3", "Docker", "Maven", "REST API"],
        "github": "https://github.com/unsignedbuntu/RepsyAPI",
        "demo": None
    },
    {
        "id": 3,
        "name": "ESBAŞ B2B Data Processing System",
        "description": "Professional internship project for real-time proximity card data processing. ASP.NET Core Web API backend integrated with MSSQL database and Entity Framework Core. React frontend with real-time filtering capabilities for B2B environment data visualization.",
        "technologies": ["ASP.NET Core", "Entity Framework", "MSSQL", "React", "Proximity Card Integration", "Real-time Processing"],
        "github": "https://github.com/unsignedbuntu",
        "demo": None
    },
    {
        "id": 4,
        "name": "University Code Repository",
        "description": "Comprehensive collection of academic projects and coursework including data structures implementations, OOP concepts, database systems, and automata theory. Features algorithms in C, Java projects, and educational resources developed throughout computer engineering studies.",
        "technologies": ["C", "Java", "Data Structures", "OOP", "Database Design", "Algorithms"],
        "github": "https://github.com/unsignedbuntu/FinalYearProject_Mobile",
        "demo": None
    },
    {
        "id": 5,
        "name": "Personal Portfolio Website",
        "description": "Modern portfolio website built from scratch to showcase full-stack development skills. Features FastAPI backend with dynamic content management, Next.js frontend with smooth animations, and comprehensive project showcase system.",
        "technologies": ["FastAPI", "Next.js", "TypeScript", "Python", "Framer Motion", "Tailwind CSS"],
        "github": "https://github.com/atalaydev/portfolio",
        "demo": "https://atalaydev.vercel.app"
    }
]

# API Endpoints

@app.get("/")
async def root():
    return {
        "message": "Portfolio API'ye hoş geldiniz!",
        "version": "1.0.0",
        "docs": "/docs"
    }

# Blog endpoints
@app.get("/api/posts", response_model=List[BlogPost])
async def get_blog_posts():
    """Tüm blog yazılarını getir"""
    return blog_posts

@app.get("/api/posts/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: int):
    """Belirli bir blog yazısını getir"""
    for post in blog_posts:
        if post["id"] == post_id:
            return post
    return {"error": "Blog yazısı bulunamadı"}

@app.get("/api/posts/slug/{slug}", response_model=BlogPost)
async def get_blog_post_by_slug(slug: str):
    """Slug ile blog yazısını getir"""
    for post in blog_posts:
        if post["slug"] == slug:
            return post
    return {"error": "Blog yazısı bulunamadı"}

# Projects endpoints
@app.get("/api/projects", response_model=List[Project])
async def get_projects():
    """Tüm projeleri getir"""
    return projects_data

@app.get("/api/projects/{project_id}", response_model=Project)
async def get_project(project_id: int):
    """Belirli bir projeyi getir"""
    for project in projects_data:
        if project["id"] == project_id:
            return project
    return {"error": "Proje bulunamadı"}

# Contact endpoint
@app.post("/api/contact")
async def send_contact_message(message: ContactMessage):
    """İletişim formu mesajı gönder"""
    # İleride email gönderme veya database'e kaydetme işlemi yapılacak
    return {
        "message": "Mesajınız başarıyla alındı!",
        "data": {
            "name": message.name,
            "email": message.email,
            "received_at": datetime.now().isoformat()
        }
    }

# Health check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

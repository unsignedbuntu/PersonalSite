# backend/main.py
from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
import json

# Local imports
from database import get_db, create_tables, User, BlogPost, Project, ContactMessage
from auth import (
    authenticate_user, create_access_token, get_current_user, get_current_admin_user,
    get_password_hash, rate_limit_check
)


# Pydantic modelleri (Request/Response)
class BlogPostResponse(BaseModel):
    id: int
    title: str
    excerpt: str
    content: Optional[str] = None
    date: str
    readTime: str
    category: str
    tags: List[str]
    slug: str
    
    class Config:
        from_attributes = True

class ProjectResponse(BaseModel):
    id: int
    name: str
    description: str
    technologies: List[str]
    github: str
    demo: Optional[str] = None
    
    class Config:
        from_attributes = True

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Name (2-100 characters)")
    email: EmailStr = Field(..., description="Valid email address")
    subject: str = Field(..., min_length=5, max_length=200, description="Subject (5-200 characters)")
    message: str = Field(..., min_length=10, max_length=2000, description="Message (10-2000 characters)")

class UserLogin(BaseModel):
    username: str
    password: str

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class BlogPostCreate(BaseModel):
    title: str
    excerpt: str
    content: str
    category: str
    tags: List[str]
    read_time: str

class ProjectCreate(BaseModel):
    name: str
    description: str
    technologies: List[str]
    github: str
    demo: Optional[str] = None

# Database initialization using lifespan
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    create_tables()
    
    # Create default admin user if not exists
    db = SessionLocal()
    try:
        admin_user = db.query(User).filter(User.username == "admin").first()
        if not admin_user:
            admin_user = User(
                username="admin",
                email="admin@portfolio.com",
                hashed_password=get_password_hash("admin123"),  # Change in production!
                is_admin=True
            )
            db.add(admin_user)
            db.commit()
            print("✅ Default admin user created: admin/admin123")
    finally:
        db.close()
    
    yield
    # Shutdown (cleanup if needed)

from database import SessionLocal

# FastAPI uygulaması oluştur
app = FastAPI(
    title="Portfolio API",
    description="Kişisel portfolyo sitesi için backend API",
    version="1.0.0",
    lifespan=lifespan
)

# CORS ayarları - Frontend'den isteklere izin vermek için
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Specific methods only
    allow_headers=["Content-Type", "Authorization"],  # Specific headers only
)

# Security Headers Middleware
@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    
    # Security headers
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    # X-XSS-Protection deprecated - CSP kullanıyoruz
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Content-Security-Policy"] = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
    
    return response

# Helper functions
def convert_tags_to_list(tags_str: str) -> List[str]:
    """Convert JSON string tags to list"""
    try:
        return json.loads(tags_str) if tags_str else []
    except:
        return []

def convert_tags_to_string(tags_list: List[str]) -> str:
    """Convert list tags to JSON string"""
    return json.dumps(tags_list)

# Geçici veri - Database'e migrate edilecek
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

# Authentication endpoints
@app.post("/api/auth/login", response_model=Token)
async def login(user_credentials: UserLogin, request: Request, db: Session = Depends(get_db)):
    """Admin login endpoint with rate limiting"""
    rate_limit_check(request, max_requests=5, window_minutes=15)  # Strict rate limiting for login
    
    user = authenticate_user(db, user_credentials.username, user_credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    if not user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

# ==================== ADMIN PANEL ENDPOINTS ====================

# Admin Blog Management
@app.post("/api/admin/posts", response_model=BlogPostResponse)
async def create_blog_post(
    post: BlogPostCreate,
    request: Request,
    current_user: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Yeni blog yazısı oluştur (Admin only)"""
    # Rate limiting for admin operations
    rate_limit_check(request, max_requests=10, window_minutes=60)  # 10 işlem/saat
    db_post = BlogPost(
        title=post.title,
        content=post.content,
        excerpt=post.excerpt,
        author=post.author,
        date=post.date,
        tags=convert_tags_to_string(post.tags),
        reading_time=post.reading_time,
        slug=post.slug
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    
    # Convert back to response format
    return BlogPostResponse(
        id=db_post.id,
        title=db_post.title,
        excerpt=db_post.excerpt,
        author=db_post.author,
        date=db_post.date,
        tags=convert_tags_to_list(db_post.tags),
        reading_time=db_post.reading_time,
        slug=db_post.slug
    )

@app.put("/api/admin/posts/{post_id}", response_model=BlogPostResponse)
async def update_blog_post(
    post_id: int,
    post: BlogPostCreate,
    current_user: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Blog yazısını güncelle (Admin only)"""
    db_post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Blog yazısı bulunamadı")
    
    # Update fields
    for field, value in post.dict().items():
        if field == "tags":
            setattr(db_post, field, convert_tags_to_string(value))
        else:
            setattr(db_post, field, value)
    
    db.commit()
    db.refresh(db_post)
    
    return BlogPostResponse(
        id=db_post.id,
        title=db_post.title,
        excerpt=db_post.excerpt,
        author=db_post.author,
        date=db_post.date,
        tags=convert_tags_to_list(db_post.tags),
        reading_time=db_post.reading_time,
        slug=db_post.slug
    )

@app.delete("/api/admin/posts/{post_id}")
async def delete_blog_post(
    post_id: int,
    current_user: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Blog yazısını sil (Admin only)"""
    db_post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Blog yazısı bulunamadı")
    
    db.delete(db_post)
    db.commit()
    return {"message": "Blog yazısı başarıyla silindi"}

# Admin Project Management
@app.post("/api/admin/projects", response_model=ProjectResponse)
async def create_project(
    project: ProjectCreate,
    current_user: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Yeni proje oluştur (Admin only)"""
    db_project = Project(
        title=project.title,
        description=project.description,
        technologies=convert_tags_to_string(project.technologies),
        github=project.github,
        demo=project.demo
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    
    return ProjectResponse(
        id=db_project.id,
        title=db_project.title,
        description=db_project.description,
        technologies=convert_tags_to_list(db_project.technologies),
        github=db_project.github,
        demo=db_project.demo
    )

@app.put("/api/admin/projects/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: int,
    project: ProjectCreate,
    current_user: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Projeyi güncelle (Admin only)"""
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Proje bulunamadı")
    
    # Update fields
    for field, value in project.dict().items():
        if field == "technologies":
            setattr(db_project, field, convert_tags_to_string(value))
        else:
            setattr(db_project, field, value)
    
    db.commit()
    db.refresh(db_project)
    
    return ProjectResponse(
        id=db_project.id,
        title=db_project.title,
        description=db_project.description,
        technologies=convert_tags_to_list(db_project.technologies),
        github=db_project.github,
        demo=db_project.demo
    )

@app.delete("/api/admin/projects/{project_id}")
async def delete_project(
    project_id: int,
    current_user: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Projeyi sil (Admin only)"""
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Proje bulunamadı")
    
    db.delete(db_project)
    db.commit()
    return {"message": "Proje başarıyla silindi"}

# Admin Contact Messages
@app.get("/api/admin/messages")
async def get_contact_messages(
    current_user: User = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Tüm iletişim mesajlarını getir (Admin only)"""
    messages = db.query(ContactMessage).all()
    return [
        {
            "id": msg.id,
            "name": msg.name,
            "email": msg.email,
            "subject": msg.subject,
            "message": msg.message,
            "created_at": msg.created_at
        } for msg in messages
    ]

@app.get("/api/auth/me")
async def get_current_user_info(current_user: User = Depends(get_current_admin_user)):
    """Get current admin user info"""
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "is_admin": current_user.is_admin
    }

@app.get("/")
async def root():
    return {
        "message": "Portfolio API'ye hoş geldiniz!",
        "version": "1.0.0",
        "docs": "/docs"
    }

# Blog endpoints
@app.get("/api/posts", response_model=List[BlogPostResponse])
async def get_blog_posts(db: Session = Depends(get_db)):
    """Tüm blog yazılarını getir"""
    db_posts = db.query(BlogPost).all()
    
    # If no posts in database, return static data
    if not db_posts:
        return blog_posts
    
    # Convert database posts to response format
    return [
        BlogPostResponse(
            id=post.id,
            title=post.title,
            excerpt=post.excerpt,
            author=post.author,
            date=post.date,
            tags=convert_tags_to_list(post.tags),
            reading_time=post.reading_time,
            slug=post.slug
        ) for post in db_posts
    ]

@app.get("/api/posts/{post_id}", response_model=BlogPostResponse)
async def get_blog_post(post_id: int):
    """Belirli bir blog yazısını getir"""
    for post in blog_posts:
        if post["id"] == post_id:
            return post
    raise HTTPException(status_code=404, detail="Blog yazısı bulunamadı")

@app.get("/api/posts/slug/{slug}", response_model=BlogPostResponse)
async def get_blog_post_by_slug(slug: str):
    """Slug ile blog yazısını getir"""
    for post in blog_posts:
        if post["slug"] == slug:
            return post
    raise HTTPException(status_code=404, detail="Blog yazısı bulunamadı")

# Projects endpoints
@app.get("/api/projects", response_model=List[ProjectResponse])
async def get_projects(db: Session = Depends(get_db)):
    """Tüm projeleri getir"""
    db_projects = db.query(Project).all()
    
    # If no projects in database, return static data
    if not db_projects:
        return projects_data
    
    # Convert database projects to response format
    return [
        ProjectResponse(
            id=project.id,
            title=project.title,
            description=project.description,
            technologies=convert_tags_to_list(project.technologies),
            github=project.github,
            demo=project.demo
        ) for project in db_projects
    ]

@app.get("/api/projects/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: int):
    """Belirli bir projeyi getir"""
    for project in projects_data:
        if project["id"] == project_id:
            return project
    raise HTTPException(status_code=404, detail="Proje bulunamadı")

# Contact endpoint
@app.post("/api/contact")
async def send_contact_message(
    message: ContactMessageCreate, 
    request: Request,
    db: Session = Depends(get_db)
):
    """İletişim formu mesajı gönder"""
    # Rate limiting for contact form
    rate_limit_check(request, max_requests=3, window_minutes=60)  # 3 mesaj/saat
    # Save to database
    db_message = ContactMessage(
        name=message.name,
        email=message.email,
        subject=message.subject,
        message=message.message
    )
    db.add(db_message)
    db.commit()
    
    return {
        "message": "Mesajınız başarıyla alındı ve kaydedildi!",
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

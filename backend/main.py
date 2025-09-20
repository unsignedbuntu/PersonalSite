# backend/main.py
from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
import json
import os
import httpx
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Local imports
from database import get_db, create_tables, User, BlogPost, Project, ContactMessage
from auth import (
    authenticate_user, create_access_token, get_current_user, get_current_admin_user,
    get_password_hash, rate_limit_check
)

# Cache temizleme fonksiyonu
async def invalidate_frontend_cache(tag: str):
    """Frontend cache'ini temizle"""
    try:
        revalidate_secret = os.getenv("REVALIDATE_SECRET", "your-super-secret-revalidate-key-2024")
        frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{frontend_url}/api/revalidate",
                json={"tag": tag, "secret": revalidate_secret},
                timeout=5.0
            )
            if response.status_code == 200:
                print(f"✅ Frontend cache temizlendi: {tag}")
            else:
                print(f"⚠️ Cache temizleme başarısız: {response.status_code}")
    except Exception as e:
        print(f"❌ Cache temizleme hatası: {e}")
        # Cache temizleme başarısız olsa da ana işlemi etkilemesin


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
            default_password = os.getenv("ADMIN_DEFAULT_PASSWORD", "SecureAdminPass2024!")
            admin_user = User(
                username="admin",
                email="admin@portfolio.com",
                hashed_password=get_password_hash(default_password),
                is_admin=True
            )
            db.add(admin_user)
            db.commit()
            print("✅ Default admin user created with secure password")
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
    allow_origins=json.loads(os.getenv("CORS_ORIGINS", '["http://localhost:3000", "http://localhost:3001"]')),
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
    response.headers["Content-Security-Policy"] = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; img-src 'self' data: https:; font-src 'self' https://cdn.jsdelivr.net;"
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

# Statik veriler kaldırıldı - Artık tamamen database'den çalışıyor

# Projeler de artık tamamen database'den gelecek

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
        category=post.category,
        tags=convert_tags_to_string(post.tags),
        read_time=post.read_time,
        slug=f"{post.title.lower().replace(' ', '-')}-{datetime.now().strftime('%Y%m%d')}",
        author_id=current_user.id
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    
    # Frontend cache'ini temizle
    await invalidate_frontend_cache("blog-posts")
    
    # Convert back to response format
    return BlogPostResponse(
        id=db_post.id,
        title=db_post.title,
        excerpt=db_post.excerpt,
        content=db_post.content,
        date=db_post.created_at.strftime("%Y-%m-%d"),
        readTime=db_post.read_time,
        category=db_post.category,
        tags=convert_tags_to_list(db_post.tags),
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
    
    # Frontend cache'ini temizle
    await invalidate_frontend_cache("blog-posts")
    
    return BlogPostResponse(
        id=db_post.id,
        title=db_post.title,
        excerpt=db_post.excerpt,
        content=db_post.content,
        date=db_post.created_at.strftime("%Y-%m-%d"),
        readTime=db_post.read_time,
        category=db_post.category,
        tags=convert_tags_to_list(db_post.tags),
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
    
    # Frontend cache'ini temizle
    await invalidate_frontend_cache("blog-posts")
    
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
        name=project.name,
        description=project.description,
        technologies=convert_tags_to_string(project.technologies),
        github=project.github,
        demo=project.demo
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    
    # Frontend cache'ini temizle
    await invalidate_frontend_cache("projects")
    
    return ProjectResponse(
        id=db_project.id,
        name=db_project.name,
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
    
    # Frontend cache'ini temizle
    await invalidate_frontend_cache("projects")
    
    return ProjectResponse(
        id=db_project.id,
        name=db_project.name,
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
    
    # Frontend cache'ini temizle
    await invalidate_frontend_cache("projects")
    
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
    """Tüm blog yazılarını getir - Sadece database'den"""
    db_posts = db.query(BlogPost).all()
    
    # Convert database posts to response format
    return [
        BlogPostResponse(
            id=post.id,
            title=post.title,
            excerpt=post.excerpt,
            content=post.content,
            date=post.created_at.strftime("%Y-%m-%d"),
            readTime=post.read_time,
            category=post.category,
            tags=convert_tags_to_list(post.tags),
            slug=post.slug
        ) for post in db_posts
    ]

@app.get("/api/posts/{post_id}", response_model=BlogPostResponse)
async def get_blog_post(post_id: int, db: Session = Depends(get_db)):
    """Belirli bir blog yazısını getir - Database'den"""
    db_post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Blog yazısı bulunamadı")
    
    return BlogPostResponse(
        id=db_post.id,
        title=db_post.title,
        excerpt=db_post.excerpt,
        content=db_post.content,
        date=db_post.created_at.strftime("%Y-%m-%d"),
        readTime=db_post.read_time,
        category=db_post.category,
        tags=convert_tags_to_list(db_post.tags),
        slug=db_post.slug
    )

@app.get("/api/posts/slug/{slug}", response_model=BlogPostResponse)
async def get_blog_post_by_slug(slug: str, db: Session = Depends(get_db)):
    """Slug ile blog yazısını getir - Database'den"""
    db_post = db.query(BlogPost).filter(BlogPost.slug == slug).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Blog yazısı bulunamadı")
    
    return BlogPostResponse(
        id=db_post.id,
        title=db_post.title,
        excerpt=db_post.excerpt,
        content=db_post.content,
        date=db_post.created_at.strftime("%Y-%m-%d"),
        readTime=db_post.read_time,
        category=db_post.category,
        tags=convert_tags_to_list(db_post.tags),
        slug=db_post.slug
    )

# Projects endpoints
@app.get("/api/projects", response_model=List[ProjectResponse])
async def get_projects(db: Session = Depends(get_db)):
    """Tüm projeleri getir - Sadece database'den"""
    db_projects = db.query(Project).all()
    
    # Convert database projects to response format
    return [
        ProjectResponse(
            id=project.id,
            name=project.name,
            description=project.description,
            technologies=convert_tags_to_list(project.technologies),
            github=project.github,
            demo=project.demo
        ) for project in db_projects
    ]

@app.get("/api/projects/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: int, db: Session = Depends(get_db)):
    """Belirli bir projeyi getir - Database'den"""
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Proje bulunamadı")
    
    return ProjectResponse(
        id=db_project.id,
        name=db_project.name,
        description=db_project.description,
        technologies=convert_tags_to_list(db_project.technologies),
        github=db_project.github,
        demo=db_project.demo
    )

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

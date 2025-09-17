#!/usr/bin/env python3
"""
PostgreSQL bağlantı testi
"""
import os
from dotenv import load_dotenv
import psycopg2

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
print(f"🔗 Bağlantı URL'si: {DATABASE_URL}")

try:
    # PostgreSQL'e bağlan (veritabanı olmadan)
    conn = psycopg2.connect(
        host="localhost",
        port="5432",
        user="postgres",
        password=""  # Şifre boş
    )
    conn.autocommit = True
    cursor = conn.cursor()
    
    print("✅ PostgreSQL'e bağlandı!")
    
    # Veritabanını oluştur
    cursor.execute("CREATE DATABASE personal_site_db;")
    print("✅ personal_site_db veritabanı oluşturuldu!")
    
except psycopg2.errors.DuplicateDatabase:
    print("ℹ️  personal_site_db zaten mevcut!")
except Exception as e:
    print(f"❌ Hata: {e}")
finally:
    if 'conn' in locals():
        conn.close()

# Şimdi veritabanına bağlan
try:
    conn = psycopg2.connect(DATABASE_URL)
    print("✅ personal_site_db'ye bağlandı!")
    conn.close()
except Exception as e:
    print(f"❌ Veritabanı bağlantı hatası: {e}")

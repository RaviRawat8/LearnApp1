#!/usr/bin/env python3
"""
LearnCraft - Quick Launch Script
Run this script to start the LearnCraft application
"""

import subprocess
import sys
import os

def check_requirements():
    """Check if required files exist"""
    required_files = [
        'app.py',
        'recommendation_system.py', 
        'students.csv',
        'quizzes.csv',
        'interactions.csv',
        'templates/base.html',
        'static/css/style.css'
    ]

    missing_files = []
    for file in required_files:
        if not os.path.exists(file):
            missing_files.append(file)

    if missing_files:
        print("❌ Missing required files:")
        for file in missing_files:
            print(f"   - {file}")
        print("\nPlease ensure all project files are in the correct location.")
        return False

    return True

def install_dependencies():
    """Install Python dependencies"""
    print("🔄 Installing dependencies...")
    try:
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'])
        print("✅ Dependencies installed successfully")
        return True
    except subprocess.CalledProcessError:
        print("❌ Failed to install dependencies")
        return False

def start_application():
    """Start the Flask application"""
    print("🚀 Starting LearnCraft application...")
    print("📱 Open your browser and go to: http://localhost:5000")
    print("🛑 Press Ctrl+C to stop the server")
    print("-" * 50)

    try:
        subprocess.run([sys.executable, 'app.py'])
    except KeyboardInterrupt:
        print("\n👋 Application stopped. Thanks for using LearnCraft!")

def main():
    """Main launch sequence"""
    print("🎓 LearnCraft - Personalized Quiz Recommendation System")
    print("=" * 55)

    # Check if all required files exist
    if not check_requirements():
        return

    # Ask user if they want to install dependencies
    install_deps = input("📦 Install/update dependencies? (y/n): ").lower().strip()
    if install_deps in ['y', 'yes']:
        if not install_dependencies():
            return

    # Start the application
    start_application()

if __name__ == "__main__":
    main()

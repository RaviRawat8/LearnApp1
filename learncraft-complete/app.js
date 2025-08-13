// LearnCraft Application - Main JavaScript File
class LearnCraftApp {
    constructor() {
        this.studentsData = [];
        this.quizzesData = [];
        this.interactionsData = [];
        this.currentStudent = null;
        this.currentQuiz = null;
        this.quizState = {
            questions: [],
            currentQuestion: 0,
            answers: [],
            startTime: null,
            timer: null
        };
        this.charts = {};
        
        this.init();
    }

    // Initialize the application
    init() {
        this.loadSampleData();
        this.setupEventListeners();
        this.populateStudentDropdown();
        this.loadUserSession();
    }

    // Load sample data (simulating CSV processing)
    loadSampleData() {
        // Sample Students Data
        this.studentsData = [
            {"student_id": "STU_0001", "learning_style": "visual", "initial_skill_level": "beginner", "preferred_difficulty": "hard", "avg_session_length": 52.45, "motivation_level": 0.812},
            {"student_id": "STU_0002", "learning_style": "kinesthetic", "initial_skill_level": "beginner", "preferred_difficulty": "easy", "avg_session_length": 42.93, "motivation_level": 0.719},
            {"student_id": "STU_0003", "learning_style": "auditory", "initial_skill_level": "advanced", "preferred_difficulty": "easy", "avg_session_length": 41.49, "motivation_level": 0.341},
            {"student_id": "STU_0004", "learning_style": "reading_writing", "initial_skill_level": "intermediate", "preferred_difficulty": "intermediate", "avg_session_length": 35.2, "motivation_level": 0.645},
            {"student_id": "STU_0005", "learning_style": "visual", "initial_skill_level": "advanced", "preferred_difficulty": "hard", "avg_session_length": 48.7, "motivation_level": 0.889}
        ];

        // Sample Quizzes Data
        this.quizzesData = [
            {"quiz_id": "QZ_001", "topic": "photosynthesis", "difficulty_level": "beginner", "estimated_time": 39.75, "num_questions": 3, "skill_tags": "photosynthesis,beginner,critical_thinking", "prerequisite_topics": ""},
            {"quiz_id": "QZ_002", "topic": "photosynthesis", "difficulty_level": "intermediate", "estimated_time": 35.01, "num_questions": 5, "skill_tags": "photosynthesis,intermediate,critical_thinking", "prerequisite_topics": ""},
            {"quiz_id": "QZ_003", "topic": "gravity", "difficulty_level": "advanced", "estimated_time": 31.90, "num_questions": 7, "skill_tags": "gravity,advanced,critical_thinking", "prerequisite_topics": "geometry,atomic structure"},
            {"quiz_id": "QZ_004", "topic": "democracy", "difficulty_level": "intermediate", "estimated_time": 28.5, "num_questions": 4, "skill_tags": "democracy,intermediate,analysis", "prerequisite_topics": ""},
            {"quiz_id": "QZ_005", "topic": "fractions", "difficulty_level": "beginner", "estimated_time": 22.3, "num_questions": 6, "skill_tags": "fractions,beginner,math", "prerequisite_topics": ""},
            {"quiz_id": "QZ_006", "topic": "algebra", "difficulty_level": "intermediate", "estimated_time": 45.2, "num_questions": 8, "skill_tags": "algebra,intermediate,math", "prerequisite_topics": "fractions"},
            {"quiz_id": "QZ_007", "topic": "cell biology", "difficulty_level": "advanced", "estimated_time": 52.1, "num_questions": 9, "skill_tags": "cell biology,advanced,science", "prerequisite_topics": ""},
            {"quiz_id": "QZ_008", "topic": "world war ii", "difficulty_level": "intermediate", "estimated_time": 38.7, "num_questions": 7, "skill_tags": "world war ii,intermediate,history", "prerequisite_topics": ""}
        ];

        // Sample Interactions Data
        this.interactionsData = [
            {"interaction_id": "INT_00001", "student_id": "STU_0001", "quiz_id": "QZ_001", "topic": "photosynthesis", "difficulty_level": "beginner", "attempt_number": 1, "score": 85.2, "time_taken_minutes": 25.5, "timestamp": "2025-08-01 10:30:00", "hints_used": 0, "confidence_level": 4, "completed": true, "session_id": "SES_001"},
            {"interaction_id": "INT_00002", "student_id": "STU_0001", "quiz_id": "QZ_002", "topic": "photosynthesis", "difficulty_level": "intermediate", "attempt_number": 1, "score": 78.9, "time_taken_minutes": 32.1, "timestamp": "2025-08-02 14:15:00", "hints_used": 1, "confidence_level": 3, "completed": true, "session_id": "SES_002"},
            {"interaction_id": "INT_00003", "student_id": "STU_0001", "quiz_id": "QZ_004", "topic": "democracy", "difficulty_level": "intermediate", "attempt_number": 1, "score": 92.3, "time_taken_minutes": 18.2, "timestamp": "2025-08-03 09:45:00", "hints_used": 0, "confidence_level": 5, "completed": true, "session_id": "SES_003"},
            {"interaction_id": "INT_00004", "student_id": "STU_0002", "quiz_id": "QZ_005", "topic": "fractions", "difficulty_level": "beginner", "attempt_number": 1, "score": 67.8, "time_taken_minutes": 28.9, "timestamp": "2025-08-01 15:20:00", "hints_used": 2, "confidence_level": 2, "completed": true, "session_id": "SES_004"},
            {"interaction_id": "INT_00005", "student_id": "STU_0003", "quiz_id": "QZ_007", "topic": "cell biology", "difficulty_level": "advanced", "attempt_number": 1, "score": 94.6, "time_taken_minutes": 35.7, "timestamp": "2025-08-02 11:10:00", "hints_used": 0, "confidence_level": 4, "completed": true, "session_id": "SES_005"}
        ];

        this.topics = ["photosynthesis", "gravity", "democracy", "fractions", "algebra", "cell biology", "world war ii", "climate change", "geometry", "atomic structure", "civil rights", "ecosystems", "calculus", "renaissance", "chemical reactions", "statistics", "ancient rome", "genetics", "trigonometry"];
    }

    // Setup event listeners
    setupEventListeners() {
        // Wait for DOM to be fully loaded
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        const quizConfigForm = document.getElementById('quiz-config-form');
        if (quizConfigForm) {
            quizConfigForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.startQuiz();
            });
        }
    }

    // Populate student dropdown
    populateStudentDropdown() {
        const dropdown = document.getElementById('student-id');
        if (dropdown && this.studentsData) {
            // Clear existing options except the first one
            dropdown.innerHTML = '<option value="">Select your Student ID</option>';
            
            this.studentsData.forEach(student => {
                const option = document.createElement('option');
                option.value = student.student_id;
                option.textContent = student.student_id;
                dropdown.appendChild(option);
            });

            // Populate topic dropdown as well
            const topicSelect = document.getElementById('quiz-topic');
            if (topicSelect && this.topics) {
                topicSelect.innerHTML = '<option value="">Select a topic</option>';
                this.topics.forEach(topic => {
                    const option = document.createElement('option');
                    option.value = topic;
                    option.textContent = topic.charAt(0).toUpperCase() + topic.slice(1);
                    topicSelect.appendChild(option);
                });
            }
        }
    }

    // Load user session from localStorage
    loadUserSession() {
        const savedUser = localStorage.getItem('learncraft_user');
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            this.currentStudent = this.studentsData.find(s => s.student_id === userData.student_id);
            if (this.currentStudent) {
                this.showDashboard();
            }
        }
    }

    // Handle user login
    handleLogin() {
        const studentId = document.getElementById('student-id').value;
        
        if (!studentId) {
            alert('Please select a Student ID');
            return;
        }

        this.currentStudent = this.studentsData.find(s => s.student_id === studentId);
        
        if (this.currentStudent) {
            localStorage.setItem('learncraft_user', JSON.stringify({student_id: studentId}));
            this.showDashboard();
        } else {
            alert('Student ID not found!');
        }
    }

    // Show dashboard
    showDashboard() {
        this.hideAllSections();
        document.getElementById('dashboard').classList.remove('d-none');
        document.getElementById('user-info').classList.remove('d-none');
        document.getElementById('current-user').textContent = this.currentStudent.student_id;
        
        this.updateDashboardStats();
        this.loadRecommendations();
    }

    // Update dashboard statistics
    updateDashboardStats() {
        const studentInteractions = this.interactionsData.filter(i => i.student_id === this.currentStudent.student_id);
        
        // Calculate average score
        const avgScore = studentInteractions.length > 0 
            ? (studentInteractions.reduce((sum, i) => sum + i.score, 0) / studentInteractions.length).toFixed(1)
            : '0';
        
        document.getElementById('avg-score').textContent = avgScore + '%';
        document.getElementById('quizzes-completed').textContent = studentInteractions.length;
        document.getElementById('learning-style').textContent = this.currentStudent.learning_style.charAt(0).toUpperCase() + this.currentStudent.learning_style.slice(1);
        document.getElementById('skill-level').textContent = this.currentStudent.initial_skill_level.charAt(0).toUpperCase() + this.currentStudent.initial_skill_level.slice(1);
    }

    // Load and display recommendations
    loadRecommendations() {
        const recommendations = this.getHybridRecommendations(this.currentStudent.student_id, 5);
        const container = document.getElementById('recommendations-list');
        
        if (recommendations.length === 0) {
            container.innerHTML = '<div class="text-center text-secondary">No recommendations available. Take a quiz to get personalized suggestions!</div>';
            return;
        }
        
        container.innerHTML = recommendations.map(rec => `
            <div class="recommendation-item mb-3 p-3 border rounded">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-1">${rec.topic.charAt(0).toUpperCase() + rec.topic.slice(1)}</h6>
                        <small class="text-secondary">
                            Difficulty: ${rec.difficulty_level} • 
                            ${rec.num_questions} questions • 
                            ~${Math.round(rec.estimated_time)} min
                        </small>
                        <div class="mt-1">
                            <span class="status status--info">Score: ${rec.confidence.toFixed(1)}%</span>
                        </div>
                    </div>
                    <button class="btn btn--sm btn--primary" onclick="app.takeRecommendedQuiz('${rec.quiz_id}')">
                        Take Quiz
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Hybrid recommendation system
    getHybridRecommendations(studentId, nRecommendations = 5) {
        const collaborative = this.getCollaborativeRecommendations(studentId, nRecommendations);
        const contentBased = this.getContentBasedRecommendations(studentId, nRecommendations);
        const ruleBased = this.getRuleBasedRecommendations(studentId, nRecommendations);
        
        // Combine recommendations with weighted scoring
        const combined = new Map();
        
        collaborative.forEach(rec => {
            combined.set(rec.quiz_id, { ...rec, confidence: rec.confidence * 0.4 });
        });
        
        contentBased.forEach(rec => {
            if (combined.has(rec.quiz_id)) {
                combined.get(rec.quiz_id).confidence += rec.confidence * 0.3;
            } else {
                combined.set(rec.quiz_id, { ...rec, confidence: rec.confidence * 0.3 });
            }
        });
        
        ruleBased.forEach(rec => {
            if (combined.has(rec.quiz_id)) {
                combined.get(rec.quiz_id).confidence += rec.confidence * 0.3;
            } else {
                combined.set(rec.quiz_id, { ...rec, confidence: rec.confidence * 0.3 });
            }
        });
        
        return Array.from(combined.values())
            .sort((a, b) => b.confidence - a.confidence)
            .slice(0, nRecommendations);
    }

    // Collaborative filtering
    getCollaborativeRecommendations(studentId, nRecommendations) {
        const studentInteractions = this.interactionsData.filter(i => i.student_id === studentId);
        const studentQuizzes = new Set(studentInteractions.map(i => i.quiz_id));
        
        // Find similar students
        const similarities = [];
        this.studentsData.forEach(otherStudent => {
            if (otherStudent.student_id !== studentId) {
                const similarity = this.calculateUserSimilarity(studentId, otherStudent.student_id);
                similarities.push({ student_id: otherStudent.student_id, similarity });
            }
        });
        
        similarities.sort((a, b) => b.similarity - a.similarity);
        const topSimilar = similarities.slice(0, 3);
        
        // Get recommendations from similar users
        const recommendations = [];
        topSimilar.forEach(similar => {
            const otherInteractions = this.interactionsData.filter(i => 
                i.student_id === similar.student_id && 
                !studentQuizzes.has(i.quiz_id) &&
                i.score >= 75
            );
            
            otherInteractions.forEach(interaction => {
                const quiz = this.quizzesData.find(q => q.quiz_id === interaction.quiz_id);
                if (quiz) {
                    recommendations.push({
                        ...quiz,
                        confidence: similar.similarity * (interaction.score / 100) * 100,
                        source: 'collaborative'
                    });
                }
            });
        });
        
        return recommendations.slice(0, nRecommendations);
    }

    // Content-based filtering
    getContentBasedRecommendations(studentId, nRecommendations) {
        const studentInteractions = this.interactionsData.filter(i => i.student_id === studentId);
        const studentQuizzes = new Set(studentInteractions.map(i => i.quiz_id));
        
        // Analyze student's topic preferences
        const topicScores = {};
        studentInteractions.forEach(interaction => {
            if (!topicScores[interaction.topic]) {
                topicScores[interaction.topic] = [];
            }
            topicScores[interaction.topic].push(interaction.score);
        });
        
        // Calculate average scores per topic
        const topicPreferences = {};
        Object.keys(topicScores).forEach(topic => {
            const avg = topicScores[topic].reduce((sum, score) => sum + score, 0) / topicScores[topic].length;
            topicPreferences[topic] = avg;
        });
        
        // Recommend quizzes from preferred topics
        const recommendations = [];
        this.quizzesData.forEach(quiz => {
            if (!studentQuizzes.has(quiz.quiz_id)) {
                const topicScore = topicPreferences[quiz.topic] || 50;
                const difficultyMatch = this.getDifficultyMatch(quiz.difficulty_level);
                
                recommendations.push({
                    ...quiz,
                    confidence: (topicScore + difficultyMatch) / 2,
                    source: 'content'
                });
            }
        });
        
        return recommendations
            .sort((a, b) => b.confidence - a.confidence)
            .slice(0, nRecommendations);
    }

    // Rule-based recommendations
    getRuleBasedRecommendations(studentId, nRecommendations) {
        const student = this.studentsData.find(s => s.student_id === studentId);
        const studentInteractions = this.interactionsData.filter(i => i.student_id === studentId);
        const studentQuizzes = new Set(studentInteractions.map(i => i.quiz_id));
        
        const recommendations = [];
        
        this.quizzesData.forEach(quiz => {
            if (!studentQuizzes.has(quiz.quiz_id)) {
                let confidence = 50;
                
                // Difficulty preference match
                if (quiz.difficulty_level === student.preferred_difficulty) {
                    confidence += 20;
                }
                
                // Skill level progression
                if (student.initial_skill_level === 'beginner' && quiz.difficulty_level === 'beginner') {
                    confidence += 15;
                } else if (student.initial_skill_level === 'intermediate' && quiz.difficulty_level === 'intermediate') {
                    confidence += 15;
                } else if (student.initial_skill_level === 'advanced' && quiz.difficulty_level === 'advanced') {
                    confidence += 15;
                }
                
                // Time preference
                if (quiz.estimated_time <= student.avg_session_length) {
                    confidence += 10;
                }
                
                recommendations.push({
                    ...quiz,
                    confidence: Math.min(confidence, 100),
                    source: 'rule'
                });
            }
        });
        
        return recommendations
            .sort((a, b) => b.confidence - a.confidence)
            .slice(0, nRecommendations);
    }

    // Calculate user similarity (cosine similarity)
    calculateUserSimilarity(userA, userB) {
        const interactionsA = this.interactionsData.filter(i => i.student_id === userA);
        const interactionsB = this.interactionsData.filter(i => i.student_id === userB);
        
        if (interactionsA.length === 0 || interactionsB.length === 0) {
            return 0;
        }
        
        // Create vectors of quiz scores
        const quizzesA = new Map();
        const quizzesB = new Map();
        
        interactionsA.forEach(i => quizzesA.set(i.quiz_id, i.score));
        interactionsB.forEach(i => quizzesB.set(i.quiz_id, i.score));
        
        // Find common quizzes
        const commonQuizzes = [];
        quizzesA.forEach((score, quizId) => {
            if (quizzesB.has(quizId)) {
                commonQuizzes.push(quizId);
            }
        });
        
        if (commonQuizzes.length === 0) {
            return 0;
        }
        
        // Calculate cosine similarity
        let dotProduct = 0;
        let normA = 0;
        let normB = 0;
        
        commonQuizzes.forEach(quizId => {
            const scoreA = quizzesA.get(quizId);
            const scoreB = quizzesB.get(quizId);
            
            dotProduct += scoreA * scoreB;
            normA += scoreA * scoreA;
            normB += scoreB * scoreB;
        });
        
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }

    // Get difficulty match score
    getDifficultyMatch(difficulty) {
        const difficultyOrder = ['beginner', 'intermediate', 'advanced'];
        const studentDifficulty = this.currentStudent.preferred_difficulty;
        const studentIndex = difficultyOrder.indexOf(studentDifficulty);
        const quizIndex = difficultyOrder.indexOf(difficulty);
        
        if (studentIndex === quizIndex) return 100;
        if (Math.abs(studentIndex - quizIndex) === 1) return 70;
        return 40;
    }

    // Take a recommended quiz
    takeRecommendedQuiz(quizId) {
        const quiz = this.quizzesData.find(q => q.quiz_id === quizId);
        if (quiz) {
            document.getElementById('quiz-topic').value = quiz.topic;
            document.getElementById('quiz-difficulty').value = quiz.difficulty_level;
            document.getElementById('confidence-level').value = '3'; // Default confidence
            this.showQuizSelection();
        }
    }

    // Show quiz selection
    showQuizSelection() {
        this.hideAllSections();
        document.getElementById('quiz-selection').classList.remove('d-none');
        this.populateAvailableQuizzes();
    }

    // Populate available quizzes
    populateAvailableQuizzes() {
        const container = document.getElementById('available-quizzes');
        const studentQuizzes = new Set(
            this.interactionsData
                .filter(i => i.student_id === this.currentStudent.student_id)
                .map(i => i.quiz_id)
        );
        
        const availableQuizzes = this.quizzesData.filter(q => !studentQuizzes.has(q.quiz_id));
        
        container.innerHTML = availableQuizzes.map(quiz => `
            <div class="quiz-card p-3 border rounded mb-3">
                <h6>${quiz.topic.charAt(0).toUpperCase() + quiz.topic.slice(1)}</h6>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <small class="text-secondary">
                            ${quiz.difficulty_level} • ${quiz.num_questions} questions • ~${Math.round(quiz.estimated_time)} min
                        </small>
                    </div>
                    <button class="btn btn--sm btn--outline" onclick="app.selectQuiz('${quiz.quiz_id}')">
                        Select
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Select a specific quiz
    selectQuiz(quizId) {
        const quiz = this.quizzesData.find(q => q.quiz_id === quizId);
        if (quiz) {
            document.getElementById('quiz-topic').value = quiz.topic;
            document.getElementById('quiz-difficulty').value = quiz.difficulty_level;
        }
    }

    // Start quiz
    startQuiz() {
        const topic = document.getElementById('quiz-topic').value;
        const difficulty = document.getElementById('quiz-difficulty').value;
        const confidence = parseInt(document.getElementById('confidence-level').value);
        
        if (!topic || !difficulty || !confidence) {
            alert('Please fill in all fields before starting the quiz.');
            return;
        }

        // Find matching quiz
        const quiz = this.quizzesData.find(q => 
            q.topic === topic && q.difficulty_level === difficulty
        );
        
        if (!quiz) {
            alert('No quiz found for this combination. Please try a different selection.');
            return;
        }
        
        this.currentQuiz = quiz;
        this.quizState = {
            quiz: quiz,
            confidence: confidence,
            questions: this.generateQuizQuestions(quiz),
            currentQuestion: 0,
            answers: [],
            startTime: new Date(),
            timer: null,
            hintsUsed: 0
        };
        
        this.showQuizInterface();
        this.startTimer();
        this.displayCurrentQuestion();
    }

    // Generate quiz questions (simulated)
    generateQuizQuestions(quiz) {
        const questions = [];
        for (let i = 0; i < quiz.num_questions; i++) {
            questions.push({
                id: i + 1,
                question: `Sample question ${i + 1} about ${quiz.topic} (${quiz.difficulty_level} level)`,
                options: [
                    `Option A for ${quiz.topic}`,
                    `Option B for ${quiz.topic}`,
                    `Option C for ${quiz.topic}`,
                    `Option D for ${quiz.topic}`
                ],
                correctAnswer: Math.floor(Math.random() * 4),
                hint: `This is a hint for question ${i + 1} about ${quiz.topic}`
            });
        }
        return questions;
    }

    // Show quiz interface
    showQuizInterface() {
        this.hideAllSections();
        document.getElementById('quiz-interface').classList.remove('d-none');
        document.getElementById('current-topic').textContent = this.currentQuiz.topic;
        document.getElementById('current-difficulty').textContent = this.currentQuiz.difficulty_level;
    }

    // Start quiz timer
    startTimer() {
        let seconds = 0;
        this.quizState.timer = setInterval(() => {
            seconds++;
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            document.getElementById('timer').textContent = 
                `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    // Display current question
    displayCurrentQuestion() {
        const question = this.quizState.questions[this.quizState.currentQuestion];
        const progress = ((this.quizState.currentQuestion + 1) / this.quizState.questions.length) * 100;
        
        document.getElementById('quiz-progress').style.width = progress + '%';
        
        const content = document.getElementById('quiz-content');
        content.innerHTML = `
            <div class="question-container">
                <h5 class="mb-3">Question ${this.quizState.currentQuestion + 1} of ${this.quizState.questions.length}</h5>
                <p class="lead mb-4">${question.question}</p>
                
                <div class="options-container">
                    ${question.options.map((option, index) => `
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="radio" name="answer" id="option${index}" value="${index}">
                            <label class="form-check-label" for="option${index}">
                                ${option}
                            </label>
                        </div>
                    `).join('')}
                </div>
                
                <div class="mt-3">
                    <button class="btn btn--outline btn--sm" onclick="app.showHint()" id="hint-btn">
                        <i class="fas fa-lightbulb me-2"></i>Show Hint
                    </button>
                    <div id="hint-container" class="mt-2 d-none">
                        <div class="alert alert-info">
                            <i class="fas fa-info-circle me-2"></i>
                            ${question.hint}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Update navigation buttons
        document.getElementById('prev-question').disabled = this.quizState.currentQuestion === 0;
        
        const isLastQuestion = this.quizState.currentQuestion === this.quizState.questions.length - 1;
        document.getElementById('next-question').classList.toggle('d-none', isLastQuestion);
        document.getElementById('submit-quiz').classList.toggle('d-none', !isLastQuestion);
        
        // Enable next button if answer is already selected
        const savedAnswer = this.quizState.answers[this.quizState.currentQuestion];
        if (savedAnswer !== undefined) {
            document.querySelector(`input[value="${savedAnswer}"]`).checked = true;
            document.getElementById('next-question').disabled = false;
            document.getElementById('submit-quiz').disabled = false;
        }
        
        // Add event listener for answer selection
        document.querySelectorAll('input[name="answer"]').forEach(input => {
            input.addEventListener('change', () => {
                document.getElementById('next-question').disabled = false;
                document.getElementById('submit-quiz').disabled = false;
            });
        });
    }

    // Show hint
    showHint() {
        document.getElementById('hint-container').classList.remove('d-none');
        document.getElementById('hint-btn').disabled = true;
        this.quizState.hintsUsed++;
    }

    // Navigate to previous question
    previousQuestion() {
        this.saveCurrentAnswer();
        if (this.quizState.currentQuestion > 0) {
            this.quizState.currentQuestion--;
            this.displayCurrentQuestion();
        }
    }

    // Navigate to next question
    nextQuestion() {
        this.saveCurrentAnswer();
        if (this.quizState.currentQuestion < this.quizState.questions.length - 1) {
            this.quizState.currentQuestion++;
            this.displayCurrentQuestion();
        }
    }

    // Save current answer
    saveCurrentAnswer() {
        const selected = document.querySelector('input[name="answer"]:checked');
        if (selected) {
            this.quizState.answers[this.quizState.currentQuestion] = parseInt(selected.value);
        }
    }

    // Submit quiz
    submitQuiz() {
        this.saveCurrentAnswer();
        clearInterval(this.quizState.timer);
        
        const endTime = new Date();
        const timeSpent = (endTime - this.quizState.startTime) / 60000; // in minutes
        
        // Calculate score
        let correctAnswers = 0;
        this.quizState.questions.forEach((question, index) => {
            if (this.quizState.answers[index] === question.correctAnswer) {
                correctAnswers++;
            }
        });
        
        const score = (correctAnswers / this.quizState.questions.length) * 100;
        
        // Create new interaction record
        const interaction = {
            interaction_id: `INT_${Date.now()}`,
            student_id: this.currentStudent.student_id,
            quiz_id: this.currentQuiz.quiz_id,
            topic: this.currentQuiz.topic,
            difficulty_level: this.currentQuiz.difficulty_level,
            attempt_number: 1,
            score: score,
            time_taken_minutes: timeSpent,
            timestamp: endTime.toISOString(),
            hints_used: this.quizState.hintsUsed,
            confidence_level: this.quizState.confidence,
            completed: true,
            session_id: `SES_${Date.now()}`
        };
        
        // Add to interactions data
        this.interactionsData.push(interaction);
        
        // Show results
        this.showQuizResults(correctAnswers, timeSpent, score);
    }

    // Show quiz results
    showQuizResults(correctAnswers, timeSpent, score) {
        this.hideAllSections();
        document.getElementById('quiz-results').classList.remove('d-none');
        
        // Update result display
        document.getElementById('final-score').textContent = Math.round(score) + '%';
        document.getElementById('correct-answers').textContent = `${correctAnswers}/${this.quizState.questions.length}`;
        document.getElementById('time-taken').textContent = `${Math.round(timeSpent)} min`;
        document.getElementById('hints-used-count').textContent = this.quizState.hintsUsed;
        
        // Calculate confidence accuracy
        const confidenceAccuracy = this.calculateConfidenceAccuracy(score, this.quizState.confidence);
        document.getElementById('confidence-accuracy').textContent = confidenceAccuracy;
        
        // Generate performance feedback
        this.generatePerformanceFeedback(score, timeSpent);
        
        // Update recommendations
        this.generateNextRecommendations();
    }

    // Calculate confidence accuracy
    calculateConfidenceAccuracy(actualScore, predictedConfidence) {
        const expectedScore = predictedConfidence * 20; // Convert 1-5 scale to percentage
        const accuracy = 100 - Math.abs(actualScore - expectedScore);
        return Math.max(0, accuracy).toFixed(0) + '%';
    }

    // Generate performance feedback
    generatePerformanceFeedback(score, timeSpent) {
        const feedback = document.getElementById('performance-feedback');
        let feedbackHtml = '';
        
        // Score feedback
        if (score >= 90) {
            feedbackHtml += '<div class="status status--success mb-2">Excellent! Outstanding performance.</div>';
        } else if (score >= 75) {
            feedbackHtml += '<div class="status status--success mb-2">Good job! Strong understanding demonstrated.</div>';
        } else if (score >= 60) {
            feedbackHtml += '<div class="status status--warning mb-2">Fair performance. Room for improvement.</div>';
        } else {
            feedbackHtml += '<div class="status status--error mb-2">Needs improvement. Consider reviewing the material.</div>';
        }
        
        // Time feedback
        const estimatedTime = this.currentQuiz.estimated_time;
        if (timeSpent <= estimatedTime * 0.8) {
            feedbackHtml += '<div class="status status--info mb-2">Completed efficiently - great time management!</div>';
        } else if (timeSpent <= estimatedTime * 1.2) {
            feedbackHtml += '<div class="status status--info mb-2">Completed within expected time frame.</div>';
        } else {
            feedbackHtml += '<div class="status status--warning mb-2">Took longer than expected. Consider practicing for better speed.</div>';
        }
        
        // Hints feedback
        if (this.quizState.hintsUsed === 0) {
            feedbackHtml += '<div class="status status--success mb-2">Great! Completed without hints.</div>';
        } else {
            feedbackHtml += `<div class="status status--info mb-2">Used ${this.quizState.hintsUsed} hint(s). Try to rely less on hints next time.</div>`;
        }
        
        feedback.innerHTML = feedbackHtml;
    }

    // Generate next recommendations
    generateNextRecommendations() {
        const recommendations = this.getHybridRecommendations(this.currentStudent.student_id, 3);
        const container = document.getElementById('next-recommendations');
        
        container.innerHTML = recommendations.map(rec => `
            <div class="recommendation-item p-2 border rounded mb-2">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <strong>${rec.topic.charAt(0).toUpperCase() + rec.topic.slice(1)}</strong>
                        <br>
                        <small class="text-secondary">${rec.difficulty_level} • ${rec.num_questions} questions</small>
                    </div>
                    <button class="btn btn--sm btn--primary" onclick="app.takeRecommendedQuiz('${rec.quiz_id}')">
                        Take Quiz
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Take another quiz
    takeAnotherQuiz() {
        this.showQuizSelection();
    }

    // Show analytics dashboard
    showAnalytics() {
        this.hideAllSections();
        document.getElementById('analytics-dashboard').classList.remove('d-none');
        
        // Small delay to ensure DOM is updated before creating charts
        setTimeout(() => {
            this.generateAnalyticsCharts();
            this.updateLearningStats();
            this.updateRecentActivity();
        }, 100);
    }

    // Generate analytics charts
    generateAnalyticsCharts() {
        const studentInteractions = this.interactionsData.filter(i => i.student_id === this.currentStudent.student_id);
        
        // Topic Performance Chart
        this.createTopicPerformanceChart(studentInteractions);
        
        // Progress Over Time Chart
        this.createProgressChart(studentInteractions);
    }

    // Create topic performance chart
    createTopicPerformanceChart(interactions) {
        const ctx = document.getElementById('topic-performance-chart');
        if (!ctx) return;
        
        const context = ctx.getContext('2d');
        
        // Destroy existing chart if it exists
        if (this.charts.topicChart) {
            this.charts.topicChart.destroy();
        }
        
        const topicData = {};
        interactions.forEach(interaction => {
            if (!topicData[interaction.topic]) {
                topicData[interaction.topic] = [];
            }
            topicData[interaction.topic].push(interaction.score);
        });
        
        const labels = Object.keys(topicData);
        const data = labels.map(topic => {
            const scores = topicData[topic];
            return scores.reduce((sum, score) => sum + score, 0) / scores.length;
        });
        
        this.charts.topicChart = new Chart(context, {
            type: 'bar',
            data: {
                labels: labels.map(label => label.charAt(0).toUpperCase() + label.slice(1)),
                datasets: [{
                    label: 'Average Score (%)',
                    data: data,
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
                    borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    // Create progress chart
    createProgressChart(interactions) {
        const ctx = document.getElementById('progress-chart');
        if (!ctx) return;
        
        const context = ctx.getContext('2d');
        
        // Destroy existing chart if it exists
        if (this.charts.progressChart) {
            this.charts.progressChart.destroy();
        }
        
        const sortedInteractions = interactions.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        
        const labels = sortedInteractions.map(i => new Date(i.timestamp).toLocaleDateString());
        const data = sortedInteractions.map(i => i.score);
        
        this.charts.progressChart = new Chart(context, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Quiz Scores (%)',
                    data: data,
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    // Update learning statistics
    updateLearningStats() {
        const studentInteractions = this.interactionsData.filter(i => i.student_id === this.currentStudent.student_id);
        const container = document.getElementById('learning-stats');
        
        const totalTime = studentInteractions.reduce((sum, i) => sum + i.time_taken_minutes, 0);
        const avgScore = studentInteractions.length > 0 
            ? studentInteractions.reduce((sum, i) => sum + i.score, 0) / studentInteractions.length 
            : 0;
        const totalHints = studentInteractions.reduce((sum, i) => sum + i.hints_used, 0);
        
        container.innerHTML = `
            <div class="stat-item mb-3">
                <div class="d-flex justify-content-between">
                    <span>Total Study Time</span>
                    <strong>${Math.round(totalTime)} min</strong>
                </div>
            </div>
            <div class="stat-item mb-3">
                <div class="d-flex justify-content-between">
                    <span>Average Score</span>
                    <strong>${avgScore.toFixed(1)}%</strong>
                </div>
            </div>
            <div class="stat-item mb-3">
                <div class="d-flex justify-content-between">
                    <span>Total Hints Used</span>
                    <strong>${totalHints}</strong>
                </div>
            </div>
            <div class="stat-item mb-3">
                <div class="d-flex justify-content-between">
                    <span>Completion Rate</span>
                    <strong>100%</strong>
                </div>
            </div>
        `;
    }

    // Update recent activity
    updateRecentActivity() {
        const studentInteractions = this.interactionsData
            .filter(i => i.student_id === this.currentStudent.student_id)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 5);
        
        const container = document.getElementById('recent-activity');
        
        if (studentInteractions.length === 0) {
            container.innerHTML = '<div class="text-center text-secondary">No recent activity</div>';
            return;
        }
        
        container.innerHTML = studentInteractions.map(interaction => `
            <div class="activity-item p-3 border rounded mb-2">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <strong>${interaction.topic.charAt(0).toUpperCase() + interaction.topic.slice(1)}</strong>
                        <br>
                        <small class="text-secondary">
                            ${interaction.difficulty_level} • 
                            ${Math.round(interaction.score)}% • 
                            ${new Date(interaction.timestamp).toLocaleDateString()}
                        </small>
                    </div>
                    <div class="text-end">
                        <div class="status ${interaction.score >= 75 ? 'status--success' : interaction.score >= 60 ? 'status--warning' : 'status--error'}">
                            ${Math.round(interaction.score)}%
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Show recommendations modal
    showRecommendations() {
        alert('Recommendations are displayed on your dashboard!');
    }

    // Hide all sections
    hideAllSections() {
        const sections = ['landing-page', 'dashboard', 'quiz-selection', 'quiz-interface', 'quiz-results', 'analytics-dashboard'];
        sections.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.add('d-none');
            }
        });
    }

    // Logout function
    logout() {
        localStorage.removeItem('learncraft_user');
        this.currentStudent = null;
        document.getElementById('user-info').classList.add('d-none');
        this.hideAllSections();
        document.getElementById('landing-page').classList.remove('d-none');
        
        // Reset form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.reset();
        }
    }
}

// Global functions for onclick handlers
function showDashboard() {
    if (window.app) {
        window.app.showDashboard();
    }
}

function showQuizSelection() {
    if (window.app) {
        window.app.showQuizSelection();
    }
}

function showAnalytics() {
    if (window.app) {
        window.app.showAnalytics();
    }
}

function showRecommendations() {
    if (window.app) {
        window.app.showRecommendations();
    }
}

function takeAnotherQuiz() {
    if (window.app) {
        window.app.takeAnotherQuiz();
    }
}

function logout() {
    if (window.app) {
        window.app.logout();
    }
}

function previousQuestion() {
    if (window.app) {
        window.app.previousQuestion();
    }
}

function nextQuestion() {
    if (window.app) {
        window.app.nextQuestion();
    }
}

function submitQuiz() {
    if (window.app) {
        window.app.submitQuiz();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    window.app = new LearnCraftApp();
});
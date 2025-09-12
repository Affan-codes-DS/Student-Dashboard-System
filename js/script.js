// Student Dashboard Application - Main JavaScript File

// Global Variables
let currentUser = null;
let currentRole = null;
let students = [];
let notices = [];
let currentStudent = null;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Application Initialization
function initializeApp() {
    loadData();
    setupEventListeners();
    initializeTheme();
    
    // Check if user is already logged in and redirect only from entry pages
    const savedUser = localStorage.getItem('currentUser');
    const savedRole = localStorage.getItem('currentRole');
    const currentPage = (location.pathname.split('/').pop() || '').toLowerCase();
    const isEntryPage = currentPage === '' || currentPage === 'index.html' || currentPage === 'login-admin.html' || currentPage === 'login-student.html';

    if (savedUser && savedRole) {
        currentUser = JSON.parse(savedUser);
        currentRole = savedRole;

        // Attach student context when on student pages
        if (currentRole === 'student') {
            const savedStudent = localStorage.getItem('currentStudent');
            if (savedStudent) {
                currentStudent = JSON.parse(savedStudent);
            } else if (currentUser && currentUser.id) {
                currentStudent = students.find(s => s.id === currentUser.id) || null;
            }
        }

        if (isEntryPage) {
            if (currentRole === 'admin' && currentPage !== 'admin.html') {
                window.location.href = 'admin.html';
            } else if (currentRole === 'student' && currentPage !== 'student.html') {
                window.location.href = 'student.html';
            }
        }
    }

    // Hydrate the currently active section on dashboards
    hydrateActiveSection();
}

// Load data for the section that is already marked as active in the DOM
function hydrateActiveSection() {
    const activeSection = document.querySelector('.content-section.active');
    if (!activeSection) return;
    const sectionId = activeSection.getAttribute('id');
    if (!sectionId) return;
    loadSectionData(sectionId);
}

// Load data from localStorage
function loadData() {
    const savedStudents = localStorage.getItem('students');
    const savedNotices = localStorage.getItem('notices');
    
    if (savedStudents) {
        students = JSON.parse(savedStudents);
    } else {
        // Initialize with sample data
        initializeSampleData();
    }
    
    if (savedNotices) {
        notices = JSON.parse(savedNotices);
    }
}

// Initialize sample data
function initializeSampleData() {
    students = [
        {
            id: 'STU001',
            name: 'Lav Kumar',
            class: 'Sem 6',
            email: 'lav.kumar@email.com',
            phone: '+1234567890',
            address: '123 Main St, City',
            attendance: 92,
            cgpa: 8.5,
            semesters: {
                1: { sgpa: 8.2, marks: {
                'Mathematics': { obtained: 85, total: 100, grade: 'A' },
                'English': { obtained: 78, total: 100, grade: 'B+' },
                'Science': { obtained: 88, total: 100, grade: 'A' },
                'History': { obtained: 82, total: 100, grade: 'A-' },
                'Geography': { obtained: 90, total: 100, grade: 'A+' }
                } },
                2: { sgpa: 8.7, marks: {
                    'Mathematics': { obtained: 86, total: 100, grade: 'A' },
                    'English': { obtained: 80, total: 100, grade: 'A-' },
                    'Science': { obtained: 90, total: 100, grade: 'A' },
                    'History': { obtained: 84, total: 100, grade: 'A' },
                    'Geography': { obtained: 92, total: 100, grade: 'A+' }
                } }
            },
            attendanceRecords: generateAttendanceRecords(92)
        },
        {
            id: 'STU002',
            name: 'Priyam',
            class: 'Sem 4',
            email: 'priyam@email.com',
            phone: '+1234567891',
            address: '456 Oak Ave, City',
            attendance: 88,
            cgpa: 7.8,
            semesters: {
                1: { sgpa: 7.5, marks: {
                'Mathematics': { obtained: 75, total: 100, grade: 'B+' },
                'English': { obtained: 82, total: 100, grade: 'A-' },
                'Science': { obtained: 79, total: 100, grade: 'B+' },
                'History': { obtained: 76, total: 100, grade: 'B+' },
                'Geography': { obtained: 80, total: 100, grade: 'A-' }
                } },
                2: { sgpa: 8.1, marks: {
                    'Mathematics': { obtained: 78, total: 100, grade: 'A-' },
                    'English': { obtained: 84, total: 100, grade: 'A-' },
                    'Science': { obtained: 82, total: 100, grade: 'A-' },
                    'History': { obtained: 79, total: 100, grade: 'B+' },
                    'Geography': { obtained: 83, total: 100, grade: 'A-' }
                } }
            },
            attendanceRecords: generateAttendanceRecords(88)
        },
        {
            id: 'STU003',
            name: 'Piyush',
            class: 'Sem 8',
            email: 'Piyush@email.com',
            phone: '+1234567892',
            address: '789 Pine St, City',
            attendance: 95,
            cgpa: 9.2,
            semesters: {
                1: { sgpa: 9.0, marks: {
                'Mathematics': { obtained: 95, total: 100, grade: 'A+' },
                'English': { obtained: 88, total: 100, grade: 'A' },
                'Science': { obtained: 94, total: 100, grade: 'A+' },
                'History': { obtained: 91, total: 100, grade: 'A' },
                'Geography': { obtained: 92, total: 100, grade: 'A+' }
                } },
                2: { sgpa: 9.4, marks: {
                    'Mathematics': { obtained: 96, total: 100, grade: 'A+' },
                    'English': { obtained: 90, total: 100, grade: 'A' },
                    'Science': { obtained: 95, total: 100, grade: 'A+' },
                    'History': { obtained: 93, total: 100, grade: 'A' },
                    'Geography': { obtained: 94, total: 100, grade: 'A+' }
                } }
            },
            attendanceRecords: generateAttendanceRecords(95)
        }
    ];
    
    notices = [
        {
            id: 'NOT001',
            title: 'Mid-term Examination Schedule',
            message: 'The mid-term examinations will be conducted from March 15-20, 2024. Please prepare accordingly.',
            target: 'all',
            targetClass: '',
            targetStudent: '',
            date: new Date().toISOString(),
            author: 'Admin'
        },
        {
            id: 'NOT002',
            title: 'Parent-Teacher Meeting',
            message: 'Parent-teacher meetings are scheduled for March 25, 2024. Please contact the school office to book your slot.',
            target: 'all',
            targetClass: '',
            targetStudent: '',
            date: new Date(Date.now() - 86400000).toISOString(),
            author: 'Admin'
        }
    ];
    
    saveData();
}

// Generate sample attendance records
function generateAttendanceRecords(attendancePercentage) {
    const records = [];
    const totalDays = 30;
    const presentDays = Math.round((attendancePercentage / 100) * totalDays);
    
    for (let i = 0; i < totalDays; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (totalDays - i));
        
        records.push({
            date: date.toISOString().split('T')[0],
            status: i < presentDays ? 'Present' : 'Absent',
            subject: ['Mathematics', 'English', 'Science', 'History', 'Geography'][i % 5],
            remarks: i < presentDays ? 'Good' : 'Absent'
        });
    }
    
    return records;
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('students', JSON.stringify(students));
    localStorage.setItem('notices', JSON.stringify(notices));
}

// Setup event listeners
function setupEventListeners() {
    // Role selection
    if (document.querySelector('.role-card')) {
        document.querySelectorAll('.role-card').forEach(card => {
            card.addEventListener('click', function() {
                const role = this.classList.contains('admin-card') ? 'admin' : 'student';
                selectRole(role);
            });
        });
    }
    
    // Login forms
    const adminLoginForm = document.getElementById('adminLoginForm');
    const studentLoginForm = document.getElementById('studentLoginForm');
    
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', handleAdminLogin);
    }
    
    if (studentLoginForm) {
        studentLoginForm.addEventListener('submit', handleStudentLogin);
    }
    
    // Student form
    const studentForm = document.getElementById('studentForm');
    if (studentForm) {
        studentForm.addEventListener('submit', handleStudentForm);
    }
    
    // Notice form
    const noticeForm = document.getElementById('noticeForm');
    if (noticeForm) {
        noticeForm.addEventListener('submit', handleNoticeForm);
        
        // Handle target selection
        const targetSelect = document.getElementById('noticeTarget');
        if (targetSelect) {
            targetSelect.addEventListener('change', handleNoticeTargetChange);
        }
    }
    
    // Search functionality
    const studentSearch = document.getElementById('studentSearch');
    if (studentSearch) {
        studentSearch.addEventListener('input', filterStudents);
    }
    
    // Class filter
    const classFilter = document.getElementById('classFilter');
    if (classFilter) {
        classFilter.addEventListener('change', filterStudents);
    }
    
    // Navigation
    setupNavigation();

    // Live sync across tabs/windows when admin updates data
    window.addEventListener('storage', function(e) {
        if (e.key === 'students' || e.key === 'notices') {
            // Reload in-memory data
            const latestStudents = localStorage.getItem('students');
            const latestNotices = localStorage.getItem('notices');
            if (latestStudents) students = JSON.parse(latestStudents);
            if (latestNotices) notices = JSON.parse(latestNotices);

            // Refresh current view
            hydrateActiveSection();
        }
    });
}

// Role selection
function selectRole(role) {
    if (role === 'admin') {
        window.location.href = 'login-admin.html';
    } else {
        window.location.href = 'login-student.html';
    }
}

// Admin login
function handleAdminLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    // Simple authentication (in real app, this would be server-side)
    if (username === 'admin' && password === 'admin123') {
        currentUser = { username, role: 'admin' };
        currentRole = 'admin';
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('currentRole', currentRole);
        
        window.location.href = 'admin.html';
    } else {
        showNotification('Invalid credentials', 'error');
    }
}

// Student login
function handleStudentLogin(e) {
    e.preventDefault();
    
    const studentId = document.getElementById('studentId').value;
    const student = students.find(s => s.id === studentId);
    
    if (student) {
        currentUser = student;
        currentRole = 'student';
        currentStudent = student;
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('currentRole', currentRole);
        localStorage.setItem('currentStudent', JSON.stringify(currentStudent));
        
        window.location.href = 'student.html';
    } else {
        showNotification('Student ID not found', 'error');
    }
}

// Logout
function logout() {
    currentUser = null;
    currentRole = null;
    currentStudent = null;
    
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentRole');
    localStorage.removeItem('currentStudent');
    
    window.location.href = 'index.html';
}

// Expose key handlers globally for inline onclick bindings
window.logout = logout;
window.togglePassword = togglePassword;
window.selectRole = selectRole;
window.showSection = showSection;
window.openStudentModal = openStudentModal;
window.closeStudentModal = closeStudentModal;
window.editStudent = editStudent;
window.deleteStudent = deleteStudent;
window.openNoticeModal = openNoticeModal;
window.closeNoticeModal = closeNoticeModal;
window.editNotice = editNotice;
window.deleteNotice = deleteNotice;
window.exportData = exportData;
window.downloadReport = downloadReport;

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Theme management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeBtn = document.querySelector('.theme-btn i');
    if (themeBtn) {
        themeBtn.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const themeBtn = document.querySelector('.theme-btn i');
    if (themeBtn) {
        themeBtn.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Sidebar toggle
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// Navigation setup
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            showSection(section);
            
            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Ensure logout button works even without inline handler
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
}

// Show section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Update page title
        const pageTitle = document.getElementById('pageTitle');
        if (pageTitle) {
            pageTitle.textContent = getSectionTitle(sectionName);
        }
        
        // Load section-specific data
        loadSectionData(sectionName);
    }
}

// Get section title
function getSectionTitle(sectionName) {
    const titles = {
        'dashboard': 'Dashboard Overview',
        'students': 'Student Management',
        'notices': 'Notice Management',
        'analytics': 'Analytics Dashboard',
        'overview': 'Student Overview',
        'academic': 'Academic Performance',
        'attendance': 'Attendance Records',
        'profile': 'Student Profile'
    };
    
    return titles[sectionName] || 'Dashboard';
}

// Load section data
function loadSectionData(sectionName) {
    switch (sectionName) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'students':
            loadStudentsData();
            break;
        case 'notices':
            if (currentRole === 'student') {
                loadStudentNotices();
            } else {
                loadNoticesData();
            }
            break;
        case 'analytics':
            loadAnalyticsData();
            break;
        case 'overview':
            loadStudentOverview();
            break;
        case 'academic':
            loadAcademicData();
            break;
        case 'attendance':
            loadAttendanceData();
            break;
        case 'profile':
            loadProfileData();
            break;
    }
}

// Dashboard data loading
function loadDashboardData() {
    if (currentRole === 'admin') {
        loadAdminDashboard();
    } else {
        loadStudentDashboard();
    }
}

// Admin dashboard
function loadAdminDashboard() {
    // Update stats
    document.getElementById('totalStudents').textContent = students.length;
    document.getElementById('totalClasses').textContent = new Set(students.map(s => s.class)).size;
    document.getElementById('totalNotices').textContent = notices.length;
    
    const avgAttendance = students.length ? (students.reduce((sum, s) => sum + (s.attendance || 0), 0) / students.length) : 0;
    document.getElementById('avgAttendance').textContent = Math.round(avgAttendance) + '%';
    
    // Load recent students
    loadRecentStudents();
    
    // Populate class filter
    populateClassFilter();
}

// Student dashboard
function loadStudentDashboard() {
    if (!currentStudent) return;
    
    // Update welcome message
    document.getElementById('welcomeName').textContent = currentStudent.name;
    document.getElementById('studentName').textContent = currentStudent.name;
    
    // Update stats
    document.getElementById('overviewCgpa').textContent = (currentStudent.cgpa ?? 0).toFixed(2);
    document.getElementById('overviewAttendance').textContent = currentStudent.attendance + '%';
    
    // Count new notices
    const newNotices = notices.filter(n => 
        n.target === 'all' || 
        n.target === 'class' && n.targetClass === currentStudent.class ||
        n.target === 'individual' && n.targetStudent === currentStudent.id
    );
    document.getElementById('overviewNotices').textContent = newNotices.length;
    
    // Calculate class rank
    const classStudents = students.filter(s => s.class === currentStudent.class);
    const sortedStudents = classStudents.sort((a, b) => (b.cgpa ?? 0) - (a.cgpa ?? 0));
    const rank = sortedStudents.findIndex(s => s.id === currentStudent.id) + 1;
    document.getElementById('overviewRank').textContent = rank;
    
    // Load recent notices
    loadRecentNotices();
}

// Load recent students
function loadRecentStudents() {
    const container = document.getElementById('recentStudents');
    if (!container) return;
    
    const recentStudents = students.slice(-5).reverse();
    
    container.innerHTML = recentStudents.map(student => `
        <div class="recent-item">
            <div class="recent-avatar">
                ${student.name.charAt(0)}
            </div>
            <div class="recent-info">
                <h4>${student.name}</h4>
                <p>${student.class} • CGPA ${(student.cgpa ?? 0).toFixed(2)}</p>
            </div>
        </div>
    `).join('');
}

// Load recent notices
function loadRecentNotices() {
    const container = document.getElementById('recentNotices');
    if (!container) return;
    
    const studentNotices = notices.filter(n => 
        n.target === 'all' || 
        n.target === 'class' && n.targetClass === currentStudent.class ||
        n.target === 'individual' && n.targetStudent === currentStudent.id
    ).slice(-3).reverse();
    
    container.innerHTML = studentNotices.map(notice => `
        <div class="notice-preview">
            <h4>${notice.title}</h4>
            <p>${notice.message.substring(0, 100)}...</p>
            <div class="notice-date">${formatDate(notice.date)}</div>
        </div>
    `).join('');
}

// Load students data
function loadStudentsData() {
    populateStudentsTable();
    populateClassFilter();
}

// Student-facing notices list
function loadStudentNotices() {
    const container = document.getElementById('studentNoticesList');
    if (!container || !currentStudent) return;
    const studentNotices = notices
        .filter(n => n.target === 'all' || (n.target === 'class' && n.targetClass === currentStudent.class) || (n.target === 'individual' && n.targetStudent === currentStudent.id))
        .sort((a,b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = studentNotices.map(notice => `
        <div class="notice-item">
            <h4>${notice.title}</h4>
            <p>${notice.message}</p>
            <div class="notice-meta">
                <span><i class="fas fa-calendar"></i> ${formatDate(notice.date)}</span>
                <span><i class="fas fa-user"></i> ${notice.author}</span>
                <span><i class="fas fa-users"></i> ${getTargetText(notice)}</span>
            </div>
        </div>
    `).join('');
}

// Populate students table
function populateStudentsTable() {
    const tbody = document.getElementById('studentsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = students.map(student => `
        <tr>
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.class}</td>
            <td>${student.attendance}%</td>
            <td>${(student.cgpa ?? 0).toFixed(2)}</td>
            <td>
                <button class="btn btn-secondary" onclick="editStudent('${student.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-secondary" onclick="deleteStudent('${student.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Populate class filter
function populateClassFilter() {
    const classFilter = document.getElementById('classFilter');
    const targetClass = document.getElementById('targetClass');
    
    if (classFilter || targetClass) {
        const classes = [...new Set(students.map(s => s.class))].sort();
        const options = classes.map(cls => `<option value="${cls}">${cls}</option>`).join('');
        
        if (classFilter) {
            classFilter.innerHTML = '<option value="">All Classes</option>' + options;
        }
        if (targetClass) {
            targetClass.innerHTML = '<option value="">Select Class</option>' + options;
        }
    }
}

// Filter students
function filterStudents() {
    const searchTerm = document.getElementById('studentSearch')?.value.toLowerCase() || '';
    const classFilter = document.getElementById('classFilter')?.value || '';
    
    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm) ||
                            student.id.toLowerCase().includes(searchTerm);
        const matchesClass = !classFilter || student.class === classFilter;
        
        return matchesSearch && matchesClass;
    });
    
    const tbody = document.getElementById('studentsTableBody');
    if (tbody) {
        tbody.innerHTML = filteredStudents.map(student => `
            <tr>
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.class}</td>
                <td>${student.attendance}%</td>
                <td>${(student.cgpa ?? 0).toFixed(2)}</td>
                <td>
                    <button class="btn btn-secondary" onclick="editStudent('${student.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-secondary" onclick="deleteStudent('${student.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

// Sort table
function sortTable(column) {
    // Implementation for table sorting
    console.log('Sorting by:', column);
}

// Student modal functions
function openStudentModal(studentId = null) {
    const modal = document.getElementById('studentModal');
    const form = document.getElementById('studentForm');
    const title = document.getElementById('studentModalTitle');
    
    if (studentId) {
        // Edit mode
        const student = students.find(s => s.id === studentId);
        if (student) {
            title.textContent = 'Edit Student';
            populateStudentForm(student);
        }
    } else {
        // Add mode
        title.textContent = 'Add Student';
        form.reset();
    }
    
    modal.classList.add('active');
}

function closeStudentModal() {
    const modal = document.getElementById('studentModal');
    modal.classList.remove('active');
}

function populateStudentForm(student) {
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentIdInput').value = student.id;
    document.getElementById('studentClass').value = student.class;
    document.getElementById('studentEmail').value = student.email || '';
    document.getElementById('studentPhone').value = student.phone || '';
    document.getElementById('studentAddress').value = student.address || '';
    document.getElementById('studentAttendance').value = student.attendance;
    const cgpaInput = document.getElementById('studentCgpa');
    if (cgpaInput) cgpaInput.value = (student.cgpa ?? 0).toFixed(2);
}

function handleStudentForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const studentData = Object.fromEntries(formData);
    
    const existingStudent = students.find(s => s.id === studentData.studentId);
    
    if (existingStudent && document.getElementById('studentModalTitle').textContent === 'Add Student') {
        showNotification('Student ID already exists', 'error');
        return;
    }
    
    const student = {
        id: studentData.studentId,
        name: studentData.name,
        class: studentData.class,
        email: studentData.email,
        phone: studentData.phone,
        address: studentData.address,
        attendance: parseInt(studentData.attendance),
        cgpa: parseFloat(studentData.cgpa ?? existingStudent?.cgpa ?? 0),
        semesters: existingStudent?.semesters || generateSampleSemesters(),
        attendanceRecords: existingStudent?.attendanceRecords || generateAttendanceRecords(parseInt(studentData.attendance))
    };
    
    if (existingStudent && document.getElementById('studentModalTitle').textContent === 'Edit Student') {
        // Update existing student
        const index = students.findIndex(s => s.id === studentData.studentId);
        students[index] = student;
    } else {
        // Add new student
        students.push(student);
    }
    
    saveData();
    populateStudentsTable();
    closeStudentModal();
    showNotification('Student saved successfully', 'success');
}

function generateSampleSemesters() {
    const createMarks = () => ({
        'Mathematics': { obtained: Math.floor(Math.random() * 30) + 70, total: 100, grade: 'A' },
        'English': { obtained: Math.floor(Math.random() * 30) + 70, total: 100, grade: 'B+' },
        'Science': { obtained: Math.floor(Math.random() * 30) + 70, total: 100, grade: 'A' },
        'History': { obtained: Math.floor(Math.random() * 30) + 70, total: 100, grade: 'A-' },
        'Geography': { obtained: Math.floor(Math.random() * 30) + 70, total: 100, grade: 'A+' }
    });
    const semesters = {};
    for (let s = 1; s <= 2; s++) { // seed 2 semesters by default
        semesters[s] = { sgpa: (Math.random() * 2 + 7).toFixed(2) * 1, marks: createMarks() };
    }
    return semesters;
}

function editStudent(studentId) {
    openStudentModal(studentId);
}

function deleteStudent(studentId) {
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(s => s.id !== studentId);
        saveData();
        populateStudentsTable();
        showNotification('Student deleted successfully', 'success');
    }
}

// Notice functions
function openNoticeModal() {
    const modal = document.getElementById('noticeModal');
    modal.classList.add('active');
}

function closeNoticeModal() {
    const modal = document.getElementById('noticeModal');
    modal.classList.remove('active');
}

function handleNoticeTargetChange() {
    const target = document.getElementById('noticeTarget').value;
    const classGroup = document.getElementById('targetClassGroup');
    const studentGroup = document.getElementById('targetStudentGroup');
    
    if (classGroup) classGroup.style.display = target === 'class' ? 'block' : 'none';
    if (studentGroup) studentGroup.style.display = target === 'individual' ? 'block' : 'none';
    
    if (target === 'individual') {
        populateStudentSelect();
    }
}

function populateStudentSelect() {
    const select = document.getElementById('targetStudent');
    if (select) {
        const options = students.map(s => `<option value="${s.id}">${s.name} (${s.id})</option>`).join('');
        select.innerHTML = '<option value="">Select Student</option>' + options;
    }
}

function handleNoticeForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const noticeData = Object.fromEntries(formData);
    
    const notice = {
        id: 'NOT' + Date.now(),
        title: noticeData.title,
        message: noticeData.message,
        target: noticeData.target,
        targetClass: noticeData.targetClass || '',
        targetStudent: noticeData.targetStudent || '',
        date: new Date().toISOString(),
        author: 'Admin'
    };
    
    notices.push(notice);
    saveData();
    loadNoticesData();
    closeNoticeModal();
    showNotification('Notice sent successfully', 'success');
}

function loadNoticesData() {
    const container = document.getElementById('noticesList');
    if (!container) return;
    
    container.innerHTML = notices.map(notice => `
        <div class="notice-item">
            <h4>${notice.title}</h4>
            <p>${notice.message}</p>
            <div class="notice-meta">
                <span><i class="fas fa-calendar"></i> ${formatDate(notice.date)}</span>
                <span><i class="fas fa-user"></i> ${notice.author}</span>
                <span><i class="fas fa-users"></i> ${getTargetText(notice)}</span>
            </div>
            <div class="notice-actions">
                <button class="notice-btn edit" onclick="editNotice('${notice.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="notice-btn delete" onclick="deleteNotice('${notice.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function getTargetText(notice) {
    switch (notice.target) {
        case 'all': return 'All Students';
        case 'class': return notice.targetClass;
        case 'individual': 
            const student = students.find(s => s.id === notice.targetStudent);
            return student ? student.name : 'Unknown Student';
        default: return 'Unknown';
    }
}

function editNotice(noticeId) {
    // Implementation for editing notices
    console.log('Edit notice:', noticeId);
}

function deleteNotice(noticeId) {
    if (confirm('Are you sure you want to delete this notice?')) {
        notices = notices.filter(n => n.id !== noticeId);
        saveData();
        loadNoticesData();
        showNotification('Notice deleted successfully', 'success');
    }
}

// Analytics functions
function loadAnalyticsData() {
    // Load charts
    loadClassChart();
    loadAttendanceChart();
}

function loadClassChart() {
    const ctx = document.getElementById('classChart');
    if (!ctx) return;
    
    const classData = {};
    students.forEach(student => {
        const key = student.class || 'Unknown'; // now treated as semester label
        classData[key] = (classData[key] || 0) + 1;
    });
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(classData),
            datasets: [{
                data: Object.values(classData),
                backgroundColor: [
                    '#4f46e5',
                    '#06b6d4',
                    '#f59e0b',
                    '#10b981',
                    '#ef4444'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function loadAttendanceChart() {
    const ctx = document.getElementById('attendanceChart');
    if (!ctx) return;
    
    const attendanceRanges = {
        '90-100%': 0,
        '80-89%': 0,
        '70-79%': 0,
        '60-69%': 0,
        'Below 60%': 0
    };
    
    students.forEach(student => {
        if (student.attendance >= 90) attendanceRanges['90-100%']++;
        else if (student.attendance >= 80) attendanceRanges['80-89%']++;
        else if (student.attendance >= 70) attendanceRanges['70-79%']++;
        else if (student.attendance >= 60) attendanceRanges['60-69%']++;
        else attendanceRanges['Below 60%']++;
    });
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(attendanceRanges),
            datasets: [{
                label: 'Number of Students',
                data: Object.values(attendanceRanges),
                backgroundColor: '#4f46e5'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Student-specific functions
function loadStudentOverview() {
    loadStudentDashboard();
}

function loadAcademicData() {
    if (!currentStudent) return;

    // Selected semester
    const semesterSelect = document.getElementById('semesterSelect');
    const semester = semesterSelect ? parseInt(semesterSelect.value) : 1;
    const sem = (currentStudent.semesters && currentStudent.semesters[semester]) || null;

    // Rebind on change
    if (semesterSelect && !semesterSelect.dataset.bound) {
        semesterSelect.addEventListener('change', () => loadAcademicData());
        semesterSelect.dataset.bound = '1';
    }

    loadSubjectChart(sem);
    loadSemesterTrendChart();
    loadMarksTable(sem);
}

function loadSubjectChart(sem) {
    const ctx = document.getElementById('subjectChart');
    if (!ctx) return;
    if (!sem) { ctx.getContext('2d').clearRect(0,0,ctx.width,ctx.height); return; }

    const subjects = Object.keys(sem.marks);
    const marks = subjects.map(subject => sem.marks[subject].obtained);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: subjects,
            datasets: [{
                label: 'Marks Obtained',
                data: marks,
                backgroundColor: '#4f46e5'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function loadSemesterTrendChart() {
    const ctx = document.getElementById('semesterTrendChart');
    if (!ctx) return;
    const sgs = [];
    const labels = [];
    for (let s = 1; s <= 8; s++) {
        labels.push('Sem ' + s);
        const sem = currentStudent.semesters ? currentStudent.semesters[s] : null;
        sgs.push(sem ? sem.sgpa : null);
    }
    new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'SGPA',
                data: sgs,
                borderColor: '#06b6d4',
                backgroundColor: 'rgba(6, 182, 212, 0.1)',
                spanGaps: true,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, max: 10 }
            }
        }
    });
}

function loadMarksTable(sem) {
    const tbody = document.getElementById('marksTableBody');
    if (!tbody) return;
    if (!sem) { tbody.innerHTML = ''; return; }
    
    tbody.innerHTML = Object.entries(sem.marks).map(([subject, marks]) => `
        <tr>
            <td>${subject}</td>
            <td>${marks.obtained}</td>
            <td>${marks.total}</td>
            <td>${Math.round((marks.obtained / marks.total) * 100)}%</td>
            <td>${marks.grade}</td>
        </tr>
    `).join('');
}

function loadAttendanceData() {
    if (!currentStudent) return;
    
    // Update attendance circle
    const circle = document.getElementById('attendanceCircle');
    if (circle) {
        const percentage = currentStudent.attendance;
        circle.style.setProperty('--attendance-angle', `${(percentage / 100) * 360}deg`);
        document.getElementById('attendancePercentage').textContent = percentage + '%';
    }
    
    // Update attendance stats
    const totalDays = currentStudent.attendanceRecords.length;
    const presentDays = currentStudent.attendanceRecords.filter(r => r.status === 'Present').length;
    const absentDays = totalDays - presentDays;
    
    document.getElementById('presentDays').textContent = presentDays;
    document.getElementById('absentDays').textContent = absentDays;
    
    // Load attendance chart
    loadStudentAttendanceChart();
    
    // Load attendance table
    loadAttendanceTable();
}

function loadStudentAttendanceChart() {
    const ctx = document.getElementById('attendanceChart');
    if (!ctx) return;
    
    const monthlyData = {};
    currentStudent.attendanceRecords.forEach(record => {
        const month = new Date(record.date).toLocaleDateString('en-US', { month: 'short' });
        if (!monthlyData[month]) {
            monthlyData[month] = { present: 0, total: 0 };
        }
        monthlyData[month].total++;
        if (record.status === 'Present') {
            monthlyData[month].present++;
        }
    });
    
    const months = Object.keys(monthlyData);
    const percentages = months.map(month => 
        Math.round((monthlyData[month].present / monthlyData[month].total) * 100)
    );
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Attendance %',
                data: percentages,
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function loadAttendanceTable() {
    const tbody = document.getElementById('attendanceTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = currentStudent.attendanceRecords.map(record => `
        <tr>
            <td>${formatDate(record.date)}</td>
            <td>
                <span class="status ${record.status.toLowerCase()}">
                    ${record.status}
                </span>
            </td>
            <td>${record.subject}</td>
            <td>${record.remarks}</td>
        </tr>
    `).join('');
}

function loadProfileData() {
    if (!currentStudent) return;
    
    // Update profile information
    document.getElementById('profileName').textContent = currentStudent.name;
    document.getElementById('profileId').textContent = `Student ID: ${currentStudent.id}`;
    document.getElementById('profileClass').textContent = `Class: ${currentStudent.class}`;
    document.getElementById('profileEmail').textContent = `Email: ${currentStudent.email || 'Not provided'}`;
    document.getElementById('profilePhone').textContent = `Phone: ${currentStudent.phone || 'Not provided'}`;
    
    // Update academic information
    document.getElementById('infoClass').textContent = currentStudent.class;
    document.getElementById('infoCgpa').textContent = (currentStudent.cgpa ?? 0).toFixed(2);
    document.getElementById('infoAttendance').textContent = currentStudent.attendance + '%';
    
    // Calculate class rank
    const classStudents = students.filter(s => s.class === currentStudent.class);
    const sortedStudents = classStudents.sort((a, b) => b.average - a.average);
    const rank = sortedStudents.findIndex(s => s.id === currentStudent.id) + 1;
    document.getElementById('infoRank').textContent = rank;
}

function editProfile() {
    showNotification('Profile editing feature coming soon', 'info');
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#4f46e5'
    };
    return colors[type] || '#4f46e5';
}

// Export functions
function exportData() {
    const data = {
        students: students,
        notices: notices,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student-data.json';
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Data exported successfully', 'success');
}

function downloadReport() {
    if (!currentStudent) return;
    
    // Create a simple text report
    const report = `
STUDENT ACADEMIC REPORT
======================

Student Name: ${currentStudent.name}
Student ID: ${currentStudent.id}
Class: ${currentStudent.class}
Overall Average: ${currentStudent.average}%
Attendance: ${currentStudent.attendance}%

SUBJECT-WISE MARKS:
${Object.entries(currentStudent.marks).map(([subject, marks]) => 
    `${subject}: ${marks.obtained}/${marks.total} (${marks.grade})`
).join('\n')}

Generated on: ${new Date().toLocaleDateString()}
    `;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentStudent.name}-report.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Report downloaded successfully', 'success');
}

// Restore default sample data into localStorage
function restoreSampleData() {
    initializeSampleData();
    showNotification('Sample data restored', 'success');
    // Refresh current views if on admin pages
    if (currentRole === 'admin') {
        loadDashboardData();
        if (document.getElementById('students')) {
            loadStudentsData();
        }
        if (document.getElementById('notices')) {
            loadNoticesData();
        }
        hydrateActiveSection();
    }
}

// expose restore function
window.restoreSampleData = restoreSampleData;

// Add CSS for notifications
const notificationStyles = `
@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

.status {
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
}

.status.present {
    background: #dcfce7;
    color: #166534;
}

.status.absent {
    background: #fef2f2;
    color: #991b1b;
}
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

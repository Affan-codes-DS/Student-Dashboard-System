# Student Dashboard Web Application

A professional-grade Student Dashboard Web Application built with HTML, CSS, and JavaScript, featuring two distinct user roles: Admin and Student. The application provides a clean, modern UI with responsive design and interactive user experience, all without requiring a backend (data stored in localStorage).

## 🌟 Features

### 👩‍💼 Admin Panel
- **Professional Login Page** with secure authentication
- **Dashboard Overview** with key statistics and quick actions
- **Student Management** with add/edit/delete functionality
- **Table View** of student records with sorting and filtering
- **Notice Management** to send notices to specific students, classes, or all students
- **Analytics Dashboard** with interactive charts
- **Data Export** functionality (JSON format)
- **Form Validation** with real-time feedback

### 🎓 Student Dashboard
- **Student Login** using Student ID/Roll Number
- **Personalized Dashboard** with academic overview
- **Profile Summary** with student information
- **Academic Performance** with subject-wise marks and charts
- **Attendance Tracking** with visual progress indicators
- **Notice Board** for important announcements
- **Report Download** functionality (TXT format)

### 🖌 UI/UX Features
- **Modern Design** with clean, professional layout
- **Responsive Design** for mobile, tablet, and desktop
- **Dark/Light Mode Toggle** for user preference
- **Smooth Animations** and transitions
- **Interactive Charts** using Chart.js
- **Card-based Layout** with consistent styling
- **Font Awesome Icons** for enhanced visual appeal

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in the browser

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. The application will load with sample data

### File Structure
```
student-dashboard/
│
├── index.html            # Landing Page (Role Selection)
├── admin.html            # Admin Dashboard
├── student.html          # Student Dashboard
├── login-admin.html      # Admin Login Page
├── login-student.html    # Student Login Page
│
├── css/
│   └── style.css         # Main Stylesheet
│
├── js/
│   └── script.js         # JavaScript Logic
│
├── assets/
│   └── images/           # Images and icons
│
├── data/
│   └── dummyData.json    # Sample data structure
│
└── README.md             # Project documentation
```

## 🔐 Authentication

### Admin Login
- **Username:** `admin`
- **Password:** `admin123`

### Student Login
Use any of the sample student IDs:
- `STU001` - John Doe (Grade 10)
- `STU002` - Jane Smith (Grade 9)
- `STU003` - Mike Johnson (Grade 10)
- `STU004` - Sarah Wilson (Grade 8)
- `STU005` - David Brown (Grade 9)

## 📱 Usage

### For Administrators
1. Select "Administrator" role on the landing page
2. Login with admin credentials
3. Access the admin dashboard with:
   - Student management (add, edit, delete)
   - Notice creation and management
   - Analytics and reporting
   - Data export functionality

### For Students
1. Select "Student" role on the landing page
2. Enter your Student ID to login
3. Access your personalized dashboard with:
   - Academic performance overview
   - Subject-wise marks and grades
   - Attendance records
   - Important notices
   - Profile information

## 🛠 Technical Details

### Technologies Used
- **HTML5** - Semantic structure and accessibility
- **CSS3** - Modern styling with Flexbox/Grid layout
- **JavaScript (ES6+)** - Application logic and interactions
- **Chart.js** - Interactive charts and graphs
- **Font Awesome** - Icon library
- **Google Fonts** - Typography (Poppins)

### Key Features
- **localStorage** for data persistence
- **Responsive Design** with mobile-first approach
- **Progressive Web App** ready
- **No Backend Required** - client-side only
- **Modular JavaScript** architecture
- **Form Validation** and error handling
- **Real-time Updates** and notifications

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🎨 Customization

### Color Scheme
The application uses CSS custom properties for easy theming:
```css
:root {
    --primary-color: #4f46e5;
    --secondary-color: #06b6d4;
    --accent-color: #f59e0b;
    --success-color: #10b981;
    --error-color: #ef4444;
}
```

### Adding New Features
1. **New Student Fields:** Modify the student object structure in `script.js`
2. **Additional Charts:** Add new Chart.js implementations
3. **Custom Notifications:** Extend the notification system
4. **Export Formats:** Add new export functionality

## 📊 Sample Data

The application comes with pre-loaded sample data including:
- 5 sample students with complete academic records
- 4 sample notices with different target audiences
- Attendance records for the past 30 days
- Subject-wise marks and grades

## 🔧 Development

### Adding New Students
1. Login as admin
2. Navigate to Students section
3. Click "Add Student" button
4. Fill in the required information
5. Save to add to the system

### Sending Notices
1. Login as admin
2. Navigate to Notices section
3. Click "Send Notice" button
4. Choose target audience (All, Class, or Individual)
5. Compose and send the notice

### Data Persistence
All data is automatically saved to localStorage and persists between browser sessions. To reset data, clear browser localStorage or refresh the page (sample data will reload).

## 🚀 Future Enhancements

Potential features for future development:
- **Backend Integration** with REST API
- **User Authentication** with JWT tokens
- **Email Notifications** for notices
- **PDF Report Generation** with jsPDF
- **Advanced Analytics** with more chart types
- **Bulk Data Import/Export** (CSV, Excel)
- **Real-time Notifications** with WebSocket
- **Mobile App** with React Native/Flutter

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support or questions, please open an issue in the project repository.

---

**Built with ❤️ for educational institutions and student management.**

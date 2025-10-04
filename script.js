const courses = [
    {
        id: 1,
        title: "Intro to Web Development",
        description: "Learn the building blocks of the web: HTML, CSS, and JavaScript.",
        duration: "3 hours",
        objectives: ["Build a basic webpage", "Style with CSS", "Add interactivity with JavaScript"],
        lessons: ["HTML Basics", "CSS Styling", "JavaScript Intro"],
        completed: false,
    },
    {
        id: 2,
        title: "Python for Beginners",
        description: "Start your Python journey with simple syntax and powerful concepts.",
        duration: "4 hours",
        objectives: ["Understand variables", "Write loops", "Create functions"],
        lessons: ["Variables", "Loops", "Functions"],
        completed: false,
    },
    {
        id: 3,
        title: "Design Thinking",
        description: "Explore creative problem-solving through empathy and iteration.",
        duration: "2.5 hours",
        objectives: ["Practice empathy", "Generate ideas", "Prototype solutions"],
        lessons: ["Empathy", "Ideation", "Prototyping"],
        completed: false,
    },
];

// DOM elements
const courseList = document.getElementById("courses");
const courseDetail = document.getElementById("course-detail");
const courseTitle = document.getElementById("course-title");
const courseDescription = document.getElementById("course-description");
const courseDuration = document.getElementById("course-duration");
const objectivesList = document.getElementById("objectives");
const lessonsList = document.getElementById("lessons");
const completeBtn = document.getElementById("complete-btn");
const completionStatus = document.getElementById("completion-status");
const backBtn = document.getElementById("back-btn");

const authSection = document.getElementById("auth-section");
const authTitle = document.getElementById("auth-title");
const authBtn = document.getElementById("auth-btn");
const authToggle = document.getElementById("auth-toggle");

let isSignup = false;

function toggleAuth() {
    isSignup = !isSignup;
    authTitle.textContent = isSignup ? "📝 Sign Up" : "🔐 Login";
    authBtn.textContent = isSignup ? "Sign Up" : "Login";
    authToggle.innerHTML = isSignup
        ? 'Already have an account? <a href="#" onclick="toggleAuth()">Login</a>'
        : 'Don\'t have an account? <a href="#" onclick="toggleAuth()">Sign up</a>';
}

authBtn.onclick = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (isSignup) {
        if (username && password) {
            localStorage.setItem("user", JSON.stringify({ username, password }));
            alert("Account created! Please login.");
            toggleAuth();
        } else {
            alert("Please fill in both fields.");
        }
    } else {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser && storedUser.username === username && storedUser.password === password) {
            localStorage.setItem("loggedIn", "true");
            authSection.classList.add("hidden");
            document.getElementById("course-gallery").classList.remove("hidden");
            renderCourses();
        } else {
            alert("Invalid credentials");
        }
    }
};

function renderCourses() {
    courseList.innerHTML = "";
    courses.forEach(course => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
      <h3>${course.title}</h3>
      <p>${course.description}</p>
      <p><strong>⏱ ${course.duration}</strong></p>
    `;
        card.onclick = () => showCourseDetail(course.id);
        courseList.appendChild(card);
    });
}

function showCourseDetail(courseId) {
    const course = courses.find(c => c.id === courseId);
    courseTitle.textContent = course.title;
    courseDescription.textContent = course.description;
    courseDuration.textContent = course.duration;

    objectivesList.innerHTML = "";
    course.objectives.forEach(obj => {
        const li = document.createElement("li");
        li.textContent = obj;
        objectivesList.appendChild(li);
    });

    lessonsList.innerHTML = "";
    course.lessons.forEach(lesson => {
        const li = document.createElement("li");
        li.textContent = lesson;
        lessonsList.appendChild(li);
    });

    completionStatus.textContent = course.completed ? "✅ Completed" : "";
    completeBtn.onclick = () => {
        course.completed = true;
        completionStatus.textContent = "✅ Completed";
    };

    document.getElementById("course-gallery").classList.add("hidden");
    courseDetail.classList.remove("hidden");
}

backBtn.onclick = () => {
    courseDetail.classList.add("hidden");
    document.getElementById("course-gallery").classList.remove("hidden");
};

// Auto-login if already authenticated
if (localStorage.getItem("loggedIn") === "true") {
    authSection.classList.add("hidden");
    document.getElementById("course-gallery").classList.remove("hidden");
    renderCourses();
}

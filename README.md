# TailorSwipe - Job Application App

A modern web application that helps people apply to jobs at scale with resume customization and swipe functionality.

<div align="left">
  <img alt="tailorswipe1" src="https://github.com/user-attachments/assets/1085b5c4-9afe-4430-b5ea-42b32690333d" width="40%" />
  <img alt="tailorswipe2" src="https://github.com/user-attachments/assets/5d70d235-917a-4bce-967f-1ebbda7ff664" width="30%" />
</div>

## 🎯 How It Works

### 1. Resume Input
- **Paste your resume** Just paste your resume text and get started

### 2. Job Browsing
- **Swipe right (✓)** to apply with customized resume
- **Swipe left (✕)** to pass on jobs

### 3. Resume Customization
When you swipe right (apply):
- **LLM analyzes** your resume and the job description
- **Creates customized resume** that matchs job requirements without adding fake experiences or skills

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TailorSwipe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## 🛠️ Tech Stack

- **Frontend**: React 17 with TypeScript
- **Styling**: Tailwind CSS (minimal design)
- **Routing**: React Router DOM
- **Build Tool**: Vite 2.9
- **Node.js**: Compatible with Node.js 14+

## 📁 Project Structure

```
src/
├── components/         # React components
│   ├── StartPage.tsx   # Resume input page
│   └── JobSwipe.tsx    # Main swipe interface
├── contexts/           # React contexts
│   ├── JobContext.tsx  # Job state management
│   └── ResumeContext.tsx # Resume state management
├── services/           # External services
│   └── llmService.ts   # LLM integration service
├── types/              # TypeScript definitions
│   └── index.ts        # Main type definitions
├── data/               # Mock data
│   └── mockJobs.ts     # Sample job data
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

*Ready to revolutionize your job search with AI-powered resume customization!*

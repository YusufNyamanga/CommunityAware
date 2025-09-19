# Umoja Aware - AI Legal Assistant for Bahrain

Umoja Aware is a specialized AI-powered legal assistant designed to help the Bahrain community with various legal queries, including labour law, company formation, visa services, and more.

## Features

- **AI-Powered Legal Assistance**: Leverages Qwen API for intelligent responses to legal queries
- **Specialized Knowledge**: Focused on Bahrain legal system including:
  - Labour law and employee rights
  - Company formation and business registration
  - Visa services and immigration
  - LMRA (Labour Market Regulatory Authority) procedures
  - Sijilat registration processes
  - Grace period extensions
- **Modern UI**: Dark/light mode with crystal clear design inspired by Rust applications
- **Interactive Chat Interface**: Real-time conversation with AI assistant
- **Category Detection**: Automatically categorizes queries for better responses
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technologies Used

- **Frontend**: React 18 with TypeScript
- **Styling**: Styled Components with custom theme system
- **Icons**: Lucide React
- **API**: Axios for HTTP requests
- **AI Model**: Qwen API for natural language processing

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd umoja-aware
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file and add your Qwen API key:
   ```
   REACT_APP_QWEN_API_KEY=your_qwen_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (not recommended)

## Configuration

### Qwen API Setup

1. Visit [Dashscope Console](https://dashscope.console.aliyun.com/)
2. Create an account or sign in
3. Generate an API key
4. Add the API key to your `.env` file

### Theme Customization

The application supports both dark and light modes. You can customize the theme colors in `src/styles/theme.ts`.

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx
│   ├── Chat.tsx
│   ├── ChatMessage.tsx
│   └── ChatInput.tsx
├── hooks/              # Custom React hooks
│   └── useTheme.tsx
├── services/           # API services
│   └── qwenService.ts
├── styles/             # Styling and themes
│   ├── theme.ts
│   └── GlobalStyles.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
├── App.tsx             # Main App component
└── index.tsx           # Entry point
```

## Legal Categories Supported

- **Labour Law**: Employee rights, working hours, salary disputes
- **Company Formation**: Business registration, licensing through Sijilat
- **Visa Services**: Tourist, business, and residence visas
- **LMRA Services**: Work permits, labour market regulations
- **Grace Period Extensions**: Visa extensions and renewals
- **General Legal**: Various legal matters in Bahrain

## Development Notes

- The application defaults to dark mode as requested
- API calls are handled securely (in production, consider implementing a backend proxy)
- The UI is designed to be highly interactive with smooth animations
- Color scheme uses black background with dark orange accents

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Security Considerations

- API keys should be secured in production environments
- Consider implementing rate limiting
- Validate all user inputs
- Use HTTPS in production

## Deployment

To deploy the application:

1. Build the production version:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your hosting service (Vercel, Netlify, etc.)

## Support

For support or questions about legal matters, the application provides guidance but users should consult with official authorities or legal professionals for specific legal advice.

## License

This project is licensed under the ISC License - see the package.json file for details.

## Acknowledgments

- Qwen AI for providing the AI model
- The Bahrain government for providing legal resources and documentation
- The React and open-source community for the excellent tools and libraries

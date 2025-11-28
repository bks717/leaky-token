# NetShape - Traffic Shaping Simulator

A complete, beginner-friendly Computer Networks mini-project designed to simulate and explain **Leaky Bucket** and **Token Bucket** traffic shaping algorithms.

## 🚀 Features

*   **Interactive Simulator**: Run simulations with custom bucket capacities, rates, and input packets. Visualize buffer usage in real-time charts.
*   **Educational Content**: Simple explanations, flowcharts, and real-world analogies (e.g., water bucket vs. tokens).
*   **Code Implementation**: View standard C code implementations for both algorithms, ready for lab usage.
*   **AI-Powered Reports**: Generates a dynamic, submission-ready project report (Abstract, Conclusion, Future Scope) using **Google Gemini** based on your simulation results.

## 🛠️ Tech Stack

This project is built as a modern client-side Single Page Application (SPA).

*   **Core Framework**: React 19 (TypeScript)
*   **Styling**: Tailwind CSS
*   **Visualization**: Recharts
*   **AI Integration**: Google GenAI SDK (`@google/genai`)
*   **Icons**: Lucide React

## ⚙️ Configuration

To use the AI Report Generator features, you need a valid Google Gemini API Key.

1.  Get your API Key from [Google AI Studio](https://aistudio.google.com/).
2.  Open the `.env` file in the project root.
3.  Paste your key as shown below.

## 📚 Project Structure

*   `index.tsx`: Application entry point.
*   `App.tsx`: Main layout and tab navigation.
*   `components/`:
    *   `Simulator.tsx`: Core simulation logic and chart visualization.
    *   `Report.tsx`: AI component that analyzes simulation data to write reports.
    *   `Implementation.tsx`: C code viewer for lab reference.
    *   `Overview.tsx` & `Explanation.tsx`: Educational modules.
*   `utils/simulation.ts`: Pure TypeScript implementation of the shaping algorithms.

## 📝 License

Free for educational use. Perfect for Computer Networks lab mini-projects.
# Welcome to the Bihar Tourism Project

## Overview
This project is a web application designed to showcase the beauty and culture of Bihar. It features a responsive and visually appealing design to highlight attractions, festivals, cuisines, and adventures that make Bihar unique. The application includes dynamic features such as a hero section, a video showcase, an image slider for attractions, and cards for further exploration.

## Features
- **Responsive Hero Section**: Displays a welcoming message with an engaging background.
- **Video Section**: Showcases a video about Bihar's culture and attractions.
- **Image Slider**: A dynamic slider to highlight top attractions.
- **Card Section**: Features cards showcasing festivals, cuisines, and adventures.
- **Responsive Design**: Optimized for mobile, tablet, and desktop views.

---

## File Structure

```
.
├── views/
│   ├── index.ejs           # Main homepage template
│   ├── partials/
│   │   ├── navbar.ejs      # Navigation bar
│   │   └── footer.ejs      # Footer
├── public/
│   ├── css/
│   │   └── main.css        # Stylesheet for the application
│   ├── images/             # Images and media files
│   │   ├── logo-bihar.jpg  # Hero section background image
│   │   ├── mahabodhi.jpg   # Slider image
│   │   └── cuisine.jpg     # Card images
│   └── videos/
│       └── video.mp4       # Video for video section
├── app.js                  # Main server file
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

---

## Dependencies

To run this project, you need the following dependencies:

- **Node.js**: Backend runtime.
- **Express.js**: Web framework for routing.
- **EJS**: Template engine for rendering dynamic views.
- **Body-Parser**: Middleware for parsing incoming request bodies.
- **Nodemon** (optional): Development tool for automatically restarting the server.

Install all dependencies using the command:

```bash
npm install
```

---

## How to Run the Project

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the server:**
   ```bash
   npm start
   ```

4. **Access the application:**
   Open your browser and go to `http://localhost:3000`.

---

## Application Functions

### Hero Section
- Displays a welcoming message with a custom background image.
- Includes a call-to-action button linking to the "Explore" section.

### Video Section
- Showcases a video highlighting the culture and attractions of Bihar.

### Image Slider
- Automatically cycles through top attractions.
- Users can manually navigate using next/previous buttons.

### Card Section
- Displays detailed cards for festivals, cuisines, and adventures.
- Cards are interactive and hoverable.

---

## Responsive Design
- **Hero Section**: Scales images and content for smaller devices.
- **Video Section**: Resizes the video dynamically.
- **Image Slider**: Adjusts image sizes and ensures usability on smaller screens.
- **Cards**: Reorganizes layout from grid to single-column view for smaller devices.

---

## Future Enhancements
- **Interactive Map**: Integrate a map to showcase locations of attractions.
- **Search Functionality**: Allow users to search for attractions, festivals, and cuisines.
- **Multilingual Support**: Provide content in multiple languages.
- **Database Integration**: Store attraction details in a database for dynamic rendering.

---

## Contributors
- **Project Owner:** [Abhishek Kumar]
- **Developer:** [Abhishek Kumar]

---

## License
This project is licensed under the MIT License. See `LICENSE` for more details.

---

Feel free to suggest improvements or report issues by opening an issue on the repository!


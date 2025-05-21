//const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors'); // Required if your frontend and backend are on different domains/ports

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000; // Default to port 3000 if not specified in .env

// --- Middleware ---
// Enable CORS for all origins (adjust for production)
app.use(cors());

// Serve static files from the 'public' directory
// This means when you go to http://localhost:3000/, it will serve your index.html
app.use(express.static(path.join(__dirname, '../public')));

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// --- API Routes ---

// Example: Get Project Details (for 'Read more' functionality)
// This is a placeholder. You'd typically fetch this from a database.
app.get('/api/projects/:id', (req, res) => {
    const projectId = req.params.id;
    // Dummy project data - replace with real data from a database or file
    const projects = {
        '1': {
            title: 'Covid-19 Detection Using X-rays (Project 1)',
            fullDescription: 'The research community has recently shown significant interest in designing automated systems to detect coronavirus disease 2019 (COVID-19) using deep learning approaches and chest radiography images. However, state-of-the-art deep learning techniques, especially convolutional neural networks (CNNs), demand more learnable parameters and memory. Therefore, they may not be suitable for real-time diagnosis. Thus, the design of a lightweight CNN model for fast and accurate COVID-19 detection is an urgent need. In this paper, a lightweight CNN model called LW-CORONet is proposed that comprises a sequence of convolution, rectified linear unit (ReLU), and pooling layers followed by two fully connected layers. The proposed model facilitates extracting meaningful features from the chest X-ray (CXR) images with only five learnable layers. The proposed model is evaluated using two larger CXR datasets (Dataset-1: 2250 images and Dataset-2: 15,999 images) and the classification accuracy obtained are 98.67% and 99.00% on Dataset-1 and 95.67% and 96.25% on Dataset-2 for multi-class and binary classification cases, respectively. The results are compared with four contemporary pre-trained CNN models as well as state-of-the-art models. The effect of several hyperparameters: different optimization techniques, batch size, and learning rate have also been investigated. The proposed model demands fewer parameters and requires less memory space. Hence, it is effective for COVID-19 detection and can be utilized as a supplementary tool to assist radiologists in their diagnosis.'
        },
        '2': {
            title: 'Covid-19 Detection Using X-rays (Project 2)',
            fullDescription: 'The COVID-19 pandemic has caused severe healthcare crises across the globe in a very short period. The pandemic broke out in early December 2019 in Wuhan, China, and was declared a global pandemic on 11th March 2020 by the World Health Organization (WHO) [1]. Researchers across the world have reported COVID-19 to be a highly infectious disease that severely affects the respiratory system and has common symptoms like dry cough, myalgia, fever, headache, chest pain, and sore throat [2]. The current medical diagnostic processes lack proper medicine and drugs as well as hospital resources for the treatment of COVID-19 infection [3,4]. Reverse transcription-polymerase chain reaction (RT-PCR), a manual, time-consuming, and costly tool, is the most frequently used diagnostic method for detection which causes the risk to medical staff [5,6]. It is still an ongoing pandemic and has led to various variants, thereby, resulting in high mortality rates in many countries. Hence, there is a strong need for a safe and effective methodology that can detect COVID-19 infection at an early stage. The significance of two imaging modalities such as chest X-ray (CXR) and computed tomography (CT) has been studied for diagnosing COVID-19 [7,8,9]. However, manual visual inspection of both CXR and CT images is time-taking and tedious which may sometimes result in an inaccurate diagnosis [7,10]. Recently, tremendous efforts have been made in developing artificial intelligence (AI) based automated models for accurate diagnosis of COVID-19 to lessen the workload of radiologists [11].'
        },
        // Add more project details here
    };

    const project = projects[projectId];

    if (project) {
        res.json(project);
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
});


// Example: Handle Contact Form Submission (if you add a form)
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    console.log('New contact submission:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);

    // In a real application, you would:
    // 1. Save to a database
    // 2. Send an email (e.g., using Nodemailer)
    // 3. Perform validation

    res.status(200).json({ message: 'Message received successfully!' });
});

// Catch-all for any other routes not defined - sends the index.html
// This allows client-side routing to work if you introduce it later
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// --- Server Start ---
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Serving static files from ${path.join(__dirname, '../public')}`);
});

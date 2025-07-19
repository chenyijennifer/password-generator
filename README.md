# Customized Password Generator
A password generating app with HTML, CSS and JavaScript. You can customize the length of the password from 8 characters to 20 characters, 
as well as what to be included in the password.

Before generating the password, all you have to do is to simply type in the desired number of length, select the case, checking whether to include 
in the password, and click the generate button. The app will generate two passwords satisfying the requirements.

As long as passwords generated, clicked on the prefered one and it will be copied to the clipboard.

Moreover, the app supports both light and dark mode. Click the top-right button to your more favorable mode.


## How It's Made

**Tech used:** HTML, CSS and JavaScript

**Project Structure:**
```
project-root/
├── images/
│ ├── light_mode.png
│ └── dark_mode.png
├── index.css
├── index.html
└── index.js
```

## Features
- **Customize** the length, case, whether or not symbols and numbers
- Support both **Light/Dark Mode**
- **Copy password to clipboard** by simply clicking on the password
- Can regenerate if one wants a new password

## Getting Started
1. **Clone the repository**:

   ```bash
   git clone https://github.com/chenyijennifer/password-generator.git
   cd project-root
   ```

2. **Open** in your browser:

   ```bash
   open index.html
   ```

3. **View the page** and enjoy the design.

## Lessons Learned:

This happened to be a challenge for me to build in multiple functions to satisfy different requirements. Instead of the main purpose of this project, 
practicing to generate random numbers or indices, I self-learned some of the fundamentals such as ".addEventListener", "&::after", and so on. Even though 
I might not be mature enough in these techniques, I'm sure that I have been more familiar with these coding logics.

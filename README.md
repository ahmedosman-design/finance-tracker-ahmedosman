# Student Finance Tracker

## Overview

Student Finance Tracker is a responsive web application built using HTML, CSS, and JavaScript. It allows students to record, manage, and monitor their expenses through an interactive dashboard and transaction management system.

## Live Demo

GitHub Pages:
https://ahmedosman-design.github.io/finance-tracker-ahmedosman/

## Demo Video

YouTube:
https://youtu.be/S706vRDAhXo

## Features

- Add, edit, and delete transactions
- Dashboard statistics
- Regex-based validation
- Regex search functionality
- Sorting by description, amount, and date
- localStorage data persistence
- JSON import and export
- Responsive design for mobile, tablet, and desktop
- Accessibility features including keyboard navigation and skip links

## Regex Validation

The application uses the following regex patterns:

- Description: `^\S(?:.*\S)?$`
- Amount: `^(0|[1-9]\d*)(\.\d{1,2})?$`
- Date: `^\d{
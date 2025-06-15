# Document Processing and Slide Generation System

A web application that allows users to upload documents (PDF/DOCX), extract titles using ML API, and generate presentation slides.

## Features

- Document upload (PDF/DOCX support)
- ML-powered title extraction
- Interactive title editing
- Slide generation from selected titles
- Slide preview and editing
- User authentication and authorization
- CSRF protection
- Comprehensive error handling

## Prerequisites

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Apache/Nginx web server
- cURL extension for PHP
- File upload support

## Installation

### 1. Database Setup

Run the database schema to create the required tables:

```sql
mysql -u your_username -p your_database < backend/database_schema.sql
```

### 2. Configuration

#### Database Configuration
Update `backend/config/db.php` with your database credentials:

```php
<?php
$host = 'localhost';
$username = 'your_db_username';
$password = 'your_db_password';
$database = 'your_database_name';
?>
```

#### ML API Configuration
Update `backend/config/ml-config.php` with your ML API credentials:

```php
<?php
// Replace with your actual ML API endpoint
$ML_BASE_URL = 'https://your-ml-api.com';

// Replace with your actual API key
$ML_API_KEY = 'your-actual-api-key';

// Enable debug mode for troubleshooting
$ML_DEBUG_MODE = true;
?>
```

### 3. File Permissions

Ensure the uploads directory is writable:

```bash
chmod 755 backend/uploads/
```

### 4. Web Server Configuration

#### Apache (.htaccess)
Create `.htaccess` file in the root directory:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [QSA,L]

# PHP settings
php_value upload_max_filesize 50M
php_value post_max_size 50M
php_value max_execution_time 300
php_value memory_limit 256M
```

#### Nginx
Add to your nginx configuration:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}

location ~ \.php$ {
    fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
    fastcgi_index index.php;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    include fastcgi_params;
}
```

## Usage

### 1. User Registration/Login
- Access the application and register a new account
- Or use the default admin account (username: admin, password: password)

### 2. Document Upload
- Navigate to the upload page
- Drag and drop or select a PDF/DOCX file
- Click "Upload Paper"

### 3. Title Extraction
- After successful upload, click "Extract Titles"
- The system will process the document using the ML API
- Review and edit the extracted titles if needed

### 4. Save Titles
- Edit the titles as required
- Click "Save All Titles" to store them in the database

### 5. Generate Slides
- Click "Generate Slides" to create presentation slides
- The system will use the ML API to generate slides from the selected titles

### 6. View and Edit Slides
- Review the generated slides
- Edit slide content if needed
- Navigate through slides using arrow buttons

## Testing

### Test ML API Connection
Use the test page to verify ML API connectivity:

```
http://your-domain/backend/test_slides_api.html
```

### Test Document Processing
Run the PHP test script:

```bash
php backend/test_document_processing.php
```

## Troubleshooting

### Common Issues

#### 1. File Upload Fails
- Check file size limits in PHP configuration
- Verify uploads directory permissions
- Ensure file type is PDF or DOCX

#### 2. ML API Connection Fails
- Verify ML API URL and credentials in `ml-config.php`
- Check network connectivity
- Enable debug mode for detailed logging
- Test connection using the test page

#### 3. Database Errors
- Verify database credentials in `db.php`
- Ensure all required tables exist
- Check database user permissions

#### 4. CSRF Token Errors
- Ensure sessions are properly configured
- Check if CSRF token is being sent with requests
- Verify session storage permissions

### Debug Mode

Enable debug mode in `ml-config.php`:

```php
$ML_DEBUG_MODE = true;
```

This will log detailed information about ML API requests and responses.

### Error Logs

Check PHP error logs for detailed error information:

```bash
tail -f /var/log/apache2/error.log
# or
tail -f /var/log/nginx/error.log
```

## API Endpoints

### Document Management
- `POST /document.php?action=upload` - Upload document
- `POST /document.php?action=getTitles` - Extract titles
- `POST /document.php?action=saveTitles` - Save titles
- `POST /document.php?action=generateSlides` - Generate slides

### Testing
- `GET /document.php?action=testSlides` - Test ML API connection
- `POST /document.php?action=testSlidesGeneration` - Test slide generation

## Security Considerations

1. **Update Default Credentials**: Change the default admin password
2. **Secure ML API Key**: Keep your ML API key secure and rotate regularly
3. **File Validation**: The system validates file types and sizes
4. **CSRF Protection**: All forms include CSRF token validation
5. **User Authentication**: Implement proper user authentication
6. **Input Validation**: All user inputs are validated and sanitized

## File Structure

```
├── backend/
│   ├── api/
│   │   ├── document.php          # Main API endpoints
│   │   └── ml-api.php            # ML API integration
│   ├── config/
│   │   ├── db.php                # Database configuration
│   │   └── ml-config.php         # ML API configuration
│   ├── uploads/                  # Document storage
│   ├── database_schema.sql       # Database schema
│   └── test_*.php               # Test scripts
├── src/
│   ├── pages/
│   │   ├── UploadPage.jsx        # Document upload interface
│   │   └── SlideGenerationPage.jsx # Slide viewing interface
│   └── components/               # React components
└── README.md
```

## Support

For issues and questions:
1. Check the troubleshooting section
2. Enable debug mode for detailed logging
3. Review error logs
4. Test individual components using the provided test scripts

## License

This project is licensed under the MIT License. 
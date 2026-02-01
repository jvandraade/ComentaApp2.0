using ComentaApp.Application.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace ComentaApp.Infrastructure.Services
{
    public class FileUploadService : IFileUploadService
    {
        private readonly IWebHostEnvironment _environment;
        private readonly string[] _allowedImageExtensions = { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
        private readonly string[] _allowedVideoExtensions = { ".mp4", ".mov", ".avi", ".webm" };
        private const long MaxFileSize = 10 * 1024 * 1024; // 10MB

        public FileUploadService(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        public async Task<string> UploadFileAsync(IFormFile file, string folder)
        {
            if (file == null || file.Length == 0)
            {
                throw new Exception("File is empty");
            }

            // Validate file size
            if (file.Length > MaxFileSize)
            {
                throw new Exception("File size exceeds 10MB limit");
            }

            // Validate file extension
            var extension = Path.GetExtension(file.FileName).ToLower();
            if (!_allowedImageExtensions.Contains(extension) && !_allowedVideoExtensions.Contains(extension))
            {
                throw new Exception("Invalid file type. Only images and videos are allowed");
            }

            // Generate unique filename
            var fileName = $"{Guid.NewGuid()}{extension}";

            // Create upload path
            var uploadPath = Path.Combine(_environment.WebRootPath, "uploads", folder);

            // Create directory if it doesn't exist
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            // Full file path
            var filePath = Path.Combine(uploadPath, fileName);

            // Save file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Return relative URL
            return $"/uploads/{folder}/{fileName}";
        }

        public async Task<List<string>> UploadFilesAsync(List<IFormFile> files, string folder)
        {
            var uploadedFiles = new List<string>();

            foreach (var file in files)
            {
                var url = await UploadFileAsync(file, folder);
                uploadedFiles.Add(url);
            }

            return uploadedFiles;
        }

        public bool DeleteFile(string filePath)
        {
            try
            {
                var fullPath = Path.Combine(_environment.WebRootPath, filePath.TrimStart('/'));

                if (File.Exists(fullPath))
                {
                    File.Delete(fullPath);
                    return true;
                }

                return false;
            }
            catch
            {
                return false;
            }
        }
    }
}

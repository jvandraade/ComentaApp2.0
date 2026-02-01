using Microsoft.AspNetCore.Http;

namespace ComentaApp.Application.Interfaces
{
    public interface IFileUploadService
    {
        Task<string> UploadFileAsync(IFormFile file, string folder);
        Task<List<string>> UploadFilesAsync(List<IFormFile> files, string folder);
        bool DeleteFile(string filePath);
    }
}

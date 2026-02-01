using ComentaApp.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ComentaApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UploadController : ControllerBase
    {
        private readonly IFileUploadService _fileUploadService;
        private readonly ILogger<UploadController> _logger;

        public UploadController(IFileUploadService fileUploadService, ILogger<UploadController> logger)
        {
            _fileUploadService = fileUploadService;
            _logger = logger;
        }

        [HttpPost("image")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            try
            {
                var url = await _fileUploadService.UploadFileAsync(file, "complaints");
                return Ok(new { url });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading image");
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("images")]
        public async Task<IActionResult> UploadImages(List<IFormFile> files)
        {
            try
            {
                var urls = await _fileUploadService.UploadFilesAsync(files, "complaints");
                return Ok(new { urls });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error uploading images");
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}

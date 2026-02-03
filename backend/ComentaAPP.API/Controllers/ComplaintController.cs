using ComentaApp.Application.DTOs.Complaint;
using ComentaApp.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ComentaApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ComplaintController : ControllerBase
    {
        private readonly IComplaintService _complaintService;
        private readonly ILogger<ComplaintController> _logger;

        public ComplaintController(IComplaintService complaintService, ILogger<ComplaintController> logger)
        {
            _complaintService = complaintService;
            _logger = logger;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateComplaint([FromBody] CreateComplaintDto dto)
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
                {
                    return Unauthorized(new { message = "Invalid user ID" });
                }

                var complaint = await _complaintService.CreateComplaintAsync(userId, dto);
                return Ok(complaint);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating complaint");
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetComplaints()
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                Guid? currentUserId = null;

                if (!string.IsNullOrEmpty(userIdClaim) && Guid.TryParse(userIdClaim, out var userId))
                {
                    currentUserId = userId;
                }

                var complaints = await _complaintService.GetComplaintsAsync(currentUserId);
                return Ok(complaints);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting complaints");
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetComplaintById(Guid id)
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                Guid? currentUserId = null;

                if (!string.IsNullOrEmpty(userIdClaim) && Guid.TryParse(userIdClaim, out var userId))
                {
                    currentUserId = userId;
                }

                var complaint = await _complaintService.GetComplaintByIdAsync(id, currentUserId);
                return Ok(complaint);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting complaint");
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            try
            {
                var categories = await _complaintService.GetCategoriesAsync();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting categories");
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("search")]
public async Task<IActionResult> SearchComplaints(
    [FromQuery] string? keyword,
    [FromQuery] Guid? categoryId,
    [FromQuery] string? status,
    [FromQuery] string? state,
    [FromQuery] string? city,
    [FromQuery] int page = 1,
    [FromQuery] int pageSize = 10)
{
    try
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        Guid? currentUserId = null;

        if (!string.IsNullOrEmpty(userIdClaim) && Guid.TryParse(userIdClaim, out var userId))
        {
            currentUserId = userId;
        }

        var searchDto = new SearchComplaintDto
        {
            Keyword = keyword,
            CategoryId = categoryId,
            Status = status,
            State = state,
            City = city,
            Page = page,
            PageSize = pageSize
        };

        var result = await _complaintService.SearchComplaintsAsync(searchDto, currentUserId);
        return Ok(result);
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error searching complaints");
        return BadRequest(new { message = ex.Message });
    }
}
    }
}

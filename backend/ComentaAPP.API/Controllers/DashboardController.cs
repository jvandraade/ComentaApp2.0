using ComentaApp.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ComentaApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Can add role-based authorization later
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;
        private readonly ILogger<DashboardController> _logger;

        public DashboardController(IDashboardService dashboardService, ILogger<DashboardController> logger)
        {
            _dashboardService = dashboardService;
            _logger = logger;
        }

        [HttpGet("statistics")]
        public async Task<IActionResult> GetStatistics()
        {
            try
            {
                var statistics = await _dashboardService.GetStatisticsAsync();
                return Ok(statistics);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting statistics");
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("complaint/{complaintId}/status")]
        public async Task<IActionResult> UpdateComplaintStatus(Guid complaintId, [FromBody] string status)
        {
            try
            {
                await _dashboardService.UpdateComplaintStatusAsync(complaintId, status);
                return Ok(new { message = "Status updated successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating complaint status");
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}

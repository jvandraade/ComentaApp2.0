using ComentaApp.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ComentaApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class LikeController : ControllerBase
    {
        private readonly ILikeService _likeService;
        private readonly ILogger<LikeController> _logger;

        public LikeController(ILikeService likeService, ILogger<LikeController> logger)
        {
            _likeService = likeService;
            _logger = logger;
        }

        [HttpPost("{complaintId}")]
        public async Task<IActionResult> ToggleLike(Guid complaintId)
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
                {
                    return Unauthorized(new { message = "Invalid user ID" });
                }

                var isLiked = await _likeService.ToggleLikeAsync(userId, complaintId);
                var likesCount = await _likeService.GetLikesCountAsync(complaintId);

                return Ok(new
                {
                    isLiked,
                    likesCount
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error toggling like");
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}

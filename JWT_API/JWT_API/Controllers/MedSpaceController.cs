using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using JWT_API.Interfaces;
using JWT_API.Models;
using Microsoft.AspNetCore.Authorization;

namespace JWT_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedSpaceController : ControllerBase
    {
        private readonly IMedSpaceService IMedSpaceService;

        public MedSpaceController(IMedSpaceService medSpaceService)
        {
            IMedSpaceService = medSpaceService;
        }

        [HttpGet]
        [Route("GetUsersList")]
        [Authorize]
        public async Task<IActionResult> GetUsersList()
        {
            Response res = await IMedSpaceService.GetUsersList();
            return Ok(res);
        }

        [Route("GetUserBloodSugarReadings")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> GetUserBloodSugarReadings(ReqUsername req)
        {
            Response res = await IMedSpaceService.GetUserBloodSugarReadings(req);
            return Ok(res);
        }
    }
    
}
